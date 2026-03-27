const languageButtons = document.querySelectorAll("[data-set-language]");
const themeButtons = document.querySelectorAll("[data-set-theme]");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const sectionTabs = Array.from(document.querySelectorAll("[data-panel-target]"));
const contentPanels = Array.from(document.querySelectorAll("[data-panel]"));
const siteHeader = document.querySelector(".site-header");
const headerAccessoryGroups = Array.from(document.querySelectorAll(".language-switcher, .theme-switcher"));
const mainContent = document.querySelector("#main-content");
const siteFooter = document.querySelector(".site-footer");
const sequenceNotice = document.querySelector("[data-sequence-notice]");
const dayCards = Array.from(document.querySelectorAll(".day-card[data-day]"));
const dayGrids = Array.from(document.querySelectorAll(".day-grid"));
const progressItems = Array.from(document.querySelectorAll("[data-progress-item]"));
const progressTimeline = document.querySelector("[data-progress-timeline]");
const progressCurrentDayNode = document.querySelector("[data-progress-current-day]");
const progressTotalDaysNode = document.querySelector("[data-progress-total-days]");
const progressOverviewFill = document.querySelector("[data-progress-overview-fill]");
const progressOverviewCaptions = document.querySelectorAll(".progress-overview__caption [data-language]");
const jumpCurrentDayButton = document.querySelector("[data-jump-current-day]");
const resetProgressOpenButtons = Array.from(document.querySelectorAll("[data-reset-progress-open]"));
const resetProgressModal = document.querySelector("[data-reset-progress-modal]");
const resetProgressCancelButton = document.querySelector("[data-reset-progress-cancel]");
const resetProgressConfirmButton = document.querySelector("[data-reset-progress-confirm]");
const transitDetailModal = document.querySelector("[data-transit-detail-modal]");
const transitDetailCloseButtons = Array.from(document.querySelectorAll("[data-transit-detail-close]"));
const transitDetailTagNodes = Array.from(
  document.querySelectorAll("[data-transit-detail-tag-language]")
);
const transitDetailTitleNode = document.querySelector("[data-transit-detail-title]");
const transitDetailSummaryNode = document.querySelector("[data-transit-detail-summary]");
const transitDetailMetaNode = document.querySelector("[data-transit-detail-meta]");
const transitDetailSectionsNode = document.querySelector("[data-transit-detail-sections]");
const transitDetailActionLink = document.querySelector("[data-transit-detail-action]");
const backToTopButtons = document.querySelectorAll("[data-back-to-top]");
const budgetNotesCard = document.querySelector("[data-budget-notes-card]");
const budgetStatusNode = document.querySelector("[data-budget-status]");
const budgetSummaryNode = document.querySelector("[data-budget-summary]");
const budgetBreakdownNode = document.querySelector("[data-budget-breakdown]");
const budgetSourceMetaNode = document.querySelector("[data-budget-source-meta]");
const budgetSourcesNode = document.querySelector("[data-budget-sources]");
const budgetDaySelectorNode = document.querySelector("[data-budget-day-selector]");
const budgetDaysNode = document.querySelector("[data-budget-days]");
const tripNotesGridNode = document.querySelector("[data-trip-notes-grid]");
const budgetResetButtons = Array.from(document.querySelectorAll("[data-budget-reset-all]"));
const budgetTravelersInput = document.querySelector("[data-budget-travelers]");
const budgetAccommodationShareModeInput = document.querySelector("[data-budget-share-mode]");
const budgetAccommodationShareCountField = document.querySelector("[data-budget-share-count-field]");
const budgetAccommodationShareCountInput = document.querySelector("[data-budget-share-count]");
const budgetIncludeExtrasInput = document.querySelector("[data-budget-include-extras]");
const packingSectionCards = Array.from(document.querySelectorAll("[data-packing-section]"));
const packingMarkAllButtons = Array.from(document.querySelectorAll("[data-packing-mark-all-global]"));
const packingResetButtons = Array.from(document.querySelectorAll("[data-packing-reset-all]"));
const offlineToolsCard = document.querySelector("[data-offline-tools]");
const offlineStatusNode = document.querySelector("[data-offline-status]");
const offlineMetaNode = document.querySelector("[data-offline-meta]");
const offlineInstallButton = document.querySelector("[data-offline-install]");
const offlineDownloadLink = document.querySelector("[data-offline-download]");
const routeMapCard = document.querySelector(".route-map");
const routeMapPreviewNode = document.querySelector("[data-route-map-preview]");
const routeMapPreviewCanvas = document.querySelector("[data-route-map-preview-canvas]");
const routeMapPreviewStatusNode = document.querySelector("[data-route-map-preview-status]");
const routeMapStopsNode = document.querySelector("[data-route-map-stops]");
const routeMapExplorerNode = document.querySelector("[data-route-map-explorer]");
const dayCardMap = new Map(dayCards.map((card) => [card.dataset.day, card]));
const progressItemMap = new Map(progressItems.map((item) => [item.dataset.progressItem, item]));
const root = document.documentElement;
const aggressivePerformanceMode = false;
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
const compactViewportQuery = window.matchMedia("(max-width: 920px)");
const pageTitles = {
  en: "Japan Trip | Travel Guide",
  ja: "日本旅行 | 旅行ガイド"
};
const storageKey = "japan-trip-language";
const themeStorageKey = "japan-trip-theme";
const itineraryStateVersion = "2026-03-27-flight-home-v1";
const checklistStorageKey = `japan-trip-checklist-state-${itineraryStateVersion}`;
const completedHistoryStorageKey = `japan-trip-completed-history-${itineraryStateVersion}`;
const activePanelStorageKey = `japan-trip-active-panel-${itineraryStateVersion}`;
const bookingTransitStorageKey = `japan-trip-bookings-transit-state-${itineraryStateVersion}`;
const packingStorageKey = `japan-trip-packing-state-${itineraryStateVersion}`;
const budgetNotesStorageKey = `japan-trip-budget-notes-${itineraryStateVersion}`;
const fujiForecastSessionKey = `japan-trip-fuji-forecast-${itineraryStateVersion}`;
const queuedStorageWrites = new Map();
const headerReservedHeightFallbackPx = 156;
const timelineNodeTopRem = 1.36;
const timelineNodeSizeRem = 1.42;
const timelineLinkOverlapPx = 1;
const deferredGeometryReleaseDelayMs = 160;
const deferredNonCriticalLayoutTimeoutMs = 700;
const bookingTransitItemsDataUrl = "./assets/data/booking-transit-items.json";
const transitDetailsDataUrl = "./assets/data/transit-details.json";
const offlineSnapshotUrl = "./japan-escape-itinerary-offline.html";
const serviceWorkerUrl = "./service-worker.js";
const offlineBundleVersion = "2026-03-27-offline-v19";
const routeMapLibraryScriptUrl = "./assets/vendor/maplibre/maplibre-gl.js";
const routeMapLibraryStyleUrl = "./assets/vendor/maplibre/maplibre-gl.css";
const routeMapPmtilesScriptUrl = "./assets/vendor/protomaps/pmtiles.js";
const routeMapBasemapsScriptUrl = "./assets/vendor/protomaps/basemaps.js";
const routeMapPmtilesDataUrl = "./assets/data/japan-route-z7.pmtiles";
const routeMapProtomapsGlyphsUrl =
  "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf";
const routeMapProtomapsSpriteBaseUrl = "https://protomaps.github.io/basemaps-assets/sprites/v4";
const routeMapProtomapsAttribution =
  '<a href="https://github.com/protomaps/basemaps">Protomaps</a> © <a href="https://osm.org/copyright">OpenStreetMap</a>';
const offlineSnapshotMode = root.hasAttribute("data-offline-snapshot");
const inlineDataSelectors = {
  bookingTransit: "[data-booking-transit-inline]",
  budgetEstimate: "[data-budget-estimate-inline]",
  transitDetails: "[data-transit-details-inline]"
};
const budgetDefaultTravelerCount = 2;
const budgetTravelerCountMin = 1;
const budgetTravelerCountMax = 24;
const budgetSharedRoomOccupancy = 2;
const budgetAccommodationShareModeDefault = "all-travelers";
const budgetAccommodationShareModes = ["not-shared", "all-travelers", "custom"];
const budgetSourceUpdatedAt = "2026-03-27";
const budgetDisplayExchangeRates = {
  cadPerJpy: 1 / 109,
  usdPerJpy: 1 / 149
};
const budgetAssumptionCopy = {
  en:
    "The cost model now matches one fixed 7-day route: Osaka, Kyoto, Mt. Fuji area, and Tokyo. Route extras cover luggage forwarding, Fuji visibility pivots, the Tokyo handoff, and a light airport-day buffer.",
  ja:
    "費用モデルは、固定の7日間ルートである大阪、京都、富士エリア、東京に合わせて更新しました。ルート追加費用は、荷物配送、富士山の見え方に応じた動き直し、東京への受け渡し、帰国日の小さな追加費用を想定しています。"
};
const budgetCategoryDefinitions = [
  {
    id: "accommodation",
    label: { en: "Hotels / ryokan", ja: "宿泊" },
    rangeHint: {
      en: "Moves with the chosen stay selector and the route-fit hotel or ryokan quote band.",
      ja: "選んだ滞在タイプと、動線に合うホテル・旅館の価格帯で上下します。"
    }
  },
  {
    id: "intercityTransit",
    label: { en: "Intercity transit", ja: "都市間移動" },
    rangeHint: {
      en: "Most long legs are fixed, but Fuji-side fallback choices can push the higher band up.",
      ja: "長距離移動の大半は固定ですが、富士側の代替手段が必要だと高め帯が上がります。"
    }
  },
  {
    id: "localTransit",
    label: { en: "Local transit", ja: "現地移動" },
    rangeHint: {
      en: "Moves mostly on weather-flex and transfer-heavy local days.",
      ja: "主に天気優先日や乗り継ぎの多い日の現地移動で変わります。"
    }
  },
  {
    id: "ticketsAdmissions",
    label: { en: "Tickets / admissions", ja: "入場料・チケット" },
    rangeHint: {
      en: "Most tickets stay near official prices, with only timed-slot or option differences moving the range.",
      ja: "多くのチケットは公式料金に近く、時間帯や選ぶ券種でだけ差が出ます。"
    }
  },
  {
    id: "meals",
    label: { en: "Meals", ja: "食事" },
    rangeHint: {
      en: "Lean keeps simpler convenience-store or casual meals; high assumes fuller sightseeing-day spending.",
      ja: "控えめはコンビニや気軽な食事寄り、高めは観光日の食費を少し厚めに見ます。"
    }
  },
  {
    id: "baggage",
    label: { en: "Baggage", ja: "荷物対応" },
    rangeHint: {
      en: "Only changes when route extras are enabled.",
      ja: "ルート追加費用を有効にした時だけ動きます。"
    }
  },
  {
    id: "optionalExtras",
    label: { en: "Optional extras", ja: "任意追加" },
    rangeHint: {
      en: "Weather pivots and route add-ons stay outside the base total until you switch them on.",
      ja: "天候回避や追加ルート費用は、有効にするまで基本合計へ入りません。"
    }
  }
];
const budgetBucketDefinitions = [
  { id: "booked", label: { en: "Booked", ja: "予約前提" } },
  { id: "required", label: { en: "Required", ja: "必須" } },
  { id: "flexible", label: { en: "Flexible", ja: "変動" } },
  { id: "optional", label: { en: "Optional", ja: "任意" } },
  { id: "free", label: { en: "Free", ja: "無料" } }
];
const budgetStayTypeDefinitions = [
  { id: "hotel", label: { en: "Hotel", ja: "ホテル" } },
  { id: "ryokan", label: { en: "Ryokan", ja: "旅館" } },
  { id: "relative", label: { en: "Private / local stay", ja: "ローカル・プライベート滞在" } },
  { id: "none", label: { en: "No paid accommodation", ja: "有料宿泊なし" } }
];
const budgetStayOptionOrder = {
  relative: 0,
  hotel: 1,
  ryokan: 1,
  none: 2
};
const budgetStayDefinitions = {
  "osaka-compact-hotel": {
    id: "osaka-compact-hotel",
    type: "hotel",
    label: { en: "Osaka Minami route hotel", ja: "大阪ミナミ動線ホテル" },
    bucket: "booked",
    sourceGroup: "accommodation",
    area: { en: "Nishi-Shinsaibashi / Minami", ja: "西心斎橋・ミナミ" },
    property: { en: "Hearton Hotel Shinsaibashi", ja: "ハートンホテル心斎橋" },
    routeReason: {
      en: "Use this when you need a paid Osaka night. Nishi-Shinsaibashi / Minami keeps Day 1 Minami walking and Day 3 Osaka-side movement practical without paying for a less relevant Osaka district.",
      ja: "大阪で有料宿が必要な時はこの立地を使います。西心斎橋・ミナミなら、1日目のミナミ散策と3日目の大阪側の動きをまとめやすく、関係の薄い地区へ余計に払わずに済みます。"
    },
    cost: { mode: "perGroup", amount: 6200, sourceCostId: "osaka-compact-hotel" }
  },
  "kyoto-midrange-hotel": {
    id: "kyoto-midrange-hotel",
    type: "hotel",
    label: { en: "Kyoto East-access hotel", ja: "京都東側アクセス向きホテル" },
    bucket: "booked",
    sourceGroup: "accommodation",
    area: { en: "Shijo / Karasuma, Kyoto", ja: "京都・四条烏丸" },
    property: {
      en: "Hotel Resol Kyoto Shijo Muromachi",
      ja: "ホテルリソル京都 四条室町"
    },
    routeReason: {
      en: "Shijo / Karasuma works better than a generic Kyoto stay because it keeps the Day 2 Higashiyama side simple while giving cleaner subway, Hankyu, and JR options for Day 3 Arashiyama and the move back to Osaka.",
      ja: "四条烏丸は、ただの京都泊よりも実際の動線に合います。2日目の東山側へ動きやすく、3日目の嵐山と大阪戻りにも地下鉄・阪急・JRの選択肢を取りやすいからです。"
    },
    cost: { mode: "perGroup", amount: 13200, sourceCostId: "kyoto-midrange-hotel" }
  },
  "kawaguchiko-base-hotel": {
    id: "kawaguchiko-base-hotel",
    type: "hotel",
    label: { en: "Mt. Fuji area lake-access hotel", ja: "富士エリアの湖アクセスホテル" },
    bucket: "booked",
    sourceGroup: "accommodation",
    area: { en: "Kawaguchiko station -> lake corridor", ja: "河口湖駅から湖畔の動線" },
    property: { en: "HaoSTAY", ja: "HAOSTAY" },
    routeReason: {
      en: "This base keeps the Day 4 Mishima handoff, Chureito / Shimoyoshida, and Lake Kawaguchiko practical without paying for a remote resort location that fights the real station and bus flow.",
      ja: "この拠点なら、4日目の三島ハンドオフ、忠霊塔・下吉田、河口湖をまとめやすく、実際の駅・バス動線と離れた遠いリゾート立地へ余計に払わずに済みます。"
    },
    cost: { mode: "perGroup", amount: 15700, sourceCostId: "kawaguchiko-base-hotel" }
  },
  "tokyo-base-hotel": {
    id: "tokyo-base-hotel",
    type: "hotel",
    label: { en: "Shibuya-access Tokyo hotel", ja: "渋谷アクセス重視の東京ホテル" },
    bucket: "booked",
    sourceGroup: "accommodation",
    area: { en: "West Shibuya / Maruyamacho", ja: "渋谷西側・円山町" },
    property: { en: "EN HOTEL Shibuya", ja: "EN HOTEL Shibuya" },
    routeReason: {
      en: "Shibuya is the Day 5 arrival focus, and the same west-side base keeps the following Tokyo days cleaner than shifting districts mid-route.",
      ja: "渋谷は5日目の到着後の主役であり、この西側拠点のままなら、その後の東京日程も地区を変えずに進めやすくなります。"
    },
    cost: { mode: "perGroup", amount: 19820, sourceCostId: "tokyo-base-hotel" }
  },
  "relative-stay": {
    id: "relative-stay",
    type: "relative",
    label: { en: "Private / local stay", ja: "ローカル・プライベート滞在" },
    bucket: "free",
    sourceGroup: "assumptions",
    area: { en: "Local/private base", ja: "ローカル・プライベート拠点" },
    cost: { mode: "none", amount: 0 },
    formulaCopy: { en: "No room charge", ja: "宿泊費なし" },
    routeReason: {
      en: "Use this for any private or local stay already arranged. The accommodation cost stays free and the route-based hotel logic does not override it unless you deliberately switch stay type.",
      ja: "すでに決まっているローカル・プライベート滞在に使います。滞在タイプを明示的に切り替えない限り宿泊費は0円のままで、動線ベースのホテルロジックも上書きしません。"
    },
    assumption: {
      en: "Use this when a private or local stay is already arranged for that day.",
      ja: "その日にローカル・プライベート滞在がすでに決まっている時に使います。"
    }
  },
  "no-accommodation": {
    id: "no-accommodation",
    type: "none",
    label: { en: "No paid accommodation", ja: "有料宿泊なし" },
    bucket: "free",
    sourceGroup: "assumptions",
    area: { en: "No paid stay selected", ja: "有料宿泊を入れない日" },
    cost: { mode: "none", amount: 0 },
    formulaCopy: { en: "No room charge", ja: "宿泊費なし" },
    routeReason: {
      en: "Use this only when the day should carry no hotel or ryokan charge at all.",
      ja: "その日にホテルや旅館の費用をまったく入れない時だけ使います。"
    },
    assumption: {
      en: "Use this if the day does not need a paid room in the budget at all.",
      ja: "その日に有料の宿泊費を見積りへ入れない場合に使います。"
    }
  }
};
const budgetSourceGroups = [
  {
    id: "accommodation",
    title: { en: "Accommodation quotes", ja: "宿泊見積り" },
    summary: {
      en: "The base stay plan is now explicit: private/local or no-cost Osaka nights on Days 1 and 3 unless switched, Kyoto hotel on Day 2, one Mt. Fuji area stay on Day 4, Tokyo hotel nights on Days 5-6, and no paid stay by default on the Day 7 flight-home wrap-up.",
      ja: "基本の滞在計画を明示しました。1日目と3日目の大阪は、切り替えない限りローカル・プライベート滞在または宿泊費なし、2日目は京都ホテル、4日目は富士エリア宿泊、東京ホテルは5日目と6日目で、7日目は帰国日のため初期値では有料宿泊を入れていません。"
    },
    links: [
      {
        label: { en: "Osaka fallback hotel quote", ja: "大阪の代替ホテル見積り" },
        url: "https://www.expedia.co.jp/en/Osaka-Hotels-Hearton-Hotel-Shinsaibashi.h2544378.Hotel-Information"
      },
      {
        label: { en: "Kyoto hotel quote", ja: "京都ホテル見積り" },
        url: "https://www.expedia.co.jp/en/Kyoto-Hotels-Hotel-Resol-Kyoto-Shijo-Muromachi.h23196129.Hotel-Information"
      },
      {
        label: { en: "Mt. Fuji area hotel quote", ja: "富士エリアホテル見積り" },
        url: "https://www.expedia.co.jp/en/Fujikawaguchiko-Hotels-HaoSTAY.h42541370.Hotel-Information"
      },
      {
        label: { en: "Tokyo hotel quote", ja: "東京ホテル見積り" },
        url: "https://www.expedia.co.jp/en/Tokyo-Hotels-SHIBUYA-HOTEL-EN.h5394352.Hotel-Information"
      }
    ]
  },
  {
    id: "room-logic",
    title: { en: "Stay logic", ja: "滞在ロジック" },
    summary: {
      en: "The old model inflated totals by stretching the mid-route scenic section and the Tokyo finish. The new model stores a reusable stay type per day, so private/local Osaka nights remain free until you deliberately switch them.",
      ja: "以前のモデルは、中盤の景色区間と東京の締めを引き延ばして合計を膨らませていました。新しいモデルは日ごとに再利用可能な滞在タイプを持つため、大阪のローカル・プライベート滞在は意図して切り替えるまで無料のままです。"
    },
    links: []
  },
  {
    id: "core-transit",
    title: { en: "Core transit checks", ja: "主要移動の確認先" },
    summary: {
      en: "Day 4 now carries the full Mt. Fuji area block through Mishima, Chureito / Shimoyoshida, and Lake Kawaguchiko. Day 5 then starts Tokyo cleanly, with direct bus or rail chosen by timing.",
      ja: "4日目は三島、忠霊塔・下吉田、河口湖までを含む富士エリアのまとまりにし、5日目は東京へきれいに入る流れへ整理しました。東京入りは時刻に合わせて直通バスまたは鉄道を選びます。"
    },
    links: [
      {
        label: { en: "Smart EX booking", ja: "Smart EX 予約" },
        url: "https://smart-ex.jp/en/index.php"
      },
      {
        label: { en: "Oversized baggage rule", ja: "特大荷物ルール" },
        url: "https://global.jr-central.co.jp/en/info/oversized-baggage/index.html"
      },
      {
        label: { en: "Mishima -> Kawaguchiko bus", ja: "三島 -> 河口湖バス" },
        url: "https://sekitori.jp/en/news/20250314_134/"
      },
      {
        label: { en: "Tokyo <-> Kawaguchiko bus", ja: "東京 <-> 河口湖バス" },
        url: "https://highway-buses.jp/index.php"
      },
      {
        label: { en: "Fujikyu Railway fare", ja: "富士急行線運賃" },
        url: "https://e.fujikyu-railway.jp/fare/"
      }
    ]
  },
  {
    id: "tickets",
    title: { en: "Tickets + timing", ja: "チケットと時間帯" },
    summary: {
      en: "Shibuya Sky and Tokyo Skytree are the main timed tickets in the fixed route, while Kaiyukan remains a simpler Day 3 same-day ticket check.",
      ja: "固定ルートで主な時間指定チケットになるのは渋谷スカイと東京スカイツリーで、海遊館は3日目に当日判断しやすいチケットとして残しています。"
    },
    links: [
      { label: { en: "Kaiyukan official tickets", ja: "海遊館公式チケット" }, url: "https://pop.kaiyukan.com/info/admission/" },
      { label: { en: "Shibuya Sky official tickets", ja: "渋谷スカイ公式チケット" }, url: "https://www.shibuya-scramble-square.com/sky/ticket/" },
      { label: { en: "Tokyo Skytree official tickets", ja: "東京スカイツリー公式チケット" }, url: "https://www.tokyo-skytree.jp/en/ticket/individual/" }
    ]
  },
  {
    id: "meals",
    title: { en: "Meal assumptions", ja: "食費の前提" },
    summary: {
      en: "Meals were toned down to a realistic Japan travel baseline: one cheap breakfast, one casual lunch, and one simple dinner, with only modest sightseeing-day variation.",
      ja: "食費は、現実的な日本旅行の基準まで下げました。安い朝食、気軽な昼食、普通の夕食を基本にし、観光日の増減も控えめです。"
    },
    links: [
      { label: { en: "Matsuya menu", ja: "松屋メニュー" }, url: "https://www.matsuyafoods.co.jp/english/menu/gyumeshi/index.html" },
      { label: { en: "Sukiya menu", ja: "すき家メニュー" }, url: "https://www.sukiya.jp/sp/en/" },
      { label: { en: "Tokyo benchmarks", ja: "東京の相場" }, url: "https://www.numbeo.com/cost-of-living/in/Tokyo" }
    ]
  }
];
const budgetDayDefinitions = [
  {
    day: 1,
    defaultStayId: "relative-stay",
    stayOptions: ["relative-stay", "osaka-compact-hotel", "no-accommodation"],
    title: { en: "Day 1 - Osaka", ja: "1日目・大阪" },
    subtitle: { en: "Arrival, Minami, and first-night walk", ja: "到着後のミナミと初夜の街歩き" },
    items: [
      { label: { en: "Osaka city hop into Minami", ja: "ミナミへ入る大阪市内移動" }, category: "localTransit", bucket: "required", sourceGroup: "core-transit", cost: { mode: "perPerson", amount: 300 } },
      { label: { en: "Dotonbori", ja: "道頓堀" }, category: "ticketsAdmissions", bucket: "free", sourceGroup: "assumptions", cost: { mode: "none", amount: 0 } },
      { label: { en: "Shinsaibashi", ja: "心斎橋" }, category: "ticketsAdmissions", bucket: "free", sourceGroup: "assumptions", cost: { mode: "none", amount: 0 } },
      {
        label: { en: "Arrival-day meals", ja: "到着日の食事" },
        category: "meals",
        bucket: "flexible",
        sourceGroup: "meals",
        cost: { mode: "perPerson", amount: 1400, range: { lean: 1100, expected: 1400, high: 1900 } }
      },
      { label: { en: "Nightlife", ja: "夜の街歩き" }, category: "optionalExtras", bucket: "free", sourceGroup: "assumptions", cost: { mode: "none", amount: 0 } }
    ]
  },
  {
    day: 2,
    defaultStayId: "kyoto-midrange-hotel",
    stayOptions: ["kyoto-midrange-hotel", "relative-stay", "no-accommodation"],
    title: { en: "Day 2 - Kyoto East", ja: "2日目・京都東側" },
    subtitle: { en: "Kyoto hotel night after the east-side temple cluster", ja: "東山の日を終えて京都ホテルへ泊まる" },
    items: [
      { label: { en: "Osaka -> Kyoto rail", ja: "大阪 -> 京都の鉄道移動" }, category: "intercityTransit", bucket: "required", sourceGroup: "core-transit", cost: { mode: "perPerson", amount: 580 } },
      { label: { en: "Kyoto Subway + Bus 1-day ticket", ja: "京都 地下鉄・バス1日券" }, category: "localTransit", bucket: "required", sourceGroup: "core-transit", cost: { mode: "perPerson", amount: 1100 } },
      { label: { en: "Kiyomizu-dera", ja: "清水寺" }, category: "ticketsAdmissions", bucket: "required", sourceGroup: "tickets", cost: { mode: "perPerson", amount: 500 } },
      { label: { en: "Ninenzaka", ja: "二年坂" }, category: "ticketsAdmissions", bucket: "free", sourceGroup: "assumptions", cost: { mode: "none", amount: 0 } },
      { label: { en: "Yasaka Pagoda", ja: "八坂の塔" }, category: "ticketsAdmissions", bucket: "free", sourceGroup: "assumptions", cost: { mode: "none", amount: 0 } },
      { label: { en: "Gion", ja: "祇園" }, category: "ticketsAdmissions", bucket: "free", sourceGroup: "assumptions", cost: { mode: "none", amount: 0 } },
      { label: { en: "Nanzen-ji", ja: "南禅寺" }, category: "ticketsAdmissions", bucket: "free", sourceGroup: "assumptions", cost: { mode: "none", amount: 0 } },
      {
        label: { en: "Kyoto sightseeing meals + snacks", ja: "京都観光日の食事と軽食" },
        category: "meals",
        bucket: "flexible",
        sourceGroup: "meals",
        cost: { mode: "perPerson", amount: 1800, range: { lean: 1400, expected: 1800, high: 2600 } }
      }
    ]
  },
  {
    day: 3,
    defaultStayId: "relative-stay",
    stayOptions: ["relative-stay", "osaka-compact-hotel", "no-accommodation"],
    title: { en: "Day 3 - Arashiyama -> Osaka", ja: "3日目・嵐山から大阪" },
    subtitle: { en: "Arashiyama in the morning, Osaka waterfront after", ja: "朝は嵐山、そのあと大阪ベイエリア" },
    items: [
      { label: { en: "Kyoto -> Arashiyama + Osaka rail", ja: "京都 -> 嵐山と大阪への鉄道移動" }, category: "intercityTransit", bucket: "required", sourceGroup: "core-transit", cost: { mode: "perPerson", amount: 980 } },
      { label: { en: "Tempozan local hop", ja: "天保山周辺の市内移動" }, category: "localTransit", bucket: "required", sourceGroup: "core-transit", cost: { mode: "perPerson", amount: 300 } },
      { label: { en: "Kaiyukan", ja: "海遊館" }, category: "ticketsAdmissions", bucket: "booked", sourceGroup: "tickets", cost: { mode: "perPerson", amount: 2300 } },
      {
        label: { en: "Final Osaka meals", ja: "大阪最後の食事" },
        category: "meals",
        bucket: "flexible",
        sourceGroup: "meals",
        cost: { mode: "perPerson", amount: 1600, range: { lean: 1300, expected: 1600, high: 2300 } }
      }
    ]
  },
  {
    day: 4,
    defaultStayId: "kawaguchiko-base-hotel",
    stayOptions: ["kawaguchiko-base-hotel", "relative-stay", "no-accommodation"],
    title: { en: "Day 4 - Mt. Fuji Area", ja: "4日目・富士エリア" },
    subtitle: { en: "Mishima, Chureito / Shimoyoshida, and Lake Kawaguchiko", ja: "三島、忠霊塔・下吉田、河口湖" },
    items: [
      { label: { en: "Shinkansen: Kyoto / Shin-Osaka -> Mishima", ja: "新幹線：京都・新大阪 -> 三島" }, category: "intercityTransit", bucket: "booked", sourceGroup: "core-transit", cost: { mode: "perPerson", amount: 11310, range: { lean: 10780, expected: 11310, high: 11310 } } },
      { label: { en: "Mishima -> Kawaguchiko bus", ja: "三島 -> 河口湖バス" }, category: "localTransit", bucket: "required", sourceGroup: "core-transit", cost: { mode: "perPerson", amount: 2500, range: { lean: 2300, expected: 2500, high: 2500 } } },
      { label: { en: "Chureito / Shimoyoshida", ja: "忠霊塔・下吉田" }, category: "ticketsAdmissions", bucket: "free", sourceGroup: "assumptions", cost: { mode: "none", amount: 0 } },
      { label: { en: "Lake Kawaguchiko", ja: "河口湖" }, category: "ticketsAdmissions", bucket: "free", sourceGroup: "assumptions", cost: { mode: "none", amount: 0 } },
      { label: { en: "Hotel / onsen check-in", ja: "ホテル・温泉チェックイン" }, category: "ticketsAdmissions", bucket: "free", sourceGroup: "assumptions", cost: { mode: "none", amount: 0 } },
      {
        label: { en: "Fuji-area day meals", ja: "富士エリア日の食事" },
        category: "meals",
        bucket: "flexible",
        sourceGroup: "meals",
        cost: { mode: "perPerson", amount: 1700, range: { lean: 1400, expected: 1700, high: 2400 } }
      },
      {
        label: { en: "Luggage handling buffer", ja: "荷物対応バッファ" },
        category: "baggage",
        bucket: "optional",
        sourceGroup: "assumptions",
        cost: { mode: "perPair", amount: 2500, range: { lean: 2000, expected: 2500, high: 3000 } }
      }
    ]
  },
  {
    day: 5,
    defaultStayId: "tokyo-base-hotel",
    stayOptions: ["tokyo-base-hotel", "relative-stay", "no-accommodation"],
    title: { en: "Day 5 - Tokyo / Shibuya", ja: "5日目・東京・渋谷" },
    subtitle: { en: "Tokyo arrival, Shibuya walk, and skyline night", ja: "東京到着、渋谷散策、夜景" },
    items: [
      {
        label: { en: "Transfer to Tokyo / Shibuya", ja: "東京・渋谷へ移動" },
        category: "intercityTransit",
        bucket: "booked",
        sourceGroup: "core-transit",
        cost: { mode: "perPerson", amount: 2200, range: { lean: 2100, expected: 2200, high: 4130 } }
      },
      { label: { en: "Tokyo hotel check-in", ja: "東京ホテルのチェックイン" }, category: "ticketsAdmissions", bucket: "free", sourceGroup: "assumptions", cost: { mode: "none", amount: 0 } },
      { label: { en: "Shibuya local hop", ja: "渋谷周辺の移動" }, category: "localTransit", bucket: "required", sourceGroup: "core-transit", cost: { mode: "perPerson", amount: 220 } },
      { label: { en: "Shibuya Crossing", ja: "渋谷交差点" }, category: "ticketsAdmissions", bucket: "free", sourceGroup: "assumptions", cost: { mode: "none", amount: 0 } },
      {
        label: { en: "Shibuya food walk", ja: "渋谷で食べ歩き" },
        category: "meals",
        bucket: "flexible",
        sourceGroup: "meals",
        cost: { mode: "perPerson", amount: 2000, range: { lean: 1600, expected: 2000, high: 3000 } }
      },
      {
        label: { en: "Shibuya Sky (evening slot)", ja: "渋谷スカイ（夕方以降の枠）" },
        category: "ticketsAdmissions",
        bucket: "booked",
        sourceGroup: "tickets",
        cost: { mode: "perPerson", amount: 3400, range: { lean: 3000, expected: 3400, high: 3900 } }
      }
    ]
  },
  {
    day: 6,
    defaultStayId: "tokyo-base-hotel",
    stayOptions: ["tokyo-base-hotel", "relative-stay", "no-accommodation"],
    title: { en: "Day 6 - Tokyo East / Full Day", ja: "6日目・東京東側の観光メイン日" },
    subtitle: { en: "Skytree, Solamachi, and Akihabara", ja: "スカイツリー、ソラマチ、秋葉原" },
    items: [
      { label: { en: "Tokyo subway day pass", ja: "東京サブウェイ1日券" }, category: "localTransit", bucket: "required", sourceGroup: "core-transit", cost: { mode: "perPerson", amount: 800, sourceCostId: "tokyo-subway-24h" } },
      {
        label: { en: "Tokyo Skytree", ja: "東京スカイツリー" },
        category: "ticketsAdmissions",
        bucket: "booked",
        sourceGroup: "tickets",
        cost: { mode: "perPerson", amount: 2100, range: { lean: 2100, expected: 2100, high: 3100 } }
      },
      { label: { en: "Tokyo Solamachi", ja: "東京ソラマチ" }, category: "ticketsAdmissions", bucket: "free", sourceGroup: "assumptions", cost: { mode: "none", amount: 0 } },
      { label: { en: "Akihabara", ja: "秋葉原" }, category: "ticketsAdmissions", bucket: "free", sourceGroup: "assumptions", cost: { mode: "none", amount: 0 } },
      {
        label: { en: "Tokyo east full-day meals", ja: "東京東側の観光日の食事" },
        category: "meals",
        bucket: "flexible",
        sourceGroup: "meals",
        cost: { mode: "perPerson", amount: 1900, range: { lean: 1500, expected: 1900, high: 2800 } }
      }
    ]
  },
  {
    day: 7,
    defaultStayId: "no-accommodation",
    stayOptions: ["no-accommodation", "tokyo-base-hotel", "relative-stay"],
    title: { en: "Day 7 - Imperial Palace, Shinjuku + flight home", ja: "7日目・皇居と新宿、そして帰国日" },
    subtitle: { en: "Imperial Palace, Shinjuku, and airport buffer", ja: "皇居、新宿、空港の余白" },
    items: [
      { label: { en: "Tokyo Imperial Palace", ja: "皇居" }, category: "ticketsAdmissions", bucket: "free", sourceGroup: "assumptions", cost: { mode: "none", amount: 0 } },
      { label: { en: "Shinjuku", ja: "新宿" }, category: "ticketsAdmissions", bucket: "free", sourceGroup: "assumptions", cost: { mode: "none", amount: 0 } },
      {
        label: { en: "Coffee / light meal buffer", ja: "軽い食事とコーヒー休憩" },
        category: "meals",
        bucket: "flexible",
        sourceGroup: "meals",
        cost: { mode: "perPerson", amount: 1300, range: { lean: 900, expected: 1300, high: 2000 } }
      },
      {
        label: { en: "Bag storage or handoff if needed", ja: "必要なら荷物預け・受け渡し" },
        category: "baggage",
        bucket: "optional",
        sourceGroup: "assumptions",
        cost: { mode: "perPerson", amount: 800, range: { lean: 500, expected: 800, high: 1200 } }
      },
      {
        label: { en: "Airport transfer reserve", ja: "空港移動の予備費" },
        category: "intercityTransit",
        bucket: "required",
        sourceGroup: "core-transit",
        cost: { mode: "perPerson", amount: 1600, range: { lean: 600, expected: 1600, high: 3400 } }
      }
    ]
  }
];
const tripNoteDefinitions = [
  {
    day: 1,
    title: { en: "Day 1 - Osaka", ja: "1日目・大阪" },
    summary: {
      en: "Keep arrival day easy around Minami: settle into Osaka, walk Dotonbori and Shinsaibashi, eat nearby, and let the first night be about finding your pace.",
      ja: "到着日はミナミ周辺で無理をせず、大阪へ入ってから道頓堀と心斎橋を歩き、近くで食事して、旅のリズムを整える日にします。"
    }
  },
  {
    day: 2,
    title: { en: "Day 2 - Kyoto East", ja: "2日目・京都東側" },
    summary: {
      en: "Keep Kyoto East as one clean walking day: Kiyomizu-dera, Ninenzaka, Yasaka Pagoda, Gion, and Nanzen-ji grouped on the same side so the route stays simple.",
      ja: "京都東側は、清水寺、二年坂、八坂の塔、祇園、南禅寺を同じ側でまとめて回る一日にし、動線を素直に保ちます。"
    }
  },
  {
    day: 3,
    title: { en: "Day 3 - Arashiyama, then Osaka", ja: "3日目・嵐山のあと大阪" },
    summary: {
      en: "Give Arashiyama its own morning instead of forcing it into Kyoto East, then return to Osaka for Kaiyukan, Tempozan, and one final Kansai night.",
      ja: "嵐山は京都東側へ詰め込まず、朝だけで独立させ、そのあと大阪へ戻って海遊館、天保山、最後の関西の夜へつなげます。"
    }
  },
  {
    day: 4,
    title: { en: "Day 4 - Mt. Fuji Area", ja: "4日目・富士エリア" },
    summary: {
      en: "Make Day 4 the full Fuji block: transfer via Mishima, keep Chureito / Shimoyoshida and Lake Kawaguchiko together, then settle into the Fuji-area stay without repeating the lake on Day 5.",
      ja: "4日目を富士エリアのまとまりにし、三島経由で入り、忠霊塔・下吉田と河口湖を同じ日にまとめて、5日目に湖側を重ねないようにします。"
    }
  },
  {
    day: 5,
    title: { en: "Day 5 - Tokyo / Shibuya", ja: "5日目・東京・渋谷" },
    summary: {
      en: "Start Tokyo cleanly on Day 5: leave the Fuji area as a departure point only, then land in Shibuya for hotel check-in, the crossing, food walk, and Shibuya Sky.",
      ja: "5日目は東京をきれいに始め、富士エリアは出発地点だけにして、渋谷のチェックイン、交差点、食べ歩き、渋谷スカイへつなげます。"
    }
  },
  {
    day: 6,
    title: { en: "Day 6 - Tokyo East / Full Day", ja: "6日目・東京東側の観光メイン日" },
    summary: {
      en: "Use Day 6 as the fuller Tokyo sightseeing block: Skytree first, then Solamachi and Akihabara, so the denser city day lands before the departure buffer.",
      ja: "6日目は東京観光の本番日にし、スカイツリー、ソラマチ、秋葉原をまとめて回して、密度の高い都内日程を帰国日前に置きます。"
    }
  },
  {
    day: 7,
    title: { en: "Day 7 - Imperial Palace, Shinjuku + flight home", ja: "7日目・皇居と新宿、そして帰国日" },
    summary: {
      en: "Keep Day 7 deliberately light: start at Tokyo Imperial Palace, move on to a short Shinjuku block, then handle bags and leave enough airport buffer to close the trip calmly.",
      ja: "7日目はあえて軽くし、皇居を先に見てから新宿を短く回り、荷物対応と空港までの余白を残して静かに締めます。"
    }
  }
];
const fujiForecastCacheMaxAgeMs = 45 * 60 * 1000;
const fujiForecastSourceUrl = "https://open-meteo.com/en/docs";
const fujiForecastApiUrl = "https://api.open-meteo.com/v1/forecast";
const fujiForecastTimezone = "Asia/Tokyo";
const fujiForecastSpotConfigs = [
  {
    id: "kawaguchiko",
    latitude: 35.5009,
    longitude: 138.7681,
    label: { en: "Kawaguchiko area", ja: "河口湖周辺" }
  },
  {
    id: "chureito",
    latitude: 35.5013,
    longitude: 138.8073,
    label: { en: "Arakurayama / Chureito", ja: "新倉山・忠霊塔" }
  }
];
const revealBlockSelector =
  ".trip-stats, .progress-card, .content-section .section-heading, .essentials-grid, .day-grid, .notes-grid, .budget-panel, .route-map, .journey-close, .site-footer__lead, .site-footer__aside, .site-footer__credit";
