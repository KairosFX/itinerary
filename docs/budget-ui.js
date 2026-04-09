window.__JAPAN_BUDGET_UI__ = (() => {
const budgetNotesCard = document.querySelector("[data-budget-notes-card]");
const budgetStatusNode = document.querySelector("[data-budget-status]");
const budgetSummaryNode = document.querySelector("[data-budget-summary]");
const budgetBreakdownNode = document.querySelector("[data-budget-breakdown]");
const budgetSourceMetaNode = document.querySelector("[data-budget-source-meta]");
const budgetSourcesNode = document.querySelector("[data-budget-sources]");
const budgetDaySelectorNode = document.querySelector("[data-budget-day-selector]");
const budgetDaysNode = document.querySelector("[data-budget-days]");
const budgetResetButtons = Array.from(document.querySelectorAll("[data-budget-reset-all]"));
const budgetTravelersInput = document.querySelector("[data-budget-travelers]");
const budgetTravelersPerRoomInput = document.querySelector("[data-budget-travelers-per-room]");
const budgetStepButtons = Array.from(document.querySelectorAll("[data-budget-step-target]"));
const budgetDisplayExchangeRates = {
  cadPerJpy: 1 / 109,
  usdPerJpy: 1 / 149
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
  none: 0,
  relative: 1,
  hotel: 2,
  ryokan: 2
};

const itineraryBudgetLabels = {
  summaryTotal: { en: "Total trip estimate", ja: "旅全体の見積り" },
  summaryPerPerson: { en: "Per traveller", ja: "1人あたり" },
  summaryBookedRequired: { en: "Booked + required", ja: "予約前提 + 必須" },
  itineraryBasis: { en: "Estimate basis", ja: "見積りの前提" },
  estimateUnavailable: { en: "Itinerary budget notes are unavailable right now.", ja: "現在は旅程予算のメモを表示できません。" },
  breakdownHeading: { en: "Category breakdown", ja: "カテゴリ別の内訳" },
  sourcesHeading: { en: "Sources + route assumptions", ja: "出典とルート前提" },
  noteLabel: { en: "Budget note", ja: "予算メモ" },
  rangeLegendTitle: { en: "Lean / Expected / High", ja: "控えめ / 標準 / 高め" },
  levelLean: { en: "Lean", ja: "控えめ" },
  levelExpected: { en: "Expected", ja: "標準" },
  levelHigh: { en: "High", ja: "高め" },
  rangeLegendLean: {
    en: "Lower practical stay, transit, and meal choices without changing the route.",
    ja: "ルートは変えず、宿・移動・食費を実用的な下側で見ます。"
  },
  rangeLegendExpected: {
    en: "The current baseline for this itinerary using the normal stay and spending pattern.",
    ja: "この旅程の現在の標準値で、通常の宿泊と支出パターンです。"
  },
  rangeLegendHigh: {
    en: "A fuller but still realistic version with pricier stays and heavier day-of spending.",
    ja: "高めでも現実的な帯で、宿泊費とその日の支出を少し厚めに見ます。"
  },
  rangeFixedNote: { en: "Mostly fixed across the range", ja: "この項目は帯の中でほぼ固定" },
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
  stayAnchorLabel: { en: "Anchor stay", ja: "基準の宿" },
  travelersPerRoomLabel: { en: "Travellers per room", ja: "1室あたりの人数" },
  travelersPerRoomHint: {
    en: "Controls how many travellers split each hotel or ryokan room quote.",
    ja: "ホテルや旅館の1室見積りを何人で分けるかを設定します。"
  },
  stayHintFallback: {
    en: "Switch between the real default stay and any cheaper or free fallback you actually have.",
    ja: "実際の初期滞在と、実際に使える安い・無料の代替滞在を切り替えられます。"
  },
  statusLoading: {
    en: "Loading itinerary cost model...",
    ja: "旅程の費用モデルを読み込んでいます..."
  },
  travelersHint: { en: "", ja: "" },
  dayViewerLabel: {
    en: "Day selector",
    ja: "日付セレクター"
  },
  dayViewerHint: { en: "", ja: "" },
  totalMeta: {
    en: "Combined total of every day shown in the Day Budget Viewer. Any day change updates this trip total immediately.",
    ja: "Day Budget Viewer に表示される全日程の合計です。各日の金額が変わると、この旅全体の合計もすぐ更新されます。"
  },
  noPaidAccommodationMeta: {
    en: "No paid hotel or ryokan stays are selected right now.",
    ja: "現在は有料のホテル・旅館宿泊が選ばれていません。"
  },
  notesLinkHubMeta: {
    en: "All booking, fare, and official resource links now live in Essentials so Budget Notes stays focused on costs and assumptions.",
    ja: "予約・運賃・公式リソースのリンクはすべてEssentialsへ移し、予算メモは費用と前提だけに絞っています。"
  },
  currencyDisplayMeta: { en: "", ja: "" },
  bookedRequiredMeta: {
    en: "Core booked and required costs for the fixed 7-day route",
    ja: "固定7日間ルートの予約前提・必須コストです"
  },
  sharedMeta: { en: "Shared stays and group costs", ja: "共有の宿泊費と共通費" },
  variableMeta: { en: "Per-person variable spend", ja: "1人ごとの変動費" },
  sourceUpdatedPrefix: { en: "Refreshed", ja: "更新" }
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
  const getDefaultTravelersPerRoom = (travelers = budgetDefaultTravelerCount) =>
    Math.min(
      normalizeTravelerCount(travelers, budgetDefaultTravelerCount),
      budgetTravelersPerRoomDefault
    );
  const normalizeTravelersPerRoom = (value, travelers = budgetDefaultTravelerCount) => {
    const normalizedTravelers = normalizeTravelerCount(travelers, budgetDefaultTravelerCount);
    const parsed = Number.parseInt(String(value ?? ""), 10);
    if (Number.isNaN(parsed)) {
      return getDefaultTravelersPerRoom(normalizedTravelers);
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
  const getCompactRangeCopy = (range) => ({
    en: `${itineraryBudgetLabels.rangeCompactPrefix.en} ${formatCurrencyForLanguage(
      getBudgetRangeValue(range, "lean"),
      "en"
    )} • ${itineraryBudgetLabels.rangeCompactSuffix.en} ${formatCurrencyForLanguage(
      getBudgetRangeValue(range, "high"),
      "en"
    )}`,
    ja: `${itineraryBudgetLabels.rangeCompactPrefix.ja} ${formatCurrencyForLanguage(
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
  const getRangeMetaCopy = (range) =>
    hasBudgetRangeSpread(range)
      ? getCompactRangeCopy(range)
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
  const getStayAnchorCopy = (stayDefinition) => {
    if (!stayDefinition) {
      return null;
    }

    const sourceLabel = getSourceCostConfig(stayDefinition.cost?.sourceCostId)?.source?.label;
    return sourceLabel && typeof sourceLabel === "object"
      ? sourceLabel
      : stayDefinition.property || null;
  };
  const normalizeDayEntry = (definition, entry) => {
    const defaultStayId = definition?.defaultStayId || null;
    const allowedStayIds = new Set(Array.isArray(definition?.stayOptions) ? definition.stayOptions : []);
    const stayId = allowedStayIds.has(entry?.stayId) ? entry.stayId : defaultStayId;
    return { note: "", stayId };
  };
  const getDefaultState = () => ({
    travelers: budgetDefaultTravelerCount,
    travelersPerRoom: getDefaultTravelersPerRoom(budgetDefaultTravelerCount),
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
      if (normalizedEntry.stayId && normalizedEntry.stayId !== definition.defaultStayId) {
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
      const travelers = budgetTravelersInput
        ? normalizeTravelerCount(parsed.travelers, fallbackState.travelers)
        : fallbackState.travelers;
      const legacyTravelersPerRoom =
        parsed.accommodationShareMode === "not-shared"
          ? 1
          : getDefaultTravelersPerRoom(travelers);

      return {
        travelers,
        travelersPerRoom: budgetTravelersPerRoomInput
          ? normalizeTravelersPerRoom(
              parsed.travelersPerRoom ?? legacyTravelersPerRoom,
              travelers
            )
          : fallbackState.travelersPerRoom,
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
    const travelerCount = normalizeTravelerCount(
      budgetNotesState.travelers,
      budgetDefaultTravelerCount
    );
    if (
      travelerCount !== budgetDefaultTravelerCount ||
      normalizeTravelersPerRoom(
        budgetNotesState.travelersPerRoom,
        travelerCount
      ) !== getDefaultTravelersPerRoom(travelerCount)
    ) {
      return true;
    }

    return Object.entries(budgetNotesState.days || {}).some(([day, entry]) => {
      const defaultStayId = getDefaultStayId(day);
      return entry?.stayId && entry.stayId !== defaultStayId;
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
          travelersPerRoom: normalizeTravelersPerRoom(
            budgetNotesState.travelersPerRoom,
            normalizeTravelerCount(budgetNotesState.travelers, budgetDefaultTravelerCount)
          ),
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
  const getTravelersPerRoom = (travelers = getTravelerCount()) => {
    hydrateState();
    const normalizedTravelers = normalizeTravelerCount(travelers, budgetDefaultTravelerCount);
    return normalizeTravelersPerRoom(
      budgetNotesState.travelersPerRoom,
      normalizedTravelers
    );
  };
  const setTravelersPerRoom = (value, travelers = getTravelerCount()) => {
    const normalizedTravelers = normalizeTravelerCount(travelers, budgetDefaultTravelerCount);
    budgetNotesState.travelersPerRoom = normalizeTravelersPerRoom(
      value,
      normalizedTravelers
    );
  };
  const syncTravelersPerRoomForTravelers = (travelers) => {
    const normalizedTravelers = normalizeTravelerCount(travelers, budgetDefaultTravelerCount);
    budgetNotesState.travelersPerRoom = normalizeTravelersPerRoom(
      budgetNotesState.travelersPerRoom,
      normalizedTravelers
    );
  };
  const getAccommodationRoomCount = (travelers = getTravelerCount()) => {
    const normalizedTravelers = normalizeTravelerCount(travelers, budgetDefaultTravelerCount);
    const travelersPerRoom = getTravelersPerRoom(normalizedTravelers);
    return Math.max(1, Math.ceil(normalizedTravelers / travelersPerRoom));
  };
  const getDayState = (day) => {
    hydrateState();
    const entry =
      budgetNotesState.days && typeof budgetNotesState.days[String(day)] === "object"
        ? budgetNotesState.days[String(day)]
        : {};
    const defaultStayId = getDefaultStayId(day);

    return {
      note: "",
      stayId: typeof entry.stayId === "string" ? entry.stayId : defaultStayId
    };
  };
  const updateDayState = (day, nextState) => {
    hydrateState();
    const key = String(day);
    const definition = getDayDefinition(day);
    const defaultStayId = definition?.defaultStayId || null;
    const allowedStayIds = new Set(Array.isArray(definition?.stayOptions) ? definition.stayOptions : []);
    const stayId = allowedStayIds.has(nextState?.stayId) ? nextState.stayId : defaultStayId;

    if (!budgetNotesState.days || typeof budgetNotesState.days !== "object") {
      budgetNotesState.days = {};
    }

    if (!stayId || stayId === defaultStayId) {
      delete budgetNotesState.days[key];
    } else {
      budgetNotesState.days[key] = { note: "", stayId };
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
    const travelersPerRoom =
      item?.category === "accommodation" ? getTravelersPerRoom(travelerCount) : null;
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
      if (item?.category === "accommodation") {
        quantity = getAccommodationRoomCount(travelerCount);
        total = amount * quantity;
        totalRange = mapBudgetRange(range, (value) => value * quantity);
      } else {
        quantity = 1;
        total = amount;
        totalRange = range;
      }
    }

    return {
      mode: cost.mode,
      amount,
      range,
      quantity,
      total,
      totalRange,
      roomCapacity: cost.mode === "perRoom" ? roomCapacity : null,
      roomCount: item?.category === "accommodation" ? quantity : null,
      pairSize: cost.mode === "perPair" ? pairSize : null,
      travelersPerRoom,
      included: item.bucket !== "optional" || withExtras
    };
  };
  const getItemFormulaCopy = (itemCost, item = null) => {
    if (item?.formulaCopy) {
      return item.formulaCopy;
    }

    if (item?.category === "accommodation" && itemCost.total > 0) {
      const roomQuoteCopy = formatCurrencyCopy(itemCost.amount);
      const roomCount = Math.max(1, Number(itemCost.roomCount) || 1);
      const travelersPerRoom = Math.max(1, Number(itemCost.travelersPerRoom) || 1);
      return {
        en: `${roomQuoteCopy.en} per room x ${roomCount} room${
          roomCount === 1 ? "" : "s"
        } · ${travelersPerRoom} traveller${travelersPerRoom === 1 ? "" : "s"} per room`,
        ja: `1室 ${roomQuoteCopy.ja} x ${roomCount}室 ・ 1室あたり${travelersPerRoom}人`
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
  const getPersonalLineTotal = (item, travelers, level = "expected") => {
    if (!item?.itemCost?.included) {
      return 0;
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
    const activeDays = visibleDays();
    const categoryTotals = Object.fromEntries(
      budgetCategoryDefinitions.map((definition) => [definition.id, 0])
    );
    const categoryTotalsRange = Object.fromEntries(
      budgetCategoryDefinitions.map((definition) => [definition.id, getZeroBudgetRange()])
    );
    const bucketTotals = Object.fromEntries(
      budgetBucketDefinitions.map((definition) => [definition.id, 0])
    );
    const bucketTotalsRange = Object.fromEntries(
      budgetBucketDefinitions.map((definition) => [definition.id, getZeroBudgetRange()])
    );
    const calculateDay = (definition) => {
      const dayState = getDayState(definition.day);
      const stayDefinition = getStayDefinitionForDay(definition, dayState.stayId);
      const dayItems = [getAccommodationItem(definition), ...definition.items].filter(Boolean);
      const itemEstimates = dayItems.map((item) => {
        const itemCost = calculateItemCost(item, travelers, false);
        const lineTotal = itemCost.included ? itemCost.total : 0;
        const lineRangeTotals = itemCost.included ? itemCost.totalRange : getZeroBudgetRange();
        return {
          ...item,
          itemCost,
          lineTotal,
          lineRangeTotals
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
    const accommodationRoomCount = hasBudgetRangeValue(accommodationTotalRange)
      ? getAccommodationRoomCount(travelers)
      : 0;
    const accommodationPerPersonRange = visibleDayEstimates.reduce(
      (sum, dayEstimate) =>
        sumBudgetRanges(
          sum,
          dayEstimate.itemEstimates.reduce(
            (daySum, item) =>
              sumBudgetRanges(
                daySum,
                item.category === "accommodation"
                  ? getPersonalLineRange(item, travelers)
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
      travelersPerRoom: getTravelersPerRoom(travelers),
      accommodationRoomCount,
      accommodationTotal,
      accommodationTotalRange,
      accommodationPerPerson: getBudgetRangeValue(accommodationPerPersonRange, "expected"),
      accommodationPerPersonRange,
      visibleDayEstimates,
      total,
      totalRange,
      mainTotal: total,
      mainTotalRange: totalRange,
      perPerson: getBudgetRangeValue(perPersonRange, "expected"),
      perPersonRange,
      bookedAndFixedTotal,
      bookedAndFixedTotalRange,
      bucketTotals,
      bucketTotalsRange,
      categoryTotals,
      categoryTotalsRange
    };
  };
  const getBudgetEstimateTotal = () => calculateEstimate().mainTotal;
  const renderSummaryMarkup = (estimate = calculateEstimate()) => {
    const summaryCard = {
      className:
        "budget-summary-card budget-summary-card--estimate budget-summary-card--primary budget-summary-card--single-total",
      label: itineraryBudgetLabels.summaryTotal,
      value: formatCurrency(estimate.mainTotal),
      rangeNote: getCompactRangeCopy(estimate.mainTotalRange),
      meta: itineraryBudgetLabels.totalMeta
    };
    const rangeGuideItems = [
      {
        label: itineraryBudgetLabels.levelLean,
        pillClass: "budget-pill budget-pill--lean budget-range-guide__pill",
        copy: itineraryBudgetLabels.rangeLegendLean
      },
      {
        label: itineraryBudgetLabels.levelExpected,
        pillClass: "budget-pill budget-pill--expected budget-range-guide__pill",
        copy: itineraryBudgetLabels.rangeLegendExpected
      },
      {
        label: itineraryBudgetLabels.levelHigh,
        pillClass: "budget-pill budget-pill--high budget-range-guide__pill",
        copy: itineraryBudgetLabels.rangeLegendHigh
      }
    ];

    return `
      <article class="${summaryCard.className}">
        <p class="budget-summary-card__label">${renderLocalizedContent(summaryCard.label)}</p>
        <p class="budget-summary-card__headline">${escapeHtml(summaryCard.value)}</p>
        <p class="budget-summary-card__range-note">${renderLocalizedContent(summaryCard.rangeNote)}</p>
        <p class="budget-summary-card__meta">${renderLocalizedContent(summaryCard.meta)}</p>
      </article>
      <section class="budget-range-guide" aria-label="${escapeHtml(
        getLocalizedText(itineraryBudgetLabels.rangeLegendTitle)
      )}">
        <p class="budget-range-guide__title">${renderLocalizedContent(
          itineraryBudgetLabels.rangeLegendTitle
        )}</p>
        <div class="budget-range-guide__items">
          ${rangeGuideItems
            .map(
              (item) => `
                <article class="budget-range-guide__item">
                  <span class="${item.pillClass}">${renderLocalizedContent(item.label)}</span>
                  <p class="budget-range-guide__copy">${renderLocalizedContent(item.copy)}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </section>
    `;
  };
  const renderBreakdownMarkup = (estimate = calculateEstimate()) => {
    const primaryCategoryIds = [
      "accommodation",
      "intercityTransit",
      "localTransit",
      "ticketsAdmissions",
      "meals"
    ];
    const visibleSecondaryCategoryIds = [];
    const renderCategoryCard = (definition, className = "budget-breakdown-card") => {
      const range = estimate.categoryTotalsRange[definition.id] || getZeroBudgetRange();
      const metaCopy =
        hasBudgetRangeValue(range)
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
    const secondaryMarkup = budgetCategoryDefinitions
      .filter((definition) => visibleSecondaryCategoryIds.includes(definition.id))
      .map((definition) =>
        renderCategoryCard(definition, "budget-breakdown-card budget-breakdown-card--secondary")
      )
      .join("");

    return `
      <div class="budget-breakdown-grid">
        ${budgetCategoryDefinitions
          .filter((definition) => primaryCategoryIds.includes(definition.id))
          .map((definition) => renderCategoryCard(definition))
          .join("")}
      </div>
      ${secondaryMarkup ? `<div class="budget-breakdown-secondary">${secondaryMarkup}</div>` : ""}
    `;
  };
  const renderSourceMetaMarkup = () => "";
  const renderSourcesMarkup = () => "";
  const renderDayMarkup = (dayEstimate) => {
    const stayOptions = Array.isArray(dayEstimate.stayOptions) ? dayEstimate.stayOptions : [];
    const selectedStayId = dayEstimate.stayDefinition?.id || "";
    const stayAnchorCopy = getStayAnchorCopy(dayEstimate.stayDefinition);
    const stayAnchorMarkup = stayAnchorCopy
      ? `
        <p class="budget-day-card__stay-hint">
          <strong>${renderLocalizedContent(itineraryBudgetLabels.stayAnchorLabel)}:</strong>
          ${renderLocalizedContent(stayAnchorCopy)}
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
          ${stayAnchorMarkup}
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
            .filter((item) => !["baggage", "optionalExtras"].includes(item.category))
            .map((item) => {
              const chipClass =
                item.bucket === "free"
                  ? "budget-chip budget-chip--free"
                  : `budget-chip budget-chip--${escapeHtml(item.bucket)}`;
              const amountCopy = formatCurrencyCopy(item.lineTotal);
              const rangeCopy =
                hasBudgetRangeSpread(item.lineRangeTotals)
                  ? getCompactRangeCopy(item.lineRangeTotals)
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
      </article>
    `;
  };
  const syncStatus = () => {
    if (!budgetStatusNode) {
      return;
    }

    budgetStatusNode.innerHTML = "";
    budgetStatusNode.hidden = true;
  };
  const syncControls = () => {
    if (budgetTravelersInput && budgetTravelersInput.value !== String(getTravelerCount())) {
      budgetTravelersInput.value = String(getTravelerCount());
    }

    if (budgetTravelersPerRoomInput) {
      const travelerCount = getTravelerCount();
      const travelersPerRoom = getTravelersPerRoom(travelerCount);
      budgetTravelersPerRoomInput.max = String(travelerCount);
      if (budgetTravelersPerRoomInput.value !== String(travelersPerRoom)) {
        budgetTravelersPerRoomInput.value = String(travelersPerRoom);
      }
      budgetTravelersPerRoomInput.hidden = false;
      budgetTravelersPerRoomInput.removeAttribute("aria-hidden");
      if (budgetTravelersPerRoomInput.tabIndex < 0) {
        budgetTravelersPerRoomInput.tabIndex = 0;
      }
    }

    budgetResetButtons.forEach((button) => {
      button.disabled = !hasChanges();
    });
  };
  const syncUI = () => {
    if (!budgetNotesCard || !budgetDaysNode) {
      return;
    }

    const estimate = calculateEstimate();
    const activeDay = normalizeActiveBudgetDay(estimate.visibleDayEstimates);
    const activeDayEstimate =
      estimate.visibleDayEstimates.find((dayEstimate) => dayEstimate.day === activeDay) ||
      estimate.visibleDayEstimates[0] ||
      null;
    if (budgetSummaryNode) {
      budgetSummaryNode.innerHTML = renderSummaryMarkup(estimate);
    }
    if (budgetBreakdownNode) {
      budgetBreakdownNode.innerHTML = renderBreakdownMarkup(estimate);
    }
    if (budgetDaySelectorNode) {
      budgetDaySelectorNode.innerHTML = renderDaySelectorMarkup(
        estimate.visibleDayEstimates,
        activeDay
      );
    }
    budgetDaysNode.innerHTML = activeDayEstimate ? renderDayMarkup(activeDayEstimate) : "";

    if (budgetSourceMetaNode) {
      budgetSourceMetaNode.innerHTML = renderSourceMetaMarkup();
      budgetSourceMetaNode.hidden = true;
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
    const nextTravelersPerRoom = normalizeTravelersPerRoom(
      budgetTravelersPerRoomInput?.value,
      nextTravelers
    );
    setTravelersPerRoom(nextTravelersPerRoom, nextTravelers);
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
        syncTravelersPerRoomForTravelers(budgetNotesState.travelers);
        storeState();
        syncUI();
      });
      budgetTravelersInput.addEventListener("blur", () => {
        syncControls();
      });
      budgetTravelersInput.dataset.itineraryBudgetBound = "true";
    }

    if (
      budgetTravelersPerRoomInput &&
      budgetTravelersPerRoomInput.dataset.itineraryBudgetBound !== "true"
    ) {
      budgetTravelersPerRoomInput.addEventListener("input", () => {
        const parsedValue = Number.parseInt(budgetTravelersPerRoomInput.value, 10);
        if (Number.isNaN(parsedValue)) {
          syncControls();
          return;
        }

        setTravelersPerRoom(parsedValue, getTravelerCount());
        storeState();
        syncUI();
      });
      budgetTravelersPerRoomInput.addEventListener("blur", () => {
        syncControls();
      });
      budgetTravelersPerRoomInput.dataset.itineraryBudgetBound = "true";
    }

    budgetStepButtons.forEach((button) => {
      if (button.dataset.itineraryBudgetBound === "true") {
        return;
      }

      button.addEventListener("click", () => {
        const target = button.dataset.budgetStepTarget;
        const delta = Number.parseInt(button.dataset.budgetStepDelta || "0", 10);
        if (!delta) {
          return;
        }

        let nextValue = null;
        if (target === "travelers" && budgetTravelersInput) {
          nextValue = clamp(getTravelerCount() + delta, 1, 24);
          if (nextValue === getTravelerCount()) {
            return;
          }
          budgetTravelersInput.value = String(nextValue);
          budgetTravelersInput.dispatchEvent(new Event("input", { bubbles: true }));
        }

        if (target === "travelers-per-room" && budgetTravelersPerRoomInput) {
          nextValue = clamp(getTravelersPerRoom() + delta, 1, getTravelerCount());
          if (nextValue === getTravelersPerRoom()) {
            return;
          }
          budgetTravelersPerRoomInput.value = String(nextValue);
          budgetTravelersPerRoomInput.dispatchEvent(new Event("input", { bubbles: true }));
        }
      });

      button.dataset.itineraryBudgetBound = "true";
    });

    budgetResetButtons.forEach((button) => {
      if (button.dataset.itineraryBudgetBound === "true") {
        return;
      }

      button.addEventListener("click", () => {
        if (!hasChanges()) {
          return;
        }

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
  getBudgetRoomCount = getAccommodationRoomCount;
  getDefaultBudgetNotesState = getDefaultState;
  readStoredBudgetNotesState = readState;
  ensureBudgetNotesStateHydrated = hydrateState;
  hasBudgetNotesChanges = hasChanges;
  storeBudgetNotesState = storeState;
  getBudgetTravelerCount = getTravelerCount;
  getBudgetTravelersPerRoom = getTravelersPerRoom;
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

return { ready: true };
})();


