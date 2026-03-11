from __future__ import annotations

import json
import re
import time
import urllib.parse
from dataclasses import dataclass, replace
from datetime import date, timedelta
from typing import Any

from fast_flights import FlightData, Passengers
from fast_flights.core import fetch
from fast_flights.filter import TFSData
from selectolax.lexbor import LexborHTMLParser, LexborNode

DEFAULT_IDEAL_LAYOVER_MINUTES = 180
MAX_OPTIONS_PER_DAY = 8
STOP_SUMMARY_RE = re.compile(r"(?P<stops>\d+)\s+stop(?:s)?(?:\s+in\s+(?P<airport>[A-Z]{3}))?")
LAYOVER_RE = re.compile(
    r"Layover \(1 of 1\) is (?:a )?(?P<duration>.+?) layover at ",
    re.IGNORECASE,
)
TOTAL_DURATION_RE = re.compile(r"Total duration (?P<duration>\d+\s+hr(?:\s+\d+\s+min)?|\d+\s+min)")
ITINERARY_PART_RE = re.compile(
    r"(?P<origin>[A-Z]{3})-(?P<destination>[A-Z]{3})-(?P<carrier>[A-Z0-9]{2,3})-(?P<number>[A-Z0-9]+)-(?P<flight_date>\d{8})"
)
PRICE_RE = re.compile(r"[^0-9.]")
DURATION_RE = re.compile(r"(?:(?P<hours>\d+)\s*hr)?(?:\s*(?P<minutes>\d+)\s*min)?")
CARRIERS_RE = re.compile(r"flight with (?P<carriers>.+?)\.", re.IGNORECASE)
TIMES_RE = re.compile(
    r"Leaves .*? at (?P<departure>\d{1,2}:\d{2}\s*[AP]M) on .*? "
    r"and arrives at .*? at (?P<arrival>\d{1,2}:\d{2}\s*[AP]M) on ",
    re.IGNORECASE,
)


class FlightSearchError(RuntimeError):
    pass


@dataclass(frozen=True)
class FlightSearchConfig:
    origin: str
    destination: str
    via: str
    depart_start: date
    depart_end: date
    return_start: date
    return_end: date
    adults: int = 1
    currency: str = "CAD"
    price_margin: float = 200.0
    max_options_per_day: int = 4

    def __post_init__(self) -> None:
        if self.depart_end < self.depart_start:
            raise FlightSearchError("Departure end date must be on or after departure start date.")
        if self.return_end < self.return_start:
            raise FlightSearchError("Return end date must be on or after return start date.")
        if self.adults < 1:
            raise FlightSearchError("At least one adult traveller is required.")
        if not 1 <= self.max_options_per_day <= MAX_OPTIONS_PER_DAY:
            raise FlightSearchError("max_options_per_day must be between 1 and 8.")


@dataclass(frozen=True)
class FlightSegment:
    origin: str
    destination: str
    carrier_code: str
    flight_number: str
    flight_date: date

    @property
    def label(self) -> str:
        return (
            f"{self.carrier_code}{self.flight_number} "
            f"{self.origin}->{self.destination} "
            f"{self.flight_date.isoformat()}"
        )

    def to_dict(self) -> dict[str, Any]:
        return {
            "origin": self.origin,
            "destination": self.destination,
            "carrier_code": self.carrier_code,
            "flight_number": self.flight_number,
            "flight_date": self.flight_date.isoformat(),
        }


@dataclass(frozen=True)
class OneWayOption:
    travel_date: date
    origin: str
    destination: str
    carriers: tuple[str, ...]
    segments: tuple[FlightSegment, ...]
    departure_label: str
    arrival_label: str
    duration_minutes: int
    stops: int
    connection_airport: str | None
    layover_minutes: int | None
    price: float
    currency: str

    def signature(self) -> tuple[Any, ...]:
        return (
            self.travel_date.isoformat(),
            self.departure_label,
            self.arrival_label,
            self.connection_airport,
            tuple(segment.label for segment in self.segments),
            round(self.price, 2),
        )

    def to_dict(self) -> dict[str, Any]:
        return {
            "travel_date": self.travel_date.isoformat(),
            "origin": self.origin,
            "destination": self.destination,
            "carriers": list(self.carriers),
            "segments": [segment.to_dict() for segment in self.segments],
            "departure_label": self.departure_label,
            "arrival_label": self.arrival_label,
            "duration_minutes": self.duration_minutes,
            "stops": self.stops,
            "connection_airport": self.connection_airport,
            "layover_minutes": self.layover_minutes,
            "price": round(self.price, 2),
            "currency": self.currency,
        }


