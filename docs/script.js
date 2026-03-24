const languageButtons = document.querySelectorAll("[data-set-language]");
const themeButtons = document.querySelectorAll("[data-set-theme]");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const sectionTabs = Array.from(document.querySelectorAll("[data-panel-target]"));
const contentPanels = Array.from(document.querySelectorAll("[data-panel]"));
const siteHeader = document.querySelector(".site-header");
const mainContent = document.querySelector("#main-content");
const siteFooter = document.querySelector(".site-footer");
const welcomeOverlay = document.querySelector(".welcome-overlay");
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
const optionalPrompt = document.querySelector("[data-optional-prompt]");
const optionalPromptExpanded = document.querySelector("[data-optional-prompt-expanded]");
const optionalPromptCompact = document.querySelector("[data-optional-prompt-compact]");
const optionalPromptFeedback = document.querySelector("[data-optional-feedback]");
const optionalUnlockButtons = document.querySelectorAll("[data-optional-unlock]");
const optionalSkipButton = document.querySelector("[data-optional-skip]");
const optionalSectionNodes = document.querySelectorAll("[data-optional-section]");
const budgetNotesCard = document.querySelector("[data-budget-notes-card]");
const budgetStatusNode = document.querySelector("[data-budget-status]");
const budgetSummaryNode = document.querySelector("[data-budget-summary]");
const budgetBreakdownNode = document.querySelector("[data-budget-breakdown]");
const budgetSourceMetaNode = document.querySelector("[data-budget-source-meta]");
const budgetSourcesNode = document.querySelector("[data-budget-sources]");
const budgetDaysNode = document.querySelector("[data-budget-days]");
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
const routeMapInteractive = document.querySelector("[data-route-map-interactive]");
const routeMapFiltersNode = document.querySelector("[data-route-map-filters]");
const routeMapStopsNode = document.querySelector("[data-route-map-stops]");
const routeMapExplorerNode = document.querySelector("[data-route-map-explorer]");
const routeMapOpenButtons = Array.from(document.querySelectorAll("[data-route-map-open]"));
const optionalProgressItems = Array.from(
  document.querySelectorAll("[data-progress-item][data-progress-optional='true']")
);
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
const checklistStorageKey = "japan-trip-checklist-state";
const completedHistoryStorageKey = "japan-trip-completed-history";
const optionalDaysUnlockedStorageKey = "japan-trip-optional-days-unlocked";
const activePanelStorageKey = "japan-trip-active-panel";
const bookingTransitStorageKey = "japan-trip-bookings-transit-state";
const packingStorageKey = "japan-trip-packing-state";
const budgetNotesStorageKey = "japan-trip-budget-notes";
const introSeenSessionKey = "japan-trip-intro-seen";
const introExitDurationMs = 180;
const fujiForecastSessionKey = "japan-trip-fuji-forecast";
const queuedStorageWrites = new Map();
const headerReservedHeightFallbackPx = 144;
const timelineNodeTopRem = 1.36;
const timelineNodeSizeRem = 1.42;
const timelineLinkOverlapPx = 1;
const deferredGeometryReleaseDelayMs = 160;
const deferredNonCriticalLayoutTimeoutMs = 700;
const bookingTransitItemsDataUrl = "./assets/data/booking-transit-items.json";
const transitDetailsDataUrl = "./assets/data/transit-details.json";
const offlineSnapshotUrl = "./japan-escape-itinerary-offline.html";
const serviceWorkerUrl = "./service-worker.js";
const offlineBundleVersion = "2026-03-23-offline-v13";
const routeMapLibraryScriptUrl = "./assets/vendor/maplibre/maplibre-gl.js";
const routeMapLibraryStyleUrl = "./assets/vendor/maplibre/maplibre-gl.css";
const routeMapOpenFreeMapStyleUrl = "https://tiles.openfreemap.org/styles/liberty";
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
const budgetSourceUpdatedAt = "2026-03-23";
const budgetAssumptionCopy = {
  en:
    "This estimate now follows the itinerary with reusable route-based areas: a private/local or no-cost Osaka option on Days 1 and 3, a Shijo / Karasuma Kyoto base on Day 2, a Motohakone / Kojiri-side Hakone ryokan on Day 4, a Kawaguchiko station-to-lake base on Days 5-6, and a Shibuya-access Tokyo hotel on Day 7 plus Day 8 only when the optional day is active.",
  ja:
    "この見積りは、旅程に沿った再利用可能な動線ベースの宿泊エリアへ更新しました。1日目と3日目の大阪はローカル・プライベート滞在または宿泊費なし、2日目は四条烏丸の京都拠点、4日目は元箱根・湖尻側の箱根旅館、5日目と6日目は河口湖駅から湖畔の動線に合う拠点、7日目は渋谷アクセス重視の東京ホテルで、8日目の東京2泊目は追加日を有効にした場合だけ反映します。"
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
  { id: "none", label: { en: "No accommodation cost", ja: "宿泊費なし" } }
];
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
  "hakone-practical-ryokan": {
    id: "hakone-practical-ryokan",
    type: "ryokan",
    label: { en: "Hakone loop-side ryokan", ja: "箱根周遊向き旅館" },
    bucket: "booked",
    sourceGroup: "accommodation",
    area: { en: "Motohakone / Kojiri side", ja: "元箱根・湖尻側" },
    property: { en: "YuYu Hakone", ja: "YuYu Hakone" },
    routeReason: {
      en: "This side fits the Day 4 loop better because it is close to the Lake Ashi and ropeway end of the route, and it also makes the next morning's Gotemba-side transfer toward Kawaguchiko more practical than paying for a less relevant Hakone base.",
      ja: "この側は4日目の周遊終盤に合いやすく、芦ノ湖やロープウェイ終点側へ寄せやすいのが利点です。さらに翌朝の御殿場経由で河口湖へ抜ける流れにも、別エリアの旅館より実用的です。"
    },
    cost: { mode: "perGroup", amount: 18000, sourceCostId: "hakone-practical-ryokan" }
  },
  "kawaguchiko-base-hotel": {
    id: "kawaguchiko-base-hotel",
    type: "hotel",
    label: { en: "Kawaguchiko station-lake hotel", ja: "河口湖駅・湖畔動線ホテル" },
    bucket: "booked",
    sourceGroup: "accommodation",
    area: { en: "Kawaguchiko station -> lake corridor", ja: "河口湖駅から湖畔の動線" },
    property: { en: "HaoSTAY", ja: "HAOSTAY" },
    routeReason: {
      en: "This base keeps the Day 5 arrival, Day 6 lake-area wandering, and Day 7 departure practical without paying for a remote resort location that fights the actual bus and station flow.",
      ja: "この拠点なら、5日目の到着、6日目の湖周辺の動き、7日目の東京戻りをまとめやすく、実際のバス・駅動線と離れた遠いリゾート立地へ余計に払わずに済みます。"
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
      en: "Shibuya is the actual focus on Day 7, and this west-side position also keeps west-Tokyo movement cleaner if Day 8 is active. It is a better fit than paying for a generic Tokyo stay in a less relevant district.",
      ja: "7日目の主役が渋谷なので、この西側立地の方が実際の流れに合います。8日目を有効にした場合も西東京方面へ動きやすく、関係の薄いエリアの東京ホテルへ払うより自然です。"
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
      en: "Use this for any private or local stay already arranged. The accommodation cost stays at JPY 0 and the route-based hotel logic does not override it unless you deliberately switch stay type.",
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
      en: "The stay plan is route-based instead of city-generic: a private/local or Minami Osaka option on Days 1 and 3, Shijo / Karasuma for Kyoto East + Day 3 departures, Motohakone / Kojiri for the Hakone loop and Day 5 transfer, Kawaguchiko station-to-lake access on Days 5-6, and west-Shibuya access on Day 7 plus Day 8 only when unlocked.",
      ja: "宿泊計画は、都市名だけでなく実際の動線ベースへ変更しました。1日目と3日目の大阪はローカル・プライベート滞在またはミナミ拠点、2日目は京都東側と3日目出発に合う四条烏丸、4日目は箱根周遊と5日目移動に合う元箱根・湖尻側、5日目と6日目は河口湖駅から湖畔の動線、東京は7日目と解放時だけ8日目の渋谷西側アクセス重視です。"
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
        label: { en: "Hakone ryokan quote", ja: "箱根旅館見積り" },
        url: "https://www.expedia.co.jp/Hakone-Hotels-YuYu-Onsen-Ryokan-Hakone.h104862373.Hotel-Information"
      },
      {
        label: { en: "Kawaguchiko hotel quote", ja: "河口湖ホテル見積り" },
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
      en: "The old model inflated totals by dropping in broad city hotels instead of following the route. The new model stores a reusable stay type plus a route-fit area per day, so private/local stays remain free and paid stays stay tied to the actual logistics.",
      ja: "以前のモデルは、実際の動線ではなく大まかな都市ホテルを当て込んでしまい、合計を膨らませていました。新しいモデルは日ごとに再利用可能な滞在タイプと動線に合うエリアを持つため、ローカル・プライベート滞在は無料のまま、有料宿も実際の移動に結び付けて管理します。"
    },
    links: []
  },
  {
    id: "core-transit",
    title: { en: "Core transit checks", ja: "主要移動の確認先" },
    summary: {
      en: "Day 2 is now a one-way Osaka -> Kyoto move plus Kyoto local transit. Day 7 now defaults to the cheaper direct bus toward Shibuya/Tokyo, while Fuji Excursion stays as a useful rail fallback rather than the base assumption.",
      ja: "2日目は大阪から京都への片道移動と京都市内交通で組み直しました。7日目は渋谷・東京方面への安い直通バスを初期値にし、富士回遊は便利な鉄道代替として残しています。"
    },
    links: [
      {
        label: { en: "Osaka -> Kyoto fare lookup", ja: "大阪 -> 京都の運賃確認" },
        url: "https://www.navitime.co.jp/en/transfer/searchlist?defaultCondition=0&dnvStationCode=00001756&dnvStationName=Kyoto&orvStationCode=00004305&orvStationName=%E6%96%B0%E5%A4%A7%E9%98%AA"
      },
      {
        label: { en: "Kyoto Subway + Bus 1-day ticket", ja: "京都 地下鉄・バス1日券" },
        url: "https://www2.city.kyoto.lg.jp/kotsu/webguide/en/tika/howtoride_tika_3_0.html"
      },
      {
        label: { en: "Shin-Osaka -> Odawara fare", ja: "新大阪 -> 小田原運賃" },
        url: "https://www.navitime.co.jp/en/transfer/searchlist?defaultCondition=0&dnvStationCode=00003742&dnvStationName=%E5%B0%8F%E7%94%B0%E5%8E%9F&orvStationCode=00004305&orvStationName=%E6%96%B0%E5%A4%A7%E9%98%AA"
      },
      { label: { en: "Hakone Freepass", ja: "箱根フリーパス" }, url: "https://www.odakyu.jp/english/passes/hakone/" },
      { label: { en: "Kawaguchiko -> Shibuya bus", ja: "河口湖 -> 渋谷バス" }, url: "https://highway-buses.jp/course/shibuya.php" },
      { label: { en: "Fuji Excursion fallback", ja: "富士回遊の代替確認" }, url: "https://e.fujikyu-railway.jp/fujikaiyuu/" }
    ]
  },
  {
    id: "tickets",
    title: { en: "Tickets + timing", ja: "チケットと時間帯" },
    summary: {
      en: "Kaiyukan still fits its current official rate. Shibuya Sky is now treated more carefully: the budget uses the later-day pricing band because the itinerary is explicitly for a night visit.",
      ja: "海遊館は現在の公式料金で妥当でした。渋谷スカイはより慎重に扱い、旅程が夜景前提のため、予算には午後後半以降の料金帯を使っています。"
    },
    links: [
      { label: { en: "Kaiyukan official tickets", ja: "海遊館公式チケット" }, url: "https://pop.kaiyukan.com/info/admission/" },
      { label: { en: "Shibuya Sky official tickets", ja: "渋谷スカイ公式チケット" }, url: "https://www.shibuya-scramble-square.com/sky/ticket/" },
      { label: { en: "Shibuya Sky price timing guide", ja: "渋谷スカイ料金タイミング案内" }, url: "https://matcha-jp.com/jp/11771" },
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
    optional: false,
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
    optional: false,
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
    optional: false,
    defaultStayId: "relative-stay",
    stayOptions: ["relative-stay", "osaka-compact-hotel", "no-accommodation"],
    title: { en: "Day 3 - Kyoto -> Osaka", ja: "3日目・京都から大阪" },
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
    optional: false,
    defaultStayId: "hakone-practical-ryokan",
    stayOptions: ["hakone-practical-ryokan", "relative-stay", "no-accommodation"],
    title: { en: "Day 4 - Hakone Loop", ja: "4日目・箱根周遊" },
    subtitle: { en: "Shinkansen into Hakone, then the loop and ryokan", ja: "新幹線で入り、箱根周遊のあと旅館へ" },
    items: [
      { label: { en: "Bullet train: Shin-Osaka -> Odawara", ja: "新幹線：新大阪 -> 小田原" }, category: "intercityTransit", bucket: "booked", sourceGroup: "core-transit", cost: { mode: "perPerson", amount: 12320 } },
      { label: { en: "Hakone Freepass", ja: "箱根フリーパス" }, category: "localTransit", bucket: "required", sourceGroup: "hakone-fuji-transit", cost: { mode: "perPerson", amount: 6000 } },
      { label: { en: "Gora / Sounzan", ja: "強羅 / 早雲山" }, category: "localTransit", bucket: "free", sourceGroup: "hakone-fuji-transit", cost: { mode: "none", amount: 0 } },
      { label: { en: "Ropeway", ja: "ロープウェイ" }, category: "localTransit", bucket: "free", sourceGroup: "hakone-fuji-transit", cost: { mode: "none", amount: 0 } },
      { label: { en: "Owakudani", ja: "大涌谷" }, category: "ticketsAdmissions", bucket: "free", sourceGroup: "hakone-fuji-transit", cost: { mode: "none", amount: 0 } },
      { label: { en: "Togendai", ja: "桃源台" }, category: "localTransit", bucket: "free", sourceGroup: "hakone-fuji-transit", cost: { mode: "none", amount: 0 } },
      { label: { en: "Lake Ashi cruise", ja: "芦ノ湖クルーズ" }, category: "localTransit", bucket: "free", sourceGroup: "hakone-fuji-transit", cost: { mode: "none", amount: 0 } },
      { label: { en: "Hakone Shrine / Moto-Hakone", ja: "箱根神社 / 元箱根" }, category: "ticketsAdmissions", bucket: "free", sourceGroup: "hakone-fuji-transit", cost: { mode: "none", amount: 0 } },
      {
        label: { en: "Hakone transfer-day meals", ja: "箱根移動日の食事" },
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
        cost: { mode: "perPair", amount: 1500, range: { lean: 1200, expected: 1500, high: 2000 } }
      }
    ]
  },
  {
    day: 5,
    optional: false,
    defaultStayId: "kawaguchiko-base-hotel",
    stayOptions: ["kawaguchiko-base-hotel", "relative-stay", "no-accommodation"],
    title: { en: "Day 5 - Hakone -> Kawaguchiko", ja: "5日目・箱根 -> 河口湖" },
    subtitle: { en: "Morning onsen, then the Gotemba-side transfer", ja: "朝の温泉のあと、御殿場側経由で河口湖へ" },
    items: [
      { label: { en: "Onsen morning", ja: "朝の温泉" }, category: "ticketsAdmissions", bucket: "free", sourceGroup: "assumptions", cost: { mode: "none", amount: 0 } },
      {
        label: { en: "Bus via Gotemba", ja: "御殿場経由のバス" },
        category: "intercityTransit",
        bucket: "required",
        sourceGroup: "hakone-fuji-transit",
        cost: { mode: "perPerson", amount: 1750, range: { lean: 1750, expected: 1750, high: 2600 } }
      },
      { label: { en: "Lake arrival views", ja: "到着後の湖畔の景色" }, category: "ticketsAdmissions", bucket: "free", sourceGroup: "assumptions", cost: { mode: "none", amount: 0 } },
      { label: { en: "Quiet sunset", ja: "静かな夕景" }, category: "ticketsAdmissions", bucket: "free", sourceGroup: "assumptions", cost: { mode: "none", amount: 0 } },
      {
        label: { en: "Arrival dinner in Kawaguchiko", ja: "河口湖到着後の夕食" },
        category: "meals",
        bucket: "flexible",
        sourceGroup: "meals",
        cost: { mode: "perPerson", amount: 1500, range: { lean: 1200, expected: 1500, high: 2200 } }
      }
    ]
  },
  {
    day: 6,
    optional: false,
    defaultStayId: "kawaguchiko-base-hotel",
    stayOptions: ["kawaguchiko-base-hotel", "relative-stay", "no-accommodation"],
    title: { en: "Day 6 - Fuji Area", ja: "6日目・富士エリア" },
    subtitle: { en: "Weather-flex Fuji day", ja: "天気優先の富士日" },
    items: [
      { label: { en: "Fuji check at dawn", ja: "夜明けの富士チェック" }, category: "ticketsAdmissions", bucket: "free", sourceGroup: "assumptions", cost: { mode: "none", amount: 0 } },
      {
        label: { en: "Fuji-area local movement", ja: "富士エリア内の現地移動" },
        category: "localTransit",
        bucket: "required",
        sourceGroup: "hakone-fuji-transit",
        cost: { mode: "perPerson", amount: 1300, range: { lean: 900, expected: 1300, high: 1900 } }
      },
      { label: { en: "Chureito if clear", ja: "見えるなら忠霊塔" }, category: "localTransit", bucket: "free", sourceGroup: "hakone-fuji-transit", cost: { mode: "none", amount: 0 } },
      { label: { en: "Lake Kawaguchiko", ja: "河口湖" }, category: "ticketsAdmissions", bucket: "free", sourceGroup: "assumptions", cost: { mode: "none", amount: 0 } },
      { label: { en: "Oshino Hakkai", ja: "忍野八海" }, category: "ticketsAdmissions", bucket: "free", sourceGroup: "assumptions", cost: { mode: "none", amount: 0 } },
      {
        label: { en: "Fuji-area day meals", ja: "富士エリア日の食事" },
        category: "meals",
        bucket: "flexible",
        sourceGroup: "meals",
        cost: { mode: "perPerson", amount: 1700, range: { lean: 1400, expected: 1700, high: 2500 } }
      },
      {
        label: { en: "Weather pivot taxi / timing buffer", ja: "天候対応のタクシー / 時間調整バッファ" },
        category: "optionalExtras",
        bucket: "optional",
        sourceGroup: "assumptions",
        cost: { mode: "perPerson", amount: 1200, range: { lean: 800, expected: 1200, high: 2400 } }
      }
    ]
  },
  {
    day: 7,
    optional: false,
    defaultStayId: "tokyo-base-hotel",
    stayOptions: ["tokyo-base-hotel", "relative-stay", "no-accommodation"],
    title: { en: "Day 7 - Tokyo / Shibuya", ja: "7日目・東京 / 渋谷" },
    subtitle: { en: "Cheaper direct bus into Shibuya, then a focused evening there", ja: "安い直通バスで渋谷へ入り、夜の渋谷に集中する日" },
    items: [
      {
        label: { en: "Direct bus to Shibuya / Tokyo", ja: "渋谷・東京への直通バス" },
        category: "intercityTransit",
        bucket: "booked",
        sourceGroup: "core-transit",
        cost: { mode: "perPerson", amount: 2200, range: { lean: 2100, expected: 2200, high: 4130 } }
      },
      { label: { en: "Shibuya local hop", ja: "渋谷周辺の移動" }, category: "localTransit", bucket: "required", sourceGroup: "core-transit", cost: { mode: "perPerson", amount: 220 } },
      { label: { en: "Shibuya Crossing", ja: "渋谷スクランブル交差点" }, category: "ticketsAdmissions", bucket: "free", sourceGroup: "assumptions", cost: { mode: "none", amount: 0 } },
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
    day: 8,
    optional: true,
    defaultStayId: "tokyo-base-hotel",
    stayOptions: ["tokyo-base-hotel", "relative-stay", "no-accommodation"],
    title: { en: "Optional Day 8 - Tokyo", ja: "追加8日目・東京" },
    subtitle: { en: "Tokyo East day with Skytree and a second Tokyo night", ja: "スカイツリー中心の東京東側と2泊目の東京ホテル" },
    items: [
      { label: { en: "Tokyo subway day pass", ja: "東京サブウェイ1日券" }, category: "localTransit", bucket: "required", sourceGroup: "core-transit", cost: { mode: "perPerson", amount: 800, sourceCostId: "tokyo-subway-24h" } },
      {
        label: { en: "Tokyo Skytree", ja: "東京スカイツリー" },
        category: "ticketsAdmissions",
        bucket: "booked",
        sourceGroup: "tickets",
        cost: { mode: "perPerson", amount: 2400, range: { lean: 2100, expected: 2400, high: 2700 } }
      },
      { label: { en: "Tokyo Solamachi", ja: "東京ソラマチ" }, category: "ticketsAdmissions", bucket: "free", sourceGroup: "assumptions", cost: { mode: "none", amount: 0 } },
      { label: { en: "Akihabara", ja: "秋葉原" }, category: "optionalExtras", bucket: "free", sourceGroup: "assumptions", cost: { mode: "none", amount: 0 } },
      {
        label: { en: "Tokyo day meals", ja: "東京日の食事" },
        category: "meals",
        bucket: "flexible",
        sourceGroup: "meals",
        cost: { mode: "perPerson", amount: 1900, range: { lean: 1500, expected: 1900, high: 2800 } }
      }
    ]
  },
  { day: 9, optional: true, title: { en: "Optional Day 9 - Tokyo", ja: "追加9日目・東京" }, subtitle: { en: "Final city day", ja: "最後の都内日" }, items: [
    { label: { en: "Tokyo Imperial Palace", ja: "皇居" }, category: "ticketsAdmissions", bucket: "free", sourceGroup: "assumptions", cost: { mode: "none", amount: 0 } },
    { label: { en: "Shinjuku", ja: "新宿" }, category: "ticketsAdmissions", bucket: "free", sourceGroup: "assumptions", cost: { mode: "none", amount: 0 } },
    {
      label: { en: "Tokyo city hops", ja: "東京市内の移動" },
      category: "localTransit",
      bucket: "required",
      sourceGroup: "core-transit",
      cost: { mode: "perPerson", amount: 330, range: { lean: 260, expected: 330, high: 460 } }
    },
    {
      label: { en: "Final Tokyo meals", ja: "最後の東京での食事" },
      category: "meals",
      bucket: "flexible",
      sourceGroup: "meals",
      cost: { mode: "perPerson", amount: 1500, range: { lean: 1200, expected: 1500, high: 2400 } }
    }
  ] }
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
  ".trip-stats, .progress-card, .content-section .section-heading, .essentials-grid, .day-grid, .notes-grid, [data-optional-section], .route-map, .journey-close, .site-footer__lead, .site-footer__aside, .site-footer__credit";
const initializedSections = new Set();
const sectionInitPromises = new Map();
const sectionInitializers = {
  overview: initOverviewSection,
  checklist: initChecklistSection,
  notes: initNotesSection,
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
    en: "Cached bundle version 2026-03-23. Includes checklist, packing, upgraded budget notes, route preview, and transit details.",
    ja: "キャッシュ版は 2026-03-23。チェックリスト、荷造り、強化した予算メモ、ルート画像、移動詳細を含みます。"
  },
  installHintMeta: {
    en: "If no install button appears, use your browser menu or iPhone/iPad Share sheet to add the guide to the home screen. Snapshot version: 2026-03-23.",
    ja: "追加ボタンが出ない場合は、ブラウザーのメニューや iPhone/iPad の共有メニューからホーム画面へ追加できます。保存版は 2026-03-23 です。"
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
    en: "Adds luggage forwarding, adapter or power-bank refreshes, optional timed bookings, and small Hakone/Fuji top-ups. Hotels, meals, and day-by-day spend still stay out.",
    ja: "荷物配送、変換プラグやモバイルバッテリーの買い足し、任意の時間指定予約、小さな箱根・富士向け追加購入を足します。ホテル代、食事代、毎日の出費は含めません。"
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
      en: "eSIM, small device prep, and backup copies only.",
      ja: "eSIM、小さな端末準備、控えだけを対象にします。"
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
    id: "hakone-fuji-day-kit",
    label: { en: "Hakone + Fuji Day Kit", ja: "箱根と富士の日用キット" },
    meta: {
      en: "Only true extra day-kit purchases are priced by default.",
      ja: "本当に追加購入が必要な日用キットだけを費用化します。"
    }
  }
];
const budgetSectionDefinitionMap = new Map(
  budgetSectionDefinitions.map((section) => [section.id, section])
);
const routeMapLabels = {
  days: { en: "Related days", ja: "関連日程" },
  tools: { en: "Quick tools", ja: "クイック操作" },
  stops: { en: "Major stops", ja: "主要地点" },
  stopTag: { en: "Stop detail", ja: "地点詳細" },
  segmentTag: { en: "Route leg", ja: "区間詳細" },
  sharedLoading: { en: "Loading unified route map...", ja: "統合ルート地図を読み込み中..." },
  sharedFallbackTitle: { en: "Route map unavailable on this device", ja: "この端末ではルート地図を表示できません" },
  sharedFallbackBody: {
    en: "The route order, stop details, day jumps, and saved transit links still work below. Use the Google Maps link if the live map cannot load here.",
    ja: "下のルート順、停留地詳細、日程ジャンプ、保存済み移動リンクはそのまま使えます。この環境でライブ地図が開けない場合は Google マップのリンクを使ってください。"
  },
  popupJump: { en: "Jump to related day", ja: "関連日程へ移動" }
};
const routeExplorerDefaultSelectionId = "overview";
const routeMapInitialView = {
  center: [137.4, 35.1],
  zoom: 4.95
};
const routeMapDisplayDefinitions = {
  preview: {
    loadingTitle: routeMapLabels.sharedLoading,
    loadingBody: {
      en: "The same route map loads once in preview mode, then switches into the richer live view when you open it.",
      ja: "同じルート地図を一度だけ読み込み、最初はプレビューモード、開くと詳しいライブ表示へ切り替えます。"
    },
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
      en: "The Day 2 hop into Kyoto is a clean city-to-city leg before the temple-heavy walking day.",
      ja: "2日目の京都入りは、寺社中心で歩く一日に入る前の分かりやすい都市間移動です。"
    },
    badges: [
      { en: "Day 2", ja: "2日目" },
      { en: "City rail", ja: "近距離鉄道" }
    ],
    notes: [
      {
        en: "Treat this as the east-side temple setup, not a luggage transfer day.",
        ja: "ここは荷物移動ではなく、東側寺社の日へ入るための移動として考えると分かりやすいです。"
      },
      {
        en: "The return to Osaka is a separate leg, so the Kyoto stop stays easy to reason about.",
        ja: "大阪へ戻る動きは別区間に分けているので、京都の日程だけを素直に見やすくしています。"
      }
    ],
    dayLinks: [{ day: 2 }],
    stopIds: ["osaka", "kyoto"]
  },
  {
    id: "kyoto-osaka",
    d: "M238 448 L186 572",
    title: { en: "Kyoto -> Osaka reset", ja: "京都 -> 大阪の戻り" },
    summary: {
      en: "This folds the Kyoto side back into Osaka before the aquarium-side finish and the Day 4 launch.",
      ja: "京都から大阪へ戻して、海遊館側の締めと4日目の出発へつなぐ区間です。"
    },
    badges: [
      { en: "Day 3", ja: "3日目" },
      { en: "Return leg", ja: "戻り区間" }
    ],
    notes: [
      {
        en: "It keeps Arashiyama and the Osaka-side evening in one practical loop.",
        ja: "嵐山と大阪側の夕方を、実用的な一つの流れとしてつなげる役目です。"
      },
      {
        en: "Use this leg when you want the Osaka reset separated from the Kyoto temple day.",
        ja: "京都の寺社日と分けて、大阪へ戻る動きだけを見たいときに使いやすい区間です。"
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
      en: "A short launch leg that turns the Osaka stay into the Day 4 long-distance departure.",
      ja: "大阪滞在から4日目の長距離移動へ切り替える、短い出発区間です。"
    },
    badges: [
      { en: "Day 4", ja: "4日目" },
      { en: "Launch step", ja: "出発準備" }
    ],
    notes: [
      {
        en: "This is mainly a handoff move, so it stays lighter than the actual bullet train segment.",
        ja: "ここは本格的な長距離移動前の引き渡し区間なので、新幹線区間より軽く見ています。"
      },
      {
        en: "Use it when you want the Day 4 departure flow without opening the full Kansai view.",
        ja: "関西全体を開かずに、4日目の出発動線だけ見たいときに便利です。"
      }
    ],
    dayLinks: [{ day: 4 }],
    stopIds: ["osaka", "shin-osaka"]
  },
  {
    id: "shin-osaka-odawara",
    d: "M202 548 L844 336",
    title: { en: "Shin-Osaka -> Odawara", ja: "新大阪 -> 小田原" },
    summary: {
      en: "The longest rail segment in the trip, handled as the clean bullet-train handoff into Hakone.",
      ja: "旅程で最長の鉄道区間で、箱根側へ入るための分かりやすい新幹線移動です。"
    },
    badges: [
      { en: "Day 4", ja: "4日目" },
      { en: "Shinkansen", ja: "新幹線" }
    ],
    notes: [
      {
        en: "Open the saved transit detail when you want the actual train choice and buffer notes.",
        ja: "実際の列車選びや余裕の持たせ方を見たいときは、保存済み移動詳細を開くのが早いです。"
      },
      {
        en: "This leg is intentionally isolated from the Hakone local loop so the long move stays readable.",
        ja: "長距離移動を読みやすくするため、この区間は箱根ローカル周遊とは分けてあります。"
      }
    ],
    dayLinks: [{ day: 4 }],
    transitActions: [
      {
        id: "shin-osaka-odawara",
        label: { en: "Shinkansen detail", ja: "新幹線詳細" }
      }
    ],
    stopIds: ["shin-osaka", "odawara"]
  },
  {
    id: "odawara-hakone",
    d: "M844 336 L824 350",
    title: { en: "Odawara -> Hakone local sequence", ja: "小田原 -> 箱根ローカル" },
    summary: {
      en: "This is the local handoff from the long rail arrival into ropeway, bus, and lake-side flow.",
      ja: "長距離鉄道の到着から、ロープウェイ、バス、湖畔側の流れへ切り替えるローカル区間です。"
    },
    badges: [
      { en: "Day 4", ja: "4日目" },
      { en: "Local handoff", ja: "現地乗り継ぎ" }
    ],
    notes: [
      {
        en: "Use the Hakone local detail if you want the sequence through the loop rather than the geography only.",
        ja: "地理だけでなく周遊の順番を見たいときは、箱根ローカル詳細を開くのが一番早いです。"
      },
      {
        en: "Keeping this segment separate makes the Hakone arrival feel calmer on the map.",
        ja: "この区間を分けておくことで、箱根到着後の流れが地図上でも落ち着いて見えます。"
      }
    ],
    dayLinks: [{ day: 4 }],
    transitActions: [
      {
        id: "hakone-loop",
        label: { en: "Hakone local detail", ja: "箱根ローカル詳細" }
      }
    ],
    stopIds: ["odawara", "hakone"]
  },
  {
    id: "hakone-fuji",
    d: "M824 350 L924 242",
    title: { en: "Hakone -> Kawaguchiko", ja: "箱根 -> 河口湖" },
    summary: {
      en: "This is the transfer-heavy handoff from the ryokan side into the Fuji base via the Gotemba direction.",
      ja: "旅館側から御殿場方面を経て富士側の拠点へ渡す、移動比重の高い区間です。"
    },
    badges: [
      { en: "Day 5", ja: "5日目" },
      { en: "Transfer-heavy", ja: "移動多め" }
    ],
    notes: [
      {
        en: "Treat it as a practical transfer first and a view day second.",
        ja: "この日は景色より先に、まず実用的な移動日として考えると整えやすいです。"
      },
      {
        en: "The transit detail keeps the Gotemba-side fallback options in one place.",
        ja: "移動詳細には、御殿場側での代替ルートもまとめて入れています。"
      }
    ],
    dayLinks: [{ day: 5 }],
    transitActions: [
      {
        id: "hakone-kawaguchiko",
        label: { en: "Hakone -> Kawaguchiko detail", ja: "箱根 -> 河口湖 詳細" }
      }
    ],
    stopIds: ["hakone", "fuji"]
  },
  {
    id: "fuji-tokyo",
    d: "M924 242 L1036 150",
    title: { en: "Kawaguchiko -> Tokyo / Shibuya", ja: "河口湖 -> 東京・渋谷" },
    summary: {
      en: "The final intercity leg exits the Fuji area and lands you in the Tokyo / Shibuya finish.",
      ja: "富士エリアを離れて、東京・渋谷で締めるための最後の都市間移動です。"
    },
    badges: [
      { en: "Day 7", ja: "7日目" },
      { en: "Tokyo arrival", ja: "東京到着" }
    ],
    notes: [
      {
        en: "Use this segment when you want the Tokyo return leg without the Day 6 weather-flex context.",
        ja: "6日目の天気優先行動と切り分けて、東京へ戻る区間だけ見たいときに向いています。"
      },
      {
        en: "The linked transit detail keeps the bus and rail arrival options together.",
        ja: "関連する移動詳細には、バスと鉄道の到着パターンをまとめています。"
      }
    ],
    dayLinks: [{ day: 7 }],
    transitActions: [
      {
        id: "kawaguchiko-tokyo",
        label: { en: "Tokyo return detail", ja: "東京戻り詳細" }
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
      en: "Arrival base for Day 1 and the city reset after Arashiyama before the long move east.",
      ja: "1日目の到着拠点であり、嵐山のあと東へ大きく動く前に戻る街の基点です。"
    },
    badges: [
      { en: "Days 1 + 3", ja: "1日目・3日目" },
      { en: "Base stay", ja: "滞在拠点" }
    ],
    notes: [
      {
        en: "Use this stop for the easiest early-trip rhythm: arrival night first, then a clean return before Day 4.",
        ja: "到着日の動きと、4日目の大移動前の戻り先として使うと前半の流れが整います。"
      },
      {
        en: "The marker covers both the Minami arrival night and the Osaka-side finish after Kyoto west.",
        ja: "この地点は到着日のミナミと、京都西側のあとに大阪へ戻る流れの両方を表しています。"
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
      en: "The Day 2 temple day sits cleanly on the east side before the Osaka return.",
      ja: "2日目は東側中心の寺社日としてまとまり、そのあと大阪へ戻る流れです。"
    },
    badges: [
      { en: "Day 2", ja: "2日目" },
      { en: "East-side day", ja: "東側中心" }
    ],
    notes: [
      {
        en: "This stop represents the full Kyoto day rather than a transfer hub.",
        ja: "ここは乗り換え拠点というより、京都で丸一日動く日を表しています。"
      },
      {
        en: "The route folds back to Osaka afterward instead of carrying luggage onward from Kyoto.",
        ja: "ここから先へ荷物ごと進むのではなく、いったん大阪へ戻る前提です。"
      }
    ],
    dayLinks: [{ day: 2 }],
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
      en: "This is the clean launch point for the longest transfer day into Hakone.",
      ja: "箱根へ向かう最長移動日の、いちばん分かりやすい出発拠点です。"
    },
    badges: [
      { en: "Day 4", ja: "4日目" },
      { en: "Shinkansen pivot", ja: "新幹線起点" }
    ],
    notes: [
      {
        en: "Use this stop when you want to focus on the big Kansai-to-Hakone handoff rather than the local Osaka details.",
        ja: "大阪市内の細かい動きより、関西から箱根への大きな移動に集中したいときの起点です。"
      },
      {
        en: "It connects directly to the saved transit popup for the bullet train segment.",
        ja: "ここからは新幹線区間の移動詳細ポップアップにそのままつなげられます。"
      }
    ],
    dayLinks: [{ day: 4 }],
    transitActions: [
      {
        id: "shin-osaka-odawara",
        label: { en: "Shinkansen detail", ja: "新幹線詳細" }
      }
    ],
    segmentIds: ["osaka-shin-osaka", "shin-osaka-odawara"],
    lngLat: [135.5007, 34.7335],
    labelPosition: "ne",
    x: 16.8,
    y: 76.1
  },
  {
    id: "odawara",
    title: { en: "Odawara", ja: "小田原" },
    summary: {
      en: "Odawara is the gateway handoff from the long rail leg into the Hakone local sequence.",
      ja: "小田原は長距離鉄道から箱根ローカル移動へ切り替える玄関口です。"
    },
    badges: [
      { en: "Day 4", ja: "4日目" },
      { en: "Hakone gateway", ja: "箱根の入口" }
    ],
    notes: [
      {
        en: "This stop is less about sightseeing and more about keeping the arrival handoff calm.",
        ja: "ここは観光地というより、到着後の乗り継ぎを落ち着いて進めるための地点です。"
      },
      {
        en: "Save the next Hakone leg before arrival so you do not need to rebuild it on the platform.",
        ja: "ホームで組み直さなくて済むよう、箱根側の次の移動は先に保存しておくと安心です。"
      }
    ],
    dayLinks: [{ day: 4 }],
    transitActions: [
      {
        id: "hakone-loop",
        label: { en: "Hakone local detail", ja: "箱根ローカル詳細" }
      }
    ],
    segmentIds: ["shin-osaka-odawara", "odawara-hakone"],
    lngLat: [139.1548, 35.2556],
    labelPosition: "nw",
    x: 70.3,
    y: 46.7
  },
  {
    id: "hakone",
    title: { en: "Hakone", ja: "箱根" },
    summary: {
      en: "Hakone spans the ryokan night and the next morning's handoff toward Kawaguchiko.",
      ja: "箱根は旅館泊の夜と、翌朝に河口湖側へ渡す移動の両方にまたがる地点です。"
    },
    badges: [
      { en: "Days 4 + 5", ja: "4日目・5日目" },
      { en: "Ryokan + loop", ja: "旅館＋周遊" }
    ],
    notes: [
      {
        en: "Use this stop to focus on local sequencing first, then the Hakone-to-Fuji handoff second.",
        ja: "まず箱根内の順番を整理し、そのあと富士側への引き渡しを考えると見やすくなります。"
      },
      {
        en: "The area is compact on the preview, so the stop groups the local ropeway, rail, and bus decisions together.",
        ja: "プレビュー上では狭い範囲なので、ロープウェイ、鉄道、バスの判断をまとめて表しています。"
      }
    ],
    dayLinks: [{ day: 4 }, { day: 5 }],
    transitActions: [
      {
        id: "hakone-loop",
        label: { en: "Hakone local detail", ja: "箱根ローカル詳細" }
      },
      {
        id: "hakone-kawaguchiko",
        label: { en: "Hakone -> Kawaguchiko detail", ja: "箱根 -> 河口湖 詳細" }
      }
    ],
    segmentIds: ["odawara-hakone", "hakone-fuji"],
    lngLat: [139.0302, 35.2323],
    labelPosition: "sw",
    x: 68.7,
    y: 48.6
  },
  {
    id: "fuji",
    title: { en: "Kawaguchiko / Fuji area", ja: "河口湖・富士エリア" },
    summary: {
      en: "This single stop groups the Kawaguchiko base, Chureito side, and local Fuji viewpoints.",
      ja: "この地点は河口湖拠点、忠霊塔側、富士周辺の展望地をまとめて表しています。"
    },
    badges: [
      { en: "Days 5-7", ja: "5日目-7日目" },
      { en: "Weather flex", ja: "天気優先" }
    ],
    notes: [
      {
        en: "Use the Day 6 focus when you want the local hops; use the Day 7 focus when you want the Tokyo exit leg.",
        ja: "現地移動を見たいときは6日目の表示、東京への戻りを見たいときは7日目の表示が使いやすいです。"
      },
      {
        en: "This stop intentionally stays broad so the route section does not turn into a dense local transit map.",
        ja: "ルート欄が細かい現地交通図になりすぎないよう、この地点はあえて広めにまとめています。"
      }
    ],
    dayLinks: [{ day: 5 }, { day: 6 }, { day: 7 }],
    transitActions: [
      {
        id: "fuji-local-hops",
        label: { en: "Fuji local detail", ja: "富士エリア詳細" }
      },
      {
        id: "kawaguchiko-tokyo",
        label: { en: "Tokyo return detail", ja: "東京戻り詳細" }
      }
    ],
    segmentIds: ["hakone-fuji", "fuji-tokyo"],
    lngLat: [138.7552, 35.5009],
    labelPosition: "se",
    x: 77,
    y: 33.6
  },
  {
    id: "tokyo",
    title: { en: "Tokyo", ja: "東京" },
    summary: {
      en: "Tokyo is the final city stage for Day 7 and the optional extra days once they are unlocked.",
      ja: "東京は7日目の最終都市であり、解放後は追加日程の舞台にもなります。"
    },
    badges: [
      { en: "Day 7+", ja: "7日目以降" },
      { en: "Shibuya finish", ja: "渋谷で締め" }
    ],
    notes: [
      {
        en: "The preview keeps Tokyo broad on purpose. Use the checklist and transit popups for the detailed arrival steps.",
        ja: "東京はあえて広くまとめています。到着後の細かい動きはチェックリストや移動詳細で確認する想定です。"
      },
      {
        en: "If Days 8 and 9 are unlocked, this same stop becomes the anchor for the extra Tokyo plans.",
        ja: "8日目と9日目を解放すると、この地点が追加の東京プランの基点にもなります。"
      }
    ],
    dayLinks: [{ day: 7 }, { day: 8, optional: true }, { day: 9, optional: true }],
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
    title: { en: "Full trip flow", ja: "旅全体の流れ" },
    summary: {
      en: "Use this for the big picture from Kansai through Hakone and the Fuji side into Tokyo.",
      ja: "関西から箱根、富士側を経て東京へ向かう全体の流れをひと目で確認する表示です。"
    },
    badges: [
      { en: "7 core stages", ja: "7つの主要段階" },
      { en: "Static + interactive", ja: "静的＋操作表示" }
    ],
    notes: [
      {
        en: "Tap any stop to switch from the overall path to a stop-specific context card.",
        ja: "停留地を押すと、全体表示からその地点の詳細カードへ切り替わります。"
      },
      {
        en: "Use the day filters for the transfer-heavy legs so the long moves stay easier to reason about.",
        ja: "移動の多い日は日別フィルターを使うと、長い乗り継ぎの流れを見失いにくくなります。"
      }
    ],
    dayLinks: [{ day: 1 }, { day: 4 }, { day: 7 }],
    stopIds: ["osaka", "kyoto", "shin-osaka", "odawara", "hakone", "fuji", "tokyo"],
    segmentIds: routeExplorerPathDefinitions.map((path) => path.id)
  },
  {
    id: "kansai-start",
    label: { en: "Kansai start", ja: "関西前半" },
    title: { en: "Osaka + Kyoto front half", ja: "大阪・京都の前半" },
    summary: {
      en: "This keeps Days 1 to 3 together before the route stretches into the transfer-heavy eastbound leg.",
      ja: "東へ大きく動く前の1日目から3日目までを、関西側だけでまとめて見られる表示です。"
    },
    badges: [
      { en: "Days 1-3", ja: "1日目-3日目" },
      { en: "City rhythm", ja: "街歩き中心" }
    ],
    notes: [
      {
        en: "Kyoto is shown as a full-day branch rather than a point where you carry luggage onward.",
        ja: "京都は荷物ごと先へ進む地点ではなく、丸一日分の分岐として表しています。"
      },
      {
        en: "Shin-Osaka remains visible because it becomes the clean launch point for Day 4.",
        ja: "新大阪は4日目の出発点になるので、この表示でも残しています。"
      }
    ],
    dayLinks: [{ day: 1 }, { day: 2 }, { day: 3 }],
    stopIds: ["osaka", "kyoto", "shin-osaka"],
    segmentIds: ["osaka-kyoto", "kyoto-osaka", "osaka-shin-osaka"]
  },
  {
    id: "day4-transfer",
    label: { en: "Day 4 transfer", ja: "4日目移動" },
    title: { en: "Shin-Osaka -> Odawara -> Hakone", ja: "新大阪 -> 小田原 -> 箱根" },
    summary: {
      en: "This is the longest travel pivot: bullet train first, then the Hakone local sequence into the ryokan stay.",
      ja: "ここが最長の移動日です。まず新幹線、そのあと箱根ローカルの流れで旅館泊へ入ります。"
    },
    badges: [
      { en: "Day 4", ja: "4日目" },
      { en: "Shinkansen + local", ja: "新幹線＋現地移動" }
    ],
    notes: [
      {
        en: "Use this view when you want the transfer handoff, not the Osaka/Kyoto sightseeing context.",
        ja: "大阪や京都の観光ではなく、乗り継ぎの引き渡しに集中したいときの表示です。"
      },
      {
        en: "The two saved transit popups cover the long rail leg and the Hakone-side local loop separately.",
        ja: "保存済みの移動詳細は、長距離鉄道と箱根側ローカルを分けて見られるようにしています。"
      }
    ],
    dayLinks: [{ day: 4 }],
    transitActions: [
      {
        id: "shin-osaka-odawara",
        label: { en: "Shinkansen detail", ja: "新幹線詳細" }
      },
      {
        id: "hakone-loop",
        label: { en: "Hakone local detail", ja: "箱根ローカル詳細" }
      }
    ],
    stopIds: ["shin-osaka", "odawara", "hakone"],
    segmentIds: ["shin-osaka-odawara", "odawara-hakone"]
  },
  {
    id: "day5-transfer",
    label: { en: "Day 5 handoff", ja: "5日目移動" },
    title: { en: "Hakone -> Kawaguchiko", ja: "箱根 -> 河口湖" },
    summary: {
      en: "This is the cross-over from the Hakone stay into the Fuji-side base through the Gotemba direction.",
      ja: "ここは箱根滞在から、御殿場方面を経て富士側の拠点へ渡す区間です。"
    },
    badges: [
      { en: "Day 5", ja: "5日目" },
      { en: "Transfer heavy", ja: "移動多め" }
    ],
    notes: [
      {
        en: "Treat this as a practical move first and a sightseeing day second.",
        ja: "この日は観光より先に、実用的な移動日として考えると整えやすいです。"
      },
      {
        en: "If timing shifts, the saved transit popup is the quickest way to recall the fallback shape.",
        ja: "時刻がずれたときは、保存済み移動詳細を開くのが代替の形を思い出す最短です。"
      }
    ],
    dayLinks: [{ day: 5 }],
    transitActions: [
      {
        id: "hakone-kawaguchiko",
        label: { en: "Hakone -> Kawaguchiko detail", ja: "箱根 -> 河口湖 詳細" }
      }
    ],
    stopIds: ["hakone", "fuji"],
    segmentIds: ["hakone-fuji"]
  },
  {
    id: "day6-local",
    label: { en: "Day 6 local", ja: "6日目現地" },
    title: { en: "Fuji-area local movement", ja: "富士エリアの現地移動" },
    summary: {
      en: "This focuses on the local Fuji-side hops between Kawaguchiko, viewpoints, and weather-flex stops.",
      ja: "河口湖拠点、展望地、天候優先の立ち寄り先を行き来する現地移動に絞った表示です。"
    },
    badges: [
      { en: "Day 6", ja: "6日目" },
      { en: "Weather flex", ja: "天気優先" }
    ],
    notes: [
      {
        en: "The route preview keeps this as one area on purpose so the map stays readable.",
        ja: "地図を読みやすく保つため、この区間はあえて一つのエリアとしてまとめています。"
      },
      {
        en: "Use the transit popup for the practical hops between Kawaguchiko base, Chureito, and Oshino-side spots.",
        ja: "河口湖拠点、忠霊塔、忍野側の移動は、実用的な現地移動ポップアップで確認する想定です。"
      }
    ],
    dayLinks: [{ day: 6 }],
    transitActions: [
      {
        id: "fuji-local-hops",
        label: { en: "Fuji local detail", ja: "富士エリア詳細" }
      }
    ],
    stopIds: ["fuji"],
    segmentIds: []
  },
  {
    id: "day7-arrival",
    label: { en: "Day 7 arrival", ja: "7日目到着" },
    title: { en: "Kawaguchiko -> Tokyo / Shibuya", ja: "河口湖 -> 東京・渋谷" },
    summary: {
      en: "This is the exit leg from the Fuji side into Tokyo, ending with the Shibuya-only finish.",
      ja: "富士側から東京へ戻り、そのまま渋谷中心で締める区間を見やすくまとめた表示です。"
    },
    badges: [
      { en: "Day 7", ja: "7日目" },
      { en: "Arrival day", ja: "到着日" }
    ],
    notes: [
      {
        en: "Use this when you want the Tokyo return leg separate from the Day 6 local movement.",
        ja: "6日目の現地移動と分けて、東京へ戻る区間だけを見たいときの表示です。"
      },
      {
        en: "The related transit popup keeps the Tokyo-side arrival options in one place.",
        ja: "関連する移動詳細には、東京側の到着パターンをまとめています。"
      }
    ],
    dayLinks: [{ day: 7 }],
    transitActions: [
      {
        id: "kawaguchiko-tokyo",
        label: { en: "Tokyo return detail", ja: "東京戻り詳細" }
      }
    ],
    stopIds: ["fuji", "tokyo"],
    segmentIds: ["fuji-tokyo"]
  },
  {
    id: "tokyo-extra",
    optional: true,
    label: { en: "Tokyo extra", ja: "東京追加" },
    title: { en: "Optional Tokyo extra days", ja: "追加の東京日程" },
    summary: {
      en: "When Days 8 and 9 are unlocked, Tokyo becomes the anchor for the extra Skytree, Akihabara, palace, and Shinjuku plans.",
      ja: "8日目と9日目を解放すると、東京がスカイツリー、秋葉原、皇居、新宿の追加プランの基点になります。"
    },
    badges: [
      { en: "Days 8 + 9", ja: "8日目・9日目" },
      { en: "Optional", ja: "追加" }
    ],
    notes: [
      {
        en: "The main route does not extend farther on the map; the extra days stay inside the Tokyo area.",
        ja: "メインルートがさらに伸びるわけではなく、追加日程は東京エリア内で完結します。"
      },
      {
        en: "Use the Tokyo stop marker or the checklist jump buttons when you want to switch from the map to the day cards.",
        ja: "地図から日程カードへ移りたいときは、東京の停留地か下の該当日ボタンが使えます。"
      }
    ],
    dayLinks: [{ day: 8, optional: true }, { day: 9, optional: true }],
    stopIds: ["tokyo"],
    segmentIds: []
  }
];
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
let optionalDaysUnlocked = false;
let optionalPromptIsCompact = false;
let optionalPromptDeferred = false;
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
let budgetNotesState = getDefaultBudgetNotesState();
let budgetNotesInitialized = false;
let routeMapInitialized = false;
let routeMapLibraryPromise = null;
const routeMapState = createRouteMapState();
let routeMapDisplayMode = "preview";
let routeMapActivePopup = null;
let routeMapActivePopupSelectionKey = "";
let activeRouteMapSelection = { type: "view", id: routeExplorerDefaultSelectionId };
let lastRouteMapTrigger = null;
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
        en: "Forecast unavailable. Use the flexible Day 6 plan after an early Fuji check.",
        ja: "予報を取得できません。朝の富士山確認後に柔軟な6日目プランで動きましょう。"
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
        en: "Forecast unavailable. Use the existing Day 6 plan and decide after an early Fuji check.",
        ja: "予報を取得できません。既存の6日目プランで、朝の富士山確認後に判断しましょう。"
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

  if (reducedEffectsEnabled && root.classList.contains("intro-pending")) {
    finishWelcome();
  }
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
  return getOrderedDayNumbers().filter((day) => optionalDaysUnlocked || day <= 7);
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

function readStoredBoolean(key) {
  try {
    return window.localStorage.getItem(key) === "1";
  } catch (error) {
    return false;
  }
}

function storeBoolean(key, value) {
  try {
    if (value) {
      queueStorageValue(key, "1");
      return;
    }

    queueStorageRemoval(key);
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

function renderBookingTransitItem(item) {
  const state = getBookingTransitItemState(item.id);
  const links = Array.isArray(item.links) && item.links.length
    ? item.links
    : item.action
      ? [{ ...item.action, kind: "primary" }]
      : [];
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
  const linkMarkup = links.length
    ? `
          <div class="booking-item__link-grid">
            ${links
              .map((link) => {
                const tone = link.kind === "secondary" ? "secondary" : "primary";
                return `
                  <a
                    class="booking-item__cta booking-item__cta--${tone} booking-item__cta--stacked"
                    href="${escapeHtml(link.href)}"
                    target="_blank"
                    rel="noopener noreferrer">
                    <span class="booking-item__cta-label">${renderLocalizedContent(link.label)}</span>
                    ${
                      link.note
                        ? `<span class="booking-item__cta-note">${renderLocalizedContent(link.note)}</span>`
                        : ""
                    }
                  </a>
                `;
              })
              .join("")}
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
    const isVisible = itemMatchesBookingTransitFilter(itemConfig, state);
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

function normalizeBudgetLevel(level, fallback = "medium") {
  return level === "low" || level === "medium" || level === "high" ? level : fallback;
}

function normalizeBudgetTravelerCount(value, fallback = budgetDefaultTravelerCount) {
  const parsed = Number.parseInt(String(value), 10);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(Math.max(parsed, budgetTravelerCountMin), budgetTravelerCountMax);
}

function getDefaultBudgetNotesState() {
  return {
    travelers: budgetDefaultTravelerCount,
    includeExtras: true,
    days: {}
  };
}

function getBudgetTravelerCountFromState(state = budgetNotesState) {
  return normalizeBudgetTravelerCount(state?.travelers, budgetDefaultTravelerCount);
}

function getBudgetIncludeExtrasFromState(state = budgetNotesState) {
  return state?.includeExtras !== false;
}

function getBudgetDayEntriesFromState(state = budgetNotesState) {
  const dayEntries = state?.days;
  if (!dayEntries || typeof dayEntries !== "object" || Array.isArray(dayEntries)) {
    return {};
  }

  return dayEntries;
}

function getBudgetConfig(day) {
  return budgetDayConfigMap.get(String(day)) || null;
}

function normalizeBudgetDayEntries(entriesCandidate) {
  if (!entriesCandidate || typeof entriesCandidate !== "object" || Array.isArray(entriesCandidate)) {
    return {};
  }

  return Object.entries(entriesCandidate).reduce((nextState, [day, entry]) => {
    const config = getBudgetConfig(day);
    if (!config || !entry || typeof entry !== "object" || Array.isArray(entry)) {
      return nextState;
    }

    const level = normalizeBudgetLevel(entry.level, config.defaultLevel);
    const note = typeof entry.note === "string" ? entry.note.slice(0, 280) : "";

    if (level !== config.defaultLevel || note.trim()) {
      nextState[String(config.day)] = { level, note };
    }

    return nextState;
  }, {});
}

function readStoredBudgetNotesState() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(budgetNotesStorageKey) || "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return getDefaultBudgetNotesState();
    }

    const usesNewBudgetShape =
      Object.prototype.hasOwnProperty.call(parsed, "days") ||
      Object.prototype.hasOwnProperty.call(parsed, "travelers") ||
      Object.prototype.hasOwnProperty.call(parsed, "includeExtras");

    return {
      travelers: normalizeBudgetTravelerCount(parsed.travelers, budgetDefaultTravelerCount),
      includeExtras: typeof parsed.includeExtras === "boolean" ? parsed.includeExtras : true,
      days: normalizeBudgetDayEntries(usesNewBudgetShape ? parsed.days : parsed)
    };
  } catch (error) {
    return getDefaultBudgetNotesState();
  }
}

function hasBudgetNotesChanges(state = budgetNotesState) {
  return (
    getBudgetTravelerCountFromState(state) !== budgetDefaultTravelerCount ||
    !getBudgetIncludeExtrasFromState(state) ||
    Object.keys(getBudgetDayEntriesFromState(state)).length > 0
  );
}

function storeBudgetNotesState() {
  try {
    if (hasBudgetNotesChanges()) {
      queueStorageValue(
        budgetNotesStorageKey,
        JSON.stringify({
          travelers: getBudgetTravelerCount(),
          includeExtras: shouldIncludeBudgetExtras(),
          days: getBudgetDayEntries()
        })
      );
      return;
    }

    queueStorageRemoval(budgetNotesStorageKey);
  } catch (error) {
    // Ignore storage failures and keep the budget notes usable.
  }
}

function getBudgetTravelerCount() {
  return getBudgetTravelerCountFromState(budgetNotesState);
}

function shouldIncludeBudgetExtras() {
  return getBudgetIncludeExtrasFromState(budgetNotesState);
}

function getBudgetDayEntries() {
  return getBudgetDayEntriesFromState(budgetNotesState);
}

function getBudgetDayState(day) {
  const config = getBudgetConfig(day);
  const storedState = getBudgetDayEntries()[String(day)] || {};

  return {
    level: normalizeBudgetLevel(storedState.level, config?.defaultLevel || "medium"),
    note: typeof storedState.note === "string" ? storedState.note : ""
  };
}

function formatBudgetAmount(amount) {
  const normalizedAmount = Math.max(0, Math.round(Number(amount) || 0));
  return normalizedAmount < 1000
    ? `¥${normalizedAmount}`
    : `¥${Math.round(normalizedAmount / 1000)}k`;
}

function getBudgetRangeCopy(range = [0, 0]) {
  const min = formatBudgetAmount(range[0]);
  const max = formatBudgetAmount(range[1]);

  return {
    en: `Approx. ${min}-${max}`,
    ja: `目安 ${min}-${max}`
  };
}

function getVisibleBudgetDayConfigs() {
  return budgetDayConfigs.filter((config) => !config.optional || areOptionalDaysUnlocked());
}

function getBudgetResetEnabled() {
  return hasBudgetNotesChanges();
}

function getBudgetSharedRoomCount(travelers = getBudgetTravelerCount()) {
  return Math.max(1, Math.ceil(travelers / budgetSharedRoomOccupancy));
}

function resolveBudgetCostByLevel(costValue, level = "medium") {
  if (typeof costValue === "number") {
    return Math.max(Number(costValue) || 0, 0);
  }

  if (!costValue || typeof costValue !== "object" || Array.isArray(costValue)) {
    return 0;
  }

  return Math.max(Number(costValue[level] ?? costValue.medium ?? 0) || 0, 0);
}

function createEmptyBudgetCategoryTotals() {
  return budgetCategoryDefinitions.reduce((totals, category) => {
    totals[category.id] = 0;
    return totals;
  }, {});
}

function addBudgetCategoryTotals(target, source = {}) {
  budgetCategoryDefinitions.forEach((category) => {
    target[category.id] = (target[category.id] || 0) + (Number(source[category.id]) || 0);
  });

  return target;
}

function getBudgetCategoryTotal(categories = {}) {
  return budgetCategoryDefinitions.reduce(
    (total, category) => total + (Number(categories[category.id]) || 0),
    0
  );
}

function getBudgetTripBaseCategories(
  travelers = getBudgetTravelerCount(),
  includeExtras = shouldIncludeBudgetExtras()
) {
  const sourceData = getBudgetEstimateSources();
  const tripBaseCosts = sourceData.tripBaseCosts || {};
  const getSharedBase = (key) => Math.max(Number(tripBaseCosts?.[key]?.shared ?? tripBaseCosts?.[key] ?? 0) || 0, 0);
  const getPerPersonBase = (key) =>
    Math.max(Number(tripBaseCosts?.[key]?.perPerson ?? 0) || 0, 0) * travelers;

  return {
    lodging: getSharedBase("lodging"),
    intercityTransit: getPerPersonBase("intercityTransit"),
    localTransit: getPerPersonBase("localTransit"),
    food: getPerPersonBase("food"),
    attractions: getPerPersonBase("attractions"),
    shoppingBuffer: getPerPersonBase("shoppingBuffer") + getSharedBase("shoppingBuffer"),
    contingency: getPerPersonBase("contingency") + getSharedBase("contingency"),
    optionalExtras: includeExtras
      ? getPerPersonBase("optionalExtras") + getSharedBase("optionalExtras")
      : 0
  };
}

function getBudgetDaySourceProfile(day) {
  return getBudgetEstimateSources().dayProfiles?.[String(day)] || null;
}

function getBudgetDayEstimate(config, options = {}) {
  if (!config) {
    return {
      categories: createEmptyBudgetCategoryTotals(),
      total: 0,
      perPerson: 0,
      roomCount: 0
    };
  }

  const travelers = normalizeBudgetTravelerCount(options.travelers, getBudgetTravelerCount());
  const level = normalizeBudgetLevel(options.level, config.defaultLevel);
  const includeExtras =
    typeof options.includeExtras === "boolean" ? options.includeExtras : shouldIncludeBudgetExtras();
  const costs = getBudgetDaySourceProfile(config.day)?.costs || {};
  const roomCount = resolveBudgetCostByLevel(costs.lodgingShared, level)
    ? getBudgetSharedRoomCount(travelers)
    : 0;
  const categories = {
    lodging: resolveBudgetCostByLevel(costs.lodgingShared, level) * roomCount,
    intercityTransit: resolveBudgetCostByLevel(costs.intercityTransitPerPerson, level) * travelers,
    localTransit: resolveBudgetCostByLevel(costs.localTransitPerPerson, level) * travelers,
    food: resolveBudgetCostByLevel(costs.foodPerPerson, level) * travelers,
    attractions: resolveBudgetCostByLevel(costs.attractionsPerPerson, level) * travelers,
    shoppingBuffer: resolveBudgetCostByLevel(costs.shoppingBufferPerPerson, level) * travelers,
    contingency:
      resolveBudgetCostByLevel(costs.contingencyShared, level) +
      resolveBudgetCostByLevel(costs.contingencyPerPerson, level) * travelers,
    optionalExtras: includeExtras
      ? resolveBudgetCostByLevel(costs.optionalExtrasShared, level) +
        resolveBudgetCostByLevel(costs.optionalExtrasPerPerson, level) * travelers
      : 0
  };
  const total = getBudgetCategoryTotal(categories);

  return {
    categories,
    total,
    perPerson: total / travelers,
    roomCount
  };
}

function calculateBudgetEstimate() {
  const travelers = getBudgetTravelerCount();
  const includeExtras = shouldIncludeBudgetExtras();
  const roomCount = getBudgetSharedRoomCount(travelers);
  const visibleConfigs = getVisibleBudgetDayConfigs();
  const spendCounts = { low: 0, medium: 0, high: 0 };
  const categoryTotals = getBudgetTripBaseCategories(travelers, includeExtras);
  let totalExpected = getBudgetCategoryTotal(categoryTotals);
  let totalLow = getBudgetCategoryTotal(getBudgetTripBaseCategories(travelers, includeExtras));
  let totalHigh = getBudgetCategoryTotal(getBudgetTripBaseCategories(travelers, includeExtras));
  let optionalImpactTotal = 0;
  let optionalImpactDays = 0;

  visibleConfigs.forEach((config) => {
    const state = getBudgetDayState(config.day);
    const expectedEstimate = getBudgetDayEstimate(config, {
      travelers,
      level: state.level,
      includeExtras
    });
    const lowEstimate = getBudgetDayEstimate(config, {
      travelers,
      level: "low",
      includeExtras
    });
    const highEstimate = getBudgetDayEstimate(config, {
      travelers,
      level: "high",
      includeExtras
    });

    spendCounts[state.level] += 1;
    addBudgetCategoryTotals(categoryTotals, expectedEstimate.categories);
    totalExpected += expectedEstimate.total;
    totalLow += lowEstimate.total;
    totalHigh += highEstimate.total;

    if (config.optional) {
      optionalImpactTotal += expectedEstimate.total;
      optionalImpactDays += 1;
    }
  });

  const tripBaseCosts = getBudgetEstimateSources().tripBaseCosts || {};
  const sharedBaseTotal = budgetCategoryDefinitions.reduce((total, category) => {
    return total + (Number(tripBaseCosts?.[category.id]?.shared ?? 0) || 0);
  }, 0);
  const sharedTotal = categoryTotals.lodging + sharedBaseTotal;

  return {
    travelers,
    includeExtras,
    roomCount,
    visibleConfigs,
    spendCounts,
    categoryTotals,
    totalExpected,
    totalLow,
    totalHigh,
    perPersonExpected: totalExpected / travelers,
    perPersonLow: totalLow / travelers,
    perPersonHigh: totalHigh / travelers,
    optionalImpactTotal,
    optionalImpactPerPerson: optionalImpactTotal / travelers,
    optionalImpactDays,
    sharedTotal,
    perPersonVariableTotal: totalExpected - sharedTotal
  };
}

function getBudgetDayTotalCopy(dayEstimate) {
  return {
    en: `${formatBudgetAmount(dayEstimate.total)} total`,
    ja: `合計 ${formatBudgetAmount(dayEstimate.total)}`
  };
}

function getBudgetDayEstimateMetaCopy(dayEstimate, lowEstimate, highEstimate, travelers) {
  const range = `${formatBudgetAmount(lowEstimate.total)}-${formatBudgetAmount(highEstimate.total)}`;
  if (travelers > 1) {
    return {
      en: `${formatBudgetAmount(dayEstimate.perPerson)} each • ${budgetNotesLabels.totalRange.en} ${range}`,
      ja: `1人 ${formatBudgetAmount(dayEstimate.perPerson)} ・ ${budgetNotesLabels.totalRange.ja} ${range}`
    };
  }

  return {
    en: `${budgetNotesLabels.totalRange.en} ${range}`,
    ja: `${budgetNotesLabels.totalRange.ja} ${range}`
  };
}

function renderBudgetSummaryMarkup(estimate = calculateBudgetEstimate()) {
  const totalRangeMeta = {
    en: `${budgetNotesLabels.totalRange.en} ${formatBudgetAmount(estimate.totalLow)}-${formatBudgetAmount(
      estimate.totalHigh
    )} • ${budgetNotesLabels.visibleDays.en}: ${estimate.visibleConfigs.length}`,
    ja: `${budgetNotesLabels.totalRange.ja} ${formatBudgetAmount(estimate.totalLow)}-${formatBudgetAmount(
      estimate.totalHigh
    )} ・ ${budgetNotesLabels.visibleDays.ja}: ${estimate.visibleConfigs.length}日`
  };
  const perPersonMeta = {
    en: `${budgetNotesLabels.totalRange.en} ${formatBudgetAmount(
      estimate.perPersonLow
    )}-${formatBudgetAmount(estimate.perPersonHigh)} • ${estimate.travelers} ${
      estimate.travelers === 1 ? "traveler" : "travelers"
    } / ${estimate.roomCount} ${estimate.roomCount === 1 ? "room" : "rooms"}`,
    ja: `${budgetNotesLabels.totalRange.ja} ${formatBudgetAmount(
      estimate.perPersonLow
    )}-${formatBudgetAmount(estimate.perPersonHigh)} ・ ${estimate.travelers}人 / ${estimate.roomCount}室想定`
  };
  const optionalValueCopy =
    estimate.optionalImpactDays > 0
      ? {
          en: `+${formatBudgetAmount(estimate.optionalImpactTotal)} total`,
          ja: `+${formatBudgetAmount(estimate.optionalImpactTotal)} 合計`
        }
      : budgetNotesLabels.optionalInactive;
  const optionalMetaCopy =
    estimate.optionalImpactDays > 0
      ? {
          en: `+${formatBudgetAmount(estimate.optionalImpactPerPerson)} each • ${budgetNotesLabels.optionalIncludedMeta.en}: ${estimate.optionalImpactDays}`,
          ja: `1人 +${formatBudgetAmount(estimate.optionalImpactPerPerson)} ・ ${budgetNotesLabels.optionalIncludedMeta.ja}: ${estimate.optionalImpactDays}日`
        }
      : budgetNotesLabels.optionalInactiveMeta;
  const sharedMetaCopy = {
    en: `${budgetNotesLabels.individualMeta.en} ${formatBudgetAmount(
      estimate.perPersonVariableTotal
    )} total • ${formatBudgetAmount(estimate.perPersonVariableTotal / estimate.travelers)} each`,
    ja: `${budgetNotesLabels.individualMeta.ja} ${formatBudgetAmount(
      estimate.perPersonVariableTotal
    )} 合計 ・ 1人 ${formatBudgetAmount(estimate.perPersonVariableTotal / estimate.travelers)}`
  };

  return `
    <div class="budget-summary-card budget-summary-card--estimate budget-summary-card--compact">
      <p class="budget-summary-card__label">${renderLocalizedContent(budgetNotesLabels.summaryTotal)}</p>
      <strong class="budget-summary-card__value">${renderLocalizedContent({
        en: `${formatBudgetAmount(estimate.totalExpected)} total`,
        ja: `合計 ${formatBudgetAmount(estimate.totalExpected)}`
      })}</strong>
      <p class="budget-summary-card__meta">${renderLocalizedContent(totalRangeMeta)}</p>
    </div>
    <div class="budget-summary-card budget-summary-card--per-person budget-summary-card--compact">
      <p class="budget-summary-card__label">${renderLocalizedContent(
        budgetNotesLabels.summaryPerPerson
      )}</p>
      <strong class="budget-summary-card__value">${renderLocalizedContent({
        en: `${formatBudgetAmount(estimate.perPersonExpected)} each`,
        ja: `1人 ${formatBudgetAmount(estimate.perPersonExpected)}`
      })}</strong>
      <p class="budget-summary-card__meta">${renderLocalizedContent(perPersonMeta)}</p>
    </div>
    <div class="budget-summary-card budget-summary-card--shared budget-summary-card--compact">
      <p class="budget-summary-card__label">${renderLocalizedContent(
        budgetNotesLabels.summaryShared
      )}</p>
      <strong class="budget-summary-card__value">${renderLocalizedContent({
        en: `${formatBudgetAmount(estimate.sharedTotal)} shared`,
        ja: `共有 ${formatBudgetAmount(estimate.sharedTotal)}`
      })}</strong>
      <p class="budget-summary-card__meta">${renderLocalizedContent(sharedMetaCopy)}</p>
    </div>
    <div class="budget-summary-card budget-summary-card--optional budget-summary-card--compact">
      <p class="budget-summary-card__label">${renderLocalizedContent(
        budgetNotesLabels.summaryOptional
      )}</p>
      <strong class="budget-summary-card__value ${
        estimate.optionalImpactDays > 0 ? "" : "budget-summary-card__value--text"
      }">${renderLocalizedContent(optionalValueCopy)}</strong>
      <p class="budget-summary-card__meta">${renderLocalizedContent(optionalMetaCopy)}</p>
    </div>
  `;
}

function renderBudgetBreakdownMarkup(estimate = calculateBudgetEstimate()) {
  return budgetCategoryDefinitions
    .map((category) => {
      const total = estimate.categoryTotals[category.id] || 0;
      const isOptionalCategory = category.id === "optionalExtras";
      const isOptionalInactive = isOptionalCategory && !estimate.includeExtras;
      const totalCopy = isOptionalInactive ? budgetNotesLabels.optionalInactive : { en: formatBudgetAmount(total), ja: formatBudgetAmount(total) };
      const perPersonMeta =
        category.id === "lodging"
          ? {
              en: `${formatBudgetAmount(total / estimate.travelers)} each • ${estimate.roomCount} ${
                estimate.roomCount === 1 ? "room" : "rooms"
              } assumed`,
              ja: `1人 ${formatBudgetAmount(total / estimate.travelers)} ・ ${estimate.roomCount}室想定`
            }
          : isOptionalInactive
            ? {
                en: "Currently excluded from the estimate",
                ja: "現在は見積もりから除外しています"
              }
            : {
                en: `${formatBudgetAmount(total / estimate.travelers)} each`,
                ja: `1人 ${formatBudgetAmount(total / estimate.travelers)}`
              };

      return `
        <article class="budget-breakdown-card">
          <p class="budget-breakdown-card__label">${renderLocalizedContent(category.label)}</p>
          <strong class="budget-breakdown-card__value ${
            isOptionalInactive ? "budget-breakdown-card__value--text" : ""
          }">${renderLocalizedContent(totalCopy)}</strong>
          <p class="budget-breakdown-card__meta">${renderLocalizedContent(perPersonMeta)}</p>
          <p class="budget-breakdown-card__hint">${renderLocalizedContent(category.meta)}</p>
        </article>
      `;
    })
    .join("");
}

function renderBudgetSourceMetaMarkup(sourceData = getBudgetEstimateSources()) {
  const hasSourceData = Boolean(sourceData?.lastUpdated);
  const fxSummary = sourceData?.fx?.summary || budgetNotesLabels.sourceMetaFallback;
  const fxLink = sourceData?.fx?.sourceUrl
    ? `
        <a
          class="budget-source-card__link"
          href="${escapeHtml(sourceData.fx.sourceUrl)}"
          target="_blank"
          rel="noreferrer noopener">
          ${renderLocalizedContent(sourceData.fx.label || { en: "FX source", ja: "為替出典" })}
        </a>
      `
    : "";

  return `
    <article class="budget-source-meta-card">
      <p class="budget-source-meta-card__label">${renderLocalizedContent(
        budgetNotesLabels.sourceMetaLabel
      )}</p>
      <p class="budget-source-meta-card__body">${renderLocalizedContent(
        hasSourceData ? sourceData.updatedCopy : budgetNotesLabels.sourceMetaFallback
      )}</p>
      ${
        hasSourceData
          ? `<p class="budget-source-meta-card__body">${renderLocalizedContent(
              sourceData.metaCopy
            )}</p>
             <p class="budget-source-meta-card__body">${renderLocalizedContent(fxSummary)}</p>
             <div class="budget-source-card__links">${fxLink}</div>`
          : ""
      }
    </article>
  `;
}

function renderBudgetSourcesMarkup(sourceData = getBudgetEstimateSources()) {
  const sourceGroups = Array.isArray(sourceData?.sourceGroups) ? sourceData.sourceGroups : [];
  if (!sourceGroups.length) {
    return "";
  }

  return sourceGroups
    .map((group) => {
      const links = Array.isArray(group.links) ? group.links : [];
      return `
        <article class="budget-source-card">
          <p class="budget-source-card__label">${renderLocalizedContent(group.label)}</p>
          <p class="budget-source-card__body">${renderLocalizedContent(group.body)}</p>
          <div class="budget-source-card__links">
            ${links
              .map(
                (link) => `
                  <a
                    class="budget-source-card__link"
                    href="${escapeHtml(link.url)}"
                    target="_blank"
                    rel="noreferrer noopener">
                    ${renderLocalizedContent(link.label)}
                  </a>
                `
              )
              .join("")}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderBudgetDayMarkup(config) {
  const state = getBudgetDayState(config.day);
  const noteAriaEn = `Budget note for ${config.title.en}`;
  const noteAriaJa = `${config.title.ja}の予算メモ`;
  const travelers = getBudgetTravelerCount();
  const includeExtras = shouldIncludeBudgetExtras();
  const dayEstimate = getBudgetDayEstimate(config, {
    travelers,
    level: state.level,
    includeExtras
  });
  const lowEstimate = getBudgetDayEstimate(config, {
    travelers,
    level: "low",
    includeExtras
  });
  const highEstimate = getBudgetDayEstimate(config, {
    travelers,
    level: "high",
    includeExtras
  });
  const isOptional = Boolean(config.optional);

  return `
    <article
      class="budget-day"
      data-budget-day="${config.day}"
      data-budget-level-state="${state.level}"
      ${isOptional ? 'data-budget-optional="true"' : ""}>
      <div class="budget-day__header">
        <div class="budget-day__titles">
          <h4 class="budget-day__title">${renderLocalizedContent(config.title)}</h4>
          <p class="budget-day__region">${renderLocalizedContent(config.region)}</p>
        </div>
        <p class="budget-day__range" data-budget-range>${renderLocalizedContent(
          getBudgetDayTotalCopy(dayEstimate)
        )}</p>
      </div>

      <div class="budget-day__tags">
        ${
          isOptional
            ? `<span class="budget-chip budget-chip--optional">${renderLocalizedContent({
                en: "Optional day",
                ja: "追加日"
              })}</span>`
            : ""
        }
        ${config.tags
          .map((tag) => `<span class="budget-chip">${renderLocalizedContent(tag)}</span>`)
          .join("")}
      </div>
      <p class="budget-day__estimate-meta" data-budget-estimate-meta>${renderLocalizedContent(
        getBudgetDayEstimateMetaCopy(dayEstimate, lowEstimate, highEstimate, travelers)
      )}</p>

      <div class="budget-day__body">
        <fieldset class="budget-day__levels">
          <legend class="budget-day__legend">${renderLocalizedContent(
            budgetNotesLabels.spendLegend
          )}</legend>
          ${Object.entries(budgetLevelLabels)
            .map(
              ([level, label]) => `
                <label class="budget-level" data-budget-level-option="${level}">
                  <input
                    class="budget-level__input"
                    type="radio"
                    name="budget-day-${config.day}-level"
                    value="${level}"
                    data-budget-level
                    ${state.level === level ? "checked" : ""}>
                  <span class="budget-level__button">${renderLocalizedContent(label)}</span>
                </label>
              `
            )
            .join("")}
        </fieldset>

        <label class="budget-day__note-field">
          <span class="budget-day__note-label">${renderLocalizedContent(
            budgetNotesLabels.noteLabel
          )}</span>
          <textarea
            class="budget-day__note"
            rows="3"
            maxlength="280"
            data-budget-note
            data-aria-label-en="${escapeHtml(noteAriaEn)}"
            data-aria-label-ja="${escapeHtml(noteAriaJa)}"
            aria-label="${escapeHtml(noteAriaEn)}">${escapeHtml(state.note)}</textarea>
        </label>
      </div>
    </article>
  `;
}

function renderBudgetNotes() {
  if (!budgetNotesCard || !budgetSummaryNode || !budgetBreakdownNode || !budgetDaysNode) {
    return;
  }

  const estimate = calculateBudgetEstimate();
  budgetSummaryNode.innerHTML = renderBudgetSummaryMarkup(estimate);
  budgetBreakdownNode.innerHTML = renderBudgetBreakdownMarkup(estimate);
  if (budgetSourceMetaNode) {
    budgetSourceMetaNode.innerHTML = renderBudgetSourceMetaMarkup();
  }
  if (budgetSourcesNode) {
    budgetSourcesNode.innerHTML = renderBudgetSourcesMarkup();
  }
  budgetDaysNode.innerHTML = budgetDayConfigs.map((config) => renderBudgetDayMarkup(config)).join("");
  syncLocalizedNodes(budgetNotesCard);
}

function syncBudgetControlsUI() {
  if (budgetTravelersInput && budgetTravelersInput.value !== String(getBudgetTravelerCount())) {
    budgetTravelersInput.value = String(getBudgetTravelerCount());
  }

  if (budgetIncludeExtrasInput) {
    budgetIncludeExtrasInput.checked = shouldIncludeBudgetExtras();
  }
}

function syncBudgetDayUI(dayElement) {
  if (!dayElement) {
    return;
  }

  const config = getBudgetConfig(dayElement.dataset.budgetDay);
  if (!config) {
    return;
  }

  const state = getBudgetDayState(config.day);
  const travelers = getBudgetTravelerCount();
  const includeExtras = shouldIncludeBudgetExtras();
  const dayEstimate = getBudgetDayEstimate(config, {
    travelers,
    level: state.level,
    includeExtras
  });
  const lowEstimate = getBudgetDayEstimate(config, {
    travelers,
    level: "low",
    includeExtras
  });
  const highEstimate = getBudgetDayEstimate(config, {
    travelers,
    level: "high",
    includeExtras
  });
  dayElement.hidden = Boolean(config.optional) && !areOptionalDaysUnlocked();
  dayElement.dataset.budgetLevelState = state.level;

  dayElement.querySelectorAll("[data-budget-level]").forEach((input) => {
    input.checked = input.value === state.level;
  });

  const noteField = dayElement.querySelector("[data-budget-note]");
  if (noteField && noteField.value !== state.note) {
    noteField.value = state.note;
  }

  const rangeNode = dayElement.querySelector("[data-budget-range]");
  if (rangeNode) {
    rangeNode.innerHTML = renderLocalizedContent(getBudgetDayTotalCopy(dayEstimate));
    syncLocalizedNodes(rangeNode);
  }

  const estimateMetaNode = dayElement.querySelector("[data-budget-estimate-meta]");
  if (estimateMetaNode) {
    estimateMetaNode.innerHTML = renderLocalizedContent(
      getBudgetDayEstimateMetaCopy(dayEstimate, lowEstimate, highEstimate, travelers)
    );
    syncLocalizedNodes(estimateMetaNode);
  }
}

function syncBudgetNotesUI() {
  if (!budgetNotesCard || !budgetSummaryNode || !budgetBreakdownNode || !budgetDaysNode) {
    return;
  }

  const estimate = calculateBudgetEstimate();
  budgetDaysNode.querySelectorAll("[data-budget-day]").forEach((dayElement) => {
    syncBudgetDayUI(dayElement);
  });

  syncBudgetControlsUI();
  budgetSummaryNode.innerHTML = renderBudgetSummaryMarkup(estimate);
  budgetBreakdownNode.innerHTML = renderBudgetBreakdownMarkup(estimate);
  if (budgetSourceMetaNode) {
    budgetSourceMetaNode.innerHTML = renderBudgetSourceMetaMarkup();
    syncLocalizedNodes(budgetSourceMetaNode);
  }
  if (budgetSourcesNode) {
    budgetSourcesNode.innerHTML = renderBudgetSourcesMarkup();
    syncLocalizedNodes(budgetSourcesNode);
  }
  syncLocalizedNodes(budgetSummaryNode);
  syncLocalizedNodes(budgetBreakdownNode);

  budgetResetButtons.forEach((button) => {
    button.disabled = !getBudgetResetEnabled();
  });
}

function commitBudgetSettings(nextSettings = {}) {
  const nextTravelers = Object.prototype.hasOwnProperty.call(nextSettings, "travelers")
    ? normalizeBudgetTravelerCount(nextSettings.travelers, getBudgetTravelerCount())
    : getBudgetTravelerCount();
  const nextIncludeExtras = Object.prototype.hasOwnProperty.call(nextSettings, "includeExtras")
    ? Boolean(nextSettings.includeExtras)
    : shouldIncludeBudgetExtras();

  budgetNotesState = {
    travelers: nextTravelers,
    includeExtras: nextIncludeExtras,
    days: { ...getBudgetDayEntries() }
  };
  storeBudgetNotesState();
  syncBudgetNotesUI();
}

function commitBudgetDayState(day, nextState) {
  const config = getBudgetConfig(day);
  if (!config) {
    return;
  }

  const level = normalizeBudgetLevel(nextState.level, config.defaultLevel);
  const note = typeof nextState.note === "string" ? nextState.note.slice(0, 280) : "";
  const nextDays = { ...getBudgetDayEntries() };

  if (level === config.defaultLevel && !note.trim()) {
    delete nextDays[String(config.day)];
  } else {
    nextDays[String(config.day)] = { level, note };
  }

  budgetNotesState = {
    travelers: getBudgetTravelerCount(),
    includeExtras: shouldIncludeBudgetExtras(),
    days: nextDays
  };
  storeBudgetNotesState();
  syncBudgetNotesUI();
}

function resetBudgetNotesState() {
  budgetNotesState = getDefaultBudgetNotesState();
  storeBudgetNotesState();
  syncBudgetNotesUI();
}

function bindBudgetNotesUI() {
  if (!budgetNotesCard || !budgetDaysNode) {
    return;
  }

  budgetResetButtons.forEach((button) => {
    if (button.dataset.budgetBound === "true") {
      return;
    }

    button.addEventListener("click", () => {
      resetBudgetNotesState();
    });

    button.dataset.budgetBound = "true";
  });

  if (budgetTravelersInput && budgetTravelersInput.dataset.budgetBound !== "true") {
    const commitTravelerCount = () => {
      const parsedValue = Number.parseInt(budgetTravelersInput.value, 10);
      if (Number.isNaN(parsedValue)) {
        syncBudgetControlsUI();
        return;
      }

      commitBudgetSettings({ travelers: parsedValue });
    };

    budgetTravelersInput.addEventListener("input", commitTravelerCount);
    budgetTravelersInput.addEventListener("blur", () => {
      syncBudgetControlsUI();
    });
    budgetTravelersInput.dataset.budgetBound = "true";
  }

  if (budgetIncludeExtrasInput && budgetIncludeExtrasInput.dataset.budgetBound !== "true") {
    budgetIncludeExtrasInput.addEventListener("change", () => {
      commitBudgetSettings({ includeExtras: budgetIncludeExtrasInput.checked });
    });
    budgetIncludeExtrasInput.dataset.budgetBound = "true";
  }

  if (budgetDaysNode.dataset.budgetBound === "true") {
    return;
  }

  budgetDaysNode.addEventListener("change", (event) => {
    const levelInput = event.target.closest?.("[data-budget-level]");
    if (!levelInput) {
      return;
    }

    const day = levelInput.closest("[data-budget-day]")?.dataset.budgetDay;
    if (!day) {
      return;
    }

    commitBudgetDayState(day, {
      ...getBudgetDayState(day),
      level: levelInput.value
    });
  });

  budgetDaysNode.addEventListener("input", (event) => {
    const noteField = event.target.closest?.("[data-budget-note]");
    if (!noteField) {
      return;
    }

    const day = noteField.closest("[data-budget-day]")?.dataset.budgetDay;
    if (!day) {
      return;
    }

    commitBudgetDayState(day, {
      ...getBudgetDayState(day),
      note: noteField.value
    });
  });

  budgetDaysNode.dataset.budgetBound = "true";
}

function initializeBudgetNotes() {
  if (!budgetNotesCard || !budgetSummaryNode || !budgetBreakdownNode || !budgetDaysNode) {
    return;
  }

  if (!budgetNotesInitialized) {
    budgetNotesState = readStoredBudgetNotesState();
    budgetNotesInitialized = true;
  }

  if (budgetNotesCard.dataset.budgetRendered !== "true") {
    renderBudgetNotes();
    budgetNotesCard.dataset.budgetRendered = "true";
  }

  bindBudgetNotesUI();
  syncBudgetNotesUI();
}

const itineraryBudgetLabels = {
  summaryTotalLocked: { en: "Days 1-7 range", ja: "1〜7日目の予算帯" },
  summaryTotalUnlocked: { en: "Trip range", ja: "旅程の予算帯" },
  summaryPerPerson: { en: "Per-person range", ja: "1人あたりの予算帯" },
  summaryAccommodationSplit: { en: "Stay split / person range", ja: "宿泊の1人分帯" },
  summaryBookedRequired: { en: "Booked + required range", ja: "予約前提 + 必須の帯" },
  summaryOptionalLocked: { en: "Days 8-9 add-on range", ja: "8日目と9日目の追加帯" },
  summaryOptionalUnlocked: { en: "Optional Days 8-9 range", ja: "追加の8日目と9日目の帯" },
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
  rangeLegendOptionalDays: {
    en: "Days 8-9 stay outside the live total until unlocked, and optional route extras stay outside the base total until you enable them.",
    ja: "8日目と9日目は解放するまで合計へ入らず、任意のルート追加費用も有効にするまで基本合計へ入りません。"
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
    en: "Uses the actual stay plan, corrected transit legs, ticket timing, and meal-pattern bands instead of one padded single-number estimate.",
    ja: "単一の水増し見積りではなく、実際の滞在計画、修正済みの移動、チケット時間帯、食費パターン帯で組み立てています。"
  },
  travelersHint: {
    en: "Stay selectors now control each accommodation night directly, so private/local or no-cost Osaka nights stay at JPY 0 unless you switch them to a paid stay.",
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
    en: "Adds optional luggage handling and weather-pivot extras. Optional Days 8-9 stay separate until unlocked.",
    ja: "荷物対応や天候回避の任意追加費用を反映します。8日目と9日目は解放するまで別枠です。"
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
  bookedRequiredMeta: {
    en: "The base route costs before optional extras and before Days 8-9 are unlocked",
    ja: "任意追加費用と8日目・9日目を除いた基本ルート費用"
  },
  sharedMeta: { en: "Shared stays and group costs", ja: "共有の宿泊費と共通費" },
  variableMeta: { en: "Per-person variable spend", ja: "1人ごとの変動費" },
  spendLegend: { en: "Day notes", ja: "日別メモ" },
  optionalInactive: { en: "Not added yet", ja: "まだ未加算" },
  optionalInactiveMeta: {
    en: "Unlock Days 8-9 in the checklist to add them into the live total.",
    ja: "チェックリストで8日目と9日目を解放すると、合計へ反映されます。"
  },
  sourceUpdatedPrefix: { en: "Updated", ja: "更新日" }
};

function getBudgetCategoryLabel(categoryId) {
  return (
    budgetCategoryDefinitions.find((entry) => entry.id === categoryId)?.label || {
      en: categoryId,
      ja: categoryId
    }
  );
}

function getBudgetBucketLabel(bucketId) {
  return (
    budgetBucketDefinitions.find((entry) => entry.id === bucketId)?.label || {
      en: bucketId,
      ja: bucketId
    }
  );
}

function formatBudgetCurrency(amount) {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0
  }).format(Math.round(Number(amount) || 0));
}

function normalizeBudgetTravelerCount(value, fallback = budgetDefaultTravelerCount) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  if (Number.isNaN(parsed)) {
    return clamp(fallback, budgetTravelerCountMin, budgetTravelerCountMax);
  }

  return clamp(parsed, budgetTravelerCountMin, budgetTravelerCountMax);
}

function getBudgetRoomCount(travelers = budgetDefaultTravelerCount) {
  return Math.max(1, Math.ceil(normalizeBudgetTravelerCount(travelers) / budgetSharedRoomOccupancy));
}

function getDefaultBudgetNotesState() {
  return {
    travelers: budgetDefaultTravelerCount,
    includeExtras: false,
    days: {}
  };
}

function normalizeBudgetDayEntries(daysCandidate) {
  if (!daysCandidate || typeof daysCandidate !== "object" || Array.isArray(daysCandidate)) {
    return {};
  }

  return Object.entries(daysCandidate).reduce((nextState, [day, entry]) => {
    const normalizedDay = Number.parseInt(String(day), 10);
    if (
      Number.isNaN(normalizedDay) ||
      !budgetDayDefinitions.some((definition) => definition.day === normalizedDay)
    ) {
      return nextState;
    }

    const note = typeof entry?.note === "string" ? entry.note.slice(0, 280) : "";
    if (note.trim()) {
      nextState[String(normalizedDay)] = { note };
    }

    return nextState;
  }, {});
}

function readStoredBudgetNotesState() {
  const fallbackState = getDefaultBudgetNotesState();

  try {
    const parsed = JSON.parse(window.localStorage.getItem(budgetNotesStorageKey) || "null");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return fallbackState;
    }

    return {
      travelers: normalizeBudgetTravelerCount(parsed.travelers, fallbackState.travelers),
      includeExtras: parsed.includeExtras === true,
      days: normalizeBudgetDayEntries(parsed.days)
    };
  } catch (error) {
    return fallbackState;
  }
}