const initializedSections = new Set();
const sectionInitPromises = new Map();
const sectionInitializers = {
  overview: initOverviewSection,
  checklist: initChecklistSection,
  notes: initNotesSection,
  budget: initBudgetSection,
  route: initRouteSection,
  essentials: initEssentialsSection
};
const bookingTransitGroupDefinitions = [
  {
    id: "bookings",
    title: { en: "Bookings", ja: "予約" },
    copy: {
      en: "Keep the timed or pre-trip reservations together so the critical items are easy to scan first.",
      ja: "時間指定や出発前に固めたい予約をまとめて、優先度の高い項目を先に見渡せるようにします。"
    }
  },
  {
    id: "transit",
    title: { en: "Transit", ja: "移動" },
    copy: {
      en: "Keep the saved route references and transport checks together so transfer days stay calmer.",
      ja: "保存しておきたい経路メモや運行確認をまとめて、移動日を落ち着いて進められるようにします。"
    }
  }
];
const transitDetailLabels = {
  defaultTag: { en: "Transit detail", ja: "移動詳細" },
  segment: { en: "Segment", ja: "区間" },
  from: { en: "From", ja: "出発" },
  to: { en: "To", ja: "到着" },
  transport: { en: "Recommended transport", ja: "おすすめ移動手段" },
  why: { en: "Why this fits", ja: "このルートが合う理由" },
  practicalNotes: { en: "Practical notes", ja: "実用メモ" },
  prepReminders: { en: "Booking + prep", ja: "予約・事前準備" },
  fallbackOptions: { en: "Fallback options", ja: "代替案" },
  loadingTitle: { en: "Loading transit detail", ja: "移動詳細を読み込み中" },
  loadingSummary: {
    en: "Loading the notes for this transit leg...",
    ja: "この移動区間のメモを読み込んでいます..."
  },
  loadingBody: {
    en: "Practical transfer notes will appear here.",
    ja: "実用的な移動メモがここに表示されます。"
  },
  unavailableTitle: {
    en: "Transit detail unavailable",
    ja: "移動詳細を表示できません"
  },
  unavailableSummary: {
    en: "This leg does not have a saved popup yet.",
    ja: "この区間にはまだ保存済みのポップアップがありません。"
  },
  unavailableBody: {
    en: "Use the existing route and booking references for now.",
    ja: "ひとまず既存のルートと予約メモを使ってください。"
  },
  errorTitle: {
    en: "Transit detail could not load",
    ja: "移動詳細を読み込めませんでした"
  },
  errorSummary: {
    en: "The transit notes could not be loaded right now.",
    ja: "移動メモを現在読み込めません。"
  },
  errorBody: {
    en: "Close this popup and try again in a moment.",
    ja: "このポップアップを閉じて、少ししてからもう一度試してください。"
  },
  fallbackAction: {
    en: "Open reference",
    ja: "参照を開く"
  }
};
const budgetLevelLabels = {
  low: { en: "Low", ja: "低め" },
  medium: { en: "Expected", ja: "標準" },
  high: { en: "High", ja: "高め" }
};
const offlineLabels = {
  checking: {
    en: "Checking offline support on this device...",
    ja: "この端末でのオフライン利用を確認しています..."
  },
  caching: {
    en: "Preparing offline access on this device...",
    ja: "この端末でオフライン利用の準備をしています..."
  },
  ready: {
    en: "Offline access is ready after this first online load.",
    ja: "最初のオンライン読み込み後、この端末でオフライン利用できます。"
  },
  readyInstallable: {
    en: "Offline access is ready. You can also install this guide on supported browsers.",
    ja: "オフライン利用の準備ができました。対応ブラウザーではこのガイドを追加できます。"
  },
  installed: {
    en: "This guide is installed and ready for repeat offline use.",
    ja: "このガイドは追加済みで、繰り返しオフライン利用できます。"
  },
  activeOffline: {
    en: "Offline mode is active on this device.",
    ja: "この端末ではオフライン利用中です。"
  },
  unsupported: {
    en: "Live offline install is not available here, but the downloadable snapshot still works.",
    ja: "この環境ではライブ版のオフライン追加は使えませんが、保存版は利用できます。"
  },
  error: {
    en: "Offline install could not be prepared right now. The downloadable snapshot is still available.",
    ja: "現在はオフライン追加を準備できません。保存版は引き続き利用できます。"
  },
  snapshot: {
    en: "This downloaded snapshot is self-contained for offline use.",
    ja: "この保存版はオフラインでそのまま使える単体版です。"
  },
  standardMeta: {
    en: "Cached bundle version 2026-03-27. Includes checklist, packing, upgraded budget notes, route preview, and transit details.",
    ja: "キャッシュ版は 2026-03-27。チェックリスト、荷造り、強化した予算メモ、ルート画像、移動詳細を含みます。"
  },
  installHintMeta: {
    en: "If no install button appears, use your browser menu or iPhone/iPad Share sheet to add the guide to the home screen. Snapshot version: 2026-03-27.",
    ja: "追加ボタンが出ない場合は、ブラウザーのメニューや iPhone/iPad の共有メニューからホーム画面へ追加できます。保存版は 2026-03-27 です。"
  },
  snapshotMeta: {
    en: "This single-file snapshot keeps the local checklist, packing, budget notes, route preview, and transit details working without fetches.",
    ja: "この単体保存版は、フェッチなしでチェックリスト、荷造り、予算メモ、ルート画像、移動詳細を使えます。"
  }
};
const budgetNotesLabels = {
  summaryTotal: { en: "Lean essentials total", ja: "控えめな準備費用合計" },
  summaryPerPerson: { en: "Current per person", ja: "現在の1人あたり" },
  summaryRequired: { en: "Required prep", ja: "必須の準備費用" },
  summaryOptional: { en: "Optional add-ons", ja: "任意の追加費用" },
  noteLabel: { en: "Prep note", ja: "準備メモ" },
  travelersLabel: { en: "Travelers", ja: "人数" },
  travelersHint: {
    en: "Shared prep items like luggage forwarding assume one shared unit for every two travelers.",
    ja: "荷物配送のような共有の準備費用は、2人で1単位を基本に計算します。"
  },
  extrasLabel: { en: "Include optional prep purchases", ja: "任意の準備購入も含める" },
  extrasHint: {
    en: "Adds luggage forwarding, adapter or power-bank refreshes, optional timed bookings, and small Fuji/Tokyo transfer-day top-ups. Hotels, meals, and day-by-day spend still stay out.",
    ja: "荷物配送、変換プラグやモバイルバッテリーの買い足し、任意の時間指定予約、富士と東京の移動日に向けた小さな追加購入を足します。ホテル代、食事代、毎日の出費は含めません。"
  },
  breakdownHeading: { en: "Essentials breakdown", ja: "準備ごとの内訳" },
  sourcesHeading: { en: "What counts here", ja: "この見積もりに含めるもの" },
  sourceMetaLabel: { en: "Essentials budget basis", ja: "準備予算の考え方" },
  sourceMetaFallback: {
    en: "Essentials budget notes are unavailable right now.",
    ja: "現在は準備予算のメモを表示できません。"
  },
  helperCopy: {
    en: "This is a prep-only view tied to Essentials. Full lodging, full food, sightseeing totals, broad shopping, and large generic trip buffers are intentionally excluded.",
    ja: "これはEssentialsにひもづく準備費用だけを見る表示です。宿泊費全体、食事代全体、観光費総額、広い買い物予算、大きな汎用バッファは意図的に除外しています。"
  },
  noExtraCost: { en: "No extra cost", ja: "追加費用なし" },
  optionalAvailable: { en: "Available", ja: "追加可能" },
  optionalIncluded: { en: "Included", ja: "反映中" },
  optionalExcludedMeta: {
    en: "Optional prep purchases stay outside the lean total until you enable them.",
    ja: "任意の準備購入は、有効にするまで控えめ合計へ入れません。"
  },
  optionalIncludedMeta: {
    en: "Optional prep purchases are currently included in the per-person view.",
    ja: "任意の準備購入は現在1人あたり表示へ反映しています。"
  },
  ownedExcludedMeta: { en: "Already-owned items excluded", ja: "所持済みの物は除外" },
  sharedMeta: { en: "Shared prep", ja: "共有の準備費用" },
  perPersonOnlyMeta: { en: "Per-person prep", ja: "1人ごとの準備費用" },
  requiredBucket: { en: "Required", ja: "必須" },
  likelyBucket: { en: "Likely", ja: "見込み" },
  optionalBucket: { en: "Optional", ja: "任意" },
  ownedBucket: { en: "Owned / excluded", ja: "所持済み・除外" }
};
const budgetSectionDefinitions = [
  {
    id: "documents-phone",
    label: { en: "Documents + Phone", ja: "書類とスマホ" },
    meta: {
      en: "Arrival QR, eSIM reserve, and backup copies only.",
      ja: "入国QR、eSIM予備費、控えだけを対象にします。"
    }
  },
  {
    id: "bookings-transit",
    label: { en: "Bookings + Transit", ja: "予約と移動" },
    meta: {
      en: "Only the Essentials-side bookings and transfer prep stay here.",
      ja: "Essentialsで事前に固める予約と移動準備だけをここへ残します。"
    }
  },
  {
    id: "offline-install",
    label: { en: "Offline + Install", ja: "オフラインと追加" },
    meta: {
      en: "Usually no extra spend unless you choose a paid tool outside the base guide.",
      ja: "通常は追加費用なしで、有料ツールを別途使う場合だけ追加になります。"
    }
  },
  {
    id: "luggage-strategy",
    label: { en: "Luggage Strategy", ja: "荷物戦略" },
    meta: {
      en: "Only route-specific luggage handling stays priced here.",
      ja: "このルート特有の荷物対応だけを費用化します。"
    }
  },
  {
    id: "daily-carry",
    label: { en: "Daily Carry", ja: "毎日持つもの" },
    meta: {
      en: "Daily items are mostly assumed already owned.",
      ja: "毎日持つ物は、ほとんどを既に持っている前提にします。"
    }
  },
  {
    id: "fuji-tokyo-transfer-kit",
    label: { en: "Fuji + Tokyo Transfer Kit", ja: "富士と東京移動の日用キット" },
    meta: {
      en: "Only true extra transfer-day kit purchases are priced by default.",
      ja: "本当に追加購入が必要な移動日用キットだけを費用化します。"
    }
  }
];
const budgetSectionDefinitionMap = new Map(
  budgetSectionDefinitions.map((section) => [section.id, section])
);
const routeMapLabels = {
  days: { en: "Route days", ja: "日別ルート" },
  tools: { en: "Quick tools", ja: "クイック操作" },
  stops: { en: "Major stops", ja: "主要地点" },
  checklistAction: { en: "Open checklist", ja: "チェックリストを開く" },
  sharedLoading: { en: "Loading Protomaps route...", ja: "Protomaps のルート地図を読み込み中..." },
  sharedLoadingBody: {
    en: "The core stops and backup preview stay visible while the live map initializes.",
    ja: "ライブ地図の初期化中も、主要地点とバックアップのプレビューを見えるままにしています。"
  },
  sharedFallbackTitle: { en: "Protomaps route unavailable", ja: "Protomaps のルート地図を表示できません" },
  sharedFallbackBody: {
    en: "The live Protomaps view could not initialize here. The backup route preview stays visible; use Google Maps if you need door-to-door directions.",
    ja: "Protomaps のライブ地図をここでは初期化できませんでした。バックアップのプレビューは表示したままにし、経路案内が必要な場合は Google マップを使ってください。"
  },
  sharedOfflineTitle: {
    en: "Interactive map unavailable offline",
    ja: "オフラインではインタラクティブ地図を使えません"
  },
  sharedOfflineBody: {
    en: "The offline copy keeps the static route preview. Open the live site when you want the interactive Protomaps map.",
    ja: "オフライン版では静的なルートプレビューを表示します。インタラクティブな Protomaps 地図が必要な場合はライブサイトを開いてください。"
  }
};
const routeExplorerDefaultSelectionId = "overview";
const routeMapInitialView = {
  center: [137.4, 35.1],
  zoom: 4.95
};
const routeMapDisplayDefinitions = {
  preview: {
    loadingTitle: routeMapLabels.sharedLoading,
    loadingBody: routeMapLabels.sharedLoadingBody,
    overviewMaxZoom: 5.75
  },
  interactive: {
    overviewMaxZoom: 6.15
  }
};
const routeMapBaseOptions = {
  attributionControl: false,
  renderWorldCopies: false,
  fadeDuration: 0,
  dragRotate: false,
  pitchWithRotate: false,
  touchPitch: false,
  center: routeMapInitialView.center,
  zoom: routeMapInitialView.zoom
};
const routeExplorerPathDefinitions = [
  {
    id: "osaka-kyoto",
    d: "M180 580 L238 448",
    title: { en: "Osaka -> Kyoto East", ja: "大阪 -> 京都東側" },
    summary: {
      en: "Day 2 moves cleanly from Osaka into the east-side Kyoto walking cluster.",
      ja: "2日目は大阪から京都東側の徒歩中心エリアへ、分かりやすく移る区間です。"
    },
    badges: [
      { en: "Day 2", ja: "2日目" },
      { en: "City rail", ja: "近距離鉄道" }
    ],
    notes: [
      {
        en: "This segment is about reaching Kiyomizu-dera, Ninenzaka, Gion, and Nanzen-ji without turning it into a luggage day.",
        ja: "この区間は、清水寺、二寧坂、祇園、南禅寺へ入りやすくする移動で、荷物中心の日にはしない前提です。"
      },
      {
        en: "Keeping the Osaka return separate makes the Kyoto East day easier to read.",
        ja: "大阪へ戻る動きを別区間に分けることで、京都東側の日程を素直に見やすくしています。"
      }
    ],
    dayLinks: [{ day: 2 }],
    stopIds: ["osaka", "kyoto"]
  },
  {
    id: "kyoto-osaka",
    d: "M238 448 L186 572",
    title: { en: "Arashiyama -> Osaka", ja: "嵐山 -> 大阪" },
    summary: {
      en: "Day 3 starts with Arashiyama, then resets back to Osaka for Kaiyukan, Tempozan, and the final Kansai night.",
      ja: "3日目は嵐山から始め、そのあと大阪へ戻って海遊館、天保山、関西最後の夜へつなぎます。"
    },
    badges: [
      { en: "Day 3", ja: "3日目" },
      { en: "Return leg", ja: "戻り区間" }
    ],
    notes: [
      {
        en: "This keeps Arashiyama separate from Kyoto East while still closing the day in Osaka.",
        ja: "嵐山を京都東側の日から分けつつ、その日の締めを大阪に戻して整えています。"
      },
      {
        en: "Use this leg when you want the Osaka-side reset before the long move east.",
        ja: "東へ大きく移る前に、大阪側へ戻る流れを見たいときの区間です。"
      }
    ],
    dayLinks: [{ day: 3 }],
    stopIds: ["kyoto", "osaka"]
  },
  {
    id: "osaka-shin-osaka",
    d: "M186 572 L202 548",
    title: { en: "Osaka city -> Shin-Osaka", ja: "大阪市内 -> 新大阪" },
    summary: {
      en: "This short launch step turns the Osaka stay into the Day 4 eastbound transfer.",
      ja: "この短い出発区間で、大阪滞在から4日目の東行き移動へ切り替えます。"
    },
    badges: [
      { en: "Day 4", ja: "4日目" },
      { en: "Launch step", ja: "出発準備" }
    ],
    notes: [
      {
        en: "It is mostly a handoff move before the long bullet-train segment.",
        ja: "本格的な長距離新幹線区間へ入る前の引き継ぎ移動です。"
      },
      {
        en: "Use it when you want the Day 4 departure flow without reopening the Osaka sightseeing context.",
        ja: "大阪観光の文脈を開き直さずに、4日目の出発動線だけ見たいときに使えます。"
      }
    ],
    dayLinks: [{ day: 4 }],
    stopIds: ["osaka", "shin-osaka"]
  },
  {
    id: "shin-osaka-fuji-gateway",
    d: "M202 548 L878 292",
    title: { en: "Shin-Osaka -> Mishima", ja: "新大阪 -> 三島" },
    summary: {
      en: "This is the longest rail segment in the route and the clean handoff from Kansai into the Mt. Fuji side.",
      ja: "この区間が旅程で最長の鉄道移動で、関西から富士側へ切り替える基幹の受け渡しです。"
    },
    badges: [
      { en: "Day 4", ja: "4日目" },
      { en: "Shinkansen", ja: "新幹線" }
    ],
    notes: [
      {
        en: "Open the saved transit detail when you want the actual train choice and buffer notes.",
        ja: "実際の列車選びや余裕時間を確認したいときは、保存済み移動詳細を開くのが早いです。"
      },
      {
        en: "This leg stays separate from the local Fuji access so the main transfer remains readable.",
        ja: "主要移動を読みやすく保つため、この区間は富士側のローカルアクセスとは分けています。"
      }
    ],
    dayLinks: [{ day: 4 }],
    transitActions: [
      {
        id: "shin-osaka-fuji-gateway",
        label: { en: "Shinkansen detail", ja: "新幹線詳細" }
      }
    ],
    stopIds: ["shin-osaka", "fuji-gateway"]
  },
  {
    id: "fuji-gateway-kawaguchiko",
    d: "M878 292 L938 238",
    title: { en: "Mishima -> Kawaguchiko", ja: "三島 -> 河口湖" },
    summary: {
      en: "This is the local access leg into the lake base, trading the shinkansen arrival for the quieter Fuji-area night.",
      ja: "この区間で新幹線到着から湖側の拠点へ移り、静かな富士エリアの夜へつなげます。"
    },
    badges: [
      { en: "Day 4", ja: "4日目" },
      { en: "Local access", ja: "現地アクセス" }
    ],
    notes: [
      {
        en: "Treat it as a practical station-to-lake handoff first, then enjoy the arrival views and sunset second.",
        ja: "まずは駅から湖側へ入る実用的な移動として見て、そのあと到着景色や夕景を楽しむ流れです。"
      },
      {
        en: "The linked detail keeps the Mishima bus handoff and lake-side arrival timing together.",
        ja: "関連詳細では、三島からのバス接続と湖側到着の時間感覚をまとめています。"
      }
    ],
    dayLinks: [{ day: 4 }],
    transitActions: [
      {
        id: "fuji-gateway-kawaguchiko",
        label: { en: "Fuji access detail", ja: "富士アクセス詳細" }
      }
    ],
    stopIds: ["fuji-gateway", "fuji"]
  },
  {
    id: "fuji-tokyo",
    d: "M938 238 L1036 150",
    title: { en: "Mt. Fuji area -> Tokyo / Shibuya", ja: "富士エリア -> 東京・渋谷" },
    summary: {
      en: "Day 5 is the clean Tokyo handoff from the Fuji side into Shibuya.",
      ja: "5日目は富士側から渋谷へ入る、きれいな東京ハンドオフです。"
    },
    badges: [
      { en: "Day 5", ja: "5日目" },
      { en: "Tokyo handoff", ja: "東京への受け渡し" }
    ],
    notes: [
      {
        en: "Use this when you want the Tokyo transfer separate from the Fuji-area sightseeing already handled on Day 4.",
        ja: "4日目にまとめた富士エリア観光と切り分けて、東京への移動だけ見たいときに使います。"
      },
      {
        en: "The linked transit detail keeps the direct train and highway-bus arrival options together.",
        ja: "関連詳細には、直通列車と高速バスの到着案をまとめています。"
      }
    ],
    dayLinks: [{ day: 5 }],
    transitActions: [
      {
        id: "kawaguchiko-tokyo",
        label: { en: "Tokyo arrival detail", ja: "東京到着詳細" }
      }
    ],
    stopIds: ["fuji", "tokyo"]
  }
];
const routeExplorerSegmentMap = new Map(
  routeExplorerPathDefinitions.map((segment) => [segment.id, segment])
);
const routeExplorerStopDefinitions = [
  {
    id: "osaka",
    title: { en: "Osaka", ja: "大阪" },
    summary: {
      en: "Osaka handles the easy Minami arrival, the Day 3 return, and the final Kansai reset before moving east.",
      ja: "大阪は、ミナミ中心の到着日、3日目の戻り先、そして東へ移る前の関西側の締めをまとめる拠点です。"
    },
    badges: [
      { en: "Days 1 + 3", ja: "1日目・3日目" },
      { en: "Base stay", ja: "滞在拠点" }
    ],
    notes: [
      {
        en: "This marker covers Dotonbori, Shinsaibashi, dinner in Minami, nightlife, and the final Osaka night after Kaiyukan.",
        ja: "この地点は、道頓堀、心斎橋、ミナミでの夕食、夜歩き、そして海遊館後の大阪最後の夜までを含みます。"
      },
      {
        en: "It also sets up the Day 4 launch without forcing Kyoto to carry the onward transfer logic.",
        ja: "同時に4日目の出発も支えますが、その先の移動ロジックを京都側へ持たせない形にしています。"
      }
    ],
    dayLinks: [{ day: 1 }, { day: 3 }],
    segmentIds: ["osaka-kyoto", "kyoto-osaka", "osaka-shin-osaka"],
    lngLat: [135.5023, 34.6938],
    labelPosition: "sw",
    x: 15,
    y: 80.6
  },
  {
    id: "kyoto",
    title: { en: "Kyoto", ja: "京都" },
    summary: {
      en: "Kyoto covers the east-side temple day and the early Arashiyama branch before the Osaka return.",
      ja: "京都は、東側の寺社日と、朝の嵐山から大阪へ戻る流れをまとめる地点です。"
    },
    badges: [
      { en: "Days 2 + 3", ja: "2日目・3日目" },
      { en: "Temple + west split", ja: "東西を分ける日" }
    ],
    notes: [
      {
        en: "Day 2 stays focused on Kiyomizu-dera, Ninenzaka, Yasaka Pagoda, Gion, and Nanzen-ji.",
        ja: "2日目は清水寺、二寧坂、八坂の塔、祇園、南禅寺に集中する構成です。"
      },
      {
        en: "Arashiyama is separated into Day 3 so Kyoto East does not get overloaded.",
        ja: "嵐山は3日目へ分け、京都東側の日程が重くなりすぎないようにしています。"
      }
    ],
    dayLinks: [{ day: 2 }, { day: 3 }],
    segmentIds: ["osaka-kyoto", "kyoto-osaka"],
    lngLat: [135.7681, 35.0116],
    labelPosition: "n",
    x: 19.8,
    y: 62.2
  },
  {
    id: "shin-osaka",
    title: { en: "Shin-Osaka", ja: "新大阪" },
    summary: {
      en: "This is the clean launch point for the main Kansai-to-Fuji transfer day.",
      ja: "ここが、関西から富士側へ渡る主要移動日の分かりやすい出発点です。"
    },
    badges: [
      { en: "Day 4", ja: "4日目" },
      { en: "Shinkansen pivot", ja: "新幹線起点" }
    ],
    notes: [
      {
        en: "Use this stop when you want the long eastbound handoff rather than the Osaka city details.",
        ja: "大阪市内の細かい動きではなく、東へ伸びる大きな移動に集中したいときの起点です。"
      },
      {
        en: "It connects directly to the saved shinkansen detail for Mishima.",
        ja: "三島へ向かう新幹線詳細に、そのままつなげられます。"
      }
    ],
    dayLinks: [{ day: 4 }],
    transitActions: [
      {
        id: "shin-osaka-fuji-gateway",
        label: { en: "Shinkansen detail", ja: "新幹線詳細" }
      }
    ],
    segmentIds: ["osaka-shin-osaka", "shin-osaka-fuji-gateway"],
    lngLat: [135.5007, 34.7335],
    labelPosition: "ne",
    x: 16.8,
    y: 76.1
  },
  {
    id: "fuji-gateway",
    title: { en: "Mishima", ja: "三島" },
    summary: {
      en: "This stop marks the rail-to-local gateway into the Kawaguchiko side of the route.",
      ja: "この地点は、新幹線から河口湖側のローカルアクセスへ切り替わる入口です。"
    },
    badges: [
      { en: "Day 4", ja: "4日目" },
      { en: "Gateway stop", ja: "受け渡し地点" }
    ],
    notes: [
      {
        en: "It is less about sightseeing and more about keeping the transfer calm and readable.",
        ja: "ここは観光よりも、乗り継ぎを落ち着いて進めるための地点として見ています。"
      },
      {
        en: "Keep the next bus or local rail option saved before arrival so the lake transfer stays simple.",
        ja: "湖側への移動を簡単にするため、次のバスやローカル鉄道は到着前に控えておくと安心です。"
      }
    ],
    dayLinks: [{ day: 4 }],
    transitActions: [
      {
        id: "fuji-gateway-kawaguchiko",
        label: { en: "Fuji access detail", ja: "富士アクセス詳細" }
      }
    ],
    segmentIds: ["shin-osaka-fuji-gateway", "fuji-gateway-kawaguchiko"],
    lngLat: [138.9208, 35.1265],
    labelPosition: "nw",
    x: 73.4,
    y: 39.4
  },
  {
    id: "fuji",
    title: { en: "Mt. Fuji area", ja: "富士エリア" },
    summary: {
      en: "This stop groups the Day 4 Mishima handoff, Chureito / Shimoyoshida, Lake Kawaguchiko, and the overnight Fuji base before Tokyo.",
      ja: "この地点は、4日目の三島ハンドオフ、忠霊塔・下吉田、河口湖、そして東京前の富士エリア宿泊をまとめています。"
    },
    badges: [
      { en: "Day 4 focus", ja: "4日目中心" },
      { en: "3 Fuji-area places", ja: "富士エリア3か所" }
    ],
    notes: [
      {
        en: "Day 4 now keeps Mishima, Chureito / Shimoyoshida, and Lake Kawaguchiko in one Fuji-area block.",
        ja: "4日目は三島、忠霊塔・下吉田、河口湖を一つの富士エリアのまとまりとして扱います。"
      },
      {
        en: "Day 5 uses this area only as the departure point before Tokyo begins cleanly in Shibuya.",
        ja: "5日目はこのエリアを出発地点としてだけ使い、そのあと渋谷から東京をきれいに始めます。"
      }
    ],
    dayLinks: [{ day: 4 }],
    transitActions: [
      {
        id: "fuji-local-hops",
        label: { en: "Fuji local detail", ja: "富士エリア詳細" }
      }
    ],
    segmentIds: ["fuji-gateway-kawaguchiko", "fuji-tokyo"],
    lngLat: [138.7552, 35.5009],
    labelPosition: "se",
    x: 78.2,
    y: 31.4
  },
  {
    id: "tokyo",
    title: { en: "Tokyo", ja: "東京" },
    summary: {
      en: "Tokyo now absorbs the Shibuya arrival, one fuller east-side sightseeing day, and a lighter Imperial Palace/Shinjuku departure-day wrap-up into the same main-route finish.",
      ja: "東京は、渋谷到着、東側の観光本番日、そして皇居と新宿を軽く回る帰国日までをまとめて、本編ルート終盤のひとまとまりにしています。"
    },
    badges: [
      { en: "Days 5-7", ja: "5日目-7日目" },
      { en: "Main-route finish", ja: "本編の締め" }
    ],
    notes: [
      {
        en: "Day 5 lands in Shibuya for the crossing, food walk, and Shibuya Sky.",
        ja: "5日目は渋谷に入り、スクランブル交差点、食べ歩き、渋谷スカイへつなげます。"
      },
      {
        en: "Day 6 carries the Skytree, Solamachi, and Akihabara cluster, while Day 7 stays lighter with Tokyo Imperial Palace, Shinjuku, bags, and the airport run.",
        ja: "6日目にスカイツリー、ソラマチ、秋葉原をまとめ、7日目は皇居、新宿、荷物、空港移動を軽めに組んでいます。"
      }
    ],
    dayLinks: [{ day: 5 }, { day: 6 }, { day: 7 }],
    segmentIds: ["fuji-tokyo"],
    lngLat: [139.7017, 35.658],
    labelPosition: "ne",
    x: 86.3,
    y: 20.8
  }
];
const routeExplorerStopMap = new Map(routeExplorerStopDefinitions.map((stop) => [stop.id, stop]));
const routeExplorerViewDefinitions = [
  {
    id: "overview",
    label: { en: "All path", ja: "全体" },
    title: { en: "Route overview", ja: "ルート概要" },
    summary: {
      en: "Use the same map surface to scan the fixed west-to-east route from Osaka and Kyoto through the Mt. Fuji area into Tokyo.",
      ja: "同じ地図面で、大阪と京都から富士エリアを経て東京へ入る固定の西から東への流れを見渡せます。"
    },
    badges: [
      { en: "Days 1-7", ja: "1日目-7日目" },
      { en: "Stops + transfer legs", ja: "地点＋移動区間" }
    ],
    notes: [
      {
        en: "Major-stop chips keep the city and base context visible, while route-leg selection isolates the transfer days that need extra attention.",
        ja: "主要地点チップでは都市と拠点の流れを見渡せて、区間選択では注意したい移動日だけを切り出せます。"
      },
      {
        en: "Day 4 now holds the Fuji-area places, and Day 5 starts Tokyo without repeating the lake side.",
        ja: "4日目に富士エリアの立ち寄りをまとめ、5日目は湖側を繰り返さず東京を始めます。"
      }
    ],
    dayLinks: [{ day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 }, { day: 7 }],
    stopIds: ["osaka", "kyoto", "shin-osaka", "fuji-gateway", "fuji", "tokyo"],
    segmentIds: routeExplorerPathDefinitions.map((path) => path.id)
  },
  {
    id: "kansai-start",
    label: { en: "Kansai start", ja: "関西前半" },
    title: { en: "Osaka + Kyoto front half", ja: "大阪・京都の前半" },
    summary: {
      en: "This keeps Days 1 to 3 together before the route stretches into the Fuji transfer.",
      ja: "富士側への移動へ伸びる前の1日目から3日目までを、関西側だけでまとめて見られます。"
    },
    badges: [
      { en: "Days 1-3", ja: "1日目-3日目" },
      { en: "City rhythm", ja: "街歩き中心" }
    ],
    notes: [
      {
        en: "Kyoto East and Arashiyama stay split so each day remains practical instead of overloaded.",
        ja: "京都東側と嵐山を分け、各日が重くなりすぎず実用的に見える構成にしています。"
      },
      {
        en: "Osaka stays visible because the route deliberately returns there before heading east.",
        ja: "東へ向かう前に大阪へ戻る構成なので、この表示でも大阪を残しています。"
      }
    ],
    dayLinks: [{ day: 1 }, { day: 2 }, { day: 3 }],
    stopIds: ["osaka", "kyoto", "shin-osaka"],
    segmentIds: ["osaka-kyoto", "kyoto-osaka", "osaka-shin-osaka"]
  },
  {
    id: "day4-transfer",
    label: { en: "Day 4 Fuji", ja: "4日目富士" },
    title: { en: "Day 4 - Mt. Fuji area", ja: "4日目・富士エリア" },
    summary: {
      en: "This view keeps the Mishima handoff, Chureito / Shimoyoshida, and Lake Kawaguchiko tied to the same Fuji-area day.",
      ja: "この表示では、三島ハンドオフ、忠霊塔・下吉田、河口湖を同じ富士エリア日にまとめて見られます。"
    },
    badges: [
      { en: "Day 4", ja: "4日目" },
      { en: "3 Fuji-area stops", ja: "富士エリア3か所" }
    ],
    notes: [
      {
        en: "Use this view when you want the Day 4 Fuji block rather than the earlier Osaka or Kyoto city context.",
        ja: "大阪や京都の街歩きではなく、4日目の富士エリアのまとまりを見たいときの表示です。"
      },
      {
        en: "The saved transit popups keep the long rail leg and the Fuji-side local moves readable without splitting the lake stop into Day 5.",
        ja: "保存済み移動詳細では、長距離鉄道と富士側のローカル移動を見やすくしつつ、河口湖を5日目へ分けないようにしています。"
      }
    ],
    dayLinks: [{ day: 4 }],
    transitActions: [
      {
        id: "shin-osaka-fuji-gateway",
        label: { en: "Shinkansen detail", ja: "新幹線詳細" }
      },
      {
        id: "fuji-gateway-kawaguchiko",
        label: { en: "Fuji access detail", ja: "富士アクセス詳細" }
      }
    ],
    stopIds: ["shin-osaka", "fuji-gateway", "fuji"],
    segmentIds: ["shin-osaka-fuji-gateway", "fuji-gateway-kawaguchiko"]
  },
  {
    id: "day5-handoff",
    label: { en: "Day 5 Tokyo", ja: "5日目東京" },
    title: { en: "Day 5 - Tokyo / Shibuya", ja: "5日目・東京・渋谷" },
    summary: {
      en: "This view covers the clean Tokyo handoff and the Shibuya arrival after the Fuji day is already done.",
      ja: "この表示では、富士エリア日を終えたあとの、きれいな東京入りと渋谷到着を見られます。"
    },
    badges: [
      { en: "Day 5", ja: "5日目" },
      { en: "Tokyo arrival", ja: "東京到着" }
    ],
    notes: [
      {
        en: "Treat the Fuji area as the departure point only, then switch fully to the Tokyo arrival plan.",
        ja: "富士エリアは出発地点だけにして、そのあと東京到着プランへ完全に切り替えます。"
      },
      {
        en: "The related popup keeps the direct train and highway-bus arrival options close together.",
        ja: "関連ポップアップでは、直通列車と高速バスの到着案を近い場所で確認できます。"
      }
    ],
    dayLinks: [{ day: 5 }],
    transitActions: [
      {
        id: "kawaguchiko-tokyo",
        label: { en: "Tokyo arrival detail", ja: "東京到着詳細" }
      }
    ],
    stopIds: ["fuji", "tokyo"],
    segmentIds: ["fuji-tokyo"]
  },
  {
    id: "tokyo-finish",
    label: { en: "Tokyo finish", ja: "東京後半" },
    title: { en: "Tokyo main-route finish", ja: "東京で本編を締める" },
    summary: {
      en: "The Tokyo close now pairs one fuller sightseeing day with a lighter Imperial Palace/Shinjuku departure-day wrap-up inside the fixed 7-day route.",
      ja: "東京の締めは、観光メインの1日と、皇居と新宿を軽く回る帰国日を、固定の7日間本編の中で組み合わせています。"
    },
    badges: [
      { en: "Days 6-7", ja: "6日目-7日目" },
      { en: "Main route only", ja: "本編のみ" }
    ],
    notes: [
      {
        en: "Day 6 is the denser Tokyo day: Skytree, Solamachi, and Akihabara while energy is still available.",
        ja: "6日目は体力があるうちに、スカイツリー、ソラマチ、秋葉原をまとめて回る日です。"
      },
      {
        en: "Day 7 stays intentionally light around Tokyo Imperial Palace and Shinjuku so bags and the airport transfer stay low-stress.",
        ja: "7日目は皇居と新宿を軸にあえて軽くし、荷物と空港移動を慌てず進めます。"
      }
    ],
    dayLinks: [{ day: 6 }, { day: 7 }],
    stopIds: ["tokyo"],
    segmentIds: []
  }
];
const routeDayStopDefinitions = {
  1: [{ en: "Osaka", ja: "大阪" }],
  2: [{ en: "Kyoto", ja: "京都" }],
  3: [
    { en: "Arashiyama", ja: "嵐山" },
    { en: "Osaka", ja: "大阪" }
  ],
  4: [
    { en: "Mishima", ja: "三島" },
    { en: "Chureito / Shimoyoshida", ja: "忠霊塔・下吉田" },
    { en: "Lake Kawaguchiko", ja: "河口湖" }
  ],
  5: [
    { en: "Tokyo / Shibuya", ja: "東京・渋谷" },
    { en: "Shibuya Crossing", ja: "渋谷交差点" },
    { en: "Shibuya Sky", ja: "渋谷スカイ" }
  ],
  6: [
    { en: "Tokyo Skytree", ja: "東京スカイツリー" },
    { en: "Akihabara", ja: "秋葉原" }
  ],
  7: [
    { en: "Imperial Palace", ja: "皇居" },
    { en: "Shinjuku", ja: "新宿" }
  ]
};
let bookingTransitItems = [];
let bookingTransitItemMap = new Map();
let transitDetailItems = [];
let transitDetailItemMap = new Map();
let budgetEstimateSources = null;
const inlineJsonPayloadCache = new Map();
const localizedMarkupCache = new WeakMap();
let checklistState = {};
let reservedHeaderHeight = headerReservedHeightFallbackPx;
let headerLockUntil = 0;
const headerTopRevealThreshold = 36;
const headerCondenseScrollThreshold = 150;
const headerScrollDeltaTolerance = 4;
const headerScrollIntentThreshold = 24;
let headerIsCondensed = Boolean(siteHeader?.classList.contains("is-condensed"));
syncHeaderAccessoryVisibility(headerIsCondensed);
let lastScrollY = Math.max(window.scrollY, 0);
let headerScrollIntentStartY = lastScrollY;
let headerScrollIntentDirection = 0;
let scrollTicking = false;
let revealObserver = null;
let completedDays = new Set();
let completedHistoryDays = new Set();
let unlockedDays = new Set();
let warningDays = new Set();
let accessibleDay = 1;
let currentProgressDay = 1;
let sequenceNoticeTimer = 0;
let lastTimelineFocusDay = null;
let lastResetTrigger = null;
const pendingClassRestarts = new WeakMap();
let deferredGeometryWorkPending = true;
let deferredGeometryReleaseTimer = 0;
let timelineLayoutFrame = 0;
let timelineLayoutDelayTimer = 0;
let timelineLayoutIdleHandle = 0;
let headerHeightSyncFrame = 0;
let headerHeightSyncDelayTimer = 0;
let headerHeightSyncIdleHandle = 0;
let storageWriteFlushTimer = 0;
let storageWriteIdleHandle = 0;
let bookingTransitState = { filter: "all", items: {} };
let bookingTransitInitialized = false;
let bookingTransitItemsPromise = null;
let transitDetailItemsPromise = null;
let activeTransitDetailId = "";
let lastTransitTrigger = null;
let packingState = {};
let packingInitialized = false;
function getDefaultBudgetNotesState() {
  return {
    travelers: budgetDefaultTravelerCount,
    accommodationShareMode: budgetAccommodationShareModeDefault,
    accommodationShareCount: budgetDefaultTravelerCount,
    includeExtras: false,
    days: {}
  };
}
let budgetNotesState = getDefaultBudgetNotesState();
let budgetNotesInitialized = false;
let routeMapInitialized = false;
let routeMapLibraryPromise = null;
let routeMapStylesheetPromise = null;
let routeMapPmtilesProtocol = null;
const routeMapState = createRouteMapState();
let routeMapDisplayMode = "interactive";
let routeMapActivePopup = null;
let activeRouteMapSelection = { type: "view", id: routeExplorerDefaultSelectionId };
let routeMapUISyncFrame = 0;
let pendingRouteMapUISyncOptions = {
  updateCamera: false,
  animateCamera: false
};
let offlineExperienceBooted = false;
let offlineRegistration = null;
let offlineRegistrationReady = false;
let offlineRegistrationError = false;
let deferredInstallPrompt = null;
let offlineAppInstalled = isStandaloneDisplayMode();
let fujiForecastResult = null;
let fujiForecastPromise = null;
let reducedEffectsEnabled = false;
let lastTimelineSpineFillHeight = null;

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function clearScheduledStorageFlush() {
  if (storageWriteFlushTimer) {
    window.clearTimeout(storageWriteFlushTimer);
    storageWriteFlushTimer = 0;
  }

  if (storageWriteIdleHandle && typeof window.cancelIdleCallback === "function") {
    window.cancelIdleCallback(storageWriteIdleHandle);
    storageWriteIdleHandle = 0;
  }
}