@dataclass(frozen=True)
class FlightOption:
    departure_date: date
    return_date: date
    currency: str
    estimated_price: float
    outbound: OneWayOption
    inbound: OneWayOption
    convenience_score: int = 0
    price_gap: float = 0.0

    @property
    def total_trip_minutes(self) -> int:
        return self.outbound.duration_minutes + self.inbound.duration_minutes

    def signature(self) -> tuple[Any, ...]:
        return (
            self.departure_date.isoformat(),
            self.return_date.isoformat(),
            self.outbound.signature(),
            self.inbound.signature(),
        )

    def to_dict(self) -> dict[str, Any]:
        return {
            "departure_date": self.departure_date.isoformat(),
            "return_date": self.return_date.isoformat(),
            "currency": self.currency,
            "estimated_price": round(self.estimated_price, 2),
            "price_gap": round(self.price_gap, 2),
            "convenience_score": self.convenience_score,
            "total_trip_minutes": self.total_trip_minutes,
            "outbound": self.outbound.to_dict(),
            "inbound": self.inbound.to_dict(),
        }


@dataclass(frozen=True)
class SearchError:
    direction: str
    travel_date: date
    message: str

    def to_dict(self) -> dict[str, str]:
        return {
            "direction": self.direction,
            "travel_date": self.travel_date.isoformat(),
            "message": self.message,
        }


@dataclass(frozen=True)
class FlightSearchResult:
    options: list[FlightOption]
    errors: list[SearchError]

    def to_json(self, ranked_options: list[FlightOption]) -> str:
        payload = {
            "matches_found": len(self.options),
            "pricing_model": "sum_of_public_one_way_google_flights_prices",
            "ranked_options": [option.to_dict() for option in ranked_options],
            "errors": [error.to_dict() for error in self.errors],
        }
        return json.dumps(payload, indent=2)


class GoogleFlightsClient:
    def __init__(self, *, request_delay_seconds: float = 0.15) -> None:
        self._request_delay_seconds = max(request_delay_seconds, 0.0)

    def search(self, config: FlightSearchConfig) -> FlightSearchResult:
        outbound_by_date: dict[date, list[OneWayOption]] = {}
        inbound_by_date: dict[date, list[OneWayOption]] = {}
        errors: list[SearchError] = []

        for travel_date in iter_dates(config.depart_start, config.depart_end):
            try:
                outbound_by_date[travel_date] = self._search_one_way(
                    travel_date=travel_date,
                    origin=config.origin,
                    destination=config.destination,
                    via=config.via,
                    currency=config.currency,
                    adults=config.adults,
                    max_options_per_day=config.max_options_per_day,
                )
            except FlightSearchError as exc:
                errors.append(
                    SearchError(direction="outbound", travel_date=travel_date, message=str(exc))
                )
            self._pause()

        for travel_date in iter_dates(config.return_start, config.return_end):
            try:
                inbound_by_date[travel_date] = self._search_one_way(
                    travel_date=travel_date,
                    origin=config.destination,
                    destination=config.origin,
                    via=config.via,
                    currency=config.currency,
                    adults=config.adults,
                    max_options_per_day=config.max_options_per_day,
                )
            except FlightSearchError as exc:
                errors.append(
                    SearchError(direction="inbound", travel_date=travel_date, message=str(exc))
                )
            self._pause()

        options: list[FlightOption] = []
        for departure_date, return_date in iter_date_pairs(
            config.depart_start,
            config.depart_end,
            config.return_start,
            config.return_end,
        ):
            for outbound in outbound_by_date.get(departure_date, []):
                for inbound in inbound_by_date.get(return_date, []):
                    options.append(
                        FlightOption(
                            departure_date=departure_date,
                            return_date=return_date,
                            currency=config.currency,
                            estimated_price=round(outbound.price + inbound.price, 2),
                            outbound=outbound,
                            inbound=inbound,
                        )
                    )

        return FlightSearchResult(options=dedupe_round_trip_options(options), errors=errors)

    def _search_one_way(
        self,
        *,
        travel_date: date,
        origin: str,
        destination: str,
        via: str,
        currency: str,
        adults: int,
        max_options_per_day: int,
    ) -> list[OneWayOption]:
        try:
            tfs_data = TFSData.from_interface(
                flight_data=[
                    FlightData(
                        date=travel_date.isoformat(),
                        from_airport=origin,
                        to_airport=destination,
                        max_stops=1,
                    )
                ],
                trip="one-way",
                passengers=Passengers(adults=adults),
                seat="economy",
                max_stops=1,
            )
            response = fetch(
                {
                    "tfs": tfs_data.as_b64().decode("utf-8"),
                    "hl": "en",
                    "tfu": "EgQIABABIgA",
                    "curr": currency,
                }
            )
            return parse_google_flights_html(
                html=response.text,
                travel_date=travel_date,
                origin=origin,
                destination=destination,
                currency=currency,
                required_via=via,
                max_options=max_options_per_day,
            )
        except FlightSearchError:
            raise
        except Exception as exc:
            raise FlightSearchError(f"Google Flights lookup failed: {exc}") from exc

    def _pause(self) -> None:
        if self._request_delay_seconds:
            time.sleep(self._request_delay_seconds)