function hasBudgetNotesChanges() {
  if (
    normalizeBudgetTravelerCount(budgetNotesState.travelers, budgetDefaultTravelerCount) !==
      budgetDefaultTravelerCount ||
    budgetNotesState.includeExtras === true
  ) {
    return true;
  }

  return Object.values(budgetNotesState.days || {}).some((entry) => String(entry?.note || "").trim());
}

function storeBudgetNotesState() {
  try {
    if (!hasBudgetNotesChanges()) {
      queueStorageRemoval(budgetNotesStorageKey);
      flushQueuedStorageWrites();
      return;
    }

    queueStorageValue(
      budgetNotesStorageKey,
      JSON.stringify({
        travelers: normalizeBudgetTravelerCount(budgetNotesState.travelers, budgetDefaultTravelerCount),
        includeExtras: budgetNotesState.includeExtras === true,
        days: normalizeBudgetDayEntries(budgetNotesState.days)
      })
    );
    flushQueuedStorageWrites();
  } catch (error) {
    // Ignore storage failures and keep the budget notes usable.
  }
}

function getBudgetTravelerCount() {
  return normalizeBudgetTravelerCount(budgetNotesState.travelers, budgetDefaultTravelerCount);
}

function shouldIncludeBudgetExtras() {
  return budgetNotesState.includeExtras === true;
}

