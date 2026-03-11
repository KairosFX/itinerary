from datetime import date

from selectolax.lexbor import LexborHTMLParser

from app.flight_finder import (
    FlightOption,
    FlightSegment,
    FlightSearchConfig,
    FlightSearchResult,
    OneWayOption,
    build_text_report,
    enrich_options,
    find_best_options,
    iter_date_pairs,
    one_way_option_from_card,
    parse_duration_text,
    parse_itinerary_segments,
    parse_layover_minutes,
    parse_price_amount,
    parse_stop_summary,
)


def make_one_way(
    *,
    travel_date: str,
    origin: str,
    destination: str,
    carriers: tuple[str, ...],
    connection_airport: str,
    layover_minutes: int,
    duration_minutes: int,
    price: float,
) -> OneWayOption:
    first = FlightSegment(
        origin=origin,
        destination=connection_airport,
        carrier_code="WS" if origin == "YYC" else "JL",
        flight_number="80" if origin == "YYC" else "746",
        flight_date=date.fromisoformat(travel_date),
    )
    second = FlightSegment(
        origin=connection_airport,
        destination=destination,
        carrier_code="JL" if destination == "MNL" else "WS",
        flight_number="745" if destination == "MNL" else "79",
        flight_date=date.fromisoformat(travel_date),
    )
    return OneWayOption(
        travel_date=date.fromisoformat(travel_date),
        origin=origin,
        destination=destination,
        carriers=carriers,
        segments=(first, second),
        departure_label="2:50 PM",
        arrival_label="9:40 PM +1",
        duration_minutes=duration_minutes,
        stops=1,
        connection_airport=connection_airport,
        layover_minutes=layover_minutes,
        price=price,
        currency="CAD",
    )


def make_round_trip(
    *,
    departure_date: str,
    return_date: str,
    estimated_price: float,
    outbound_duration: int,
    inbound_duration: int,
    outbound_layover: int,
    inbound_layover: int,
) -> FlightOption:
    outbound = make_one_way(
        travel_date=departure_date,
        origin="YYC",
        destination="MNL",
        carriers=("WestJet", "JAL"),
        connection_airport="NRT",
        layover_minutes=outbound_layover,
        duration_minutes=outbound_duration,
        price=estimated_price / 2,
    )
    inbound = make_one_way(
        travel_date=return_date,
        origin="MNL",
        destination="YYC",
        carriers=("JAL", "WestJet"),
        connection_airport="NRT",
        layover_minutes=inbound_layover,
        duration_minutes=inbound_duration,
        price=estimated_price / 2,
    )
    return FlightOption(
        departure_date=date.fromisoformat(departure_date),
        return_date=date.fromisoformat(return_date),
        currency="CAD",
        estimated_price=estimated_price,
        outbound=outbound,
        inbound=inbound,
    )


def test_iter_date_pairs_expands_all_valid_combinations() -> None:
    pairs = iter_date_pairs(
        date(2026, 6, 30),
        date(2026, 7, 1),
        date(2026, 8, 24),
        date(2026, 8, 25),
    )

    assert pairs == [
        (date(2026, 6, 30), date(2026, 8, 24)),
        (date(2026, 6, 30), date(2026, 8, 25)),
        (date(2026, 7, 1), date(2026, 8, 24)),
        (date(2026, 7, 1), date(2026, 8, 25)),
    ]


def test_parse_duration_text_handles_hours_and_minutes() -> None:
    assert parse_duration_text("16 hr 50 min") == 1010
    assert parse_duration_text("19 hr") == 1140
    assert parse_duration_text("55 min") == 55


def test_parse_stop_summary_reads_nrt_connection() -> None:
    assert parse_stop_summary("1 stop in NRT") == (1, "NRT")
    assert parse_stop_summary("Nonstop") == (None, None)


def test_parse_price_amount_removes_currency_symbols() -> None:
    assert parse_price_amount("CA$1,357") == 1357.0


def test_parse_itinerary_segments_reads_google_travelimpact_url() -> None:
    segments = parse_itinerary_segments(
        "https://www.travelimpactmodel.org/lookup/flight?itinerary=YYC-NRT-WS-80-20260630,NRT-MNL-JL-745-20260701"
    )

    assert [segment.label for segment in segments] == [
        "WS80 YYC->NRT 2026-06-30",
        "JL745 NRT->MNL 2026-07-01",
    ]


def test_parse_layover_minutes_uses_google_aria_label() -> None:
    aria_label = (
        "From 1357 Canadian dollars. 1 stop flight with WestJet and JAL. "
        "Total duration 16 hr 50 min. Layover (1 of 1) is a 1 hr 40 min layover "
        "at Narita International Airport in Tokyo."
    )

    assert parse_layover_minutes(aria_label) == 100


