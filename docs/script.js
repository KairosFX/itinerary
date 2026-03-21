const languageButtons = document.querySelectorAll("[data-set-language]");
const themeButtons = document.querySelectorAll("[data-set-theme]");
const localizedNodes = document.querySelectorAll("[data-language]");
const ariaLabelNodes = document.querySelectorAll("[data-aria-label-en][data-aria-label-ja]");
const altTextNodes = document.querySelectorAll("[data-alt-en][data-alt-ja]");
const sourceNodes = document.querySelectorAll("[data-src-en][data-src-ja]");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const sectionTabs = document.querySelectorAll("[data-panel-target]");
const contentPanels = document.querySelectorAll("[data-panel]");
const siteHeader = document.querySelector(".site-header");
const welcomeOverlay = document.querySelector(".welcome-overlay");
const sequenceNotice = document.querySelector("[data-sequence-notice]");
const routeMedia = document.querySelector(".route-reference__media");
const routeMapToggle = document.querySelector("[data-route-map-toggle]");
const routeMapPanel = document.getElementById("route-map-panel");
const routeMapSurface = document.querySelector(".route-map__surface");
const routeMapCanvas = document.getElementById("route-map-canvas");
const routeMapStatus = document.querySelector("[data-route-map-status]");
const dayCards = Array.from(document.querySelectorAll(".day-card[data-day]"));
const dayGrids = Array.from(document.querySelectorAll(".day-grid"));
const checklistInputs = Array.from(document.querySelectorAll('.day-card input[type="checkbox"]'));
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
const backToTopButtons = document.querySelectorAll("[data-back-to-top]");
const footerPanelButtons = document.querySelectorAll("[data-footer-panel-target]");
const optionalPrompt = document.querySelector("[data-optional-prompt]");
const optionalPromptExpanded = document.querySelector("[data-optional-prompt-expanded]");
const optionalPromptCompact = document.querySelector("[data-optional-prompt-compact]");
const optionalPromptFeedback = document.querySelector("[data-optional-feedback]");
const optionalUnlockButtons = document.querySelectorAll("[data-optional-unlock]");
const optionalSkipButton = document.querySelector("[data-optional-skip]");
const optionalSectionNodes = document.querySelectorAll("[data-optional-section]");
const optionalProgressItems = Array.from(
  document.querySelectorAll("[data-progress-item][data-progress-optional='true']")
);
const dayCardMap = new Map(dayCards.map((card) => [card.dataset.day, card]));
const progressItemMap = new Map(progressItems.map((item) => [item.dataset.progressItem, item]));
const root = document.documentElement;
const pageTitles = {
  en: "Japan Trip | Travel Guide",
  ja: "日本旅行 | 旅行ガイド"
};
const storageKey = "japan-trip-language";
const themeStorageKey = "japan-trip-theme";
const checklistStorageKey = "japan-trip-checklist-state";
const completedHistoryStorageKey = "japan-trip-completed-history";
const optionalDaysUnlockedStorageKey = "japan-trip-optional-days-unlocked";
const routeMapAssetUrls = {
  css: "https://unpkg.com/maplibre-gl@5.18.0/dist/maplibre-gl.css",
  js: "https://unpkg.com/maplibre-gl@5.18.0/dist/maplibre-gl.js"
};
const routeMapLoadTimeoutMs = 10000;
const routeMapStops = {
  osakaStart: {
    coordinates: [135.5023, 34.6937],
    title: { en: "Osaka", ja: "大阪" },
    subtitle: { en: "Day 1 · Nightlife and Dotonbori", ja: "1日目 · 夜の街と道頓堀" }
  },
  kyoto: {
    coordinates: [135.7681, 35.0116],
    title: { en: "Kyoto", ja: "京都" },
    subtitle: { en: "Day 2 · Arashiyama, Nanzen-ji, Kiyomizu-dera", ja: "2日目 · 嵐山、南禅寺、清水寺" }
  },
  osakaReturn: {
    coordinates: [135.4945, 34.6992],
    title: { en: "Osaka", ja: "大阪" },
    subtitle: { en: "Day 3 · Kaiyukan, Osaka Castle, and flex time", ja: "3日目 · 海遊館、大阪城、自由時間" }
  },
  shinOsaka: {
    coordinates: [135.5013, 34.7335],
    title: { en: "Shin-Osaka", ja: "新大阪" },
    subtitle: { en: "Day 4 · Bullet train departure", ja: "4日目 · 新幹線の出発駅" }
  },
  odawara: {
    coordinates: [139.1544, 35.2556],
    title: { en: "Odawara", ja: "小田原" },
    subtitle: { en: "Day 4 · Hakone transfer handoff", ja: "4日目 · 箱根への乗り換え" }
  },
  hakone: {
    coordinates: [139.1039, 35.2323],
    title: { en: "Hakone", ja: "箱根" },
    subtitle: { en: "Day 4 · Ropeway, ryokan, and scenic stay", ja: "4日目 · ロープウェイと旅館の滞在" }
  },
  fuji: {
    coordinates: [138.7598, 35.4894],
    title: { en: "Mt. Fuji area", ja: "富士山エリア" },
    subtitle: { en: "Days 5 & 6 · Kawaguchiko, Oshino Hakkai, optional Chureito", ja: "5日目・6日目 · 河口湖、忍野八海、忠霊塔は任意" }
  },
  tokyo: {
    coordinates: [139.6917, 35.6895],
    title: { en: "Tokyo", ja: "東京" },
    subtitle: { en: "Day 7 onward · Shibuya finish", ja: "7日目以降 · 渋谷で締め" }
  }
};
const routeMapSegmentDefinitions = [
  { id: "segment-osaka-start-kyoto", from: "osakaStart", to: "kyoto", day: "2", kind: "main" },
  { id: "segment-kyoto-osaka-return", from: "kyoto", to: "osakaReturn", day: "3", kind: "main" },
  { id: "segment-osaka-return-shin-osaka", from: "osakaReturn", to: "shinOsaka", day: "4", kind: "main" },
  { id: "segment-shin-osaka-odawara", from: "shinOsaka", to: "odawara", day: "4", kind: "main" },
  { id: "segment-odawara-hakone", from: "odawara", to: "hakone", day: "4", kind: "main" },
  { id: "segment-hakone-fuji", from: "hakone", to: "fuji", day: "5", kind: "main" },
  { id: "segment-fuji-tokyo", from: "fuji", to: "tokyo", day: "7", kind: "main" }
];
const routeStopProgressConfig = {
  osakaStart: { stopId: "route-stop-osaka-start", days: ["1"] },
  kyoto: { stopId: "route-stop-kyoto", days: ["2"] },
  osakaReturn: { stopId: "route-stop-osaka-return", days: ["3"] },
  shinOsaka: { stopId: "route-stop-shin-osaka", days: ["4"] },
  odawara: { stopId: "route-stop-odawara", days: ["4"] },
  hakone: { stopId: "route-stop-hakone", days: ["4"] },
  fuji: { stopId: "route-stop-fuji", days: ["5", "6"] },
  tokyo: { stopId: "route-stop-tokyo", days: ["7", "8", "9"] }
};
const routeSegmentConfig = {
  "route-progress-kyoto": ["2"],
  "route-progress-osaka-return": ["3"],
  "route-progress-shin-osaka": ["4"],
  "route-progress-odawara": ["4"],
  "route-progress-hakone": ["4"],
  "route-progress-fuji": ["5"],
  "route-progress-tokyo": ["7"]
};
const routeDayToStopKey = {
  1: "osakaStart",
  2: "kyoto",
  3: "osakaReturn",
  4: "hakone",
  5: "fuji",
  6: "fuji",
  7: "tokyo",
  8: "tokyo",
  9: "tokyo"
};
let reservedHeaderHeight = 0;
let headerLockUntil = 0;
let lastScrollY = window.scrollY;
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
let routeMapInstance = null;
let routeMapLibraryPromise = null;
let routeMapInitializationPromise = null;
let routeMapSegments = [];
let routeMapMarkers = new Map();
let routeMapStatusMode = null;
let routeMapInteractive = false;
let routeMapDragArmed = false;
let routeMapDragPointerId = null;
let lastResetTrigger = null;
let dayCardRowEqualizeFrame = 0;

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
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
    window.localStorage.setItem(themeStorageKey, theme);
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