function getBudgetDayState(day) {
  const key = String(day);
  const entry =
    budgetNotesState.days && typeof budgetNotesState.days[key] === "object"
      ? budgetNotesState.days[key]
      : {};

  return {
    note: typeof entry.note === "string" ? entry.note : ""
  };
}

function updateStoredBudgetDayState(day, nextState) {
  const key = String(day);
  const note = typeof nextState?.note === "string" ? nextState.note.slice(0, 280) : "";

  if (!budgetNotesState.days || typeof budgetNotesState.days !== "object") {
    budgetNotesState.days = {};
  }

  if (!note.trim()) {
    delete budgetNotesState.days[key];
  } else {
    budgetNotesState.days[key] = { note };
  }

  storeBudgetNotesState();
}

function getBudgetVisibleDayDefinitions() {
  return budgetDayDefinitions.filter((definition) => !definition.optional || areOptionalDaysUnlocked());
}

function getBudgetOptionalDayDefinitions() {
  return budgetDayDefinitions.filter((definition) => definition.optional);
}

function calculateBudgetItemCost(item, travelers, includeExtras) {
  const cost = item.cost || { mode: "none", amount: 0 };
  const sourceData = getBudgetEstimateSources();
  const costIndex =
    sourceData && typeof sourceData === "object" && !Array.isArray(sourceData)
      ? sourceData.costIndex
      : null;
  const sourceCost =
    costIndex && typeof costIndex === "object" && !Array.isArray(costIndex)
      ? costIndex[cost.sourceCostId]
      : null;
  const amount = Math.max(Number(sourceCost?.amount ?? cost.amount ?? 0) || 0, 0);
  const travelerCount = normalizeBudgetTravelerCount(travelers, budgetDefaultTravelerCount);
  const roomCapacity = Math.max(
    1,
    Number(sourceCost?.roomCapacity ?? cost.roomCapacity ?? budgetSharedRoomOccupancy) ||
      budgetSharedRoomOccupancy
  );
  const pairSize = Math.max(1, Number(sourceCost?.groupSize ?? cost.groupSize ?? 2) || 2);
  let quantity = 0;
  let total = 0;

  if (cost.mode === "perPerson") {
    quantity = travelerCount;
    total = amount * travelerCount;
  } else if (cost.mode === "perRoom") {
    quantity = Math.max(1, Math.ceil(travelerCount / roomCapacity));
    total = amount * quantity;
  } else if (cost.mode === "perPair") {
    quantity = Math.max(1, Math.ceil(travelerCount / pairSize));
    total = amount * quantity;
  } else if (cost.mode === "perGroup") {
    quantity = 1;
    total = amount;
  }

  return {
    mode: cost.mode,
    amount,
    quantity,
    total,
    roomCapacity: cost.mode === "perRoom" ? roomCapacity : null,
    pairSize: cost.mode === "perPair" ? pairSize : null,
    included: item.bucket !== "optional" || includeExtras
  };
}

