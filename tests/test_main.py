from datetime import date

from app.main import build_config, parse_args


def test_parse_args_uses_trip_defaults() -> None:
    args = parse_args([])

    assert args.origin == "YYC"
    assert args.destination == "MNL"
    assert args.via == "NRT"
    assert args.depart_start == date(2026, 6, 30)
    assert args.depart_end == date(2026, 7, 9)
    assert args.return_start == date(2026, 8, 24)
    assert args.return_end == date(2026, 8, 29)
    assert args.max_options_per_day == 4


def test_build_config_upcases_codes() -> None:
    args = parse_args(["--origin", "yyc", "--destination", "mnl", "--via", "nrt"])
    config = build_config(args)

    assert config.origin == "YYC"
    assert config.destination == "MNL"
    assert config.via == "NRT"