function applyRouteTheme() {
  const routeDoc = routeMedia?.contentDocument;
  if (!routeDoc?.documentElement) {
    return;
  }

  routeDoc.documentElement.dataset.theme = getCurrentTheme();
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
    window.localStorage.setItem(key, JSON.stringify(sortedDays));
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
      window.localStorage.setItem(key, "1");
      return;
    }

    window.localStorage.removeItem(key);
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
    return JSON.parse(window.localStorage.getItem(checklistStorageKey) || "{}");
  } catch (error) {
    return {};
  }
}

function storeChecklistState() {
  try {
    const nextState = {};
    checklistInputs.forEach((input) => {
      if (input.checked) {
        nextState[input.id] = true;
      }
    });
    window.localStorage.setItem(checklistStorageKey, JSON.stringify(nextState));
  } catch (error) {
    // Ignore storage failures and keep the checklist usable.
  }
}

function readStoredLanguage() {
  try {
    return window.localStorage.getItem(storageKey);
  } catch (error) {
    return null;
  }
}

function storeLanguage(language) {
  try {
    window.localStorage.setItem(storageKey, language);
  } catch (error) {
    // Ignore storage failures and keep the page usable.
  }
}

function finishWelcome() {
  root.classList.remove("is-welcoming");
  root.classList.add("has-seen-welcome");
  if (welcomeOverlay) {
    welcomeOverlay.setAttribute("hidden", "");
  }
}

function syncReservedHeaderHeight(forceReset = false) {
  if (!siteHeader) {
    return;
  }

  const currentHeight = Math.ceil(siteHeader.getBoundingClientRect().height);
  if (forceReset) {
    reservedHeaderHeight = currentHeight;
  } else {
    reservedHeaderHeight = Math.max(reservedHeaderHeight, currentHeight);
  }

  root.style.setProperty("--header-reserved-height", `${reservedHeaderHeight}px`);
}

function lockHeaderState(duration = 420) {
  headerLockUntil = window.performance.now() + duration;
  lastScrollY = window.scrollY;
}

