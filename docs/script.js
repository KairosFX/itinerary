const languageButtons = document.querySelectorAll("[data-set-language]");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const appleWebAppTitleMeta = document.querySelector('meta[name="apple-mobile-web-app-title"]');
const sectionTabs = Array.from(document.querySelectorAll("[data-panel-target]"));
const sectionNav = document.querySelector(".section-nav");
const sectionNavViewport = document.querySelector("[data-section-nav-viewport]");
const sectionNavTrack = document.querySelector("[data-section-nav-track]");
const sectionNavIndicator = document.querySelector("[data-section-nav-indicator]");
const contentPanels = Array.from(document.querySelectorAll("[data-panel]"));
const siteHeader = document.querySelector(".site-header");
const headerAccessoryGroups = Array.from(document.querySelectorAll(".language-switcher"));
const mainContent = document.querySelector("#main-content");
const siteFooter = document.querySelector(".site-footer");
const siteBackdrop = document.querySelector("[data-site-background-slideshow]");
const siteBackdropSlides = Array.from(document.querySelectorAll("[data-site-background-slide]"));
const sequenceNotice = document.querySelector("[data-sequence-notice]");
const radioPlayerNode = document.querySelector("[data-radio-player]");
const radioFrameNode = document.querySelector("[data-radio-frame]");
const radioArtworkNode = document.querySelector("[data-radio-artwork]");
const radioToggleButton = document.querySelector("[data-radio-toggle]");
const radioToggleIconNode = document.querySelector("[data-radio-toggle-icon]");
const radioPreviousButton = document.querySelector("[data-radio-previous]");
const radioNextButton = document.querySelector("[data-radio-next]");
const radioVolumeInput = document.querySelector("[data-radio-volume]");
const radioVolumeLabel = document.querySelector("[data-radio-volume-label]");
const radioStatusNode = document.querySelector("[data-radio-status]");
let radioYoutubeMountNode = document.querySelector("[data-radio-youtube-player]");
const radioHideButton = document.querySelector("[data-radio-hide]");
const radioShowButton = document.querySelector("[data-radio-show]");
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
const checklistMarkAllButton = document.querySelector("[data-checklist-mark-all]");
const checklistPrintButton = document.querySelector("[data-checklist-print]");
const checklistPrintSheet = document.querySelector("[data-checklist-print-sheet]");
const checklistPrintModal = document.querySelector("[data-checklist-print-modal]");
const checklistPrintForm = document.querySelector("[data-checklist-print-form]");
const checklistPrintPreview = document.querySelector("[data-checklist-print-preview]");
const checklistPrintCloseButtons = Array.from(document.querySelectorAll("[data-checklist-print-close]"));
const checklistPrintConfirmButton = document.querySelector("[data-checklist-print-confirm]");
const checklistPrintResetButton = document.querySelector("[data-checklist-print-reset]");
const resetProgressOpenButtons = Array.from(document.querySelectorAll("[data-reset-progress-open]"));
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
const packingGroup = document.querySelector(".essentials-group--packing");
const offlineToolsCard = document.querySelector("[data-offline-tools]");
const offlineStatusNode = document.querySelector("[data-offline-status]");
const offlineMetaNode = document.querySelector("[data-offline-meta]");
const offlineInstallButton = document.querySelector("[data-offline-install]");
const offlineDownloadLink = document.querySelector("[data-offline-download]");
const dayCardMap = new Map(dayCards.map((card) => [card.dataset.day, card]));
const progressItemMap = new Map(progressItems.map((item) => [item.dataset.progressItem, item]));
const root = document.documentElement;
const lazyNodeCache = new Map();
const aggressivePerformanceMode = false;
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
const compactViewportQuery = window.matchMedia("(max-width: 920px)");
const pageTitles = {
  en: "",
  ja: ""
};
const storageKey = "japan-trip-language";
const itineraryStateVersion = "2026-04-09-checklist-shift-raf-v2";
const checklistStorageKey = `japan-trip-checklist-state-${itineraryStateVersion}`;
const completedHistoryStorageKey = `japan-trip-completed-history-${itineraryStateVersion}`;
const activePanelStorageKey = `japan-trip-active-panel-${itineraryStateVersion}`;
const bookingTransitStorageKey = `japan-trip-bookings-transit-state-${itineraryStateVersion}`;
const packingStorageKey = `japan-trip-packing-state-${itineraryStateVersion}`;
const budgetNotesStorageKey = `japan-trip-budget-notes-${itineraryStateVersion}`;
const checklistPrintStorageKey = `japan-trip-checklist-print-draft-${itineraryStateVersion}`;
const fujiForecastSessionKey = `japan-trip-fuji-forecast-${itineraryStateVersion}`;
const queuedStorageWrites = new Map();
const headerReservedHeightFallbackPx = 156;
const timelineNodeTopRem = 1.36;
const timelineNodeSizeRem = 1.42;
const timelineLinkOverlapPx = 1;
const deferredGeometryReleaseDelayMs = 160;
const deferredNonCriticalLayoutTimeoutMs = 700;
const offlineSnapshotUrl = "./itinerary-offline.html";
const serviceWorkerUrl = "./service-worker.js";
const offlineBundleVersion = "2026-03-28-offline-v23";
const siteBackdropImageUrls = [
  "./assets/backgrounds/kairos-bg-01.jpg",
  "./assets/backgrounds/kairos-bg-02.jpg",
  "./assets/backgrounds/kairos-bg-03.jpg",
  "./assets/backgrounds/kairos-bg-04.jpg",
  "./assets/backgrounds/kairos-bg-05.jpg",
  "./assets/backgrounds/kairos-bg-06.jpg",
  "./assets/backgrounds/kairos-bg-07.jpg",
  "./assets/backgrounds/kairos-bg-08.jpg",
  "./assets/backgrounds/kairos-bg-09.jpg"
];
const siteBackdropRotationIntervalMs = 10000;
const appAssetConfigRuntimeGlobal = "__JAPAN_APP_ASSETS__";
const budgetUiRuntimeGlobal = "__JAPAN_BUDGET_UI__";
const budgetContentRuntimeGlobal = "__JAPAN_BUDGET_CONTENT__";
const essentialsContentRuntimeGlobal = "__JAPAN_ESSENTIALS_CONTENT__";
const routeMapLibraryScriptUrl = "./assets/vendor/maplibre/maplibre-gl.js";
const routeMapLibraryStyleUrl = "./assets/vendor/maplibre/maplibre-gl.css";
const budgetUiFallbackScriptUrl = "./budget-ui.min.js";
const budgetContentFallbackScriptUrl = "./budget-content.min.js";
const essentialsContentFallbackScriptUrl = "./essentials-content.min.js";
const routeContentRuntimeGlobal = "__JAPAN_ROUTE_CONTENT__";
const routeContentFallbackScriptUrl = "./route-content.min.js";
const routeStyleFallbackUrl = "./route.min.css";
const routeMapOriginUrl = "https://tiles.openfreemap.org";
const routeMapStyleUrl = "https://tiles.openfreemap.org/styles/positron";
const radioPlaylistId = "PLEpbvoBwiArP7DiQUEmz3QZj6WyekILSa";
const radioYoutubePlayerHost = "https://www.youtube-nocookie.com";
const radioYoutubePlayerId = "kairos-viii-radio-player";
const radioGithubPagesOrigin = "https://kairosfx.github.io";
const radioYoutubeReadyTimeoutMs = 9000;
const radioYoutubeProbeDelayMs = 700;
const radioYoutubeMaxProbeAttempts = 4;
const radioPlaybackConfirmTimeoutMs = 6500;
const radioYoutubeInfoPollIntervalMs = 2400;
const radioYoutubeWarmupDelayMs = 650;
const radioStationMeta = {
  title: "Kairos VIII Radio",
  artist: "Kairos playlist",
  album: "Kairos VIII"
};
const radioDefaultVolume = 3;
const radioMinVolume = 1;
const radioMaxVolume = 100;
const radioYoutubeMinPlayerVolume = 1;
const radioYoutubeMaxPlayerVolume = 60;
const radioVolumeCurveExponent = 1.65;
const radioSavedVolumeMigrationMax = 6;
const radioPreviousDoubleActionWindowMs = 3000;
const radioLegacyVolumeStorageKey = `kairos-viii-radio-volume-${itineraryStateVersion}`;
const radioPreviousVolumeStorageKey = `kairos-viii-radio-site-volume-v2-${itineraryStateVersion}`;
const radioVolumeStorageKey = `kairos-viii-radio-site-volume-v3-${itineraryStateVersion}`;
const radioVolumeMigrationStorageKey = `kairos-viii-radio-volume-safety-v3-${itineraryStateVersion}`;
const radioShuffleHistoryMin = 3;
const radioShuffleHistoryMax = 7;
const radioVisibilityStorageKey = `kairos-viii-radio-hidden-${itineraryStateVersion}`;
const offlineSnapshotMode = root.hasAttribute("data-offline-snapshot");
const budgetDefaultTravelerCount = 2;
const budgetTravelerCountMin = 1;
const budgetTravelerCountMax = 24;
const budgetSharedRoomOccupancy = 2;
const budgetTravelersPerRoomDefault = budgetSharedRoomOccupancy;
const serviceWorkerWarmMessageType = "CACHE_URLS";
const checklistPrintDefaultStartDate = "2026-03-10";
const checklistPrintFallbackDurationDefinition = {
  minutes: [30, 30],
  label: { en: "30 min", ja: "30分" }
};
const checklistPrintDurationDefinitions = {
  "day1-arrival-setup": { minutes: [180, 210], label: { en: "3–3.5 hr", ja: "3～3.5時間" } },
  "day1-kaiyukan": { minutes: [150, 180], label: { en: "2.5–3 hr", ja: "2.5～3時間" } },
  "day1-nightlife": { minutes: [60, 90], label: { en: "1–1.5 hr", ja: "1～1.5時間" } },
  "day1-shinsaibashi": { minutes: [45, 60], label: { en: "45–60 min", ja: "45～60分" } },
  "day1-dinner": { minutes: [60, 90], label: { en: "1–1.5 hr", ja: "1～1.5時間" } },
  "day2-transfer-to-kyoto": { minutes: [75, 90], label: { en: "75–90 min", ja: "75～90分" } },
  "day2-hotel-check-in": { minutes: [25, 35], label: { en: "25–35 min", ja: "25～35分" } },
  "day2-kiyomizu": { minutes: [60, 90], label: { en: "1–1.5 hr", ja: "1～1.5時間" } },
  "day2-ninenzaka": { minutes: [35, 45], label: { en: "35–45 min", ja: "35～45分" } },
  "day2-yasaka": { minutes: [20, 25], label: { en: "20–25 min", ja: "20～25分" } },
  "day2-gion": { minutes: [75, 120], label: { en: "1.25–2 hr", ja: "1.25～2時間" } },
  "day3-arashiyama": { minutes: [240, 270], label: { en: "4–4.5 hr", ja: "4～4.5時間" } },
  "day3-shinkansen-mishima": { minutes: [110, 140], label: { en: "1.8–2.3 hr", ja: "1.8～2.3時間" } },
  "day3-transfer-fujikawaguchiko": { minutes: [90, 120], label: { en: "1.5–2 hr", ja: "1.5～2時間" } },
  "day3-onsen-check-in": { minutes: [45, 60], label: { en: "45–60 min", ja: "45～60分" } },
  "day4-chureito": { minutes: [110, 145], label: { en: "1.8–2.4 hr", ja: "1.8～2.4時間" } },
  "day4-kawaguchiko": { minutes: [95, 130], label: { en: "1.6–2.2 hr", ja: "1.6～2.2時間" } },
  "day4-oishi-park": { minutes: [70, 95], label: { en: "70–95 min", ja: "70～95分" } },
  "day4-panoramic-ropeway": { minutes: [75, 110], label: { en: "1.25–1.8 hr", ja: "1.25～1.8時間" } },
  "day5-tokyo-transfer": { minutes: [150, 190], label: { en: "2.5–3.2 hr", ja: "2.5～3.2時間" } },
  "day5-tokyo-hotel-drop": { minutes: [40, 60], label: { en: "40–60 min", ja: "40～60分" } },
  "day5-shibuya-crossing": { minutes: [30, 45], label: { en: "30–45 min", ja: "30～45分" } },
  "day5-shibuya-food-walk": { minutes: [75, 105], label: { en: "1.25–1.75 hr", ja: "1.25～1.75時間" } },
  "day5-sky": { minutes: [105, 120], label: { en: "1.75–2 hr", ja: "1.75～2時間" } },
  "day6-skytree-solamachi": { minutes: [180, 230], label: { en: "3–3.8 hr", ja: "3～3.8時間" } },
  "day6-akihabara": { minutes: [90, 135], label: { en: "1.5–2.25 hr", ja: "1.5～2.25時間" } },
  "day6-shinjuku-night": { minutes: [110, 150], label: { en: "1.8–2.5 hr", ja: "1.8～2.5時間" } },
  "day7-palace": { minutes: [45, 60], label: { en: "45–60 min", ja: "45～60分" } },
  "day7-lunch-walk": { minutes: [60, 90], label: { en: "1–1.5 hr", ja: "1～1.5時間" } },
  "day7-bags": { minutes: [30, 45], label: { en: "30–45 min", ja: "30～45分" } },
  "day7-airport": { minutes: [90, 120], label: { en: "1.5–2 hr", ja: "1.5～2時間" } }
};
// Fallback planning assumptions. Replace these times with exact opening/event data when locked.
const checklistPrintDayStartDefaults = {
  "1": { start: "06:00", reason: "arrival-admin-window" },
  "2": { start: "11:00", reason: "kyoto-walking-flow" },
  "3": { start: "07:00", reason: "arashiyama-quiet-photo-window" },
  "4": { start: "07:15", reason: "fuji-visibility-and-stair-climb" },
  "5": { start: "10:00", reason: "fuji-to-central-tokyo-transfer" },
  "6": { start: "09:30", reason: "east-tokyo-and-shinjuku-flow" },
  "7": { start: "10:00", reason: "light-departure-day" }
};
const checklistPrintTimingTypeProfiles = {
  "temple-shrine": {
    transit: [10, 25],
    walk: [10, 20],
    crowd: [10, 30],
    rest: [10, 20],
    weather: [5, 20],
    unpredictable: [10, 25]
  },
  "aquarium-museum": {
    transit: [20, 45],
    walk: [10, 20],
    crowd: [20, 45],
    rest: [10, 20],
    weather: [0, 10],
    unpredictable: [10, 25]
  },
  "shopping-street-food": {
    transit: [10, 25],
    walk: [10, 20],
    crowd: [10, 35],
    rest: [15, 30],
    weather: [5, 15],
    unpredictable: [10, 25]
  },
  "viewpoint-photo": {
    transit: [10, 30],
    walk: [10, 20],
    crowd: [15, 40],
    rest: [15, 30],
    weather: [10, 25],
    unpredictable: [10, 25]
  },
  "hotel-transit-admin": {
    transit: [15, 45],
    walk: [5, 15],
    crowd: [5, 20],
    rest: [5, 15],
    weather: [0, 15],
    unpredictable: [10, 30]
  },
  "arrival-admin": {
    transit: [20, 45],
    walk: [5, 15],
    crowd: [15, 35],
    rest: [15, 30],
    weather: [0, 15],
    unpredictable: [20, 45]
  },
  "departure-admin": {
    transit: [25, 55],
    walk: [5, 15],
    crowd: [10, 35],
    rest: [10, 25],
    weather: [0, 20],
    unpredictable: [25, 55]
  }
};
// Practical print timing matrix. These factors are modeled as weighted modifiers, not
// automatic gaps; unknown live data stays neutral so the schedule stays tight.
const checklistPrintTimingMatrix = {
  factorGroups: {
    dateCalendar: [
      "exact date",
      "day of week",
      "weekend vs weekday",
      "public holiday",
      "school break season",
      "tourist season",
      "cherry blossom/autumn foliage season",
      "local festivals/events",
      "special events",
      "seasonal darkness"
    ],
    openingClosing: [
      "attraction opening time",
      "attraction closing time",
      "last entry time",
      "shop closing times",
      "restaurant opening times",
      "restaurant last order time",
      "hotel check-in time",
      "hotel bag-drop policy",
      "locker availability",
      "timed tickets/reservations"
    ],
    weatherDaylight: [
      "weather forecast if available",
      "rain chance",
      "temperature",
      "wind",
      "sunrise time",
      "sunset time",
      "daylight hours",
      "golden hour",
      "blue hour",
      "night-viewing availability"
    ],
    transit: [
      "door-to-door time",
      "train ride time",
      "direct train vs transfer",
      "train frequency",
      "platform walking time",
      "station size/complexity",
      "ticket gate time",
      "IC card balance/top-up time",
      "ticket purchase time",
      "finding correct platform",
      "missing a train",
      "waiting for next train",
      "rush hour",
      "bus delay risk",
      "taxi availability",
      "taxi traffic",
      "walking vs transit choice",
      "Kyoto buses being crowded",
      "Osaka/Kyoto station complexity"
    ],
    hotelLuggage: [
      "hotel location",
      "distance from hotel to station",
      "distance from hotel to first attraction",
      "hotel check-in line/wait",
      "bag drop time",
      "luggage size",
      "whether bags are being carried",
      "locker search time",
      "time to freshen up",
      "repacking time"
    ],
    walkingRoute: [
      "walking distance",
      "walking speed",
      "uphill walking",
      "Kiyomizu uphill approach",
      "stairs",
      "narrow streets",
      "traffic lights",
      "road crossings",
      "crowded sidewalks",
      "wrong station exit",
      "navigation mistakes",
      "route efficiency",
      "backtracking",
      "close-stop clustering"
    ],
    crowds: [
      "tourist crowds",
      "weekend crowding",
      "tour groups",
      "school groups",
      "lineups for entry",
      "lineups for food",
      "lineups for photos",
      "crowd choke points",
      "Ninenzaka/Sannenzaka narrow streets",
      "sunset photo crowds"
    ],
    foodRest: [
      "breakfast plan",
      "quick lunch vs sit-down lunch",
      "dinner time",
      "dinner reservation",
      "food detours",
      "convenience store stops",
      "snack stops",
      "water breaks",
      "bathroom breaks",
      "rest breaks"
    ],
    attractionDepth: [
      "quick look vs full explore",
      "main area vs side areas",
      "gift shop time",
      "souvenir shopping",
      "photo priority",
      "video priority",
      "waiting for clean photos",
      "personal interest level",
      "Kaiyukan route length",
      "temple/shrine depth",
      "Yasaka Pagoda as a photo/walk stop",
      "Gion as an evening/night stop"
    ],
    personalGroupTech: [
      "energy level",
      "sleep quality",
      "jet lag",
      "shoe comfort",
      "physical fitness",
      "group size",
      "different group preferences",
      "decision-making delays",
      "phone battery",
      "internet/eSIM reliability",
      "translation app usage"
    ],
    riskBackup: [
      "backup plan if late",
      "must-do vs optional stops",
      "what stop gets cut first if the schedule slips",
      "train disruption",
      "bad weather",
      "full lockers",
      "restaurant closed",
      "sold-out tickets",
      "overcrowding"
    ]
  },
  defaults: {
    unknownMultiplier: 1,
    closeWalkCap: 15,
    photoWalkCap: 20,
    majorTransitCap: 45,
    mealOnlyWhenCrossingWindow: true
  },
  publicHolidays: {
    "2026-03-20": { en: "Vernal Equinox Day", ja: "春分の日" }
  },
  seasonWindows: [
    { id: "spring-shoulder", start: "03-01", end: "03-18", crowdMultiplier: 1.02 },
    { id: "cherry-blossom-watch", start: "03-19", end: "04-10", crowdMultiplier: 1.18 },
    { id: "autumn-foliage", start: "11-10", end: "12-05", crowdMultiplier: 1.16 },
    { id: "school-break", start: "03-20", end: "04-07", crowdMultiplier: 1.12 }
  ],
  daylightFallbackByMonth: {
    3: { sunrise: "06:10", sunset: "18:00", goldenHourStart: "17:15", blueHourEnd: "18:35" },
    4: { sunrise: "05:30", sunset: "18:25", goldenHourStart: "17:40", blueHourEnd: "19:00" },
    11: { sunrise: "06:25", sunset: "16:55", goldenHourStart: "16:10", blueHourEnd: "17:30" }
  }
};
const checklistPrintDayTimingProfiles = {
  "1": { intensity: "light", multiplier: 0.85 },
  "2": { intensity: "packed", multiplier: 1.03, city: "osaka-kyoto", fatigue: "medium" },
  "3": { intensity: "packed", multiplier: 1.08, city: "kyoto-fuji", fatigue: "medium" },
  "4": { intensity: "medium", multiplier: 1.05, city: "fuji", fatigue: "low" },
  "5": { intensity: "medium", multiplier: 0.98, city: "fuji-tokyo", fatigue: "medium" },
  "6": { intensity: "medium", multiplier: 0.96, city: "tokyo", fatigue: "medium" },
  "7": { intensity: "light", multiplier: 0.9, city: "tokyo-airport", fatigue: "medium" }
};
const checklistPrintConnectionOverrides = {
  "day1-arrival-setup->day1-kaiyukan": {
    mode: "arrivalToOpeningWindow",
    minutes: [15, 25],
    typical: 20
  },
  "day1-kaiyukan->day1-shinsaibashi": {
    mode: "middayResetBeforeEvening",
    minutes: [60, 120],
    typical: 90
  },
  "day1-shinsaibashi->day1-dinner": {
    mode: "closeEveningWalk",
    minutes: [10, 15],
    typical: 15
  },
  "day1-dinner->day1-nightlife": {
    mode: "closeNightWalk",
    minutes: [10, 15],
    typical: 10
  },
  "day2-transfer-to-kyoto->day2-hotel-check-in": {
    mode: "stationHotelHandoff",
    minutes: [5, 10],
    typical: 10
  },
  "day2-hotel-check-in->day2-kiyomizu": {
    mode: "kyotoHillsApproach",
    minutes: [25, 35],
    typical: 30
  },
  "day2-kiyomizu->day2-ninenzaka": {
    mode: "closeWalkPhoto",
    minutes: [8, 12],
    typical: 10
  },
  "day2-ninenzaka->day2-yasaka": {
    mode: "veryCloseWalkPhoto",
    minutes: [5, 8],
    typical: 5
  },
  "day2-yasaka->day2-gion": {
    mode: "closeEveningWalk",
    minutes: [10, 15],
    typical: 10
  },
  "day3-arashiyama->day3-shinkansen-mishima": {
    mode: "kyotoStationShinkansenHandoff",
    minutes: [45, 60],
    typical: 50
  },
  "day3-shinkansen-mishima->day3-transfer-fujikawaguchiko": {
    mode: "mishimaBusHandoff",
    minutes: [20, 30],
    typical: 25
  },
  "day3-transfer-fujikawaguchiko->day3-onsen-check-in": {
    mode: "arrivalHotelHandoff",
    minutes: [10, 20],
    typical: 15
  },
  "day4-chureito->day4-kawaguchiko": {
    mode: "fujiLocalAfterClimb",
    minutes: [25, 40],
    typical: 30
  },
  "day4-kawaguchiko->day4-oishi-park": {
    mode: "lakeToOishi",
    minutes: [20, 35],
    typical: 25
  },
  "day4-oishi-park->day4-panoramic-ropeway": {
    mode: "weatherOptionalFujiHop",
    minutes: [25, 40],
    typical: 30
  },
  "day5-tokyo-transfer->day5-tokyo-hotel-drop": {
    mode: "tokyoArrivalHotelHandoff",
    minutes: [15, 30],
    typical: 20
  },
  "day5-tokyo-hotel-drop->day5-sky": {
    mode: "centralTokyoToShibuyaSunset",
    minutes: [25, 45],
    typical: 35
  },
  "day5-sky->day5-shibuya-crossing": {
    mode: "closeNightViewWalk",
    minutes: [5, 12],
    typical: 10
  },
  "day5-shibuya-crossing->day5-shibuya-food-walk": {
    mode: "closeFoodWalk",
    minutes: [8, 15],
    typical: 10
  },
  "day6-skytree-solamachi->day6-akihabara": {
    mode: "eastTokyoConnectedTransit",
    minutes: [20, 35],
    typical: 25
  },
  "day6-akihabara->day6-shinjuku-night": {
    mode: "crossTokyoEveningTransit",
    minutes: [30, 45],
    typical: 35
  },
  "day7-palace->day7-lunch-walk": {
    mode: "nearbyFinalDayWalk",
    minutes: [5, 15],
    typical: 10
  },
  "day7-lunch-walk->day7-bags": {
    mode: "finalDayBagHandoff",
    minutes: [20, 35],
    typical: 25
  },
  "day7-bags->day7-airport": {
    mode: "protectedAirportBuffer",
    minutes: [35, 55],
    typical: 45
  }
};
const checklistPrintLateCutGuidance = {
  "1": {
    en: "If late, shorten Shinsaibashi browsing and protect Kaiyukan opening plus Dotonbori after dark.",
    ja: "遅れたら心斎橋散策を短くし、海遊館の開館時間と夜の道頓堀を優先します。"
  },
  "2": {
    en: "If late, shorten photo browsing; keep the direct Kiyomizu to Ninenzaka to Yasaka to Gion walk intact.",
    ja: "遅れたら写真散策を短くし、清水寺→二年坂→八坂の塔→祇園の直線的な徒歩導線を守ります。"
  },
  "3": {
    en: "If late, shorten Arashiyama before risking the Bullet Train ride to Mishima.",
    ja: "遅れたら、三島への移動を崩す前に嵐山を短くします。"
  },
  "4": {
    en: "If late or foggy, protect Chureito early if visible, keep Lake Kawaguchiko and Oishi Park, and skip the ropeway first.",
    ja: "遅れや霧がある場合は、見えるなら朝の忠霊塔を守り、河口湖と大石公園を優先して、ロープウェイから削ります。"
  },
  "5": {
    en: "If late, go straight to the central Tokyo bag drop, keep Shibuya Sky near sunset, and shorten the food walk.",
    ja: "遅れたら東京中心部の荷物預けへ直行し、夕方の渋谷スカイを守って食べ歩きを短くします。"
  },
  "6": {
    en: "If late, keep Skytree/Solamachi together, shorten Akihabara, and still land Shinjuku as the evening food walk.",
    ja: "遅れたらスカイツリー／ソラマチを一つのまとまりで守り、秋葉原を短くして新宿の夜の食事散歩へ着地します。"
  },
  "7": {
    en: "Keep this light, make lunch optional, and protect the airport buffer.",
    ja: "軽めにして昼食は任意にし、空港移動の余裕を守ります。"
  }
};
const checklistPrintTimingDefinitions = {
  "day1-arrival-setup": {
    type: "arrival-admin",
    anchor: "major",
    preferred: "early-arrival",
    targetStart: "06:00",
    airportArrivalTime: "06:00",
    transit: [25, 45],
    crowd: [20, 35],
    rest: [20, 35],
    unpredictable: [25, 45]
  },
  "day1-kaiyukan": {
    type: "aquarium-museum",
    anchor: "major",
    preferred: "opening",
    targetStart: "10:00",
    earliestStart: "10:00",
    openingSource: "fallback-kaiyukan-opening",
    indoor: true,
    ticketed: true,
    crowd: [20, 40]
  },
  "day1-nightlife": {
    type: "shopping-street-food",
    anchor: "standard",
    preferred: "night",
    targetStart: "19:30",
    photoLight: "neon-night",
    crowd: [20, 40]
  },
  "day1-shinsaibashi": {
    type: "shopping-street-food",
    anchor: "standard",
    preferred: "evening",
    targetStart: "16:30",
    walk: [5, 15],
    crowd: [10, 25]
  },
  "day1-dinner": {
    type: "shopping-street-food",
    anchor: "major",
    preferred: "evening",
    targetStart: "17:45",
    mealRole: "dinner",
    crowd: [15, 35],
    rest: [10, 20]
  },
  "day2-transfer-to-kyoto": {
    type: "hotel-transit-admin",
    anchor: "major",
    preferred: "late-morning",
    targetStart: "11:00",
    transit: [25, 45],
    crowd: [10, 25]
  },
  "day2-hotel-check-in": {
    type: "hotel-transit-admin",
    anchor: "standard",
    preferred: "afternoon",
    transit: [10, 20],
    crowd: [5, 15],
    rest: [5, 15]
  },
  "day2-kiyomizu": {
    type: "temple-shrine",
    anchor: "major",
    preferred: "pre-evening",
    targetStart: "14:00",
    latestStart: "16:45",
    closingFallback: "18:00",
    nightViewingVerified: false,
    crowd: [20, 45],
    weather: [5, 15],
    walkingFriction: "uphill"
  },
  "day2-ninenzaka": {
    type: "shopping-street-food",
    anchor: "standard",
    preferred: "evening-walk",
    closeStopCluster: "kiyomizu-gion",
    walk: [5, 10],
    crowd: [10, 25],
    shopsMayCloseLate: true
  },
  "day2-yasaka": {
    type: "viewpoint-photo",
    anchor: "quick",
    preferred: "evening-photo",
    closeStopCluster: "kiyomizu-gion",
    walk: [5, 8],
    crowd: [8, 20],
    nightPhotoFriendly: true
  },
  "day2-gion": {
    type: "shopping-street-food",
    anchor: "major",
    preferred: "evening",
    targetStart: "17:00",
    mealRole: "dinner",
    closeStopCluster: "kiyomizu-gion",
    walk: [8, 15],
    crowd: [20, 40],
    restaurantWindow: ["17:30", "21:00"]
  },
  "day3-arashiyama": {
    type: "temple-shrine",
    anchor: "major",
    preferred: "early-photo-then-shops",
    targetStart: "07:00",
    scenicPhotoWindow: ["06:30", "09:30"],
    shopsFoodWindow: ["09:00", "11:30"],
    transit: [20, 40],
    crowd: [25, 55],
    weather: [10, 25]
  },
  "day3-shinkansen-mishima": {
    type: "hotel-transit-admin",
    anchor: "major",
    preferred: "afternoon",
    transit: [25, 45],
    crowd: [15, 35]
  },
  "day3-transfer-fujikawaguchiko": {
    type: "hotel-transit-admin",
    anchor: "major",
    preferred: "afternoon",
    transit: [20, 45],
    crowd: [10, 30],
    weather: [5, 20]
  },
  "day3-onsen-check-in": {
    type: "hotel-transit-admin",
    anchor: "standard",
    preferred: "evening",
    transit: [10, 20],
    crowd: [5, 15],
    rest: [15, 30]
  },
  "day4-chureito": {
    type: "viewpoint-photo",
    anchor: "major",
    preferred: "early-morning",
    targetStart: "07:15",
    scenicPhotoWindow: ["07:00", "09:15"],
    climb: "398-stairs",
    crowd: [20, 45],
    rest: [20, 35],
    weather: [20, 40]
  },
  "day4-kawaguchiko": {
    type: "viewpoint-photo",
    anchor: "major",
    preferred: "late-morning-after-chureito",
    targetStart: "10:20",
    transit: [15, 35],
    crowd: [15, 35],
    rest: [15, 30],
    weather: [15, 35]
  },
  "day4-oishi-park": {
    type: "viewpoint-photo",
    anchor: "standard",
    preferred: "midday-lake-flowers",
    targetStart: "12:25",
    transit: [15, 30],
    crowd: [10, 30],
    rest: [15, 30],
    weather: [15, 35]
  },
  "day4-panoramic-ropeway": {
    type: "viewpoint-photo",
    anchor: "standard",
    preferred: "optional-weather-dependent",
    targetStart: "14:30",
    optionalIfLate: true,
    transit: [15, 35],
    crowd: [20, 50],
    rest: [10, 25],
    weather: [20, 45]
  },
  "day5-tokyo-transfer": {
    type: "hotel-transit-admin",
    anchor: "major",
    preferred: "morning-midday",
    targetStart: "10:00",
    transit: [25, 50],
    crowd: [15, 35],
    weather: [5, 20]
  },
  "day5-tokyo-hotel-drop": {
    type: "hotel-transit-admin",
    anchor: "standard",
    preferred: "early-afternoon",
    transit: [10, 20],
    crowd: [5, 20],
    rest: [10, 25]
  },
  "day5-shibuya-crossing": {
    type: "viewpoint-photo",
    anchor: "quick",
    preferred: "after-dark",
    targetStart: "18:45",
    scenicPhotoWindow: ["18:00", "20:30"],
    walk: [5, 15],
    crowd: [15, 35]
  },
  "day5-shibuya-food-walk": {
    type: "shopping-street-food",
    anchor: "major",
    preferred: "evening",
    targetStart: "19:00",
    mealRole: "dinner",
    walk: [5, 20],
    crowd: [20, 45]
  },
  "day5-sky": {
    type: "viewpoint-photo",
    anchor: "major",
    preferred: "sunset",
    targetStart: "16:45",
    timedTicketWindow: ["16:40", "17:00"],
    scenicPhotoWindow: ["16:45", "18:30"],
    transit: [10, 25],
    crowd: [20, 45]
  },
  "day6-skytree-solamachi": {
    type: "viewpoint-photo",
    anchor: "major",
    preferred: "morning-to-midday",
    targetStart: "10:00",
    timedTicketWindow: ["10:00", "11:00"],
    sameAreaBlock: "skytree-solamachi",
    transit: [15, 35],
    walk: [10, 25],
    crowd: [20, 45],
    rest: [20, 35]
  },
  "day6-akihabara": {
    type: "shopping-street-food",
    anchor: "standard",
    preferred: "short-afternoon",
    targetStart: "14:15",
    transit: [10, 25],
    crowd: [15, 35],
    rest: [10, 25]
  },
  "day6-shinjuku-night": {
    type: "shopping-street-food",
    anchor: "major",
    preferred: "evening-city-lights",
    targetStart: "17:45",
    mealRole: "dinner",
    transit: [20, 40],
    walk: [10, 20],
    crowd: [20, 45]
  },
  "day7-palace": {
    type: "viewpoint-photo",
    anchor: "standard",
    preferred: "morning",
    targetStart: "10:00",
    openAccessOnly: true,
    transit: [10, 25],
    crowd: [10, 30],
    weather: [10, 25]
  },
  "day7-lunch-walk": {
    type: "shopping-street-food",
    anchor: "quick",
    preferred: "optional-nearby-lunch",
    targetStart: "11:15",
    optionalIfLate: true,
    transit: [5, 15],
    crowd: [10, 25],
    rest: [10, 20]
  },
  "day7-bags": {
    type: "hotel-transit-admin",
    anchor: "quick",
    preferred: "afternoon",
    targetStart: "13:15",
    transit: [10, 25],
    crowd: [5, 15]
  },
  "day7-airport": {
    type: "departure-admin",
    anchor: "major",
    preferred: "protected-afternoon-transfer",
    targetStart: "15:10",
    flightTime: "19:00",
    transit: [25, 50],
    crowd: [10, 30],
    unpredictable: [15, 35]
  }
};
let budgetSourceUpdatedAt = "2026-03-27";
let budgetAssumptionCopy = {
  en:
    "The cost model follows one fixed 7-day route: Osaka, Kyoto, two Mt. Fuji area nights, and Central Tokyo. Extras cover luggage forwarding, Fuji weather pivots, the Day 5 Tokyo transfer, and a light airport-day buffer.",
  ja:
    "費用モデルは、大阪、京都、富士エリア2泊、東京中心部を回る固定の7日間ルートに合わせています。追加費用には、荷物配送、富士山の天候による動き直し、5日目の東京移動、帰国日の小さな余裕分を含めています。"
};
let budgetStayDefinitions = {};
let budgetSourceGroups = [];
let budgetDayDefinitions = [];
let tripNoteDefinitions = [];
let tripNoteDefinitionMap = new Map();
let panelScrollAlignmentToken = 0;
let sectionNavScrollLockPanelId = "";
let sectionNavScrollLockUntil = 0;
const fujiForecastCacheMaxAgeMs = 45 * 60 * 1000;
const fujiForecastRequestTimeoutMs = 5500;
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
  ".hero-panel",
  ".trip-stats > *",
  ".progress-card",
  ".content-section > .section-heading",
  ".checklist-header",
  ".essentials-grid > .essentials-card",
  ".day-grid > .day-card",
  ".notes-grid > .note-card",
  ".budget-panel",
  ".budget-day-card",
  ".route-map",
  ".route-map__day-browser",
  ".route-map__detail",
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
    en: "Route map from Osaka through Kyoto and Mt. Fuji to Tokyo.",
    ja: "大阪から京都、富士山エリアを経て東京へ進むルート地図です。"
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
const routeExplorerDefaultSelectionId = "overview";
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
let radioYoutubePlayerReadyPromise = null;
let radioYoutubePlayer = null;
let radioYoutubePlayerReady = false;
let radioYoutubeIframe = null;
let radioYoutubeReadyResolve = null;
let radioYoutubeReadyReject = null;
let radioYoutubeReadyTimeout = 0;
let radioYoutubeProbeTimer = 0;
let radioYoutubeInfoPollTimer = 0;
let radioYoutubeProbeAttempts = 0;
let radioYoutubeDisabled = false;
let radioStationInitialized = false;
let radioMediaSessionReady = false;
let radioPlaybackConfirmTimeout = 0;
let radioVolume = radioDefaultVolume;
let radioPlaylistTrackCount = 0;
let radioCurrentTrackIndex = -1;
let radioCurrentTime = 0;
let radioCurrentTimeAnchorMs = 0;
let radioCurrentVideoId = "";
let radioCurrentTrackTitle = "";
let radioCurrentArtworkUrl = "";
let radioPendingPlaybackHistoryIndex = null;
let radioPreviousActionUntilMs = 0;
let radioPreviousActionTrackIndex = -1;
const radioRecentTrackHistory = [];
const radioPlaybackTrackHistory = [];
let radioPlaybackHistoryCursor = -1;
const radioState = {
  isReady: false,
  isPlaying: false,
  loadFailed: false,
  pendingPlay: false,
  canSkip: false,
  isHidden: false
};