def parse_google_flights_html(
    *,
    html: str,
    travel_date: date,
    origin: str,
    destination: str,
    currency: str,
    required_via: str,
    max_options: int,
) -> list[OneWayOption]:
    parser = LexborHTMLParser(html)
    cards = parser.css("li.pIav2d")
    if not cards:
        raise FlightSearchError("Google Flights returned no result cards for this search.")

    options: list[OneWayOption] = []
    for card in cards:
        try:
            option = one_way_option_from_card(
                card,
                travel_date=travel_date,
                origin=origin,
                destination=destination,
                currency=currency,
            )
        except Exception:
            continue
        if option is None:
            continue
        if option.stops != 1:
            continue
        if option.connection_airport != required_via:
            continue
        if len(option.segments) != 2:
            continue
        options.append(option)

    deduped = dedupe_one_way_options(options)
    deduped.sort(
        key=lambda option: (
            option.price,
            option.duration_minutes,
            option.layover_minutes if option.layover_minutes is not None else 9999,
            option.departure_label,
        )
    )
    return deduped[:max_options]


def one_way_option_from_card(
    card: LexborNode,
    *,
    travel_date: date,
    origin: str,
    destination: str,
    currency: str,
) -> OneWayOption | None:
    aria_label = normalize_spaces(attributes(card.css_first(".JMc5Xc")).get("aria-label", ""))
    price_text = node_text(card.css_first(".YMlIz.FpEdX"))
    impact_url = attributes(card.css_first(".NZRfve.E8UxCd")).get(
        "data-travelimpactmodelwebsiteurl", ""
    )
    departure_label, arrival_time = extract_times(aria_label)
    carriers_text = extract_carriers(aria_label)
    duration_text = extract_total_duration(aria_label)
    segments = parse_itinerary_segments(impact_url)

    if (
        not departure_label
        or not arrival_time
        or not carriers_text
        or not price_text
        or len(segments) != 2
    ):
        return None

    try:
        duration_minutes = parse_duration_text(duration_text)
        price = parse_price_amount(price_text)
    except ValueError:
        return None

    connection_airport = segments[0].destination
    stops = len(segments) - 1
    carriers = tuple(
        airline.strip() for airline in carriers_text.split(",") if airline.strip()
    )
    try:
        layover_minutes = parse_layover_minutes(aria_label)
    except ValueError:
        layover_minutes = None
    arrival_offset_days = (segments[-1].flight_date - travel_date).days
    arrival_label = arrival_time
    if arrival_offset_days > 0:
        arrival_label = f"{arrival_time} +{arrival_offset_days}"

    return OneWayOption(
        travel_date=travel_date,
        origin=origin,
        destination=destination,
        carriers=carriers,
        segments=segments,
        departure_label=departure_label,
        arrival_label=arrival_label,
        duration_minutes=duration_minutes,
        stops=stops,
        connection_airport=connection_airport,
        layover_minutes=layover_minutes,
        price=price,
        currency=currency,
    )


def node_text(node: LexborNode | None, *, separator: str = " ") -> str:
    if node is None:
        return ""
    return " ".join(node.text(separator=separator, strip=True).split())


def attributes(node: LexborNode | None) -> dict[str, str]:
    if node is None:
        return {}
    return {str(key): str(value) for key, value in node.attributes.items()}


def extract_total_duration(aria_label: str) -> str:
    match = TOTAL_DURATION_RE.search(aria_label)
    if not match:
        return ""
    return match.group("duration")


def normalize_spaces(text: str) -> str:
    return " ".join(text.replace("\u202f", " ").replace("\xa0", " ").split())


def extract_carriers(aria_label: str) -> str:
    match = CARRIERS_RE.search(aria_label)
    if not match:
        return ""
    return match.group("carriers").replace(" and ", ", ")