function preserveScrollPosition(callback) {
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  callback();
  window.requestAnimationFrame(() => {
    window.scrollTo(scrollX, scrollY);
    window.requestAnimationFrame(() => {
      window.scrollTo(scrollX, scrollY);
    });
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

  const checkedCount = inputs.filter((input) => input.checked).length;
  return checkedCount / inputs.length;
}

function isDayComplete(dayCard) {
  const inputs = getDayInputs(dayCard);
  return inputs.length > 0 && inputs.every((input) => input.checked);
}

function areOptionalDaysUnlocked() {
  return optionalDaysUnlocked;
}

function restoreChecklistState() {
  const storedState = readStoredChecklistState();
  checklistInputs.forEach((input) => {
    input.checked = Boolean(storedState[input.id]);
  });
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
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

function animateCompletion(target) {
  if (!target) {
    return;
  }

  target.classList.remove("is-celebrating", "is-unlocking");
  void target.getBoundingClientRect();
  target.classList.add("is-celebrating");
  window.setTimeout(() => {
    target.classList.remove("is-celebrating");
  }, 920);
}

function animateUnlock(target) {
  if (!target) {
    return;
  }

  target.classList.remove("is-unlocking");
  void target.getBoundingClientRect();
  target.classList.add("is-unlocking");
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
  void sequenceNotice.getBoundingClientRect();
  sequenceNotice.classList.add("is-visible");

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

function getRouteMapMessage(key) {
  const language = root.lang === "ja" ? "ja" : "en";
  const messages = {
    en: {
      open: "View map",
      close: "Hide map",
      loading: "Loading live map…",
      fallback: "Live routing is unavailable right now. Showing a simplified path.",
      error: "Map could not load right now."
    },
    ja: {
      open: "地図を見る",
      close: "地図を閉じる",
      loading: "ライブ地図を読み込み中…",
      fallback: "ライブの経路を取得できないため、簡易ルートを表示しています。",
      error: "現在は地図を読み込めません。"
    }
  };

  return messages[language][key];
}

function updateRouteMapToggleLabel() {
  if (!routeMapToggle) {
    return;
  }

  const isExpanded = routeMapToggle.getAttribute("aria-expanded") === "true";
  const nextLabel = isExpanded ? getRouteMapMessage("close") : getRouteMapMessage("open");
  routeMapToggle.textContent = nextLabel;
}

function renderRouteMapStatus() {
  if (!routeMapStatus) {
    return;
  }

  if (!routeMapStatusMode) {
    routeMapStatus.hidden = true;
    routeMapStatus.textContent = "";
    return;
  }

  routeMapStatus.hidden = false;
  routeMapStatus.textContent = getRouteMapMessage(routeMapStatusMode);
}

function setRouteMapOpen(nextOpen) {
  if (!routeMapPanel || !routeMapToggle) {
    return;
  }

  const isOpen = Boolean(nextOpen);
  routeMapPanel.hidden = !isOpen;
  routeMapToggle.setAttribute("aria-expanded", String(isOpen));
  updateRouteMapToggleLabel();

  if (!isOpen) {
    setRouteMapInteractive(false);
    return;
  }

  initializeRouteMap()
    .then(() => {
      if (!routeMapInstance) {
        return;
      }

      window.requestAnimationFrame(() => {
        routeMapInstance.resize();
        fitRouteMapBounds();
        setRouteMapInteractive(false);
        syncRouteMapState();
      });
    })
    .catch(() => {
      routeMapStatusMode = "error";
      renderRouteMapStatus();
    });
}

function ensureRouteMapAssets() {
  if (window.maplibregl) {
    return Promise.resolve(window.maplibregl);
  }

  if (routeMapLibraryPromise) {
    return routeMapLibraryPromise;
  }

  routeMapLibraryPromise = new Promise((resolve, reject) => {
    let script = document.querySelector("script[data-route-maplibre='script']");
    const existingLink = document.querySelector("link[data-route-maplibre='css']");

    if (!existingLink) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = routeMapAssetUrls.css;
      link.dataset.routeMaplibre = "css";
      document.head.append(link);
    }

    if (!script) {
      script = document.createElement("script");
      script.src = routeMapAssetUrls.js;
      script.async = true;
      script.dataset.routeMaplibre = "script";
      document.head.append(script);
    }

    const resolveLibrary = () => {
      if (window.maplibregl) {
        resolve(window.maplibregl);
      } else {
        reject(new Error("MapLibre library failed to initialize."));
      }
    };

    script.addEventListener("load", resolveLibrary, { once: true });
    script.addEventListener(
      "error",
      () => {
        routeMapLibraryPromise = null;
        reject(new Error("MapLibre library failed to load."));
      },
      { once: true }
    );

    if (window.maplibregl) {
      resolve(window.maplibregl);
    }
  });

  return routeMapLibraryPromise;
}

function getRouteMapPalette() {
  const isDark = getCurrentTheme() === "dark";
  if (isDark) {
    return {
      background: "#14171b",
      rasterOpacity: 0.54,
      rasterSaturation: -0.72,
      rasterContrast: 0.18,
      rasterBrightnessMin: 0.18,
      rasterBrightnessMax: 0.88,
      complete: "#d7745f",
      current: "#f0c1b4",
      warning: "#d09d59",
      available: "#a77466",
      locked: "#524844"
    };
  }

  return {
    background: "#f2ece5",
    rasterOpacity: 0.82,
    rasterSaturation: -0.28,
    rasterContrast: 0.08,
    rasterBrightnessMin: 0.48,
    rasterBrightnessMax: 1,
    complete: "#b55446",
    current: "#de8c78",
    warning: "#bf9151",
    available: "#b89082",
    locked: "#91857f"
  };
}

function buildRouteMapStyle() {
  const palette = getRouteMapPalette();

  return {
    version: 8,
    sources: {
      osmRaster: {
        type: "raster",
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>'
      }
    },
    layers: [
      {
        id: "route-map-background",
        type: "background",
        paint: {
          "background-color": palette.background
        }
      },
      {
        id: "route-map-raster",
        type: "raster",
        source: "osmRaster",
        paint: {
          "raster-opacity": palette.rasterOpacity,
          "raster-saturation": palette.rasterSaturation,
          "raster-contrast": palette.rasterContrast,
          "raster-brightness-min": palette.rasterBrightnessMin,
          "raster-brightness-max": palette.rasterBrightnessMax
        }
      }
    ]
  };
}

function buildFallbackGeometry(fromCoordinates, toCoordinates) {
  return {
    type: "LineString",
    coordinates: [fromCoordinates, toCoordinates]
  };
}

async function fetchRouteMapGeometry(fromCoordinates, toCoordinates) {
  const [fromLng, fromLat] = fromCoordinates;
  const [toLng, toLat] = toCoordinates;
  const url =
    `https://router.project-osrm.org/route/v1/driving/${fromLng},${fromLat};${toLng},${toLat}` +
    "?overview=full&geometries=geojson";

  const response = await window.fetch(url);
  if (!response.ok) {
    throw new Error(`OSRM route request failed with status ${response.status}.`);
  }

  const data = await response.json();
  const geometry = data.routes?.[0]?.geometry;
  if (!geometry || geometry.type !== "LineString") {
    throw new Error("OSRM route response did not include a GeoJSON line.");
  }

  return geometry;
}

async function loadRouteMapSegments() {
  const segments = await Promise.all(
    routeMapSegmentDefinitions.map(async (segment) => {
      const fromCoordinates = routeMapStops[segment.from].coordinates;
      const toCoordinates = routeMapStops[segment.to].coordinates;

      try {
        const geometry = await fetchRouteMapGeometry(fromCoordinates, toCoordinates);
        return {
          ...segment,
          geometry,
          usesFallback: false
        };
      } catch (error) {
        return {
          ...segment,
          geometry: buildFallbackGeometry(fromCoordinates, toCoordinates),
          usesFallback: true
        };
      }
    })
  );

  routeMapStatusMode = segments.some((segment) => segment.usesFallback) ? "fallback" : null;
  return segments;
}

function getRouteMapSegmentState(dayKey) {
  if (warningDays.has(dayKey)) {
    return "warning";
  }

  if (completedDays.has(dayKey)) {
    return "complete";
  }

  if (String(currentProgressDay) === dayKey && unlockedDays.has(dayKey)) {
    return "current";
  }

  if (unlockedDays.has(dayKey)) {
    return "available";
  }

  return "locked";
}

function buildRouteMapFeatureCollection() {
  return {
    type: "FeatureCollection",
    features: routeMapSegments.map((segment) => ({
      type: "Feature",
      properties: {
        id: segment.id,
        kind: segment.kind,
        state: getRouteMapSegmentState(segment.day)
      },
      geometry: segment.geometry
    }))
  };
}

function addRouteMapLayers() {
  if (!routeMapInstance || routeMapInstance.getSource("route-map-segments")) {
    return;
  }

  const palette = getRouteMapPalette();

  routeMapInstance.addSource("route-map-segments", {
    type: "geojson",
    data: buildRouteMapFeatureCollection()
  });

  const segmentColorExpression = [
    "match",
    ["get", "state"],
    "complete",
    palette.complete,
    "current",
    palette.current,
    "warning",
    palette.warning,
    "available",
    palette.available,
    palette.locked
  ];
  const segmentOpacityExpression = [
    "match",
    ["get", "state"],
    "complete",
    0.98,
    "current",
    0.94,
    "warning",
    0.9,
    "available",
    0.58,
    0
  ];

  routeMapInstance.addLayer({
    id: "route-map-main-base",
    type: "line",
    source: "route-map-segments",
    filter: ["==", ["get", "kind"], "main"],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "rgba(255, 243, 235, 0.24)",
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 3.4, 7, 5.4],
      "line-opacity": 0.5
    }
  });

  routeMapInstance.addLayer({
    id: "route-map-main-glow",
    type: "line",
    source: "route-map-segments",
    filter: ["==", ["get", "kind"], "main"],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": segmentColorExpression,
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 7.6, 7, 11.4],
      "line-opacity": ["*", segmentOpacityExpression, 0.28],
      "line-blur": 8
    }
  });

  routeMapInstance.addLayer({
    id: "route-map-main-active",
    type: "line",
    source: "route-map-segments",
    filter: ["==", ["get", "kind"], "main"],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": segmentColorExpression,
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 3.8, 7, 5.8],
      "line-opacity": segmentOpacityExpression
    }
  });

  routeMapInstance.addLayer({
    id: "route-map-branch-base",
    type: "line",
    source: "route-map-segments",
    filter: ["==", ["get", "kind"], "branch"],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "rgba(255, 243, 235, 0.18)",
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 2.2, 7, 3.4],
      "line-opacity": 0.52,
      "line-dasharray": [0.4, 1.7]
    }
  });

  routeMapInstance.addLayer({
    id: "route-map-branch-active",
    type: "line",
    source: "route-map-segments",
    filter: ["==", ["get", "kind"], "branch"],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": segmentColorExpression,
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 2.7, 7, 3.9],
      "line-opacity": ["*", segmentOpacityExpression, 0.94],
      "line-dasharray": [0.35, 1.75]
    }
  });
}