function getResolvedBackdropImageUrl(imageUrl = "") {
  try {
    return new URL(imageUrl, window.location.href).href;
  } catch {
    return imageUrl;
  }
}

function getRandomBackdropImageIndex() {
  return Math.floor(Math.random() * siteBackdropImageUrls.length);
}

function getNextBackdropImageIndex() {
  if (siteBackdropImageUrls.length <= 1) {
    return 0;
  }

  return (siteBackdropCurrentIndex + 1) % siteBackdropImageUrls.length;
}

function setBackdropSlideImage(slide, imageUrl) {
  if (!slide || !imageUrl) {
    return;
  }

  slide.style.backgroundImage = `url("${getResolvedBackdropImageUrl(imageUrl).replace(/"/g, '\\"')}")`;
}

function preloadBackdropImage(imageUrl) {
  return new Promise((resolve) => {
    if (!imageUrl) {
      resolve(false);
      return;
    }

    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = getResolvedBackdropImageUrl(imageUrl);

    if (image.complete && image.naturalWidth > 0) {
      resolve(true);
    }
  });
}

function warmNextBackdropImage() {
  if (siteBackdropImageUrls.length <= 1 || reducedEffectsEnabled) {
    siteBackdropPreloadImage = null;
    return;
  }

  siteBackdropPreloadImage = new Image();
  siteBackdropPreloadImage.decoding = "async";
  siteBackdropPreloadImage.src = getResolvedBackdropImageUrl(siteBackdropImageUrls[getNextBackdropImageIndex()]);
}

function clearBackdropSlideshowTimer() {
  if (siteBackdropTimer) {
    window.clearTimeout(siteBackdropTimer);
    siteBackdropTimer = 0;
  }
}

function shouldAnimateBackdropSlideshow() {
  return (
    siteBackdropInitialized &&
    siteBackdropSlides.length > 1 &&
    siteBackdropImageUrls.length > 1 &&
    !reducedEffectsEnabled &&
    !offlineSnapshotMode &&
    document.visibilityState !== "hidden"
  );
}

function scheduleBackdropSlideshow() {
  clearBackdropSlideshowTimer();
  if (!shouldAnimateBackdropSlideshow()) {
    return;
  }

  siteBackdropTimer = window.setTimeout(() => {
    siteBackdropTimer = 0;
    transitionToBackdropImage(getNextBackdropImageIndex());
  }, siteBackdropRotationIntervalMs);
}

function transitionToBackdropImage(nextIndex) {
  if (!shouldAnimateBackdropSlideshow()) {
    return;
  }

  const normalizedIndex = ((Number(nextIndex) || 0) % siteBackdropImageUrls.length + siteBackdropImageUrls.length) %
    siteBackdropImageUrls.length;
  const imageUrl = siteBackdropImageUrls[normalizedIndex];
  const nextSlideIndex = (siteBackdropActiveSlideIndex + 1) % siteBackdropSlides.length;
  const nextSlide = siteBackdropSlides[nextSlideIndex];
  const token = siteBackdropTransitionToken + 1;
  siteBackdropTransitionToken = token;

  preloadBackdropImage(imageUrl).then((loaded) => {
    if (token !== siteBackdropTransitionToken || !shouldAnimateBackdropSlideshow()) {
      return;
    }

    if (!loaded) {
      scheduleBackdropSlideshow();
      return;
    }

    setBackdropSlideImage(nextSlide, imageUrl);
    siteBackdropSlides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === nextSlideIndex);
    });
    siteBackdropCurrentIndex = normalizedIndex;
    siteBackdropActiveSlideIndex = nextSlideIndex;
    warmNextBackdropImage();
    scheduleBackdropSlideshow();
  });
}

function syncDecorativeVideoPlayback() {
  if (!siteBackdropInitialized) {
    return;
  }

  if (shouldAnimateBackdropSlideshow()) {
    warmNextBackdropImage();
    scheduleBackdropSlideshow();
    return;
  }

  clearBackdropSlideshowTimer();
  siteBackdropTransitionToken += 1;
}

function initializeDecorativeMediaExperience() {
  if (!siteBackdrop || !siteBackdropSlides.length || !siteBackdropImageUrls.length) {
    return;
  }

  const firstSlide = siteBackdropSlides[0];
  setBackdropSlideImage(firstSlide, siteBackdropImageUrls[0]);
  siteBackdropSlides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === 0);
  });
  siteBackdropInitialized = true;

  if (shouldAnimateBackdropSlideshow()) {
    const randomIndex = getRandomBackdropImageIndex();
    if (randomIndex > 0) {
      transitionToBackdropImage(randomIndex);
    } else {
      warmNextBackdropImage();
      scheduleBackdropSlideshow();
    }
  } else {
    warmNextBackdropImage();
  }
}