def extract_times(aria_label: str) -> tuple[str, str]:
    match = TIMES_RE.search(aria_label)
    if not match:
        return "", ""
    return match.group("departure"), match.group("arrival")


def parse_stop_summary(summary: str) -> tuple[int | None, str | None]:
    match = STOP_SUMMARY_RE.fullmatch(summary.strip())
    if not match:
        return None, None
    stops = int(match.group("stops"))
    airport = match.group("airport")
    return stops, airport


def parse_layover_minutes(aria_label: str) -> int | None:
    match = LAYOVER_RE.search(aria_label)
    if not match:
        return None
    return parse_duration_text(match.group("duration"))


def parse_duration_text(text: str) -> int:
    normalized = " ".join(text.strip().lower().replace("overnight", "").split())
    match = DURATION_RE.fullmatch(normalized)
    if not match:
        raise ValueError(f"Could not parse duration text: {text!r}")
    hours = int(match.group("hours") or 0)
    minutes = int(match.group("minutes") or 0)
    return hours * 60 + minutes


def parse_price_amount(text: str) -> float:
    numeric = PRICE_RE.sub("", text)
    if not numeric:
        raise ValueError(f"Could not parse price text: {text!r}")
    return float(numeric)


def parse_itinerary_segments(impact_url: str) -> tuple[FlightSegment, ...]:
    if not impact_url:
        return ()
    query = urllib.parse.parse_qs(urllib.parse.urlparse(impact_url).query)
    raw_itinerary = query.get("itinerary", [])
    if not raw_itinerary:
        return ()

    segments: list[FlightSegment] = []
    for part in raw_itinerary[0].split(","):
        match = ITINERARY_PART_RE.fullmatch(part.strip())
        if not match:
            return ()
        segments.append(
            FlightSegment(
                origin=match.group("origin"),
                destination=match.group("destination"),
                carrier_code=match.group("carrier"),
                flight_number=match.group("number"),
                flight_date=date.fromisoformat(
                    f"{match.group('flight_date')[:4]}-{match.group('flight_date')[4:6]}-{match.group('flight_date')[6:]}"
                ),
            )
        )
    return tuple(segments)


def iter_dates(start: date, end: date) -> list[date]:
    values: list[date] = []
    current = start
    while current <= end:
        values.append(current)
        current += timedelta(days=1)
    return values


def iter_date_pairs(
    depart_start: date,
    depart_end: date,
    return_start: date,
    return_end: date,
) -> list[tuple[date, date]]:
    pairs: list[tuple[date, date]] = []
    for departure_date in iter_dates(depart_start, depart_end):
        for return_date in iter_dates(return_start, return_end):
            if return_date > departure_date:
                pairs.append((departure_date, return_date))
    return pairs


def dedupe_one_way_options(options: list[OneWayOption]) -> list[OneWayOption]:
    best_by_signature: dict[tuple[Any, ...], OneWayOption] = {}
    for option in options:
        existing = best_by_signature.get(option.signature())
        if existing is None or option.price < existing.price:
            best_by_signature[option.signature()] = option
    return list(best_by_signature.values())


def dedupe_round_trip_options(options: list[FlightOption]) -> list[FlightOption]:
    best_by_signature: dict[tuple[Any, ...], FlightOption] = {}
    for option in options:
        existing = best_by_signature.get(option.signature())
        if existing is None or option.estimated_price < existing.estimated_price:
            best_by_signature[option.signature()] = option
    return list(best_by_signature.values())


def inconvenience_score(
    option: FlightOption,
    *,
    ideal_layover_minutes: int = DEFAULT_IDEAL_LAYOVER_MINUTES,
) -> int:
    total_minutes = option.total_trip_minutes
    layover_penalty = 0

    for layover_minutes in (
        option.outbound.layover_minutes,
        option.inbound.layover_minutes,
    ):
        if layover_minutes is None:
            layover_penalty += 300
            continue
        difference = abs(layover_minutes - ideal_layover_minutes)
        if layover_minutes < 90:
            difference += (90 - layover_minutes) * 3
        if layover_minutes > 360:
            difference += (layover_minutes - 360) * 2
        layover_penalty += difference

    return total_minutes + layover_penalty


def enrich_options(options: list[FlightOption]) -> list[FlightOption]:
    if not options:
        return []

    cheapest_price = min(option.estimated_price for option in options)
    enriched: list[FlightOption] = []
    for option in options:
        enriched.append(
            replace(
                option,
                convenience_score=inconvenience_score(option),
                price_gap=round(option.estimated_price - cheapest_price, 2),
            )
        )
    return enriched