function buildRouteMapPopupContent(stopKey) {
  const language = root.lang === "ja" ? "ja" : "en";
  const stop = routeMapStops[stopKey];

  return `
    <p class="route-map__popup-title">${stop.title[language]}</p>
    <p class="route-map__popup-meta">${stop.subtitle[language]}</p>
  `;
}

function getPreferredDayForStop(stopKey) {
  const config = routeStopProgressConfig[stopKey];
  if (!config) {
    return 1;
  }

  const relevantDays = config.days.filter((day) => optionalDaysUnlocked || Number(day) <= 7);
  const incompleteUnlockedDay = relevantDays.find(
    (day) => unlockedDays.has(day) && !completedDays.has(day)
  );
  if (incompleteUnlockedDay) {
    return Number(incompleteUnlockedDay);
  }

  const currentDay = relevantDays.find((day) => day === String(currentProgressDay));
  if (currentDay) {
    return Number(currentDay);
  }

  const latestUnlockedDay = [...relevantDays].reverse().find((day) => unlockedDays.has(day));
  return Number(latestUnlockedDay || relevantDays[0] || 1);
}

function getRouteMapStopState(stopKey) {
  const config = routeStopProgressConfig[stopKey];
  const relevantDays = config.days.filter((day) => optionalDaysUnlocked || Number(day) <= 7);
  const isComplete = relevantDays.length > 0 && relevantDays.every((day) => completedDays.has(day));
  const isCurrent = stopKey === routeDayToStopKey[getCurrentProgressDay()];
  const isWarning = relevantDays.some((day) => warningDays.has(day));
  const isUnlocked = relevantDays.some((day) => unlockedDays.has(day));
  const hasProgress = relevantDays.some((day) => {
    const dayCard = dayCardMap.get(day);
    return dayCard ? getDayCompletionRatio(dayCard) > 0 : false;
  });

  return {
    isComplete,
    isCurrent,
    isWarning,
    isUnlocked,
    hasProgress
  };
}

function createRouteMapMarkers(maplibregl) {
  if (!routeMapInstance) {
    return;
  }

  routeMapMarkers.forEach(({ marker }) => marker.remove());
  routeMapMarkers = new Map();

  Object.entries(routeMapStops).forEach(([stopKey, stop]) => {
    const markerElement = document.createElement("button");
    markerElement.type = "button";
    markerElement.className = "route-map__marker";
    markerElement.setAttribute("aria-label", stop.title[root.lang === "ja" ? "ja" : "en"]);

    const popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 18,
      className: "route-map__popup"
    });

    const marker = new maplibregl.Marker({
      element: markerElement,
      anchor: "center"
    })
      .setLngLat(stop.coordinates)
      .addTo(routeMapInstance);

    const showPopup = () => {
      markerElement.classList.add("is-hovered");
      popup
        .setLngLat(stop.coordinates)
        .setHTML(buildRouteMapPopupContent(stopKey))
        .addTo(routeMapInstance);
    };

    const hidePopup = () => {
      markerElement.classList.remove("is-hovered");
      popup.remove();
    };

    markerElement.addEventListener("mouseenter", showPopup);
    markerElement.addEventListener("mouseleave", hidePopup);
    markerElement.addEventListener("focus", showPopup);
    markerElement.addEventListener("blur", hidePopup);
    markerElement.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const targetDay = getPreferredDayForStop(stopKey);
      if (targetDay > accessibleDay || !unlockedDays.has(String(targetDay))) {
        showSequenceNotice(accessibleDay);
        return;
      }

      hidePopup();
      scrollToChecklistDay(targetDay);
    });

    markerElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        markerElement.click();
      }
    });

    routeMapMarkers.set(stopKey, { marker, markerElement, popup });
  });
}

function fitRouteMapBounds(animate = false) {
  if (!routeMapInstance || !window.maplibregl) {
    return;
  }

  const bounds = new window.maplibregl.LngLatBounds();
  Object.values(routeMapStops).forEach((stop) => bounds.extend(stop.coordinates));

  routeMapInstance.fitBounds(bounds, {
    padding: { top: 36, right: 34, bottom: 40, left: 34 },
    duration: animate ? 780 : 0,
    maxZoom: 6.25
  });
}