function buildRouteExplorerViewDefinitions(viewDefinitions = []) {
  const overviewView = {
    id: routeExplorerDefaultSelectionId,
    label: {
      en: "Full route",
      ja: "全体ルート"
    },
    title: {
      en: "Japan route overview",
      ja: "日本ルート全体"
    },
    summary: {
      en: "View the full route with the Bullet Train ride to Mishima, Mt. Fuji, and the Tokyo finish.",
      ja: "三島への移動、富士山エリア、東京での締めまで全体ルートを確認します。"
    },
    badges: [
      { en: "Overview", ja: "全体" },
      { en: "Desktop map", ja: "デスクトップ地図" }
    ],
    transitActions: [],
    dayLinks: [],
    stopIds: routeExplorerStopDefinitions.map((stop) => stop.id),
    segmentIds: routeExplorerPathDefinitions.map((segment) => segment.id)
  };

  const dayViews = viewDefinitions.map((viewDefinition) => {
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

  return [overviewView, ...dayViews];
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

function getRadioLabels() {
  return {
    idle: { en: "Quiet", ja: "待機中" },
    loading: { en: "Tuning...", ja: "チューニング中..." },
    ready: { en: "Ready", ja: "準備完了" },
    playing: { en: "On air", ja: "再生中" },
    paused: { en: "Paused", ja: "一時停止" },
    fallback: { en: "Radio unavailable in this browser", ja: "このブラウザではラジオを利用できません" },
    play: { en: "Play playlist", ja: "プレイリストを再生" },
    pause: { en: "Pause playlist", ja: "プレイリストを一時停止" },
    previous: { en: "Restart or previous track", ja: "曲を先頭に戻す / 前の曲" },
    next: { en: "Next track", ja: "次の曲" },
    hide: { en: "Hide radio", ja: "ラジオを隠す" },
    show: { en: "Show radio", ja: "ラジオを表示" }
  };
}

function getRadioLabel(key) {
  const labels = getRadioLabels()[key] || getRadioLabels().idle;
  return getLocalizedText(labels);
}

function normalizeRadioVolume(value, { legacy = false } = {}) {
  const parsedVolume = Number(value);
  if (!Number.isFinite(parsedVolume)) {
    return radioDefaultVolume;
  }

  const normalizedVolumeInput =
    parsedVolume > 0 && (parsedVolume < 1 || (legacy && parsedVolume <= 1))
      ? parsedVolume * 100
      : parsedVolume;
  return clamp(Math.round(normalizedVolumeInput), radioMinVolume, radioMaxVolume);
}

function formatRadioVolumeLabel(value) {
  const normalizedVolume = normalizeRadioVolume(value);
  return `${normalizedVolume}%`;
}

function getRadioYoutubePlayerVolume(value) {
  const siteVolume = normalizeRadioVolume(value);
  const curvedVolume =
    Math.pow(siteVolume / radioMaxVolume, radioVolumeCurveExponent) *
    radioYoutubeMaxPlayerVolume;
  return clamp(
    Math.ceil(curvedVolume),
    radioYoutubeMinPlayerVolume,
    radioYoutubeMaxPlayerVolume
  );
}

function getMigratedStoredRadioVolume(value, options = {}) {
  return clamp(
    Math.min(normalizeRadioVolume(value, options), radioSavedVolumeMigrationMax),
    radioMinVolume,
    radioSavedVolumeMigrationMax
  );
}

function markRadioVolumeStorageMigrated() {
  try {
    window.localStorage.setItem(radioVolumeMigrationStorageKey, "true");
  } catch {
    // Ignore private-mode or blocked-storage failures.
  }
}

function getRadioClockNow() {
  return window.performance && typeof window.performance.now === "function"
    ? window.performance.now()
    : Date.now();
}

function setRadioCurrentTime(seconds) {
  radioCurrentTime = Math.max(0, Number(seconds) || 0);
  radioCurrentTimeAnchorMs = getRadioClockNow();
}

function getEstimatedRadioCurrentTime() {
  if (!radioState.isPlaying || !radioCurrentTimeAnchorMs) {
    return radioCurrentTime;
  }

  return radioCurrentTime + Math.max(0, getRadioClockNow() - radioCurrentTimeAnchorMs) / 1000;
}

function getStoredRadioVolume() {
  try {
    const storedValue = window.localStorage.getItem(radioVolumeStorageKey);
    if (storedValue !== null) {
      return normalizeRadioVolume(storedValue);
    }

    const previousValue = window.localStorage.getItem(radioPreviousVolumeStorageKey);
    if (previousValue !== null) {
      const migratedVolume = getMigratedStoredRadioVolume(previousValue);
      storeRadioVolume(migratedVolume);
      storeRadioVolumeAtKey(radioPreviousVolumeStorageKey, migratedVolume);
      markRadioVolumeStorageMigrated();
      return migratedVolume;
    }

    const legacyValue = window.localStorage.getItem(radioLegacyVolumeStorageKey);
    if (legacyValue !== null) {
      const migratedVolume = getMigratedStoredRadioVolume(legacyValue, { legacy: true });
      storeRadioVolume(migratedVolume);
      storeRadioVolumeAtKey(radioLegacyVolumeStorageKey, migratedVolume);
      markRadioVolumeStorageMigrated();
      return migratedVolume;
    }

    return radioDefaultVolume;
  } catch {
    return radioDefaultVolume;
  }
}

function storeRadioVolume(value) {
  try {
    window.localStorage.setItem(radioVolumeStorageKey, String(value));
  } catch {
    // Ignore private-mode or blocked-storage failures.
  }
}

function storeRadioVolumeAtKey(key, value) {
  try {
    window.localStorage.setItem(key, String(value));
  } catch {
    // Ignore private-mode or blocked-storage failures.
  }
}

function getStoredRadioHidden() {
  try {
    return window.localStorage.getItem(radioVisibilityStorageKey) === "true";
  } catch {
    return false;
  }
}

function storeRadioHidden(value) {
  try {
    window.localStorage.setItem(radioVisibilityStorageKey, value ? "true" : "false");
  } catch {
    // Ignore private-mode or blocked-storage failures.
  }
}

function syncRadioVolumeUi() {
  const nextVolume = normalizeRadioVolume(radioVolume);
  radioVolume = nextVolume;
  if (radioVolumeInput) {
    radioVolumeInput.min = String(radioMinVolume);
    radioVolumeInput.max = String(radioMaxVolume);
    radioVolumeInput.step = "1";
    if (radioVolumeInput.value !== String(nextVolume)) {
      radioVolumeInput.value = String(nextVolume);
    }
  }
  if (radioVolumeLabel) {
    const volumeLabel = formatRadioVolumeLabel(nextVolume);
    radioVolumeLabel.value = volumeLabel;
    radioVolumeLabel.textContent = volumeLabel;
  }
}

function setRadioStatus(key) {
  if (radioStatusNode) {
    radioStatusNode.textContent = getRadioLabel(key);
  }
}

function setRadioState(nextState) {
  radioPlayerNode?.setAttribute("data-radio-state", nextState);
  setRadioStatus(nextState);
}

function syncRadioVisibilityUi() {
  if (!radioPlayerNode) {
    return;
  }

  radioPlayerNode.dataset.radioCollapsed = radioState.isHidden ? "true" : "false";
  if (radioHideButton) {
    radioHideButton.hidden = radioState.isHidden;
    radioHideButton.setAttribute("aria-label", getRadioLabel("hide"));
  }
  if (radioShowButton) {
    radioShowButton.hidden = !radioState.isHidden;
    radioShowButton.setAttribute("aria-label", getRadioLabel("show"));
    radioShowButton.dataset.ariaLabelEn = getRadioLabels().show.en;
    radioShowButton.dataset.ariaLabelJa = getRadioLabels().show.ja;
  }
}

function syncRadioControls() {
  const radioUnavailable = radioState.loadFailed || radioYoutubeDisabled;
  const canControlPlaybackPosition =
    radioState.isReady && !radioUnavailable && Boolean(radioYoutubePlayer);

  if (radioToggleButton) {
    const labelKey = radioUnavailable
      ? "fallback"
      : radioState.pendingPlay
        ? "loading"
        : radioState.isPlaying
          ? "pause"
          : "play";
    radioToggleButton.setAttribute("aria-label", getRadioLabel(labelKey));
    radioToggleButton.dataset.ariaLabelEn = getRadioLabels()[labelKey].en;
    radioToggleButton.dataset.ariaLabelJa = getRadioLabels()[labelKey].ja;
    radioToggleButton.disabled = radioUnavailable || radioState.pendingPlay;
  }
  if (radioToggleIconNode) {
    radioToggleIconNode.textContent = radioUnavailable
      ? "!"
      : radioState.pendingPlay
        ? "..."
        : radioState.isPlaying
          ? "⏸"
          : "▶";
  }
  if (radioPreviousButton) {
    radioPreviousButton.disabled = !canControlPlaybackPosition;
    radioPreviousButton.setAttribute("aria-label", getRadioLabel("previous"));
    radioPreviousButton.dataset.ariaLabelEn = getRadioLabels().previous.en;
    radioPreviousButton.dataset.ariaLabelJa = getRadioLabels().previous.ja;
  }
  if (radioNextButton) {
    radioNextButton.disabled = !radioState.canSkip || radioUnavailable;
    radioNextButton.setAttribute("aria-label", getRadioLabel("next"));
    radioNextButton.dataset.ariaLabelEn = getRadioLabels().next.en;
    radioNextButton.dataset.ariaLabelJa = getRadioLabels().next.ja;
  }
  if (radioHideButton) {
    radioHideButton.setAttribute("aria-label", getRadioLabel("hide"));
    radioHideButton.dataset.ariaLabelEn = getRadioLabels().hide.en;
    radioHideButton.dataset.ariaLabelJa = getRadioLabels().hide.ja;
  }
  syncRadioVisibilityUi();
}

function applyRadioVolume() {
  syncRadioVolumeUi();

  if (radioYoutubePlayer && typeof radioYoutubePlayer.setVolume === "function") {
    try {
      const playerVolume = getRadioYoutubePlayerVolume(radioVolume);
      const canMute =
        typeof radioYoutubePlayer.mute === "function" &&
        typeof radioYoutubePlayer.unMute === "function";
      if (canMute && !radioState.isPlaying) {
        radioYoutubePlayer.mute();
      }
      radioYoutubePlayer.setVolume(playerVolume);
      if (canMute) {
        radioYoutubePlayer.unMute();
      }
    } catch {
      // Ignore partial YouTube player volume implementations.
    }
  }
}

function isRadioVideoId(value) {
  const videoId = String(value || "").trim();
  return /^[\w-]{11}$/.test(videoId) && videoId.toLowerCase() !== "videoseries";
}

function getRadioVideoIdFromPlaylistEntry(entry) {
  if (isRadioVideoId(entry)) {
    return String(entry).trim();
  }

  if (typeof entry === "string") {
    const match =
      entry.match(/[?&]v=([\w-]{11})/) ||
      entry.match(/\/embed\/([\w-]{11})/) ||
      entry.match(/\/shorts\/([\w-]{11})/) ||
      entry.match(/youtu\.be\/([\w-]{11})/);
    return isRadioVideoId(match?.[1]) ? match[1] : "";
  }

  if (!entry || typeof entry !== "object") {
    return "";
  }

  const rawVideoId =
    entry.video_id ||
    entry.videoId ||
    entry.id ||
    entry.video ||
    "";
  return isRadioVideoId(rawVideoId) ? String(rawVideoId).trim() : "";
}

function getRadioVideoIdFromInfo(info = {}) {
  const videoData = info.videoData && typeof info.videoData === "object" ? info.videoData : {};
  const playlistIndex = Number.parseInt(String(info.playlistIndex), 10);
  if (Array.isArray(info.playlist) && Number.isInteger(playlistIndex) && playlistIndex >= 0) {
    const playlistVideoId = getRadioVideoIdFromPlaylistEntry(info.playlist[playlistIndex]);
    if (playlistVideoId) {
      return playlistVideoId;
    }
  }

  const rawVideoId =
    videoData.video_id ||
    videoData.videoId ||
    info.video_id ||
    info.videoId ||
    info.currentVideoId ||
    info.current_video_id ||
    "";
  const directVideoId = String(rawVideoId || "").trim();
  if (isRadioVideoId(directVideoId)) {
    return directVideoId;
  }

  const videoUrl = String(
    videoData.video_url ||
    videoData.videoUrl ||
    info.video_url ||
    info.videoUrl ||
    info.url ||
    ""
  );
  const videoUrlMatch =
    videoUrl.match(/[?&]v=([\w-]{11})/) ||
    videoUrl.match(/\/embed\/([\w-]{11})/) ||
    videoUrl.match(/\/shorts\/([\w-]{11})/) ||
    videoUrl.match(/youtu\.be\/([\w-]{11})/);
  return isRadioVideoId(videoUrlMatch?.[1]) ? videoUrlMatch[1] : "";
}

function getRadioTrackTitleFromInfo(info = {}) {
  const videoData = info.videoData && typeof info.videoData === "object" ? info.videoData : {};
  return String(videoData.title || info.title || "").trim();
}

function getRadioArtworkUrlForVideo(videoId) {
  return videoId ? `https://img.youtube.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg` : "";
}

function showRadioArtworkFallback() {
  radioCurrentVideoId = "";
  radioCurrentArtworkUrl = "";
  radioPlayerNode?.setAttribute("data-radio-artwork-state", "fallback");
  if (!radioArtworkNode) {
    return;
  }

  radioArtworkNode.hidden = true;
  radioArtworkNode.removeAttribute("src");
  radioArtworkNode.dataset.radioArtworkKind = "fallback";
}

function setRadioArtworkSource(sourceUrl, { kind = "track", title = "" } = {}) {
  if (!sourceUrl) {
    showRadioArtworkFallback();
    updateRadioMediaSessionMetadata();
    return;
  }

  radioCurrentArtworkUrl = sourceUrl;
  radioPlayerNode?.setAttribute("data-radio-artwork-state", kind);
  if (radioArtworkNode) {
    radioArtworkNode.hidden = true;
    radioArtworkNode.removeAttribute("src");
    radioArtworkNode.dataset.radioArtworkKind = kind;
    radioArtworkNode.alt = title ? `${title} artwork` : "";
  }
  updateRadioMediaSessionMetadata();
}

function setRadioDefaultArtwork() {
  showRadioArtworkFallback();
  updateRadioMediaSessionMetadata();
}

function handleRadioArtworkError() {
  showRadioArtworkFallback();
  updateRadioMediaSessionMetadata();
}

function updateRadioArtworkFromInfo(info = {}) {
  const previousTrackTitle = radioCurrentTrackTitle;
  const trackTitle = getRadioTrackTitleFromInfo(info);
  if (trackTitle) {
    radioCurrentTrackTitle = trackTitle;
  }

  const videoId = getRadioVideoIdFromInfo(info);
  if (videoId) {
    radioCurrentVideoId = videoId;
    setRadioArtworkSource(getRadioArtworkUrlForVideo(videoId), {
      kind: "track",
      title: radioCurrentTrackTitle || radioStationMeta.title
    });
    return;
  }

  if (!radioCurrentArtworkUrl || (trackTitle && trackTitle !== previousTrackTitle)) {
    setRadioDefaultArtwork();
    return;
  }

  updateRadioMediaSessionMetadata();
}

function getResolvedRadioArtworkUrl() {
  if (!radioCurrentArtworkUrl) {
    return "";
  }

  try {
    return new URL(radioCurrentArtworkUrl, window.location.href).href;
  } catch {
    return radioCurrentArtworkUrl;
  }
}

function updateRadioMediaSessionMetadata() {
  if (!("mediaSession" in navigator) || !("MediaMetadata" in window)) {
    return;
  }

  const artworkUrl = getResolvedRadioArtworkUrl();
  try {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: radioCurrentTrackTitle || radioStationMeta.title,
      artist: radioStationMeta.artist,
      album: radioStationMeta.album,
      artwork: artworkUrl
        ? [
            {
              src: artworkUrl,
              sizes: "480x360",
              type: "image/jpeg"
            }
          ]
        : []
    });
  } catch {
    // Ignore browsers with partial Media Session metadata support.
  }
}

function clearRadioYoutubeReadinessTimers() {
  if (radioYoutubeReadyTimeout) {
    window.clearTimeout(radioYoutubeReadyTimeout);
    radioYoutubeReadyTimeout = 0;
  }
  if (radioYoutubeProbeTimer) {
    window.clearTimeout(radioYoutubeProbeTimer);
    radioYoutubeProbeTimer = 0;
  }
}

function clearRadioYoutubeInfoPolling() {
  if (radioYoutubeInfoPollTimer) {
    window.clearTimeout(radioYoutubeInfoPollTimer);
    radioYoutubeInfoPollTimer = 0;
  }
}

function clearRadioPlaybackConfirmation() {
  if (radioPlaybackConfirmTimeout) {
    window.clearTimeout(radioPlaybackConfirmTimeout);
    radioPlaybackConfirmTimeout = 0;
  }
}

function clearRadioYoutubeReadinessCallbacks() {
  clearRadioYoutubeReadinessTimers();
  radioYoutubeReadyResolve = null;
  radioYoutubeReadyReject = null;
  radioYoutubeProbeAttempts = 0;
}

function disableRadioYoutubeEmbed() {
  radioYoutubeDisabled = true;
  radioYoutubePlayerReady = false;
  radioYoutubePlayer = null;
  radioYoutubePlayerReadyPromise = null;
  clearRadioPlaybackConfirmation();
  clearRadioYoutubeReadinessCallbacks();
  clearRadioYoutubeInfoPolling();
  if (radioYoutubeMountNode) {
    radioYoutubeMountNode.replaceChildren();
  }
  radioYoutubeIframe = null;
  showRadioArtworkFallback();
}

function markRadioFallback() {
  disableRadioYoutubeEmbed();
  radioState.loadFailed = true;
  radioState.isReady = false;
  radioState.isPlaying = false;
  radioState.pendingPlay = false;
  radioState.canSkip = false;
  setRadioState("fallback");
  syncRadioControls();
  updateRadioMediaSessionPlaybackState();
}

function updateRadioMediaSessionPlaybackState() {
  if (!("mediaSession" in navigator)) {
    return;
  }

  try {
    navigator.mediaSession.playbackState = radioState.isPlaying ? "playing" : "paused";
  } catch {
    // Ignore unsupported Media Session state updates.
  }
}

function setRadioMediaSessionAction(action, handler) {
  try {
    navigator.mediaSession.setActionHandler(action, handler);
  } catch {
    // Ignore browsers that do not support this specific media action.
  }
}

function configureRadioMediaSession() {
  if (radioMediaSessionReady || !("mediaSession" in navigator)) {
    return;
  }

  try {
    updateRadioMediaSessionMetadata();
    setRadioMediaSessionAction("play", playRadio);
    setRadioMediaSessionAction("pause", pauseRadio);
    setRadioMediaSessionAction("previoustrack", previousRadioTrack);
    setRadioMediaSessionAction("nexttrack", nextRadioTrack);
    radioMediaSessionReady = true;
    updateRadioMediaSessionPlaybackState();
  } catch {
    // Ignore browsers with partial Media Session support.
  }
}

function getRadioYoutubeOrigin() {
  if (window.location.hostname === "kairosfx.github.io") {
    return radioGithubPagesOrigin;
  }

  return window.location.origin && window.location.origin !== "null"
    ? window.location.origin
    : "";
}

function getRadioYoutubeEmbedUrl() {
  const params = new URLSearchParams({
    enablejsapi: "1",
    autoplay: "0",
    controls: "0",
    disablekb: "1",
    fs: "0",
    iv_load_policy: "3",
    list: radioPlaylistId,
    listType: "playlist",
    modestbranding: "1",
    playsinline: "1",
    rel: "0"
  });
  const origin = getRadioYoutubeOrigin();
  if (origin) {
    params.set("origin", origin);
  }
  return `${radioYoutubePlayerHost}/embed/videoseries?${params.toString()}`;
}

function getRadioYoutubeMountNode() {
  if (radioYoutubeMountNode) {
    if (radioFrameNode && radioYoutubeMountNode.parentElement !== radioFrameNode) {
      radioFrameNode.prepend(radioYoutubeMountNode);
    }
    return radioYoutubeMountNode;
  }

  const mountNode = document.createElement("div");
  mountNode.className = "travel-radio__youtube";
  mountNode.setAttribute("data-radio-youtube-player", "true");
  mountNode.setAttribute("aria-hidden", "true");
  (radioFrameNode || radioPlayerNode)?.prepend(mountNode);
  radioYoutubeMountNode = mountNode;
  return mountNode;
}

function ensureRadioYoutubeIframe() {
  if (radioYoutubeDisabled) {
    return null;
  }

  if (radioYoutubeIframe) {
    return radioYoutubeIframe;
  }

  const mountNode = getRadioYoutubeMountNode();
  const existingIframe = mountNode?.querySelector("iframe");
  if (existingIframe instanceof HTMLIFrameElement) {
    existingIframe.id = radioYoutubePlayerId;
    mountNode.querySelectorAll("iframe").forEach((iframe) => {
      if (iframe !== existingIframe) {
        iframe.remove();
      }
    });
    radioYoutubeIframe = existingIframe;
    return radioYoutubeIframe;
  }

  const iframe = document.createElement("iframe");
  iframe.id = radioYoutubePlayerId;
  iframe.title = "Kairos VIII playlist radio";
  iframe.src = getRadioYoutubeEmbedUrl();
  iframe.width = "320";
  iframe.height = "180";
  iframe.loading = "eager";
  iframe.allow = "autoplay; encrypted-media";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.setAttribute("allowfullscreen", "");
  iframe.setAttribute("aria-hidden", "true");
  iframe.setAttribute("tabindex", "-1");
  mountNode?.replaceChildren(iframe);
  radioYoutubeIframe = iframe;
  return radioYoutubeIframe;
}

function isRadioYoutubeIframePlaceholder(iframe) {
  if (!iframe?.contentWindow) {
    return true;
  }

  try {
    const iframeHref = String(iframe.contentWindow.location.href || "");
    return !iframeHref || iframeHref === "about:blank" || iframeHref.startsWith("chrome-error:");
  } catch {
    return false;
  }
}

function postRadioYoutubeCommand(func, args = []) {
  if (radioYoutubeDisabled || !radioYoutubeIframe?.contentWindow) {
    return;
  }

  radioYoutubeIframe.contentWindow.postMessage(
    JSON.stringify({
      event: "command",
      id: radioYoutubePlayerId,
      channel: "widget",
      func,
      args
    }),
    "*"
  );
}

function requestRadioYoutubeInfoDelivery() {
  if (radioYoutubeDisabled || !radioYoutubeIframe?.contentWindow) {
    return;
  }

  radioYoutubeIframe.contentWindow.postMessage(
    JSON.stringify({
      event: "listening",
      id: radioYoutubePlayerId,
      channel: "widget"
    }),
    "*"
  );
}

function startRadioYoutubeInfoPolling({ immediate = false } = {}) {
  if (
    radioYoutubeDisabled ||
    radioState.loadFailed ||
    !radioYoutubeIframe?.contentWindow ||
    radioYoutubeInfoPollTimer
  ) {
    return;
  }

  if (immediate) {
    requestRadioYoutubeInfoDelivery();
  }

  radioYoutubeInfoPollTimer = window.setTimeout(() => {
    radioYoutubeInfoPollTimer = 0;
    if (radioState.isPlaying || radioState.pendingPlay) {
      requestRadioYoutubeInfoDelivery();
      startRadioYoutubeInfoPolling();
    }
  }, radioYoutubeInfoPollIntervalMs);
}

function scheduleRadioPlaybackConfirmation() {
  clearRadioPlaybackConfirmation();
  radioPlaybackConfirmTimeout = window.setTimeout(() => {
    radioPlaybackConfirmTimeout = 0;
    if (radioState.pendingPlay) {
      markRadioFallback();
    }
  }, radioPlaybackConfirmTimeoutMs);
}

function createRadioYoutubePlayerProxy() {
  return {
    usesPostMessage: true,
    setVolume(value) {
      postRadioYoutubeCommand("setVolume", [value]);
    },
    mute() {
      postRadioYoutubeCommand("mute");
    },
    unMute() {
      postRadioYoutubeCommand("unMute");
    },
    playVideo() {
      postRadioYoutubeCommand("playVideo");
    },
    pauseVideo() {
      postRadioYoutubeCommand("pauseVideo");
    },
    seekTo(seconds, allowSeekAhead = true) {
      postRadioYoutubeCommand("seekTo", [seconds, allowSeekAhead]);
    },
    previousVideo() {
      postRadioYoutubeCommand("previousVideo");
    },
    nextVideo() {
      postRadioYoutubeCommand("nextVideo");
    },
    playVideoAt(index) {
      postRadioYoutubeCommand("playVideoAt", [index]);
    }
  };
}

function getKnownRadioPlaylistTrackCount() {
  return Number.isInteger(radioPlaylistTrackCount) && radioPlaylistTrackCount > 0
    ? radioPlaylistTrackCount
    : 0;
}

function rememberRadioPlaybackTrackIndex(trackIndex) {
  if (!Number.isInteger(trackIndex) || trackIndex < 0) {
    return;
  }

  if (radioPlaybackHistoryCursor >= 0 && radioPlaybackTrackHistory[radioPlaybackHistoryCursor] === trackIndex) {
    return;
  }

  if (radioPlaybackHistoryCursor < radioPlaybackTrackHistory.length - 1) {
    radioPlaybackTrackHistory.splice(radioPlaybackHistoryCursor + 1);
  }

  if (radioPlaybackTrackHistory[radioPlaybackTrackHistory.length - 1] !== trackIndex) {
    radioPlaybackTrackHistory.push(trackIndex);
  }

  radioPlaybackHistoryCursor = radioPlaybackTrackHistory.length - 1;
  while (radioPlaybackTrackHistory.length > 24) {
    radioPlaybackTrackHistory.shift();
    radioPlaybackHistoryCursor = Math.max(0, radioPlaybackHistoryCursor - 1);
  }
}

function setRadioPlaybackHistoryCursorToTrack(trackIndex) {
  for (let index = radioPlaybackHistoryCursor - 1; index >= 0; index -= 1) {
    if (radioPlaybackTrackHistory[index] === trackIndex) {
      radioPlaybackHistoryCursor = index;
      return;
    }
  }

  const existingIndex = radioPlaybackTrackHistory.lastIndexOf(trackIndex);
  if (existingIndex >= 0) {
    radioPlaybackHistoryCursor = existingIndex;
    return;
  }

  radioPlaybackTrackHistory.push(trackIndex);
  radioPlaybackHistoryCursor = radioPlaybackTrackHistory.length - 1;
}

function getPreviousRadioTrackIndexFromHistory() {
  for (let index = radioPlaybackHistoryCursor - 1; index >= 0; index -= 1) {
    const trackIndex = radioPlaybackTrackHistory[index];
    if (Number.isInteger(trackIndex) && trackIndex !== radioCurrentTrackIndex) {
      return trackIndex;
    }
  }

  return null;
}

function rememberRadioTrackIndex(trackIndex, { updatePlaybackHistory = true } = {}) {
  const playlistTrackCount = getKnownRadioPlaylistTrackCount();
  const normalizedIndex = Number.parseInt(String(trackIndex), 10);
  if (!Number.isInteger(normalizedIndex) || normalizedIndex < 0) {
    return;
  }

  if (radioPreviousActionTrackIndex >= 0 && normalizedIndex !== radioPreviousActionTrackIndex) {
    resetRadioPreviousDoubleAction();
  }
  radioCurrentTrackIndex = normalizedIndex;
  if (radioRecentTrackHistory[radioRecentTrackHistory.length - 1] !== normalizedIndex) {
    radioRecentTrackHistory.push(normalizedIndex);
  }

  const historyLimit = playlistTrackCount > 1
    ? Math.min(playlistTrackCount - 1, radioShuffleHistoryMax)
    : 1;
  while (radioRecentTrackHistory.length > Math.max(radioShuffleHistoryMin, historyLimit)) {
    radioRecentTrackHistory.shift();
  }

  if (updatePlaybackHistory) {
    rememberRadioPlaybackTrackIndex(normalizedIndex);
  }
}

function chooseSmartRadioTrackIndex() {
  const playlistTrackCount = getKnownRadioPlaylistTrackCount();
  if (playlistTrackCount <= 1) {
    return null;
  }

  const currentIndex =
    radioCurrentTrackIndex >= 0 && radioCurrentTrackIndex < playlistTrackCount
      ? radioCurrentTrackIndex
      : null;
  const recentWindowSize = Math.min(
    playlistTrackCount - 1,
    Math.max(radioShuffleHistoryMin, Math.ceil(playlistTrackCount * 0.36))
  );
  const recentSet = new Set(radioRecentTrackHistory.slice(-recentWindowSize));
  const allCandidates = Array.from({ length: playlistTrackCount }, (_, index) => index).filter(
    (index) => index !== currentIndex
  );
  let candidates = allCandidates.filter((index) => !recentSet.has(index));

  if (!candidates.length) {
    const lastPlayedIndex = radioRecentTrackHistory[radioRecentTrackHistory.length - 1];
    candidates = allCandidates.filter((index) => index !== lastPlayedIndex);
  }

  if (!candidates.length) {
    candidates = allCandidates;
  }

  const weightedCandidates = candidates.flatMap((index) => {
    const lastSeenFromEnd = radioRecentTrackHistory
      .slice()
      .reverse()
      .findIndex((historyIndex) => historyIndex === index);
    const weight = lastSeenFromEnd === -1 ? 4 : Math.max(1, lastSeenFromEnd + 1);
    return Array.from({ length: weight }, () => index);
  });

  return weightedCandidates[Math.floor(Math.random() * weightedCandidates.length)] ?? candidates[0];
}

function scheduleRadioYoutubeInfoProbe(delay = 0) {
  if (radioYoutubeDisabled || radioYoutubePlayerReady || !radioYoutubeReadyResolve) {
    return;
  }

  if (radioYoutubeProbeTimer) {
    window.clearTimeout(radioYoutubeProbeTimer);
  }

  radioYoutubeProbeTimer = window.setTimeout(() => {
    radioYoutubeProbeTimer = 0;
    if (radioYoutubeDisabled || radioYoutubePlayerReady || !radioYoutubeReadyResolve) {
      return;
    }

    radioYoutubeProbeAttempts += 1;
    requestRadioYoutubeInfoDelivery();
    if (radioYoutubeProbeAttempts < radioYoutubeMaxProbeAttempts) {
      scheduleRadioYoutubeInfoProbe(radioYoutubeProbeDelayMs);
    }
  }, Math.max(0, Number(delay) || 0));
}

function resolveRadioYoutubeReadyFromEmbed() {
  if (radioYoutubeDisabled || !radioYoutubePlayer || !radioYoutubeReadyResolve) {
    return;
  }

  const resolveReady = radioYoutubeReadyResolve;
  clearRadioYoutubeReadinessCallbacks();
  if (radioYoutubeIframe) {
    radioYoutubeIframe.dataset.radioReady = "true";
  }
  handleRadioYoutubeReady({ target: radioYoutubePlayer });
  resolveReady(radioYoutubePlayer);
}

function rejectRadioYoutubeReadyFromEmbed(reason = "YouTube radio unavailable") {
  const rejectReady = radioYoutubeReadyReject;
  clearRadioYoutubeReadinessCallbacks();
  markRadioFallback();
  if (rejectReady) {
    rejectReady(new Error(reason));
  }
}

function handleRadioYoutubeMessage(event) {
  if (radioYoutubeDisabled || !radioYoutubeIframe?.contentWindow || event.source !== radioYoutubeIframe.contentWindow) {
    return;
  }

  if (event.origin !== radioYoutubePlayerHost && event.origin !== "https://www.youtube.com") {
    return;
  }

  let payload = event.data;
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch {
      return;
    }
  }

  if (payload?.event === "onReady") {
    resolveRadioYoutubeReadyFromEmbed();
    requestRadioYoutubeInfoDelivery();
  }

  const info = payload?.info;
  if (!info || typeof info !== "object") {
    return;
  }

  resolveRadioYoutubeReadyFromEmbed();

  if (Array.isArray(info.playlist) && info.playlist.length) {
    radioPlaylistTrackCount = info.playlist.length;
    radioState.canSkip = radioPlaylistTrackCount > 1;
  }

  const currentTime = Number(info.currentTime);
  if (Number.isFinite(currentTime) && currentTime >= 0) {
    setRadioCurrentTime(currentTime);
  }

  updateRadioArtworkFromInfo(info);

  const playlistIndex = Number.parseInt(String(info.playlistIndex), 10);
  if (Number.isInteger(playlistIndex) && playlistIndex >= 0) {
    const isPendingHistoryNavigation = playlistIndex === radioPendingPlaybackHistoryIndex;
    rememberRadioTrackIndex(playlistIndex, {
      updatePlaybackHistory: !isPendingHistoryNavigation
    });
    if (isPendingHistoryNavigation) {
      radioPendingPlaybackHistoryIndex = null;
    }
  }

  const playerState = Number(info.playerState);
  if (playerState === 1) {
    clearRadioPlaybackConfirmation();
    radioState.pendingPlay = false;
    radioState.isPlaying = true;
    setRadioCurrentTime(getEstimatedRadioCurrentTime());
    setRadioState("playing");
    startRadioYoutubeInfoPolling();
  } else if ((playerState === 0 || playerState === 2) && !radioState.pendingPlay) {
    setRadioCurrentTime(getEstimatedRadioCurrentTime());
    radioState.isPlaying = false;
    setRadioState(radioState.isReady ? "paused" : "ready");
    clearRadioYoutubeInfoPolling();
  }

  syncRadioControls();
  updateRadioMediaSessionPlaybackState();
}