function flushQueuedStorageWrites() {
  clearScheduledStorageFlush();
  if (!queuedStorageWrites.size) {
    return;
  }

  const pendingWrites = Array.from(queuedStorageWrites.entries());
  queuedStorageWrites.clear();

  try {
    pendingWrites.forEach(([key, entry]) => {
      if (entry.remove) {
        window.localStorage.removeItem(key);
        return;
      }

      window.localStorage.setItem(key, entry.value);
    });
  } catch (error) {
    // Ignore storage failures and keep the page usable.
  }
}

function scheduleStorageFlush() {
  if (!queuedStorageWrites.size || storageWriteFlushTimer || storageWriteIdleHandle) {
    return;
  }

  if (typeof window.requestIdleCallback === "function") {
    storageWriteIdleHandle = window.requestIdleCallback(
      () => {
        storageWriteIdleHandle = 0;
        flushQueuedStorageWrites();
      },
      { timeout: 240 }
    );
    return;
  }

  storageWriteFlushTimer = window.setTimeout(() => {
    storageWriteFlushTimer = 0;
    flushQueuedStorageWrites();
  }, 120);
}

function queueStorageValue(key, value) {
  queuedStorageWrites.set(key, { remove: false, value });
  scheduleStorageFlush();
}

function queueStorageRemoval(key) {
  queuedStorageWrites.set(key, { remove: true });
  scheduleStorageFlush();
}

function setBookingTransitStatus(status) {
  const bookingTransitLoadingState = getBookingTransitLoadingState();
  const bookingTransitErrorState = getBookingTransitErrorState();

  if (bookingTransitLoadingState) {
    bookingTransitLoadingState.hidden = status !== "loading";
  }

  if (bookingTransitErrorState) {
    bookingTransitErrorState.hidden = status !== "error";
  }
}

function loadBookingTransitItems() {
  if (bookingTransitItems.length) {
    return Promise.resolve(bookingTransitItems);
  }

  const inlineItems = getInlineJsonArray(inlineDataSelectors.bookingTransit);
  if (inlineItems) {
    bookingTransitItems = inlineItems;
    bookingTransitItemMap = new Map(bookingTransitItems.map((item) => [item.id, item]));
    return Promise.resolve(bookingTransitItems);
  }

  if (bookingTransitItemsPromise) {
    return bookingTransitItemsPromise;
  }

  bookingTransitItemsPromise = window.fetch(bookingTransitItemsDataUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Booking transit data request failed: ${response.status}`);
      }

      return response.json();
    })
    .then((items) => {
      bookingTransitItems = Array.isArray(items) ? items : [];
      bookingTransitItemMap = new Map(bookingTransitItems.map((item) => [item.id, item]));
      return bookingTransitItems;
    })
    .catch((error) => {
      bookingTransitItemsPromise = null;
      throw error;
    });

  return bookingTransitItemsPromise;
}

function loadTransitDetailItems() {
  if (transitDetailItems.length) {
    return Promise.resolve(transitDetailItems);
  }

  const inlineItems = getInlineJsonArray(inlineDataSelectors.transitDetails);
  if (inlineItems) {
    transitDetailItems = inlineItems;
    transitDetailItemMap = new Map(transitDetailItems.map((item) => [item.id, item]));
    return Promise.resolve(transitDetailItems);
  }

  if (transitDetailItemsPromise) {
    return transitDetailItemsPromise;
  }

  transitDetailItemsPromise = window.fetch(transitDetailsDataUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Transit detail data request failed: ${response.status}`);
      }

      return response.json();
    })
    .then((items) => {
      transitDetailItems = Array.isArray(items) ? items : [];
      transitDetailItemMap = new Map(transitDetailItems.map((item) => [item.id, item]));
      return transitDetailItems;
    })
    .catch((error) => {
      transitDetailItemsPromise = null;
      throw error;
    });

  return transitDetailItemsPromise;
}

function setTransitDetailTag(tag = transitDetailLabels.defaultTag) {
  transitDetailTagNodes.forEach((node) => {
    node.textContent =
      node.dataset.transitDetailTagLanguage === "ja" ? tag.ja : tag.en;
  });
}

function renderTransitDetailTextSection(title, copy) {
  if (!copy?.en && !copy?.ja) {
    return "";
  }

  return `
    <section class="transit-modal__section">
      <h3 class="transit-modal__section-title">${renderLocalizedContent(title)}</h3>
      <p class="transit-modal__section-copy">${renderLocalizedContent(copy)}</p>
    </section>
  `;
}

function renderTransitDetailListSection(title, items) {
  if (!Array.isArray(items) || !items.length) {
    return "";
  }

  return `
    <section class="transit-modal__section">
      <h3 class="transit-modal__section-title">${renderLocalizedContent(title)}</h3>
      <ul class="transit-modal__list">
        ${items
          .map(
            (item) => `<li class="transit-modal__list-item">${renderLocalizedContent(item)}</li>`
          )
          .join("")}
      </ul>
    </section>
  `;
}

function renderTransitDetailFact(title, value) {
  if (!value?.en && !value?.ja) {
    return "";
  }

  return `
    <article class="transit-modal__fact">
      <p class="transit-modal__fact-label">${renderLocalizedContent(title)}</p>
      <p class="transit-modal__fact-value">${renderLocalizedContent(value)}</p>
    </article>
  `;
}

function setTransitDetailBusyState(isBusy) {
  if (transitDetailSectionsNode) {
    transitDetailSectionsNode.setAttribute("aria-busy", String(Boolean(isBusy)));
  }
}

function renderTransitDetailPlaceholder(title, summary, body) {
  if (!transitDetailModal) {
    return;
  }

  setTransitDetailBusyState(true);
  setTransitDetailTag(transitDetailLabels.defaultTag);

  if (transitDetailTitleNode) {
    transitDetailTitleNode.innerHTML = renderLocalizedContent(title);
  }

  if (transitDetailSummaryNode) {
    transitDetailSummaryNode.innerHTML = renderLocalizedContent(summary);
  }

  if (transitDetailMetaNode) {
    transitDetailMetaNode.hidden = true;
    transitDetailMetaNode.innerHTML = "";
  }

  if (transitDetailSectionsNode) {
    transitDetailSectionsNode.innerHTML = `
      <section class="transit-modal__section transit-modal__section--loading">
        <p class="transit-modal__section-copy">${renderLocalizedContent(body)}</p>
      </section>
    `;
  }

  if (transitDetailActionLink) {
    transitDetailActionLink.hidden = true;
    transitDetailActionLink.removeAttribute("href");
  }

  syncLocalizedNodes(transitDetailModal);
}

function renderTransitDetailLoadingState() {
  renderTransitDetailPlaceholder(
    transitDetailLabels.loadingTitle,
    transitDetailLabels.loadingSummary,
    transitDetailLabels.loadingBody
  );
}

function renderTransitDetailUnavailableState() {
  renderTransitDetailPlaceholder(
    transitDetailLabels.unavailableTitle,
    transitDetailLabels.unavailableSummary,
    transitDetailLabels.unavailableBody
  );
}

function renderTransitDetailErrorState() {
  renderTransitDetailPlaceholder(
    transitDetailLabels.errorTitle,
    transitDetailLabels.errorSummary,
    transitDetailLabels.errorBody
  );
}

function renderTransitDetail(detail) {
  if (!transitDetailModal) {
    return;
  }

  setTransitDetailBusyState(false);
  setTransitDetailTag(detail.tag || transitDetailLabels.defaultTag);

  if (transitDetailTitleNode) {
    transitDetailTitleNode.innerHTML = renderLocalizedContent(detail.title);
  }

  if (transitDetailSummaryNode) {
    transitDetailSummaryNode.innerHTML = renderLocalizedContent(detail.summary);
  }

  if (transitDetailMetaNode) {
    const metaMarkup = [
      renderTransitDetailFact(transitDetailLabels.segment, detail.segment),
      renderTransitDetailFact(transitDetailLabels.from, detail.from),
      renderTransitDetailFact(transitDetailLabels.to, detail.to),
      renderTransitDetailFact(transitDetailLabels.transport, detail.transport)
    ]
      .filter(Boolean)
      .join("");

    transitDetailMetaNode.hidden = !metaMarkup;
    transitDetailMetaNode.innerHTML = metaMarkup;
  }

  if (transitDetailSectionsNode) {
    transitDetailSectionsNode.innerHTML = [
      renderTransitDetailTextSection(transitDetailLabels.why, detail.why),
      renderTransitDetailListSection(
        transitDetailLabels.practicalNotes,
        detail.practicalNotes
      ),
      renderTransitDetailListSection(
        transitDetailLabels.prepReminders,
        detail.prepReminders
      ),
      renderTransitDetailListSection(
        transitDetailLabels.fallbackOptions,
        detail.fallbackOptions
      )
    ]
      .filter(Boolean)
      .join("");
  }

  if (transitDetailActionLink) {
    if (detail.action?.href) {
      transitDetailActionLink.hidden = false;
      transitDetailActionLink.href = detail.action.href;
      transitDetailActionLink.innerHTML = renderLocalizedContent(
        detail.action.label || transitDetailLabels.fallbackAction
      );
    } else {
      transitDetailActionLink.hidden = true;
      transitDetailActionLink.removeAttribute("href");
    }
  }

  syncLocalizedNodes(transitDetailModal);
}

function openTransitDetail(detailId, triggerElement) {
  if (!transitDetailModal || !detailId) {
    return;
  }

  if (resetProgressModal && !resetProgressModal.hidden) {
    setResetModalOpen(false);
  }

  lastTransitTrigger = triggerElement || document.activeElement;
  activeTransitDetailId = detailId;
  renderTransitDetailLoadingState();
  setTransitModalOpen(true);

  loadTransitDetailItems()
    .then(() => {
      if (activeTransitDetailId !== detailId) {
        return;
      }

      const detail = transitDetailItemMap.get(detailId);
      if (!detail) {
        renderTransitDetailUnavailableState();
        return;
      }

      renderTransitDetail(detail);
    })
    .catch(() => {
      if (activeTransitDetailId === detailId) {
        renderTransitDetailErrorState();
      }
    });
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function average(values) {
  if (!values.length) {
    return 0;
  }

  return values.reduce((total, value) => total + value, 0) / values.length;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function syncLocalizedNodes(scope = document) {
  const activeLanguage = root.lang === "ja" ? "ja" : "en";
  scope.querySelectorAll("[data-language]").forEach((node) => {
    node.hidden = node.dataset.language !== activeLanguage;
  });
}

function setLocalizedMarkupIfChanged(node, markup) {
  if (!node) {
    return false;
  }

  if (localizedMarkupCache.get(node) === markup) {
    return false;
  }

  node.innerHTML = markup;
  localizedMarkupCache.set(node, markup);

  if (root.lang === "ja") {
    syncLocalizedNodes(node);
  }

  return true;
}

function setLocalizedNodeContent(node, content) {
  if (!node) {
    return;
  }

  node.innerHTML = renderLocalizedContent(content);
  syncLocalizedNodes(node);
}

function isStandaloneDisplayMode() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

function readInlineJsonPayload(selector) {
  if (inlineJsonPayloadCache.has(selector)) {
    return inlineJsonPayloadCache.get(selector);
  }

  const node = document.querySelector(selector);
  if (!node) {
    inlineJsonPayloadCache.set(selector, null);
    return null;
  }

  try {
    const parsed = JSON.parse(node.textContent || "null");
    inlineJsonPayloadCache.set(selector, parsed);
    return parsed;
  } catch (error) {
    inlineJsonPayloadCache.set(selector, null);
    return null;
  }
}

function getInlineJsonArray(selector) {
  const parsed = readInlineJsonPayload(selector);
  return Array.isArray(parsed) ? parsed : null;
}

function getInlineJsonObject(selector) {
  const parsed = readInlineJsonPayload(selector);
  return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : null;
}

function getBudgetEstimateSources() {
  if (budgetEstimateSources) {
    return budgetEstimateSources;
  }

  budgetEstimateSources =
    getInlineJsonObject(inlineDataSelectors.budgetEstimate) || {
      lastUpdated: "",
      updatedCopy: { en: "", ja: "" },
      metaCopy: { en: "", ja: "" },
      fx: null,
      tripBaseCosts: {},
      dayProfiles: {},
      sourceGroups: []
    };

  return budgetEstimateSources;
}

function getOfflineStatusContent() {
  if (offlineSnapshotMode) {
    return offlineLabels.snapshot;
  }

  if (!("serviceWorker" in navigator) || !window.isSecureContext) {
    return offlineLabels.unsupported;
  }

  if (offlineRegistrationError) {
    return offlineLabels.error;
  }

  if (offlineRegistrationReady) {
    if (!navigator.onLine) {
      return offlineLabels.activeOffline;
    }

    if (offlineAppInstalled) {
      return offlineLabels.installed;
    }

    return deferredInstallPrompt ? offlineLabels.readyInstallable : offlineLabels.ready;
  }

  return offlineExperienceBooted ? offlineLabels.caching : offlineLabels.checking;
}

function getOfflineMetaContent() {
  if (offlineSnapshotMode) {
    return offlineLabels.snapshotMeta;
  }

  if (!("serviceWorker" in navigator) || !window.isSecureContext) {
    return offlineLabels.installHintMeta;
  }

  if (deferredInstallPrompt || offlineAppInstalled) {
    return offlineLabels.standardMeta;
  }

  return offlineLabels.installHintMeta;
}

function syncOfflineToolsUI() {
  if (offlineToolsCard) {
    offlineToolsCard.dataset.offlineVersion = offlineBundleVersion;
  }

  if (offlineDownloadLink) {
    offlineDownloadLink.setAttribute("href", offlineSnapshotUrl);
  }

  setLocalizedNodeContent(offlineStatusNode, getOfflineStatusContent());
  setLocalizedNodeContent(offlineMetaNode, getOfflineMetaContent());

  if (!offlineInstallButton) {
    return;
  }

  const canPromptInstall =
    !offlineSnapshotMode &&
    !offlineAppInstalled &&
    Boolean(deferredInstallPrompt);

  offlineInstallButton.hidden = !canPromptInstall;
  offlineInstallButton.disabled = !canPromptInstall;
}

async function promptOfflineInstall() {
  if (!deferredInstallPrompt) {
    syncOfflineToolsUI();
    return;
  }

  try {
    await deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    if (choice?.outcome === "accepted") {
      offlineAppInstalled = true;
    }
  } catch (error) {
    // Keep the UI stable if the browser rejects or ignores the prompt.
  }

  deferredInstallPrompt = null;
  syncOfflineToolsUI();
}

function bootOfflineExperience() {
  if (offlineInstallButton && offlineInstallButton.dataset.offlineBound !== "true") {
    offlineInstallButton.addEventListener("click", () => {
      void promptOfflineInstall();
    });
    offlineInstallButton.dataset.offlineBound = "true";
  }

  if (offlineExperienceBooted) {
    syncOfflineToolsUI();
    return;
  }

  offlineExperienceBooted = true;
  offlineAppInstalled = isStandaloneDisplayMode();
  offlineRegistrationReady = Boolean(navigator.serviceWorker?.controller);

  window.addEventListener("online", syncOfflineToolsUI);
  window.addEventListener("offline", syncOfflineToolsUI);

  window.addEventListener("beforeinstallprompt", (event) => {
    deferredInstallPrompt = event;
    syncOfflineToolsUI();
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    offlineAppInstalled = true;
    syncOfflineToolsUI();
  });

  if (offlineSnapshotMode) {
    syncOfflineToolsUI();
    return;
  }

  if (!("serviceWorker" in navigator) || !window.isSecureContext) {
    syncOfflineToolsUI();
    return;
  }

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    offlineRegistrationReady = true;
    syncOfflineToolsUI();
  });

  navigator.serviceWorker
    .register(serviceWorkerUrl)
    .then((registration) => {
      offlineRegistration = registration;
      offlineRegistrationError = false;
      syncOfflineToolsUI();
      return navigator.serviceWorker.ready;
    })
    .then((registration) => {
      offlineRegistration = registration;
      offlineRegistrationReady = true;
      syncOfflineToolsUI();
    })
    .catch(() => {
      offlineRegistration = null;
      offlineRegistrationReady = false;
      offlineRegistrationError = true;
      syncOfflineToolsUI();
    });

  syncOfflineToolsUI();
}

function getChecklistInputs() {
  return Array.from(document.querySelectorAll('.day-card input[type="checkbox"]'));
}

function getBookingTransitRoot() {
  return document.querySelector("[data-booking-transit]");
}

function getBookingTransitGroupsRoot() {
  return document.querySelector("[data-booking-transit-groups]");
}

function getBookingTransitLoadingState() {
  return document.querySelector("[data-booking-loading]");
}

function getBookingTransitErrorState() {
  return document.querySelector("[data-booking-error]");
}

function getBookingTransitEmptyState() {
  return document.querySelector("[data-booking-empty]");
}

function getFujiForecastSummaryNode() {
  return document.querySelector("[data-fuji-forecast-summary]");
}

function getFujiForecastCardNode() {
  return document.querySelector("[data-fuji-forecast-card]");
}

function getFujiForecastSurfaceNodes() {
  return Array.from(document.querySelectorAll("[data-fuji-forecast-surface]"));
}

function getTokyoShiftedDate(date = new Date()) {
  return new Date(date.getTime() + 9 * 60 * 60 * 1000);
}

function formatTokyoDateKey(date) {
  return [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0")
  ].join("-");
}

function getUpcomingFujiDateKeys() {
  const shiftedNow = getTokyoShiftedDate();
  shiftedNow.setUTCHours(0, 0, 0, 0);

  return [1, 2].map((daysAhead) => {
    const nextDate = new Date(shiftedNow);
    nextDate.setUTCDate(nextDate.getUTCDate() + daysAhead);
    return formatTokyoDateKey(nextDate);
  });
}

function getFujiRelativeDayCopy(dateKey) {
  const [tomorrowKey, followingKey] = getUpcomingFujiDateKeys();

  if (dateKey === tomorrowKey) {
    return { en: "Tomorrow", ja: "明日" };
  }

  if (dateKey === followingKey) {
    return { en: "Day after tomorrow", ja: "あさって" };
  }

  return { en: dateKey, ja: dateKey };
}

function parseTokyoHourDate(timeString) {
  return new Date(`${timeString}:00+09:00`);
}

function formatFujiWindowCopy(windowData) {
  const dayLabel = getFujiRelativeDayCopy(windowData.dateKey);
  return {
    en: `${dayLabel.en} ${windowData.startHour}:00-${windowData.endHour}:00`,
    ja: `${dayLabel.ja} ${windowData.startHour}:00〜${windowData.endHour}:00`
  };
}

function formatFujiUpdatedCopy(timestamp) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: fujiForecastTimezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
  const formattedTime = formatter.format(new Date(timestamp));

  return {
    en: `Updated ${formattedTime} JST`,
    ja: `${formattedTime} JST 更新`
  };
}

function getFujiWeatherCodeScore(weatherCode) {
  if (weatherCode === 0) {
    return 1;
  }

  if (weatherCode === 1) {
    return 0.94;
  }

  if (weatherCode === 2) {
    return 0.82;
  }

  if (weatherCode === 3) {
    return 0.62;
  }

  if (weatherCode === 45 || weatherCode === 48) {
    return 0.18;
  }

  if ([51, 53, 55, 56, 57].includes(weatherCode)) {
    return 0.5;
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
    return 0.22;
  }

  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    return 0.12;
  }

  if (weatherCode >= 95) {
    return 0.04;
  }

  return 0.4;
}

function buildFujiForecastUrl(spotConfig) {
  const params = new URLSearchParams({
    latitude: String(spotConfig.latitude),
    longitude: String(spotConfig.longitude),
    timezone: fujiForecastTimezone,
    forecast_days: "3",
    hourly:
      "cloud_cover,visibility,weather_code,precipitation_probability,sunshine_duration"
  });

  return `${fujiForecastApiUrl}?${params.toString()}`;
}

function normalizeFujiSpotForecast(spotConfig, payload) {
  const hourly = payload?.hourly;
  if (!hourly?.time?.length) {
    throw new Error(`Missing hourly forecast for ${spotConfig.id}`);
  }

  return {
    spot: spotConfig,
    hours: hourly.time.map((time, index) => ({
      time,
      dateKey: time.slice(0, 10),
      hour: Number(time.slice(11, 13)),
      visibilityKm: Number(hourly.visibility?.[index] ?? 0) / 1000,
      cloudCover: Number(hourly.cloud_cover?.[index] ?? 100),
      precipitationProbability: Number(hourly.precipitation_probability?.[index] ?? 100),
      weatherCode: Number(hourly.weather_code?.[index] ?? 99),
      sunshineRatio: clamp(Number(hourly.sunshine_duration?.[index] ?? 0) / 3600, 0, 1)
    }))
  };
}