def find_best_options(
    options: list[FlightOption],
    *,
    price_margin: float,
    top: int,
) -> list[FlightOption]:
    enriched = enrich_options(options)
    if not enriched or top < 1:
        return []

    within_margin = [option for option in enriched if option.price_gap <= price_margin]
    ranked_pool = within_margin or enriched
    ranked_pool.sort(
        key=lambda option: (
            option.convenience_score,
            option.estimated_price,
            option.departure_date,
            option.return_date,
        )
    )
    return ranked_pool[:top]


def cheapest_option(options: list[FlightOption]) -> FlightOption | None:
    enriched = enrich_options(options)
    if not enriched:
        return None
    return min(enriched, key=lambda option: (option.estimated_price, option.convenience_score))


def build_text_report(
    *,
    config: FlightSearchConfig,
    search_result: FlightSearchResult,
    ranked_options: list[FlightOption],
) -> str:
    lines = [
        f"Search: {config.origin} -> {config.destination} via {config.via} on both directions",
        f"Departure window: {config.depart_start.isoformat()} to {config.depart_end.isoformat()}",
        f"Return window: {config.return_start.isoformat()} to {config.return_end.isoformat()}",
        "Source: Google Flights public one-way results (no API key)",
        f"Price model: estimated round trip by adding one-way fares in {config.currency}",
        f"Matching round-trip combinations found: {len(search_result.options)}",
        f"Date pairs checked: {len(iter_date_pairs(config.depart_start, config.depart_end, config.return_start, config.return_end))}",
    ]

    if search_result.errors:
        lines.append(f"Search errors skipped: {len(search_result.errors)}")

    if not ranked_options:
        lines.append("")
        lines.append("No matching one-stop NRT options were found for both directions.")
        return "\n".join(lines)

    cheapest = cheapest_option(search_result.options)
    lines.append("")
    lines.append(
        f"Best convenience within {config.currency} {config.price_margin:,.2f} of the cheapest estimate:"
    )
    lines.append(format_option(ranked_options[0]))

    if cheapest is not None:
        lines.append("")
        lines.append("Cheapest estimated option:")
        lines.append(format_option(cheapest))

    if len(ranked_options) > 1:
        lines.append("")
        lines.append("Top ranked options:")
        for index, option in enumerate(ranked_options, start=1):
            lines.append(f"{index}. {single_line_summary(option)}")

    return "\n".join(lines)


def format_option(option: FlightOption) -> str:
    return "\n".join(
        [
            f"  estimated total: {option.currency} {option.estimated_price:,.2f} ({price_gap_label(option.price_gap)}) | {option.departure_date.isoformat()} -> {option.return_date.isoformat()}",
            f"  total travel: {format_minutes(option.total_trip_minutes)} | layovers: {format_optional_minutes(option.outbound.layover_minutes)} outbound, {format_optional_minutes(option.inbound.layover_minutes)} inbound",
            f"  outbound: {option.outbound.departure_label} {option.outbound.origin} -> {option.outbound.arrival_label} {option.outbound.destination} | via {option.outbound.connection_airport} | {', '.join(option.outbound.carriers)} | one-way {option.currency} {option.outbound.price:,.2f}",
            f"  inbound: {option.inbound.departure_label} {option.inbound.origin} -> {option.inbound.arrival_label} {option.inbound.destination} | via {option.inbound.connection_airport} | {', '.join(option.inbound.carriers)} | one-way {option.currency} {option.inbound.price:,.2f}",
        ]
    )


def single_line_summary(option: FlightOption) -> str:
    return (
        f"{option.currency} {option.estimated_price:,.2f} ({price_gap_label(option.price_gap)}) | "
        f"{option.departure_date.isoformat()} -> {option.return_date.isoformat()} | "
        f"travel {format_minutes(option.total_trip_minutes)} | "
        f"layovers {format_optional_minutes(option.outbound.layover_minutes)} / {format_optional_minutes(option.inbound.layover_minutes)}"
    )


def price_gap_label(price_gap: float) -> str:
    if price_gap <= 0:
        return "cheapest"
    return f"+{price_gap:,.2f}"


def format_minutes(total_minutes: int) -> str:
    hours, minutes = divmod(total_minutes, 60)
    return f"{hours}h {minutes:02d}m"


def format_optional_minutes(total_minutes: int | None) -> str:
    if total_minutes is None:
        return "unknown"
    return format_minutes(total_minutes)