function setRouteMapInteractive(isInteractive) {
  routeMapInteractive = Boolean(isInteractive);
  routeMapDragArmed = false;
  routeMapDragPointerId = null;

  routeMapSurface?.classList.toggle("is-interactive", routeMapInteractive);
  routeMapPanel?.parentElement?.classList.toggle("is-map-interactive", routeMapInteractive);

  if (!routeMapInstance) {
    return;
  }

  if (routeMapInteractive) {
    routeMapInstance.scrollZoom.enable();
    routeMapInstance.dragPan.enable();
    routeMapInstance.boxZoom.enable();
    routeMapInstance.doubleClickZoom.enable();
    routeMapInstance.keyboard.enable();
    routeMapInstance.touchZoomRotate.enable();
    routeMapInstance.touchZoomRotate.disableRotation();
    return;
  }

  routeMapInstance.scrollZoom.disable();
  routeMapInstance.dragPan.disable();
  routeMapInstance.boxZoom.disable();
  routeMapInstance.doubleClickZoom.disable();
  routeMapInstance.keyboard.disable();
  routeMapInstance.touchZoomRotate.disable();
}

function armRouteMapDrag(pointerId = null) {
  routeMapDragArmed = true;
  routeMapDragPointerId = pointerId;

  if (!routeMapInstance || routeMapInteractive) {
    return;
  }

  routeMapInstance.dragPan.enable();
  routeMapInstance.touchZoomRotate.enable();
  routeMapInstance.touchZoomRotate.disableRotation();
}

function disarmRouteMapDrag(pointerId = null) {
  if (!routeMapDragArmed) {
    return;
  }

  if (pointerId !== null && routeMapDragPointerId !== null && routeMapDragPointerId !== pointerId) {
    return;
  }

  routeMapDragArmed = false;
  routeMapDragPointerId = null;

  if (!routeMapInstance || routeMapInteractive) {
    return;
  }

  routeMapInstance.dragPan.disable();
  routeMapInstance.touchZoomRotate.disable();
}

function syncRouteMapState() {
  if (!routeMapInstance) {
    updateRouteMapToggleLabel();
    renderRouteMapStatus();
    return;
  }

  const source = routeMapInstance.getSource("route-map-segments");
  if (source) {
    source.setData(buildRouteMapFeatureCollection());
  }

  routeMapMarkers.forEach(({ markerElement, popup }, stopKey) => {
    const { isComplete, isCurrent, isWarning, isUnlocked, hasProgress } = getRouteMapStopState(stopKey);
    const language = root.lang === "ja" ? "ja" : "en";
    const stop = routeMapStops[stopKey];

    markerElement.classList.toggle("is-complete", isComplete);
    markerElement.classList.toggle("is-current", isCurrent);
    markerElement.classList.toggle("is-warning", isWarning);
    markerElement.classList.toggle("is-locked", !isUnlocked);
    markerElement.classList.toggle("is-progress", hasProgress && !isComplete && !isWarning);
    markerElement.setAttribute("aria-label", stop.title[language]);

    if (popup.isOpen()) {
      popup.setHTML(buildRouteMapPopupContent(stopKey));
    }
  });

  updateRouteMapToggleLabel();
  renderRouteMapStatus();
}

function refreshRouteMapTheme() {
  if (!routeMapInstance || !window.maplibregl) {
    return;
  }

  const currentCenter = routeMapInstance.getCenter();
  const currentZoom = routeMapInstance.getZoom();
  const currentBearing = routeMapInstance.getBearing();
  const currentPitch = routeMapInstance.getPitch();

  routeMapInstance.once("style.load", () => {
    addRouteMapLayers();
    createRouteMapMarkers(window.maplibregl);
    routeMapInstance.jumpTo({
      center: currentCenter,
      zoom: currentZoom,
      bearing: currentBearing,
      pitch: currentPitch
    });
    syncRouteMapState();
  });

  routeMapInstance.setStyle(buildRouteMapStyle());
}

