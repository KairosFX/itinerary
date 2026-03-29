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
const budgetAccommodationShareModeInput = document.querySelector("[data-budget-share-mode]");
const budgetAccommodationShareCountField = document.querySelector("[data-budget-share-count-field]");
const budgetAccommodationShareCountInput = document.querySelector("[data-budget-share-count]");
const budgetIncludeExtrasInput = document.querySelector("[data-budget-include-extras]");
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

return { ready: true };
})();