function getBudgetItemFormulaCopy(itemCost) {
  if (itemCost.mode === "perPerson") {
    return {
      en: `${formatBudgetCurrency(itemCost.amount)} x ${itemCost.quantity} traveler${
        itemCost.quantity === 1 ? "" : "s"
      }`,
      ja: `${formatBudgetCurrency(itemCost.amount)} x ${itemCost.quantity}人`
    };
  }

  if (itemCost.mode === "perRoom") {
    return {
      en: `${formatBudgetCurrency(itemCost.amount)} x ${itemCost.quantity} room${
        itemCost.quantity === 1 ? "" : "s"
      }${itemCost.roomCapacity ? ` (up to ${itemCost.roomCapacity} guests)` : ""}`,
      ja: `${formatBudgetCurrency(itemCost.amount)} x ${itemCost.quantity}室${
        itemCost.roomCapacity ? `（${itemCost.roomCapacity}人定員）` : ""
      }`
    };
  }

  if (itemCost.mode === "perPair") {
    return {
      en: `${formatBudgetCurrency(itemCost.amount)} x ${itemCost.quantity} shared stop${
        itemCost.quantity === 1 ? "" : "s"
      }`,
      ja: `${formatBudgetCurrency(itemCost.amount)} x ${itemCost.quantity}件`
    };
  }

  if (itemCost.mode === "perGroup") {
    return {
      en: "One shared trip cost",
      ja: "旅全体の共通費"
    };
  }

  return {
    en: "No extra ticketed cost",
    ja: "追加費用なし"
  };
}

