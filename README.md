# Flight Convenience Finder

This project searches public Google Flights one-way results and combines outbound and inbound fares to estimate a round trip.

The current defaults are set for:

- `YYC` to `MNL`
- exactly one stop
- `NRT` as the connection airport on both outbound and inbound travel
- departure dates from `2026-06-30` to `2026-07-09`
- return dates from `2026-08-24` to `2026-08-29`

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -e .[dev]
```

## Run the search

```bash
python3 -m app.main --price-margin 200 --top 8
```

Useful flags:

- `--price-margin 200` keeps only results up to CAD 200 above the cheapest estimate before ranking by convenience.
- `--top 8` prints more candidates.
- `--max-options-per-day 4` keeps up to four `NRT` one-way options per date.
- `--json` prints machine-readable output.
- `--currency USD` changes the requested Google Flights currency.

## Important pricing note

This no-key version estimates the round trip by adding:

1. the outbound one-way price from `YYC` to `MNL`
2. the return one-way price from `MNL` to `YYC`

That preserves your exact `NRT` connection filter, but it is not the same thing as a single booked round-trip fare. Use it as a ranking and comparison tool, not a final booking quote.

## Example

```bash
python3 -m app.main \
  --origin YYC \
  --destination MNL \
  --via NRT \
  --depart-start 2026-06-30 \
  --depart-end 2026-07-09 \
  --return-start 2026-08-24 \
  --return-end 2026-08-29 \
  --price-margin 200 \
  --top 5
```

## How ranking works

1. Search one-way Google Flights results for every departure date in the outbound window.
2. Search one-way Google Flights results for every return date in the return window.
3. Keep only itineraries with exactly one stop and `NRT` as the connection airport.
4. Combine outbound and inbound one-way options into estimated round trips.
5. Find the cheapest estimated total.
6. Keep trips within your chosen `--price-margin`.
7. Rank those trips by total travel time plus penalties for awkward layovers.

If nothing lands inside the margin, the script falls back to ranking all valid matches by convenience.

## Tests

```bash
python3 -m pytest
```