function handleRadioYoutubeReady(event = {}) {
  if (radioYoutubeDisabled) {
    return;
  }

  radioYoutubePlayerReady = true;
  radioState.isReady = true;
  radioState.loadFailed = false;
  radioState.canSkip =
    typeof event.target?.nextVideo === "function" ||
    typeof radioYoutubePlayer?.nextVideo === "function";
  applyRadioVolume();
  requestRadioYoutubeInfoDelivery();
  setRadioState("ready");
  syncRadioControls();
  updateRadioMediaSessionPlaybackState();
}

function ensureRadioYoutubePlayer() {
  if (radioYoutubeDisabled || radioState.loadFailed) {
    markRadioFallback();
    return Promise.reject(new Error("YouTube radio unavailable"));
  }

  if (radioYoutubePlayerReady && radioYoutubePlayer) {
    return Promise.resolve(radioYoutubePlayer);
  }

  if (radioYoutubePlayerReadyPromise) {
    return radioYoutubePlayerReadyPromise;
  }

  setRadioState("loading");
  radioYoutubePlayerReadyPromise = new Promise((resolve, reject) => {
      const iframe = ensureRadioYoutubeIframe();
      if (!iframe) {
        rejectRadioYoutubeReadyFromEmbed("YouTube radio unavailable");
        reject(new Error("YouTube radio unavailable"));
        return;
      }

      radioYoutubePlayer = createRadioYoutubePlayerProxy();
      radioYoutubeReadyResolve = resolve;
      radioYoutubeReadyReject = reject;
      radioYoutubeProbeAttempts = 0;

      if (iframe.dataset.radioReady === "true") {
        resolveRadioYoutubeReadyFromEmbed();
        return;
      }

      iframe.addEventListener(
        "load",
        () => {
          window.setTimeout(() => {
            if (isRadioYoutubeIframePlaceholder(iframe)) {
              rejectRadioYoutubeReadyFromEmbed("YouTube radio blocked");
              return;
            }

            scheduleRadioYoutubeInfoProbe(0);
          }, 0);
        },
        { once: true }
      );
      iframe.addEventListener(
        "error",
        () => rejectRadioYoutubeReadyFromEmbed("YouTube radio blocked"),
        { once: true }
      );

      scheduleRadioYoutubeInfoProbe(250);
      radioYoutubeReadyTimeout = window.setTimeout(
        () => rejectRadioYoutubeReadyFromEmbed("YouTube radio blocked or unavailable"),
        radioYoutubeReadyTimeoutMs
      );
    })
    .catch((error) => {
      if (!radioState.loadFailed) {
        markRadioFallback();
      }
      throw error;
    });

  return radioYoutubePlayerReadyPromise;
}

function playRadio() {
  if (radioState.loadFailed || radioYoutubeDisabled) {
    markRadioFallback();
    return;
  }

  radioState.pendingPlay = true;
  setRadioState("loading");
  syncRadioControls();
  ensureRadioYoutubePlayer()
    .then((player) => {
      applyRadioVolume();
      if (typeof player.playVideo === "function") {
        player.playVideo();
      }
      if (player.usesPostMessage) {
        scheduleRadioPlaybackConfirmation();
        startRadioYoutubeInfoPolling({ immediate: true });
        return;
      }
      window.setTimeout(() => {
        if (!radioState.pendingPlay) {
          return;
        }
        radioState.pendingPlay = false;
        radioState.isPlaying = false;
        setRadioState(radioState.isReady ? "paused" : "ready");
        syncRadioControls();
        updateRadioMediaSessionPlaybackState();
      }, 2600);
    })
    .catch(() => {
      clearRadioPlaybackConfirmation();
      radioState.pendingPlay = false;
      radioState.isPlaying = false;
      syncRadioControls();
      updateRadioMediaSessionPlaybackState();
    });
}

function pauseRadio() {
  radioState.pendingPlay = false;
  clearRadioPlaybackConfirmation();
  clearRadioYoutubeInfoPolling();
  try {
    radioYoutubePlayer?.pauseVideo?.();
  } catch {
    // Ignore player pause failures.
  }
  setRadioCurrentTime(getEstimatedRadioCurrentTime());
  radioState.isPlaying = false;
  setRadioState(radioState.loadFailed ? "fallback" : "paused");
  syncRadioControls();
  updateRadioMediaSessionPlaybackState();
}

function seekRadioTo(seconds) {
  if (!radioYoutubePlayer || typeof radioYoutubePlayer.seekTo !== "function") {
    return false;
  }

  const nextTime = Math.max(0, Number(seconds) || 0);
  try {
    radioYoutubePlayer.seekTo(nextTime, true);
    setRadioCurrentTime(nextTime);
    return true;
  } catch {
    markRadioFallback();
    return false;
  }
}

function resetRadioPreviousDoubleAction() {
  radioPreviousActionUntilMs = 0;
  radioPreviousActionTrackIndex = -1;
}

function restartRadioCurrentTrackForPreviousAction() {
  const restarted = seekRadioTo(0);
  radioPreviousActionUntilMs = getRadioClockNow() + radioPreviousDoubleActionWindowMs;
  radioPreviousActionTrackIndex = radioCurrentTrackIndex;
  return restarted;
}

function playRadioTrackAt(trackIndex, { fromPlaybackHistory = false } = {}) {
  const normalizedIndex = Number.parseInt(String(trackIndex), 10);
  if (!Number.isInteger(normalizedIndex) || normalizedIndex < 0 || !radioYoutubePlayer) {
    return false;
  }

  if (fromPlaybackHistory) {
    setRadioPlaybackHistoryCursorToTrack(normalizedIndex);
    radioPendingPlaybackHistoryIndex = normalizedIndex;
  }

  try {
    if (typeof radioYoutubePlayer.playVideoAt === "function") {
      rememberRadioTrackIndex(normalizedIndex, {
        updatePlaybackHistory: !fromPlaybackHistory
      });
      setRadioCurrentTime(0);
      radioYoutubePlayer.playVideoAt(normalizedIndex);
    } else {
      return false;
    }
    radioState.isPlaying = true;
    setRadioState("playing");
    startRadioYoutubeInfoPolling({ immediate: true });
    return true;
  } catch {
    markRadioFallback();
    return false;
  }
}

function playPreviousRadioTrackFromHistory() {
  const playlistTrackCount = getKnownRadioPlaylistTrackCount();
  const previousHistoryIndex = getPreviousRadioTrackIndexFromHistory();
  let previousTrackIndex = previousHistoryIndex;

  if (previousTrackIndex === null && playlistTrackCount > 1 && radioCurrentTrackIndex >= 0) {
    previousTrackIndex = (radioCurrentTrackIndex - 1 + playlistTrackCount) % playlistTrackCount;
  }

  if (previousTrackIndex !== null) {
    return playRadioTrackAt(previousTrackIndex, { fromPlaybackHistory: true });
  }

  try {
    if (typeof radioYoutubePlayer.previousVideo === "function") {
      setRadioCurrentTime(0);
      radioYoutubePlayer.previousVideo();
      radioState.isPlaying = true;
      setRadioState("playing");
      startRadioYoutubeInfoPolling({ immediate: true });
      return true;
    }
  } catch {
    markRadioFallback();
    return false;
  }
  return false;
}

function previousRadioTrack() {
  if (!radioYoutubePlayer) {
    return;
  }

  const now = getRadioClockNow();
  const shouldTryPreviousTrack =
    now <= radioPreviousActionUntilMs &&
    (radioPreviousActionTrackIndex < 0 || radioPreviousActionTrackIndex === radioCurrentTrackIndex);

  if (shouldTryPreviousTrack) {
    resetRadioPreviousDoubleAction();
    if (!radioState.canSkip || !playPreviousRadioTrackFromHistory()) {
      restartRadioCurrentTrackForPreviousAction();
    }
  } else {
    restartRadioCurrentTrackForPreviousAction();
  }

  syncRadioControls();
  updateRadioMediaSessionPlaybackState();
}

function nextRadioTrack() {
  if (!radioState.canSkip || !radioYoutubePlayer) {
    return;
  }

  try {
    resetRadioPreviousDoubleAction();
    const nextTrackIndex = chooseSmartRadioTrackIndex();
    if (nextTrackIndex !== null && playRadioTrackAt(nextTrackIndex)) {
      radioPendingPlaybackHistoryIndex = null;
    } else if (typeof radioYoutubePlayer.nextVideo === "function") {
      setRadioCurrentTime(0);
      radioPendingPlaybackHistoryIndex = null;
      radioYoutubePlayer.nextVideo();
    } else {
      return;
    }
    radioState.isPlaying = true;
    setRadioState("playing");
    startRadioYoutubeInfoPolling({ immediate: true });
  } catch {
    markRadioFallback();
    return;
  }
  syncRadioControls();
  updateRadioMediaSessionPlaybackState();
}

function toggleRadioPlayback() {
  if (radioState.isPlaying) {
    pauseRadio();
    return;
  }

  playRadio();
}

function setRadioHidden(nextHidden, { persist = true } = {}) {
  radioState.isHidden = Boolean(nextHidden);
  if (persist) {
    storeRadioHidden(radioState.isHidden);
  }
  syncRadioVisibilityUi();
}

function handleRadioVolumeInput() {
  radioVolume = normalizeRadioVolume(radioVolumeInput?.value);
  storeRadioVolume(radioVolume);
  applyRadioVolume();
}

function syncRadioStationUi() {
  setRadioStatus(
    radioState.loadFailed
      ? "fallback"
      : radioState.pendingPlay
        ? "loading"
        : radioState.isPlaying
          ? "playing"
          : radioState.isReady
            ? "ready"
            : "idle"
  );
  syncRadioControls();
}

function warmRadioYoutubePlayer() {
  if (
    offlineSnapshotMode ||
    radioYoutubeDisabled ||
    radioState.loadFailed ||
    radioYoutubePlayerReady ||
    radioYoutubePlayerReadyPromise
  ) {
    return;
  }

  void ensureRadioYoutubePlayer().catch(() => null);
}

function initializeRadioStation() {
  if (!radioPlayerNode) {
    return;
  }
  if (radioStationInitialized) {
    return;
  }
  radioStationInitialized = true;

  radioVolume = getStoredRadioVolume();
  radioState.isHidden = getStoredRadioHidden();
  syncRadioVolumeUi();
  syncRadioVisibilityUi();
  configureRadioMediaSession();
  window.addEventListener("message", handleRadioYoutubeMessage);
  radioArtworkNode?.addEventListener("error", handleRadioArtworkError);
  radioToggleButton?.addEventListener("click", toggleRadioPlayback);
  radioPreviousButton?.addEventListener("click", previousRadioTrack);
  radioNextButton?.addEventListener("click", nextRadioTrack);
  radioVolumeInput?.addEventListener("input", handleRadioVolumeInput);
  radioHideButton?.addEventListener("click", () => setRadioHidden(true));
  radioShowButton?.addEventListener("click", () => setRadioHidden(false));
  setRadioDefaultArtwork();
  setRadioState("idle");
  syncRadioControls();
  window.setTimeout(warmRadioYoutubePlayer, radioYoutubeWarmupDelayMs);
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
let sectionInitObserver = null;
let headerLockReleaseTimer = 0;
const revealRestartFrames = new WeakMap();
let completedDays = new Set();
let completedHistoryDays = new Set();
let unlockedDays = new Set();
let warningDays = new Set();
let accessibleDay = 1;
let currentProgressDay = 1;
let activeChecklistHoverItem = null;
let checklistPointerGlowFrame = 0;
let pendingChecklistPointerGlow = null;
let checklistPrintDraft = null;
let checklistPrintStartDate = "";
let checklistPrintLastFocusedElement = null;
let sequenceNoticeTimer = 0;
let siteBackdropInitialized = false;
let siteBackdropCurrentIndex = 0;
let siteBackdropActiveSlideIndex = 0;
let siteBackdropTimer = 0;
let siteBackdropPreloadImage = null;
let siteBackdropTransitionToken = 0;
let lastTimelineFocusDay = null;
const pendingClassRestarts = new WeakMap();
let activeWindowScrollAnimation = null;
const activeElementScrollAnimations = new WeakMap();
const checklistGroupCompletionState = new WeakMap();
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

async function openEssentialsReference(referenceId = "") {
  await activatePanel("essentials");
  await initializeBookingTransit();

  const bookingTransitRoot = getBookingTransitRoot();
  if (!bookingTransitRoot) {
    scrollToPanelStart("essentials");
    return;
  }

  setBookingTransitFilter("all");

  if (!referenceId) {
    scrollToPanelStart("essentials");
    return;
  }

  const item =
    bookingTransitItemMap.get(referenceId) || getBookingTransitItemByDetailId(referenceId);
  if (!item) {
    scrollToPanelStart("essentials");
    return;
  }

  updateStoredBookingTransitItemState(item.id, { expanded: true });
  updateBookingTransitUI();

  const groupElement = bookingTransitRoot.querySelector(
    `[data-booking-group-section="${item.group}"]`
  );
  if (groupElement) {
    groupElement.hidden = false;
    groupElement.open = true;
  }

  const itemElement = bookingTransitRoot.querySelector(`[data-booking-id="${item.id}"]`);
  if (!itemElement) {
    scrollToPanelStart("essentials");
    return;
  }

  itemElement.hidden = false;
  itemElement.open = true;
  syncBookingTransitItemUI(itemElement);

  itemElement.classList.remove("is-linked-target");
  restartClassOnNextFrame(itemElement, "is-linked-target");
  window.setTimeout(() => {
    itemElement.classList.remove("is-linked-target");
  }, 1400);

  await new Promise((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(resolve);
    });
  });

  const targetTop =
    itemElement.getBoundingClientRect().top + window.scrollY - getHeaderScrollOffset(18);
  await smoothlyScrollWindowTo(Math.max(targetTop, 0), { behavior: getScrollBehavior() });
}

