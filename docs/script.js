const languageButtons = document.querySelectorAll("[data-set-language]");
const themeButtons = document.querySelectorAll("[data-set-theme]");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const appleWebAppTitleMeta = document.querySelector('meta[name="apple-mobile-web-app-title"]');
const sectionTabs = Array.from(document.querySelectorAll("[data-panel-target]"));
const contentPanels = Array.from(document.querySelectorAll("[data-panel]"));
const siteHeader = document.querySelector(".site-header");
const headerAccessoryGroups = Array.from(document.querySelectorAll(".language-switcher, .theme-switcher"));
const mainContent = document.querySelector("#main-content");
const siteFooter = document.querySelector(".site-footer");
const siteIntro = document.querySelector("[data-site-intro]");
const siteTransition = document.querySelector("[data-site-transition]");
const sequenceNotice = document.querySelector("[data-sequence-notice]");
const checklistGateNotice = document.querySelector("[data-checklist-gate]");
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
const transitDetailContentNode = document.querySelector("[data-transit-detail-content]");
const transitDetailActionLink = document.querySelector("[data-transit-detail-action]");
const backToTopButtons = document.querySelectorAll("[data-back-to-top]");
const tripNotesGridNode = document.querySelector("[data-trip-notes-grid]");
const packingSectionCards = Array.from(document.querySelectorAll("[data-packing-section]"));
const checklistTab = sectionTabs.find((tab) => tab.dataset.panelTarget === "checklist") || null;
const packingMarkAllButtons = Array.from(document.querySelectorAll("[data-packing-mark-all-global]"));
const packingResetButtons = Array.from(document.querySelectorAll("[data-packing-reset-all]"));
const offlineToolsCard = document.querySelector("[data-offline-tools]");
const offlineStatusNode = document.querySelector("[data-offline-status]");
const offlineMetaNode = document.querySelector("[data-offline-meta]");
const offlineInstallButton = document.querySelector("[data-offline-install]");
const offlineDownloadLink = document.querySelector("[data-offline-download]");
const dayCardMap = new Map(dayCards.map((card) => [card.dataset.day, card]));
const progressItemMap = new Map(progressItems.map((item) => [item.dataset.progressItem, item]));
const root = document.documentElement;
const supportsNativeSmoothScroll = "scrollBehavior" in root.style;
const lazyNodeCache = new Map();
const aggressivePerformanceMode = false;
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
const compactViewportQuery = window.matchMedia("(max-width: 920px)");
const pageTitles = {
  en: "Japan Escape",
  ja: "日本旅行"
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
const offlineSnapshotUrl = "./japan-escape-itinerary-offline.html";
const serviceWorkerUrl = "./service-worker.js";
const offlineBundleVersion = "2026-03-28-offline-v23";
const appAssetConfigRuntimeGlobal = "__JAPAN_APP_ASSETS__";
const budgetUiRuntimeGlobal = "__JAPAN_BUDGET_UI__";
const budgetContentRuntimeGlobal = "__JAPAN_BUDGET_CONTENT__";
const essentialsContentRuntimeGlobal = "__JAPAN_ESSENTIALS_CONTENT__";
const sectionOpenSoundRuntimeGlobal = "__JAPAN_PLAY_SECTION_OPEN_SOUND__";
const routeMapLibraryScriptUrl = "./assets/vendor/maplibre/maplibre-gl.js";
const routeMapLibraryStyleUrl = "./assets/vendor/maplibre/maplibre-gl.css";
const budgetUiFallbackScriptUrl = "./budget-ui.min.js";
const budgetContentFallbackScriptUrl = "./budget-content.min.js";
const essentialsContentFallbackScriptUrl = "./essentials-content.min.js";
const routeContentRuntimeGlobal = "__JAPAN_ROUTE_CONTENT__";
const routeContentFallbackScriptUrl = "./route-content.min.js";
const routeStyleFallbackUrl = "./route.min.css";
const sectionOpenAudioFallbackUrl = "./assets/audio/opening.mp3";
const backgroundLoopAudioFallbackUrl = "./assets/audio/page-background-loop.mp3";
const transitionAudioFallbackUrl = "./assets/audio/transition.mp3";
const routeMapOriginUrl = "https://tiles.openfreemap.org";
const routeMapStyleUrl = "https://tiles.openfreemap.org/styles/positron";
const offlineSnapshotMode = root.hasAttribute("data-offline-snapshot");
const budgetDefaultTravelerCount = 2;
const budgetTravelerCountMin = 1;
const budgetTravelerCountMax = 24;
const budgetSharedRoomOccupancy = 2;
const budgetTravelersPerRoomDefault = budgetSharedRoomOccupancy;
const serviceWorkerWarmMessageType = "CACHE_URLS";
const audioAmbientVolume = 0.085;
const audioAmbientDuckVolume = 0.05;
const audioSectionOpenVolume = 0.24;
const audioTransitionVolume = 0.28;
const audioSectionOpenCooldownMs = 96;
const audioTransitionCooldownMs = 320;
const siteTransitionDurationMs = 520;
const siteTransitionSwapDelayMs = 118;
const siteTransitionBackToTopDelayMs = 92;
let budgetSourceUpdatedAt = "2026-03-27";
let budgetAssumptionCopy = {
  en:
    "The cost model follows one fixed 7-day route: Osaka, Kyoto, Mt. Fuji area, and Tokyo. Extras cover luggage forwarding, Fuji weather pivots, the Tokyo transfer, and a light airport-day buffer.",
  ja:
    "費用モデルは、大阪、京都、富士エリア、東京を回る固定の7日間ルートに合わせています。追加費用には、荷物配送、富士山の天候による動き直し、東京への移動受け渡し、帰国日の小さな余裕分を含めています。"
};
let budgetStayDefinitions = {};
let budgetSourceGroups = [];
let budgetDayDefinitions = [];
let tripNoteDefinitions = [];
let tripNoteDefinitionMap = new Map();
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
const revealScrollDirectionThresholdPx = 6;
const revealBlockSelector = [
  ".trip-stats > *",
  ".progress-card",
  ".content-section .section-heading",
  ".essentials-grid > *",
  ".day-grid > *",
  ".notes-grid > *",
  ".budget-panel",
  ".budget-day-card",
  ".route-map",
  ".route-map__day-browser",
  ".route-reference",
  ".route-reference__day",
  ".journey-close",
  ".site-footer__lead",
  ".site-footer__aside"
].join(", ");
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
    id: "accommodations",
    title: { en: "Hotels / Accommodations", ja: "ホテル・宿泊" },
    copy: { en: "", ja: "" }
  },
  {
    id: "transit",
    title: { en: "Transit", ja: "移動" },
    copy: { en: "", ja: "" }
  },
  {
    id: "activities",
    title: { en: "Activities", ja: "アクティビティ" },
    copy: { en: "", ja: "" }
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
const checklistDetailLabels = {
  defaultTag: { en: "Checklist detail", ja: "詳細" },
  stayTag: { en: "Stay detail", ja: "宿泊詳細" },
  bookingTag: { en: "Booking detail", ja: "予約詳細" },
  when: { en: "When", ja: "タイミング" },
  type: { en: "Type", ja: "種類" },
  notes: { en: "Notes", ja: "メモ" },
  referenceNote: { en: "Reference note", ja: "参照メモ" },
  loadingTitle: { en: "Loading detail", ja: "詳細を読み込み中" },
  loadingSummary: {
    en: "Loading the saved notes for this checklist item...",
    ja: "このチェック項目の保存済みメモを読み込んでいます..."
  },
  loadingBody: {
    en: "Saved checklist notes will appear here.",
    ja: "保存済みのチェック項目メモがここに表示されます。"
  },
  unavailableTitle: {
    en: "Detail unavailable",
    ja: "詳細を表示できません"
  },
  unavailableSummary: {
    en: "This checklist item does not have a saved detail yet.",
    ja: "このチェック項目にはまだ保存済みの詳細がありません。"
  },
  unavailableBody: {
    en: "Use the Essentials section for the broader reference in the meantime.",
    ja: "ひとまず Essentials セクションの内容を参照してください。"
  },
  errorTitle: {
    en: "Detail could not load",
    ja: "詳細を読み込めませんでした"
  },
  errorSummary: {
    en: "The saved checklist notes could not be loaded right now.",
    ja: "保存済みのチェック項目メモを現在読み込めません。"
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
    en: "Cached bundle version 2026-03-27. Includes checklist, packing, upgraded budget notes, route map, and transit details.",
    ja: "キャッシュ版は 2026-03-27。チェックリスト、荷造り、強化した予算メモ、ルート地図、移動詳細を含みます。"
  },
  installHintMeta: {
    en: "If no install button appears, use your browser menu or iPhone/iPad Share sheet to add the guide to the home screen. Snapshot version: 2026-03-27.",
    ja: "追加ボタンが出ない場合は、ブラウザーのメニューや iPhone/iPad の共有メニューからホーム画面へ追加できます。保存版は 2026-03-27 です。"
  },
  snapshotMeta: {
    en: "This single-file snapshot keeps the local checklist, packing, budget notes, route map, and transit details working without fetches.",
    ja: "この単体保存版は、フェッチなしでチェックリスト、荷造り、予算メモ、ルート地図、移動詳細を使えます。"
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
    label: { en: "Departure", ja: "出発準備" },
    meta: {
      en: "Arrival QR, eSIM reserve, and backup copies only.",
      ja: "入国QR、eSIM予備費、控えだけを対象にします。"
    }
  },
  {
    id: "bookings-transit",
    label: { en: "Pre-Trip Bookings", ja: "予約と移動" },
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
    label: { en: "Luggage", ja: "荷物戦略" },
    meta: {
      en: "Only route-specific luggage handling stays priced here.",
      ja: "このルート特有の荷物対応だけを費用化します。"
    }
  },
  {
    id: "daily-carry",
    label: { en: "Daily", ja: "毎日持つもの" },
    meta: {
      en: "Daily items are mostly assumed already owned.",
      ja: "毎日持つ物は、ほとんどを既に持っている前提にします。"
    }
  },
  {
    id: "fuji-tokyo-transfer-kit",
    label: { en: "Transfer", ja: "富士と東京移動の日用キット" },
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
  daySlider: { en: "Route day slider", ja: "日別ルートスライダー" },
  daySliderPrevious: { en: "Show earlier days", ja: "前の日を表示" },
  daySliderNext: { en: "Show later days", ja: "次の日を表示" },
  tools: { en: "Quick tools", ja: "クイック操作" },
  checklistAction: { en: "Checklist", ja: "チェックリスト" },
  interactiveSurfaceLabel: {
    en: "Interactive route map. Focus the map, then use the arrow keys to pan.",
    ja: "インタラクティブなルート地図です。地図をフォーカスすると、矢印キーで移動できます。"
  },
  sharedLoading: { en: "Preparing live route map...", ja: "ライブ ルート地図を準備中..." },
  sharedLoadingBody: {
    en: "Loading OpenFreeMap Positron and the route overlays.",
    ja: "OpenFreeMap Positron とルート表示を読み込んでいます。"
  },
  sharedFallbackTitle: { en: "Route map unavailable", ja: "ルート地図を表示できません" },
  sharedFallbackBody: {
    en: "The live map could not load here. Use the saved itinerary links if you need directions.",
    ja: "ライブ地図をここでは読み込めませんでした。経路案内が必要なら保存済みの旅程リンクを使ってください。"
  },
  sharedOfflineTitle: {
    en: "Interactive map unavailable offline",
    ja: "オフラインではインタラクティブ地図を使えません"
  },
  sharedOfflineBody: {
    en: "Open the live site when you want the route map.",
    ja: "ルート地図を使うときはライブサイトを開いてください。"
  }
};
const routeExplorerDefaultSelectionId = "day-1";
const routeMapInitialView = {
  center: [137.4, 35.1],
  zoom: 4.95
};
const routeMapOverviewMaxZoom = 6.15;
const routeMapKeyboardPanStepPx = 120;
const routeMapKeyboardPanDurationMs = 340;
const scrollMotionEconomyVelocityThreshold = 0.95;
const scrollMotionClassHoldMs = 180;
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
let routeExplorerPathDefinitions = [];
let routeExplorerSegmentMap = new Map();
let routeExplorerStopDefinitions = [];
let routeExplorerStopMap = new Map();
let routeDayViewDefinitions = [];
let routeExplorerViewDefinitions = [];
let routeDayStopDefinitions = {};
let routeContentLoaded = false;
let routeContentPromise = null;
let appAssetManifest = null;
let routeSectionStylesheetPromise = null;
let budgetUiPromise = null;
let budgetContentPromise = null;
let essentialsContentPromise = null;
let siteAudioNodes = null;
let ambientAudioResumeTimer = 0;
const siteAudioState = {
  ambientWanted: true,
  pendingAmbientStart: false,
  userGestureSeen: false,
  gestureBindingReady: false,
  autoplayBindingReady: false,
  lastSectionOpenAt: 0,
  lastTransitionAt: 0
};
let siteTransitionCleanupTimer = 0;
let siteTransitionToken = 0;

function buildRouteExplorerViewDefinitions(viewDefinitions = []) {
  return viewDefinitions.map((viewDefinition) => {
    const tripNote = tripNoteDefinitionMap.get(viewDefinition.day) || null;
    const fallbackTitle = {
      en: `Day ${viewDefinition.day}`,
      ja: `${viewDefinition.day}日目`
    };
    const fallbackSummary = {
      en: `Focus Day ${viewDefinition.day} on the map and jump into the matching checklist.`,
      ja: `${viewDefinition.day}日目のルートを地図で見て、そのまま対応するチェックリストへ移動できます。`
    };

    return {
      id: `day-${viewDefinition.day}`,
      day: viewDefinition.day,
      label: {
        en: `Day ${viewDefinition.day}`,
        ja: `${viewDefinition.day}日目`
      },
      title: tripNote?.title || fallbackTitle,
      summary: tripNote?.summary || fallbackSummary,
      badges: viewDefinition.badges,
      transitActions: viewDefinition.transitActions || [],
      dayLinks: [{ day: viewDefinition.day }],
      stopIds: viewDefinition.stopIds,
      segmentIds: viewDefinition.segmentIds
    };
  });
}

function getLazyNode(cacheKey, selector) {
  if (lazyNodeCache.has(cacheKey)) {
    return lazyNodeCache.get(cacheKey);
  }

  const node = document.querySelector(selector);
  lazyNodeCache.set(cacheKey, node || null);
  return node || null;
}

function applyRouteContentData(sourceData, { loaded = false } = {}) {
  const normalizedSourceData =
    sourceData && typeof sourceData === "object" && !Array.isArray(sourceData) ? sourceData : {};

  tripNoteDefinitions = Array.isArray(normalizedSourceData.tripNotes)
    ? normalizedSourceData.tripNotes
    : [];
  tripNoteDefinitionMap = new Map(tripNoteDefinitions.map((note) => [note.day, note]));

  routeExplorerPathDefinitions = Array.isArray(normalizedSourceData.routeSegments)
    ? normalizedSourceData.routeSegments
    : [];
  routeExplorerSegmentMap = new Map(
    routeExplorerPathDefinitions.map((segment) => [segment.id, segment])
  );

  routeExplorerStopDefinitions = Array.isArray(normalizedSourceData.routeStops)
    ? normalizedSourceData.routeStops
    : [];
  routeExplorerStopMap = new Map(routeExplorerStopDefinitions.map((stop) => [stop.id, stop]));

  routeDayViewDefinitions = Array.isArray(normalizedSourceData.routeDayViews)
    ? normalizedSourceData.routeDayViews
    : [];
  routeDayStopDefinitions =
    normalizedSourceData.routeDayStops &&
    typeof normalizedSourceData.routeDayStops === "object" &&
    !Array.isArray(normalizedSourceData.routeDayStops)
      ? normalizedSourceData.routeDayStops
      : {};
  routeExplorerViewDefinitions = buildRouteExplorerViewDefinitions(routeDayViewDefinitions);
  routeContentLoaded = loaded || routeContentLoaded;

  getRouteMapFullCoordinates.cache = null;
  getRouteMapGeoJsonData.cache = null;

  if (activeRouteMapSelection.type === "view" && !getRouteExplorerViewById(activeRouteMapSelection.id)) {
    activeRouteMapSelection = { type: "view", id: routeExplorerDefaultSelectionId };
  }

  return {
    tripNotes: tripNoteDefinitions,
    routeSegments: routeExplorerPathDefinitions,
    routeStops: routeExplorerStopDefinitions,
    routeDayViews: routeDayViewDefinitions,
    routeDayStops: routeDayStopDefinitions
  };
}

function getRouteContentData() {
  if (routeContentLoaded && routeExplorerPathDefinitions.length) {
    return {
      tripNotes: tripNoteDefinitions,
      routeSegments: routeExplorerPathDefinitions,
      routeStops: routeExplorerStopDefinitions,
      routeDayViews: routeDayViewDefinitions,
      routeDayStops: routeDayStopDefinitions
    };
  }

  const runtimePayload = window[routeContentRuntimeGlobal];
  if (runtimePayload && typeof runtimePayload === "object") {
    return applyRouteContentData(runtimePayload, { loaded: true });
  }

  return applyRouteContentData({}, { loaded: false });
}

function loadAppAssetManifest() {
  return Promise.resolve(getResolvedAppAssetManifest());
}

function primeHeadLink(rel, href, attributes = {}) {
  if (!href) {
    return null;
  }

  const selector = `link[rel="${rel}"][href="${href}"]`;
  const existingLink = document.head.querySelector(selector);
  if (existingLink) {
    return existingLink;
  }

  const link = document.createElement("link");
  link.rel = rel;
  link.href = href;

  Object.entries(attributes).forEach(([key, value]) => {
    if (value === undefined || value === null || value === false || value === "") {
      return;
    }

    if (value === true) {
      link.setAttribute(key, "");
      return;
    }

    link.setAttribute(key, value);
  });

  document.head.append(link);
  return link;
}

function getResolvedAppAssetManifest() {
  const runtimeConfig = window[appAssetConfigRuntimeGlobal];
  if (runtimeConfig && typeof runtimeConfig === "object" && !Array.isArray(runtimeConfig)) {
    appAssetManifest = runtimeConfig;
  }

  return appAssetManifest || {};
}

function getAudioAssetConfig(manifest = getResolvedAppAssetManifest()) {
  return {
    sectionOpenPath: manifest.sectionOpenAudioPath || sectionOpenAudioFallbackUrl,
    backgroundLoopPath: manifest.backgroundLoopAudioPath || backgroundLoopAudioFallbackUrl,
    transitionPath: manifest.transitionAudioPath || transitionAudioFallbackUrl
  };
}

function createManagedAudioNode(url, { loop = false, preload = "metadata", volume = 1 } = {}) {
  if (!url) {
    return null;
  }

  const audio = new Audio(url);
  audio.loop = loop;
  audio.preload = preload;
  audio.volume = volume;

  try {
    audio.playsInline = true;
  } catch {
    // Ignore browser-only assignment failures.
  }

  try {
    audio.disableRemotePlayback = true;
  } catch {
    // Ignore unsupported audio flags.
  }

  return audio;
}

function ensureSiteAudioNodes() {
  if (siteAudioNodes) {
    return siteAudioNodes;
  }

  const audioAssets = getAudioAssetConfig();
  siteAudioNodes = {
    sectionOpen: createManagedAudioNode(audioAssets.sectionOpenPath, {
      preload: "auto",
      volume: audioSectionOpenVolume
    }),
    transition: createManagedAudioNode(audioAssets.transitionPath, {
      preload: "auto",
      volume: audioTransitionVolume
    }),
    ambient: createManagedAudioNode(audioAssets.backgroundLoopPath, {
      loop: true,
      preload: "auto",
      volume: audioAmbientVolume
    })
  };

  return siteAudioNodes;
}

function clearAmbientAudioResumeTimer() {
  if (ambientAudioResumeTimer) {
    window.clearTimeout(ambientAudioResumeTimer);
    ambientAudioResumeTimer = 0;
  }
}

function pauseManagedAudio(node, { resetTime = false } = {}) {
  if (!node) {
    return;
  }

  try {
    node.pause();
    if (resetTime) {
      node.currentTime = 0;
    }
  } catch {
    // Ignore media pause failures.
  }
}

function primeCriticalAudioAssets() {
  return;
}

function requestAmbientPlayback() {
  const ambient = ensureSiteAudioNodes().ambient;
  if (!ambient || document.visibilityState === "hidden" || !siteAudioState.ambientWanted) {
    return Promise.resolve(false);
  }

  clearAmbientAudioResumeTimer();
  ambient.volume = audioAmbientVolume;

  if (!ambient.paused && !ambient.ended) {
    siteAudioState.pendingAmbientStart = false;
    return Promise.resolve(true);
  }

  const playResult = ambient.play();
  if (!playResult || typeof playResult.then !== "function") {
    siteAudioState.pendingAmbientStart = false;
    return Promise.resolve(true);
  }

  return playResult
    .then(() => {
      siteAudioState.pendingAmbientStart = false;
      return true;
    })
    .catch(() => {
      siteAudioState.pendingAmbientStart = true;
      return false;
    });
}

function pauseAmbientPlayback({ keepIntent = true } = {}) {
  const ambient = ensureSiteAudioNodes().ambient;
  if (!ambient) {
    return;
  }

  if (!keepIntent) {
    siteAudioState.ambientWanted = false;
    siteAudioState.pendingAmbientStart = false;
  }

  clearAmbientAudioResumeTimer();
  pauseManagedAudio(ambient, { resetTime: false });
}

function duckAmbientLoop(durationMs = 520) {
  const ambient = ensureSiteAudioNodes().ambient;
  if (!ambient || ambient.paused) {
    return;
  }

  clearAmbientAudioResumeTimer();
  ambient.volume = Math.min(ambient.volume, audioAmbientDuckVolume);
  ambientAudioResumeTimer = window.setTimeout(() => {
    ambientAudioResumeTimer = 0;
    if (!ambient.paused) {
      ambient.volume = audioAmbientVolume;
    }
  }, durationMs);
}

function bindSiteAudioGestureListeners() {
  if (siteAudioState.gestureBindingReady) {
    return;
  }

  const handleGesture = () => {
    siteAudioState.userGestureSeen = true;
    if (
      siteAudioState.ambientWanted &&
      (siteAudioState.pendingAmbientStart || ensureSiteAudioNodes().ambient?.paused)
    ) {
      void requestAmbientPlayback();
    }
  };

  window.addEventListener("pointerdown", handleGesture, { passive: true, capture: true });
  window.addEventListener("touchend", handleGesture, { passive: true, capture: true });
  window.addEventListener("keydown", handleGesture, { capture: true });
  siteAudioState.gestureBindingReady = true;
}

function requestImmediateSiteAudioStart() {
  if (!siteAudioState.ambientWanted || document.visibilityState === "hidden") {
    return;
  }

  void requestAmbientPlayback();
}

function bindSiteAudioAutoplayListeners() {
  if (siteAudioState.autoplayBindingReady) {
    return;
  }

  const retryAutoplay = () => {
    requestImmediateSiteAudioStart();
  };

  if (document.readyState !== "complete") {
    window.addEventListener("load", retryAutoplay, { once: true });
  }

  window.addEventListener("pageshow", retryAutoplay);
  siteAudioState.autoplayBindingReady = true;
}

function playManagedOneShot(node, { volume = 1, cooldownMs = 180, stateKey, duckMs = 420 } = {}) {
  if (!node || !stateKey) {
    return;
  }

  const now = performance.now();
  if (now - siteAudioState[stateKey] < cooldownMs) {
    return;
  }

  siteAudioState[stateKey] = now;
  siteAudioState.userGestureSeen = true;
  if (siteAudioState.ambientWanted && siteAudioState.pendingAmbientStart) {
    void requestAmbientPlayback();
  }

  duckAmbientLoop(duckMs);

  try {
    node.pause();
    node.currentTime = 0;
    node.volume = volume;
    const playResult = node.play();
    if (playResult && typeof playResult.catch === "function") {
      playResult.catch(() => null);
    }
  } catch {
    // Ignore media playback failures from unsupported autoplay contexts.
  }
}

function playSectionOpenSound() {
  playManagedOneShot(ensureSiteAudioNodes().sectionOpen, {
    volume: audioSectionOpenVolume,
    cooldownMs: audioSectionOpenCooldownMs,
    stateKey: "lastSectionOpenAt",
    duckMs: 360
  });
}

window[sectionOpenSoundRuntimeGlobal] = playSectionOpenSound;

function playTransitionSound() {
  playManagedOneShot(ensureSiteAudioNodes().transition, {
    volume: audioTransitionVolume,
    cooldownMs: audioTransitionCooldownMs,
    stateKey: "lastTransitionAt",
    duckMs: 460
  });
}

function shouldPlayGenericButtonSound(button) {
  if (!(button instanceof HTMLButtonElement) || button.disabled) {
    return false;
  }

  if (button.getAttribute("aria-disabled") === "true") {
    return false;
  }

  if (
    button.matches(
      "[data-panel-target], [data-back-to-top], [data-jump-current-day], [data-route-map-day]"
    )
  ) {
    return false;
  }

  if (
    isChecklistAccessLocked() &&
    button.matches(".transit-trigger--checklist, [data-checklist-detail-trigger]")
  ) {
    return false;
  }

  const dayCard = button.closest(".day-card[data-day]");
  if (dayCard) {
    const day = Number(dayCard.dataset.day);
    if (day > accessibleDay) {
      return false;
    }
  }

  return true;
}

function handleGenericButtonSoundClick(event) {
  const button = event.target.closest("button");
  if (!button || !shouldPlayGenericButtonSound(button)) {
    return;
  }

  playSectionOpenSound();
}

function initializeSiteAudioExperience() {
  bindSiteAudioGestureListeners();
  bindSiteAudioAutoplayListeners();
  primeCriticalAudioAssets();
  ensureSiteAudioNodes();
  requestImmediateSiteAudioStart();
  window.requestAnimationFrame(() => {
    requestImmediateSiteAudioStart();
  });
}

function shouldWarmDeferredAssets() {
  if (offlineSnapshotMode) {
    return false;
  }

  const saveDataEnabled = Boolean(navigator.connection?.saveData);
  const effectiveType = String(navigator.connection?.effectiveType || "").toLowerCase();
  return !saveDataEnabled && effectiveType !== "slow-2g" && effectiveType !== "2g";
}

function getDeferredExperiencePrefetchAssets(manifest) {
  const entries = [
    { href: manifest.budgetUiPath || budgetUiFallbackScriptUrl, as: "script" },
    { href: manifest.budgetContentPath || budgetContentFallbackScriptUrl, as: "script" },
    { href: manifest.essentialsContentPath || essentialsContentFallbackScriptUrl, as: "script" }
  ];
  const seenHrefs = new Set();
  return entries.filter((entry) => {
    if (!entry.href || seenHrefs.has(entry.href)) {
      return false;
    }

    seenHrefs.add(entry.href);
    return true;
  });
}

function getWarmCacheAssetUrls(manifest) {
  return Array.from(
    new Set(
      [
        manifest.pageBackdropImagePath,
        manifest.sectionOpenAudioPath || sectionOpenAudioFallbackUrl,
        manifest.backgroundLoopAudioPath || backgroundLoopAudioFallbackUrl,
        manifest.transitionAudioPath || transitionAudioFallbackUrl,
        manifest.routeStylePath || routeStyleFallbackUrl,
        manifest.routeContentPath || routeContentFallbackScriptUrl,
        manifest.budgetUiPath || budgetUiFallbackScriptUrl,
        manifest.budgetContentPath || budgetContentFallbackScriptUrl,
        manifest.essentialsContentPath || essentialsContentFallbackScriptUrl
      ].filter(Boolean)
    )
  );
}

function warmCachedAppAssets(urls) {
  if (
    !Array.isArray(urls) ||
    !urls.length ||
    offlineSnapshotMode ||
    !("serviceWorker" in navigator) ||
    !window.isSecureContext
  ) {
    return Promise.resolve([]);
  }

  return navigator.serviceWorker.ready
    .then((registration) => {
      offlineRegistration = registration;
      const target =
        registration.active ||
        navigator.serviceWorker.controller ||
        registration.waiting ||
        registration.installing;

      if (target?.postMessage) {
        target.postMessage({
          type: serviceWorkerWarmMessageType,
          urls
        });
      }

      return urls;
    })
    .catch(() => urls);
}

function warmDeferredExperienceAssets() {
  if (!shouldWarmDeferredAssets()) {
    return Promise.resolve([]);
  }

  return loadAppAssetManifest().then((manifest) => {
    getDeferredExperiencePrefetchAssets(manifest).forEach(({ href, as }) => {
      primeHeadLink("prefetch", href, { as });
    });

    return warmCachedAppAssets(getWarmCacheAssetUrls(manifest));
  });
}

function prewarmRouteStaticAssets() {
  return loadAppAssetManifest().then((manifest) => {
    primeHeadLink("dns-prefetch", `//${new URL(routeMapOriginUrl).host}`);
    primeHeadLink("preconnect", routeMapOriginUrl, { crossorigin: "anonymous" });
    primeHeadLink("preload", manifest.routeStylePath || routeStyleFallbackUrl, { as: "style" });
    primeHeadLink("preload", manifest.routeContentPath || routeContentFallbackScriptUrl, { as: "script" });
    primeHeadLink("preload", routeMapLibraryStyleUrl, { as: "style" });
    primeHeadLink("preload", routeMapLibraryScriptUrl, { as: "script" });
    return manifest;
  });
}

function warmRouteMapStyleDocument() {
  if (offlineSnapshotMode) {
    return Promise.resolve(null);
  }

  if (routeMapStyleWarmupPromise) {
    return routeMapStyleWarmupPromise;
  }

  routeMapStyleWarmupPromise = fetch(routeMapStyleUrl, {
    mode: "cors",
    credentials: "omit",
    cache: "force-cache"
  })
    .then((response) => (response.ok ? response.text() : null))
    .catch(() => null);

  return routeMapStyleWarmupPromise;
}

function createRouteMapWarmupHost() {
  if (routeMapWarmupHost?.isConnected) {
    return routeMapWarmupHost;
  }

  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.dataset.routeMapWarmup = "true";
  Object.assign(host.style, {
    position: "fixed",
    left: "-200vw",
    top: "-200vh",
    width: "720px",
    height: "420px",
    opacity: "0",
    pointerEvents: "none",
    zIndex: "-1"
  });
  document.body.append(host);
  routeMapWarmupHost = host;
  return host;
}

function warmOffscreenRouteMap() {
  if (offlineSnapshotMode) {
    return Promise.resolve(null);
  }

  if (routeMapOffscreenWarmupPromise) {
    return routeMapOffscreenWarmupPromise;
  }

  routeMapOffscreenWarmupPromise = Promise.all([
    ensureRouteContentLoaded(),
    loadRouteMapLibrary(),
    warmRouteMapStyleDocument()
  ])
    .then(async ([, { maplibregl }]) => {
      const warmupHost = createRouteMapWarmupHost();
      const warmupMap = new maplibregl.Map({
        container: warmupHost,
        style: buildRouteMapBaseStyle(),
        interactive: false,
        attributionControl: false,
        renderWorldCopies: false,
        center: routeMapInitialView.center,
        zoom: routeMapInitialView.zoom
      });

      try {
        await waitForRouteMapLoad(warmupMap, 14000);
      } catch (error) {
        // Ignore warmup errors and let the visible map retry normally.
      }

      try {
        warmupMap.remove();
      } catch (error) {
        // Ignore cleanup failures for the offscreen warmup map.
      }

      if (routeMapWarmupHost?.isConnected) {
        routeMapWarmupHost.remove();
      }
      routeMapWarmupHost = null;
      return null;
    })
    .catch(() => null)
    .finally(() => {
      routeMapOffscreenWarmupPromise = null;
    });

  return routeMapOffscreenWarmupPromise;
}

function warmRouteExperience() {
  if (offlineSnapshotMode) {
    return Promise.resolve(null);
  }

  if (routeExperienceWarmupPromise) {
    return routeExperienceWarmupPromise;
  }

  routeMapRequested = true;
  routeExperienceWarmupPromise = Promise.allSettled([
    prewarmRouteStaticAssets(),
    ensureRouteSectionStylesLoaded(),
    ensureRouteContentLoaded(),
    loadRouteMapLibrary(),
    warmRouteMapStyleDocument(),
    warmOffscreenRouteMap()
  ]).finally(() => {
    routeExperienceWarmupPromise = null;
  });

  return routeExperienceWarmupPromise;
}

function loadLazyAssetScript(url, dataAttribute, runtimeGlobal, runtimeLabel) {
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
}

function loadLazyStylesheet(url, dataAttribute, label) {
  return new Promise((resolve, reject) => {
    const bindLink = (link) => {
      if (!link) {
        reject(new Error(`${label} element is missing.`));
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
        reject(new Error(`${label} failed to load.`));
      };

      link.addEventListener("load", handleLoad, { once: true });
      link.addEventListener("error", handleError, { once: true });
    };

    const existingLink = document.querySelector(`[${dataAttribute}]`);
    if (existingLink) {
      bindLink(existingLink);
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    link.setAttribute(dataAttribute, "true");
    bindLink(link);
    document.head.append(link);
  });
}

function loadRouteContentData() {
  if (routeContentLoaded && routeExplorerPathDefinitions.length) {
    return Promise.resolve(getRouteContentData());
  }

  if (routeContentPromise) {
    return routeContentPromise;
  }

  routeContentPromise = loadAppAssetManifest()
    .then((manifest) => {
      const routeContentPath = manifest.routeContentPath || routeContentFallbackScriptUrl;
      return loadLazyAssetScript(
        routeContentPath,
        "data-route-content-script",
        routeContentRuntimeGlobal,
        "Route content"
      );
    })
    .then(() => getRouteContentData())
    .catch((error) => {
      console.error("Route content could not be loaded.", error);
      return getRouteContentData();
    })
    .finally(() => {
      routeContentPromise = null;
    });

  return routeContentPromise;
}

function ensureRouteContentLoaded() {
  return loadRouteContentData();
}

function ensureRouteSectionStylesLoaded() {
  if (offlineSnapshotMode) {
    return Promise.resolve();
  }

  if (routeSectionStylesheetPromise) {
    return routeSectionStylesheetPromise;
  }

  routeSectionStylesheetPromise = loadAppAssetManifest()
    .then((manifest) =>
      loadLazyStylesheet(manifest.routeStylePath || routeStyleFallbackUrl, "data-route-style", "Route styles")
    )
    .catch((error) => {
      routeSectionStylesheetPromise = null;
      console.error("Route styles could not be loaded.", error);
    });

  return routeSectionStylesheetPromise;
}

function loadBudgetContentData() {
  if (budgetEstimateSourcesLoaded) {
    return Promise.resolve(getBudgetEstimateSources());
  }

  if (budgetContentPromise) {
    return budgetContentPromise;
  }

  budgetContentPromise = loadAppAssetManifest()
    .then((manifest) =>
      loadLazyAssetScript(
        manifest.budgetContentPath || budgetContentFallbackScriptUrl,
        "data-budget-content-script",
        budgetContentRuntimeGlobal,
        "Budget content"
      )
    )
    .then((payload) => applyBudgetEstimateSources(payload, { loaded: true }))
    .catch((error) => {
      console.error("Budget estimate data could not be loaded.", error);
      return getBudgetEstimateSources();
    })
    .finally(() => {
      budgetContentPromise = null;
    });

  return budgetContentPromise;
}

function ensureBudgetUiLoaded() {
  if (budgetUiPromise) {
    return budgetUiPromise;
  }

  budgetUiPromise = loadAppAssetManifest()
    .then((manifest) =>
      loadLazyAssetScript(
        manifest.budgetUiPath || budgetUiFallbackScriptUrl,
        "data-budget-ui-script",
        budgetUiRuntimeGlobal,
        "Budget UI"
      )
    )
    .catch((error) => {
      console.error("Budget UI could not be loaded.", error);
      return null;
    })
    .finally(() => {
      budgetUiPromise = null;
    });

  return budgetUiPromise;
}

function applyEssentialsContentData(payload) {
  const normalizedPayload =
    payload && typeof payload === "object" && !Array.isArray(payload) ? payload : {};
  bookingTransitItems = Array.isArray(normalizedPayload.bookingTransitItems)
    ? normalizedPayload.bookingTransitItems
    : [];
  transitDetailItems = Array.isArray(normalizedPayload.transitDetailItems)
    ? normalizedPayload.transitDetailItems
    : [];
  bookingTransitItemMap = new Map(bookingTransitItems.map((item) => [item.id, item]));
  transitDetailItemMap = new Map(transitDetailItems.map((item) => [item.id, item]));
  return normalizedPayload;
}

function loadEssentialsContentData() {
  if (bookingTransitItems.length || transitDetailItems.length) {
    return Promise.resolve({
      bookingTransitItems,
      transitDetailItems
    });
  }

  if (essentialsContentPromise) {
    return essentialsContentPromise;
  }

  essentialsContentPromise = loadAppAssetManifest()
    .then((manifest) =>
      loadLazyAssetScript(
        manifest.essentialsContentPath || essentialsContentFallbackScriptUrl,
        "data-essentials-content-script",
        essentialsContentRuntimeGlobal,
        "Essentials content"
      )
    )
    .then((payload) => applyEssentialsContentData(payload))
    .catch((error) => {
      console.error("Essentials content could not be loaded.", error);
      return applyEssentialsContentData({});
    })
    .finally(() => {
      essentialsContentPromise = null;
    });

  return essentialsContentPromise;
}

function ensureSectionAssetsReady(sectionName) {
  if (sectionName === "route") {
    return Promise.all([
      ensureRouteSectionStylesLoaded(),
      ensureRouteContentLoaded(),
      prewarmRouteStaticAssets()
    ]);
  }

  return Promise.resolve();
}
let bookingTransitItems = [];
let bookingTransitItemMap = new Map();
let transitDetailItems = [];
let transitDetailItemMap = new Map();
let budgetEstimateSources = null;
let budgetEstimateSourcesPromise = null;
let budgetEstimateSourcesLoaded = false;
const localizedMarkupCache = new WeakMap();
let checklistState = {};
let reservedHeaderHeight = headerReservedHeightFallbackPx;
let currentHeaderHeight = headerReservedHeightFallbackPx;
let headerLockUntil = 0;
const headerTopRevealThreshold = 36;
const headerCondenseScrollThreshold = 150;
const headerScrollDeltaTolerance = 4;
const headerScrollIntentThreshold = 24;
let headerIsCondensed = false;
siteHeader?.classList.remove("is-condensed");
syncHeaderAccessoryVisibility(false);
let lastScrollY = Math.max(window.scrollY, 0);
let headerScrollIntentStartY = lastScrollY;
let headerScrollIntentDirection = 0;
let lastRevealScrollY = lastScrollY;
let revealScrollDirection = 1;
let lastScrollMotionSampleY = lastScrollY;
let lastScrollMotionSampleTime = window.performance.now();
let desktopReverseScrollTimer = 0;
let scrollMotionEconomyTimer = 0;
let scrollTicking = false;
let resizeTicking = false;
let revealObserver = null;
let headerLockReleaseTimer = 0;
const revealRestartFrames = new WeakMap();
let completedDays = new Set();
let completedHistoryDays = new Set();
let unlockedDays = new Set();
let warningDays = new Set();
let accessibleDay = 1;
let currentProgressDay = 1;
let activeChecklistHoverItem = null;
let sequenceNoticeTimer = 0;
let lastTimelineFocusDay = null;
let lastResetTrigger = null;
const pendingClassRestarts = new WeakMap();
let deferredGeometryWorkPending = true;
let deferredGeometryReleaseTimer = 0;
let timelineLayoutFrame = 0;
let timelineLayoutDelayTimer = 0;
let timelineLayoutIdleHandle = 0;
let dayCardRowHeightFrame = 0;
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
    travelersPerRoom: Math.min(budgetDefaultTravelerCount, budgetTravelersPerRoomDefault),
    includeExtras: false,
    days: {}
  };
}
let budgetNotesState = getDefaultBudgetNotesState();
let budgetNotesInitialized = false;

function readStoredBudgetNotesState() {
  const fallbackState = getDefaultBudgetNotesState();

  try {
    const parsed = JSON.parse(window.localStorage.getItem(budgetNotesStorageKey) || "null");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return fallbackState;
    }

    const travelers = Number.parseInt(String(parsed.travelers ?? ""), 10);
    const travelersPerRoom = Number.parseInt(String(parsed.travelersPerRoom ?? ""), 10);
    const days =
      parsed.days && typeof parsed.days === "object" && !Array.isArray(parsed.days)
        ? Object.entries(parsed.days).reduce((nextState, [day, entry]) => {
            if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
              return nextState;
            }

            nextState[String(day)] = {
              note: typeof entry.note === "string" ? entry.note.slice(0, 280) : "",
              stayId: typeof entry.stayId === "string" ? entry.stayId : null
            };
            return nextState;
          }, {})
        : {};

    const resolvedTravelers =
      Number.isFinite(travelers) && travelers >= budgetTravelerCountMin
        ? Math.min(travelers, budgetTravelerCountMax)
        : fallbackState.travelers;
    const resolvedTravelersPerRoom =
      Number.isFinite(travelersPerRoom) && travelersPerRoom > 0
        ? Math.min(travelersPerRoom, resolvedTravelers)
        : parsed.accommodationShareMode === "not-shared"
          ? 1
          : Math.min(resolvedTravelers, budgetTravelersPerRoomDefault);

    return {
      travelers: resolvedTravelers,
      travelersPerRoom: resolvedTravelersPerRoom,
      includeExtras: parsed.includeExtras === true,
      days
    };
  } catch (error) {
    return fallbackState;
  }
}