def test_one_way_option_from_card_parses_nrt_result() -> None:
    html = """
    <li class="pIav2d">
      <div class="JMc5Xc" aria-label="From 1357 Canadian dollars. 1 stop flight with WestJet and JAL. Leaves Calgary International Airport at 2:50 PM on Tuesday, June 30 and arrives at Ninoy Aquino International Airport at 9:40 PM on Wednesday, July 1. Total duration 16 hr 50 min. Layover (1 of 1) is a 1 hr 40 min layover at Narita International Airport in Tokyo."></div>
      <div class="YMlIz ogfYpf XeyHJ">2:50 PM</div>
      <div class="YMlIz ogfYpf h7Rse">9:40 PM <span class="bOzv6">+1</span></div>
      <div class="YMlIz FpEdX"><span>CA$1,357</span></div>
      <div class="ix02Db tdMWuf">
        <span class="ogfYpf">1 stop in NRT</span>
        <span class="ogfYpf">16 hr 50 min</span>
      </div>
      <span class="zD7ybd">WestJet, JAL</span>
      <div class="NZRfve E8UxCd" data-travelimpactmodelwebsiteurl="https://www.travelimpactmodel.org/lookup/flight?itinerary=YYC-NRT-WS-80-20260630,NRT-MNL-JL-745-20260701"></div>
    </li>
    """
    card = LexborHTMLParser(html).css_first("li.pIav2d")

    option = one_way_option_from_card(
        card,
        travel_date=date(2026, 6, 30),
        origin="YYC",
        destination="MNL",
        currency="CAD",
    )

    assert option is not None
    assert option.connection_airport == "NRT"
    assert option.layover_minutes == 100
    assert option.duration_minutes == 1010
    assert option.price == 1357.0
    assert option.carriers == ("WestJet", "JAL")


def test_find_best_options_prefers_convenience_within_margin() -> None:
    cheapest = make_round_trip(
        departure_date="2026-06-30",
        return_date="2026-08-24",
        estimated_price=6456.0,
        outbound_duration=1010,
        inbound_duration=995,
        outbound_layover=100,
        inbound_layover=180,
    )
    better_timing = make_round_trip(
        departure_date="2026-07-01",
        return_date="2026-08-25",
        estimated_price=6580.0,
        outbound_duration=960,
        inbound_duration=980,
        outbound_layover=120,
        inbound_layover=165,
    )
    too_expensive = make_round_trip(
        departure_date="2026-07-02",
        return_date="2026-08-26",
        estimated_price=7025.0,
        outbound_duration=930,
        inbound_duration=950,
        outbound_layover=120,
        inbound_layover=120,
    )

    ranked = find_best_options(
        [cheapest, better_timing, too_expensive],
        price_margin=200.0,
        top=3,
    )

    assert [option.departure_date.isoformat() for option in ranked] == [
        "2026-07-01",
        "2026-06-30",
    ]


def test_enrich_options_sets_price_gap_from_cheapest_estimate() -> None:
    cheapest = make_round_trip(
        departure_date="2026-06-30",
        return_date="2026-08-24",
        estimated_price=6456.0,
        outbound_duration=1010,
        inbound_duration=995,
        outbound_layover=100,
        inbound_layover=180,
    )
    pricier = make_round_trip(
        departure_date="2026-07-01",
        return_date="2026-08-25",
        estimated_price=6580.5,
        outbound_duration=1010,
        inbound_duration=995,
        outbound_layover=100,
        inbound_layover=180,
    )

    enriched = enrich_options([cheapest, pricier])

    assert [option.price_gap for option in enriched] == [0.0, 124.5]


def test_text_report_labels_google_one_way_price_model() -> None:
    option = make_round_trip(
        departure_date="2026-06-30",
        return_date="2026-08-24",
        estimated_price=6456.0,
        outbound_duration=1010,
        inbound_duration=995,
        outbound_layover=100,
        inbound_layover=180,
    )
    config = FlightSearchConfig(
        origin="YYC",
        destination="MNL",
        via="NRT",
        depart_start=date(2026, 6, 30),
        depart_end=date(2026, 7, 9),
        return_start=date(2026, 8, 24),
        return_end=date(2026, 8, 29),
    )
    report = build_text_report(
        config=config,
        search_result=FlightSearchResult(options=[option], errors=[]),
        ranked_options=[option],
    )

    assert "Google Flights public one-way results" in report
    assert "estimated round trip by adding one-way fares" in report
