const languageButtons = document.querySelectorAll("[data-set-language]");
const themeButtons = document.querySelectorAll("[data-set-theme]");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const sectionTabs = Array.from(document.querySelectorAll("[data-panel-target]"));
const contentPanels = Array.from(document.querySelectorAll("[data-panel]"));
const siteHeader = document.querySelector(".site-header");
const welcomeOverlay = document.querySelector(".welcome-overlay");
const sequenceNotice = document.querySelector("[data-sequence-notice]");
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
const bookingTransitRoot = document.querySelector("[data-booking-transit]");
const bookingTransitGroupsRoot = document.querySelector("[data-booking-transit-groups]");
const bookingTransitLoadingState = document.querySelector("[data-booking-loading]");
const bookingTransitErrorState = document.querySelector("[data-booking-error]");
const bookingTransitEmptyState = document.querySelector("[data-booking-empty]");
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
const introSeenSessionKey = "japan-trip-intro-seen";
const queuedStorageWrites = new Map();
const bookingTransitItemsDataUrl = "./assets/data/booking-transit-items.json";
const revealBlockSelector =
  ".hero-panel, .trip-stats, .progress-card, .content-section .section-heading, .essentials-grid, .day-grid, .notes-grid, [data-optional-section], .route-map, .journey-close, .site-footer__lead, .site-footer__aside, .site-footer__credit";
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
let bookingTransitItems = [];
let bookingTransitItemMap = new Map();
let checklistState = {};
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
let lastResetTrigger = null;
let storageWriteFlushTimer = 0;
let storageWriteIdleHandle = 0;
let bookingTransitState = { filter: "all", items: {} };
let bookingTransitInitialized = false;
let bookingTransitItemsPromise = null;
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
  return `<span data-language="en">${content.en}</span><span data-language="ja" hidden>${content.ja}</span>`;
}

function renderBookingTransitItem(item) {
  const state = getBookingTransitItemState(item.id);

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
          <div class="booking-item__actions">
            <a
              class="booking-item__cta booking-item__cta--primary"
              href="${item.action.href}"
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

    itemElement.dataset.bookingBound = "true";
  });
}

function initializeBookingTransit() {
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
  bookingTransitState = { filter: "all", items: {} };
  storeBookingTransitState();
  if (bookingTransitRoot && bookingTransitInitialized) {
    renderBookingTransitBoard();
    bindBookingTransitUI();
    updateBookingTransitUI();
  }
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

  window.setTimeout(() => {
    root.classList.add("intro-out");
    window.setTimeout(finishWelcome, 460);
  }, 80);
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
  const dayCard = event.target.closest(".day-card[data-day]");
  if (!dayCard) {
    return;
  }

  const day = Number(dayCard.dataset.day);
  if (day <= accessibleDay) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  showSequenceNotice(accessibleDay);
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
    window.requestAnimationFrame(() => {
      scrollProgressTimelineToActive(true);
    });
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

function animateCompletion(target) {
  if (!target || aggressivePerformanceMode || reducedEffectsEnabled) {
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
  if (!target || aggressivePerformanceMode || reducedEffectsEnabled) {
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
  if (!reducedEffectsEnabled) {
    void sequenceNotice.getBoundingClientRect();
  }
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
  checklistState = {};

  if (initializedSections.has("checklist")) {
    checklistInputs.forEach((input) => {
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
  window.requestAnimationFrame(() => syncReservedHeaderHeight(false));

  languageButtons.forEach((button) => {
    const isActive = button.dataset.setLanguage === nextLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

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
  window.requestAnimationFrame(() => {
    updateTimelineSpine();
    scrollProgressTimelineToActive();
  });
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
  setLanguage(readStoredLanguage());

  const siteFooter = document.querySelector(".site-footer");
  if (siteFooter) {
    registerRevealBlocks(siteFooter);
  }

  const initialPanelId = getInitialPanelId();
  setActivePanel(initialPanelId);
  await ensureSectionInitialized(initialPanelId);
  syncProgressTimeline();
  scheduleIdleSectionWarmup(initialPanelId);

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

[reducedMotionQuery, coarsePointerQuery, compactViewportQuery].forEach((query) => {
  bindMediaQueryChange(query, () => {
    syncReducedEffectsMode({ force: true });
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && resetProgressModal && !resetProgressModal.hidden) {
    setResetModalOpen(false);
  }
});

if (root.classList.contains("intro-pending")) {
  scheduleWelcomeExit();
} else if (welcomeOverlay) {
  welcomeOverlay.setAttribute("hidden", "");
}

function syncHeaderState() {
  const currentScrollY = window.scrollY;
  const delta = currentScrollY - lastScrollY;

  if (!siteHeader) {
    lastScrollY = currentScrollY;
    scrollTicking = false;
    return;
  }

  if (window.performance.now() < headerLockUntil) {
    lastScrollY = currentScrollY;
    return;
  }

  if (currentScrollY <= 36 || delta < -8) {
    siteHeader.classList.remove("is-condensed");
  } else if (currentScrollY > 150 && delta > 8) {
    siteHeader.classList.add("is-condensed");
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
    syncReducedEffectsMode();
    const wasCondensed = siteHeader.classList.contains("is-condensed");
    siteHeader.classList.remove("is-condensed");
    syncReservedHeaderHeight(true);
    if (wasCondensed && window.scrollY > 150) {
      siteHeader.classList.add("is-condensed");
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