function calculateBudgetEstimate() {
  const travelers = getBudgetTravelerCount();
  const includeExtras = shouldIncludeBudgetExtras();
  const visibleDays = getBudgetVisibleDayDefinitions();
  const optionalDays = getBudgetOptionalDayDefinitions();
  const categoryTotals = Object.fromEntries(
    budgetCategoryDefinitions.map((definition) => [definition.id, 0])
  );
  const bucketTotals = Object.fromEntries(
    budgetBucketDefinitions.map((definition) => [definition.id, 0])
  );

  const calculateDay = (definition) => {
    const itemEstimates = definition.items.map((item) => {
      const itemCost = calculateBudgetItemCost(item, travelers, includeExtras);
      const lineTotal = itemCost.included ? itemCost.total : 0;
      return {
        ...item,
        itemCost,
        lineTotal
      };
    });

    return {
      ...definition,
      note: getBudgetDayState(definition.day).note,
      itemEstimates,
      total: itemEstimates.reduce((sum, item) => sum + item.lineTotal, 0)
    };
  };

  const visibleDayEstimates = visibleDays.map((definition) => calculateDay(definition));
  const optionalDayAddOnEstimates = optionalDays
    .filter((definition) => !visibleDays.some((visible) => visible.day === definition.day))
    .map((definition) => calculateDay(definition));

  visibleDayEstimates.forEach((dayEstimate) => {
    dayEstimate.itemEstimates.forEach((item) => {
      if (!item.itemCost.included) {
        return;
      }

      categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.lineTotal;
      bucketTotals[item.bucket] = (bucketTotals[item.bucket] || 0) + item.lineTotal;
    });
  });

  const total = visibleDayEstimates.reduce((sum, day) => sum + day.total, 0);
  const optionalDaysAddOnTotal = optionalDayAddOnEstimates.reduce((sum, day) => sum + day.total, 0);
  const bookedAndFixedTotal = (bucketTotals.booked || 0) + (bucketTotals.required || 0);

  return {
    travelers,
    includeExtras,
    visibleDayEstimates,
    optionalDayAddOnEstimates,
    total,
    perPerson: travelers ? total / travelers : 0,
    optionalDaysAddOnTotal,
    bookedAndFixedTotal,
    bucketTotals,
    categoryTotals,
    sharedTotal: categoryTotals.accommodation + categoryTotals.baggage,
    variableTotal:
      total - (categoryTotals.accommodation + categoryTotals.baggage)
  };
}

function renderBudgetSummaryMarkup(estimate = calculateBudgetEstimate()) {
  const optionalDaysUnlocked = areOptionalDaysUnlocked();
  const optionalVisibleTotal = estimate.visibleDayEstimates
    .filter((day) => day.optional)
    .reduce((sum, day) => sum + day.total, 0);
  const summaryCards = [
    {
      className: "budget-summary-card budget-summary-card--estimate budget-summary-card--compact",
      label: optionalDaysUnlocked
        ? itineraryBudgetLabels.summaryTotalUnlocked
        : itineraryBudgetLabels.summaryTotalLocked,
      value: formatBudgetCurrency(estimate.total),
      meta: itineraryBudgetLabels.totalMeta
    },
    {
      className: "budget-summary-card budget-summary-card--per-person budget-summary-card--compact",
      label: itineraryBudgetLabels.summaryPerPerson,
      value: formatBudgetCurrency(estimate.perPerson),
      meta: {
        en: `${estimate.travelers} traveler${estimate.travelers === 1 ? "" : "s"} • Osaka, Hakone, and Tokyo use quoted 2-person rooms; Kawaguchiko uses the quoted 4-person tatami room`,
        ja: `${estimate.travelers}人 ・ 大阪・箱根・東京は見積りの2人部屋、河口湖は見積りの4人用畳部屋で計算`
      }
    },
    {
      className: "budget-summary-card budget-summary-card--shared budget-summary-card--compact",
      label: itineraryBudgetLabels.summaryBookedRequired,
      value: formatBudgetCurrency(estimate.bookedAndFixedTotal),
      meta: itineraryBudgetLabels.bookedRequiredMeta
    },
    {
      className: "budget-summary-card budget-summary-card--optional budget-summary-card--compact",
      label: optionalDaysUnlocked
        ? itineraryBudgetLabels.summaryOptionalUnlocked
        : itineraryBudgetLabels.summaryOptionalLocked,
      value: formatBudgetCurrency(optionalDaysUnlocked ? optionalVisibleTotal : estimate.optionalDaysAddOnTotal),
      meta: optionalDaysUnlocked
        ? {
            en: `${estimate.optionalDayAddOnEstimates.length || estimate.visibleDayEstimates.filter((day) => day.optional).length} optional day${
              estimate.visibleDayEstimates.filter((day) => day.optional).length === 1 ? "" : "s"
            } in the live total`,
            ja: `追加日 ${estimate.visibleDayEstimates.filter((day) => day.optional).length}日 を合計へ反映`
          }
        : itineraryBudgetLabels.optionalInactiveMeta
    }
  ];

  return summaryCards
    .map(
      (card) => `
        <article class="${card.className}">
          <p class="budget-summary-card__label">${renderLocalizedContent(card.label)}</p>
          <p class="budget-summary-card__value">${escapeHtml(card.value)}</p>
          <p class="budget-summary-card__meta">${renderLocalizedContent(card.meta)}</p>
        </article>
      `
    )
    .join("");
}

function renderBudgetBreakdownMarkup(estimate = calculateBudgetEstimate()) {
  const categoryCards = budgetCategoryDefinitions
    .map(
      (definition) => `
        <article class="budget-breakdown-card">
          <p class="budget-breakdown-card__label">${renderLocalizedContent(definition.label)}</p>
          <p class="budget-breakdown-card__value">${escapeHtml(
            formatBudgetCurrency(estimate.categoryTotals[definition.id] || 0)
          )}</p>
        </article>
      `
    )
    .join("");

  const bucketPills = ["booked", "required", "flexible", "optional"]
    .map((bucketId) => {
      const total = bucketId === "optional" && !estimate.includeExtras
        ? itineraryBudgetLabels.optionalInactive
        : { en: formatBudgetCurrency(estimate.bucketTotals[bucketId] || 0), ja: formatBudgetCurrency(estimate.bucketTotals[bucketId] || 0) };

      return `
        <span class="budget-breakdown-pill budget-breakdown-pill--${bucketId}">
          ${renderLocalizedContent(getBudgetBucketLabel(bucketId))} · ${renderLocalizedContent(total)}
        </span>
      `;
    })
    .join("");

  return `
    <div class="budget-breakdown-grid">${categoryCards}</div>
    <div class="budget-breakdown-pills">${bucketPills}</div>
  `;
}

function renderBudgetSourceMetaMarkup() {
  return `
    <article class="budget-source-meta-card">
      <p class="budget-source-meta-card__label">${renderLocalizedContent(
        itineraryBudgetLabels.itineraryBasis
      )}</p>
      <p class="budget-source-meta-card__body">${renderLocalizedContent(budgetAssumptionCopy)}</p>
      <p class="budget-source-meta-card__body">${renderLocalizedContent({
        en: `${itineraryBudgetLabels.sourceUpdatedPrefix.en}: ${budgetSourceUpdatedAt}`,
        ja: `${itineraryBudgetLabels.sourceUpdatedPrefix.ja}: ${budgetSourceUpdatedAt}`
      })}</p>
    </article>
  `;
}

function renderBudgetSourcesMarkup() {
  return budgetSourceGroups
    .map((group) => {
      const links = Array.isArray(group.links) ? group.links : [];
      return `
        <article class="budget-source-card">
          <h4>${renderLocalizedContent(group.title)}</h4>
          <p>${renderLocalizedContent(group.summary)}</p>
          <div class="budget-source-card__links">
            ${links
              .map(
                (link) => `
                  <a
                    class="budget-source-card__link"
                    href="${escapeHtml(link.url)}"
                    target="_blank"
                    rel="noreferrer noopener">
                    ${renderLocalizedContent(link.label)}
                  </a>
                `
              )
              .join("")}
          </div>
        </article>
      `;
    })
    .join("");
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
      helperCopy: { en: "", ja: "" },
      sections: {},
      sourceGroups: []
    };

  return budgetEstimateSources;
}

function joinBudgetCopySegments(segments = []) {
  const enSegments = [];
  const jaSegments = [];

  segments.forEach((segment) => {
    if (!segment || typeof segment !== "object") {
      return;
    }

    if (segment.en) {
      enSegments.push(segment.en);
    }

    if (segment.ja) {
      jaSegments.push(segment.ja);
    }
  });

  return {
    en: enSegments.join(" • "),
    ja: jaSegments.join(" ・ ")
  };
}

function normalizeBudgetBucket(bucket) {
  return bucket === "required" || bucket === "likely" || bucket === "optional" ? bucket : "owned";
}

function getBudgetBucketLabel(bucket) {
  switch (normalizeBudgetBucket(bucket)) {
    case "required":
      return budgetNotesLabels.requiredBucket;
    case "likely":
      return budgetNotesLabels.likelyBucket;
    case "optional":
      return budgetNotesLabels.optionalBucket;
    default:
      return budgetNotesLabels.ownedBucket;
  }
}

function getBudgetBucketChipClass(bucket) {
  switch (normalizeBudgetBucket(bucket)) {
    case "required":
      return "budget-chip budget-chip--required";
    case "likely":
      return "budget-chip budget-chip--likely";
    case "optional":
      return "budget-chip budget-chip--optional";
    default:
      return "budget-chip budget-chip--excluded";
  }
}

function getDefaultBudgetNotesState() {
  return {
    travelers: budgetDefaultTravelerCount,
    includeExtras: false,
    sections: {}
  };
}

function getBudgetTravelerCountFromState(state = budgetNotesState) {
  return normalizeBudgetTravelerCount(state?.travelers, budgetDefaultTravelerCount);
}

function getBudgetIncludeExtrasFromState(state = budgetNotesState) {
  return state?.includeExtras === true;
}

function getBudgetSectionEntriesFromState(state = budgetNotesState) {
  const sectionEntries = state?.sections;
  if (!sectionEntries || typeof sectionEntries !== "object" || Array.isArray(sectionEntries)) {
    return {};
  }

  return sectionEntries;
}

function getBudgetSectionConfig(sectionId) {
  return budgetSectionDefinitionMap.get(String(sectionId)) || null;
}

function normalizeBudgetSectionEntries(entriesCandidate) {
  if (!entriesCandidate || typeof entriesCandidate !== "object" || Array.isArray(entriesCandidate)) {
    return {};
  }

  return Object.entries(entriesCandidate).reduce((nextState, [sectionId, entry]) => {
    const config = getBudgetSectionConfig(sectionId);
    if (!config || !entry || typeof entry !== "object" || Array.isArray(entry)) {
      return nextState;
    }

    const note = typeof entry.note === "string" ? entry.note.slice(0, 280) : "";
    if (note.trim()) {
      nextState[config.id] = { note };
    }

    return nextState;
  }, {});
}

function readStoredBudgetNotesState() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(budgetNotesStorageKey) || "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return getDefaultBudgetNotesState();
    }

    return {
      travelers: normalizeBudgetTravelerCount(parsed.travelers, budgetDefaultTravelerCount),
      includeExtras: typeof parsed.includeExtras === "boolean" ? parsed.includeExtras : false,
      sections: normalizeBudgetSectionEntries(parsed.sections)
    };
  } catch (error) {
    return getDefaultBudgetNotesState();
  }
}

function hasBudgetNotesChanges(state = budgetNotesState) {
  return (
    getBudgetTravelerCountFromState(state) !== budgetDefaultTravelerCount ||
    getBudgetIncludeExtrasFromState(state) ||
    Object.keys(getBudgetSectionEntriesFromState(state)).length > 0
  );
}

function storeBudgetNotesState() {
  try {
    if (hasBudgetNotesChanges()) {
      queueStorageValue(
        budgetNotesStorageKey,
        JSON.stringify({
          travelers: getBudgetTravelerCount(),
          includeExtras: shouldIncludeBudgetExtras(),
          sections: getBudgetSectionEntries()
        })
      );
      return;
    }

    queueStorageRemoval(budgetNotesStorageKey);
  } catch (error) {
    // Ignore storage failures and keep the budget notes usable.
  }
}

function getBudgetTravelerCount() {
  return getBudgetTravelerCountFromState(budgetNotesState);
}

