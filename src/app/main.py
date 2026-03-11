from __future__ import annotations

import argparse
import sys
from datetime import date

from app.flight_finder import (
    FlightSearchConfig,
    FlightSearchError,
    GoogleFlightsClient,
    build_text_report,
    find_best_options,
)


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Search no-key Google Flights results for YYC -> MNL one-stop NRT "
            "options and rank the most convenient combinations that stay close "
            "to the cheapest estimated total."
        )
    )
    parser.add_argument("--origin", default="YYC", help="Departure airport IATA code.")
    parser.add_argument(
        "--destination", default="MNL", help="Arrival airport IATA code."
    )
    parser.add_argument(
        "--via",
        default="NRT",
        help="Required connection airport IATA code on both outbound and inbound trips.",
    )
    parser.add_argument(
        "--depart-start",
        type=date.fromisoformat,
        default=date(2026, 6, 30),
        help="First allowed departure date in YYYY-MM-DD format.",
    )
    parser.add_argument(
        "--depart-end",
        type=date.fromisoformat,
        default=date(2026, 7, 9),
        help="Last allowed departure date in YYYY-MM-DD format.",
    )
    parser.add_argument(
        "--return-start",
        type=date.fromisoformat,
        default=date(2026, 8, 24),
        help="First allowed return date in YYYY-MM-DD format.",
    )
    parser.add_argument(
        "--return-end",
        type=date.fromisoformat,
        default=date(2026, 8, 29),
        help="Last allowed return date in YYYY-MM-DD format.",
    )
    parser.add_argument(
        "--adults", type=int, default=1, help="Number of adult travellers."
    )
    parser.add_argument(
        "--currency",
        default="CAD",
        help="Price currency to request from Google Flights, for example CAD or USD.",
    )
    parser.add_argument(
        "--price-margin",
        type=float,
        default=200.0,
        help="How far above the cheapest result a flight can be and still count as 'close in price'.",
    )
    parser.add_argument(
        "--top",
        type=int,
        default=5,
        help="How many ranked options to display in the summary.",
    )
    parser.add_argument(
        "--max-options-per-day",
        type=int,
        default=4,
        help="Maximum NRT one-way options to keep per date after deduping.",
    )
    parser.add_argument(
        "--request-delay",
        type=float,
        default=0.15,
        help="Seconds to wait between Google Flights requests.",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Print ranked results as JSON instead of a text report.",
    )
    return parser.parse_args(argv)


def build_config(args: argparse.Namespace) -> FlightSearchConfig:
    return FlightSearchConfig(
        origin=args.origin.upper(),
        destination=args.destination.upper(),
        via=args.via.upper(),
        depart_start=args.depart_start,
        depart_end=args.depart_end,
        return_start=args.return_start,
        return_end=args.return_end,
        adults=args.adults,
        currency=args.currency.upper(),
        price_margin=args.price_margin,
        max_options_per_day=args.max_options_per_day,
    )


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)

    try:
        config = build_config(args)
        client = GoogleFlightsClient(request_delay_seconds=args.request_delay)
        search_result = client.search(config)
        ranked_options = find_best_options(
            search_result.options,
            price_margin=config.price_margin,
            top=args.top,
        )
    except FlightSearchError as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 2

    if args.json:
        print(search_result.to_json(ranked_options))
        return 0

    print(
        build_text_report(
            config=config,
            search_result=search_result,
            ranked_options=ranked_options,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