async function initializeRouteMap() {
  if (!routeMapCanvas) {
    return null;
  }

  if (routeMapInstance) {
    return routeMapInstance;
  }

  if (routeMapInitializationPromise) {
    return routeMapInitializationPromise;
  }

  routeMapStatusMode = "loading";
  renderRouteMapStatus();

  routeMapInitializationPromise = ensureRouteMapAssets()
    .then((maplibregl) => new Promise((resolve, reject) => {
      let didSettle = false;

      const settleSuccess = () => {
        if (didSettle) {
          return false;
        }

        didSettle = true;
        window.clearTimeout(loadTimeoutId);
        return true;
      };

      const settleError = (error) => {
        if (didSettle) {
          return;
        }

        didSettle = true;
        window.clearTimeout(loadTimeoutId);
        routeMapStatusMode = "error";
        renderRouteMapStatus();
        reject(error);
      };

      const loadTimeoutId = window.setTimeout(() => {
        settleError(new Error("Map load timed out."));
      }, routeMapLoadTimeoutMs);

      routeMapInstance = new maplibregl.Map({
        container: routeMapCanvas,
        style: buildRouteMapStyle(),
        center: [137.52, 35.21],
        zoom: 5.25,
        minZoom: 4.65,
        maxZoom: 9,
        attributionControl: false,
        dragRotate: false,
        preserveDrawingBuffer: false
      });

      routeMapInstance.addControl(
        new maplibregl.AttributionControl({ compact: true }),
        "bottom-right"
      );
      routeMapInstance.addControl(
        new maplibregl.NavigationControl({
          showCompass: false,
          visualizePitch: false
        }),
        "top-right"
      );
      routeMapInstance.dragRotate.disable();
      routeMapInstance.touchZoomRotate.disableRotation();
      setRouteMapInteractive(false);
      routeMapInstance.on("dragstart", () => {
        if (!routeMapInteractive) {
          setRouteMapInteractive(true);
        }
      });

      routeMapInstance.once("load", async () => {
        try {
          routeMapSegments = await loadRouteMapSegments();
          addRouteMapLayers();
          createRouteMapMarkers(maplibregl);
          fitRouteMapBounds();
          syncRouteMapState();
          if (!settleSuccess()) {
            return;
          }
          resolve(routeMapInstance);
        } catch (error) {
          settleError(error);
        }
      });
    }))
    .catch((error) => {
      if (routeMapInstance) {
        routeMapInstance.remove();
      }

      routeMapInitializationPromise = null;
      routeMapInstance = null;
      routeMapStatusMode = "error";
      renderRouteMapStatus();
      throw error;
    });

  return routeMapInitializationPromise;
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

function syncDayCardRowHeights() {
  dayGrids.forEach((grid) => {
    const visibleCards = Array.from(grid.querySelectorAll(".day-card")).filter(
      (card) => !card.hidden && card.getClientRects().length
    );

    visibleCards.forEach((card) => {
      card.style.minHeight = "";
    });

    const rows = [];

    visibleCards.forEach((card) => {
      const top = card.offsetTop;
      const matchingRow = rows.find((row) => Math.abs(row.top - top) <= 4);

      if (matchingRow) {
        matchingRow.cards.push(card);
        return;
      }

      rows.push({ top, cards: [card] });
    });

    rows.forEach((row) => {
      const tallestCard = Math.max(...row.cards.map((card) => card.getBoundingClientRect().height));
      row.cards.forEach((card) => {
        card.style.minHeight = `${Math.ceil(tallestCard)}px`;
      });
    });
  });
}

function scheduleDayCardRowHeights() {
  if (dayCardRowEqualizeFrame) {
    window.cancelAnimationFrame(dayCardRowEqualizeFrame);
  }

  dayCardRowEqualizeFrame = window.requestAnimationFrame(() => {
    dayCardRowEqualizeFrame = window.requestAnimationFrame(() => {
      dayCardRowEqualizeFrame = 0;
      syncDayCardRowHeights();
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

    scrollProgressTimelineToActive(true);
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

function setResetModalOpen(isOpen) {
  if (!resetProgressModal) {
    return;
  }

  resetProgressModal.hidden = !isOpen;
  root.classList.toggle("has-modal-open", isOpen);

  if (isOpen) {
    window.requestAnimationFrame(() => {
      resetProgressCancelButton?.focus();
    });
  } else {
    lastResetTrigger?.focus();
  }
}

function resetTripProgress() {
  checklistInputs.forEach((input) => {
    input.checked = false;
  });

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

  window.clearTimeout(sequenceNoticeTimer);
  if (sequenceNotice) {
    sequenceNotice.hidden = true;
    sequenceNotice.classList.remove("is-visible");
  }

  setOptionalPromptFeedback(false);
  setOptionalPromptButtonsDisabled(false);
  refreshChecklistProgressState();
  syncProgressTimeline();
  syncRouteMapState();
  setActivePanel("checklist");
  setResetModalOpen(false);

  window.requestAnimationFrame(() => {
    scrollToChecklistDay(1);
  });
}

function resolveLengthValue(value, rootFontSize) {
  const trimmedValue = String(value || "").trim();
  if (!trimmedValue) {
    return 0;
  }

  if (trimmedValue.endsWith("rem")) {
    return Number.parseFloat(trimmedValue) * rootFontSize;
  }

  if (trimmedValue.endsWith("px")) {
    return Number.parseFloat(trimmedValue);
  }

  return Number.parseFloat(trimmedValue) || 0;
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

  const rootFontSize =
    Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize || "16") || 16;
  const timelineStyles = window.getComputedStyle(progressTimeline);
  const nodeTop = resolveLengthValue(timelineStyles.getPropertyValue("--timeline-node-top"), rootFontSize);
  const nodeSize = resolveLengthValue(
    timelineStyles.getPropertyValue("--timeline-node-size"),
    rootFontSize
  );
  const linkOverlap = resolveLengthValue(
    timelineStyles.getPropertyValue("--timeline-link-overlap"),
    rootFontSize
  );
  const fillStart = nodeTop + nodeSize - linkOverlap;
  const fillEnd = anchorItem.offsetTop + nodeTop + linkOverlap;
  const fillHeight = Math.max(fillEnd - fillStart, 0);

  progressTimeline.style.setProperty("--timeline-spine-fill", `${fillHeight}px`);
}

function scrollProgressTimelineToActive(force = false) {
  if (!progressTimeline) {
    return;
  }

  const timelineStyles = window.getComputedStyle(progressTimeline);
  if (!["auto", "scroll"].includes(timelineStyles.overflowY)) {
    lastTimelineFocusDay = null;
    return;
  }

  const activeItem = progressTimeline.querySelector(".progress-item.is-active");
  if (!activeItem) {
    return;
  }

  const activeDay = activeItem.dataset.progressItem;
  if (!force && lastTimelineFocusDay === activeDay) {
    return;
  }

  lastTimelineFocusDay = activeDay;

  if (progressTimeline.scrollHeight <= progressTimeline.clientHeight + 8) {
    progressTimeline.scrollTop = 0;
    return;
  }

  const nextTop =
    activeItem.offsetTop - progressTimeline.clientHeight * 0.28 + activeItem.offsetHeight * 0.5;

  progressTimeline.scrollTo({
    top: Math.max(nextTop, 0),
    behavior: getScrollBehavior()
  });
}

function updateRouteProgress() {
  const routeDoc = routeMedia?.contentDocument;
  if (!routeDoc) {
    return;
  }

  const currentStopKey = routeDayToStopKey[getCurrentProgressDay()];

  Object.entries(routeStopProgressConfig).forEach(([stopKey, config]) => {
    const stop = routeDoc.getElementById(config.stopId);
    if (!stop) {
      return;
    }

    const relevantDays = config.days.filter((day) => optionalDaysUnlocked || Number(day) <= 7);
    const completedCount = relevantDays.filter((day) => completedDays.has(day)).length;
    const ratio = relevantDays.length ? completedCount / relevantDays.length : 0;
    const progressRing = stop.querySelector(".node-progress");
    const progressTrack = stop.querySelector(".node-progress-track");
    const circumference = Number(progressRing?.dataset.circumference || "0");
    const isUnlocked = relevantDays.some((day) => unlockedDays.has(day));
    const isWarning = relevantDays.some((day) => warningDays.has(day));

    stop.classList.toggle("has-progress", ratio > 0);
    stop.classList.toggle("is-complete", ratio >= 1);
    stop.classList.toggle("is-current", stopKey === currentStopKey);
    stop.classList.toggle("is-locked", !isUnlocked);
    stop.classList.toggle("is-warning", isWarning);

    if (progressTrack) {
      progressTrack.style.opacity = ratio > 0 || stopKey === currentStopKey || isUnlocked ? "1" : "0.28";
    }

    if (progressRing && circumference) {
      progressRing.style.opacity = ratio > 0 ? "1" : "0";
      progressRing.style.strokeDashoffset = `${circumference * (1 - ratio)}`;
    }
  });

  Object.entries(routeSegmentConfig).forEach(([segmentId, requiredDays]) => {
    const segment = routeDoc.getElementById(segmentId);
    if (!segment) {
      return;
    }

    const isComplete = requiredDays.every((day) => completedDays.has(day));
    segment.classList.toggle("is-complete", isComplete);
  });
}

function refreshChecklistProgressState() {
  const {
    rawCompleted,
    completedHistory,
    unlockedDays: nextUnlockedDays,
    warningDays: nextWarningDays,
    accessibleDay: nextAccessibleDay,
    currentDay: nextCurrentDay
  } = getJourneyState();

  dayCards.forEach((card) => {
    const progressRatio = getDayCompletionRatio(card);
    const dayKey = card.dataset.day;
    const day = Number(card.dataset.day);
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
  updateRouteProgress();
  syncRouteMapState();
}

function celebrateCompletedDay(day) {
  animateCompletion(dayCardMap.get(String(day)));
  animateCompletion(progressItemMap.get(String(day)));
  animateRouteTargets(day);

  if (Number(day) === 7) {
    animateUnlock(progressItemMap.get("8"));
    animateUnlock(dayCardMap.get("8"));
  }

  if (Number(day) === 8) {
    animateUnlock(progressItemMap.get("9"));
    animateUnlock(dayCardMap.get("9"));
  }
}

function animateRouteTargets(day) {
  const routeDoc = routeMedia?.contentDocument;
  if (!routeDoc) {
    return;
  }

  const stopKey = routeDayToStopKey[Number(day)];
  if (stopKey) {
    const routeStop = routeDoc.getElementById(routeStopProgressConfig[stopKey]?.stopId || "");
    if (routeStop) {
      routeStop.classList.remove("is-celebrating");
      void routeStop.getBoundingClientRect();
      routeStop.classList.add("is-celebrating");
      window.setTimeout(() => {
        routeStop.classList.remove("is-celebrating");
      }, 920);
    }
  }

  Object.entries(routeSegmentConfig).forEach(([segmentId, requiredDays]) => {
    if (!requiredDays.includes(String(day))) {
      return;
    }

    const segment = routeDoc.getElementById(segmentId);
    if (!segment) {
      return;
    }

    segment.classList.remove("is-celebrating");
    void segment.getBoundingClientRect();
    segment.classList.add("is-celebrating");
    window.setTimeout(() => {
      segment.classList.remove("is-celebrating");
    }, 920);
  });
}

function scrollToChecklistDay(day) {
  const targetCard = dayCardMap.get(String(day));
  if (!targetCard) {
    return;
  }

  lockHeaderState(420);
  setActivePanel("checklist");

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      const targetTop =
        targetCard.getBoundingClientRect().top + window.scrollY - reservedHeaderHeight - 24;

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: getScrollBehavior()
      });

      targetCard.classList.remove("is-route-target");
      void targetCard.getBoundingClientRect();
      targetCard.classList.add("is-route-target");
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

function bindRouteInteractions() {
  if (!routeMedia?.contentDocument?.documentElement) {
    return;
  }

  const routeRoot = routeMedia.contentDocument.documentElement;
  applyRouteTheme();
  if (routeRoot.dataset.interactionsBound === "1") {
    updateRouteProgress();
    return;
  }

  routeRoot.dataset.interactionsBound = "1";

  routeMedia.contentDocument.querySelectorAll("[data-scroll-day]").forEach((stop) => {
    const activateStop = (event) => {
      event.preventDefault();
      event.stopPropagation();

      const targetDay = Number(stop.dataset.scrollDay);
      if (targetDay > accessibleDay) {
        showSequenceNotice(accessibleDay);
        return;
      }

      scrollToChecklistDay(stop.dataset.scrollDay);
    };

    stop.addEventListener("click", activateStop);
    stop.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        activateStop(event);
      }
    });
  });

  updateRouteProgress();
}

function setLanguage(language) {
  const nextLanguage = language === "ja" ? "ja" : "en";

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
  window.requestAnimationFrame(() => syncReservedHeaderHeight(false));

  languageButtons.forEach((button) => {
    const isActive = button.dataset.setLanguage === nextLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  storeLanguage(nextLanguage);
  refreshChecklistProgressState();
  syncProgressTimeline();
  syncRouteMapState();
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
  applyRouteTheme();

  if (persist) {
    storeThemePreference(nextTheme);
  }

  if (routeMapInstance) {
    refreshRouteMapTheme();
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

function setActivePanel(panelId) {
  let hasMatch = false;

  contentPanels.forEach((panel) => {
    const isActive = panel.dataset.panel === panelId;
    panel.classList.toggle("is-active", isActive);
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

    refreshRevealPanel(panelId);
    syncProgressTimeline();
    scheduleDayCardRowHeights();
    if (
      panelId === "route" &&
      routeMapInstance &&
      routeMapToggle?.getAttribute("aria-expanded") === "true"
    ) {
      window.requestAnimationFrame(() => {
        routeMapInstance.resize();
        fitRouteMapBounds();
      });
    }
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
  window.requestAnimationFrame(() => {
    updateTimelineSpine();
    scrollProgressTimelineToActive();
  });
}

function syncParallax() {
  const shift = Math.min(window.scrollY * 0.085, 60);
  const sunShift = Math.min(window.scrollY * 0.032, 28);
  const mistShift = Math.min(window.scrollY * 0.022, 20);
  const fujiShift = Math.min(window.scrollY * 0.014, 14);
  root.style.setProperty("--parallax-shift", `${shift}px`);
  root.style.setProperty("--sun-shift", `${sunShift}px`);
  root.style.setProperty("--mist-shift", `${mistShift}px`);
  root.style.setProperty("--fuji-shift", `${fujiShift}px`);
}

function registerRevealBlocks() {
  const revealBlocks = Array.from(
    document.querySelectorAll(
      ".hero-panel, .trip-stats, .progress-card, .content-section .section-heading, .essentials-grid, .day-grid, .notes-grid, [data-optional-section], .route-map, .journey-close, .site-footer__lead, .site-footer__links, .site-footer__credit"
    )
  );

  revealBlocks.forEach((block, index) => {
    block.classList.add("reveal-block");
    block.style.setProperty("--reveal-delay", `${Math.min(index, 6) * 60}ms`);
  });

  if (!("IntersectionObserver" in window)) {
    revealBlocks.forEach((block) => block.classList.add("is-visible"));
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

  revealBlocks.forEach((block) => revealObserver.observe(block));
}

function refreshRevealPanel(panelId) {
  const activePanel = Array.from(contentPanels).find((panel) => panel.dataset.panel === panelId);
  if (!activePanel) {
    return;
  }

  const panelBlocks = activePanel.querySelectorAll(".reveal-block");
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

decorateProgressTimeline();
completedHistoryDays = readStoredDaySet(completedHistoryStorageKey);
optionalDaysUnlocked = readStoredBoolean(optionalDaysUnlockedStorageKey);
syncOptionalDaysUI();
applyTheme(readStoredThemePreference() || getCurrentTheme(), { persist: false });
setLanguage(readStoredLanguage());
restoreChecklistState();
refreshChecklistProgressState();

registerRevealBlocks();
setActivePanel("overview");
setActiveProgressItem(getCurrentProgressDay());
syncParallax();
syncProgressTimeline();
updateRouteMapToggleLabel();
renderRouteMapStatus();
scheduleDayCardRowHeights();

if (document.fonts?.ready) {
  document.fonts.ready.then(() => {
    scheduleDayCardRowHeights();
  });
}

dayCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    const day = Number(card.dataset.day);
    if (day <= accessibleDay) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    showSequenceNotice(accessibleDay);
  });
});

checklistInputs.forEach((input) => {
  input.addEventListener("change", () => {
    const dayCard = input.closest(".day-card[data-day]");
    const day = dayCard?.dataset.day;
    const wasComplete = day ? completedDays.has(day) : false;
    const previousUnlockedDays = new Set(unlockedDays);
    const previousCurrentDay = String(currentProgressDay);

    storeChecklistState();
    refreshChecklistProgressState();
    syncProgressTimeline();

    Array.from(unlockedDays)
      .filter((unlockedDay) => !previousUnlockedDays.has(unlockedDay))
      .forEach((unlockedDay) => {
        animateUnlock(progressItemMap.get(unlockedDay));
        animateUnlock(dayCardMap.get(unlockedDay));
      });

    if (String(currentProgressDay) !== previousCurrentDay) {
      window.requestAnimationFrame(() => {
        scrollProgressTimelineToActive(true);
      });
    }

    if (
      day &&
      !wasComplete &&
      completedDays.has(day)
    ) {
      celebrateCompletedDay(day);
    }
  });
});

sectionTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    lockHeaderState(520);
    setActivePanel(tab.dataset.panelTarget);
    scrollToPanelStart(tab.dataset.panelTarget);
  });
});

footerPanelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const panelId = button.dataset.footerPanelTarget;
    lockHeaderState(520);
    if (setActivePanel(panelId)) {
      scrollToPanelStart(panelId);
    }
  });
});

