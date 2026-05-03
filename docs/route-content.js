window.__JAPAN_ROUTE_CONTENT__ = (() => {
  const tripNotes = [
    {
      day: 1,
      title: { en: "Osaka Arrival + Opening Kaiyukan", ja: "大阪到着と開館時間の海遊館" },
      note: {
        en: "Use 6:00–9:30 AM for immigration, baggage, breakfast, lockers or hotel bag drop, and transit setup. Put Kaiyukan at opening around 10:00 AM, then save Shinsaibashi, dinner, and Dotonbori for the late afternoon/night.",
        ja: "6:00～9:30は入国、荷物、朝食、ロッカーまたはホテル荷物預け、移動準備に使う。海遊館は10:00頃の開館時間に合わせ、心斎橋、夕食、道頓堀は午後遅めから夜へ回す。"
      },
      summary: {
        en: "Arrival admin first, Kaiyukan at opening, then Minami after the city lights come on.",
        ja: "到着処理を先に済ませ、開館時間に海遊館、その後は明かりが入るミナミへ。"
      }
    },
    {
      day: 2,
      title: { en: "Kyoto", ja: "京都" },
      note: {
        en: "Keep Day 2 framed as a tight Kyoto walking flow. Transfer/bag drop first, then Kiyomizu-dera -> Ninenzaka -> Yasaka Pagoda -> Gion with only small walking/photo/crowd buffers.",
        ja: "2日目は京都の徒歩導線をタイトにまとめる。移動と荷物預けを先に済ませ、清水寺 -> 二年坂 -> 八坂の塔 -> 祇園を、小さな徒歩・写真・混雑バッファだけでつなぐ。"
      },
      summary: {
        en: "Kyoto hotel/bag drop, Kiyomizu-dera, Ninenzaka, Yasaka Pagoda, then Gion into evening.",
        ja: "京都ホテル／荷物預け、清水寺、二年坂、八坂の塔、夕方以降の祇園。"
      }
    },
    {
      day: 3,
      title: { en: "1 Bullet Train ride to Mishima", ja: "三島へ新幹線移動" },
      note: {
        en: "Start Arashiyama early: use roughly 7:00–9:00 AM for Bamboo Grove, Togetsukyo Bridge, and quiet photos, then 9:00–11:30 AM for temples, shops, and food. After that, keep the route correct and simple: Kyoto -> Mishima by Shinkansen, then onward to Fujikawaguchiko.",
        ja: "嵐山は早めに始める。7:00～9:00頃を竹林、渡月橋、静かな写真時間に使い、9:00～11:30頃を寺社、店、食事に使う。その後は京都 -> 三島を新幹線で進み、富士河口湖へつなぐ。"
      },
      summary: {
        en: "Early Arashiyama, 1 Bullet Train ride to Mishima, Fujikawaguchiko transfer, then the onsen reset.",
        ja: "早朝の嵐山、京都 -> 三島の新幹線、富士河口湖への移動、温泉宿でリセット。"
      }
    },
    {
      day: 4,
      title: { en: "Fuller Fuji Day", ja: "富士エリアをしっかり回る日" },
      note: {
        en: "Keep Chureito Shimoyoshida early for the best Fuji odds, with time for the 398 stairs, photos, and a rest. Then move through Lake Kawaguchiko and Oishi Park, leaving the Panoramic Ropeway optional for clear weather, energy, crowds, and time.",
        ja: "富士山が見えやすい朝に忠霊塔・下吉田を置き、398段の階段、写真、休憩時間を入れる。その後は河口湖と大石公園へ回し、パノラマロープウェイは天気、体力、混雑、時間が合う場合だけにする。"
      },
      summary: {
        en: "Chureito early, Lake Kawaguchiko, Oishi Park, optional ropeway, then a second Fuji-area night.",
        ja: "朝の忠霊塔、河口湖、大石公園、任意のロープウェイ、その後は富士エリア2泊目。"
      }
    },
    {
      day: 5,
      title: { en: "Central Tokyo Transfer + Shibuya Sunset", ja: "東京中心部移動と渋谷の夕景" },
      note: {
        en: "Use the morning or midday to transfer from Kawaguchiko to a Central Tokyo hotel, then check in or drop bags. A central base makes the Tokyo days easier to traverse. Keep Shibuya Sky around sunset, then Shibuya Crossing after dark and a simple Shibuya food walk.",
        ja: "午前から昼に河口湖から東京中心部のホテルへ移動し、チェックインまたは荷物預けを済ませる。東京中心部の拠点にすると都内を回りやすい。夕方は渋谷スカイ、日没後は渋谷交差点、最後に渋谷で軽く食べ歩く。"
      },
      summary: {
        en: "Fuji -> Central Tokyo, hotel bag drop, Shibuya Sky near sunset, crossing after dark, food walk.",
        ja: "富士 -> 東京中心部、ホテル荷物預け、夕方の渋谷スカイ、日没後の交差点、食べ歩き。"
      }
    },
    {
      day: 6,
      title: { en: "East Tokyo + Shinjuku Night", ja: "東京東側と新宿の夜" },
      note: {
        en: "Start earlier and treat Tokyo Skytree plus Solamachi as one connected block. Keep Akihabara short, around 1.5-2.5 hours, then move Shinjuku into the evening for city lights, food, and walking without pushing the night too late.",
        ja: "早めに始め、東京スカイツリーとソラマチは一つのまとまりとして扱う。秋葉原は1.5～2.5時間程度に短くし、夕方以降は新宿へ移って夜景、食事、散歩を無理に遅くしすぎず楽しむ。"
      },
      summary: {
        en: "Skytree/Solamachi as one block, short Akihabara, then Shinjuku night.",
        ja: "スカイツリー／ソラマチを一つに、短めの秋葉原、その後は新宿の夜。"
      }
    },
    {
      day: 7,
      title: { en: "Final Airport Day", ja: "最終空港日" },
      note: {
        en: "Keep the departure day airport-safe. Use the Outer Imperial Palace / Nijubashi area as a quick photo stop, add only a simple lunch or short nearby walk if it fits, then pick up bags and protect a strong airport buffer.",
        ja: "帰国日は空港優先で軽くする。皇居外苑・二重橋は短い写真ストップにし、合う場合だけ軽い昼食か近場の短い散歩を足す。その後は荷物回収と空港移動の強い余裕を守る。"
      },
      summary: {
        en: "Outer palace / Nijubashi photo stop, optional simple lunch, bag pickup, airport transfer.",
        ja: "皇居外苑・二重橋の写真、任意の軽い昼食、荷物回収、空港移動。"
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
      title: { en: "Osaka -> Kyoto East", ja: "大阪 -> 京都東側" },
      summary: {
        en: "Day 2 moves cleanly from Osaka into the east-side Kyoto walking cluster.",
        ja: "2日目は大阪から京都東側の徒歩中心エリアへ、分かりやすく移る区間です。"
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
      title: { en: "1 Bullet Train ride to Mishima", ja: "三島へ新幹線移動" },
      summary: {
        en: "This is the clean Day 3 handoff from Kyoto Station into the Mt. Fuji side.",
        ja: "京都駅から富士側へ入るための、分かりやすい3日目の受け渡しです。"
      },
      badges: [
        { en: "Day 3", ja: "3日目" },
        { en: "Bullet Train ride", ja: "新幹線移動" }
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
          label: { en: "Bullet Train detail", ja: "新幹線詳細" }
        }
      ],
      stopIds: ["kyoto", "fuji-gateway"],
      coordinates: routeSegmentCoordinateDefinitions.kyotoMishima
    },
    {
      id: "fuji-gateway-kawaguchiko",
      title: { en: "Mishima -> Kawaguchiko", ja: "三島 -> 河口湖" },
      summary: {
        en: "This is the local access leg into the lake base, trading the Mishima arrival for the quieter Fuji-area night.",
        ja: "この区間で三島到着から湖側の拠点へ移り、静かな富士エリアの夜へつなげます。"
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
      title: { en: "Mt. Fuji area -> Central Tokyo", ja: "富士エリア -> 東京中心部" },
      summary: {
        en: "Day 5 is the clean Tokyo handoff from the Fuji side into a central Tokyo base.",
        ja: "5日目は富士側から東京中心部の拠点へ入る、きれいな東京ハンドオフです。"
      },
      badges: [
        { en: "Day 5", ja: "5日目" },
        { en: "Tokyo handoff", ja: "東京への受け渡し" }
      ],
      notes: [
        {
          en: "Use this when you want the transfer separated from the fuller Fuji-area day before it.",
          ja: "前日の富士エリアをしっかり回る日と切り分けて、東京への移動だけ見たいときに使います。"
        },
        {
          en: "The linked transit detail keeps the highway-bus and rail fallback options together for the central Tokyo bag-drop flow.",
          ja: "関連詳細には、東京中心部の荷物預けへつなぐ高速バスと鉄道代替案をまとめています。"
        }
      ],
      dayLinks: [{ day: 5 }],
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
        en: "Osaka handles the early arrival setup, Kaiyukan at opening, and the Minami evening before the route moves into Kyoto.",
        ja: "大阪は、早朝到着の準備、開館時間の海遊館、ミナミの夜をまとめ、その後は京都側へ進みます。"
      },
      badges: [
        { en: "Days 1-3", ja: "1-3日目" },
        { en: "Base stay", ja: "滞在拠点" }
      ],
      notes: [
        {
          en: "This stop covers arrival admin, Kaiyukan at opening, Shinsaibashi, dinner in Minami, and Dotonbori after dark before Kyoto.",
          ja: "この地点は、到着準備、開館時間の海遊館、心斎橋、ミナミでの夕食、夜の道頓堀を京都へ向かう前にまとめます。"
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
          en: "Day 2 stays focused on the direct Kyoto East chain: Kiyomizu-dera, Ninenzaka, Yasaka Pagoda, and Gion.",
          ja: "2日目は清水寺、二寧坂、八坂の塔、祇園を直接つなぐ京都東側の流れに集中します。"
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
        ja: "この地点は、三島到着から河口湖側のローカルアクセスへ切り替わる入口です。"
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
        en: "This stop groups the Day 3 Mishima handoff, two Fuji-area nights, and the fuller Day 4 Chureito, Kawaguchiko, Oishi Park, and optional ropeway block.",
        ja: "この地点は、3日目の三島ハンドオフ、富士エリア2泊、そして4日目の忠霊塔、河口湖、大石公園、任意のロープウェイをまとめています。"
      },
      badges: [
        { en: "Days 3-4", ja: "3日目-4日目" },
        { en: "Fuji base + stops", ja: "富士拠点と立ち寄り" }
      ],
      notes: [
        {
          en: "The route reaches the Fuji base on Day 3 and gives Day 4 enough room for stairs, photos, lake transit, food/rest, and weather flexibility.",
          ja: "このルートは3日目に富士エリア拠点へ入り、4日目は階段、写真、湖畔移動、食事と休憩、天候の余白まで確保します。"
        },
        {
          en: "Tokyo starts on Day 5, which keeps the Fuji day from ending too early or forcing a rushed evening transfer.",
          ja: "東京入りは5日目に移し、富士の日が早く終わりすぎたり、夕方移動で急ぎすぎたりしないようにします。"
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
        en: "Tokyo now anchors the Day 5 central hotel handoff, the East Tokyo plus Shinjuku day, and the light departure-day wrap-up.",
        ja: "東京は、5日目の中心部ホテルへの受け渡し、東京東側と新宿の日、そして軽い帰国日をまとめています。"
      },
      badges: [
        { en: "Days 5-7", ja: "5日目-7日目" },
        { en: "Main-route finish", ja: "本編の締め" }
      ],
      notes: [
        {
          en: "Move to a central Tokyo hotel on Day 5 so Shibuya, East Tokyo, Shinjuku, and the airport exit are easier to traverse.",
          ja: "5日目に東京中心部のホテルへ移ることで、渋谷、東京東側、新宿、空港への出発を回りやすくします。"
        },
        {
          en: "Day 6 keeps Skytree/Solamachi connected, Akihabara short, and Shinjuku for night; Day 7 stays airport-safe with the outer palace photo stop, optional simple lunch, bags, and transfer.",
          ja: "6日目はスカイツリー／ソラマチをつなげ、秋葉原を短めにし、新宿を夜へ。7日目は皇居外苑の写真、任意の軽い昼食、荷物、空港移動で安全にします。"
        }
      ],
      dayLinks: [{ day: 5 }, { day: 6 }, { day: 7 }],
      primaryDay: 5,
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
        { en: "Kyoto", ja: "京都" },
        { en: "Direct east walk", ja: "東側を直接歩く" }
      ]
    },
    {
      day: 3,
      stopIds: ["kyoto", "fuji-gateway", "fuji"],
      segmentIds: ["kyoto-mishima-shinkansen", "fuji-gateway-kawaguchiko"],
      badges: [
        { en: "1 Bullet Train ride to Mishima", ja: "三島へ新幹線移動" },
        { en: "Fuji transfer night", ja: "富士への移動日" }
      ],
      transitActions: [
        {
          id: "kyoto-mishima-shinkansen",
          label: { en: "Bullet Train detail", ja: "新幹線詳細" }
        },
        {
          id: "fuji-gateway-kawaguchiko",
          label: { en: "Fuji access detail", ja: "富士アクセス詳細" }
        }
      ]
    },
    {
      day: 4,
      stopIds: ["fuji"],
      segmentIds: [],
      badges: [
        { en: "Full Fuji day", ja: "富士エリアの日" },
        { en: "Second Fuji night", ja: "富士2泊目" }
      ],
      transitActions: [
        {
          id: "fuji-local-hops",
          label: { en: "Fuji local detail", ja: "富士エリア詳細" }
        }
      ]
    },
    {
      day: 5,
      stopIds: ["fuji", "tokyo"],
      segmentIds: ["fuji-tokyo"],
      badges: [
        { en: "Central Tokyo transfer", ja: "東京中心部へ移動" },
        { en: "Shibuya sunset", ja: "渋谷の夕景" }
      ],
      transitActions: [
        {
          id: "kawaguchiko-tokyo",
          label: { en: "Tokyo transfer detail", ja: "東京移動詳細" }
        }
      ]
    },
    {
      day: 6,
      stopIds: ["tokyo"],
      segmentIds: [],
      badges: [
        { en: "East Tokyo", ja: "東京東側" },
        { en: "Shinjuku night", ja: "新宿の夜" }
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
      { en: "Arrival setup", ja: "到着準備" },
      { en: "Kaiyukan", ja: "海遊館" },
      { en: "Minami", ja: "ミナミ" },
      { en: "Shinsaibashi", ja: "心斎橋" },
      { en: "Dotonbori", ja: "道頓堀" }
    ],
    2: [
      { en: "Kiyomizu-dera", ja: "清水寺" },
      { en: "Ninenzaka", ja: "二年坂" },
      { en: "Yasaka Pagoda", ja: "八坂の塔" },
      { en: "Gion", ja: "祇園" }
    ],
    3: [
      { en: "Arashiyama", ja: "嵐山" },
      { en: "1 Bullet Train ride to Mishima", ja: "三島へ新幹線移動" },
      { en: "Kawaguchiko", ja: "河口湖" }
    ],
    4: [
      { en: "Chureito Shimoyoshida", ja: "忠霊塔・下吉田" },
      { en: "Lake Kawaguchiko", ja: "河口湖" },
      { en: "Oishi Park", ja: "大石公園" },
      { en: "Optional Panoramic Ropeway", ja: "任意のパノラマロープウェイ" }
    ],
    5: [
      { en: "Transfer to Central Tokyo", ja: "東京中心部へ移動" },
      { en: "Hotel bag drop", ja: "ホテル荷物預け" },
      { en: "Shibuya Sky", ja: "渋谷スカイ" },
      { en: "Shibuya Crossing", ja: "渋谷交差点" },
      { en: "Shibuya Food Walk", ja: "渋谷フードウォーク" }
    ],
    6: [
      { en: "Tokyo Skytree + Solamachi", ja: "東京スカイツリー＋ソラマチ" },
      { en: "Akihabara", ja: "秋葉原" },
      { en: "Shinjuku night", ja: "新宿の夜" }
    ],
    7: [
      { en: "Outer Imperial Palace", ja: "皇居外苑" },
      { en: "Optional simple lunch", ja: "任意の軽い昼食" },
      { en: "Airport transfer", ja: "空港移動" }
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