function shouldIncludeBudgetExtras() {
  return getBudgetIncludeExtrasFromState(budgetNotesState);
}

function getBudgetSectionEntries() {
  return getBudgetSectionEntriesFromState(budgetNotesState);
}

function getBudgetSectionState(sectionId) {
  const config = getBudgetSectionConfig(sectionId);
  const storedState = getBudgetSectionEntries()[config?.id || ""] || {};

  return {
    note: typeof storedState.note === "string" ? storedState.note : ""
  };
}

function getBudgetResetEnabled() {
  return hasBudgetNotesChanges();
}

function getBudgetSharedPrepUnitCount(travelers = getBudgetTravelerCount()) {
  return Math.max(1, Math.ceil(travelers / budgetSharedRoomOccupancy));
}

function getBudgetSectionProfile(sectionId) {
  return getBudgetEstimateSources().sections?.[sectionId] || null;
}

function getBudgetSectionItems(sectionId) {
  const items = getBudgetSectionProfile(sectionId)?.items;
  return Array.isArray(items) ? items : [];
}

function normalizeBudgetCostModel(cost) {
  if (!cost || typeof cost !== "object" || Array.isArray(cost)) {
    return { type: "none", amount: 0 };
  }

  const type =
    cost.type === "perPerson" || cost.type === "sharedOnce" || cost.type === "perPair"
      ? cost.type
      : "none";

  return {
    type,
    amount: Math.max(Number(cost.amount) || 0, 0)
  };
}

function calculateBudgetItemCost(item, travelers = getBudgetTravelerCount()) {
  const cost = normalizeBudgetCostModel(item?.cost);

  switch (cost.type) {
    case "perPerson":
      return cost.amount * travelers;
    case "sharedOnce":
      return cost.amount;
    case "perPair":
      return cost.amount * getBudgetSharedPrepUnitCount(travelers);
    default:
      return 0;
  }
}

function isBudgetItemIncluded(bucket, includeExtras = shouldIncludeBudgetExtras()) {
  const normalizedBucket = normalizeBudgetBucket(bucket);
  return normalizedBucket === "required" || normalizedBucket === "likely"
    ? true
    : normalizedBucket === "optional"
      ? includeExtras
      : false;
}

function calculateBudgetSectionEstimate(
  definition,
  options = {
    travelers: getBudgetTravelerCount(),
    includeExtras: shouldIncludeBudgetExtras()
  }
) {
  const travelers = normalizeBudgetTravelerCount(options.travelers, getBudgetTravelerCount());
  const includeExtras =
    typeof options.includeExtras === "boolean" ? options.includeExtras : shouldIncludeBudgetExtras();
  const state = getBudgetSectionState(definition?.id);
  const counts = { required: 0, likely: 0, optional: 0, owned: 0 };
  const bucketTotals = { required: 0, likely: 0, optional: 0 };
  let total = 0;
  let sharedTotal = 0;
  const items = getBudgetSectionItems(definition?.id).map((item) => {
    const bucket = normalizeBudgetBucket(item?.bucket);
    const cost = calculateBudgetItemCost(item, travelers);
    const costType = normalizeBudgetCostModel(item?.cost).type;
    const included = isBudgetItemIncluded(bucket, includeExtras);

    counts[bucket] += 1;

    if (bucket === "required") {
      bucketTotals.required += cost;
    } else if (bucket === "likely") {
      bucketTotals.likely += cost;
    } else if (bucket === "optional") {
      bucketTotals.optional += cost;
    }

    if (included) {
      total += cost;
      if (costType !== "perPerson" && cost > 0) {
        sharedTotal += cost;
      }
    }

    return {
      ...item,
      bucket,
      cost,
      included
    };
  });

  return {
    definition,
    state,
    items,
    counts,
    bucketTotals,
    total,
    sharedTotal
  };
}

function calculateBudgetEstimate() {
  const travelers = getBudgetTravelerCount();
  const includeExtras = shouldIncludeBudgetExtras();
  const sectionEstimates = budgetSectionDefinitions.map((definition) =>
    calculateBudgetSectionEstimate(definition, { travelers, includeExtras })
  );
  const leanTotal = sectionEstimates.reduce(
    (sum, estimate) => sum + estimate.bucketTotals.required + estimate.bucketTotals.likely,
    0
  );
  const optionalAvailableTotal = sectionEstimates.reduce(
    (sum, estimate) => sum + estimate.bucketTotals.optional,
    0
  );
  const currentTotal = leanTotal + (includeExtras ? optionalAvailableTotal : 0);

  return {
    travelers,
    includeExtras,
    sectionEstimates,
    categoryTotals: sectionEstimates.reduce((totals, estimate) => {
      totals[estimate.definition.id] = estimate.total;
      return totals;
    }, {}),
    leanTotal,
    currentTotal,
    requiredTotal: sectionEstimates.reduce((sum, estimate) => sum + estimate.bucketTotals.required, 0),
    likelyTotal: sectionEstimates.reduce((sum, estimate) => sum + estimate.bucketTotals.likely, 0),
    optionalAvailableTotal,
    perPersonLean: leanTotal / travelers,
    perPersonCurrent: currentTotal / travelers,
    sharedTotal: sectionEstimates.reduce((sum, estimate) => sum + estimate.sharedTotal, 0),
    perPersonVariableTotal:
      currentTotal - sectionEstimates.reduce((sum, estimate) => sum + estimate.sharedTotal, 0),
    ownedExcludedCount: sectionEstimates.reduce((sum, estimate) => sum + estimate.counts.owned, 0),
    requiredItemCount: sectionEstimates.reduce((sum, estimate) => sum + estimate.counts.required, 0),
    likelyItemCount: sectionEstimates.reduce((sum, estimate) => sum + estimate.counts.likely, 0),
    optionalItemCount: sectionEstimates.reduce((sum, estimate) => sum + estimate.counts.optional, 0)
  };
}

function getBudgetSectionTotalCopy(sectionEstimate) {
  return sectionEstimate.total > 0
    ? {
        en: `${formatBudgetAmount(sectionEstimate.total)} total`,
        ja: `合計 ${formatBudgetAmount(sectionEstimate.total)}`
      }
    : budgetNotesLabels.noExtraCost;
}

function getBudgetSectionItemMetaCopy(item, includeExtras = shouldIncludeBudgetExtras()) {
  const costCopy =
    item.bucket === "owned"
      ? {
          en: "already owned or no extra purchase assumed",
          ja: "所持済み、または追加購入なし前提"
        }
      : item.bucket === "optional"
        ? includeExtras
          ? {
              en: `${formatBudgetAmount(item.cost)} included`,
              ja: `${formatBudgetAmount(item.cost)} を反映中`
            }
          : {
              en: `+${formatBudgetAmount(item.cost)} available`,
              ja: `+${formatBudgetAmount(item.cost)} を追加可能`
            }
        : {
            en: `${formatBudgetAmount(item.cost)} total`,
            ja: `合計 ${formatBudgetAmount(item.cost)}`
          };

  return joinBudgetCopySegments([
    getBudgetBucketLabel(item.bucket),
    costCopy,
    item.body && typeof item.body === "object" ? item.body : null
  ]);
}

function renderBudgetSummaryMarkup(estimate = calculateBudgetEstimate()) {
  const leanMetaCopy = joinBudgetCopySegments([
    {
      en: `Required ${formatBudgetAmount(estimate.requiredTotal)}`,
      ja: `必須 ${formatBudgetAmount(estimate.requiredTotal)}`
    },
    {
      en: `Likely ${formatBudgetAmount(estimate.likelyTotal)}`,
      ja: `見込み ${formatBudgetAmount(estimate.likelyTotal)}`
    },
    {
      en: `${estimate.ownedExcludedCount} owned items excluded`,
      ja: `${estimate.ownedExcludedCount}件の所持品を除外`
    }
  ]);
  const perPersonMetaCopy = joinBudgetCopySegments([
    {
      en: `${estimate.travelers} ${estimate.travelers === 1 ? "traveler" : "travelers"}`,
      ja: `${estimate.travelers}人`
    },
    estimate.sharedTotal > 0
      ? {
          en: `${formatBudgetAmount(estimate.sharedTotal)} shared prep`,
          ja: `共有準備 ${formatBudgetAmount(estimate.sharedTotal)}`
        }
      : budgetNotesLabels.perPersonOnlyMeta,
    estimate.includeExtras ? budgetNotesLabels.optionalIncludedMeta : budgetNotesLabels.optionalExcludedMeta
  ]);
  const requiredMetaCopy = joinBudgetCopySegments([
    {
      en: `${estimate.requiredItemCount} fixed prep item${estimate.requiredItemCount === 1 ? "" : "s"}`,
      ja: `${estimate.requiredItemCount}件の固定準備項目`
    },
    {
      en: "Mostly rail reservations and must-have setup",
      ja: "主に鉄道予約と必須セットアップ"
    }
  ]);
  const optionalValueCopy =
    estimate.optionalAvailableTotal > 0
      ? estimate.includeExtras
        ? {
            en: `${formatBudgetAmount(estimate.optionalAvailableTotal)} included`,
            ja: `${formatBudgetAmount(estimate.optionalAvailableTotal)} を反映中`
          }
        : {
            en: `+${formatBudgetAmount(estimate.optionalAvailableTotal)} available`,
            ja: `+${formatBudgetAmount(estimate.optionalAvailableTotal)} を追加可能`
          }
      : budgetNotesLabels.noExtraCost;
  const optionalMetaCopy = joinBudgetCopySegments([
    {
      en: `${estimate.optionalItemCount} add-on item${estimate.optionalItemCount === 1 ? "" : "s"}`,
      ja: `${estimate.optionalItemCount}件の追加候補`
    },
    {
      en: "Luggage handling, backup gear, and optional timed bookings",
      ja: "荷物対応、予備の持ち物、任意の時間指定予約"
    }
  ]);

  return `
    <div class="budget-summary-card budget-summary-card--estimate budget-summary-card--compact">
      <p class="budget-summary-card__label">${renderLocalizedContent(budgetNotesLabels.summaryTotal)}</p>
      <strong class="budget-summary-card__value">${renderLocalizedContent({
        en: `${formatBudgetAmount(estimate.leanTotal)} total`,
        ja: `合計 ${formatBudgetAmount(estimate.leanTotal)}`
      })}</strong>
      <p class="budget-summary-card__meta">${renderLocalizedContent(leanMetaCopy)}</p>
    </div>
    <div class="budget-summary-card budget-summary-card--per-person budget-summary-card--compact">
      <p class="budget-summary-card__label">${renderLocalizedContent(
        budgetNotesLabels.summaryPerPerson
      )}</p>
      <strong class="budget-summary-card__value">${renderLocalizedContent({
        en: `${formatBudgetAmount(estimate.perPersonCurrent)} each`,
        ja: `1人 ${formatBudgetAmount(estimate.perPersonCurrent)}`
      })}</strong>
      <p class="budget-summary-card__meta">${renderLocalizedContent(perPersonMetaCopy)}</p>
    </div>
    <div class="budget-summary-card budget-summary-card--required budget-summary-card--compact">
      <p class="budget-summary-card__label">${renderLocalizedContent(
        budgetNotesLabels.summaryRequired
      )}</p>
      <strong class="budget-summary-card__value">${renderLocalizedContent({
        en: `${formatBudgetAmount(estimate.requiredTotal)} total`,
        ja: `合計 ${formatBudgetAmount(estimate.requiredTotal)}`
      })}</strong>
      <p class="budget-summary-card__meta">${renderLocalizedContent(requiredMetaCopy)}</p>
    </div>
    <div class="budget-summary-card budget-summary-card--optional budget-summary-card--compact">
      <p class="budget-summary-card__label">${renderLocalizedContent(
        budgetNotesLabels.summaryOptional
      )}</p>
      <strong class="budget-summary-card__value ${
        estimate.optionalAvailableTotal > 0 ? "" : "budget-summary-card__value--text"
      }">${renderLocalizedContent(optionalValueCopy)}</strong>
      <p class="budget-summary-card__meta">${renderLocalizedContent(optionalMetaCopy)}</p>
    </div>
  `;
}

function renderBudgetBreakdownMarkup(estimate = calculateBudgetEstimate()) {
  return estimate.sectionEstimates
    .map((sectionEstimate) => {
      const totalCopy =
        sectionEstimate.total > 0
          ? { en: formatBudgetAmount(sectionEstimate.total), ja: formatBudgetAmount(sectionEstimate.total) }
          : budgetNotesLabels.noExtraCost;
      const metaCopy =
        sectionEstimate.total > 0
          ? sectionEstimate.sharedTotal > 0
            ? joinBudgetCopySegments([
                {
                  en: `${formatBudgetAmount(sectionEstimate.sharedTotal)} shared`,
                  ja: `共有 ${formatBudgetAmount(sectionEstimate.sharedTotal)}`
                },
                {
                  en: `${formatBudgetAmount(sectionEstimate.total - sectionEstimate.sharedTotal)} per-person items`,
                  ja: `個人項目 ${formatBudgetAmount(sectionEstimate.total - sectionEstimate.sharedTotal)}`
                }
              ])
            : budgetNotesLabels.perPersonOnlyMeta
          : budgetNotesLabels.ownedExcludedMeta;
      const hintCopy = joinBudgetCopySegments([
        sectionEstimate.bucketTotals.required > 0
          ? {
              en: `Required ${formatBudgetAmount(sectionEstimate.bucketTotals.required)}`,
              ja: `必須 ${formatBudgetAmount(sectionEstimate.bucketTotals.required)}`
            }
          : null,
        sectionEstimate.bucketTotals.likely > 0
          ? {
              en: `Likely ${formatBudgetAmount(sectionEstimate.bucketTotals.likely)}`,
              ja: `見込み ${formatBudgetAmount(sectionEstimate.bucketTotals.likely)}`
            }
          : null,
        sectionEstimate.bucketTotals.optional > 0
          ? estimate.includeExtras
            ? {
                en: `Optional ${formatBudgetAmount(sectionEstimate.bucketTotals.optional)} included`,
                ja: `任意 ${formatBudgetAmount(sectionEstimate.bucketTotals.optional)} を反映中`
              }
            : {
                en: `+${formatBudgetAmount(sectionEstimate.bucketTotals.optional)} optional`,
                ja: `+${formatBudgetAmount(sectionEstimate.bucketTotals.optional)} 任意`
              }
          : null,
        sectionEstimate.counts.owned > 0
          ? {
              en: `${sectionEstimate.counts.owned} owned excluded`,
              ja: `${sectionEstimate.counts.owned}件を除外`
            }
          : null
      ]);

      return `
        <article class="budget-breakdown-card">
          <p class="budget-breakdown-card__label">${renderLocalizedContent(
            sectionEstimate.definition.label
          )}</p>
          <strong class="budget-breakdown-card__value ${
            sectionEstimate.total > 0 ? "" : "budget-breakdown-card__value--text"
          }">${renderLocalizedContent(totalCopy)}</strong>
          <p class="budget-breakdown-card__meta">${renderLocalizedContent(metaCopy)}</p>
          <p class="budget-breakdown-card__hint">${renderLocalizedContent(
            hintCopy.en || hintCopy.ja ? hintCopy : sectionEstimate.definition.meta
          )}</p>
        </article>
      `;
    })
    .join("");
}

function renderBudgetSourceMetaMarkup(sourceData = getBudgetEstimateSources()) {
  const hasSourceData = Boolean(sourceData?.lastUpdated);

  return `
    <article class="budget-source-meta-card">
      <p class="budget-source-meta-card__label">${renderLocalizedContent(
        budgetNotesLabels.sourceMetaLabel
      )}</p>
      <p class="budget-source-meta-card__body">${renderLocalizedContent(
        hasSourceData ? sourceData.updatedCopy : budgetNotesLabels.sourceMetaFallback
      )}</p>
      ${
        hasSourceData
          ? `<p class="budget-source-meta-card__body">${renderLocalizedContent(
              sourceData.metaCopy || budgetNotesLabels.helperCopy
            )}</p>
             <p class="budget-source-meta-card__body">${renderLocalizedContent(
               sourceData.helperCopy || budgetNotesLabels.helperCopy
             )}</p>`
          : ""
      }
    </article>
  `;
}

function renderBudgetSourcesMarkup(sourceData = getBudgetEstimateSources()) {
  const sourceGroups = Array.isArray(sourceData?.sourceGroups) ? sourceData.sourceGroups : [];
  if (!sourceGroups.length) {
    return "";
  }

  return sourceGroups
    .map((group) => {
      const links = Array.isArray(group.links) ? group.links : [];
      return `
        <article class="budget-source-card">
          <p class="budget-source-card__label">${renderLocalizedContent(group.label)}</p>
          <p class="budget-source-card__body">${renderLocalizedContent(group.body)}</p>
          ${
            links.length
              ? `<div class="budget-source-card__links">
                  ${links
                    .map(
                      (link) => `
                        <a
                          class="budget-source-card__link"
                          href="${escapeHtml(link.url)}"
                          target="_blank"
                          rel="noreferrer noopener">
                          ${renderLocalizedContent(link.label)}
                        </a>
                      `
                    )
                    .join("")}
                </div>`
              : ""
          }
        </article>
      `;
    })
    .join("");
}

function renderBudgetSectionMarkup(sectionEstimate, overallEstimate = calculateBudgetEstimate()) {
  const noteAriaEn = `Prep note for ${sectionEstimate.definition.label.en}`;
  const noteAriaJa = `${sectionEstimate.definition.label.ja}の準備メモ`;
  const tagSummaries = [
    sectionEstimate.counts.required > 0
      ? {
          className: getBudgetBucketChipClass("required"),
          copy: joinBudgetCopySegments([
            budgetNotesLabels.requiredBucket,
            { en: String(sectionEstimate.counts.required), ja: `${sectionEstimate.counts.required}件` }
          ])
        }
      : null,
    sectionEstimate.counts.likely > 0
      ? {
          className: getBudgetBucketChipClass("likely"),
          copy: joinBudgetCopySegments([
            budgetNotesLabels.likelyBucket,
            { en: String(sectionEstimate.counts.likely), ja: `${sectionEstimate.counts.likely}件` }
          ])
        }
      : null,
    sectionEstimate.counts.optional > 0
      ? {
          className: getBudgetBucketChipClass("optional"),
          copy: joinBudgetCopySegments([
            budgetNotesLabels.optionalBucket,
            { en: String(sectionEstimate.counts.optional), ja: `${sectionEstimate.counts.optional}件` }
          ])
        }
      : null,
    sectionEstimate.counts.owned > 0
      ? {
          className: getBudgetBucketChipClass("owned"),
          copy: joinBudgetCopySegments([
            budgetNotesLabels.ownedBucket,
            { en: String(sectionEstimate.counts.owned), ja: `${sectionEstimate.counts.owned}件` }
          ])
        }
      : null
  ].filter(Boolean);

  return `
    <article class="budget-day budget-day--prep" data-budget-section="${sectionEstimate.definition.id}">
      <div class="budget-day__header">
        <div class="budget-day__titles">
          <h4 class="budget-day__title">${renderLocalizedContent(sectionEstimate.definition.label)}</h4>
          <p class="budget-day__region">${renderLocalizedContent(sectionEstimate.definition.meta)}</p>
        </div>
        <p class="budget-day__range" data-budget-range>${renderLocalizedContent(
          getBudgetSectionTotalCopy(sectionEstimate)
        )}</p>
      </div>

      <div class="budget-day__tags">
        ${tagSummaries
          .map(
            (tag) =>
              `<span class="${tag.className}">${renderLocalizedContent(tag.copy)}</span>`
          )
          .join("")}
      </div>

      <div class="budget-day__body">
        <ul class="budget-reminder-list budget-reminder-list--prep">
          ${sectionEstimate.items
            .map(
              (item) => `
                <li>
                  <strong>${renderLocalizedContent(item.label)}</strong>
                  <span>${renderLocalizedContent(
                    getBudgetSectionItemMetaCopy(item, overallEstimate.includeExtras)
                  )}</span>
                </li>
              `
            )
            .join("")}
        </ul>

        <label class="budget-day__note-field">
          <span class="budget-day__note-label">${renderLocalizedContent(
            budgetNotesLabels.noteLabel
          )}</span>
          <textarea
            class="budget-day__note"
            rows="3"
            maxlength="280"
            data-budget-note
            data-aria-label-en="${escapeHtml(noteAriaEn)}"
            data-aria-label-ja="${escapeHtml(noteAriaJa)}"
            aria-label="${escapeHtml(noteAriaEn)}">${escapeHtml(sectionEstimate.state.note)}</textarea>
        </label>
      </div>
    </article>
  `;
}

function syncBudgetControlsUI() {
  if (budgetTravelersInput && budgetTravelersInput.value !== String(getBudgetTravelerCount())) {
    budgetTravelersInput.value = String(getBudgetTravelerCount());
  }

  if (budgetIncludeExtrasInput) {
    budgetIncludeExtrasInput.checked = shouldIncludeBudgetExtras();
  }

  budgetResetButtons.forEach((button) => {
    button.disabled = !getBudgetResetEnabled();
  });
}

function renderBudgetNotes() {
  if (!budgetNotesCard || !budgetSummaryNode || !budgetBreakdownNode || !budgetDaysNode) {
    return;
  }

  const estimate = calculateBudgetEstimate();
  budgetSummaryNode.innerHTML = renderBudgetSummaryMarkup(estimate);
  budgetBreakdownNode.innerHTML = renderBudgetBreakdownMarkup(estimate);
  if (budgetSourceMetaNode) {
    budgetSourceMetaNode.innerHTML = renderBudgetSourceMetaMarkup();
  }
  if (budgetSourcesNode) {
    budgetSourcesNode.innerHTML = renderBudgetSourcesMarkup();
  }
  budgetDaysNode.innerHTML = estimate.sectionEstimates
    .map((sectionEstimate) => renderBudgetSectionMarkup(sectionEstimate, estimate))
    .join("");
  syncBudgetControlsUI();
  syncLocalizedNodes(budgetNotesCard);
}

