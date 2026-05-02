window.__JAPAN_ROUTE_CONTENT__ = (() => {
  const tripNotes = [
    {
      day: 1,
      title: { en: "Arrival Night in Osaka", ja: "大阪に着く夜" },
      note: {
        en: "Ease into Osaka with Dotonbori first, a Shinsaibashi walk after that, and dinner in Minami nearby. Keep it loose so arrival night stays simple.",
        ja: "大阪は道頓堀から入り、そのあと心斎橋を歩いて、夕食はミナミの近場で軽くまとめる。到着日の夜は余裕を残しておく。"
      },
      summary: {
        en: "The trip opens gently in Minami: Dotonbori, Shinsaibashi, and an easy dinner close by.",
        ja: "旅の始まりはミナミでゆっくり。道頓堀、心斎橋、近場の夕食で軽く整えます。"
      }
    },
    {
      day: 2,
      title: { en: "Kaiyukan and Kyoto East", ja: "海遊館と京都東側" },
      note: {
        en: "Start at Kaiyukan, transfer to Kyoto, and check into the hotel before the east-side walk. From Kiyomizu-dera, keep it direct on foot: Ninenzaka, Yasaka Pagoda, then Gion for the evening.",
        ja: "海遊館から始め、京都へ移動してホテルにチェックイン。その後は清水寺から二年坂、八坂の塔、祇園まで、東側をそのまま歩いてつなぐ。"
      },
      summary: {
        en: "Kaiyukan first, then Kyoto transfer, hotel check-in, and the direct Kiyomizu-dera to Gion walking flow.",
        ja: "海遊館、京都移動、ホテルチェックイン、清水寺から祇園への徒歩ルート。"
      }
    },
    {
      day: 3,
      title: { en: "Arashiyama to Fuji", ja: "嵐山から富士エリアへ" },
      note: {
        en: "This is the long movement day. Start with Arashiyama, then keep the rail plan simple: Kyoto → Mishima by shinkansen, Fujikawaguchiko transfer, and the onsen check-in.",
        ja: "この日は移動が長め。嵐山から始め、その後の鉄道はシンプルに京都から三島へ新幹線。富士河口湖への乗り継ぎ、最後に温泉チェックインまで進む。"
      },
      summary: {
        en: "Arashiyama, Kyoto → Mishima by shinkansen, Fujikawaguchiko transfer, then the onsen reset.",
        ja: "嵐山、京都から三島への新幹線、富士河口湖への移動、温泉宿でリセット。"
      }
    },
    {
      day: 4,
      title: { en: "Fuji Morning, Tokyo Evening", ja: "富士の朝、東京の夜" },
      note: {
        en: "Use the morning for Chureito Shimoyoshida and Lake Kawaguchiko if visibility is good. After that, transfer to Shibuya and get the Tokyo hotel check-in handled.",
        ja: "視界がよければ朝は忠霊塔・下吉田と河口湖へ。その後は渋谷へ移動して、東京のホテルチェックインを済ませる。"
      },
      summary: {
        en: "Give the morning to Chureito Shimoyoshida and Lake Kawaguchiko, then keep the afternoon practical with the Shibuya transfer and Tokyo hotel check-in.",
        ja: "午前は忠霊塔・下吉田と河口湖、午後は渋谷移動と東京ホテルチェックイン。"
      }
    },
    {
      day: 5,
      title: { en: "Shibuya Day", ja: "渋谷の日" },
      note: {
        en: "Keep the Tokyo west-side day focused: Shibuya Crossing, the food walk, and Shibuya Sky later when the view is better. No extra side trip is needed.",
        ja: "東京西側に絞る日。渋谷交差点、渋谷フードウォーク、最後に渋谷スカイへ進めば、寄り道を足さなくても十分まとまる。"
      },
      summary: {
        en: "Stay west and keep the day simple: cross Shibuya, leave time for the food walk, and finish with Shibuya Sky when the evening view is ready.",
        ja: "渋谷交差点、フードウォーク、夕方以降の渋谷スカイで一日をまとめます。"
      }
    },
    {
      day: 6,
      title: { en: "East Tokyo Loop", ja: "東京東側の一日" },
      note: {
        en: "Stay on the east side: Tokyo Skytree first, Solamachi while you are already there, then Akihabara as the final stop. It keeps the day from bouncing across the city.",
        ja: "東側だけでまとめる。東京スカイツリーから始め、そのままソラマチ、最後に秋葉原へ回すと街を行き来しすぎずに済む。"
      },
      summary: {
        en: "The east-side day stays compact: Tokyo Skytree first, Solamachi below it next, and Akihabara as the final city stop.",
        ja: "東京スカイツリー、ソラマチ、秋葉原の順で東側をコンパクトに進みます。"
      }
    },
    {
      day: 7,
      title: { en: "Final Tokyo Reset", ja: "最後の東京調整" },
      note: {
        en: "Keep departure day practical: Imperial Palace if it fits, Shinjuku after that, then bag pickup and the airport transfer. Leave enough room for the exit.",
        ja: "出発日は実用優先。入るなら皇居、そのあと新宿、荷物回収、空港移動へ進み、最後は余裕を残す。"
      },
      summary: {
        en: "A measured finish: Imperial Palace, Shinjuku, bag pickup, and the airport transfer.",
        ja: "皇居、新宿、荷物回収、空港移動で落ち着いて旅を締めます。"
      }
    }
  ];

  // Extracted from saved preview directions responses on 2026-03-28.
  const routeSegmentCoordinateDefinitions = {
    osakaKyoto: [
      [135.502339, 34.694211],
      [135.495944, 34.693993],
      [135.495746, 34.694948],
      [135.496044, 34.694968],
      [135.500427, 34.695014],
      [135.504887, 34.694403],
      [135.509925, 34.683394],
      [135.513989, 34.681635],
      [135.59113, 34.678779],
      [135.595041, 34.684938],
      [135.591745, 34.711214],
      [135.591988, 34.717155],
      [135.761748, 34.970979],
      [135.763587, 34.973192],
      [135.764209, 34.98926],
      [135.768966, 35.012023],
      [135.768191, 35.012098]
    ],
    kyotoMishima: [
      [135.768191, 35.012098],
      [136.881537, 35.170915],
      [137.734703, 34.704978],
      [138.388902, 34.97171],
      [138.91012, 35.126899]
    ],
    mishimaKawaguchiko: [
      [138.910892, 35.127364],
      [138.910675, 35.12786],
      [138.910806, 35.127968],
      [138.910638, 35.136219],
      [138.90896, 35.138705],
      [138.885787, 35.140407],
      [138.873236, 35.148138],
      [138.868911, 35.1547],
      [138.875284, 35.162076],
      [138.910801, 35.25561],
      [138.910546, 35.327662],
      [138.905102, 35.327196],
      [138.867486, 35.3591],
      [138.771585, 35.47709],
      [138.771876, 35.481722],
      [138.769463, 35.481914],
      [138.756706, 35.491369],
      [138.755967, 35.497491],
      [138.755184, 35.497602]
    ],
    kawaguchikoTokyo: [
      [138.755184, 35.497602],
      [138.754838, 35.49824],
      [138.755847, 35.498322],
      [138.756716, 35.492396],
      [138.759197, 35.491299],
      [138.77287, 35.485746],
      [138.77816, 35.49],
      [138.91738, 35.599104],
      [138.918313, 35.603495],
      [138.920343, 35.60436],
      [139.614565, 35.677285],
      [139.646506, 35.668476],
      [139.648818, 35.669751],
      [139.65249, 35.670688],
      [139.65148, 35.672275],
      [139.652474, 35.672325],
      [139.652505, 35.673081],
      [139.65269, 35.67316],
      [139.65232, 35.673461],
      [139.652852, 35.673834],
      [139.650756, 35.676189],
      [139.650638, 35.6761],
      [139.650021, 35.676413]
    ]
  };

  const routeSegments = [
    {
      id: "osaka-kyoto",
      title: { en: "Kaiyukan -> Kyoto East", ja: "海遊館 -> 京都東側" },
      summary: {
        en: "Day 2 moves cleanly from Kaiyukan into the east-side Kyoto walking cluster.",
        ja: "2日目は海遊館から京都東側の徒歩中心エリアへ、分かりやすく移る区間です。"
      },
      badges: [
        { en: "Day 2", ja: "2日目" },
        { en: "City rail", ja: "近距離鉄道" }
      ],
      notes: [
        {
          en: "This segment is about reaching Kiyomizu-dera, Ninenzaka, Yasaka Pagoda, and Gion without turning it into a luggage day.",
          ja: "この区間は、清水寺、二寧坂、八坂の塔、祇園へ入りやすくする移動で、荷物中心の日にはしない前提です。"
        },
        {
          en: "Keeping this as a Kyoto-focused handoff makes the east-side walk easier to read.",
          ja: "ここを京都側の受け渡しとしてまとめることで、京都東側の日程を素直に見やすくしています。"
        }
      ],
      dayLinks: [{ day: 2 }],
      stopIds: ["osaka", "kyoto"],
      coordinates: routeSegmentCoordinateDefinitions.osakaKyoto
    },
    {
      id: "kyoto-mishima-shinkansen",
      title: { en: "Kyoto → Mishima", ja: "京都 → 三島" },
      summary: {
        en: "This is the clean shinkansen handoff from Kyoto Station into the Mt. Fuji side.",
        ja: "京都駅から富士側へ入るための、分かりやすい新幹線の受け渡しです。"
      },
      badges: [
        { en: "Day 3", ja: "3日目" },
        { en: "Shinkansen", ja: "新幹線" }
      ],
      notes: [
        {
          en: "Open the saved transit detail when you want the actual train choice and buffer notes.",
          ja: "実際の列車選びや余裕時間を確認したいときは、保存済み移動詳細を開くのが早いです。"
        },
        {
          en: "This leg stays separate from the local Fuji access so the main transfer remains readable.",
          ja: "主要移動を読みやすく保つため、この区間は富士側のローカルアクセスとは分けています。"
        }
      ],
      dayLinks: [{ day: 3 }],
      transitActions: [
        {
          id: "kyoto-mishima-shinkansen",
          label: { en: "Shinkansen detail", ja: "新幹線詳細" }
        }
      ],
      stopIds: ["kyoto", "fuji-gateway"],
      coordinates: routeSegmentCoordinateDefinitions.kyotoMishima
    },
    {
      id: "fuji-gateway-kawaguchiko",
      title: { en: "Mishima -> Kawaguchiko", ja: "三島 -> 河口湖" },
      summary: {
        en: "This is the local access leg into the lake base, trading the shinkansen arrival for the quieter Fuji-area night.",
        ja: "この区間で新幹線到着から湖側の拠点へ移り、静かな富士エリアの夜へつなげます。"
      },
      badges: [
        { en: "Day 3", ja: "3日目" },
        { en: "Local access", ja: "現地アクセス" }
      ],
      notes: [
        {
          en: "Treat it as a practical station-to-lake handoff first, then enjoy the arrival views and sunset second.",
          ja: "まずは駅から湖側へ入る実用的な移動として見て、そのあと到着景色や夕景を楽しむ流れです。"
        },
        {
          en: "The linked detail keeps the Mishima bus handoff and lake-side arrival timing together.",
          ja: "関連詳細では、三島からのバス接続と湖側到着の時間感覚をまとめています。"
        }
      ],
      dayLinks: [{ day: 3 }],
      transitActions: [
        {
          id: "fuji-gateway-kawaguchiko",
          label: { en: "Fuji access detail", ja: "富士アクセス詳細" }
        }
      ],
      stopIds: ["fuji-gateway", "fuji"],
      coordinates: routeSegmentCoordinateDefinitions.mishimaKawaguchiko
    },
    {
      id: "fuji-tokyo",
      title: { en: "Mt. Fuji area -> Tokyo / Shibuya", ja: "富士エリア -> 東京・渋谷" },
      summary: {
        en: "Day 4 is the clean Tokyo handoff from the Fuji side into Shibuya.",
        ja: "4日目は富士側から渋谷へ入る、きれいな東京ハンドオフです。"
      },
      badges: [
        { en: "Day 4", ja: "4日目" },
        { en: "Tokyo handoff", ja: "東京への受け渡し" }
      ],
      notes: [
        {
          en: "Use this when you want the Tokyo transfer separated from the Fuji-area local stops earlier on Day 4.",
          ja: "4日目の前半に置いた富士エリアの立ち寄りと切り分けて、東京への移動だけ見たいときに使います。"
        },
        {
          en: "The linked transit detail keeps the direct train and highway-bus arrival options together.",
          ja: "関連詳細には、直通列車と高速バスの到着案をまとめています。"
        }
      ],
      dayLinks: [{ day: 4 }],
      transitActions: [
        {
          id: "kawaguchiko-tokyo",
          label: { en: "Tokyo arrival detail", ja: "東京到着詳細" }
        }
      ],
      stopIds: ["fuji", "tokyo"],
      coordinates: routeSegmentCoordinateDefinitions.kawaguchikoTokyo
    }
  ];

  const routeStops = [
    {
      id: "osaka",
      title: { en: "Osaka", ja: "大阪" },
      summary: {
        en: "Osaka handles the easy Minami arrival and the Day 2 Kaiyukan start before the route moves into Kyoto.",
        ja: "大阪は、ミナミ中心の到着日と2日目の海遊館スタートをまとめ、その後は京都側へ進みます。"
      },
      badges: [
        { en: "Days 1-3", ja: "1-3日目" },
        { en: "Base stay", ja: "滞在拠点" }
      ],
      notes: [
        {
          en: "This stop covers Dotonbori, Shinsaibashi, dinner in Minami, nightlife, and the Day 2 Kaiyukan visit before Kyoto.",
          ja: "この地点は、道頓堀、心斎橋、ミナミでの夕食、夜歩き、そして京都へ向かう前の2日目の海遊館までを含みます。"
        },
        {
          en: "It also sets up the Day 3 launch without forcing Kyoto to carry the onward transfer logic.",
          ja: "同時に3日目の出発も支えますが、その先の移動ロジックを京都側へ持たせない形にしています。"
        }
      ],
      dayLinks: [{ day: 1 }, { day: 2 }],
      primaryDay: 1,
      segmentIds: ["osaka-kyoto"],
      lngLat: [135.5023, 34.6938],
      labelPosition: "sw"
    },
    {
      id: "kyoto",
      title: { en: "Kyoto", ja: "京都" },
      summary: {
        en: "Kyoto covers the east-side temple day and the early Arashiyama branch before the Mishima rail handoff.",
        ja: "京都は、東側の寺社日と、朝の嵐山をまとめ、その後の三島方面の鉄道移動へつなげる地点です。"
      },
      badges: [
        { en: "Days 2 + 3", ja: "2日目・3日目" },
        { en: "Temple + west split", ja: "東西を分ける日" }
      ],
      notes: [
        {
          en: "Day 2 stays focused on Kiyomizu-dera, Ninenzaka, Yasaka Pagoda, and Gion after the Kaiyukan-to-Kyoto handoff.",
          ja: "2日目は海遊館から京都へ移ったあと、清水寺、二寧坂、八坂の塔、祇園に集中する構成です。"
        },
        {
          en: "Arashiyama is separated into Day 3 so Kyoto East does not get overloaded.",
          ja: "嵐山は3日目へ分け、京都東側の日程が重くなりすぎないようにしています。"
        }
      ],
      dayLinks: [{ day: 2 }, { day: 3 }],
      primaryDay: 2,
      segmentIds: ["osaka-kyoto"],
      lngLat: [135.7681, 35.0116],
      labelPosition: "n"
    },
    {
      id: "fuji-gateway",
      title: { en: "Mishima", ja: "三島" },
      summary: {
        en: "This stop marks the rail-to-local gateway into the Kawaguchiko side of the route.",
        ja: "この地点は、新幹線から河口湖側のローカルアクセスへ切り替わる入口です。"
      },
      badges: [
        { en: "Day 3", ja: "3日目" },
        { en: "Gateway stop", ja: "受け渡し地点" }
      ],
      notes: [
        {
          en: "It is less about sightseeing and more about keeping the transfer calm and readable.",
          ja: "ここは観光よりも、乗り継ぎを落ち着いて進めるための地点として見ています。"
        },
        {
          en: "Keep the next bus or local rail option saved before arrival so the lake transfer stays simple.",
          ja: "湖側への移動を簡単にするため、次のバスやローカル鉄道は到着前に控えておくと安心です。"
        }
      ],
      dayLinks: [{ day: 3 }],
      primaryDay: 3,
      transitActions: [
        {
          id: "fuji-gateway-kawaguchiko",
          label: { en: "Fuji access detail", ja: "富士アクセス詳細" }
        }
      ],
      segmentIds: ["kyoto-mishima-shinkansen", "fuji-gateway-kawaguchiko"],
      lngLat: [138.9208, 35.1265],
      labelPosition: "nw"
    },
    {
      id: "fuji",
      title: { en: "Mt. Fuji area", ja: "富士エリア" },
      summary: {
        en: "This stop groups the Day 3 Mishima handoff, the overnight Fuji base, and the Day 4 Chureito Shimoyoshida and Lake Kawaguchiko block before Tokyo.",
        ja: "この地点は、3日目の三島ハンドオフ、富士エリア宿泊、そして4日目の忠霊塔・下吉田と河口湖のまとまりを、東京へ向かう前にまとめています。"
      },
      badges: [
        { en: "Days 3-4", ja: "3日目-4日目" },
        { en: "Fuji base + stops", ja: "富士拠点と立ち寄り" }
      ],
      notes: [
        {
          en: "The route now reaches the Fuji base on Day 3, then keeps Chureito Shimoyoshida and Lake Kawaguchiko together on Day 4 before Tokyo.",
          ja: "このルートは3日目に富士エリア拠点へ入り、4日目に忠霊塔・下吉田と河口湖をまとめてから東京へ向かいます。"
        },
        {
          en: "Tokyo now starts on Day 4 after the Fuji block, leaving Day 5 free for the West Tokyo stay.",
          ja: "東京入りは富士エリアのまとまりのあと4日目に行い、5日目は西東京側を素直に回せるようにしています。"
        }
      ],
      dayLinks: [{ day: 3 }, { day: 4 }],
      primaryDay: 4,
      transitActions: [
        {
          id: "fuji-local-hops",
          label: { en: "Fuji local detail", ja: "富士エリア詳細" }
        }
      ],
      segmentIds: ["fuji-gateway-kawaguchiko", "fuji-tokyo"],
      lngLat: [138.7552, 35.5009],
      labelPosition: "se"
    },
    {
      id: "tokyo",
      title: { en: "Tokyo", ja: "東京" },
      summary: {
        en: "Tokyo now anchors the Shibuya arrival, one fuller east-side sightseeing day, and the departure-day wrap-up after the Fuji block.",
        ja: "東京は、富士エリア後の渋谷到着、東側の観光本番日、そして帰国日の調整までをまとめています。"
      },
      badges: [
        { en: "Days 4-7", ja: "4日目-7日目" },
        { en: "Main-route finish", ja: "本編の締め" }
      ],
      notes: [
        {
          en: "Use Day 4 to come into Shibuya from the Fuji side, then keep the Tokyo hotel check-in practical.",
          ja: "4日目は富士側から渋谷へ入り、そのまま東京ホテルのチェックインを実用的に済ませます。"
        },
        {
          en: "Day 6 carries the Skytree, Solamachi, and Akihabara cluster, while Day 7 keeps the Imperial Palace, a short Shinjuku stop, bag pickup or handoff, and the airport transfer tidy.",
          ja: "6日目にスカイツリー、ソラマチ、秋葉原をまとめ、7日目は皇居、新宿、荷物、空港移動を軽めに組んでいます。"
        }
      ],
      dayLinks: [{ day: 4 }, { day: 5 }, { day: 6 }, { day: 7 }],
      primaryDay: 4,
      segmentIds: ["fuji-tokyo"],
      lngLat: [139.7017, 35.658],
      labelPosition: "ne"
    }
  ];

  const routeDayViews = [
    {
      day: 1,
      stopIds: ["osaka"],
      segmentIds: [],
      badges: [
        { en: "Arrival day", ja: "到着日" },
        { en: "Osaka start", ja: "大阪スタート" }
      ]
    },
    {
      day: 2,
      stopIds: ["osaka", "kyoto"],
      segmentIds: ["osaka-kyoto"],
      badges: [
        { en: "Kaiyukan + Kyoto", ja: "海遊館＋京都" },
        { en: "Aquarium then walk", ja: "水族館から街歩き" }
      ]
    },
    {
      day: 3,
      stopIds: ["kyoto", "fuji-gateway", "fuji"],
      segmentIds: ["kyoto-mishima-shinkansen", "fuji-gateway-kawaguchiko"],
      badges: [
        { en: "Arashiyama + transfer", ja: "嵐山＋移動" },
        { en: "Fuji transfer night", ja: "富士への移動日" }
      ],
      transitActions: [
        {
          id: "kyoto-mishima-shinkansen",
          label: { en: "Shinkansen detail", ja: "新幹線詳細" }
        },
        {
          id: "fuji-gateway-kawaguchiko",
          label: { en: "Fuji access detail", ja: "富士アクセス詳細" }
        }
      ]
    },
    {
      day: 4,
      stopIds: ["fuji", "tokyo"],
      segmentIds: ["fuji-tokyo"],
      badges: [
        { en: "Fuji day", ja: "富士エリアの日" },
        { en: "Tokyo handoff", ja: "東京への受け渡し" }
      ],
      transitActions: [
        {
          id: "kawaguchiko-tokyo",
          label: { en: "Tokyo arrival detail", ja: "東京到着詳細" }
        }
      ]
    },
    {
      day: 5,
      stopIds: ["tokyo"],
      segmentIds: [],
      badges: [
        { en: "West Tokyo", ja: "西東京側" },
        { en: "Shibuya focus", ja: "渋谷中心" }
      ]
    },
    {
      day: 6,
      stopIds: ["tokyo"],
      segmentIds: [],
      badges: [
        { en: "Full Tokyo day", ja: "東京観光メイン日" },
        { en: "Skytree side", ja: "スカイツリー側" }
      ]
    },
    {
      day: 7,
      stopIds: ["tokyo"],
      segmentIds: [],
      badges: [
        { en: "Departure day", ja: "帰国日" },
        { en: "Keep it light", ja: "軽めに動く日" }
      ]
    }
  ];

  const routeDayStops = {
    1: [
      { en: "Minami", ja: "ミナミ" },
      { en: "Dotonbori", ja: "道頓堀" },
      { en: "Shinsaibashi", ja: "心斎橋" }
    ],
    2: [
      { en: "Kaiyukan", ja: "海遊館" },
      { en: "Kiyomizu-dera", ja: "清水寺" },
      { en: "Ninenzaka", ja: "二年坂" },
      { en: "Yasaka Pagoda", ja: "八坂の塔" },
      { en: "Gion", ja: "祇園" }
    ],
    3: [
      { en: "Arashiyama", ja: "嵐山" },
      { en: "Kyoto → Mishima", ja: "京都 → 三島" },
      { en: "Kawaguchiko", ja: "河口湖" }
    ],
    4: [
      { en: "Chureito Shimoyoshida", ja: "忠霊塔・下吉田" },
      { en: "Lake Kawaguchiko", ja: "河口湖" },
      { en: "Tokyo / Shibuya", ja: "東京・渋谷" }
    ],
    5: [
      { en: "Shibuya Crossing", ja: "渋谷交差点" },
      { en: "Shibuya Food Walk", ja: "渋谷フードウォーク" },
      { en: "Shibuya Sky", ja: "渋谷スカイ" }
    ],
    6: [
      { en: "Tokyo Skytree", ja: "東京スカイツリー" },
      { en: "Akihabara", ja: "秋葉原" }
    ],
    7: [
      { en: "Imperial Palace", ja: "皇居" },
      { en: "Shinjuku", ja: "新宿" }
    ]
  };

  return {
    tripNotes,
    routeSegments,
    routeStops,
    routeDayViews,
    routeDayStops
  };
})();
