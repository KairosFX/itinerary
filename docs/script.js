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
const packingSectionCards = Array.from(document.querySelectorAll("[data-packing-section]"));
const packingMarkAllButtons = Array.from(document.querySelectorAll("[data-packing-mark-all-global]"));
const packingResetButtons = Array.from(document.querySelectorAll("[data-packing-reset-all]"));
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
let bookingTransitItems = [];
let bookingTransitItemMap = new Map();
let transitDetailItems = [];
let transitDetailItemMap = new Map();
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
let fujiForecastResult = null;
let fujiForecastPromise = null;
let reducedEffectsEnabled = false;

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

  if (fujiForecastPromise) {
    return fujiForecastPromise;
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
            <a
              class="booking-item__cta booking-item__cta--primary"
              href="${escapeHtml(item.action.href)}"
              target="_blank"
              rel="noopener noreferrer">
              ${renderLocalizedContent(item.action.label)}
            </a>
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
}

function initRouteSection() {
  const panel = getSectionPanel("route");
  if (!panel) {
    return;
  }

  registerRevealBlocks(panel);
}

function initEssentialsSection() {
  const panel = getSectionPanel("essentials");
  if (!panel) {
    return Promise.resolve();
  }

  registerRevealBlocks(panel);
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

  scheduleDayCardRowHeights();
}

function scheduleDayCardRowHeights() {
  if (!initializedSections.has("checklist")) {
    return;
  }

  dayGrids.forEach((grid) => {
    grid.querySelectorAll(".day-card").forEach((card) => {
      card.style.minHeight = "";
    });
  });
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
    progressTimeline.style.setProperty("--timeline-spine-fill", "0px");
    return;
  }

  const rootFontSize = 16;
  const nodeTop = timelineNodeTopRem * rootFontSize;
  const nodeSize = timelineNodeSizeRem * rootFontSize;
  const linkOverlap = timelineLinkOverlapPx;
  const fillStart = nodeTop + nodeSize - linkOverlap;
  const fillEnd = anchorItem.offsetTop + nodeTop + linkOverlap;
  const fillHeight = Math.max(fillEnd - fillStart, 0);

  progressTimeline.style.setProperty("--timeline-spine-fill", `${fillHeight}px`);
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
    lockHeaderState(220);
  });
}

window.addEventListener("pagehide", flushQueuedStorageWrites);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    flushQueuedStorageWrites();
  }
});