function syncBudgetNotesUI() {
  if (!budgetNotesCard || !budgetSummaryNode || !budgetBreakdownNode || !budgetDaysNode) {
    return;
  }

  renderBudgetNotes();
}

function commitBudgetSettings(nextSettings = {}) {
  const nextTravelers = Object.prototype.hasOwnProperty.call(nextSettings, "travelers")
    ? normalizeBudgetTravelerCount(nextSettings.travelers, getBudgetTravelerCount())
    : getBudgetTravelerCount();
  const nextIncludeExtras = Object.prototype.hasOwnProperty.call(nextSettings, "includeExtras")
    ? Boolean(nextSettings.includeExtras)
    : shouldIncludeBudgetExtras();

  budgetNotesState = {
    travelers: nextTravelers,
    includeExtras: nextIncludeExtras,
    sections: { ...getBudgetSectionEntries() }
  };
  storeBudgetNotesState();
  syncBudgetNotesUI();
}

function commitBudgetSectionState(sectionId, nextState = {}) {
  const config = getBudgetSectionConfig(sectionId);
  if (!config) {
    return;
  }

  const note = typeof nextState.note === "string" ? nextState.note.slice(0, 280) : "";
  const nextSections = { ...getBudgetSectionEntries() };

  if (!note.trim()) {
    delete nextSections[config.id];
  } else {
    nextSections[config.id] = { note };
  }

  budgetNotesState = {
    travelers: getBudgetTravelerCount(),
    includeExtras: shouldIncludeBudgetExtras(),
    sections: nextSections
  };
  storeBudgetNotesState();
  syncBudgetControlsUI();
}

function resetBudgetNotesState() {
  budgetNotesState = getDefaultBudgetNotesState();
  storeBudgetNotesState();
  syncBudgetNotesUI();
}

function bindBudgetNotesUI() {
  if (!budgetNotesCard || !budgetDaysNode) {
    return;
  }

  budgetResetButtons.forEach((button) => {
    if (button.dataset.budgetBound === "true") {
      return;
    }

    button.addEventListener("click", () => {
      resetBudgetNotesState();
    });

    button.dataset.budgetBound = "true";
  });

  if (budgetTravelersInput && budgetTravelersInput.dataset.budgetBound !== "true") {
    const commitTravelerCount = () => {
      const parsedValue = Number.parseInt(budgetTravelersInput.value, 10);
      if (Number.isNaN(parsedValue)) {
        syncBudgetControlsUI();
        return;
      }

      commitBudgetSettings({ travelers: parsedValue });
    };

    budgetTravelersInput.addEventListener("input", commitTravelerCount);
    budgetTravelersInput.addEventListener("blur", () => {
      syncBudgetControlsUI();
    });
    budgetTravelersInput.dataset.budgetBound = "true";
  }

  if (budgetIncludeExtrasInput && budgetIncludeExtrasInput.dataset.budgetBound !== "true") {
    budgetIncludeExtrasInput.addEventListener("change", () => {
      commitBudgetSettings({ includeExtras: budgetIncludeExtrasInput.checked });
    });
    budgetIncludeExtrasInput.dataset.budgetBound = "true";
  }

  if (budgetDaysNode.dataset.budgetBound === "true") {
    return;
  }

  budgetDaysNode.addEventListener("input", (event) => {
    const noteField = event.target.closest?.("[data-budget-note]");
    if (!noteField) {
      return;
    }

    const sectionId = noteField.closest("[data-budget-section]")?.dataset.budgetSection;
    if (!sectionId) {
      return;
    }

    commitBudgetSectionState(sectionId, {
      note: noteField.value
    });
  });

  budgetDaysNode.dataset.budgetBound = "true";
}

