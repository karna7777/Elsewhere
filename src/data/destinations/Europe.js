export default [
  // ─────────────────────────────────────────────────────────────────────────
  // 3. AMALFI COAST, ITALY
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'amalfi-coast',
    name: 'Amalfi Coast',
    country: 'Italy',
    continent: 'Europe',
    lat: 40.634,
    lng: 14.6027,
    flag: '🇮🇹',
    capital: 'Rome',
    population: 5000,
    bestSeason: 'May–June and September for warm seas and thinner crowds',
    budget: 'Premium · €150–350 / day in high season',
    timezone: 'CET (UTC+1)',

    wonders: [
      {
        name: 'Positano',
        description:
          'A cascade of pastel houses tumbling down a cliff to a pebble beach, bougainvillea spilling over balconies above the turquoise sea.',
        imageQuery: 'Positano cliffside houses Amalfi',
      },
      {
        name: 'Amalfi Cathedral',
        description:
          'A striped Arab-Norman duomo crowning a grand staircase, its bronze doors cast in Constantinople a thousand years ago.',
        imageQuery: 'Amalfi Cathedral duomo stairs',
      },
      {
        name: 'Villa Rufolo, Ravello',
        description:
          'Cliff-top gardens 350 metres above the sea that inspired Wagner, now a stage for sunset concerts suspended over the blue.',
        imageQuery: 'Villa Rufolo Ravello garden sea',
      },
      {
        name: 'Path of the Gods',
        description:
          'A high mountain trail traversing the ridgeline from Bomerano to Positano, the whole coast unfurling far below your boots.',
        imageQuery: 'Path of the Gods Amalfi hiking trail',
      },
    ],

    hiddenGems: [
      {
        name: 'Fiordo di Furore',
        description:
          'A hidden fjord beach tucked beneath a soaring road bridge, reachable by a long staircase into a cleft in the cliffs.',
        imageQuery: 'Fiordo di Furore fjord Amalfi',
      },
      {
        name: 'Atrani',
        description:
          'Amalfi’s tiny, overlooked neighbour — a single piazza, a little beach and lanes too narrow for cars, blissfully local.',
        imageQuery: 'Atrani village Amalfi coast',
      },
      {
        name: 'Valle delle Ferriere',
        description:
          'A lush ravine above Amalfi where waterfalls feed rare ferns and the ruins of old paper mills moulder under green.',
        imageQuery: 'Valle delle Ferriere waterfall Amalfi',
      },
    ],

    food: [
      {
        name: 'Spaghetti alle vongole',
        description:
          'Pasta tossed with clams, garlic, white wine and parsley — the sea on a plate, eaten at a table over the water.',
        imageQuery: 'spaghetti alle vongole clams Italy',
      },
      {
        name: 'Delizia al limone',
        description:
          'A lemon-cream dome made from the giant sfusato lemons that grow in terraces along the cliffs.',
        imageQuery: 'delizia al limone lemon dessert Amalfi',
      },
      {
        name: 'Limoncello',
        description:
          'A bracing, ice-cold lemon liqueur sipped after dinner, made from the zest of those same fragrant lemons.',
        imageQuery: 'limoncello lemons Amalfi coast',
      },
      {
        name: 'Fresh seafood fritto',
        description:
          'A paper cone of lightly fried anchovies, calamari and prawns, salty and hot from a harbourside kiosk.',
        imageQuery: 'fritto misto seafood Amalfi',
      },
    ],

    adventures: [
      {
        name: 'Boat trip to Capri',
        description:
          'A day on the water to the glittering isle and its Blue Grotto, swimming off the deck in hidden coves along the way.',
        imageQuery: 'boat Capri Amalfi coast sea',
      },
      {
        name: 'Kayaking the coastline',
        description:
          'Paddling beneath the cliffs to sea caves, arches and beaches reachable no other way.',
        imageQuery: 'kayaking Amalfi coast cliffs',
      },
      {
        name: 'Hiking the Path of the Gods',
        description:
          'A three-hour cliff-top walk through terraced vineyards and wild herbs with vertiginous sea views the whole way.',
        imageQuery: 'Path of the Gods hike Positano',
      },
    ],

    seasons: {
      spring:
        'April–May bloom with wildflowers and lemon blossom; the sea is cool but the trails are perfect.',
      summer:
        'Hot, glamorous and crowded — warm swimming, long aperitivo evenings and packed beaches.',
      autumn:
        'September’s golden light and warm water with fewer crowds make it many regulars’ favourite month.',
      winter:
        'Quiet and shuttered; many hotels close, but the coast is dramatic, moody and yours alone.',
    },

    culture: {
      language: 'Italian; Neapolitan dialect widely heard',
      religion: 'Roman Catholic',
      greeting: 'A warm "Buongiorno" and, among friends, a kiss on each cheek',
      etiquette: [
        'Dress smartly and cover shoulders and knees inside churches.',
        'Cappuccino is a morning-only drink; never order one after a meal.',
        'Service is unhurried — lingering over dinner is the point, not a delay.',
        'A modest tip rounds the bill; large American-style tips aren’t expected.',
      ],
      festivals: [
        {
          name: 'Ravello Festival',
          when: 'July–August',
          description:
            'Classical concerts performed on the cliff-edge stage of Villa Rufolo, music drifting out over the sea.',
        },
        {
          name: 'Sant’Andrea (Amalfi)',
          when: 'June & November',
          description:
            'Townsmen race the saint’s heavy silver statue up the cathedral stairs in a roar of celebration.',
        },
        {
          name: 'Ferragosto',
          when: 'August 15',
          description:
            'Italy’s mid-summer holiday, marked here with beach feasts and fireworks over the bays.',
        },
      ],
    },

    heroQuote: 'Where lemon groves cling to cliffs above an impossibly blue sea.',
    heroMedia: {
      title: 'Positano at Golden Hour',
      imageQuery: 'Positano sunset Amalfi coast golden',
      atmosphere: 'Warm salt air, church bells over the bay and the clink of an evening aperitivo.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Amalfi coast road sea cliffs',
        description: 'The coast road threads along cliffs above a sea of unreal blue.',
      },
      {
        title: 'The Village',
        imageQuery: 'Positano stairs pastel houses',
        description: 'You descend stepped lanes between pastel houses and lemon trees.',
      },
      {
        title: 'On the Water',
        imageQuery: 'Amalfi coast boat turquoise sea',
        description: 'A wooden boat carries you past coves only the sea can reach.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Ravello terrace sunset sea Amalfi',
        description: 'From a cliff-top garden the whole coast turns to molten gold.',
      },
      {
        title: 'Night',
        imageQuery: 'Positano night lights sea Amalfi',
        description: 'Lights ripple down the cliff and across the dark water below.',
      },
    ],

    photoCollections: {
      hero: ['Positano cliffside', 'Amalfi cathedral steps', 'Ravello sea view terrace'],
      nature: ['Amalfi coast cliffs sea', 'Amalfi lemon groves terraces', 'Path of the Gods trail'],
      culture: ['Amalfi fishing village boats', 'Italian ceramics Amalfi', 'Amalfi cathedral interior'],
      food: ['Amalfi lemon dessert', 'Italian seafood pasta', 'limoncello Amalfi'],
      night: ['Positano night lights', 'Amalfi town night', 'Ravello concert evening'],
      hidden: ['Fiordo di Furore beach', 'Atrani village', 'Valle delle Ferriere waterfall'],
    },

    ambience: {
      soundscape: ['Church bells over the bay', 'Waves on pebble beaches', 'Vespa engines on the cliff road', 'Clinking glasses at aperitivo'],
      musicStyle: 'Neapolitan mandolin and classic Italian canzone',
      weatherMood: 'Warm Mediterranean light with a soft sea breeze',
    },

    story:
      'There is a moment, somewhere on the coast road, when you stop trusting your own eyes. The sea is too blue, the houses too perfectly pink and ochre, the cliffs too sheer to hold a town — and yet here it all is, draped down to the water as though Italy decided to show off. You descend a hundred sun-warmed steps into Positano, brushing past lemon trees heavy with fruit the size of your fist, and emerge at a little beach where wooden boats nod in the swell. Lunch is clams and cold white wine at a table where the waves nearly reach your feet. In the afternoon you climb to Ravello, where a garden hangs over the sea and music seems to belong to the air itself. By the time the sun sinks and the cliffs glow gold, then violet, then a scatter of lights, you’ve stopped taking photographs. Some places you simply have to feel.',

    experiences: [
      'Private wooden-boat day along the coast and into sea caves',
      'Sunset concert at Villa Rufolo in Ravello',
      'Lemon-grove tour and limoncello tasting on a cliff terrace',
      'Hike the Path of the Gods from Bomerano to Positano',
      'Pasta-making class with a Nonna above the sea',
      'Ceramic-painting workshop in Vietri sul Mare',
      'Aperitivo crawl through Atrani’s tiny piazza',
      'Early-morning swim before the beach clubs open',
    ],

    moods: ['Romantic', 'Luxury', 'Relaxation', 'Photography', 'Coastal'],
    travelStyle: ['Couples', 'Luxury', 'Honeymoon', 'Foodies'],

    aiSummary:
      'The Amalfi Coast is the definitive Italian romance: cliff-clinging villages, lemon groves, long seafood lunches and golden-hour views. It’s ideal for couples, honeymooners and food-lovers who want beauty and indulgence over nightlife or budget travel. Visit in May–June or September for warm water without August’s crush and prices. The terrain is steep and the coast pricey, so it favours slower, comfort-seeking travellers rather than backpackers or families needing flat, easy days. Choose the Amalfi Coast to fall in love — with Italy, or with someone, or both.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. REYKJAVIK, ICELAND
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'reykjavik',
    name: 'Reykjavik',
    country: 'Iceland',
    continent: 'Europe',
    lat: 64.1466,
    lng: -21.9426,
    flag: '🇮🇸',
    capital: 'Reykjavik',
    population: 135688,
    bestSeason: 'June–August for midnight sun; September–March for northern lights',
    budget: 'Expensive · ISK 25,000–45,000 / day',
    timezone: 'GMT (UTC+0)',

    wonders: [
      {
        name: 'Hallgrímskirkja',
        description:
          'A soaring concrete church inspired by basalt columns, its tower the best vantage over Reykjavik’s candy-coloured rooftops and the bay beyond.',
        imageQuery: 'Hallgrimskirkja church Reykjavik',
      },
      {
        name: 'The Golden Circle',
        description:
          'A loop linking the erupting Geysir, the thundering Gullfoss waterfall and Þingvellir, where two continents visibly pull apart.',
        imageQuery: 'Gullfoss waterfall Iceland Golden Circle',
      },
      {
        name: 'Blue Lagoon',
        description:
          'A milky-turquoise geothermal spa set in a black lava field, steaming against the cold under a vast Nordic sky.',
        imageQuery: 'Blue Lagoon Iceland geothermal spa',
      },
      {
        name: 'Northern Lights',
        description:
          'On clear winter nights the sky ripples green and violet over the city’s edge — the aurora that draws travellers from across the world.',
        imageQuery: 'Northern Lights Iceland aurora',
      },
    ],

    hiddenGems: [
      {
        name: 'Reykjadalur hot river',
        description:
          'A short hike into steaming hills above Hveragerði leads to a warm river you can bathe in, wild and free, amid fumaroles.',
        imageQuery: 'Reykjadalur hot river Iceland',
      },
      {
        name: 'Grótta lighthouse',
        description:
          'A tidal islet at the city’s edge with a little geothermal foot-bath, a favourite local spot for sunset and aurora away from the lights.',
        imageQuery: 'Grotta lighthouse Reykjavik sunset',
      },
      {
        name: 'Sun Voyager sculpture',
        description:
          'A gleaming steel dreamboat on the waterfront pointing toward the mountains — a quiet ode to undiscovered horizons.',
        imageQuery: 'Sun Voyager sculpture Reykjavik',
      },
    ],

    food: [
      {
        name: 'Plokkfiskur',
        description:
          'A comforting mash of poached fish, potato and onion in white sauce, served with dense dark rye — Icelandic home cooking at its best.',
        imageQuery: 'plokkfiskur Icelandic fish stew',
      },
      {
        name: 'Icelandic lamb',
        description:
          'Free-roaming, herb-and-moss-fed lamb, famously tender — slow-roasted or smoked into hangikjöt.',
        imageQuery: 'Icelandic roast lamb',
      },
      {
        name: 'Pylsur',
        description:
          'The legendary Icelandic hot dog of lamb and pork, dressed with crispy onions and a sweet-brown mustard — a national obsession.',
        imageQuery: 'Icelandic hot dog pylsur Reykjavik',
      },
      {
        name: 'Skyr',
        description:
          'A thick, protein-rich cultured dairy, eaten for centuries with berries or cream — somewhere between yoghurt and soft cheese.',
        imageQuery: 'skyr Icelandic dairy berries',
      },
    ],

    adventures: [
      {
        name: 'Glacier hiking & ice caves',
        description:
          'Crampon trekking on a glacier tongue and into electric-blue ice caves carved by meltwater.',
        imageQuery: 'glacier ice cave Iceland blue',
      },
      {
        name: 'Whale watching',
        description:
          'Boat trips from the old harbour to spot humpbacks, minkes and white-beaked dolphins in Faxaflói bay.',
        imageQuery: 'whale watching Iceland humpback',
      },
      {
        name: 'Snorkelling Silfra',
        description:
          'Drifting between two tectonic plates in glacial water so clear visibility runs over 100 metres.',
        imageQuery: 'Silfra snorkeling Iceland tectonic',
      },
    ],

    seasons: {
      spring:
        'April–May thaws the land green, puffins return to the cliffs and daylight stretches fast.',
      summer:
        'June–August brings the midnight sun, near-endless daylight, road-trip weather and highland access.',
      autumn:
        'September–October blends autumn colour with the first aurora and far fewer visitors.',
      winter:
        'November–March is dark, dramatic and magical — northern lights, ice caves and snow-dusted streets.',
    },

    culture: {
      language: 'Icelandic; English very widely spoken',
      religion: 'Lutheran Christianity, with strong folklore of elves and hidden folk',
      greeting: 'A simple handshake and "Halló"; Icelanders are informal and first-name',
      etiquette: [
        'Shower naked before entering any public pool or hot spring — it’s strictly observed.',
        'Respect nature: never drive off-road, as the fragile moss takes decades to recover.',
        'Tipping is not expected; service is included.',
        'Don’t mock belief in elves — it’s woven gently into the culture.',
      ],
      festivals: [
        {
          name: 'Reykjavik Culture Night',
          when: 'August',
          description:
            'The whole city throws open studios, stages and homes for a single day-into-night of art, music and fireworks.',
        },
        {
          name: 'Þorrablót',
          when: 'January–February',
          description:
            'A midwinter feast of fermented and cured traditional foods, defiantly celebrating the dark season.',
        },
        {
          name: 'Iceland Airwaves',
          when: 'November',
          description:
            'A renowned music festival turning the city’s venues into a showcase of new Icelandic and global sound.',
        },
      ],
    },

    heroQuote: 'Where fire and ice trade places beneath a sky that dances green.',
    heroMedia: {
      title: 'Aurora over the Capital',
      imageQuery: 'Northern lights Reykjavik Hallgrimskirkja',
      atmosphere: 'Bitter clean air, total silence and the slow green pulse of the aurora overhead.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Reykjavik colorful rooftops aerial',
        description: 'Brightly painted rooftops huddle between the grey sea and the mountains.',
      },
      {
        title: 'The Wild',
        imageQuery: 'Iceland waterfall lava landscape',
        description: 'Beyond the city, waterfalls and lava fields stretch to the horizon.',
      },
      {
        title: 'The Geothermal',
        imageQuery: 'Blue Lagoon steam Iceland',
        description: 'Steam rises off milky-blue water set in black volcanic rock.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Iceland midnight sun coast',
        description: 'In summer the sun rolls along the horizon but never quite sets.',
      },
      {
        title: 'Night',
        imageQuery: 'aurora borealis Iceland green sky',
        description: 'The northern lights uncoil across the dark like slow green fire.',
      },
    ],

    photoCollections: {
      hero: ['Hallgrimskirkja Reykjavik', 'Reykjavik harbour mountains', 'Sun Voyager sculpture'],
      nature: ['Iceland waterfall', 'Iceland glacier landscape', 'Iceland black sand beach'],
      culture: ['Reykjavik colorful houses', 'Icelandic wool sweater', 'Reykjavik street art'],
      food: ['Icelandic seafood', 'Icelandic hot dog', 'Reykjavik cafe cozy'],
      night: ['Northern lights Iceland', 'Reykjavik city lights night', 'Blue Lagoon night'],
      hidden: ['Reykjadalur hot river', 'Grotta lighthouse Iceland', 'Iceland hidden hot spring'],
    },

    ambience: {
      soundscape: ['Wind off the North Atlantic', 'A bubbling geothermal pool', 'Crunching snow underfoot', 'Distant gulls'],
      musicStyle: 'Ethereal Icelandic post-rock and ambient (think Sigur Rós)',
      weatherMood: 'Crisp, clean and changeable — four seasons in an afternoon',
    },

    story:
      'Reykjavik is the smallest big adventure you’ll ever have. The world’s northernmost capital is really just a cluster of brave little houses painted red and yellow against the grey, as if colour itself were a kind of defiance up here. You drink the best coffee of your life in a warm café while horizontal rain lashes the window, then twenty minutes later you’re standing alone before a waterfall that drowns out your own thoughts. Everything in Iceland is close and yet feels like the edge of the map — black beaches, steaming earth, lava fields like the surface of another planet. You soak in a geothermal pool as snow lands on your hair and dissolves. And then, if the sky is kind, you switch off the lights and step outside, and the dark begins to move: a ribbon of green unspooling overhead, brightening, folding, breathing. Nobody speaks. There’s nothing to say. You just tilt your head back and let the planet show off.',

    experiences: [
      'Northern-lights hunt away from the city glow',
      'Golden Circle self-drive: Þingvellir, Geysir, Gullfoss',
      'Soak in a geothermal lagoon or wild hot river',
      'Glacier hike and blue ice-cave exploration',
      'Whale watching from the old harbour',
      'Snorkel between continents at Silfra',
      'Icelandic seafood and tasting tour in the old town',
      'Midnight-sun coastal drive in summer',
    ],

    moods: ['Adventure', 'Nature', 'Awe', 'Wellness', 'Photography'],
    travelStyle: ['Couples', 'Solo', 'Adventure', 'Road Trippers'],

    aiSummary:
      'Reykjavik is a compact, design-forward base for one of Earth’s most dramatic natural playgrounds — waterfalls, glaciers, geothermal spas and the aurora. It suits adventurous couples, solo travellers and road-trippers who prioritise landscapes and wellness over nightlife or budget. Visit in summer for midnight sun and easy driving, or winter for northern lights and ice caves. Iceland is expensive and weather-volatile, so it favours flexible, outdoorsy travellers over those wanting cheap, predictable warmth. Choose Reykjavik to stand small beneath fire, ice and a dancing sky.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 11. SANTORINI, GREECE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    continent: 'Europe',
    lat: 36.4072,
    lng: 25.4567,
    flag: '🇬🇷',
    capital: 'Athens',
    population: 15550,
    bestSeason: 'Late April–June and September–October for warm calm and thinner crowds',
    budget: 'Premium · €150–350 / day in season',
    timezone: 'EET (UTC+2)',

    wonders: [
      {
        name: 'Oia at sunset',
        description:
          'A cliff-village of whitewashed cubes and blue domes that turns rose and gold as the sun sinks into the caldera — the most photographed dusk in Greece.',
        imageQuery: 'Oia Santorini blue domes sunset',
      },
      {
        name: 'The Caldera',
        description:
          'The flooded crater of an ancient volcanic eruption, a sea-filled bowl ringed by sheer cliffs where the towns cling impossibly to the rim.',
        imageQuery: 'Santorini caldera cliffs sea',
      },
      {
        name: 'Akrotiri',
        description:
          'A Bronze-Age town buried and preserved by volcanic ash — frescoed Minoan streets sometimes called the Aegean Pompeii.',
        imageQuery: 'Akrotiri ancient ruins Santorini',
      },
      {
        name: 'Red Beach',
        description:
          'A startling cove backed by rust-red volcanic cliffs that blaze against the dark blue sea below Akrotiri.',
        imageQuery: 'Red Beach Santorini volcanic cliffs',
      },
    ],

    hiddenGems: [
      {
        name: 'Pyrgos village',
        description:
          'A quiet hilltop maze of lanes crowned by a Venetian castle, with caldera views and barely a tour group in sight.',
        imageQuery: 'Pyrgos village Santorini hilltop',
      },
      {
        name: 'Santo Wines at dusk',
        description:
          'A winery terrace where volcanic-soil Assyrtiko is poured straight into the sunset over the caldera.',
        imageQuery: 'Santorini winery caldera sunset wine',
      },
      {
        name: 'Ammoudi Bay',
        description:
          'A tiny red-rock harbour below Oia’s 300 steps, where tavernas serve grilled octopus at the water’s edge.',
        imageQuery: 'Ammoudi Bay Santorini harbour tavern',
      },
    ],

    food: [
      {
        name: 'Tomatokeftedes',
        description:
          'Crispy fritters of the island’s intensely sweet cherry tomatoes, herbs and onion — a volcanic-soil specialty.',
        imageQuery: 'tomatokeftedes Santorini tomato fritters',
      },
      {
        name: 'Fava Santorinis',
        description:
          'A silky yellow split-pea purée drizzled with olive oil and capers, protected by its own appellation.',
        imageQuery: 'fava Santorini yellow split pea dish',
      },
      {
        name: 'Fresh grilled octopus',
        description:
          'Tenderised, charred over coals and dressed with lemon and oregano, eaten by the sea with cold white wine.',
        imageQuery: 'grilled octopus Greek seaside',
      },
      {
        name: 'Assyrtiko wine',
        description:
          'A crisp, mineral white from vines coiled into baskets against the wind in black volcanic earth.',
        imageQuery: 'Assyrtiko wine Santorini vineyard',
      },
    ],

    adventures: [
      {
        name: 'Caldera catamaran cruise',
        description:
          'Sailing past the volcanic islets to hot springs and hidden swimming coves, ending with a sunset on deck.',
        imageQuery: 'Santorini catamaran cruise caldera',
      },
      {
        name: 'Fira-to-Oia caldera hike',
        description:
          'A 10 km cliff-top walk linking the villages along the crater rim with non-stop sea panoramas.',
        imageQuery: 'Santorini caldera hiking trail Fira Oia',
      },
      {
        name: 'Volcano & hot springs trek',
        description:
          'A boat to the smoking crater of Nea Kameni and a swim in the warm sulphur springs of the bay.',
        imageQuery: 'Nea Kameni volcano hot springs Santorini',
      },
    ],

    seasons: {
      spring:
        'April–May bloom with wildflowers and warm sun, calm seas and the islands still uncrowded.',
      summer:
        'June–August is hot, dazzling and busy, with the famous meltemi wind cooling the long bright days.',
      autumn:
        'September–October keep the sea warm for swimming while the crowds and prices ease.',
      winter:
        'November–March is quiet and moody; many tavernas close but the caldera turns dramatic and storm-lit.',
    },

    culture: {
      language: 'Greek; English widely spoken',
      religion: 'Greek Orthodox Christianity',
      greeting: 'A warm "Yassas" and, among friends, a kiss on each cheek',
      etiquette: [
        'Dress modestly and cover shoulders inside churches and monasteries.',
        'Lunch and dinner run late — restaurants fill from 9pm.',
        'Tipping a few euros for good service is appreciated but not obligatory.',
        'Conserve water; the island has no natural springs and relies on desalination.',
      ],
      festivals: [
        {
          name: 'Greek Orthodox Easter',
          when: 'April/May',
          description:
            'The most important festival — midnight candle processions, fireworks and lamb feasts across the villages.',
        },
        {
          name: 'Ifestia Festival',
          when: 'Summer',
          description:
            'A re-enactment of the volcano’s eruption staged with fireworks over the caldera.',
        },
        {
          name: 'Panigiria (saint’s day feasts)',
          when: 'Throughout summer',
          description:
            'Village squares fill with music, dancing, wine and communal cooking on each saint’s feast.',
        },
      ],
    },

    heroQuote: 'Where white villages tumble toward a sea swallowed by a volcano.',
    heroMedia: {
      title: 'Sunset over the Caldera',
      imageQuery: 'Santorini Oia sunset caldera golden',
      atmosphere: 'Warm wind off the Aegean, church bells and the hush of a crowd watching the sun fall.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Santorini caldera white villages aerial',
        description: 'White towns trace the rim of a vast sea-filled crater.',
      },
      {
        title: 'The Lanes',
        imageQuery: 'Santorini white blue alleyway',
        description: 'You wind through cubist alleys of white walls and blue domes.',
      },
      {
        title: 'On the Water',
        imageQuery: 'Santorini sailboat caldera swimming',
        description: 'A boat carries you to hot springs and coves below the cliffs.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Oia Santorini sunset crowd domes',
        description: 'The whole island turns to rose and amber as the sun drops.',
      },
      {
        title: 'Night',
        imageQuery: 'Santorini night lights caldera village',
        description: 'Village lights spill down the dark cliffs to the black water.',
      },
    ],

    photoCollections: {
      hero: ['Oia Santorini blue domes', 'Santorini caldera view', 'Santorini white village cliff'],
      nature: ['Santorini Red Beach', 'Santorini volcanic landscape', 'Aegean sea Santorini cliffs'],
      culture: ['Santorini church dome', 'Greek island wedding Santorini', 'Santorini windmill white'],
      food: ['Greek mezze Santorini', 'grilled octopus Greece', 'Santorini wine tasting'],
      night: ['Santorini night caldera lights', 'Oia evening lights', 'Santorini stars sky'],
      hidden: ['Pyrgos village Santorini', 'Ammoudi Bay Santorini', 'Santorini vineyard volcanic'],
    },

    ambience: {
      soundscape: ['Wind off the Aegean', 'Church bells', 'Waves against volcanic rock', 'Clinking wine glasses at dusk'],
      musicStyle: 'Greek bouzouki and gentle island folk',
      weatherMood: 'Bright, dry and breezy beneath an endless blue sky',
    },

    story:
      'You climb out of the heat into a town that seems carved from sugar and sky. Santorini is all white and blue — walls scrubbed pale against the sun, domes the colour of the sea they overlook — and everything here leans toward the caldera, that astonishing drowned crater where a volcano once tore the island in half. You spend the day adrift: a swim in a cove the colour of bruised wine, octopus grilled at a harbour the size of a courtyard, a glass of mineral Assyrtiko grown in black ash. And then, like everyone, you turn west. The lanes of Oia fill quietly, strangers shoulder to shoulder along the walls, and the sun lowers itself into the sea with such slow theatre that when it finally vanishes the whole island applauds. You stay a while in the blue dusk, the lights waking below you, understanding why people cross the world for a sunset.',

    experiences: [
      'Sunset catamaran cruise around the caldera',
      'Wine tasting of volcanic Assyrtiko at a cliff winery',
      'Caldera-rim hike from Fira to Oia',
      'Boat trip to the smoking volcano and hot springs',
      'Greek cooking class with island produce',
      'Dinner at a waterside taverna in Ammoudi Bay',
      'Explore the frescoed Bronze-Age ruins of Akrotiri',
      'Sunrise stroll through the empty lanes of Oia',
    ],

    moods: ['Romantic', 'Luxury', 'Scenic', 'Relaxation', 'Photography'],
    travelStyle: ['Couples', 'Honeymoon', 'Luxury', 'Photographers'],

    aiSummary:
      'Santorini is the Aegean at its most cinematic — white cliff-villages, a volcanic caldera and the world’s most celebrated sunset. It’s made for couples, honeymooners and photographers chasing romance and views over nightlife or budget travel. Come in late spring or early autumn for warm, calm days without August’s crush and peak prices. The island is steep, pricey and crowded in summer, so it suits slower, comfort-seeking travellers more than backpackers or families needing space. Choose Santorini to watch the sun fall into a drowned volcano.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 14. SEVILLE, SPAIN
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'seville',
    name: 'Seville',
    country: 'Spain',
    continent: 'Europe',
    lat: 37.3891,
    lng: -5.9845,
    flag: '🇪🇸',
    capital: 'Madrid',
    population: 684000,
    bestSeason: 'March–May and October–November for warm days and festivals',
    budget: 'Moderate · €70–150 / day',
    timezone: 'CET (UTC+1)',

    wonders: [
      {
        name: 'Real Alcázar',
        description:
          'A breathtaking royal palace of Mudéjar arches, tiled courtyards and sunken gardens, still used by Spain’s royal family.',
        imageQuery: 'Real Alcazar Seville Mudejar courtyard',
      },
      {
        name: 'Seville Cathedral & Giralda',
        description:
          'The largest Gothic cathedral on Earth, holding Columbus’s tomb, with a former minaret tower you climb by ramp for rooftop views.',
        imageQuery: 'Seville Cathedral Giralda tower',
      },
      {
        name: 'Plaza de España',
        description:
          'A glorious half-moon of tiled bridges, fountains and ceramic alcoves built for a 1929 fair — pure Andalusian grandeur.',
        imageQuery: 'Plaza de Espana Seville tiles',
      },
      {
        name: 'Metropol Parasol',
        description:
          'A vast undulating wooden canopy nicknamed "Las Setas" (the mushrooms), with a sky-walk over the old town.',
        imageQuery: 'Metropol Parasol Setas Seville',
      },
    ],

    hiddenGems: [
      {
        name: 'Barrio Santa Cruz at night',
        description:
          'The old Jewish quarter’s lamplit maze of whitewashed lanes, orange trees and hidden plazas, made for getting lost.',
        imageQuery: 'Barrio Santa Cruz Seville alley night',
      },
      {
        name: 'Casa de Pilatos',
        description:
          'A serene Renaissance-Mudéjar palace of azulejo tiles and a courtyard garden, far quieter than the Alcázar.',
        imageQuery: 'Casa de Pilatos Seville courtyard',
      },
      {
        name: 'Triana ceramic district',
        description:
          'The gritty, soulful flamenco quarter across the river, lined with tile workshops, tapas bars and a buzzing market.',
        imageQuery: 'Triana Seville ceramics market river',
      },
    ],

    food: [
      {
        name: 'Tapas crawl',
        description:
          'Hopping bar to bar for small plates — jamón ibérico, gambas, croquetas — washed down with cold fino sherry.',
        imageQuery: 'Seville tapas bar small plates',
      },
      {
        name: 'Salmorejo',
        description:
          'A thick chilled tomato-and-bread cream topped with egg and ham, cooler and richer than gazpacho.',
        imageQuery: 'salmorejo Andalusian cold soup',
      },
      {
        name: 'Espinacas con garbanzos',
        description:
          'Spinach and chickpeas slow-cooked with cumin and smoked paprika, a Moorish-rooted Sevillano classic.',
        imageQuery: 'espinacas con garbanzos Seville tapa',
      },
      {
        name: 'Sherry from Jerez',
        description:
          'Bone-dry fino and manzanilla poured straight from the barrel, the perfect partner to Andalusian tapas.',
        imageQuery: 'sherry fino Andalusia glass',
      },
    ],

    adventures: [
      {
        name: 'Flamenco in a Triana tablao',
        description:
          'A raw, intimate night of guitar, song and stamping dance in the quarter where flamenco was born.',
        imageQuery: 'flamenco dancer Seville tablao',
      },
      {
        name: 'Kayak the Guadalquivir',
        description:
          'Paddling the city’s river past Triana, the Torre del Oro and riverside gardens at golden hour.',
        imageQuery: 'kayak Guadalquivir river Seville',
      },
      {
        name: 'Day trip to Ronda',
        description:
          'A drive to the cliff-top white town split by a dramatic gorge and its vertiginous stone bridge.',
        imageQuery: 'Ronda Spain gorge bridge cliff',
      },
    ],

    seasons: {
      spring:
        'March–May is sublime — orange blossom scents the air and the great festivals of Semana Santa and Feria fill the streets.',
      summer:
        'July–August is fierce, often above 40°C; life retreats to siesta, shade and late nights.',
      autumn:
        'September–November cools into golden, easygoing days perfect for wandering.',
      winter:
        'December–February is mild and sunny by day, quiet and atmospheric, with the lowest prices.',
    },

    culture: {
      language: 'Spanish (Andalusian dialect)',
      religion: 'Roman Catholic, with deep Holy Week traditions',
      greeting: 'A cheerful "Hola" and two cheek kisses among friends',
      etiquette: [
        'Cover shoulders and knees inside churches and the cathedral.',
        'Dinner is late — locals eat tapas from 9pm onward.',
        'Embrace the siesta lull; many shops close in the early afternoon.',
        'Tipping is modest — rounding up or a euro or two is plenty.',
      ],
      festivals: [
        {
          name: 'Semana Santa',
          when: 'Holy Week (March/April)',
          description:
            'Solemn, spectacular processions of hooded penitents and floats wind through the city day and night.',
        },
        {
          name: 'Feria de Abril',
          when: 'April',
          description:
            'Two weeks after Easter the city explodes into a fair of flamenco dresses, horses, sherry and dancing.',
        },
        {
          name: 'Corpus Christi',
          when: 'June',
          description:
            'Streets are strewn with herbs and rosemary as processions pass beneath awnings against the heat.',
        },
      ],
    },

    heroQuote: 'Where orange blossom, flamenco and Moorish palaces set the soul alight.',
    heroMedia: {
      title: 'Golden Hour at Plaza de España',
      imageQuery: 'Plaza de Espana Seville sunset tiles',
      atmosphere: 'Warm air heavy with orange blossom, a distant guitar and the splash of fountains.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Seville rooftops Giralda cathedral aerial',
        description: 'Terracotta rooftops crowd around the Giralda’s great tower.',
      },
      {
        title: 'The Palace',
        imageQuery: 'Real Alcazar Seville tiles arches',
        description: 'You step into the tiled, arched dream of the Real Alcázar.',
      },
      {
        title: 'The Tapas',
        imageQuery: 'Seville tapas bar evening crowd',
        description: 'Evening fills the bars with small plates and cold sherry.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Seville Guadalquivir river sunset Torre del Oro',
        description: 'The river and the Golden Tower glow as the heat softens.',
      },
      {
        title: 'Night',
        imageQuery: 'flamenco Seville night Triana',
        description: 'In a Triana bar, flamenco erupts — guitar, voice, stamping feet.',
      },
    ],

    photoCollections: {
      hero: ['Plaza de Espana Seville', 'Seville Cathedral Giralda', 'Real Alcazar Seville'],
      nature: ['Seville orange trees street', 'Guadalquivir river Seville', 'Ronda gorge Andalusia'],
      culture: ['flamenco dancer Seville', 'Seville azulejo tiles', 'Semana Santa procession Seville'],
      food: ['Seville tapas spread', 'Spanish jamon iberico', 'sherry Andalusia bar'],
      night: ['Seville night Plaza Espana', 'Seville cathedral night', 'Triana Seville night river'],
      hidden: ['Barrio Santa Cruz Seville', 'Casa de Pilatos Seville', 'Triana ceramics Seville'],
    },

    ambience: {
      soundscape: ['Flamenco guitar', 'Cathedral bells', 'Fountains in tiled courtyards', 'Horse hooves on cobbles'],
      musicStyle: 'Flamenco — guitar, cante and palmas',
      weatherMood: 'Warm, golden and fragrant with orange blossom',
    },

    story:
      'Seville seduces slowly, then all at once. By day the heat presses down and the city hides in shade — in the cool tiled courtyards of the Alcázar, beneath the orange trees of Santa Cruz, inside the colossal dimness of the cathedral where Columbus lies. You drift the lanes half-asleep, the air sweet with blossom, and think the city gentle. Then the sun drops, the streets exhale, and Seville wakes up. The tapas bars fill and overflow onto the cobbles; you eat standing, plate by tiny plate, a glass of cold fino in hand, the conversation everywhere getting louder and warmer. Somewhere a guitar starts, and in a small dark room in Triana a woman rises and begins to dance — not for tourists but for herself, fierce and grieving and alive, her heels cracking against the boards. You watch, barely breathing, and understand that flamenco isn’t a show here. It’s the sound the city makes when it stops pretending to be calm.',

    experiences: [
      'Live flamenco in an intimate Triana tablao',
      'Early-morning visit to the Real Alcázar before crowds',
      'Evening tapas crawl through Santa Cruz and Triana',
      'Climb the Giralda for rooftop views',
      'Kayak the Guadalquivir at sunset',
      'Andalusian cooking class with a market tour',
      'Day trip to cliff-top Ronda',
      'Sherry tasting paired with local tapas',
    ],

    moods: ['Romantic', 'Cultural', 'Foodie', 'Vibrant', 'History'],
    travelStyle: ['Couples', 'Solo', 'Foodies', 'Culture Seekers'],

    aiSummary:
      'Seville is the soul of Andalusia — Moorish palaces, flamenco, orange-scented lanes and Spain’s best tapas culture. It suits couples, foodies and culture-seekers who want history, atmosphere and great eating over beaches or modern city life. Visit March–May for orange blossom and the legendary Semana Santa and Feria, or autumn for golden calm; avoid the furnace of high summer. Walkable, romantic and lively after dark, it rewards travellers who embrace late dinners and slow afternoons. Choose Seville to feel Spain at its most passionate.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 15. LISBON, PORTUGAL
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'lisbon',
    name: 'Lisbon',
    country: 'Portugal',
    continent: 'Europe',
    lat: 38.7223,
    lng: -9.1393,
    flag: '🇵🇹',
    capital: 'Lisbon',
    population: 545000,
    bestSeason: 'March–June and September–October for warm, bright, uncrowded days',
    budget: 'Moderate · €60–130 / day',
    timezone: 'WET (UTC+0)',

    wonders: [
      {
        name: 'Belém Tower & Jerónimos',
        description:
          'A fairytale river fort and a soaring Manueline monastery from the Age of Discovery, carved with ropes, anchors and sea monsters.',
        imageQuery: 'Belem Tower Lisbon river',
      },
      {
        name: 'Alfama & São Jorge Castle',
        description:
          'The oldest quarter’s tangle of stepped lanes climbing to a Moorish hilltop castle and sweeping views over the red rooftops.',
        imageQuery: 'Alfama Lisbon castle rooftops view',
      },
      {
        name: 'Tram 28',
        description:
          'A canary-yellow vintage tram rattling and screeching up impossibly steep streets through the heart of old Lisbon.',
        imageQuery: 'Tram 28 Lisbon yellow street',
      },
      {
        name: 'Praça do Comércio',
        description:
          'A grand riverside square opening to the Tagus through a triumphal arch, the city’s elegant front door to the sea.',
        imageQuery: 'Praca do Comercio Lisbon square arch',
      },
    ],

    hiddenGems: [
      {
        name: 'LX Factory',
        description:
          'A converted industrial complex under the bridge, now full of bookshops, studios, rooftop bars and street art.',
        imageQuery: 'LX Factory Lisbon street art bookshop',
      },
      {
        name: 'Miradouro da Senhora do Monte',
        description:
          'The highest of Lisbon’s viewpoints, a pine-shaded terrace for golden-hour panoramas with the locals and a guitar.',
        imageQuery: 'Senhora do Monte viewpoint Lisbon sunset',
      },
      {
        name: 'Pink Street (Cais do Sodré)',
        description:
          'A once-seedy sailors’ lane painted bubblegum pink, now the buzzing centre of Lisbon’s late-night bar scene.',
        imageQuery: 'Pink Street Lisbon Cais do Sodre',
      },
    ],

    food: [
      {
        name: 'Pastel de nata',
        description:
          'A warm, blistered custard tart in flaky pastry, dusted with cinnamon — best straight from the oven in Belém.',
        imageQuery: 'pastel de nata Lisbon custard tart',
      },
      {
        name: 'Bacalhau',
        description:
          'Salt cod, the national obsession, prepared (they say) a different way for every day of the year.',
        imageQuery: 'bacalhau Portuguese salt cod dish',
      },
      {
        name: 'Bifana',
        description:
          'A simple, glorious sandwich of thin garlicky marinated pork in a crusty roll, eaten standing at the counter.',
        imageQuery: 'bifana Portuguese pork sandwich',
      },
      {
        name: 'Ginjinha',
        description:
          'A sweet sour-cherry liqueur sipped from a tiny cup at a hole-in-the-wall, a Lisbon street ritual.',
        imageQuery: 'ginjinha cherry liqueur Lisbon',
      },
    ],

    adventures: [
      {
        name: 'Day trip to Sintra',
        description:
          'A short train to a misty hill town of romantic palaces, none more dreamlike than the candy-coloured Pena Palace.',
        imageQuery: 'Pena Palace Sintra colorful',
      },
      {
        name: 'Surf at Costa da Caparica',
        description:
          'Catching Atlantic waves on long sandy beaches just across the river from the city.',
        imageQuery: 'surfing Costa da Caparica Lisbon beach',
      },
      {
        name: 'Tagus sunset sailing',
        description:
          'A boat onto the wide river to watch the city and the great bridge glow at dusk.',
        imageQuery: 'Lisbon sailboat Tagus sunset bridge',
      },
    ],

    seasons: {
      spring:
        'March–June is glorious — warm sun, jacaranda blossom and long bright evenings without the summer crowds.',
      summer:
        'July–August is hot, lively and busy, with rooftop bars, festivals and beach escapes across the river.',
      autumn:
        'September–October keeps the warmth and light while the crowds thin and the Atlantic stays swimmable.',
      winter:
        'November–February is mild, often sunny, quiet and cheap, with cosy fado nights and empty viewpoints.',
    },

    culture: {
      language: 'Portuguese; English widely spoken',
      religion: 'Roman Catholic',
      greeting: 'A friendly "Olá" and "Bom dia"; cheek kisses among friends',
      etiquette: [
        'Greet shopkeepers when entering small stores — politeness is valued.',
        'Dinner runs late; restaurants get going after 8pm.',
        'The bread and starters placed on your table (couvert) are charged if eaten.',
        'Tipping 5–10% for good service is appreciated but not mandatory.',
      ],
      festivals: [
        {
          name: 'Festas de Santo António',
          when: 'June',
          description:
            'Lisbon’s biggest party — grilled sardines, paper decorations and street parties fill the old quarters.',
        },
        {
          name: 'Festa do Avante',
          when: 'September',
          description:
            'A vast riverside festival of concerts, debate and food drawing crowds from across the country.',
        },
        {
          name: 'Carnaval',
          when: 'February/March',
          description:
            'Pre-Lenten parades, costumes and music ripple through the city and nearby towns.',
        },
      ],
    },

    heroQuote: 'Where yellow trams climb hills of light above a river to the sea.',
    heroMedia: {
      title: 'Golden Light over Alfama',
      imageQuery: 'Alfama Lisbon sunset rooftops Tagus',
      atmosphere: 'Soft Atlantic light, a distant fado voice and the rattle of a tram on the hill.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Lisbon hills rooftops river aerial',
        description: 'A city of seven hills tumbles in pastel toward a silver river.',
      },
      {
        title: 'The Climb',
        imageQuery: 'Lisbon tram 28 steep street tiles',
        description: 'A yellow tram hauls you up cobbled lanes of painted tile.',
      },
      {
        title: 'The Viewpoint',
        imageQuery: 'Lisbon miradouro viewpoint city',
        description: 'From a terrace the whole red-roofed city falls away to the Tagus.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Lisbon sunset bridge 25 Abril river',
        description: 'The river and the great red bridge catch the lowering sun.',
      },
      {
        title: 'Night',
        imageQuery: 'Lisbon fado bar night Alfama',
        description: 'In a tiny Alfama bar, fado rises — guitar and aching voice.',
      },
    ],

    photoCollections: {
      hero: ['Lisbon yellow tram street', 'Belem Tower Lisbon', 'Alfama Lisbon rooftops'],
      nature: ['Lisbon Tagus river coast', 'Sintra forest palace', 'Costa Caparica beach Lisbon'],
      culture: ['Lisbon azulejo tiles wall', 'fado singer Lisbon', 'Lisbon street art LX Factory'],
      food: ['pastel de nata Lisbon', 'Portuguese seafood grilled', 'Lisbon market food Time Out'],
      night: ['Lisbon night Pink Street', 'Lisbon viewpoint night lights', 'Lisbon bridge night river'],
      hidden: ['LX Factory Lisbon', 'Senhora do Monte viewpoint', 'Sintra Pena Palace'],
    },

    ambience: {
      soundscape: ['Fado guitar and voice', 'Trams screeching on the hills', 'Gulls over the Tagus', 'Café chatter on cobbles'],
      musicStyle: 'Fado — Portuguese guitar and saudade-soaked song',
      weatherMood: 'Bright Atlantic light, soft and golden on pale stone',
    },

    story:
      'Lisbon is a city that catches the light and holds it. Built across seven hills above a river so wide it feels like the sea, it glows — pale limestone, painted tiles, the Atlantic brightness washing everything clean. You walk and you climb and you climb again, and at the top of every hill there’s a terrace where someone is selling beer and someone else is playing guitar, and the whole tumbling, red-roofed city lies spread below. A yellow tram screeches past close enough to touch. You eat a custard tart so good you immediately want another, drink a thimble of cherry liqueur from a doorway bar, get pleasantly lost in the lanes of Alfama where laundry hangs between the houses. And at night, in a room too small for the feeling it holds, a woman sings fado — that uniquely Portuguese music of longing and the sea — and even without the words you feel it: the ache of a country that has always watched its sailors leave, and waited.',

    experiences: [
      'Ride Tram 28 through the old hills',
      'Live fado in an intimate Alfama tavern',
      'Eat pastéis de nata fresh from the oven in Belém',
      'Sunset from a hilltop miradouro with the locals',
      'Day trip to the palaces of Sintra',
      'Tile-painting or Portuguese cooking workshop',
      'Surf or beach day across the river at Caparica',
      'Petiscos (Portuguese tapas) crawl through Cais do Sodré',
    ],

    moods: ['Romantic', 'Relaxation', 'Cultural', 'Foodie', 'Scenic'],
    travelStyle: ['Couples', 'Solo', 'Digital Nomad', 'Foodies'],

    aiSummary:
      'Lisbon is sun-washed, soulful and easygoing — hills of pastel houses, yellow trams, fado, custard tarts and Atlantic light. It suits couples, solo travellers, foodies and digital nomads who want atmosphere, history and great value over resort polish or wild nightlife (though it has plenty). Visit in spring or autumn for warm, bright, uncrowded days, with Sintra and beaches a short hop away. Walkable but steep, romantic and affordable, it’s one of Europe’s most rewarding city breaks. Choose Lisbon to fall for a city that glows.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 16. PROVENCE, FRANCE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'provence',
    name: 'Provence',
    country: 'France',
    continent: 'Europe',
    lat: 43.5297,
    lng: 5.4474,
    flag: '🇫🇷',
    capital: 'Paris',
    population: 143000,
    bestSeason: 'June–July for lavender in bloom; September for the grape harvest',
    budget: 'Premium · €120–250 / day',
    timezone: 'CET (UTC+1)',

    wonders: [
      {
        name: 'Valensole lavender fields',
        description:
          'An endless purple plateau humming with bees in high summer, the rows running straight to a horizon of golden wheat.',
        imageQuery: 'Valensole lavender fields Provence summer',
      },
      {
        name: 'Gorges du Verdon',
        description:
          'Europe’s grandest canyon, a turquoise river slicing 700 metres deep through white limestone cliffs.',
        imageQuery: 'Gorges du Verdon turquoise canyon Provence',
      },
      {
        name: 'Roman Arles & Pont du Gard',
        description:
          'Van Gogh’s sun-struck town with a Roman arena, near the colossal three-tiered aqueduct bridge of Pont du Gard.',
        imageQuery: 'Pont du Gard Roman aqueduct Provence',
      },
      {
        name: 'Hilltop villages of the Luberon',
        description:
          'Perched stone villages like Gordes and Roussillon, the latter glowing in ochre reds above old clay quarries.',
        imageQuery: 'Gordes hilltop village Provence',
      },
    ],

    hiddenGems: [
      {
        name: 'Sénanque Abbey',
        description:
          'A 12th-century Cistercian abbey framed by its own lavender field — austere, photogenic and serene.',
        imageQuery: 'Senanque Abbey lavender Provence',
      },
      {
        name: 'Roussillon ochre trail',
        description:
          'A short walk through fiery red-and-orange cliffs of ochre, the pigment that once coloured half of Europe.',
        imageQuery: 'Roussillon ochre cliffs Provence',
      },
      {
        name: 'Île de Porquerolles',
        description:
          'A car-free island off the coast with white-sand coves, vineyards and pine forest, reached by a short ferry.',
        imageQuery: 'Porquerolles island beach Provence',
      },
    ],

    food: [
      {
        name: 'Bouillabaisse',
        description:
          'Marseille’s legendary saffron fish stew, served with rouille and crusty bread in two ceremonial courses.',
        imageQuery: 'bouillabaisse Marseille fish stew',
      },
      {
        name: 'Ratatouille',
        description:
          'A slow-stewed medley of summer vegetables — aubergine, courgette, tomato, pepper — fragrant with herbs.',
        imageQuery: 'ratatouille Provencal vegetables',
      },
      {
        name: 'Tapenade & fougasse',
        description:
          'Black-olive paste spread on lattice-shaped Provençal bread, eaten with a glass of chilled rosé.',
        imageQuery: 'tapenade fougasse Provence bread',
      },
      {
        name: 'Côtes de Provence rosé',
        description:
          'The pale, dry, crisp pink wine that is the very taste of a Provençal summer afternoon.',
        imageQuery: 'Provence rose wine vineyard glass',
      },
    ],

    adventures: [
      {
        name: 'Kayaking the Verdon Gorge',
        description:
          'Paddling the electric-turquoise river beneath towering cliffs into the heart of the canyon.',
        imageQuery: 'kayak Verdon Gorge turquoise Provence',
      },
      {
        name: 'Cycling the vineyards',
        description:
          'Pedalling lanes between vines, lavender and stone villages with a picnic of market cheese and rosé.',
        imageQuery: 'cycling Provence vineyards lavender',
      },
      {
        name: 'Market-to-table cooking',
        description:
          'Shopping a Provençal market then cooking the haul in a farmhouse kitchen with a local chef.',
        imageQuery: 'Provence market vegetables stalls',
      },
    ],

    seasons: {
      spring:
        'April–May greens the hills with cherry blossom, poppies and the first warm markets before the crowds.',
      summer:
        'June–August blaze with lavender, sunflowers, festivals and long golden evenings — the iconic season.',
      autumn:
        'September–October bring the grape and olive harvest, vineyards turning gold and softer, mellow light.',
      winter:
        'November–March is quiet and cold, with bare vines, truffle markets and the cleansing mistral wind.',
    },

    culture: {
      language: 'French (with Provençal heritage)',
      religion: 'Roman Catholic, largely secular in practice',
      greeting: 'A polite "Bonjour" before anything else, and "la bise" (cheek kisses) among friends',
      etiquette: [
        'Always greet with "Bonjour" when entering shops — skipping it reads as rude.',
        'Lunch is sacred; many businesses close from noon to 2pm.',
        'Dress neatly; the Provençal style is relaxed but put-together.',
        'Service is included, but rounding up or leaving small change is courteous.',
      ],
      festivals: [
        {
          name: 'Fête de la Lavande',
          when: 'July',
          description:
            'Lavender festivals across the plateau villages celebrate the harvest with distilling, markets and music.',
        },
        {
          name: 'Festival d’Avignon',
          when: 'July',
          description:
            'One of the world’s great theatre festivals fills the papal city with stages and street performance.',
        },
        {
          name: 'Fête du Citron (nearby Menton)',
          when: 'February',
          description:
            'A dazzling Riviera festival of giant sculptures built entirely from lemons and oranges.',
        },
      ],
    },

    heroQuote: 'Where purple fields run to the horizon and the air smells of lavender and sun.',
    heroMedia: {
      title: 'Lavender at Golden Hour',
      imageQuery: 'Provence lavender field sunset Valensole',
      atmosphere: 'Warm dry air thick with lavender and bees, cicadas humming in the heat.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Provence countryside lavender hills aerial',
        description: 'Rolling country unfolds in stripes of purple, gold and green.',
      },
      {
        title: 'The Village',
        imageQuery: 'Provence hilltop stone village lane',
        description: 'You wander a perched village of honey stone and shuttered windows.',
      },
      {
        title: 'The Market',
        imageQuery: 'Provence market stalls produce flowers',
        description: 'A morning market overflows with cheese, olives, herbs and flowers.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Provence vineyard sunset rose wine',
        description: 'The vines glow gold as you pour a glass of pale rosé.',
      },
      {
        title: 'Night',
        imageQuery: 'Provence village square night dinner lights',
        description: 'Dinner runs late under plane trees strung with warm lights.',
      },
    ],

    photoCollections: {
      hero: ['Provence lavender field', 'Gordes village Provence', 'Senanque Abbey lavender'],
      nature: ['Verdon Gorge Provence', 'Provence sunflower field', 'Roussillon ochre cliffs'],
      culture: ['Provence market Provencal', 'Provence pottery santons', 'Avignon Provence architecture'],
      food: ['Provencal rose wine', 'bouillabaisse Marseille', 'Provence cheese olives market'],
      night: ['Provence village night lights', 'Provence starry sky lavender', 'Provence dinner terrace night'],
      hidden: ['Roussillon ochre trail', 'Porquerolles island Provence', 'Senanque Abbey Provence'],
    },

    ambience: {
      soundscape: ['Cicadas in the heat', 'Bees in the lavender', 'A village fountain', 'Boules clicking in the square'],
      musicStyle: 'Gentle French chanson and accordion',
      weatherMood: 'Warm, dry and golden, scented with lavender and herbs',
    },

    story:
      'Provence is what the south of France looks like when you close your eyes and dream it. You drive a small road between fields of lavender so purple they seem lit from within, the windows down, the heat carrying the smell of it for miles. The villages sit up on their hills exactly where they have sat for a thousand years, honey-coloured stone and pale-blue shutters, a fountain trickling in a shaded square where old men play boules and a café spills its chairs across the cobbles. Time moves differently here. You spend an entire morning at a market, choosing a melon, a wedge of goat cheese, a fistful of herbs, a bottle of cold rosé, and then you find a patch of shade and make it last two hours. The cicadas never stop. And in the evening, when the light goes long and gold over the vines, you understand what every painter who ever came here was chasing — not a place, exactly, but a quality of light that makes ordinary life feel like a held breath.',

    experiences: [
      'Wander the Valensole lavender fields in bloom',
      'Provençal market shop and farmhouse cooking class',
      'Kayak the turquoise Verdon Gorge',
      'Rosé tasting at a Côtes de Provence vineyard',
      'Cycle between hilltop villages and vineyards',
      'Photograph Sénanque Abbey at golden hour',
      'Explore Roman Arles in Van Gogh’s footsteps',
      'Long lazy lunch under the plane trees',
    ],

    moods: ['Romantic', 'Relaxation', 'Scenic', 'Foodie', 'Photography'],
    travelStyle: ['Couples', 'Foodies', 'Slow Travel', 'Luxury'],

    aiSummary:
      'Provence is the dream of slow southern France — lavender fields, hilltop villages, vineyards, markets and golden light. It suits couples, foodies and slow-travel lovers who want beauty, wine and unhurried days over nightlife or adventure thrills. Time it for June–July lavender bloom or September’s harvest; a car unlocks the villages and gorges. It rewards travellers who linger over long lunches and quiet roads rather than tick-list sightseers. With the Verdon Gorge for activity and Marseille and the coast nearby, it balances calm and variety. Choose Provence to slow down in the light.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 23. LOFOTEN ISLANDS, NORWAY
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'lofoten',
    name: 'Lofoten Islands',
    country: 'Norway',
    continent: 'Europe',
    lat: 68.2347,
    lng: 14.5648,
    flag: '🇳🇴',
    capital: 'Oslo',
    population: 24500,
    bestSeason: 'June–July for midnight sun; September–March for northern lights',
    budget: 'Expensive · NOK 1,200–2,500 / day',
    timezone: 'CET (UTC+1)',

    wonders: [
      {
        name: 'Reine',
        description:
          'A scatter of red fishermen’s cabins on stilts in a turquoise fjord, ringed by black granite peaks that stab straight up from the sea.',
        imageQuery: 'Reine Lofoten red cabins fjord peaks',
      },
      {
        name: 'Reinebringen viewpoint',
        description:
          'A steep stone stairway up a knife-edge ridge to the most jaw-dropping panorama in the islands.',
        imageQuery: 'Reinebringen Lofoten viewpoint hike',
      },
      {
        name: 'Haukland & Kvalvika beaches',
        description:
          'White-sand, turquoise-water beaches that look tropical until you remember you’re inside the Arctic Circle.',
        imageQuery: 'Haukland beach Lofoten white sand Arctic',
      },
      {
        name: 'The midnight sun',
        description:
          'From late May to mid-July the sun never sets, bathing the peaks and sea in endless gold through the small hours.',
        imageQuery: 'midnight sun Lofoten mountains sea',
      },
    ],

    hiddenGems: [
      {
        name: 'Å i Lofoten',
        description:
          'The tiny village at the literal end of the road (its name is just "Å"), with a stockfish museum and a working bakery in a 19th-century loft.',
        imageQuery: 'A village Lofoten end of road cabins',
      },
      {
        name: 'Nusfjord',
        description:
          'One of Norway’s oldest and best-preserved fishing villages, tucked into a hidden cove away from the crowds.',
        imageQuery: 'Nusfjord Lofoten fishing village cove',
      },
      {
        name: 'Unstad surf beach',
        description:
          'An Arctic surf break where wetsuited surfers ride cold North Atlantic swells beneath snow-capped peaks.',
        imageQuery: 'Unstad Arctic surfing Lofoten snow',
      },
    ],

    food: [
      {
        name: 'Tørrfisk (stockfish)',
        description:
          'Cod air-dried on wooden racks in the sea wind for centuries — the islands’ historic export and culinary backbone.',
        imageQuery: 'stockfish drying racks Lofoten cod',
      },
      {
        name: 'Skrei cod',
        description:
          'The prized winter Arctic cod, poached fresh with its liver and roe — a seasonal Lofoten delicacy.',
        imageQuery: 'skrei cod Norwegian dish',
      },
      {
        name: 'Fiskesuppe',
        description:
          'A creamy Norwegian fish soup of cod, root vegetables and herbs, warming against the Arctic chill.',
        imageQuery: 'Norwegian fish soup fiskesuppe',
      },
      {
        name: 'Cloudberries',
        description:
          'Amber Arctic berries gathered in late summer, served with cream as a rare northern treat.',
        imageQuery: 'cloudberries Norway dessert cream',
      },
    ],

    adventures: [
      {
        name: 'Sea-kayaking the fjords',
        description:
          'Paddling glassy water beneath sheer peaks, past sea eagles, fishing cabins and hidden white beaches.',
        imageQuery: 'sea kayaking Lofoten fjord peaks',
      },
      {
        name: 'Peak hiking',
        description:
          'Scrambling routes like Reinebringen and Ryten for ridge-top views over fjords, beaches and the open Atlantic.',
        imageQuery: 'hiking Lofoten ridge fjord view',
      },
      {
        name: 'Aurora & RIB safari',
        description:
          'A fast boat into the dark fjords to watch sea eagles by day or hunt the northern lights over the water by night.',
        imageQuery: 'northern lights Lofoten fjord boat',
      },
    ],

    seasons: {
      spring:
        'April–May melts the snow off the peaks while keeping them capped, with returning light and quiet roads.',
      summer:
        'June–August brings the midnight sun, green slopes, hiking, surfing and 24-hour golden light.',
      autumn:
        'September–October colours the slopes and reopens dark nights — the first aurora over snow-dusted peaks.',
      winter:
        'November–March is dark, snowy and dramatic, prime time for northern lights, Arctic surf and storm-light photography.',
    },

    culture: {
      language: 'Norwegian; English very widely spoken',
      religion: 'Lutheran Christianity, largely secular in practice',
      greeting: 'A simple handshake and "Hei"; Norwegians are reserved but sincere',
      etiquette: [
        'Respect "allemannsretten" (right to roam) but leave no trace and camp responsibly.',
        'Stay on marked trails to protect the fragile Arctic vegetation.',
        'Tipping is modest and optional; service is included.',
        'Buy a day’s supplies ahead — villages are tiny and shops close early.',
      ],
      festivals: [
        {
          name: 'Lofoten World Cod Fishing Championship',
          when: 'March',
          description:
            'The world’s largest cod-fishing contest draws hundreds of boats during the skrei season.',
        },
        {
          name: 'Midnight Sun Marathon (nearby Tromsø region)',
          when: 'June',
          description:
            'Runners race under a sun that never sets in the long Arctic summer.',
        },
        {
          name: 'Sankthans (Midsummer)',
          when: 'June 23',
          description:
            'Bonfires on the shore celebrate the longest, brightest nights of the year.',
        },
      ],
    },

    heroQuote: 'Where jagged peaks rise straight from an Arctic sea that never quite goes dark.',
    heroMedia: {
      title: 'Midnight Sun over Reine',
      imageQuery: 'Reine Lofoten midnight sun golden peaks',
      atmosphere: 'Cold clean air, the cry of sea eagles and gold light pouring across the water at 1am.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Lofoten islands aerial peaks sea fjords',
        description: 'Black peaks erupt from a turquoise sea strung with red cabins.',
      },
      {
        title: 'The Village',
        imageQuery: 'Lofoten fishing village red rorbuer fjord',
        description: 'You settle into a red fisherman’s cabin over the water.',
      },
      {
        title: 'The Climb',
        imageQuery: 'Reinebringen Lofoten hike ridge view',
        description: 'A steep ridge rewards you with the islands spread below.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Lofoten beach midnight sun gold Arctic',
        description: 'At midnight the sun grazes the horizon and gilds the beach.',
      },
      {
        title: 'Night',
        imageQuery: 'northern lights Lofoten peaks reflection',
        description: 'In winter the aurora ripples green above the black peaks.',
      },
    ],

    photoCollections: {
      hero: ['Reine Lofoten red cabins', 'Lofoten peaks fjord', 'Hamnoy Lofoten village'],
      nature: ['Lofoten white sand beach Arctic', 'Lofoten midnight sun', 'Lofoten mountains sea aerial'],
      culture: ['Lofoten rorbuer fishing cabins', 'stockfish drying racks Lofoten', 'Lofoten Viking museum'],
      food: ['Norwegian cod skrei dish', 'Norwegian fish soup', 'Lofoten seafood plate'],
      night: ['northern lights Lofoten', 'Lofoten aurora fjord reflection', 'Lofoten winter peaks night'],
      hidden: ['A village Lofoten', 'Nusfjord Lofoten', 'Unstad Arctic surfing'],
    },

    ambience: {
      soundscape: ['Waves against granite', 'Sea eagles calling', 'Wind off the Atlantic', 'A boat engine in the fjord'],
      musicStyle: 'Nordic ambient and folk fiddle',
      weatherMood: 'Crisp Arctic clarity with light that never quite leaves in summer',
    },

    story:
      'Nothing about Lofoten should be possible. These islands hang above the Arctic Circle, where you expect ice and emptiness — and instead you find jagged black peaks soaring straight out of water the colour of the Caribbean, white-sand beaches at the foot of the mountains, and little villages of red cabins on stilts glowing against the dark rock. In summer the strangeness deepens: the sun simply refuses to set, sliding along the horizon at midnight and pouring gold light across the fjords while you hike a ridge or paddle a kayak at an hour your body insists is the middle of the night. You eat cod that has fed these islands for a thousand years, sleep in a fisherman’s hut over the lapping water, and lose all sense of time. And in winter it transforms again — snow on the peaks, the sea steaming, and the northern lights uncoiling green and violet over the black water while a lone surfer paddles out into the Arctic dark. Few places on Earth feel this much like a secret the planet forgot to hide.',

    experiences: [
      'Stay in a red rorbu fisherman’s cabin over the fjord',
      'Hike Reinebringen for the islands’ best view',
      'Sea-kayak the fjords beneath the peaks',
      'Chase the midnight sun on an Arctic beach',
      'Northern-lights boat safari (autumn–winter)',
      'Surf the cold breaks at Unstad',
      'Drive to Å at the literal end of the road',
      'Fresh seafood dinner in a harbour village',
    ],

    moods: ['Nature', 'Awe', 'Adventure', 'Scenic', 'Photography'],
    travelStyle: ['Couples', 'Solo', 'Adventure', 'Road Trippers'],

    aiSummary:
      'The Lofoten Islands are Arctic Norway at its most surreal — sheer peaks rising from turquoise fjords, red fishing villages, white beaches and either midnight sun or northern lights. They suit adventurous couples, solo travellers, photographers and road-trippers who prioritise raw landscape over nightlife or warmth. Visit June–July for endless daylight and hiking, or winter for aurora and Arctic surf. Remote and expensive, with tiny villages and big weather, they reward self-driving, outdoorsy travellers. Choose Lofoten to stand somewhere that looks impossible — and is real.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 24. STOCKHOLM, SWEDEN
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'stockholm',
    name: 'Stockholm',
    country: 'Sweden',
    continent: 'Europe',
    lat: 59.3293,
    lng: 18.0686,
    flag: '🇸🇪',
    capital: 'Stockholm',
    population: 975000,
    bestSeason: 'June–August for long bright days; December for snowy Christmas magic',
    budget: 'Expensive · SEK 900–1,800 / day',
    timezone: 'CET (UTC+1)',

    wonders: [
      {
        name: 'Gamla Stan',
        description:
          'The medieval old town on its own island — ochre and rust merchant houses, the narrowest alley in the city, and the royal palace.',
        imageQuery: 'Gamla Stan Stockholm old town colorful',
      },
      {
        name: 'Vasa Museum',
        description:
          'A perfectly preserved 17th-century warship that sank on its maiden voyage, raised whole from the harbour 333 years later.',
        imageQuery: 'Vasa ship museum Stockholm',
      },
      {
        name: 'The Archipelago',
        description:
          'Some 30,000 islands and skerries scattered across the Baltic, dotted with red summer cottages and swimming jetties.',
        imageQuery: 'Stockholm archipelago islands boats summer',
      },
      {
        name: 'Stockholm City Hall',
        description:
          'The waterfront brick landmark whose Golden Hall and Blue Hall host the Nobel Prize banquet each December.',
        imageQuery: 'Stockholm City Hall waterfront tower',
      },
    ],

    hiddenGems: [
      {
        name: 'Fotografiska & Södermalm',
        description:
          'A hip island of vintage shops, cliff-top viewpoints and a world-class photography museum with a sunset café.',
        imageQuery: 'Sodermalm Stockholm viewpoint rooftops',
      },
      {
        name: 'Skogskyrkogården',
        description:
          'A UNESCO-listed woodland cemetery of pine forest, minimalist chapels and quiet meadows — serene and unexpectedly moving.',
        imageQuery: 'Skogskyrkogarden woodland cemetery Stockholm',
      },
      {
        name: 'Rosendals Trädgård',
        description:
          'A biodynamic garden café on Djurgården island where you eat cinnamon buns among apple trees and greenhouses.',
        imageQuery: 'Rosendals garden cafe Stockholm Djurgarden',
      },
    ],

    food: [
      {
        name: 'Köttbullar',
        description:
          'The original Swedish meatballs with cream gravy, lingonberry jam and pickled cucumber — comfort on a plate.',
        imageQuery: 'Swedish meatballs lingonberry kottbullar',
      },
      {
        name: 'Räkmacka',
        description:
          'An open sandwich heaped with prawns, egg and dill on buttered bread — a Swedish lunch classic.',
        imageQuery: 'rakmacka Swedish prawn sandwich',
      },
      {
        name: 'Surströmming & herring',
        description:
          'Pickled herring in many forms (and the notorious fermented variety) at the heart of every Swedish smörgåsbord.',
        imageQuery: 'Swedish pickled herring smorgasbord',
      },
      {
        name: 'Fika',
        description:
          'Not a food but a ritual — coffee and a cardamom or cinnamon bun, the sacred daily pause Swedes live by.',
        imageQuery: 'Swedish fika cinnamon bun coffee',
      },
    ],

    adventures: [
      {
        name: 'Archipelago boat day',
        description:
          'Hopping a ferry to islands like Vaxholm or Grinda for swimming, hiking and a seafood lunch by the jetty.',
        imageQuery: 'Stockholm archipelago ferry island Vaxholm',
      },
      {
        name: 'Kayak the city waterways',
        description:
          'Paddling between the city’s islands past palaces and parks on the clean Baltic water.',
        imageQuery: 'kayaking Stockholm city water islands',
      },
      {
        name: 'Winter ice-skating & sauna',
        description:
          'Skating frozen bays or lakes in winter, then thawing in a waterfront sauna with a cold dip.',
        imageQuery: 'Stockholm winter ice skating sauna',
      },
    ],

    seasons: {
      spring:
        'April–May wakes the city with cherry blossom in Kungsträdgården and the first warm café terraces.',
      summer:
        'June–August is magical — endless daylight, archipelago swimming, outdoor dining and Midsummer celebrations.',
      autumn:
        'September–October turns the parks gold and crisp, perfect for museums, fika and island walks.',
      winter:
        'November–February is dark, cold and cosy, glowing with candles, Christmas markets and snow on Gamla Stan.',
    },

    culture: {
      language: 'Swedish; English spoken almost universally',
      religion: 'Lutheran heritage, among the world’s most secular societies',
      greeting: 'A handshake and "Hej"; Swedes are friendly but value personal space',
      etiquette: [
        'Be punctual — lateness is considered disrespectful.',
        'Remove your shoes when entering someone’s home.',
        'Embrace "lagom" (just the right amount) and queue politely everywhere.',
        'Tipping is modest; rounding up is plenty as service is included.',
      ],
      festivals: [
        {
          name: 'Midsummer (Midsommar)',
          when: 'Late June',
          description:
            'Sweden’s most beloved festival — flower crowns, maypole dancing and feasting through the bright night.',
        },
        {
          name: 'Nobel Prize Day',
          when: 'December 10',
          description:
            'The city celebrates the prize ceremony and glittering banquet at City Hall.',
        },
        {
          name: 'Lucia',
          when: 'December 13',
          description:
            'Candle-lit dawn processions of white-robed singers bring light to the darkest days of winter.',
        },
      ],
    },

    heroQuote: 'Where a medieval city floats across fourteen islands between lake and sea.',
    heroMedia: {
      title: 'Summer Evening in Gamla Stan',
      imageQuery: 'Gamla Stan Stockholm summer evening water',
      atmosphere: 'Soft endless northern light, gulls over the water and café chatter on the cobbles.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Stockholm islands water aerial city',
        description: 'A city of islands spreads across glittering blue water.',
      },
      {
        title: 'The Old Town',
        imageQuery: 'Gamla Stan Stockholm alley colorful houses',
        description: 'You wander ochre alleys and cobbled squares of Gamla Stan.',
      },
      {
        title: 'The Archipelago',
        imageQuery: 'Stockholm archipelago boat red cottage',
        description: 'A ferry carries you out among thousands of forested islands.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Stockholm Sodermalm sunset rooftops water',
        description: 'The long northern dusk gilds the rooftops and waterways.',
      },
      {
        title: 'Night',
        imageQuery: 'Stockholm city hall night lights water',
        description: 'City Hall and the old town shimmer on the dark water.',
      },
    ],

    photoCollections: {
      hero: ['Gamla Stan Stockholm', 'Stockholm City Hall waterfront', 'Stockholm islands aerial'],
      nature: ['Stockholm archipelago islands', 'Stockholm waterfront summer', 'Djurgarden park Stockholm'],
      culture: ['Vasa ship museum Stockholm', 'Stockholm design interior', 'Stockholm metro art station'],
      food: ['Swedish meatballs lingonberry', 'Swedish fika cinnamon bun', 'Swedish smorgasbord herring'],
      night: ['Stockholm night lights water', 'Gamla Stan night Stockholm', 'Stockholm winter lights snow'],
      hidden: ['Sodermalm Stockholm viewpoint', 'Skogskyrkogarden cemetery', 'Rosendals garden Stockholm'],
    },

    ambience: {
      soundscape: ['Gulls over the harbour', 'Cobblestone footsteps', 'A ferry horn on the water', 'Café murmur and clinking cups'],
      musicStyle: 'Swedish indie-pop and cool electronica',
      weatherMood: 'Clear Nordic light over water, endless in summer, candle-soft in winter',
    },

    story:
      'Stockholm is built on water, and it never lets you forget it. The city drapes across fourteen islands where a great lake meets the Baltic, and everywhere there’s a bridge, a quay, a glimpse of blue between the buildings, a ferry sliding past. It is effortlessly, almost annoyingly elegant — clean lines, good design, beautiful people on bicycles — but it has an old soul too, hidden in the ochre lanes of Gamla Stan, where the medieval city still leans over cobbled squares and a 17th-century warship sits resurrected in a nearby hall. In summer the light is a drug: it barely gets dark, and the whole city moves outdoors to swim off the rocks, eat prawns on a jetty, and ferry out into an archipelago of thirty thousand islands. In winter it pulls inward and glows — candles in every window, snow on the palace roofs, the smell of cardamom buns, and the gentle, civilised insistence on fika, the daily pause for coffee and cake that might be the most sensible tradition in Europe.',

    experiences: [
      'Wander medieval Gamla Stan and the royal palace',
      'See the resurrected warship at the Vasa Museum',
      'Ferry out to swim and hike in the archipelago',
      'Slow down for fika with a cinnamon bun',
      'Kayak the city’s clean waterways',
      'Ride the "world’s longest art gallery" metro',
      'Sunset from a Södermalm cliff-top viewpoint',
      'Winter sauna and cold dip by the water',
    ],

    moods: ['Scenic', 'Cultural', 'Relaxation', 'Design', 'Cozy'],
    travelStyle: ['Couples', 'Solo', 'Family', 'Design Lovers'],

    aiSummary:
      'Stockholm is the elegant Nordic city on the water — medieval old town, world-class museums, design, an island archipelago and a deeply civilised pace. It suits couples, families, solo travellers and design lovers who want beauty, culture and calm over heat or wild nightlife. Visit June–August for endless daylight and archipelago swimming, or December for snowy, candle-lit Christmas magic. Pristine, safe and easy to navigate but expensive, it rewards travellers who savour fika, water views and good taste. Choose Stockholm for Scandinavia at its most graceful.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 25. ISLE OF SKYE, SCOTLAND
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'isle-of-skye',
    name: 'Isle of Skye',
    country: 'Scotland',
    continent: 'Europe',
    lat: 57.4125,
    lng: -6.196,
    flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    capital: 'Edinburgh',
    population: 10000,
    bestSeason: 'May–September for the longest days and (relatively) driest weather',
    budget: 'Moderate · £80–160 / day',
    timezone: 'GMT (UTC+0)',

    wonders: [
      {
        name: 'The Old Man of Storr',
        description:
          'A jagged pinnacle of rock towering over a ridge of strange green hummocks, the most iconic — and atmospheric — walk on Skye.',
        imageQuery: 'Old Man of Storr Skye rock pinnacle',
      },
      {
        name: 'The Quiraing',
        description:
          'A surreal landslip landscape of hidden plateaus, spires and cliffs that looks lifted from a fantasy film.',
        imageQuery: 'Quiraing Isle of Skye landscape',
      },
      {
        name: 'Fairy Pools',
        description:
          'A series of crystalline turquoise pools and waterfalls tumbling down from the Black Cuillin mountains.',
        imageQuery: 'Fairy Pools Skye turquoise waterfall',
      },
      {
        name: 'Neist Point lighthouse',
        description:
          'A white lighthouse on a green finger of cliff jutting into the Atlantic — the place to be at sunset.',
        imageQuery: 'Neist Point lighthouse Skye sunset cliff',
      },
    ],

    hiddenGems: [
      {
        name: 'Coral Beach, Claigan',
        description:
          'A startlingly white beach made not of sand but of bleached coralline algae, turning the shallows tropical-blue.',
        imageQuery: 'Coral Beach Skye white algae turquoise',
      },
      {
        name: 'Fairy Glen',
        description:
          'A miniature landscape of conical green hills and a tiny rocky tower near Uig, eerie and enchanting in the mist.',
        imageQuery: 'Fairy Glen Skye green cones Uig',
      },
      {
        name: 'Talisker Distillery',
        description:
          'Skye’s only malt whisky distillery on the shore of a sea loch, producing a famously peaty, sea-salted dram.',
        imageQuery: 'Talisker distillery Skye sea loch',
      },
    ],

    food: [
      {
        name: 'Cullen skink',
        description:
          'A rich, smoky soup of smoked haddock, potato and onion — Scottish comfort in a bowl against the Highland damp.',
        imageQuery: 'cullen skink Scottish smoked haddock soup',
      },
      {
        name: 'Fresh langoustines & oysters',
        description:
          'Sweet shellfish pulled straight from the cold sea lochs, served simply with butter and lemon.',
        imageQuery: 'Scottish langoustines seafood platter Skye',
      },
      {
        name: 'Haggis, neeps & tatties',
        description:
          'Scotland’s national dish — spiced savoury pudding with mashed turnip and potato, far better than it sounds.',
        imageQuery: 'haggis neeps tatties Scottish dish',
      },
      {
        name: 'Talisker whisky',
        description:
          'A warming, smoky single malt distilled on the island, best sipped by a fire as the rain lashes outside.',
        imageQuery: 'Talisker whisky glass Skye',
      },
    ],

    adventures: [
      {
        name: 'Cuillin ridge hiking',
        description:
          'Tackling Britain’s most serious mountain range, from gentle corries to the knife-edge Black Cuillin traverse.',
        imageQuery: 'Black Cuillin mountains Skye hike',
      },
      {
        name: 'Sea-kayak the lochs',
        description:
          'Paddling glassy sea lochs past seals, sea eagles and waterfalls spilling off the cliffs.',
        imageQuery: 'sea kayaking Skye sea loch seals',
      },
      {
        name: 'Boat trip to see whales & eagles',
        description:
          'A wildlife cruise from Elgol beneath the Cuillin for minke whales, porpoises and white-tailed eagles.',
        imageQuery: 'Elgol boat trip Skye Cuillin wildlife',
      },
    ],

    seasons: {
      spring:
        'April–May brings lengthening days, lambs, wildflowers and the year’s best chance of dry, clear weather.',
      summer:
        'June–August has the longest days and greenest hills, but also crowds and the infamous biting midges.',
      autumn:
        'September–October turns the moors russet and gold with fewer visitors and dramatic, moody skies.',
      winter:
        'November–February is dark, wild and often stormy, with snow on the Cuillin and a stark, empty beauty.',
    },

    culture: {
      language: 'English and Scottish Gaelic (Gàidhlig)',
      religion: 'Presbyterian Christian heritage, including a strict Sabbath tradition in places',
      greeting: 'A friendly hello; Highland folk are warm, dry-humoured and unhurried',
      etiquette: [
        'Follow the Scottish Outdoor Access Code — roam freely but leave no trace and shut gates.',
        'Use passing places on single-track roads and pull over to let faster traffic by.',
        'Some communities observe a quiet Sunday; respect local customs.',
        'Pack midge repellent in summer and always carry waterproofs.',
      ],
      festivals: [
        {
          name: 'Skye Live',
          when: 'May',
          description:
            'A music and arts festival blending Gaelic culture with contemporary sound in Portree.',
        },
        {
          name: 'Highland Games',
          when: 'Summer',
          description:
            'Caber-tossing, piping, dancing and clan gatherings in the islands’ village games.',
        },
        {
          name: 'Skye Book Festival',
          when: 'Autumn',
          description:
            'Writers and readers gather amid the island’s dramatic scenery for talks and storytelling.',
        },
      ],
    },

    heroQuote: 'Where mist drapes jagged peaks and the land feels older than memory.',
    heroMedia: {
      title: 'Dawn Mist on the Storr',
      imageQuery: 'Old Man of Storr Skye misty dawn',
      atmosphere: 'Cool damp air, drifting mist, the bleat of distant sheep and a silence with weight.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Isle of Skye bridge mountains moody',
        description: 'You cross to an island of mist, moor and serrated peaks.',
      },
      {
        title: 'The Ridge',
        imageQuery: 'Old Man of Storr trail hikers Skye',
        description: 'You climb toward the great rock pinnacle of the Storr.',
      },
      {
        title: 'The Pools',
        imageQuery: 'Fairy Pools Skye Cuillin waterfall',
        description: 'Turquoise pools tumble from the dark Cuillin mountains.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Neist Point Skye sunset lighthouse',
        description: 'The cliffs and lighthouse blaze gold over the Atlantic.',
      },
      {
        title: 'Night',
        imageQuery: 'Isle of Skye night stars cottage',
        description: 'A lone cottage glows beneath a vast, dark Highland sky.',
      },
    ],

    photoCollections: {
      hero: ['Old Man of Storr Skye', 'Quiraing Isle of Skye', 'Neist Point lighthouse Skye'],
      nature: ['Fairy Pools Skye', 'Black Cuillin mountains Skye', 'Isle of Skye coast cliffs'],
      culture: ['Skye Portree harbour houses', 'Scottish Highland sheep Skye', 'Dunvegan Castle Skye'],
      food: ['Scottish seafood Skye', 'cullen skink soup', 'Talisker whisky Skye'],
      night: ['Isle of Skye stars night', 'Skye northern lights', 'Skye cottage night moody'],
      hidden: ['Coral Beach Skye', 'Fairy Glen Skye Uig', 'Talisker distillery Skye'],
    },

    ambience: {
      soundscape: ['Wind across the moor', 'Waterfalls off the cliffs', 'Distant bagpipes', 'Rain on a cottage roof'],
      musicStyle: 'Gaelic song, fiddle and bagpipe',
      weatherMood: 'Misty, moody and ever-changing over ancient mountains',
    },

    story:
      'Skye doesn’t do gentle. The Isle of the Mist earns its name daily — cloud pours over the Cuillin, rain sweeps in off the Atlantic, and the light changes its mind every ten minutes, so that a grey morning can crack open into something blinding and golden without warning. This is a landscape that feels genuinely ancient and slightly enchanted: rock pinnacles rising out of green ridges like standing giants, hidden plateaus where the earth seems to have slumped into another world, turquoise pools tumbling from black peaks, and little conical hills the locals long ago decided belonged to the fairies. You drive single-track roads with the heater on and the windows fogging, pull over for a flock of sheep that own the tarmac, and walk out onto a cliff where a white lighthouse stands against the wild sea. At night, in a stone cottage with a dram of smoky Talisker and the rain hammering the roof, you feel it — the deep, weathered, story-soaked soul of the Highlands, indifferent and beautiful and very, very old.',

    experiences: [
      'Hike the Old Man of Storr at dawn',
      'Wander the surreal Quiraing landslip',
      'Swim or photograph the turquoise Fairy Pools',
      'Sunset at Neist Point lighthouse',
      'Wildlife boat trip from Elgol beneath the Cuillin',
      'Tour and taste at Talisker Distillery',
      'Seafood feast of fresh langoustines and oysters',
      'Explore the eerie Fairy Glen near Uig',
    ],

    moods: ['Nature', 'Moody', 'Awe', 'Scenic', 'Photography'],
    travelStyle: ['Couples', 'Solo', 'Road Trippers', 'Nature Lovers'],

    aiSummary:
      'The Isle of Skye is the Scottish Highlands at their most dramatic — misty peaks, fairy pools, sea cliffs and a brooding, ancient atmosphere. It suits couples, solo travellers, road-trippers and nature lovers who want wild landscape, hiking and moody beauty over nightlife or sunshine. Visit May–September for the longest, driest days; come prepared for fast-changing weather, single-track roads and summer midges. A hire car is essential to reach its scattered wonders. Best paired with the wider Highlands. Choose Skye to feel small beneath an old, untamed land.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 26. DUBROVNIK, CROATIA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'dubrovnik',
    name: 'Dubrovnik',
    country: 'Croatia',
    continent: 'Europe',
    lat: 42.6507,
    lng: 18.0944,
    flag: '🇭🇷',
    capital: 'Zagreb',
    population: 28000,
    bestSeason: 'May–June and September–October for warm seas without peak crowds',
    budget: 'Moderate · €80–180 / day',
    timezone: 'CET (UTC+1)',

    wonders: [
      {
        name: 'City Walls',
        description:
          'Nearly two kilometres of mighty medieval ramparts encircling the old town, walkable for staggering views over red roofs and the Adriatic.',
        imageQuery: 'Dubrovnik city walls red roofs Adriatic',
      },
      {
        name: 'Stradun',
        description:
          'The limestone main street polished to a shine by centuries of footsteps, lined with baroque churches, fountains and cafés.',
        imageQuery: 'Stradun Dubrovnik old town street',
      },
      {
        name: 'Mount Srđ cable car',
        description:
          'A swift ride to the summit above the city for the definitive panorama of the walled town against the deep-blue sea.',
        imageQuery: 'Dubrovnik Mount Srd cable car view',
      },
      {
        name: 'Lokrum Island',
        description:
          'A forested island a short boat hop away, with a saltwater lake, peacocks, a ruined monastery and quiet swimming spots.',
        imageQuery: 'Lokrum Island Dubrovnik swimming forest',
      },
    ],

    hiddenGems: [
      {
        name: 'Buža bar cliff swim',
        description:
          'A hole-in-the-wall bar literally built into the sea cliffs outside the walls, where you sip a drink and leap into the Adriatic.',
        imageQuery: 'Buza bar Dubrovnik cliff sea swim',
      },
      {
        name: 'Cavtat',
        description:
          'A graceful, low-key seaside town just down the coast, with a palm-lined promenade and far fewer crowds.',
        imageQuery: 'Cavtat Croatia seaside promenade',
      },
      {
        name: 'Trsteno Arboretum',
        description:
          'A Renaissance garden of ancient plane trees and sea views, the oldest arboretum in the region.',
        imageQuery: 'Trsteno Arboretum Croatia garden sea',
      },
    ],

    food: [
      {
        name: 'Black risotto (crni rižot)',
        description:
          'A dramatic squid-ink risotto, briny and rich, stained jet-black and dotted with tender cuttlefish.',
        imageQuery: 'black risotto squid ink Croatia',
      },
      {
        name: 'Peka',
        description:
          'Meat or octopus slow-roasted under a bell-shaped iron lid buried in embers, a Dalmatian feast worth ordering ahead.',
        imageQuery: 'peka Dalmatian roasted dish Croatia',
      },
      {
        name: 'Fresh oysters from Ston',
        description:
          'Plump, prized oysters from the nearby bay, eaten with a squeeze of lemon by the water.',
        imageQuery: 'Ston oysters Croatia fresh',
      },
      {
        name: 'Rozata',
        description:
          'A silky Dubrovnik custard pudding scented with rose liqueur, the local cousin of crème caramel.',
        imageQuery: 'rozata Croatian custard dessert',
      },
    ],

    adventures: [
      {
        name: 'Sea-kayak around the walls',
        description:
          'Paddling beneath the towering ramparts and across to Lokrum, stopping at a hidden sea cave to swim.',
        imageQuery: 'sea kayak Dubrovnik walls Lokrum',
      },
      {
        name: 'Elaphiti island-hopping',
        description:
          'A boat day to the car-free Elaphiti islands for swimming in clear coves and lunch in fishing villages.',
        imageQuery: 'Elaphiti islands Croatia boat swimming',
      },
      {
        name: 'Game of Thrones walking tour',
        description:
          'Tracing King’s Landing through the very streets and staircases where the series was filmed.',
        imageQuery: 'Dubrovnik Game of Thrones Kings Landing steps',
      },
    ],

    seasons: {
      spring:
        'April–June warms gently, the gardens bloom and the sea becomes swimmable before the summer rush.',
      summer:
        'July–August is hot, glamorous and very busy, with the celebrated Summer Festival and packed walls.',
      autumn:
        'September–October keeps the sea warm and the light golden while the crowds finally ease.',
      winter:
        'November–March is mild, quiet and atmospheric; some venues close but the old town is peacefully yours.',
    },

    culture: {
      language: 'Croatian; English widely spoken',
      religion: 'Roman Catholic',
      greeting: 'A friendly "Dobar dan" and a handshake',
      etiquette: [
        'Cover shoulders and knees when entering churches.',
        'Walk the famously slippery Stradun and walls in good shoes.',
        'Respect that thousands live inside the old town — keep noise down at night.',
        'Tipping around 10% for good service is appreciated.',
      ],
      festivals: [
        {
          name: 'Dubrovnik Summer Festival',
          when: 'July–August',
          description:
            'Six weeks of theatre, classical music and dance staged in the old town’s squares, forts and palaces.',
        },
        {
          name: 'Feast of St Blaise',
          when: 'February 3',
          description:
            'The patron saint’s day fills the city with processions, relics and centuries-old ceremony.',
        },
        {
          name: 'Good Food Festival',
          when: 'October',
          description:
            'Tastings, wine and gastronomy events celebrate Dalmatian cuisine across the city.',
        },
      ],
    },

    heroQuote: 'Where honey-stone walls hold a perfect city above the bluest of seas.',
    heroMedia: {
      title: 'Sunset over the Old Town',
      imageQuery: 'Dubrovnik old town sunset walls Adriatic',
      atmosphere: 'Warm stone radiating the day’s heat, swifts wheeling overhead and the sea glowing below.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Dubrovnik aerial walled city sea',
        description: 'A walled city of red roofs juts into a sapphire sea.',
      },
      {
        title: 'The Walls',
        imageQuery: 'Dubrovnik city walls walk rooftops',
        description: 'You walk the ramparts high above the terracotta roofs.',
      },
      {
        title: 'The Swim',
        imageQuery: 'Buza bar Dubrovnik cliff Adriatic swim',
        description: 'You leap from a cliff bar into the clear blue Adriatic.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Dubrovnik Mount Srd sunset city view',
        description: 'From the summit the whole city glows against the dusk sea.',
      },
      {
        title: 'Night',
        imageQuery: 'Dubrovnik Stradun night lights old town',
        description: 'The polished Stradun gleams under lamplight after dark.',
      },
    ],

    photoCollections: {
      hero: ['Dubrovnik city walls aerial', 'Dubrovnik old town red roofs', 'Dubrovnik Stradun street'],
      nature: ['Dubrovnik Adriatic coast cliffs', 'Lokrum Island Croatia', 'Elaphiti islands sea'],
      culture: ['Dubrovnik baroque church', 'Dubrovnik Game of Thrones steps', 'Dubrovnik fort Lovrijenac'],
      food: ['Croatian black risotto', 'Dalmatian peka dish', 'Ston oysters Croatia'],
      night: ['Dubrovnik night old town lights', 'Dubrovnik walls night sea', 'Dubrovnik harbour night'],
      hidden: ['Buza bar Dubrovnik cliff', 'Cavtat Croatia seaside', 'Trsteno Arboretum Croatia'],
    },

    ambience: {
      soundscape: ['Swifts wheeling over the rooftops', 'Waves against the sea walls', 'Café chatter on the Stradun', 'Church bells over the old town'],
      musicStyle: 'Dalmatian klapa (a cappella harmony singing)',
      weatherMood: 'Warm, bright Mediterranean sun on honey-coloured stone',
    },

    story:
      'They call it the Pearl of the Adriatic, and for once the tourist-brochure line is simply true. Dubrovnik is a complete medieval city, perfectly preserved inside colossal stone walls that drop straight into a sea so blue it seems unreal, and walking those ramparts — high above a sea of terracotta roofs, the Adriatic glittering on one side and the living city humming on the other — is one of the great experiences in Europe. Down in the old town, the marble main street has been polished to a mirror by five centuries of footsteps; baroque churches and quiet cloisters hide down every alley; and just outside the walls, through a hole in the rock, a tiny bar clings to the cliffs where you can drink a cold beer and then simply leap into the sea. By day you island-hop to hidden coves; by evening you ride to the summit and watch the whole honeyed city catch fire in the sunset. Few places this beautiful are also this alive.',

    experiences: [
      'Walk the full circuit of the medieval city walls',
      'Sea-kayak beneath the ramparts to Lokrum',
      'Cliff-jump and drink at a Buža sea bar',
      'Cable car up Mount Srđ for the sunset panorama',
      'Island-hop the car-free Elaphiti islands',
      'Game of Thrones filming-locations walk',
      'Dalmatian peka feast (ordered ahead)',
      'Fresh oysters and wine in nearby Ston',
    ],

    moods: ['Romantic', 'Scenic', 'History', 'Beach', 'Photography'],
    travelStyle: ['Couples', 'Family', 'History Buffs', 'Cruisers'],

    aiSummary:
      'Dubrovnik is a flawless walled medieval city above the dazzling Adriatic — ramparts, marble streets, island-hopping and cliff-side swims. It suits couples, families and history lovers who want beauty, sea and heritage over nightlife or wilderness. Visit May–June or September–October for warm water without August’s heavy crowds and cruise-ship crush. Compact and walkable but steep and busy in peak season, it pairs perfectly with island and coastal day trips. Choose Dubrovnik to live inside a storybook city by the sea.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 27. LAKE BLED, SLOVENIA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'lake-bled',
    name: 'Lake Bled',
    country: 'Slovenia',
    continent: 'Europe',
    lat: 46.3683,
    lng: 14.1146,
    flag: '🇸🇮',
    capital: 'Ljubljana',
    population: 5000,
    bestSeason: 'May–June and September for green calm; winter for a snow-globe hush',
    budget: 'Moderate · €70–140 / day',
    timezone: 'CET (UTC+1)',

    wonders: [
      {
        name: 'Bled Island & church',
        description:
          'A tiny teardrop island crowned by a baroque pilgrimage church, its bell rung by visitors rowed across the emerald water.',
        imageQuery: 'Lake Bled island church Slovenia',
      },
      {
        name: 'Bled Castle',
        description:
          'A medieval cliff-top castle perched 130 metres above the lake, with a museum, an old printworks and the finest view in town.',
        imageQuery: 'Bled Castle cliff lake Slovenia',
      },
      {
        name: 'Vintgar Gorge',
        description:
          'A wooden walkway threading a narrow gorge of turquoise pools, rapids and waterfalls just beyond the lake.',
        imageQuery: 'Vintgar Gorge Slovenia turquoise walkway',
      },
      {
        name: 'Ojstrica & Mala Osojnica viewpoints',
        description:
          'Short steep climbs to the postcard panorama — the island, the castle and the Julian Alps mirrored in the lake.',
        imageQuery: 'Lake Bled viewpoint Ojstrica aerial island',
      },
    ],

    hiddenGems: [
      {
        name: 'Lake Bohinj',
        description:
          'Bled’s larger, wilder, quieter neighbour in Triglav National Park — glacial water ringed by raw alpine peaks.',
        imageQuery: 'Lake Bohinj Slovenia alps quiet',
      },
      {
        name: 'Pletna boat & traditional oarsmen',
        description:
          'Hand-rowed wooden pletna boats, a craft passed down through Bled families for generations, glide you to the island.',
        imageQuery: 'pletna boat Lake Bled oarsman',
      },
      {
        name: 'Pokljuka plateau trails',
        description:
          'A high forested plateau above the lake, laced with peaceful walking and cross-country ski trails through spruce.',
        imageQuery: 'Pokljuka plateau Slovenia forest trail',
      },
    ],

    food: [
      {
        name: 'Kremšnita (Bled cream cake)',
        description:
          'The town’s legendary dessert — a square of vanilla custard and cream between flaky pastry, invented right here.',
        imageQuery: 'kremsnita Bled cream cake Slovenia',
      },
      {
        name: 'Štruklji',
        description:
          'Rolled dumplings filled with cottage cheese, walnuts or tarragon, served savoury or sweet.',
        imageQuery: 'struklji Slovenian rolled dumplings',
      },
      {
        name: 'Jota',
        description:
          'A hearty alpine stew of sauerkraut, beans, potato and smoked pork, perfect after a cold-weather hike.',
        imageQuery: 'jota Slovenian sauerkraut bean stew',
      },
      {
        name: 'Lake trout',
        description:
          'Fresh local trout from the alpine waters, simply grilled with herbs and a squeeze of lemon.',
        imageQuery: 'grilled trout Slovenia alpine dish',
      },
    ],

    adventures: [
      {
        name: 'Row to Bled Island',
        description:
          'Hiring a little wooden rowboat to cross the glassy lake yourself and ring the island church’s wishing bell.',
        imageQuery: 'rowboat Lake Bled island Slovenia',
      },
      {
        name: 'Hike the lakeside & viewpoints',
        description:
          'A flat six-kilometre loop around the shore plus a steep scramble up Mala Osojnica for the iconic photo.',
        imageQuery: 'Lake Bled hiking viewpoint trail',
      },
      {
        name: 'Triglav National Park adventures',
        description:
          'Canyoning, rafting and via ferrata in the nearby Julian Alps, Slovenia’s outdoor playground.',
        imageQuery: 'Triglav national park canyoning Slovenia alps',
      },
    ],

    seasons: {
      spring:
        'April–June bursts green and fresh, the alps still snow-capped above a thawed, mirror-calm lake.',
      summer:
        'July–August is warm and lively, with lake swimming, rowing and busy shores under alpine sun.',
      autumn:
        'September–October sets the surrounding forests ablaze in gold and red, reflected in the still water.',
      winter:
        'December–February can freeze the lake and dust the island church in snow — a true alpine snow globe.',
    },

    culture: {
      language: 'Slovene; English widely spoken',
      religion: 'Roman Catholic',
      greeting: 'A friendly "Dober dan" and a handshake; Slovenes are warm and outdoorsy',
      etiquette: [
        'Cover shoulders and knees inside the island church.',
        'Respect the quiet, protected nature — stay on trails and carry out litter.',
        'Swimming is welcome, but keep the lake pristine.',
        'Tipping around 10% for good service is appreciated but not required.',
      ],
      festivals: [
        {
          name: 'Bled Days (Blejski dnevi)',
          when: 'July',
          description:
            'The lake glows with thousands of floating candles and fireworks over two summer evenings.',
        },
        {
          name: 'Okarina Etno Festival',
          when: 'July/August',
          description:
            'A world-music festival bringing global sounds to the lakeside town.',
        },
        {
          name: 'Christmas at the Lake',
          when: 'December',
          description:
            'A festive market and lights wrap the snowy shore in alpine cheer.',
        },
      ],
    },

    heroQuote: 'Where a church floats on an emerald lake beneath the Julian Alps.',
    heroMedia: {
      title: 'Misty Morning on the Lake',
      imageQuery: 'Lake Bled island church misty morning alps',
      atmosphere: 'Still cool air, mist lifting off the water and a single church bell across the lake.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Lake Bled aerial island castle alps',
        description: 'An emerald lake cradles an island church beneath snowy peaks.',
      },
      {
        title: 'The Crossing',
        imageQuery: 'pletna boat Lake Bled rowing island',
        description: 'A wooden boat carries you across the glassy green water.',
      },
      {
        title: 'The Castle',
        imageQuery: 'Bled Castle view lake island Slovenia',
        description: 'From the cliff castle the whole lake lies perfect below.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Lake Bled sunset viewpoint island gold',
        description: 'The lake and island turn to gold from a high viewpoint.',
      },
      {
        title: 'Night',
        imageQuery: 'Lake Bled night candles lights reflection',
        description: 'Lights and reflections shimmer across the dark, still lake.',
      },
    ],

    photoCollections: {
      hero: ['Lake Bled island church', 'Bled Castle cliff Slovenia', 'Lake Bled aerial alps'],
      nature: ['Vintgar Gorge Slovenia', 'Lake Bohinj alps', 'Julian Alps Triglav Slovenia'],
      culture: ['Bled pletna boat oarsman', 'Slovenia alpine village church', 'Bled island church bell'],
      food: ['kremsnita Bled cream cake', 'Slovenian struklji dumplings', 'grilled trout Slovenia'],
      night: ['Lake Bled night lights', 'Bled candles floating festival', 'Bled Castle night lake'],
      hidden: ['Lake Bohinj Slovenia quiet', 'Pokljuka plateau forest', 'Vintgar Gorge walkway'],
    },

    ambience: {
      soundscape: ['A church bell across the water', 'Oars dipping in the lake', 'Birdsong in the lakeside woods', 'A gentle alpine breeze'],
      musicStyle: 'Gentle alpine folk with accordion and zither',
      weatherMood: 'Fresh, clean alpine air over a mirror-calm emerald lake',
    },

    story:
      'Some places seem designed by someone with very good taste and a soft spot for fairy tales. Lake Bled is one of them. A small emerald lake, fed by alpine springs and thermal water, cups a single tiny island in its centre — and on that island, impossibly, sits a white church with a slender spire, reached only by boat. Above it all, a medieval castle clings to a sheer cliff, and beyond that rise the snow-streaked Julian Alps. You hire a wooden rowboat and pull yourself slowly across water so still it doubles the whole scene, climb the ninety-nine steps to the church, and ring the bell for a wish. Afterwards you walk the shore, the air clean and cool and pine-scented, and stop for a slice of the famous cream cake that was invented in a lakeside hotel. It’s the kind of place that looks too perfect in photographs to be believed — until you’re standing there in the morning mist, and realise the photographs were holding back.',

    experiences: [
      'Row a wooden boat to Bled Island and ring the bell',
      'Climb to a viewpoint for the classic island-and-alps photo',
      'Visit cliff-top Bled Castle above the lake',
      'Walk the turquoise pools of Vintgar Gorge',
      'Taste the original kremšnita cream cake',
      'Day trip to wilder, quieter Lake Bohinj',
      'Canyoning or rafting in Triglav National Park',
      'Cycle or stroll the lakeside loop at dawn',
    ],

    moods: ['Romantic', 'Peaceful', 'Scenic', 'Nature', 'Photography'],
    travelStyle: ['Couples', 'Family', 'Nature Lovers', 'Slow Travel'],

    aiSummary:
      'Lake Bled is a fairy-tale alpine lake — an island church, a cliff-top castle and the Julian Alps reflected in emerald water. It suits couples, families and nature lovers who want serene beauty, gentle hikes and alpine air over nightlife or big-city buzz. Visit May–June or September for green calm and golden light; winter brings a snow-globe hush. Compact and easy, with Lake Bohinj and Triglav National Park nearby for wilder adventure, it’s perfect for slow, scenic travel. Choose Lake Bled for storybook serenity in the heart of Slovenia.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 42. VENICE, ITALY
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'venice',
    name: 'Venice',
    country: 'Italy',
    continent: 'Europe',
    lat: 45.4408,
    lng: 12.3155,
    flag: '🇮🇹',
    capital: 'Rome',
    population: 258000,
    bestSeason: 'April–June and September–October for mild days and gentler crowds',
    budget: 'Premium · €120–280 / day',
    timezone: 'CET (UTC+1)',

    wonders: [
      {
        name: "St Mark's Basilica & Square",
        description:
          'A Byzantine cathedral of golden mosaics beside a vast arcaded square, the glittering heart of the old Republic.',
        imageQuery: 'St Marks Basilica Square Venice',
      },
      {
        name: 'The Grand Canal',
        description:
          'A sweeping waterway lined with faded palazzi, crossed by the marble Rialto Bridge and travelled by vaporetto and gondola.',
        imageQuery: 'Grand Canal Venice palazzo gondola',
      },
      {
        name: "Doge's Palace",
        description:
          'The pink-and-white Gothic seat of Venetian power, linked to its prisons by the legendary Bridge of Sighs.',
        imageQuery: 'Doges Palace Venice Gothic facade',
      },
      {
        name: 'Burano',
        description:
          'A lagoon island of fishermen’s houses painted in vivid, clashing colours, famed for its lace-making.',
        imageQuery: 'Burano Venice colorful houses canal',
      },
    ],

    hiddenGems: [
      {
        name: 'Cannaregio backstreets',
        description:
          'The quiet northern quarter of canal-side bacari, the old Jewish Ghetto and locals living far from the crowds.',
        imageQuery: 'Cannaregio Venice quiet canal local',
      },
      {
        name: 'Libreria Acqua Alta',
        description:
          'A gloriously eccentric bookshop that stores its books in gondolas and bathtubs against the rising water.',
        imageQuery: 'Libreria Acqua Alta Venice bookshop gondola',
      },
      {
        name: 'Torcello',
        description:
          'A near-deserted lagoon island where Venice began, with an ancient cathedral and luminous Byzantine mosaics.',
        imageQuery: 'Torcello Venice cathedral lagoon',
      },
    ],

    food: [
      {
        name: 'Cicchetti',
        description:
          'Venetian bar snacks — crostini topped with creamed cod, marinated seafood and more — grazed with a glass of wine.',
        imageQuery: 'cicchetti Venice bacaro bar snacks',
      },
      {
        name: 'Risotto al nero di seppia',
        description:
          'Creamy risotto stained black with cuttlefish ink, briny and rich — pure lagoon cooking.',
        imageQuery: 'squid ink risotto Venice black',
      },
      {
        name: 'Sarde in saor',
        description:
          'Sweet-and-sour marinated sardines with onions, pine nuts and raisins, a centuries-old sailor’s dish.',
        imageQuery: 'sarde in saor Venice sardines',
      },
      {
        name: 'Spritz & Veneto wine',
        description:
          'The bittersweet orange aperitivo invented in the Veneto, sipped canal-side as the light turns gold.',
        imageQuery: 'Aperol spritz Venice canal aperitivo',
      },
    ],

    adventures: [
      {
        name: 'Gondola or rowing lesson',
        description:
          'Gliding the quiet back canals by gondola, or learning to row Venetian-style standing up like a true local.',
        imageQuery: 'gondola Venice back canal',
      },
      {
        name: 'Lagoon island-hopping',
        description:
          'A vaporetto day to glassblowing Murano, rainbow Burano and ancient Torcello across the still lagoon.',
        imageQuery: 'Venice lagoon islands Murano Burano boat',
      },
      {
        name: 'Get lost on purpose',
        description:
          'Abandoning the map to wander the maze of bridges and alleys until the crowds melt and the real Venice appears.',
        imageQuery: 'Venice empty alley bridge canal quiet',
      },
    ],

    seasons: {
      spring:
        'April–June is lovely — mild, bright and blooming, before the summer heat and peak crush.',
      summer:
        'July–August is hot, humid and very crowded, with the glamorous film festival on the Lido in early September.',
      autumn:
        'September–October brings soft golden light and thinner crowds — many regulars’ favourite season.',
      winter:
        'November–February is atmospheric and misty, with the spectacular masked Carnival in February (and occasional acqua alta floods).',
    },

    culture: {
      language: 'Italian (with a Venetian dialect)',
      religion: 'Roman Catholic',
      greeting: 'A warm "Buongiorno" and "Buonasera"; Venetians appreciate basic Italian',
      etiquette: [
        'Cover shoulders and knees to enter churches, including St Mark’s.',
        'Don’t sit and picnic on bridges or monument steps — it’s discouraged and sometimes fined.',
        'Stand at the bar for cheaper coffee and cicchetti; table service costs more.',
        'Validate vaporetto tickets and stand aside to let locals pass on narrow lanes.',
      ],
      festivals: [
        {
          name: 'Carnevale di Venezia',
          when: 'February',
          description:
            'The city fills with elaborate masks, period costumes and masquerade balls in a centuries-old spectacle.',
        },
        {
          name: 'Festa del Redentore',
          when: 'July',
          description:
            'A bridge of boats and a great fireworks display celebrate deliverance from a historic plague.',
        },
        {
          name: 'Venice Film Festival',
          when: 'August/September',
          description:
            'The world’s oldest film festival brings glamour and stars to the Lido.',
        },
      ],
    },

    heroQuote: 'Where a city of palaces floats on water and every street is a canal.',
    heroMedia: {
      title: 'Dawn on the Grand Canal',
      imageQuery: 'Grand Canal Venice dawn mist gondola',
      atmosphere: 'Soft misty light on the water, lapping canals and the distant toll of a campanile.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Venice aerial canals islands lagoon',
        description: 'A city of islands and canals shimmers on a still lagoon.',
      },
      {
        title: 'The Canal',
        imageQuery: 'Venice Grand Canal palazzo vaporetto',
        description: 'You glide the Grand Canal past faded, watery palaces.',
      },
      {
        title: 'The Maze',
        imageQuery: 'Venice narrow alley bridge canal',
        description: 'You wander a labyrinth of bridges, alleys and quiet canals.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Venice sunset canal gondola golden',
        description: 'The canals turn molten gold as the gondolas drift home.',
      },
      {
        title: 'Night',
        imageQuery: 'Venice night canal lights reflection quiet',
        description: 'Lamplight ripples on the dark water of the empty canals.',
      },
    ],

    photoCollections: {
      hero: ['Grand Canal Venice gondola', 'St Marks Square Venice', 'Venice Rialto Bridge'],
      nature: ['Venice lagoon water islands', 'Burano colorful houses', 'Venice canal reflection'],
      culture: ['Venice Carnival masks', 'Doges Palace Venice', 'Murano glass blowing Venice'],
      food: ['cicchetti Venice bacaro', 'squid ink risotto Venice', 'Aperol spritz Venice canal'],
      night: ['Venice night canal lights', 'St Marks Square night Venice', 'Venice gondola night lamp'],
      hidden: ['Cannaregio Venice canal', 'Libreria Acqua Alta Venice', 'Torcello Venice cathedral'],
    },

    ambience: {
      soundscape: ['Water lapping against stone', 'A campanile bell tolling', 'Oars and gondoliers calling', 'Footsteps echoing in an empty alley'],
      musicStyle: 'Baroque strings and Vivaldi, born in this city',
      weatherMood: 'Soft, misty and luminous, golden light on water',
    },

    story:
      'No description quite prepares you for the strangeness of Venice — the simple, dizzying fact that here is a great city, built of marble palaces and golden churches, and the streets are made of water. There are no cars, no scooters, barely a wheel; you arrive by boat and from then on you walk, and you take boats, and you get lost, which is the only correct way to experience the place. By day the crowds pour around St Mark’s and the Rialto, but step three turns into the back lanes and they vanish, and suddenly it’s just you, a quiet canal, a bridge, a cat, the slap of water against a mooring post, a faded shutter, the smell of the sea. You graze cicchetti and a glass of wine standing at a tiny bacaro, ride the slow vaporetto down the Grand Canal past five hundred years of decaying splendour, and watch the whole impossible city turn to gold at sunset. Venice is sinking, crowded, expensive and utterly without rival. There is nowhere else remotely like it, and there never will be again.',

    experiences: [
      'Glide the back canals by gondola at dusk',
      'Graze cicchetti and spritz at a local bacaro',
      'Get deliberately lost in the quiet quarters',
      'Island-hop to Murano, Burano and Torcello',
      'See the golden mosaics of St Mark’s Basilica',
      'Browse the flooded Libreria Acqua Alta',
      'Sunrise on the Grand Canal before the crowds',
      'Experience the masked Carnival (February)',
    ],

    moods: ['Romantic', 'History', 'Scenic', 'Cultural', 'Photography'],
    travelStyle: ['Couples', 'Honeymoon', 'Solo', 'Culture Seekers'],

    aiSummary:
      'Venice is unlike anywhere on Earth — a floating city of canals, palaces and golden churches with no cars and endless atmosphere. It suits couples, honeymooners and culture-seekers who want romance, history and beauty over nightlife or nature. Visit April–June or September–October for mild weather and gentler crowds; February brings the masked Carnival. It’s crowded and expensive by day, so stay overnight, rise early and wander the quiet back quarters and lagoon islands to find the real city. A dreamy contrast to the Amalfi Coast. Choose Venice to lose yourself in a city built on water.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 44. BARCELONA, SPAIN
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    continent: 'Europe',
    lat: 41.3851,
    lng: 2.1734,
    flag: '🇪🇸',
    capital: 'Madrid',
    population: 1620000,
    bestSeason: 'May–June and September–October for warm days and swimmable sea',
    budget: 'Moderate · €90–180 / day',
    timezone: 'CET (UTC+1)',

    wonders: [
      {
        name: 'Sagrada Família',
        description:
          'Gaudí’s still-unfinished basilica, a forest of stone columns and stained-glass light unlike any church ever built.',
        imageQuery: 'Sagrada Familia interior Barcelona stained glass',
      },
      {
        name: 'Park Güell',
        description:
          'A whimsical hilltop park of mosaic serpentine benches, gingerbread gatehouses and views across the city to the sea.',
        imageQuery: 'Park Guell Barcelona mosaic Gaudi',
      },
      {
        name: 'La Rambla & the Gothic Quarter',
        description:
          'A famous tree-lined promenade beside a medieval maze of stone alleys, hidden squares and Roman ruins.',
        imageQuery: 'Gothic Quarter Barcelona alley medieval',
      },
      {
        name: 'Casa Batlló & La Pedrera',
        description:
          'Gaudí’s dreamlike apartment houses, all undulating stone, dragon-scale roofs and skeletal balconies.',
        imageQuery: 'Casa Batllo Barcelona Gaudi facade',
      },
    ],

    hiddenGems: [
      {
        name: 'Bunkers del Carmel',
        description:
          'A hilltop of old civil-war bunkers with the best free 360° sunset view over the entire city and sea.',
        imageQuery: 'Bunkers del Carmel Barcelona sunset view',
      },
      {
        name: 'El Born backstreets',
        description:
          'A stylish medieval quarter of designer boutiques, tapas bars and the soaring Santa Maria del Mar church.',
        imageQuery: 'El Born Barcelona street Santa Maria del Mar',
      },
      {
        name: 'Hospital de Sant Pau',
        description:
          'A breathtaking Modernista hospital complex of mosaic pavilions and gardens, rivalling Gaudí and far quieter.',
        imageQuery: 'Hospital de Sant Pau Barcelona Modernista',
      },
    ],

    food: [
      {
        name: 'Tapas & pintxos',
        description:
          'Bar-hopping for small plates — patatas bravas, pan con tomate, croquetas and Iberian ham — over vermouth or wine.',
        imageQuery: 'tapas Barcelona bar small plates',
      },
      {
        name: 'Paella & fideuà',
        description:
          'Saffron seafood rice and its noodle cousin, best at a beachside spot with the Mediterranean in view.',
        imageQuery: 'seafood paella Barcelona beach',
      },
      {
        name: 'Crema catalana',
        description:
          'A Catalan custard with a brittle caramelised top, scented with citrus and cinnamon.',
        imageQuery: 'crema catalana Catalan dessert',
      },
      {
        name: 'Cava & vermut',
        description:
          'Catalonia’s sparkling cava and the local vermouth ritual of the lazy weekend aperitif.',
        imageQuery: 'cava vermut Barcelona aperitif',
      },
    ],

    adventures: [
      {
        name: 'Beach & sea day',
        description:
          'Swimming, sunbathing and beach volleyball on Barceloneta, then paddleboarding along the city shore.',
        imageQuery: 'Barceloneta beach Barcelona sea',
      },
      {
        name: 'Montserrat day trip',
        description:
          'A cable car up to a serrated mountain monastery with hiking trails and a famous boys’ choir.',
        imageQuery: 'Montserrat mountain monastery Barcelona',
      },
      {
        name: 'Tapas & food-market crawl',
        description:
          'Grazing the stalls of La Boqueria and bar-hopping through El Born and Gràcia by night.',
        imageQuery: 'La Boqueria market Barcelona food',
      },
    ],

    seasons: {
      spring:
        'April–June is glorious — warm, sunny and in full bloom, with the sea warming for early swims.',
      summer:
        'July–August is hot, busy and beachy, buzzing with festivals and late nightlife (and big crowds).',
      autumn:
        'September–October keeps the warmth and swimmable sea while the crowds thin and the light turns golden.',
      winter:
        'November–February is mild and quiet, with crisp sunny days, cheaper stays and Gaudí without the queues.',
    },

    culture: {
      language: 'Catalan and Spanish; English widely spoken',
      religion: 'Roman Catholic heritage, largely secular today',
      greeting: 'Two cheek kisses among friends; "Hola" and a little Catalan ("Bon dia") are welcome',
      etiquette: [
        'Cover shoulders and knees inside churches like the Sagrada Família.',
        'Dinner is late — locals rarely eat before 9pm.',
        'Stay alert to pickpockets on La Rambla, the metro and crowded areas.',
        'Respect Catalan identity; it’s distinct from the rest of Spain.',
      ],
      festivals: [
        {
          name: 'La Mercè',
          when: 'September',
          description:
            'Barcelona’s biggest festival — human towers (castellers), fire runs, giants and concerts fill the streets.',
        },
        {
          name: 'Sant Jordi',
          when: 'April 23',
          description:
            'Catalonia’s romantic "day of books and roses", when couples exchange a rose and a book.',
        },
        {
          name: 'Sant Joan',
          when: 'June 23',
          description:
            'Midsummer night of bonfires, fireworks and beach parties welcoming the summer.',
        },
      ],
    },

    heroQuote: 'Where Gaudí’s dreams rise in stone between a medieval maze and the Mediterranean.',
    heroMedia: {
      title: 'Sagrada Família in Morning Light',
      imageQuery: 'Sagrada Familia Barcelona morning light spires',
      atmosphere: 'Warm Mediterranean light, café chatter and stained glass scattering colour across stone.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Barcelona city aerial Sagrada Familia sea',
        description: 'A grand grid of a city runs from green hills to the sea.',
      },
      {
        title: 'The Basilica',
        imageQuery: 'Sagrada Familia interior columns light Barcelona',
        description: 'You step into Gaudí’s forest of stone and coloured light.',
      },
      {
        title: 'The Old Town',
        imageQuery: 'Gothic Quarter Barcelona narrow alley',
        description: 'You wander medieval lanes into hidden squares and tapas bars.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Bunkers del Carmel Barcelona sunset view',
        description: 'From a hilltop the whole city glows gold to the sea.',
      },
      {
        title: 'Night',
        imageQuery: 'Barcelona night El Born tapas street',
        description: 'The narrow bars of El Born fill with wine and late dinners.',
      },
    ],

    photoCollections: {
      hero: ['Sagrada Familia Barcelona', 'Park Guell Barcelona mosaic', 'Casa Batllo Barcelona Gaudi'],
      nature: ['Barceloneta beach Barcelona', 'Montserrat mountain Barcelona', 'Barcelona Mediterranean coast'],
      culture: ['Gothic Quarter Barcelona', 'Barcelona castellers human tower', 'La Boqueria market Barcelona'],
      food: ['tapas Barcelona bar', 'seafood paella Barcelona', 'cava Catalan aperitif'],
      night: ['Barcelona night Sagrada Familia lit', 'Barcelona El Born night', 'Barcelona beach club night'],
      hidden: ['Bunkers del Carmel sunset', 'El Born Barcelona Santa Maria', 'Hospital de Sant Pau Barcelona'],
    },

    ambience: {
      soundscape: ['Buskers on the Rambla', 'Church bells in the Gothic Quarter', 'Waves on Barceloneta', 'Late-night tapas-bar chatter'],
      musicStyle: 'Catalan rumba and Spanish guitar',
      weatherMood: 'Warm, sunny and Mediterranean, golden over stone and sea',
    },

    story:
      'Barcelona shouldn’t make sense, and that’s exactly why it works. It is at once a medieval city, a beach resort, an avant-garde art project and a riotous, late-night party town — and it switches between all of them in the space of a single afternoon. You start the morning lost in the Gothic Quarter, a shadowy maze of stone alleys and hidden squares where Roman walls hold up Catalan apartments, then step out onto a grand modernist boulevard and crane your neck at Gaudí — because Gaudí is everywhere here, having reimagined whole buildings as dragons and bones and waves of melting stone, and crowned the city with the Sagrada Família, a basilica so strange and luminous it stops you mid-sentence. By afternoon you’re swimming in the Mediterranean off a city beach; by evening you’re bar-hopping for tapas and vermouth through El Born; and at midnight, when most cities sleep, Barcelona is only clearing its throat. It is creative, hedonistic, proudly Catalan and impossible not to love.',

    experiences: [
      'Tour the soaring interior of the Sagrada Família',
      'Wander Gaudí’s mosaic wonderland at Park Güell',
      'Tapas and vermouth crawl through El Born and Gràcia',
      'Sunset over the city from the Bunkers del Carmel',
      'Beach day and paddleboarding at Barceloneta',
      'Get lost in the Gothic Quarter’s medieval lanes',
      'Day trip to the mountain monastery of Montserrat',
      'Graze the stalls of La Boqueria market',
    ],

    moods: ['Vibrant', 'Cultural', 'Foodie', 'Beach', 'Nightlife'],
    travelStyle: ['Couples', 'Friends', 'Solo', 'Foodies'],

    aiSummary:
      'Barcelona has it all — Gaudí’s surreal architecture, a medieval old town, Mediterranean beaches, brilliant tapas and famous nightlife. It suits couples, friends, foodies and solo travellers who want culture, sea and energy in one walkable city. Visit May–June or September–October for warm, swimmable days without the August crush; watch for pickpockets in crowds. Lively, creative and proudly Catalan, with Montserrat and the Costa Brava nearby, it balances sightseeing, beach and going out better than almost anywhere. A vivid contrast to Andalusian Seville. Choose Barcelona for art, sea and round-the-clock buzz.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 45. PARIS, FRANCE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    continent: 'Europe',
    lat: 48.8566,
    lng: 2.3522,
    flag: '🇫🇷',
    capital: 'Paris',
    population: 2140000,
    bestSeason: 'April–June and September–October for mild, lovely strolling weather',
    budget: 'Premium · €120–280 / day',
    timezone: 'CET (UTC+1)',

    wonders: [
      {
        name: 'Eiffel Tower',
        description:
          'The iron lattice icon of the city, glittering on the hour after dark and crowned with views across the rooftops of Paris.',
        imageQuery: 'Eiffel Tower Paris sparkle night',
      },
      {
        name: 'The Louvre',
        description:
          'The world’s greatest museum, from the Mona Lisa to ancient wonders, entered through I.M. Pei’s glass pyramid.',
        imageQuery: 'Louvre Paris glass pyramid',
      },
      {
        name: 'Notre-Dame & the Île de la Cité',
        description:
          'The restored Gothic cathedral on the Seine island where Paris itself was born two thousand years ago.',
        imageQuery: 'Notre-Dame Paris cathedral Seine',
      },
      {
        name: 'Montmartre & Sacré-Cœur',
        description:
          'A hilltop village of cobbled lanes, artists’ squares and a white-domed basilica overlooking the whole city.',
        imageQuery: 'Montmartre Sacre Coeur Paris steps',
      },
    ],

    hiddenGems: [
      {
        name: 'Canal Saint-Martin',
        description:
          'A tree-lined canal of iron footbridges and locks where young Parisians picnic and sip wine on the quays.',
        imageQuery: 'Canal Saint-Martin Paris bridges picnic',
      },
      {
        name: 'Père Lachaise Cemetery',
        description:
          'A vast, leafy garden cemetery of cobbled avenues and famous graves, from Chopin to Jim Morrison.',
        imageQuery: 'Pere Lachaise cemetery Paris graves',
      },
      {
        name: 'Le Marais courtyards',
        description:
          'A historic quarter of hidden mansion courtyards, falafel lanes, galleries and the lovely Place des Vosges.',
        imageQuery: 'Le Marais Paris Place des Vosges courtyard',
      },
    ],

    food: [
      {
        name: 'Croissant & café',
        description:
          'A buttery, flaky croissant and a strong espresso at a pavement café — the daily Parisian ritual.',
        imageQuery: 'croissant cafe Paris pavement',
      },
      {
        name: 'Steak frites & escargot',
        description:
          'Bistro classics — seared steak with golden fries, and garlicky butter snails — over a carafe of red.',
        imageQuery: 'steak frites Paris bistro',
      },
      {
        name: 'Cheese & a baguette',
        description:
          'A wedge of ripe cheese, a fresh baguette and a glass of wine, ideally on a riverbank at golden hour.',
        imageQuery: 'French cheese baguette wine Paris',
      },
      {
        name: 'Pâtisserie',
        description:
          'Jewel-like macarons, éclairs and tarts from a master pâtissier, almost too beautiful to eat (almost).',
        imageQuery: 'Paris patisserie macarons eclairs',
      },
    ],

    adventures: [
      {
        name: 'Seine river cruise',
        description:
          'Drifting past the floodlit monuments at night, the city unfolding from the water bridge by bridge.',
        imageQuery: 'Seine river cruise Paris night monuments',
      },
      {
        name: 'Day trip to Versailles',
        description:
          'The Sun King’s colossal palace of mirrored halls, fountains and endless formal gardens.',
        imageQuery: 'Versailles palace gardens hall of mirrors',
      },
      {
        name: 'Flâneur wandering',
        description:
          'The Parisian art of aimless strolling — drifting the boulevards, quays and passages with no plan at all.',
        imageQuery: 'Paris street walking boulevard cafe',
      },
    ],

    seasons: {
      spring:
        'April–June is classic Paris — blossom, café terraces and long, gentle evenings along the Seine.',
      summer:
        'July–August is warm and busy, with Paris Plages on the riverbanks and many locals away on holiday.',
      autumn:
        'September–October brings golden light, crisp air and a stylish back-to-life energy — many people’s favourite.',
      winter:
        'November–February is cold and often grey, but magical at Christmas, cosy in cafés and free of crowds.',
    },

    culture: {
      language: 'French; English understood in tourist areas',
      religion: 'Roman Catholic heritage, strongly secular today',
      greeting: 'Always open with "Bonjour" before anything else; manners matter enormously',
      etiquette: [
        'Greet shopkeepers and waiters with "Bonjour" and leave with "Au revoir".',
        'Speak softly in restaurants and keep dining unhurried.',
        'Dress a little smartly; Parisians notice effort.',
        'Service is included; rounding up or a euro or two is a courteous extra.',
      ],
      festivals: [
        {
          name: 'Fête de la Musique',
          when: 'June 21',
          description:
            'Free live music erupts on every street corner and square across the city on the summer solstice.',
        },
        {
          name: 'Bastille Day',
          when: 'July 14',
          description:
            'A military parade, fireworks over the Eiffel Tower and firefighters’ balls celebrate the Republic.',
        },
        {
          name: 'Nuit Blanche',
          when: 'October',
          description:
            'An all-night contemporary-art festival turns the whole city into a free open-air gallery.',
        },
      ],
    },

    heroQuote: 'Where every café, bridge and boulevard seems written for a love story.',
    heroMedia: {
      title: 'The Eiffel Tower Sparkles',
      imageQuery: 'Eiffel Tower Paris night sparkle Seine',
      atmosphere: 'Soft golden lamplight on the Seine, an accordion somewhere and the city glittering at dusk.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Paris rooftops Eiffel Tower aerial Haussmann',
        description: 'Grey-zinc rooftops roll to the Eiffel Tower on the skyline.',
      },
      {
        title: 'The Museum',
        imageQuery: 'Louvre Paris pyramid gallery art',
        description: 'You wander the Louvre’s endless halls of human genius.',
      },
      {
        title: 'The Café',
        imageQuery: 'Paris cafe terrace people croissant',
        description: 'You linger over coffee and watch the city stroll past.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Seine river Paris sunset bridge golden',
        description: 'The Seine and its bridges turn gold as evening falls.',
      },
      {
        title: 'Night',
        imageQuery: 'Eiffel Tower sparkle night Paris',
        description: 'On the hour, the Eiffel Tower bursts into glittering light.',
      },
    ],

    photoCollections: {
      hero: ['Eiffel Tower Paris', 'Louvre pyramid Paris', 'Sacre Coeur Montmartre Paris'],
      nature: ['Luxembourg Gardens Paris', 'Seine river Paris autumn', 'Versailles gardens fountains'],
      culture: ['Louvre art Paris', 'Montmartre artists square Paris', 'Notre-Dame Paris cathedral'],
      food: ['Paris croissant cafe', 'French bistro steak frites', 'Paris patisserie macarons'],
      night: ['Eiffel Tower sparkle night', 'Paris Seine night lights', 'Montmartre Paris night'],
      hidden: ['Canal Saint-Martin Paris', 'Pere Lachaise cemetery Paris', 'Le Marais Paris courtyard'],
    },

    ambience: {
      soundscape: ['An accordion on a bridge', 'Café cups and conversation', 'Church bells over the Seine', 'Footsteps on cobbled lanes'],
      musicStyle: 'French chanson and musette accordion',
      weatherMood: 'Soft grey-gold light on zinc rooftops and the river',
    },

    story:
      'Paris is so familiar before you arrive — from a thousand films and photographs — that the real surprise is how it still manages to take your breath away. You turn a corner and there it is, the Eiffel Tower, taller and stranger than memory; you walk a bridge over the Seine at dusk as the lamps come on and the bouquinistes pack up their stalls, and something in your chest just gives way. The city is built for this — for strolling without aim, for sitting in a café watching the whole of life parade past, for lingering two hours over a coffee you finished long ago. You spend a morning lost among more masterpieces than you can absorb, an afternoon eating cheese and bread on a riverbank, an evening in a tiny bistro over steak and a carafe of red while the waiter pretends to disapprove of you and secretly doesn’t. It is, yes, crowded and expensive and occasionally aloof. And then the Eiffel Tower bursts into sparkling light on the hour, and a hundred strangers gasp at once, and you forgive it everything.',

    experiences: [
      'Watch the Eiffel Tower sparkle after dark',
      'See the masterpieces of the Louvre',
      'Picnic with cheese and wine on the Seine',
      'Wander the cobbled lanes of Montmartre',
      'Linger over coffee at a pavement café',
      'Evening Seine river cruise past the monuments',
      'Day trip to the Palace of Versailles',
      'Pâtisserie and chocolate tasting',
    ],

    moods: ['Romantic', 'Cultural', 'Foodie', 'History', 'Iconic'],
    travelStyle: ['Couples', 'Honeymoon', 'Solo', 'Culture Seekers'],

    aiSummary:
      'Paris is the world’s great romantic capital — iconic monuments, the Louvre, café culture, the Seine and unbeatable food and pâtisserie. It suits couples, honeymooners, solo travellers and culture lovers who want art, history and atmosphere over beaches or wild nature. Visit April–June or September–October for mild, beautiful strolling weather. Walkable, layered and endlessly photogenic, it rewards slow wandering and long café sits as much as ticking off sights, with Versailles a short trip away. A more iconic, urban counterpoint to rural Provence. Choose Paris to fall in love with a city.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 49. METEORA, GREECE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'meteora',
    name: 'Meteora',
    country: 'Greece',
    continent: 'Europe',
    lat: 39.7217,
    lng: 21.6306,
    flag: '🇬🇷',
    capital: 'Athens',
    population: 8000,
    bestSeason: 'April–June and September–October for mild days and clear views',
    budget: 'Affordable · €60–120 / day',
    timezone: 'EET (UTC+2)',

    wonders: [
      {
        name: 'The clifftop monasteries',
        description:
          'Six Byzantine monasteries perched atop sheer sandstone pillars, built by monks who once climbed by rope ladder and net.',
        imageQuery: 'Meteora monasteries cliff Greece',
      },
      {
        name: 'The rock pinnacles',
        description:
          'A forest of vast, smooth stone towers rising from the plain — a geological wonder formed over millions of years.',
        imageQuery: 'Meteora rock pillars formations Greece',
      },
      {
        name: 'Great Meteoron monastery',
        description:
          'The largest and oldest, with a frescoed church, an old monks’ ossuary and a museum atop the highest rock.',
        imageQuery: 'Great Meteoron monastery Meteora interior',
      },
      {
        name: 'Sunset from the viewpoints',
        description:
          'The hour when the rocks and monasteries glow amber and rose, with the whole valley spread below.',
        imageQuery: 'Meteora sunset monasteries golden rocks',
      },
    ],

    hiddenGems: [
      {
        name: 'The old monk paths',
        description:
          'Centuries-old hiking trails winding between the pillars and up to the monasteries, away from the road and the tour buses.',
        imageQuery: 'Meteora hiking trail monk path rocks',
      },
      {
        name: 'Badovas hermit caves',
        description:
          'Ancient ascetic cave dwellings clinging to the cliffs, where the very first hermits lived before the monasteries.',
        imageQuery: 'Meteora hermit caves cliff Greece',
      },
      {
        name: 'Kastraki village',
        description:
          'A quiet stone village right beneath the rocks, less touristy than Kalambaka, with tavernas under the pillars.',
        imageQuery: 'Kastraki village Meteora rocks Greece',
      },
    ],

    food: [
      {
        name: 'Hilopites',
        description:
          'Hand-cut egg pasta from the Thessaly plain, often served with slow-cooked rooster (kokoras) in tomato sauce.',
        imageQuery: 'hilopites Greek pasta rooster dish',
      },
      {
        name: 'Local lamb & game',
        description:
          'Mountain lamb, pork and game slow-roasted with herbs, the hearty cooking of central Greece.',
        imageQuery: 'Greek roast lamb mountain taverna',
      },
      {
        name: 'Greek meze & feta',
        description:
          'Tzatziki, grilled vegetables, olives and slabs of feta with crusty bread and local wine.',
        imageQuery: 'Greek meze feta olives taverna',
      },
      {
        name: 'Tsipouro',
        description:
          'The fiery Thessalian grape spirit, sipped slowly with meze in the village tavernas.',
        imageQuery: 'tsipouro Greek spirit meze',
      },
    ],

    adventures: [
      {
        name: 'Hike between the monasteries',
        description:
          'Following the old monk trails up through the pillars, linking several monasteries on foot in a day.',
        imageQuery: 'Meteora hiking monasteries trail Greece',
      },
      {
        name: 'Rock climbing the pillars',
        description:
          'Scaling the smooth sandstone towers on classic routes, a pilgrimage for climbers from around the world.',
        imageQuery: 'rock climbing Meteora pillars Greece',
      },
      {
        name: 'Sunset photography tour',
        description:
          'Chasing the best viewpoints as the low light sets the monasteries and rocks ablaze.',
        imageQuery: 'Meteora sunset photography viewpoint',
      },
    ],

    seasons: {
      spring:
        'April–June is lovely — green valley, wildflowers, mild days and clear air for photography and hiking.',
      summer:
        'July–August is hot and busier, with hazy afternoons; early mornings and evenings are best.',
      autumn:
        'September–October brings golden light, cooler hiking weather and thinning crowds.',
      winter:
        'November–February is cold and atmospheric, the rocks often wreathed in mist or dusted with snow.',
    },

    culture: {
      language: 'Greek; English in tourist areas',
      religion: 'Greek Orthodox Christianity — the monasteries are active and sacred',
      greeting: 'A friendly "Yassas"; a respectful, quiet manner at the monasteries',
      etiquette: [
        'Dress modestly to enter the monasteries — long trousers for men, skirts for women (wraps provided).',
        'Cover shoulders and keep your voice low inside the churches.',
        'Don’t photograph monks or church interiors where it’s forbidden.',
        'Check the rotating opening days, as each monastery closes on different days.',
      ],
      festivals: [
        {
          name: 'Greek Orthodox Easter',
          when: 'April/May',
          description:
            'The most sacred festival, observed in the monasteries with candlelit liturgies and ancient ritual.',
        },
        {
          name: 'Dormition of the Virgin',
          when: 'August 15',
          description:
            'A major religious feast celebrated at the monasteries and in the surrounding villages.',
        },
        {
          name: 'Feast days of the monasteries',
          when: 'Various',
          description:
            'Each monastery honours its patron saint with special liturgies open to respectful visitors.',
        },
      ],
    },

    heroQuote: 'Where monasteries float on pillars of rock between earth and heaven.',
    heroMedia: {
      title: 'Monasteries above the Clouds',
      imageQuery: 'Meteora monastery cliff mist sunrise Greece',
      atmosphere: 'Cool morning mist swirling around the pillars and a distant monastery bell.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Meteora rock pillars valley village aerial',
        description: 'Vast stone towers rise from the plain above a stone village.',
      },
      {
        title: 'The Climb',
        imageQuery: 'Meteora monastery steps stairs cliff',
        description: 'You climb stone steps carved up the side of a sheer pillar.',
      },
      {
        title: 'The Monastery',
        imageQuery: 'Meteora monastery courtyard frescoes Greece',
        description: 'Inside, frescoed chapels and quiet courtyards crown the rock.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Meteora sunset rocks monasteries golden',
        description: 'The pillars and monasteries glow amber as the sun sets.',
      },
      {
        title: 'Night',
        imageQuery: 'Meteora night stars rocks monastery lit',
        description: 'Stars wheel over the dark towers and a lit monastery.',
      },
    ],

    photoCollections: {
      hero: ['Meteora monasteries cliff Greece', 'Meteora rock pillars', 'Meteora monastery sunset'],
      nature: ['Meteora rock formations valley', 'Meteora green valley Greece', 'Meteora mist rocks'],
      culture: ['Meteora monastery frescoes', 'Greek Orthodox monk Meteora', 'Meteora monastery interior'],
      food: ['Greek taverna meze Meteora', 'Greek roast lamb dish', 'Greek feta olives village'],
      night: ['Meteora night sky stars', 'Meteora monastery night lit', 'Meteora rocks starry night'],
      hidden: ['Meteora hiking trail rocks', 'Meteora hermit caves', 'Kastraki village Meteora'],
    },

    ambience: {
      soundscape: ['A distant monastery bell', 'Wind around the rock pillars', 'Birdsong in the valley', 'Orthodox chant from a chapel'],
      musicStyle: 'Byzantine Orthodox chant',
      weatherMood: 'Cool, clear and still, mist drifting between the towers',
    },

    story:
      'Some places make you believe in the impossible, and Meteora is one of them. On a plain in central Greece, for no geological reason that quite satisfies the soul, a forest of colossal stone pillars rises hundreds of metres straight into the sky — and on top of them, somehow, sit monasteries. Six remain of the two dozen built here from the 14th century onward by monks seeking to be closer to God and further from the world, who hauled themselves and every stone and beam up the sheer rock by rope ladders, nets and winches. The name means "suspended in the air", and standing beneath them you understand why: they seem less built than placed there, hovering between earth and heaven. You climb the steps now carved into the rock, step into frescoed chapels dim with incense and candlelight where monks still pray, and look out over the valley from a balcony at the edge of a cliff. And at sunset, when the low light turns the pillars to gold and the monasteries glow on their summits, the whole valley falls quiet, and faith and geology become, for a moment, the same astonishing thing.',

    experiences: [
      'Visit the clifftop Byzantine monasteries',
      'Hike the old monk trails between the pillars',
      'Sunset over the rocks from a viewpoint',
      'Rock climb the famous sandstone towers',
      'See the frescoes of the Great Meteoron',
      'Explore the ancient hermit caves',
      'Stay in stone-village Kastraki beneath the rocks',
      'Sunrise photography among the misty pillars',
    ],

    moods: ['Spiritual', 'Awe', 'Scenic', 'History', 'Photography'],
    travelStyle: ['Couples', 'Solo', 'Culture Seekers', 'Hikers'],

    aiSummary:
      'Meteora is one of Greece’s most jaw-dropping sights — Byzantine monasteries perched atop soaring stone pillars between earth and sky. It suits couples, solo travellers, culture-seekers and hikers who want spirituality, dramatic scenery and history over beaches or nightlife. Visit April–June or September–October for mild weather and clear light; dress modestly for the active monasteries. Affordable and uncrowded compared with the islands, with great hiking and climbing, it’s easily reached by train from Athens or Thessaloniki. A soulful, mainland contrast to Santorini’s seascapes. Choose Meteora to stand where monks built monasteries in the clouds.',
  },
]
