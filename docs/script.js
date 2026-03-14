const languageButtons = document.querySelectorAll("[data-set-language]");
const localizedNodes = document.querySelectorAll("[data-language]");
const ariaLabelNodes = document.querySelectorAll("[data-aria-label-en][data-aria-label-ja]");
const altTextNodes = document.querySelectorAll("[data-alt-en][data-alt-ja]");
const sourceNodes = document.querySelectorAll("[data-src-en][data-src-ja]");
const sectionTabs = document.querySelectorAll("[data-panel-target]");
const contentPanels = document.querySelectorAll("[data-panel]");
const siteHeader = document.querySelector(".site-header");
const welcomeOverlay = document.querySelector(".welcome-overlay");
const sequenceNotice = document.querySelector("[data-sequence-notice]");
const routeMedia = document.querySelector(".route-reference__media");
const dayCards = Array.from(document.querySelectorAll(".day-card[data-day]"));
const checklistInputs = Array.from(document.querySelectorAll('.day-card input[type="checkbox"]'));
const progressItems = Array.from(document.querySelectorAll("[data-progress-item]"));
const progressTimeline = document.querySelector("[data-progress-timeline]");
const progressCurrentDayNode = document.querySelector("[data-progress-current-day]");
const progressTotalDaysNode = document.querySelector("[data-progress-total-days]");
const progressOverviewFill = document.querySelector("[data-progress-overview-fill]");
const progressOverviewCaptions = document.querySelectorAll(".progress-overview__caption [data-language]");
const jumpCurrentDayButton = document.querySelector("[data-jump-current-day]");
const optionalPrompt = document.querySelector("[data-optional-prompt]");
const optionalPromptExpanded = document.querySelector("[data-optional-prompt-expanded]");
const optionalPromptCompact = document.querySelector("[data-optional-prompt-compact]");
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
const welcomeStorageKey = "japan-trip-welcome-seen";
const checklistStorageKey = "japan-trip-checklist-state";
const completedHistoryStorageKey = "japan-trip-completed-history";
const optionalDaysUnlockedStorageKey = "japan-trip-optional-days-unlocked";
const routeStopProgressConfig = {
  osaka: { stopId: "route-stop-osaka", days: ["1", "3"] },
  kyoto: { stopId: "route-stop-kyoto", days: ["2"] },
  odawara: { stopId: "route-stop-odawara", days: ["4"] },
  hakone: { stopId: "route-stop-hakone", days: ["4", "5"] },
  fuji: { stopId: "route-stop-fuji", days: ["6"] },
  tokyo: { stopId: "route-stop-tokyo", days: ["7", "8", "9"] }
};
const routeSegmentConfig = {
  "route-progress-kyoto": ["2"],
  "route-progress-odawara": ["4"],
  "route-progress-hakone": ["4"],
  "route-progress-fuji": ["6"],
  "route-progress-tokyo": ["7"]
};
const routeDayToStopKey = {
  1: "osaka",
  2: "kyoto",
  3: "osaka",
  4: "hakone",
  5: "hakone",
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

function storeWelcomeSeen() {
  try {
    window.localStorage.setItem(welcomeStorageKey, "1");
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
  storeWelcomeSeen();
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

  const showPrompt = canOfferOptionalDays && !optionalDaysUnlocked;
  optionalPrompt.hidden = !showPrompt;

  if (!showPrompt) {
    optionalPromptIsCompact = false;
  }

  if (optionalPromptExpanded) {
    optionalPromptExpanded.hidden = !showPrompt || optionalPromptIsCompact;
  }

  if (optionalPromptCompact) {
    optionalPromptCompact.hidden = !showPrompt || !optionalPromptIsCompact;
  }
}

function unlockOptionalDays() {
  optionalDaysUnlocked = true;
  optionalPromptIsCompact = false;
  storeBoolean(optionalDaysUnlockedStorageKey, true);
  syncOptionalDaysUI();
  refreshChecklistProgressState();
  syncProgressTimeline();
  animateUnlock(progressItemMap.get("8"));
  animateUnlock(dayCardMap.get("8"));
  window.requestAnimationFrame(() => {
    scrollProgressTimelineToActive(true);
  });
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

  const rootFontSize = Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize || "16") || 16;
  const nodeCenter = anchorItem.offsetTop + (1.08 + 0.71) * rootFontSize;
  progressTimeline.style.setProperty("--timeline-spine-fill", `${Math.max(nodeCenter - 1.18 * rootFontSize, 0)}px`);
}

function scrollProgressTimelineToActive(force = false) {
  if (!progressTimeline) {
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
  if (routeRoot.dataset.interactionsBound === "1") {
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
}

function handleLanguageButtonClick(button) {
  lockHeaderState(280);
  preserveScrollPosition(() => {
    setLanguage(button.dataset.setLanguage);
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
    refreshRevealPanel(panelId);
    syncProgressTimeline();
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
  root.style.setProperty("--parallax-shift", `${shift}px`);
}

function registerRevealBlocks() {
  const revealBlocks = Array.from(
    document.querySelectorAll(
      ".hero-panel, .trip-stats, .progress-card, .section-heading, .day-card, .note-card, .route-reference, .site-footer__lead, .site-footer__links"
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

decorateProgressTimeline();
completedHistoryDays = readStoredDaySet(completedHistoryStorageKey);
optionalDaysUnlocked = readStoredBoolean(optionalDaysUnlockedStorageKey);
syncOptionalDaysUI();
setLanguage(readStoredLanguage());
restoreChecklistState();
refreshChecklistProgressState();

registerRevealBlocks();
setActivePanel("checklist");
setActiveProgressItem(getCurrentProgressDay());
syncParallax();
syncProgressTimeline();

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

if (jumpCurrentDayButton) {
  jumpCurrentDayButton.addEventListener("click", () => {
    scrollToChecklistDay(getCurrentProgressDay());
  });
}

optionalUnlockButtons.forEach((button) => {
  button.addEventListener("click", () => {
    unlockOptionalDays();
  });
});

if (optionalSkipButton) {
  optionalSkipButton.addEventListener("click", () => {
    optionalPromptIsCompact = true;
    syncOptionalDaysUI();
  });
}

if (root.classList.contains("is-welcoming")) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.setTimeout(finishWelcome, prefersReducedMotion ? 60 : 2400);
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
    lockHeaderState(220);
  });
}