function initializeBudgetNotes() {
  if (!budgetNotesCard || !budgetSummaryNode || !budgetBreakdownNode || !budgetDaysNode) {
    return;
  }

  if (!budgetNotesInitialized) {
    budgetNotesState = readStoredBudgetNotesState();
    budgetNotesInitialized = true;
  }

  if (budgetNotesCard.dataset.budgetRendered !== "true") {
    renderBudgetNotes();
    budgetNotesCard.dataset.budgetRendered = "true";
  }

  bindBudgetNotesUI();
  syncBudgetNotesUI();
}

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
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0
    }).format(Math.round(Number(amount) || 0));
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
    }${itineraryBudgetLabels.rangeCompactPrefix.en} ${formatCurrency(
      getBudgetRangeValue(range, "lean")
    )} • ${itineraryBudgetLabels.rangeCompactSuffix.en} ${formatCurrency(
      getBudgetRangeValue(range, "high")
    )}`,
    ja: `${
      available
        ? `${itineraryBudgetLabels.rangeAvailablePrefix.ja}: `
        : ""
    }${itineraryBudgetLabels.rangeCompactPrefix.ja} ${formatCurrency(
      getBudgetRangeValue(range, "lean")
    )} ・ ${itineraryBudgetLabels.rangeCompactSuffix.ja} ${formatCurrency(
      getBudgetRangeValue(range, "high")
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
            en: `${itineraryBudgetLabels.rangeAvailablePrefix.en}: ${formatCurrency(
              getBudgetRangeValue(range, "expected")
            )}`,
            ja: `${itineraryBudgetLabels.rangeAvailablePrefix.ja}: ${formatCurrency(
              getBudgetRangeValue(range, "expected")
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
      .filter(Boolean);
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
  const hasChanges = () => {
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
  const getTravelerCount = () =>
    normalizeTravelerCount(budgetNotesState.travelers, budgetDefaultTravelerCount);
  const getStoredCustomShareCount = (travelers = getTravelerCount()) =>
    normalizeShareCount(budgetNotesState.accommodationShareCount, travelers);
  const getAccommodationShareMode = () =>
    normalizeShareMode(
      budgetNotesState.accommodationShareMode,
      budgetAccommodationShareModeDefault
    );
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
  const includeExtras = () => budgetNotesState.includeExtras === true;
  const getDayState = (day) => {
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
  const visibleDays = () =>
    budgetDayDefinitions.filter((definition) => !definition.optional || areOptionalDaysUnlocked());
  const optionalDays = () => budgetDayDefinitions.filter((definition) => definition.optional);
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
      if (item.accommodationShare.shareCount <= 1) {
        return {
          en: `Stay total ${formatCurrency(item.accommodationShare.total)} · not shared`,
          ja: `宿泊合計 ${formatCurrency(item.accommodationShare.total)} ・ 分割なし`
        };
      }

      return {
        en: `Stay total ${formatCurrency(item.accommodationShare.total)} · split by ${
          item.accommodationShare.shareCount
        } = ${formatCurrency(item.accommodationShare.perPersonTotal)} pp`,
        ja: `宿泊合計 ${formatCurrency(item.accommodationShare.total)} ・ ${
          item.accommodationShare.shareCount
        }人で分割 = 1人 ${formatCurrency(item.accommodationShare.perPersonTotal)}`
      };
    }

    if (itemCost.mode === "perPerson") {
      return {
        en: `${formatCurrency(itemCost.amount)} x ${itemCost.quantity} traveler${
          itemCost.quantity === 1 ? "" : "s"
        }`,
        ja: `${formatCurrency(itemCost.amount)} x ${itemCost.quantity}人`
      };
    }

    if (itemCost.mode === "perRoom") {
      return {
        en: `${formatCurrency(itemCost.amount)} x ${itemCost.quantity} room${
          itemCost.quantity === 1 ? "" : "s"
        }${itemCost.roomCapacity ? ` (up to ${itemCost.roomCapacity} guests)` : ""}`,
        ja: `${formatCurrency(itemCost.amount)} x ${itemCost.quantity}室${
          itemCost.roomCapacity ? `（${itemCost.roomCapacity}人定員）` : ""
        }`
      };
    }

    if (itemCost.mode === "perPair") {
      return {
        en: `${formatCurrency(itemCost.amount)} x ${itemCost.quantity} shared item${
          itemCost.quantity === 1 ? "" : "s"
        }`,
        ja: `${formatCurrency(itemCost.amount)} x ${itemCost.quantity}件`
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
    const optionalDayAddOnEstimates = optionalDays()
      .filter((definition) => !activeDays.some((visible) => visible.day === definition.day))
      .map((definition) => calculateDay(definition));

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
    const optionalDaysAddOnTotal = optionalDayAddOnEstimates.reduce((sum, day) => sum + day.total, 0);
    const optionalDaysAddOnRange = optionalDayAddOnEstimates.reduce(
      (sum, day) => sumBudgetRanges(sum, day.totalRange),
      getZeroBudgetRange()
    );
    const optionalVisibleTotal = visibleDayEstimates
      .filter((day) => day.optional)
      .reduce((sum, day) => sum + day.total, 0);
    const optionalVisibleRange = visibleDayEstimates
      .filter((day) => day.optional)
      .reduce((sum, day) => sumBudgetRanges(sum, day.totalRange), getZeroBudgetRange());
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
      optionalDayAddOnEstimates,
      total,
      totalRange,
      perPerson: getBudgetRangeValue(perPersonRange, "expected"),
      perPersonRange,
      optionalDaysAddOnTotal,
      optionalDaysAddOnRange,
      optionalVisibleTotal,
      optionalVisibleRange,
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
    const optionalDaysUnlocked = areOptionalDaysUnlocked();
    const optionalDayCount = estimate.visibleDayEstimates.filter((day) => day.optional).length;
    const optionalDaysRange = optionalDaysUnlocked
      ? estimate.optionalVisibleRange
      : estimate.optionalDaysAddOnRange;
    const shareModeLabel = getShareModeLabel(estimate.accommodationShareMode);
    const summaryCards = [
      {
        className: "budget-summary-card budget-summary-card--estimate budget-summary-card--compact",
        label: optionalDaysUnlocked
          ? itineraryBudgetLabels.summaryTotalUnlocked
          : itineraryBudgetLabels.summaryTotalLocked,
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
          { en: `stay split: ${shareModeLabel.en}`, ja: `宿泊費の分け方: ${shareModeLabel.ja}` },
          {
            en: "private/local or no-cost Osaka stays stay at JPY 0 unless you switch them",
            ja: "大阪のローカル・プライベート滞在や宿泊費なしは切り替えない限り0円のままです"
          }
        ])
      },
      {
        className: "budget-summary-card budget-summary-card--accommodation budget-summary-card--compact",
        label: itineraryBudgetLabels.summaryAccommodationSplit,
        range: estimate.accommodationPerPersonRange,
        meta:
          hasBudgetRangeValue(estimate.accommodationTotalRange)
            ? joinLocalizedSegments([
                { en: shareModeLabel.en, ja: shareModeLabel.ja },
                {
                  en: `split by ${estimate.accommodationShareCount}`,
                  ja: `${estimate.accommodationShareCount}人で分割`
                },
                getRangeMetaCopy(estimate.accommodationTotalRange)
              ])
            : itineraryBudgetLabels.noPaidAccommodationMeta
      },
      {
        className: "budget-summary-card budget-summary-card--shared budget-summary-card--compact",
        label: itineraryBudgetLabels.summaryBookedRequired,
        range: estimate.bookedAndFixedTotalRange,
        meta: itineraryBudgetLabels.bookedRequiredMeta
      },
      {
        className: "budget-summary-card budget-summary-card--optional budget-summary-card--compact",
        label: optionalDaysUnlocked
          ? itineraryBudgetLabels.summaryOptionalUnlocked
          : itineraryBudgetLabels.summaryOptionalLocked,
        range: optionalDaysRange,
        meta: optionalDaysUnlocked
          ? joinLocalizedSegments([
              {
                en: `${optionalDayCount} optional day${optionalDayCount === 1 ? "" : "s"} in the live total`,
                ja: `追加日 ${optionalDayCount}日 を合計へ反映`
              },
              estimate.includeExtras
                ? { en: "Route extras enabled separately", ja: "追加費用も反映中" }
                : {
                    en: "Route extras still stay outside the base total unless enabled",
                    ja: "追加費用は有効にするまで基本合計へ入りません"
                  }
            ])
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
  const renderBreakdownMarkup = (estimate = calculateEstimate()) => `
    <div class="budget-breakdown-grid">
      ${budgetCategoryDefinitions
        .map((definition) => {
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
            <article class="budget-breakdown-card">
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
        })
        .join("")}
    </div>
    <div class="budget-breakdown-pills">
      ${["booked", "required", "flexible", "optional"]
        .map((bucketId) => {
          const total =
            bucketId === "optional" && !estimate.includeExtras
              ? itineraryBudgetLabels.optionalInactive
              : {
                  en: formatCurrency(estimate.bucketTotals[bucketId] || 0),
                  ja: formatCurrency(estimate.bucketTotals[bucketId] || 0)
                };

          return `
            <span class="budget-breakdown-pill budget-breakdown-pill--${bucketId}">
              ${renderLocalizedContent(getBucketLabel(bucketId))} · ${renderLocalizedContent(total)}
            </span>
          `;
        })
        .join("")}
    </div>
  `;
  const renderSourceMetaMarkup = () => `
    <article class="budget-source-meta-card">
      <p class="budget-source-meta-card__label">${renderLocalizedContent(
        itineraryBudgetLabels.itineraryBasis
      )}</p>
      <p class="budget-source-meta-card__body">${renderLocalizedContent(getAssumptionCopy())}</p>
      ${
        getSourceMetaCopy()
          ? `<p class="budget-source-meta-card__body">${renderLocalizedContent(
              getSourceMetaCopy()
            )}</p>`
          : ""
      }
      ${
        getSourceHelperCopy()
          ? `<p class="budget-source-meta-card__body">${renderLocalizedContent(
              getSourceHelperCopy()
            )}</p>`
          : ""
      }
      <div class="budget-range-legend">
        <p class="budget-source-meta-card__label">${renderLocalizedContent(
          itineraryBudgetLabels.rangeLegendTitle
        )}</p>
        ${budgetRangeLevels
          .map((definition) => {
            const copy =
              definition.id === "lean"
                ? itineraryBudgetLabels.rangeLegendLean
                : definition.id === "high"
                  ? itineraryBudgetLabels.rangeLegendHigh
                  : itineraryBudgetLabels.rangeLegendExpected;
            return `
              <div class="budget-range-legend__item">
                <span class="budget-pill ${definition.pillClass}">${renderLocalizedContent(
                  definition.label
                )}</span>
                <p class="budget-range-legend__copy">${renderLocalizedContent(copy)}</p>
              </div>
            `;
          })
          .join("")}
      </div>
      <p class="budget-source-meta-card__body">${renderLocalizedContent(
        itineraryBudgetLabels.rangeLegendOptionalDays
      )}</p>
      <p class="budget-source-meta-card__body">${renderLocalizedContent(
        itineraryBudgetLabels.notesLinkHubMeta
      )}</p>
      <p class="budget-source-meta-card__body">${renderLocalizedContent(getSourceUpdatedCopy())}</p>
    </article>
  `;
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
        <label class="budget-day-card__stay-field">
          <span class="budget-day-card__stay-label">${renderLocalizedContent(
            itineraryBudgetLabels.stayLabel
          )}</span>
          <select
            class="budget-day-card__stay-select"
            data-budget-stay-select="${dayEstimate.day}"
            aria-label="${escapeHtml(getLocalizedText(itineraryBudgetLabels.stayLabel))}">
            ${stayOptions
              .map((stayOption) => {
                const optionLabel = `${getLocalizedText(stayOption.label)} · ${getLocalizedText(
                  getStayTypeLabel(stayOption.type)
                )}`;
                return `<option value="${escapeHtml(stayOption.id)}" ${
                  stayOption.id === selectedStayId ? "selected" : ""
                }>${escapeHtml(optionLabel)}</option>`;
              })
              .join("")}
          </select>
          ${stayMetaMarkup}
          ${stayRouteMarkup}
          <p class="budget-day-card__stay-hint">${renderLocalizedContent(
            getStayHintCopy(dayEstimate.stayDefinition)
          )}</p>
        </label>
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
                  ? { en: formatCurrency(item.lineTotal), ja: formatCurrency(item.lineTotal) }
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
      <article class="budget-notes__empty">
        <p>${renderLocalizedContent(itineraryBudgetLabels.statusReady)}</p>
        <p>${renderLocalizedContent({
          en: `${estimate.travelers} traveler${estimate.travelers === 1 ? "" : "s"} • ${
            areOptionalDaysUnlocked() ? "Optional Days 8-9 included" : "Days 8-9 still separate"
          }`,
          ja: `${estimate.travelers}人 ・ ${
            areOptionalDaysUnlocked() ? "追加の8日目と9日目を含む" : "8日目と9日目は別枠"
          }`
        })}</p>
        <p>${renderLocalizedContent(itineraryBudgetLabels.statusMeta)}</p>
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
    budgetSummaryNode.innerHTML = renderSummaryMarkup(estimate);
    budgetBreakdownNode.innerHTML = renderBreakdownMarkup(estimate);
    budgetDaysNode.innerHTML = estimate.visibleDayEstimates.map((day) => renderDayMarkup(day)).join("");

    if (budgetSourceMetaNode) {
      budgetSourceMetaNode.innerHTML = renderSourceMetaMarkup();
    }

    if (budgetSourcesNode) {
      budgetSourcesNode.innerHTML = "";
      budgetSourcesNode.hidden = true;
    }

    [budgetSummaryNode, budgetBreakdownNode, budgetDaysNode, budgetSourceMetaNode, budgetSourcesNode]
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
      const staySelect = event.target.closest?.("[data-budget-stay-select]");
      if (!staySelect) {
        return;
      }

      const day = staySelect.dataset.budgetStaySelect;
      updateDayState(day, {
        ...getDayState(day),
        stayId: staySelect.value
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

    if (!budgetNotesInitialized) {
      budgetNotesState = readState();
      budgetNotesInitialized = true;
    }

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
  hasBudgetNotesChanges = hasChanges;
  storeBudgetNotesState = storeState;
  getBudgetTravelerCount = getTravelerCount;
  shouldIncludeBudgetExtras = includeExtras;
  getBudgetDayState = getDayState;
  updateStoredBudgetDayState = updateDayState;
  getBudgetVisibleDayDefinitions = visibleDays;
  getBudgetOptionalDayDefinitions = optionalDays;
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

function finishWelcome() {
  root.classList.remove("intro-pending", "intro-out");
  root.classList.add("intro-done");
  if (welcomeOverlay) {
    welcomeOverlay.setAttribute("hidden", "");
  }
}

function scheduleWelcomeExit() {
  if (!welcomeOverlay || !root.classList.contains("intro-pending")) {
    finishWelcome();
    return;
  }

  try {
    window.sessionStorage.setItem(introSeenSessionKey, "1");
  } catch (error) {
    // Ignore session storage failures and keep the page usable.
  }

  window.requestAnimationFrame(() => {
    if (!root.classList.contains("intro-pending")) {
      return;
    }

    root.classList.add("intro-out");
    window.setTimeout(finishWelcome, introExitDurationMs + 40);
  });
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

function setHeaderCondensed(nextState) {
  if (!siteHeader || headerIsCondensed === nextState) {
    return false;
  }

  headerIsCondensed = nextState;
  siteHeader.classList.toggle("is-condensed", nextState);
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

function areOptionalDaysUnlocked() {
  return optionalDaysUnlocked;
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
  const likelyNextSections = initialSection === "overview" ? ["checklist"] : ["overview"];
  const warm = () => {
    likelyNextSections.forEach((sectionName) => {
      void ensureSectionInitialized(sectionName);
    });
  };

  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(warm, { timeout: 1200 });
    return;
  }

  window.setTimeout(warm, 800);
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

  registerRevealBlocks(panel);
  initializeBudgetNotes();
}

function getLocalizedText(content) {
  return root.lang === "ja" ? content?.ja ?? content?.en ?? "" : content?.en ?? content?.ja ?? "";
}

function getRouteExplorerViewById(viewId) {
  return (
    routeExplorerViewDefinitions.find(
      (view) => view.id === viewId && (!view.optional || optionalDaysUnlocked)
    ) || null
  );
}

function getRouteExplorerSegmentById(segmentId) {
  return routeExplorerSegmentMap.get(segmentId) || null;
}

function getVisibleRouteDayLinks(dayLinks = []) {
  return dayLinks.filter((link) => !link.optional || optionalDaysUnlocked);
}

function createRouteMapState() {
  return {
    ready: false,
    failed: false,
    promise: null,
    map: null,
    markers: [],
    markerStateKey: ""
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

function setRouteMapShellState(state = "ready") {
  [routeMapPreviewNode, routeMapInteractive].filter(Boolean).forEach((node) => {
    node.setAttribute("data-map-state", state);
  });
}

function setRouteMapDisplayState(mode = "preview") {
  routeMapDisplayMode = mode === "interactive" ? "interactive" : "preview";
  routeMapCard?.setAttribute("data-route-map-active-mode", routeMapDisplayMode);
  routeMapPreviewNode?.setAttribute("data-route-map-mode", routeMapDisplayMode);
  routeMapInteractive?.setAttribute("data-route-map-mode", routeMapDisplayMode);
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
    stopIds,
    optionalDaysUnlocked ? "optional" : "base"
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

function hasRouteMapWebGLSupport() {
  if (typeof hasRouteMapWebGLSupport.cached === "boolean") {
    return hasRouteMapWebGLSupport.cached;
  }

  try {
    const canvas = document.createElement("canvas");
    hasRouteMapWebGLSupport.cached = Boolean(
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl")
    );
  } catch (error) {
    hasRouteMapWebGLSupport.cached = false;
  }

  return hasRouteMapWebGLSupport.cached;
}

function loadRouteMapLibrary() {
  if (window.maplibregl) {
    return Promise.resolve(window.maplibregl);
  }

  if (routeMapLibraryPromise) {
    return routeMapLibraryPromise;
  }

  routeMapLibraryPromise = new Promise((resolve, reject) => {
    if (!document.querySelector("[data-route-maplibre-style]")) {
      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = routeMapLibraryStyleUrl;
      styleLink.setAttribute("data-route-maplibre-style", "true");
      document.head.append(styleLink);
    }

    const finishLoad = () => {
      if (window.maplibregl) {
        resolve(window.maplibregl);
        return;
      }

      reject(new Error("MapLibre runtime did not initialize."));
    };

    const failLoad = () => {
      reject(new Error("MapLibre assets failed to load."));
    };

    const existingScript = document.querySelector("[data-route-maplibre-script]");
    if (existingScript) {
      existingScript.addEventListener("load", finishLoad, { once: true });
      existingScript.addEventListener("error", failLoad, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = routeMapLibraryScriptUrl;
    script.defer = true;
    script.setAttribute("data-route-maplibre-script", "true");
    script.addEventListener("load", finishLoad, { once: true });
    script.addEventListener("error", failLoad, { once: true });
    document.head.append(script);
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

function getRouteMapBaseStyleUrl() {
  return routeMapOpenFreeMapStyleUrl;
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

function renderRouteMapFilters(selectionState) {
  if (!routeMapFiltersNode) {
    return;
  }

  const filtersMarkup = routeExplorerViewDefinitions
    .filter((view) => !view.optional || optionalDaysUnlocked)
    .map((view) => {
      const isActive = selectionState.type === "view" && selectionState.config.id === view.id;
      const ariaLabelEn = `Show ${view.title.en}`;
      const ariaLabelJa = `${view.title.ja}を表示`;

      return `
        <button
          class="booking-transit__filter route-map__filter ${isActive ? "is-active" : ""}"
          type="button"
          data-route-map-filter="${escapeHtml(view.id)}"
          aria-pressed="${String(isActive)}"
          data-aria-label-en="${escapeHtml(ariaLabelEn)}"
          data-aria-label-ja="${escapeHtml(ariaLabelJa)}"
          aria-label="${escapeHtml(getLocalizedText({ en: ariaLabelEn, ja: ariaLabelJa }))}">
          ${renderLocalizedContent(view.label)}
        </button>
      `;
    })
    .join("");

  setLocalizedMarkupIfChanged(routeMapFiltersNode, filtersMarkup);
}

function renderRouteMapStops(selectionState) {
  const stopsNode = getRouteMapStopsNode();
  if (!stopsNode) {
    return;
  }

  const stopsMarkup = routeExplorerStopDefinitions
    .map((stop) => {
      const isSelected = selectionState.type === "stop" && selectionState.config.id === stop.id;
      const isRelated = !isSelected && selectionState.stopIds.has(stop.id);
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

function renderRouteMapDayButton(link) {
  const label = { en: `Day ${link.day}`, ja: `${link.day}日目` };
  const ariaLabel = {
    en: `Jump to Day ${link.day} checklist`,
    ja: `${link.day}日目のチェックリストへ移動`
  };

  return `
    <button
      class="packing-section__action route-reference__day-button"
      type="button"
      data-route-map-day="${escapeHtml(link.day)}"
      data-aria-label-en="${escapeHtml(ariaLabel.en)}"
      data-aria-label-ja="${escapeHtml(ariaLabel.ja)}"
      aria-label="${escapeHtml(getLocalizedText(ariaLabel))}">
      ${renderLocalizedContent(label)}
    </button>
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
  const badgesMarkup = (config.badges || [])
    .map((badge) => `<span class="route-reference__pill">${renderLocalizedContent(badge)}</span>`)
    .join("");
  const notesMarkup = (config.notes || [])
    .map((note) => `<li class="route-reference__list-item">${renderLocalizedContent(note)}</li>`)
    .join("");
  const daysMarkup = visibleDayLinks.length
    ? `
        <section class="route-reference__group">
          <p class="route-reference__group-label">${renderLocalizedContent(routeMapLabels.days)}</p>
          <div class="route-reference__group-actions route-reference__group-actions--days">
            ${visibleDayLinks.map((link) => renderRouteMapDayButton(link)).join("")}
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
      <p class="section-tag section-tag--route">
        ${renderLocalizedContent(
          selectionState.type === "stop"
            ? routeMapLabels.stopTag
            : selectionState.type === "segment"
              ? routeMapLabels.segmentTag
              : selectionState.config.label
        )}
      </p>
      <h4 class="route-reference__title">${renderLocalizedContent(config.title)}</h4>
      <p class="route-reference__summary">${renderLocalizedContent(config.summary)}</p>
    </div>
    ${badgesMarkup ? `<div class="route-reference__pills">${badgesMarkup}</div>` : ""}
    ${notesMarkup ? `<ul class="route-reference__list">${notesMarkup}</ul>` : ""}
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

function updateRouteMapMarkerElement(entry, selectionState, interactive = getRouteMapDisplayMode() === "interactive") {
  if (!entry?.element || !entry.labelNode) {
    return;
  }

  const stop = entry.stop;
  const isActive = selectionState.type === "stop" && selectionState.config.id === stop.id;
  const isRelated = !isActive && selectionState.stopIds.has(stop.id);
  const isDimmed = selectionState.stopIds.size > 0 && !isActive && !isRelated;
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

      const entry = createRouteMapMarkerElement(stop, interactive);
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
  const markerStateKey = `${root.lang}|${getRouteMapSelectionSignature(selectionState)}|${getRouteMapDisplayMode()}`;
  if (routeMapState.markerStateKey === markerStateKey) {
    return;
  }

  routeMapState.markers.forEach((entry) => {
    updateRouteMapMarkerElement(entry, selectionState);
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
  routeMapActivePopupSelectionKey = "";
}

function renderRouteMapPopup(selectionState) {
  const days = getVisibleRouteDayLinks(selectionState.config.dayLinks || []);
  const daysCopy = days.length
    ? {
        en: days.map((dayLink) => `Day ${dayLink.day}`).join(" • "),
        ja: days.map((dayLink) => `${dayLink.day}日目`).join("・")
      }
    : null;

  return `
    <div class="route-map-popup">
      <p class="route-map-popup__eyebrow">
        ${renderLocalizedContent(
          selectionState.type === "stop" ? routeMapLabels.stopTag : routeMapLabels.segmentTag
        )}
      </p>
      <h4 class="route-map-popup__title">${renderLocalizedContent(selectionState.config.title)}</h4>
      ${daysCopy ? `<p class="route-map-popup__meta">${renderLocalizedContent(daysCopy)}</p>` : ""}
    </div>
  `;
}

function syncRouteMapPopup(selectionState) {
  if (
    getRouteMapDisplayMode() !== "interactive" ||
    !routeMapState.ready ||
    !routeMapState.map ||
    selectionState.type === "view"
  ) {
    clearRouteMapPopup();
    return;
  }

  const popupSelectionKey = getRouteMapSelectionSignature(selectionState);
  if (routeMapActivePopup && routeMapActivePopupSelectionKey === popupSelectionKey) {
    return;
  }

  clearRouteMapPopup();

  const coordinates =
    selectionState.type === "stop"
      ? getRouteStopLngLat(selectionState.config.id)
      : getRouteMapCoordinatesForSelection(selectionState);
  const popupLngLat = Array.isArray(coordinates?.[0])
    ? [
        (coordinates[0][0] + coordinates[coordinates.length - 1][0]) / 2,
        (coordinates[0][1] + coordinates[coordinates.length - 1][1]) / 2
      ]
    : coordinates;

  if (!Array.isArray(popupLngLat) || popupLngLat.length !== 2) {
    return;
  }

  routeMapActivePopup = new window.maplibregl.Popup({
    closeButton: false,
    closeOnClick: false,
    closeOnMove: false,
    offset: 18,
    className: "route-map-popup-anchor"
  })
    .setLngLat(popupLngLat)
    .setHTML(renderRouteMapPopup(selectionState))
    .addTo(routeMapState.map);

  syncLocalizedNodes(routeMapActivePopup.getElement());
  routeMapActivePopupSelectionKey = popupSelectionKey;
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
    if (getRouteMapDisplayMode() !== "interactive") {
      return;
    }
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "route-map-segments-hit", () => {
    map.getCanvas().style.cursor = "";
  });

  map.on("click", "route-map-segments-hit", (event) => {
    if (getRouteMapDisplayMode() !== "interactive") {
      return;
    }

    const segmentId = event.features?.[0]?.properties?.id;
    if (!segmentId) {
      return;
    }

    activeRouteMapSelection = { type: "segment", id: segmentId };
    scheduleRouteMapUISync({ updateCamera: true, animateCamera: true });
  });

  map.__routeMapEventsBound = true;
}

function syncRouteMapOpenButtons(isOpen = false) {
  routeMapOpenButtons.forEach((button) => {
    button.setAttribute("aria-expanded", String(Boolean(isOpen)));
  });
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

  syncRouteMapMarkers(selectionState);

  if (!routeMapState.ready || !routeMapState.map) {
    return;
  }

  syncRouteMapSelectionLayers(routeMapState.map, selectionState);
  setRouteMapInteractionState(routeMapState.map, getRouteMapDisplayMode() === "interactive");

  if (getRouteMapDisplayMode() !== "interactive") {
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

function ensureRouteMapReady() {
  const previewConfig = getRouteMapDisplayConfig("preview");

  if (!routeMapPreviewCanvas) {
    return Promise.resolve(null);
  }

  if (routeMapState.ready) {
    return Promise.resolve(routeMapState.map);
  }

  if (routeMapState.promise) {
    return routeMapState.promise;
  }

  setRouteMapStatus(routeMapPreviewStatusNode, previewConfig.loadingTitle, previewConfig.loadingBody, "loading");
  setRouteMapShellState("loading");

  routeMapState.promise = (async () => {
    if (!hasRouteMapWebGLSupport()) {
      throw new Error("WebGL is unavailable.");
    }

    const maplibregl = await loadRouteMapLibrary();
    routeMapState.map = new maplibregl.Map({
      container: routeMapPreviewCanvas,
      style: getRouteMapBaseStyleUrl(),
      ...routeMapBaseOptions
    });

    await new Promise((resolve) => {
      routeMapState.map.once("load", resolve);
    });

    ensureRouteMapAttributionControl(routeMapState.map);
    ensureRouteMapOverlayStyle(routeMapState.map);
    bindRouteMapInteractiveEvents(routeMapState.map);

    routeMapState.markers = clearRouteMapMarkers(routeMapState.markers);
    routeMapState.markers = installRouteMapMarkers(routeMapState.map);
    routeMapState.ready = true;
    routeMapState.failed = false;
    routeMapState.map.resize();
    applyRouteMapPaintTheme(routeMapState.map);
    setRouteMapInteractionState(routeMapState.map, false);
    syncRouteMapUI({ resetOverview: true });
    clearRouteMapStatus(routeMapPreviewStatusNode);
    setRouteMapShellState("ready");

    return routeMapState.map;
  })()
    .catch(() => {
      routeMapState.failed = true;
      routeMapState.ready = false;
      routeMapState.markers = clearRouteMapMarkers(routeMapState.markers);
      if (routeMapState.map) {
        routeMapState.map.remove();
        routeMapState.map = null;
      }
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

function ensureRouteMapInteractiveReady() {
  ensureRouteMapInitialized();
  return ensureRouteMapReady();
}

function syncRouteMapUI(options = {}) {
  const { updateCamera = false, animateCamera = false, resetOverview = false } = options;
  const selectionState = getRouteMapSelectionState();

  renderRouteMapFilters(selectionState);
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
  if (!routeMapState.ready || !routeMapState.map) {
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
  setRouteMapDisplayState(routeMapInteractive && !routeMapInteractive.hidden ? "interactive" : "preview");
  syncRouteMapUI({ resetOverview: !routeMapInteractive || routeMapInteractive.hidden });
}

function setRouteMapOpen(isOpen, { restoreFocus = false } = {}) {
  if (!routeMapInteractive) {
    return;
  }

  routeMapInteractive.hidden = !isOpen;
  routeMapCard?.classList.toggle("is-route-map-open", isOpen);
  syncRouteMapOpenButtons(isOpen);
  setRouteMapDisplayState(isOpen ? "interactive" : "preview");

  if (isOpen) {
    ensureRouteMapInitialized();
    void ensureRouteMapReady().then(() => {
      syncRouteMapUI({ updateCamera: true, animateCamera: false });
      window.requestAnimationFrame(() => {
        resizeRouteMapsIfReady();
      });
    });
    return;
  }

  clearRouteMapPopup();
  syncRouteMapUI({ resetOverview: true });

  if (!isOpen && restoreFocus && lastRouteMapTrigger && document.contains(lastRouteMapTrigger)) {
    lastRouteMapTrigger.focus();
  }
}

function handleRouteMapClick(event) {
  const openTrigger = event.target.closest("[data-route-map-open]");
  if (openTrigger) {
    event.preventDefault();
    lastRouteMapTrigger = openTrigger;
    ensureRouteMapInitialized();
    setRouteMapOpen(true);
    void ensureRouteMapInteractiveReady();
    return;
  }

  const closeTrigger = event.target.closest("[data-route-map-close]");
  if (closeTrigger) {
    event.preventDefault();
    setRouteMapOpen(false, { restoreFocus: true });
    return;
  }

  const filterTrigger = event.target.closest("[data-route-map-filter]");
  if (filterTrigger) {
    event.preventDefault();
    activeRouteMapSelection = { type: "view", id: filterTrigger.dataset.routeMapFilter || "" };
    scheduleRouteMapUISync({ updateCamera: true, animateCamera: true });
    return;
  }

  const stopTrigger = event.target.closest("[data-route-map-stop]");
  if (stopTrigger) {
    event.preventDefault();
    activeRouteMapSelection = { type: "stop", id: stopTrigger.dataset.routeMapStop || "" };
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
  syncRouteMapOpenButtons(routeMapInteractive ? !routeMapInteractive.hidden : false);
  setRouteMapDisplayState(routeMapInteractive && !routeMapInteractive.hidden ? "interactive" : "preview");

  if (!routeMapState.ready && !routeMapState.failed) {
    window.requestAnimationFrame(() => {
      void ensureRouteMapPreviewReady();
    });
  } else {
    refreshRouteMapsIfReady({ updateCamera: getRouteMapDisplayMode() === "interactive" });
  }

  if (routeMapInteractive && !routeMapInteractive.hidden) {
    void ensureRouteMapInteractiveReady();
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
      ? `${requiredDay}日目を完了すると次の行程へ進めます。`
      : `Complete Day ${requiredDay} to unlock the next step of your trip.`;

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
  const totalDays = areOptionalDaysUnlocked() ? 9 : 7;
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

function setOptionalPromptFeedback(isVisible) {
  if (!optionalPromptFeedback) {
    return;
  }

  if (!isVisible) {
    optionalPromptFeedback.hidden = true;
    optionalPromptFeedback.textContent = "";
    optionalPrompt?.classList.remove("is-confirmed");
    return;
  }

  optionalPromptFeedback.hidden = false;
  optionalPromptFeedback.textContent =
    root.lang === "ja" ? "追加日程を追加しました" : "Optional days added";
  optionalPrompt?.classList.add("is-confirmed");
}

function setOptionalPromptButtonsDisabled(isDisabled) {
  optionalUnlockButtons.forEach((button) => {
    button.disabled = isDisabled;
  });

  if (optionalSkipButton) {
    optionalSkipButton.disabled = isDisabled;
  }
}

function syncOptionalDaysUI() {
  const canOfferOptionalDays = completedHistoryDays.has("7");

  optionalProgressItems.forEach((item) => {
    item.hidden = !optionalDaysUnlocked;
  });

  optionalSectionNodes.forEach((node) => {
    node.hidden = !optionalDaysUnlocked;
  });

  if (!optionalPrompt) {
    return;
  }

  const showPrompt = canOfferOptionalDays && !optionalDaysUnlocked && !optionalPromptDeferred;
  optionalPrompt.hidden = !showPrompt;

  if (!showPrompt) {
    optionalPromptIsCompact = false;
    setOptionalPromptFeedback(false);
    setOptionalPromptButtonsDisabled(false);
  }

  if (optionalPromptExpanded) {
    optionalPromptExpanded.hidden = !showPrompt;
  }

  if (optionalPromptCompact) {
    optionalPromptCompact.hidden = true;
  }

  refreshBudgetNotesIfReady();
  if (routeMapInitialized || initializedSections.has("route")) {
    scheduleRouteMapUISync();
  }
  scheduleDayCardRowHeights();
}

function scheduleDayCardRowHeights() {
  // The equal-height day-card pass was removed. Keep the hook so older callers
  // do not trigger a full grid walk and inline-style write on every resize/update.
}

function unlockOptionalDays() {
  optionalDaysUnlocked = true;
  optionalPromptIsCompact = false;
  optionalPromptDeferred = false;
  storeBoolean(optionalDaysUnlockedStorageKey, true);
  setOptionalPromptButtonsDisabled(false);
  setOptionalPromptFeedback(false);
  syncOptionalDaysUI();
  refreshChecklistProgressState();
  syncProgressTimeline();
  refreshRouteMapsIfReady({ updateCamera: true });
  animateUnlock(progressItemMap.get("8"));
  animateUnlock(dayCardMap.get("8"));

  optionalSectionNodes.forEach((node, index) => {
    if (!node.classList.contains("reveal-block")) {
      return;
    }

    node.classList.remove("is-visible");
    node.style.setProperty("--reveal-delay", `${index * 70}ms`);
  });

  window.requestAnimationFrame(() => {
    optionalSectionNodes.forEach((node) => {
      if (!node.classList.contains("reveal-block")) {
        return;
      }

      node.classList.add("is-visible");

      if (revealObserver) {
        revealObserver.observe(node);
      }
    });
    lastTimelineFocusDay = null;
  });
}

function confirmOptionalDaysUnlock() {
  if (optionalDaysUnlocked) {
    return;
  }

  optionalPromptDeferred = false;
  setOptionalPromptButtonsDisabled(false);
  setOptionalPromptFeedback(false);
  unlockOptionalDays();
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
  optionalDaysUnlocked = false;
  optionalPromptDeferred = false;
  optionalPromptIsCompact = false;
  accessibleDay = 1;
  currentProgressDay = 1;
  lastTimelineFocusDay = null;

  storeChecklistState();
  storeDaySet(completedHistoryStorageKey, completedHistoryDays);
  storeBoolean(optionalDaysUnlockedStorageKey, false);
  resetBookingTransitState();

  window.clearTimeout(sequenceNoticeTimer);
  if (sequenceNotice) {
    sequenceNotice.hidden = true;
    sequenceNotice.classList.remove("is-visible");
  }

  setOptionalPromptFeedback(false);
  setOptionalPromptButtonsDisabled(false);
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
      const isLocked = !nextUnlockedDays.has(dayKey);
      const isWarning = nextWarningDays.has(dayKey);
      const isCurrent = dayKey === String(nextCurrentDay);

      card.style.setProperty("--day-progress", String(progressRatio));
      card.setAttribute("data-day-progress", String(Math.round(progressRatio * 100)));
      card.classList.toggle("is-complete", isComplete);
      card.classList.toggle("is-warning-day", isWarning);
      card.classList.toggle("is-current-day", isCurrent && !isComplete);
      card.classList.toggle("is-locked-day", isLocked);
      card.setAttribute("aria-disabled", String(isLocked));
      getDayInputs(card).forEach((input) => {
        input.disabled = isLocked;
      });
    });
  }

  progressItems.forEach((item) => {
    const dayKey = item.dataset.progressItem;
    const day = Number(item.dataset.progressItem);
    const card = dayCardMap.get(dayKey);
    const progressRatio = card ? getDayCompletionRatio(card) : 0;
    const isLocked = !nextUnlockedDays.has(dayKey);
    const isComplete = rawCompleted.has(dayKey);
    const isWarning = nextWarningDays.has(dayKey);
    const isActive = dayKey === String(nextCurrentDay) && !isLocked;
    const ratioNode = item.querySelector(".progress-item__ratio");
    const noticeNode = item.querySelector(".progress-item__notice");

    item.style.setProperty("--timeline-progress", String(progressRatio));
    item.classList.toggle("is-locked", isLocked);
    item.classList.toggle("is-unlocked", !isLocked);
    item.classList.toggle("is-complete", !isLocked && isComplete);
    item.classList.toggle("is-warning", isWarning);
    item.classList.toggle("is-partial", progressRatio > 0 && progressRatio < 1 && !isWarning);
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-disabled", String(isLocked));
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
      } else if (isLocked) {
        noticeNode.hidden = false;
        noticeNode.textContent = root.lang === "ja" ? "未解放" : "Locked";
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

  if (Number(day) === 7) {
    animateUnlock(progressItemMap.get("8"));
    animateUnlock(dayCardMap.get("8"));
  }

  if (Number(day) === 8) {
    animateUnlock(progressItemMap.get("9"));
    animateUnlock(dayCardMap.get("9"));
  }
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
  refreshChecklistProgressState();
  syncProgressTimeline();
  refreshRouteMapsIfReady();
  setOptionalPromptFeedback(false);
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
    if (
      panelId === "checklist" &&
      optionalPromptDeferred &&
      completedHistoryDays.has("7") &&
      !optionalDaysUnlocked
    ) {
      optionalPromptDeferred = false;
      syncOptionalDaysUI();
    }

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

  const maxVisibleDay = areOptionalDaysUnlocked() ? 9 : 7;
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
  optionalDaysUnlocked = readStoredBoolean(optionalDaysUnlockedStorageKey);
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

optionalUnlockButtons.forEach((button) => {
  button.addEventListener("click", () => {
    confirmOptionalDaysUnlock();
  });
});

if (optionalSkipButton) {
  optionalSkipButton.addEventListener("click", () => {
    optionalPromptDeferred = true;
    optionalPromptIsCompact = false;
    setOptionalPromptFeedback(false);
    setOptionalPromptButtonsDisabled(false);
    syncOptionalDaysUI();
  });
}

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

if (root.classList.contains("intro-pending")) {
  scheduleWelcomeExit();
} else if (welcomeOverlay) {
  welcomeOverlay.setAttribute("hidden", "");
}

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