function openChecklistDetail(detailId, triggerElement) {
  if (!transitDetailModal || !detailId) {
    return;
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

function syncChecklistInputVisualState(input) {
  const checkItem = input?.closest(".check-item");
  if (!input || !checkItem) {
    return;
  }

  checkItem.classList.toggle("is-checked", Boolean(checklistState[input.id]));
}

function syncChecklistInputLockState(input, { dayLocked = false } = {}) {
  const checkItem = input?.closest(".check-item");
  if (!input || !checkItem) {
    return false;
  }

  const isLocked = Boolean(dayLocked);

  input.disabled = isLocked;
  checkItem.classList.toggle("is-locked", isLocked);
  checkItem.classList.toggle("is-day-locked", Boolean(dayLocked));
  syncChecklistInputVisualState(input);

  return false;
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
  const controller =
    typeof window.AbortController === "function" ? new window.AbortController() : null;
  const timeout = controller
    ? window.setTimeout(() => controller.abort(), fujiForecastRequestTimeoutMs)
    : 0;
  const fetchOptions = controller ? { signal: controller.signal } : undefined;

  return window
    .fetch(buildFujiForecastUrl(spotConfig), fetchOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Fuji forecast request failed: ${response.status}`);
      }

      return response.json();
    })
    .then((payload) => normalizeFujiSpotForecast(spotConfig, payload))
    .finally(() => {
      if (timeout) {
        window.clearTimeout(timeout);
      }
    });
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
        en: "Checking Chureito, Kawaguchiko, and lake-side visibility for the next two mornings.",
        ja: "忠霊塔、河口湖、湖畔側の見え方を、これから2朝分確認しています。"
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
        en: "Forecast unavailable. Check the sky early and keep the ropeway optional.",
        ja: "予報を取得できません。朝に空を確認し、ロープウェイは任意にします。"
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
        en: "Forecast unavailable. Start with a quick Fuji check, then use the lake and Oishi Park as the reliable core.",
        ja: "予報を取得できません。まず富士山を軽く確認し、河口湖と大石公園を確実な軸にします。"
      })}</p>
      <p class="fuji-forecast__reason">${renderLocalizedContent({
        en: "Fallback: keep Chureito early if visible, skip the ropeway first if fog, crowds, or time tighten.",
        ja: "代替案: 見えるなら忠霊塔を朝に回し、霧・混雑・時間が厳しければロープウェイから削ります。"
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

function getCurrentTheme() {
  return "dark";
}

function updateThemeColorMeta(theme) {
  if (!themeColorMeta) {
    return;
  }

  themeColorMeta.content = "#18261d";
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

  syncDecorativeVideoPlayback();
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

function getChecklistDayCard(day) {
  const dayNumber = Number.parseInt(String(day), 10);
  if (Number.isNaN(dayNumber)) {
    return null;
  }

  const dayKey = String(dayNumber);
  return document.getElementById(`checklist-day-${dayKey}`) || dayCardMap.get(dayKey) || null;
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
    if (!sortedDays.length) {
      queueStorageRemoval(key);
      return;
    }

    queueStorageValue(key, JSON.stringify(sortedDays));
  } catch (error) {
    // Ignore storage failures and keep the page usable.
  }
}

function queueStoragePrefixRemovals(prefixes = []) {
  try {
    for (let index = window.localStorage.length - 1; index >= 0; index -= 1) {
      const key = window.localStorage.key(index);
      if (key && prefixes.some((prefix) => key.startsWith(prefix))) {
        queueStorageRemoval(key);
      }
    }
  } catch (error) {
    // Ignore storage failures and keep the page usable.
  }
}

function clearStoredTripProgressState() {
  queueStoragePrefixRemovals([
    "japan-trip-checklist-state-",
    "japan-trip-completed-history-",
    "japan-trip-bookings-transit-state-"
  ]);
  [checklistStorageKey, completedHistoryStorageKey, bookingTransitStorageKey].forEach((key) => {
    queueStorageRemoval(key);
  });

  try {
    window.sessionStorage.removeItem(fujiForecastSessionKey);
  } catch (error) {
    // Ignore storage failures and keep the page usable.
  }

  flushQueuedStorageWrites();
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

  const nextUnlockedDays = new Set(orderedDays.map((day) => String(day)));
  const highestUnlockedDay = orderedDays.at(-1) || 1;
  const nextCurrentDay =
    orderedDays.find((day) => !rawCompleted.has(String(day))) || highestUnlockedDay;

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
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }

    const migratedInputIds = {
      "day3-kaiyukan": "day1-kaiyukan",
      "day2-kaiyukan": "day1-kaiyukan"
    };
    const normalized = {};

    Object.entries(parsed).forEach(([inputId, value]) => {
      const nextInputId = migratedInputIds[inputId] || inputId;
      if (document.getElementById(nextInputId)) {
        normalized[nextInputId] = Boolean(value);
      }
    });

    return normalized;
  } catch (error) {
    return {};
  }
}

function storeChecklistState() {
  try {
    if (!Object.keys(checklistState).length) {
      queueStorageRemoval(checklistStorageKey);
      return;
    }

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
    const isDefaultState =
      bookingTransitState.filter === "all" &&
      !Object.keys(bookingTransitState.items || {}).length;

    if (isDefaultState) {
      queueStorageRemoval(bookingTransitStorageKey);
      return;
    }

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

function getChecklistDayTitle(day) {
  const dayCard = dayCardMap.get(String(Number.parseInt(String(day), 10)));
  if (!dayCard) {
    return null;
  }

  const titleNode = dayCard.querySelector(".day-region");
  if (!titleNode) {
    return null;
  }

  const getLocalizedTitle = (language) =>
    titleNode.querySelector(`[data-language="${language}"]`)?.textContent?.trim() || "";

  const englishTitle = getLocalizedTitle("en");
  const japaneseTitle = getLocalizedTitle("ja");

  if (!englishTitle && !japaneseTitle) {
    return null;
  }

  return {
    en: englishTitle || japaneseTitle,
    ja: japaneseTitle || englishTitle
  };
}

function getChecklistPrintNodeText(node, language = root.lang) {
  if (!node) {
    return "";
  }

  const localizedNode = node.querySelector(`[data-language="${language}"]`);
  const fallbackNode = node.querySelector("[data-language]");
  return (localizedNode || fallbackNode || node).textContent.trim();
}

function getChecklistPrintLanguage() {
  return root.lang === "ja" ? "ja" : "en";
}

function getChecklistPrintStorageKey(language = getChecklistPrintLanguage()) {
  return `${checklistPrintStorageKey}-${language}`;
}

function getChecklistPrintLabels() {
  if (getChecklistPrintLanguage() === "ja") {
    return {
      startDate: "旅行開始日",
      date: "日付",
      dayTitle: "日タイトル",
      item: "チェック項目",
      duration: "目安時間",
      customDate: "日付を選択",
      est: "目安"
    };
  }

  return {
    startDate: "Trip start date",
    date: "Date",
    dayTitle: "Day title",
    item: "Checklist item",
    duration: "Est. duration",
    customDate: "Select start date",
    est: "Est."
  };
}

function getChecklistPrintDurationDefinition(itemId = "") {
  return checklistPrintDurationDefinitions[itemId] || checklistPrintFallbackDurationDefinition;
}

function getDefaultChecklistPrintDuration(itemId = "") {
  const definition = getChecklistPrintDurationDefinition(itemId);
  const language = getChecklistPrintLanguage();
  return definition.label?.[language] || definition.label?.en || checklistPrintFallbackDurationDefinition.label.en;
}

function getDefaultChecklistPrintDurationMinutes(itemId = "") {
  const definition = getChecklistPrintDurationDefinition(itemId);
  const [rawMin, rawMax] = Array.isArray(definition.minutes)
    ? definition.minutes
    : checklistPrintFallbackDurationDefinition.minutes;
  const min = Math.max(0, Number(rawMin) || 0);
  const max = Math.max(min, Number(rawMax) || min);

  return { min, max };
}

function parseChecklistPrintClockMinutes(value = "") {
  const match = /^(\d{2}):(\d{2})$/.exec(String(value).trim());
  if (!match) {
    return null;
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (!Number.isInteger(hours) || !Number.isInteger(minutes) || hours > 23 || minutes > 59) {
    return null;
  }

  return hours * 60 + minutes;
}

function formatChecklistPrintClockMinutes(totalMinutes = 0) {
  const normalizedTotal = ((Math.round(totalMinutes) % 1440) + 1440) % 1440;
  const hours = Math.floor(normalizedTotal / 60);
  const minutes = normalizedTotal % 60;
  const hour12 = hours % 12 || 12;
  const suffix = hours < 12 ? "AM" : "PM";
  return `${hour12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

function getChecklistPrintDurationTypicalMinutes(durationMinutes, timingDefinition = {}) {
  const min = Number(durationMinutes?.min) || 0;
  const max = Math.max(min, Number(durationMinutes?.max) || min);
  const anchor = timingDefinition.anchor || "standard";
  const weight = anchor === "quick" ? 0.45 : anchor === "major" ? 0.62 : 0.55;
  return roundChecklistPrintMinutes(min + (max - min) * weight, 5, "nearest");
}

function getMonthDayKey(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return "";
  }

  return `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function isMonthDayInRange(monthDay, start, end) {
  if (!monthDay || !start || !end) {
    return false;
  }

  return start <= end
    ? monthDay >= start && monthDay <= end
    : monthDay >= start || monthDay <= end;
}

function getChecklistPrintMatrixContext(day = {}) {
  const date = parseDateInputValue(day.dateInput || "");
  const dayOfWeek = date ? date.getDay() : null;
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const monthDay = getMonthDayKey(date);
  const month = date ? date.getMonth() + 1 : null;
  const seasonMatches = checklistPrintTimingMatrix.seasonWindows.filter((windowConfig) =>
    isMonthDayInRange(monthDay, windowConfig.start, windowConfig.end)
  );
  const seasonCrowdMultiplier = seasonMatches.reduce(
    (value, windowConfig) => Math.max(value, Number(windowConfig.crowdMultiplier) || 1),
    1
  );
  const publicHoliday = Boolean(
    day.dateInput && checklistPrintTimingMatrix.publicHolidays[day.dateInput]
  );
  const weekendOrHolidayMultiplier = isWeekend || publicHoliday ? 1.1 : 1;
  const daylightFallback =
    checklistPrintTimingMatrix.daylightFallbackByMonth[month] ||
    checklistPrintTimingMatrix.daylightFallbackByMonth[3];

  return {
    exactDate: day.dateInput || "",
    dayOfWeek,
    isWeekend,
    publicHoliday,
    seasonMatches,
    daylightFallback,
    crowdMultiplier: seasonCrowdMultiplier * weekendOrHolidayMultiplier,
    transitMultiplier: weekendOrHolidayMultiplier,
    walkingMultiplier: seasonCrowdMultiplier > 1.1 ? 1.08 : 1,
    unknownMultiplier: checklistPrintTimingMatrix.defaults.unknownMultiplier
  };
}

function getChecklistPrintConnectionKey(previousItem, nextItem) {
  return `${previousItem?.id || ""}->${nextItem?.id || ""}`;
}

function getChecklistPrintOverrideBuffer(previousItem, nextItem, day) {
  const override = checklistPrintConnectionOverrides[getChecklistPrintConnectionKey(previousItem, nextItem)];
  if (!override) {
    return null;
  }

  const context = getChecklistPrintMatrixContext(day);
  const [baseMin, baseMax] = normalizeChecklistPrintTimingRange(override.minutes, [0, 0]);
  const isCloseWalk = /close|walk/i.test(override.mode || "");
  const multiplier = isCloseWalk ? context.walkingMultiplier : context.transitMultiplier;
  const cap = isCloseWalk
    ? checklistPrintTimingMatrix.defaults.photoWalkCap
    : checklistPrintTimingMatrix.defaults.majorTransitCap + 15;
  const min = Math.min(roundChecklistPrintMinutes(baseMin * multiplier, 5, "nearest"), cap);
  const max = Math.max(
    min,
    Math.min(roundChecklistPrintMinutes(baseMax * multiplier, 5, "nearest"), cap)
  );
  const typical = Math.min(
    cap,
    roundChecklistPrintMinutes((Number(override.typical) || min + (max - min) * 0.55) * multiplier, 5, "nearest")
  );

  return { min, max, typical };
}

function getChecklistPrintDayStartMinutes(day = {}) {
  const dayDefault = checklistPrintDayStartDefaults[String(day.id || "")];
  const defaultStartMinutes = parseChecklistPrintClockMinutes(dayDefault?.start);
  return Number.isFinite(defaultStartMinutes) ? defaultStartMinutes : 9 * 60;
}

function getChecklistPrintEarliestStart(item, day, cursor) {
  const timingDefinition = getChecklistPrintTimingDefinition(item.id);
  const earliestStart = parseChecklistPrintClockMinutes(timingDefinition.earliestStart);

  if (Number.isFinite(earliestStart) && cursor < earliestStart) {
    return earliestStart;
  }

  return cursor;
}

function getChecklistPrintPreferredStart(item, day, cursor) {
  const timingDefinition = getChecklistPrintTimingDefinition(item.id);
  const earliestStart = getChecklistPrintEarliestStart(item, day, cursor);
  const targetStart = parseChecklistPrintClockMinutes(timingDefinition.targetStart);

  if (Number.isFinite(targetStart) && earliestStart < targetStart) {
    return targetStart;
  }

  return earliestStart;
}

function getChecklistPrintDay7Guidance(day = {}) {
  const dateInput = String(day.dateInput || "").trim();
  const date = parseDateInputValue(dateInput);
  const language = getChecklistPrintLanguage();
  const baseGuidance = checklistPrintLateCutGuidance["7"];

  if (!date) {
    return getLocalizedText(baseGuidance);
  }

  const dateLabel = formatChecklistPrintFullDateLabel(dateInput);
  const weekdayLabel = formatChecklistPrintWeekdayLabel(dateInput);
  if (language === "ja") {
    return `${dateLabel}は${weekdayLabel}です。皇居外苑・二重橋は短い写真ストップにして、空港移動の余裕を守ります。`;
  }

  return `${dateLabel} is a ${weekdayLabel}; keep the Outer Palace / Nijubashi stop short and protect the airport buffer.`;
}

function getChecklistPrintLateCutGuidance(day = "") {
  const dayId = String(typeof day === "object" && day ? day.id : day);
  if (dayId === "7") {
    return getChecklistPrintDay7Guidance(typeof day === "object" && day ? day : { id: dayId });
  }

  const guidance = checklistPrintLateCutGuidance[dayId];
  if (!guidance) {
    return "";
  }

  return getLocalizedText(guidance);
}

function normalizeChecklistPrintTimingRange(value, fallback = [0, 0]) {
  const source = Array.isArray(value) ? value : fallback;
  const rawMin = Number(source[0]);
  const rawMax = Number(source[1]);
  const min = Math.max(0, Number.isFinite(rawMin) ? rawMin : 0);
  const max = Math.max(min, Number.isFinite(rawMax) ? rawMax : min);
  return [min, max];
}

function getChecklistPrintDayTimingProfile(dayId = "") {
  return checklistPrintDayTimingProfiles[String(dayId)] || {
    intensity: "medium",
    multiplier: 1
  };
}

function getChecklistPrintTimingDefinition(itemId = "") {
  const itemTiming = checklistPrintTimingDefinitions[itemId] || {};
  const type = itemTiming.type || "shopping-street-food";
  const typeProfile =
    checklistPrintTimingTypeProfiles[type] || checklistPrintTimingTypeProfiles["shopping-street-food"];

  return {
    ...typeProfile,
    ...itemTiming,
    type,
    anchor: itemTiming.anchor || "standard",
    preferred: itemTiming.preferred || "flex"
  };
}

function getChecklistPrintAnchorBufferFactor(anchor = "standard") {
  if (anchor === "major") {
    return 1.16;
  }

  if (anchor === "quick") {
    return 0.78;
  }

  return 1;
}

function roundChecklistPrintMinutes(value, step = 5, mode = "nearest") {
  const minutes = Number(value) || 0;
  const interval = Math.max(1, Number(step) || 5);
  const scaled = minutes / interval;

  if (mode === "floor") {
    return Math.floor(scaled) * interval;
  }

  if (mode === "ceil") {
    return Math.ceil(scaled) * interval;
  }

  return Math.round(scaled) * interval;
}

function scaleChecklistPrintTimingRange(value, dayProfile, anchor = "standard", factor = 1) {
  const [min, max] = normalizeChecklistPrintTimingRange(value);
  const multiplier =
    (Number(dayProfile?.multiplier) || 1) *
    getChecklistPrintAnchorBufferFactor(anchor) *
    (Number(factor) || 1);

  return [
    roundChecklistPrintMinutes(min * multiplier, 5, "nearest"),
    roundChecklistPrintMinutes(max * multiplier, 5, "nearest")
  ];
}

function getChecklistPrintMealBreakRange(previousTiming, nextTiming, earliestEnd, latestEnd) {
  const isFoodStop =
    previousTiming?.type === "shopping-street-food" ||
    nextTiming?.type === "shopping-street-food";
  const mealIncludedInStop = Boolean(previousTiming?.mealRole || nextTiming?.mealRole);
  const lunchWindowStart = 11 * 60 + 20;
  const lunchWindowEnd = 13 * 60 + 30;
  const dinnerWindowStart = 17 * 60 + 20;
  const dinnerWindowEnd = 19 * 60 + 30;
  const crossesLunch = earliestEnd < lunchWindowEnd && latestEnd > lunchWindowStart;
  const crossesDinner = earliestEnd < dinnerWindowEnd && latestEnd > dinnerWindowStart;

  if ((!crossesLunch && !crossesDinner) || mealIncludedInStop) {
    return [0, 0];
  }

  if (isFoodStop) {
    return [0, 15];
  }

  return crossesLunch ? [20, 40] : [0, 25];
}

function getChecklistPrintBufferBetween(previousItem, nextItem, day, earliestEnd, latestEnd) {
  if (!previousItem || !nextItem) {
    return { min: 0, max: 0, typical: 0 };
  }

  const overrideBuffer = getChecklistPrintOverrideBuffer(previousItem, nextItem, day);
  if (overrideBuffer) {
    return overrideBuffer;
  }

  const dayProfile = getChecklistPrintDayTimingProfile(day.id);
  const matrixContext = getChecklistPrintMatrixContext(day);
  const previousTiming = getChecklistPrintTimingDefinition(previousItem.id);
  const nextTiming = getChecklistPrintTimingDefinition(nextItem.id);
  const nextAnchor = nextTiming.anchor || "standard";
  const transitFactor = nextTiming.type === "hotel-transit-admin" ? 0.3 : 0.38;
  const transit = scaleChecklistPrintTimingRange(
    nextTiming.transit,
    dayProfile,
    nextAnchor,
    transitFactor * matrixContext.transitMultiplier
  );
  const walk = scaleChecklistPrintTimingRange(
    nextTiming.walk,
    dayProfile,
    nextAnchor,
    0.4 * matrixContext.walkingMultiplier
  );
  const crowd = scaleChecklistPrintTimingRange(
    nextTiming.crowd,
    dayProfile,
    nextAnchor,
    0.22 * matrixContext.crowdMultiplier
  );
  const rest = scaleChecklistPrintTimingRange(previousTiming.rest, dayProfile, previousTiming.anchor, 0.28);
  const weather = scaleChecklistPrintTimingRange(nextTiming.weather, dayProfile, nextAnchor, 0.18);
  const unpredictable = scaleChecklistPrintTimingRange(
    nextTiming.unpredictable,
    dayProfile,
    nextAnchor,
    dayProfile.intensity === "packed" ? 0.32 : 0.26
  );
  const meal = scaleChecklistPrintTimingRange(
    getChecklistPrintMealBreakRange(previousTiming, nextTiming, earliestEnd, latestEnd),
    dayProfile,
    "standard",
    1
  );

  const minRaw =
    transit[0] +
    Math.round(walk[0] * 0.35) +
    Math.round(crowd[0] * 0.15) +
    Math.round(rest[0] * 0.25) +
    Math.round(weather[0] * 0.15) +
    Math.round(unpredictable[0] * 0.3) +
    meal[0];
  const maxRaw =
    transit[1] +
    Math.round(walk[1] * 0.45) +
    Math.round(crowd[1] * 0.22) +
    Math.round(rest[1] * 0.35) +
    Math.round(weather[1] * 0.22) +
    Math.round(unpredictable[1] * 0.42) +
    meal[1];
  const baseCap =
    dayProfile.intensity === "packed" ? 50 : dayProfile.intensity === "light" ? 35 : 42;
  const anchorCap = nextTiming.anchor === "major" ? 10 : nextTiming.anchor === "quick" ? -12 : 0;
  const transitCap = nextTiming.type === "hotel-transit-admin" ? 15 : 0;
  const mealCap = meal[1] > 0 ? 20 : 0;
  const cap = Math.max(baseCap + anchorCap + transitCap + mealCap, transit[1] + meal[1] + 10);
  const min = Math.min(Math.max(5, roundChecklistPrintMinutes(minRaw, 5, "nearest")), cap);
  const max = Math.max(min, Math.min(roundChecklistPrintMinutes(maxRaw, 5, "nearest"), cap));
  const typical = roundChecklistPrintMinutes(min + (max - min) * 0.58, 15, "nearest");

  return {
    min: roundChecklistPrintMinutes(min, 5, "nearest"),
    max: roundChecklistPrintMinutes(max, 5, "nearest"),
    typical
  };
}

function buildChecklistPrintTimeWindow(startMinutes, endMinutes) {
  return `${formatChecklistPrintClockMinutes(startMinutes)}–${formatChecklistPrintClockMinutes(endMinutes)}`;
}

function withChecklistPrintSchedules(days = []) {
  return days.map((day) => {
    let cursor = getChecklistPrintDayStartMinutes(day);
    const items = day.items.map((item, itemIndex) => {
      const durationMinutes = item.durationMinutes || getDefaultChecklistPrintDurationMinutes(item.id);
      const timingDefinition = getChecklistPrintTimingDefinition(item.id);
      const scheduledDuration = getChecklistPrintDurationTypicalMinutes(durationMinutes, timingDefinition);
      const nextItem = day.items[itemIndex + 1];
      const startMinutes = getChecklistPrintPreferredStart(item, day, cursor);
      const endMinutes = startMinutes + scheduledDuration;
      const schedule = {
        window: buildChecklistPrintTimeWindow(
          roundChecklistPrintMinutes(startMinutes, 5, "floor"),
          roundChecklistPrintMinutes(endMinutes, 5, "ceil")
        )
      };

      const buffer = getChecklistPrintBufferBetween(item, nextItem, day, endMinutes, endMinutes);
      cursor = endMinutes + buffer.typical;

      return {
        ...item,
        durationMinutes,
        schedule
      };
    });

    return {
      ...day,
      items
    };
  });
}

function parseDateInputValue(value = "") {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value).trim());
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function isDateInputValue(value = "") {
  return Boolean(parseDateInputValue(value));
}

function toDateInputValue(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0")
  ].join("-");
}

function offsetDateInputValue(startDate, dayOffset = 0) {
  const date = parseDateInputValue(startDate);
  if (!date) {
    return "";
  }

  date.setDate(date.getDate() + dayOffset);
  return toDateInputValue(date);
}

function formatChecklistPrintDateLabel(dateInputValue) {
  const date = parseDateInputValue(dateInputValue);
  if (!date) {
    return "";
  }

  const locale = getChecklistPrintLanguage() === "ja" ? "ja-JP" : "en-US";
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric"
  }).format(date);
}

function formatChecklistPrintFullDateLabel(dateInputValue) {
  const date = parseDateInputValue(dateInputValue);
  if (!date) {
    return "";
  }

  const locale = getChecklistPrintLanguage() === "ja" ? "ja-JP" : "en-US";
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}

function formatChecklistPrintWeekdayLabel(dateInputValue) {
  const date = parseDateInputValue(dateInputValue);
  if (!date) {
    return "";
  }

  const locale = getChecklistPrintLanguage() === "ja" ? "ja-JP" : "en-US";
  return new Intl.DateTimeFormat(locale, {
    weekday: "long"
  }).format(date);
}

function getDefaultChecklistPrintStartDate() {
  const firstTripDate = dayCards
    .map((card) => String(card.dataset.tripDate || "").trim())
    .find(isDateInputValue);

  return firstTripDate || checklistPrintDefaultStartDate;
}

function getChecklistPrintDefaults(startDate = getChecklistPrintStartDate()) {
  const language = getChecklistPrintLanguage();
  return dayCards
    .map((card, index) => {
      const dayId = String(card.dataset.day || "").trim();
      const dayLabel = getChecklistPrintNodeText(card.querySelector(".day-label"), language);
      const dayTitle = getChecklistPrintNodeText(card.querySelector(".day-region"), language);
      const dayNumber = Number.parseInt(dayId, 10);
      const dayOffset = Number.isFinite(dayNumber) ? dayNumber - 1 : index;
      const dateInput = offsetDateInputValue(startDate, dayOffset);
      const date = formatChecklistPrintDateLabel(dateInput);
      const items = Array.from(card.querySelectorAll(".check-item"))
        .map((item, index) => {
          const input = item.querySelector("input");
          const itemId = input?.id || `${dayId}-${index + 1}`;
          const text = getChecklistPrintNodeText(item, language);

          if (!text) {
            return null;
          }

          return {
            id: itemId,
            text,
            duration: getDefaultChecklistPrintDuration(itemId),
            durationMinutes: getDefaultChecklistPrintDurationMinutes(itemId)
          };
        })
        .filter(Boolean);

      if (!dayId || !dayLabel || !items.length) {
        return null;
      }

      return {
        id: dayId,
        label: dayLabel,
        dateInput,
        date,
        title: dayTitle,
        items
      };
    })
    .filter(Boolean);
}

function readStoredChecklistPrintDraft() {
  try {
    const parsed = JSON.parse(
      window.sessionStorage.getItem(getChecklistPrintStorageKey()) || "null"
    );
    if (!parsed || !isDateInputValue(parsed.startDate)) {
      return null;
    }

    return {
      startDate: parsed.startDate
    };
  } catch {
    return null;
  }
}

function storeChecklistPrintDraft() {
  if (!isDateInputValue(checklistPrintStartDate)) {
    return;
  }

  try {
    window.sessionStorage.setItem(
      getChecklistPrintStorageKey(),
      JSON.stringify({
        language: getChecklistPrintLanguage(),
        updatedAt: new Date().toISOString(),
        startDate: checklistPrintStartDate
      })
    );
  } catch {
    // Ignore session-only draft storage failures.
  }
}

function getChecklistPrintStartDate({ reset = false } = {}) {
  if (!reset && isDateInputValue(checklistPrintStartDate)) {
    return checklistPrintStartDate;
  }

  const storedStartDate = reset ? "" : readStoredChecklistPrintDraft()?.startDate;
  checklistPrintStartDate = isDateInputValue(storedStartDate)
    ? storedStartDate
    : getDefaultChecklistPrintStartDate();
  return checklistPrintStartDate;
}

function getChecklistPrintDraft({ reset = false } = {}) {
  const startDate = getChecklistPrintStartDate({ reset });
  checklistPrintDraft = getChecklistPrintDefaults(startDate);
  return checklistPrintDraft;
}

function getChecklistPrintDraftFromEditor() {
  const startDateInput = checklistPrintForm?.querySelector("[data-print-start-date]");
  const nextStartDate = startDateInput?.value.trim() || "";

  checklistPrintStartDate = isDateInputValue(nextStartDate)
    ? nextStartDate
    : getDefaultChecklistPrintStartDate();

  if (startDateInput && startDateInput.value !== checklistPrintStartDate) {
    startDateInput.value = checklistPrintStartDate;
  }

  return getChecklistPrintDefaults(checklistPrintStartDate);
}

function buildChecklistPrintMarkup(days = getChecklistPrintDraft()) {
  const labels = getChecklistPrintLabels();
  const scheduledDays = withChecklistPrintSchedules(days);
  const dayMarkup = scheduledDays
    .map((day) => {
      const headingDate = day.date || labels.customDate;
      const dayTitle = day.title ? `<small>${escapeHtml(day.title)}</small>` : "";
      const headingMeta = [day.label, headingDate].filter(Boolean).join(" — ");
      const itemMarkup = day.items
        .map((item) => {
          if (!item.text) {
            return "";
          }

          const timePrefix =
            item.schedule?.window
              ? `<span class="checklist-print-output__time">${escapeHtml(item.schedule.window)} — </span>`
              : "";
          const durationText = item.duration
            ? ` <span class="checklist-print-output__duration">— ${escapeHtml(labels.est)} ${escapeHtml(item.duration)}</span>`
            : "";
          return `<li>${timePrefix}<span>${escapeHtml(item.text)}</span>${durationText}</li>`;
        })
        .filter(Boolean)
        .join("");

      if (!itemMarkup) {
        return "";
      }

      const lateCutGuidance = getChecklistPrintLateCutGuidance(day);
      const lateCutMarkup = lateCutGuidance
        ? `<p class="checklist-print-output__late-cut">${escapeHtml(lateCutGuidance)}</p>`
        : "";

      return `
        <section class="checklist-print-output__day checklist-print-sheet__day">
          <h2><span>${escapeHtml(headingMeta)}</span>${dayTitle}</h2>
          <ul>${itemMarkup}</ul>
          ${lateCutMarkup}
        </section>
      `;
    })
    .filter(Boolean)
    .join("");

  return `<div class="checklist-print-output">${dayMarkup}</div>`;
}

function renderChecklistPrintSheet(days = getChecklistPrintDraft()) {
  if (!checklistPrintSheet) {
    return;
  }

  checklistPrintSheet.innerHTML = buildChecklistPrintMarkup(days);
}

function renderChecklistPrintPreview(days = getChecklistPrintDraft()) {
  if (checklistPrintPreview) {
    checklistPrintPreview.innerHTML = buildChecklistPrintMarkup(days);
  }
  renderChecklistPrintSheet(days);
}

function renderChecklistPrintEditor(days = getChecklistPrintDraft()) {
  if (!checklistPrintForm) {
    return;
  }

  const labels = getChecklistPrintLabels();
  const startDate = getChecklistPrintStartDate();
  const dayMarkup = days
    .map((day) => {
      const itemMarkup = day.items
        .map((item) => `
          <article class="checklist-print-editor__item" data-print-item data-item-id="${escapeHtml(item.id)}">
            <span class="checklist-print-editor__item-text">${escapeHtml(item.text)}</span>
            <span class="checklist-print-editor__duration">${escapeHtml(labels.est)} ${escapeHtml(item.duration)}</span>
          </article>
        `)
        .join("");

      return `
        <section class="checklist-print-editor__day" data-print-day data-day-id="${escapeHtml(day.id)}">
          <div class="checklist-print-editor__day-head">
            <p class="checklist-print-editor__day-label">${escapeHtml(day.label)}</p>
            <p class="checklist-print-editor__day-date" data-print-day-date>${escapeHtml(day.date || labels.customDate)}</p>
          </div>
          <p class="checklist-print-editor__day-title">${escapeHtml(day.title)}</p>
          <div class="checklist-print-editor__items">
            ${itemMarkup}
          </div>
        </section>
      `;
    })
    .join("");

  checklistPrintForm.innerHTML = `
    <div class="checklist-print-editor__settings">
      <label class="checklist-print-editor__field checklist-print-editor__field--start-date">
        <span>${escapeHtml(labels.startDate)}</span>
        <input type="date" value="${escapeHtml(startDate)}" data-print-start-date>
      </label>
    </div>
    ${dayMarkup}
  `;
}

function syncChecklistPrintDraftFromEditor() {
  checklistPrintDraft = getChecklistPrintDraftFromEditor();
  storeChecklistPrintDraft();
  updateChecklistPrintEditorDateDisplays(checklistPrintDraft);
  renderChecklistPrintPreview(checklistPrintDraft);
}

function updateChecklistPrintEditorDateDisplays(days = checklistPrintDraft || []) {
  if (!checklistPrintForm) {
    return;
  }

  const labels = getChecklistPrintLabels();
  const dayMap = new Map(days.map((day) => [day.id, day]));
  checklistPrintForm.querySelectorAll("[data-print-day]").forEach((dayNode) => {
    const day = dayMap.get(String(dayNode.dataset.dayId || ""));
    const dateNode = dayNode.querySelector("[data-print-day-date]");
    if (dateNode) {
      dateNode.textContent = day?.date || labels.customDate;
    }
  });
}

function resetChecklistPrintDraft() {
  try {
    window.sessionStorage.removeItem(getChecklistPrintStorageKey());
  } catch {
    // Ignore session-only draft storage failures.
  }

  checklistPrintStartDate = getDefaultChecklistPrintStartDate();
  checklistPrintDraft = getChecklistPrintDraft({ reset: true });
  renderChecklistPrintEditor(checklistPrintDraft);
  renderChecklistPrintPreview(checklistPrintDraft);
  checklistPrintForm?.querySelector("[data-print-start-date]")?.focus({ preventScroll: true });
}

function openChecklistPrintFlow() {
  if (!checklistPrintModal || !checklistPrintForm) {
    renderChecklistPrintSheet();
    window.print();
    return;
  }

  checklistPrintLastFocusedElement = document.activeElement instanceof HTMLElement
    ? document.activeElement
    : null;
  checklistPrintDraft = getChecklistPrintDraft();
  renderChecklistPrintEditor(checklistPrintDraft);
  renderChecklistPrintPreview(checklistPrintDraft);
  checklistPrintModal.hidden = false;
  root.classList.add("checklist-print-open");
  window.requestAnimationFrame(() => {
    checklistPrintForm.querySelector("[data-print-start-date]")?.focus({ preventScroll: true });
  });
}

function closeChecklistPrintFlow() {
  if (!checklistPrintModal) {
    return;
  }

  syncChecklistPrintDraftFromEditor();
  checklistPrintModal.hidden = true;
  root.classList.remove("checklist-print-open");
  checklistPrintLastFocusedElement?.focus?.({ preventScroll: true });
  checklistPrintLastFocusedElement = null;
}

function printChecklistBreakdown() {
  syncChecklistPrintDraftFromEditor();
  renderChecklistPrintSheet(checklistPrintDraft);
  window.print();
}

function renderTripNotes() {
  if (!tripNotesGridNode) {
    return;
  }

  if (revealObserver) {
    tripNotesGridNode.querySelectorAll(".reveal-block").forEach((block) => {
      revealObserver.unobserve(block);
    });
  }

  const notesMarkup = tripNoteDefinitions
    .map((definition) => {
      const checklistDayTitle = getChecklistDayTitle(definition.day) || definition.title;
      const noteBody = definition.note || definition.summary;

      return `
        <article class="note-card note-card--trip card" data-trip-note-day="${definition.day}">
          <div class="note-card__head">
            <div class="note-card__meta-row">
              <span class="note-card__pill">${root.lang === "ja" ? `${definition.day}日目` : `Day ${definition.day}`}</span>
            </div>
            <h3>${renderLocalizedContent(checklistDayTitle)}</h3>
          </div>
          <p>${renderLocalizedContent(noteBody)}</p>
        </article>
      `;
    })
    .join("");

  tripNotesGridNode.innerHTML = notesMarkup;
  syncLocalizedNodes(tripNotesGridNode);
  registerRevealBlocks(tripNotesGridNode);
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

const bookingTransitPrimaryCtaLabel = {
  en: "Book now",
  ja: "Book now"
};
const bookingTransitPriceLabel = {
  en: "Current linked price",
  ja: "現在のリンク料金"
};
const bookingTransitHotelVendorLabel = {
  en: "Booking.com",
  ja: "Booking.com"
};

function renderBookingTransitPrimaryLink(
  link,
  { label = bookingTransitPrimaryCtaLabel, vendorLabel = null, note = null } = {}
) {
  if (!link?.href) {
    return "";
  }

  const hasSupportCopy = Boolean(vendorLabel || note);
  const supportGridClass = hasSupportCopy ? " booking-item__link-grid--stacked" : "";
  const vendorMarkup = vendorLabel
    ? `<span class="booking-item__link-meta">${renderLocalizedContent(vendorLabel)}</span>`
    : "";
  const noteMarkup = note
    ? `<span class="booking-item__link-note">${renderLocalizedContent(note)}</span>`
    : "";

  return `
        <div class="booking-item__link-grid${supportGridClass}">
          ${vendorMarkup}
          <a
            class="booking-item__cta booking-item__cta--primary booking-item__cta--name"
            href="${escapeHtml(link.href)}"
            target="_blank"
            rel="noopener noreferrer"
            data-booking-link>
            <span class="booking-item__cta-label">${renderLocalizedContent(label)}</span>
          </a>
          ${noteMarkup}
        </div>
    `;
}

function renderBookingTransitAccommodationLinks(item) {
  const links = Array.isArray(item.links) ? item.links : [];
  if (!links.length) {
    return "";
  }

  const orderedLinks = [...links].sort((left, right) => {
    const leftPriority = left?.kind === "primary" ? 0 : 1;
    const rightPriority = right?.kind === "primary" ? 0 : 1;
    return leftPriority - rightPriority;
  });

  return orderedLinks
    .map((link) =>
      renderBookingTransitPrimaryLink(link, {
        label: bookingTransitPrimaryCtaLabel
      })
    )
    .join("");
}

function renderBookingTransitItem(item) {
  const state = getBookingTransitItemState(item.id);
  const preferredLink = getPreferredBookingTransitLink(item);
  const isAccommodationItem = item.group === "accommodations";
  const dayTagMarkup = renderBookingTransitMetaTag(item.dayLabel, "booking-item__tag--day");
  const typeTagMarkup = renderBookingTransitMetaTag(item.typeLabel, "booking-item__tag--type");
  const transitTriggerMarkup = "";
  const priceMarkup = !isAccommodationItem && preferredLink?.price
    ? `
          <p class="booking-item__price" data-booking-price hidden>
            <span class="booking-item__price-label">
              <span data-language="en">${escapeHtml(bookingTransitPriceLabel.en)}</span>
              <span data-language="ja" hidden>${escapeHtml(bookingTransitPriceLabel.ja)}</span>
            </span>
            <strong class="booking-item__price-value">
              <span data-language="en">${escapeHtml(preferredLink.price.en)}</span>
              <span data-language="ja" hidden>${escapeHtml(preferredLink.price.ja)}</span>
            </strong>
          </p>
      `
    : "";
  const linkMarkup = isAccommodationItem
    ? renderBookingTransitAccommodationLinks(item)
    : preferredLink
    ? renderBookingTransitPrimaryLink(preferredLink)
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
      </summary>
      <div class="booking-item__details">
        <div class="booking-item__details-inner">
          ${transitTriggerMarkup}
          <div class="booking-item__actions">
            ${linkMarkup}
            ${priceMarkup}
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
        <details class="booking-group" data-booking-group-section="${group.id}">
          <summary class="booking-group__summary">
            <div class="booking-group__header">
              <h5 class="booking-group__title">${renderLocalizedContent(group.title)}</h5>
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

function syncBookingTransitItemExpansion(itemElement) {
  updateStoredBookingTransitItemState(itemElement.dataset.bookingId || "", {
    expanded: itemElement.open
  });
  syncBookingTransitItemUI(itemElement);
}

function toggleBookingTransitItemExpansionNow(itemElement, summaryElement) {
  itemElement.open = !itemElement.open;
  syncBookingTransitItemExpansion(itemElement);

  try {
    summaryElement?.focus({ preventScroll: true });
  } catch {
    summaryElement?.focus();
  }
}

function shouldIgnoreInstantBookingPointer(event) {
  if (event.defaultPrevented) {
    return true;
  }

  if (event.pointerType === "mouse" && event.button !== 0) {
    return true;
  }

  return Boolean(
    event.target.closest("a, button, input, label, select, textarea, [role='button']")
  );
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
      syncBookingTransitItemExpansion(itemElement);
    });

    const summaryElement = itemElement.querySelector("summary");
    summaryElement?.addEventListener("pointerdown", (event) => {
      if (shouldIgnoreInstantBookingPointer(event)) {
        return;
      }

      event.preventDefault();
      summaryElement.dataset.bookingPointerToggled = "true";
      toggleBookingTransitItemExpansionNow(itemElement, summaryElement);
    });

    summaryElement?.addEventListener("click", (event) => {
      if (summaryElement.dataset.bookingPointerToggled !== "true") {
        return;
      }

      event.preventDefault();
      delete summaryElement.dataset.bookingPointerToggled;
    });

    itemElement.querySelector("[data-booking-done-toggle]")?.addEventListener("click", (event) => {
      event.preventDefault();
      const itemId = itemElement.dataset.bookingId || "";
      const state = getBookingTransitItemState(itemId);
      const nextDoneState = !state.done;
      updateStoredBookingTransitItemState(itemId, {
        done: nextDoneState
      });
      updateBookingTransitUI();
      refreshChecklistProgressState({ syncDayCards: initializedSections.has("checklist") });
    });

    itemElement.querySelectorAll("[data-booking-link]").forEach((linkNode) => {
      linkNode.addEventListener("click", () => {
        const priceNode = itemElement.querySelector("[data-booking-price]");
        if (!priceNode) {
          return;
        }

        priceNode.hidden = false;
        priceNode.classList.add("is-visible");
      });
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
      refreshChecklistProgressState({ syncDayCards: initializedSections.has("checklist") });
      setBookingTransitStatus("ready");
      bookingTransitInitialized = true;
    })
    .catch(() => {
      setBookingTransitStatus("error");
    });
}

function resetBookingTransitState({ persist = true } = {}) {
  const bookingTransitRoot = getBookingTransitRoot();
  bookingTransitState = { filter: "all", items: {} };
  if (persist) {
    storeBookingTransitState();
  }
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
  return false;
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

  syncChecklistActionButtons(isLocked);
  return isLocked;
}

function syncChecklistActionButtons(isLocked = isChecklistAccessLocked()) {
  if (!checklistMarkAllButton) {
    return;
  }

  const checklistInputs = getChecklistInputs();
  const actionableInputs = checklistInputs.filter((input) => !input.disabled);
  const checkedCount = actionableInputs.filter((input) => Boolean(checklistState[input.id])).length;
  checklistMarkAllButton.disabled =
    isLocked || !actionableInputs.length || checkedCount === actionableInputs.length;
}

function isPackingItemPacked(itemId) {
  return Boolean(packingState[itemId]);
}

function syncChecklistGroupCompletion(target, isComplete) {
  if (!target) {
    return;
  }

  const hasKnownState = checklistGroupCompletionState.has(target);
  const wasComplete = checklistGroupCompletionState.get(target) === true;
  checklistGroupCompletionState.set(target, isComplete);
  if (hasKnownState && !wasComplete && isComplete) {
    return;
  }
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
  syncChecklistGroupCompletion(sectionElement, isComplete);

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
    syncChecklistInputVisualState(input);
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

function revealAllContentPanels() {
  contentPanels.forEach((panel) => {
    panel.hidden = false;
    panel.setAttribute("aria-hidden", "false");
    panel.removeAttribute("inert");
  });
}

function initializeSectionWhenVisible(sectionName) {
  if (!sectionName) {
    return;
  }

  void ensureSectionAssetsReady(sectionName).then(() => ensureSectionInitialized(sectionName));
}

function ensureSectionInitObserver() {
  if (sectionInitObserver || !contentPanels.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    contentPanels.forEach((panel) => {
      initializeSectionWhenVisible(panel.dataset.panel);
    });
    return;
  }

  sectionInitObserver = new window.IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const sectionName = entry.target?.dataset?.panel;
        initializeSectionWhenVisible(sectionName);
        sectionInitObserver.unobserve(entry.target);
      });
    },
    {
      rootMargin: "360px 0px 420px 0px",
      threshold: [0, 0.08]
    }
  );

  contentPanels.forEach((panel) => {
    sectionInitObserver.observe(panel);
  });
}

function getPanelViewportScore(panel, sampleLine) {
  const rect = panel.getBoundingClientRect();
  if (rect.bottom < 0 || rect.top > window.innerHeight) {
    return Number.POSITIVE_INFINITY;
  }

  if (rect.top <= sampleLine && rect.bottom >= sampleLine) {
    return 0;
  }

  return Math.min(Math.abs(rect.top - sampleLine), Math.abs(rect.bottom - sampleLine));
}

function getSectionInViewPanelId() {
  if (!contentPanels.length) {
    return "";
  }

  const sampleLine = Math.min(
    window.innerHeight * 0.52,
    getHeaderScrollOffset(28) + Math.max(120, window.innerHeight * 0.18)
  );
  const fallbackPanel = contentPanels[0];
  const bestPanel = contentPanels.reduce(
    (best, panel) => {
      const score = getPanelViewportScore(panel, sampleLine);
      return score < best.score ? { panel, score } : best;
    },
    { panel: fallbackPanel, score: Number.POSITIVE_INFINITY }
  ).panel;

  return bestPanel?.dataset.panel || fallbackPanel?.dataset.panel || "";
}

function lockSectionNavScrollSync(panelId, duration = 1800) {
  sectionNavScrollLockPanelId = panelId;
  sectionNavScrollLockUntil = window.performance.now() + duration;
}

function clearSectionNavScrollSyncLock() {
  sectionNavScrollLockPanelId = "";
  sectionNavScrollLockUntil = 0;
}

function getLockedSectionNavPanelId() {
  if (!sectionNavScrollLockPanelId) {
    return "";
  }

  if (window.performance.now() <= sectionNavScrollLockUntil) {
    return sectionNavScrollLockPanelId;
  }

  clearSectionNavScrollSyncLock();
  return "";
}

function syncSectionNavToScroll({ force = false } = {}) {
  const lockedPanelId = force ? "" : getLockedSectionNavPanelId();
  if (lockedPanelId) {
    if (getActivePanelId() !== lockedPanelId) {
      setActivePanel(lockedPanelId, { syncContent: false, store: false });
    }
    return;
  }

  const panelId = getSectionInViewPanelId();
  if (!panelId) {
    return;
  }

  if (!force && getActivePanelId() === panelId) {
    return;
  }

  setActivePanel(panelId, { syncContent: false, store: false });
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

function getRevealGroupChildren(block) {
  const groupedParent = block?.closest?.(".trip-stats, .day-grid, .notes-grid, .essentials-grid");
  if (!groupedParent) {
    return [];
  }

  const directChildren = Array.from(groupedParent.children);

  if (groupedParent.matches(".trip-stats")) {
    return directChildren;
  }

  if (groupedParent.matches(".day-grid")) {
    return directChildren.filter((child) => child.matches(".day-card"));
  }

  if (groupedParent.matches(".notes-grid")) {
    return directChildren.filter((child) => child.matches(".note-card"));
  }

  if (groupedParent.matches(".essentials-grid")) {
    return directChildren.filter((child) => child.matches(".essentials-card"));
  }

  return [];
}

function getRevealDelayMs(block, fallbackIndex = 0) {
  if (!block) {
    return 0;
  }

  if (block.matches(".section-heading, .checklist-header")) {
    return 0;
  }

  if (block.matches(".hero-panel")) {
    return 30;
  }

  if (block.matches(".progress-card")) {
    return 110;
  }

  const groupedChildren = getRevealGroupChildren(block);
  if (groupedChildren.length) {
    const groupedIndex = Math.max(groupedChildren.indexOf(block), 0);
    const baseDelay = block.closest(".notes-grid, .day-grid, .essentials-grid") ? 140 : 90;
    return baseDelay + Math.min(groupedIndex, 6) * 90;
  }

  if (block.matches(".route-map, .route-map__day-browser, .route-map__detail")) {
    return 140;
  }

  return Math.min(fallbackIndex, 6) * 86;
}

function applyRevealDelays(blocks = []) {
  blocks.forEach((block, index) => {
    block.style.setProperty("--reveal-delay", `${getRevealDelayMs(block, index)}ms`);
  });
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
  const transitTrigger = event.target.closest("[data-transit-detail-trigger]");
  const checklistDetailTrigger = event.target.closest("[data-checklist-detail-trigger]");
  const referenceTrigger = transitTrigger || checklistDetailTrigger;
  const dayCard = event.target.closest(".day-card[data-day]");

  if (isChecklistAccessLocked()) {
    const lockedTarget = event.target.closest(".check-item, .transit-trigger--checklist");
    if (lockedTarget) {
      event.preventDefault();
      event.stopPropagation();
      showChecklistLockNotice();
      return;
    }
  }

  if (referenceTrigger) {
    if (!dayCard) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    void openEssentialsReference(
      transitTrigger?.dataset.transitDetailTrigger ||
        checklistDetailTrigger?.dataset.checklistDetailTrigger ||
        ""
    );
    return;
  }

  const checkItem = event.target.closest(".check-item");
  if (checkItem) {
    return;
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
  if (checklistPointerGlowFrame) {
    window.cancelAnimationFrame(checklistPointerGlowFrame);
    checklistPointerGlowFrame = 0;
  }
  pendingChecklistPointerGlow = null;

  if (activeChecklistHoverItem) {
    activeChecklistHoverItem.classList.remove("is-pointer-active");
    activeChecklistHoverItem = null;
  }

  void panel;
}

function flushChecklistPointerGlow() {
  checklistPointerGlowFrame = 0;
  const nextPointerState = pendingChecklistPointerGlow;
  if (!nextPointerState?.item || nextPointerState.item !== activeChecklistHoverItem) {
    return;
  }

  const rect = nextPointerState.item.getBoundingClientRect();
  nextPointerState.item.style.setProperty(
    "--check-pointer-x",
    `${nextPointerState.clientX - rect.left}px`
  );
  nextPointerState.item.style.setProperty(
    "--check-pointer-y",
    `${nextPointerState.clientY - rect.top}px`
  );
}

function updateChecklistPointerGlow(item, clientX, clientY) {
  if (!item) {
    return;
  }

  pendingChecklistPointerGlow = {
    item,
    clientX,
    clientY
  };

  if (checklistPointerGlowFrame) {
    return;
  }

  checklistPointerGlowFrame = window.requestAnimationFrame(flushChecklistPointerGlow);
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

function syncChecklistProgressTransitions({
  previousUnlockedDays = new Set(),
  previousCompletedDays = new Set(),
  previousCurrentDay = String(currentProgressDay)
} = {}) {
  void previousUnlockedDays;
  void previousCompletedDays;

  if (String(currentProgressDay) !== previousCurrentDay) {
    lastTimelineFocusDay = null;
  }
}

const checklistItemIconMap = {
  "day1-arrival-setup": "rail",
  "day1-kaiyukan": "aquarium",
  "day1-nightlife": "moon",
  "day1-shinsaibashi": "shopping",
  "day1-dinner": "food",
  "day2-transfer-to-kyoto": "rail",
  "day2-hotel-check-in": "hotel",
  "day2-kiyomizu": "temple",
  "day2-ninenzaka": "street",
  "day2-yasaka": "pagoda",
  "day2-gion": "lantern",
  "day3-arashiyama": "bamboo",
  "day3-shinkansen-mishima": "shinkansen",
  "day3-transfer-fujikawaguchiko": "bus",
  "day3-onsen-check-in": "onsen",
  "day4-chureito": "mountain",
  "day4-kawaguchiko": "lake",
  "day4-tokyo-transfer": "rail",
  "day4-tokyo-hotel-check-in": "hotel",
  "day5-shibuya-crossing": "crossing",
  "day5-shibuya-food-walk": "food",
  "day5-sky": "skyline",
  "day6-skytree": "tower",
  "day6-solamachi": "shopping",
  "day6-akihabara": "tech",
  "day7-palace": "palace",
  "day7-shinjuku": "city",
  "day7-bags": "luggage",
  "day7-airport": "plane"
};

const checklistIconSvgMap = {
  moon:
    '<svg viewBox="0 0 24 24" focusable="false"><path d="M20 14.5A7.5 7.5 0 0 1 10.5 5 8.5 8.5 0 1 0 20 14.5Z"></path></svg>',
  shopping:
    '<svg viewBox="0 0 24 24" focusable="false"><path d="M7 9V7a5 5 0 0 1 10 0v2"></path><path d="M5 9h14l-1 10H6L5 9Z"></path></svg>',
  food:
    '<svg viewBox="0 0 24 24" focusable="false"><path d="M4.5 4.5v5.5"></path><path d="M6.5 4.5v5.5"></path><path d="M8.5 4.5v5.5"></path><path d="M6.5 10v9"></path><path d="M14.5 4.5c2 0 3 1.8 3 4v10"></path><path d="M14.5 8.5h3"></path></svg>',
  rail:
    '<svg viewBox="0 0 24 24" focusable="false"><rect x="5" y="4.5" width="14" height="12" rx="3"></rect><path d="M8 16.5l-2 3"></path><path d="M16 16.5l2 3"></path><path d="M8.5 12.5h7"></path><path d="M8 8.5h3"></path><path d="M13 8.5h3"></path></svg>',
  hotel:
    '<svg viewBox="0 0 24 24" focusable="false"><path d="M4 17.5v-6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6"></path><path d="M4 14.5h16"></path><path d="M7 9.5v-1.5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5"></path><path d="M4 17.5v2"></path><path d="M20 17.5v2"></path></svg>',
  temple:
    '<svg viewBox="0 0 24 24" focusable="false"><path d="M3.5 18.5h17"></path><path d="M6 18.5v-4"></path><path d="M12 18.5v-4"></path><path d="M18 18.5v-4"></path><path d="M4 14.5h16"></path><path d="M5 10.5h14"></path><path d="M7 6.5h10"></path><path d="M12 3.5v3"></path><path d="M4 10.5l8-4 8 4"></path><path d="M3.5 14.5l8.5-4 8.5 4"></path></svg>',
  street:
    '<svg viewBox="0 0 24 24" focusable="false"><path d="M8 4.5v15"></path><path d="M8 5.5h8l-1.5 2 1.5 2H8"></path><path d="M8 11.5h6l-1.5 2 1.5 2H8"></path></svg>',
  pagoda:
    '<svg viewBox="0 0 24 24" focusable="false"><path d="M12 4.5v2"></path><path d="M5 8.5h14"></path><path d="M7 12.5h10"></path><path d="M8.5 16.5h7"></path><path d="M10 8.5v10"></path><path d="M14 8.5v10"></path><path d="M4.5 18.5h15"></path><path d="M4 8.5l8-3 8 3"></path><path d="M6.5 12.5l5.5-2 5.5 2"></path><path d="M8 16.5l4-1.5 4 1.5"></path></svg>',
  lantern:
    '<svg viewBox="0 0 24 24" focusable="false"><path d="M9 5.5a3 3 0 0 1 6 0"></path><path d="M8 7.5h8"></path><path d="M9 7.5v7a3 3 0 0 0 6 0v-7"></path><path d="M12 17.5v2"></path><path d="M10 19.5h4"></path></svg>',
  garden:
    '<svg viewBox="0 0 24 24" focusable="false"><path d="M19.5 4.5C13 4 8 7.5 6 12c-1.5 3.3-.8 6.3.5 7.5 1.2 1.1 4.2 1.8 7.5.5 4.5-2 8-7 7.5-13.5Z"></path><path d="M8 16c2-1.8 4.5-4.3 8-6"></path></svg>',
  bamboo:
    '<svg viewBox="0 0 24 24" focusable="false"><path d="M7 4.5v15"></path><path d="M12 3.5v17"></path><path d="M17 5.5v14"></path><path d="M5.5 8.5H8.5"></path><path d="M10.5 7.5H13.5"></path><path d="M15.5 10.5H18.5"></path><path d="M5.5 13.5H8.5"></path><path d="M10.5 12.5H13.5"></path><path d="M15.5 15.5H18.5"></path></svg>',
  return:
    '<svg viewBox="0 0 24 24" focusable="false"><path d="M9 7.5 5 11.5l4 4"></path><path d="M19 11.5H5"></path><path d="M19 6.5v7a4 4 0 0 1-4 4h-4"></path></svg>',
  aquarium:
    '<svg viewBox="0 0 24 24" focusable="false"><path d="M4.5 12c2.5-3.5 5.5-5 8.5-5 3.2 0 5.5 1.4 6.5 5-1 3.6-3.3 5-6.5 5-3 0-6-1.5-8.5-5Z"></path><path d="M16.5 9.5 20 7.5v9l-3.5-2"></path><circle cx="10" cy="11.5" r="0.6"></circle></svg>',
  shinkansen:
    '<svg viewBox="0 0 24 24" focusable="false"><path d="M4 14.5c0-4.5 4.5-8 10-8h5.5v6c0 2.2-1.8 4-4 4H8.5c-2.5 0-4.5-.9-4.5-2Z"></path><path d="M9 9.5h5"></path><path d="M6.5 18.5h11"></path><path d="M9 16.5l-1.5 2"></path><path d="M15 16.5l1.5 2"></path></svg>',
  bus:
    '<svg viewBox="0 0 24 24" focusable="false"><rect x="5" y="5" width="14" height="12" rx="2.5"></rect><path d="M8 17v2"></path><path d="M16 17v2"></path><path d="M8 9.5h8"></path><path d="M8 12.5h8"></path><circle cx="9" cy="16" r="1"></circle><circle cx="15" cy="16" r="1"></circle></svg>',
  onsen:
    '<svg viewBox="0 0 24 24" focusable="false"><path d="M5 15.5c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1"></path><path d="M6 18.5h12"></path><path d="M8.5 11.5c-1-1.5-.5-2.8.5-4"></path><path d="M12 10.5c-1-1.5-.5-2.8.5-4"></path><path d="M15.5 11.5c-1-1.5-.5-2.8.5-4"></path></svg>',
  mountain:
    '<svg viewBox="0 0 24 24" focusable="false"><path d="M3.5 18.5 9.5 8.5l4 5 2-3 5 8"></path><path d="M13.5 18.5 9.5 12.5 5.5 18.5"></path><circle cx="17.5" cy="6.5" r="1.8"></circle></svg>',
  lake:
    '<svg viewBox="0 0 24 24" focusable="false"><path d="M4 10.5h16"></path><path d="M4 14.5c1.5 1 2.5 1 4 0s2.5-1 4 0 2.5 1 4 0 2.5-1 4 0"></path><path d="M4 18c1.5 1 2.5 1 4 0s2.5-1 4 0 2.5 1 4 0 2.5-1 4 0"></path></svg>',
  crossing:
    '<svg viewBox="0 0 24 24" focusable="false"><path d="M5 18.5h14"></path><path d="M7 15.5h10"></path><path d="M9 12.5h6"></path><path d="M8 18.5l-1.5-6"></path><path d="M12 18.5v-6"></path><path d="M16 18.5l1.5-6"></path></svg>',
  skyline:
    '<svg viewBox="0 0 24 24" focusable="false"><path d="M4 18.5h16"></path><path d="M6 18.5v-6h4v6"></path><path d="M10 18.5V6.5h4v12"></path><path d="M14 18.5v-9h4v9"></path><path d="M7.5 14.5h1"></path><path d="M11.5 8.5h1"></path><path d="M15.5 11.5h1"></path></svg>',
  tower:
    '<svg viewBox="0 0 24 24" focusable="false"><path d="M12 4.5v15"></path><path d="M7 18.5h10"></path><path d="M8.5 14.5h7"></path><path d="M9.5 10.5h5"></path><path d="M8 7.5l4-3 4 3"></path><path d="M10 10.5l-1 8"></path><path d="M14 10.5l1 8"></path></svg>',
  tech:
    '<svg viewBox="0 0 24 24" focusable="false"><rect x="7" y="7" width="10" height="10" rx="2"></rect><path d="M9 2.5v3"></path><path d="M15 2.5v3"></path><path d="M9 18.5v3"></path><path d="M15 18.5v3"></path><path d="M2.5 9h3"></path><path d="M2.5 15h3"></path><path d="M18.5 9h3"></path><path d="M18.5 15h3"></path></svg>',
  palace:
    '<svg viewBox="0 0 24 24" focusable="false"><path d="M4 9.5h16"></path><path d="M6 9.5v8"></path><path d="M10 9.5v8"></path><path d="M14 9.5v8"></path><path d="M18 9.5v8"></path><path d="M3.5 18.5h17"></path><path d="M12 4.5 3.5 8h17L12 4.5Z"></path></svg>',
  city:
    '<svg viewBox="0 0 24 24" focusable="false"><path d="M4 18.5h16"></path><path d="M5.5 18.5V10h4v8.5"></path><path d="M10.5 18.5V5.5h4v13"></path><path d="M15 18.5V9h3.5v9.5"></path><path d="M7 12.5h1"></path><path d="M12 8.5h1"></path><path d="M16.5 12h1"></path></svg>',
  luggage:
    '<svg viewBox="0 0 24 24" focusable="false"><rect x="6" y="6.5" width="12" height="12" rx="2"></rect><path d="M9 6.5v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1"></path><path d="M9 11.5h6"></path></svg>',
  plane:
    '<svg viewBox="0 0 24 24" focusable="false"><path d="M21 11.5 3 7.5l4 4-4 4 18-4Z"></path><path d="M7 11.5h14"></path></svg>'
};

function decorateChecklistItems(panel = getSectionPanel("checklist")) {
  if (!panel) {
    return;
  }

  panel.querySelectorAll(".check-item").forEach((itemElement) => {
    const itemId =
      itemElement.getAttribute("for") || itemElement.querySelector('input[type="checkbox"]')?.id || "";
    const iconId = checklistItemIconMap[itemId];
    const existingIconNode = itemElement.querySelector(".check-item__icon");

    if (!iconId || !checklistIconSvgMap[iconId]) {
      itemElement.removeAttribute("data-check-icon");
      existingIconNode?.remove();
      return;
    }

    itemElement.dataset.checkIcon = iconId;
    const iconNode = existingIconNode || document.createElement("span");
    iconNode.className = "check-item__icon";
    iconNode.setAttribute("aria-hidden", "true");

    if (iconNode.dataset.iconId !== iconId) {
      iconNode.dataset.iconId = iconId;
      iconNode.innerHTML = checklistIconSvgMap[iconId];
    }

    if (!existingIconNode) {
      itemElement.append(iconNode);
    }
  });
}

function markAllChecklistItemsChecked() {
  if (isChecklistAccessLocked()) {
    void openEssentialsReference();
    return;
  }

  const checklistInputs = getChecklistInputs();
  const pendingInputs = checklistInputs.filter(
    (input) => !input.disabled && !Boolean(checklistState[input.id])
  );
  if (!pendingInputs.length) {
    syncChecklistActionButtons(false);
    return;
  }

  const previousUnlockedDays = new Set(unlockedDays);
  const previousCompletedDays = new Set(completedDays);
  const previousCurrentDay = String(currentProgressDay);

  pendingInputs.forEach((input) => {
    input.checked = true;
    checklistState[input.id] = true;
    syncChecklistInputVisualState(input);
  });

  storeChecklistState();
  refreshChecklistProgressState({ syncDayCards: true });
  syncProgressTimeline();
  syncChecklistProgressTransitions({
    previousUnlockedDays,
    previousCompletedDays,
    previousCurrentDay
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

  const previousUnlockedDays = new Set(unlockedDays);
  const previousCompletedDays = new Set(completedDays);
  const previousCurrentDay = String(currentProgressDay);

  if (input.checked) {
    checklistState[input.id] = true;
  } else {
    delete checklistState[input.id];
  }
  syncChecklistInputVisualState(input);

  triggerChecklistInteractionFeedback(input);
  storeChecklistState();
  refreshChecklistProgressState({ syncDayCards: true });
  syncProgressTimeline();
  syncChecklistProgressTransitions({
    previousUnlockedDays,
    previousCompletedDays,
    previousCurrentDay
  });
}

function initChecklistSection() {
  const panel = getSectionPanel("checklist");
  if (!panel) {
    return;
  }

  restoreChecklistState(panel);
  decorateChecklistItems(panel);

  if (panel.dataset.checklistBound !== "true") {
    panel.addEventListener("click", handleChecklistPanelClick);
    panel.addEventListener("change", handleChecklistPanelChange);
    panel.addEventListener("pointermove", handleChecklistPanelPointerMove, { passive: true });
    panel.addEventListener("pointerleave", handleChecklistPanelPointerLeave, { passive: true });
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

function cancelElementScrollAnimation(element, didReachTarget = false) {
  const activeAnimation = activeElementScrollAnimations.get(element);
  if (!activeAnimation) {
    return;
  }

  window.cancelAnimationFrame(activeAnimation.frameId);
  activeElementScrollAnimations.delete(element);
  activeAnimation.resolve?.(didReachTarget);
}

function animateScrollableElement(
  element,
  property,
  nextValue,
  { behavior = "smooth", minDuration = 160, maxDuration = 420, multiplier = 0.36 } = {}
) {
  const targetValue = Math.max(0, Number(nextValue) || 0);
  const currentValue = Number(element?.[property] ?? 0);
  const shouldAnimate = behavior === "smooth" && !reducedEffectsEnabled;

  cancelElementScrollAnimation(element, false);

  if (!element || Math.abs(targetValue - currentValue) < 1 || !shouldAnimate) {
    if (element) {
      element[property] = targetValue;
    }
    return Promise.resolve(true);
  }

  const startValue = currentValue;
  const delta = targetValue - startValue;
  const duration = getTimedMotionDuration(delta, {
    min: minDuration,
    max: maxDuration,
    multiplier
  });

  return new Promise((resolve) => {
    const animationState = {
      frameId: 0,
      resolve
    };
    const startTime = window.performance.now();

    const step = (timestamp) => {
      if (activeElementScrollAnimations.get(element) !== animationState) {
        return;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeTimedMotion(progress);
      element[property] = startValue + delta * easedProgress;

      if (progress < 1) {
        animationState.frameId = window.requestAnimationFrame(step);
        return;
      }

      activeElementScrollAnimations.delete(element);
      element[property] = targetValue;
      resolve(true);
    };

    activeElementScrollAnimations.set(element, animationState);
    animationState.frameId = window.requestAnimationFrame(step);
  });
}

function getRouteMapDayRailTargetScrollLeft(railNode, dayCardNode) {
  const maxScroll = Math.max(railNode.scrollWidth - railNode.clientWidth, 0);
  const cardStart = dayCardNode.offsetLeft;
  const cardWidth = dayCardNode.offsetWidth;
  const cardEnd = cardStart + cardWidth;
  const currentStart = railNode.scrollLeft;
  const currentEnd = currentStart + railNode.clientWidth;

  if (compactViewportQuery.matches) {
    return clamp(cardStart - (railNode.clientWidth - cardWidth) / 2, 0, maxScroll);
  }

  if (cardStart < currentStart) {
    return clamp(cardStart, 0, maxScroll);
  }

  if (cardEnd > currentEnd) {
    return clamp(cardEnd - railNode.clientWidth, 0, maxScroll);
  }

  return clamp(currentStart, 0, maxScroll);
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
  void animateScrollableElement(railNode, "scrollLeft", nextScrollLeft, {
    behavior: reducedEffectsEnabled ? "auto" : "smooth"
  }).then(() => {
    routeMapDayRailScrollLeft = railNode.scrollLeft;
    syncRouteMapDaySliderControls();
  });
}

function revealRouteMapDayCard(day, { smooth = false } = {}) {
  const railNode = getRouteMapDayRailNode();
  const dayCardNode = getRouteMapDayCardNode(day);
  if (!railNode || !dayCardNode) {
    return;
  }

  const targetScrollLeft = getRouteMapDayRailTargetScrollLeft(railNode, dayCardNode);
  void animateScrollableElement(railNode, "scrollLeft", targetScrollLeft, {
    behavior: smooth && !reducedEffectsEnabled ? "smooth" : "auto",
    minDuration: 180,
    maxDuration: 360,
    multiplier: 0.34
  }).then(() => {
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
  void map;
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
  const routeMapShellNode = getRouteMapShellNode();
  const routeMapExplorerNode = getRouteMapExplorerNode();
  if (routeMapInitialized || !routeMapShellNode) {
    return;
  }

  if (routeMapExplorerNode) {
    routeMapExplorerNode.innerHTML = renderRouteMapExplorerShell();
    localizedMarkupCache.set(routeMapExplorerNode, routeMapExplorerNode.innerHTML);
    if (root.lang === "ja") {
      syncLocalizedNodes(routeMapExplorerNode);
    }
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
  return reducedEffectsEnabled ? "auto" : "smooth";
}

function getMaxWindowScrollTop() {
  return Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
}

function getTimedMotionDuration(
  distance,
  { min = 180, max = 620, multiplier = 0.32 } = {}
) {
  return clamp(Math.round(min + Math.abs(distance) * multiplier), min, max);
}

function easeTimedMotion(progress) {
  if (progress <= 0) {
    return 0;
  }

  if (progress >= 1) {
    return 1;
  }

  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function cancelWindowScrollAnimation(didReachTarget = false) {
  if (!activeWindowScrollAnimation) {
    return;
  }

  window.cancelAnimationFrame(activeWindowScrollAnimation.frameId);
  const { resolve } = activeWindowScrollAnimation;
  activeWindowScrollAnimation = null;
  resolve?.(didReachTarget);
}

function smoothlyScrollWindowTo(nextTop, { behavior = getScrollBehavior() } = {}) {
  const clampedTop = clamp(Math.round(nextTop), 0, getMaxWindowScrollTop());
  const currentTop = Math.max(window.scrollY, 0);
  const shouldAnimate = behavior === "smooth" && !reducedEffectsEnabled;

  cancelWindowScrollAnimation(false);

  if (Math.abs(clampedTop - currentTop) < 2) {
    if (clampedTop !== currentTop) {
      window.scrollTo({
        top: clampedTop,
        behavior: "auto"
      });
    }
    return Promise.resolve(true);
  }

  if (!shouldAnimate) {
    window.scrollTo({
      top: clampedTop,
      behavior: "auto"
    });
    return Promise.resolve(true);
  }

  const startTop = currentTop;
  const delta = clampedTop - startTop;
  const duration = getTimedMotionDuration(delta, {
    min: 220,
    max: 680,
    multiplier: 0.28
  });

  return new Promise((resolve) => {
    const animationState = {
      frameId: 0,
      resolve
    };
    const startTime = window.performance.now();

    const step = (timestamp) => {
      if (activeWindowScrollAnimation !== animationState) {
        return;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeTimedMotion(progress);
      const nextScrollTop = startTop + delta * easedProgress;
      window.scrollTo(0, Math.round(nextScrollTop));

      if (progress < 1) {
        animationState.frameId = window.requestAnimationFrame(step);
        return;
      }

      activeWindowScrollAnimation = null;
      window.scrollTo(0, clampedTop);
      resolve(true);
    };

    activeWindowScrollAnimation = animationState;
    animationState.frameId = window.requestAnimationFrame(step);
  });
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

function getCurrentChecklistJumpDay() {
  const fallbackDay = Number.parseInt(getCurrentProgressDay(), 10);
  const datedChecklistDays = dayCards
    .map((card) => {
      const day = Number.parseInt(card.dataset.day || "", 10);
      const dateKey = String(card.dataset.tripDate || "").trim();

      if (!Number.isFinite(day) || !/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
        return null;
      }

      return { day, dateKey };
    })
    .filter(Boolean)
    .sort((left, right) => left.day - right.day);

  if (!datedChecklistDays.length) {
    return Number.isFinite(fallbackDay) ? fallbackDay : 1;
  }

  const todayKey = formatTokyoDateKey(getTokyoShiftedDate());
  const exactMatch = datedChecklistDays.find((entry) => entry.dateKey === todayKey);
  if (exactMatch) {
    return exactMatch.day;
  }

  if (todayKey < datedChecklistDays[0].dateKey) {
    return datedChecklistDays[0].day;
  }

  if (todayKey > datedChecklistDays[datedChecklistDays.length - 1].dateKey) {
    return datedChecklistDays[datedChecklistDays.length - 1].day;
  }

  return Number.isFinite(fallbackDay) ? fallbackDay : datedChecklistDays[0].day;
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
  const isModalOpen = Boolean(transitDetailModal && !transitDetailModal.hidden);

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

async function resetTripProgress() {
  if (isChecklistAccessLocked()) {
    void openEssentialsReference();
    return;
  }

  checklistState = {};

  getChecklistInputs().forEach((input) => {
    input.checked = false;
    syncChecklistInputVisualState(input);
  });

  completedDays = new Set();
  completedHistoryDays = new Set();
  unlockedDays = new Set();
  warningDays = new Set();
  accessibleDay = 1;
  currentProgressDay = 1;
  lastTimelineFocusDay = null;

  resetBookingTransitState({ persist: false });
  clearStoredTripProgressState();

  window.clearTimeout(sequenceNoticeTimer);
  if (sequenceNotice) {
    sequenceNotice.hidden = true;
    sequenceNotice.classList.remove("is-visible");
  }

  refreshChecklistProgressState({ syncDayCards: true });
  refreshRouteMapsIfReady({ updateCamera: true });
  syncProgressTimeline();
  showToastNotice(
    root.lang === "ja"
      ? "チェックリストをリセットしました。"
      : "Trip checklist reset."
  );

  await scrollToChecklistDay(1);
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

function scheduleScrollToNode(
  targetNode,
  {
    behavior = getScrollBehavior(),
    extraOffset = 20,
    headerLockDuration = 320
  } = {}
) {
  if (!targetNode) {
    return;
  }

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      lockHeaderState(headerLockDuration);
      const targetTop =
        targetNode.getBoundingClientRect().top + window.scrollY - getHeaderScrollOffset(extraOffset);

      void smoothlyScrollWindowTo(Math.max(targetTop, 0), { behavior });
    });
  });
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
      const isUnavailable = checklistLocked;
      const isWarning = nextWarningDays.has(dayKey);
      const isCurrent = dayKey === String(nextCurrentDay);

      card.style.setProperty("--day-progress", String(progressRatio));
      card.setAttribute("data-day-progress", String(Math.round(progressRatio * 100)));
      card.classList.toggle("is-complete", isComplete);
      card.classList.toggle("is-warning-day", isWarning);
      card.classList.toggle("is-current-day", isCurrent && !isComplete);
      card.classList.toggle("is-locked-day", isUnavailable);
      card.setAttribute("aria-disabled", String(isUnavailable));
      syncChecklistGroupCompletion(card, isComplete);
      getDayInputs(card).forEach((input) => {
        syncChecklistInputLockState(input, { dayLocked: isUnavailable });
      });
      card.querySelectorAll(".transit-trigger--checklist").forEach((button) => {
        button.disabled = false;
        button.setAttribute("aria-disabled", "false");
      });
    });

  }

  progressItems.forEach((item) => {
    const dayKey = item.dataset.progressItem;
    const day = Number(item.dataset.progressItem);
    const card = dayCardMap.get(dayKey);
    const progressRatio = card ? getDayCompletionRatio(card) : 0;
    const isUnavailable = checklistLocked;
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

async function scrollToChecklistDay(day, { emphasizeCurrentDay = false } = {}) {
  if (isChecklistAccessLocked()) {
    showChecklistLockNotice();
  }

  await activatePanel("checklist");

  if (emphasizeCurrentDay) {
    refreshChecklistProgressState({ syncDayCards: true });
    syncProgressTimeline();
  }

  const targetCard = getChecklistDayCard(
    emphasizeCurrentDay ? getCurrentChecklistJumpDay() : day
  );
  if (!targetCard) {
    return;
  }

  scheduleScrollToNode(targetCard, {
    behavior: getScrollBehavior(),
    extraOffset: 28,
    headerLockDuration: 720
  });

  targetCard.classList.remove("is-route-target");
  restartClassOnNextFrame(targetCard, "is-route-target");
  window.setTimeout(() => {
    targetCard.classList.remove("is-route-target");
  }, 1400);
}

function scrollToPanelStart(panelId, options = {}) {
  const { behavior = getScrollBehavior(), realign = true } = options;
  const alignmentToken = ++panelScrollAlignmentToken;
  lockSectionNavScrollSync(panelId);

  const alignPanel = (nextBehavior = behavior, headerLockDuration = 360) => {
    if (alignmentToken !== panelScrollAlignmentToken) {
      return;
    }

    const panel = Array.from(contentPanels).find((node) => node.dataset.panel === panelId);
    if (!panel) {
      return;
    }

    const anchor =
      panel.querySelector("[data-panel-scroll-anchor]") || panel.querySelector(".section-heading") || panel;
    setActivePanel(panelId, { syncContent: false, store: false });
    scheduleScrollToNode(anchor, {
      behavior: nextBehavior,
      extraOffset: 28,
      headerLockDuration
    });
  };

  alignPanel(behavior, 360);

  if (realign) {
    [180, 520, 1100].forEach((delay) => {
      window.setTimeout(() => {
        alignPanel("auto", 220);
      }, delay);
    });
  }
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
  scheduleScrollToNode(targetNode, {
    behavior: getScrollBehavior(),
    extraOffset: 24,
    headerLockDuration: 360
  });

  if (window.history?.replaceState) {
    window.history.replaceState(null, "", `#${targetId}`);
  }
}

function getSelectionTargetElement(target) {
  if (target instanceof Element) {
    return target;
  }

  return target?.parentElement || null;
}

function isEditableSelectionTarget(target) {
  const targetElement = getSelectionTargetElement(target);
  if (!targetElement) {
    return false;
  }

  return Boolean(
    targetElement.closest(
      'input, textarea, select, option, [contenteditable="true"], [contenteditable="plaintext-only"]'
    )
  );
}

function handleSelectionStart(event) {
  if (isEditableSelectionTarget(event.target)) {
    return;
  }

  event.preventDefault();
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
  checklistPrintDraft = null;
  if (checklistPrintModal && !checklistPrintModal.hidden) {
    checklistPrintDraft = getChecklistPrintDraft();
    renderChecklistPrintEditor(checklistPrintDraft);
    renderChecklistPrintPreview(checklistPrintDraft);
  }
  refreshTripNotesIfReady();
  refreshBudgetNotesIfReady();
  refreshBookingTransitIfReady();
  refreshChecklistProgressState();
  updateChecklistAccessState();
  syncProgressTimeline();
  refreshRouteMapsIfReady();
  syncRadioStationUi();
  scheduleDayCardRowHeights();
}

function applyTheme(theme, options = {}) {
  const nextTheme = "dark";
  const { persist = true } = options;

  root.dataset.theme = nextTheme;
  root.style.colorScheme = nextTheme;
  updateThemeColorMeta(nextTheme);
  void persist;

  refreshRouteMapsIfReady();
}

function handleLanguageButtonClick(button) {
  lockHeaderState(280);
  preserveScrollPosition(() => {
    setLanguage(button.dataset.setLanguage);
  });
}

function updateLanguageButtons(language) {
  languageButtons.forEach((button) => {
    const isActive = button.dataset.setLanguage === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function setActivePanel(panelId, options = {}) {
  const { syncContent = true, store = true } = options;
  let hasMatch = false;

  revealAllContentPanels();

  contentPanels.forEach((panel) => {
    const isActive = panel.dataset.panel === panelId;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = false;
    panel.setAttribute("aria-hidden", "false");
    panel.removeAttribute("inert");
    hasMatch ||= isActive;
  });

  sectionTabs.forEach((tab) => {
    const isActive = tab.dataset.panelTarget === panelId;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  syncSectionNavIndicator();
  scrollSectionTabIntoView();

  if (hasMatch && syncContent) {
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
    if (store) {
      storeActivePanel(panelId);
    }
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

  applyRevealDelays(revealBlocks);
  revealBlocks.forEach((block) => {
    block.classList.add("reveal-block");
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

  applyRevealDelays(panelBlocks);
  panelBlocks.forEach((block) => {
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

function getActiveSectionTab() {
  return sectionTabs.find((tab) => tab.classList.contains("is-active")) || null;
}

function scrollSectionTabIntoView(tab = getActiveSectionTab()) {
  if (!sectionNavViewport || !tab) {
    return;
  }

  const viewportRect = sectionNavViewport.getBoundingClientRect();
  const tabRect = tab.getBoundingClientRect();
  const nextLeft =
    sectionNavViewport.scrollLeft +
    tabRect.left -
    viewportRect.left -
    (viewportRect.width - tabRect.width) / 2;

  sectionNavViewport.scrollTo({
    left: Math.max(0, Math.round(nextLeft)),
    behavior: reducedEffectsEnabled ? "auto" : "smooth"
  });
}

function syncSectionNavIndicator(options = {}) {
  const { immediate = false } = options;
  if (!sectionNavTrack || !sectionNavIndicator) {
    return;
  }

  const activeTab = getActiveSectionTab();
  if (!activeTab) {
    sectionNavIndicator.style.opacity = "0";
    return;
  }

  const nextX = activeTab.offsetLeft;
  const nextWidth = activeTab.offsetWidth;

  if (reducedEffectsEnabled || immediate) {
    const currentTransition = sectionNavIndicator.style.transition;
    sectionNavIndicator.style.transition = "none";
    sectionNavIndicator.style.opacity = "1";
    sectionNavIndicator.style.width = `${nextWidth}px`;
    sectionNavIndicator.style.transform = `translate3d(${nextX}px, 0, 0)`;
    sectionNavIndicator.offsetWidth;
    sectionNavIndicator.style.transition = currentTransition;
    return;
  }

  sectionNavIndicator.style.opacity = "1";
  sectionNavIndicator.style.width = `${nextWidth}px`;
  sectionNavIndicator.style.transform = `translate3d(${nextX}px, 0, 0)`;
}

function animateSectionTabHover(tab, isActive) {
  if (!tab || reducedEffectsEnabled || coarsePointerQuery.matches) {
    return;
  }

  tab.style.transform = isActive ? "translateY(-2px) scale(1.018)" : "";
}

function pulseActiveSectionTab(tab) {
  if (reducedEffectsEnabled || !tab || typeof tab.animate !== "function") {
    return;
  }

  tab.animate(
    [
      { transform: "scale(0.985)" },
      { transform: "scale(1.02)" },
      { transform: "scale(1)" }
    ],
    {
      duration: 360,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)"
    }
  );
}

function bindSectionNavMotion() {
  sectionTabs.forEach((tab) => {
    if (tab.dataset.navMotionBound === "true") {
      return;
    }

    tab.addEventListener("pointerenter", () => {
      animateSectionTabHover(tab, true);
    });

    tab.addEventListener("pointerleave", () => {
      animateSectionTabHover(tab, false);
    });

    tab.addEventListener("pointercancel", () => {
      animateSectionTabHover(tab, false);
    });

    tab.addEventListener("pointerup", () => {
      if (!tab.classList.contains("is-active")) {
        animateSectionTabHover(tab, false);
      }
    });

    tab.dataset.navMotionBound = "true";
  });

  syncSectionNavIndicator({ immediate: true });
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

      const hasChanged = await activatePanel(panelId);
      if (!hasChanged) {
        pulseActiveSectionTab(tab);
      }
      scrollToPanelStart(panelId, { behavior: "auto" });
    });

    tab.dataset.navigationBound = "true";
  });
}

function clearSiteTransitionState() {
  delete root.dataset.siteTransitionDirection;
  delete root.dataset.siteTransitionMode;
}

async function activatePanel(panelId) {
  const currentPanelId = getActivePanelId();
  const hasChanged = panelId !== currentPanelId;

  await ensureSectionAssetsReady(panelId);

  lockHeaderState(hasChanged ? 620 : 520);
  setActivePanel(panelId);
  await ensureSectionInitialized(panelId);
  clearSiteTransitionState();
  return hasChanged;
}

async function bootApp() {
  syncReducedEffectsMode({ force: true });
  initializeDecorativeMediaExperience();
  initializeRadioStation();
  completedHistoryDays = readStoredDaySet(completedHistoryStorageKey);
  checklistState = readStoredChecklistState();
  bookingTransitState = readStoredBookingTransitState();
  updateChecklistAccessState();
  syncOptionalDaysUI();
  applyTheme("dark", { persist: false });
  const storedLanguage = readStoredLanguage();
  if (storedLanguage === "ja") {
    setLanguage("ja");
  } else {
    root.lang = "en";
    syncLocalizedDocumentTitle("en");
    updateLanguageButtons("en");
  }

  bindSectionNavMotion();
  syncSectionNavIndicator({ immediate: true });
  bootOfflineExperience();
  root.classList.remove("intro-pending", "intro-active", "intro-leaving");
  revealAllContentPanels();
  ensureSectionInitObserver();
  syncModalOpenState();
  void warmRouteExperience();
  const initialPanelId = getInitialPanelId();
  setActivePanel(initialPanelId, { syncContent: false, store: false });
  initializeSectionWhenVisible(initialPanelId);
  window.requestAnimationFrame(() => {
    syncSectionNavToScroll({ force: true });
  });

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

bindTabNavigation();
document.addEventListener("click", handleAnchorScrollClick);
document.addEventListener("selectstart", handleSelectionStart);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    scheduleAppBoot();
  }, { once: true });
} else {
  scheduleAppBoot();
}

if (jumpCurrentDayButton) {
  jumpCurrentDayButton.addEventListener("click", () => {
    void scrollToChecklistDay(getCurrentChecklistJumpDay(), {
      emphasizeCurrentDay: true
    });
  });
}

if (checklistMarkAllButton) {
  checklistMarkAllButton.addEventListener("click", () => {
    markAllChecklistItemsChecked();
  });
}

if (checklistPrintButton) {
  checklistPrintButton.addEventListener("click", openChecklistPrintFlow);
}

if (checklistPrintForm) {
  checklistPrintForm.addEventListener("change", syncChecklistPrintDraftFromEditor);
}

checklistPrintCloseButtons.forEach((button) => {
  button.addEventListener("click", closeChecklistPrintFlow);
});

if (checklistPrintConfirmButton) {
  checklistPrintConfirmButton.addEventListener("click", printChecklistBreakdown);
}

if (checklistPrintResetButton) {
  checklistPrintResetButton.addEventListener("click", resetChecklistPrintDraft);
}

resetProgressOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    void resetTripProgress();
  });
});

backToTopButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    void smoothlyScrollWindowTo(0, { behavior: "auto" });
  });
});

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