function fetchFujiSpotForecast(spotConfig) {
  return window
    .fetch(buildFujiForecastUrl(spotConfig))
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Fuji forecast request failed: ${response.status}`);
      }

      return response.json();
    })
    .then((payload) => normalizeFujiSpotForecast(spotConfig, payload));
}

function scoreFujiSpotWindow(spotForecast, windowHours) {
  const visibilityScore = average(windowHours.map((entry) => clamp(entry.visibilityKm / 20, 0, 1)));
  const cloudScore = average(windowHours.map((entry) => 1 - clamp(entry.cloudCover / 100, 0, 1)));
  const precipitationScore = average(
    windowHours.map((entry) => 1 - clamp(entry.precipitationProbability / 100, 0, 1))
  );
  const weatherCodeScore = average(
    windowHours.map(
      (entry) => getFujiWeatherCodeScore(entry.weatherCode) * 0.72 + entry.sunshineRatio * 0.28
    )
  );
  const dawnBonus = average(
    windowHours.map((entry) => (entry.hour >= 5 && entry.hour <= 8 ? 1 : 0.3))
  );
  const score =
    visibilityScore * 0.35 +
    cloudScore * 0.3 +
    precipitationScore * 0.2 +
    weatherCodeScore * 0.1 +
    dawnBonus * 0.05;

  return {
    spotId: spotForecast.spot.id,
    dateKey: windowHours[0].dateKey,
    startHour: windowHours[0].hour,
    endHour: windowHours[windowHours.length - 1].hour + 1,
    score,
    metrics: {
      visibilityKm: average(windowHours.map((entry) => entry.visibilityKm)),
      cloudCover: average(windowHours.map((entry) => entry.cloudCover)),
      precipitationProbability: average(
        windowHours.map((entry) => entry.precipitationProbability)
      ),
      sunshineRatio: average(windowHours.map((entry) => entry.sunshineRatio)),
      weatherCodeScore
    }
  };
}

function buildFujiSpotWindowMap(spotForecast) {
  const allowedDateKeys = new Set(getUpcomingFujiDateKeys());
  const windowMap = new Map();

  allowedDateKeys.forEach((dateKey) => {
    const dateEntries = spotForecast.hours.filter(
      (entry) => entry.dateKey === dateKey && entry.hour >= 4 && entry.hour <= 10
    );
    const hourMap = new Map(dateEntries.map((entry) => [entry.hour, entry]));

    [4, 5, 6, 7].forEach((startHour) => {
      const windowHours = [0, 1, 2]
        .map((offset) => hourMap.get(startHour + offset))
        .filter(Boolean);
      if (windowHours.length !== 3) {
        return;
      }

      const key = `${dateKey}|${startHour}`;
      windowMap.set(key, scoreFujiSpotWindow(spotForecast, windowHours));
    });
  });

  return windowMap;
}

function scoreFujiWindows(spotForecasts) {
  const spotWindowMaps = new Map(
    spotForecasts.map((spotForecast) => [spotForecast.spot.id, buildFujiSpotWindowMap(spotForecast)])
  );
  const chureitoWindows = spotWindowMaps.get("chureito");
  const kawaguchikoWindows = spotWindowMaps.get("kawaguchiko");

  if (!chureitoWindows || !kawaguchikoWindows) {
    return null;
  }

  return Array.from(chureitoWindows.entries())
    .map(([key, chureitoWindow]) => {
      const kawaguchikoWindow = kawaguchikoWindows.get(key);
      if (!kawaguchikoWindow) {
        return null;
      }

      return {
        ...chureitoWindow,
        score: chureitoWindow.score * 0.58 + kawaguchikoWindow.score * 0.42,
        spots: {
          chureito: chureitoWindow,
          kawaguchiko: kawaguchikoWindow
        },
        metrics: {
          visibilityKm: average([
            chureitoWindow.metrics.visibilityKm,
            kawaguchikoWindow.metrics.visibilityKm
          ]),
          cloudCover: average([
            chureitoWindow.metrics.cloudCover,
            kawaguchikoWindow.metrics.cloudCover
          ]),
          precipitationProbability: average([
            chureitoWindow.metrics.precipitationProbability,
            kawaguchikoWindow.metrics.precipitationProbability
          ]),
          sunshineRatio: average([
            chureitoWindow.metrics.sunshineRatio,
            kawaguchikoWindow.metrics.sunshineRatio
          ]),
          weatherCodeScore: average([
            chureitoWindow.metrics.weatherCodeScore,
            kawaguchikoWindow.metrics.weatherCodeScore
          ])
        }
      };
    })
    .filter(Boolean)
    .sort((left, right) => right.score - left.score)[0];
}

function buildFujiReasonCopy(windowData) {
  const reasonParts = [];
  const { cloudCover, visibilityKm, precipitationProbability, sunshineRatio } = windowData.metrics;

  if (cloudCover <= 32) {
    reasonParts.push({ en: "low cloud cover", ja: "雲が少なめ" });
  } else if (cloudCover >= 68) {
    reasonParts.push({ en: "thick cloud cover", ja: "雲が厚め" });
  } else {
    reasonParts.push({ en: "mixed cloud cover", ja: "雲はやや多め" });
  }

  if (visibilityKm >= 18) {
    reasonParts.push({ en: "good visibility", ja: "視程が良い" });
  } else if (visibilityKm <= 10) {
    reasonParts.push({ en: "limited visibility", ja: "視程が弱め" });
  } else {
    reasonParts.push({ en: "fair visibility", ja: "視程はまずまず" });
  }

  if (precipitationProbability <= 18) {
    reasonParts.push({ en: "low rain chance", ja: "雨の可能性が低い" });
  } else if (precipitationProbability >= 48) {
    reasonParts.push({ en: "high rain chance", ja: "雨の可能性が高い" });
  } else {
    reasonParts.push({ en: "some rain risk", ja: "雨の可能性が少しある" });
  }

  if (sunshineRatio >= 0.45 && reasonParts.length < 4) {
    reasonParts.push({ en: "some sunshine", ja: "日差しの期待あり" });
  }

  return {
    en: reasonParts.slice(0, 3).map((part) => part.en).join(", "),
    ja: reasonParts.slice(0, 3).map((part) => part.ja).join("、")
  };
}

function buildFujiForecastResult(bestWindow, fetchedAt) {
  const chureitoScore = bestWindow.spots.chureito.score;
  const kawaguchikoScore = bestWindow.spots.kawaguchiko.score;
  const lakeAdvantage = kawaguchikoScore - chureitoScore;
  let state = "mixed";
  let badge = { en: "Mixed", ja: "様子見" };
  let recommendation = {
    en: "Fuji may appear in short windows. Check early, then decide.",
    ja: "富士山は短い時間だけ見える可能性があります。朝に確認してから決めましょう。"
  };
  let summaryRecommendation = {
    en: "Check early, then decide between Chureito and the lake.",
    ja: "朝に確認してから、忠霊塔か湖畔かを決めましょう。"
  };

  if (bestWindow.score >= 0.74 && chureitoScore >= 0.68) {
    state = "good";
    badge = { en: "Excellent", ja: "好条件" };
    recommendation = {
      en: "Do Chureito first.",
      ja: "忠霊塔を先に回りましょう。"
    };
    summaryRecommendation = {
      en: "Start with Chureito if you can move in that window.",
      ja: "その時間に動けるなら、忠霊塔から始めましょう。"
    };
  } else if (bestWindow.score < 0.55 || chureitoScore < 0.48 || lakeAdvantage >= 0.16) {
    state = "poor";
    badge = { en: "Poor", ja: "視界弱め" };
    recommendation = {
      en: "Low Fuji visibility likely. Keep Chureito optional and prioritize flexible sightseeing.",
      ja: "富士山の見え方は弱めの可能性があります。忠霊塔は任意にして、柔軟な観光を優先しましょう。"
    };
    summaryRecommendation = {
      en: "Keep Chureito optional and prioritize the lake or flexible sightseeing.",
      ja: "忠霊塔は任意にして、湖畔や柔軟な観光を優先しましょう。"
    };
  }

  return {
    state,
    badge,
    title: {
      en: "Weather-aware Fuji suggestion",
      ja: "天気に合わせた富士山プラン"
    },
    summaryTitle: {
      en: "Fuji weather watch",
      ja: "富士山の見え方チェック"
    },
    windowPrefix: {
      en: "Best Fuji view window",
      ja: "富士山が見えやすい時間"
    },
    window: formatFujiWindowCopy(bestWindow),
    recommendation,
    summaryRecommendation,
    reason: buildFujiReasonCopy(bestWindow),
    updated: formatFujiUpdatedCopy(fetchedAt),
    sourceLabel: {
      en: "Weather source: Open-Meteo",
      ja: "天気ソース: Open-Meteo"
    }
  };
}

function readCachedFujiForecast() {
  try {
    const cached = JSON.parse(window.sessionStorage.getItem(fujiForecastSessionKey) || "null");
    if (!cached?.timestamp || !cached?.result) {
      return null;
    }

    if (Date.now() - Number(cached.timestamp) > fujiForecastCacheMaxAgeMs) {
      return null;
    }

    return cached.result;
  } catch (error) {
    return null;
  }
}

function storeCachedFujiForecast(result) {
  try {
    window.sessionStorage.setItem(
      fujiForecastSessionKey,
      JSON.stringify({
        timestamp: Date.now(),
        result
      })
    );
  } catch (error) {
    // Ignore cache failures and keep the forecast optional.
  }
}

function renderFujiForecastLoading() {
  const summaryNode = getFujiForecastSummaryNode();
  const cardNode = getFujiForecastCardNode();

  if (summaryNode) {
    summaryNode.dataset.state = "loading";
    summaryNode.innerHTML = `
      <p class="fuji-forecast__eyebrow">${renderLocalizedContent({
        en: "Fuji weather watch",
        ja: "富士山の見え方チェック"
      })}</p>
      <p class="fuji-forecast__summary-window">${renderLocalizedContent({
        en: "Checking the next 2 mornings...",
        ja: "これから2日分の朝を確認しています..."
      })}</p>
      <p class="fuji-forecast__summary-text">${renderLocalizedContent({
        en: "Checking the next morning Fuji window...",
        ja: "次の朝の富士山の見え方を確認しています..."
      })}</p>
    `;
    syncLocalizedNodes(summaryNode);
  }

  if (cardNode) {
    cardNode.dataset.state = "loading";
    cardNode.innerHTML = `
      <div class="fuji-forecast__header">
        <p class="fuji-forecast__eyebrow">${renderLocalizedContent({
          en: "Fuji weather watch",
          ja: "富士山の見え方チェック"
        })}</p>
        <span class="fuji-forecast__badge">${renderLocalizedContent({
          en: "Checking",
          ja: "確認中"
        })}</span>
      </div>
      <h3 class="fuji-forecast__title">${renderLocalizedContent({
        en: "Weather-aware Fuji suggestion",
        ja: "天気に合わせた富士山プラン"
      })}</h3>
      <p class="fuji-forecast__label">${renderLocalizedContent({
        en: "Best Fuji view window",
        ja: "富士山が見えやすい時間"
      })}</p>
      <p class="fuji-forecast__body">${renderLocalizedContent({
        en: "Checking Kawaguchiko and Chureito morning conditions for the next two days.",
        ja: "河口湖と忠霊塔の朝の条件を、これから2日分確認しています。"
      })}</p>
    `;
    syncLocalizedNodes(cardNode);
  }

  scheduleDayCardRowHeights();
}

function renderFujiForecastError() {
  const summaryNode = getFujiForecastSummaryNode();
  const cardNode = getFujiForecastCardNode();

  if (summaryNode) {
    summaryNode.dataset.state = "error";
    summaryNode.innerHTML = `
      <p class="fuji-forecast__eyebrow">${renderLocalizedContent({
        en: "Fuji weather watch",
        ja: "富士山の見え方チェック"
      })}</p>
      <p class="fuji-forecast__summary-window">${renderLocalizedContent({
        en: "Forecast unavailable",
        ja: "予報を取得できません"
      })}</p>
      <p class="fuji-forecast__summary-text">${renderLocalizedContent({
        en: "Forecast unavailable. Keep Chureito optional and protect the Tokyo handoff.",
        ja: "予報を取得できません。忠霊塔は任意にして、東京への移動を優先しましょう。"
      })}</p>
    `;
    syncLocalizedNodes(summaryNode);
  }

  if (cardNode) {
    cardNode.dataset.state = "error";
    cardNode.innerHTML = `
      <div class="fuji-forecast__header">
        <p class="fuji-forecast__eyebrow">${renderLocalizedContent({
          en: "Fuji weather watch",
          ja: "富士山の見え方チェック"
        })}</p>
        <span class="fuji-forecast__badge">${renderLocalizedContent({
          en: "Fallback",
          ja: "代替案"
        })}</span>
      </div>
      <h3 class="fuji-forecast__title">${renderLocalizedContent({
        en: "Use the flexible Fuji plan",
        ja: "柔軟な富士山プランを使う"
      })}</h3>
      <p class="fuji-forecast__recommendation">${renderLocalizedContent({
        en: "Forecast unavailable. Decide after a quick Fuji check, then keep Tokyo timing clean.",
        ja: "予報を取得できません。富士山を軽く確認してから判断し、そのあと東京移動の時刻を優先しましょう。"
      })}</p>
      <p class="fuji-forecast__reason">${renderLocalizedContent({
        en: "Fallback: keep Chureito optional and prioritize the lake or flexible sightseeing.",
        ja: "代替案: 忠霊塔は任意にして、湖畔や柔軟な観光を優先しましょう。"
      })}</p>
      <div class="fuji-forecast__meta">
        <span>${renderLocalizedContent({
          en: "Weather source unavailable right now",
          ja: "現在は天気ソースに接続できません"
        })}</span>
      </div>
    `;
    syncLocalizedNodes(cardNode);
  }

  scheduleDayCardRowHeights();
}

function renderFujiSuggestion(result) {
  const summaryNode = getFujiForecastSummaryNode();
  const cardNode = getFujiForecastCardNode();
  const escapedWindowEn = escapeHtml(result.window.en);
  const escapedWindowJa = escapeHtml(result.window.ja);

  if (summaryNode) {
    summaryNode.dataset.state = result.state;
    summaryNode.innerHTML = `
      <p class="fuji-forecast__eyebrow">${renderLocalizedContent(result.summaryTitle)}</p>
      <p class="fuji-forecast__summary-window">
        <span data-language="en">${escapeHtml(result.windowPrefix.en)}: ${escapedWindowEn}</span>
        <span data-language="ja" hidden>${escapeHtml(result.windowPrefix.ja)}: ${escapedWindowJa}</span>
      </p>
      <p class="fuji-forecast__summary-text">${renderLocalizedContent(result.summaryRecommendation)}</p>
    `;
    syncLocalizedNodes(summaryNode);
  }

  if (cardNode) {
    cardNode.dataset.state = result.state;
    cardNode.innerHTML = `
      <div class="fuji-forecast__header">
        <p class="fuji-forecast__eyebrow">${renderLocalizedContent(result.summaryTitle)}</p>
        <span class="fuji-forecast__badge">${renderLocalizedContent(result.badge)}</span>
      </div>
      <h3 class="fuji-forecast__title">${renderLocalizedContent(result.title)}</h3>
      <p class="fuji-forecast__label">${renderLocalizedContent(result.windowPrefix)}</p>
      <p class="fuji-forecast__window">
        <span data-language="en">${escapedWindowEn}</span>
        <span data-language="ja" hidden>${escapedWindowJa}</span>
      </p>
      <p class="fuji-forecast__recommendation">${renderLocalizedContent(result.recommendation)}</p>
      <p class="fuji-forecast__reason">${renderLocalizedContent(result.reason)}</p>
      <div class="fuji-forecast__meta">
        <span>${renderLocalizedContent(result.updated)}</span>
        <a
          class="fuji-forecast__source"
          href="${fujiForecastSourceUrl}"
          target="_blank"
          rel="noopener noreferrer">
          ${renderLocalizedContent(result.sourceLabel)}
        </a>
      </div>
    `;
    syncLocalizedNodes(cardNode);
  }

  scheduleDayCardRowHeights();
}

function fetchFujiForecast() {
  const cached = readCachedFujiForecast();
  if (cached) {
    return Promise.resolve(cached);
  }

  return Promise.all(fujiForecastSpotConfigs.map((spotConfig) => fetchFujiSpotForecast(spotConfig)))
    .then((spotForecasts) => {
      const bestWindow = scoreFujiWindows(spotForecasts);
      if (!bestWindow) {
        throw new Error("Fuji forecast windows unavailable");
      }

      const result = buildFujiForecastResult(bestWindow, Date.now());
      storeCachedFujiForecast(result);
      return result;
    });
}

function initializeFujiForecast() {
  const surfaces = getFujiForecastSurfaceNodes();
  if (!surfaces.length) {
    return Promise.resolve(null);
  }

  if (fujiForecastResult) {
    renderFujiSuggestion(fujiForecastResult);
    return Promise.resolve(fujiForecastResult);
  }

  const cachedForecast = readCachedFujiForecast();
  if (cachedForecast) {
    fujiForecastResult = cachedForecast;
    renderFujiSuggestion(cachedForecast);
    return Promise.resolve(cachedForecast);
  }

  if (fujiForecastPromise) {
    return fujiForecastPromise;
  }

  if (!navigator.onLine) {
    renderFujiForecastError();
    return Promise.resolve(null);
  }

  renderFujiForecastLoading();

  fujiForecastPromise = fetchFujiForecast()
    .then((result) => {
      fujiForecastResult = result;
      renderFujiSuggestion(result);
      return result;
    })
    .catch((error) => {
      renderFujiForecastError();
      return null;
    })
    .finally(() => {
      fujiForecastPromise = null;
    });

  return fujiForecastPromise;
}

function readStoredThemePreference() {
  try {
    const storedTheme = window.localStorage.getItem(themeStorageKey);
    return storedTheme === "light" || storedTheme === "dark" ? storedTheme : "";
  } catch (error) {
    return "";
  }
}

function storeThemePreference(theme) {
  try {
    queueStorageValue(themeStorageKey, theme);
  } catch (error) {
    // Ignore storage failures and keep the page usable.
  }
}

function getCurrentTheme() {
  const explicitTheme = root.dataset.theme;
  if (explicitTheme === "light" || explicitTheme === "dark") {
    return explicitTheme;
  }

  return getSystemTheme();
}

function updateThemeButtons(theme) {
  themeButtons.forEach((button) => {
    const isActive = button.dataset.setTheme === theme;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function updateThemeColorMeta(theme) {
  if (!themeColorMeta) {
    return;
  }

  themeColorMeta.content = theme === "dark" ? "#111315" : "#9b3c33";
}

function isLikelyLowerPowerDevice() {
  const deviceMemory = Number(navigator.deviceMemory || 0);
  const hardwareConcurrency = Number(navigator.hardwareConcurrency || 0);

  return (
    (deviceMemory > 0 && deviceMemory <= 4) ||
    (hardwareConcurrency > 0 && hardwareConcurrency <= 4)
  );
}

function shouldReduceEffects() {
  return (
    aggressivePerformanceMode ||
    reducedMotionQuery.matches ||
    coarsePointerQuery.matches ||
    compactViewportQuery.matches ||
    isLikelyLowerPowerDevice()
  );
}

function syncReducedEffectsMode({ force = false } = {}) {
  const nextReducedEffectsEnabled = shouldReduceEffects();
  if (!force && reducedEffectsEnabled === nextReducedEffectsEnabled) {
    return;
  }

  reducedEffectsEnabled = nextReducedEffectsEnabled;
  root.classList.toggle("reduce-effects", reducedEffectsEnabled);
  root.classList.toggle("enhanced-effects", !reducedEffectsEnabled);
}

function bindMediaQueryChange(query, handler) {
  if (typeof query.addEventListener === "function") {
    query.addEventListener("change", handler);
    return;
  }

  if (typeof query.addListener === "function") {
    query.addListener(handler);
  }
}

function getOrderedDayNumbers() {
  return dayCards
    .map((card) => Number(card.dataset.day))
    .filter((day) => !Number.isNaN(day))
    .sort((left, right) => left - right);
}

function getTrackedDayNumbers() {
  return getOrderedDayNumbers();
}

function readStoredDaySet(key) {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) || "[]");
    if (!Array.isArray(parsed)) {
      return new Set();
    }

    return new Set(parsed.map((value) => String(value)));
  } catch (error) {
    return new Set();
  }
}

function storeDaySet(key, daySet) {
  try {
    const sortedDays = Array.from(daySet).sort((left, right) => Number(left) - Number(right));
    queueStorageValue(key, JSON.stringify(sortedDays));
  } catch (error) {
    // Ignore storage failures and keep the page usable.
  }
}

function setsMatch(left, right) {
  if (left.size !== right.size) {
    return false;
  }

  for (const value of left) {
    if (!right.has(value)) {
      return false;
    }
  }

  return true;
}

function getJourneyState() {
  const orderedDays = getTrackedDayNumbers();
  const rawCompleted = new Set();
  const validDays = new Set(orderedDays.map((day) => String(day)));

  dayCards.forEach((card) => {
    if (isDayComplete(card)) {
      rawCompleted.add(card.dataset.day);
    }
  });

  const completedHistory = new Set(
    Array.from(completedHistoryDays).filter((day) => validDays.has(day))
  );
  rawCompleted.forEach((day) => {
    completedHistory.add(day);
  });

  const nextUnlockedDays = new Set();
  if (orderedDays.length) {
    nextUnlockedDays.add(String(orderedDays[0]));
  }

  completedHistory.forEach((day) => {
    if (validDays.has(day)) {
      nextUnlockedDays.add(day);
    }
  });

  orderedDays.forEach((day, index) => {
    const nextDay = orderedDays[index + 1];
    if (completedHistory.has(String(day)) && nextDay) {
      nextUnlockedDays.add(String(nextDay));
    }
  });

  let highestUnlockedDay = orderedDays[0] || 1;
  for (const day of orderedDays) {
    if (nextUnlockedDays.has(String(day))) {
      highestUnlockedDay = day;
    }
  }

  let nextCurrentDay = highestUnlockedDay;
  for (let index = orderedDays.length - 1; index >= 0; index -= 1) {
    const day = orderedDays[index];
    const dayKey = String(day);
    if (nextUnlockedDays.has(dayKey) && !rawCompleted.has(dayKey)) {
      nextCurrentDay = day;
      break;
    }
  }

  const nextWarningDays = new Set(
    Array.from(completedHistory).filter((day) => !rawCompleted.has(day))
  );

  return {
    rawCompleted,
    completedHistory,
    unlockedDays: nextUnlockedDays,
    warningDays: nextWarningDays,
    accessibleDay: highestUnlockedDay,
    currentDay: nextCurrentDay
  };
}

function readStoredChecklistState() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(checklistStorageKey) || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch (error) {
    return {};
  }
}

function storeChecklistState() {
  try {
    queueStorageValue(checklistStorageKey, JSON.stringify(checklistState));
  } catch (error) {
    // Ignore storage failures and keep the checklist usable.
  }
}

function readStoredBookingTransitState() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(bookingTransitStorageKey) || "{}");
    const nextFilter =
      parsed?.filter === "to-book" || parsed?.filter === "transit" || parsed?.filter === "done"
        ? parsed.filter
        : "all";

    return {
      filter: nextFilter,
      items: typeof parsed?.items === "object" && parsed.items ? parsed.items : {}
    };
  } catch (error) {
    return { filter: "all", items: {} };
  }
}

function storeBookingTransitState() {
  try {
    queueStorageValue(bookingTransitStorageKey, JSON.stringify(bookingTransitState));
  } catch (error) {
    // Ignore storage failures and keep the booking board usable.
  }
}

function getBookingTransitItemState(itemId) {
  const state = bookingTransitState.items[itemId];
  return {
    done: Boolean(state?.done),
    expanded: Boolean(state?.expanded)
  };
}

function updateStoredBookingTransitItemState(itemId, nextState) {
  const mergedState = {
    ...getBookingTransitItemState(itemId),
    ...nextState
  };

  if (!mergedState.done && !mergedState.expanded) {
    delete bookingTransitState.items[itemId];
  } else {
    bookingTransitState.items[itemId] = mergedState;
  }

  storeBookingTransitState();
}

function renderLocalizedContent(content) {
  return `<span data-language="en">${escapeHtml(content?.en ?? "")}</span><span data-language="ja" hidden>${escapeHtml(content?.ja ?? "")}</span>`;
}

function renderTripNotes() {
  if (!tripNotesGridNode) {
    return;
  }

  const notesMarkup = tripNoteDefinitions
    .map(
      (definition) => `
        <article class="note-card note-card--trip card" data-trip-note-day="${definition.day}">
          <h3>${renderLocalizedContent(definition.title)}</h3>
          <p>${renderLocalizedContent(definition.summary)}</p>
        </article>
      `
    )
    .join("");

  tripNotesGridNode.innerHTML = notesMarkup;
  syncLocalizedNodes(tripNotesGridNode);
}

function refreshTripNotesIfReady() {
  if (!tripNotesGridNode) {
    return;
  }

  renderTripNotes();
}

function getBudgetDayDefinition(day) {
  return (
    budgetDayDefinitions.find((definition) => definition.day === Number.parseInt(String(day), 10)) ||
    null
  );
}

function getBudgetSelectedStayDefinition(day) {
  if (typeof ensureBudgetNotesStateHydrated === "function") {
    ensureBudgetNotesStateHydrated();
  }

  const definition = getBudgetDayDefinition(day);
  if (!definition) {
    return null;
  }

  const selectedStayId =
    typeof getBudgetDayState === "function"
      ? getBudgetDayState(day)?.stayId || definition.defaultStayId || null
      : definition.defaultStayId || null;

  if (!selectedStayId || typeof budgetStayDefinitions[selectedStayId] !== "object") {
    return null;
  }

  return budgetStayDefinitions[selectedStayId];
}

function itemMatchesBookingTransitStayVisibility(itemConfig) {
  const visibility = itemConfig?.stayVisibility;
  if (!visibility || typeof visibility !== "object" || Array.isArray(visibility)) {
    return true;
  }

  const visibilityDays = Array.isArray(visibility.days)
    ? visibility.days
    : visibility.day
      ? [visibility.day]
      : [];
  const allowedStayIds = new Set(
    Array.isArray(visibility.stayIds) ? visibility.stayIds.filter(Boolean) : []
  );
  const allowedStayTypes = new Set(
    Array.isArray(visibility.stayTypes) ? visibility.stayTypes.filter(Boolean) : []
  );

  if (!visibilityDays.length || (!allowedStayIds.size && !allowedStayTypes.size)) {
    return true;
  }

  return visibilityDays.some((day) => {
    const selectedStay = getBudgetSelectedStayDefinition(day);
    if (!selectedStay) {
      return false;
    }

    return allowedStayIds.has(selectedStay.id) || allowedStayTypes.has(selectedStay.type);
  });
}

function refreshBookingTransitIfReady() {
  if (!bookingTransitInitialized) {
    return;
  }

  updateBookingTransitUI();
}

function getPreferredBookingTransitLink(item) {
  const links = Array.isArray(item.links) && item.links.length
    ? item.links
    : item.action
      ? [{ ...item.action, kind: "primary" }]
      : [];

  return links.find((link) => link.kind === "primary") || links[0] || null;
}

function renderBookingTransitItem(item) {
  const state = getBookingTransitItemState(item.id);
  const preferredLink = getPreferredBookingTransitLink(item);
  const transitTriggerMarkup = item.transitDetailId
    ? `
          <div class="booking-item__support">
            <button
              class="transit-trigger transit-trigger--booking"
              type="button"
              data-transit-detail-trigger="${escapeHtml(item.transitDetailId)}"
              aria-haspopup="dialog"
              aria-controls="transit-detail-modal">
              <span data-language="en">Transit details</span>
              <span data-language="ja" hidden>移動詳細</span>
            </button>
          </div>
      `
    : "";
  const linkMarkup = preferredLink
    ? `
          <div class="booking-item__link-grid">
            <a
              class="booking-item__cta booking-item__cta--primary booking-item__cta--stacked"
              href="${escapeHtml(preferredLink.href)}"
              target="_blank"
              rel="noopener noreferrer">
              <span class="booking-item__cta-label">${renderLocalizedContent(preferredLink.label)}</span>
              ${
                preferredLink.note
                  ? `<span class="booking-item__cta-note">${renderLocalizedContent(preferredLink.note)}</span>`
                  : ""
              }
            </a>
          </div>
      `
    : "";

  return `
    <details
      class="booking-item"
      data-booking-item
      data-booking-id="${item.id}"
      data-booking-group="${item.group}"
      data-booking-kind="${item.kind}"
      data-booking-state="${state.done ? "done" : "pending"}"
      ${state.expanded ? "open" : ""}>
      <summary>
        <span class="booking-item__meta">
          <span class="booking-item__tone">${renderLocalizedContent(item.tone)}</span>
          <span class="booking-item__status" data-booking-status>
            <span data-language="en" data-booking-status-language="en"></span>
            <span data-language="ja" data-booking-status-language="ja" hidden></span>
          </span>
        </span>
        <span class="booking-item__headline">
          <span class="booking-item__title">${renderLocalizedContent(item.title)}</span>
          <span class="booking-item__caret" aria-hidden="true"></span>
        </span>
        <span class="booking-item__summary-copy">${renderLocalizedContent(item.summary)}</span>
      </summary>
      <div class="booking-item__details">
        <div class="booking-item__details-inner">
          <p class="booking-item__detail-copy">${renderLocalizedContent(item.details)}</p>
          ${transitTriggerMarkup}
          <div class="booking-item__actions">
            ${linkMarkup}
            <button
              class="booking-item__cta booking-item__cta--secondary"
              type="button"
              data-booking-done-toggle
              aria-pressed="${state.done ? "true" : "false"}">
              <span data-language="en" data-booking-toggle-language="en"></span>
              <span data-language="ja" data-booking-toggle-language="ja" hidden></span>
            </button>
          </div>
        </div>
      </div>
    </details>
  `;
}

function renderBookingTransitBoard() {
  const bookingTransitGroupsRoot = getBookingTransitGroupsRoot();
  if (!bookingTransitGroupsRoot) {
    return;
  }

  bookingTransitGroupsRoot.innerHTML = bookingTransitGroupDefinitions
    .map((group) => {
      const itemsMarkup = bookingTransitItems
        .filter((item) => item.group === group.id)
        .map((item) => renderBookingTransitItem(item))
        .join("");

      return `
        <section class="booking-group" data-booking-group-section="${group.id}">
          <div class="booking-group__header">
            <h5 class="booking-group__title">${renderLocalizedContent(group.title)}</h5>
            <p class="booking-group__copy">${renderLocalizedContent(group.copy)}</p>
          </div>
          <div class="booking-group__list">
            ${itemsMarkup}
          </div>
        </section>
      `;
    })
    .join("");
}

function syncBookingTransitItemUI(itemElement) {
  const itemId = itemElement.dataset.bookingId;
  const itemConfig = bookingTransitItemMap.get(itemId);
  if (!itemConfig) {
    return;
  }

  const state = getBookingTransitItemState(itemId);
  itemElement.dataset.bookingState = state.done ? "done" : "pending";

  if (itemElement.open !== state.expanded) {
    itemElement.open = state.expanded;
  }

  itemElement.querySelectorAll("[data-booking-status-language]").forEach((node) => {
    const language = node.dataset.bookingStatusLanguage;
    const nextContent = state.done ? itemConfig.doneStatus[language] : itemConfig.defaultStatus[language];
    node.textContent = nextContent;
  });

  const doneButton = itemElement.querySelector("[data-booking-done-toggle]");
  if (doneButton) {
    doneButton.classList.toggle("is-complete", state.done);
    doneButton.setAttribute("aria-pressed", String(state.done));
    doneButton.querySelectorAll("[data-booking-toggle-language]").forEach((node) => {
      const language = node.dataset.bookingToggleLanguage;
      const nextContent = state.done ? itemConfig.toggleDone[language] : itemConfig.toggleDefault[language];
      node.textContent = nextContent;
    });
  }
}

function itemMatchesBookingTransitFilter(itemConfig, state) {
  if (bookingTransitState.filter === "all") {
    return true;
  }

  if (bookingTransitState.filter === "done") {
    return state.done;
  }

  return itemConfig.filters.includes(bookingTransitState.filter);
}

function updateBookingTransitUI() {
  const bookingTransitRoot = getBookingTransitRoot();
  const bookingTransitEmptyState = getBookingTransitEmptyState();

  if (!bookingTransitRoot) {
    return;
  }

  let hasVisibleItems = false;
  let hasVisibleDoneItems = false;

  bookingTransitRoot.querySelectorAll("[data-booking-filter-button]").forEach((button) => {
    const isActive = button.dataset.bookingFilterButton === bookingTransitState.filter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  bookingTransitRoot.querySelectorAll("[data-booking-item]").forEach((itemElement) => {
    const itemConfig = bookingTransitItemMap.get(itemElement.dataset.bookingId || "");
    if (!itemConfig) {
      return;
    }

    const state = getBookingTransitItemState(itemConfig.id);
    const isVisible =
      itemMatchesBookingTransitFilter(itemConfig, state) &&
      itemMatchesBookingTransitStayVisibility(itemConfig);
    itemElement.hidden = !isVisible;
    if (isVisible) {
      hasVisibleItems = true;
      if (state.done) {
        hasVisibleDoneItems = true;
      }
    }

    syncBookingTransitItemUI(itemElement);
  });

  bookingTransitRoot.querySelectorAll("[data-booking-group-section]").forEach((groupElement) => {
    groupElement.hidden = !groupElement.querySelector("[data-booking-item]:not([hidden])");
  });

  if (bookingTransitEmptyState) {
    bookingTransitEmptyState.hidden =
      bookingTransitState.filter !== "done" || hasVisibleDoneItems || !bookingTransitItems.length;
  }

  if (!hasVisibleItems && bookingTransitState.filter !== "done") {
    bookingTransitState.filter = "all";
    storeBookingTransitState();
    updateBookingTransitUI();
  }
}

function setBookingTransitFilter(nextFilter) {
  const allowedFilters = new Set(["all", "to-book", "transit", "done"]);
  bookingTransitState.filter = allowedFilters.has(nextFilter) ? nextFilter : "all";
  storeBookingTransitState();
  updateBookingTransitUI();
}

function bindBookingTransitUI() {
  const bookingTransitRoot = getBookingTransitRoot();
  if (!bookingTransitRoot) {
    return;
  }

  if (bookingTransitRoot.dataset.bookingFiltersBound !== "true") {
    bookingTransitRoot.querySelectorAll("[data-booking-filter-button]").forEach((button) => {
      button.addEventListener("click", () => {
        setBookingTransitFilter(button.dataset.bookingFilterButton || "all");
      });
    });
    bookingTransitRoot.dataset.bookingFiltersBound = "true";
  }

  bookingTransitRoot.querySelectorAll("[data-booking-item]").forEach((itemElement) => {
    if (itemElement.dataset.bookingBound === "true") {
      return;
    }

    itemElement.addEventListener("toggle", () => {
      updateStoredBookingTransitItemState(itemElement.dataset.bookingId || "", {
        expanded: itemElement.open
      });
      syncBookingTransitItemUI(itemElement);
    });

    itemElement.querySelector("[data-booking-done-toggle]")?.addEventListener("click", (event) => {
      event.preventDefault();
      const itemId = itemElement.dataset.bookingId || "";
      const state = getBookingTransitItemState(itemId);
      updateStoredBookingTransitItemState(itemId, {
        done: !state.done
      });
      updateBookingTransitUI();
    });

    itemElement.querySelector("[data-transit-detail-trigger]")?.addEventListener("click", (event) => {
      event.preventDefault();
      const trigger = event.currentTarget;
      openTransitDetail(trigger.dataset.transitDetailTrigger || "", trigger);
    });

    itemElement.dataset.bookingBound = "true";
  });
}

function initializeBookingTransit() {
  const bookingTransitRoot = getBookingTransitRoot();
  if (!bookingTransitRoot || bookingTransitInitialized) {
    return Promise.resolve();
  }

  bookingTransitState = readStoredBookingTransitState();
  setBookingTransitStatus("loading");

  return loadBookingTransitItems()
    .then(() => {
      renderBookingTransitBoard();
      bindBookingTransitUI();
      updateBookingTransitUI();
      setBookingTransitStatus("ready");
      bookingTransitInitialized = true;
    })
    .catch(() => {
      setBookingTransitStatus("error");
    });
}

function resetBookingTransitState() {
  const bookingTransitRoot = getBookingTransitRoot();
  bookingTransitState = { filter: "all", items: {} };
  storeBookingTransitState();
  if (bookingTransitRoot && bookingTransitInitialized) {
    renderBookingTransitBoard();
    bindBookingTransitUI();
    updateBookingTransitUI();
  }
}

function readStoredPackingState() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(packingStorageKey) || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch (error) {
    return {};
  }
}

function storePackingState() {
  try {
    if (Object.keys(packingState).length) {
      queueStorageValue(packingStorageKey, JSON.stringify(packingState));
      return;
    }

    queueStorageRemoval(packingStorageKey);
  } catch (error) {
    // Ignore storage failures and keep the packing toggles usable.
  }
}

function getPackingItems(sectionElement) {
  return Array.from(sectionElement?.querySelectorAll("[data-packing-item]") || []);
}

function getAllPackingItems() {
  return packingSectionCards.flatMap((sectionElement) => getPackingItems(sectionElement));
}

function isPackingItemPacked(itemId) {
  return Boolean(packingState[itemId]);
}

function syncPackingSectionUI(sectionElement) {
  if (!sectionElement) {
    return;
  }

  const items = getPackingItems(sectionElement);
  let packedCount = 0;

  items.forEach((itemElement) => {
    const itemId = itemElement.dataset.packingItem || "";
    const isPacked = isPackingItemPacked(itemId);
    const checkbox = itemElement.querySelector("[data-packing-checkbox]");
    itemElement.dataset.packingState = isPacked ? "packed" : "pending";

    if (checkbox && checkbox.checked !== isPacked) {
      checkbox.checked = isPacked;
    }

    if (isPacked) {
      packedCount += 1;
    }
  });

  const totalCount = items.length;
  const isComplete = totalCount > 0 && packedCount === totalCount;
  sectionElement.dataset.packingComplete = String(isComplete);

  sectionElement.querySelectorAll("[data-packing-progress-language]").forEach((node) => {
    if (node.dataset.packingProgressLanguage === "ja") {
      node.textContent = `${packedCount} / ${totalCount} 完了`;
      return;
    }

    node.textContent = `${packedCount} / ${totalCount} packed`;
  });

  const markAllButton = sectionElement.querySelector("[data-packing-mark-all]");
  if (markAllButton) {
    markAllButton.disabled = !totalCount || isComplete;
  }

  const clearButton = sectionElement.querySelector("[data-packing-clear-section]");
  if (clearButton) {
    clearButton.disabled = packedCount === 0;
  }
}

function syncPackingUI() {
  packingSectionCards.forEach((sectionElement) => {
    syncPackingSectionUI(sectionElement);
  });

  const allPackingItems = getAllPackingItems();
  const totalPackingItems = allPackingItems.length;
  const packedItemCount = allPackingItems.filter((itemElement) =>
    isPackingItemPacked(itemElement.dataset.packingItem || "")
  ).length;
  const hasPackedItems = Object.keys(packingState).length > 0;
  const areAllItemsPacked = totalPackingItems > 0 && packedItemCount === totalPackingItems;

  packingMarkAllButtons.forEach((button) => {
    button.disabled = !totalPackingItems || areAllItemsPacked;
  });

  packingResetButtons.forEach((button) => {
    button.disabled = !hasPackedItems;
  });
}

function setPackingSectionState(sectionElement, packed) {
  if (!sectionElement) {
    return;
  }

  getPackingItems(sectionElement).forEach((itemElement) => {
    const itemId = itemElement.dataset.packingItem || "";
    if (!itemId) {
      return;
    }

    if (packed) {
      packingState[itemId] = true;
    } else {
      delete packingState[itemId];
    }
  });

  storePackingState();
  syncPackingUI();
}

function resetPackingState() {
  packingState = {};
  storePackingState();
  syncPackingUI();
}

function markAllPackingItemsPacked() {
  getAllPackingItems().forEach((itemElement) => {
    const itemId = itemElement.dataset.packingItem || "";
    if (itemId) {
      packingState[itemId] = true;
    }
  });

  storePackingState();
  syncPackingUI();
}

function bindPackingUI() {
  packingMarkAllButtons.forEach((button) => {
    if (button.dataset.packingBound === "true") {
      return;
    }

    button.addEventListener("click", () => {
      markAllPackingItemsPacked();
    });

    button.dataset.packingBound = "true";
  });

  packingResetButtons.forEach((button) => {
    if (button.dataset.packingBound === "true") {
      return;
    }

    button.addEventListener("click", () => {
      resetPackingState();
    });

    button.dataset.packingBound = "true";
  });

  packingSectionCards.forEach((sectionElement) => {
    if (sectionElement.dataset.packingBound === "true") {
      return;
    }

    sectionElement.addEventListener("change", (event) => {
      const checkbox = event.target.closest?.("[data-packing-checkbox]");
      if (!checkbox) {
        return;
      }

      const itemElement = checkbox.closest("[data-packing-item]");
      const itemId = itemElement?.dataset.packingItem || "";
      if (!itemId) {
        return;
      }

      if (checkbox.checked) {
        packingState[itemId] = true;
      } else {
        delete packingState[itemId];
      }

      storePackingState();
      syncPackingUI();
    });

    sectionElement.querySelector("[data-packing-mark-all]")?.addEventListener("click", () => {
      setPackingSectionState(sectionElement, true);
    });

    sectionElement
      .querySelector("[data-packing-clear-section]")
      ?.addEventListener("click", () => {
        setPackingSectionState(sectionElement, false);
      });

    sectionElement.dataset.packingBound = "true";
  });
}

function initializePackingToggles() {
  if (!packingSectionCards.length) {
    return;
  }

  if (!packingInitialized) {
    packingState = readStoredPackingState();
    packingInitialized = true;
  }

  bindPackingUI();
  syncPackingUI();
}

const itineraryBudgetLabels = {
  summaryTotal: { en: "Trip range", ja: "旅程の予算帯" },
  summaryPerPerson: { en: "Per-person range", ja: "1人あたりの予算帯" },
  summaryAccommodationSplit: { en: "Stay split / person range", ja: "宿泊の1人分帯" },
  summaryBookedRequired: { en: "Booked + required range", ja: "予約前提 + 必須の帯" },
  summaryRouteExtras: { en: "Route extras range", ja: "ルート追加費用の帯" },
  itineraryBasis: { en: "Estimate basis", ja: "見積りの前提" },
  estimateUnavailable: { en: "Itinerary budget notes are unavailable right now.", ja: "現在は旅程予算のメモを表示できません。" },
  breakdownHeading: { en: "Category breakdown", ja: "カテゴリ別の内訳" },
  sourcesHeading: { en: "Sources + route assumptions", ja: "出典とルート前提" },
  noteLabel: { en: "Budget note", ja: "予算メモ" },
  rangeLegendTitle: { en: "What changes the range", ja: "予算帯を動かす前提" },
  levelLean: { en: "Lean", ja: "控えめ" },
  levelExpected: { en: "Expected", ja: "標準" },
  levelHigh: { en: "High", ja: "高め" },
  rangeLegendLean: {
    en: "Cheaper route-fit stay bands, simpler meal pattern, and the lower still-practical transit or ticket choice where one exists.",
    ja: "動線に合う安めの宿泊帯、より軽い食事パターン、そして選べる場合は実用的な下側の移動・券種を使います。"
  },
  rangeLegendExpected: {
    en: "The current default itinerary model: today's main stay quotes, the direct route assumptions already shown here, and the normal casual-meal pattern.",
    ja: "現在の初期モデルです。ここに出している現行の宿泊見積り、既定のルート前提、通常寄りの食費パターンを使います。"
  },
  rangeLegendHigh: {
    en: "A higher but still realistic version: pricier route-fit stay bands, fuller sightseeing-day meals, and fallback transit or timed-ticket variation where relevant.",
    ja: "高めでも現実的な帯です。動線に合う上側の宿泊帯、少し厚めの観光日食費、必要時の代替移動や時間帯差を見込みます。"
  },
  rangeLegendRouteExtras: {
    en: "The route always stays at 7 days. Route extras only cover things like luggage handling, Fuji visibility pivots, and small transfer-day add-ons when you enable them.",
    ja: "ルートは常に7日間固定です。ルート追加費用は、有効にしたときだけ荷物対応、富士山の見え方に応じた動き直し、移動日の小さな追加費用を含めます。"
  },
  rangeFixedNote: { en: "Mostly fixed across the range", ja: "この項目は帯の中でほぼ固定" },
  rangeAvailablePrefix: { en: "Available if enabled", ja: "有効時の帯" },
  rangeCompactPrefix: { en: "Lean", ja: "控えめ" },
  rangeCompactSuffix: { en: "High", ja: "高め" },
  notePlaceholder: {
    en: "Note where you may want to splurge, save, or prebook.",
    ja: "節約したい所、少し使いたい所、先に予約したい所をメモ。"
  },
  stayLabel: { en: "Stay type", ja: "滞在タイプ" },
  stayCaption: {
    en: "Choose the actual sleep base for this night.",
    ja: "この日の実際の宿泊先を選びます。"
  },
  stayAreaLabel: { en: "Stay area", ja: "滞在エリア" },
  stayAnchorLabel: { en: "Anchor stay", ja: "基準の宿" },
  stayWhyLabel: { en: "Route fit", ja: "この場所を選ぶ理由" },
  shareModeLabel: { en: "Accommodation split", ja: "宿泊費の分け方" },
  shareCountLabel: { en: "People sharing stays", ja: "宿泊費を分ける人数" },
  shareModeAllTravelers: { en: "Share across all travelers", ja: "全員で分ける" },
  shareModeNotShared: { en: "Not shared", ja: "分けない" },
  shareModeCustom: { en: "Custom share count", ja: "人数を指定して分ける" },
  stayHintFallback: {
    en: "Switch between the real default stay and any cheaper or free fallback you actually have.",
    ja: "実際の初期滞在と、実際に使える安い・無料の代替滞在を切り替えられます。"
  },
  statusReady: {
    en: "Checklist-linked lean / expected / high model ready.",
    ja: "チェックリスト連動の控えめ・標準・高めモデルを表示中。"
  },
  statusLoading: {
    en: "Loading itinerary cost model...",
    ja: "旅程の費用モデルを読み込んでいます..."
  },
  statusMeta: {
    en: "Built from the current stay plan, route logic, ticket timing, and meal-pattern bands.",
    ja: "現在の滞在計画、移動ロジック、チケット時間帯、食費パターン帯で組み立てています。"
  },
  travelersHint: {
    en: "Stay selectors now control each accommodation night directly, so private/local or no-cost Osaka nights stay free unless you switch them to a paid stay.",
    ja: "各宿泊日は滞在セレクターで直接切り替える形にし、大阪のローカル・プライベート滞在や宿泊費なしの夜は、有料宿へ変更しない限り0円のままです。"
  },
  shareHint: {
    en: "Paid hotel and ryokan quotes now stay as one quoted stay-total. Split that total across all travelers, keep it unshared, or divide it across a custom number of people.",
    ja: "有料のホテル・旅館は、見積り総額をそのまま保持する形へ変えました。その総額を旅行者全員、分割なし、または指定人数で分けられます。"
  },
  shareCountHint: {
    en: "Use a custom count only when fewer people are actually splitting the paid room or ryokan total.",
    ja: "有料の部屋や旅館の総額を、旅行者全員ではなく一部だけで分ける時だけ指定人数を使います。"
  },
  extrasHint: {
    en: "Adds route-specific extras like luggage handling, Fuji visibility pivots, and other handoff-day add-ons.",
    ja: "荷物対応、富士山の見え方に応じた動き直し、受け渡し日に発生する追加費用などのルート固有コストを反映します。"
  },
  dayViewerLabel: {
    en: "Day selector",
    ja: "日付セレクター"
  },
  dayViewerHint: {
    en: "Switch one day at a time instead of scrolling a long full-trip budget list.",
    ja: "縦に長い予算一覧を追わず、1日ずつ切り替えて確認します。"
  },
  totalMeta: {
    en: "Lean / expected / high trip total built from the real day-by-day model",
    ja: "実際の日別モデルから組んだ控えめ・標準・高めの合計"
  },
  noPaidAccommodationMeta: {
    en: "No paid hotel or ryokan stays are selected right now.",
    ja: "現在は有料のホテル・旅館宿泊が選ばれていません。"
  },
  notesLinkHubMeta: {
    en: "All booking, fare, and official resource links now live in Essentials so Budget Notes stays focused on costs and assumptions.",
    ja: "予約・運賃・公式リソースのリンクはすべてEssentialsへ移し、予算メモは費用と前提だけに絞っています。"
  },
  currencyDisplayMeta: {
    en: "English shows the same yen-based plan in CAD and USD planning FX. Japanese stays in yen.",
    ja: "英語表示では同じ円ベースの計画をCADとUSDの旅行用換算で見せ、日本語表示は円のままです。"
  },
  bookedRequiredMeta: {
    en: "The fixed 7-day route costs before optional route extras",
    ja: "任意のルート追加費用を除いた固定7日間ルートの費用"
  },
  sharedMeta: { en: "Shared stays and group costs", ja: "共有の宿泊費と共通費" },
  variableMeta: { en: "Per-person variable spend", ja: "1人ごとの変動費" },
  spendLegend: { en: "Day notes", ja: "日別メモ" },
  optionalInactive: { en: "Not added yet", ja: "まだ未加算" },
  optionalInactiveMeta: {
    en: "Enable route extras to add luggage handling, Fuji weather pivots, and other small transfer-day costs into the live total.",
    ja: "ルート追加費用を有効にすると、荷物対応、富士山の見え方に応じた動き直し、移動日の小さな追加費用を合計へ反映します。"
  },
  sourceUpdatedPrefix: { en: "Updated", ja: "更新日" }
};

(() => {
  const getCategoryLabel = (categoryId) =>
    budgetCategoryDefinitions.find((entry) => entry.id === categoryId)?.label || {
      en: categoryId,
      ja: categoryId
    };
  const getBucketLabel = (bucketId) =>
    budgetBucketDefinitions.find((entry) => entry.id === bucketId)?.label || {
      en: bucketId,
      ja: bucketId
    };
  const formatWholeNumber = (amount, locale) =>
    new Intl.NumberFormat(locale, {
      maximumFractionDigits: 0
    }).format(Math.round(Number(amount) || 0));
  const convertBudgetAmount = (amount, targetCurrency) => {
    const normalizedAmount = Math.round(Number(amount) || 0);
    switch (targetCurrency) {
      case "CAD":
        return normalizedAmount * budgetDisplayExchangeRates.cadPerJpy;
      case "USD":
        return normalizedAmount * budgetDisplayExchangeRates.usdPerJpy;
      default:
        return normalizedAmount;
    }
  };
  const formatCurrencyForLanguage = (amount, language = root.lang) => {
    const normalizedAmount = Math.round(Number(amount) || 0);
    if (language === "ja") {
      return new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
        maximumFractionDigits: 0
      }).format(normalizedAmount);
    }

    const cadAmount = convertBudgetAmount(normalizedAmount, "CAD");
    const usdAmount = convertBudgetAmount(normalizedAmount, "USD");
    return `C$${formatWholeNumber(cadAmount, "en-CA")} / US$${formatWholeNumber(usdAmount, "en-US")}`;
  };
  const formatCurrency = (amount, language = root.lang) =>
    formatCurrencyForLanguage(amount, language);
  const formatCurrencyCopy = (amount) => ({
    en: formatCurrencyForLanguage(amount, "en"),
    ja: formatCurrencyForLanguage(amount, "ja")
  });
  const normalizeTravelerCount = (value, fallback = budgetDefaultTravelerCount) => {
    const parsed = Number.parseInt(String(value ?? ""), 10);
    if (Number.isNaN(parsed)) {
      return clamp(fallback, budgetTravelerCountMin, budgetTravelerCountMax);
    }

    return clamp(parsed, budgetTravelerCountMin, budgetTravelerCountMax);
  };
  const normalizeShareMode = (value, fallback = budgetAccommodationShareModeDefault) =>
    budgetAccommodationShareModes.includes(value) ? value : fallback;
  const getShareModeLabel = (shareMode) => {
    switch (normalizeShareMode(shareMode)) {
      case "not-shared":
        return itineraryBudgetLabels.shareModeNotShared;
      case "custom":
        return itineraryBudgetLabels.shareModeCustom;
      default:
        return itineraryBudgetLabels.shareModeAllTravelers;
    }
  };
  const normalizeShareCount = (value, travelers = budgetDefaultTravelerCount) => {
    const normalizedTravelers = normalizeTravelerCount(travelers, budgetDefaultTravelerCount);
    const parsed = Number.parseInt(String(value ?? ""), 10);
    if (Number.isNaN(parsed)) {
      return normalizedTravelers;
    }

    return clamp(parsed, 1, normalizedTravelers);
  };
  const getBudgetSourceData = () => {
    const sourceData = getBudgetEstimateSources();
    return sourceData && typeof sourceData === "object" && !Array.isArray(sourceData) ? sourceData : {};
  };
  const getSourceCostConfig = (sourceCostId) => {
    if (!sourceCostId) {
      return null;
    }

    const costIndex = getBudgetSourceData().costIndex;
    const sourceCost =
      costIndex && typeof costIndex === "object" && !Array.isArray(costIndex)
        ? costIndex[sourceCostId]
        : null;
    return sourceCost && typeof sourceCost === "object" && !Array.isArray(sourceCost)
      ? sourceCost
      : null;
  };
  const getSourceGroups = () => {
    const sourceGroups = getBudgetSourceData().sourceGroups;
    return Array.isArray(sourceGroups) && sourceGroups.length ? sourceGroups : budgetSourceGroups;
  };
  const getAssumptionCopy = () => {
    const assumptionCopy = getBudgetSourceData().assumptionCopy;
    return assumptionCopy && typeof assumptionCopy === "object" ? assumptionCopy : budgetAssumptionCopy;
  };
  const getSourceMetaCopy = () => {
    const metaCopy = getBudgetSourceData().metaCopy;
    return metaCopy && typeof metaCopy === "object" ? metaCopy : null;
  };
  const getSourceHelperCopy = () => {
    const helperCopy = getBudgetSourceData().helperCopy;
    return helperCopy && typeof helperCopy === "object" ? helperCopy : null;
  };
  const getSourceUpdatedCopy = () => {
    const updatedCopy = getBudgetSourceData().updatedCopy;
    return updatedCopy && typeof updatedCopy === "object"
      ? updatedCopy
      : {
          en: `${itineraryBudgetLabels.sourceUpdatedPrefix.en}: ${budgetSourceUpdatedAt}`,
          ja: `${itineraryBudgetLabels.sourceUpdatedPrefix.ja}: ${budgetSourceUpdatedAt}`
        };
  };
  const getUnitCount = (travelers, unitSize = budgetSharedRoomOccupancy) => {
    const normalizedTravelers = normalizeTravelerCount(travelers, budgetDefaultTravelerCount);
    const normalizedUnitSize = Math.max(1, Number(unitSize) || budgetSharedRoomOccupancy);
    return Math.max(1, Math.ceil(normalizedTravelers / normalizedUnitSize));
  };
  const getRoomCount = (travelers = budgetDefaultTravelerCount) =>
    Math.max(1, Math.ceil(normalizeTravelerCount(travelers) / budgetSharedRoomOccupancy));
  const budgetRangeLevels = [
    { id: "lean", label: itineraryBudgetLabels.levelLean, pillClass: "budget-pill--lean" },
    {
      id: "expected",
      label: itineraryBudgetLabels.levelExpected,
      pillClass: "budget-pill--expected"
    },
    { id: "high", label: itineraryBudgetLabels.levelHigh, pillClass: "budget-pill--high" }
  ];
  let activeBudgetDay = null;
  const createBudgetRange = (lean = 0, expected = 0, high = 0) => ({
    lean: Number(lean) || 0,
    expected: Number(expected) || 0,
    high: Number(high) || 0
  });
  const getZeroBudgetRange = () => createBudgetRange(0, 0, 0);
  const getBudgetRangeValue = (range, level = "expected") =>
    Number(range?.[level] ?? range?.expected ?? 0) || 0;
  const normalizeBudgetRange = (rangeCandidate, fallbackAmount = 0) => {
    const fallback = Math.max(Number(fallbackAmount) || 0, 0);
    const rawLean = Math.max(Number(rangeCandidate?.lean ?? fallback) || 0, 0);
    const rawExpected = Math.max(Number(rangeCandidate?.expected ?? fallback) || 0, 0);
    const rawHigh = Math.max(Number(rangeCandidate?.high ?? fallback) || 0, 0);
    const lean = Math.min(rawLean, rawExpected, rawHigh);
    const high = Math.max(rawLean, rawExpected, rawHigh);
    const expected = Math.min(Math.max(rawExpected, lean), high);
    return createBudgetRange(lean, expected, high);
  };
  const mapBudgetRange = (range, mapper) =>
    budgetRangeLevels.reduce((nextRange, definition) => {
      nextRange[definition.id] = Number(
        mapper(getBudgetRangeValue(range, definition.id), definition.id)
      ) || 0;
      return nextRange;
    }, getZeroBudgetRange());
  const sumBudgetRanges = (...ranges) =>
    budgetRangeLevels.reduce((nextRange, definition) => {
      nextRange[definition.id] = ranges.reduce(
        (sum, range) => sum + getBudgetRangeValue(range, definition.id),
        0
      );
      return nextRange;
    }, getZeroBudgetRange());
  const hasBudgetRangeSpread = (range) =>
    budgetRangeLevels.some(
      (definition) =>
        Math.round(getBudgetRangeValue(range, definition.id)) !==
        Math.round(getBudgetRangeValue(range, "expected"))
    );
  const hasBudgetRangeValue = (range) =>
    budgetRangeLevels.some((definition) => getBudgetRangeValue(range, definition.id) > 0);
  const getCompactRangeCopy = (range, { available = false } = {}) => ({
    en: `${
      available
        ? `${itineraryBudgetLabels.rangeAvailablePrefix.en}: `
        : ""
    }${itineraryBudgetLabels.rangeCompactPrefix.en} ${formatCurrencyForLanguage(
      getBudgetRangeValue(range, "lean"),
      "en"
    )} • ${itineraryBudgetLabels.rangeCompactSuffix.en} ${formatCurrencyForLanguage(
      getBudgetRangeValue(range, "high"),
      "en"
    )}`,
    ja: `${
      available
        ? `${itineraryBudgetLabels.rangeAvailablePrefix.ja}: `
        : ""
    }${itineraryBudgetLabels.rangeCompactPrefix.ja} ${formatCurrencyForLanguage(
      getBudgetRangeValue(range, "lean"),
      "ja"
    )} ・ ${itineraryBudgetLabels.rangeCompactSuffix.ja} ${formatCurrencyForLanguage(
      getBudgetRangeValue(range, "high"),
      "ja"
    )}`
  });
  const renderBudgetRangeRows = (range, variant = "summary") =>
    budgetRangeLevels
      .map(
        (definition) => `
          <div class="budget-range-row budget-range-row--${escapeHtml(definition.id)} budget-range-row--${escapeHtml(
            variant
          )}">
            <span class="budget-pill ${definition.pillClass}">${renderLocalizedContent(
              definition.label
            )}</span>
            <strong class="budget-range-row__value">${escapeHtml(
              formatCurrency(getBudgetRangeValue(range, definition.id))
            )}</strong>
          </div>
        `
      )
      .join("");
  const getLocalizedText = (copy) =>
    String((root.lang === "ja" ? copy?.ja : copy?.en) ?? copy?.en ?? copy?.ja ?? "");
  const joinLocalizedSegments = (segments = []) => ({
    en: segments
      .map((segment) =>
        typeof segment === "string" ? segment : segment?.en ?? segment?.ja ?? ""
      )
      .filter(Boolean)
      .join(" • "),
    ja: segments
      .map((segment) =>
        typeof segment === "string" ? segment : segment?.ja ?? segment?.en ?? ""
      )
      .filter(Boolean)
      .join(" ・ ")
  });
  const getRangeMetaCopy = (range, { available = false } = {}) =>
    hasBudgetRangeSpread(range)
      ? getCompactRangeCopy(range, { available })
      : available && hasBudgetRangeValue(range)
        ? {
            en: `${itineraryBudgetLabels.rangeAvailablePrefix.en}: ${formatCurrencyForLanguage(
              getBudgetRangeValue(range, "expected"),
              "en"
            )}`,
            ja: `${itineraryBudgetLabels.rangeAvailablePrefix.ja}: ${formatCurrencyForLanguage(
              getBudgetRangeValue(range, "expected"),
              "ja"
            )}`
          }
        : itineraryBudgetLabels.rangeFixedNote;
  const getStayTypeLabel = (stayTypeId) =>
    budgetStayTypeDefinitions.find((entry) => entry.id === stayTypeId)?.label || {
      en: stayTypeId,
      ja: stayTypeId
    };
  const getStayDefinition = (stayId) => {
    const stayDefinition =
      stayId && typeof budgetStayDefinitions[stayId] === "object" ? budgetStayDefinitions[stayId] : null;
    return stayDefinition && !Array.isArray(stayDefinition) ? stayDefinition : null;
  };
  const getDayDefinition = (day) =>
    budgetDayDefinitions.find((definition) => definition.day === Number.parseInt(String(day), 10)) || null;
  const getDefaultStayId = (day) => getDayDefinition(day)?.defaultStayId || null;
  const getDayStayOptions = (definition) =>
    (Array.isArray(definition?.stayOptions) ? definition.stayOptions : [])
      .map((stayId) => getStayDefinition(stayId))
      .filter(Boolean)
      .sort((left, right) => {
        const leftOrder = budgetStayOptionOrder[left.type] ?? Number.MAX_SAFE_INTEGER;
        const rightOrder = budgetStayOptionOrder[right.type] ?? Number.MAX_SAFE_INTEGER;
        if (leftOrder !== rightOrder) {
          return leftOrder - rightOrder;
        }

        return (left.label?.en || left.id || "").localeCompare(right.label?.en || right.id || "");
      });
  const getStayDefinitionForDay = (definition, selectedStayId) => {
    const availableOptions = getDayStayOptions(definition);
    return (
      availableOptions.find((stayDefinition) => stayDefinition.id === selectedStayId) ||
      availableOptions.find((stayDefinition) => stayDefinition.id === definition?.defaultStayId) ||
      null
    );
  };
  const getStayHintCopy = (stayDefinition) => {
    if (!stayDefinition) {
      return itineraryBudgetLabels.stayHintFallback;
    }

    const sourceAssumption = getSourceCostConfig(stayDefinition.cost?.sourceCostId)?.assumption;
    return sourceAssumption || stayDefinition.assumption || itineraryBudgetLabels.stayHintFallback;
  };
  const getStayAreaCopy = (stayDefinition) => {
    if (!stayDefinition) {
      return null;
    }

    const sourceArea = getSourceCostConfig(stayDefinition.cost?.sourceCostId)?.area;
    return sourceArea && typeof sourceArea === "object" ? sourceArea : stayDefinition.area || null;
  };
  const getStayAnchorCopy = (stayDefinition) => {
    if (!stayDefinition) {
      return null;
    }

    const sourceLabel = getSourceCostConfig(stayDefinition.cost?.sourceCostId)?.source?.label;
    return sourceLabel && typeof sourceLabel === "object"
      ? sourceLabel
      : stayDefinition.property || null;
  };
  const getStayRouteReasonCopy = (stayDefinition) => {
    if (!stayDefinition) {
      return null;
    }

    const sourceReason = getSourceCostConfig(stayDefinition.cost?.sourceCostId)?.routeReason;
    return sourceReason && typeof sourceReason === "object"
      ? sourceReason
      : stayDefinition.routeReason || null;
  };
  const normalizeDayEntry = (definition, entry) => {
    const note = typeof entry?.note === "string" ? entry.note.slice(0, 280) : "";
    const defaultStayId = definition?.defaultStayId || null;
    const allowedStayIds = new Set(Array.isArray(definition?.stayOptions) ? definition.stayOptions : []);
    const stayId = allowedStayIds.has(entry?.stayId) ? entry.stayId : defaultStayId;
    return { note, stayId };
  };
  const getDefaultState = () => ({
    travelers: budgetDefaultTravelerCount,
    accommodationShareMode: budgetAccommodationShareModeDefault,
    accommodationShareCount: budgetDefaultTravelerCount,
    includeExtras: false,
    days: {}
  });
  const normalizeDayEntries = (daysCandidate) => {
    if (!daysCandidate || typeof daysCandidate !== "object" || Array.isArray(daysCandidate)) {
      return {};
    }

    return Object.entries(daysCandidate).reduce((nextState, [day, entry]) => {
      const normalizedDay = Number.parseInt(String(day), 10);
      const definition = getDayDefinition(normalizedDay);
      if (Number.isNaN(normalizedDay) || !definition) {
        return nextState;
      }

      const normalizedEntry = normalizeDayEntry(definition, entry);
      if (
        normalizedEntry.note.trim() ||
        (normalizedEntry.stayId && normalizedEntry.stayId !== definition.defaultStayId)
      ) {
        nextState[String(normalizedDay)] = normalizedEntry;
      }

      return nextState;
    }, {});
  };
  const readState = () => {
    const fallbackState = getDefaultState();

    try {
      const parsed = JSON.parse(window.localStorage.getItem(budgetNotesStorageKey) || "null");
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        return fallbackState;
      }

      return {
        travelers: normalizeTravelerCount(parsed.travelers, fallbackState.travelers),
        accommodationShareMode: normalizeShareMode(
          parsed.accommodationShareMode,
          fallbackState.accommodationShareMode
        ),
        accommodationShareCount: normalizeShareCount(
          parsed.accommodationShareCount,
          normalizeTravelerCount(parsed.travelers, fallbackState.travelers)
        ),
        includeExtras: parsed.includeExtras === true,
        days: normalizeDayEntries(parsed.days)
      };
    } catch (error) {
      return fallbackState;
    }
  };
  const hydrateState = () => {
    if (!budgetNotesInitialized) {
      budgetNotesState = readState();
      budgetNotesInitialized = true;
    }

    return budgetNotesState;
  };
  const hasChanges = () => {
    hydrateState();
    if (
      normalizeTravelerCount(budgetNotesState.travelers, budgetDefaultTravelerCount) !==
        budgetDefaultTravelerCount ||
      normalizeShareMode(
        budgetNotesState.accommodationShareMode,
        budgetAccommodationShareModeDefault
      ) !== budgetAccommodationShareModeDefault ||
      budgetNotesState.includeExtras === true
    ) {
      return true;
    }

    return Object.entries(budgetNotesState.days || {}).some(([day, entry]) => {
      const defaultStayId = getDefaultStayId(day);
      return String(entry?.note || "").trim() || (entry?.stayId && entry.stayId !== defaultStayId);
    });
  };
  const storeState = () => {
    try {
      if (!hasChanges()) {
        queueStorageRemoval(budgetNotesStorageKey);
        flushQueuedStorageWrites();
        return;
      }

      queueStorageValue(
        budgetNotesStorageKey,
        JSON.stringify({
          travelers: normalizeTravelerCount(budgetNotesState.travelers, budgetDefaultTravelerCount),
          accommodationShareMode: normalizeShareMode(
            budgetNotesState.accommodationShareMode,
            budgetAccommodationShareModeDefault
          ),
          accommodationShareCount: normalizeShareCount(
            budgetNotesState.accommodationShareCount,
            normalizeTravelerCount(budgetNotesState.travelers, budgetDefaultTravelerCount)
          ),
          includeExtras: budgetNotesState.includeExtras === true,
          days: normalizeDayEntries(budgetNotesState.days)
        })
      );
      flushQueuedStorageWrites();
    } catch (error) {
      // Ignore storage failures and keep the budget notes usable.
    }
  };
  const getTravelerCount = () => {
    hydrateState();
    return normalizeTravelerCount(budgetNotesState.travelers, budgetDefaultTravelerCount);
  };
  const getStoredCustomShareCount = (travelers = getTravelerCount()) => {
    hydrateState();
    return normalizeShareCount(budgetNotesState.accommodationShareCount, travelers);
  };
  const getAccommodationShareMode = () => {
    hydrateState();
    return normalizeShareMode(
      budgetNotesState.accommodationShareMode,
      budgetAccommodationShareModeDefault
    );
  };
  const getAccommodationShareCount = (travelers = getTravelerCount()) => {
    const normalizedTravelers = normalizeTravelerCount(travelers, budgetDefaultTravelerCount);
    const shareMode = getAccommodationShareMode();
    if (shareMode === "not-shared") {
      return 1;
    }

    if (shareMode === "custom") {
      return getStoredCustomShareCount(normalizedTravelers);
    }

    return normalizedTravelers;
  };
  const includeExtras = () => {
    hydrateState();
    return budgetNotesState.includeExtras === true;
  };
  const getDayState = (day) => {
    hydrateState();
    const entry =
      budgetNotesState.days && typeof budgetNotesState.days[String(day)] === "object"
        ? budgetNotesState.days[String(day)]
        : {};
    const defaultStayId = getDefaultStayId(day);

    return {
      note: typeof entry.note === "string" ? entry.note : "",
      stayId: typeof entry.stayId === "string" ? entry.stayId : defaultStayId
    };
  };
  const updateDayState = (day, nextState) => {
    hydrateState();
    const key = String(day);
    const definition = getDayDefinition(day);
    const note = typeof nextState?.note === "string" ? nextState.note.slice(0, 280) : "";
    const defaultStayId = definition?.defaultStayId || null;
    const allowedStayIds = new Set(Array.isArray(definition?.stayOptions) ? definition.stayOptions : []);
    const stayId = allowedStayIds.has(nextState?.stayId) ? nextState.stayId : defaultStayId;

    if (!budgetNotesState.days || typeof budgetNotesState.days !== "object") {
      budgetNotesState.days = {};
    }

    if (!note.trim() && (!stayId || stayId === defaultStayId)) {
      delete budgetNotesState.days[key];
    } else {
      budgetNotesState.days[key] = { note, stayId };
    }

    storeState();
  };
  const normalizeActiveBudgetDay = (visibleDayEstimates = []) => {
    const visibleDays = visibleDayEstimates
      .map((dayEstimate) => Number(dayEstimate?.day))
      .filter((day) => Number.isFinite(day));
    if (!visibleDays.length) {
      activeBudgetDay = null;
      return null;
    }

    if (visibleDays.includes(activeBudgetDay)) {
      return activeBudgetDay;
    }

    const currentDay = Number(getCurrentProgressDay());
    activeBudgetDay = visibleDays.includes(currentDay) ? currentDay : visibleDays[0];
    return activeBudgetDay;
  };
  const getDaySelectorTitleCopy = (dayEstimate) => ({
    en:
      String(dayEstimate?.title?.en || `Day ${dayEstimate?.day || ""}`)
        .replace(new RegExp(`^Day\\s*${dayEstimate?.day}\\s*[-:–]\\s*`, "i"), "")
        .trim() || `Day ${dayEstimate?.day || ""}`,
    ja:
      String(dayEstimate?.title?.ja || `${dayEstimate?.day || ""}日目`)
        .replace(new RegExp(`^${dayEstimate?.day}日目[・･\\-]\\s*`), "")
        .trim() || `${dayEstimate?.day || ""}日目`
  });
  const renderDaySelectorMarkup = (
    visibleDayEstimates = [],
    activeDay = normalizeActiveBudgetDay(visibleDayEstimates)
  ) =>
    visibleDayEstimates
      .map((dayEstimate) => {
        const isActive = dayEstimate.day === activeDay;
        const dayLabel = {
          en: `Day ${dayEstimate.day}`,
          ja: `${dayEstimate.day}日目`
        };
        const ariaLabel = {
          en: `Show budget for Day ${dayEstimate.day}`,
          ja: `${dayEstimate.day}日目の予算を見る`
        };

        return `
          <button
            class="budget-day-selector__button ${isActive ? "is-active" : ""}"
            type="button"
            data-budget-day-select="${dayEstimate.day}"
            aria-pressed="${String(isActive)}"
            data-aria-label-en="${escapeHtml(ariaLabel.en)}"
            data-aria-label-ja="${escapeHtml(ariaLabel.ja)}"
            aria-label="${escapeHtml(getLocalizedText(ariaLabel))}">
            <span class="budget-day-selector__button-day">${renderLocalizedContent(dayLabel)}</span>
            <span class="budget-day-selector__button-title">${renderLocalizedContent(
              getDaySelectorTitleCopy(dayEstimate)
            )}</span>
          </button>
        `;
      })
      .join("");
  const visibleDays = () => budgetDayDefinitions;
  const extraDayDefinitions = () => [];
  const calculateItemCost = (item, travelers, withExtras) => {
    const cost = item.cost || { mode: "none", amount: 0 };
    const sourceCost = getSourceCostConfig(cost.sourceCostId);
    const amount = Math.max(Number(sourceCost?.amount ?? cost.amount ?? 0) || 0, 0);
    const range = normalizeBudgetRange(sourceCost?.range || cost.range, amount);
    const travelerCount = normalizeTravelerCount(travelers, budgetDefaultTravelerCount);
    const roomCapacity = Math.max(
      1,
      Number(sourceCost?.roomCapacity ?? cost.roomCapacity ?? budgetSharedRoomOccupancy) ||
        budgetSharedRoomOccupancy
    );
    const pairSize = Math.max(1, Number(sourceCost?.groupSize ?? cost.groupSize ?? 2) || 2);
    let quantity = 0;
    let total = 0;
    let totalRange = getZeroBudgetRange();

    if (cost.mode === "perPerson") {
      quantity = travelerCount;
      total = amount * travelerCount;
      totalRange = mapBudgetRange(range, (value) => value * travelerCount);
    } else if (cost.mode === "perRoom") {
      quantity = getUnitCount(travelerCount, roomCapacity);
      total = amount * quantity;
      totalRange = mapBudgetRange(range, (value) => value * quantity);
    } else if (cost.mode === "perPair") {
      quantity = getUnitCount(travelerCount, pairSize);
      total = amount * quantity;
      totalRange = mapBudgetRange(range, (value) => value * quantity);
    } else if (cost.mode === "perGroup") {
      quantity = 1;
      total = amount;
      totalRange = range;
    }

    return {
      mode: cost.mode,
      amount,
      range,
      quantity,
      total,
      totalRange,
      roomCapacity: cost.mode === "perRoom" ? roomCapacity : null,
      pairSize: cost.mode === "perPair" ? pairSize : null,
      included: item.bucket !== "optional" || withExtras
    };
  };
  const getItemFormulaCopy = (itemCost, item = null) => {
    if (item?.formulaCopy) {
      return item.formulaCopy;
    }

    if (item?.category === "accommodation" && item?.accommodationShare && item.accommodationShare.total > 0) {
      const totalCopy = formatCurrencyCopy(item.accommodationShare.total);
      if (item.accommodationShare.shareCount <= 1) {
        return {
          en: `Stay total ${totalCopy.en} · not shared`,
          ja: `宿泊合計 ${totalCopy.ja} ・ 分割なし`
        };
      }

      const perPersonCopy = formatCurrencyCopy(item.accommodationShare.perPersonTotal);
      return {
        en: `Stay total ${totalCopy.en} · split by ${
          item.accommodationShare.shareCount
        } = ${perPersonCopy.en} pp`,
        ja: `宿泊合計 ${totalCopy.ja} ・ ${
          item.accommodationShare.shareCount
        }人で分割 = 1人 ${perPersonCopy.ja}`
      };
    }

    if (itemCost.mode === "perPerson") {
      const amountCopy = formatCurrencyCopy(itemCost.amount);
      return {
        en: `${amountCopy.en} x ${itemCost.quantity} traveler${
          itemCost.quantity === 1 ? "" : "s"
        }`,
        ja: `${amountCopy.ja} x ${itemCost.quantity}人`
      };
    }

    if (itemCost.mode === "perRoom") {
      const amountCopy = formatCurrencyCopy(itemCost.amount);
      return {
        en: `${amountCopy.en} x ${itemCost.quantity} room${
          itemCost.quantity === 1 ? "" : "s"
        }${itemCost.roomCapacity ? ` (up to ${itemCost.roomCapacity} guests)` : ""}`,
        ja: `${amountCopy.ja} x ${itemCost.quantity}室${
          itemCost.roomCapacity ? `（${itemCost.roomCapacity}人定員）` : ""
        }`
      };
    }

    if (itemCost.mode === "perPair") {
      const amountCopy = formatCurrencyCopy(itemCost.amount);
      return {
        en: `${amountCopy.en} x ${itemCost.quantity} shared item${
          itemCost.quantity === 1 ? "" : "s"
        }`,
        ja: `${amountCopy.ja} x ${itemCost.quantity}件`
      };
    }

    if (itemCost.mode === "perGroup") {
      return { en: "One shared trip cost", ja: "旅全体の共通費" };
    }

    return { en: "No extra ticketed cost", ja: "追加費用なし" };
  };
  const getAccommodationShareBreakdown = (itemCost, travelers) => {
    if (!itemCost || !hasBudgetRangeValue(itemCost.totalRange)) {
      return null;
    }

    const shareCount = getAccommodationShareCount(travelers);
    return {
      mode: getAccommodationShareMode(),
      travelers: normalizeTravelerCount(travelers, budgetDefaultTravelerCount),
      shareCount,
      total: itemCost.total,
      totalRange: itemCost.totalRange,
      perPersonTotal: shareCount > 0 ? itemCost.total / shareCount : 0,
      perPersonRange:
        shareCount > 0
          ? mapBudgetRange(itemCost.totalRange, (value) => value / shareCount)
          : getZeroBudgetRange()
    };
  };
  const getPersonalLineTotal = (item, travelers, level = "expected") => {
    if (!item?.itemCost?.included) {
      return 0;
    }

    if (item.category === "accommodation" && item.accommodationShare) {
      return level === "expected"
        ? item.accommodationShare.perPersonTotal
        : getBudgetRangeValue(item.accommodationShare.perPersonRange, level);
    }

    const normalizedTravelers = normalizeTravelerCount(travelers, budgetDefaultTravelerCount);
    return normalizedTravelers > 0
      ? getBudgetRangeValue(item.lineRangeTotals, level) / normalizedTravelers
      : 0;
  };
  const getPersonalLineRange = (item, travelers) =>
    budgetRangeLevels.reduce((nextRange, definition) => {
      nextRange[definition.id] = getPersonalLineTotal(item, travelers, definition.id);
      return nextRange;
    }, getZeroBudgetRange());
  const getAccommodationItem = (definition) => {
    const stayDefinition = getStayDefinitionForDay(definition, getDayState(definition.day).stayId);
    if (!stayDefinition) {
      return null;
    }

    return {
      label: stayDefinition.label,
      category: "accommodation",
      bucket: stayDefinition.bucket || "booked",
      sourceGroup: stayDefinition.sourceGroup || "assumptions",
      cost: stayDefinition.cost,
      formulaCopy: stayDefinition.formulaCopy || null,
      stayType: stayDefinition.type
    };
  };
  const calculateEstimate = () => {
    const travelers = getTravelerCount();
    const withExtras = includeExtras();
    const activeDays = visibleDays();
    const categoryTotals = Object.fromEntries(
      budgetCategoryDefinitions.map((definition) => [definition.id, 0])
    );
    const categoryTotalsRange = Object.fromEntries(
      budgetCategoryDefinitions.map((definition) => [definition.id, getZeroBudgetRange()])
    );
    const categoryAvailableRanges = Object.fromEntries(
      budgetCategoryDefinitions.map((definition) => [definition.id, getZeroBudgetRange()])
    );
    const bucketTotals = Object.fromEntries(
      budgetBucketDefinitions.map((definition) => [definition.id, 0])
    );
    const bucketTotalsRange = Object.fromEntries(
      budgetBucketDefinitions.map((definition) => [definition.id, getZeroBudgetRange()])
    );
    const bucketAvailableRanges = Object.fromEntries(
      budgetBucketDefinitions.map((definition) => [definition.id, getZeroBudgetRange()])
    );
    const calculateDay = (definition) => {
      const dayState = getDayState(definition.day);
      const stayDefinition = getStayDefinitionForDay(definition, dayState.stayId);
      const dayItems = [getAccommodationItem(definition), ...definition.items].filter(Boolean);
      const itemEstimates = dayItems.map((item) => {
        const itemCost = calculateItemCost(item, travelers, withExtras);
        const lineTotal = itemCost.included ? itemCost.total : 0;
        const lineRangeTotals = itemCost.included ? itemCost.totalRange : getZeroBudgetRange();
        return {
          ...item,
          itemCost,
          lineTotal,
          rawRangeTotals: itemCost.totalRange,
          lineRangeTotals,
          accommodationShare:
            item.category === "accommodation" && hasBudgetRangeValue(itemCost.totalRange)
              ? getAccommodationShareBreakdown(itemCost, travelers)
              : null
        };
      });

      return {
        ...definition,
        note: dayState.note,
        stayDefinition,
        stayOptions: getDayStayOptions(definition),
        itemEstimates,
        total: itemEstimates.reduce((sum, item) => sum + item.lineTotal, 0),
        totalRange: itemEstimates.reduce(
          (sum, item) => sumBudgetRanges(sum, item.lineRangeTotals),
          getZeroBudgetRange()
        )
      };
    };
    const visibleDayEstimates = activeDays.map((definition) => calculateDay(definition));
    visibleDayEstimates.forEach((dayEstimate) => {
      dayEstimate.itemEstimates.forEach((item) => {
        if (!item.itemCost.included) {
          if (item.bucket === "optional") {
            categoryAvailableRanges[item.category] = sumBudgetRanges(
              categoryAvailableRanges[item.category],
              item.rawRangeTotals
            );
            bucketAvailableRanges[item.bucket] = sumBudgetRanges(
              bucketAvailableRanges[item.bucket],
              item.rawRangeTotals
            );
          }
          return;
        }

        categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.lineTotal;
        categoryTotalsRange[item.category] = sumBudgetRanges(
          categoryTotalsRange[item.category],
          item.lineRangeTotals
        );
        bucketTotals[item.bucket] = (bucketTotals[item.bucket] || 0) + item.lineTotal;
        bucketTotalsRange[item.bucket] = sumBudgetRanges(
          bucketTotalsRange[item.bucket],
          item.lineRangeTotals
        );
      });
    });

    const accommodationTotal = categoryTotals.accommodation || 0;
    const accommodationTotalRange = categoryTotalsRange.accommodation || getZeroBudgetRange();
    const accommodationShareCount = hasBudgetRangeValue(accommodationTotalRange)
      ? getAccommodationShareCount(travelers)
      : 0;
    const accommodationPerPersonRange = visibleDayEstimates.reduce(
      (sum, dayEstimate) =>
        sumBudgetRanges(
          sum,
          dayEstimate.itemEstimates.reduce(
            (daySum, item) =>
              sumBudgetRanges(
                daySum,
                item.category === "accommodation" && item.accommodationShare
                  ? item.accommodationShare.perPersonRange
                  : getZeroBudgetRange()
              ),
            getZeroBudgetRange()
          )
        ),
      getZeroBudgetRange()
    );
    const perPersonRange = visibleDayEstimates.reduce(
      (sum, dayEstimate) =>
        sumBudgetRanges(
          sum,
          dayEstimate.itemEstimates.reduce(
            (daySum, item) => sumBudgetRanges(daySum, getPersonalLineRange(item, travelers)),
            getZeroBudgetRange()
          )
        ),
      getZeroBudgetRange()
    );
    const total = visibleDayEstimates.reduce((sum, day) => sum + day.total, 0);
    const totalRange = visibleDayEstimates.reduce(
      (sum, day) => sumBudgetRanges(sum, day.totalRange),
      getZeroBudgetRange()
    );
    const bookedAndFixedTotal = (bucketTotals.booked || 0) + (bucketTotals.required || 0);
    const bookedAndFixedTotalRange = sumBudgetRanges(
      bucketTotalsRange.booked,
      bucketTotalsRange.required
    );

    return {
      travelers,
      accommodationShareMode: getAccommodationShareMode(),
      accommodationShareCount,
      accommodationTotal,
      accommodationTotalRange,
      accommodationPerPerson: getBudgetRangeValue(accommodationPerPersonRange, "expected"),
      accommodationPerPersonRange,
      includeExtras: withExtras,
      visibleDayEstimates,
      total,
      totalRange,
      perPerson: getBudgetRangeValue(perPersonRange, "expected"),
      perPersonRange,
      bookedAndFixedTotal,
      bookedAndFixedTotalRange,
      bucketTotals,
      bucketTotalsRange,
      bucketAvailableRanges,
      categoryTotals,
      categoryTotalsRange,
      categoryAvailableRanges
    };
  };
  const renderSummaryMarkup = (estimate = calculateEstimate()) => {
    const shareModeLabel = getShareModeLabel(estimate.accommodationShareMode);
    const summaryCards = [
      {
        className: "budget-summary-card budget-summary-card--estimate budget-summary-card--compact",
        label: itineraryBudgetLabels.summaryTotal,
        range: estimate.totalRange,
        meta: itineraryBudgetLabels.totalMeta
      },
      {
        className: "budget-summary-card budget-summary-card--per-person budget-summary-card--compact",
        label: itineraryBudgetLabels.summaryPerPerson,
        range: estimate.perPersonRange,
        meta: joinLocalizedSegments([
          {
            en: `${estimate.travelers} traveler${estimate.travelers === 1 ? "" : "s"}`,
            ja: `${estimate.travelers}人`
          },
          { en: `stay split: ${shareModeLabel.en}`, ja: `宿泊費の分け方: ${shareModeLabel.ja}` }
        ])
      },
      {
        className: "budget-summary-card budget-summary-card--shared budget-summary-card--compact",
        label: itineraryBudgetLabels.summaryBookedRequired,
        range: estimate.bookedAndFixedTotalRange,
        meta: joinLocalizedSegments([
          itineraryBudgetLabels.bookedRequiredMeta,
          hasBudgetRangeValue(estimate.accommodationPerPersonRange)
            ? {
                en: `stay split: ${shareModeLabel.en}`,
                ja: `宿泊費の分け方: ${shareModeLabel.ja}`
              }
            : itineraryBudgetLabels.noPaidAccommodationMeta
        ])
      },
      {
        className: "budget-summary-card budget-summary-card--optional budget-summary-card--compact",
        label: itineraryBudgetLabels.summaryRouteExtras,
        range: estimate.bucketAvailableRanges.optional || getZeroBudgetRange(),
        meta: estimate.includeExtras
          ? {
              en: "Route extras are currently included.",
              ja: "ルート追加費用を現在反映しています。"
            }
          : itineraryBudgetLabels.optionalInactiveMeta
      }
    ];

    return summaryCards
      .map(
        (card) => `
          <article class="${card.className}">
            <p class="budget-summary-card__label">${renderLocalizedContent(card.label)}</p>
            <div class="budget-range-grid budget-range-grid--summary">
              ${renderBudgetRangeRows(card.range, "summary")}
            </div>
            <p class="budget-summary-card__meta">${renderLocalizedContent(card.meta)}</p>
          </article>
        `
      )
      .join("");
  };
  const renderBreakdownMarkup = (estimate = calculateEstimate()) => {
    const primaryCategoryIds = [
      "accommodation",
      "intercityTransit",
      "localTransit",
      "ticketsAdmissions",
      "meals"
    ];
    const secondaryCategoryIds = ["baggage", "optionalExtras"];
    const renderCategoryCard = (definition, className = "budget-breakdown-card") => {
      const range = estimate.categoryTotalsRange[definition.id] || getZeroBudgetRange();
      const availableRange =
        estimate.categoryAvailableRanges[definition.id] || getZeroBudgetRange();
      const metaCopy =
        !estimate.includeExtras && hasBudgetRangeValue(availableRange)
          ? getRangeMetaCopy(availableRange, { available: true })
          : hasBudgetRangeValue(range)
            ? getRangeMetaCopy(range)
            : definition.id === "accommodation"
              ? itineraryBudgetLabels.noPaidAccommodationMeta
              : itineraryBudgetLabels.rangeFixedNote;

      return `
        <article class="${className}">
          <p class="budget-breakdown-card__label">${renderLocalizedContent(definition.label)}</p>
          <div class="budget-range-grid budget-range-grid--breakdown">
            ${renderBudgetRangeRows(range, "breakdown")}
          </div>
          <p class="budget-breakdown-card__meta">${renderLocalizedContent(metaCopy)}</p>
          <p class="budget-breakdown-card__hint">${renderLocalizedContent(
            definition.rangeHint || definition.label
          )}</p>
        </article>
      `;
    };

    return `
      <div class="budget-breakdown-grid">
        ${budgetCategoryDefinitions
          .filter((definition) => primaryCategoryIds.includes(definition.id))
          .map((definition) => renderCategoryCard(definition))
          .join("")}
      </div>
      <div class="budget-breakdown-secondary">
        ${budgetCategoryDefinitions
          .filter((definition) => secondaryCategoryIds.includes(definition.id))
          .map((definition) =>
            renderCategoryCard(definition, "budget-breakdown-card budget-breakdown-card--secondary")
          )
          .join("")}
      </div>
      <div class="budget-breakdown-pills">
        ${["booked", "required", "flexible", "optional"]
          .map((bucketId) => {
            const total =
              bucketId === "optional" && !estimate.includeExtras
                ? itineraryBudgetLabels.optionalInactive
                : formatCurrencyCopy(estimate.bucketTotals[bucketId] || 0);

            return `
              <span class="budget-breakdown-pill budget-breakdown-pill--${bucketId}">
                ${renderLocalizedContent(getBucketLabel(bucketId))} · ${renderLocalizedContent(total)}
              </span>
            `;
          })
          .join("")}
      </div>
    `;
  };
  const renderSourceMetaMarkup = () => {
    const compactItems = [
      {
        label: { en: "Range bands", ja: "予算帯の見方" },
        body: {
          en: "Lean stays workable, Expected follows the current plan, and High keeps a realistic buffer.",
          ja: "控えめは成立する安め寄り、標準は現在の計画、高めは現実的な上振れを見ています。"
        }
      },
      {
        label: { en: "Route extras", ja: "ルート追加費用" },
        body: itineraryBudgetLabels.rangeLegendRouteExtras
      },
      {
        label: { en: "Currency view", ja: "通貨表示" },
        body: itineraryBudgetLabels.currencyDisplayMeta
      },
      {
        label: itineraryBudgetLabels.sourceUpdatedPrefix,
        body: { en: budgetSourceUpdatedAt, ja: budgetSourceUpdatedAt }
      }
    ];

    return `
      <article class="budget-source-meta-card budget-source-meta-card--compact">
        <div class="budget-source-meta-card__list">
          ${compactItems
            .map(
              (item) => `
                <section class="budget-source-meta-card__item">
                  <p class="budget-source-meta-card__label">${renderLocalizedContent(item.label)}</p>
                  <p class="budget-source-meta-card__body">${renderLocalizedContent(item.body)}</p>
                </section>
              `
            )
            .join("")}
        </div>
      </article>
    `;
  };
  const renderSourcesMarkup = () => "";
  const renderDayMarkup = (dayEstimate) => {
    const noteAriaEn = `Budget note for ${dayEstimate.title.en}`;
    const noteAriaJa = `${dayEstimate.title.ja}の予算メモ`;
    const stayOptions = Array.isArray(dayEstimate.stayOptions) ? dayEstimate.stayOptions : [];
    const selectedStayId = dayEstimate.stayDefinition?.id || "";
    const stayAreaCopy = getStayAreaCopy(dayEstimate.stayDefinition);
    const stayAnchorCopy = getStayAnchorCopy(dayEstimate.stayDefinition);
    const stayRouteReasonCopy = getStayRouteReasonCopy(dayEstimate.stayDefinition);
    const stayMetaRows = [
      stayAreaCopy
        ? { label: itineraryBudgetLabels.stayAreaLabel, value: stayAreaCopy }
        : null,
      stayAnchorCopy
        ? { label: itineraryBudgetLabels.stayAnchorLabel, value: stayAnchorCopy }
        : null
    ].filter(Boolean);
    const stayMetaMarkup = stayMetaRows.length
      ? `
        <div class="budget-day-card__stay-meta">
          ${stayMetaRows
            .map(
              (row) => `
                <p class="budget-day-card__stay-meta-row">
                  <span class="budget-day-card__stay-meta-label">${renderLocalizedContent(
                    row.label
                  )}</span>
                  <span class="budget-day-card__stay-meta-value">${renderLocalizedContent(
                    row.value
                  )}</span>
                </p>
              `
            )
            .join("")}
        </div>
      `
      : "";
    const stayRouteMarkup = stayRouteReasonCopy
      ? `
        <p class="budget-day-card__stay-route">
          <span class="budget-day-card__stay-route-label">${renderLocalizedContent(
            itineraryBudgetLabels.stayWhyLabel
          )}</span>
          <span class="budget-day-card__stay-route-value">${renderLocalizedContent(
            stayRouteReasonCopy
          )}</span>
        </p>
      `
      : "";
    const stayControlMarkup = stayOptions.length
      ? `
        <section class="budget-day-card__stay-field" aria-label="${escapeHtml(
          getLocalizedText(itineraryBudgetLabels.stayLabel)
        )}">
          <div class="budget-day-card__stay-head">
            <span class="budget-day-card__stay-label">${renderLocalizedContent(
              itineraryBudgetLabels.stayLabel
            )}</span>
            <p class="budget-day-card__stay-caption">${renderLocalizedContent(
              itineraryBudgetLabels.stayCaption
            )}</p>
          </div>
          <div
            class="budget-day-card__stay-options"
            role="radiogroup"
            aria-label="${escapeHtml(getLocalizedText(itineraryBudgetLabels.stayLabel))}">
            ${stayOptions
              .map((stayOption) => {
                const isSelected = stayOption.id === selectedStayId;
                const stayTypeLabel = getStayTypeLabel(stayOption.type);
                return `
                  <label class="budget-day-card__stay-option ${isSelected ? "is-selected" : ""}">
                    <input
                      class="budget-day-card__stay-radio"
                      type="radio"
                      name="budget-stay-${dayEstimate.day}"
                      value="${escapeHtml(stayOption.id)}"
                      data-budget-stay-option="${dayEstimate.day}"
                      ${isSelected ? "checked" : ""}>
                    <span class="budget-day-card__stay-option-copy">
                      <span class="budget-day-card__stay-option-title">${renderLocalizedContent(
                        stayOption.label
                      )}</span>
                      <span class="budget-day-card__stay-option-meta">${renderLocalizedContent(
                        stayTypeLabel
                      )}</span>
                    </span>
                    <span class="budget-day-card__stay-option-indicator" aria-hidden="true"></span>
                  </label>
                `;
              })
              .join("")}
          </div>
          ${stayMetaMarkup}
          ${stayRouteMarkup}
          <p class="budget-day-card__stay-hint">${renderLocalizedContent(
            getStayHintCopy(dayEstimate.stayDefinition)
          )}</p>
        </section>
      `
      : "";

    return `
      <article class="budget-day-card" data-budget-day="${dayEstimate.day}">
        <div class="budget-day-card__header">
          <div class="budget-day-card__copy">
            <h4>${renderLocalizedContent(dayEstimate.title)}</h4>
            <p>${renderLocalizedContent(dayEstimate.subtitle)}</p>
          </div>
          <div class="budget-day-card__totals">
            <p class="budget-day-card__total">${escapeHtml(formatCurrency(dayEstimate.total))}</p>
            <p class="budget-day-card__range-note">${renderLocalizedContent(
              getRangeMetaCopy(dayEstimate.totalRange)
            )}</p>
          </div>
        </div>
        ${stayControlMarkup}
        <ul class="budget-day-card__items">
          ${dayEstimate.itemEstimates
            .map((item) => {
              const chipClass =
                item.bucket === "free"
                  ? "budget-chip budget-chip--free"
                  : `budget-chip budget-chip--${escapeHtml(item.bucket)}`;
              const amountCopy =
                item.itemCost.included || item.bucket === "free"
                  ? formatCurrencyCopy(item.lineTotal)
                  : itineraryBudgetLabels.optionalInactive;
              const rangeCopy =
                item.itemCost.included || item.bucket === "free"
                  ? hasBudgetRangeSpread(item.lineRangeTotals)
                    ? getCompactRangeCopy(item.lineRangeTotals)
                    : null
                  : hasBudgetRangeValue(item.rawRangeTotals)
                    ? getRangeMetaCopy(item.rawRangeTotals, { available: true })
                    : null;

              return `
                <li class="budget-line-item">
                  <div class="budget-line-item__main">
                    <div class="budget-line-item__headline">
                      <span class="budget-line-item__title">${renderLocalizedContent(item.label)}</span>
                      <span class="${chipClass}">${renderLocalizedContent(
                        getBucketLabel(item.bucket)
                      )}</span>
                    </div>
                    <p class="budget-line-item__meta">
                      <span>${renderLocalizedContent(getCategoryLabel(item.category))}</span>
                      <span class="budget-line-item__dot" aria-hidden="true"></span>
                      <span>${renderLocalizedContent(getItemFormulaCopy(item.itemCost, item))}</span>
                    </p>
                  </div>
                  <div class="budget-line-item__amounts">
                    <p class="budget-line-item__amount">${renderLocalizedContent(amountCopy)}</p>
                    ${
                      rangeCopy
                        ? `<p class="budget-line-item__range">${renderLocalizedContent(
                            rangeCopy
                          )}</p>`
                        : ""
                    }
                  </div>
                </li>
              `;
            })
            .join("")}
        </ul>
        <label class="budget-day-card__note-field">
          <span class="budget-day-card__note-label">${renderLocalizedContent(
            itineraryBudgetLabels.noteLabel
          )}</span>
          <textarea
            class="budget-day-card__note-input"
            rows="3"
            maxlength="280"
            data-budget-note-input="${dayEstimate.day}"
            data-placeholder-en="${escapeHtml(itineraryBudgetLabels.notePlaceholder.en)}"
            data-placeholder-ja="${escapeHtml(itineraryBudgetLabels.notePlaceholder.ja)}"
            data-aria-label-en="${escapeHtml(noteAriaEn)}"
            data-aria-label-ja="${escapeHtml(noteAriaJa)}"
            aria-label="${escapeHtml(root.lang === "ja" ? noteAriaJa : noteAriaEn)}"
            placeholder="${escapeHtml(
              root.lang === "ja"
                ? itineraryBudgetLabels.notePlaceholder.ja
                : itineraryBudgetLabels.notePlaceholder.en
            )}">${escapeHtml(dayEstimate.note || "")}</textarea>
        </label>
      </article>
    `;
  };
  const syncStatus = (estimate = calculateEstimate()) => {
    if (!budgetStatusNode) {
      return;
    }

    budgetStatusNode.innerHTML = `
      <article class="budget-status-card">
        <p class="budget-status-card__eyebrow">${renderLocalizedContent(
          itineraryBudgetLabels.statusReady
        )}</p>
        <p class="budget-status-card__summary">${renderLocalizedContent({
          en: `${estimate.travelers} traveler${estimate.travelers === 1 ? "" : "s"} • Fixed 7-day west-to-east route`,
          ja: `${estimate.travelers}人 ・ 固定の7日間・西から東へのルート`
        })}</p>
        <p class="budget-status-card__meta">${renderLocalizedContent(
          itineraryBudgetLabels.statusMeta
        )}</p>
      </article>
    `;
    syncLocalizedNodes(budgetStatusNode);
  };
  const syncControls = () => {
    if (budgetTravelersInput && budgetTravelersInput.value !== String(getTravelerCount())) {
      budgetTravelersInput.value = String(getTravelerCount());
    }

    if (budgetAccommodationShareModeInput) {
      Array.from(budgetAccommodationShareModeInput.options).forEach((option) => {
        option.textContent = getLocalizedText(getShareModeLabel(option.value));
      });

      if (budgetAccommodationShareModeInput.value !== getAccommodationShareMode()) {
        budgetAccommodationShareModeInput.value = getAccommodationShareMode();
      }
    }

    if (budgetAccommodationShareCountInput) {
      budgetAccommodationShareCountInput.max = String(getTravelerCount());
      const customShareCount = getStoredCustomShareCount();
      if (budgetAccommodationShareCountInput.value !== String(customShareCount)) {
        budgetAccommodationShareCountInput.value = String(customShareCount);
      }
      budgetAccommodationShareCountInput.disabled = getAccommodationShareMode() !== "custom";
    }

    if (budgetAccommodationShareCountField) {
      budgetAccommodationShareCountField.hidden = getAccommodationShareMode() !== "custom";
    }

    if (budgetIncludeExtrasInput) {
      budgetIncludeExtrasInput.checked = includeExtras();
    }

    budgetResetButtons.forEach((button) => {
      button.disabled = !hasChanges();
    });
  };
  const syncUI = () => {
    if (!budgetNotesCard || !budgetSummaryNode || !budgetBreakdownNode || !budgetDaysNode) {
      return;
    }

    const estimate = calculateEstimate();
    const activeDay = normalizeActiveBudgetDay(estimate.visibleDayEstimates);
    const activeDayEstimate =
      estimate.visibleDayEstimates.find((dayEstimate) => dayEstimate.day === activeDay) ||
      estimate.visibleDayEstimates[0] ||
      null;
    budgetSummaryNode.innerHTML = renderSummaryMarkup(estimate);
    budgetBreakdownNode.innerHTML = renderBreakdownMarkup(estimate);
    if (budgetDaySelectorNode) {
      budgetDaySelectorNode.innerHTML = renderDaySelectorMarkup(
        estimate.visibleDayEstimates,
        activeDay
      );
    }
    budgetDaysNode.innerHTML = activeDayEstimate ? renderDayMarkup(activeDayEstimate) : "";

    if (budgetSourceMetaNode) {
      budgetSourceMetaNode.innerHTML = renderSourceMetaMarkup();
    }

    if (budgetSourcesNode) {
      budgetSourcesNode.innerHTML = "";
      budgetSourcesNode.hidden = true;
    }

    [
      budgetSummaryNode,
      budgetBreakdownNode,
      budgetDaySelectorNode,
      budgetDaysNode,
      budgetSourceMetaNode,
      budgetSourcesNode
    ]
      .filter(Boolean)
      .forEach((node) => syncLocalizedNodes(node));

    budgetDaysNode.querySelectorAll("[data-budget-note-input]").forEach((textarea) => {
      const placeholder = root.lang === "ja" ? textarea.dataset.placeholderJa : textarea.dataset.placeholderEn;
      const ariaLabel = root.lang === "ja" ? textarea.dataset.ariaLabelJa : textarea.dataset.ariaLabelEn;
      textarea.setAttribute("placeholder", placeholder || "");
      textarea.setAttribute("aria-label", ariaLabel || "");
    });

    syncStatus(estimate);
    syncControls();
    refreshBookingTransitIfReady();
  };
  const commitSettings = () => {
    const nextTravelers = normalizeTravelerCount(budgetTravelersInput?.value, budgetDefaultTravelerCount);
    budgetNotesState.travelers = nextTravelers;
    budgetNotesState.accommodationShareMode = normalizeShareMode(
      budgetAccommodationShareModeInput?.value,
      budgetAccommodationShareModeDefault
    );
    budgetNotesState.accommodationShareCount = normalizeShareCount(
      budgetAccommodationShareCountInput?.value ?? budgetNotesState.accommodationShareCount,
      nextTravelers
    );
    budgetNotesState.includeExtras = budgetIncludeExtrasInput?.checked === true;
    storeState();
    syncUI();
  };
  const resetState = () => {
    budgetNotesState = getDefaultState();
    storeState();
    syncUI();
  };
  const bindUI = () => {
    if (!budgetNotesCard || !budgetDaysNode) {
      return;
    }

    if (
      budgetDaySelectorNode &&
      budgetDaySelectorNode.dataset.itineraryBudgetSelectorBound !== "true"
    ) {
      budgetDaySelectorNode.addEventListener("click", (event) => {
        const dayButton = event.target.closest?.("[data-budget-day-select]");
        if (!dayButton) {
          return;
        }

        const nextDay = Number.parseInt(dayButton.dataset.budgetDaySelect || "", 10);
        if (Number.isNaN(nextDay) || activeBudgetDay === nextDay) {
          return;
        }

        activeBudgetDay = nextDay;
        syncUI();
      });
      budgetDaySelectorNode.dataset.itineraryBudgetSelectorBound = "true";
    }

    if (budgetTravelersInput && budgetTravelersInput.dataset.itineraryBudgetBound !== "true") {
      budgetTravelersInput.addEventListener("input", () => {
        const parsedValue = Number.parseInt(budgetTravelersInput.value, 10);
        if (Number.isNaN(parsedValue)) {
          syncControls();
          return;
        }

        budgetNotesState.travelers = normalizeTravelerCount(parsedValue, budgetDefaultTravelerCount);
        budgetNotesState.accommodationShareCount = normalizeShareCount(
          budgetNotesState.accommodationShareCount,
          budgetNotesState.travelers
        );
        storeState();
        syncUI();
      });
      budgetTravelersInput.addEventListener("blur", () => {
        syncControls();
      });
      budgetTravelersInput.dataset.itineraryBudgetBound = "true";
    }

    if (
      budgetAccommodationShareModeInput &&
      budgetAccommodationShareModeInput.dataset.itineraryBudgetBound !== "true"
    ) {
      budgetAccommodationShareModeInput.addEventListener("change", () => {
        budgetNotesState.accommodationShareMode = normalizeShareMode(
          budgetAccommodationShareModeInput.value,
          budgetAccommodationShareModeDefault
        );
        budgetNotesState.accommodationShareCount = normalizeShareCount(
          budgetAccommodationShareCountInput?.value ?? budgetNotesState.accommodationShareCount,
          getTravelerCount()
        );
        storeState();
        syncUI();
      });
      budgetAccommodationShareModeInput.dataset.itineraryBudgetBound = "true";
    }

    if (
      budgetAccommodationShareCountInput &&
      budgetAccommodationShareCountInput.dataset.itineraryBudgetBound !== "true"
    ) {
      budgetAccommodationShareCountInput.addEventListener("input", () => {
        const parsedValue = Number.parseInt(budgetAccommodationShareCountInput.value, 10);
        if (Number.isNaN(parsedValue)) {
          syncControls();
          return;
        }

        budgetNotesState.accommodationShareCount = normalizeShareCount(
          parsedValue,
          getTravelerCount()
        );
        storeState();
        syncUI();
      });
      budgetAccommodationShareCountInput.addEventListener("blur", () => {
        syncControls();
      });
      budgetAccommodationShareCountInput.dataset.itineraryBudgetBound = "true";
    }

    if (budgetIncludeExtrasInput && budgetIncludeExtrasInput.dataset.itineraryBudgetBound !== "true") {
      budgetIncludeExtrasInput.addEventListener("change", () => {
        commitSettings();
      });
      budgetIncludeExtrasInput.dataset.itineraryBudgetBound = "true";
    }

    budgetResetButtons.forEach((button) => {
      if (button.dataset.itineraryBudgetBound === "true") {
        return;
      }

      button.addEventListener("click", () => {
        resetState();
      });
      button.dataset.itineraryBudgetBound = "true";
    });

    if (budgetDaysNode.dataset.itineraryBudgetBound === "true") {
      return;
    }

    budgetDaysNode.addEventListener("change", (event) => {
      const stayControl = event.target.closest?.(
        "[data-budget-stay-option], [data-budget-stay-select]"
      );
      if (!stayControl) {
        return;
      }

      const day = stayControl.dataset.budgetStayOption || stayControl.dataset.budgetStaySelect;
      updateDayState(day, {
        ...getDayState(day),
        stayId: stayControl.value
      });
      syncControls();
      syncUI();
    });

    budgetDaysNode.addEventListener("input", (event) => {
      const noteField = event.target.closest?.("[data-budget-note-input]");
      if (!noteField) {
        return;
      }

      updateDayState(noteField.dataset.budgetNoteInput, { note: noteField.value });
      syncControls();
    });
    budgetDaysNode.dataset.itineraryBudgetBound = "true";
  };
  const initBudgetNotes = () => {
    if (!budgetNotesCard) {
      return Promise.resolve();
    }

    hydrateState();
    bindUI();
    syncUI();
    return Promise.resolve();
  };

  getBudgetCategoryLabel = getCategoryLabel;
  getBudgetBucketLabel = getBucketLabel;
  formatBudgetCurrency = formatCurrency;
  normalizeBudgetTravelerCount = normalizeTravelerCount;
  getBudgetRoomCount = getRoomCount;
  getDefaultBudgetNotesState = getDefaultState;
  readStoredBudgetNotesState = readState;
  ensureBudgetNotesStateHydrated = hydrateState;
  hasBudgetNotesChanges = hasChanges;
  storeBudgetNotesState = storeState;
  getBudgetTravelerCount = getTravelerCount;
  shouldIncludeBudgetExtras = includeExtras;
  getBudgetDayState = getDayState;
  updateStoredBudgetDayState = updateDayState;
  getBudgetVisibleDayDefinitions = visibleDays;
  getBudgetExtraDayDefinitions = extraDayDefinitions;
  calculateBudgetItemCost = calculateItemCost;
  getBudgetItemFormulaCopy = getItemFormulaCopy;
  calculateBudgetEstimate = calculateEstimate;
  renderBudgetSummaryMarkup = renderSummaryMarkup;
  renderBudgetBreakdownMarkup = renderBreakdownMarkup;
  renderBudgetSourceMetaMarkup = renderSourceMetaMarkup;
  renderBudgetSourcesMarkup = renderSourcesMarkup;
  renderBudgetDayMarkup = renderDayMarkup;
  syncBudgetStatus = syncStatus;
  syncBudgetControlsUI = syncControls;
  syncBudgetNotesUI = syncUI;
  commitBudgetSettings = commitSettings;
  resetBudgetNotesState = resetState;
  bindBudgetNotesUI = bindUI;
  initializeBudgetNotes = initBudgetNotes;
  refreshBudgetNotesIfReady = () => {
    if (!budgetNotesInitialized) {
      return;
    }

    syncUI();
  };
})();

function readStoredLanguage() {
  try {
    return window.localStorage.getItem(storageKey);
  } catch (error) {
    return null;
  }
}

function readStoredActivePanel() {
  try {
    const storedPanel = window.localStorage.getItem(activePanelStorageKey);
    return Array.from(sectionTabs)
      .some((tab) => tab.dataset.panelTarget === storedPanel)
      ? storedPanel
      : null;
  } catch (error) {
    return null;
  }
}

function storeActivePanel(panelId) {
  try {
    queueStorageValue(activePanelStorageKey, panelId);
  } catch (error) {
    // Ignore storage failures and keep the navigation usable.
  }
}

function storeLanguage(language) {
  try {
    queueStorageValue(storageKey, language);
  } catch (error) {
    // Ignore storage failures and keep the page usable.
  }
}

function applyReservedHeaderHeight(nextHeight, forceReset = false) {
  const measuredHeight = Math.ceil(Number(nextHeight) || 0);
  if (measuredHeight <= 0) {
    return;
  }

  if (forceReset) {
    reservedHeaderHeight = measuredHeight;
  } else {
    reservedHeaderHeight = Math.max(reservedHeaderHeight, measuredHeight);
  }

  root.style.setProperty("--header-reserved-height", `${reservedHeaderHeight}px`);
}

function getResizeObserverBlockSize(entry) {
  if (!entry) {
    return 0;
  }

  const borderBoxSize = Array.isArray(entry.borderBoxSize)
    ? entry.borderBoxSize[0]
    : entry.borderBoxSize;

  if (borderBoxSize && Number.isFinite(borderBoxSize.blockSize)) {
    return borderBoxSize.blockSize;
  }

  return Number(entry.contentRect?.height || 0);
}

function syncReservedHeaderHeight(forceReset = false) {
  if (!siteHeader) {
    return;
  }

  applyReservedHeaderHeight(siteHeader.getBoundingClientRect().height, forceReset);
}

function resetHeaderScrollTracking(scrollY = window.scrollY) {
  const nextScrollY = Math.max(scrollY, 0);
  lastScrollY = nextScrollY;
  headerScrollIntentStartY = nextScrollY;
  headerScrollIntentDirection = 0;
}

function lockHeaderState(duration = 420) {
  headerLockUntil = window.performance.now() + duration;
  resetHeaderScrollTracking();
}

function syncHeaderAccessoryVisibility(isCondensed) {
  headerAccessoryGroups.forEach((group) => {
    group.toggleAttribute("inert", isCondensed);
    if (isCondensed) {
      group.setAttribute("aria-hidden", "true");
      return;
    }

    group.removeAttribute("aria-hidden");
  });
}

function setHeaderCondensed(nextState) {
  if (!siteHeader || headerIsCondensed === nextState) {
    return false;
  }

  headerIsCondensed = nextState;
  siteHeader.classList.toggle("is-condensed", nextState);
  syncHeaderAccessoryVisibility(nextState);
  return true;
}

function getRemainingScrollDistance(scrollY = window.scrollY) {
  const scrollRoot = document.scrollingElement || document.documentElement;
  const maxScrollY = Math.max((scrollRoot?.scrollHeight || 0) - window.innerHeight, 0);
  return Math.max(maxScrollY - scrollY, 0);
}

function scheduleDeferredGeometryRelease() {
  if (!deferredGeometryWorkPending || deferredGeometryReleaseTimer) {
    return;
  }

  deferredGeometryReleaseTimer = window.setTimeout(() => {
    deferredGeometryReleaseTimer = 0;
    deferredGeometryWorkPending = false;
  }, deferredGeometryReleaseDelayMs);
}

function scheduleReservedHeaderHeightSync({ forceReset = false, defer = false } = {}) {
  if (!siteHeader) {
    return;
  }

  if (headerHeightSyncFrame) {
    window.cancelAnimationFrame(headerHeightSyncFrame);
    headerHeightSyncFrame = 0;
  }

  if (headerHeightSyncDelayTimer) {
    window.clearTimeout(headerHeightSyncDelayTimer);
    headerHeightSyncDelayTimer = 0;
  }

  if (headerHeightSyncIdleHandle && typeof window.cancelIdleCallback === "function") {
    window.cancelIdleCallback(headerHeightSyncIdleHandle);
    headerHeightSyncIdleHandle = 0;
  }

  const runSync = () => {
    headerHeightSyncFrame = 0;
    headerHeightSyncDelayTimer = 0;
    headerHeightSyncIdleHandle = 0;
    syncReservedHeaderHeight(forceReset);
  };

  if (defer && deferredGeometryWorkPending) {
    if (typeof window.requestIdleCallback === "function") {
      headerHeightSyncIdleHandle = window.requestIdleCallback(runSync, {
        timeout: deferredNonCriticalLayoutTimeoutMs
      });
      return;
    }

    headerHeightSyncDelayTimer = window.setTimeout(runSync, deferredNonCriticalLayoutTimeoutMs);
    return;
  }

  headerHeightSyncFrame = window.requestAnimationFrame(runSync);
}

function preserveScrollPosition(callback) {
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  callback();

  if (window.scrollX === scrollX && window.scrollY === scrollY) {
    return;
  }

  window.requestAnimationFrame(() => {
    if (window.scrollX !== scrollX || window.scrollY !== scrollY) {
      window.scrollTo(scrollX, scrollY);
    }
  });
}

function getDayInputs(dayCard) {
  return Array.from(dayCard.querySelectorAll('input[type="checkbox"]'));
}

function getDayCompletionRatio(dayCard) {
  const inputs = getDayInputs(dayCard);
  if (!inputs.length) {
    return 0;
  }

  const checkedCount = inputs.filter((input) => Boolean(checklistState[input.id])).length;
  return checkedCount / inputs.length;
}

function isDayComplete(dayCard) {
  const inputs = getDayInputs(dayCard);
  return inputs.length > 0 && inputs.every((input) => Boolean(checklistState[input.id]));
}

function restoreChecklistState(panel = getSectionPanel("checklist")) {
  if (!panel) {
    return;
  }

  panel.querySelectorAll('.day-card input[type="checkbox"]').forEach((input) => {
    input.checked = Boolean(checklistState[input.id]);
  });
}

function getSectionPanel(sectionName) {
  return contentPanels.find((panel) => panel.dataset.panel === sectionName) || null;
}

function getActivePanelId() {
  return contentPanels.find((panel) => panel.classList.contains("is-active"))?.dataset.panel || "";
}

function markSectionHydrated(sectionName) {
  const panel = getSectionPanel(sectionName);
  if (panel) {
    panel.dataset.hydrated = "true";
  }
}

function ensureRevealObserver() {
  if (reducedEffectsEnabled || revealObserver || !("IntersectionObserver" in window)) {
    return;
  }

  revealObserver = new window.IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -10% 0px"
    }
  );
}

function ensureSectionInitialized(sectionName) {
  if (!sectionName) {
    return Promise.resolve();
  }

  if (initializedSections.has(sectionName)) {
    return Promise.resolve();
  }

  if (sectionInitPromises.has(sectionName)) {
    return sectionInitPromises.get(sectionName);
  }

  const init = sectionInitializers[sectionName];
  if (!init) {
    initializedSections.add(sectionName);
    markSectionHydrated(sectionName);
    return Promise.resolve();
  }

  const promise = Promise.resolve()
    .then(() => init())
    .then(() => {
      initializedSections.add(sectionName);
      markSectionHydrated(sectionName);

      if (getActivePanelId() === sectionName) {
        refreshRevealPanel(sectionName);
      }
    })
    .catch((error) => {
      console.error(`Failed to initialize section: ${sectionName}`, error);
    })
    .finally(() => {
      sectionInitPromises.delete(sectionName);
    });

  sectionInitPromises.set(sectionName, promise);
  return promise;
}

function scheduleIdleSectionWarmup(initialSection) {
  void initialSection;
}

function initOverviewSection() {
  const panel = getSectionPanel("overview");
  if (!panel) {
    return;
  }

  decorateProgressTimeline();
  registerRevealBlocks(panel);
  refreshChecklistProgressState();
  syncProgressTimeline();
}

function handleChecklistPanelClick(event) {
  const transitTrigger = event.target.closest("[data-transit-detail-trigger]");
  const dayCard = event.target.closest(".day-card[data-day]");
  if (transitTrigger) {
    if (!dayCard) {
      return;
    }

    const day = Number(dayCard.dataset.day);
    if (day > accessibleDay) {
      event.preventDefault();
      event.stopPropagation();
      showSequenceNotice(accessibleDay);
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    openTransitDetail(transitTrigger.dataset.transitDetailTrigger || "", transitTrigger);
    return;
  }

  if (dayCard) {
    const day = Number(dayCard.dataset.day);
    if (day > accessibleDay) {
      event.preventDefault();
      event.stopPropagation();
      showSequenceNotice(accessibleDay);
    }
  }
}

function handleChecklistPanelChange(event) {
  const input = event.target.closest('.day-card input[type="checkbox"]');
  if (!input) {
    return;
  }

  const dayCard = input.closest(".day-card[data-day]");
  const day = dayCard?.dataset.day;
  const wasComplete = day ? completedDays.has(day) : false;
  const previousUnlockedDays = new Set(unlockedDays);
  const previousCurrentDay = String(currentProgressDay);

  if (input.checked) {
    checklistState[input.id] = true;
  } else {
    delete checklistState[input.id];
  }

  storeChecklistState();
  refreshChecklistProgressState({ syncDayCards: true });
  syncProgressTimeline();

  Array.from(unlockedDays)
    .filter((unlockedDay) => !previousUnlockedDays.has(unlockedDay))
    .forEach((unlockedDay) => {
      animateUnlock(progressItemMap.get(unlockedDay));
      animateUnlock(dayCardMap.get(unlockedDay));
    });

  if (String(currentProgressDay) !== previousCurrentDay) {
    lastTimelineFocusDay = null;
  }

  if (day && !wasComplete && completedDays.has(day)) {
    celebrateCompletedDay(day);
  }
}

function initChecklistSection() {
  const panel = getSectionPanel("checklist");
  if (!panel) {
    return;
  }

  restoreChecklistState(panel);

  if (panel.dataset.checklistBound !== "true") {
    panel.addEventListener("click", handleChecklistPanelClick);
    panel.addEventListener("change", handleChecklistPanelChange);
    panel.dataset.checklistBound = "true";
  }

  registerRevealBlocks(panel);
  refreshChecklistProgressState({ syncDayCards: true });
  syncProgressTimeline();
  scheduleDayCardRowHeights();

  if (getActivePanelId() === "checklist") {
    void initializeFujiForecast();
  }
}

function initNotesSection() {
  const panel = getSectionPanel("notes");
  if (!panel) {
    return;
  }

  renderTripNotes();
  registerRevealBlocks(panel);
}

function initBudgetSection() {
  const panel = getSectionPanel("budget");
  if (!panel) {
    return;
  }

  registerRevealBlocks(panel);
  initializeBudgetNotes();
}

function getLocalizedText(content) {
  return root.lang === "ja" ? content?.ja ?? content?.en ?? "" : content?.en ?? content?.ja ?? "";
}

function getRouteExplorerViewById(viewId) {
  return routeExplorerViewDefinitions.find((view) => view.id === viewId) || null;
}

function getRouteExplorerSegmentById(segmentId) {
  return routeExplorerSegmentMap.get(segmentId) || null;
}

function getVisibleRouteDayLinks(dayLinks = []) {
  return dayLinks;
}

function getRouteDayReference(day) {
  const normalizedDay = Number.parseInt(String(day), 10);
  const definition =
    budgetDayDefinitions.find((entry) => entry.day === normalizedDay) || null;

  return {
    day: normalizedDay,
    title: definition?.title || {
      en: `Day ${normalizedDay}`,
      ja: `${normalizedDay}日目`
    },
    stops: Array.isArray(routeDayStopDefinitions[normalizedDay])
      ? routeDayStopDefinitions[normalizedDay]
      : []
  };
}

function createRouteMapState() {
  return {
    ready: false,
    failed: false,
    promise: null,
    map: null,
    markers: [],
    markerStateKey: "",
    styleSignature: ""
  };
}

function getRouteMapDisplayMode() {
  return routeMapDisplayMode === "interactive" ? "interactive" : "preview";
}

function getRouteMapDisplayConfig(mode = getRouteMapDisplayMode()) {
  return routeMapDisplayDefinitions[mode] || routeMapDisplayDefinitions.preview;
}

function getRouteMapStopsNode() {
  return routeMapStopsNode;
}

function getRouteMapDetailNode() {
  return routeMapExplorerNode?.querySelector("[data-route-map-detail]") || null;
}

function getRouteMapBaseLanguage() {
  return root.lang === "ja" ? "ja" : "en";
}

function getRouteMapBaseFlavorName(theme = getCurrentTheme()) {
  return theme === "dark" ? "dark" : "light";
}

function getRouteMapStyleSignature(
  theme = getCurrentTheme(),
  language = getRouteMapBaseLanguage()
) {
  return `${getRouteMapBaseFlavorName(theme)}|${language}`;
}

function resolveRouteMapAssetUrl(assetPath) {
  return new URL(assetPath, window.location.href).toString();
}

function setRouteMapShellState(state = "ready") {
  [routeMapPreviewNode].filter(Boolean).forEach((node) => {
    node.setAttribute("data-map-state", state);
  });
}

function setRouteMapDisplayState(mode = "preview") {
  routeMapDisplayMode = mode === "interactive" ? "interactive" : "preview";
  routeMapCard?.setAttribute("data-route-map-active-mode", routeMapDisplayMode);
  routeMapPreviewNode?.setAttribute("data-route-map-mode", routeMapDisplayMode);
}

function enableRouteMapInteractiveMode() {
  if (getRouteMapDisplayMode() === "interactive") {
    return;
  }

  setRouteMapDisplayState("interactive");
}

function getRouteMapSelectionSignature(selectionState) {
  if (!selectionState?.config?.id) {
    return "view:route-overview";
  }

  const segmentIds = Array.from(selectionState.segmentIds || []).sort().join(",");
  const stopIds = Array.from(selectionState.stopIds || []).sort().join(",");

  return [
    selectionState.type,
    selectionState.config.id,
    segmentIds,
    stopIds
  ].join("|");
}

function getSerializedRouteMapValue(value) {
  return typeof value === "string" ? value : JSON.stringify(value);
}

function setRouteMapPaintPropertyIfChanged(map, layerId, property, value) {
  if (!map?.getLayer(layerId)) {
    return;
  }

  const cacheKey = `${layerId}:${property}`;
  const serializedValue = getSerializedRouteMapValue(value);
  const cache = map.__routeMapPaintCache || (map.__routeMapPaintCache = new Map());
  if (cache.get(cacheKey) === serializedValue) {
    return;
  }

  map.setPaintProperty(layerId, property, value);
  cache.set(cacheKey, serializedValue);
}

function setRouteMapFilterIfChanged(map, layerId, value) {
  if (!map?.getLayer(layerId)) {
    return;
  }

  const serializedValue = getSerializedRouteMapValue(value);
  const cache = map.__routeMapFilterCache || (map.__routeMapFilterCache = new Map());
  if (cache.get(layerId) === serializedValue) {
    return;
  }

  map.setFilter(layerId, value);
  cache.set(layerId, serializedValue);
}

function loadRouteMapLibrary() {
  const loadRouteMapStylesheet = () => {
    if (routeMapStylesheetPromise) {
      return routeMapStylesheetPromise;
    }

    routeMapStylesheetPromise = new Promise((resolve, reject) => {
      const bindStylesheet = (link) => {
        if (!link) {
          reject(new Error("MapLibre stylesheet element is missing."));
          return;
        }

        if (link.dataset.loaded === "true" || link.sheet) {
          link.dataset.loaded = "true";
          resolve();
          return;
        }

        const handleLoad = () => {
          link.dataset.loaded = "true";
          resolve();
        };
        const handleError = () => {
          routeMapStylesheetPromise = null;
          reject(new Error("MapLibre stylesheet failed to load."));
        };

        link.addEventListener("load", handleLoad, { once: true });
        link.addEventListener("error", handleError, { once: true });
      };

      const existingLink = document.querySelector("[data-route-maplibre-style]");
      if (existingLink) {
        bindStylesheet(existingLink);
        return;
      }

      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = routeMapLibraryStyleUrl;
      styleLink.setAttribute("data-route-maplibre-style", "true");
      bindStylesheet(styleLink);
      document.head.append(styleLink);
    });

    return routeMapStylesheetPromise;
  };

  const loadRouteMapScriptAsset = (url, dataAttribute, runtimeGlobal, runtimeLabel) => {
    if (window[runtimeGlobal]) {
      return Promise.resolve(window[runtimeGlobal]);
    }

    return new Promise((resolve, reject) => {
      const handleLoad = (scriptNode) => {
        const runtime = window[runtimeGlobal];
        if (runtime) {
          if (scriptNode) {
            scriptNode.dataset.loaded = "true";
          }
          resolve(runtime);
          return;
        }

        reject(new Error(`${runtimeLabel} did not initialize.`));
      };

      const handleError = () => {
        reject(new Error(`${runtimeLabel} failed to load.`));
      };

      const existingScript = document.querySelector(`[${dataAttribute}]`);
      if (existingScript) {
        if (existingScript.dataset.loaded === "true" && window[runtimeGlobal]) {
          resolve(window[runtimeGlobal]);
          return;
        }

        existingScript.addEventListener("load", () => handleLoad(existingScript), { once: true });
        existingScript.addEventListener("error", handleError, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = url;
      script.defer = true;
      script.setAttribute(dataAttribute, "true");
      script.addEventListener("load", () => handleLoad(script), { once: true });
      script.addEventListener("error", handleError, { once: true });
      document.head.append(script);
    });
  };

  const ensureRouteMapPmtilesProtocol = (maplibregl, pmtilesRuntime) => {
    if (routeMapPmtilesProtocol) {
      return;
    }

    if (!maplibregl?.addProtocol || !pmtilesRuntime?.Protocol) {
      throw new Error("PMTiles protocol support is unavailable.");
    }

    routeMapPmtilesProtocol = new pmtilesRuntime.Protocol();
    maplibregl.addProtocol("pmtiles", routeMapPmtilesProtocol.tile);
  };

  if (routeMapLibraryPromise) {
    return routeMapLibraryPromise;
  }

  routeMapLibraryPromise = Promise.all([
    loadRouteMapStylesheet(),
    loadRouteMapScriptAsset(
      routeMapLibraryScriptUrl,
      "data-route-maplibre-script",
      "maplibregl",
      "MapLibre runtime"
    ),
    loadRouteMapScriptAsset(
      routeMapPmtilesScriptUrl,
      "data-route-map-pmtiles-script",
      "pmtiles",
      "PMTiles runtime"
    ),
    loadRouteMapScriptAsset(
      routeMapBasemapsScriptUrl,
      "data-route-map-basemaps-script",
      "basemaps",
      "Protomaps basemap runtime"
    )
  ])
    .then(([, maplibregl, pmtilesRuntime, basemapsRuntime]) => {
      ensureRouteMapPmtilesProtocol(maplibregl, pmtilesRuntime);
      return {
        maplibregl,
        pmtiles: pmtilesRuntime,
        basemaps: basemapsRuntime
      };
    })
    .catch((error) => {
      routeMapLibraryPromise = null;
      throw error;
    });

  return routeMapLibraryPromise;
}

function getRouteMapPalette(theme = getCurrentTheme()) {
  if (theme === "dark") {
    return {
      background: "#0d141b",
      glowOuter: "rgba(214, 128, 108, 0.18)",
      glowInner: "rgba(244, 203, 191, 0.2)",
      corridor: "rgba(101, 140, 167, 0.18)",
      shadow: "rgba(6, 8, 12, 0.82)",
      routeStart: "#e08773",
      routeMid: "#ebb06b",
      routeMidAlt: "#98b8c7",
      routeEnd: "#7da4c7",
      segmentActive: "#f6d1c7",
      segmentMuted: "rgba(243, 233, 222, 0.16)",
      segmentSelected: "#ffd8ce"
    };
  }

  return {
    background: "#f8f3eb",
    glowOuter: "rgba(171, 74, 59, 0.09)",
    glowInner: "rgba(184, 149, 100, 0.12)",
    corridor: "rgba(117, 133, 148, 0.14)",
    shadow: "rgba(255, 249, 244, 0.9)",
    routeStart: "#ab4a3b",
    routeMid: "#c8844f",
    routeMidAlt: "#b59b59",
    routeEnd: "#64879b",
    segmentActive: "#9b3c33",
    segmentMuted: "rgba(98, 74, 68, 0.18)",
    segmentSelected: "#bf5f4a"
  };
}

function getRouteMapGradientExpression(theme = getCurrentTheme()) {
  const palette = getRouteMapPalette(theme);
  return [
    "interpolate",
    ["linear"],
    ["line-progress"],
    0,
    palette.routeStart,
    0.34,
    palette.routeMid,
    0.7,
    palette.routeMidAlt,
    1,
    palette.routeEnd
  ];
}

function getRouteMapCameraPadding(mode = "interactive") {
  if (mode === "preview") {
    return compactViewportQuery.matches
      ? { top: 54, right: 44, bottom: 60, left: 44 }
      : { top: 64, right: 88, bottom: 72, left: 72 };
  }

  return compactViewportQuery.matches
    ? { top: 70, right: 28, bottom: 76, left: 28 }
    : { top: 82, right: 62, bottom: 82, left: 62 };
}

function getRouteStopLngLat(stopId) {
  const coordinates = routeExplorerStopMap.get(stopId)?.lngLat;
  return Array.isArray(coordinates) && coordinates.length === 2 ? coordinates : null;
}

function getRouteMapFullCoordinates() {
  if (Array.isArray(getRouteMapFullCoordinates.cache)) {
    return getRouteMapFullCoordinates.cache;
  }

  const coordinates = [];
  routeExplorerPathDefinitions.forEach((segment, index) => {
    const segmentCoordinates = (segment.stopIds || [])
      .map((stopId) => getRouteStopLngLat(stopId))
      .filter(Boolean);
    if (segmentCoordinates.length < 2) {
      return;
    }

    if (index === 0) {
      coordinates.push(segmentCoordinates[0]);
    }

    coordinates.push(segmentCoordinates[segmentCoordinates.length - 1]);
  });

  getRouteMapFullCoordinates.cache = coordinates;
  return coordinates;
}

function getRouteMapBoundsFromCoordinates(coordinates = []) {
  if (!coordinates.length) {
    return null;
  }

  let minLng = Infinity;
  let minLat = Infinity;
  let maxLng = -Infinity;
  let maxLat = -Infinity;

  coordinates.forEach((coordinate) => {
    if (!Array.isArray(coordinate) || coordinate.length !== 2) {
      return;
    }

    minLng = Math.min(minLng, coordinate[0]);
    minLat = Math.min(minLat, coordinate[1]);
    maxLng = Math.max(maxLng, coordinate[0]);
    maxLat = Math.max(maxLat, coordinate[1]);
  });

  if (!Number.isFinite(minLng) || !Number.isFinite(minLat) || !Number.isFinite(maxLng) || !Number.isFinite(maxLat)) {
    return null;
  }

  return [
    [minLng, minLat],
    [maxLng, maxLat]
  ];
}

function getRouteMapCoordinatesForSelection(selectionState) {
  if (selectionState.type === "segment") {
    return (selectionState.config.stopIds || [])
      .map((stopId) => getRouteStopLngLat(stopId))
      .filter(Boolean);
  }

  const stopIds = Array.from(selectionState.stopIds);
  if (!stopIds.length) {
    return getRouteMapFullCoordinates();
  }

  return stopIds.map((stopId) => getRouteStopLngLat(stopId)).filter(Boolean);
}

function getRouteMapSelectionState() {
  if (activeRouteMapSelection.type === "segment") {
    const segment = getRouteExplorerSegmentById(activeRouteMapSelection.id);
    if (segment) {
      return {
        type: "segment",
        config: segment,
        stopIds: new Set(segment.stopIds || []),
        segmentIds: new Set([segment.id])
      };
    }
  }

  if (activeRouteMapSelection.type === "stop") {
    const stop = routeExplorerStopMap.get(activeRouteMapSelection.id);
    if (stop) {
      return {
        type: "stop",
        config: stop,
        stopIds: new Set([stop.id]),
        segmentIds: new Set(stop.segmentIds || [])
      };
    }
  }

  const fallbackView =
    getRouteExplorerViewById(activeRouteMapSelection.id) ||
    getRouteExplorerViewById(routeExplorerDefaultSelectionId) ||
    routeExplorerViewDefinitions[0];

  activeRouteMapSelection = { type: "view", id: fallbackView.id };

  return {
    type: "view",
    config: fallbackView,
    stopIds: new Set(fallbackView.stopIds || []),
    segmentIds: new Set(fallbackView.segmentIds || [])
  };
}

function getRouteMapGeoJsonData() {
  if (getRouteMapGeoJsonData.cache) {
    return getRouteMapGeoJsonData.cache;
  }

  const fullCoordinates = getRouteMapFullCoordinates();
  const segments = routeExplorerPathDefinitions
    .map((segment) => {
      const coordinates = (segment.stopIds || [])
        .map((stopId) => getRouteStopLngLat(stopId))
        .filter(Boolean);
      if (coordinates.length < 2) {
        return null;
      }

      return {
        type: "Feature",
        properties: { id: segment.id },
        geometry: {
          type: "LineString",
          coordinates
        }
      };
    })
    .filter(Boolean);

  const backdrop = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { outerRadius: 92, innerRadius: 48 },
        geometry: { type: "Point", coordinates: [135.61, 34.84] }
      },
      {
        type: "Feature",
        properties: { outerRadius: 74, innerRadius: 38 },
        geometry: { type: "Point", coordinates: [139.03, 35.24] }
      },
      {
        type: "Feature",
        properties: { outerRadius: 88, innerRadius: 44 },
        geometry: { type: "Point", coordinates: [138.76, 35.5] }
      },
      {
        type: "Feature",
        properties: { outerRadius: 96, innerRadius: 50 },
        geometry: { type: "Point", coordinates: [139.7, 35.66] }
      }
    ]
  };

  getRouteMapGeoJsonData.cache = {
    backdrop,
    full: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { id: "route-overview" },
          geometry: {
            type: "LineString",
            coordinates: fullCoordinates
          }
        }
      ]
    },
    segments: {
      type: "FeatureCollection",
      features: segments
    }
  };

  return getRouteMapGeoJsonData.cache;
}

function getRouteMapPmtilesSourceUrl() {
  return `pmtiles://${resolveRouteMapAssetUrl(routeMapPmtilesDataUrl)}`;
}