function ensureBudgetNotesStateHydrated() {
  if (!budgetNotesInitialized) {
    budgetNotesState = readStoredBudgetNotesState();
    budgetNotesInitialized = true;
  }

  return budgetNotesState;
}

function getBudgetDayState(day) {
  ensureBudgetNotesStateHydrated();
  const dayKey = String(Number.parseInt(String(day), 10));
  const entry =
    budgetNotesState.days && typeof budgetNotesState.days[dayKey] === "object"
      ? budgetNotesState.days[dayKey]
      : null;
  return entry || {
    note: "",
    stayId: getBudgetDayDefinition(day)?.defaultStayId || null
  };
}

let routeMapInitialized = false;
let routeMapLibraryPromise = null;
let routeMapStylesheetPromise = null;
const routeMapState = createRouteMapState();
let routeMapActivePopup = null;
let activeRouteMapSelection = { type: "view", id: routeExplorerDefaultSelectionId };
let routeMapUISyncFrame = 0;
let routeMapDaySliderSyncFrame = 0;
let routeMapDayRailScrollLeft = 0;
let routeMapDayRailStep = 0;
let routeMapDayRailMaxScroll = 0;
let routeMapRequested = false;
let routeMapStyleWarmupPromise = null;
let routeMapOffscreenWarmupPromise = null;
let routeExperienceWarmupPromise = null;
let routeMapWarmupHost = null;
let pendingRouteMapUISyncOptions = {
  updateCamera: false,
  animateCamera: false,
  revealDayRail: false
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
let maxScrollableY = 0;

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

  if (bookingTransitItemsPromise) {
    return bookingTransitItemsPromise;
  }

  bookingTransitItemsPromise = loadEssentialsContentData()
    .then((payload) => {
      bookingTransitItems = Array.isArray(payload?.bookingTransitItems)
        ? payload.bookingTransitItems
        : [];
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

  if (transitDetailItemsPromise) {
    return transitDetailItemsPromise;
  }

  transitDetailItemsPromise = loadEssentialsContentData()
    .then((payload) => {
      transitDetailItems = Array.isArray(payload?.transitDetailItems)
        ? payload.transitDetailItems
        : [];
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

function renderTransitDetailTextSection(title, copy, { scrollable = false } = {}) {
  if (!copy?.en && !copy?.ja) {
    return "";
  }

  const sectionBodyClass = scrollable
    ? "transit-modal__section-body transit-modal__section-body--scrollable"
    : "transit-modal__section-body";

  return `
    <section class="transit-modal__section">
      <h3 class="transit-modal__section-title">${renderLocalizedContent(title)}</h3>
      <div class="${sectionBodyClass}">
        <p class="transit-modal__section-copy">${renderLocalizedContent(copy)}</p>
      </div>
    </section>
  `;
}

function renderTransitDetailListSection(title, items, { scrollable = false } = {}) {
  if (!Array.isArray(items) || !items.length) {
    return "";
  }

  const sectionBodyClass = scrollable
    ? "transit-modal__section-body transit-modal__section-body--scrollable"
    : "transit-modal__section-body";

  return `
    <section class="transit-modal__section">
      <h3 class="transit-modal__section-title">${renderLocalizedContent(title)}</h3>
      <div class="${sectionBodyClass}">
        <ul class="transit-modal__list">
          ${items
            .map(
              (item) => `<li class="transit-modal__list-item">${renderLocalizedContent(item)}</li>`
            )
            .join("")}
        </ul>
      </div>
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

function resetTransitDetailScrollPosition() {
  [transitDetailModal, transitDetailContentNode]
    .filter(Boolean)
    .forEach((node) => {
      node.scrollTop = 0;
      node.scrollLeft = 0;
    });
}

function renderTransitDetailPlaceholder(
  title,
  summary,
  body,
  { tag = transitDetailLabels.defaultTag } = {}
) {
  if (!transitDetailModal) {
    return;
  }

  setTransitDetailBusyState(true);
  setTransitDetailTag(tag);

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

  resetTransitDetailScrollPosition();
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

  const preferredLink = getPreferredTransitDetailLink(detail);
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
      renderTransitDetailFact(transitDetailLabels.to, detail.to)
    ]
      .filter(Boolean)
      .join("");

    transitDetailMetaNode.hidden = !metaMarkup;
    transitDetailMetaNode.innerHTML = metaMarkup;
  }

  if (transitDetailSectionsNode) {
    transitDetailSectionsNode.innerHTML = [
      renderTransitDetailTextSection(transitDetailLabels.transport, detail.transport),
      renderTransitDetailTextSection(transitDetailLabels.why, detail.why),
      renderTransitDetailListSection(transitDetailLabels.practicalNotes, detail.practicalNotes),
      renderTransitDetailListSection(transitDetailLabels.prepReminders, detail.prepReminders),
      renderTransitDetailListSection(transitDetailLabels.fallbackOptions, detail.fallbackOptions)
    ]
      .filter(Boolean)
      .join("");
  }

  if (transitDetailActionLink) {
    if (preferredLink?.href) {
      transitDetailActionLink.hidden = false;
      transitDetailActionLink.href = preferredLink.href;
      transitDetailActionLink.innerHTML = renderLocalizedContent(
        preferredLink.label || detail.action?.label || transitDetailLabels.fallbackAction
      );
    } else {
      transitDetailActionLink.hidden = true;
      transitDetailActionLink.removeAttribute("href");
    }
  }

  resetTransitDetailScrollPosition();
  syncLocalizedNodes(transitDetailModal);
}

function getChecklistDetailTag(item) {
  if (item?.group === "accommodations") {
    return checklistDetailLabels.stayTag;
  }

  if (item?.kind === "booking") {
    return checklistDetailLabels.bookingTag;
  }

  return checklistDetailLabels.defaultTag;
}

function getTransitBookingDetailTag(item) {
  if (item?.kind === "booking") {
    return checklistDetailLabels.bookingTag;
  }

  return transitDetailLabels.defaultTag;
}

function renderChecklistDetailLoadingState() {
  renderTransitDetailPlaceholder(
    checklistDetailLabels.loadingTitle,
    checklistDetailLabels.loadingSummary,
    checklistDetailLabels.loadingBody,
    { tag: checklistDetailLabels.defaultTag }
  );
}

function renderChecklistDetailUnavailableState() {
  renderTransitDetailPlaceholder(
    checklistDetailLabels.unavailableTitle,
    checklistDetailLabels.unavailableSummary,
    checklistDetailLabels.unavailableBody,
    { tag: checklistDetailLabels.defaultTag }
  );
}

function renderChecklistDetailErrorState() {
  renderTransitDetailPlaceholder(
    checklistDetailLabels.errorTitle,
    checklistDetailLabels.errorSummary,
    checklistDetailLabels.errorBody,
    { tag: checklistDetailLabels.defaultTag }
  );
}

function renderBookingTransitDetail(item, { tag = getChecklistDetailTag(item) } = {}) {
  if (!transitDetailModal || !item) {
    return;
  }

  const preferredLink = getPreferredBookingTransitLink(item);
  const referenceNote = preferredLink?.note || null;

  setTransitDetailBusyState(false);
  setTransitDetailTag(tag);

  if (transitDetailTitleNode) {
    transitDetailTitleNode.innerHTML = renderLocalizedContent(item.title);
  }

  if (transitDetailSummaryNode) {
    transitDetailSummaryNode.innerHTML = renderLocalizedContent(item.summary);
  }

  if (transitDetailMetaNode) {
    const metaMarkup = [
      renderTransitDetailFact(checklistDetailLabels.when, item.dayLabel),
      renderTransitDetailFact(checklistDetailLabels.type, item.typeLabel)
    ]
      .filter(Boolean)
      .join("");

    transitDetailMetaNode.hidden = !metaMarkup;
    transitDetailMetaNode.innerHTML = metaMarkup;
  }

  if (transitDetailSectionsNode) {
    transitDetailSectionsNode.innerHTML = [
      renderTransitDetailTextSection(checklistDetailLabels.notes, item.details),
      renderTransitDetailTextSection(checklistDetailLabels.referenceNote, referenceNote)
    ]
      .filter(Boolean)
      .join("");
  }

  if (transitDetailActionLink) {
    if (preferredLink?.href) {
      transitDetailActionLink.hidden = false;
      transitDetailActionLink.href = preferredLink.href;
      transitDetailActionLink.innerHTML = renderLocalizedContent(
        preferredLink.label || checklistDetailLabels.fallbackAction
      );
    } else {
      transitDetailActionLink.hidden = true;
      transitDetailActionLink.removeAttribute("href");
    }
  }

  resetTransitDetailScrollPosition();
  syncLocalizedNodes(transitDetailModal);
}

function renderChecklistDetail(item) {
  renderBookingTransitDetail(item, { tag: getChecklistDetailTag(item) });
}

function openChecklistDetail(detailId, triggerElement) {
  if (!transitDetailModal || !detailId) {
    return;
  }

  if (resetProgressModal && !resetProgressModal.hidden) {
    setResetModalOpen(false);
  }

  const requestKey = `checklist:${detailId}`;
  lastTransitTrigger = triggerElement || document.activeElement;
  activeTransitDetailId = requestKey;
  renderChecklistDetailLoadingState();
  setTransitModalOpen(true);

  loadBookingTransitItems()
    .then(() => {
      if (activeTransitDetailId !== requestKey) {
        return;
      }

      const detail = bookingTransitItemMap.get(detailId);
      if (!detail) {
        renderChecklistDetailUnavailableState();
        return;
      }

      renderChecklistDetail(detail);
    })
    .catch(() => {
      if (activeTransitDetailId === requestKey) {
        renderChecklistDetailErrorState();
      }
    });
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

  loadBookingTransitItems()
    .then(() => {
      if (activeTransitDetailId !== detailId) {
        return null;
      }

      const bookingDetail = getBookingTransitItemByDetailId(detailId);
      if (bookingDetail) {
        renderBookingTransitDetail(bookingDetail, {
          tag: getTransitBookingDetailTag(bookingDetail)
        });
        return null;
      }

      return loadTransitDetailItems().then(() => {
        if (activeTransitDetailId !== detailId) {
          return;
        }

        const detail = transitDetailItemMap.get(detailId);
        if (!detail) {
          renderTransitDetailUnavailableState();
          return;
        }

        renderTransitDetail(detail);
      });
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

function applyBudgetEstimateSources(sourceData, { loaded = false } = {}) {
  const normalizedSourceData =
    sourceData && typeof sourceData === "object" && !Array.isArray(sourceData) ? sourceData : {};

  budgetSourceUpdatedAt =
    typeof normalizedSourceData.lastUpdated === "string" && normalizedSourceData.lastUpdated
      ? normalizedSourceData.lastUpdated
      : budgetSourceUpdatedAt;

  if (
    normalizedSourceData.assumptionCopy &&
    typeof normalizedSourceData.assumptionCopy === "object" &&
    !Array.isArray(normalizedSourceData.assumptionCopy)
  ) {
    budgetAssumptionCopy = normalizedSourceData.assumptionCopy;
  }

  budgetSourceGroups = Array.isArray(normalizedSourceData.sourceGroups)
    ? normalizedSourceData.sourceGroups
    : [];
  budgetStayDefinitions =
    normalizedSourceData.stayDefinitions &&
    typeof normalizedSourceData.stayDefinitions === "object" &&
    !Array.isArray(normalizedSourceData.stayDefinitions)
      ? normalizedSourceData.stayDefinitions
      : {};
  budgetDayDefinitions = Array.isArray(normalizedSourceData.dayDefinitions)
    ? normalizedSourceData.dayDefinitions
    : [];

  budgetEstimateSources = {
    lastUpdated: budgetSourceUpdatedAt,
    updatedCopy: { en: "", ja: "" },
    metaCopy: { en: "", ja: "" },
    helperCopy: { en: "", ja: "" },
    assumptionCopy: budgetAssumptionCopy,
    fx: null,
    tripBaseCosts: {},
    dayProfiles: {},
    sourceGroups: budgetSourceGroups,
    stayDefinitions: budgetStayDefinitions,
    dayDefinitions: budgetDayDefinitions,
    sections: {},
    ...normalizedSourceData
  };

  budgetEstimateSourcesLoaded = loaded || budgetEstimateSourcesLoaded;
  return budgetEstimateSources;
}

function getBudgetEstimateSources() {
  if (budgetEstimateSources) {
    return budgetEstimateSources;
  }

  return applyBudgetEstimateSources({
    lastUpdated: budgetSourceUpdatedAt,
    updatedCopy: { en: "", ja: "" },
    metaCopy: { en: "", ja: "" },
    helperCopy: { en: "", ja: "" },
    assumptionCopy: budgetAssumptionCopy,
    fx: null,
    tripBaseCosts: {},
    dayProfiles: {},
    sourceGroups: budgetSourceGroups,
    stayDefinitions: budgetStayDefinitions,
    dayDefinitions: budgetDayDefinitions,
    sections: {}
  });
}

function loadBudgetEstimateSources() {
  if (budgetEstimateSourcesLoaded) {
    return Promise.resolve(getBudgetEstimateSources());
  }

  if (budgetEstimateSourcesPromise) {
    return budgetEstimateSourcesPromise;
  }

  budgetEstimateSourcesPromise = loadBudgetContentData()
    .catch((error) => {
      console.error("Budget estimate data could not be loaded.", error);
      return getBudgetEstimateSources();
    })
    .finally(() => {
      budgetEstimateSourcesPromise = null;
    });

  return budgetEstimateSourcesPromise;
}

function ensureBudgetConfigLoaded() {
  return loadBudgetEstimateSources();
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

function scheduleNonCriticalTask(callback, timeout = deferredNonCriticalLayoutTimeoutMs) {
  if (typeof callback !== "function") {
    return;
  }

  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(() => callback(), { timeout });
    return;
  }

  window.setTimeout(callback, Math.min(timeout, 240));
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
    .register(serviceWorkerUrl, { updateViaCache: "none" })
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

  themeColorMeta.content = theme === "dark" ? "#18261d" : "#e7efe3";
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
  const saveDataEnabled = Boolean(navigator.connection?.saveData);
  const constrainedTouchDevice =
    coarsePointerQuery.matches && compactViewportQuery.matches && isLikelyLowerPowerDevice();

  return aggressivePerformanceMode || reducedMotionQuery.matches || saveDataEnabled || constrainedTouchDevice;
}

function syncReducedEffectsMode({ force = false } = {}) {
  const nextReducedEffectsEnabled = shouldReduceEffects();
  if (!force && reducedEffectsEnabled === nextReducedEffectsEnabled) {
    return;
  }

  reducedEffectsEnabled = nextReducedEffectsEnabled;
  root.classList.toggle("reduce-effects", reducedEffectsEnabled);
  root.classList.toggle("enhanced-effects", !reducedEffectsEnabled);

  if (reducedEffectsEnabled) {
    clearSiteTransitionState();

    if (desktopReverseScrollTimer) {
      window.clearTimeout(desktopReverseScrollTimer);
      desktopReverseScrollTimer = 0;
    }

    if (scrollMotionEconomyTimer) {
      window.clearTimeout(scrollMotionEconomyTimer);
      scrollMotionEconomyTimer = 0;
    }

    root.classList.remove("desktop-scroll-reverse", "scroll-motion-economy");
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
      parsed?.filter === "transit" || parsed?.filter === "done"
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

function syncLocalizedDocumentTitle(language = root.lang) {
  const normalizedLanguage = language === "ja" ? "ja" : "en";
  const nextTitle = pageTitles[normalizedLanguage] || pageTitles.en;
  document.title = nextTitle;
  if (appleWebAppTitleMeta) {
    appleWebAppTitleMeta.setAttribute("content", nextTitle);
  }
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
  if (!tripNotesGridNode || !initializedSections.has("notes") || !routeContentLoaded) {
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

function getBookingTransitItemByDetailId(detailId) {
  if (!detailId) {
    return null;
  }

  return (
    bookingTransitItemMap.get(detailId) ||
    bookingTransitItems.find((item) => item.transitDetailId === detailId) ||
    null
  );
}

function getPreferredTransitDetailLink(detail) {
  return getPreferredBookingTransitLink(getBookingTransitItemByDetailId(detail?.id) || detail);
}

function renderBookingTransitMetaTag(content, className = "") {
  if (!content || (typeof content !== "object" && typeof content !== "string")) {
    return "";
  }

  const labelMarkup =
    typeof content === "string" ? escapeHtml(content) : renderLocalizedContent(content);
  return `<span class="booking-item__tag ${className}">${labelMarkup}</span>`;
}

function renderBookingTransitItem(item) {
  const state = getBookingTransitItemState(item.id);
  const preferredLink = getPreferredBookingTransitLink(item);
  const dayTagMarkup = renderBookingTransitMetaTag(item.dayLabel, "booking-item__tag--day");
  const typeTagMarkup = renderBookingTransitMetaTag(item.typeLabel, "booking-item__tag--type");
  const transitTriggerMarkup = "";
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
          <span class="booking-item__meta-copy">
            ${dayTagMarkup}
            ${typeTagMarkup}
          </span>
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
      const groupCopyMarkup =
        group.copy?.en || group.copy?.ja
          ? `<p class="booking-group__copy">${renderLocalizedContent(group.copy)}</p>`
          : "";
      const itemsMarkup = bookingTransitItems
        .filter((item) => item.group === group.id)
        .map((item) => renderBookingTransitItem(item))
        .join("");

      return `
        <details class="booking-group" data-booking-group-section="${group.id}">
          <summary class="booking-group__summary">
            <div class="booking-group__header">
              <h5 class="booking-group__title">${renderLocalizedContent(group.title)}</h5>
              ${groupCopyMarkup}
            </div>
            <span class="booking-group__caret" aria-hidden="true"></span>
          </summary>
          <div class="booking-group__content">
            <div class="booking-group__list">
              ${itemsMarkup}
            </div>
          </div>
        </details>
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

  return false;
}

function updateBookingTransitUI() {
  const bookingTransitRoot = getBookingTransitRoot();
  const bookingTransitEmptyState = getBookingTransitEmptyState();
  const allowedFilters = new Set(["all", "done"]);

  if (!bookingTransitRoot) {
    return;
  }

  if (!allowedFilters.has(bookingTransitState.filter)) {
    bookingTransitState.filter = "all";
    storeBookingTransitState();
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
  const allowedFilters = new Set(["all", "done"]);
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

function getPackingStateSnapshot() {
  return packingInitialized ? packingState : readStoredPackingState();
}

function isChecklistGuidanceActive() {
  const itemIds = getAllPackingItems()
    .map((itemElement) => itemElement.dataset.packingItem || "")
    .filter(Boolean);

  if (!itemIds.length) {
    return false;
  }

  const stateSnapshot = getPackingStateSnapshot();
  return !itemIds.every((itemId) => Boolean(stateSnapshot[itemId]));
}

function isChecklistAccessLocked() {
  return isChecklistGuidanceActive();
}

function updateChecklistAccessState() {
  const isLocked = isChecklistAccessLocked();
  const checklistPanel = getSectionPanel("checklist");

  if (checklistTab) {
    checklistTab.classList.remove("is-disabled");
    checklistTab.setAttribute("aria-disabled", "false");
  }

  if (checklistPanel) {
    checklistPanel.dataset.essentialsLocked = String(isLocked);
    checklistPanel.dataset.essentialsGuidance = String(isLocked);
    if (isLocked && checklistPanel.contains(document.activeElement)) {
      document.activeElement?.blur?.();
    }
    clearChecklistHover(checklistPanel);
  }

  if (checklistGateNotice) {
    checklistGateNotice.hidden = !isLocked;
  }

  return isLocked;
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

  updateChecklistAccessState();
  refreshChecklistProgressState({ syncDayCards: initializedSections.has("checklist") });
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

      playSectionOpenSound();
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

let initializeBudgetNotes = () => Promise.resolve();
let refreshBudgetNotesIfReady = () => {};

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

  currentHeaderHeight = measuredHeight;
  reservedHeaderHeight = measuredHeight;

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

function updateMaxScrollableY() {
  const scrollRoot = document.scrollingElement || document.documentElement;
  maxScrollableY = Math.max((scrollRoot?.scrollHeight || 0) - window.innerHeight, 0);
  return maxScrollableY;
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

  if (headerLockReleaseTimer) {
    window.clearTimeout(headerLockReleaseTimer);
    headerLockReleaseTimer = 0;
  }

  headerLockReleaseTimer = window.setTimeout(() => {
    headerLockReleaseTimer = 0;
    if (window.performance.now() < headerLockUntil) {
      return;
    }

    headerLockUntil = 0;
    syncHeaderState();
  }, Math.max(duration, 0) + 32);
}

function getHeaderScrollOffset(extra = 20) {
  const measuredHeaderHeight = Math.ceil(
    currentHeaderHeight || reservedHeaderHeight || headerReservedHeightFallbackPx
  );
  const baseOffset = reservedHeaderHeight;
  return Math.max(baseOffset + extra, measuredHeaderHeight + extra);
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
  if (!siteHeader) {
    return false;
  }

  const didChange =
    headerIsCondensed || siteHeader.classList.contains("is-condensed") || Boolean(nextState);

  headerIsCondensed = false;
  siteHeader.classList.remove("is-condensed");
  syncHeaderAccessoryVisibility(false);
  return didChange;
}

function getRemainingScrollDistance(scrollY = window.scrollY) {
  return Math.max(maxScrollableY - scrollY, 0);
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

function collectRevealBlocks(scope = document) {
  const blocks = [];
  if (scope?.matches?.(revealBlockSelector)) {
    blocks.push(scope);
  }

  if (scope?.querySelectorAll) {
    blocks.push(...scope.querySelectorAll(revealBlockSelector));
  }

  return Array.from(new Set(blocks));
}

function updateRevealScrollDirection(scrollY = window.scrollY) {
  const nextScrollY = Math.max(scrollY, 0);
  const delta = nextScrollY - lastRevealScrollY;

  if (Math.abs(delta) >= revealScrollDirectionThresholdPx) {
    revealScrollDirection = delta > 0 ? 1 : -1;
  }

  lastRevealScrollY = nextScrollY;
  return revealScrollDirection;
}

function syncScrollMotionState(scrollY = window.scrollY) {
  const nextScrollY = Math.max(scrollY, 0);
  const now = window.performance.now();
  const delta = nextScrollY - lastScrollMotionSampleY;
  const elapsed = Math.max(now - lastScrollMotionSampleTime, 16);
  const velocity = Math.abs(delta) / elapsed;

  lastScrollMotionSampleY = nextScrollY;
  lastScrollMotionSampleTime = now;

  const shouldTrackDesktopScroll =
    !reducedEffectsEnabled && !coarsePointerQuery.matches && !compactViewportQuery.matches;

  if (!shouldTrackDesktopScroll) {
    root.classList.remove("desktop-scroll-reverse", "scroll-motion-economy");
    return;
  }

  if (delta < -revealScrollDirectionThresholdPx) {
    root.classList.add("desktop-scroll-reverse");
    if (desktopReverseScrollTimer) {
      window.clearTimeout(desktopReverseScrollTimer);
    }
    desktopReverseScrollTimer = window.setTimeout(() => {
      desktopReverseScrollTimer = 0;
      root.classList.remove("desktop-scroll-reverse");
    }, scrollMotionClassHoldMs);
  }

  if (velocity > scrollMotionEconomyVelocityThreshold) {
    root.classList.add("scroll-motion-economy");
    if (scrollMotionEconomyTimer) {
      window.clearTimeout(scrollMotionEconomyTimer);
    }
    scrollMotionEconomyTimer = window.setTimeout(() => {
      scrollMotionEconomyTimer = 0;
      root.classList.remove("scroll-motion-economy");
    }, Math.max(120, scrollMotionClassHoldMs - 20));
  }
}

function getRevealDirectionName(direction = revealScrollDirection) {
  return direction < 0 ? "down" : "up";
}

function cancelPendingRevealFrame(block) {
  const frameId = revealRestartFrames.get(block);
  if (!frameId) {
    return;
  }

  window.cancelAnimationFrame(frameId);
  revealRestartFrames.delete(block);
}

function hideRevealBlock(block, entry = null) {
  if (!block) {
    return;
  }

  cancelPendingRevealFrame(block);
  block.classList.remove("is-visible");
  block.dataset.revealState = "hidden";

  if (!entry) {
    block.dataset.revealDirection = getRevealDirectionName();
    return;
  }

  if (entry.boundingClientRect.bottom <= 0) {
    block.dataset.revealDirection = "down";
    return;
  }

  if (entry.boundingClientRect.top >= window.innerHeight) {
    block.dataset.revealDirection = "up";
    return;
  }

  block.dataset.revealDirection = getRevealDirectionName();
}

function revealBlock(block, { direction = revealScrollDirection, immediate = false } = {}) {
  if (!block) {
    return;
  }

  cancelPendingRevealFrame(block);
  block.dataset.revealDirection = getRevealDirectionName(direction);
  block.dataset.revealState = "staging";
  block.classList.remove("is-visible");

  if (immediate || reducedEffectsEnabled) {
    block.classList.add("is-visible");
    block.dataset.revealState = "visible";
    return;
  }

  const frameId = window.requestAnimationFrame(() => {
    block.classList.add("is-visible");
    block.dataset.revealState = "visible";
    revealRestartFrames.delete(block);
  });

  revealRestartFrames.set(block, frameId);
}

function isRevealBlockInViewport(block) {
  if (!block) {
    return false;
  }

  const rect = block.getBoundingClientRect();
  return rect.bottom >= 0 && rect.top <= window.innerHeight * 0.94;
}

function ensureRevealObserver() {
  if (reducedEffectsEnabled || revealObserver || !("IntersectionObserver" in window)) {
    return;
  }

  revealObserver = new window.IntersectionObserver(
    (entries) => {
      updateRevealScrollDirection();
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.dataset.revealState !== "visible") {
            revealBlock(entry.target, { direction: revealScrollDirection });
          }
          return;
        }

        hideRevealBlock(entry.target, entry);
      });
    },
    {
      threshold: [0, 0.14, 0.32],
      rootMargin: "0px 0px -8% 0px"
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
      updateMaxScrollableY();

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
  const warm = () => {
    if (initialSection !== "route") {
      void warmRouteExperience();
    } else {
      void ensureRouteSectionStylesLoaded();
      void ensureRouteContentLoaded();
    }

    void warmDeferredExperienceAssets();
  };

  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(warm, { timeout: 1200 });
    return;
  }

  window.setTimeout(warm, 260);
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
  if (isChecklistAccessLocked()) {
    const lockedTarget = event.target.closest(".check-item, .transit-trigger--checklist");
    if (lockedTarget) {
      event.preventDefault();
      event.stopPropagation();
      showChecklistLockNotice();
      return;
    }
  }

  const transitTrigger = event.target.closest("[data-transit-detail-trigger]");
  const checklistDetailTrigger = event.target.closest("[data-checklist-detail-trigger]");
  const dayCard = event.target.closest(".day-card[data-day]");
  if (transitTrigger || checklistDetailTrigger) {
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
    if (transitTrigger) {
      openTransitDetail(transitTrigger.dataset.transitDetailTrigger || "", transitTrigger);
      return;
    }

    openChecklistDetail(
      checklistDetailTrigger?.dataset.checklistDetailTrigger || "",
      checklistDetailTrigger
    );
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

function setActiveChecklistHover(nextItem) {
  if (activeChecklistHoverItem && activeChecklistHoverItem !== nextItem) {
    activeChecklistHoverItem.classList.remove("is-pointer-active");
  }

  activeChecklistHoverItem = nextItem || null;

  if (activeChecklistHoverItem) {
    activeChecklistHoverItem.classList.add("is-pointer-active");
  }
}

function clearChecklistHover(panel = getSectionPanel("checklist")) {
  if (activeChecklistHoverItem) {
    activeChecklistHoverItem.classList.remove("is-pointer-active");
    activeChecklistHoverItem = null;
  }

  if (!panel) {
    return;
  }

  panel.querySelectorAll(".check-item.is-pointer-active").forEach((item) => {
    item.classList.remove("is-pointer-active");
  });
}

function updateChecklistPointerGlow(item, clientX, clientY) {
  if (!item) {
    return;
  }

  const rect = item.getBoundingClientRect();
  item.style.setProperty("--check-pointer-x", `${clientX - rect.left}px`);
  item.style.setProperty("--check-pointer-y", `${clientY - rect.top}px`);
}

function triggerChecklistInteractionFeedback(input) {
  if (!input || aggressivePerformanceMode || reducedEffectsEnabled) {
    return;
  }

  const checkItem = input.closest(".check-item");
  const dayCard = input.closest(".day-card[data-day]");
  if (!checkItem || !dayCard) {
    return;
  }

  const inputRect = input.getBoundingClientRect();
  const itemRect = checkItem.getBoundingClientRect();
  const dayCardRect = dayCard.getBoundingClientRect();
  const feedbackState = input.checked ? "checked" : "unchecked";

  checkItem.style.setProperty(
    "--check-feedback-x",
    `${inputRect.left - itemRect.left + inputRect.width / 2}px`
  );
  checkItem.style.setProperty(
    "--check-feedback-y",
    `${inputRect.top - itemRect.top + inputRect.height / 2}px`
  );
  dayCard.style.setProperty(
    "--day-feedback-x",
    `${inputRect.left - dayCardRect.left + inputRect.width / 2}px`
  );
  dayCard.style.setProperty(
    "--day-feedback-y",
    `${inputRect.top - dayCardRect.top + inputRect.height / 2}px`
  );

  checkItem.dataset.feedbackState = feedbackState;
  dayCard.dataset.feedbackState = feedbackState;
  checkItem.classList.remove("is-feedback-active");
  dayCard.classList.remove("is-check-feedback");

  restartClassOnNextFrame(checkItem, "is-feedback-active");
  restartClassOnNextFrame(dayCard, "is-check-feedback");

  window.setTimeout(() => {
    checkItem.classList.remove("is-feedback-active");
    dayCard.classList.remove("is-check-feedback");
  }, 820);
}

function handleChecklistPanelPointerMove(event) {
  if (isChecklistAccessLocked()) {
    clearChecklistHover(event.currentTarget);
    return;
  }

  if (aggressivePerformanceMode || reducedEffectsEnabled || coarsePointerQuery.matches) {
    return;
  }

  const nextItem = event.target.closest(".check-item");
  if (!nextItem) {
    clearChecklistHover(event.currentTarget);
    return;
  }

  setActiveChecklistHover(nextItem);
  updateChecklistPointerGlow(nextItem, event.clientX, event.clientY);
}

function handleChecklistPanelPointerLeave(event) {
  clearChecklistHover(event.currentTarget);
}

function handleChecklistPanelFocusIn(event) {
  if (isChecklistAccessLocked()) {
    clearChecklistHover(event.currentTarget);
    return;
  }

  const checkItem = event.target.closest(".check-item");
  if (!checkItem) {
    return;
  }

  setActiveChecklistHover(checkItem);
}

function handleChecklistPanelFocusOut(event) {
  const panel = event.currentTarget;
  window.requestAnimationFrame(() => {
    const nextFocusedItem = panel?.querySelector(".check-item:focus-within") || null;
    if (nextFocusedItem) {
      setActiveChecklistHover(nextFocusedItem);
      return;
    }

    clearChecklistHover(panel);
  });
}

function handleChecklistPanelChange(event) {
  if (isChecklistAccessLocked()) {
    event.preventDefault();
    showChecklistLockNotice();
    restoreChecklistState(event.currentTarget);
    return;
  }

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

  triggerChecklistInteractionFeedback(input);
  playSectionOpenSound();
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
    panel.addEventListener("pointermove", handleChecklistPanelPointerMove);
    panel.addEventListener("pointerleave", handleChecklistPanelPointerLeave);
    panel.addEventListener("focusin", handleChecklistPanelFocusIn);
    panel.addEventListener("focusout", handleChecklistPanelFocusOut);
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

async function initNotesSection() {
  const panel = getSectionPanel("notes");
  if (!panel) {
    return;
  }

  await ensureRouteContentLoaded();
  renderTripNotes();
  registerRevealBlocks(panel);
}

async function initBudgetSection() {
  const panel = getSectionPanel("budget");
  if (!panel) {
    return;
  }

  registerRevealBlocks(panel);
  await Promise.all([ensureBudgetConfigLoaded(), ensureBudgetUiLoaded()]);
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

function getRouteDayReference(day) {
  const normalizedDay = Number.parseInt(String(day), 10);
  const tripNote = tripNoteDefinitionMap.get(normalizedDay) || null;
  const fallbackTitle = tripNote?.title || {
    en: `Day ${normalizedDay}`,
    ja: `${normalizedDay}日目`
  };

  return {
    day: normalizedDay,
    title: fallbackTitle,
    displayTitle: {
      en:
        fallbackTitle.en.replace(
          new RegExp(`^Day\\s+${normalizedDay}\\s*[-:]\\s*`, "i"),
          ""
        ) || fallbackTitle.en,
      ja:
        fallbackTitle.ja.replace(
          new RegExp(`^${normalizedDay}日目[・\\-]\\s*`),
          ""
        ) || fallbackTitle.ja
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
    engine: "idle",
    markers: [],
    markerStateKey: "",
    styleSignature: ""
  };
}

function getRouteMapCardNode() {
  return getLazyNode("routeMapCard", ".route-map");
}

function getRouteMapShellNode() {
  return getLazyNode("routeMapShell", "[data-route-map-shell]");
}

function getRouteMapCanvasNode() {
  return getLazyNode("routeMapCanvas", "[data-route-map-canvas]");
}

function getRouteMapStatusNode() {
  return getLazyNode("routeMapStatus", "[data-route-map-status]");
}

function getRouteMapStopsNode() {
  return getLazyNode("routeMapStops", "[data-route-map-stops]");
}

function getRouteMapExplorerNode() {
  return getLazyNode("routeMapExplorer", "[data-route-map-explorer]");
}

function getRouteMapDetailNode() {
  return getRouteMapExplorerNode()?.querySelector("[data-route-map-detail]") || null;
}

function getRouteMapDayRailNode() {
  return getRouteMapStopsNode()?.querySelector("[data-route-map-day-rail]") || null;
}

function getRouteMapDayControlNodes() {
  return Array.from(getRouteMapStopsNode()?.querySelectorAll("[data-route-map-day-shift]") || []);
}

function getRouteMapDayCardNode(day) {
  return getRouteMapStopsNode()?.querySelector(`[data-route-map-day-card="${day}"]`) || null;
}

function syncRouteMapFocusSurfaceState() {
  const shellNode = getRouteMapShellNode();
  if (!shellNode) {
    return;
  }

  shellNode.classList.toggle("is-map-focused", shellNode.contains(document.activeElement));
}

function syncRouteMapInteractiveSurfaceAttributes() {
  const canvasNode = getRouteMapCanvasNode();
  if (!canvasNode) {
    return;
  }

  const interactiveLabel = getLocalizedText(routeMapLabels.interactiveSurfaceLabel);
  canvasNode.tabIndex = 0;
  canvasNode.setAttribute("role", "region");
  canvasNode.setAttribute("aria-label", interactiveLabel);
  canvasNode.setAttribute("title", interactiveLabel);
}

function focusRouteMapCanvasSurface() {
  const canvasNode = getRouteMapCanvasNode();
  if (!canvasNode?.focus) {
    return;
  }

  try {
    canvasNode.focus({ preventScroll: true });
  } catch {
    canvasNode.focus();
  }
}

function getRouteMapKeyboardPanOffset(key, { shiftKey = false } = {}) {
  const step = shiftKey ? routeMapKeyboardPanStepPx * 1.55 : routeMapKeyboardPanStepPx;

  switch (key) {
    case "ArrowUp":
      return [0, -step];
    case "ArrowDown":
      return [0, step];
    case "ArrowLeft":
      return [-step, 0];
    case "ArrowRight":
      return [step, 0];
    default:
      return null;
  }
}

function handleRouteMapKeyboardControls(event) {
  const map = routeMapState.map;
  const shellNode = getRouteMapShellNode();
  if (
    !map ||
    !routeMapState.ready ||
    !shellNode?.contains(event.target) ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey
  ) {
    return;
  }

  const panOffset = getRouteMapKeyboardPanOffset(event.key, event);
  if (panOffset) {
    event.preventDefault();
    event.stopPropagation();
    map.stop?.();
    map.panBy(panOffset, {
      duration: reducedEffectsEnabled ? 0 : routeMapKeyboardPanDurationMs,
      easing: (value) => 1 - Math.pow(1 - value, 3)
    });
    return;
  }

  if (event.key === "Home") {
    event.preventDefault();
    event.stopPropagation();
    fitRouteMapOverview(map);
    return;
  }

  if (event.key === "+" || event.key === "=" || event.key === "Add") {
    event.preventDefault();
    event.stopPropagation();
    map.easeTo({
      zoom: Math.min(map.getZoom() + 0.6, map.getMaxZoom?.() ?? 22),
      duration: reducedEffectsEnabled ? 0 : 280,
      essential: true
    });
    return;
  }

  if (event.key === "-" || event.key === "_" || event.key === "Subtract") {
    event.preventDefault();
    event.stopPropagation();
    map.easeTo({
      zoom: Math.max(map.getZoom() - 0.6, map.getMinZoom?.() ?? 0),
      duration: reducedEffectsEnabled ? 0 : 280,
      essential: true
    });
  }
}

function bindRouteMapInteractiveSurface() {
  const shellNode = getRouteMapShellNode();
  const canvasNode = getRouteMapCanvasNode();
  if (!shellNode || !canvasNode || shellNode.dataset.routeMapFocusBound === "true") {
    syncRouteMapInteractiveSurfaceAttributes();
    return;
  }

  syncRouteMapInteractiveSurfaceAttributes();
  shellNode.addEventListener("keydown", handleRouteMapKeyboardControls, true);
  shellNode.addEventListener("focusin", syncRouteMapFocusSurfaceState);
  shellNode.addEventListener("focusout", () => {
    window.requestAnimationFrame(syncRouteMapFocusSurfaceState);
  });
  shellNode.addEventListener(
    "pointerdown",
    (event) => {
      if (
        event.target.closest(
          ".route-map__status, .maplibregl-ctrl, .maplibregl-popup, .route-map-marker"
        )
      ) {
        return;
      }

      focusRouteMapCanvasSurface();
    },
    { passive: true }
  );
  shellNode.dataset.routeMapFocusBound = "true";
  syncRouteMapFocusSurfaceState();
}

function updateRouteMapDayRailMetrics(railNode = getRouteMapDayRailNode()) {
  if (!railNode) {
    routeMapDayRailStep = 0;
    routeMapDayRailMaxScroll = 0;
    return;
  }

  const firstCard = railNode.querySelector(".route-reference__day");
  const styles = window.getComputedStyle(railNode);
  const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
  routeMapDayRailStep = firstCard
    ? firstCard.getBoundingClientRect().width + gap
    : Math.max(railNode.clientWidth * 0.82, 180);
  routeMapDayRailMaxScroll = Math.max(railNode.scrollWidth - railNode.clientWidth, 0);
  routeMapDayRailScrollLeft = Math.min(routeMapDayRailScrollLeft, routeMapDayRailMaxScroll);
}

function getPrimaryRouteDayFromLinks(dayLinks = []) {
  const primaryDay = dayLinks
    .map((link) => Number.parseInt(String(link?.day), 10))
    .find(Number.isFinite);

  return Number.isFinite(primaryDay) ? primaryDay : null;
}

function getRouteViewIdForDay(day) {
  const normalizedDay = Number.parseInt(String(day), 10);
  if (!Number.isFinite(normalizedDay)) {
    return "";
  }

  const viewId = `day-${normalizedDay}`;
  return getRouteExplorerViewById(viewId) ? viewId : "";
}

function getRouteStopPrimaryDay(stopId) {
  const stop = routeExplorerStopMap.get(stopId);
  if (!stop) {
    return null;
  }

  return Number.isFinite(stop.primaryDay) ? stop.primaryDay : getPrimaryRouteDayFromLinks(stop.dayLinks);
}

function bindRouteMapDayRailEvents() {
  const railNode = getRouteMapDayRailNode();
  if (!railNode || railNode.dataset.routeMapDayRailBound === "true") {
    return;
  }

  railNode.addEventListener(
    "scroll",
    () => {
      routeMapDayRailScrollLeft = railNode.scrollLeft;
      syncRouteMapDaySliderControls();
    },
    { passive: true }
  );
  railNode.dataset.routeMapDayRailBound = "true";
}

function syncRouteMapDaySliderControls() {
  const railNode = getRouteMapDayRailNode();
  const controlNodes = getRouteMapDayControlNodes();
  if (!railNode || !controlNodes.length) {
    return;
  }

  const maxScroll = routeMapDayRailMaxScroll;
  const hasOverflow = maxScroll > 4;
  routeMapDayRailScrollLeft = Math.min(routeMapDayRailScrollLeft, maxScroll);

  controlNodes.forEach((controlNode) => {
    const direction = Number(controlNode.dataset.routeMapDayShift);
    controlNode.hidden = !hasOverflow;
    if (!hasOverflow) {
      controlNode.disabled = true;
      return;
    }

    controlNode.disabled =
      direction < 0
        ? routeMapDayRailScrollLeft <= 4
        : routeMapDayRailScrollLeft >= maxScroll - 4;
  });
}

function syncRouteMapDaySliderUI() {
  const railNode = getRouteMapDayRailNode();
  if (!railNode) {
    return;
  }

  bindRouteMapDayRailEvents();
  updateRouteMapDayRailMetrics(railNode);

  routeMapDayRailScrollLeft = Math.min(routeMapDayRailScrollLeft, routeMapDayRailMaxScroll);
  if (Math.abs(railNode.scrollLeft - routeMapDayRailScrollLeft) > 1) {
    railNode.scrollLeft = routeMapDayRailScrollLeft;
  }

  syncRouteMapDaySliderControls();
}

function scheduleRouteMapDaySliderSync() {
  if (routeMapDaySliderSyncFrame) {
    return;
  }

  routeMapDaySliderSyncFrame = window.requestAnimationFrame(() => {
    routeMapDaySliderSyncFrame = 0;
    syncRouteMapDaySliderUI();
  });
}

function slideRouteMapDayRail(direction = 1) {
  const railNode = getRouteMapDayRailNode();
  if (!railNode) {
    return;
  }

  if (routeMapDayRailStep <= 0) {
    updateRouteMapDayRailMetrics(railNode);
  }

  const step = routeMapDayRailStep || Math.max(railNode.clientWidth * 0.82, 180);
  const maxScroll = routeMapDayRailMaxScroll;
  const nextScrollLeft = Math.max(
    0,
    Math.min(maxScroll, railNode.scrollLeft + step * direction)
  );

  routeMapDayRailScrollLeft = nextScrollLeft;
  railNode.scrollTo({
    left: nextScrollLeft,
    behavior: reducedEffectsEnabled ? "auto" : "smooth"
  });
  window.requestAnimationFrame(syncRouteMapDaySliderControls);
}

function revealRouteMapDayCard(day, { smooth = false } = {}) {
  const railNode = getRouteMapDayRailNode();
  const dayCardNode = getRouteMapDayCardNode(day);
  if (!railNode || !dayCardNode) {
    return;
  }

  dayCardNode.scrollIntoView({
    behavior: smooth && !reducedEffectsEnabled ? "smooth" : "auto",
    block: "nearest",
    inline: compactViewportQuery.matches ? "center" : "nearest"
  });

  window.requestAnimationFrame(() => {
    routeMapDayRailScrollLeft = railNode.scrollLeft;
    syncRouteMapDaySliderControls();
  });
}

function setActiveRouteMapDaySelection(
  day,
  { updateCamera = true, animateCamera = true, revealDayRail = true } = {}
) {
  const viewId = getRouteViewIdForDay(day);
  if (!viewId) {
    return false;
  }

  activeRouteMapSelection = { type: "view", id: viewId };
  scheduleRouteMapUISync({ updateCamera, animateCamera, revealDayRail });
  return true;
}

function getRouteMapStyleSignature() {
  return routeMapStyleUrl;
}

function setRouteMapShellState(state = "ready") {
  [getRouteMapShellNode()].filter(Boolean).forEach((node) => {
    node.setAttribute("data-map-state", state);
    node.setAttribute("data-route-map-engine", routeMapState.engine || "idle");
  });
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

function setRouteMapLayoutVisibilityIfChanged(map, layerId, visibility) {
  if (!map?.getLayer(layerId)) {
    return;
  }

  const cache = map.__routeMapLayoutVisibilityCache || (map.__routeMapLayoutVisibilityCache = new Map());
  if (cache.get(layerId) === visibility) {
    return;
  }

  map.setLayoutProperty(layerId, "visibility", visibility);
  cache.set(layerId, visibility);
}

function loadRouteMapLibrary() {
  if (routeMapLibraryPromise) {
    return routeMapLibraryPromise;
  }

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

  routeMapLibraryPromise = Promise.all([
    loadRouteMapStylesheet(),
    loadRouteMapScriptAsset(
      routeMapLibraryScriptUrl,
      "data-route-maplibre-script",
      "maplibregl",
      "MapLibre runtime"
    )
  ])
    .then(([, maplibregl]) => {
      return {
        maplibregl
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
      background: "#141a21",
      glowOuter: "rgba(149, 195, 160, 0.22)",
      glowInner: "rgba(214, 236, 220, 0.18)",
      corridor: "rgba(149, 195, 160, 0.2)",
      shadow: "rgba(8, 18, 12, 0.58)",
      routeCasing: "rgba(14, 22, 17, 0.96)",
      routeStart: "#e4f1e7",
      routeMid: "#a6cfb0",
      routeMidAlt: "#6f9c7b",
      routeEnd: "#3f7b54",
      segmentActive: "rgba(228, 241, 231, 0.94)",
      segmentMuted: "rgba(213, 229, 217, 0.14)",
      segmentSelected: "#f4fbf5"
    };
  }

  return {
    background: "#f4f3ef",
    glowOuter: "rgba(63, 123, 84, 0.16)",
    glowInner: "rgba(205, 227, 211, 0.24)",
    corridor: "rgba(63, 123, 84, 0.18)",
    shadow: "rgba(33, 79, 53, 0.16)",
    routeCasing: "rgba(252, 255, 252, 0.96)",
    routeStart: "#214f35",
    routeMid: "#3f7b54",
    routeMidAlt: "#6f9c7b",
    routeEnd: "#9bc1a3",
    segmentActive: "rgba(33, 79, 53, 0.92)",
    segmentMuted: "rgba(73, 96, 80, 0.16)",
    segmentSelected: "#3f7b54"
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

function getRouteMapCameraPadding(mode = "selection") {
  if (mode === "overview") {
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

function getRouteSegmentCoordinates(segmentOrId) {
  const segment =
    typeof segmentOrId === "string" ? getRouteExplorerSegmentById(segmentOrId) : segmentOrId;
  if (!segment) {
    return [];
  }

  const coordinates = Array.isArray(segment.coordinates)
    ? segment.coordinates
    : (segment.stopIds || []).map((stopId) => getRouteStopLngLat(stopId)).filter(Boolean);

  return coordinates.filter(
    (coordinate) =>
      Array.isArray(coordinate) &&
      coordinate.length === 2 &&
      Number.isFinite(coordinate[0]) &&
      Number.isFinite(coordinate[1])
  );
}

function areRouteCoordinatesEqual(left, right) {
  if (!Array.isArray(left) || !Array.isArray(right) || left.length !== 2 || right.length !== 2) {
    return false;
  }

  return Math.abs(left[0] - right[0]) < 0.000001 && Math.abs(left[1] - right[1]) < 0.000001;
}

function appendRouteCoordinates(target, coordinates = []) {
  coordinates.forEach((coordinate) => {
    if (
      !Array.isArray(coordinate) ||
      coordinate.length !== 2 ||
      !Number.isFinite(coordinate[0]) ||
      !Number.isFinite(coordinate[1])
    ) {
      return;
    }

    if (target.length && areRouteCoordinatesEqual(target[target.length - 1], coordinate)) {
      return;
    }

    target.push(coordinate);
  });

  return target;
}

function getRouteMapFullCoordinates() {
  if (Array.isArray(getRouteMapFullCoordinates.cache)) {
    return getRouteMapFullCoordinates.cache;
  }

  const coordinates = [];
  routeExplorerPathDefinitions.forEach((segment) => {
    appendRouteCoordinates(coordinates, getRouteSegmentCoordinates(segment));
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
    return getRouteSegmentCoordinates(selectionState.config);
  }

  if (selectionState.type === "stop") {
    const coordinates = getRouteStopLngLat(selectionState.config.id);
    return coordinates ? [coordinates] : [];
  }

  const coordinates = [];
  Array.from(selectionState.segmentIds || []).forEach((segmentId) => {
    appendRouteCoordinates(coordinates, getRouteSegmentCoordinates(segmentId));
  });

  if (!coordinates.length) {
    appendRouteCoordinates(
      coordinates,
      Array.from(selectionState.stopIds).map((stopId) => getRouteStopLngLat(stopId)).filter(Boolean)
    );
  }

  if (!coordinates.length) {
    return getRouteMapFullCoordinates();
  }

  return coordinates;
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

function clampRouteMapNumber(value, min, max) {
  if (!Number.isFinite(value)) {
    return min;
  }
  return Math.min(max, Math.max(min, value));
}

function toRouteMapLatLngLiteral(coordinate) {
  if (!Array.isArray(coordinate) || coordinate.length !== 2) {
    return null;
  }

  const [lng, lat] = coordinate;
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null;
  }

  return { lat, lng };
}

function getRouteMapCenterFromCoordinates(coordinates = []) {
  const bounds = getRouteMapBoundsFromCoordinates(coordinates);
  if (!bounds) {
    return {
      lat: routeMapInitialView.center[1],
      lng: routeMapInitialView.center[0],
      altitude: 0
    };
  }

  return {
    lat: (bounds[0][1] + bounds[1][1]) / 2,
    lng: (bounds[0][0] + bounds[1][0]) / 2,
    altitude: 0
  };
}

function getRouteMapDistanceMeters(startCoordinate, endCoordinate) {
  if (
    !Array.isArray(startCoordinate) ||
    !Array.isArray(endCoordinate) ||
    startCoordinate.length !== 2 ||
    endCoordinate.length !== 2
  ) {
    return 0;
  }

  const [startLng, startLat] = startCoordinate;
  const [endLng, endLat] = endCoordinate;
  const toRadians = (value) => (value * Math.PI) / 180;
  const earthRadiusMeters = 6371000;
  const latDelta = toRadians(endLat - startLat);
  const lngDelta = toRadians(endLng - startLng);
  const lat1 = toRadians(startLat);
  const lat2 = toRadians(endLat);
  const haversine =
    Math.sin(latDelta / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(lngDelta / 2) ** 2;

  return 2 * earthRadiusMeters * Math.asin(Math.min(1, Math.sqrt(haversine)));
}

function getRouteMapHeadingDegrees(coordinates = []) {
  const validCoordinates = coordinates.filter(
    (coordinate) =>
      Array.isArray(coordinate) &&
      coordinate.length === 2 &&
      Number.isFinite(coordinate[0]) &&
      Number.isFinite(coordinate[1])
  );

  if (validCoordinates.length < 2) {
    return 82;
  }

  const startCoordinate = validCoordinates[0];
  const endCoordinate = validCoordinates[validCoordinates.length - 1];
  const toRadians = (value) => (value * Math.PI) / 180;
  const toDegrees = (value) => (value * 180) / Math.PI;
  const [startLng, startLat] = startCoordinate;
  const [endLng, endLat] = endCoordinate;
  const lngDelta = toRadians(endLng - startLng);
  const y = Math.sin(lngDelta) * Math.cos(toRadians(endLat));
  const x =
    Math.cos(toRadians(startLat)) * Math.sin(toRadians(endLat)) -
    Math.sin(toRadians(startLat)) *
      Math.cos(toRadians(endLat)) *
      Math.cos(lngDelta);

  return (toDegrees(Math.atan2(y, x)) + 360) % 360;
}

function buildRouteMapCameraState(coordinates = [], { overview = false } = {}) {
  const bounds = getRouteMapBoundsFromCoordinates(coordinates);
  const center = getRouteMapCenterFromCoordinates(coordinates);
  const diagonalMeters = bounds ? getRouteMapDistanceMeters(bounds[0], bounds[1]) : 0;
  const isSinglePoint = coordinates.length <= 1 || diagonalMeters < 1600;
  const rangeBase = isSinglePoint
    ? compactViewportQuery.matches
      ? 4200
      : 5200
    : diagonalMeters * (overview ? (compactViewportQuery.matches ? 2.7 : 2.35) : compactViewportQuery.matches ? 2.35 : 2.02);
  const range = clampRouteMapNumber(
    rangeBase,
    isSinglePoint ? 2600 : 5400,
    overview ? 420000 : 240000
  );
  const tilt = isSinglePoint
    ? compactViewportQuery.matches
      ? 62
      : 68
    : overview
      ? compactViewportQuery.matches
        ? 52
        : 58
      : range > 120000
        ? compactViewportQuery.matches
          ? 54
          : 60
        : compactViewportQuery.matches
          ? 64
          : 70;

  return {
    center,
    heading: getRouteMapHeadingDegrees(coordinates),
    range,
    tilt
  };
}

function getRouteMapMarkerVisualState(stop, selectionState) {
  const isDayView =
    selectionState.type === "view" && Number.isFinite(Number(selectionState.config?.day));
  const isActive =
    (selectionState.type === "stop" && selectionState.config.id === stop.id) ||
    (isDayView &&
      Number.isFinite(stop.primaryDay) &&
      Number(stop.primaryDay) === Number(selectionState.config.day));
  const isRelated =
    !isActive &&
    ((selectionState.type === "segment" || isDayView) && selectionState.stopIds.has(stop.id));
  const isDimmed =
    (selectionState.type === "segment" || selectionState.type === "stop" || isDayView) &&
    !isActive &&
    !isRelated;

  return {
    isActive,
    isRelated,
    isDimmed,
    label: getLocalizedText(stop.title),
    title: getLocalizedText(stop.title),
    stateKey: `${isActive ? 1 : 0}|${isRelated ? 1 : 0}|${isDimmed ? 1 : 0}`
  };
}

function resetRouteMapSelectionToOverview(options = {}) {
  if (activeRouteMapSelection.type === "view") {
    return;
  }

  activeRouteMapSelection = { type: "view", id: routeExplorerDefaultSelectionId };
  scheduleRouteMapUISync({
    updateCamera: options.updateCamera !== false,
    animateCamera: options.animateCamera !== false,
    revealDayRail: Boolean(options.revealDayRail)
  });
}

function toggleRouteMapSegmentSelection(segmentId, options = {}) {
  if (!segmentId) {
    return;
  }

  const segment = getRouteExplorerSegmentById(segmentId);
  const revealDayRail = Number.isFinite(getPrimaryRouteDayFromLinks(segment?.dayLinks));
  const isSameSegment =
    activeRouteMapSelection.type === "segment" && activeRouteMapSelection.id === segmentId;

  activeRouteMapSelection = isSameSegment
    ? { type: "view", id: routeExplorerDefaultSelectionId }
    : { type: "segment", id: segmentId };

  scheduleRouteMapUISync({
    updateCamera: options.updateCamera !== false,
    animateCamera: options.animateCamera !== false,
    revealDayRail: options.revealDayRail ?? (!isSameSegment && revealDayRail)
  });
}

function toggleRouteMapStopSelection(stopId, options = {}) {
  if (!stopId) {
    return;
  }

  const primaryDay = getRouteStopPrimaryDay(stopId);
  if (
    Number.isFinite(primaryDay) &&
    setActiveRouteMapDaySelection(primaryDay, {
      updateCamera: options.updateCamera !== false,
      animateCamera: options.animateCamera !== false,
      revealDayRail: options.revealDayRail !== false
    })
  ) {
    return;
  }

  const isSameStop =
    activeRouteMapSelection.type === "stop" && activeRouteMapSelection.id === stopId;
  activeRouteMapSelection = isSameStop
    ? { type: "view", id: routeExplorerDefaultSelectionId }
    : { type: "stop", id: stopId };

  scheduleRouteMapUISync({
    updateCamera: options.updateCamera !== false,
    animateCamera: options.animateCamera !== false,
    revealDayRail: Boolean(options.revealDayRail)
  });
}

function clearRouteMapCanvasNode() {
  const canvasNode = getRouteMapCanvasNode();
  if (!canvasNode) {
    return null;
  }

  canvasNode.replaceChildren();
  return canvasNode;
}

function getRouteMapGeoJsonData() {
  if (getRouteMapGeoJsonData.cache) {
    return getRouteMapGeoJsonData.cache;
  }

  const fullCoordinates = getRouteMapFullCoordinates();
  const segments = routeExplorerPathDefinitions
    .map((segment) => {
      const coordinates = getRouteSegmentCoordinates(segment);
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

function buildRouteMapBaseStyle() {
  return routeMapStyleUrl;
}

function reduceRouteMapBaseClutter(map) {
  const layers = map?.getStyle?.()?.layers;
  if (!Array.isArray(layers)) {
    return;
  }

  const hideMatchers = [/poi/i, /transit/i, /housenum/i, /aeroway/i, /building/i, /parking/i];
  layers.forEach((layer) => {
    if (layer?.type !== "symbol") {
      return;
    }

    const id = String(layer.id || "");
    const sourceLayer = String(layer["source-layer"] || "");
    const shouldHide = hideMatchers.some(
      (matcher) => matcher.test(id) || matcher.test(sourceLayer)
    );

    if (shouldHide) {
      setRouteMapLayoutVisibilityIfChanged(map, layer.id, "none");
    }
  });
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
      id: "route-map-corridor",
      type: "line",
      source: "route-map-full",
      layout: {
        "line-cap": "round",
        "line-join": "round"
      },
      paint: {
        "line-color": palette.corridor,
        "line-opacity": 0.92,
        "line-width": ["interpolate", ["linear"], ["zoom"], 4.3, 7.2, 7.3, 15.6]
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
        "line-opacity": 0.86,
        "line-width": ["interpolate", ["linear"], ["zoom"], 4.3, 4.6, 7.3, 9]
      }
    },
    {
      id: "route-map-casing",
      type: "line",
      source: "route-map-full",
      layout: {
        "line-cap": "round",
        "line-join": "round"
      },
      paint: {
        "line-color": palette.routeCasing,
        "line-opacity": 0.98,
        "line-width": ["interpolate", ["linear"], ["zoom"], 4.3, 2.8, 7.3, 5.2]
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
        "line-width": ["interpolate", ["linear"], ["zoom"], 4.3, 1.7, 7.3, 3.3]
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
        "line-opacity": 0.82,
        "line-width": ["interpolate", ["linear"], ["zoom"], 4.3, 1.4, 7.3, 2.4]
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
        "line-opacity": 0.98,
        "line-width": ["interpolate", ["linear"], ["zoom"], 4.3, 2.4, 7.3, 4.2]
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
        "line-width": ["interpolate", ["linear"], ["zoom"], 4.3, 12, 7.3, 18]
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
  const selectionDayIds = (
    Array.isArray(selectionState?.config?.dayLinks) ? selectionState.config.dayLinks : []
  )
    .map((link) => Number.parseInt(String(link.day), 10))
    .filter(Number.isFinite);
  const relatedDayIds = new Set(selectionDayIds);
  const allDayLinks = Object.keys(routeDayStopDefinitions)
    .map((day) => Number.parseInt(day, 10))
    .filter(Number.isFinite)
    .sort((left, right) => left - right)
    .map((day) => ({ day }));
  const activeDay =
    selectionState.type === "view"
      ? Number.parseInt(String(selectionState.config.day), 10)
      : selectionDayIds.length === 1
        ? selectionDayIds[0]
        : NaN;

  if (Number.isFinite(activeDay)) {
    relatedDayIds.delete(activeDay);
  }

  const stopsDidChange = setLocalizedMarkupIfChanged(
    stopsNode,
    `
    <section class="route-map__day-browser">
      <div class="route-map__day-toolbar">
        <div
          class="route-map__day-controls"
          role="group"
          aria-label="${escapeHtml(getLocalizedText(routeMapLabels.daySlider))}">
          <button
            class="route-map__day-nav"
            type="button"
            data-route-map-day-shift="-1"
            data-aria-label-en="${escapeHtml(routeMapLabels.daySliderPrevious.en)}"
            data-aria-label-ja="${escapeHtml(routeMapLabels.daySliderPrevious.ja)}"
            aria-label="${escapeHtml(getLocalizedText(routeMapLabels.daySliderPrevious))}">
            &larr;
          </button>
          <button
            class="route-map__day-nav"
            type="button"
            data-route-map-day-shift="1"
            data-aria-label-en="${escapeHtml(routeMapLabels.daySliderNext.en)}"
            data-aria-label-ja="${escapeHtml(routeMapLabels.daySliderNext.ja)}"
            aria-label="${escapeHtml(getLocalizedText(routeMapLabels.daySliderNext))}">
            &rarr;
          </button>
        </div>
      </div>
      <div
        class="route-map__day-rail"
        data-route-map-day-rail
        role="list"
        aria-label="${escapeHtml(getLocalizedText(routeMapLabels.days))}">
        ${allDayLinks
          .map((link) =>
            renderRouteMapDaySection(link, {
              isActive: activeDay === link.day,
              isRelated: activeDay !== link.day && relatedDayIds.has(link.day)
            })
          )
          .join("")}
      </div>
    </section>
  `
  );

  if (stopsDidChange) {
    registerRevealBlocks(stopsNode);
  }
}

function getCompactRouteDayStops(routeDay) {
  const uniqueStops = Array.from(
    new Map(
      (routeDay.stops || []).map((stop) => [`${stop.en || ""}|${stop.ja || ""}`, stop])
    ).values()
  );

  return uniqueStops.length > 1 ? uniqueStops : null;
}

function renderCompactRouteDayStops(stopSummary) {
  if (!stopSummary?.length) {
    return "";
  }

  const renderStopLine = (language) => {
    const labels = stopSummary
      .map((stop) => escapeHtml(stop?.[language] || ""))
      .filter(Boolean);

    if (!labels.length) {
      return "";
    }

    return labels
      .map((label, index) => {
        const separatorMarkup =
          index < labels.length - 1
            ? '<span class="route-reference__day-separator" aria-hidden="true"></span>'
            : "";

        return `
          <span class="route-reference__day-stop-group">
            <span class="route-reference__day-stop">${label}</span>
            ${separatorMarkup}
          </span>
        `;
      })
      .join("");
  };

  return `
    <span class="route-reference__day-meta">
      <span class="route-reference__day-meta-line" data-language="en">${renderStopLine("en")}</span>
      <span class="route-reference__day-meta-line" data-language="ja" hidden>${renderStopLine("ja")}</span>
    </span>
  `;
}

function renderRouteMapDaySection(link, { isActive = false, isRelated = false } = {}) {
  const routeDay = getRouteDayReference(link.day);
  const dayStepLabel = {
    en: `Day ${routeDay.day}`,
    ja: `${routeDay.day}日目`
  };
  const selectAriaLabel = {
    en: `Show ${routeDay.title.en} route details`,
    ja: `${routeDay.title.ja}のルート詳細を表示`
  };
  const stopSummary = getCompactRouteDayStops(routeDay);
  const stopSummaryMarkup = renderCompactRouteDayStops(stopSummary);

  return `
    <article
      class="route-reference__day ${isActive ? "is-active" : ""} ${isRelated ? "is-related" : ""}"
      role="listitem"
      data-route-map-day-card="${escapeHtml(routeDay.day)}">
      <button
        class="route-reference__day-trigger"
        type="button"
        data-route-map-day-view="day-${escapeHtml(routeDay.day)}"
        aria-pressed="${String(isActive)}"
        data-aria-label-en="${escapeHtml(selectAriaLabel.en)}"
        data-aria-label-ja="${escapeHtml(selectAriaLabel.ja)}"
        aria-label="${escapeHtml(getLocalizedText(selectAriaLabel))}">
        <span class="route-reference__day-step">${renderLocalizedContent(dayStepLabel)}</span>
        <span class="route-reference__day-title">${renderLocalizedContent(routeDay.displayTitle)}</span>
        ${stopSummaryMarkup}
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
  const badgesMarkup = Array.isArray(config.badges) && config.badges.length
    ? `
        <div class="route-reference__pills">
          ${config.badges
            .map((badge) => `<span class="route-reference__pill">${renderLocalizedContent(badge)}</span>`)
            .join("")}
        </div>
      `
    : "";
  const transitActionsMarkup =
    selectionState.type !== "view" &&
    Array.isArray(config.transitActions) &&
    config.transitActions.length
    ? `
        <section class="route-reference__group">
          <p class="route-reference__group-label">${renderLocalizedContent(routeMapLabels.tools)}</p>
          <div class="route-reference__group-actions">
            ${config.transitActions.map((action) => renderRouteMapTransitButton(action)).join("")}
          </div>
        </section>
      `
    : "";

  const detailDidChange = setLocalizedMarkupIfChanged(
    detailNode,
    `
    <div class="route-reference__copy">
      <h4 class="route-reference__title">${renderLocalizedContent(config.title)}</h4>
      <p class="route-reference__summary">${renderLocalizedContent(config.summary)}</p>
    </div>
    ${badgesMarkup}
    ${transitActionsMarkup}
  `
  );

  if (detailDidChange) {
    registerRevealBlocks(detailNode);
  }
}

function clearRouteMapMarkers(markers = []) {
  markers.forEach((entry) => {
    entry.marker?.remove();
  });
  return [];
}

function createRouteMapMarkerElement(stop) {
  const element = document.createElement("button");
  element.className = "route-map-marker route-map-marker--interactive";
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

function updateRouteMapMarkerElement(entry, selectionState) {
  if (!entry?.element || !entry.labelNode) {
    return;
  }

  const stop = entry.stop;
  const isDayView =
    selectionState.type === "view" && Number.isFinite(Number(selectionState.config?.day));
  const isActive =
    (selectionState.type === "stop" && selectionState.config.id === stop.id) ||
    (isDayView &&
      Number.isFinite(stop.primaryDay) &&
      Number(stop.primaryDay) === Number(selectionState.config.day));
  const isRelated =
    !isActive &&
    ((selectionState.type === "segment" || isDayView) && selectionState.stopIds.has(stop.id));
  const isDimmed =
    (selectionState.type === "segment" || selectionState.type === "stop" || isDayView) &&
    !isActive &&
    !isRelated;
  const markerStateKey = `${root.lang}|${isActive ? 1 : 0}|${isRelated ? 1 : 0}|${isDimmed ? 1 : 0}`;

  if (entry.stateKey === markerStateKey) {
    return;
  }

  entry.labelNode.textContent = getLocalizedText(stop.title);

  entry.element.classList.toggle("is-active", isActive);
  entry.element.classList.toggle("is-related", isRelated);
  entry.element.classList.toggle("is-dimmed", isDimmed);
  entry.element.classList.toggle("has-label", isActive || isRelated);
  entry.stateKey = markerStateKey;

  const ariaLabel = Number.isFinite(stop.primaryDay)
    ? {
        en: `Show the ${stop.title.en} route day`,
        ja: `${stop.title.ja}に対応する日別ルートを表示`
      }
    : {
        en: `Show ${stop.title.en} stop details`,
        ja: `${stop.title.ja}の詳細を表示`
      };
  entry.element.tabIndex = 0;
  entry.element.setAttribute("aria-hidden", "false");
  entry.element.setAttribute("aria-pressed", String(isActive));
  entry.element.setAttribute("aria-label", getLocalizedText(ariaLabel));
}

function installRouteMapMarkers(map) {
  return [];
}

function setRouteMapInteractionState(map) {
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

  setHandlerEnabled("dragPan", true);
  setHandlerEnabled("doubleClickZoom", true);
  setHandlerEnabled("keyboard", false);
  setHandlerEnabled("scrollZoom", !coarsePointerQuery.matches);

  if (map.touchZoomRotate) {
    map.touchZoomRotate.enable();
    map.touchZoomRotate.disableRotation();
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

  map.getCanvas().style.cursor = "";
  map.getCanvas().style.touchAction = "pan-x pan-y";
  bindRouteMapInteractiveSurface();
}

function syncRouteMapMarkers(selectionState) {
  const markerStateKey = `${root.lang}|${getRouteMapSelectionSignature(selectionState)}`;
  if (routeMapState.markerStateKey === markerStateKey) {
    return;
  }

  routeMapState.markers.forEach((entry) => {
    updateRouteMapMarkerElement(entry, selectionState, true);
  });
  routeMapState.markerStateKey = markerStateKey;
}

function applyRouteMapPaintTheme(map) {
  if (!map) {
    return;
  }

  const palette = getRouteMapPalette();
  const themeSetters = [
    ["route-map-corridor", "line-color", palette.corridor],
    ["route-map-shadow", "line-color", palette.shadow],
    ["route-map-casing", "line-color", palette.routeCasing],
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
  const inactiveOpacity = activeIds.length ? 0.14 : 0.1;
  const selectionLayerKey = `${getCurrentTheme()}|${getRouteMapSelectionSignature(selectionState)}`;

  if (map.__routeMapSelectionLayerKey === selectionLayerKey) {
    return;
  }

  if (map.getLayer("route-map-segments-active")) {
    const lineColor = activeIds.length
      ? ["match", ["get", "id"], activeIds, palette.segmentActive, palette.segmentMuted]
      : palette.segmentMuted;
    const lineOpacity = activeIds.length
      ? ["match", ["get", "id"], activeIds, 0.8, inactiveOpacity]
      : inactiveOpacity;
    const lineWidth = activeIds.length
      ? [
          "interpolate",
          ["linear"],
          ["zoom"],
          4.3,
          ["match", ["get", "id"], activeIds, 2.2, 1.4],
          7.3,
          ["match", ["get", "id"], activeIds, 3.4, 2.4]
        ]
      : ["interpolate", ["linear"], ["zoom"], 4.3, 1.4, 7.3, 2.4];

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
    padding: getRouteMapCameraPadding("selection"),
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

    const segment = getRouteExplorerSegmentById(segmentId);
    const revealDayRail = Number.isFinite(getPrimaryRouteDayFromLinks(segment?.dayLinks));
    const isSameSegment =
      activeRouteMapSelection.type === "segment" && activeRouteMapSelection.id === segmentId;
    activeRouteMapSelection = isSameSegment
      ? { type: "view", id: routeExplorerDefaultSelectionId }
      : { type: "segment", id: segmentId };
    scheduleRouteMapUISync({
      updateCamera: true,
      animateCamera: true,
      revealDayRail: !isSameSegment && revealDayRail
    });
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

function fitRouteMapOverview(map) {
  if (!map) {
    return;
  }

  const bounds = getRouteMapBoundsFromCoordinates(getRouteMapFullCoordinates());
  if (!bounds) {
    return;
  }

  map.fitBounds(bounds, {
    padding: getRouteMapCameraPadding("overview"),
    maxZoom: routeMapOverviewMaxZoom,
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
  setRouteMapInteractionState(routeMapState.map);

  if (updateCamera) {
    focusRouteMapSelection(routeMapState.map, selectionState, { animate: animateCamera });
  } else if (resetOverview && selectionState.type === "view") {
    fitRouteMapOverview(routeMapState.map);
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
  routeMapState.engine = markFailed ? "failed" : "idle";

  if (routeMapState.map) {
    routeMapState.map.remove();
    routeMapState.map = null;
  }
}

function ensureRouteMapReady() {
  const routeMapCanvasNode = getRouteMapCanvasNode();
  const routeMapStatusNode = getRouteMapStatusNode();
  if (!routeMapCanvasNode) {
    return Promise.resolve(null);
  }

  if (offlineSnapshotMode) {
    routeMapRequested = false;
    routeMapState.failed = true;
    routeMapState.engine = "offline";
    setRouteMapShellState("error");
    setRouteMapStatus(
      routeMapStatusNode,
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

  setRouteMapStatus(
    routeMapStatusNode,
    routeMapLabels.sharedLoading,
    routeMapLabels.sharedLoadingBody,
    "loading"
  );
  setRouteMapShellState("loading");

  routeMapState.promise = (async () => {
    const { maplibregl } = await loadRouteMapLibrary();
    routeMapState.map = new maplibregl.Map({
      container: routeMapCanvasNode,
      style: buildRouteMapBaseStyle(),
      ...routeMapBaseOptions
    });

    routeMapState.map.resize();
    await waitForRouteMapLoad(routeMapState.map);

    reduceRouteMapBaseClutter(routeMapState.map);
    ensureRouteMapAttributionControl(routeMapState.map);
    ensureRouteMapOverlayStyle(routeMapState.map);
    bindRouteMapInteractiveEvents(routeMapState.map);

    routeMapState.markers = clearRouteMapMarkers(routeMapState.markers);
    routeMapState.markers = installRouteMapMarkers(routeMapState.map);
    routeMapState.ready = true;
    routeMapState.failed = false;
    routeMapState.engine = "maplibre";
    routeMapState.styleSignature = getRouteMapStyleSignature();
    routeMapState.map.resize();
    applyRouteMapPaintTheme(routeMapState.map);
    setRouteMapInteractionState(routeMapState.map);
    syncRouteMapUI({ resetOverview: true });
    clearRouteMapStatus(routeMapStatusNode);
    setRouteMapShellState("ready");

    return routeMapState.map;
  })()
    .catch((error) => {
      console.error("Route map failed to initialize.", error);
      resetRouteMapInstance({ markFailed: true });
      setRouteMapShellState("error");
      setRouteMapStatus(
        routeMapStatusNode,
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

function syncRouteMapUI(options = {}) {
  const {
    updateCamera = false,
    animateCamera = false,
    resetOverview = false,
    revealDayRail = false
  } = options;
  const selectionState = getRouteMapSelectionState();

  syncRouteMapInteractiveSurfaceAttributes();
  renderRouteMapStops(selectionState);
  renderRouteMapDetail(selectionState);
  scheduleRouteMapDaySliderSync();
  if (
    revealDayRail &&
    selectionState.type === "view" &&
    Number.isFinite(Number(selectionState.config?.day))
  ) {
    window.requestAnimationFrame(() => {
      revealRouteMapDayCard(selectionState.config.day, { smooth: animateCamera });
    });
  }

  syncRouteMapRuntime(selectionState, { updateCamera, animateCamera, resetOverview });
}

function scheduleRouteMapUISync(options = {}) {
  pendingRouteMapUISyncOptions = {
    updateCamera: pendingRouteMapUISyncOptions.updateCamera || Boolean(options.updateCamera),
    animateCamera: pendingRouteMapUISyncOptions.animateCamera || Boolean(options.animateCamera),
    revealDayRail: pendingRouteMapUISyncOptions.revealDayRail || Boolean(options.revealDayRail)
  };

  if (routeMapUISyncFrame) {
    return;
  }

  routeMapUISyncFrame = window.requestAnimationFrame(() => {
    const nextOptions = pendingRouteMapUISyncOptions;
    routeMapUISyncFrame = 0;
    pendingRouteMapUISyncOptions = {
      updateCamera: false,
      animateCamera: false,
      revealDayRail: false
    };
    syncRouteMapUI(nextOptions);
  });
}

function refreshRouteMapsIfReady(options = {}) {
  if (!routeMapInitialized) {
    return;
  }

  syncRouteMapInteractiveSurfaceAttributes();
  const routeMapStatusNode = getRouteMapStatusNode();

  const requiresStyleRefresh =
    routeMapState.ready &&
    routeMapState.map &&
    routeMapState.styleSignature !== getRouteMapStyleSignature();

  if (requiresStyleRefresh) {
    resetRouteMapInstance();
    setRouteMapStatus(
      routeMapStatusNode,
      routeMapLabels.sharedLoading,
      routeMapLabels.sharedLoadingBody,
      "loading"
    );
    setRouteMapShellState("loading");
  }

  if (!routeMapRequested && !routeMapState.ready) {
    clearRouteMapStatus(routeMapStatusNode);
    setRouteMapShellState(routeMapState.failed ? "error" : "loading");
    syncRouteMapUI({ resetOverview: true });
    return;
  }

  if (!routeMapState.ready || !routeMapState.map) {
    syncRouteMapUI({ resetOverview: true });
    if (
      routeMapRequested &&
      !routeMapState.promise &&
      !routeMapState.failed &&
      !offlineSnapshotMode
      ) {
        void ensureRouteMapReady();
      }
      return;
  }

  applyRouteMapPaintTheme(routeMapState.map);
  syncRouteMapUI({
    updateCamera: options.updateCamera,
    animateCamera: false,
    resetOverview: true
  });
}

function resizeRouteMapsIfReady() {
  scheduleRouteMapDaySliderSync();

  if (!routeMapState.ready || !routeMapState.map) {
    return;
  }

  routeMapState.map.resize();
  const selectionState = getRouteMapSelectionState();
  if (selectionState.type === "view") {
    fitRouteMapOverview(routeMapState.map);
  } else {
    focusRouteMapSelection(routeMapState.map, selectionState, { animate: false });
  }
  syncRouteMapPopup(selectionState);
}

function requestRouteMapLiveView() {
  routeMapRequested = true;
  routeMapState.failed = false;
  return ensureRouteMapReady();
}

function ensureRouteMapInitialized() {
  const routeMapExplorerNode = getRouteMapExplorerNode();
  if (routeMapInitialized || !routeMapExplorerNode) {
    return;
  }

  routeMapExplorerNode.innerHTML = renderRouteMapExplorerShell();
  localizedMarkupCache.set(routeMapExplorerNode, routeMapExplorerNode.innerHTML);
  if (root.lang === "ja") {
    syncLocalizedNodes(routeMapExplorerNode);
  }
  routeMapInitialized = true;
  if (!routeMapState.failed) {
    setRouteMapShellState("loading");
  }
  bindRouteMapInteractiveSurface();
  syncRouteMapUI({ resetOverview: true });
}

function handleRouteMapClick(event) {
  const dayRailShiftTrigger = event.target.closest("[data-route-map-day-shift]");
  if (dayRailShiftTrigger) {
    event.preventDefault();
    slideRouteMapDayRail(Number(dayRailShiftTrigger.dataset.routeMapDayShift) || 1);
    return;
  }

  const dayViewTrigger = event.target.closest("[data-route-map-day-view]");
  if (dayViewTrigger) {
    event.preventDefault();
    const dayViewId = dayViewTrigger.dataset.routeMapDayView || "";
    const day = Number.parseInt(dayViewId.replace("day-", ""), 10);
    if (Number.isFinite(day)) {
      setActiveRouteMapDaySelection(day, {
        updateCamera: true,
        animateCamera: true,
        revealDayRail: true
      });
    }
    return;
  }

  const stopTrigger = event.target.closest("[data-route-map-stop]");
  if (stopTrigger) {
    event.preventDefault();
    toggleRouteMapStopSelection(stopTrigger.dataset.routeMapStop || "", {
      updateCamera: true,
      animateCamera: true,
      revealDayRail: true
    });
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

async function initRouteSection() {
  const panel = getSectionPanel("route");
  if (!panel) {
    return;
  }

  await Promise.all([ensureRouteContentLoaded(), ensureRouteSectionStylesLoaded()]);

  const routeMapCard = getRouteMapCardNode();
  if (routeMapCard && panel.dataset.routeBound !== "true") {
    routeMapCard.addEventListener("click", handleRouteMapClick);
    panel.dataset.routeBound = "true";
  }

  registerRevealBlocks(panel);
  ensureRouteMapInitialized();
  void requestRouteMapLiveView();
  refreshRouteMapsIfReady({ updateCamera: true });
}

async function initEssentialsSection() {
  const panel = getSectionPanel("essentials");
  if (!panel) {
    return Promise.resolve();
  }

  bootOfflineExperience();
  registerRevealBlocks(panel);
  await Promise.all([ensureBudgetConfigLoaded(), loadEssentialsContentData()]);
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
  return reducedEffectsEnabled || !supportsNativeSmoothScroll ? "auto" : "smooth";
}

function getMaxWindowScrollTop() {
  return Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
}

function smoothlyScrollWindowTo(nextTop, { behavior = getScrollBehavior() } = {}) {
  const clampedTop = clamp(Math.round(nextTop), 0, getMaxWindowScrollTop());
  const currentTop = Math.max(window.scrollY, 0);
  const resolvedBehavior = behavior === "smooth" && supportsNativeSmoothScroll ? "smooth" : "auto";

  if (Math.abs(clampedTop - currentTop) < 2) {
    if (clampedTop !== currentTop) {
      window.scrollTo({
        top: clampedTop,
        behavior: "auto"
      });
    }
    return Promise.resolve(true);
  }

  window.scrollTo({
    top: clampedTop,
    behavior: resolvedBehavior
  });
  return Promise.resolve(true);
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

function showToastNotice(message) {
  if (!sequenceNotice) {
    return;
  }

  sequenceNotice.textContent = message;
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

function showSequenceNotice(requiredDay) {
  showToastNotice(
    root.lang === "ja"
      ? `${requiredDay}日目を先に完了してから次の行程へ進めます。`
      : `Complete Day ${requiredDay} first, then continue to the next part of the trip.`
  );
}

function showChecklistLockNotice() {
  showToastNotice(
    root.lang === "ja"
      ? "チェックリストは確認できますが、Essentials をすべて packed にするまで操作はロックされています。"
      : "The checklist remains locked until all Essentials items have been packed."
  );
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
  if (dayCardRowHeightFrame) {
    window.cancelAnimationFrame(dayCardRowHeightFrame);
  }

  dayCardRowHeightFrame = window.requestAnimationFrame(() => {
    dayCardRowHeightFrame = 0;
    const checklistPanel = getSectionPanel("checklist");
    const checklistGrid = checklistPanel?.querySelector(".day-grid");
    const checklistCards = Array.from(
      checklistGrid?.querySelectorAll(".day-card[data-day]") || []
    ).filter((card) => !card.hidden);

    checklistCards.forEach((card) => {
      card.style.removeProperty("min-height");
    });

    if (
      !checklistPanel ||
      checklistPanel.hidden ||
      !checklistGrid ||
      checklistCards.length < 2
    ) {
      return;
    }

    const groupedCards = [
      checklistCards.filter((card) => {
        const day = Number.parseInt(card.dataset.day || "", 10);
        return day >= 1 && day <= 4;
      }),
      checklistCards.filter((card) => {
        const day = Number.parseInt(card.dataset.day || "", 10);
        return day >= 5 && day <= 7;
      })
    ];

    groupedCards
      .filter((group) => group.length > 1)
      .forEach((group) => {
        const maxHeight = group.reduce(
        (currentMax, card) => Math.max(currentMax, card.getBoundingClientRect().height),
        0
      );

        group.forEach((card) => {
          card.style.minHeight = `${Math.round(maxHeight)}px`;
        });
      });
  });
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
    resetTransitDetailScrollPosition();
    window.requestAnimationFrame(() => {
      resetTransitDetailScrollPosition();
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

function remToPx(value) {
  const numericValue = Number.parseFloat(String(value ?? ""));
  if (!Number.isFinite(numericValue)) {
    return 0;
  }

  const rootFontSize = Number.parseFloat(
    window.getComputedStyle(document.documentElement).fontSize || "16"
  );
  return numericValue * (Number.isFinite(rootFontSize) ? rootFontSize : 16);
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

  const timelineStyles = window.getComputedStyle(progressTimeline);
  const nodeTop = remToPx(timelineStyles.getPropertyValue("--timeline-node-top"));
  const nodeSize = remToPx(timelineStyles.getPropertyValue("--timeline-node-size"));
  const linkOverlap =
    Number.parseFloat(timelineStyles.getPropertyValue("--timeline-link-overlap")) ||
    timelineLinkOverlapPx;
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
  const checklistLocked = isChecklistAccessLocked();

  if (syncDayCards) {
    dayCards.forEach((card) => {
      const progressRatio = getDayCompletionRatio(card);
      const dayKey = card.dataset.day;
      const isComplete = rawCompleted.has(dayKey);
      const isUnavailable = checklistLocked || !nextUnlockedDays.has(dayKey);
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
      card.querySelectorAll(".transit-trigger--checklist").forEach((button) => {
        button.disabled = checklistLocked;
        button.setAttribute("aria-disabled", String(checklistLocked));
      });
    });
  }

  progressItems.forEach((item) => {
    const dayKey = item.dataset.progressItem;
    const day = Number(item.dataset.progressItem);
    const card = dayCardMap.get(dayKey);
    const progressRatio = card ? getDayCompletionRatio(card) : 0;
    const isUnavailable = checklistLocked || !nextUnlockedDays.has(dayKey);
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

  updateChecklistAccessState();
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
  if (isChecklistAccessLocked()) {
    showChecklistLockNotice();
  }

  const targetCard = dayCardMap.get(String(day));
  if (!targetCard) {
    return;
  }

  await activatePanel("checklist");

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      lockHeaderState(720);
      const targetTop =
        targetCard.getBoundingClientRect().top + window.scrollY - getHeaderScrollOffset(24);

      void smoothlyScrollWindowTo(Math.max(targetTop, 0), { intent: "section" });

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

  const anchor = panel.querySelector("[data-panel-scroll-anchor]") || panel.querySelector(".section-heading") || panel;
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      lockHeaderState(760);
      const targetTop =
        anchor.getBoundingClientRect().top + window.scrollY - getHeaderScrollOffset(20);

      void smoothlyScrollWindowTo(Math.max(targetTop, 0), { intent: "section" });
    });
  });
}

function handleAnchorScrollClick(event) {
  if (event.defaultPrevented) {
    return;
  }

  const anchor = event.target.closest('a[href^="#"]:not([href="#"])');
  if (!anchor || anchor.hasAttribute("download")) {
    return;
  }

  const targetId = anchor.getAttribute("href")?.slice(1);
  if (!targetId) {
    return;
  }

  const targetNode = document.getElementById(targetId);
  if (!targetNode) {
    return;
  }

  event.preventDefault();
  if (!targetNode.hasAttribute("tabindex")) {
    targetNode.setAttribute("tabindex", "-1");
  }

  targetNode.focus({ preventScroll: true });
  const targetTop =
    targetNode.getBoundingClientRect().top + window.scrollY - getHeaderScrollOffset(18);
  void smoothlyScrollWindowTo(Math.max(targetTop, 0), { intent: "anchor" });

  if (window.history?.replaceState) {
    window.history.replaceState(null, "", `#${targetId}`);
  }
}

function setLanguage(language) {
  const nextLanguage = language === "ja" ? "ja" : "en";
  const localizedNodes = document.querySelectorAll("[data-language]");
  const ariaLabelNodes = document.querySelectorAll("[data-aria-label-en][data-aria-label-ja]");
  const altTextNodes = document.querySelectorAll("[data-alt-en][data-alt-ja]");
  const sourceNodes = document.querySelectorAll("[data-src-en][data-src-ja]");

  root.lang = nextLanguage;
  syncLocalizedDocumentTitle(nextLanguage);

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
  updateChecklistAccessState();
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
    updateMaxScrollableY();
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
  const revealBlocks = collectRevealBlocks(scope);

  if (!revealBlocks.length) {
    return;
  }

  revealBlocks.forEach((block, index) => {
    block.classList.add("reveal-block");
    block.style.setProperty("--reveal-delay", `${Math.min(index, 6) * 40}ms`);
  });

  if (reducedEffectsEnabled || !("IntersectionObserver" in window)) {
    revealBlocks.forEach((block) => {
      block.classList.add("is-visible");
      block.dataset.revealState = "visible";
    });
    return;
  }

  ensureRevealObserver();
  revealBlocks.forEach((block) => {
    if (block.dataset.revealRegistered !== "true") {
      block.dataset.revealRegistered = "true";
      hideRevealBlock(block);
    }

    revealObserver.observe(block);

    if (isRevealBlockInViewport(block)) {
      revealBlock(block, { direction: revealScrollDirection });
    }
  });
}

function refreshRevealPanel(panelId) {
  if (!initializedSections.has(panelId)) {
    return;
  }

  const activePanel = getSectionPanel(panelId);
  if (!activePanel) {
    return;
  }

  const panelBlocks = Array.from(activePanel.querySelectorAll(".reveal-block"));
  if (reducedEffectsEnabled) {
    panelBlocks.forEach((block) => {
      block.classList.add("is-visible");
      block.dataset.revealState = "visible";
    });
    return;
  }

  panelBlocks.forEach((block, index) => {
    block.style.setProperty("--reveal-delay", `${Math.min(index, 6) * 44}ms`);
    hideRevealBlock(block);
  });

  window.requestAnimationFrame(() => {
    panelBlocks.forEach((block) => {
      if (revealObserver) {
        revealObserver.observe(block);
      }

      if (isRevealBlockInViewport(block)) {
        revealBlock(block, { direction: revealScrollDirection });
      }
    });
  });
}

function getInitialPanelId() {
  const defaultPanelId =
    contentPanels.find((panel) => panel.classList.contains("is-active"))?.dataset.panel ??
    contentPanels[0]?.dataset.panel ??
    "overview";
  const nextPanelId =
    contentPanels.length === 1 ? defaultPanelId : readStoredActivePanel() || defaultPanelId;

  return nextPanelId;
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

      await activatePanel(panelId);
      scrollToPanelStart(panelId);
    });

    tab.dataset.navigationBound = "true";
  });
}

function waitForFrame() {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => resolve());
  });
}

function waitForDuration(durationMs) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, durationMs);
  });
}

function clearSiteTransitionState() {
  if (siteTransitionCleanupTimer) {
    window.clearTimeout(siteTransitionCleanupTimer);
    siteTransitionCleanupTimer = 0;
  }

  if (siteTransition) {
    siteTransition.classList.remove("is-active");
    siteTransition.hidden = true;
    siteTransition.setAttribute("aria-hidden", "true");
    delete siteTransition.dataset.direction;
    delete siteTransition.dataset.mode;
  }

  delete root.dataset.siteTransitionDirection;
  delete root.dataset.siteTransitionMode;
}

function getPanelTransitionDirection(nextPanelId, currentPanelId = getActivePanelId()) {
  const currentIndex = sectionTabs.findIndex((tab) => tab.dataset.panelTarget === currentPanelId);
  const nextIndex = sectionTabs.findIndex((tab) => tab.dataset.panelTarget === nextPanelId);

  if (currentIndex === -1 || nextIndex === -1 || currentIndex === nextIndex) {
    return "forward";
  }

  return nextIndex > currentIndex ? "forward" : "backward";
}

function triggerSiteTransition({ mode = "section", direction = "forward" } = {}) {
  if (!siteTransition || reducedEffectsEnabled) {
    clearSiteTransitionState();
    return 0;
  }

  const token = ++siteTransitionToken;
  const swapDelayMs =
    mode === "back-to-top" ? siteTransitionBackToTopDelayMs : siteTransitionSwapDelayMs;

  root.dataset.siteTransitionDirection = direction;
  root.dataset.siteTransitionMode = mode;

  siteTransition.hidden = false;
  siteTransition.setAttribute("aria-hidden", "false");
  siteTransition.dataset.direction = direction;
  siteTransition.dataset.mode = mode;
  siteTransition.classList.remove("is-active");
  void siteTransition.getBoundingClientRect();
  siteTransition.classList.add("is-active");

  if (siteTransitionCleanupTimer) {
    window.clearTimeout(siteTransitionCleanupTimer);
  }

  siteTransitionCleanupTimer = window.setTimeout(() => {
    if (token !== siteTransitionToken) {
      return;
    }

    clearSiteTransitionState();
  }, siteTransitionDurationMs);

  return swapDelayMs;
}

async function activatePanel(panelId, { transitionIfChanged = true } = {}) {
  const currentPanelId = getActivePanelId();
  const hasChanged = panelId !== currentPanelId;

  await ensureSectionAssetsReady(panelId);

  if (hasChanged && transitionIfChanged) {
    const transitionDirection = getPanelTransitionDirection(panelId, currentPanelId);
    playTransitionSound();
    const swapDelayMs = triggerSiteTransition({
      mode: "section",
      direction: transitionDirection
    });

    if (swapDelayMs > 0) {
      await waitForDuration(swapDelayMs);
    }
  }

  lockHeaderState(hasChanged ? 620 : 520);
  setActivePanel(panelId);
  await ensureSectionInitialized(panelId);
  return hasChanged;
}

function getSiteIntroTimings() {
  const holdDurationMs = reducedEffectsEnabled ? 180 : 1120;
  const exitDurationMs = reducedEffectsEnabled ? 120 : 620;

  return {
    holdDurationMs,
    exitDurationMs,
    totalDurationMs: holdDurationMs + exitDurationMs
  };
}

async function playSiteIntro() {
  if (!siteIntro) {
    root.classList.remove("intro-pending", "intro-active", "intro-leaving");
    return;
  }

  const { holdDurationMs, exitDurationMs } = getSiteIntroTimings();

  siteIntro.hidden = false;
  siteIntro.setAttribute("aria-hidden", "false");
  root.classList.remove("intro-leaving");

  await waitForFrame();
  await waitForFrame();
  root.classList.remove("intro-pending");
  root.classList.add("intro-active");
  await waitForDuration(holdDurationMs);

  root.classList.add("intro-leaving");
  root.classList.remove("intro-active");

  if (exitDurationMs > 0) {
    await waitForDuration(exitDurationMs);
  }

  root.classList.remove("intro-pending", "intro-active", "intro-leaving");
  siteIntro.hidden = true;
  siteIntro.setAttribute("aria-hidden", "true");
}

async function bootApp() {
  syncReducedEffectsMode({ force: true });
  initializeSiteAudioExperience();
  completedHistoryDays = readStoredDaySet(completedHistoryStorageKey);
  checklistState = readStoredChecklistState();
  updateChecklistAccessState();
  syncOptionalDaysUI();
  applyTheme(readStoredThemePreference() || getCurrentTheme(), { persist: false });
  const storedLanguage = readStoredLanguage();
  if (storedLanguage === "ja") {
    setLanguage("ja");
  } else {
    root.lang = "en";
    syncLocalizedDocumentTitle("en");
    updateLanguageButtons("en");
  }

  bootOfflineExperience();
  const introPromise = playSiteIntro();
  introPromise.finally(() => {
    if (siteAudioState.ambientWanted) {
      void requestAmbientPlayback();
    }
  });
  void warmRouteExperience();
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
    await ensureSectionAssetsReady(initialPanelId);
    setActivePanel(initialPanelId);
    await ensureSectionInitialized(initialPanelId);
    syncProgressTimeline();

    if (siteFooter) {
      registerRevealBlocks(siteFooter);
    }
  }

  scheduleIdleSectionWarmup(initialPanelId);
  updateMaxScrollableY();
  window.requestAnimationFrame(() => {
    scheduleDeferredGeometryRelease();
  });

  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      scheduleDayCardRowHeights();
    });
  }

  await introPromise;
}

function scheduleAppBoot() {
  const runBoot = () => {
    void bootApp();
  };

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(runBoot);
  });
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
document.addEventListener("click", handleGenericButtonSoundClick, true);
document.addEventListener("click", handleAnchorScrollClick);
document.addEventListener(
  "toggle",
  (event) => {
    const detailsNode = event.target;
    if (
      !(detailsNode instanceof HTMLDetailsElement) ||
      !detailsNode.matches(".booking-group, .booking-item")
    ) {
      return;
    }

    playSectionOpenSound();
  },
  true
);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    scheduleAppBoot();
  }, { once: true });
} else {
  scheduleAppBoot();
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
  button.addEventListener("click", async () => {
    playTransitionSound();
    const swapDelayMs = triggerSiteTransition({
      mode: "back-to-top",
      direction: "up"
    });
    if (swapDelayMs > 0) {
      await waitForDuration(swapDelayMs);
    }
    void smoothlyScrollWindowTo(0, { intent: "back-to-top" });
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

  headerLockUntil = 0;
  setHeaderCondensed(false);
  resetHeaderScrollTracking(currentScrollY);
}

function runScrollEffects() {
  syncScrollMotionState();
  updateRevealScrollDirection();
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

updateMaxScrollableY();

if ("ResizeObserver" in window) {
  const scrollBoundsObserver = new window.ResizeObserver(() => {
    updateMaxScrollableY();
  });

  [mainContent, siteFooter].filter(Boolean).forEach((node) => {
    scrollBoundsObserver.observe(node);
  });
}

if (siteHeader) {
  if ("ResizeObserver" in window) {
    const headerObserver = new window.ResizeObserver((entries) => {
      const nextHeight = getResizeObserverBlockSize(entries[0]);
      applyReservedHeaderHeight(nextHeight, true);
    });

    headerObserver.observe(siteHeader);
  } else {
    scheduleReservedHeaderHeightSync({ forceReset: false, defer: true });
  }

  window.addEventListener("resize", () => {
    if (resizeTicking) {
      return;
    }

    resizeTicking = true;
    window.requestAnimationFrame(() => {
      resizeTicking = false;
      syncReducedEffectsMode();
      setHeaderCondensed(false);
      if (!("ResizeObserver" in window)) {
        scheduleReservedHeaderHeightSync({ forceReset: true });
      }
      updateMaxScrollableY();
      syncProgressTimeline();
      scheduleDayCardRowHeights();
      resizeRouteMapsIfReady();
      lockHeaderState(220);
    });
  });
}

window.addEventListener("pagehide", () => {
  pauseAmbientPlayback({ keepIntent: true });
  flushQueuedStorageWrites();
});
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    pauseAmbientPlayback({ keepIntent: true });
    if (desktopReverseScrollTimer) {
      window.clearTimeout(desktopReverseScrollTimer);
      desktopReverseScrollTimer = 0;
    }

    if (scrollMotionEconomyTimer) {
      window.clearTimeout(scrollMotionEconomyTimer);
      scrollMotionEconomyTimer = 0;
    }

    root.classList.remove("desktop-scroll-reverse", "scroll-motion-economy");
    flushQueuedStorageWrites();
    return;
  }

  if (siteAudioState.ambientWanted) {
    void requestAmbientPlayback();
  }
});