if (checklistPrintModal) {
  checklistPrintModal.addEventListener("click", (event) => {
    if (event.target === checklistPrintModal) {
      closeChecklistPrintFlow();
    }
  });
}

[reducedMotionQuery, coarsePointerQuery, compactViewportQuery].forEach((query) => {
  bindMediaQueryChange(query, () => {
    syncReducedEffectsMode({ force: true });
    window.requestAnimationFrame(() => {
      syncSectionNavIndicator({ immediate: true });
    });
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  if (transitDetailModal && !transitDetailModal.hidden) {
    setTransitModalOpen(false);
  }

  if (checklistPrintModal && !checklistPrintModal.hidden) {
    closeChecklistPrintFlow();
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
  syncSectionNavToScroll();
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

window.addEventListener(
  "wheel",
  () => {
    panelScrollAlignmentToken += 1;
    clearSectionNavScrollSyncLock();
    cancelWindowScrollAnimation(false);
  },
  { passive: true }
);

window.addEventListener(
  "touchstart",
  () => {
    panelScrollAlignmentToken += 1;
    clearSectionNavScrollSyncLock();
    cancelWindowScrollAnimation(false);
  },
  { passive: true }
);

window.addEventListener("beforeprint", () => {
  if (checklistPrintModal && !checklistPrintModal.hidden) {
    syncChecklistPrintDraftFromEditor();
    return;
  }

  renderChecklistPrintSheet(getChecklistPrintDraft());
});

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
      syncSectionNavToScroll({ force: true });
      syncSectionNavIndicator({ immediate: true });
      syncProgressTimeline();
      scheduleDayCardRowHeights();
      resizeRouteMapsIfReady();
      lockHeaderState(220);
    });
  });
}

window.addEventListener("pagehide", () => {
  cancelWindowScrollAnimation(false);
  syncDecorativeVideoPlayback();
  flushQueuedStorageWrites();
});
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    cancelWindowScrollAnimation(false);
    syncDecorativeVideoPlayback();
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

  syncDecorativeVideoPlayback();
  syncRadioStationUi();
});