function buildRouteMapBaseStyle() {
  const basemapRuntime = window.basemaps;
  if (!basemapRuntime?.namedFlavor || !basemapRuntime?.layers) {
    throw new Error("Protomaps basemap runtime is unavailable.");
  }

  const flavorName = getRouteMapBaseFlavorName();

  return {
    version: 8,
    sources: {
      protomaps: {
        type: "vector",
        attribution: routeMapProtomapsAttribution,
        url: getRouteMapPmtilesSourceUrl()
      }
    },
    layers: basemapRuntime.layers("protomaps", basemapRuntime.namedFlavor(flavorName), {
      lang: getRouteMapBaseLanguage()
    }),
    glyphs: routeMapProtomapsGlyphsUrl,
    sprite: `${routeMapProtomapsSpriteBaseUrl}/${flavorName}`
  };
}

function getRouteMapLayerInsertBeforeId(map) {
  const layers = map?.getStyle?.()?.layers;
  if (!Array.isArray(layers)) {
    return null;
  }

  const firstLabelLayer = layers.find(
    (layer) =>
      layer?.type === "symbol" &&
      (layer.layout?.["text-field"] || layer.layout?.["icon-image"])
  );

  return firstLabelLayer?.id || null;
}

function buildRouteMapOverlayLayers(theme = getCurrentTheme()) {
  const palette = getRouteMapPalette(theme);

  return [
    {
      id: "route-map-backdrop-outer",
      type: "circle",
      source: "route-map-backdrop",
      paint: {
        "circle-color": palette.glowOuter,
        "circle-opacity": 1,
        "circle-radius": ["get", "outerRadius"],
        "circle-blur": 0.52
      }
    },
    {
      id: "route-map-backdrop-inner",
      type: "circle",
      source: "route-map-backdrop",
      paint: {
        "circle-color": palette.glowInner,
        "circle-opacity": 1,
        "circle-radius": ["get", "innerRadius"],
        "circle-blur": 0.42
      }
    },
    {
      id: "route-map-corridor",
      type: "line",
      source: "route-map-full",
      layout: {
        "line-cap": "round",
        "line-join": "round"
      },
      paint: {
        "line-color": palette.corridor,
        "line-opacity": 1,
        "line-width": ["interpolate", ["linear"], ["zoom"], 4.3, 26, 7.3, 62]
      }
    },
    {
      id: "route-map-shadow",
      type: "line",
      source: "route-map-full",
      layout: {
        "line-cap": "round",
        "line-join": "round"
      },
      paint: {
        "line-color": palette.shadow,
        "line-opacity": 0.9,
        "line-width": ["interpolate", ["linear"], ["zoom"], 4.3, 12, 7.3, 24]
      }
    },
    {
      id: "route-map-full-gradient",
      type: "line",
      source: "route-map-full",
      layout: {
        "line-cap": "round",
        "line-join": "round"
      },
      paint: {
        "line-gradient": getRouteMapGradientExpression(theme),
        "line-width": ["interpolate", ["linear"], ["zoom"], 4.3, 5.5, 7.3, 9.5]
      }
    },
    {
      id: "route-map-segments-active",
      type: "line",
      source: "route-map-segments",
      layout: {
        "line-cap": "round",
        "line-join": "round"
      },
      paint: {
        "line-color": palette.segmentActive,
        "line-opacity": 0.92,
        "line-width": ["interpolate", ["linear"], ["zoom"], 4.3, 4.5, 7.3, 6.8]
      }
    },
    {
      id: "route-map-segment-selected",
      type: "line",
      source: "route-map-segments",
      filter: ["==", ["get", "id"], "__none__"],
      layout: {
        "line-cap": "round",
        "line-join": "round"
      },
      paint: {
        "line-color": palette.segmentSelected,
        "line-opacity": 1,
        "line-width": ["interpolate", ["linear"], ["zoom"], 4.3, 7.2, 7.3, 10.8]
      }
    },
    {
      id: "route-map-segments-hit",
      type: "line",
      source: "route-map-segments",
      layout: {
        "line-cap": "round",
        "line-join": "round"
      },
      paint: {
        "line-color": "#000000",
        "line-opacity": 0,
        "line-width": ["interpolate", ["linear"], ["zoom"], 4.3, 18, 7.3, 28]
      }
    }
  ];
}

