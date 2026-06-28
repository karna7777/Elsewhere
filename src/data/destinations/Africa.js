export default [
  // ─────────────────────────────────────────────────────────────────────────
  // 4. MARRAKECH, MOROCCO
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'marrakech',
    name: 'Marrakech',
    country: 'Morocco',
    continent: 'Africa',
    lat: 31.6295,
    lng: -7.9811,
    flag: '🇲🇦',
    capital: 'Rabat',
    population: 928850,
    bestSeason: 'March–May and September–November for mild, dry days',
    budget: 'Affordable · 400–1,200 MAD / day',
    timezone: 'WEST (UTC+1)',

    wonders: [
      {
        name: 'Jemaa el-Fnaa',
        description:
          'The beating heart of the medina — a vast square that transforms at dusk into a carnival of food stalls, storytellers, musicians and lantern smoke.',
        imageQuery: 'Jemaa el-Fnaa square Marrakech night',
      },
      {
        name: 'Koutoubia Mosque',
        description:
          'The city’s 12th-century landmark, its towering minaret a template for towers from Seville to Rabat, glowing rose against the sunset.',
        imageQuery: 'Koutoubia Mosque minaret Marrakech',
      },
      {
        name: 'Bahia Palace',
        description:
          'A 19th-century palace of carved cedar, painted ceilings and tranquil courtyards built to be "the brilliant" — and it is.',
        imageQuery: 'Bahia Palace Marrakech courtyard',
      },
      {
        name: 'Jardin Majorelle',
        description:
          'An electric-blue garden of cacti and bamboo created by a French painter and saved by Yves Saint Laurent, an oasis of calm and cobalt.',
        imageQuery: 'Jardin Majorelle blue garden Marrakech',
      },
    ],

    hiddenGems: [
      {
        name: 'Le Jardin Secret',
        description:
          'A restored riad garden hidden deep in the medina, with Islamic and exotic gardens and a tower view over the rooftops.',
        imageQuery: 'Le Jardin Secret Marrakech garden',
      },
      {
        name: 'Tanneries of the medina',
        description:
          'Honeycombs of stone dye-pits where leather is still cured by hand as it has been for centuries — pungent, vivid and real.',
        imageQuery: 'Marrakech tanneries leather dye pits',
      },
      {
        name: 'Mellah spice souks',
        description:
          'The old Jewish quarter’s quieter lanes, where apothecary stalls pile saffron, ras el hanout and rose buds in fragrant pyramids.',
        imageQuery: 'Marrakech spice market souk',
      },
    ],

    food: [
      {
        name: 'Tagine',
        description:
          'Lamb, prunes and almonds — or chicken with preserved lemon and olives — slow-cooked in a conical clay pot until falling-apart tender.',
        imageQuery: 'Moroccan tagine lamb prunes',
      },
      {
        name: 'Couscous',
        description:
          'Hand-rolled semolina steamed over a seven-vegetable stew, the traditional Friday family feast.',
        imageQuery: 'Moroccan couscous vegetables',
      },
      {
        name: 'Harira',
        description:
          'A hearty tomato, lentil and chickpea soup, the dish that breaks the fast each evening during Ramadan.',
        imageQuery: 'harira Moroccan soup',
      },
      {
        name: 'Mint tea',
        description:
          'Sweet green tea poured from a height into a glass — the ritual of welcome offered in every home and shop.',
        imageQuery: 'Moroccan mint tea pouring',
      },
    ],

    adventures: [
      {
        name: 'Atlas Mountains day trip',
        description:
          'A drive into Berber villages and walnut groves beneath snow-dusted peaks, with a mule trek to a waterfall.',
        imageQuery: 'Atlas Mountains Berber village Morocco',
      },
      {
        name: 'Agafay Desert camp',
        description:
          'A camel ride and sunset dinner in the stony desert an hour from the city, with drumming under the stars.',
        imageQuery: 'Agafay desert camp Marrakech sunset',
      },
      {
        name: 'Hot-air balloon at dawn',
        description:
          'Drifting over palm groves and Berber hamlets as the High Atlas catches the first pink light.',
        imageQuery: 'hot air balloon Marrakech sunrise desert',
      },
    ],

    seasons: {
      spring:
        'March–May is glorious: warm days, blooming gardens and the High Atlas still capped with snow.',
      summer:
        'June–August is scorching, often above 40°C — riads with plunge pools and shaded courtyards become essential.',
      autumn:
        'September–November cools pleasantly and the light turns golden over the rooftops.',
      winter:
        'Mild sunny days and cold nights; perfect for medina wandering and a snowy Atlas backdrop.',
    },

    culture: {
      language: 'Arabic and Berber (Tamazight); French widely spoken',
      religion: 'Islam',
      greeting: 'Hand over heart with "Salaam alaikum" (peace be upon you)',
      etiquette: [
        'Dress modestly — cover shoulders and knees, especially women and at religious sites.',
        'Ask before photographing people; some performers expect a small tip.',
        'Non-Muslims cannot enter most mosques.',
        'Bargaining in the souks is expected and good-natured — start low and smile.',
      ],
      festivals: [
        {
          name: 'Marrakech Popular Arts Festival',
          when: 'July',
          description:
            'Folk musicians, dancers and acrobats from across Morocco fill the city’s palaces and squares.',
        },
        {
          name: 'Eid al-Fitr',
          when: 'Varies (end of Ramadan)',
          description:
            'The joyful feast that ends the holy month, with new clothes, sweets and family gatherings.',
        },
        {
          name: 'Marrakech International Film Festival',
          when: 'November/December',
          description:
            'A glamorous global film celebration that lights up the Jemaa el-Fnaa with open-air screenings.',
        },
      ],
    },

    heroQuote: 'Where the desert air carries spice, smoke and the call to prayer.',
    heroMedia: {
      title: 'Dusk over Jemaa el-Fnaa',
      imageQuery: 'Jemaa el-Fnaa sunset smoke Marrakech',
      atmosphere: 'Grilling smoke, snake-charmer flutes and the muezzin’s call rolling over the rooftops.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Marrakech medina rooftops Atlas mountains',
        description: 'Ochre rooftops crowd toward the snow-tipped Atlas on the horizon.',
      },
      {
        title: 'The Souk',
        imageQuery: 'Marrakech souk lanterns market',
        description: 'You lose yourself in labyrinth lanes hung with lamps and carpets.',
      },
      {
        title: 'The Riad',
        imageQuery: 'Marrakech riad courtyard fountain',
        description: 'Behind a plain door, a tiled courtyard cools around a fountain.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Koutoubia mosque sunset Marrakech',
        description: 'The Koutoubia minaret burns rose as the heat finally breaks.',
      },
      {
        title: 'Night',
        imageQuery: 'Jemaa el-Fnaa night food stalls',
        description: 'The great square erupts into smoke, music and lantern light.',
      },
    ],

    photoCollections: {
      hero: ['Jemaa el-Fnaa square', 'Koutoubia mosque Marrakech', 'Marrakech medina rooftops'],
      nature: ['Atlas Mountains Morocco', 'Agafay desert Marrakech', 'palm grove Marrakech'],
      culture: ['Marrakech souk market', 'Moroccan riad tilework', 'Marrakech carpets textiles'],
      food: ['Moroccan tagine', 'Marrakech street food', 'Moroccan mint tea'],
      night: ['Jemaa el-Fnaa night', 'Marrakech lanterns night', 'Marrakech rooftop bar sunset'],
      hidden: ['Le Jardin Secret Marrakech', 'Marrakech tanneries', 'Jardin Majorelle blue'],
    },

    ambience: {
      soundscape: ['The call to prayer', 'Snake-charmer flutes', 'Hammering in the metal souk', 'Gnawa drums at dusk'],
      musicStyle: 'Gnawa trance rhythms and Andalusian strings',
      weatherMood: 'Dry desert warmth thick with spice and grill smoke',
    },

    story:
      'You push through a nondescript door in a dusty lane and the city changes its mind about you. Outside: heat, noise, the relentless press of the medina. Inside your riad: a fountain trickling in a courtyard of zellij tile, rose petals on cool water, the scent of orange blossom. This is Marrakech’s secret — that everything intense has a hidden room of calm beside it. You spend the day lost on purpose, following the smell of cumin and cedar through souks where coppersmiths hammer and dyers hang skeins of wool like banners. A glass of mint tea appears, poured from a great height by a grinning merchant who is in no hurry at all. Then dusk comes to Jemaa el-Fnaa, and the square detonates — grills flare, drums start, a storyteller gathers a crowd in a language you can’t follow but somehow understand. The smoke rises pink past the minaret, and you let the city carry you.',

    experiences: [
      'Dusk feast among the food stalls of Jemaa el-Fnaa',
      'Get pleasurably lost on a guided souk walk',
      'Traditional hammam steam-and-scrub ritual',
      'Moroccan cooking class with a market shop first',
      'Atlas Mountains and Berber village day trip',
      'Sunset camel ride and dinner in the Agafay Desert',
      'Rooftop mint tea overlooking the medina',
      'Calligraphy or zellij-tile workshop in an artisan studio',
    ],

    moods: ['Adventure', 'Sensory', 'Exotic', 'History', 'Photography'],
    travelStyle: ['Couples', 'Solo', 'Adventure', 'Culture Seekers'],

    aiSummary:
      'Marrakech is a sensory plunge — souks, spices, palaces and desert on the doorstep — ideal for adventurous, curious travellers who want immersion over comfort-zone ease. It suits couples, solo explorers and photographers, especially those who enjoy bargaining, getting lost and bold flavours. Visit in spring or autumn to avoid summer’s furnace heat, and balance the medina’s intensity with a calm riad retreat. Less suited to travellers wanting predictability, quiet beaches or minimal hassle. Choose Marrakech for a vivid, affordable collision of Africa, Arabia and the desert.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 8. MAASAI MARA, KENYA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'maasai-mara',
    name: 'Maasai Mara',
    country: 'Kenya',
    continent: 'Africa',
    lat: -1.5061,
    lng: 35.1432,
    flag: '🇰🇪',
    capital: 'Nairobi',
    population: 1157000,
    bestSeason: 'July–October for the Great Migration and river crossings',
    budget: 'Premium · $150–600 / day including safari lodge',
    timezone: 'EAT (UTC+3)',

    wonders: [
      {
        name: 'The Great Migration',
        description:
          'Over a million wildebeest and zebra thundering across the plains in an ancient loop, plunging through crocodile-filled rivers.',
        imageQuery: 'Great Migration wildebeest river crossing Mara',
      },
      {
        name: 'Mara River crossings',
        description:
          'The migration’s heart-stopping climax, where herds gather, hesitate and then surge across the water in clouds of dust and spray.',
        imageQuery: 'Mara River crossing wildebeest crocodile',
      },
      {
        name: 'Big Cat country',
        description:
          'The Mara holds Africa’s densest population of lions, plus cheetahs hunting on the open plains and leopards in the riverine trees.',
        imageQuery: 'lion pride Maasai Mara savanna',
      },
      {
        name: 'Endless savanna at dawn',
        description:
          'Golden grasslands stretching to the curve of the earth, dotted with flat-topped acacias and grazing herds in the first light.',
        imageQuery: 'Maasai Mara savanna acacia sunrise',
      },
    ],

    hiddenGems: [
      {
        name: 'Conservancy night drives',
        description:
          'In the private conservancies bordering the reserve, after-dark game drives reveal aardvark, bushbabies and hunting leopards.',
        imageQuery: 'night safari spotlight leopard Kenya',
      },
      {
        name: 'Maasai village visit',
        description:
          'A welcome of jumping warriors and beadwork in a manyatta, sharing the cattle-herding life of the Mara’s human guardians.',
        imageQuery: 'Maasai village warriors Kenya',
      },
      {
        name: 'Walking safari with a Maasai guide',
        description:
          'Tracking on foot to read dung, prints and birdsong — the bush at the scale of your own footsteps.',
        imageQuery: 'walking safari Maasai guide Kenya',
      },
    ],

    food: [
      {
        name: 'Nyama choma',
        description:
          'Open-fire roasted goat or beef, eaten with the hands — Kenya’s convivial national barbecue.',
        imageQuery: 'nyama choma Kenyan roast meat',
      },
      {
        name: 'Ugali & sukuma wiki',
        description:
          'A firm maize staple scooped up with braised collard greens — the everyday heart of a Kenyan meal.',
        imageQuery: 'ugali sukuma wiki Kenyan food',
      },
      {
        name: 'Chapati',
        description:
          'A soft, flaky flatbread of Indian heritage, beloved across Kenya as a treat and a road-trip staple.',
        imageQuery: 'Kenyan chapati flatbread',
      },
      {
        name: 'Kenyan chai',
        description:
          'Sweet spiced tea brewed with milk, sipped from dawn around the campfire as the plains wake up.',
        imageQuery: 'Kenyan chai tea safari',
      },
    ],

    adventures: [
      {
        name: 'Hot-air balloon safari',
        description:
          'Floating silently over the plains at sunrise as herds scatter below, ending with a champagne bush breakfast.',
        imageQuery: 'hot air balloon safari Maasai Mara sunrise',
      },
      {
        name: 'Dawn game drive',
        description:
          'Setting out in the cold first light when the big cats are still on the move and the plains are gold.',
        imageQuery: 'game drive jeep Maasai Mara lions',
      },
      {
        name: 'Bush sundowner',
        description:
          'Drinks on the tailgate as the sun melts into the savanna and hyenas begin to whoop in the dusk.',
        imageQuery: 'safari sundowner Maasai Mara sunset',
      },
    ],

    seasons: {
      spring:
        'March–May is the long rains: lush, green, fewer vehicles, lower prices and dramatic skies — but muddy tracks.',
      summer:
        'June begins the dry season; by July the migration herds pour in from the Serengeti.',
      autumn:
        'July–October is peak: river crossings, big cats hunting and golden grass — the classic safari window.',
      winter:
        'November–February stays warm and greener after short rains, with superb resident wildlife and newborn animals.',
    },

    culture: {
      language: 'Swahili and English; Maa among the Maasai',
      religion: 'Christianity, with traditional Maasai beliefs',
      greeting: '"Jambo" or "Sopa" (Maasai); a handshake is warm and important',
      etiquette: [
        'Always ask before photographing Maasai people; agree any fee first.',
        'Respect wildlife distance and never leave the vehicle without your guide.',
        'Buy beadwork directly from villages to support the community.',
        'Dress in neutral colours on safari and modestly when visiting villages.',
      ],
      festivals: [
        {
          name: 'Maasai Eunoto',
          when: 'Periodic (every several years)',
          description:
            'A coming-of-age ceremony where warriors transition to elderhood with days of song, dance and ritual.',
        },
        {
          name: 'Mara Day',
          when: 'September',
          description:
            'A cross-border celebration of the Mara-Serengeti ecosystem and its conservation.',
        },
        {
          name: 'Jamhuri Day',
          when: 'December 12',
          description:
            'Kenya’s Independence Day, marked nationwide with parades, feasts and music.',
        },
      ],
    },

    heroQuote: 'Where a million hooves cross the plain beneath an endless African sky.',
    heroMedia: {
      title: 'Sunrise on the Migration',
      imageQuery: 'Maasai Mara sunrise wildebeest acacia',
      atmosphere: 'Cool dawn air, the smell of dust and grass, and the distant rumble of moving herds.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Maasai Mara plains aerial light aircraft',
        description: 'A small plane banks low over grasslands that run beyond seeing.',
      },
      {
        title: 'The Hunt',
        imageQuery: 'cheetah Maasai Mara hunting plains',
        description: 'A cheetah rises from the grass, every muscle reading the herd.',
      },
      {
        title: 'The Crossing',
        imageQuery: 'wildebeest crossing Mara river dust',
        description: 'The herds gather at the river, then explode across in chaos.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Maasai Mara sunset acacia silhouette',
        description: 'An acacia and a lone giraffe blacken against a burning sky.',
      },
      {
        title: 'Night',
        imageQuery: 'safari camp campfire stars Africa',
        description: 'Around the fire the Milky Way blazes and lions call in the dark.',
      },
    ],

    photoCollections: {
      hero: ['Maasai Mara lions savanna', 'wildebeest migration Mara', 'Maasai Mara acacia plains'],
      nature: ['cheetah Maasai Mara', 'elephant herd Kenya savanna', 'Mara river crossing'],
      culture: ['Maasai warriors jumping dance', 'Maasai beadwork colorful', 'Maasai village Kenya'],
      food: ['nyama choma Kenya', 'safari bush breakfast', 'Kenyan chai campfire'],
      night: ['safari campfire stars Mara', 'Maasai Mara night sky Milky Way', 'safari tent lantern night'],
      hidden: ['leopard tree Maasai Mara', 'walking safari Kenya', 'hot air balloon Mara dawn'],
    },

    ambience: {
      soundscape: ['Lions roaring at night', 'Wind over tall grass', 'A million hooves', 'Hyenas whooping at dusk'],
      musicStyle: 'Maasai chant and rhythmic African percussion',
      weatherMood: 'Warm golden days and cool, star-flooded nights',
    },

    story:
      'Nothing prepares you for the silence, or for how quickly it breaks. You wake before dawn, wrapped against the cold, and the Land Cruiser noses out into a world the colour of pale gold. For a long while there is only grass, and the curve of the earth, and a sky so wide it makes you quiet. Then your guide cuts the engine. Ahead, a lioness lies in the open, three cubs tumbling at her flank, and beyond her the plain begins to move — wildebeest, ten thousand, a hundred thousand, a dark river of animals flowing toward the Mara. They mass at the bank, hesitating, jostling, until one leaps and the rest follow in a thunder of hooves and spray and bawling, crocodiles surging up to meet them. It is brutal and magnificent and entirely indifferent to you. That night, by the fire, lions call across the dark and the stars come down almost to the grass, and you understand you have seen the Earth doing exactly what it has always done.',

    experiences: [
      'Sunrise hot-air balloon safari and bush breakfast',
      'Dawn and dusk game drives for the Big Five',
      'Witness a Mara River migration crossing (Jul–Oct)',
      'Guided walking safari with a Maasai tracker',
      'Cultural visit to a Maasai manyatta',
      'Night drive in a private conservancy',
      'Sundowner drinks on the open plains',
      'Stargazing and storytelling around the campfire',
    ],

    moods: ['Adventure', 'Wildlife', 'Awe', 'Nature', 'Photography'],
    travelStyle: ['Couples', 'Family', 'Luxury', 'Wildlife Lovers'],

    aiSummary:
      'The Maasai Mara is the ultimate African safari — big cats, elephants and the Great Migration across cinematic plains. It suits wildlife lovers, photographers, families and couples wanting a bucket-list nature experience, especially in luxury tented camps. Time July–October for the migration and river crossings, or visit the green season for fewer crowds, lower prices and newborn animals. It’s a premium, fly-in destination rather than a budget or city trip, best paired with a Maasai cultural visit. Choose the Mara to witness wild Africa at its most overwhelming.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 17. CAIRO, EGYPT
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'cairo',
    name: 'Cairo',
    country: 'Egypt',
    continent: 'Africa',
    lat: 30.0444,
    lng: 31.2357,
    flag: '🇪🇬',
    capital: 'Cairo',
    population: 9540000,
    bestSeason: 'October–April for cooler, comfortable sightseeing days',
    budget: 'Affordable · $30–80 / day',
    timezone: 'EET (UTC+2)',

    wonders: [
      {
        name: 'Pyramids of Giza',
        description:
          'The last surviving wonder of the ancient world — three colossal tombs and the Sphinx rising straight from the desert at the city’s edge.',
        imageQuery: 'Pyramids of Giza Sphinx Egypt',
      },
      {
        name: 'The Grand Egyptian Museum',
        description:
          'A vast new museum beside the pyramids housing Tutankhamun’s complete treasures and millennia of pharaonic wonders.',
        imageQuery: 'Grand Egyptian Museum Cairo Tutankhamun',
      },
      {
        name: 'Khan el-Khalili bazaar',
        description:
          'A medieval labyrinth of coppersmiths, perfume sellers and spice stalls, alive since the 14th century.',
        imageQuery: 'Khan el-Khalili bazaar Cairo lanterns',
      },
      {
        name: 'Islamic Cairo & the Citadel',
        description:
          'A skyline of minarets crowned by the alabaster mosque of Muhammad Ali, with the medieval city spread below.',
        imageQuery: 'Cairo Citadel Muhammad Ali mosque',
      },
    ],

    hiddenGems: [
      {
        name: 'Al-Muizz Street by night',
        description:
          'A floodlit open-air museum of medieval mosques and mansions, glowing and surprisingly peaceful after dark.',
        imageQuery: 'Al-Muizz street Cairo medieval night',
      },
      {
        name: 'Coptic Cairo',
        description:
          'The ancient Christian quarter of the Hanging Church and narrow lanes, layered with Roman and biblical history.',
        imageQuery: 'Coptic Cairo Hanging Church',
      },
      {
        name: 'Al-Azhar Park',
        description:
          'A green hilltop garden built on former rubble, with the finest sunset view across the domes and minarets of old Cairo.',
        imageQuery: 'Al-Azhar Park Cairo sunset skyline',
      },
    ],

    food: [
      {
        name: 'Koshari',
        description:
          'Egypt’s beloved street bowl of rice, lentils, pasta and chickpeas under spicy tomato sauce and crisp fried onions.',
        imageQuery: 'koshari Egyptian street food',
      },
      {
        name: 'Ful medames',
        description:
          'Slow-cooked fava beans mashed with oil, lemon and cumin, scooped with warm bread — the national breakfast.',
        imageQuery: 'ful medames Egyptian beans breakfast',
      },
      {
        name: 'Molokhia',
        description:
          'A garlicky green jute-leaf stew with rabbit or chicken, an ancient pharaonic dish still on every table.',
        imageQuery: 'molokhia Egyptian green stew',
      },
      {
        name: 'Mint tea & shisha',
        description:
          'Sweet tea and fragrant water-pipe smoke in a backstreet ahwa (café), the rhythm of Cairene evenings.',
        imageQuery: 'Egyptian tea shisha cafe Cairo',
      },
    ],

    adventures: [
      {
        name: 'Camel ride at the pyramids',
        description:
          'Riding out into the desert behind Giza for the classic distant view of all three pyramids in a row.',
        imageQuery: 'camel pyramids Giza desert Egypt',
      },
      {
        name: 'Felucca on the Nile',
        description:
          'Sailing a traditional white-sailed boat at sunset as the city lights ripple on the river.',
        imageQuery: 'felucca Nile Cairo sunset sailboat',
      },
      {
        name: 'Day trip to Saqqara & Memphis',
        description:
          'Visiting the Step Pyramid, the world’s oldest stone monument, and the ruins of ancient Egypt’s first capital.',
        imageQuery: 'Saqqara step pyramid Egypt',
      },
    ],

    seasons: {
      spring:
        'March–April is pleasant, though the dusty khamsin winds can occasionally blow in from the desert.',
      summer:
        'June–August is intensely hot; sightseeing means very early starts and shaded afternoons.',
      autumn:
        'October–November cools beautifully into clear, comfortable days — prime visiting season.',
      winter:
        'December–February is mild and sunny, the most comfortable time for the pyramids and bazaars.',
    },

    culture: {
      language: 'Arabic (Egyptian dialect); English in tourist areas',
      religion: 'Predominantly Islam, with a significant Coptic Christian minority',
      greeting: '"As-salaam alaikum" with a hand to the heart; warmth and humour open every door',
      etiquette: [
        'Dress modestly, covering shoulders and knees, especially at mosques and away from hotels.',
        'Women cover their hair to enter mosques; everyone removes shoes.',
        'Bargaining is expected and theatrical in the bazaars — keep it friendly.',
        'Tipping (baksheesh) is a normal part of daily life for small services.',
      ],
      festivals: [
        {
          name: 'Ramadan nights',
          when: 'Varies',
          description:
            'The holy month transforms Cairo after dark with lanterns, communal iftars and streets alive until dawn.',
        },
        {
          name: 'Eid al-Fitr',
          when: 'Varies (end of Ramadan)',
          description:
            'A joyous feast of new clothes, sweets, family visits and packed parks across the city.',
        },
        {
          name: 'Coptic Christmas',
          when: 'January 7',
          description:
            'Egypt’s Coptic Christians celebrate with midnight Mass and family feasts after a long fast.',
        },
      ],
    },

    heroQuote: 'Where the only surviving ancient wonder rises from the sand at the city’s edge.',
    heroMedia: {
      title: 'Sunrise at the Pyramids',
      imageQuery: 'Giza pyramids sunrise desert camel',
      atmosphere: 'Cool desert dawn, drifting sand and the impossible scale of stone against a pale sky.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Cairo skyline Nile minarets aerial',
        description: 'A vast city of minarets and rooftops crowds along the Nile.',
      },
      {
        title: 'The Wonder',
        imageQuery: 'Giza pyramids Sphinx close people',
        description: 'You stand at the foot of the pyramids and lose all sense of scale.',
      },
      {
        title: 'The Bazaar',
        imageQuery: 'Khan el-Khalili Cairo market lanterns',
        description: 'You dive into a medieval maze of copper, spice and lantern light.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Cairo Nile felucca sunset boats',
        description: 'A felucca tilts across a Nile turned to molten gold.',
      },
      {
        title: 'Night',
        imageQuery: 'Islamic Cairo Muizz street night minaret',
        description: 'Floodlit minarets glow over the hushed medieval streets.',
      },
    ],

    photoCollections: {
      hero: ['Pyramids of Giza Egypt', 'Sphinx Giza Cairo', 'Cairo Citadel mosque'],
      nature: ['Nile river Cairo', 'Egyptian desert Giza', 'Saqqara desert pyramid'],
      culture: ['Khan el-Khalili bazaar', 'Cairo mosque minaret', 'Egyptian Museum artifacts'],
      food: ['koshari Egypt', 'Egyptian street food Cairo', 'Egyptian tea shisha'],
      night: ['Cairo night Nile lights', 'Islamic Cairo night minaret', 'Cairo bazaar night lanterns'],
      hidden: ['Al-Muizz street Cairo', 'Coptic Cairo Hanging Church', 'Al-Azhar Park Cairo sunset'],
    },

    ambience: {
      soundscape: ['The call to prayer over the city', 'Car horns on crowded streets', 'Coppersmiths in the bazaar', 'A felucca sail in the wind'],
      musicStyle: 'Classic Egyptian orchestral (think Umm Kulthum)',
      weatherMood: 'Warm, dry desert air over a restless, vibrant megacity',
    },

    story:
      'Cairo does not ease you in — it grabs you by both hands. Twenty million people, a river older than history, car horns and call to prayer and the smell of grilled corn and dust, all of it at once. And then you reach the edge of the city, where the apartment blocks simply stop, and the desert begins, and rising out of that desert are the pyramids — bigger than your mind agreed to let them be, impossibly old, casually enormous, with the Sphinx gazing past you at a horizon it has watched for forty-five centuries. You climb on a camel, or you just stand there, and something in you goes quiet. Later you plunge back into the living city: the Khan el-Khalili bazaar where a man pours you tea and shows you perfume, the medieval lanes glowing at night, a felucca tilting across the Nile at sunset while the lights come on along both banks. Cairo is chaos and wonder in equal, inseparable measure — and you would not have it tamed.',

    experiences: [
      'Sunrise visit to the Pyramids and Sphinx',
      'Explore Tutankhamun’s treasures at the Grand Egyptian Museum',
      'Bargain through the Khan el-Khalili bazaar',
      'Sunset felucca sail on the Nile',
      'Camel ride into the desert behind Giza',
      'Day trip to Saqqara’s Step Pyramid',
      'Egyptian street-food tasting walk',
      'Sunset over old Cairo from Al-Azhar Park',
    ],

    moods: ['History', 'Adventure', 'Awe', 'Sensory', 'Cultural'],
    travelStyle: ['Solo', 'Couples', 'Adventure', 'History Buffs'],

    aiSummary:
      'Cairo is raw, ancient and overwhelming in the best way — the Pyramids and Sphinx, world-class museums, medieval bazaars and the Nile, all at affordable prices. It suits history buffs, adventurous couples and solo travellers who can embrace chaos, crowds and hustle for the payoff of genuine wonder. Visit October–April to avoid brutal heat, dress modestly, and expect intensity rather than calm. Less suited to those wanting relaxation, polish or predictability. Often paired with a Nile cruise to Luxor and Aswan. Choose Cairo to stand before the last ancient wonder of the world.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 18. CAPE TOWN, SOUTH AFRICA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'cape-town',
    name: 'Cape Town',
    country: 'South Africa',
    continent: 'Africa',
    lat: -33.9249,
    lng: 18.4241,
    flag: '🇿🇦',
    capital: 'Pretoria',
    population: 4600000,
    bestSeason: 'November–March for warm, dry summer; February for the calmest seas',
    budget: 'Moderate · $60–140 / day',
    timezone: 'SAST (UTC+2)',

    wonders: [
      {
        name: 'Table Mountain',
        description:
          'A flat-topped massif towering over the city, reached by a rotating cable car to a summit often draped in its own "tablecloth" of cloud.',
        imageQuery: 'Table Mountain Cape Town cable car',
      },
      {
        name: 'Cape of Good Hope',
        description:
          'The wild, windswept tip of the peninsula where mountains plunge into two oceans amid fynbos, baboons and crashing surf.',
        imageQuery: 'Cape of Good Hope cliffs ocean South Africa',
      },
      {
        name: 'Boulders Beach penguins',
        description:
          'A sheltered cove where a colony of African penguins waddles among the granite boulders and swims beside visitors.',
        imageQuery: 'Boulders Beach penguins Cape Town',
      },
      {
        name: 'Cape Winelands',
        description:
          'The Cape Dutch estates of Stellenbosch and Franschhoek, vineyards spread beneath jagged blue mountains.',
        imageQuery: 'Cape Winelands Stellenbosch vineyards mountains',
      },
    ],

    hiddenGems: [
      {
        name: 'Bo-Kaap',
        description:
          'A hillside of vividly painted houses and cobbled lanes, heart of the Cape Malay community and its fragrant cuisine.',
        imageQuery: 'Bo-Kaap colorful houses Cape Town',
      },
      {
        name: 'Kirstenbosch Gardens',
        description:
          'A world-class botanical garden on Table Mountain’s eastern slopes, with a treetop canopy walkway and summer sunset concerts.',
        imageQuery: 'Kirstenbosch Gardens Cape Town canopy',
      },
      {
        name: 'Lion’s Head at sunrise',
        description:
          'A spiralling sunrise hike up a peak between mountain and sea, with 360° views and (some say) the city’s best light.',
        imageQuery: 'Lions Head hike Cape Town sunrise',
      },
    ],

    food: [
      {
        name: 'Cape Malay curry',
        description:
          'A fragrant, mildly sweet curry of cardamom, cinnamon and apricot, the soul of Bo-Kaap kitchens.',
        imageQuery: 'Cape Malay curry South Africa',
      },
      {
        name: 'Braai',
        description:
          'The South African barbecue — boerewors, steak and chops over open fire, a national social ritual.',
        imageQuery: 'South African braai barbecue',
      },
      {
        name: 'Bobotie',
        description:
          'Spiced minced meat baked under a golden savoury custard with chutney — comfort food with Cape Malay roots.',
        imageQuery: 'bobotie South African dish',
      },
      {
        name: 'Cape wine & biltong',
        description:
          'World-class Stellenbosch reds and Chenin Blanc paired with biltong, the cured air-dried meat snack.',
        imageQuery: 'South African wine biltong tasting',
      },
    ],

    adventures: [
      {
        name: 'Shark cage diving',
        description:
          'Dropping into the cold water off Gansbaai to come face to face with great whites and copper sharks.',
        imageQuery: 'shark cage diving South Africa',
      },
      {
        name: 'Chapman’s Peak coast drive',
        description:
          'One of the world’s most spectacular roads, carved into cliffs above the Atlantic between Hout Bay and Noordhoek.',
        imageQuery: 'Chapmans Peak Drive Cape Town coast',
      },
      {
        name: 'Paragliding off Lion’s Head',
        description:
          'Launching from the mountain to soar over the city bowl and the sea before landing on the promenade.',
        imageQuery: 'paragliding Cape Town Lions Head sea',
      },
    ],

    seasons: {
      spring:
        'September–November bring wildflowers, whale watching off the coast and mild, breezy days.',
      summer:
        'December–February is warm, dry and lively — beaches, sunset hikes and long evenings (with the gusty "Cape Doctor" wind).',
      autumn:
        'March–May offers the calmest, clearest weather, golden vineyards and the grape harvest.',
      winter:
        'June–August is cool, green and wet, with dramatic stormy seas, cosy wine farms and low-season prices.',
    },

    culture: {
      language: 'English, Afrikaans and isiXhosa among 11 official languages',
      religion: 'Diverse — Christianity, Islam (Cape Malay) and traditional beliefs',
      greeting: 'A warm handshake and "Howzit"; multilingual greetings are common',
      etiquette: [
        'Ask before photographing people, especially in townships and Bo-Kaap.',
        'Stay aware of your surroundings and avoid displaying valuables, as in any big city.',
        'Tipping 10–15% is expected in restaurants and for guides and car guards.',
        'Respect water-saving habits; the Cape is prone to drought.',
      ],
      festivals: [
        {
          name: 'Cape Town Minstrel Carnival',
          when: 'January 2 (Tweede Nuwe Jaar)',
          description:
            'Troupes in bright satin parade through the streets with banjos and song in a century-old tradition.',
        },
        {
          name: 'Kirstenbosch Summer Concerts',
          when: 'November–April (Sundays)',
          description:
            'Sunset picnics and live music on the lawns beneath Table Mountain.',
        },
        {
          name: 'Cape Town International Jazz Festival',
          when: 'March/April',
          description:
            'Africa’s grandest jazz gathering brings global and local artists to the city.',
        },
      ],
    },

    heroQuote: 'Where a flat-topped mountain watches two oceans meet at the edge of a continent.',
    heroMedia: {
      title: 'Table Mountain at Dusk',
      imageQuery: 'Table Mountain Cape Town sunset city sea',
      atmosphere: 'Sea wind and fynbos scent, the city lights waking below a cloud-wrapped summit.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Cape Town Table Mountain city aerial sea',
        description: 'A city cradles between a great mountain and the cold Atlantic.',
      },
      {
        title: 'The Summit',
        imageQuery: 'Table Mountain top view Cape Town',
        description: 'A cable car lifts you to a tabletop above the clouds.',
      },
      {
        title: 'The Cape',
        imageQuery: 'Cape Point peninsula ocean cliffs',
        description: 'The peninsula narrows to wild cliffs where oceans collide.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Camps Bay Cape Town sunset beach',
        description: 'The sun sinks behind the Twelve Apostles over a golden beach.',
      },
      {
        title: 'Night',
        imageQuery: 'Cape Town city lights night Table Mountain',
        description: 'City lights glitter beneath the dark bulk of the mountain.',
      },
    ],

    photoCollections: {
      hero: ['Table Mountain Cape Town', 'Cape Town city bowl sea', 'Cape of Good Hope'],
      nature: ['Cape Point peninsula ocean', 'Boulders Beach penguins', 'Cape fynbos wildflowers'],
      culture: ['Bo-Kaap colorful houses', 'Cape Town township culture', 'Cape Town V&A Waterfront'],
      food: ['Cape Malay curry', 'South African braai', 'Cape Winelands wine tasting'],
      night: ['Cape Town night lights', 'Cape Town waterfront night', 'Table Mountain night stars'],
      hidden: ['Lions Head hike sunrise', 'Kirstenbosch canopy walk', 'Chapmans Peak drive'],
    },

    ambience: {
      soundscape: ['Atlantic surf on the rocks', 'Wind over the mountain', 'Penguins braying at Boulders', 'Live jazz drifting from a bar'],
      musicStyle: 'Cape jazz and Afro-soul rhythms',
      weatherMood: 'Bright, breezy and oceanic beneath a towering mountain',
    },

    story:
      'Cape Town has more beauty than seems fair for one city to hold. It sits in a bowl between a flat-topped mountain and a cold, blazing-blue ocean, and everywhere you look something is showing off — the cloud pouring like a slow waterfall over Table Mountain, the chain of beaches beneath the Twelve Apostles, the painted houses of Bo-Kaap climbing the hill in sherbet colours. You ride the cable car into the clouds and walk a summit that feels like the roof of Africa. You drive the peninsula to the very tip, where mountains drop into surf and the wind nearly takes your breath, and on the way back you stop to watch penguins waddle across a beach as though they own it. Inland, the winelands wait among blue mountains, glass after glass of Stellenbosch red on a sunlit terrace. And through all of it runs a history you can feel — Robben Island low on the horizon, the long road to freedom — giving the beauty weight, and meaning, and soul.',

    experiences: [
      'Cable car or hike up Table Mountain',
      'Drive the Cape Peninsula to the Cape of Good Hope',
      'Visit the penguins at Boulders Beach',
      'Wine tasting in Stellenbosch and Franschhoek',
      'Sunrise hike up Lion’s Head',
      'Robben Island tour with a former political prisoner',
      'Cape Malay cooking class in Bo-Kaap',
      'Sunset picnic concert at Kirstenbosch Gardens',
    ],

    moods: ['Adventure', 'Scenic', 'Nature', 'Foodie', 'Cultural'],
    travelStyle: ['Couples', 'Family', 'Adventure', 'Foodies'],

    aiSummary:
      'Cape Town blends mountain, ocean, wine country and deep history into one of the world’s most beautiful cities. It suits adventurous couples, families and foodies who want hiking, beaches, wildlife and wine alongside meaningful cultural and historical depth. Visit November–March for warm, dry summer days and whale season on the shoulders; pack for the famous wind. Stay street-smart as in any big city. With safaris, the Garden Route and winelands nearby, it’s a superb anchor for a wider South Africa trip. Choose Cape Town for beauty with soul.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 34. ACCRA, GHANA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'accra',
    name: 'Accra',
    country: 'Ghana',
    continent: 'Africa',
    lat: 5.6037,
    lng: -0.187,
    flag: '🇬🇭',
    capital: 'Accra',
    population: 2510000,
    bestSeason: 'November–March (dry season) for warm, sunny days',
    budget: 'Affordable · $40–90 / day',
    timezone: 'GMT (UTC+0)',

    wonders: [
      {
        name: 'Cape Coast Castle',
        description:
          'A whitewashed seaside fort whose dungeons and "Door of No Return" tell the harrowing history of the transatlantic slave trade.',
        imageQuery: 'Cape Coast Castle Ghana door of no return',
      },
      {
        name: 'Kakum canopy walk',
        description:
          'A series of rope bridges strung 40 metres up through the rainforest canopy, swaying among the treetops and birdsong.',
        imageQuery: 'Kakum National Park canopy walk Ghana',
      },
      {
        name: 'Jamestown',
        description:
          'Accra’s historic fishing district of colonial lighthouses, vibrant street murals, boxing gyms and bustling harbour life.',
        imageQuery: 'Jamestown Accra lighthouse fishing harbour',
      },
      {
        name: 'Makola Market',
        description:
          'A sprawling, exuberant market where traders in bright kente and wax prints sell everything under the sun.',
        imageQuery: 'Makola Market Accra kente fabric traders',
      },
    ],

    hiddenGems: [
      {
        name: 'Ada Foah & the Volta estuary',
        description:
          'A tranquil spit of sand where the Volta River meets the Atlantic, with river-island lodges and palm-fringed beaches.',
        imageQuery: 'Ada Foah Volta estuary Ghana beach',
      },
      {
        name: 'Nubuke & the art scene',
        description:
          'Accra’s growing contemporary-art galleries and design studios spotlighting bold new Ghanaian and African voices.',
        imageQuery: 'Accra contemporary art gallery Ghana',
      },
      {
        name: 'Ashanti craft villages (Kumasi)',
        description:
          'Day trips inland to the villages around Kumasi where artisans weave kente, carve adinkra stamps and cast brass.',
        imageQuery: 'Ashanti kente weaving village Ghana',
      },
    ],

    food: [
      {
        name: 'Jollof rice',
        description:
          'Smoky, tomato-rich spiced rice that Ghanaians will proudly tell you is the best in West Africa — the heart of every gathering.',
        imageQuery: 'Ghanaian jollof rice dish',
      },
      {
        name: 'Banku & tilapia',
        description:
          'A tangy fermented corn-and-cassava dough served with grilled tilapia and fiery pepper-and-tomato shito.',
        imageQuery: 'banku grilled tilapia Ghana',
      },
      {
        name: 'Waakye',
        description:
          'Rice and beans cooked with millet leaves, piled with spaghetti, egg, fish and shito — Ghana’s beloved street breakfast.',
        imageQuery: 'waakye Ghanaian rice beans street food',
      },
      {
        name: 'Kelewele',
        description:
          'Spicy fried plantain cubes seasoned with ginger, chili and nutmeg — the perfect smoky-sweet street snack.',
        imageQuery: 'kelewele fried plantain Ghana',
      },
    ],

    adventures: [
      {
        name: 'Cape Coast history journey',
        description:
          'A moving day along the coast through the slave castles of Cape Coast and Elmina — essential, difficult, unforgettable.',
        imageQuery: 'Elmina Castle Ghana coast history',
      },
      {
        name: 'Rainforest canopy & wildlife',
        description:
          'Walking the treetop bridges of Kakum and seeking forest elephants and butterflies in the reserve below.',
        imageQuery: 'Kakum rainforest Ghana wildlife',
      },
      {
        name: 'Volta River & Wli waterfall',
        description:
          'A trip to West Africa’s tallest waterfall and the lush Volta region of hills, lakes and monkey sanctuaries.',
        imageQuery: 'Wli waterfall Volta region Ghana',
      },
    ],

    seasons: {
      spring:
        'March–May grows hot and humid as the major rainy season builds, greening the inland forests.',
      summer:
        'June–August is cooler and overcast on the coast with the heaviest rains easing into a drier spell.',
      autumn:
        'September–October brings a short second rainy season and lush landscapes.',
      winter:
        'November–March is the dry season and best time to visit — warm, sunny, with the dusty harmattan haze by January.',
    },

    culture: {
      language: 'English (official); Twi, Ga, Ewe and many others widely spoken',
      religion: 'Predominantly Christian, with Muslim and traditional beliefs',
      greeting: 'A warm handshake (often with a finger-snap) and "Akwaaba" — welcome',
      etiquette: [
        'Use your right hand for greeting, giving and eating; the left is considered impolite.',
        'Ask permission before photographing people, markets and especially the slave castles.',
        'Treat the castles and their history with quiet respect.',
        'Dress modestly away from the beach; Ghanaians value smart, respectful attire.',
      ],
      festivals: [
        {
          name: 'Homowo',
          when: 'August/September',
          description:
            'The Ga people’s harvest festival of "hooting at hunger", with traditional food, drumming and processions.',
        },
        {
          name: 'Chale Wote Street Art Festival',
          when: 'August',
          description:
            'Jamestown explodes with murals, performance, music and fashion in Accra’s biggest arts celebration.',
        },
        {
          name: 'Akwasidae (Ashanti)',
          when: 'Every six weeks',
          description:
            'A royal Ashanti festival in Kumasi honouring ancestors, with the king in full gold regalia.',
        },
      ],
    },

    heroQuote: 'Where Atlantic surf, kente colour and West African rhythm pour into one warm welcome.',
    heroMedia: {
      title: 'Golden Hour at Jamestown',
      imageQuery: 'Jamestown Accra fishing boats lighthouse sunset',
      atmosphere: 'Warm sea breeze, drumming on the wind and fishing boats coming in at dusk.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Accra city coast aerial Ghana',
        description: 'A lively coastal capital spreads along the Gulf of Guinea.',
      },
      {
        title: 'The Market',
        imageQuery: 'Accra market kente colorful fabric Ghana',
        description: 'You dive into markets ablaze with kente and wax-print cloth.',
      },
      {
        title: 'The History',
        imageQuery: 'Cape Coast Castle Ghana ocean',
        description: 'On the coast, a white castle holds a heavy, vital history.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Ghana beach fishing boats sunset palms',
        description: 'Fishing pirogues return as the Atlantic turns to gold.',
      },
      {
        title: 'Night',
        imageQuery: 'Accra nightlife afrobeats drumming Ghana',
        description: 'Drums and afrobeats carry the warm night into the small hours.',
      },
    ],

    photoCollections: {
      hero: ['Jamestown Accra lighthouse', 'Cape Coast Castle Ghana', 'Accra city Ghana street'],
      nature: ['Kakum canopy walk Ghana', 'Ada Foah Volta beach Ghana', 'Wli waterfall Ghana'],
      culture: ['kente cloth Ghana weaving', 'Accra Chale Wote street art', 'Ashanti gold festival Ghana'],
      food: ['Ghanaian jollof rice', 'banku tilapia Ghana', 'kelewele plantain Ghana'],
      night: ['Accra nightlife Ghana', 'Accra night city lights', 'Ghana drumming night fire'],
      hidden: ['Ada Foah estuary Ghana', 'Accra art gallery Ghana', 'Ashanti craft village Kumasi'],
    },

    ambience: {
      soundscape: ['Talking drums and percussion', 'Afrobeats from a roadside speaker', 'Atlantic surf', 'Market traders calling out'],
      musicStyle: 'Highlife and afrobeats with West African drumming',
      weatherMood: 'Warm, humid and tropical with a steady ocean breeze',
    },

    story:
      'Ghana calls itself the gateway to West Africa, and the first word you’ll learn is "Akwaaba" — welcome — because you’ll hear it constantly, and it’s meant. Accra is hot, loud, generous and gloriously alive: markets ablaze with kente cloth and wax prints, the air thick with grilling plantain and the bassline of highlife and afrobeats, fishing boats hauling in along the surf at Jamestown while children play and elders watch. But Ghana also asks something deeper of you. An hour or two west along the coast stand the slave castles of Cape Coast and Elmina — beautiful, terrible white forts where you walk through the dungeons and out through the "Door of No Return", the same threshold through which millions were forced onto ships. It is one of the most moving experiences travel can offer, and it changes the colour of everything else. You come for the warmth and the rhythm and the food, and you leave carrying both the joy of Ghana and the weight of its history — and somehow the two belong together.',

    experiences: [
      'Visit Cape Coast and Elmina slave castles',
      'Walk the Kakum rainforest canopy bridges',
      'Explore vibrant Jamestown and its fishing harbour',
      'Shop kente and wax prints at Makola Market',
      'Beach and river escape at Ada Foah',
      'Ghanaian cooking experience with jollof and banku',
      'Day trip to Ashanti craft villages near Kumasi',
      'Live highlife and afrobeats night in the city',
    ],

    moods: ['Cultural', 'Vibrant', 'History', 'Authentic', 'Warm'],
    travelStyle: ['Solo', 'Couples', 'Culture Seekers', 'History Buffs'],

    aiSummary:
      'Accra is a warm, vibrant gateway to West Africa — bustling markets, beaches, contemporary art, and the profoundly moving slave-castle history of Cape Coast nearby. It suits culture-seekers, history buffs and open-minded solo or couple travellers who want authenticity, rhythm and meaning over polish or resorts. Visit November–March for dry, sunny days. Ghana is famously friendly, safe and welcoming, with rainforest canopy walks, the Volta region and Ashanti craft villages within reach. Less suited to travellers wanting luxury infrastructure or beach-resort ease. Choose Accra to feel West Africa’s warmth — and confront its history.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 35. ZANZIBAR, TANZANIA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'zanzibar',
    name: 'Zanzibar',
    country: 'Tanzania',
    continent: 'Africa',
    lat: -6.1659,
    lng: 39.2026,
    flag: '🇹🇿',
    capital: 'Dodoma',
    population: 600000,
    bestSeason: 'June–October and December–February for dry, sunny beach days',
    budget: 'Moderate · $60–140 / day',
    timezone: 'EAT (UTC+3)',

    wonders: [
      {
        name: 'Stone Town',
        description:
          'A labyrinth of coral-stone alleys, carved wooden doors, Swahili mansions and bazaars where Africa, Arabia and India fuse.',
        imageQuery: 'Stone Town Zanzibar carved doors alley',
      },
      {
        name: 'Nungwi & Kendwa beaches',
        description:
          'Powder-white sand and turquoise water on the north coast, where dhows sail and the tide barely interrupts the swimming.',
        imageQuery: 'Nungwi beach Zanzibar turquoise dhow',
      },
      {
        name: 'The spice farms',
        description:
          'Plantations of clove, vanilla, nutmeg and cinnamon that gave the "Spice Island" its name and once its fortune.',
        imageQuery: 'Zanzibar spice farm cloves vanilla',
      },
      {
        name: 'The Rock & Mnemba Atoll',
        description:
          'A restaurant perched on an ocean rock and a coral atoll alive with turtles and dolphins for snorkelling and diving.',
        imageQuery: 'The Rock restaurant Zanzibar ocean Mnemba',
      },
    ],

    hiddenGems: [
      {
        name: 'Jozani Forest',
        description:
          'The last refuge of the endemic, russet-faced Zanzibar red colobus monkey, found nowhere else on Earth.',
        imageQuery: 'Jozani Forest Zanzibar red colobus monkey',
      },
      {
        name: 'Paje kitesurf lagoon',
        description:
          'A shallow east-coast lagoon where the wind fills the sky with kites and the seaweed farmers work the tides.',
        imageQuery: 'Paje beach Zanzibar kitesurfing lagoon',
      },
      {
        name: 'Prison Island tortoises',
        description:
          'A short boat hop to giant Aldabra tortoises over a century old, lazing on a former quarantine island.',
        imageQuery: 'Prison Island Zanzibar giant tortoise',
      },
    ],

    food: [
      {
        name: 'Zanzibar pizza',
        description:
          'A street-food invention of thin dough folded around meat, egg and vegetables, griddled crisp at the night market.',
        imageQuery: 'Zanzibar pizza street food Forodhani',
      },
      {
        name: 'Urojo (Zanzibar mix)',
        description:
          'A tangy turmeric-yellow soup loaded with fritters, potato, mango and crunchy bits — the island’s signature bowl.',
        imageQuery: 'urojo Zanzibar mix soup',
      },
      {
        name: 'Pweza wa nazi',
        description:
          'Octopus simmered in spiced coconut curry, the Swahili coast’s most beloved seafood dish.',
        imageQuery: 'octopus coconut curry Zanzibar Swahili',
      },
      {
        name: 'Spiced chai & fresh fruit',
        description:
          'Cardamom-and-ginger tea and just-cut tropical fruit perfumed by the island’s own spices.',
        imageQuery: 'Zanzibar spiced tea tropical fruit',
      },
    ],

    adventures: [
      {
        name: 'Sunset dhow cruise',
        description:
          'Sailing a traditional wooden dhow off Stone Town as the sun sinks and the sails turn gold.',
        imageQuery: 'dhow sunset cruise Zanzibar Stone Town',
      },
      {
        name: 'Snorkel & dive Mnemba',
        description:
          'Drifting over coral gardens with turtles, dolphins and a kaleidoscope of reef fish off the atoll.',
        imageQuery: 'snorkeling Mnemba Atoll Zanzibar turtles',
      },
      {
        name: 'Spice tour & Swahili cooking',
        description:
          'Tasting straight from the spice trees, then cooking a coconut-rich Swahili feast with a local family.',
        imageQuery: 'Zanzibar spice tour cooking Swahili',
      },
    ],

    seasons: {
      spring:
        'March–May is the long rains — humid, lush and quiet, with the lowest prices and frequent downpours.',
      summer:
        'June–August is the prime dry season: sunny, breezy and perfect for the beach and diving.',
      autumn:
        'September–October stays dry and warm, ideal for the coast before the short rains arrive.',
      winter:
        'December–February is hot, sunny and dry between the rains — peak beach and festival season.',
    },

    culture: {
      language: 'Swahili and English; Arabic influence throughout',
      religion: 'Predominantly Muslim',
      greeting: 'A gentle handshake and "Jambo" or the Swahili "Mambo? — Poa!"',
      etiquette: [
        'Dress modestly in Stone Town and villages — cover shoulders and knees (swimwear for the beach only).',
        'Ask before photographing people, especially women.',
        'Respect Ramadan if visiting then; eat discreetly in daylight.',
        'Use your right hand for greetings and eating.',
      ],
      festivals: [
        {
          name: 'Sauti za Busara',
          when: 'February',
          description:
            'A joyous Swahili music festival filling Stone Town’s old fort with African sound and dance.',
        },
        {
          name: 'Zanzibar International Film Festival',
          when: 'July',
          description:
            'East Africa’s biggest cultural event, screening films and staging concerts across the old town.',
        },
        {
          name: 'Eid al-Fitr',
          when: 'Varies',
          description:
            'The festive end of Ramadan, celebrated across the island with feasting, new clothes and family visits.',
        },
      ],
    },

    heroQuote: 'Where Swahili spice, carved doors and turquoise tides meet on the Indian Ocean.',
    heroMedia: {
      title: 'Dhows at Sunset off Stone Town',
      imageQuery: 'Zanzibar dhow sunset Stone Town ocean',
      atmosphere: 'Warm spice-scented air, the call to prayer and lateen sails glowing against the dusk.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Zanzibar Stone Town coast aerial dhows',
        description: 'A spice island of white beaches and an old Swahili port appears.',
      },
      {
        title: 'The Old Town',
        imageQuery: 'Stone Town Zanzibar alley carved door',
        description: 'You lose yourself in alleys of carved doors and bazaars.',
      },
      {
        title: 'The Reef',
        imageQuery: 'Zanzibar snorkeling turquoise reef fish',
        description: 'Off the atoll you drift over coral with turtles and dolphins.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Zanzibar beach sunset dhow palm',
        description: 'A dhow sails a turquoise sea turning rose and gold.',
      },
      {
        title: 'Night',
        imageQuery: 'Forodhani night market Zanzibar food lights',
        description: 'The Forodhani night market glows with grills and lanterns.',
      },
    ],

    photoCollections: {
      hero: ['Stone Town Zanzibar door', 'Nungwi beach Zanzibar dhow', 'Zanzibar turquoise coast aerial'],
      nature: ['Mnemba Atoll Zanzibar reef', 'Jozani forest red colobus', 'Zanzibar palm beach white sand'],
      culture: ['Stone Town Zanzibar bazaar', 'Zanzibar spice farm', 'Zanzibar Swahili carved door'],
      food: ['Zanzibar pizza Forodhani', 'octopus coconut curry Zanzibar', 'Zanzibar spices market'],
      night: ['Forodhani night market Zanzibar', 'Zanzibar Stone Town night', 'Zanzibar beach stars night'],
      hidden: ['Jozani forest monkey Zanzibar', 'Paje kitesurfing Zanzibar', 'Prison Island tortoise Zanzibar'],
    },

    ambience: {
      soundscape: ['The call to prayer over the rooftops', 'Waves and dhow rigging', 'Bazaar bargaining', 'Taarab music drifting from a window'],
      musicStyle: 'Taarab — Swahili coast strings, voice and Arabic melody',
      weatherMood: 'Hot, humid and spice-scented under an ocean breeze',
    },

    story:
      'Zanzibar smells of cloves before you even see it. This spice island off the Tanzanian coast has been a crossroads for a thousand years — African, Arab, Indian and Persian traders all left their mark — and nowhere is that fusion more intoxicating than in Stone Town, a maze of coral-stone alleys where you’ll get happily lost among carved wooden doors, fragrant bazaars, crumbling sultans’ palaces and the drifting strains of taarab music. You tour a spice farm and crush a vanilla pod, a cinnamon leaf, a clove between your fingers, and understand why empires once fought over this soil. Then you head for the coast, and the island delivers its other self: beaches of flour-white sand and water in five shades of turquoise, where wooden dhows lean into the wind and the tide pulls so far out that the seaweed farmers walk to the horizon. You snorkel a coral atoll with turtles, eat octopus curry as the sun drops, and end the day at a night market where the whole town gathers to eat by lantern-light beside the sea.',

    experiences: [
      'Wander the carved-door alleys of Stone Town',
      'Sunset dhow cruise off the old port',
      'Snorkel or dive the coral of Mnemba Atoll',
      'Spice farm tour and Swahili cooking class',
      'Beach days on Nungwi and Kendwa',
      'Forodhani night market food crawl',
      'Meet the red colobus monkeys in Jozani Forest',
      'Kitesurf the Paje lagoon',
    ],

    moods: ['Beach', 'Cultural', 'Romantic', 'Relaxation', 'Exotic'],
    travelStyle: ['Couples', 'Honeymoon', 'Solo', 'Beach Lovers'],

    aiSummary:
      'Zanzibar is the Swahili coast at its most beguiling — historic Stone Town, spice farms, turquoise beaches and coral reefs. It suits couples, honeymooners, beach lovers and culture-curious solo travellers who want sun, sea and exotic atmosphere over wildlife safaris or nightlife. Visit June–October or December–February for dry, sunny days. Affordable to mid-range, with a rich Afro-Arab heritage and easy reef access, it pairs perfectly as a beach finale to a Tanzanian safari. Dress modestly in town out of respect. Choose Zanzibar to unwind where spice meets the Indian Ocean.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 47. CHEFCHAOUEN, MOROCCO
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'chefchaouen',
    name: 'Chefchaouen',
    country: 'Morocco',
    continent: 'Africa',
    lat: 35.1688,
    lng: -5.2636,
    flag: '🇲🇦',
    capital: 'Rabat',
    population: 42000,
    bestSeason: 'April–June and September–October for mild mountain weather',
    budget: 'Affordable · 350–900 MAD / day',
    timezone: 'WEST (UTC+1)',

    wonders: [
      {
        name: 'The Blue Medina',
        description:
          'An entire old town washed in a thousand shades of blue, its lanes, steps and doorways glowing cobalt and powder against the mountains.',
        imageQuery: 'Chefchaouen blue medina street Morocco',
      },
      {
        name: 'Plaza Uta el-Hammam',
        description:
          'The leafy main square at the heart of the medina, framed by a red kasbah and cafés serving mint tea under the trees.',
        imageQuery: 'Plaza Uta el-Hammam Chefchaouen kasbah',
      },
      {
        name: 'The Spanish Mosque',
        description:
          'A short hillside walk to an abandoned mosque with the definitive view over the whole blue city at sunset.',
        imageQuery: 'Spanish Mosque Chefchaouen sunset view blue',
      },
      {
        name: 'Ras El Maa waterfall',
        description:
          'A cool mountain spring at the medina’s edge where local women still wash clothes and cafés cling to the stream.',
        imageQuery: 'Ras El Maa waterfall Chefchaouen stream',
      },
    ],

    hiddenGems: [
      {
        name: 'Akchour waterfalls',
        description:
          'A day-hike into the Rif Mountains to turquoise pools, a natural "God’s Bridge" rock arch and forest trails.',
        imageQuery: 'Akchour waterfalls Rif mountains Morocco',
      },
      {
        name: 'Rooftop tea at dawn',
        description:
          'A medina rooftop café for mint tea as the morning light turns the blue town luminous and the swifts wheel overhead.',
        imageQuery: 'Chefchaouen rooftop morning blue town',
      },
      {
        name: 'Talassemtane forest',
        description:
          'A national park of cedar and fir above the town, home to Barbary macaques and quiet mountain hikes.',
        imageQuery: 'Talassemtane national park Morocco cedar',
      },
    ],

    food: [
      {
        name: 'Goat cheese & honey',
        description:
          'The Rif region’s fresh local goat cheese drizzled with mountain honey, a Chefchaouen specialty.',
        imageQuery: 'Moroccan goat cheese honey Chefchaouen',
      },
      {
        name: 'Tagine in the mountains',
        description:
          'Slow-cooked chicken or lamb tagine with preserved lemon and olives, eaten in a tiled medina courtyard.',
        imageQuery: 'Moroccan tagine Chefchaouen courtyard',
      },
      {
        name: 'Bissara',
        description:
          'A warming split-pea soup with olive oil, cumin and bread — the everyday breakfast of the north.',
        imageQuery: 'bissara Moroccan pea soup',
      },
      {
        name: 'Mint tea',
        description:
          'Sweet green tea poured from on high, the ritual of welcome offered everywhere in the blue lanes.',
        imageQuery: 'Moroccan mint tea Chefchaouen',
      },
    ],

    adventures: [
      {
        name: 'Photograph the blue lanes',
        description:
          'Losing a whole morning to the endless blue alleys, painted doors, potted flowers and cats in the soft light.',
        imageQuery: 'Chefchaouen blue alley flowers door photography',
      },
      {
        name: 'Hike to Akchour & God’s Bridge',
        description:
          'A scenic Rif Mountains trek to turquoise river pools and a dramatic natural rock arch.',
        imageQuery: 'Akchour Gods Bridge hike Morocco',
      },
      {
        name: 'Sunset at the Spanish Mosque',
        description:
          'An easy climb for the panoramic golden-hour view as the blue town glows beneath the mountains.',
        imageQuery: 'Chefchaouen sunset hill view blue city',
      },
    ],

    seasons: {
      spring:
        'April–June is delightful — wildflowers in the Rif, warm days and cool mountain evenings.',
      summer:
        'July–August is hot but cooler than the lowlands, busy in the medina and lively in the cafés.',
      autumn:
        'September–October brings mild, golden days ideal for both the medina and mountain hikes.',
      winter:
        'November–February is cold and can be wet or even snowy, quiet and atmospheric, the blue town often misty.',
    },

    culture: {
      language: 'Arabic and Berber (Tarifit); some Spanish and French',
      religion: 'Islam',
      greeting: 'Hand over heart with "Salaam alaikum"; the mountain pace is relaxed and friendly',
      etiquette: [
        'Dress modestly — cover shoulders and knees, especially women.',
        'Always ask before photographing residents; some prefer not to be photographed.',
        'Bargain gently and good-naturedly in the shops.',
        'This is a conservative region — be discreet and respectful of local customs.',
      ],
      festivals: [
        {
          name: 'Alegria Festival',
          when: 'Summer',
          description:
            'A music and culture festival bringing concerts and celebration to the blue town.',
        },
        {
          name: 'Eid al-Fitr',
          when: 'Varies (end of Ramadan)',
          description:
            'The joyful feast ending Ramadan, with family gatherings, sweets and new clothes.',
        },
        {
          name: 'Moussem of the region',
          when: 'Varies',
          description:
            'Local saint’s-day gatherings in the Rif with markets, music and communal feasting.',
        },
      ],
    },

    heroQuote: 'Where a whole town dreams in a thousand shades of blue beneath the Rif.',
    heroMedia: {
      title: 'Blue Lanes at First Light',
      imageQuery: 'Chefchaouen blue street morning light Morocco',
      atmosphere: 'Cool mountain air, the call to prayer and soft light glowing on cobalt walls.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Chefchaouen blue town Rif mountains aerial',
        description: 'A blue-washed town clings to green mountains in the Rif.',
      },
      {
        title: 'The Lanes',
        imageQuery: 'Chefchaouen blue alley steps flowers',
        description: 'You wander endless lanes of cobalt walls and painted doors.',
      },
      {
        title: 'The Square',
        imageQuery: 'Chefchaouen plaza kasbah cafe mint tea',
        description: 'You pause for mint tea in the leafy medina square.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Chefchaouen Spanish mosque sunset blue city',
        description: 'From the hill, the whole blue town glows in the sunset.',
      },
      {
        title: 'Night',
        imageQuery: 'Chefchaouen blue medina night lanterns',
        description: 'Lanterns warm the quiet blue alleys after dark.',
      },
    ],

    photoCollections: {
      hero: ['Chefchaouen blue medina', 'Chefchaouen blue door steps', 'Chefchaouen Rif mountains town'],
      nature: ['Akchour waterfalls Morocco', 'Rif mountains Chefchaouen', 'Talassemtane forest Morocco'],
      culture: ['Chefchaouen kasbah square', 'Moroccan crafts Chefchaouen blue', 'Chefchaouen medina life'],
      food: ['Moroccan tagine Chefchaouen', 'Moroccan goat cheese honey', 'mint tea Morocco rooftop'],
      night: ['Chefchaouen blue night lanterns', 'Chefchaouen medina evening', 'Chefchaouen rooftop night'],
      hidden: ['Akchour Gods Bridge Morocco', 'Chefchaouen rooftop morning', 'Talassemtane macaque Morocco'],
    },

    ambience: {
      soundscape: ['The call to prayer over the medina', 'A mountain stream', 'Cats and footsteps in quiet lanes', 'Café murmur in the square'],
      musicStyle: 'Andalusian-Moroccan strings and gentle gnawa',
      weatherMood: 'Cool, clear mountain air glowing over blue walls',
    },

    story:
      'High in the Rif Mountains of northern Morocco, tucked where you’d least expect it, there is a town painted almost entirely blue. Nobody fully agrees why — to repel mosquitoes, to evoke the sky and heaven, a legacy of Jewish refugees who settled here centuries ago — but the effect is undeniably, gently magical. In Chefchaouen the walls, the steps, the doorways, the very cobbles run in a thousand shades of blue, from deep cobalt to faded powder, and wandering its lanes feels like moving slowly underwater. After the sensory assault of Fez or Marrakech, the "Blue Pearl" is a balm: cooler, calmer, kinder, the kind of place where you lose a whole morning to photographing a single doorway framed by potted geraniums and a dozing cat. You drink mint tea in the leafy main square beneath an old red kasbah, climb a hill at dusk to watch the entire blue town glow beneath the mountains, and hike out to turquoise river pools in the hills. It asks nothing of you but to slow down and look — and in all that blue, you happily do.',

    experiences: [
      'Lose a morning photographing the blue lanes',
      'Mint tea in the kasbah square',
      'Sunset over the blue city from the Spanish Mosque',
      'Hike to the Akchour waterfalls and God’s Bridge',
      'Shop for local wool, crafts and goat cheese',
      'Rooftop breakfast above the medina',
      'Explore the red kasbah and its gardens',
      'Mountain walk in Talassemtane National Park',
    ],

    moods: ['Peaceful', 'Romantic', 'Photography', 'Relaxation', 'Cultural'],
    travelStyle: ['Couples', 'Solo', 'Photographers', 'Slow Travel'],

    aiSummary:
      'Chefchaouen, Morocco’s "Blue Pearl", is a serene mountain town washed entirely in blue — endlessly photogenic, calm and refreshingly low-key. It suits couples, photographers and slow solo travellers who want atmosphere, gentle hikes and relaxation over big-city bustle or nightlife. Visit April–June or September–October for mild Rif weather. Affordable and walkable, a soothing counterpoint to frenetic Marrakech, it pairs well with Fez and the north. Dress modestly in this conservative region. Less suited to those seeking beaches, luxury or fast-paced sightseeing. Choose Chefchaouen to wander, photograph and slow down in a town of blue.',
  },
]
