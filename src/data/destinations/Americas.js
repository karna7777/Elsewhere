export default [
  // ─────────────────────────────────────────────────────────────────────────
  // 5. CUSCO, PERU
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'cusco',
    name: 'Cusco',
    country: 'Peru',
    continent: 'South America',
    lat: -13.5319,
    lng: -71.9675,
    flag: '🇵🇪',
    capital: 'Lima',
    population: 428450,
    bestSeason: 'May–September (dry season) for clear Andean skies',
    budget: 'Affordable · $40–90 / day, Machu Picchu adds cost',
    timezone: 'PET (UTC-5)',

    wonders: [
      {
        name: 'Machu Picchu',
        description:
          'The lost Inca citadel riding a saddle between green peaks, terraces and temples emerging from morning cloud like a vision held for five centuries.',
        imageQuery: 'Machu Picchu sunrise mist Peru',
      },
      {
        name: 'Sacsayhuamán',
        description:
          'A megalithic fortress above Cusco built from boulders so vast and precisely cut that no mortar — and barely a knife blade — fits between them.',
        imageQuery: 'Sacsayhuaman Inca stone walls Cusco',
      },
      {
        name: 'Qorikancha',
        description:
          'The Inca Temple of the Sun, once sheathed in gold, its flawless stonework now cradling a colonial church built defiantly on top.',
        imageQuery: 'Qorikancha temple of the sun Cusco',
      },
      {
        name: 'Rainbow Mountain (Vinicunca)',
        description:
          'A 5,000-metre ridge striped in mineral bands of rust, gold and turquoise, revealed only recently as its snow cap retreated.',
        imageQuery: 'Rainbow Mountain Vinicunca Peru',
      },
    ],

    hiddenGems: [
      {
        name: 'Maras salt pans',
        description:
          'Thousands of terraced salt ponds glinting down a valley, worked by families since Inca times from a single mineral spring.',
        imageQuery: 'Maras salt pans Sacred Valley Peru',
      },
      {
        name: 'Moray terraces',
        description:
          'Concentric circular Inca terraces forming a stone amphitheatre — thought to be an agricultural laboratory of microclimates.',
        imageQuery: 'Moray Inca terraces Peru',
      },
      {
        name: 'San Blas neighbourhood',
        description:
          'Cusco’s bohemian artisan quarter of steep cobbled lanes, whitewashed walls and tiny galleries above the city.',
        imageQuery: 'San Blas Cusco cobbled street',
      },
    ],

    food: [
      {
        name: 'Lomo saltado',
        description:
          'Stir-fried beef with onions, tomato and chips over rice — Peru’s beloved fusion of Andean and Chinese kitchens.',
        imageQuery: 'lomo saltado Peruvian dish',
      },
      {
        name: 'Cuy',
        description:
          'Roasted guinea pig, an ancient Andean delicacy still served at celebrations and festivals across the highlands.',
        imageQuery: 'cuy roasted guinea pig Peru',
      },
      {
        name: 'Choclo con queso',
        description:
          'Giant-kernelled Andean corn served warm with a slab of fresh cheese — the perfect market snack.',
        imageQuery: 'choclo con queso Peruvian corn',
      },
      {
        name: 'Coca tea',
        description:
          'An earthy infusion of coca leaves sipped throughout the highlands to ease the thin Andean air.',
        imageQuery: 'coca tea Peru cup',
      },
    ],

    adventures: [
      {
        name: 'The Inca Trail',
        description:
          'A four-day trek over cloud-forest passes and Inca ruins, arriving at the Sun Gate above Machu Picchu at dawn.',
        imageQuery: 'Inca Trail trek Machu Picchu',
      },
      {
        name: 'Sacred Valley rafting',
        description:
          'White-water on the Urubamba river beneath terraced hills and snow peaks.',
        imageQuery: 'Urubamba river rafting Sacred Valley',
      },
      {
        name: 'Humantay Lake hike',
        description:
          'A steep climb to a turquoise glacial lake beneath a sacred snow-capped peak.',
        imageQuery: 'Humantay Lake turquoise Peru hike',
      },
    ],

    seasons: {
      spring:
        'September–November is shoulder season: warming days, fewer trekkers and orchids blooming in the cloud forest.',
      summer:
        'December–February is the green wet season — lush valleys, afternoon downpours and the Inca Trail closed each February.',
      autumn:
        'March–May sees the rains ease into clear, vivid landscapes washed bright.',
      winter:
        'June–August is peak dry season: cold nights, brilliant blue skies and the best trekking — and the biggest crowds.',
    },

    culture: {
      language: 'Spanish and Quechua',
      religion: 'Roman Catholicism blended with Andean Pachamama beliefs',
      greeting: 'A handshake, or "Allillanchu" in Quechua',
      etiquette: [
        'Acclimatise for a day or two before strenuous hikes — Cusco sits at 3,400 m.',
        'Ask before photographing people in traditional dress; a small payment is fair.',
        'Honour Pachamama (Mother Earth) — locals offer a few drops of drink to the ground.',
        'Barter politely in markets, but pay artisans fairly for handmade textiles.',
      ],
      festivals: [
        {
          name: 'Inti Raymi',
          when: 'June 24',
          description:
            'The Inca Festival of the Sun, re-enacted with hundreds of costumed performers at Sacsayhuamán.',
        },
        {
          name: 'Corpus Christi',
          when: 'June',
          description:
            'Saints’ statues are paraded into Cusco’s cathedral in a blaze of colour, music and feasting.',
        },
        {
          name: 'Señor de los Temblores',
          when: 'Easter Monday',
          description:
            'The "Lord of the Earthquakes" is carried through the streets, showered in red ñucchu petals.',
        },
      ],
    },

    heroQuote: 'Where the Inca empire still breathes in stone and thin mountain air.',
    heroMedia: {
      title: 'Sunrise over Machu Picchu',
      imageQuery: 'Machu Picchu sunrise clouds Huayna Picchu',
      atmosphere: 'Cold thin air, drifting cloud and the silence of a city the jungle nearly kept.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Cusco city red roofs Andes aerial',
        description: 'Red-tiled Cusco fills a high green bowl ringed by Andean peaks.',
      },
      {
        title: 'The Old City',
        imageQuery: 'Cusco Plaza de Armas cathedral',
        description: 'Inca stonework anchors the colonial arcades of the Plaza de Armas.',
      },
      {
        title: 'The Valley',
        imageQuery: 'Sacred Valley Peru terraces mountains',
        description: 'The Sacred Valley unrolls in terraces, rivers and snow peaks.',
      },
      {
        title: 'The Citadel',
        imageQuery: 'Machu Picchu terraces llama',
        description: 'You crest the ridge and the lost city appears below you.',
      },
      {
        title: 'Night',
        imageQuery: 'Cusco night lights mountains',
        description: 'Lights climb the dark hillsides as the cold mountain night settles.',
      },
    ],

    photoCollections: {
      hero: ['Machu Picchu classic view', 'Cusco Plaza de Armas', 'Sacsayhuaman walls'],
      nature: ['Rainbow Mountain Peru', 'Sacred Valley Andes', 'Humantay Lake Peru'],
      culture: ['Quechua woman traditional dress', 'Cusco textiles market', 'Peruvian festival Cusco'],
      food: ['Peruvian lomo saltado', 'Cusco market food', 'Peruvian ceviche'],
      night: ['Cusco Plaza night', 'Cusco city lights night', 'Andes night sky stars'],
      hidden: ['Maras salt pans', 'Moray Inca terraces', 'San Blas Cusco street'],
    },

    ambience: {
      soundscape: ['Andean pan flutes', 'Church bells over the plaza', 'Llama footfalls on stone', 'Highland wind'],
      musicStyle: 'Andean folk — quena flutes, charango and panpipes',
      weatherMood: 'Crisp thin highland air under a vast blue sky',
    },

    story:
      'Cusco welcomes you slowly, because at 3,400 metres there is no other way. You walk the steep cobbled lanes a little breathless, and that breathlessness becomes part of the spell — the thin gold light, the women in bowler hats leading llamas, the Inca walls so perfectly fitted that the Spanish simply built their churches on top rather than try to move them. You sip coca tea in a courtyard and feel the centuries stacked beneath you. Then, before dawn, you climb. Through cloud forest, past terraces clinging to vertical green, until you reach a ridge and the mist tears open and there it is — Machu Picchu, exactly as in every photograph and nothing like it, because no photograph carries the cold air, the condor turning overhead, the impossible fact of a city the jungle kept secret for four hundred years. You stand very still, and for a moment the empire is not lost at all.',

    experiences: [
      'Sunrise at Machu Picchu from the Sun Gate',
      'Weaving demonstration with a Quechua cooperative',
      'Sacred Valley tour: Pisac, Ollantaytambo and Maras',
      'Andean pachamanca earth-oven feast',
      'San Pedro market tasting walk in Cusco',
      'Day hike to Humantay Lake or Rainbow Mountain',
      'Chocolate-making workshop with Peruvian cacao',
      'Stargazing in the clear Sacred Valley night',
    ],

    moods: ['Adventure', 'Spiritual', 'History', 'Nature', 'Photography'],
    travelStyle: ['Adventure', 'Solo', 'Backpackers', 'Culture Seekers'],

    aiSummary:
      'Cusco is the launchpad for the Andes and Machu Picchu, ideal for adventurous, history-loving and spiritually curious travellers. It rewards trekkers, backpackers and culture-seekers who want Inca ruins, Quechua traditions and dramatic high-altitude landscapes. Plan the dry season (May–September) for clear trekking, but budget acclimatisation days for the altitude. Less suited to travellers seeking beaches, easy lowland comfort or luxury-only itineraries — though high-end lodges exist. Choose Cusco to walk among living history at the roof of the Americas.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 10. RIO DE JANEIRO, BRAZIL
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'rio-de-janeiro',
    name: 'Rio de Janeiro',
    country: 'Brazil',
    continent: 'South America',
    lat: -22.9068,
    lng: -43.1729,
    flag: '🇧🇷',
    capital: 'Brasília',
    population: 6748000,
    bestSeason: 'December–March for beach heat; or May–October for milder, drier days',
    budget: 'Moderate · R$200–500 / day',
    timezone: 'BRT (UTC-3)',

    wonders: [
      {
        name: 'Christ the Redeemer',
        description:
          'The 38-metre Art Deco Christ standing arms wide atop Corcovado, gazing over the city and the sea — one of the modern wonders of the world.',
        imageQuery: 'Christ the Redeemer Corcovado Rio',
      },
      {
        name: 'Sugarloaf Mountain',
        description:
          'A granite monolith rising sheer from the bay, reached by a glass cable car to a 360° panorama that ignites at sunset.',
        imageQuery: 'Sugarloaf Mountain Rio cable car sunset',
      },
      {
        name: 'Copacabana & Ipanema',
        description:
          'Two legendary curves of sand where the whole city comes to swim, play football, flirt and watch the sun go down.',
        imageQuery: 'Copacabana beach Rio de Janeiro aerial',
      },
      {
        name: 'Selarón Steps',
        description:
          'A staircase blanketed in 2,000 hand-laid tiles from across the world, a Chilean artist’s lifelong love letter to Brazil.',
        imageQuery: 'Selaron Steps Lapa Rio tiles',
      },
    ],

    hiddenGems: [
      {
        name: 'Parque Lage',
        description:
          'A dreamy mansion and jungle garden at the foot of Corcovado, with an Italianate courtyard café framing Christ above the palms.',
        imageQuery: 'Parque Lage Rio mansion garden',
      },
      {
        name: 'Pedra do Telégrafo',
        description:
          'A cliff-edge boulder on the wild western coast where a photo trick makes you appear to dangle over a deadly drop — over a safe ledge.',
        imageQuery: 'Pedra do Telegrafo Rio cliff',
      },
      {
        name: 'Santa Teresa',
        description:
          'A bohemian hilltop barrio of cobbled lanes, artists’ studios and an old yellow tram (bonde) rattling past colonial mansions.',
        imageQuery: 'Santa Teresa Rio bonde tram colorful',
      },
    ],

    food: [
      {
        name: 'Feijoada',
        description:
          'A deep, smoky black-bean and pork stew served with rice, orange, greens and farofa — Brazil’s soul-warming Saturday ritual.',
        imageQuery: 'feijoada Brazilian black bean stew',
      },
      {
        name: 'Pão de queijo',
        description:
          'Warm, chewy cheese-bread balls of cassava flour — addictive any time of day with a strong coffee.',
        imageQuery: 'pao de queijo Brazilian cheese bread',
      },
      {
        name: 'Açaí na tigela',
        description:
          'A frozen Amazonian berry bowl topped with granola and banana — the energising beach breakfast of Rio.',
        imageQuery: 'acai bowl Brazil beach',
      },
      {
        name: 'Caipirinha',
        description:
          'Brazil’s national cocktail of cachaça, lime and sugar, pounded over ice and sipped on the sand at sunset.',
        imageQuery: 'caipirinha cocktail Brazil lime',
      },
    ],

    adventures: [
      {
        name: 'Hang-gliding off Pedra Bonita',
        description:
          'Launching from a mountain ramp to soar over the rainforest and land on São Conrado beach below.',
        imageQuery: 'hang gliding Rio de Janeiro beach',
      },
      {
        name: 'Hiking Pedra da Gávea',
        description:
          'A demanding scramble to a giant summit rock with arguably the best — and most vertiginous — view in the city.',
        imageQuery: 'Pedra da Gavea hike Rio summit',
      },
      {
        name: 'Surfing at Prainha',
        description:
          'Catching waves at a protected, jungle-backed beach beloved by Rio’s surfers, away from the city crowds.',
        imageQuery: 'surfing Prainha beach Rio',
      },
    ],

    seasons: {
      spring:
        'September–November warms steadily with fewer crowds and blooming ipê trees across the hills.',
      summer:
        'December–March is hot, humid and electric — peak beach season, New Year on Copacabana and Carnival.',
      autumn:
        'April–June cools pleasantly into clear, comfortable days ideal for hiking and sightseeing.',
      winter:
        'July–August is mild and drier, with sunny 25°C beach days and the lightest crowds of the year.',
    },

    culture: {
      language: 'Portuguese',
      religion: 'Roman Catholic, with strong Afro-Brazilian Umbanda and Candomblé traditions',
      greeting: 'A warm "Olá" or "Tudo bem?", often with a kiss on the cheek',
      etiquette: [
        'Dress light and casual, but cover up away from the beach in the city.',
        'Stay street-smart: leave valuables in the hotel and use registered taxis or apps at night.',
        'Brazilians are warm and tactile — expect hugs, cheek kisses and close conversation.',
        'Learn a little Portuguese; English is limited outside tourist zones.',
      ],
      festivals: [
        {
          name: 'Carnival',
          when: 'February/March',
          description:
            'The greatest party on Earth — samba-school parades in the Sambadrome and millions dancing at street blocos.',
        },
        {
          name: 'Réveillon (New Year’s Eve)',
          when: 'December 31',
          description:
            'Two million people in white pack Copacabana beach for fireworks and offerings to the sea goddess Iemanjá.',
        },
        {
          name: 'Festa de São Sebastião',
          when: 'January 20',
          description:
            'Processions and Masses honouring Rio’s patron saint across the city.',
        },
      ],
    },

    heroQuote: 'Where mountains, rainforest and ocean meet in a city that never stops dancing.',
    heroMedia: {
      title: 'Sunset from Sugarloaf',
      imageQuery: 'Sugarloaf Rio sunset bay city lights',
      atmosphere: 'Warm salt breeze, distant samba and the whole bay glowing as the lights come on.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Rio de Janeiro aerial Sugarloaf bay',
        description: 'Green peaks, blue bays and white beaches tangle together below.',
      },
      {
        title: 'The Beach',
        imageQuery: 'Ipanema beach Rio people football',
        description: 'Copacabana and Ipanema pulse with football, music and sun.',
      },
      {
        title: 'The Summit',
        imageQuery: 'Christ the Redeemer clouds Rio view',
        description: 'You rise to Christ’s feet as the city sprawls to the horizon.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Rio de Janeiro sunset Sugarloaf bay',
        description: 'The bay turns molten and the monolith glows against the dusk.',
      },
      {
        title: 'Night',
        imageQuery: 'Lapa Rio nightlife samba street',
        description: 'In Lapa the arches throb with samba and the night just begins.',
      },
    ],

    photoCollections: {
      hero: ['Christ the Redeemer Rio', 'Sugarloaf Mountain Rio', 'Copacabana beach aerial'],
      nature: ['Tijuca rainforest Rio', 'Rio de Janeiro beaches coast', 'Pedra da Gavea view'],
      culture: ['Rio carnival samba dancers', 'Selaron steps Rio', 'Santa Teresa tram Rio'],
      food: ['feijoada Brazil', 'Brazilian churrasco barbecue', 'caipirinha Brazil beach'],
      night: ['Rio de Janeiro night lights', 'Lapa nightlife Rio', 'Copacabana New Year fireworks'],
      hidden: ['Parque Lage Rio', 'Pedra do Telegrafo Rio', 'Santa Teresa colorful streets'],
    },

    ambience: {
      soundscape: ['Samba drums', 'Waves on Copacabana', 'Football on the sand', 'Bossa nova guitar from a bar'],
      musicStyle: 'Bossa nova by day, samba and funk carioca by night',
      weatherMood: 'Hot, tropical and golden, with an ocean breeze',
    },

    story:
      'Rio doesn’t do moderation. The city throws mountains and rainforest and ocean together as though it couldn’t decide and took all three, then drapes beaches between them and dares you not to fall in love. You ride a cable car up Sugarloaf and watch the whole improbable geography reveal itself — granite peaks, the curving bays, favelas spilling down the hillsides, Christ standing watch through the clouds with his arms thrown open like the city itself. Down on Ipanema the beach is a democracy: bankers and surfers and grandmothers, footballs and frescobol paddles, a vendor singing the names of everything he sells. As the sun drops behind the Two Brothers hills, the sand applauds — a Rio tradition — and then the night exhales into samba. In a Lapa bar the music starts and a stranger pulls you to your feet, and you stop being a tourist and become, for a few hours, gloriously carioca.',

    experiences: [
      'Sunset cable car up Sugarloaf Mountain',
      'Visit Christ the Redeemer above the clouds',
      'Beach day with frescobol and açaí on Ipanema',
      'Live samba night in the arches of Lapa',
      'Hike through Tijuca, the world’s largest urban rainforest',
      'Favela community walking tour with a local guide',
      'Hang-glide from Pedra Bonita onto the beach',
      'Feijoada lunch and a caipirinha by the sea',
    ],

    moods: ['Vibrant', 'Adventure', 'Beach', 'Nightlife', 'Cultural'],
    travelStyle: ['Couples', 'Solo', 'Friends', 'Party'],

    aiSummary:
      'Rio de Janeiro is pure energy — beaches, mountains, rainforest and samba in one electric city. It suits social, adventurous travellers, couples and groups of friends who want sun, nightlife, hiking and culture rolled together. Come December–March for Carnival and peak beach buzz, or May–October for milder, drier sightseeing weather. Stay street-smart with valuables, learn a little Portuguese, and balance the beaches with hikes and viewpoints. Less suited to travellers seeking quiet, polished safety or a slow rural escape. Choose Rio to feel a city dance.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 19. OAXACA, MEXICO
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'oaxaca',
    name: 'Oaxaca',
    country: 'Mexico',
    continent: 'North America',
    lat: 17.0732,
    lng: -96.7266,
    flag: '🇲🇽',
    capital: 'Mexico City',
    population: 270000,
    bestSeason: 'October–November for Día de Muertos; dry season runs to April',
    budget: 'Affordable · $35–80 / day',
    timezone: 'CST (UTC-6)',

    wonders: [
      {
        name: 'Monte Albán',
        description:
          'A vast Zapotec city on a flattened mountaintop, its plazas, pyramids and carved stelae overlooking three valleys.',
        imageQuery: 'Monte Alban Zapotec ruins Oaxaca',
      },
      {
        name: 'Santo Domingo church',
        description:
          'A baroque masterpiece whose interior drips with gilded saints and a golden family-tree ceiling, glowing in candlelight.',
        imageQuery: 'Santo Domingo church Oaxaca gold interior',
      },
      {
        name: 'Hierve el Agua',
        description:
          'Mineral springs spilling over a cliff into petrified "waterfalls" of white stone, with infinity pools above a valley.',
        imageQuery: 'Hierve el Agua petrified waterfall Oaxaca',
      },
      {
        name: 'El Árbol del Tule',
        description:
          'A 2,000-year-old cypress with the stoutest trunk of any tree on Earth, so wide it takes thirty people to encircle it.',
        imageQuery: 'Arbol del Tule giant tree Oaxaca',
      },
    ],

    hiddenGems: [
      {
        name: 'Teotitlán del Valle',
        description:
          'A weaving village where families dye wool with cochineal and indigo and weave rugs on pedal looms as their ancestors did.',
        imageQuery: 'Teotitlan del Valle weaving Oaxaca rugs',
      },
      {
        name: 'Mezcal palenques',
        description:
          'Family distilleries in the agave hills where mezcal is still roasted in earth pits and crushed by a stone wheel.',
        imageQuery: 'mezcal palenque agave Oaxaca',
      },
      {
        name: 'San Agustín Etla',
        description:
          'A former textile mill turned art centre in the green foothills, with workshops and views over the valley.',
        imageQuery: 'San Agustin Etla art center Oaxaca',
      },
    ],

    food: [
      {
        name: 'Mole negro',
        description:
          'Oaxaca’s crown jewel — a near-black sauce of chiles, chocolate and dozens of ingredients, ladled over turkey or chicken.',
        imageQuery: 'mole negro Oaxaca dish',
      },
      {
        name: 'Tlayuda',
        description:
          'A large crisp tortilla spread with beans, cheese and meat — the beloved "Oaxacan pizza" of the night markets.',
        imageQuery: 'tlayuda Oaxaca street food',
      },
      {
        name: 'Chapulines',
        description:
          'Toasted grasshoppers seasoned with chile, lime and salt — a crunchy, ancient and surprisingly addictive snack.',
        imageQuery: 'chapulines grasshoppers Oaxaca market',
      },
      {
        name: 'Mezcal',
        description:
          'Smoky agave spirit sipped slowly with orange and sal de gusano, the soul of Oaxacan celebration.',
        imageQuery: 'mezcal glass orange Oaxaca',
      },
    ],

    adventures: [
      {
        name: 'Mezcal trail tasting',
        description:
          'Touring the agave hills to roast, crush and sip mezcal straight from the still with the maestros who make it.',
        imageQuery: 'mezcal tasting agave fields Oaxaca',
      },
      {
        name: 'Cooking class with a market tour',
        description:
          'Shopping the chaotic markets then grinding chiles and chocolate on a metate to build a real mole.',
        imageQuery: 'Oaxaca cooking class market chiles',
      },
      {
        name: 'Sierra Norte cloud-forest hike',
        description:
          'Trekking or biking the cooperative-run Pueblos Mancomunados trails through misty pine forest and mountain villages.',
        imageQuery: 'Sierra Norte Oaxaca cloud forest hike',
      },
    ],

    seasons: {
      spring:
        'March–May is warm and dry, with jacaranda blossom and the easygoing rhythm before the rains.',
      summer:
        'June–September brings afternoon rains that green the hills, plus the vibrant Guelaguetza dance festival in July.',
      autumn:
        'October–November is the magical season of Día de Muertos, marigolds and cool, clear evenings.',
      winter:
        'December–February is mild, sunny and festive, with Christmas radish-carving and quiet, golden days.',
    },

    culture: {
      language: 'Spanish, plus Zapotec, Mixtec and many Indigenous languages',
      religion: 'Roman Catholic, woven with Indigenous traditions',
      greeting: 'A warm "Buenos días" and a handshake or cheek kiss',
      etiquette: [
        'Ask before photographing people, ceremonies and altars, especially during Día de Muertos.',
        'Respect Day of the Dead as a sacred remembrance, not a costume party.',
        'Buy crafts directly from artisan families for a fair price.',
        'Sip mezcal slowly — "para todo mal, mezcal" — it is to savour, not to shoot.',
      ],
      festivals: [
        {
          name: 'Día de Muertos',
          when: 'October 31–November 2',
          description:
            'Families honour the dead with marigold altars, candlelit graveyard vigils and joyful processions.',
        },
        {
          name: 'Guelaguetza',
          when: 'July',
          description:
            'Indigenous communities gather to share traditional dance, dress and music in a vast hilltop celebration.',
        },
        {
          name: 'Noche de Rábanos',
          when: 'December 23',
          description:
            'The "Night of the Radishes", when artisans carve elaborate scenes from giant radishes in the main square.',
        },
      ],
    },

    heroQuote: 'Where marigolds light the path between the living and the dead.',
    heroMedia: {
      title: 'Día de Muertos Night',
      imageQuery: 'Dia de Muertos Oaxaca marigold candles altar',
      atmosphere: 'Copal incense and marigold scent, candlelight and music drifting from the graveyards.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Oaxaca colorful colonial street city',
        description: 'Streets of jade, ochre and rose stretch beneath dry green mountains.',
      },
      {
        title: 'The Market',
        imageQuery: 'Oaxaca market chiles mole spices',
        description: 'The markets overflow with chiles, chocolate and toasted grasshoppers.',
      },
      {
        title: 'The Ruins',
        imageQuery: 'Monte Alban ruins valley Oaxaca',
        description: 'A Zapotec city crowns a mountain above three vast valleys.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Oaxaca rooftop sunset Santo Domingo',
        description: 'The baroque towers glow gold as mezcal is poured on a rooftop.',
      },
      {
        title: 'Night',
        imageQuery: 'Oaxaca Dia de Muertos procession night',
        description: 'Candlelit processions wind through streets strewn with petals.',
      },
    ],

    photoCollections: {
      hero: ['Oaxaca Santo Domingo church', 'Oaxaca colorful streets', 'Monte Alban ruins'],
      nature: ['Hierve el Agua Oaxaca', 'Arbol del Tule tree', 'Sierra Norte Oaxaca mountains'],
      culture: ['Dia de Muertos Oaxaca altar', 'Oaxaca weaving Teotitlan', 'Oaxaca alebrijes folk art'],
      food: ['mole negro Oaxaca', 'tlayuda Oaxaca', 'mezcal Oaxaca agave'],
      night: ['Oaxaca Dia de Muertos night', 'Oaxaca zocalo night lights', 'Oaxaca candles graveyard'],
      hidden: ['mezcal palenque Oaxaca', 'Teotitlan del Valle Oaxaca', 'Hierve el Agua pools'],
    },

    ambience: {
      soundscape: ['Brass band in the zócalo', 'Copal incense crackling', 'Church bells', 'A stone metate grinding cacao'],
      musicStyle: 'Oaxacan brass bands and son istmeño',
      weatherMood: 'Warm, dry highland days and cool, fragrant evenings',
    },

    story:
      'Oaxaca is Mexico with its heart wide open. The colonial streets are painted the colours of fruit — mango, jade, hibiscus — and the air carries the smell of grilling corn, roasting chiles and the smoke of copal. This is a city that takes its traditions seriously and wears them lightly: a brass band rounds a corner playing for nobody in particular, a wedding spills out of a baroque church gilded floor to ceiling, a market stall presses a sliver of smoky mezcal into your hand before you’ve agreed to buy anything. You eat the most complex food in the country — a mole that took someone’s grandmother all day and thirty ingredients to build. And if you come in early November, you’ll witness something unforgettable: the night the dead return. Marigold petals lead from the doorways to the graves, candles fill the cemeteries, families sit among the tombs eating and laughing and remembering, and grief and joy become, for a few golden nights, the very same thing.',

    experiences: [
      'Experience Día de Muertos in the graveyards and streets',
      'Cooking class to build a real Oaxacan mole',
      'Mezcal palenque tour in the agave hills',
      'Explore the Zapotec ruins of Monte Albán',
      'Weaving visit to Teotitlán del Valle',
      'Swim the cliff-edge pools of Hierve el Agua',
      'Night market tlayudas and street-food crawl',
      'Hike the Sierra Norte cloud-forest villages',
    ],

    moods: ['Cultural', 'Foodie', 'Spiritual', 'Vibrant', 'Photography'],
    travelStyle: ['Solo', 'Couples', 'Foodies', 'Culture Seekers'],

    aiSummary:
      'Oaxaca is Mexico’s cultural and culinary soul — Indigenous traditions, world-class food, mezcal, crafts and the unforgettable Día de Muertos. It suits foodies, culture-seekers and solo or couple travellers who want depth and authenticity over beaches or resorts. Visit late October–November for Day of the Dead, or the dry season for calm exploring; the ruins, weaving villages and mezcal hills surround the city. Affordable, walkable and deeply atmospheric, it rewards the curious and respectful. Pair it with Oaxaca’s Pacific coast for beach time. Choose Oaxaca to taste and feel the real Mexico.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 20. CARTAGENA, COLOMBIA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'cartagena',
    name: 'Cartagena',
    country: 'Colombia',
    continent: 'South America',
    lat: 10.391,
    lng: -75.4794,
    flag: '🇨🇴',
    capital: 'Bogotá',
    population: 1028000,
    bestSeason: 'December–April for dry, sunny Caribbean days',
    budget: 'Affordable · $40–100 / day',
    timezone: 'COT (UTC-5)',

    wonders: [
      {
        name: 'Walled Old City',
        description:
          'A jewel of colonial streets behind four kilometres of golden ramparts — balconies dripping with bougainvillea, plazas, and church bells.',
        imageQuery: 'Cartagena old city walls colonial colorful',
      },
      {
        name: 'Castillo San Felipe',
        description:
          'A vast Spanish fortress of ramps and tunnels built to guard the city’s treasure from pirates and the British navy.',
        imageQuery: 'Castillo San Felipe Cartagena fortress',
      },
      {
        name: 'Getsemaní',
        description:
          'The once-gritty quarter now alive with street art, fairy-lit squares, salsa bars and umbrella-covered lanes.',
        imageQuery: 'Getsemani Cartagena street art umbrellas',
      },
      {
        name: 'Rosario Islands',
        description:
          'A coral archipelago of turquoise water and white sand an hour offshore, perfect for snorkelling and beach days.',
        imageQuery: 'Rosario Islands Cartagena turquoise beach',
      },
    ],

    hiddenGems: [
      {
        name: 'Café del Mar sunset',
        description:
          'A bar built into the old city walls where everyone gathers to watch the Caribbean swallow the sun.',
        imageQuery: 'Cartagena city walls sunset Caribbean',
      },
      {
        name: 'La Boquilla fishing village',
        description:
          'An Afro-Colombian community where you can paddle the mangrove tunnels and learn cumbia drumming.',
        imageQuery: 'La Boquilla mangrove Cartagena fishing',
      },
      {
        name: 'Volcán de Totumo',
        description:
          'A small mud volcano you can climb into and float weightlessly in warm grey mud, then rinse off in the lagoon.',
        imageQuery: 'Totumo mud volcano Cartagena',
      },
    ],

    food: [
      {
        name: 'Ceviche & cazuela de mariscos',
        description:
          'Bright citrus-cured fish and a creamy coconut seafood stew — the Caribbean coast on a spoon.',
        imageQuery: 'Colombian ceviche seafood Cartagena',
      },
      {
        name: 'Arepa de huevo',
        description:
          'A fried cornmeal pocket with a whole egg cooked inside, the morning street snack of the coast.',
        imageQuery: 'arepa de huevo Colombian street food',
      },
      {
        name: 'Posta negra',
        description:
          'Cartagena’s signature sweet-and-savoury braised beef in a dark caramelised sauce, served with coconut rice.',
        imageQuery: 'posta negra Cartagena beef dish',
      },
      {
        name: 'Fruta del carmen',
        description:
          'Exotic tropical fruit sold by palenqueras in bright dresses — mango, guanábana, zapote and more.',
        imageQuery: 'Cartagena fruit vendor palenquera',
      },
    ],

    adventures: [
      {
        name: 'Island-hopping to Barú & Rosario',
        description:
          'A boat day to Playa Blanca and the coral cays for snorkelling, swimming and fresh fish on the sand.',
        imageQuery: 'Playa Blanca Baru Cartagena beach boat',
      },
      {
        name: 'Salsa & cumbia night',
        description:
          'Learning to move in a Getsemaní dance hall before joining the locals on the floor till late.',
        imageQuery: 'salsa dancing Cartagena nightlife Getsemani',
      },
      {
        name: 'Sunset sailing on the bay',
        description:
          'A catamaran out into the Caribbean with rum in hand as the walled city glows behind you.',
        imageQuery: 'Cartagena sunset sailing catamaran bay',
      },
    ],

    seasons: {
      spring:
        'March–April stays dry, hot and bright — peak beach and island weather before the rains.',
      summer:
        'June–August is hot and humid with short tropical showers and lively local energy.',
      autumn:
        'September–November is the wettest stretch, with warm downpours and lush, quiet, cheaper days.',
      winter:
        'December–February is the prime season: dry, breezy and festive, with the city at its liveliest.',
    },

    culture: {
      language: 'Spanish (Caribbean coastal accent)',
      religion: 'Roman Catholic, with Afro-Colombian traditions',
      greeting: 'A warm "Hola, ¿qué más?" and a cheek kiss; the coast is friendly and expressive',
      etiquette: [
        'Bargain gently with street vendors, but pay fairly for crafts and photos.',
        'Ask before photographing the palenqueras (fruit sellers) — they’ll expect a small tip.',
        'Dress light but cover up away from the beach in churches and nicer restaurants.',
        'Stay aware at night and use registered taxis or apps, as in any big city.',
      ],
      festivals: [
        {
          name: 'Independence Festival (Fiestas de Noviembre)',
          when: 'November',
          description:
            'Cartagena’s biggest party — parades, music, beauty pageants and street celebrations of independence.',
        },
        {
          name: 'Cartagena International Music Festival',
          when: 'January',
          description:
            'Classical concerts fill the colonial churches and plazas of the old city.',
        },
        {
          name: 'Hay Festival Cartagena',
          when: 'January/February',
          description:
            'A celebrated gathering of writers and thinkers from across the Spanish-speaking world.',
        },
      ],
    },

    heroQuote: 'Where flowered balconies and salsa spill across a sun-warmed Caribbean fortress.',
    heroMedia: {
      title: 'Sunset on the City Walls',
      imageQuery: 'Cartagena walls sunset Caribbean colonial',
      atmosphere: 'Warm salt breeze, distant salsa and the old stone glowing amber as the sun drops.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Cartagena old city aerial walls sea',
        description: 'A walled colonial jewel sits between the sea and the bay.',
      },
      {
        title: 'The Streets',
        imageQuery: 'Cartagena colorful balconies bougainvillea',
        description: 'You wander lanes of painted balconies and flowering vines.',
      },
      {
        title: 'The Islands',
        imageQuery: 'Rosario Islands turquoise water Colombia',
        description: 'A boat carries you to turquoise water and coral cays.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Cafe del Mar Cartagena wall sunset',
        description: 'On the ramparts the whole city turns gold as the sun sets.',
      },
      {
        title: 'Night',
        imageQuery: 'Getsemani Cartagena night umbrellas salsa',
        description: 'Getsemaní lights up with street art, music and dancing.',
      },
    ],

    photoCollections: {
      hero: ['Cartagena old city walls', 'Cartagena colorful colonial street', 'Castillo San Felipe'],
      nature: ['Rosario Islands Colombia', 'Playa Blanca Baru beach', 'Cartagena mangroves'],
      culture: ['Getsemani street art Cartagena', 'palenquera fruit Cartagena', 'Cartagena plaza colonial'],
      food: ['Colombian ceviche coast', 'arepa de huevo Colombia', 'Cartagena seafood coconut rice'],
      night: ['Getsemani night Cartagena', 'Cartagena old city night lights', 'Cartagena salsa bar night'],
      hidden: ['La Boquilla Cartagena fishing', 'Totumo mud volcano', 'Cartagena rooftop bar sunset'],
    },

    ambience: {
      soundscape: ['Salsa and cumbia from open doors', 'Horse-cart hooves on cobbles', 'Caribbean waves on the walls', 'Vendors calling their wares'],
      musicStyle: 'Salsa, cumbia and champeta',
      weatherMood: 'Hot, humid and golden, cooled by a Caribbean breeze',
    },

    story:
      'Cartagena hits you first as heat and colour, then as music. Inside its great golden walls — built to keep out pirates, now keeping in the magic — the streets are a riot of painted balconies, cascading bougainvillea, and doorways that open onto cool courtyards. A woman in a bright ruffled dress balances a bowl of mango on her head; a horse-drawn cart clops past; somewhere, always, there is salsa. You spend the hot afternoons in shade with a ceviche and a cold beer, then drift out as the day cools to the city walls, where everyone — locals, lovers, travellers — gathers to watch the Caribbean swallow the sun in a blaze of orange. And then the night belongs to Getsemaní: fairy lights strung over the plazas, street art glowing, a dance hall throwing its doors open, and a stranger laughing as they pull you, hopeless and delighted, into the rhythm. By midnight you’ve stopped being a visitor. The city has simply absorbed you, the way the Caribbean absorbs the sun.',

    experiences: [
      'Sunset from the old city walls at Café del Mar',
      'Island day trip to the Rosario cays and Playa Blanca',
      'Salsa and cumbia dancing in Getsemaní',
      'Walking tour of the walled city and Castillo San Felipe',
      'Caribbean cooking class with coastal seafood',
      'Mangrove paddle and drumming at La Boquilla',
      'Float in the Totumo mud volcano',
      'Sunset catamaran sail on the bay',
    ],

    moods: ['Romantic', 'Vibrant', 'Beach', 'Nightlife', 'Cultural'],
    travelStyle: ['Couples', 'Friends', 'Solo', 'Party'],

    aiSummary:
      'Cartagena is the Caribbean at its most romantic and rhythmic — a walled colonial city of flowered balconies, salsa nights, golden-wall sunsets and turquoise islands offshore. It suits couples, groups of friends and solo travellers who want warmth, colour, dancing and beaches over wilderness or cool-climate calm. Visit December–April for dry, sunny days; stay street-smart at night. Affordable and walkable, with island-hopping and beaches a boat ride away, it’s pure tropical joy with colonial charm. Choose Cartagena to dance, dream and watch the Caribbean sun go down.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 31. BUENOS AIRES, ARGENTINA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'buenos-aires',
    name: 'Buenos Aires',
    country: 'Argentina',
    continent: 'South America',
    lat: -34.6037,
    lng: -58.3816,
    flag: '🇦🇷',
    capital: 'Buenos Aires',
    population: 3075000,
    bestSeason: 'September–November and March–May for mild, walkable weather',
    budget: 'Affordable · $40–90 / day',
    timezone: 'ART (UTC-3)',

    wonders: [
      {
        name: 'La Boca & Caminito',
        description:
          'A working-class port barrio where corrugated houses are painted every colour at once and tango dancers spin in the cobbled street.',
        imageQuery: 'La Boca Caminito Buenos Aires colorful',
      },
      {
        name: 'Recoleta Cemetery',
        description:
          'A silent city of marble mausoleums and weeping angels where Argentina’s elite — and Evita — lie in baroque grandeur.',
        imageQuery: 'Recoleta Cemetery Buenos Aires mausoleums',
      },
      {
        name: 'Teatro Colón',
        description:
          'One of the world’s great opera houses, a gilded jewel of red velvet and golden tiers with near-perfect acoustics.',
        imageQuery: 'Teatro Colon Buenos Aires opera interior',
      },
      {
        name: 'Plaza de Mayo & Casa Rosada',
        description:
          'The pink presidential palace and the square where history was made, from Evita’s speeches to the Mothers’ silent marches.',
        imageQuery: 'Casa Rosada Plaza de Mayo Buenos Aires',
      },
    ],

    hiddenGems: [
      {
        name: 'El Ateneo Grand Splendid',
        description:
          'A century-old theatre reborn as a bookshop, its frescoed ceiling and red-curtained stage now a café among the shelves.',
        imageQuery: 'El Ateneo Grand Splendid bookshop Buenos Aires',
      },
      {
        name: 'San Telmo Sunday market',
        description:
          'The antique-strewn cobbles of the old quarter fill each Sunday with stalls, street tango and live milonga bands.',
        imageQuery: 'San Telmo market Buenos Aires antiques tango',
      },
      {
        name: 'A milonga night',
        description:
          'A neighbourhood dance hall where porteños of all ages dance tango until dawn — the real thing, not a show.',
        imageQuery: 'milonga tango Buenos Aires dance hall night',
      },
    ],

    food: [
      {
        name: 'Asado',
        description:
          'The sacred Argentine barbecue — beef ribs, chorizo and sweetbreads grilled slowly over wood coals and shared for hours.',
        imageQuery: 'Argentine asado beef barbecue grill',
      },
      {
        name: 'Empanadas',
        description:
          'Hand-crimped pastries stuffed with spiced beef, ham and cheese or corn, each province with its own signature fold.',
        imageQuery: 'Argentine empanadas baked',
      },
      {
        name: 'Choripán',
        description:
          'A grilled chorizo sausage split into crusty bread with chimichurri — the perfect street-side snack.',
        imageQuery: 'choripan Argentine sausage sandwich',
      },
      {
        name: 'Malbec & dulce de leche',
        description:
          'Velvety Mendoza Malbec to drink and caramelised dulce de leche in every dessert, from alfajores to flan.',
        imageQuery: 'Malbec wine alfajores dulce de leche',
      },
    ],

    adventures: [
      {
        name: 'Tango lesson & show',
        description:
          'Learning the embrace and the walk before watching the masters in a candle-lit tango house.',
        imageQuery: 'tango show Buenos Aires dancers stage',
      },
      {
        name: 'Tigre Delta day trip',
        description:
          'A boat through the leafy river channels of the Paraná Delta, a maze of stilt houses just north of the city.',
        imageQuery: 'Tigre Delta Buenos Aires boats river houses',
      },
      {
        name: 'Bike the parks & palermo',
        description:
          'Cycling the rose gardens, lakes and leafy boulevards of Palermo, the city’s green and stylish heart.',
        imageQuery: 'Palermo Buenos Aires parks bike rose garden',
      },
    ],

    seasons: {
      spring:
        'September–November is glorious — jacarandas bloom purple over the avenues and café terraces fill up.',
      summer:
        'December–February is hot and humid; many porteños flee to the coast and the city slows down.',
      autumn:
        'March–May cools into golden, comfortable days perfect for walking and long dinners.',
      winter:
        'June–August is cool and grey but rarely freezing — cosy steakhouse and tango weather with low prices.',
    },

    culture: {
      language: 'Spanish (Rioplatense, with its distinctive "sh" sound and "vos")',
      religion: 'Roman Catholic, with a strong secular and Jewish presence',
      greeting: 'A single kiss on the right cheek, even between men who are friends',
      etiquette: [
        'Dinner is very late — restaurants barely fill before 9–10pm.',
        'Never rush an asado or a coffee; lingering is a social art here.',
        'Mate (herbal tea) is shared from one gourd and straw — accept it as a gesture of friendship.',
        'Tipping around 10% in cash is customary in restaurants.',
      ],
      festivals: [
        {
          name: 'Tango BA Festival',
          when: 'August',
          description:
            'A two-week celebration of tango with concerts, classes and a world championship of dancers.',
        },
        {
          name: 'Día de la Tradición',
          when: 'November',
          description:
            'Gaucho culture is honoured with folk music, horsemanship and asados, especially in nearby San Antonio de Areco.',
        },
        {
          name: 'Carnaval porteño',
          when: 'February',
          description:
            'Neighbourhood murga troupes drum and dance through the streets in a uniquely local Carnival.',
        },
      ],
    },

    heroQuote: 'Where every street corner aches with tango and the scent of grilling beef.',
    heroMedia: {
      title: 'Tango at Dusk in San Telmo',
      imageQuery: 'San Telmo tango Buenos Aires dusk street',
      atmosphere: 'Warm evening air, a bandoneón’s sigh and the click of heels on old cobblestones.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Buenos Aires Avenida 9 de Julio obelisk aerial',
        description: 'Grand boulevards and the great obelisk sprawl like a European capital.',
      },
      {
        title: 'The Barrio',
        imageQuery: 'La Boca Caminito colorful houses tango',
        description: 'You wander painted lanes where tango spills into the street.',
      },
      {
        title: 'The Table',
        imageQuery: 'Argentine asado parrilla grill meat',
        description: 'A parrilla loads the grill and the long, late dinner begins.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Buenos Aires Palermo jacaranda sunset park',
        description: 'Jacarandas glow purple over the parks as the light softens.',
      },
      {
        title: 'Night',
        imageQuery: 'Buenos Aires milonga tango night couples',
        description: 'In a milonga the dancers move close as the night deepens.',
      },
    ],

    photoCollections: {
      hero: ['La Boca Caminito Buenos Aires', 'Casa Rosada Buenos Aires', 'Buenos Aires obelisk avenue'],
      nature: ['Tigre Delta Buenos Aires', 'Palermo park lake Buenos Aires', 'Buenos Aires jacaranda trees'],
      culture: ['tango dancers Buenos Aires', 'Recoleta cemetery Buenos Aires', 'El Ateneo bookshop Buenos Aires'],
      food: ['Argentine asado grill', 'empanadas Argentina', 'Malbec wine Argentina'],
      night: ['Buenos Aires night street tango', 'Buenos Aires Teatro Colon night', 'Buenos Aires city lights night'],
      hidden: ['San Telmo market Buenos Aires', 'milonga Buenos Aires dance', 'El Ateneo Grand Splendid'],
    },

    ambience: {
      soundscape: ['A bandoneón playing tango', 'Sizzling parrilla coals', 'Café conversation late into the night', 'Footsteps on cobblestones'],
      musicStyle: 'Tango — bandoneón, violin and piano',
      weatherMood: 'Warm, romantic and unhurried under leafy boulevards',
    },

    story:
      'Buenos Aires is a European city that drifted across the Atlantic and grew a passionate Latin soul. The boulevards are wide and grand, the cafés old and panelled, the bookshops housed in former opera halls — and yet nothing here is buttoned-up. This is a city that feels everything intensely and stays up far too late doing it. You eat dinner at eleven, beef grilled slowly over wood until it gives way at the touch of a fork, washed down with Malbec the colour of garnet. You wander San Telmo’s Sunday market through clouds of antique dust and the sudden swell of a tango band, where an elderly couple begins, without ceremony, to dance. Because tango is everywhere here — not the polished show kind, but the real thing, danced cheek to cheek in neighbourhood halls until dawn, full of longing and pride and a little heartbreak. By the time you leave, you understand it’s not a dance the city performs. It’s the way Buenos Aires admits, against its grand and stylish front, exactly how deeply it feels.',

    experiences: [
      'Tango lesson followed by a milonga night',
      'Long Argentine asado at a classic parrilla',
      'Sunday antiques and street tango in San Telmo',
      'Browse books in the El Ateneo Grand Splendid',
      'Pay respects at Evita’s tomb in Recoleta Cemetery',
      'Boat trip through the Tigre Delta',
      'Catch a performance at the Teatro Colón',
      'Café and pastry crawl through Palermo',
    ],

    moods: ['Romantic', 'Vibrant', 'Cultural', 'Foodie', 'Nightlife'],
    travelStyle: ['Couples', 'Solo', 'Foodies', 'Culture Seekers'],

    aiSummary:
      'Buenos Aires is South America’s most stylish, soulful capital — tango, world-class steak, grand boulevards, café culture and late, late nights. It suits couples, foodies, solo travellers and culture-seekers who want atmosphere, music and great value over beaches or wilderness. Visit spring or autumn for mild, walkable weather and blooming jacarandas. Affordable, safe in its central barrios and endlessly walkable, it rewards travellers who embrace late dinners and a slow, passionate pace. A great gateway to Iguazú and Patagonia. Choose Buenos Aires to feel a city dance and dine.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 32. ATACAMA DESERT, CHILE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'atacama-desert',
    name: 'Atacama Desert',
    country: 'Chile',
    continent: 'South America',
    lat: -22.9087,
    lng: -68.1997,
    flag: '🇨🇱',
    capital: 'Santiago',
    population: 10000,
    bestSeason: 'Year-round; April–September for the clearest stargazing skies',
    budget: 'Premium · $90–200 / day',
    timezone: 'CLT (UTC-4)',

    wonders: [
      {
        name: 'Valle de la Luna',
        description:
          'A "Valley of the Moon" of wind-carved dunes, salt ridges and Mars-red rock that glows violet and gold at sunset.',
        imageQuery: 'Valle de la Luna Atacama sunset Chile',
      },
      {
        name: 'El Tatio geysers',
        description:
          'The world’s highest geyser field, where dozens of fumaroles steam and roar against the dawn cold at 4,300 metres.',
        imageQuery: 'El Tatio geysers Atacama dawn steam',
      },
      {
        name: 'Salar de Atacama & flamingos',
        description:
          'A vast crusted salt flat with mirror lagoons where pink flamingos feed beneath snow-capped volcanoes.',
        imageQuery: 'Salar de Atacama flamingos lagoon volcano',
      },
      {
        name: 'The Atacama night sky',
        description:
          'The driest place on Earth and the planet’s premier stargazing site, where the Milky Way blazes from horizon to horizon.',
        imageQuery: 'Atacama Milky Way stars night sky Chile',
      },
    ],

    hiddenGems: [
      {
        name: 'Laguna Cejar',
        description:
          'A hyper-saline lagoon in the salt flat where, like the Dead Sea, you float effortlessly in turquoise water.',
        imageQuery: 'Laguna Cejar Atacama floating turquoise',
      },
      {
        name: 'Piedras Rojas',
        description:
          'Red mineral rocks against a turquoise altiplano lagoon and white salt shore, ringed by distant volcanoes.',
        imageQuery: 'Piedras Rojas Atacama red rocks lagoon',
      },
      {
        name: 'Aldea de Tulor',
        description:
          'The eroded clay ruins of a 2,800-year-old village, the oldest settlement in the region, half-swallowed by sand.',
        imageQuery: 'Aldea de Tulor Atacama ancient ruins',
      },
    ],

    food: [
      {
        name: 'Pastel de choclo',
        description:
          'A baked corn-and-meat pie with a sweet golden crust, Chilean comfort food at altitude.',
        imageQuery: 'pastel de choclo Chilean corn pie',
      },
      {
        name: 'Rica-rica & local herbs',
        description:
          'Dishes scented with native altiplano herbs like rica-rica and chañar, found only in this corner of the Andes.',
        imageQuery: 'Atacama Andean herbs cuisine Chile',
      },
      {
        name: 'Quinoa & llama dishes',
        description:
          'Highland staples — nutty quinoa stews and lean grilled llama, an Andean tradition that long predates Chile.',
        imageQuery: 'quinoa llama Andean dish Chile',
      },
      {
        name: 'Pisco sour',
        description:
          'Chile’s tangy grape-brandy cocktail with lime and egg white, sipped at sunset against the desert.',
        imageQuery: 'pisco sour cocktail Chile',
      },
    ],

    adventures: [
      {
        name: 'Stargazing astronomy tour',
        description:
          'Peering through powerful telescopes under the world’s clearest skies, with astronomers tracing galaxies and nebulae.',
        imageQuery: 'astronomy telescope stargazing Atacama Chile',
      },
      {
        name: 'Sandboarding Valle de la Muerte',
        description:
          'Carving down giant desert dunes on a board in the aptly named Valley of Death.',
        imageQuery: 'sandboarding Atacama desert dunes Chile',
      },
      {
        name: 'High-altitude lagoon circuit',
        description:
          'A 4x4 journey to the altiplano’s mirror lagoons, flamingos and 4,000-metre passes among the volcanoes.',
        imageQuery: 'altiplano lagoons Atacama 4x4 volcano',
      },
    ],

    seasons: {
      spring:
        'September–November brings mild days, clear skies and gentle winds — superb all-round conditions.',
      summer:
        'December–February is warm but brings the brief "Bolivian winter" of occasional afternoon storms on the altiplano.',
      autumn:
        'March–May is calm and crystal-clear, with cool nights ideal for stargazing.',
      winter:
        'June–August has freezing nights but the steadiest, driest skies and dramatic frosted geysers at dawn.',
    },

    culture: {
      language: 'Spanish; Indigenous Kunza heritage among the Atacameño people',
      religion: 'Roman Catholic, blended with Andean Pachamama traditions',
      greeting: 'A friendly "Hola" and handshake; the desert pace is relaxed and unhurried',
      etiquette: [
        'Acclimatise gradually — many sites sit above 4,000 metres.',
        'Carry plenty of water and sun protection; the dry air dehydrates fast.',
        'Respect the fragile desert and Indigenous sites; never remove rocks or disturb ruins.',
        'Honour Pachamama as locals do, with a small offering to the earth.',
      ],
      festivals: [
        {
          name: 'Fiesta de San Pedro',
          when: 'June 29',
          description:
            'San Pedro de Atacama honours its patron saint with processions, dancing and Andean music.',
        },
        {
          name: 'Carnaval Andino',
          when: 'February',
          description:
            'Altiplano communities celebrate with colourful costumes, brass bands and Pachamama rituals.',
        },
        {
          name: 'La Tirana (regional)',
          when: 'July',
          description:
            'A vast northern-Chile religious festival of masked diablada dancers, drawing pilgrims from across the Andes.',
        },
      ],
    },

    heroQuote: 'Where the driest desert on Earth opens onto the clearest sky in the universe.',
    heroMedia: {
      title: 'Milky Way over the Desert',
      imageQuery: 'Atacama desert Milky Way stars night',
      atmosphere: 'Bone-dry cold air, total silence and a sky so thick with stars it casts a shadow.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Atacama desert oasis San Pedro volcano',
        description: 'An adobe oasis town sits beneath a perfect volcanic cone.',
      },
      {
        title: 'The Valley',
        imageQuery: 'Valle de la Luna Atacama rock formations',
        description: 'You walk a lunar valley of salt ridges and carved stone.',
      },
      {
        title: 'The Lagoons',
        imageQuery: 'Atacama altiplano lagoon flamingos volcano',
        description: 'Mirror lagoons reflect volcanoes while flamingos feed.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Atacama desert sunset purple gold dunes',
        description: 'The desert burns violet and gold as the sun drops.',
      },
      {
        title: 'Night',
        imageQuery: 'Atacama stargazing telescope Milky Way',
        description: 'Under the clearest sky on Earth the galaxy blazes overhead.',
      },
    ],

    photoCollections: {
      hero: ['Valle de la Luna Atacama', 'Atacama desert volcano Licancabur', 'Atacama salt flat lagoon'],
      nature: ['El Tatio geysers Atacama', 'Atacama flamingos lagoon', 'Piedras Rojas Atacama'],
      culture: ['San Pedro de Atacama adobe church', 'Atacama Andean village Chile', 'Atacama ancient ruins Tulor'],
      food: ['Chilean pastel de choclo', 'pisco sour Chile', 'Andean quinoa dish'],
      night: ['Atacama Milky Way stars', 'Atacama stargazing night sky', 'Atacama desert moon night'],
      hidden: ['Laguna Cejar Atacama floating', 'Piedras Rojas lagoon Chile', 'Atacama hidden lagoon altiplano'],
    },

    ambience: {
      soundscape: ['Wind hissing over the dunes', 'Geysers roaring at dawn', 'Total desert silence', 'Andean panpipes in the village'],
      musicStyle: 'Andean altiplano flutes and ambient desert tones',
      weatherMood: 'Bone-dry, sun-blasted days and freezing, star-blown nights',
    },

    story:
      'The Atacama is what the Earth looks like when you strip everything away. It is the driest desert on the planet — some weather stations here have never recorded a drop of rain — and that emptiness is precisely the point. By day you cross landscapes that NASA uses to test Mars rovers: valleys of salt and wind-sculpted stone, dunes the colour of rust, lagoons of impossible turquoise where flamingos stalk beneath snow-capped volcanoes, and geysers that roar and steam against the dawn at fourteen thousand feet. But it’s after dark that the desert delivers its masterpiece. With no rain, no humidity, no light for hundreds of miles, the Atacama has the clearest skies on Earth — and when night falls, the sky doesn’t just fill with stars, it overflows. The Milky Way arcs from one horizon to the other, bright enough to throw a faint shadow, and an astronomer hands you a telescope and shows you the rings of Saturn, a dying star, a galaxy two million years away. You stand in the cold and the silence and feel, all at once, very small and strangely at home.',

    experiences: [
      'Stargazing with telescopes under the clearest skies on Earth',
      'Sunset over the lunar Valle de la Luna',
      'Dawn at the steaming El Tatio geysers',
      'Float in the salt lagoon of Laguna Cejar',
      '4x4 circuit of altiplano lagoons and flamingos',
      'Sandboard the dunes of Valle de la Muerte',
      'Visit the ancient ruins of Aldea de Tulor',
      'Pisco sour at sunset over the desert',
    ],

    moods: ['Awe', 'Adventure', 'Nature', 'Solitude', 'Photography'],
    travelStyle: ['Couples', 'Solo', 'Adventure', 'Stargazers'],

    aiSummary:
      'The Atacama Desert is otherworldly — Mars-like valleys, altiplano lagoons, dawn geysers and the clearest stargazing skies on Earth. It suits adventurous couples, solo travellers and astronomy lovers who want raw landscapes and big silence over beaches or nightlife. Visitable year-round; April–September offers the steadiest skies, though nights are freezing and many sites top 4,000 metres, so acclimatise. Remote and not cheap, with San Pedro as a comfortable adobe base, it rewards curious, outdoorsy travellers. Pairs well with Bolivia’s salt flats. Choose the Atacama to feel the scale of the planet and the sky.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 33. HAVANA, CUBA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'havana',
    name: 'Havana',
    country: 'Cuba',
    continent: 'North America',
    lat: 23.1136,
    lng: -82.3666,
    flag: '🇨🇺',
    capital: 'Havana',
    population: 2130000,
    bestSeason: 'November–April for dry, warm, breezy days',
    budget: 'Affordable · $40–90 / day',
    timezone: 'CST (UTC-5)',

    wonders: [
      {
        name: 'Habana Vieja',
        description:
          'A UNESCO old town of crumbling baroque grandeur — colonnaded plazas, peeling pastel facades and centuries of layered history.',
        imageQuery: 'Habana Vieja old Havana colonial plaza',
      },
      {
        name: 'The Malecón',
        description:
          'A five-mile sea wall where all of Havana comes to fish, flirt, play music and watch the waves crash at sunset.',
        imageQuery: 'Malecon Havana sea wall sunset Cuba',
      },
      {
        name: 'Classic American cars',
        description:
          'Candy-coloured 1950s Chevys and Buicks, lovingly kept alive for seventy years, cruising the streets like a living museum.',
        imageQuery: 'classic american cars Havana colorful street',
      },
      {
        name: 'El Capitolio & Paseo del Prado',
        description:
          'A domed capitol echoing Washington presides over a marble-and-laurel promenade alive with artists and children.',
        imageQuery: 'El Capitolio Havana Paseo del Prado',
      },
    ],

    hiddenGems: [
      {
        name: 'Fusterlandia',
        description:
          'A whole neighbourhood transformed into a wild Gaudí-esque mosaic wonderland by the artist José Fuster.',
        imageQuery: 'Fusterlandia Havana mosaic art Cuba',
      },
      {
        name: 'Callejón de Hamel',
        description:
          'A vivid alley of Afro-Cuban murals and sculpture that pulses with live rumba every Sunday afternoon.',
        imageQuery: 'Callejon de Hamel Havana rumba mural',
      },
      {
        name: 'A paladar rooftop',
        description:
          'A privately run rooftop restaurant in a faded mansion, serving creative Cuban food above the rooftops at golden hour.',
        imageQuery: 'Havana rooftop paladar restaurant sunset',
      },
    ],

    food: [
      {
        name: 'Ropa vieja',
        description:
          'Tender shredded beef stewed with peppers, tomato and cumin — Cuba’s national dish, served with rice and plantains.',
        imageQuery: 'ropa vieja Cuban shredded beef dish',
      },
      {
        name: 'Moros y cristianos',
        description:
          'Black beans and rice cooked together, the soulful staple beside almost every Cuban meal.',
        imageQuery: 'moros y cristianos Cuban rice beans',
      },
      {
        name: 'Tostones',
        description:
          'Twice-fried green plantain coins, crisp and salty, scooped with garlic mojo.',
        imageQuery: 'tostones fried plantains Cuba',
      },
      {
        name: 'Mojito & Cuban rum',
        description:
          'The minty rum cocktail born in Havana’s bars, sipped to a soundtrack of son and salsa.',
        imageQuery: 'mojito Cuban rum cocktail Havana',
      },
    ],

    adventures: [
      {
        name: 'Vintage convertible city tour',
        description:
          'Cruising the Malecón and old town in the back of a 1950s convertible with the wind and the sea beside you.',
        imageQuery: 'Havana convertible classic car tour Malecon',
      },
      {
        name: 'Salsa & rumba night',
        description:
          'Learning to move at a casa de la música, then dancing with locals to live Cuban son until late.',
        imageQuery: 'salsa dancing Havana live music Cuba',
      },
      {
        name: 'Viñales valley day trip',
        description:
          'A trip to the lush tobacco valley of limestone mogotes, ox-ploughed fields and hand-rolled cigars.',
        imageQuery: 'Vinales valley Cuba tobacco mogotes',
      },
    ],

    seasons: {
      spring:
        'March–May warms up and stays largely dry, with lively street life before the summer heat.',
      summer:
        'June–August is hot, humid and the start of hurricane season, with bursts of tropical rain.',
      autumn:
        'September–November sees the highest hurricane risk early on, easing into pleasant dry days by late autumn.',
      winter:
        'December–April is the prime season — warm, breezy, dry days and balmy nights, ideal for the city and beaches.',
    },

    culture: {
      language: 'Spanish (Cuban)',
      religion: 'Roman Catholic blended with Afro-Cuban Santería',
      greeting: 'A warm "¿Qué bolá?" and a cheek kiss; Cubans are open, witty and musical',
      etiquette: [
        'Bring cash (and small bills); cards from many countries don’t work, and connectivity is limited.',
        'Tipping in restaurants, for musicians and guides is genuinely appreciated.',
        'Ask before photographing people, especially performers, who may expect a tip.',
        'Be respectful and avoid heated political debate in public.',
      ],
      festivals: [
        {
          name: 'Havana Carnival',
          when: 'July/August',
          description:
            'Floats, conga lines, drums and dancers fill the Malecón in a riot of colour and rhythm.',
        },
        {
          name: 'Havana International Jazz Festival',
          when: 'January',
          description:
            'World-class jazz takes over the city’s theatres and clubs in a celebration of Cuban music.',
        },
        {
          name: 'Havana Biennial',
          when: 'Periodic',
          description:
            'A major contemporary-art festival turning the whole city into a sprawling open-air gallery.',
        },
      ],
    },

    heroQuote: 'Where vintage cars cruise past faded palaces and music spills from every doorway.',
    heroMedia: {
      title: 'Sunset on the Malecón',
      imageQuery: 'Malecon Havana sunset classic car waves',
      atmosphere: 'Warm salt spray off the wall, a trumpet from a doorway and the rumble of old engines.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Havana old city aerial colorful rooftops sea',
        description: 'A faded, beautiful city of pastel facades meets a deep-blue sea.',
      },
      {
        title: 'The Street',
        imageQuery: 'Havana street classic car colonial colorful',
        description: 'You ride a 1950s Chevy past colonnades and peeling grandeur.',
      },
      {
        title: 'The Music',
        imageQuery: 'Havana live son band street musicians Cuba',
        description: 'A son band starts up and the whole bar begins to move.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Malecon Havana sunset people fishing',
        description: 'All of Havana gathers on the sea wall as the sun sinks.',
      },
      {
        title: 'Night',
        imageQuery: 'Havana night salsa club rum lights',
        description: 'The night fills with rum, salsa and the warm city dark.',
      },
    ],

    photoCollections: {
      hero: ['classic cars Havana street', 'Habana Vieja colonial plaza', 'Malecon Havana sea wall'],
      nature: ['Vinales valley Cuba mogotes', 'Cuba tropical coast beach', 'Cuban tobacco fields'],
      culture: ['Havana street musicians Cuba', 'Callejon de Hamel Havana art', 'Havana cigar roller'],
      food: ['Cuban ropa vieja dish', 'mojito Havana cocktail', 'Cuban rice and beans'],
      night: ['Havana night classic car lights', 'Havana salsa club night', 'Havana Malecon night sea'],
      hidden: ['Fusterlandia Havana mosaic', 'Callejon de Hamel rumba', 'Havana rooftop paladar sunset'],
    },

    ambience: {
      soundscape: ['Son and salsa from open windows', 'The rumble of vintage engines', 'Waves crashing on the Malecón', 'A trumpet and bongó on the street'],
      musicStyle: 'Cuban son, salsa and Afro-Cuban rumba',
      weatherMood: 'Hot, breezy and tropical, golden over crumbling stone',
    },

    story:
      'Havana shouldn’t work, and yet it sings. Half the buildings are crumbling, the internet barely functions, the economy is a daily improvisation — and somehow the city is one of the most alive places on the planet. It runs on music and ingenuity and an outrageous, defiant beauty. You ride down the Malecón in the back of a turquoise 1955 convertible kept running for seventy years by sheer will and spare parts, the sea crashing over the wall and spraying the windscreen, a trumpet floating out of a doorway. You wander Habana Vieja, where peeling baroque palaces frame plazas full of children playing baseball with a stick, and an old man rolls a cigar on his thigh. At sunset the whole city pours onto the sea wall to fish and flirt and share a bottle of rum, and somewhere a son band strikes up, and a couple starts to dance, and you realise nobody here is performing — this is just Tuesday. Havana doesn’t ask to be saved or pitied. It asks you to dance, and means it.',

    experiences: [
      'Cruise the Malecón in a vintage convertible',
      'Salsa night with live son at a casa de la música',
      'Wander Habana Vieja’s plazas and backstreets',
      'Sunset and rum on the Malecón sea wall',
      'Day trip to the Viñales tobacco valley',
      'Rooftop dinner at a private paladar',
      'Sunday rumba at Callejón de Hamel',
      'Cigar-rolling demonstration and tasting',
    ],

    moods: ['Vibrant', 'Romantic', 'Nostalgic', 'Cultural', 'Nightlife'],
    travelStyle: ['Couples', 'Solo', 'Friends', 'Culture Seekers'],

    aiSummary:
      'Havana is a one-of-a-kind time capsule — vintage cars, crumbling colonial beauty, rum, cigars and music in every street. It suits couples, friends and culture-seekers who want atmosphere, dancing and authenticity over comfort, luxury or connectivity. Visit November–April for dry, breezy warmth and dodge hurricane season. Bring cash, lower your expectations of wifi and modern convenience, and lean into the city’s improvised energy. Affordable and intensely alive, with Viñales and beaches nearby, it’s unforgettable for open-minded travellers. Choose Havana to step into a living, dancing past.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 50. IGUAZÚ FALLS, BRAZIL
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'iguazu-falls',
    name: 'Iguazú Falls',
    country: 'Brazil',
    continent: 'South America',
    lat: -25.6953,
    lng: -54.4367,
    flag: '🇧🇷',
    capital: 'Brasília',
    population: 258000,
    bestSeason: 'March–May and September–October for full flow and mild, less-crowded days',
    budget: 'Moderate · $60–130 / day',
    timezone: 'BRT (UTC-3)',

    wonders: [
      {
        name: "Devil's Throat (Garganta do Diabo)",
        description:
          'A thundering U-shaped chasm where half the river pours over in a deafening roar of spray and rainbows.',
        imageQuery: 'Devils Throat Iguazu Falls Garganta',
      },
      {
        name: 'The panoramic Brazilian side',
        description:
          'A walkway delivering the grand, sweeping vista of hundreds of cascades stretching across the jungle gorge.',
        imageQuery: 'Iguazu Falls panoramic Brazil walkway',
      },
      {
        name: 'The immersive Argentine side',
        description:
          'A network of catwalks taking you right to the lip and base of the falls, with a train through the jungle.',
        imageQuery: 'Iguazu Falls Argentina catwalk close',
      },
      {
        name: 'The rainforest & wildlife',
        description:
          'The surrounding Atlantic rainforest alive with toucans, coatis, capuchin monkeys and hundreds of butterflies.',
        imageQuery: 'Iguazu rainforest toucan coati wildlife',
      },
    ],

    hiddenGems: [
      {
        name: 'Sunrise at the falls',
        description:
          'Entering with the very first visitors, when mist hangs over the gorge and the wildlife is most active.',
        imageQuery: 'Iguazu Falls sunrise mist empty',
      },
      {
        name: 'Parque das Aves',
        description:
          'A bird sanctuary beside the Brazilian entrance with walk-through aviaries of toucans, macaws and flamingos.',
        imageQuery: 'Parque das Aves Iguazu toucan macaw',
      },
      {
        name: 'Itaipú Dam',
        description:
          'One of the world’s largest hydroelectric dams nearby, a colossal feat of engineering open for tours.',
        imageQuery: 'Itaipu Dam Brazil Paraguay',
      },
    ],

    food: [
      {
        name: 'Churrasco',
        description:
          'A Brazilian rodízio barbecue of endless skewered meats carved at your table, fuelling the day’s walking.',
        imageQuery: 'Brazilian churrasco rodizio meat',
      },
      {
        name: 'Surubí & river fish',
        description:
          'Local Paraná-river catfish and other freshwater fish, grilled or stewed, a regional border-country specialty.',
        imageQuery: 'grilled river fish Brazil Parana',
      },
      {
        name: 'Chipa',
        description:
          'Warm cheese-and-cassava bread rolls from the Guaraní border culture, sold from baskets along the roads.',
        imageQuery: 'chipa cheese bread Paraguay border',
      },
      {
        name: 'Caipirinha & tereré',
        description:
          'Brazil’s lime-and-cachaça cocktail and the ice-cold yerba-mate drink shared in the border-region heat.',
        imageQuery: 'caipirinha terere Iguazu border drink',
      },
    ],

    adventures: [
      {
        name: 'Macuco Safari boat ride',
        description:
          'A high-speed inflatable that powers up the river and straight under the pounding cascades until you’re soaked.',
        imageQuery: 'Iguazu boat ride under falls Macuco',
      },
      {
        name: 'Jungle trails & wildlife walks',
        description:
          'Walking the rainforest paths for coatis, monkeys, toucans and clouds of butterflies between the viewpoints.',
        imageQuery: 'Iguazu jungle trail wildlife walk',
      },
      {
        name: 'Helicopter flight over the falls',
        description:
          'A scenic flight from the Brazilian side for the full, staggering scale of the falls from above.',
        imageQuery: 'helicopter Iguazu Falls aerial view',
      },
    ],

    seasons: {
      spring:
        'September–November is warm and green with strong flow and fewer crowds — an excellent window.',
      summer:
        'December–February is hot, humid and busy, with the highest water flow and lush jungle.',
      autumn:
        'March–May offers pleasant temperatures, powerful falls and thinner crowds — arguably the best time.',
      winter:
        'June–August is mild and drier; flow can be lower but the weather is comfortable for walking.',
    },

    culture: {
      language: 'Portuguese (Brazil); Spanish across the border in Argentina',
      religion: 'Predominantly Roman Catholic, with Guaraní indigenous heritage',
      greeting: 'A warm "Olá" (Portuguese) or "Hola" (Spanish) and a friendly handshake',
      etiquette: [
        'Don’t feed the coatis — they look cute but bite and snatch food.',
        'Wear shoes with grip and expect to get wet near the cascades.',
        'Carry your passport; the falls straddle the Brazil–Argentina border.',
        'Tip guides, boat crews and restaurant staff as is customary.',
      ],
      festivals: [
        {
          name: 'Festival das Cataratas',
          when: 'Varies',
          description:
            'A regional festival of music, food and culture celebrating the falls and the tri-border area.',
        },
        {
          name: 'Carnival',
          when: 'February/March',
          description:
            'Brazil’s great festival is celebrated in the town with music, dancing and street parties.',
        },
        {
          name: 'Festa Nacional do Imigrante',
          when: 'Varies',
          description:
            'Foz do Iguaçu’s diverse immigrant communities celebrate their cultures with food and performance.',
        },
      ],
    },

    heroQuote: 'Where 270 waterfalls thunder through the rainforest in a roar of mist and rainbows.',
    heroMedia: {
      title: "Mist over the Devil's Throat",
      imageQuery: 'Iguazu Falls Devils Throat mist rainbow',
      atmosphere: 'A thunderous roar, drifting spray on your face and rainbows arcing through the gorge.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Iguazu Falls aerial jungle cascades',
        description: 'A vast curtain of falls thunders through endless green jungle.',
      },
      {
        title: 'The Walkway',
        imageQuery: 'Iguazu Falls catwalk people spray',
        description: 'Catwalks carry you out over and beneath the cascades.',
      },
      {
        title: "The Devil's Throat",
        imageQuery: 'Iguazu Garganta do Diabo roaring water',
        description: 'You stand above the roaring chasm where the river falls away.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Iguazu Falls sunset rainbow mist',
        description: 'Rainbows arc through the spray as the light turns gold.',
      },
      {
        title: 'Night',
        imageQuery: 'Iguazu jungle night sounds stars',
        description: 'The jungle comes alive with sound beneath a starry sky.',
      },
    ],

    photoCollections: {
      hero: ['Iguazu Falls Devils Throat', 'Iguazu Falls panoramic Brazil', 'Iguazu Falls rainbow cascades'],
      nature: ['Iguazu rainforest jungle', 'Iguazu toucan wildlife', 'Iguazu coati butterfly'],
      culture: ['Iguazu Falls walkway visitors', 'Foz do Iguacu Brazil', 'Itaipu Dam Brazil'],
      food: ['Brazilian churrasco barbecue', 'grilled river fish Brazil', 'caipirinha Brazil drink'],
      night: ['Iguazu jungle night stars', 'Foz do Iguacu night lights', 'Iguazu Falls full moon'],
      hidden: ['Iguazu Falls sunrise mist', 'Parque das Aves toucan', 'Iguazu boat ride falls'],
    },

    ambience: {
      soundscape: ['The thunder of the falls', 'Jungle birds and cicadas', 'Howler monkeys at dawn', 'Spray hissing in the gorge'],
      musicStyle: 'Brazilian and Guaraní rhythms with forest soundscapes',
      weatherMood: 'Warm, humid and thunderous, rainbows in the rising spray',
    },

    story:
      'You hear Iguazú long before you see it — a low, building roar that resolves, as you round the path, into the most overwhelming waterfall on Earth. Not one fall but 270 of them, spread nearly three kilometres across a horseshoe of jungle gorge, hurling so much water over the edge that a permanent cloud of spray hangs above the river and rainbows form and dissolve in it all day long. Eleanor Roosevelt is said to have taken one look and murmured, "Poor Niagara." You walk catwalks that carry you right out over the cascades and down to their thundering feet; you stand on a platform above the Devil’s Throat, the monstrous central chasm, where half the river simply vanishes into roaring white mist beneath you and the ground trembles. All around, the Atlantic rainforest teems — toucans overhead, coatis begging along the paths, clouds of electric-blue butterflies. And if you’re brave, a boat guns straight up the river and drives you directly under a cascade until you are utterly, joyfully drenched. Some natural wonders impress you. Iguazú simply overpowers you, and you laugh out loud at the sheer scale of it.',

    experiences: [
      "Stand above the roaring Devil's Throat",
      'Walk the panoramic Brazilian-side trail',
      'Get up close on the Argentine-side catwalks',
      'Macuco Safari boat ride beneath the falls',
      'Spot toucans and coatis on the jungle trails',
      'Visit the walk-through aviaries of Parque das Aves',
      'Helicopter flight over the falls',
      'Sunrise at the falls before the crowds',
    ],

    moods: ['Awe', 'Adventure', 'Nature', 'Wildlife', 'Photography'],
    travelStyle: ['Couples', 'Family', 'Adventure', 'Nature Lovers'],

    aiSummary:
      'Iguazú Falls is one of the planet’s greatest natural wonders — 270 waterfalls thundering through Atlantic rainforest on the Brazil–Argentina border. It suits couples, families, nature lovers and adventurers who want jaw-dropping scenery, wildlife and soft adventure over beaches or city life. Visit March–May or September–October for strong flow without peak crowds. See both sides — Brazil for the panorama, Argentina for the immersive catwalks — and add a soaking boat ride. Easily combined with Rio or Buenos Aires, it’s a bucket-list spectacle. A wild, watery contrast to Rio’s beaches. Choose Iguazú to be overwhelmed by the power of the natural world.',
  },
]
