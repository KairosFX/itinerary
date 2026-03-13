const languageButtons = document.querySelectorAll("[data-set-language]");
const localizedNodes = document.querySelectorAll("[data-language]");
const ariaLabelNodes = document.querySelectorAll("[data-aria-label-en][data-aria-label-ja]");
const altTextNodes = document.querySelectorAll("[data-alt-en][data-alt-ja]");
const sourceNodes = document.querySelectorAll("[data-src-en][data-src-ja]");
const sectionTabs = document.querySelectorAll("[data-panel-target]");
const contentPanels = document.querySelectorAll("[data-panel]");
const siteHeader = document.querySelector(".site-header");
const welcomeOverlay = document.querySelector(".welcome-overlay");
const root = document.documentElement;
const pageTitles = {
  en: "Japan Trip | Itinerary",
  ja: "日本旅行 | 旅程"
};
const storageKey = "japan-trip-language";
const welcomeStorageKey = "japan-trip-welcome-seen";
let reservedHeaderHeight = 0;
let headerLockUntil = 0;
let lastScrollY = window.scrollY;
let scrollTicking = false;

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

  return hasMatch;
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleLanguageButtonClick(button);
  });
});

setLanguage(readStoredLanguage());

setActivePanel("checklist");

sectionTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    lockHeaderState(520);
    preserveScrollPosition(() => {
      setActivePanel(tab.dataset.panelTarget);
    });
  });
});

if (root.classList.contains("is-welcoming")) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.setTimeout(finishWelcome, prefersReducedMotion ? 60 : 2600);
} else if (welcomeOverlay) {
  welcomeOverlay.setAttribute("hidden", "");
}

function syncHeaderState() {
  if (!siteHeader) {
    scrollTicking = false;
    return;
  }

  const currentScrollY = window.scrollY;
  if (window.performance.now() < headerLockUntil) {
    lastScrollY = currentScrollY;
    scrollTicking = false;
    return;
  }

  const delta = currentScrollY - lastScrollY;

  if (currentScrollY <= 36 || delta < -8) {
    siteHeader.classList.remove("is-condensed");
  } else if (currentScrollY > 150 && delta > 8) {
    siteHeader.classList.add("is-condensed");
  }

  lastScrollY = currentScrollY;
  scrollTicking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (scrollTicking) {
      return;
    }

    scrollTicking = true;
    window.requestAnimationFrame(syncHeaderState);
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
    lockHeaderState(220);
  });
}