if (routeMapToggle) {
  routeMapToggle.addEventListener("click", () => {
    const nextOpen = routeMapToggle.getAttribute("aria-expanded") !== "true";
    setRouteMapOpen(nextOpen);
  });
}

if (routeMapSurface) {
  routeMapSurface.addEventListener(
    "pointerdown",
    (event) => {
      if (event.button !== 0 || !event.isPrimary || routeMapInteractive) {
        return;
      }

      armRouteMapDrag(event.pointerId);
    },
    { capture: true }
  );

  routeMapSurface.addEventListener("pointerup", (event) => {
    if (!routeMapInteractive) {
      disarmRouteMapDrag(event.pointerId);
    }
  });

  routeMapSurface.addEventListener("pointercancel", (event) => {
    if (!routeMapInteractive) {
      disarmRouteMapDrag(event.pointerId);
    }
  });

  routeMapSurface.addEventListener("pointerleave", (event) => {
    if (routeMapInteractive) {
      if (event.buttons !== 0) {
        return;
      }

      setRouteMapInteractive(false);
      return;
    }

    if (event.buttons === 0) {
      disarmRouteMapDrag();
    }
  });
}

if (jumpCurrentDayButton) {
  jumpCurrentDayButton.addEventListener("click", () => {
    scrollToChecklistDay(getCurrentProgressDay());
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

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && routeMapInteractive) {
    setRouteMapInteractive(false);
    return;
  }

  if (event.key === "Escape" && resetProgressModal && !resetProgressModal.hidden) {
    setResetModalOpen(false);
  }
});