function ensureRouteMapOverlayStyle(map) {
  if (!map) {
    return;
  }

  const geoJsonData = getRouteMapGeoJsonData();
  const sourceDefinitions = {
    "route-map-backdrop": {
      type: "geojson",
      data: geoJsonData.backdrop
    },
    "route-map-full": {
      type: "geojson",
      data: geoJsonData.full,
      lineMetrics: true
    },
    "route-map-segments": {
      type: "geojson",
      data: geoJsonData.segments
    }
  };

  Object.entries(sourceDefinitions).forEach(([sourceId, sourceDefinition]) => {
    if (!map.getSource(sourceId)) {
      map.addSource(sourceId, sourceDefinition);
    }
  });

  const beforeLayerId = getRouteMapLayerInsertBeforeId(map) || undefined;
  buildRouteMapOverlayLayers().forEach((layerDefinition) => {
    if (!map.getLayer(layerDefinition.id)) {
      map.addLayer(layerDefinition, beforeLayerId);
    }
  });
}

function ensureRouteMapAttributionControl(map) {
  if (!map || map.__routeMapAttributionBound || !window.maplibregl?.AttributionControl) {
    return;
  }

  map.addControl(new window.maplibregl.AttributionControl({ compact: true }), "bottom-right");
  map.__routeMapAttributionBound = true;
  window.requestAnimationFrame(() => {
    const attributionNode = map.getContainer?.()?.querySelector?.(".maplibregl-ctrl-attrib");
    attributionNode?.classList.add("maplibregl-compact");
  });
}

