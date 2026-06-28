export default [
  // ─────────────────────────────────────────────────────────────────────────
  // 9. QUEENSTOWN, NEW ZEALAND
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'queenstown',
    name: 'Queenstown',
    country: 'New Zealand',
    continent: 'Oceania',
    lat: -45.0312,
    lng: 168.6626,
    flag: '🇳🇿',
    capital: 'Wellington',
    population: 47000,
    bestSeason: 'December–February for hiking; June–August for skiing',
    budget: 'Premium · NZD 200–400 / day',
    timezone: 'NZST (UTC+12)',

    wonders: [
      {
        name: 'Lake Wakatipu',
        description:
          'A vast Z-shaped glacial lake of astonishing clarity, cradled by the jagged Remarkables and seeming to breathe with a slow natural tide.',
        imageQuery: 'Lake Wakatipu Queenstown mountains',
      },
      {
        name: 'The Remarkables',
        description:
          'A serrated mountain range that turns gold at dawn and white in winter, one of the few ranges on Earth running true north-south.',
        imageQuery: 'The Remarkables mountains Queenstown',
      },
      {
        name: 'Milford Sound',
        description:
          'A fjord of sheer cliffs and plunging waterfalls where dolphins and seals play beneath Mitre Peak — a day trip into pure sublimity.',
        imageQuery: 'Milford Sound fjord Mitre Peak',
      },
      {
        name: 'Skyline Gondola views',
        description:
          'A steep cable car to a ridge-top panorama over the lake, town and mountains — the postcard of Queenstown.',
        imageQuery: 'Queenstown skyline gondola view lake',
      },
    ],

    hiddenGems: [
      {
        name: 'Glenorchy & Paradise',
        description:
          'A serene drive to the lake’s head where Middle-earth scenery gives way to a tiny settlement literally named Paradise.',
        imageQuery: 'Glenorchy New Zealand lake mountains',
      },
      {
        name: 'Arrowtown',
        description:
          'A gold-rush village of stone cottages and autumn-gold avenues, with a poignant restored Chinese miners’ settlement.',
        imageQuery: 'Arrowtown autumn New Zealand',
      },
      {
        name: 'Moke Lake',
        description:
          'A hidden mirror lake minutes from town, ringed by tussock hills — a local secret for wild camping and dawn paddles.',
        imageQuery: 'Moke Lake Queenstown reflection',
      },
    ],

    food: [
      {
        name: 'Fergburger',
        description:
          'A globally famous burger joint whose queues never end — towering, juicy and a Queenstown rite of passage.',
        imageQuery: 'Fergburger Queenstown burger',
      },
      {
        name: 'Bluff oysters',
        description:
          'Plump, briny oysters from the cold southern waters, a seasonal South Island delicacy savoured raw.',
        imageQuery: 'Bluff oysters New Zealand',
      },
      {
        name: 'Central Otago lamb',
        description:
          'Tender, grass-fed lamb from the surrounding high country, the pride of the local table.',
        imageQuery: 'New Zealand roast lamb dish',
      },
      {
        name: 'Central Otago Pinot Noir',
        description:
          'World-class pinot from the world’s southernmost wine region, tasted in vineyards minutes from town.',
        imageQuery: 'Central Otago vineyard wine New Zealand',
      },
    ],

    adventures: [
      {
        name: 'Bungy jumping',
        description:
          'Leap from the Kawarau Bridge, birthplace of commercial bungy, or the vertiginous Nevis high above a canyon.',
        imageQuery: 'bungy jump Kawarau bridge Queenstown',
      },
      {
        name: 'Shotover jet boat',
        description:
          'A heart-in-mouth blast through narrow rocky canyons, spinning 360s inches from the walls.',
        imageQuery: 'Shotover jet boat canyon Queenstown',
      },
      {
        name: 'Skiing & snowboarding',
        description:
          'Winter carving at Coronet Peak and The Remarkables, with lake views from the lifts.',
        imageQuery: 'skiing Remarkables Queenstown snow',
      },
      {
        name: 'Skydiving over the lake',
        description:
          'Freefall above Wakatipu and the Southern Alps on one of the planet’s most scenic jumps.',
        imageQuery: 'skydiving Queenstown lake mountains',
      },
    ],

    seasons: {
      spring:
        'September–November greens the valleys, blossoms fill Arrowtown and the rivers run high with snowmelt.',
      summer:
        'December–February is long, bright and warm — prime hiking, biking, lake swimming and wine country weather.',
      autumn:
        'March–May sets the willows and poplars ablaze in gold, the photographer’s favourite season.',
      winter:
        'June–August brings snow, ski fields and a buzzing alpine-town atmosphere with crisp blue days.',
    },

    culture: {
      language: 'English; Te Reo Māori is an official language',
      religion: 'Predominantly secular, with Christian and Māori spiritual traditions',
      greeting: 'A friendly "Kia ora" (Māori) or "G’day"; New Zealanders are relaxed and direct',
      etiquette: [
        'Respect the land (whenua) — carry out all rubbish and stay on marked trails.',
        'Remove shoes when entering many homes.',
        'Tipping is not expected, though appreciated for great service.',
        'Learn a few Te Reo Māori words; they’re warmly received.',
      ],
      festivals: [
        {
          name: 'Queenstown Winter Festival',
          when: 'June',
          description:
            'A ten-day alpine party of fireworks, night skiing, comedy and quirky on-snow events.',
        },
        {
          name: 'Arrowtown Autumn Festival',
          when: 'April',
          description:
            'A celebration of the gold-rush heritage amid the village’s spectacular autumn colour.',
        },
        {
          name: 'Matariki',
          when: 'June/July',
          description:
            'The Māori New Year, marked by the rising of the Pleiades with remembrance, feasting and renewal.',
        },
      ],
    },

    heroQuote: 'Where snow-capped peaks plunge into a lake of liquid sky.',
    heroMedia: {
      title: 'Dawn on Lake Wakatipu',
      imageQuery: 'Lake Wakatipu sunrise Remarkables Queenstown',
      atmosphere: 'Cold clear mountain air, mirror-still water and the first gold light on the peaks.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Queenstown aerial lake mountains town',
        description: 'The town sits on a blue lake hemmed by snow-streaked mountains.',
      },
      {
        title: 'The Adrenaline',
        imageQuery: 'bungy jump canyon Queenstown',
        description: 'Over a turquoise river, someone steps off into nothing — and laughs.',
      },
      {
        title: 'The Fjord',
        imageQuery: 'Milford Sound waterfall cliffs',
        description: 'Waterfalls pour a thousand metres down the walls of Milford Sound.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Queenstown lake sunset mountains',
        description: 'The Remarkables blush pink above a lake turning to rose-gold.',
      },
      {
        title: 'Night',
        imageQuery: 'Queenstown town lights night lake',
        description: 'Town lights shimmer on the dark water beneath a brilliant southern sky.',
      },
    ],

    photoCollections: {
      hero: ['Queenstown Lake Wakatipu', 'The Remarkables mountains', 'Queenstown skyline gondola'],
      nature: ['Milford Sound fjord', 'Glenorchy New Zealand', 'New Zealand Southern Alps lake'],
      culture: ['Arrowtown historic village', 'Maori carving New Zealand', 'Central Otago vineyard'],
      food: ['Fergburger Queenstown', 'New Zealand lamb dish', 'New Zealand wine tasting'],
      night: ['Queenstown night lake lights', 'Queenstown stars night sky', 'Queenstown winter festival fireworks'],
      hidden: ['Moke Lake Queenstown', 'Glenorchy paradise road', 'Arrowtown autumn trees'],
    },

    ambience: {
      soundscape: ['Wind off the lake', 'Snow crunching underfoot', 'A jet boat roaring through a canyon', 'Birdsong in beech forest'],
      musicStyle: 'Indie folk and acoustic, with Māori waiata',
      weatherMood: 'Crisp alpine clarity over a brilliant blue lake',
    },

    story:
      'Queenstown has a way of making you braver than you are. Maybe it’s the air — thin, cold, impossibly clean — or the way the Remarkables rear straight up out of a lake so blue it looks switched on. Whatever it is, you arrive intending to relax and somehow find yourself stepping off a bridge with a cord around your ankles, screaming with joy above a turquoise river. This is the town that invented the bungy, after all, and adrenaline is its love language. But there’s a quiet New Zealand here too: a slow drive to Glenorchy where the scenery turns to something out of myth, a vineyard lunch above golden vines, a fjord called Milford where waterfalls fall from the clouds and the silence has weight. By evening you’re back by the lake with a famous burger and a glass of local pinot, watching the peaks turn pink, your heart still racing a little, already planning tomorrow’s adventure.',

    experiences: [
      'Bungy jump from the historic Kawarau Bridge',
      'Day trip to Milford Sound by road or scenic flight',
      'Shotover canyon jet-boat ride',
      'Skyline gondola and luge above the lake',
      'Central Otago winery tour and tasting',
      'Hike or bike the Queenstown trails and Ben Lomond',
      'Winter skiing at Coronet Peak or The Remarkables',
      'Wander gold-rush Arrowtown and pan for gold',
    ],

    moods: ['Adventure', 'Adrenaline', 'Nature', 'Scenic', 'Active'],
    travelStyle: ['Adventure', 'Couples', 'Friends', 'Active Travelers'],

    aiSummary:
      'Queenstown is the world’s adventure capital wrapped in jaw-dropping alpine scenery — bungy, jet boats, skiing, hiking and Milford Sound on the doorstep. It suits thrill-seekers, active couples and groups of friends who want adrenaline and nature over culture-heavy or budget travel. Visit in summer for hiking and lakes, winter for skiing, or autumn for golden colour. It’s pricey and outdoorsy, less ideal for travellers wanting beaches, big-city life or pure relaxation — though wine country offers a gentler pace. Choose Queenstown to feel fully, exhilaratingly alive.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 48. ROTORUA, NEW ZEALAND
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'rotorua',
    name: 'Rotorua',
    country: 'New Zealand',
    continent: 'Oceania',
    lat: -38.1368,
    lng: 176.2497,
    flag: '🇳🇿',
    capital: 'Wellington',
    population: 58000,
    bestSeason: 'Year-round; November–April for warm days and lake swimming',
    budget: 'Moderate · NZD 150–300 / day',
    timezone: 'NZST (UTC+12)',

    wonders: [
      {
        name: 'Wai-O-Tapu geothermal park',
        description:
          'A surreal volcanic wonderland of steaming craters, the rainbow Champagne Pool and the lurid green Devil’s Bath.',
        imageQuery: 'Wai-O-Tapu Champagne Pool Rotorua geothermal',
      },
      {
        name: 'Te Puia & Pōhutu Geyser',
        description:
          'A Māori cultural centre where the great Pōhutu geyser erupts up to 30 metres beside a carving and weaving school.',
        imageQuery: 'Pohutu geyser Te Puia Rotorua eruption',
      },
      {
        name: 'Whakarewarewa living village',
        description:
          'A Māori village built among the steam vents, where residents still cook in hot pools and share their living culture.',
        imageQuery: 'Whakarewarewa Maori village Rotorua steam',
      },
      {
        name: 'Redwoods Treewalk',
        description:
          'A canopy walkway through towering Californian redwoods, magical by day and lantern-lit by night.',
        imageQuery: 'Redwoods Treewalk Rotorua forest canopy',
      },
    ],

    hiddenGems: [
      {
        name: 'Lake Tarawera & the buried village',
        description:
          'A serene lake beneath the volcano that erupted in 1886, with the excavated village it buried nearby.',
        imageQuery: 'Lake Tarawera Rotorua volcano New Zealand',
      },
      {
        name: 'Kerosene Creek',
        description:
          'A free natural hot stream in the forest where you can soak in warm geothermal water beneath a little waterfall.',
        imageQuery: 'Kerosene Creek Rotorua hot stream waterfall',
      },
      {
        name: 'Wai-O-Tapu mud pools',
        description:
          'Glooping, plopping pools of grey volcanic mud bubbling away beside the road — strangely mesmerising and free.',
        imageQuery: 'Rotorua mud pools bubbling geothermal',
      },
    ],

    food: [
      {
        name: 'Hāngī',
        description:
          'A traditional Māori feast of meat and vegetables slow-steamed in an earth oven over heated stones — or geothermal steam.',
        imageQuery: 'Maori hangi feast New Zealand earth oven',
      },
      {
        name: 'Steamed corn & geothermal cooking',
        description:
          'Sweet corn and food cooked directly in the village’s natural hot pools and steam boxes.',
        imageQuery: 'geothermal cooking Whakarewarewa Rotorua corn',
      },
      {
        name: 'Fresh lake trout',
        description:
          'Rainbow trout from the surrounding lakes, often pan-fried simply (you catch it, a chef cooks it).',
        imageQuery: 'New Zealand trout dish Rotorua lake',
      },
      {
        name: 'Manuka honey & kawakawa tea',
        description:
          'Prized local manuka honey and earthy tea brewed from the native kawakawa plant.',
        imageQuery: 'manuka honey New Zealand kawakawa',
      },
    ],

    adventures: [
      {
        name: 'White-water rafting Kaituna',
        description:
          'Plunging over the 7-metre Tutea Falls, the highest commercially rafted waterfall in the world.',
        imageQuery: 'Kaituna rafting waterfall Rotorua New Zealand',
      },
      {
        name: 'Zorbing & luge',
        description:
          'Rolling downhill inside a giant water-filled ball, then racing the gondola-served luge tracks above the lake.',
        imageQuery: 'zorbing Rotorua New Zealand ball',
      },
      {
        name: 'Mountain biking the Whakarewarewa forest',
        description:
          'World-class trails winding through redwood and native forest for every level of rider.',
        imageQuery: 'mountain biking Redwoods forest Rotorua',
      },
    ],

    seasons: {
      spring:
        'September–November freshens the forests and lakes with mild days and lambing-season green.',
      summer:
        'December–February is warm and lively — lake swimming, biking and long evenings (geothermal sites busiest).',
      autumn:
        'March–May brings crisp golden days and steaming geothermal sites dramatic against the cooler air.',
      winter:
        'June–August is cool and damp but atmospheric, the steam most visible and hot pools most inviting.',
    },

    culture: {
      language: 'English and Te Reo Māori; Rotorua is a heartland of Māori culture',
      religion: 'Christian and Māori spiritual traditions',
      greeting: '"Kia ora"; you may be welcomed onto a marae with a hongi (pressing of noses)',
      etiquette: [
        'Respect marae protocol — remove shoes, follow your host and don’t sit on tables or eat in sacred areas.',
        'Never touch a carving or another person’s head without permission; both are tapu (sacred).',
        'Don’t step over people; walk around them.',
        'Engage respectfully with Māori culture — it is living, not a performance.',
      ],
      festivals: [
        {
          name: 'Matariki',
          when: 'June/July',
          description:
            'The Māori New Year, marked by the rising of the Pleiades with remembrance, feasting and renewal.',
        },
        {
          name: 'Te Matatini (national, periodic)',
          when: 'Varies',
          description:
            'The great national kapa haka festival of Māori performing arts, a powerful celebration of culture.',
        },
        {
          name: 'Waitangi Day',
          when: 'February 6',
          description:
            'New Zealand’s national day, commemorating the founding treaty with ceremonies and cultural events.',
        },
      ],
    },

    heroQuote: 'Where the earth steams and bubbles and Māori culture beats at its living heart.',
    heroMedia: {
      title: 'Steam over the Champagne Pool',
      imageQuery: 'Wai-O-Tapu Champagne Pool steam Rotorua sunrise',
      atmosphere: 'Sulphur-tinged warm air, hissing steam vents and mineral pools glowing orange and green.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Rotorua lake geothermal steam aerial New Zealand',
        description: 'Steam drifts off a lake-side town in volcanic country.',
      },
      {
        title: 'The Geothermal',
        imageQuery: 'Wai-O-Tapu geothermal craters Rotorua color',
        description: 'You walk among steaming craters and lurid mineral pools.',
      },
      {
        title: 'The Culture',
        imageQuery: 'Maori haka performance Rotorua carving',
        description: 'A Māori welcome erupts in haka, song and carving.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Rotorua lake sunset steam geothermal',
        description: 'The lake and rising steam glow gold as the sun drops.',
      },
      {
        title: 'Night',
        imageQuery: 'Redwoods Treewalk Rotorua night lanterns',
        description: 'Lantern-lit walkways glow through the dark redwood canopy.',
      },
    ],

    photoCollections: {
      hero: ['Wai-O-Tapu Champagne Pool Rotorua', 'Pohutu geyser Te Puia Rotorua', 'Rotorua lake geothermal steam'],
      nature: ['Rotorua redwoods forest', 'Lake Tarawera New Zealand', 'Rotorua mud pools bubbling'],
      culture: ['Maori haka Rotorua', 'Maori carving Te Puia', 'Whakarewarewa village Rotorua'],
      food: ['Maori hangi feast', 'New Zealand trout Rotorua', 'manuka honey New Zealand'],
      night: ['Redwoods Treewalk night Rotorua', 'Rotorua geothermal steam night', 'Rotorua lake night stars'],
      hidden: ['Kerosene Creek Rotorua hot stream', 'Lake Tarawera buried village', 'Rotorua native forest trail'],
    },

    ambience: {
      soundscape: ['Hissing steam vents', 'Bubbling mud pools', 'A Māori haka and waiata', 'Birdsong in the redwoods'],
      musicStyle: 'Māori waiata and taonga pūoro (traditional instruments)',
      weatherMood: 'Earthy and steaming, sulphur in the cool lake air',
    },

    story:
      'You smell Rotorua before you see it — the faint sulphur tang of an earth that hasn’t finished forming. This lake-side town in the volcanic heart of New Zealand’s North Island sits on top of a living, breathing geothermal field, and the land here simply will not stay still: steam rises from drains and parks and gardens, mud pools glug and plop by the roadside, hot springs bubble up in the forest, and a giant geyser erupts on cue beside a carved meeting house. But Rotorua is more than geology — it is the beating heart of Māori culture, and that’s what makes it unforgettable. You’re welcomed onto a marae with a haka that raises the hair on your arms, you watch carvers and weavers at work, you share a hāngī feast cooked in the steaming earth, and you listen to stories of the land told by the people who have lived with it for centuries. By day you raft the highest waterfall you can legally go over and soak in a wild hot stream; by night you walk a lantern-lit canopy through towering redwoods. Few places fuse raw nature and living culture so completely.',

    experiences: [
      'Walk the steaming craters of Wai-O-Tapu',
      'Māori cultural evening with haka and hāngī feast',
      'Visit the living village of Whakarewarewa',
      'Raft the 7-metre Tutea Falls on the Kaituna',
      'Soak free in the forest at Kerosene Creek',
      'Night lantern walk through the Redwoods canopy',
      'Watch the Pōhutu geyser erupt at Te Puia',
      'Mountain bike or hike the Whakarewarewa forest',
    ],

    moods: ['Cultural', 'Adventure', 'Nature', 'Awe', 'Family'],
    travelStyle: ['Family', 'Couples', 'Adventure', 'Culture Seekers'],

    aiSummary:
      'Rotorua is New Zealand’s geothermal and Māori-culture heartland — steaming craters, geysers, hot springs, redwood forest and powerful living indigenous culture. It suits families, couples, adventurers and culture-seekers who want a mix of natural spectacle, soft adventure and authentic cultural experiences. Visitable year-round, with warm lake days in summer and dramatic steam in winter. Affordable to mid-range and very accessible, it’s a North Island highlight and a vivid contrast to adventure-capital Queenstown. Engage respectfully with Māori culture, which is living and central here. Choose Rotorua to feel the earth breathe and meet Māoritanga firsthand.',
  },
]