document.addEventListener("pointerdown", (event) => {
  if (!routeMapInteractive || !routeMapSurface) {
    return;
  }

  if (!routeMapSurface.contains(event.target)) {
    setRouteMapInteractive(false);
  }
});

document.addEventListener("pointerup", (event) => {
  if (routeMapInteractive && routeMapSurface && !routeMapSurface.contains(event.target)) {
    setRouteMapInteractive(false);
    return;
  }

  if (!routeMapInteractive) {
    disarmRouteMapDrag(event.pointerId);
  }
});

document.addEventListener("pointercancel", (event) => {
  if (routeMapInteractive) {
    setRouteMapInteractive(false);
    return;
  }

  if (!routeMapInteractive) {
    disarmRouteMapDrag(event.pointerId);
  }
});

if (root.classList.contains("is-welcoming")) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.setTimeout(finishWelcome, prefersReducedMotion ? 60 : 2100);
} else if (welcomeOverlay) {
  welcomeOverlay.setAttribute("hidden", "");
}

if (routeMedia) {
  routeMedia.addEventListener("load", bindRouteInteractions);
  window.requestAnimationFrame(() => {
    bindRouteInteractions();
  });
}

function syncHeaderState() {
  if (!siteHeader) {
    scrollTicking = false;
    return;
  }

  const currentScrollY = window.scrollY;
  if (window.performance.now() < headerLockUntil) {
    lastScrollY = currentScrollY;
    return;
  }

  const delta = currentScrollY - lastScrollY;

  if (currentScrollY <= 36 || delta < -8) {
    siteHeader.classList.remove("is-condensed");
  } else if (currentScrollY > 150 && delta > 8) {
    siteHeader.classList.add("is-condensed");
  }

  lastScrollY = currentScrollY;
}

function runScrollEffects() {
  syncHeaderState();
  syncParallax();
  scrollTicking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (routeMapInteractive) {
      setRouteMapInteractive(false);
    }

    if (scrollTicking) {
      return;
    }

    scrollTicking = true;
    window.requestAnimationFrame(runScrollEffects);
  },
  { passive: true }
);

if (siteHeader) {
  syncReservedHeaderHeight(true);

  if ("ResizeObserver" in window) {
    const headerObserver = new window.ResizeObserver(() => {
      if (siteHeader.classList.contains("is-condensed")) {
        return;
      }

      window.requestAnimationFrame(() => {
        syncReservedHeaderHeight(true);
      });
    });

    headerObserver.observe(siteHeader);
  }

  window.addEventListener("resize", () => {
    const wasCondensed = siteHeader.classList.contains("is-condensed");
    siteHeader.classList.remove("is-condensed");
    syncReservedHeaderHeight(true);
    if (wasCondensed && window.scrollY > 150) {
      siteHeader.classList.add("is-condensed");
    }
    syncParallax();
    syncProgressTimeline();
    scheduleDayCardRowHeights();
    if (routeMapInstance && routeMapToggle?.getAttribute("aria-expanded") === "true") {
      routeMapInstance.resize();
      fitRouteMapBounds();
    }
    lockHeaderState(220);
  });
}