function waitForRouteMapLoad(map, timeoutMs = 20000) {
  return new Promise((resolve, reject) => {
    if (!map) {
      reject(new Error("Route map instance is missing."));
      return;
    }

    const hasStyleLayers = () => {
      try {
        const style = map.getStyle?.();
        return Array.isArray(style?.layers) && style.layers.length > 0;
      } catch (error) {
        return false;
      }
    };

    const hasSizedCanvas = () => {
      const canvas = map.getCanvas?.();
      return Boolean(canvas && canvas.width > 0 && canvas.height > 0);
    };

    const isReady = () => hasStyleLayers() && hasSizedCanvas();

    try {
      map.resize?.();
    } catch (error) {
      // Ignore early resize failures and keep waiting for the style lifecycle.
    }

    if (isReady()) {
      resolve();
      return;
    }

    let settled = false;
    let timeoutId = 0;
    let lastError = null;

    const cleanup = () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      map.off?.("style.load", handleLoad);
      map.off?.("load", handleLoad);
      map.off?.("styledata", handleLoad);
      map.off?.("error", handleError);
    };

    const settle = (callback) => {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      callback();
    };

    const handleLoad = () => {
      if (!hasStyleLayers()) {
        return;
      }

      window.requestAnimationFrame(() => {
        try {
          map.resize?.();
        } catch (error) {
          // Ignore late resize failures and continue resolving from the parsed style.
        }

        if (isReady() || hasStyleLayers()) {
          settle(() => resolve());
        }
      });
    };

    const handleError = (event) => {
      const cause = event?.error;
      lastError = cause instanceof Error ? cause : new Error("Route map style failed to load.");
    };

    timeoutId = window.setTimeout(() => {
      try {
        map.resize?.();
      } catch (error) {
        // Ignore timeout-time resize failures and resolve from the parsed style when possible.
      }

      if (isReady() || hasStyleLayers()) {
        settle(() => resolve());
        return;
      }

      settle(() =>
        reject(lastError instanceof Error ? lastError : new Error("Route map initialization timed out."))
      );
    }, timeoutMs);

    map.once("style.load", handleLoad);
    map.once("load", handleLoad);
    map.on("styledata", handleLoad);
    map.on("error", handleError);
  });
}

function setRouteMapStatus(node, titleContent, bodyContent, state = "loading") {
  if (!node) {
    return;
  }

  node.hidden = false;
  node.dataset.state = state;
  node.innerHTML = `
    <p class="route-map__status-title">${renderLocalizedContent(titleContent)}</p>
    ${
      bodyContent
        ? `<p class="route-map__status-copy">${renderLocalizedContent(bodyContent)}</p>`
        : ""
    }
  `;
  syncLocalizedNodes(node);
}

function clearRouteMapStatus(node) {
  if (!node) {
    return;
  }

  node.hidden = true;
  node.dataset.state = "ready";
}

function renderRouteMapExplorerShell() {
  return `
    <article class="route-reference route-map__detail" data-route-map-detail aria-live="polite"></article>
  `;
}

function renderRouteMapStops(selectionState) {
  const stopsNode = getRouteMapStopsNode();
  if (!stopsNode) {
    return;
  }

  const stopsMarkup = routeExplorerStopDefinitions
    .map((stop) => {
      const isSelected = selectionState.type === "stop" && selectionState.config.id === stop.id;
      const isRelated =
        selectionState.type === "segment" && !isSelected && selectionState.stopIds.has(stop.id);
      const ariaLabelEn = `Show ${stop.title.en} stop details`;
      const ariaLabelJa = `${stop.title.ja}の詳細を表示`;

      return `
        <button
          class="booking-transit__filter route-map__stop-chip ${isSelected ? "is-active" : ""} ${isRelated ? "is-related" : ""}"
          type="button"
          data-route-map-stop="${escapeHtml(stop.id)}"
          aria-pressed="${String(isSelected)}"
          data-aria-label-en="${escapeHtml(ariaLabelEn)}"
          data-aria-label-ja="${escapeHtml(ariaLabelJa)}"
          aria-label="${escapeHtml(getLocalizedText({ en: ariaLabelEn, ja: ariaLabelJa }))}">
          ${renderLocalizedContent(stop.title)}
        </button>
      `;
    })
    .join("");

  setLocalizedMarkupIfChanged(
    stopsNode,
    `
    <p class="route-map__secondary-label">${renderLocalizedContent(routeMapLabels.stops)}</p>
    <div class="route-map__stop-rail">
      ${stopsMarkup}
    </div>
  `
  );
}

function renderRouteMapDaySection(link) {
  const routeDay = getRouteDayReference(link.day);
  const ariaLabel = {
    en: `Jump to ${routeDay.title.en} checklist`,
    ja: `${routeDay.title.ja}のチェックリストへ移動`
  };
  const stopsMarkup = routeDay.stops.length
    ? `
        <div class="route-reference__day-stops">
          ${routeDay.stops
            .map(
              (stop) =>
                `<span class="route-reference__day-stop">${renderLocalizedContent(stop)}</span>`
            )
            .join("")}
        </div>
      `
    : "";

  return `
    <article class="route-reference__day">
      <h5 class="route-reference__day-title">${renderLocalizedContent(routeDay.title)}</h5>
      <p class="route-reference__day-label">${renderLocalizedContent(routeMapLabels.stops)}</p>
      ${stopsMarkup}
      <button
        class="packing-section__action route-reference__day-button route-reference__day-action"
        type="button"
        data-route-map-day="${escapeHtml(routeDay.day)}"
        data-aria-label-en="${escapeHtml(ariaLabel.en)}"
        data-aria-label-ja="${escapeHtml(ariaLabel.ja)}"
        aria-label="${escapeHtml(getLocalizedText(ariaLabel))}">
        ${renderLocalizedContent(routeMapLabels.checklistAction)}
      </button>
    </article>
  `;
}

function renderRouteMapTransitButton(action) {
  const ariaLabel = {
    en: `${action.label.en}`,
    ja: `${action.label.ja}`
  };

  return `
    <button
      class="transit-trigger route-reference__tool"
      type="button"
      data-route-map-transit="${escapeHtml(action.id)}"
      data-aria-label-en="${escapeHtml(ariaLabel.en)}"
      data-aria-label-ja="${escapeHtml(ariaLabel.ja)}"
      aria-label="${escapeHtml(getLocalizedText(ariaLabel))}">
      ${renderLocalizedContent(action.label)}
    </button>
  `;
}

function renderRouteMapDetail(selectionState) {
  const detailNode = getRouteMapDetailNode();
  if (!detailNode) {
    return;
  }

  const config = selectionState.config;
  const visibleDayLinks = getVisibleRouteDayLinks(config.dayLinks || []);
  const badgesMarkup = Array.isArray(config.badges) && config.badges.length
    ? `
        <div class="route-reference__pills">
          ${config.badges
            .map((badge) => `<span class="route-reference__pill">${renderLocalizedContent(badge)}</span>`)
            .join("")}
        </div>
      `
    : "";
  const daysMarkup = visibleDayLinks.length
    ? `
        <section class="route-reference__group">
          <p class="route-reference__group-label">${renderLocalizedContent(routeMapLabels.days)}</p>
          <div class="route-reference__days">
            ${visibleDayLinks.map((link) => renderRouteMapDaySection(link)).join("")}
          </div>
        </section>
      `
    : "";
  const transitActionsMarkup = Array.isArray(config.transitActions) && config.transitActions.length
    ? `
        <section class="route-reference__group">
          <p class="route-reference__group-label">${renderLocalizedContent(routeMapLabels.tools)}</p>
          <div class="route-reference__group-actions">
            ${config.transitActions.map((action) => renderRouteMapTransitButton(action)).join("")}
          </div>
        </section>
      `
    : "";

  setLocalizedMarkupIfChanged(
    detailNode,
    `
    <div class="route-reference__copy">
      <h4 class="route-reference__title">${renderLocalizedContent(config.title)}</h4>
      <p class="route-reference__summary">${renderLocalizedContent(config.summary)}</p>
    </div>
    ${badgesMarkup}
    ${daysMarkup}
    ${transitActionsMarkup}
  `
  );
}

function clearRouteMapMarkers(markers = []) {
  markers.forEach((entry) => {
    entry.marker?.remove();
  });
  return [];
}

function createRouteMapMarkerElement(stop) {
  const element = document.createElement("button");
  element.className = "route-map-marker route-map-marker--preview";
  element.dataset.labelPosition = stop.labelPosition || "ne";
  element.type = "button";
  element.dataset.routeMapStop = stop.id;
  element.setAttribute("aria-pressed", "false");
  element.setAttribute("aria-hidden", "true");
  element.tabIndex = -1;

  const pin = document.createElement("span");
  pin.className = "route-map-marker__pin";
  pin.setAttribute("aria-hidden", "true");

  const dot = document.createElement("span");
  dot.className = "route-map-marker__dot";
  pin.append(dot);

  const labelNode = document.createElement("span");
  labelNode.className = "route-map-marker__label";

  element.append(pin, labelNode);

  return { element, labelNode, stop };
}

function updateRouteMapMarkerElement(entry, selectionState, interactive = routeMapState.ready) {
  if (!entry?.element || !entry.labelNode) {
    return;
  }

  const stop = entry.stop;
  const isActive = selectionState.type === "stop" && selectionState.config.id === stop.id;
  const isRelated =
    selectionState.type === "segment" && !isActive && selectionState.stopIds.has(stop.id);
  const isDimmed = selectionState.type !== "view" && !isActive && !isRelated;
  const markerStateKey = `${root.lang}|${isActive ? 1 : 0}|${isRelated ? 1 : 0}|${isDimmed ? 1 : 0}|${interactive ? 1 : 0}`;

  if (entry.stateKey === markerStateKey) {
    return;
  }

  entry.labelNode.textContent = getLocalizedText(stop.title);

  entry.element.classList.toggle("route-map-marker--interactive", interactive);
  entry.element.classList.toggle("route-map-marker--preview", !interactive);
  entry.element.classList.toggle("is-active", isActive);
  entry.element.classList.toggle("is-related", isRelated);
  entry.element.classList.toggle("is-dimmed", isDimmed);
  entry.stateKey = markerStateKey;

  const ariaLabel = {
    en: `Show ${stop.title.en} stop details`,
    ja: `${stop.title.ja}の詳細を表示`
  };
  entry.element.tabIndex = interactive ? 0 : -1;
  entry.element.setAttribute("aria-hidden", interactive ? "false" : "true");
  entry.element.setAttribute("aria-pressed", String(isActive));
  entry.element.setAttribute("aria-label", getLocalizedText(ariaLabel));
}

function installRouteMapMarkers(map) {
  const registry = routeExplorerStopDefinitions
    .map((stop) => {
      const lngLat = getRouteStopLngLat(stop.id);
      if (!lngLat) {
        return null;
      }

      const entry = createRouteMapMarkerElement(stop);
      const marker = new window.maplibregl.Marker({
        element: entry.element,
        anchor: "center"
      })
        .setLngLat(lngLat)
        .addTo(map);

      return {
        ...entry,
        marker
      };
    })
    .filter(Boolean);

  registry.forEach((entry) => {
    updateRouteMapMarkerElement(entry, getRouteMapSelectionState());
  });

  return registry;
}

function setRouteMapInteractionState(map, interactive = false) {
  if (!map) {
    return;
  }

  const setHandlerEnabled = (handlerName, enabled) => {
    const handler = map[handlerName];
    if (!handler) {
      return;
    }

    if (enabled) {
      handler.enable();
    } else {
      handler.disable();
    }
  };

  setHandlerEnabled("dragPan", interactive);
  setHandlerEnabled("doubleClickZoom", interactive);
  setHandlerEnabled("keyboard", interactive);
  setHandlerEnabled("scrollZoom", interactive && !coarsePointerQuery.matches);

  if (map.touchZoomRotate) {
    if (interactive) {
      map.touchZoomRotate.enable();
      map.touchZoomRotate.disableRotation();
    } else {
      map.touchZoomRotate.disable();
    }
  }

  if (map.boxZoom) {
    map.boxZoom.disable();
  }

  if (map.dragRotate) {
    map.dragRotate.disable();
  }

  if (map.touchPitch) {
    map.touchPitch.disable();
  }

  if (!interactive) {
    map.getCanvas().style.cursor = "";
  }
}

function syncRouteMapMarkers(selectionState) {
  const interactive = getRouteMapDisplayMode() === "interactive";
  const markerStateKey = `${root.lang}|${getRouteMapSelectionSignature(selectionState)}|${interactive ? 1 : 0}`;
  if (routeMapState.markerStateKey === markerStateKey) {
    return;
  }

  routeMapState.markers.forEach((entry) => {
    updateRouteMapMarkerElement(entry, selectionState, interactive);
  });
  routeMapState.markerStateKey = markerStateKey;
}

function applyRouteMapPaintTheme(map) {
  if (!map) {
    return;
  }

  const palette = getRouteMapPalette();
  const themeSetters = [
    ["route-map-backdrop-outer", "circle-color", palette.glowOuter],
    ["route-map-backdrop-inner", "circle-color", palette.glowInner],
    ["route-map-corridor", "line-color", palette.corridor],
    ["route-map-shadow", "line-color", palette.shadow],
    ["route-map-full-gradient", "line-gradient", getRouteMapGradientExpression()],
    ["route-map-segment-selected", "line-color", palette.segmentSelected]
  ];

  themeSetters.forEach(([layerId, property, value]) => {
    setRouteMapPaintPropertyIfChanged(map, layerId, property, value);
  });
}

function syncRouteMapSelectionLayers(map, selectionState) {
  if (!map) {
    return;
  }

  const activeIds = Array.from(selectionState.segmentIds);
  const selectedId = selectionState.type === "segment" ? selectionState.config.id : "__none__";
  const palette = getRouteMapPalette();
  const inactiveOpacity = activeIds.length ? 0.24 : 0.18;
  const selectionLayerKey = `${getCurrentTheme()}|${getRouteMapSelectionSignature(selectionState)}`;

  if (map.__routeMapSelectionLayerKey === selectionLayerKey) {
    return;
  }

  if (map.getLayer("route-map-segments-active")) {
    const lineColor = activeIds.length
      ? ["match", ["get", "id"], activeIds, palette.segmentActive, palette.segmentMuted]
      : palette.segmentMuted;
    const lineOpacity = activeIds.length
      ? ["match", ["get", "id"], activeIds, 0.94, inactiveOpacity]
      : inactiveOpacity;
    const lineWidth = activeIds.length
      ? [
          "interpolate",
          ["linear"],
          ["zoom"],
          4.3,
          ["match", ["get", "id"], activeIds, 4.8, 3.2],
          7.3,
          ["match", ["get", "id"], activeIds, 7.4, 5.2]
        ]
      : ["interpolate", ["linear"], ["zoom"], 4.3, 3.2, 7.3, 5.2];

    setRouteMapPaintPropertyIfChanged(map, "route-map-segments-active", "line-color", lineColor);
    setRouteMapPaintPropertyIfChanged(map, "route-map-segments-active", "line-opacity", lineOpacity);
    setRouteMapPaintPropertyIfChanged(map, "route-map-segments-active", "line-width", lineWidth);
  }

  setRouteMapFilterIfChanged(map, "route-map-segment-selected", ["==", ["get", "id"], selectedId]);
  map.__routeMapSelectionLayerKey = selectionLayerKey;
}

function clearRouteMapPopup() {
  if (routeMapActivePopup) {
    routeMapActivePopup.remove();
    routeMapActivePopup = null;
  }
}

function syncRouteMapPopup(selectionState) {
  clearRouteMapPopup();
}

function focusRouteMapSelection(map, selectionState, { animate = false } = {}) {
  if (!map) {
    return;
  }

  const coordinates = getRouteMapCoordinatesForSelection(selectionState);
  if (!coordinates.length) {
    return;
  }

  const duration = animate ? 520 : 0;

  if (selectionState.type === "stop" && coordinates.length === 1) {
    map.easeTo({
      center: coordinates[0],
      zoom: 6.9,
      duration,
      essential: true
    });
    return;
  }

  const bounds = getRouteMapBoundsFromCoordinates(coordinates);
  if (!bounds) {
    return;
  }

  map.fitBounds(bounds, {
    padding: getRouteMapCameraPadding("interactive"),
    maxZoom: selectionState.type === "segment" ? 7.2 : 6.15,
    duration,
    essential: true
  });
}

function bindRouteMapInteractiveEvents(map) {
  if (!map || map.__routeMapEventsBound) {
    return;
  }

  map.on("mouseenter", "route-map-segments-hit", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "route-map-segments-hit", () => {
    map.getCanvas().style.cursor = "";
  });

  map.on("click", "route-map-segments-hit", (event) => {
    const segmentId = event.features?.[0]?.properties?.id;
    if (!segmentId) {
      return;
    }

    enableRouteMapInteractiveMode();
    const isSameSegment =
      activeRouteMapSelection.type === "segment" && activeRouteMapSelection.id === segmentId;
    activeRouteMapSelection = isSameSegment
      ? { type: "view", id: routeExplorerDefaultSelectionId }
      : { type: "segment", id: segmentId };
    scheduleRouteMapUISync({ updateCamera: true, animateCamera: true });
  });

  map.on("click", (event) => {
    const hitSegments = map.queryRenderedFeatures(event.point, {
      layers: ["route-map-segments-hit"]
    });
    if (hitSegments.length || activeRouteMapSelection.type === "view") {
      return;
    }

    activeRouteMapSelection = { type: "view", id: routeExplorerDefaultSelectionId };
    scheduleRouteMapUISync({ updateCamera: true, animateCamera: true });
  });

  map.__routeMapEventsBound = true;
}

function fitRouteMapOverview(map, mode = "preview") {
  if (!map) {
    return;
  }

  const bounds = getRouteMapBoundsFromCoordinates(getRouteMapFullCoordinates());
  if (!bounds) {
    return;
  }

  map.fitBounds(bounds, {
    padding: getRouteMapCameraPadding(mode),
    maxZoom: getRouteMapDisplayConfig(mode).overviewMaxZoom,
    duration: 0
  });
}

function syncRouteMapRuntime(selectionState, options = {}) {
  const { updateCamera = false, animateCamera = false, resetOverview = false } = options;
  const interactive = getRouteMapDisplayMode() === "interactive";

  syncRouteMapMarkers(selectionState);

  if (!routeMapState.ready || !routeMapState.map) {
    return;
  }

  syncRouteMapSelectionLayers(routeMapState.map, selectionState);
  setRouteMapInteractionState(routeMapState.map, interactive);

  if (!interactive) {
    clearRouteMapPopup();
    if (resetOverview) {
      fitRouteMapOverview(routeMapState.map, "preview");
    }
    return;
  }

  if (updateCamera) {
    focusRouteMapSelection(routeMapState.map, selectionState, { animate: animateCamera });
  } else if (resetOverview && selectionState.type === "view") {
    fitRouteMapOverview(routeMapState.map, "interactive");
  }

  syncRouteMapPopup(selectionState);
}

function resetRouteMapInstance({ markFailed = false } = {}) {
  clearRouteMapPopup();
  routeMapState.markers = clearRouteMapMarkers(routeMapState.markers);
  routeMapState.markerStateKey = "";
  routeMapState.ready = false;
  routeMapState.failed = markFailed;
  routeMapState.styleSignature = "";

  if (routeMapState.map) {
    routeMapState.map.remove();
    routeMapState.map = null;
  }
}

function ensureRouteMapReady() {
  const previewConfig = getRouteMapDisplayConfig("preview");

  if (!routeMapPreviewCanvas) {
    return Promise.resolve(null);
  }

  if (offlineSnapshotMode) {
    routeMapState.failed = true;
    setRouteMapShellState("fallback");
    setRouteMapStatus(
      routeMapPreviewStatusNode,
      routeMapLabels.sharedOfflineTitle,
      routeMapLabels.sharedOfflineBody,
      "error"
    );
    return Promise.resolve(null);
  }

  const nextStyleSignature = getRouteMapStyleSignature();

  if (
    routeMapState.ready &&
    routeMapState.map &&
    routeMapState.styleSignature === nextStyleSignature
  ) {
    return Promise.resolve(routeMapState.map);
  }

  if (
    routeMapState.ready &&
    routeMapState.map &&
    routeMapState.styleSignature !== nextStyleSignature
  ) {
    resetRouteMapInstance();
  }

  if (routeMapState.promise) {
    return routeMapState.promise;
  }

  setRouteMapStatus(routeMapPreviewStatusNode, previewConfig.loadingTitle, previewConfig.loadingBody, "loading");
  setRouteMapShellState("loading");

  routeMapState.promise = (async () => {
    const { maplibregl } = await loadRouteMapLibrary();
    routeMapState.map = new maplibregl.Map({
      container: routeMapPreviewCanvas,
      style: buildRouteMapBaseStyle(),
      ...routeMapBaseOptions
    });

    routeMapState.map.resize();
    await waitForRouteMapLoad(routeMapState.map);

    ensureRouteMapAttributionControl(routeMapState.map);
    ensureRouteMapOverlayStyle(routeMapState.map);
    bindRouteMapInteractiveEvents(routeMapState.map);

    routeMapState.markers = clearRouteMapMarkers(routeMapState.markers);
    routeMapState.markers = installRouteMapMarkers(routeMapState.map);
    routeMapState.ready = true;
    routeMapState.failed = false;
    routeMapState.styleSignature = getRouteMapStyleSignature();
    routeMapState.map.resize();
    applyRouteMapPaintTheme(routeMapState.map);
    setRouteMapInteractionState(routeMapState.map, false);
    syncRouteMapUI({ resetOverview: true });
    clearRouteMapStatus(routeMapPreviewStatusNode);
    setRouteMapShellState("ready");

    return routeMapState.map;
  })()
    .catch((error) => {
      console.error("Route map failed to initialize.", error);
      resetRouteMapInstance({ markFailed: true });
      setRouteMapShellState("fallback");
      setRouteMapStatus(
        routeMapPreviewStatusNode,
        routeMapLabels.sharedFallbackTitle,
        routeMapLabels.sharedFallbackBody,
        "error"
      );
      return null;
    })
    .finally(() => {
      routeMapState.promise = null;
    });

  return routeMapState.promise;
}

function ensureRouteMapPreviewReady() {
  return ensureRouteMapReady();
}

function syncRouteMapUI(options = {}) {
  const { updateCamera = false, animateCamera = false, resetOverview = false } = options;
  const selectionState = getRouteMapSelectionState();

  renderRouteMapStops(selectionState);
  renderRouteMapDetail(selectionState);

  syncRouteMapRuntime(selectionState, { updateCamera, animateCamera, resetOverview });
}

function scheduleRouteMapUISync(options = {}) {
  pendingRouteMapUISyncOptions = {
    updateCamera: pendingRouteMapUISyncOptions.updateCamera || Boolean(options.updateCamera),
    animateCamera: pendingRouteMapUISyncOptions.animateCamera || Boolean(options.animateCamera)
  };

  if (routeMapUISyncFrame) {
    return;
  }

  routeMapUISyncFrame = window.requestAnimationFrame(() => {
    const nextOptions = pendingRouteMapUISyncOptions;
    routeMapUISyncFrame = 0;
    pendingRouteMapUISyncOptions = {
      updateCamera: false,
      animateCamera: false
    };
    syncRouteMapUI(nextOptions);
  });
}

function refreshRouteMapsIfReady(options = {}) {
  if (!routeMapInitialized) {
    return;
  }

  const requiresStyleRefresh =
    routeMapState.ready &&
    routeMapState.map &&
    routeMapState.styleSignature !== getRouteMapStyleSignature();

  if (requiresStyleRefresh) {
    resetRouteMapInstance();
    setRouteMapStatus(
      routeMapPreviewStatusNode,
      routeMapLabels.sharedLoading,
      routeMapLabels.sharedLoadingBody,
      "loading"
    );
    setRouteMapShellState("loading");
  }

  if (!routeMapState.ready || !routeMapState.map) {
    syncRouteMapUI({ resetOverview: true });
    if (!routeMapState.promise && !routeMapState.failed && !offlineSnapshotMode) {
      void ensureRouteMapReady();
    }
    return;
  }

  applyRouteMapPaintTheme(routeMapState.map);
  syncRouteMapUI({
    updateCamera: options.updateCamera && getRouteMapDisplayMode() === "interactive",
    animateCamera: false,
    resetOverview: getRouteMapDisplayMode() !== "interactive"
  });
}

function resizeRouteMapsIfReady() {
  if (!routeMapState.ready || !routeMapState.map) {
    return;
  }

  routeMapState.map.resize();
  if (getRouteMapDisplayMode() === "interactive") {
    focusRouteMapSelection(routeMapState.map, getRouteMapSelectionState(), { animate: false });
    syncRouteMapPopup(getRouteMapSelectionState());
  } else {
    fitRouteMapOverview(routeMapState.map, "preview");
  }
}

function ensureRouteMapInitialized() {
  if (routeMapInitialized || !routeMapExplorerNode) {
    return;
  }

  routeMapExplorerNode.innerHTML = renderRouteMapExplorerShell();
  localizedMarkupCache.set(routeMapExplorerNode, routeMapExplorerNode.innerHTML);
  if (root.lang === "ja") {
    syncLocalizedNodes(routeMapExplorerNode);
  }
  routeMapInitialized = true;
  setRouteMapDisplayState("interactive");
  syncRouteMapUI({ resetOverview: true });
}

function handleRouteMapClick(event) {
  const stopTrigger = event.target.closest("[data-route-map-stop]");
  if (stopTrigger) {
    event.preventDefault();
    enableRouteMapInteractiveMode();
    const stopId = stopTrigger.dataset.routeMapStop || "";
    const isSameStop =
      activeRouteMapSelection.type === "stop" && activeRouteMapSelection.id === stopId;
    activeRouteMapSelection = isSameStop
      ? { type: "view", id: routeExplorerDefaultSelectionId }
      : { type: "stop", id: stopId };
    scheduleRouteMapUISync({ updateCamera: true, animateCamera: true });
    return;
  }

  const dayTrigger = event.target.closest("[data-route-map-day]");
  if (dayTrigger) {
    event.preventDefault();
    const day = Number(dayTrigger.dataset.routeMapDay);
    if (day) {
      void scrollToChecklistDay(day);
    }
    return;
  }

  const transitTrigger = event.target.closest("[data-route-map-transit]");
  if (transitTrigger) {
    event.preventDefault();
    openTransitDetail(transitTrigger.dataset.routeMapTransit || "", transitTrigger);
  }
}

function initRouteSection() {
  const panel = getSectionPanel("route");
  if (!panel) {
    return;
  }

  if (routeMapCard && panel.dataset.routeBound !== "true") {
    routeMapCard.addEventListener("click", handleRouteMapClick);
    panel.dataset.routeBound = "true";
  }

  registerRevealBlocks(panel);
  ensureRouteMapInitialized();

  if (!routeMapState.ready && !routeMapState.failed) {
    window.requestAnimationFrame(() => {
      void ensureRouteMapPreviewReady();
    });
  } else {
    refreshRouteMapsIfReady({ updateCamera: getRouteMapDisplayMode() === "interactive" });
  }
}

function initEssentialsSection() {
  const panel = getSectionPanel("essentials");
  if (!panel) {
    return Promise.resolve();
  }

  registerRevealBlocks(panel);
  syncOfflineToolsUI();
  initializePackingToggles();
  return initializeBookingTransit();
}

function decorateProgressTimeline() {
  progressItems.forEach((item) => {
    if (item.querySelector(".progress-item__body")) {
      return;
    }

    const step = item.querySelector(".progress-item__step");
    const place = item.querySelector(".progress-item__place");
    if (!step || !place) {
      return;
    }

    const body = document.createElement("div");
    body.className = "progress-item__body";

    const text = document.createElement("div");
    text.className = "progress-item__text";
    text.append(step, place);

    const meter = document.createElement("span");
    meter.className = "progress-item__meter";
    meter.setAttribute("aria-hidden", "true");

    const meterFill = document.createElement("span");
    meterFill.className = "progress-item__meter-fill";
    meter.append(meterFill);

    const meta = document.createElement("div");
    meta.className = "progress-item__meta";

    const ratio = document.createElement("span");
    ratio.className = "progress-item__ratio";
    ratio.textContent = "0%";

    const notice = document.createElement("span");
    notice.className = "progress-item__notice";
    notice.hidden = true;

    meta.append(ratio, notice);
    body.append(text, meter, meta);

    item.append(body);
  });
}

function getScrollBehavior() {
  return reducedEffectsEnabled ? "auto" : "smooth";
}

function restartClassOnNextFrame(target, className) {
  if (!target) {
    return;
  }

  const pendingRestart = pendingClassRestarts.get(target);
  if (pendingRestart?.frameId) {
    window.cancelAnimationFrame(pendingRestart.frameId);
  }

  const nextRestart = pendingRestart || { classNames: new Set(), frameId: 0 };
  nextRestart.classNames.add(className);
  nextRestart.frameId = window.requestAnimationFrame(() => {
    pendingClassRestarts.delete(target);
    nextRestart.classNames.forEach((pendingClassName) => {
      target.classList.add(pendingClassName);
    });
  });

  pendingClassRestarts.set(target, nextRestart);
}

function animateCompletion(target) {
  if (!target || aggressivePerformanceMode || reducedEffectsEnabled) {
    return;
  }

  target.classList.remove("is-celebrating", "is-unlocking");
  restartClassOnNextFrame(target, "is-celebrating");
  window.setTimeout(() => {
    target.classList.remove("is-celebrating");
  }, 920);
}

function animateUnlock(target) {
  if (!target || aggressivePerformanceMode || reducedEffectsEnabled) {
    return;
  }

  target.classList.remove("is-unlocking");
  restartClassOnNextFrame(target, "is-unlocking");
  window.setTimeout(() => {
    target.classList.remove("is-unlocking");
  }, 1200);
}

function showSequenceNotice(requiredDay) {
  if (!sequenceNotice) {
    return;
  }

  sequenceNotice.textContent =
    root.lang === "ja"
      ? `${requiredDay}日目を先に完了してから次の行程へ進めます。`
      : `Complete Day ${requiredDay} first, then continue to the next part of the trip.`;

  sequenceNotice.hidden = false;
  sequenceNotice.classList.remove("is-visible");
  if (reducedEffectsEnabled) {
    sequenceNotice.classList.add("is-visible");
  } else {
    restartClassOnNextFrame(sequenceNotice, "is-visible");
  }

  window.clearTimeout(sequenceNoticeTimer);
  sequenceNoticeTimer = window.setTimeout(() => {
    sequenceNotice.classList.remove("is-visible");
    window.setTimeout(() => {
      if (!sequenceNotice.classList.contains("is-visible")) {
        sequenceNotice.hidden = true;
      }
    }, 220);
  }, 2400);
}

function getCurrentProgressDay() {
  return String(currentProgressDay);
}

function getProgressOverviewState() {
  const totalDays = getTrackedDayNumbers().length || 7;
  const completedCount = completedDays.size;
  const activeDay = Math.min(Number(getCurrentProgressDay()) || 1, totalDays);

  return {
    totalDays,
    completedCount,
    activeDay,
    ratio: totalDays ? completedCount / totalDays : 0
  };
}

function updateProgressOverview() {
  const { totalDays, completedCount, activeDay, ratio } = getProgressOverviewState();

  if (progressCurrentDayNode) {
    progressCurrentDayNode.textContent = String(activeDay);
  }

  if (progressTotalDaysNode) {
    progressTotalDaysNode.textContent = String(totalDays);
  }

  if (progressOverviewFill) {
    progressOverviewFill.style.setProperty("--overview-progress", String(ratio));
    progressOverviewFill.parentElement?.style.setProperty("--overview-progress", String(ratio));
  }

  progressOverviewCaptions.forEach((node) => {
    if (node.dataset.language === "ja") {
      node.textContent = `${totalDays}日中${completedCount}日を完了しました`;
    } else {
      node.textContent = `${completedCount} of ${totalDays} full day${totalDays === 1 ? "" : "s"} completed`;
    }
  });
}

function syncOptionalDaysUI() {
  refreshTripNotesIfReady();
  refreshBudgetNotesIfReady();
  refreshBookingTransitIfReady();
  if (routeMapInitialized || initializedSections.has("route")) {
    scheduleRouteMapUISync();
  }
  scheduleDayCardRowHeights();
}

function scheduleDayCardRowHeights() {
  // The equal-height day-card pass was removed. Keep the hook so older callers
  // do not trigger a full grid walk and inline-style write on every resize/update.
}

function syncModalOpenState() {
  const isModalOpen =
    Boolean(resetProgressModal && !resetProgressModal.hidden) ||
    Boolean(transitDetailModal && !transitDetailModal.hidden);

  root.classList.toggle("has-modal-open", isModalOpen);
  [siteHeader, mainContent, siteFooter].forEach((node) => {
    if (node) {
      node.toggleAttribute("inert", isModalOpen);
    }
  });
}

function setTransitModalOpen(isOpen) {
  if (!transitDetailModal) {
    return;
  }

  transitDetailModal.hidden = !isOpen;
  syncModalOpenState();

  if (isOpen) {
    window.requestAnimationFrame(() => {
      transitDetailCloseButtons[0]?.focus();
    });
    return;
  }

  activeTransitDetailId = "";

  if (lastTransitTrigger && document.contains(lastTransitTrigger)) {
    lastTransitTrigger.focus();
  }
}

function setResetModalOpen(isOpen) {
  if (!resetProgressModal) {
    return;
  }

  if (isOpen && transitDetailModal && !transitDetailModal.hidden) {
    setTransitModalOpen(false);
  }

  resetProgressModal.hidden = !isOpen;
  syncModalOpenState();

  if (isOpen) {
    window.requestAnimationFrame(() => {
      resetProgressCancelButton?.focus();
    });
  } else if (lastResetTrigger && document.contains(lastResetTrigger)) {
    lastResetTrigger?.focus();
  }
}

function resetTripProgress() {
  checklistState = {};

  if (initializedSections.has("checklist")) {
    getChecklistInputs().forEach((input) => {
      input.checked = false;
    });
  }

  completedDays = new Set();
  completedHistoryDays = new Set();
  unlockedDays = new Set();
  warningDays = new Set();
  accessibleDay = 1;
  currentProgressDay = 1;
  lastTimelineFocusDay = null;

  storeChecklistState();
  storeDaySet(completedHistoryStorageKey, completedHistoryDays);
  resetBookingTransitState();

  window.clearTimeout(sequenceNoticeTimer);
  if (sequenceNotice) {
    sequenceNotice.hidden = true;
    sequenceNotice.classList.remove("is-visible");
  }

  refreshChecklistProgressState({ syncDayCards: initializedSections.has("checklist") });
  refreshRouteMapsIfReady({ updateCamera: true });
  syncProgressTimeline();
  setActivePanel("checklist");
  setResetModalOpen(false);

  window.requestAnimationFrame(() => {
    void scrollToChecklistDay(1);
  });
}

function scheduleProgressTimelineLayout({ defer = false } = {}) {
  if (!progressTimeline) {
    return;
  }

  if (timelineLayoutFrame) {
    window.cancelAnimationFrame(timelineLayoutFrame);
    timelineLayoutFrame = 0;
  }

  if (timelineLayoutDelayTimer) {
    window.clearTimeout(timelineLayoutDelayTimer);
    timelineLayoutDelayTimer = 0;
  }

  if (timelineLayoutIdleHandle && typeof window.cancelIdleCallback === "function") {
    window.cancelIdleCallback(timelineLayoutIdleHandle);
    timelineLayoutIdleHandle = 0;
  }

  const runLayout = () => {
    timelineLayoutFrame = 0;
    timelineLayoutDelayTimer = 0;
    timelineLayoutIdleHandle = 0;
    updateTimelineSpine();
  };

  if (defer && deferredGeometryWorkPending) {
    if (typeof window.requestIdleCallback === "function") {
      timelineLayoutIdleHandle = window.requestIdleCallback(runLayout, {
        timeout: deferredNonCriticalLayoutTimeoutMs
      });
      return;
    }

    timelineLayoutDelayTimer = window.setTimeout(runLayout, deferredNonCriticalLayoutTimeoutMs);
    return;
  }

  timelineLayoutFrame = window.requestAnimationFrame(runLayout);
}

function updateTimelineSpine() {
  if (!progressTimeline) {
    return;
  }

  const anchorItem =
    progressTimeline.querySelector(".progress-item.is-active") ||
    progressTimeline.querySelector(".progress-item.is-complete:last-of-type") ||
    progressTimeline.querySelector(".progress-item");

  if (!anchorItem) {
    if (lastTimelineSpineFillHeight !== 0) {
      progressTimeline.style.setProperty("--timeline-spine-fill", "0px");
      lastTimelineSpineFillHeight = 0;
    }
    return;
  }

  const rootFontSize = 16;
  const nodeTop = timelineNodeTopRem * rootFontSize;
  const nodeSize = timelineNodeSizeRem * rootFontSize;
  const linkOverlap = timelineLinkOverlapPx;
  const fillStart = nodeTop + nodeSize - linkOverlap;
  const fillEnd = anchorItem.offsetTop + nodeTop + linkOverlap;
  const fillHeight = Math.max(fillEnd - fillStart, 0);

  if (fillHeight === lastTimelineSpineFillHeight) {
    return;
  }

  progressTimeline.style.setProperty("--timeline-spine-fill", `${fillHeight}px`);
  lastTimelineSpineFillHeight = fillHeight;
}

function scrollProgressTimelineToActive(force = false) {
  lastTimelineFocusDay = force ? null : lastTimelineFocusDay;
}

function refreshChecklistProgressState(options = {}) {
  const { syncDayCards = initializedSections.has("checklist") } = options;
  const {
    rawCompleted,
    completedHistory,
    unlockedDays: nextUnlockedDays,
    warningDays: nextWarningDays,
    accessibleDay: nextAccessibleDay,
    currentDay: nextCurrentDay
  } = getJourneyState();

  if (syncDayCards) {
    dayCards.forEach((card) => {
      const progressRatio = getDayCompletionRatio(card);
      const dayKey = card.dataset.day;
      const isComplete = rawCompleted.has(dayKey);
      const isUnavailable = !nextUnlockedDays.has(dayKey);
      const isWarning = nextWarningDays.has(dayKey);
      const isCurrent = dayKey === String(nextCurrentDay);

      card.style.setProperty("--day-progress", String(progressRatio));
      card.setAttribute("data-day-progress", String(Math.round(progressRatio * 100)));
      card.classList.toggle("is-complete", isComplete);
      card.classList.toggle("is-warning-day", isWarning);
      card.classList.toggle("is-current-day", isCurrent && !isComplete);
      card.classList.toggle("is-locked-day", isUnavailable);
      card.setAttribute("aria-disabled", String(isUnavailable));
      getDayInputs(card).forEach((input) => {
        input.disabled = isUnavailable;
      });
    });
  }

  progressItems.forEach((item) => {
    const dayKey = item.dataset.progressItem;
    const day = Number(item.dataset.progressItem);
    const card = dayCardMap.get(dayKey);
    const progressRatio = card ? getDayCompletionRatio(card) : 0;
    const isUnavailable = !nextUnlockedDays.has(dayKey);
    const isComplete = rawCompleted.has(dayKey);
    const isWarning = nextWarningDays.has(dayKey);
    const isActive = dayKey === String(nextCurrentDay) && !isUnavailable;
    const ratioNode = item.querySelector(".progress-item__ratio");
    const noticeNode = item.querySelector(".progress-item__notice");

    item.style.setProperty("--timeline-progress", String(progressRatio));
    item.classList.toggle("is-locked", isUnavailable);
    item.classList.toggle("is-unlocked", !isUnavailable);
    item.classList.toggle("is-complete", !isUnavailable && isComplete);
    item.classList.toggle("is-warning", isWarning);
    item.classList.toggle("is-partial", progressRatio > 0 && progressRatio < 1 && !isWarning);
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-disabled", String(isUnavailable));
    if (isActive) {
      item.setAttribute("aria-current", "step");
    } else {
      item.removeAttribute("aria-current");
    }

    if (ratioNode) {
      ratioNode.textContent = `${Math.round(progressRatio * 100)}%`;
    }

    if (noticeNode) {
      if (isWarning) {
        noticeNode.hidden = false;
        noticeNode.textContent = root.lang === "ja" ? "要確認" : "Needs attention";
      } else if (isUnavailable) {
        noticeNode.hidden = false;
        noticeNode.textContent = root.lang === "ja" ? "次の項目" : "Up next";
      } else {
        noticeNode.hidden = true;
        noticeNode.textContent = "";
      }
    }
  });

  if (!setsMatch(completedHistoryDays, completedHistory)) {
    completedHistoryDays = completedHistory;
    storeDaySet(completedHistoryStorageKey, completedHistoryDays);
  } else {
    completedHistoryDays = completedHistory;
  }

  syncOptionalDaysUI();
  completedDays = rawCompleted;
  unlockedDays = nextUnlockedDays;
  warningDays = nextWarningDays;
  accessibleDay = nextAccessibleDay;
  currentProgressDay = nextCurrentDay;
}

function celebrateCompletedDay(day) {
  animateCompletion(dayCardMap.get(String(day)));
  animateCompletion(progressItemMap.get(String(day)));
}

async function scrollToChecklistDay(day) {
  const targetCard = dayCardMap.get(String(day));
  if (!targetCard) {
    return;
  }

  lockHeaderState(420);
  setActivePanel("checklist");
  await ensureSectionInitialized("checklist");

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      const targetTop =
        targetCard.getBoundingClientRect().top + window.scrollY - reservedHeaderHeight - 24;

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: getScrollBehavior()
      });

      targetCard.classList.remove("is-route-target");
      restartClassOnNextFrame(targetCard, "is-route-target");
      window.setTimeout(() => {
        targetCard.classList.remove("is-route-target");
      }, 1400);
    });
  });
}

function scrollToPanelStart(panelId) {
  const panel = Array.from(contentPanels).find((node) => node.dataset.panel === panelId);
  if (!panel) {
    return;
  }

  const anchor = panel.querySelector(".section-heading") || panel;
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      const targetTop =
        anchor.getBoundingClientRect().top + window.scrollY - reservedHeaderHeight - 20;

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: getScrollBehavior()
      });
    });
  });
}

function setLanguage(language) {
  const nextLanguage = language === "ja" ? "ja" : "en";
  const localizedNodes = document.querySelectorAll("[data-language]");
  const ariaLabelNodes = document.querySelectorAll("[data-aria-label-en][data-aria-label-ja]");
  const altTextNodes = document.querySelectorAll("[data-alt-en][data-alt-ja]");
  const sourceNodes = document.querySelectorAll("[data-src-en][data-src-ja]");

  root.lang = nextLanguage;
  document.title = pageTitles[nextLanguage];

  localizedNodes.forEach((node) => {
    node.hidden = node.dataset.language !== nextLanguage;
  });

  ariaLabelNodes.forEach((node) => {
    node.setAttribute(
      "aria-label",
      nextLanguage === "ja" ? node.dataset.ariaLabelJa : node.dataset.ariaLabelEn
    );
  });

  altTextNodes.forEach((node) => {
    node.setAttribute(
      "alt",
      nextLanguage === "ja" ? node.dataset.altJa : node.dataset.altEn
    );
  });

  sourceNodes.forEach((node) => {
    const nextSource = nextLanguage === "ja" ? node.dataset.srcJa : node.dataset.srcEn;
    const sourceAttribute = node.tagName === "OBJECT" ? "data" : "src";
    if (node.getAttribute(sourceAttribute) !== nextSource) {
      node.setAttribute(sourceAttribute, nextSource);
    }
  });

  if (!("ResizeObserver" in window)) {
    scheduleReservedHeaderHeightSync({ forceReset: false, defer: deferredGeometryWorkPending });
  }

  updateLanguageButtons(nextLanguage);

  storeLanguage(nextLanguage);
  refreshTripNotesIfReady();
  refreshBudgetNotesIfReady();
  refreshBookingTransitIfReady();
  refreshChecklistProgressState();
  syncProgressTimeline();
  refreshRouteMapsIfReady();
  scheduleDayCardRowHeights();
}

function applyTheme(theme, options = {}) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  const { persist = true } = options;

  root.dataset.theme = nextTheme;
  root.style.colorScheme = nextTheme;
  updateThemeButtons(nextTheme);
  updateThemeColorMeta(nextTheme);

  if (persist) {
    storeThemePreference(nextTheme);
  }

  refreshRouteMapsIfReady();
}

function handleLanguageButtonClick(button) {
  lockHeaderState(280);
  preserveScrollPosition(() => {
    setLanguage(button.dataset.setLanguage);
  });
}

function handleThemeButtonClick(button) {
  lockHeaderState(280);
  preserveScrollPosition(() => {
    applyTheme(button.dataset.setTheme);
  });
}

function updateLanguageButtons(language) {
  languageButtons.forEach((button) => {
    const isActive = button.dataset.setLanguage === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function setActivePanel(panelId) {
  let hasMatch = false;

  contentPanels.forEach((panel) => {
    const isActive = panel.dataset.panel === panelId;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
    panel.setAttribute("aria-hidden", String(!isActive));
    panel.toggleAttribute("inert", !isActive);
    hasMatch ||= isActive;
  });

  sectionTabs.forEach((tab) => {
    const isActive = tab.dataset.panelTarget === panelId;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  if (hasMatch) {
    if (initializedSections.has(panelId)) {
      refreshRevealPanel(panelId);
    }

    if (panelId === "checklist" && initializedSections.has("checklist")) {
      void initializeFujiForecast();
    }

    if (panelId === "route") {
      window.requestAnimationFrame(() => {
        resizeRouteMapsIfReady();
      });
    }

    syncProgressTimeline();
    scheduleDayCardRowHeights();
    storeActivePanel(panelId);
  }

  return hasMatch;
}

function setActiveProgressItem(day) {
  if (!progressItems.length) {
    return;
  }

  const maxVisibleDay = getTrackedDayNumbers().length || 7;
  const nextDay = Math.min(Number(day) || 1, maxVisibleDay);

  progressItems.forEach((item) => {
    const isActive =
      item.dataset.progressItem === String(nextDay) && !item.classList.contains("is-locked");
    item.classList.toggle("is-active", isActive);
    if (isActive) {
      item.setAttribute("aria-current", "step");
    } else {
      item.removeAttribute("aria-current");
    }
  });
}

function syncProgressTimeline() {
  if (!dayCards.length) {
    return;
  }

  setActiveProgressItem(getCurrentProgressDay());
  updateProgressOverview();
  scheduleProgressTimelineLayout({ defer: deferredGeometryWorkPending });
}

function registerRevealBlocks(scope = document) {
  const revealBlocks = Array.from(scope.querySelectorAll(revealBlockSelector));

  if (!revealBlocks.length) {
    return;
  }

  revealBlocks.forEach((block, index) => {
    block.classList.add("reveal-block");
    block.style.setProperty("--reveal-delay", `${Math.min(index, 6) * 60}ms`);
  });

  if (reducedEffectsEnabled || !("IntersectionObserver" in window)) {
    revealBlocks.forEach((block) => block.classList.add("is-visible"));
    return;
  }

  ensureRevealObserver();
  revealBlocks.forEach((block) => revealObserver.observe(block));
}

function refreshRevealPanel(panelId) {
  if (!initializedSections.has(panelId)) {
    return;
  }

  const activePanel = getSectionPanel(panelId);
  if (!activePanel) {
    return;
  }

  const panelBlocks = activePanel.querySelectorAll(".reveal-block");
  if (reducedEffectsEnabled) {
    panelBlocks.forEach((block) => block.classList.add("is-visible"));
    return;
  }

  panelBlocks.forEach((block, index) => {
    block.classList.remove("is-visible");
    block.style.setProperty("--reveal-delay", `${Math.min(index, 6) * 70}ms`);
  });

  window.requestAnimationFrame(() => {
    panelBlocks.forEach((block) => {
      block.classList.add("is-visible");
      if (revealObserver) {
        revealObserver.observe(block);
      }
    });
  });
}

function getInitialPanelId() {
  const defaultPanelId =
    contentPanels.find((panel) => panel.classList.contains("is-active"))?.dataset.panel ??
    contentPanels[0]?.dataset.panel ??
    "overview";

  return contentPanels.length === 1 ? defaultPanelId : readStoredActivePanel() || defaultPanelId;
}

function bindTabNavigation() {
  sectionTabs.forEach((tab) => {
    if (tab.dataset.navigationBound === "true") {
      return;
    }

    tab.addEventListener("click", async () => {
      const panelId = tab.dataset.panelTarget;
      if (!panelId) {
        return;
      }

      lockHeaderState(520);
      setActivePanel(panelId);
      await ensureSectionInitialized(panelId);
      scrollToPanelStart(panelId);
    });

    tab.dataset.navigationBound = "true";
  });
}

async function bootApp() {
  syncReducedEffectsMode({ force: true });
  completedHistoryDays = readStoredDaySet(completedHistoryStorageKey);
  checklistState = readStoredChecklistState();
  syncOptionalDaysUI();
  applyTheme(readStoredThemePreference() || getCurrentTheme(), { persist: false });
  const storedLanguage = readStoredLanguage();
  if (storedLanguage === "ja") {
    setLanguage("ja");
  } else {
    root.lang = "en";
    document.title = pageTitles.en;
    updateLanguageButtons("en");
  }

  bootOfflineExperience();

  const siteFooter = document.querySelector(".site-footer");
  const initialPanelId = getInitialPanelId();
  if (initialPanelId === "overview") {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (siteFooter) {
          registerRevealBlocks(siteFooter);
        }

        void ensureSectionInitialized("overview");
      });
    });
  } else {
    setActivePanel(initialPanelId);
    await ensureSectionInitialized(initialPanelId);
    syncProgressTimeline();

    if (siteFooter) {
      registerRevealBlocks(siteFooter);
    }
  }

  scheduleIdleSectionWarmup(initialPanelId);
  window.requestAnimationFrame(() => {
    scheduleDeferredGeometryRelease();
  });

  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      scheduleDayCardRowHeights();
    });
  }
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleLanguageButtonClick(button);
  });
});

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleThemeButtonClick(button);
  });
});

bindTabNavigation();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    void bootApp();
  }, { once: true });
} else {
  void bootApp();
}

if (jumpCurrentDayButton) {
  jumpCurrentDayButton.addEventListener("click", () => {
    void scrollToChecklistDay(getCurrentProgressDay());
  });
}

resetProgressOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    lastResetTrigger = button;
    setResetModalOpen(true);
  });
});

if (resetProgressCancelButton) {
  resetProgressCancelButton.addEventListener("click", () => {
    setResetModalOpen(false);
  });
}

if (resetProgressConfirmButton) {
  resetProgressConfirmButton.addEventListener("click", () => {
    resetTripProgress();
  });
}

backToTopButtons.forEach((button) => {
  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: getScrollBehavior()
    });
  });
});

if (resetProgressModal) {
  resetProgressModal.addEventListener("click", (event) => {
    if (event.target === resetProgressModal) {
      setResetModalOpen(false);
    }
  });
}

transitDetailCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setTransitModalOpen(false);
  });
});

if (transitDetailModal) {
  transitDetailModal.addEventListener("click", (event) => {
    if (event.target === transitDetailModal) {
      setTransitModalOpen(false);
    }
  });
}

[reducedMotionQuery, coarsePointerQuery, compactViewportQuery].forEach((query) => {
  bindMediaQueryChange(query, () => {
    syncReducedEffectsMode({ force: true });
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  if (transitDetailModal && !transitDetailModal.hidden) {
    setTransitModalOpen(false);
    return;
  }

  if (resetProgressModal && !resetProgressModal.hidden) {
    setResetModalOpen(false);
  }
});

function syncHeaderState() {
  const currentScrollY = Math.max(window.scrollY, 0);

  if (!siteHeader) {
    resetHeaderScrollTracking(currentScrollY);
    scrollTicking = false;
    return;
  }

  if (window.performance.now() < headerLockUntil) {
    resetHeaderScrollTracking(currentScrollY);
    return;
  }

  const delta = currentScrollY - lastScrollY;
  if (Math.abs(delta) <= headerScrollDeltaTolerance) {
    lastScrollY = currentScrollY;
    return;
  }

  if (currentScrollY <= headerTopRevealThreshold) {
    setHeaderCondensed(false);
    resetHeaderScrollTracking(currentScrollY);
    return;
  }

  const nextDirection = delta > 0 ? 1 : -1;
  if (headerScrollIntentDirection !== nextDirection) {
    headerScrollIntentDirection = nextDirection;
    headerScrollIntentStartY = currentScrollY;
    lastScrollY = currentScrollY;
    return;
  }

  const intentDistance = Math.abs(currentScrollY - headerScrollIntentStartY);
  const shouldTreatBottomScrollAsIntent =
    nextDirection > 0 &&
    currentScrollY > headerCondenseScrollThreshold &&
    getRemainingScrollDistance(currentScrollY) <= headerScrollIntentThreshold;

  if (intentDistance < headerScrollIntentThreshold && !shouldTreatBottomScrollAsIntent) {
    lastScrollY = currentScrollY;
    return;
  }

  if (nextDirection > 0 && currentScrollY > headerCondenseScrollThreshold) {
    setHeaderCondensed(true);
    resetHeaderScrollTracking(currentScrollY);
    return;
  }

  if (nextDirection < 0) {
    setHeaderCondensed(false);
    resetHeaderScrollTracking(currentScrollY);
    return;
  }

  lastScrollY = currentScrollY;
}

function runScrollEffects() {
  syncHeaderState();
  scrollTicking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (scrollTicking) {
      return;
    }

    scrollTicking = true;
    window.requestAnimationFrame(runScrollEffects);
  },
  { passive: true }
);

if (siteHeader) {
  if ("ResizeObserver" in window) {
    const headerObserver = new window.ResizeObserver((entries) => {
      const nextHeight = getResizeObserverBlockSize(entries[0]);
      applyReservedHeaderHeight(nextHeight, !headerIsCondensed);
    });

    headerObserver.observe(siteHeader);
  } else {
    scheduleReservedHeaderHeightSync({ forceReset: false, defer: true });
  }

  window.addEventListener("resize", () => {
    syncReducedEffectsMode();
    const wasCondensed = headerIsCondensed;
    setHeaderCondensed(false);
    if (!("ResizeObserver" in window)) {
      scheduleReservedHeaderHeightSync({ forceReset: true });
    }
    if (wasCondensed && window.scrollY > 150) {
      setHeaderCondensed(true);
    }
    syncProgressTimeline();
    scheduleDayCardRowHeights();
    resizeRouteMapsIfReady();
    lockHeaderState(220);
  });
}

window.addEventListener("pagehide", flushQueuedStorageWrites);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    flushQueuedStorageWrites();
  }
});
