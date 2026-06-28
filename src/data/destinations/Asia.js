export default [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. KYOTO, JAPAN
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    continent: 'Asia',
    lat: 35.0116,
    lng: 135.7681,
    flag: '🇯🇵',
    capital: 'Tokyo',
    population: 1463000,
    bestSeason: 'Spring (late March–April) for cherry blossoms; November for autumn maples',
    budget: 'Mid-range · ¥12,000–22,000 / day',
    timezone: 'JST (UTC+9)',

    wonders: [
      {
        name: 'Fushimi Inari Taisha',
        description:
          'Ten thousand vermilion torii gates climb the wooded slopes of Mount Inari, forming tunnels of light that lead pilgrims up to quiet mountaintop shrines.',
        imageQuery: 'Fushimi Inari torii gates Kyoto',
      },
      {
        name: 'Kinkaku-ji (Golden Pavilion)',
        description:
          'A Zen temple sheathed in gold leaf, mirrored perfectly in a still reflecting pond fringed by pines and moss.',
        imageQuery: 'Kinkaku-ji Golden Pavilion reflection',
      },
      {
        name: 'Arashiyama Bamboo Grove',
        description:
          'A towering green corridor where wind moves through the stalks with a sound Japan officially lists among its hundred soundscapes to preserve.',
        imageQuery: 'Arashiyama bamboo grove path',
      },
      {
        name: 'Kiyomizu-dera',
        description:
          'A wooden temple on stilts cantilevered over a hillside, its vast veranda built without a single nail and floating above a sea of maples.',
        imageQuery: 'Kiyomizu-dera temple autumn',
      },
    ],

    hiddenGems: [
      {
        name: 'Okochi Sanso Villa',
        description:
          'The hillside garden retreat of a silent-film actor, with mossy stone paths, teahouse views over Arashiyama, and a quiet matcha included with entry.',
        imageQuery: 'Okochi Sanso garden Arashiyama',
      },
      {
        name: 'Philosopher’s Path at dawn',
        description:
          'A canal-side walkway named for a professor who meditated here daily — empty and luminous before the crowds, lined with cherry trees.',
        imageQuery: 'Philosophers Path Kyoto canal',
      },
      {
        name: 'Kurama-dera mountain trail',
        description:
          'A forested pilgrim trail over a sacred mountain to the riverside hot-spring village of Kibune, lantern-lit and cool in summer.',
        imageQuery: 'Kurama mountain trail Kyoto',
      },
    ],

    food: [
      {
        name: 'Kaiseki',
        description:
          'A multi-course seasonal banquet treated as edible poetry — each tiny plate keyed to the month and plated like a garden.',
        imageQuery: 'kaiseki ryori Kyoto course meal',
      },
      {
        name: 'Yudofu',
        description:
          'Silken tofu simmered in kombu broth, a temple dish born from Buddhist vegetarian cuisine and best eaten near Nanzen-ji in winter.',
        imageQuery: 'yudofu hot tofu Kyoto',
      },
      {
        name: 'Matcha sweets',
        description:
          'Stone-ground Uji green tea folded into warabi-mochi, parfaits and feather-light castella in the teahouses of Gion.',
        imageQuery: 'matcha dessert parfait Kyoto',
      },
      {
        name: 'Nishiki Market street bites',
        description:
          'A narrow covered arcade called "Kyoto’s Kitchen", stacked with pickles, tako-tamago, soy-milk doughnuts and grilled skewers.',
        imageQuery: 'Nishiki Market Kyoto food stalls',
      },
    ],

    adventures: [
      {
        name: 'Sagano Romantic Train',
        description:
          'An open-sided vintage train rattling along the Hozugawa river gorge through cherry and maple country.',
        imageQuery: 'Sagano scenic railway Kyoto gorge',
      },
      {
        name: 'Hozugawa river boat ride',
        description:
          'A two-hour traditional boat descent through rapids, the boatmen poling and steering by hand between forested cliffs.',
        imageQuery: 'Hozugawa river boat Kyoto',
      },
      {
        name: 'Mount Inari summit hike',
        description:
          'A 2–3 hour climb through unbroken torii gates to a viewpoint over the city, quietest at first light.',
        imageQuery: 'Mount Inari summit hike torii',
      },
    ],

    seasons: {
      spring:
        'Cherry blossoms erupt along the Kamo River and Philosopher’s Path; the city fills with hanami picnics and pink light.',
      summer:
        'Humid and green, with riverside kawadoko dining decks, the month-long Gion Matsuri, and fireflies in the northern hills.',
      autumn:
        'The signature season — maples turn crimson over the temples and gardens are illuminated after dark.',
      winter:
        'Crisp and serene; occasional snow lays a hush over the gold of Kinkaku-ji and the city empties of tour crowds.',
    },

    culture: {
      language: 'Japanese',
      religion: 'Shinto and Buddhism, often practiced together',
      greeting: 'A bow — deeper and longer signals greater respect',
      etiquette: [
        'Remove shoes before entering temples, ryokan and tatami rooms.',
        'Photography of geiko and maiko in Gion is restricted — never block or chase them.',
        'Keep your voice low on buses and trains; eating while walking is frowned upon.',
        'Tipping is not customary and can cause confusion.',
      ],
      festivals: [
        {
          name: 'Gion Matsuri',
          when: 'July',
          description:
            'Kyoto’s grandest festival: towering wooden floats paraded through the streets over a thousand-year tradition.',
        },
        {
          name: 'Hanatouro',
          when: 'March (Higashiyama) & December (Arashiyama)',
          description:
            'Evening lantern walks where thousands of lights line the temple lanes.',
        },
        {
          name: 'Jidai Matsuri',
          when: 'October',
          description:
            'A "festival of the ages" parade costuming over a millennium of Japanese history.',
        },
      ],
    },

    heroQuote: 'Where ancient temples whisper beneath blooming cherry blossoms.',
    heroMedia: {
      title: 'Golden Sunrise at Fushimi Inari',
      imageQuery: 'Fushimi Inari sunrise Kyoto empty',
      atmosphere: 'Soft morning mist, distant temple bells and warm golden light through the gates.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Kyoto aerial view mountains',
        description: 'The ancient capital emerges quietly from its ring of forested mountains.',
      },
      {
        title: 'Morning',
        imageQuery: 'Arashiyama bamboo forest morning light',
        description: 'Towering bamboo sways and clicks gently in the early light.',
      },
      {
        title: 'Afternoon',
        imageQuery: 'Gion district Kyoto traditional street',
        description: 'Wooden machiya townhouses lean over the lantern-lined lanes of Gion.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Kiyomizu-dera sunset Kyoto',
        description: 'The hillside temple glows above a city washed in orange.',
      },
      {
        title: 'Night',
        imageQuery: 'Kyoto Pontocho alley night lanterns',
        description: 'Red lanterns flicker along the riverside alley of Pontocho.',
      },
    ],

    photoCollections: {
      hero: ['Fushimi Inari gates', 'Kinkaku-ji golden pavilion', 'Kyoto skyline pagoda'],
      nature: ['Arashiyama bamboo grove', 'Kyoto cherry blossoms river', 'Kyoto autumn maples temple'],
      culture: ['Gion geisha district', 'Kyoto traditional tea ceremony', 'Kyoto kimono women temple'],
      food: ['kaiseki Kyoto cuisine', 'matcha green tea sweets', 'Nishiki Market Kyoto'],
      night: ['Pontocho alley night', 'Yasaka pagoda night Kyoto', 'Kyoto lanterns evening'],
      hidden: ['Philosophers Path Kyoto', 'Kurama Kibune forest', 'Okochi Sanso villa garden'],
    },

    ambience: {
      soundscape: ['Temple bells', 'Wind through bamboo', 'A flowing river', 'Wooden geta on stone'],
      musicStyle: 'Traditional Japanese instrumental — koto and shakuhachi',
      weatherMood: 'Peaceful morning mist settling over temple roofs',
    },

    story:
      'You step off the train and the noise of modern Japan falls away. In Kyoto, the centuries don’t compete — they layer. A monk sweeps gravel into perfect waves while a schoolgirl in a sailor uniform bows to a shrine fox. You follow a stone lane where the smell of toasted soy and incense drifts from doorways half-hidden by indigo curtains. By afternoon you’re climbing through ten thousand torii gates, the vermilion closing overhead until the forest turns red, and the only sound is your own breath and the distant clack of a wooden ladle at a purification fountain. As dusk gathers, lanterns wake one by one along the Pontocho alley, and across the river a geiko hurries to her evening, soundless on the cobbles. Nothing here shouts for your attention. Kyoto simply waits, certain that beauty, given time, will find you.',

    experiences: [
      'Dawn tea ceremony in a Gion teahouse',
      'Hike the full Fushimi Inari torii loop before sunrise',
      'Zen meditation (zazen) with a monk at a working temple',
      'Private kaiseki dinner keyed to the season',
      'Kimono fitting and a stroll through Higashiyama',
      'Early-morning Nishiki Market tasting walk',
      'Forest soak at a Kurama onsen after the mountain trail',
      'Indigo-dyeing or wagashi sweet-making workshop',
    ],

    moods: ['Peaceful', 'Spiritual', 'Romantic', 'History', 'Photography'],
    travelStyle: ['Solo', 'Couples', 'Culture Seekers', 'Photographers'],

    aiSummary:
      'Kyoto suits travellers drawn to refinement, ritual and quiet beauty rather than nightlife or crowds. Ideal for couples, solo culture-seekers and photographers who want temples, gardens, tea ceremony and centuries-old craft. Come in spring for blossoms or November for blazing maples, move slowly between Higashiyama’s lanes and Arashiyama’s bamboo, and rise early to have the famous sites to yourself. Less ideal for beach or party travellers, or anyone seeking a fast, modern-city trip — that’s Tokyo. Choose Kyoto to feel time soften.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. RAJASTHAN, INDIA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    country: 'India',
    continent: 'Asia',
    lat: 26.9124,
    lng: 75.7873,
    flag: '🇮🇳',
    capital: 'New Delhi',
    population: 68548000,
    bestSeason: 'October–March, when desert days are warm and nights cool',
    budget: 'Flexible · ₹2,500–8,000 / day, palace hotels far higher',
    timezone: 'IST (UTC+5:30)',

    wonders: [
      {
        name: 'Amber Fort, Jaipur',
        description:
          'A honey-coloured fortress rising from a ridge above a mirror lake, its Sheesh Mahal hall set with thousands of tiny mirrors that ignite from a single candle.',
        imageQuery: 'Amber Fort Jaipur sunrise',
      },
      {
        name: 'Mehrangarh Fort, Jodhpur',
        description:
          'A sheer-walled citadel towering 120 metres over the cobalt "Blue City", with cannon-scarred gates and palaces of carved sandstone latticework.',
        imageQuery: 'Mehrangarh Fort Jodhpur blue city',
      },
      {
        name: 'Lake Palace, Udaipur',
        description:
          'A white marble palace that appears to float on Lake Pichola, glowing at sunset like something dreamed rather than built.',
        imageQuery: 'Lake Palace Udaipur Pichola',
      },
      {
        name: 'Jaisalmer Fort',
        description:
          'A living golden-sandstone fort still inhabited by families, its ramparts rising from the Thar Desert like a sandcastle at dusk.',
        imageQuery: 'Jaisalmer golden fort desert',
      },
    ],

    hiddenGems: [
      {
        name: 'Chand Baori stepwell, Abhaneri',
        description:
          'A dizzying 13-storey well of 3,500 symmetrical steps descending into cool darkness — one of the deepest and oldest in India.',
        imageQuery: 'Chand Baori stepwell Abhaneri',
      },
      {
        name: 'Bishnoi villages',
        description:
          'Desert communities who have protected wildlife and trees for five centuries, where black-buck graze unafraid beside mud-walled homes.',
        imageQuery: 'Bishnoi village Rajasthan desert',
      },
      {
        name: 'Kumbhalgarh wall',
        description:
          'A fort encircled by the second-longest continuous wall on earth, snaking 36 km over the Aravalli hills.',
        imageQuery: 'Kumbhalgarh fort great wall Rajasthan',
      },
    ],

    food: [
      {
        name: 'Dal Baati Churma',
        description:
          'Baked wheat balls cracked open and drowned in ghee, served with spiced lentils and a sweet crumble — the soul food of the desert.',
        imageQuery: 'Dal Baati Churma Rajasthani thali',
      },
      {
        name: 'Laal Maas',
        description:
          'A fiery mutton curry stained deep red with Mathania chillies, a royal Rajput dish meant to make you sweat and smile.',
        imageQuery: 'Laal Maas Rajasthani mutton curry',
      },
      {
        name: 'Pyaaz Kachori',
        description:
          'A flaky deep-fried pastry stuffed with spiced onions, a Jodhpur breakfast street icon.',
        imageQuery: 'pyaaz kachori Jodhpur street food',
      },
      {
        name: 'Ghevar',
        description:
          'A honeycomb-textured disc of fried batter soaked in syrup, crowned with cardamom cream during festival season.',
        imageQuery: 'ghevar Rajasthani sweet',
      },
    ],

    adventures: [
      {
        name: 'Camel safari in the Thar',
        description:
          'A camelback trek over rippled dunes to a desert camp, ending with folk music around a fire under blazing stars.',
        imageQuery: 'camel safari Thar desert sunset',
      },
      {
        name: 'Hot-air balloon over Jaipur',
        description:
          'A dawn float above forts, lakes and the patchwork of the Pink City.',
        imageQuery: 'hot air balloon Jaipur sunrise',
      },
      {
        name: 'Ranthambore tiger safari',
        description:
          'A jeep tracking of Bengal tigers through ruined hunting lodges and lake-strewn jungle.',
        imageQuery: 'Ranthambore tiger safari jeep',
      },
    ],

    seasons: {
      spring:
        'February–March bring warm days, blooming gardens and the riot of colour at Holi.',
      summer:
        'April–June are fierce and dry, with desert highs above 45°C — for the heat-tolerant only.',
      autumn:
        'Post-monsoon September–October greens the land briefly and ushers in festival season.',
      winter:
        'The prime window: sunny days, cold desert nights, camel fairs and clear fort views.',
    },

    culture: {
      language: 'Hindi and Rajasthani; Marwari widely spoken',
      religion: 'Predominantly Hindu, with Jain, Muslim and Sikh communities',
      greeting: 'Press palms together and say "Namaste"',
      etiquette: [
        'Dress modestly, covering shoulders and knees at temples and forts.',
        'Remove shoes before entering temples and many homes.',
        'Use your right hand for eating, giving and receiving.',
        'Always ask before photographing people, especially women.',
      ],
      festivals: [
        {
          name: 'Pushkar Camel Fair',
          when: 'November',
          description:
            'A vast livestock fair and pilgrimage where 50,000 camels, traders and pilgrims fill the dunes.',
        },
        {
          name: 'Holi',
          when: 'March',
          description:
            'The festival of colours — streets dissolve into clouds of pigment, music and water.',
        },
        {
          name: 'Teej',
          when: 'August',
          description:
            'A monsoon festival of swings, henna and processions honouring the goddess Parvati.',
        },
      ],
    },

    heroQuote: 'Where every fort hides a fairy tale and the desert burns gold at dusk.',
    heroMedia: {
      title: 'Sunset over the Blue City',
      imageQuery: 'Jodhpur blue city Mehrangarh sunset',
      atmosphere: 'Warm dust in the air, distant temple drums and the call to prayer over indigo rooftops.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Jaipur pink city aerial',
        description: 'The Pink City spreads beneath its hilltop forts in the desert haze.',
      },
      {
        title: 'The Fort',
        imageQuery: 'Amber Fort courtyard Jaipur',
        description: 'You climb cobbled ramps into mirrored halls built for kings.',
      },
      {
        title: 'The Bazaar',
        imageQuery: 'Rajasthan bazaar textiles colour',
        description: 'Markets overflow with block-printed cloth, silver and marigolds.',
      },
      {
        title: 'The Desert',
        imageQuery: 'Thar desert dunes camel sunset',
        description: 'Camels carry you over apricot dunes as the sun melts down.',
      },
      {
        title: 'Night',
        imageQuery: 'Udaipur lake palace night lights',
        description: 'Palaces glitter on the black mirror of Lake Pichola.',
      },
    ],

    photoCollections: {
      hero: ['Mehrangarh Fort Jodhpur', 'Hawa Mahal Jaipur', 'Jaisalmer fort sunset'],
      nature: ['Thar desert dunes', 'Ranthambore tiger', 'Aravalli hills Rajasthan'],
      culture: ['Rajasthani turban man', 'Rajasthan folk dancers', 'Jaipur block printing textiles'],
      food: ['Rajasthani thali', 'Laal Maas curry', 'Indian street sweets'],
      night: ['Udaipur city palace night', 'Jaisalmer fort night', 'Rajasthan desert stars camp'],
      hidden: ['Chand Baori stepwell', 'Kumbhalgarh fort wall', 'Bishnoi village Rajasthan'],
    },

    ambience: {
      soundscape: ['Temple drums', 'Camel bells', 'A folk harmonium', 'Wind over the dunes'],
      musicStyle: 'Rajasthani folk — sarangi, dholak and Manganiar singers',
      weatherMood: 'Dry desert heat softening into a cool, star-blown night',
    },

    story:
      'Rajasthan does not whisper — it blazes. You arrive into a land of impossible colour, where a man’s turban is the orange of a chilli, a city is painted blue against the heat, and a marble palace floats on a lake like a mirage that refused to fade. By day you wander forts that took armies to build, their walls still warm with the memory of war and pageantry, and bazaars where the air is thick with cardamom, marigold and the metallic ring of the silversmith’s hammer. Then the city releases you to the desert. A camel rocks you over dunes the colour of apricots, the sky turns the deep violet only emptiness can make, and somewhere a Manganiar singer bends a note so old it seems to come up out of the sand itself. You eat by firelight, you sleep beneath more stars than you knew existed, and you understand why kings dreamed so extravagantly here.',

    experiences: [
      'Overnight camel safari and desert camp under the stars',
      'Private heritage-haveli dinner with folk musicians',
      'Block-printing workshop with a Bagru artisan family',
      'Dawn jeep safari for Bengal tigers in Ranthambore',
      'Boat ride on Lake Pichola at golden hour',
      'Cooking class for dal baati and laal maas',
      'Bishnoi village cultural homestay',
      'Sunrise climb to Mehrangarh’s ramparts',
    ],

    moods: ['Adventure', 'Romantic', 'History', 'Luxury', 'Photography'],
    travelStyle: ['Couples', 'Luxury', 'Adventure', 'Culture Seekers'],

    aiSummary:
      'Rajasthan is for travellers who crave colour, royal history and desert romance. It rewards couples seeking palace stays, photographers chasing forts and turbans, and adventurers wanting camel safaris and tiger tracking. Plan October–March to dodge brutal heat, and string together Jaipur, Jodhpur, Udaipur and Jaisalmer for the full arc from city to dune. It is intense — crowded, hot, sensory-overloading — so it suits flexible, curious travellers more than those wanting calm or beaches. Choose Rajasthan to live inside a storybook of kings.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. HOI AN, VIETNAM
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'hoi-an',
    name: 'Hoi An',
    country: 'Vietnam',
    continent: 'Asia',
    lat: 15.8801,
    lng: 108.338,
    flag: '🇻🇳',
    capital: 'Hanoi',
    population: 120000,
    bestSeason: 'February–April for dry, mild days before the summer heat',
    budget: 'Affordable · $25–60 / day',
    timezone: 'ICT (UTC+7)',

    wonders: [
      {
        name: 'Ancient Town lantern streets',
        description:
          'A preserved trading port of mustard-yellow shophouses and tiled roofs that glows each night under thousands of silk lanterns.',
        imageQuery: 'Hoi An ancient town lanterns night',
      },
      {
        name: 'Japanese Covered Bridge',
        description:
          'A 400-year-old roofed bridge with a small temple inside, built by the Japanese community and the symbol of the town.',
        imageQuery: 'Japanese Covered Bridge Hoi An',
      },
      {
        name: 'Thu Bon River boats',
        description:
          'Wooden sampans drift the river at dusk while passengers release glowing paper lanterns onto the water.',
        imageQuery: 'Hoi An river lanterns boats night',
      },
      {
        name: 'My Son Sanctuary',
        description:
          'Brick Hindu temple towers of the ancient Champa kingdom, mouldering romantically in a jungle valley an hour away.',
        imageQuery: 'My Son Sanctuary Cham ruins Vietnam',
      },
    ],

    hiddenGems: [
      {
        name: 'Tra Que vegetable village',
        description:
          'A fragrant herb-farming hamlet where you can wear a conical hat, hoe a bed and cook with what you pick.',
        imageQuery: 'Tra Que vegetable village Hoi An',
      },
      {
        name: 'Cam Thanh coconut groves',
        description:
          'A water-coconut palm wetland explored in spinning round basket boats, once a guerrilla hideout, now pure fun.',
        imageQuery: 'Cam Thanh coconut basket boat Hoi An',
      },
      {
        name: 'An Bang Beach at dawn',
        description:
          'A long pale beach where fishermen haul round coracles ashore at sunrise before the deck-chairs appear.',
        imageQuery: 'An Bang beach Hoi An sunrise fishermen',
      },
    ],

    food: [
      {
        name: 'Cao lầu',
        description:
          'Hoi An’s signature noodle bowl — thick chewy noodles, pork, greens and crispy croutons, traditionally made with water from one ancient well.',
        imageQuery: 'cao lau Hoi An noodles',
      },
      {
        name: 'White rose dumplings',
        description:
          'Translucent shrimp dumplings pinched into the shape of roses, a delicate local specialty made by only a few families.',
        imageQuery: 'white rose dumplings Hoi An',
      },
      {
        name: 'Bánh mì',
        description:
          'A crackling baguette stuffed with pâté, herbs, pickles and grilled pork — Vietnam’s perfect French-colonial mash-up.',
        imageQuery: 'banh mi Vietnamese sandwich Hoi An',
      },
      {
        name: 'Cơm gà',
        description:
          'Turmeric-yellow chicken rice topped with shredded chicken, herbs and a tangy salad — a beloved Hoi An lunch.',
        imageQuery: 'com ga Hoi An chicken rice',
      },
    ],

    adventures: [
      {
        name: 'Countryside cycling',
        description:
          'Pedalling flat lanes between emerald rice paddies, water buffalo and riverside villages.',
        imageQuery: 'cycling rice paddies Hoi An Vietnam',
      },
      {
        name: 'Basket-boat river tour',
        description:
          'Whirling through coconut-palm channels in a round bamboo coracle, fishing and crab-catching with locals.',
        imageQuery: 'basket boat coconut Hoi An',
      },
      {
        name: 'Hai Van Pass motorbike ride',
        description:
          'A spectacular coastal mountain pass between Hoi An and Hue, all switchbacks and ocean panoramas.',
        imageQuery: 'Hai Van Pass Vietnam coast road',
      },
    ],

    seasons: {
      spring:
        'February–April is the sweet spot: dry, warm and breezy, ideal for cycling and the beach.',
      summer:
        'May–August is hot and bright, great for the beach but fierce at midday.',
      autumn:
        'September–November brings the rainy season and occasional river flooding into the old town.',
      winter:
        'December–January is cooler and can be grey and damp, but quiet and atmospheric.',
    },

    culture: {
      language: 'Vietnamese; English common in tourist areas',
      religion: 'Mahayana Buddhism, ancestor worship and folk beliefs',
      greeting: 'A slight nod and "Xin chào"; a smile goes a long way',
      etiquette: [
        'Remove shoes before entering temples and most homes.',
        'Dress modestly at pagodas and the My Son ruins.',
        'Bargain gently and good-humouredly in the markets and tailor shops.',
        'Pass items and money with both hands as a sign of respect.',
      ],
      festivals: [
        {
          name: 'Hoi An Lantern Festival',
          when: 'Monthly, full-moon night',
          description:
            'The town switches off electric lights and floats on candle-lit lanterns and river offerings.',
        },
        {
          name: 'Tết (Lunar New Year)',
          when: 'January/February',
          description:
            'Vietnam’s biggest festival — peach blossoms, family feasts, dragon dances and fireworks.',
        },
        {
          name: 'Mid-Autumn Festival',
          when: 'September/October',
          description:
            'Children parade with lanterns, lion dancers fill the streets and mooncakes are shared.',
        },
      ],
    },

    heroQuote: 'Where a thousand silk lanterns float on a river at dusk.',
    heroMedia: {
      title: 'Lanterns on the Thu Bon',
      imageQuery: 'Hoi An lanterns river reflection night',
      atmosphere: 'Warm humid evening, drifting candle-lanterns and the soft splash of sampan oars.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Hoi An ancient town yellow walls',
        description: 'Mustard-walled lanes and tiled roofs hold four centuries of trade.',
      },
      {
        title: 'The Tailor',
        imageQuery: 'Hoi An tailor silk fabric shop',
        description: 'In a town of master tailors, you’re measured for something made overnight.',
      },
      {
        title: 'The Countryside',
        imageQuery: 'Hoi An rice paddy cycling green',
        description: 'A bicycle carries you out among glittering green rice paddies.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'An Bang beach Hoi An sunset',
        description: 'The light goes amber over coracles drawn up on the sand.',
      },
      {
        title: 'Night',
        imageQuery: 'Hoi An lantern street night crowd',
        description: 'After dark the old town becomes a glowing dream of silk and water.',
      },
    ],

    photoCollections: {
      hero: ['Hoi An ancient town lanterns', 'Japanese Covered Bridge Hoi An', 'Hoi An yellow walls'],
      nature: ['Hoi An rice paddies', 'An Bang beach Vietnam', 'Cam Thanh coconut palms'],
      culture: ['Hoi An tailor silk', 'Hoi An lantern making', 'My Son Cham ruins'],
      food: ['Hoi An cao lau', 'Vietnamese banh mi', 'Hoi An street food'],
      night: ['Hoi An river lanterns night', 'Hoi An night market', 'Hoi An lantern reflection'],
      hidden: ['Tra Que vegetable village', 'Hoi An basket boat', 'An Bang beach sunrise'],
    },

    ambience: {
      soundscape: ['Sampan oars on the river', 'Bicycle bells', 'Sizzling street woks', 'Cicadas at dusk'],
      musicStyle: 'Traditional Vietnamese đàn bầu and gentle folk',
      weatherMood: 'Warm, humid and lantern-lit, with a river breeze',
    },

    story:
      'Hoi An doesn’t want you to rush, and the heat makes sure you don’t. This old trading port — once a meeting point for Japanese, Chinese, Dutch and Portuguese merchants — has barely changed its silhouette in four hundred years. You wander mustard-yellow lanes where bougainvillea spills over shutters and a tailor invites you in for tea, measuring you for a jacket that will somehow be ready by morning. You eat a bowl of cao lầu noodles made, they swear, with water from a single secret well. As the day cools you cycle out past rice paddies the colour of new limes, then circle back as the sun drops. And then the lanterns wake. The whole town softens into silk light, red and gold and blue, doubled in the black river where boats glide carrying candle-flames. A child sells you a paper lantern; you set it on the water and watch your small flame join a thousand others, drifting toward the sea.',

    experiences: [
      'Full-moon lantern festival on the river',
      'Have clothes hand-tailored overnight',
      'Vietnamese cooking class after a market tour',
      'Sunset basket-boat ride through the coconut groves',
      'Countryside bicycle tour through the rice paddies',
      'Lantern-making workshop with a local artisan',
      'Dawn at An Bang Beach with the fishermen',
      'Day trip to the My Son Cham ruins',
    ],

    moods: ['Romantic', 'Relaxation', 'Foodie', 'Cultural', 'Photography'],
    travelStyle: ['Couples', 'Solo', 'Foodies', 'Slow Travel'],

    aiSummary:
      'Hoi An is Vietnam’s most charming slow-travel town — lantern-lit, walkable, food-obsessed and gentle. It suits couples, solo travellers and foodies who want culture, cooking, tailoring and countryside cycling over big-city buzz or hard adventure. Come February–April for dry, mild weather and avoid the autumn flood season. Affordable and easygoing, it’s perfect for relaxed itineraries and a beach add-on at An Bang, though thrill-seekers may want to pair it with Vietnam’s wilder north. Choose Hoi An to slow down, eat brilliantly and drift among the lanterns.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 12. CAPPADOCIA, TURKEY
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'cappadocia',
    name: 'Cappadocia',
    country: 'Turkey',
    continent: 'Asia',
    lat: 38.6431,
    lng: 34.8289,
    flag: '🇹🇷',
    capital: 'Ankara',
    population: 2000,
    bestSeason: 'April–June and September–October for clear balloon flights and mild days',
    budget: 'Moderate · $50–120 / day',
    timezone: 'TRT (UTC+3)',

    wonders: [
      {
        name: 'Balloon-filled dawn',
        description:
          'Hundreds of hot-air balloons rising together over the valleys at first light — one of the most surreal sights on Earth.',
        imageQuery: 'Cappadocia hot air balloons sunrise valley',
      },
      {
        name: 'Göreme fairy chimneys',
        description:
          'Cones, spires and mushroom-shaped towers of soft tuff rock, carved by wind and water into an otherworldly landscape.',
        imageQuery: 'Goreme fairy chimneys Cappadocia',
      },
      {
        name: 'Göreme Open-Air Museum',
        description:
          'A cluster of rock-cut Byzantine churches with vivid frescoes, where early Christians worshipped inside the cliffs.',
        imageQuery: 'Goreme open air museum cave church frescoes',
      },
      {
        name: 'Derinkuyu underground city',
        description:
          'An eight-level subterranean city carved deep into the rock, once sheltering thousands with stables, churches and wells.',
        imageQuery: 'Derinkuyu underground city Cappadocia',
      },
    ],

    hiddenGems: [
      {
        name: 'Ihlara Valley',
        description:
          'A green river canyon lined with hidden cave churches, a cool shaded walk far from the balloon crowds.',
        imageQuery: 'Ihlara Valley Cappadocia canyon river',
      },
      {
        name: 'Rose Valley at sunset',
        description:
          'Hiking trails through pink-and-honey rock formations that glow at golden hour, dotted with abandoned cave dwellings.',
        imageQuery: 'Rose Valley Cappadocia sunset pink rocks',
      },
      {
        name: 'Soğanlı carved valleys',
        description:
          'A remote pair of valleys with dozens of frescoed rock churches and a village famed for handmade rag dolls.',
        imageQuery: 'Soganli valley Cappadocia rock churches',
      },
    ],

    food: [
      {
        name: 'Testi kebabı',
        description:
          'A "pottery kebab" of meat and vegetables slow-cooked in a sealed clay jug, cracked open at the table.',
        imageQuery: 'testi kebab pottery Cappadocia',
      },
      {
        name: 'Mantı',
        description:
          'Tiny hand-folded dumplings of spiced meat under garlicky yoghurt and sizzled chilli butter.',
        imageQuery: 'Turkish manti dumplings yoghurt',
      },
      {
        name: 'Gözleme',
        description:
          'A thin hand-rolled flatbread griddled with cheese, spinach or potato — village comfort food.',
        imageQuery: 'gozleme Turkish flatbread griddle',
      },
      {
        name: 'Turkish tea & pottery coffee',
        description:
          'Endless tulip glasses of black çay and coffee brewed in the embers, poured thick and dark.',
        imageQuery: 'Turkish tea glass Cappadocia',
      },
    ],

    adventures: [
      {
        name: 'Sunrise balloon flight',
        description:
          'Drifting silently over the fairy chimneys as the sun gilds the valleys and the balloon armada rises around you.',
        imageQuery: 'Cappadocia balloon flight basket sunrise',
      },
      {
        name: 'Valley hiking & horse riding',
        description:
          'Trekking or riding through Love, Red and Rose valleys — Cappadocia means "land of beautiful horses".',
        imageQuery: 'Cappadocia horse riding valley',
      },
      {
        name: 'ATV through the valleys',
        description:
          'A dusty quad-bike loop chasing the sunset between rock formations and vineyards.',
        imageQuery: 'ATV quad bike Cappadocia valley sunset',
      },
    ],

    seasons: {
      spring:
        'April–June bring blossom, green valleys and the calm, clear mornings balloons love.',
      summer:
        'July–August are hot and busy by day but pleasant at dawn and dusk for ballooning and hiking.',
      autumn:
        'September–October glow with golden light and grape harvest, the photographer’s favourite season.',
      winter:
        'December–February dust the chimneys with snow for a magical, frozen-fairytale landscape.',
    },

    culture: {
      language: 'Turkish; English in tourist areas',
      religion: 'Islam, atop layers of ancient Christian heritage',
      greeting: 'A handshake and "Merhaba"; hospitality (misafirperverlik) is sacred',
      etiquette: [
        'Remove shoes before entering homes and mosques.',
        'Dress modestly and cover your head (women) inside mosques.',
        'Accept the offered tea — refusing hospitality can seem rude.',
        'Bargaining is normal in carpet and souvenir shops, done with good humour.',
      ],
      festivals: [
        {
          name: 'Cappadox',
          when: 'Spring',
          description:
            'A festival of music, art and outdoor experiences set among the valleys and rock churches.',
        },
        {
          name: 'International Balloon Festival',
          when: 'Summer',
          description:
            'Special-shaped balloons and night glows fill the skies over Göreme.',
        },
        {
          name: 'Ramazan (Ramadan)',
          when: 'Varies',
          description:
            'The holy month, when communal iftar dinners break the fast at sunset across the villages.',
        },
      ],
    },

    heroQuote: 'Where a hundred balloons rise over a landscape carved by time itself.',
    heroMedia: {
      title: 'Balloons over Göreme',
      imageQuery: 'Cappadocia balloons dawn fairy chimneys',
      atmosphere: 'Cold pre-dawn air, the roar of burners and a silent sky slowly filling with colour.',
    },

    visualJourney: [
      {
        title: 'Before Dawn',
        imageQuery: 'Cappadocia dark valley balloons inflating',
        description: 'In the cold dark, burners flare and balloons swell to life.',
      },
      {
        title: 'The Rise',
        imageQuery: 'Cappadocia balloons sunrise sky many',
        description: 'You lift off and the sky around you fills with drifting colour.',
      },
      {
        title: 'The Valleys',
        imageQuery: 'Cappadocia fairy chimneys hike rocks',
        description: 'On foot you wander an alien world of cones and cave doors.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Rose Valley Cappadocia sunset glow',
        description: 'The tuff rock blushes pink and gold as the sun lowers.',
      },
      {
        title: 'Night',
        imageQuery: 'Cappadocia cave hotel night lights',
        description: 'You return to a cave hotel carved warm into the rock.',
      },
    ],

    photoCollections: {
      hero: ['Cappadocia balloons sunrise', 'Goreme fairy chimneys', 'Cappadocia cave hotel terrace'],
      nature: ['Cappadocia rock valley', 'Rose Valley Cappadocia', 'Cappadocia snow landscape'],
      culture: ['Cappadocia cave church frescoes', 'Turkish carpet shop', 'Cappadocia pottery Avanos'],
      food: ['testi kebab Cappadocia', 'Turkish breakfast spread', 'Turkish tea Cappadocia'],
      night: ['Cappadocia cave hotel night', 'Cappadocia stars valley', 'Goreme village lights night'],
      hidden: ['Ihlara Valley Cappadocia', 'Derinkuyu underground city', 'Soganli rock churches'],
    },

    ambience: {
      soundscape: ['The roar of balloon burners', 'Wind across the valleys', 'Distant call to prayer', 'Tea glasses on a terrace'],
      musicStyle: 'Anatolian folk with saz and ney flute',
      weatherMood: 'Crisp clear dawns over a still, dreamlike landscape',
    },

    story:
      'You wake in the dark, in a room carved from rock, and stumble out into a cold that smells of dust and dawn. In a field below, dragons of flame breathe into swelling envelopes of nylon, and then — gently, impossibly — the ground lets go. You rise, and as you rise the sky around you fills: ten, fifty, a hundred balloons lifting together over a landscape that looks dreamed rather than made. Below you, Cappadocia unfolds its strangeness — valleys of stone cones and chimneys, cliffs honeycombed with the doors of cave churches and whole cities dug downward into the earth. The sun crests the ridge and the rock turns honey, then rose. Later, back on the ground, you hike those valleys, run your hand over a Byzantine fresco hidden in a cave, and drink tea on a terrace as the chimneys throw long shadows. Nowhere else feels quite so much like another planet you’re allowed to touch.',

    experiences: [
      'Sunrise hot-air balloon over the valleys',
      'Stay in a carved cave hotel',
      'Hike Rose and Red valleys at golden hour',
      'Explore the Derinkuyu underground city',
      'Pottery workshop in Avanos by the river',
      'Wander the cave churches of Göreme Open-Air Museum',
      'Sunset ATV or horse ride through the rock formations',
      'Traditional testi kebab dinner cracked at the table',
    ],

    moods: ['Awe', 'Adventure', 'Romantic', 'Photography', 'Surreal'],
    travelStyle: ['Couples', 'Solo', 'Adventure', 'Photographers'],

    aiSummary:
      'Cappadocia is one of Earth’s most surreal landscapes — fairy-chimney valleys, cave churches, underground cities and a dawn sky filled with balloons. It suits couples, photographers and adventurous solo travellers who want wonder and gentle activity over beaches or nightlife. Visit in spring or autumn for the clearest balloon flights and mildest hiking; winter adds a snowy fairytale layer. Affordable and atmospheric, with iconic cave hotels, it’s less about luxury polish than about awe. Choose Cappadocia to float over a landscape that looks like another world.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 13. CHIANG MAI, THAILAND
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'chiang-mai',
    name: 'Chiang Mai',
    country: 'Thailand',
    continent: 'Asia',
    lat: 18.7883,
    lng: 98.9853,
    flag: '🇹🇭',
    capital: 'Bangkok',
    population: 127000,
    bestSeason: 'November–February for cool, dry days; November for the lantern festival',
    budget: 'Affordable · $25–60 / day',
    timezone: 'ICT (UTC+7)',

    wonders: [
      {
        name: 'Doi Suthep temple',
        description:
          'A glittering gold-spired temple on a forested mountain above the city, reached by a 300-step naga staircase and rewarded with valley views.',
        imageQuery: 'Doi Suthep temple Chiang Mai gold',
      },
      {
        name: 'Old City temples',
        description:
          'Hundreds of teak and gilded wats inside the ancient moated square, including the crumbling brick chedi of Wat Chedi Luang.',
        imageQuery: 'Wat Chedi Luang Chiang Mai old city',
      },
      {
        name: 'Yi Peng lantern festival',
        description:
          'Thousands of paper lanterns released into the night sky each November, drifting upward like a slow river of light.',
        imageQuery: 'Yi Peng lantern festival Chiang Mai sky',
      },
      {
        name: 'Doi Inthanon',
        description:
          'Thailand’s highest peak, wrapped in cloud forest, waterfalls and twin royal pagodas amid cool mountain gardens.',
        imageQuery: 'Doi Inthanon pagodas mountain Thailand',
      },
    ],

    hiddenGems: [
      {
        name: 'Sticky Waterfalls (Bua Tong)',
        description:
          'Mineral-crusted falls you can literally walk up barefoot, the limestone gripping your feet like magic.',
        imageQuery: 'Bua Tong sticky waterfalls Chiang Mai',
      },
      {
        name: 'Baan Kang Wat village',
        description:
          'A leafy artisan community of studios, craft cafés and weekend markets on the city’s quiet western edge.',
        imageQuery: 'Baan Kang Wat artist village Chiang Mai',
      },
      {
        name: 'Wat Pha Lat',
        description:
          'A serene jungle temple half-hidden in the trees along the Monk’s Trail up Doi Suthep, mossy and almost empty.',
        imageQuery: 'Wat Pha Lat jungle temple Chiang Mai',
      },
    ],

    food: [
      {
        name: 'Khao soi',
        description:
          'Northern Thailand’s signature curry noodle soup — coconut broth, soft and crispy noodles, pickles and lime.',
        imageQuery: 'khao soi Chiang Mai curry noodle',
      },
      {
        name: 'Sai ua',
        description:
          'A fragrant grilled herb-and-lemongrass pork sausage, the smoky star of every northern market.',
        imageQuery: 'sai ua northern Thai sausage',
      },
      {
        name: 'Khanom jeen nam ngiao',
        description:
          'Rice vermicelli in a tangy tomato-and-pork-rib broth, a beloved Lanna market breakfast.',
        imageQuery: 'khanom jeen nam ngiao Thai noodles',
      },
      {
        name: 'Mango sticky rice',
        description:
          'Sweet coconut-soaked sticky rice with ripe mango — Thailand’s perfect dessert, sold from market carts.',
        imageQuery: 'mango sticky rice Thailand',
      },
    ],

    adventures: [
      {
        name: 'Ethical elephant sanctuary',
        description:
          'A day feeding, walking and bathing rescued elephants at a no-riding, conservation-focused sanctuary.',
        imageQuery: 'ethical elephant sanctuary Chiang Mai',
      },
      {
        name: 'Jungle trekking & hill tribes',
        description:
          'Hiking through bamboo forest and rice terraces to overnight in Karen or Lahu hill-tribe villages.',
        imageQuery: 'jungle trekking hill tribe Chiang Mai',
      },
      {
        name: 'Whitewater & ziplines',
        description:
          'Rafting jungle rivers and flying through the rainforest canopy on long zipline courses.',
        imageQuery: 'jungle zipline Chiang Mai rainforest',
      },
    ],

    seasons: {
      spring:
        'March–May is hot, and the late-dry burning season can bring smoky haze to the valley.',
      summer:
        'June–August green wet season brings short heavy rains, lush hills and fewer tourists.',
      autumn:
        'September–October stays green and rainy, with waterfalls at their fullest.',
      winter:
        'November–February is the sweet spot — cool, clear, dry days, the lantern festival and mountain mornings.',
    },

    culture: {
      language: 'Thai; Northern Thai (Kham Mueang) dialect; English in tourist areas',
      religion: 'Theravada Buddhism, with animist and Lanna traditions',
      greeting: 'The wai — palms pressed together with a slight bow',
      etiquette: [
        'Remove shoes before entering temples and homes.',
        'Dress modestly at temples, covering shoulders and knees.',
        'Never touch anyone’s head or point your feet at people or Buddha images.',
        'Show respect to monks; women should not touch them or hand items directly.',
      ],
      festivals: [
        {
          name: 'Yi Peng & Loy Krathong',
          when: 'November (full moon)',
          description:
            'Sky lanterns and candle-lit floats on the rivers in Chiang Mai’s most magical nights.',
        },
        {
          name: 'Songkran',
          when: 'April 13–15',
          description:
            'Thai New Year, celebrated with temple rituals and a city-wide water-fight in the streets.',
        },
        {
          name: 'Flower Festival',
          when: 'February',
          description:
            'Floral floats parade through the city as the cool season brings the gardens into bloom.',
        },
      ],
    },

    heroQuote: 'Where golden temples meet jungle mountains and the sky fills with lanterns.',
    heroMedia: {
      title: 'Lanterns over the Old City',
      imageQuery: 'Chiang Mai lanterns night temple Yi Peng',
      atmosphere: 'Warm night air, temple chanting and a thousand lanterns rising into the dark.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Chiang Mai old city moat temples aerial',
        description: 'A moated grid of ancient temples sits beneath green mountains.',
      },
      {
        title: 'The Temple',
        imageQuery: 'Doi Suthep golden temple monks',
        description: 'You climb to a golden mountaintop wat wreathed in incense.',
      },
      {
        title: 'The Jungle',
        imageQuery: 'Chiang Mai elephant sanctuary jungle',
        description: 'In the hills you wade a river beside a rescued elephant.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Chiang Mai rice terraces mountains sunset',
        description: 'The light turns gold over forested ridges and rice terraces.',
      },
      {
        title: 'Night',
        imageQuery: 'Chiang Mai night market food lanterns',
        description: 'Night markets glow with street food, crafts and music.',
      },
    ],

    photoCollections: {
      hero: ['Doi Suthep temple Chiang Mai', 'Chiang Mai old city temple', 'Yi Peng lanterns Chiang Mai'],
      nature: ['Chiang Mai mountains jungle', 'Doi Inthanon Thailand', 'Chiang Mai rice terraces'],
      culture: ['Chiang Mai monks temple', 'Lanna craft Chiang Mai', 'Chiang Mai night bazaar'],
      food: ['khao soi Chiang Mai', 'Thai street food market', 'mango sticky rice Thailand'],
      night: ['Chiang Mai night market lanterns', 'Chiang Mai temple night', 'Loy Krathong floating lights'],
      hidden: ['Sticky waterfalls Chiang Mai', 'Wat Pha Lat jungle temple', 'Baan Kang Wat village'],
    },

    ambience: {
      soundscape: ['Temple bells and chanting', 'Cicadas in the jungle', 'Sizzling night-market woks', 'Monsoon rain on leaves'],
      musicStyle: 'Lanna folk with seung lute and bamboo flute',
      weatherMood: 'Warm, green and easygoing, cool in the mountain mornings',
    },

    story:
      'Chiang Mai moves at the pace of a place that has nothing to prove. The old city still sits inside its crumbling moat, and within it more than three hundred temples drowse among coffee shops and guesthouses, their gold catching the morning light while saffron-robed monks sweep the courtyards. You rent a scooter, or you don’t; either way the day unspools gently — a bowl of khao soi at a plastic table, a wat where you kneel before a six-hundred-year-old chedi, a drive up the mountain to Doi Suthep through cool forest. The hills pull you outward: to rescued elephants you walk beside in a river, to waterfalls you climb barefoot, to villages where the rice terraces step down into mist. And if you’ve timed it for November, the night you’ll never forget arrives — when the whole city tilts its face upward and releases ten thousand lanterns, and the dark fills with rising light, and everyone falls silent at once.',

    experiences: [
      'Release a lantern at the Yi Peng festival (November)',
      'Day at an ethical elephant rescue sanctuary',
      'Northern Thai cooking class after a market tour',
      'Sunrise alms-giving and meditation with monks',
      'Hike the Monk’s Trail to hidden Wat Pha Lat',
      'Trek to a hill-tribe village and stay overnight',
      'Climb the barefoot Sticky Waterfalls',
      'Sunday Walking Street craft and food market',
    ],

    moods: ['Relaxation', 'Spiritual', 'Foodie', 'Nature', 'Cultural'],
    travelStyle: ['Solo', 'Couples', 'Digital Nomad', 'Backpackers'],

    aiSummary:
      'Chiang Mai is northern Thailand’s laid-back cultural heart — temples, mountains, jungle and famous food at gentle prices. It suits solo travellers, couples, digital nomads and backpackers who want spirituality, nature and great eating over beaches or party scenes. Visit November–February for cool, clear days and the magical lantern festival; avoid the smoky March–April burning season. Affordable, walkable and welcoming, it’s ideal for slow travel and ethical elephant experiences. Pair it with Thailand’s islands for beach time. Choose Chiang Mai to slow down among golden temples and green hills.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 21. KATHMANDU, NEPAL
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'kathmandu',
    name: 'Kathmandu',
    country: 'Nepal',
    continent: 'Asia',
    lat: 27.7172,
    lng: 85.324,
    flag: '🇳🇵',
    capital: 'Kathmandu',
    population: 1003000,
    bestSeason: 'October–November and March–April for clear skies and mountain views',
    budget: 'Affordable · $25–55 / day',
    timezone: 'NPT (UTC+5:45)',

    wonders: [
      {
        name: 'Boudhanath Stupa',
        description:
          'One of the largest Buddhist stupas on Earth, its painted eyes gazing out over a circling tide of pilgrims, prayer flags and butter lamps.',
        imageQuery: 'Boudhanath stupa Kathmandu prayer flags',
      },
      {
        name: 'Swayambhunath (Monkey Temple)',
        description:
          'A hilltop stupa reached by 365 steps, wrapped in fluttering flags and watched over by troops of monkeys, with the valley spread below.',
        imageQuery: 'Swayambhunath monkey temple Kathmandu',
      },
      {
        name: 'Pashupatinath',
        description:
          'Nepal’s holiest Hindu temple on the sacred Bagmati River, where cremation ghats and wandering sadhus meet at the water’s edge.',
        imageQuery: 'Pashupatinath temple Kathmandu sadhu',
      },
      {
        name: 'Durbar Squares',
        description:
          'The royal plazas of Kathmandu, Patan and Bhaktapur — masterpieces of carved Newari wood and pagoda temples.',
        imageQuery: 'Bhaktapur Durbar Square Nepal temples',
      },
    ],

    hiddenGems: [
      {
        name: 'Patan’s hidden courtyards',
        description:
          'Behind the temple square lie quiet bahals — courtyards of bronze-casting workshops and tiny shrines worn smooth by centuries.',
        imageQuery: 'Patan courtyard Newari Kathmandu valley',
      },
      {
        name: 'Nagarkot sunrise',
        description:
          'A ridge village an hour away where, on a clear dawn, the Himalaya — sometimes even Everest — flushes pink across the horizon.',
        imageQuery: 'Nagarkot sunrise Himalaya Everest view',
      },
      {
        name: 'Asan Tole market',
        description:
          'A frantic, fragrant six-way bazaar crossroads where the real working life of the old city plays out.',
        imageQuery: 'Asan market Kathmandu spices crowd',
      },
    ],

    food: [
      {
        name: 'Momos',
        description:
          'Steamed or fried dumplings of spiced meat or vegetables with fiery tomato achar — Nepal’s beloved national snack.',
        imageQuery: 'momos Nepali dumplings achar',
      },
      {
        name: 'Dal bhat',
        description:
          'The trekker’s fuel — lentil soup, rice, curried vegetables and pickles, endlessly refilled. "Dal bhat power, 24 hour."',
        imageQuery: 'dal bhat Nepali thali',
      },
      {
        name: 'Newari khaja set',
        description:
          'A traditional platter of beaten rice, spiced meats, lentil patties and pickles, eaten with home-brewed millet liquor.',
        imageQuery: 'Newari khaja set Nepal food',
      },
      {
        name: 'Masala chiya',
        description:
          'Sweet spiced milk tea brewed with cardamom and ginger, sipped on every street corner against the mountain chill.',
        imageQuery: 'Nepali masala tea chiya',
      },
    ],

    adventures: [
      {
        name: 'Everest scenic flight',
        description:
          'A small-plane mountain flight that brings you level with Everest and the highest peaks on Earth.',
        imageQuery: 'Everest mountain flight Himalaya plane',
      },
      {
        name: 'Kathmandu Valley trek',
        description:
          'Hiking ridge trails between Newari villages, terraced fields and forest viewpoints over the valley.',
        imageQuery: 'Kathmandu valley trek hills villages',
      },
      {
        name: 'Whitewater rafting the Trishuli',
        description:
          'Running Himalayan rapids through green gorges on a day trip from the city.',
        imageQuery: 'Trishuli river rafting Nepal',
      },
    ],

    seasons: {
      spring:
        'March–April warms the valley with rhododendron blossom and generally clear mountain mornings.',
      summer:
        'June–September is the monsoon — lush, green and wet, with clouds often hiding the peaks.',
      autumn:
        'October–November is the golden season: crisp, clear skies, post-monsoon views and the great festivals.',
      winter:
        'December–February is cold and dry, with the sharpest mountain views and few crowds.',
    },

    culture: {
      language: 'Nepali; Newari in the valley; English in tourist areas',
      religion: 'Hinduism and Buddhism, intertwined for centuries',
      greeting: 'Palms together with "Namaste" — "the divine in me bows to the divine in you"',
      etiquette: [
        'Walk clockwise around stupas and spin prayer wheels with your right hand.',
        'Remove shoes and leather before entering temples; ask before entering shrines.',
        'Dress modestly, covering shoulders and knees at religious sites.',
        'Use your right hand to give, receive and eat; avoid touching others’ heads.',
      ],
      festivals: [
        {
          name: 'Dashain',
          when: 'September/October',
          description:
            'Nepal’s biggest festival — fifteen days of family reunions, blessings, kite-flying and feasting.',
        },
        {
          name: 'Tihar (Deepawali)',
          when: 'October/November',
          description:
            'The festival of lights, when homes glow with oil lamps and even crows, dogs and cows are honoured.',
        },
        {
          name: 'Indra Jatra',
          when: 'September',
          description:
            'A days-long chariot festival in Kathmandu Durbar Square, with masked dances and the living goddess Kumari.',
        },
      ],
    },

    heroQuote: 'Where prayer flags flutter between temple towers and the roof of the world.',
    heroMedia: {
      title: 'Dawn at Boudhanath',
      imageQuery: 'Boudhanath stupa dawn pilgrims prayer flags',
      atmosphere: 'Cold morning air, butter-lamp smoke, murmured mantras and the slow shuffle of pilgrims.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Kathmandu valley city temples hills aerial',
        description: 'A dense valley of temple towers sits beneath distant white peaks.',
      },
      {
        title: 'The Stupa',
        imageQuery: 'Boudhanath stupa pilgrims circling',
        description: 'Pilgrims circle a vast white dome under watching painted eyes.',
      },
      {
        title: 'The Old City',
        imageQuery: 'Kathmandu Durbar Square carved temples',
        description: 'You wander squares of intricately carved Newari pagodas.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Nagarkot Himalaya sunset Kathmandu',
        description: 'From a ridge the Himalaya flush gold and rose at dusk.',
      },
      {
        title: 'Night',
        imageQuery: 'Kathmandu Boudhanath butter lamps night',
        description: 'Butter lamps flicker around the stupa as monks chant.',
      },
    ],

    photoCollections: {
      hero: ['Boudhanath stupa Kathmandu', 'Swayambhunath temple Kathmandu', 'Kathmandu Durbar Square'],
      nature: ['Himalaya mountains Nepal', 'Nagarkot Himalaya view', 'Kathmandu valley terraces'],
      culture: ['Kathmandu prayer flags temple', 'Newari wood carving Nepal', 'Nepali sadhu Pashupatinath'],
      food: ['momos Nepal dumplings', 'dal bhat Nepali food', 'Nepali tea street'],
      night: ['Boudhanath night butter lamps', 'Kathmandu Thamel night lights', 'Kathmandu temple night'],
      hidden: ['Patan courtyard Nepal', 'Asan market Kathmandu', 'Bhaktapur pottery square'],
    },

    ambience: {
      soundscape: ['Monks chanting mantras', 'Temple bells and prayer wheels', 'Bustling market crowds', 'Wind in the prayer flags'],
      musicStyle: 'Tibetan and Nepali devotional chant with singing bowls',
      weatherMood: 'Crisp mountain air over an ancient, incense-filled valley',
    },

    story:
      'Kathmandu overwhelms and then, slowly, enchants. You arrive into a tangle of narrow streets, motorbikes, dust and noise, the air a weave of incense, diesel and frying momos — and then you turn a corner and four hundred years stand in front of you: a temple square of carved black wood, gods and demons writhing across every beam, pigeons rising from the steps. The sacred is not in a museum here; it’s underfoot. At Boudhanath you join the slow human river circling the great white stupa, spinning prayer wheels, butter lamps glowing in the dusk, the chant of monks threading the cold air. At Pashupatinath, smoke rises from the cremation ghats while life carries on around it, unhurried and unafraid. And on a clear morning you climb to a ridge above the valley and there, impossibly high and white and far, is the Himalaya itself — the roof of the world, glowing pink at dawn — and you understand at last why this small valley has been holy for so very long.',

    experiences: [
      'Dawn kora (circumambulation) around Boudhanath Stupa',
      'Explore the carved Durbar Squares of the valley',
      'Witness the ghats and sadhus of Pashupatinath',
      'Sunrise Himalaya views from Nagarkot',
      'Everest scenic mountain flight',
      'Newari food crawl through the old city',
      'Singing-bowl sound-healing session',
      'Day trek between valley villages and viewpoints',
    ],

    moods: ['Spiritual', 'Cultural', 'Adventure', 'History', 'Awe'],
    travelStyle: ['Solo', 'Backpackers', 'Adventure', 'Culture Seekers'],

    aiSummary:
      'Kathmandu is the spiritual and cultural gateway to the Himalaya — ancient stupas, carved temple squares, living rituals and mountain views. It suits solo travellers, backpackers, adventurers and culture-seekers who want depth, spirituality and trekking access over comfort or beaches. Visit October–November or March–April for clear skies and the great festivals; the city is the launchpad for treks to Everest and Annapurna. Affordable, intense and chaotic, it rewards the patient and open-minded. Choose Kathmandu to step into a living sacred world beneath the highest mountains on Earth.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 22. PARO, BHUTAN
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'paro',
    name: 'Paro',
    country: 'Bhutan',
    continent: 'Asia',
    lat: 27.4305,
    lng: 89.4133,
    flag: '🇧🇹',
    capital: 'Thimphu',
    population: 11000,
    bestSeason: 'March–May and September–November for clear skies and festivals',
    budget: 'Premium · $250–400 / day (includes the all-inclusive daily fee)',
    timezone: 'BTT (UTC+6)',

    wonders: [
      {
        name: 'Tiger’s Nest (Paro Taktsang)',
        description:
          'A whitewashed monastery clinging to a sheer cliff 900 metres above the valley, where Guru Rinpoche is said to have flown on a tigress.',
        imageQuery: 'Tigers Nest monastery Paro Bhutan cliff',
      },
      {
        name: 'Rinpung Dzong',
        description:
          'A massive fortress-monastery of whitewashed walls and golden roofs guarding the valley, linked by a traditional cantilever bridge.',
        imageQuery: 'Rinpung Dzong Paro Bhutan fortress',
      },
      {
        name: 'Paro Valley',
        description:
          'A serene patchwork of terraced rice paddies, red-chili-roofed farmhouses and apple orchards beneath snow-dusted peaks.',
        imageQuery: 'Paro valley Bhutan farmhouses paddies',
      },
      {
        name: 'Kyichu Lhakhang',
        description:
          'One of Bhutan’s oldest and most sacred temples, dating to the 7th century, fragrant with butter lamps and old timber.',
        imageQuery: 'Kyichu Lhakhang temple Paro Bhutan',
      },
    ],

    hiddenGems: [
      {
        name: 'Chumphu Ney',
        description:
          'A remote pilgrimage trail through forest to a hermitage hiding a famously "floating" levitating statue, far from any crowds.',
        imageQuery: 'Chumphu Ney pilgrimage trail Bhutan forest',
      },
      {
        name: 'Hot-stone bath farmstay',
        description:
          'A traditional wooden tub heated by river stones and artemisia leaves at a Paro farmhouse, the perfect post-hike soak.',
        imageQuery: 'Bhutanese hot stone bath farmhouse',
      },
      {
        name: 'Drukgyel Dzong ruins',
        description:
          'The dramatic ruined fortress at the valley’s head, with Mount Jomolhari rising white behind it on a clear day.',
        imageQuery: 'Drukgyel Dzong ruins Jomolhari Bhutan',
      },
    ],

    food: [
      {
        name: 'Ema datshi',
        description:
          'Bhutan’s fiery national dish — whole chilies stewed in melted yak cheese, treated as a vegetable, not a spice.',
        imageQuery: 'ema datshi Bhutan chili cheese',
      },
      {
        name: 'Red rice',
        description:
          'A nutty, pinkish highland rice grown in the terraced paddies, the staple of every Bhutanese meal.',
        imageQuery: 'Bhutanese red rice dish',
      },
      {
        name: 'Momos & shakam',
        description:
          'Steamed dumplings and dried beef stews warmed with chili and cheese against the mountain cold.',
        imageQuery: 'Bhutanese momos dried beef dish',
      },
      {
        name: 'Suja (butter tea)',
        description:
          'A warming, savoury tea churned with yak butter and salt, offered as a gesture of welcome.',
        imageQuery: 'butter tea suja Bhutan cup',
      },
    ],

    adventures: [
      {
        name: 'Tiger’s Nest pilgrimage hike',
        description:
          'A steep, spectacular half-day climb through pine forest and prayer flags to the cliff-hanging monastery.',
        imageQuery: 'Tigers Nest hike trail prayer flags Bhutan',
      },
      {
        name: 'Jomolhari foothills trek',
        description:
          'Trekking from Paro into the high valleys beneath sacred Mount Jomolhari, through yak pastures and remote hamlets.',
        imageQuery: 'Jomolhari trek Bhutan mountains yak',
      },
      {
        name: 'Archery match',
        description:
          'Watching (or trying) Bhutan’s national sport, a riot of long-distance bamboo bows, teasing songs and dancing.',
        imageQuery: 'Bhutan archery traditional sport',
      },
    ],

    seasons: {
      spring:
        'March–May brings blooming rhododendrons, mild days, clear peaks and the vibrant Paro Tsechu festival.',
      summer:
        'June–August is the green monsoon — lush valleys and lower visitor numbers, but cloud and rain.',
      autumn:
        'September–November is the prime season: crisp, clear skies, golden paddies and major festivals.',
      winter:
        'December–February is cold but bright and quiet, with snow on the peaks and the clearest mountain air.',
    },

    culture: {
      language: 'Dzongkha; English widely spoken and taught',
      religion: 'Vajrayana (Tibetan) Buddhism, central to daily life',
      greeting: '"Kuzuzangpo la" with a gentle bow; humility and respect are deeply valued',
      etiquette: [
        'Walk clockwise around temples, stupas and prayer wheels.',
        'Remove shoes and hats inside temples; photography is often forbidden indoors.',
        'Dress modestly with covered shoulders and knees at dzongs and shrines.',
        'Bhutan requires booking through a licensed operator with a daily sustainable-tourism fee.',
      ],
      festivals: [
        {
          name: 'Paro Tsechu',
          when: 'March/April',
          description:
            'A spectacular spring festival of masked cham dances and the unfurling of a giant sacred thangka at dawn.',
        },
        {
          name: 'Thimphu Tshechu',
          when: 'September/October',
          description:
            'The capital’s grand festival of masked dance, crowds in their finest kira and gho, and blessings.',
        },
        {
          name: 'Losar (New Year)',
          when: 'February/March',
          description:
            'The Bhutanese New Year, marked with family feasts, archery and temple offerings.',
        },
      ],
    },

    heroQuote: 'Where a monastery clings to a cliff in the kingdom of happiness.',
    heroMedia: {
      title: 'Tiger’s Nest in the Clouds',
      imageQuery: 'Tigers Nest monastery clouds Paro Bhutan',
      atmosphere: 'Thin cold mountain air, drifting cloud, prayer flags snapping and the scent of pine and juniper.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Paro valley Bhutan aerial dzong paddies',
        description: 'A green valley of farmhouses and a great white dzong opens below.',
      },
      {
        title: 'The Dzong',
        imageQuery: 'Rinpung Dzong Paro monks courtyard',
        description: 'You cross a wooden bridge into a vast fortress-monastery.',
      },
      {
        title: 'The Climb',
        imageQuery: 'Tigers Nest hike forest prayer flags Bhutan',
        description: 'You climb through pine and prayer flags toward the cliff temple.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Paro valley sunset mountains Bhutan',
        description: 'The paddies turn gold and the peaks blush above the valley.',
      },
      {
        title: 'Night',
        imageQuery: 'Bhutan farmhouse night butter lamp mountains',
        description: 'A farmhouse glows warm against the cold Himalayan dark.',
      },
    ],

    photoCollections: {
      hero: ['Tigers Nest monastery Bhutan', 'Rinpung Dzong Paro', 'Paro valley Bhutan'],
      nature: ['Bhutan Himalaya mountains', 'Paro rice paddies terraces', 'Jomolhari mountain Bhutan'],
      culture: ['Bhutan masked cham dance', 'Bhutanese prayer flags', 'Bhutan dzong architecture'],
      food: ['ema datshi Bhutan chili cheese', 'Bhutanese red rice meal', 'Bhutan butter tea'],
      night: ['Bhutan farmhouse night', 'Bhutan temple butter lamps night', 'Paro valley stars night'],
      hidden: ['Bhutan hot stone bath', 'Drukgyel Dzong ruins', 'Bhutan forest pilgrimage trail'],
    },

    ambience: {
      soundscape: ['Prayer flags in the wind', 'Monastery horns and drums', 'A river over stones', 'Distant temple chanting'],
      musicStyle: 'Bhutanese folk and Buddhist ritual horns and chant',
      weatherMood: 'Cool, clear and pine-scented high in a peaceful valley',
    },

    story:
      'Bhutan measures its success in happiness, and the moment you reach the Paro valley you start to understand why. There are no traffic lights, no billboards, no rush — only terraced paddies, whitewashed farmhouses painted with auspicious symbols, and great fortress-monasteries presiding over it all like benevolent giants. Monks in crimson robes cross wooden bridges; prayer flags fray and flutter on every ridge, releasing their blessings to the wind. And then there is the climb. You ascend for hours through fragrant pine forest, past waterfalls and shrines, your breath short in the thin air, until you round a bend and see it: the Tiger’s Nest, a monastery impossibly fused to a sheer cliff face, hanging in the clouds nine hundred metres above the valley floor. You finish the last steps in something like reverence, light a butter lamp in the cool dark of the shrine, and step back out onto the ledge into a silence so complete it feels like the mountains themselves are listening.',

    experiences: [
      'Hike to the cliff-hanging Tiger’s Nest monastery',
      'Witness masked cham dances at the Paro Tsechu',
      'Soak in a traditional hot-stone bath at a farmhouse',
      'Explore Rinpung Dzong and the National Museum',
      'Trek the Jomolhari foothills past yak pastures',
      'Try ema datshi and red rice in a village home',
      'Spin prayer wheels at 7th-century Kyichu Lhakhang',
      'Watch (or join) a traditional archery match',
    ],

    moods: ['Spiritual', 'Awe', 'Nature', 'Cultural', 'Peaceful'],
    travelStyle: ['Couples', 'Solo', 'Luxury', 'Culture Seekers'],

    aiSummary:
      'Paro is the serene heart of Bhutan — the cliff-top Tiger’s Nest, fortress-monasteries, prayer-flagged valleys and a culture built around happiness and Buddhism. It suits reflective couples, solo travellers and culture-seekers who want spirituality, mountain beauty and authenticity over nightlife or budget travel. Visit spring or autumn for clear skies and spectacular festivals. Bhutan’s all-inclusive daily fee and guided-travel model make it pricier but uncrowded, pristine and deeply rewarding. Ideal for slow, mindful travel and gentle high-altitude hiking. Choose Paro to find calm in the last Himalayan kingdom.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 28. PETRA, JORDAN
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'petra',
    name: 'Petra',
    country: 'Jordan',
    continent: 'Asia',
    lat: 30.3285,
    lng: 35.4444,
    flag: '🇯🇴',
    capital: 'Amman',
    population: 17000,
    bestSeason: 'March–May and September–November for mild days and cool nights',
    budget: 'Moderate · $60–130 / day',
    timezone: 'EET (UTC+3)',

    wonders: [
      {
        name: 'The Treasury (Al-Khazneh)',
        description:
          'A colossal rose-red façade carved into a sheer cliff, revealed in a heart-stopping reveal at the end of a long narrow canyon.',
        imageQuery: 'Petra Treasury Al-Khazneh Jordan',
      },
      {
        name: 'The Siq',
        description:
          'A kilometre-long natural rock corridor, walls towering 200 metres on either side, that funnels you toward the Treasury.',
        imageQuery: 'Petra Siq canyon path Jordan',
      },
      {
        name: 'The Monastery (Ad-Deir)',
        description:
          'An even larger carved temple reached by 800 ancient rock-cut steps, vast and serene above the valley.',
        imageQuery: 'Petra Monastery Ad-Deir steps Jordan',
      },
      {
        name: 'Wadi Rum',
        description:
          'The "Valley of the Moon" two hours south — a Mars-red desert of soaring sandstone monoliths and Bedouin camps.',
        imageQuery: 'Wadi Rum desert Jordan red sand monoliths',
      },
    ],

    hiddenGems: [
      {
        name: 'Petra by Night',
        description:
          'The Siq and Treasury lit by 1,500 candles, with Bedouin music drifting through the dark — a hushed, otherworldly experience.',
        imageQuery: 'Petra by night candles Treasury Jordan',
      },
      {
        name: 'Al-Khubtha high trail',
        description:
          'A side path climbing to a clifftop terrace for the famous aerial view straight down onto the Treasury.',
        imageQuery: 'Petra Treasury viewpoint above Al-Khubtha',
      },
      {
        name: 'Little Petra (Siq al-Barid)',
        description:
          'A miniature, near-empty Nabataean site nearby with carved dwellings and a rare painted ceiling.',
        imageQuery: 'Little Petra Siq al-Barid Jordan',
      },
    ],

    food: [
      {
        name: 'Mansaf',
        description:
          'Jordan’s national dish — lamb cooked in fermented dried yoghurt over rice and flatbread, eaten communally.',
        imageQuery: 'mansaf Jordanian lamb yoghurt rice',
      },
      {
        name: 'Maqluba',
        description:
          'A spiced "upside-down" pot of rice, meat and fried vegetables, dramatically flipped onto a platter to serve.',
        imageQuery: 'maqluba Jordanian upside down rice',
      },
      {
        name: 'Zarb',
        description:
          'A Bedouin barbecue of meat and vegetables slow-cooked in an underground sand oven in Wadi Rum.',
        imageQuery: 'zarb Bedouin underground barbecue Wadi Rum',
      },
      {
        name: 'Bedouin tea',
        description:
          'Sweet sage-and-mint tea brewed over a fire and poured generously, the desert’s gesture of welcome.',
        imageQuery: 'Bedouin tea fire Jordan desert',
      },
    ],

    adventures: [
      {
        name: 'Wadi Rum jeep & camp',
        description:
          'A 4x4 safari among red dunes and rock arches, ending with a night in a Bedouin camp under blazing stars.',
        imageQuery: 'Wadi Rum jeep tour desert camp stars',
      },
      {
        name: 'The back route into Petra',
        description:
          'Hiking in from Little Petra over the mountains to arrive at the Monastery from above, away from the crowds.',
        imageQuery: 'Petra back trail hiking Monastery Jordan',
      },
      {
        name: 'Float in the Dead Sea',
        description:
          'A day trip to the lowest point on Earth to float effortlessly in its mineral-heavy water and slather in black mud.',
        imageQuery: 'Dead Sea float Jordan salt',
      },
    ],

    seasons: {
      spring:
        'March–May is ideal — warm sunny days, cool evenings and the desert briefly flushed with green.',
      summer:
        'June–August is scorching by day; explore at dawn and dusk and rest through the fierce afternoons.',
      autumn:
        'September–November cools beautifully, the prime second window for comfortable exploring.',
      winter:
        'December–February is cold, sometimes with rain or snow dusting the rose rock, but quiet and atmospheric.',
    },

    culture: {
      language: 'Arabic; English widely spoken',
      religion: 'Islam, with deep Bedouin heritage',
      greeting: '"As-salaam alaikum" with a hand to the heart; hospitality is a point of honour',
      etiquette: [
        'Dress modestly, covering shoulders and knees, especially away from tourist sites.',
        'Accept Bedouin tea and hospitality graciously — refusing can offend.',
        'Ask before photographing people, particularly Bedouin hosts.',
        'Tipping guides, drivers and camp hosts is customary and appreciated.',
      ],
      festivals: [
        {
          name: 'Distant Heat / Wadi Rum events',
          when: 'Varies',
          description:
            'Occasional desert music and cultural gatherings staged among the sands and rocks.',
        },
        {
          name: 'Eid al-Fitr',
          when: 'Varies (end of Ramadan)',
          description:
            'The festive end of the fasting month, with family feasts, sweets and celebration.',
        },
        {
          name: 'Jordan Independence Day',
          when: 'May 25',
          description:
            'National celebrations with parades, flags and fireworks across the country.',
        },
      ],
    },

    heroQuote: 'Where a rose-red city sleeps, half as old as time, carved into the desert cliffs.',
    heroMedia: {
      title: 'First Light at the Treasury',
      imageQuery: 'Petra Treasury morning light Siq Jordan',
      atmosphere: 'Cool canyon shadow giving way to warm light on rose stone, hooves echoing in the Siq.',
    },

    visualJourney: [
      {
        title: 'The Approach',
        imageQuery: 'Petra Siq narrow canyon walking Jordan',
        description: 'You walk a kilometre between towering canyon walls into the dark.',
      },
      {
        title: 'The Reveal',
        imageQuery: 'Petra Treasury reveal Siq glimpse',
        description: 'The canyon parts and the Treasury blazes rose-red ahead.',
      },
      {
        title: 'The Climb',
        imageQuery: 'Petra Monastery steps mountains Jordan',
        description: 'Ancient steps lead you up to the vast desert Monastery.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Wadi Rum desert sunset red rocks Jordan',
        description: 'In Wadi Rum the sandstone monoliths burn red at dusk.',
      },
      {
        title: 'Night',
        imageQuery: 'Wadi Rum desert camp stars night Jordan',
        description: 'Stars flood the desert sky above a glowing Bedouin camp.',
      },
    ],

    photoCollections: {
      hero: ['Petra Treasury Jordan', 'Petra Siq canyon', 'Petra Monastery Jordan'],
      nature: ['Wadi Rum desert Jordan', 'Dead Sea Jordan', 'Jordan desert rock arch'],
      culture: ['Bedouin Petra camel', 'Petra rock tombs carved', 'Bedouin camp Wadi Rum'],
      food: ['mansaf Jordanian dish', 'Bedouin zarb barbecue', 'Bedouin tea Jordan desert'],
      night: ['Petra by night candles', 'Wadi Rum stars night camp', 'Petra Treasury candlelight'],
      hidden: ['Little Petra Jordan', 'Petra Treasury viewpoint above', 'Wadi Rum Bedouin camp luxury'],
    },

    ambience: {
      soundscape: ['Hooves echoing in the Siq', 'Wind over the desert', 'A Bedouin rababa fiddle', 'Crackling campfire at night'],
      musicStyle: 'Bedouin oud and rababa with desert percussion',
      weatherMood: 'Warm dry desert days and cool, star-blown nights',
    },

    story:
      'You walk into the earth. The Siq closes around you — a crack in the mountains barely wide enough for a chariot, its walls soaring two hundred metres overhead, the light dropping, the temperature falling, the world narrowing to red stone and your own footsteps. For a kilometre it twists on, and just as you begin to wonder if it ever ends, a sliver of gold appears in the gloom ahead, widens, resolves — and you step out, blinking, before the Treasury: a temple the size of a cathedral, carved entire from the living cliff two thousand years ago by the Nabataeans, glowing rose-pink in the morning sun. It is one of the great reveals on Earth, and no photograph prepares you for it. Beyond it lies a whole lost city — tombs, a theatre, a monastery up eight hundred steps — and beyond that, the red desert of Wadi Rum, where you ride out among monoliths the size of skyscrapers and sleep beneath a sky so thick with stars it hardly seems dark at all.',

    experiences: [
      'Walk the Siq to the Treasury at first light',
      'Climb the 800 steps to the Monastery',
      'Experience Petra by Night by candlelight',
      'Hike to the clifftop view over the Treasury',
      'Jeep safari and overnight camp in Wadi Rum',
      'Bedouin zarb dinner under the desert stars',
      'Float in the Dead Sea at the lowest point on Earth',
      'Explore quiet Little Petra nearby',
    ],

    moods: ['Adventure', 'History', 'Awe', 'Desert', 'Photography'],
    travelStyle: ['Couples', 'Solo', 'Adventure', 'History Buffs'],

    aiSummary:
      'Petra is one of the world’s great wonders — a rose-red city carved into desert cliffs, paired with the Mars-like sands of Wadi Rum and the floating Dead Sea. It suits adventurous couples, solo travellers and history buffs who want awe, hiking and desert nights over beaches or nightlife. Visit March–May or September–November for mild days and cool evenings; give Petra at least two days and add a Bedouin camp in Wadi Rum. Safe, welcoming and rich in hospitality, Jordan is easily toured by car or guide. Choose Petra to walk into the ancient world.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 29. MUSCAT, OMAN
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'muscat',
    name: 'Muscat',
    country: 'Oman',
    continent: 'Asia',
    lat: 23.588,
    lng: 58.3829,
    flag: '🇴🇲',
    capital: 'Muscat',
    population: 1720000,
    bestSeason: 'October–April for warm, dry, comfortable days',
    budget: 'Moderate · $70–150 / day',
    timezone: 'GST (UTC+4)',

    wonders: [
      {
        name: 'Sultan Qaboos Grand Mosque',
        description:
          'A serene marble masterpiece holding one of the world’s largest hand-woven carpets and a vast Swarovski chandelier.',
        imageQuery: 'Sultan Qaboos Grand Mosque Muscat',
      },
      {
        name: 'Mutrah Corniche & Souq',
        description:
          'A handsome waterfront of white merchant houses and a labyrinthine old market fragrant with frankincense and silver.',
        imageQuery: 'Mutrah Souq Corniche Muscat harbour',
      },
      {
        name: 'Wadi Shab',
        description:
          'A turquoise river canyon you wade and swim through to reach a hidden waterfall inside a cave.',
        imageQuery: 'Wadi Shab Oman turquoise canyon swim',
      },
      {
        name: 'Wahiba Sands',
        description:
          'A sea of golden dunes a few hours inland, where you can dune-bash, sandboard and sleep in a desert camp.',
        imageQuery: 'Wahiba Sands Oman desert dunes camp',
      },
    ],

    hiddenGems: [
      {
        name: 'Bimmah Sinkhole',
        description:
          'A startling natural pool of clear blue-green water sunk into the limestone near the coast, perfect for a cooling swim.',
        imageQuery: 'Bimmah Sinkhole Oman turquoise',
      },
      {
        name: 'Jebel Akhdar terraces',
        description:
          'Cool "Green Mountain" villages clinging to cliffs above ancient rose and pomegranate terraces.',
        imageQuery: 'Jebel Akhdar Oman terraces mountains village',
      },
      {
        name: 'Ras al-Jinz turtle reserve',
        description:
          'A protected beach where endangered green turtles haul ashore to nest under the stars by night.',
        imageQuery: 'Ras al Jinz turtle nesting Oman beach',
      },
    ],

    food: [
      {
        name: 'Shuwa',
        description:
          'Marinated meat wrapped in palm leaves and slow-roasted for a day or two in an underground sand oven for festivals.',
        imageQuery: 'shuwa Omani slow roasted meat',
      },
      {
        name: 'Majboos',
        description:
          'Fragrant spiced rice with tender meat, saffron and dried lime — the centrepiece of Omani hospitality.',
        imageQuery: 'majboos Omani spiced rice meat',
      },
      {
        name: 'Mishkak & grilled seafood',
        description:
          'Skewered grilled meat from street stalls and just-caught kingfish and lobster from the Gulf of Oman.',
        imageQuery: 'Omani grilled seafood mishkak',
      },
      {
        name: 'Omani halwa & kahwa',
        description:
          'A sticky rose-and-saffron sweet served with cardamom coffee and dates — the ritual of welcome.',
        imageQuery: 'Omani halwa kahwa coffee dates',
      },
    ],

    adventures: [
      {
        name: 'Desert camp in Wahiba Sands',
        description:
          'Dune-driving into the golden sands to sandboard, ride camels and sleep beneath a brilliant desert sky.',
        imageQuery: 'Wahiba Sands desert camp sunset Oman',
      },
      {
        name: 'Wadi swimming & canyoning',
        description:
          'Hiking and swimming the turquoise pools of Wadi Shab and Wadi Bani Khalid between palm groves and cliffs.',
        imageQuery: 'wadi swimming Oman canyon palms',
      },
      {
        name: 'Dolphin & coast cruise',
        description:
          'A dhow sail from Muscat’s coast to watch dolphins and snorkel the clear waters of the Gulf of Oman.',
        imageQuery: 'dolphin watching dhow Muscat Oman coast',
      },
    ],

    seasons: {
      spring:
        'March–April stays warm and pleasant before the summer heat builds, with roses blooming on Jebel Akhdar.',
      summer:
        'June–August is very hot on the coast, though the far south of Oman catches a misty monsoon.',
      autumn:
        'October–November cools into ideal exploring weather, with warm seas and clear desert nights.',
      winter:
        'December–February is the prime season — warm sunny days, cool nights and the best wadi and desert conditions.',
    },

    culture: {
      language: 'Arabic; English widely spoken',
      religion: 'Ibadi Islam, known for its tolerance and moderation',
      greeting: '"As-salaam alaikum" with a handshake; Omanis are famously gracious and gentle',
      etiquette: [
        'Dress modestly — cover shoulders and knees; women cover hair to enter the Grand Mosque.',
        'Remove shoes before entering mosques and homes.',
        'Accept dates, coffee and hospitality as a sign of respect.',
        'Ask before photographing locals, and avoid photographing women without consent.',
      ],
      festivals: [
        {
          name: 'Muscat Festival',
          when: 'January/February',
          description:
            'Weeks of crafts, heritage displays, food and concerts celebrating Omani culture.',
        },
        {
          name: 'Eid al-Fitr & Eid al-Adha',
          when: 'Varies',
          description:
            'The two great Islamic feasts, marked with family gatherings, shuwa and celebration.',
        },
        {
          name: 'Salalah Khareef Festival',
          when: 'July–August (in the south)',
          description:
            'A festival celebrating the rare monsoon that turns southern Oman green and misty.',
        },
      ],
    },

    heroQuote: 'Where frankincense, white forts and golden dunes meet a turquoise sea.',
    heroMedia: {
      title: 'Dusk over Mutrah Harbour',
      imageQuery: 'Mutrah Corniche Muscat sunset harbour dhow',
      atmosphere: 'Warm sea air laced with frankincense, the call to prayer and dhows rocking in the harbour.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Muscat coast mountains white city aerial',
        description: 'A white city threads between bare mountains and a turquoise sea.',
      },
      {
        title: 'The Souq',
        imageQuery: 'Mutrah Souq Muscat frankincense silver',
        description: 'You lose yourself in lanes of frankincense, silver and silk.',
      },
      {
        title: 'The Wadi',
        imageQuery: 'Wadi Shab Oman swimming turquoise',
        description: 'You wade an emerald canyon to a waterfall hidden in a cave.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Wahiba Sands Oman dunes sunset',
        description: 'The desert dunes glow amber as the sun melts into the sand.',
      },
      {
        title: 'Night',
        imageQuery: 'Oman desert camp stars night sky',
        description: 'Stars blaze over a desert camp far from any city light.',
      },
    ],

    photoCollections: {
      hero: ['Sultan Qaboos Grand Mosque Muscat', 'Mutrah Corniche Muscat', 'Muscat coast mountains'],
      nature: ['Wadi Shab Oman', 'Wahiba Sands dunes Oman', 'Bimmah Sinkhole Oman'],
      culture: ['Mutrah Souq Oman silver', 'Omani fort architecture', 'Omani man dishdasha khanjar'],
      food: ['Omani majboos rice', 'Omani halwa coffee dates', 'Omani grilled seafood'],
      night: ['Oman desert stars camp', 'Muscat mosque night lights', 'Mutrah harbour night Oman'],
      hidden: ['Jebel Akhdar Oman terraces', 'Bimmah Sinkhole turquoise', 'Ras al Jinz turtle Oman'],
    },

    ambience: {
      soundscape: ['The call to prayer over the harbour', 'Wind across the dunes', 'Water echoing in a wadi cave', 'An oud playing in the souq'],
      musicStyle: 'Omani oud and Gulf maritime folk',
      weatherMood: 'Warm, dry and golden, scented with frankincense and sea salt',
    },

    story:
      'Oman is Arabia as it was before the skyscrapers — proud, gracious, and quietly stunning. Muscat doesn’t soar; it spreads low and white between jagged brown mountains and a sea the colour of glass, its skyline ruled not by towers but by minarets and old Portuguese forts. You wander the Mutrah souq, where the air is thick with frankincense — Oman’s ancient gift to the world — and silver khanjar daggers gleam in the stalls. But the city is only the doorway. An hour out, you’re swimming through a turquoise canyon to a waterfall hidden inside a cave; a few hours more and the mountains give way to the Wahiba Sands, an ocean of golden dunes where a Bedouin pours you cardamom coffee and the night sky comes down so close you could touch it. Everywhere there is the same unhurried warmth — the dates pressed into your hand, the "welcome, welcome", the sense of a country confident enough in its own beauty not to shout about it.',

    experiences: [
      'Visit the serene Sultan Qaboos Grand Mosque',
      'Wander the frankincense-scented Mutrah Souq',
      'Swim the turquoise canyon of Wadi Shab',
      'Overnight desert camp in the Wahiba Sands',
      'Dune-bashing and sandboarding on golden dunes',
      'Watch green turtles nest at Ras al-Jinz',
      'Escape to the cool terraces of Jebel Akhdar',
      'Dhow cruise to watch dolphins off the coast',
    ],

    moods: ['Adventure', 'Cultural', 'Desert', 'Authentic', 'Photography'],
    travelStyle: ['Couples', 'Family', 'Adventure', 'Road Trippers'],

    aiSummary:
      'Oman is authentic, uncrowded Arabia — Muscat’s mosques and souqs, turquoise wadis, golden deserts and a famously gracious culture. It suits adventurous couples, families and road-trippers who want desert camps, canyon swims and genuine heritage over glitz or nightlife. Visit October–April for warm, dry, comfortable days; a hire car unlocks wadis, dunes and mountains beyond the capital. Safe, welcoming and refreshingly low-key compared with its flashier Gulf neighbours, it rewards curious, active travellers. Choose Oman to experience Arabia at its most genuine and beautiful.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 30. MALDIVES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'maldives',
    name: 'Maldives',
    country: 'Maldives',
    continent: 'Asia',
    lat: 4.1755,
    lng: 73.5093,
    flag: '🇲🇻',
    capital: 'Malé',
    population: 540000,
    bestSeason: 'November–April (dry season) for sunshine and calm, clear seas',
    budget: 'Premium · $250–800+ / day at resorts',
    timezone: 'MVT (UTC+5)',

    wonders: [
      {
        name: 'Overwater villas',
        description:
          'Thatched bungalows on stilts above translucent lagoons, with glass floors and ladders straight down into the warm sea.',
        imageQuery: 'Maldives overwater villa lagoon turquoise',
      },
      {
        name: 'House reefs',
        description:
          'Vivid coral gardens just off the beach, teeming with parrotfish, rays and turtles a few fin-kicks from your villa.',
        imageQuery: 'Maldives coral reef snorkeling fish',
      },
      {
        name: 'Bioluminescent beaches',
        description:
          'On dark nights the shoreline can glow electric blue as bioluminescent plankton light up with every wave.',
        imageQuery: 'Maldives bioluminescent plankton beach night',
      },
      {
        name: 'Sandbank picnics',
        description:
          'Pristine ribbons of white sand rising from the ocean at low tide, where you can be marooned for a private lunch.',
        imageQuery: 'Maldives sandbank ocean white sand',
      },
    ],

    hiddenGems: [
      {
        name: 'Local-island guesthouses',
        description:
          'Affordable stays on inhabited islands like Maafushi or Thulusdhoo, offering real Maldivian life beyond the resorts.',
        imageQuery: 'Maldives local island guesthouse Maafushi',
      },
      {
        name: 'Hanifaru Bay manta gathering',
        description:
          'A protected bay in Baa Atoll where, in season, dozens of manta rays and whale sharks gather to feed.',
        imageQuery: 'Hanifaru Bay manta rays Maldives',
      },
      {
        name: 'Thulusdhoo surf & local life',
        description:
          'A laid-back island with world-class reef breaks ("Cokes" and "Chickens") and an easygoing village pace.',
        imageQuery: 'Thulusdhoo Maldives surf island',
      },
    ],

    food: [
      {
        name: 'Mas huni',
        description:
          'Shredded smoked tuna tossed with coconut, onion and chili, scooped with warm roshi flatbread — the Maldivian breakfast.',
        imageQuery: 'mas huni Maldivian tuna coconut breakfast',
      },
      {
        name: 'Garudhiya',
        description:
          'A clear, fragrant tuna broth served with rice, lime and chili — the soulful staple of the islands.',
        imageQuery: 'garudhiya Maldivian fish soup',
      },
      {
        name: 'Fihunu mas',
        description:
          'Whole reef fish rubbed with chili paste and grilled over coals on the beach, smoky and fresh.',
        imageQuery: 'grilled fish Maldives beach barbecue',
      },
      {
        name: 'Hedhikaa & sai',
        description:
          'Little short-eat snacks — fishcakes, samosas and spiced bites — served with sweet milky tea.',
        imageQuery: 'Maldivian short eats hedhikaa tea',
      },
    ],

    adventures: [
      {
        name: 'Dive with mantas & whale sharks',
        description:
          'World-class diving among manta rays, reef sharks and gentle whale sharks in warm, gin-clear water.',
        imageQuery: 'Maldives diving manta ray whale shark',
      },
      {
        name: 'Reef-break surfing',
        description:
          'Catching consistent, warm-water waves over coral reefs at breaks scattered across the atolls.',
        imageQuery: 'surfing Maldives reef break wave',
      },
      {
        name: 'Sunset dolphin cruise',
        description:
          'A traditional dhoni sail across the lagoon to watch spinner dolphins ride the bow at golden hour.',
        imageQuery: 'Maldives dhoni sunset dolphin cruise',
      },
    ],

    seasons: {
      spring:
        'March–April is hot, calm and dazzlingly clear — peak conditions for diving and lagoon time.',
      summer:
        'May–August is the wetter southwest monsoon, with warm rain, bigger swell and the best surf.',
      autumn:
        'September–November stays green and humid with passing storms and quieter, cheaper resorts.',
      winter:
        'December–February is the prime dry season — sunshine, gentle breezes and glassy seas (and top prices).',
    },

    culture: {
      language: 'Dhivehi; English widely spoken',
      religion: 'Islam (the state religion)',
      greeting: '"As-salaam alaikum" or a friendly "Kihineh"; Maldivians are warm and softly spoken',
      etiquette: [
        'On inhabited local islands dress modestly — cover shoulders and knees away from "bikini beaches".',
        'Alcohol is served only at resorts, not on local islands.',
        'Respect the reef: never touch or stand on coral, and use reef-safe sunscreen.',
        'Ramadan is observed on local islands; be discreet about eating in daylight then.',
      ],
      festivals: [
        {
          name: 'Eid (Kuda & Bodu Eid)',
          when: 'Varies',
          description:
            'The Islamic feasts, celebrated on the islands with traditional Bodu Beru drumming and communal meals.',
        },
        {
          name: 'Maldives Independence Day',
          when: 'July 26',
          description:
            'National celebrations with parades, music and cultural displays.',
        },
        {
          name: 'Bodu Beru gatherings',
          when: 'Year-round',
          description:
            'Hypnotic big-drum performances and dancing that are the heartbeat of Maldivian island culture.',
        },
      ],
    },

    heroQuote: 'Where the horizon dissolves into a thousand shades of turquoise.',
    heroMedia: {
      title: 'Lagoon at Golden Hour',
      imageQuery: 'Maldives overwater villa sunset turquoise lagoon',
      atmosphere: 'Warm still air, the gentle lap of the lagoon and the sky melting into pink and gold.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Maldives atoll aerial turquoise islands',
        description: 'Rings of coral and turquoise scatter across an endless ocean.',
      },
      {
        title: 'The Villa',
        imageQuery: 'Maldives overwater bungalow ladder lagoon',
        description: 'You step from your villa straight down into warm clear water.',
      },
      {
        title: 'The Reef',
        imageQuery: 'Maldives snorkeling reef turtle fish',
        description: 'A coral garden of fish, rays and turtles drifts beneath you.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Maldives sunset dhoni ocean pink sky',
        description: 'A wooden dhoni sails a lagoon turned rose and gold.',
      },
      {
        title: 'Night',
        imageQuery: 'Maldives beach stars bioluminescence night',
        description: 'Stars above and glowing blue plankton along the dark shore.',
      },
    ],

    photoCollections: {
      hero: ['Maldives overwater villa', 'Maldives turquoise lagoon aerial', 'Maldives white beach palm'],
      nature: ['Maldives coral reef fish', 'Maldives manta ray', 'Maldives sandbank ocean'],
      culture: ['Maldives local island village', 'Maldives Bodu Beru drumming', 'Maldivian dhoni boat'],
      food: ['mas huni Maldivian breakfast', 'Maldives grilled reef fish', 'Maldivian short eats tea'],
      night: ['Maldives bioluminescent beach', 'Maldives villa night lagoon', 'Maldives stars ocean night'],
      hidden: ['Maldives local island guesthouse', 'Hanifaru Bay manta', 'Thulusdhoo surf Maldives'],
    },

    ambience: {
      soundscape: ['Wavelets lapping the lagoon', 'Palm fronds in the breeze', 'Distant Bodu Beru drums', 'Gentle rain on a thatched roof'],
      musicStyle: 'Bodu Beru drumming and gentle island melodies',
      weatherMood: 'Hot, calm and tropical over impossibly clear water',
    },

    story:
      'There is a particular blue that you only believe once you’ve seen it, and the Maldives is made almost entirely of it. From the seaplane it looks unreal — rings and ribbons of coral scattered across the Indian Ocean, each one cupping a lagoon so clear and so vividly turquoise it seems painted on. You land at a resort that is its own small island, step into an overwater villa, and lower yourself by ladder straight off your deck into warm, glass-clear water where a reef shark idles past and a turtle grazes the coral as if you weren’t there. The days lose their edges: a snorkel at dawn, a long lunch, a doze in a hammock over the water, a swim out to a sandbank that exists only at low tide. And at night the magic doubles — the stars come out in their millions, undimmed by any city, and along the dark shoreline the breaking waves begin, impossibly, to glow electric blue, as if the sea had swallowed the sky and was giving the light back, wave by wave.',

    experiences: [
      'Stay in an overwater villa above the lagoon',
      'Snorkel or dive the vibrant house reef',
      'Swim with manta rays and whale sharks',
      'Sunset dolphin cruise on a traditional dhoni',
      'Private picnic on a deserted sandbank',
      'Witness a bioluminescent "sea of stars" beach',
      'Experience local island life and Bodu Beru drumming',
      'Sunrise paddleboard across a glassy lagoon',
    ],

    moods: ['Romantic', 'Luxury', 'Relaxation', 'Beach', 'Wellness'],
    travelStyle: ['Couples', 'Honeymoon', 'Luxury', 'Divers'],

    aiSummary:
      'The Maldives is the ultimate tropical escape — overwater villas, glass-clear lagoons, world-class diving and total serenity across 1,000 coral islands. It suits couples, honeymooners, divers and luxury travellers who want beaches, water and relaxation over culture or nightlife. Visit November–April for dry, sunny, calm seas; May–August brings rain and the best surf. Resorts are pricey and isolating (one island each), while local-island guesthouses offer an affordable, authentic alternative. Less suited to budget backpackers or sightseers craving variety. Choose the Maldives to disappear into blue.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 36. KANDY, SRI LANKA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'kandy',
    name: 'Kandy',
    country: 'Sri Lanka',
    continent: 'Asia',
    lat: 7.2906,
    lng: 80.6337,
    flag: '🇱🇰',
    capital: 'Sri Jayawardenepura Kotte',
    population: 125400,
    bestSeason: 'January–April for dry hill-country days; July/August for the Esala Perahera',
    budget: 'Affordable · $25–55 / day',
    timezone: 'IST (UTC+5:30)',

    wonders: [
      {
        name: 'Temple of the Sacred Tooth Relic',
        description:
          'The spiritual heart of Sri Lanka, a golden-roofed temple by the lake enshrining a tooth of the Buddha amid drumming and lotus offerings.',
        imageQuery: 'Temple of the Tooth Kandy Sri Lanka',
      },
      {
        name: 'Kandy Lake & old town',
        description:
          'A serene man-made lake ringed by hills and colonial-era streets, the placid centre of the last Sinhalese kingdom.',
        imageQuery: 'Kandy lake Sri Lanka hills town',
      },
      {
        name: 'Tea-country train to Ella',
        description:
          'One of the world’s most beautiful rail journeys, rattling through emerald tea plantations, waterfalls and misty peaks.',
        imageQuery: 'Sri Lanka tea train Ella Nine Arch Bridge',
      },
      {
        name: 'Sigiriya Rock Fortress',
        description:
          'A 200-metre monolith crowned by the ruins of a sky palace, reached past ancient frescoes and a lion’s-paw gateway.',
        imageQuery: 'Sigiriya rock fortress Sri Lanka',
      },
    ],

    hiddenGems: [
      {
        name: 'Hanthana mountain trail',
        description:
          'A breezy ridge hike above Kandy through pine and tea, with panoramas over the lake and the central highlands.',
        imageQuery: 'Hanthana mountain range Kandy Sri Lanka',
      },
      {
        name: 'Ceylon tea factory visit',
        description:
          'Touring a working hillside estate to see the leaf picked, withered and rolled into the world’s finest tea.',
        imageQuery: 'Ceylon tea plantation factory Sri Lanka',
      },
      {
        name: 'Udawattakele forest',
        description:
          'A tranquil royal forest sanctuary right behind the temple, full of birds, monkeys and giant old trees.',
        imageQuery: 'Udawattakele forest Kandy Sri Lanka',
      },
    ],

    food: [
      {
        name: 'Rice & curry',
        description:
          'A generous spread of rice with a dozen little curries — dhal, jackfruit, beetroot, sambol — each spiced and distinct.',
        imageQuery: 'Sri Lankan rice and curry spread',
      },
      {
        name: 'Kottu roti',
        description:
          'Shredded flatbread stir-fried with egg, vegetables and spice to a rhythmic clatter of blades on the griddle.',
        imageQuery: 'kottu roti Sri Lanka street food',
      },
      {
        name: 'Hoppers (appa)',
        description:
          'Bowl-shaped fermented rice pancakes, crisp at the edges, often cradling a soft egg, eaten with chili sambol.',
        imageQuery: 'egg hoppers Sri Lanka appa',
      },
      {
        name: 'Ceylon tea',
        description:
          'The island’s legendary high-grown black tea, taken strong and sweet against the cool hill-country air.',
        imageQuery: 'Ceylon tea cup Sri Lanka plantation',
      },
    ],

    adventures: [
      {
        name: 'Scenic hill-country rail',
        description:
          'Riding the slow train through tea estates and tunnels to Ella, hanging out the open doorway as the hills roll by.',
        imageQuery: 'Sri Lanka train tea country open door',
      },
      {
        name: 'Sigiriya & Dambulla day trip',
        description:
          'Climbing the lion-rock fortress and exploring the painted cave temples of the Cultural Triangle.',
        imageQuery: 'Dambulla cave temple Sri Lanka Buddha',
      },
      {
        name: 'Tea-trail trekking',
        description:
          'Walking estate paths between plantation bungalows and waterfalls, tea pickers dotting the green slopes.',
        imageQuery: 'tea plantation trekking Sri Lanka hills',
      },
    ],

    seasons: {
      spring:
        'March–April is warm and largely dry in the hills, lovely for temples, tea country and trekking.',
      summer:
        'June–September brings the southwest monsoon’s showers but also the spectacular Kandy Esala Perahera.',
      autumn:
        'October–November is the inter-monsoon period with afternoon rains and lush, green landscapes.',
      winter:
        'December–April is the prime dry season for the hill country — cool, clear and comfortable.',
    },

    culture: {
      language: 'Sinhala and Tamil; English widely spoken',
      religion: 'Predominantly Theravada Buddhist, with Hindu, Muslim and Christian communities',
      greeting: 'Palms together with "Ayubowan" — "may you live long"',
      etiquette: [
        'Remove shoes and hats and cover shoulders and knees at temples.',
        'Never pose with your back to a Buddha statue or point your feet toward it.',
        'Don’t touch monks or hand items to them directly (women especially).',
        'Treat Buddha images with respect; tattoos and selfies that seem disrespectful can cause real offence.',
      ],
      festivals: [
        {
          name: 'Kandy Esala Perahera',
          when: 'July/August',
          description:
            'A magnificent ten-night procession of caparisoned elephants, fire dancers and drummers honouring the sacred tooth.',
        },
        {
          name: 'Vesak',
          when: 'May',
          description:
            'The Buddha’s birth, enlightenment and death, marked with lanterns, illuminations and free food stalls (dansala).',
        },
        {
          name: 'Sinhala & Tamil New Year',
          when: 'April',
          description:
            'A joyful national new year of family rituals, games, sweets and auspicious customs.',
        },
      ],
    },

    heroQuote: 'Where misty tea hills cradle the sacred heart of an island kingdom.',
    heroMedia: {
      title: 'Dawn over Kandy Lake',
      imageQuery: 'Kandy lake temple mist dawn Sri Lanka',
      atmosphere: 'Cool misty air, temple drums across the water and the green hills slowly waking.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Kandy Sri Lanka hills lake temple aerial',
        description: 'A lake-centred town nestles in mist-wrapped tea-green hills.',
      },
      {
        title: 'The Temple',
        imageQuery: 'Temple of the Tooth Kandy offerings drummers',
        description: 'Drums and lotus offerings fill the golden temple of the tooth.',
      },
      {
        title: 'The Train',
        imageQuery: 'Sri Lanka tea train hills doorway green',
        description: 'A slow train winds through endless emerald tea plantations.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Sri Lanka tea hills sunset mist',
        description: 'The tea hills glow gold and fill with evening mist.',
      },
      {
        title: 'Night',
        imageQuery: 'Kandy Perahera elephants fire night Sri Lanka',
        description: 'In festival season, fire-lit elephants parade through the dark.',
      },
    ],

    photoCollections: {
      hero: ['Temple of the Tooth Kandy', 'Kandy lake Sri Lanka', 'Sigiriya rock Sri Lanka'],
      nature: ['Sri Lanka tea plantation hills', 'Nine Arch Bridge Ella', 'Sri Lanka waterfall hill country'],
      culture: ['Kandy Esala Perahera elephants', 'Kandyan dancer Sri Lanka', 'Dambulla cave temple Buddha'],
      food: ['Sri Lankan rice and curry', 'kottu roti Sri Lanka', 'Ceylon tea Sri Lanka'],
      night: ['Kandy Perahera fire dancers night', 'Kandy lake night lights', 'Sri Lanka Vesak lanterns'],
      hidden: ['Hanthana hills Kandy', 'Ceylon tea factory Sri Lanka', 'Udawattakele forest Kandy'],
    },

    ambience: {
      soundscape: ['Temple drums and horanewa horns', 'Birdsong in the forest', 'The clatter of a kottu griddle', 'A train rattling through the hills'],
      musicStyle: 'Kandyan drumming and traditional Sri Lankan dance music',
      weatherMood: 'Cool, misty hill-country air over deep tea-green slopes',
    },

    story:
      'Kandy sits in a green bowl of hills in the cool heart of Sri Lanka, and it carries the soul of the island. This was the last kingdom to fall to the colonisers, holding out in these highlands long after the coast had surrendered, and a certain proud serenity lingers. At its centre, beside a misty lake, stands the Temple of the Sacred Tooth — Buddhism’s holiest site in Sri Lanka — where each evening drums thunder and pilgrims lay lotus blossoms before the relic of the Buddha himself. But Kandy is also a doorway to the highlands, and the journey is half the magic: you board a slow, rattling train and climb for hours through some of the most beautiful country on Earth, emerald tea plantations stitched across the hillsides, waterfalls crashing beside the tracks, pickers in bright saris moving through the bushes, the cool mist curling in through the open carriage door. You drink the tea where it grows, eat a dozen little curries off one banana-leaf plate, and feel the gentle, generous rhythm of an island that has welcomed travellers for two thousand years.',

    experiences: [
      'Evening puja at the Temple of the Sacred Tooth',
      'Ride the scenic hill-country train through tea estates',
      'Climb Sigiriya rock fortress at dawn',
      'Visit a working Ceylon tea factory',
      'Watch a Kandyan dance and drumming performance',
      'Explore the painted Dambulla cave temples',
      'Sri Lankan rice-and-curry cooking class',
      'Witness the Esala Perahera procession (July/Aug)',
    ],

    moods: ['Spiritual', 'Cultural', 'Scenic', 'Nature', 'Relaxation'],
    travelStyle: ['Couples', 'Solo', 'Culture Seekers', 'Slow Travel'],

    aiSummary:
      'Kandy is the cultural and spiritual heart of Sri Lanka’s hill country — the sacred Temple of the Tooth, a serene lake and a gateway to tea plantations and ancient rock fortresses. It suits couples, solo travellers and culture-seekers who want temples, scenery and the world-famous tea-country train over beaches or nightlife. Visit January–April for dry hill weather, or July/August for the spectacular Esala Perahera. Affordable, gentle and rich in heritage, it anchors a wider Sri Lanka loop with Sigiriya, Ella and the south coast. Choose Kandy to ride into misty tea hills and sacred tradition.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 37. BALI, INDONESIA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    continent: 'Asia',
    lat: -8.5069,
    lng: 115.2625,
    flag: '🇮🇩',
    capital: 'Jakarta',
    population: 4300000,
    bestSeason: 'April–October (dry season) for sun, surf and clear rice-terrace days',
    budget: 'Affordable · $35–90 / day',
    timezone: 'WITA (UTC+8)',

    wonders: [
      {
        name: 'Tegalalang rice terraces',
        description:
          'Emerald paddies stepping down a valley in the ancient subak irrigation system, glowing in the morning light near Ubud.',
        imageQuery: 'Tegalalang rice terraces Bali Ubud',
      },
      {
        name: 'Uluwatu temple',
        description:
          'A sea temple clinging to a 70-metre cliff above the Indian Ocean, where fire-lit Kecak dancers chant at sunset.',
        imageQuery: 'Uluwatu temple Bali cliff sunset',
      },
      {
        name: 'Mount Batur sunrise',
        description:
          'A pre-dawn volcano hike to watch the sun rise over a caldera lake and the cone of sacred Mount Agung beyond.',
        imageQuery: 'Mount Batur sunrise hike Bali volcano',
      },
      {
        name: 'Tanah Lot',
        description:
          'A photogenic temple stranded on a sea rock, surrounded by surf at high tide and one of Bali’s great sunset stages.',
        imageQuery: 'Tanah Lot temple Bali sunset sea',
      },
    ],

    hiddenGems: [
      {
        name: 'Sidemen valley',
        description:
          'A quiet eastern valley of terraced rice and weaving villages beneath Mount Agung — Ubud as it was decades ago.',
        imageQuery: 'Sidemen valley Bali rice terraces Agung',
      },
      {
        name: 'Sekumpul waterfall',
        description:
          'A cluster of jungle waterfalls in the north reached by a sweaty trek and river crossings — Bali’s most spectacular.',
        imageQuery: 'Sekumpul waterfall Bali jungle',
      },
      {
        name: 'Nusa Penida cliffs',
        description:
          'A rugged offshore island of dramatic clifftop viewpoints, manta-ray snorkelling and the famous T-Rex headland.',
        imageQuery: 'Nusa Penida Bali Kelingking cliff beach',
      },
    ],

    food: [
      {
        name: 'Babi guling',
        description:
          'Balinese spit-roast suckling pig stuffed with turmeric and lemongrass, crisp-skinned and richly spiced.',
        imageQuery: 'babi guling Bali suckling pig',
      },
      {
        name: 'Nasi campur',
        description:
          'A plate of rice ringed by little portions — satay, tempeh, vegetables, sambal — a taste of everything at once.',
        imageQuery: 'nasi campur Balinese rice plate',
      },
      {
        name: 'Satay lilit',
        description:
          'Minced fish or chicken blended with coconut and spice, wrapped on lemongrass skewers and grilled over coconut husks.',
        imageQuery: 'satay lilit Bali grilled skewers',
      },
      {
        name: 'Kopi & fresh coconut',
        description:
          'Strong Balinese coffee and ice-cold young coconut sipped straight from the shell on a beach or in a rice field.',
        imageQuery: 'Bali coffee fresh coconut beach',
      },
    ],

    adventures: [
      {
        name: 'Surfing the south coast',
        description:
          'Catching warm waves at Uluwatu, Padang Padang and Canggu — a surf paradise for every level.',
        imageQuery: 'surfing Uluwatu Bali wave',
      },
      {
        name: 'Yoga & wellness in Ubud',
        description:
          'Sunrise yoga over the rice fields, sound baths and healing rituals in Bali’s spiritual jungle heart.',
        imageQuery: 'yoga Ubud Bali rice field wellness',
      },
      {
        name: 'Snorkel & dive the reefs',
        description:
          'Manta rays at Nusa Penida and the technicolour reef and famous wreck at Amed and Tulamben in the east.',
        imageQuery: 'diving Bali manta ray reef Tulamben',
      },
    ],

    seasons: {
      spring:
        'April–May opens the dry season — green from the rains, sunny and not yet crowded.',
      summer:
        'June–August is peak dry season: sunny, busy and buzzing, the best surf and nightlife.',
      autumn:
        'September–October stays dry and warm with thinning crowds — a sweet spot for the island.',
      winter:
        'November–March is the wet season — lush and cheap, with humid days and short tropical downpours.',
    },

    culture: {
      language: 'Indonesian and Balinese; English widely spoken',
      religion: 'Balinese Hinduism, woven through every part of daily life',
      greeting: 'A gentle smile and "Om Swastiastu" or "Selamat"; hands pressed together at the chest',
      etiquette: [
        'Wear a sarong and sash and cover shoulders to enter temples.',
        'Never step on the daily canang sari flower offerings on the ground.',
        'Don’t touch people’s heads or point your feet at sacred objects or people.',
        'Behave modestly at temples; women who are menstruating traditionally do not enter.',
      ],
      festivals: [
        {
          name: 'Nyepi (Day of Silence)',
          when: 'March (Balinese new year)',
          description:
            'After a night of giant ogoh-ogoh monster parades, the whole island falls totally silent for 24 hours.',
        },
        {
          name: 'Galungan & Kuningan',
          when: 'Every 210 days',
          description:
            'Tall decorated penjor bamboo poles line the roads as Balinese honour ancestral spirits returning home.',
        },
        {
          name: 'Bali Arts Festival',
          when: 'June–July',
          description:
            'A month of traditional dance, gamelan music and craft in Denpasar.',
        },
      ],
    },

    heroQuote: 'Where temples, rice terraces and surf breaks share one island of the gods.',
    heroMedia: {
      title: 'Sunrise over the Rice Terraces',
      imageQuery: 'Bali rice terrace sunrise mist Ubud',
      atmosphere: 'Warm humid dawn, incense from a fresh offering and roosters across the green valley.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Bali rice terraces temple jungle aerial',
        description: 'Jungle, rice terraces and temple roofs spill toward the sea.',
      },
      {
        title: 'The Temple',
        imageQuery: 'Bali temple gate offerings incense',
        description: 'You pass a split gate where daily offerings still smoke.',
      },
      {
        title: 'The Surf',
        imageQuery: 'Bali surf beach Uluwatu cliff wave',
        description: 'Warm waves peel beneath the cliffs of the south coast.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Uluwatu temple Bali Kecak sunset fire',
        description: 'Fire-lit Kecak dancers chant as the cliff temple glows.',
      },
      {
        title: 'Night',
        imageQuery: 'Bali night warung lanterns rice field',
        description: 'Warungs glow in the warm dark above the silent paddies.',
      },
    ],

    photoCollections: {
      hero: ['Bali Tegalalang rice terraces', 'Uluwatu temple Bali cliff', 'Tanah Lot Bali sunset'],
      nature: ['Bali waterfall jungle', 'Mount Batur volcano Bali', 'Nusa Penida cliff beach Bali'],
      culture: ['Bali temple offerings canang', 'Balinese Kecak dance fire', 'Bali gamelan ceremony'],
      food: ['babi guling Bali', 'nasi campur Bali', 'Bali fresh coconut beach'],
      night: ['Bali beach club night', 'Bali temple night ceremony', 'Bali warung lights night'],
      hidden: ['Sidemen valley Bali', 'Sekumpul waterfall Bali', 'Nusa Penida Kelingking Bali'],
    },

    ambience: {
      soundscape: ['Gamelan chimes', 'Frogs and crickets in the paddies', 'Surf on the cliffs', 'Roosters and temple bells at dawn'],
      musicStyle: 'Balinese gamelan and gentle tropical melodies',
      weatherMood: 'Warm, humid and green, scented with frangipani and incense',
    },

    story:
      'They call Bali the Island of the Gods, and once you’re there it doesn’t feel like marketing. Spirituality isn’t kept in temples here; it’s woven through every hour of the day. Each morning, women in sarongs lay down tiny palm-leaf offerings — a few flowers, a stick of incense, a grain of rice — on doorsteps and dashboards and beaches, and the whole island smells faintly of frangipani and smoke. You wake to roosters and gamelan, do yoga over a valley of impossibly green rice terraces in Ubud, and ride a scooter past split temple gates and offerings glowing in the dust. Then the island shows its other faces: warm surf peeling beneath the cliffs of Uluwatu, where fire-lit dancers chant the Kecak as the sun drops into the sea; jungle waterfalls in the north; dramatic clifftop coves on the islands offshore. Bali has been loved, perhaps too much, by the world — and yet somehow, beneath the beach clubs and the crowds, the real island endures: gentle, devout, generous, and quietly, deeply enchanted.',

    experiences: [
      'Sunrise yoga over the Ubud rice terraces',
      'Sunset Kecak fire dance at Uluwatu temple',
      'Pre-dawn hike up Mount Batur volcano',
      'Surf lesson on the warm south-coast breaks',
      'Day trip to the cliffs of Nusa Penida',
      'Balinese cooking class and market tour',
      'Trek to the Sekumpul jungle waterfalls',
      'Traditional Balinese spa and healing ritual',
    ],

    moods: ['Relaxation', 'Spiritual', 'Adventure', 'Wellness', 'Romantic'],
    travelStyle: ['Couples', 'Solo', 'Digital Nomad', 'Surfers'],

    aiSummary:
      'Bali blends spiritual culture, rice-terrace scenery, surf and wellness into one easygoing tropical island. It suits couples, solo travellers, digital nomads and surfers who want temples, yoga, beaches and adventure at great value. Visit April–October for dry, sunny days; the wet season is lush and cheaper. Ubud offers jungle and culture, the south coast surf and nightlife, and the offshore islands dramatic cliffs and diving. It can be crowded and built-up in hotspots, so seek quieter east and north Bali for the old magic. Choose Bali for an affordable, soulful tropical escape.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 38. EL NIDO, PHILIPPINES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'el-nido',
    name: 'El Nido',
    country: 'Philippines',
    continent: 'Asia',
    lat: 11.1949,
    lng: 119.4013,
    flag: '🇵🇭',
    capital: 'Manila',
    population: 45000,
    bestSeason: 'December–May (dry season) for calm seas and clear lagoons',
    budget: 'Affordable · $40–100 / day',
    timezone: 'PHT (UTC+8)',

    wonders: [
      {
        name: 'Big & Small Lagoons',
        description:
          'Hidden emerald lagoons enclosed by towering limestone karst, entered by kayak through narrow gaps in the rock.',
        imageQuery: 'El Nido Big Lagoon kayak limestone Palawan',
      },
      {
        name: 'Bacuit Archipelago',
        description:
          'A scatter of jagged jungle-topped islands in turquoise water, the stuff of island-hopping dreams.',
        imageQuery: 'Bacuit archipelago El Nido islands turquoise',
      },
      {
        name: 'Secret & Hidden Beaches',
        description:
          'Tiny coves reachable only by swimming through a crack in the cliff or a low rock arch at the right tide.',
        imageQuery: 'El Nido Secret Beach hidden cove Palawan',
      },
      {
        name: 'Nacpan Beach',
        description:
          'A four-kilometre sweep of golden sand and coconut palms, wild and uncrowded north of town.',
        imageQuery: 'Nacpan Beach El Nido Palawan golden sand',
      },
    ],

    hiddenGems: [
      {
        name: 'Taraw Cliff via ferrata',
        description:
          'A vertiginous bolted climb up the limestone spire behind town for a heart-stopping view over the bay.',
        imageQuery: 'Taraw Cliff El Nido via ferrata view',
      },
      {
        name: 'Nagkalit-kalit waterfalls',
        description:
          'A jungle trek across streams to a series of freshwater falls and pools away from the boats and beaches.',
        imageQuery: 'Nagkalit-kalit waterfall El Nido jungle',
      },
      {
        name: 'Cadlao Lagoon',
        description:
          'A quieter, often-overlooked lagoon on the largest nearby island, with glassy water and a tucked-away beach.',
        imageQuery: 'Cadlao Lagoon El Nido Palawan',
      },
    ],

    food: [
      {
        name: 'Kinilaw',
        description:
          'The Filipino ceviche — raw tuna or mackerel "cooked" in vinegar and calamansi with ginger, onion and chili.',
        imageQuery: 'kinilaw Filipino ceviche tuna',
      },
      {
        name: 'Grilled seafood (inihaw)',
        description:
          'Just-caught fish, squid and prawns grilled over coals on the beach with garlic rice and calamansi.',
        imageQuery: 'grilled seafood Philippines beach inihaw',
      },
      {
        name: 'Adobo',
        description:
          'The Philippines’ beloved national dish — meat braised in soy, vinegar, garlic and bay until rich and tangy.',
        imageQuery: 'Filipino adobo dish',
      },
      {
        name: 'Halo-halo',
        description:
          'A wild shaved-ice dessert of sweet beans, jelly, fruit, leche flan and ube ice cream — chaos in the best way.',
        imageQuery: 'halo-halo Filipino dessert',
      },
    ],

    adventures: [
      {
        name: 'Island-hopping boat tours',
        description:
          'Banca-boat tours (A, B, C, D) threading lagoons, snorkel spots and hidden beaches across the archipelago.',
        imageQuery: 'El Nido island hopping banca boat Palawan',
      },
      {
        name: 'Kayak the lagoons',
        description:
          'Paddling into the still emerald hearts of the Big and Small Lagoons beneath sheer limestone walls.',
        imageQuery: 'kayaking El Nido lagoon limestone cliffs',
      },
      {
        name: 'Snorkel & dive the reefs',
        description:
          'Coral gardens, turtles and dramatic drop-offs in the warm, clear water of the Bacuit Bay.',
        imageQuery: 'snorkeling El Nido reef turtle Palawan',
      },
    ],

    seasons: {
      spring:
        'March–May is hot, dry and calm — peak island-hopping weather with the clearest water (and busiest boats).',
      summer:
        'June–August begins the wet season with afternoon storms, greener islands and quieter beaches.',
      autumn:
        'September–November is the wettest, with the chance of typhoons but lush scenery and low prices.',
      winter:
        'December–February is dry and breezy, sunny and gorgeous — the prime, popular season.',
    },

    culture: {
      language: 'Filipino (Tagalog) and English; local Cuyonon and Tagbanua',
      religion: 'Predominantly Roman Catholic',
      greeting: 'A warm smile and "Kumusta?"; Filipinos are famously friendly and hospitable',
      etiquette: [
        'Respect the marine environment — don’t touch coral and use reef-safe sunscreen.',
        'Pay the small eco-tourism development fee that funds conservation.',
        'Dress modestly in town and at churches, swimwear for the beach only.',
        'Tipping for boat crews and guides is appreciated.',
      ],
      festivals: [
        {
          name: 'Baragatan Festival (Palawan)',
          when: 'June',
          description:
            'Palawan’s provincial festival of street dancing, floats and culture across the island.',
        },
        {
          name: 'Fiesta (town patron saint)',
          when: 'Varies',
          description:
            'El Nido’s town fiesta brings processions, feasting, music and community celebration.',
        },
        {
          name: 'Pasko (Christmas)',
          when: 'December',
          description:
            'The Philippines’ months-long Christmas season fills towns with lanterns, carols and warmth.',
        },
      ],
    },

    heroQuote: 'Where hidden lagoons sleep inside cathedrals of limestone and jungle.',
    heroMedia: {
      title: 'Kayak into the Big Lagoon',
      imageQuery: 'El Nido Big Lagoon kayak emerald limestone',
      atmosphere: 'Warm still water, the drip of a paddle and sheer green cliffs rising on every side.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'El Nido Palawan islands aerial turquoise karst',
        description: 'Jagged jungle islands rise from a turquoise sea.',
      },
      {
        title: 'The Lagoon',
        imageQuery: 'El Nido lagoon kayak limestone cliffs',
        description: 'You paddle through a rock gap into a hidden emerald lagoon.',
      },
      {
        title: 'The Reef',
        imageQuery: 'El Nido snorkeling coral turtle Palawan',
        description: 'Under the boat, coral gardens teem with fish and turtles.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'El Nido beach sunset boats Palawan',
        description: 'The boats come in as the bay turns molten gold.',
      },
      {
        title: 'Night',
        imageQuery: 'El Nido beach bar night stars Palawan',
        description: 'Beach bars glow under a sky thick with stars.',
      },
    ],

    photoCollections: {
      hero: ['El Nido Big Lagoon Palawan', 'Bacuit archipelago El Nido', 'El Nido limestone islands turquoise'],
      nature: ['Nacpan Beach Palawan', 'El Nido hidden beach cove', 'Palawan jungle waterfall'],
      culture: ['El Nido town Palawan Philippines', 'Filipino banca boat colorful', 'Palawan fishing village'],
      food: ['Filipino grilled seafood beach', 'kinilaw Filipino ceviche', 'halo-halo dessert Philippines'],
      night: ['El Nido beach night stars', 'El Nido night bar Palawan', 'Palawan boats night water'],
      hidden: ['Taraw Cliff El Nido view', 'Cadlao Lagoon Palawan', 'Palawan secret beach arch'],
    },

    ambience: {
      soundscape: ['Banca outrigger slapping the waves', 'Gentle lagoon water', 'Jungle birds on the cliffs', 'A guitar at a beach bar'],
      musicStyle: 'Mellow island acoustic and Filipino kundiman',
      weatherMood: 'Hot, bright and tropical over impossibly clear turquoise water',
    },

    story:
      'You round a headland in a wooden outrigger boat, the kind they’ve built here for generations, and the Bacuit Archipelago opens up in front of you — dozens of limestone islands clad in jungle, soaring straight out of water so clear and turquoise it doesn’t look like it belongs to the same planet as everywhere you’ve been before. This is El Nido, on the northern tip of Palawan, and it specialises in places that feel like secrets. You swap the boat for a kayak and paddle through a narrow gap in a cliff into a hidden lagoon, the water beneath you glowing emerald, the walls rising sheer and silent on every side. You swim through a crack in the rock and surface inside a tiny secret beach open only to the sky. You snorkel over coral gardens, eat grilled fish on a deserted cove at lunch, and watch the boats come home as the whole bay melts into gold. The Philippines has more than seven thousand islands, and somehow El Nido feels like the place where the sea was keeping its very best ones.',

    experiences: [
      'Island-hopping boat tour of the Bacuit lagoons',
      'Kayak into the Big and Small Lagoons',
      'Swim into hidden beaches through cliff openings',
      'Snorkel the coral reefs with turtles',
      'Sunset at wild, palm-lined Nacpan Beach',
      'Climb Taraw Cliff via ferrata for the bay view',
      'Trek to the Nagkalit-kalit jungle waterfalls',
      'Fresh grilled-seafood dinner on the sand',
    ],

    moods: ['Beach', 'Adventure', 'Scenic', 'Relaxation', 'Romantic'],
    travelStyle: ['Couples', 'Solo', 'Backpackers', 'Beach Lovers'],

    aiSummary:
      'El Nido, in Palawan, is the Philippines’ island-hopping paradise — hidden lagoons, limestone karst, secret beaches and turquoise water. It suits couples, backpackers, beach lovers and adventurous solo travellers who want kayaking, snorkelling and tropical beauty over nightlife or city sights. Visit December–May for calm seas and clear lagoons; avoid the typhoon-prone late autumn. Affordable and laid-back, though the boat tours get busy in peak season, it pairs well with quieter Palawan spots and Coron. Choose El Nido to disappear among the most beautiful islands in Southeast Asia.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 39. TAIPEI, TAIWAN
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'taipei',
    name: 'Taipei',
    country: 'Taiwan',
    continent: 'Asia',
    lat: 25.033,
    lng: 121.5654,
    flag: '🇹🇼',
    capital: 'Taipei',
    population: 2600000,
    bestSeason: 'October–April for cooler, drier days outside the humid typhoon summer',
    budget: 'Affordable · $40–90 / day',
    timezone: 'NST (UTC+8)',

    wonders: [
      {
        name: 'Taipei 101',
        description:
          'For years the world’s tallest building, a bamboo-inspired tower with a giant wind damper and a high-speed lift to the clouds.',
        imageQuery: 'Taipei 101 tower skyline Taiwan',
      },
      {
        name: 'Night markets',
        description:
          'Sprawling, neon-lit food bazaars like Shilin and Raohe, where Taiwan’s legendary street-food culture comes alive after dark.',
        imageQuery: 'Taipei night market Shilin food stalls',
      },
      {
        name: 'Chiang Kai-shek Memorial',
        description:
          'A vast white-and-blue monument and plaza with a ceremonial honour-guard changing beneath a soaring marble hall.',
        imageQuery: 'Chiang Kai-shek Memorial Hall Taipei',
      },
      {
        name: 'Beitou hot springs',
        description:
          'A steaming geothermal valley in the city’s hills where you can soak in mineral baths amid wooded slopes.',
        imageQuery: 'Beitou hot springs Taipei valley steam',
      },
    ],

    hiddenGems: [
      {
        name: 'Elephant Mountain at dusk',
        description:
          'A short steep hike to a rock ledge for the postcard view of Taipei 101 glowing against the sunset.',
        imageQuery: 'Elephant Mountain Taipei 101 sunset view',
      },
      {
        name: 'Jiufen old street',
        description:
          'A misty mountainside village of red lanterns, tea houses and twisting alleys that inspired Spirited Away.',
        imageQuery: 'Jiufen old street Taiwan lanterns teahouse',
      },
      {
        name: 'Treasure Hill artist village',
        description:
          'A hillside warren of repurposed settlement houses turned studios, gardens and galleries above the river.',
        imageQuery: 'Treasure Hill artist village Taipei',
      },
    ],

    food: [
      {
        name: 'Xiao long bao',
        description:
          'Delicate soup dumplings of pork in a thin pleated skin, served scalding — Taipei’s most famous bite.',
        imageQuery: 'xiao long bao soup dumplings Taipei',
      },
      {
        name: 'Beef noodle soup',
        description:
          'Taiwan’s unofficial national dish — rich braised-beef broth, tender shank and chewy noodles with pickled greens.',
        imageQuery: 'Taiwanese beef noodle soup',
      },
      {
        name: 'Gua bao & oyster omelette',
        description:
          'A pillowy pork-belly bun and a savoury starchy oyster omelette, night-market icons.',
        imageQuery: 'gua bao oyster omelette Taiwan night market',
      },
      {
        name: 'Bubble tea',
        description:
          'The chewy tapioca-pearl milk tea invented in Taiwan, now sipped the world over but best from its homeland.',
        imageQuery: 'bubble tea boba Taiwan',
      },
    ],

    adventures: [
      {
        name: 'Day trip to Taroko Gorge',
        description:
          'A marble canyon of sheer cliffs, tunnels and a jade river on the east coast — Taiwan’s natural masterpiece.',
        imageQuery: 'Taroko Gorge Taiwan marble canyon river',
      },
      {
        name: 'Maokong tea-hills gondola',
        description:
          'A cable car up to misty hillside tea plantations and traditional houses to sip oolong with a city view.',
        imageQuery: 'Maokong gondola tea hills Taipei',
      },
      {
        name: 'Pingxi sky lanterns',
        description:
          'Releasing a wish-painted paper lantern into the sky along an old mountain railway line.',
        imageQuery: 'Pingxi sky lantern Taiwan railway',
      },
    ],

    seasons: {
      spring:
        'March–May is mild and pleasant, with cherry and azalea blossom in the surrounding hills.',
      summer:
        'June–September is hot, very humid and the typhoon season, with frequent heavy downpours.',
      autumn:
        'October–November is the sweet spot — warm, drier days, clear skies and comfortable hiking.',
      winter:
        'December–February is cool and sometimes drizzly, ideal for hot springs and steaming bowls of noodles.',
    },

    culture: {
      language: 'Mandarin Chinese; Taiwanese Hokkien widely spoken',
      religion: 'A blend of Buddhism, Taoism and folk religion',
      greeting: 'A friendly nod or slight bow and "Nǐ hǎo"; Taiwanese are exceptionally courteous',
      etiquette: [
        'Queue patiently and keep your voice down on the immaculate MRT (no eating or drinking on it).',
        'Receive business cards and gifts with both hands.',
        'Remove shoes when entering homes and some traditional guesthouses.',
        'Tipping is not customary or expected.',
      ],
      festivals: [
        {
          name: 'Pingxi Lantern Festival',
          when: 'February (Lunar New Year period)',
          description:
            'Thousands of glowing sky lanterns rise together over the mountains in one of Asia’s most magical sights.',
        },
        {
          name: 'Lunar New Year',
          when: 'January/February',
          description:
            'Temples fill with incense and offerings as families reunite for Taiwan’s most important holiday.',
        },
        {
          name: 'Dragon Boat Festival',
          when: 'June',
          description:
            'Dragon-boat races on the rivers and sticky rice dumplings (zongzi) mark this ancient festival.',
        },
      ],
    },

    heroQuote: 'Where soup dumplings, neon night markets and misty tea hills meet a futuristic skyline.',
    heroMedia: {
      title: 'Taipei 101 at Blue Hour',
      imageQuery: 'Taipei 101 night skyline blue hour Taiwan',
      atmosphere: 'Warm humid evening, the hum of scooters and the glow of night-market neon.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Taipei skyline 101 mountains aerial',
        description: 'A dense modern city sits ringed by green volcanic hills.',
      },
      {
        title: 'The Market',
        imageQuery: 'Taipei night market food crowd neon',
        description: 'You plunge into a neon night market thick with food smells.',
      },
      {
        title: 'The Hills',
        imageQuery: 'Jiufen Taiwan lanterns mountain teahouse',
        description: 'A misty mountain village glows with red lanterns and tea.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Elephant Mountain Taipei 101 sunset',
        description: 'From a rocky ledge, Taipei 101 blazes against the dusk.',
      },
      {
        title: 'Night',
        imageQuery: 'Taipei 101 night city lights Taiwan',
        description: 'The skyline glitters as the city settles into its warm night.',
      },
    ],

    photoCollections: {
      hero: ['Taipei 101 skyline', 'Taipei night market neon', 'Chiang Kai-shek Memorial Taipei'],
      nature: ['Taroko Gorge Taiwan', 'Maokong tea hills Taipei', 'Yangmingshan Taipei mountains'],
      culture: ['Taipei temple incense Longshan', 'Jiufen old street Taiwan', 'Pingxi sky lanterns Taiwan'],
      food: ['xiao long bao Taipei', 'Taiwanese beef noodle soup', 'bubble tea Taiwan'],
      night: ['Taipei 101 night lights', 'Taipei night market lights', 'Jiufen lanterns night Taiwan'],
      hidden: ['Elephant Mountain Taipei view', 'Treasure Hill village Taipei', 'Beitou hot springs Taipei'],
    },

    ambience: {
      soundscape: ['Scooters humming through the streets', 'Night-market sizzle and chatter', 'Temple bells and chanting', 'Rain on a tea-house roof'],
      musicStyle: 'Mandopop and gentle Taiwanese indie',
      weatherMood: 'Warm, humid and neon-lit, cooled by green mountain air',
    },

    story:
      'Taipei is a city that rewards your stomach and your curiosity in equal measure. It’s sleek and futuristic — a bamboo-shaped skyscraper, the world’s most civilised metro, design shops and coffee culture — and yet duck down any side street and you’re in old Asia: a temple thick with incense smoke, an alley of steam rising from soup-dumpling kitchens, a grandmother frying scallion pancakes on a cart. The real soul of the city emerges after dark, when the night markets switch on their neon and the whole population seems to come out to eat: oyster omelettes and stinky tofu and pillowy pork buns and bubble tea, the dish Taiwan gave the world. And the city is gentle in a way that surprises people — endlessly polite, scrupulously clean, deeply kind. When the concrete gets too much, the green hills are minutes away: hot springs steaming in a wooded valley, a gondola up to misty tea plantations, a mountain village of red lanterns wrapped in cloud. Taipei doesn’t shout for your attention like its flashier neighbours. It just quietly, reliably, makes you happy.',

    experiences: [
      'Eat your way through the Shilin or Raohe night market',
      'Sunset over Taipei 101 from Elephant Mountain',
      'Soak in the geothermal baths of Beitou',
      'Day trip to the marble cliffs of Taroko Gorge',
      'Tea tasting in the Maokong hills by gondola',
      'Release a sky lantern in Pingxi',
      'Wander the lantern-lit alleys of Jiufen',
      'Soup-dumpling and street-food crawl',
    ],

    moods: ['Foodie', 'Cultural', 'Urban', 'Relaxation', 'Vibrant'],
    travelStyle: ['Solo', 'Couples', 'Foodies', 'Friends'],

    aiSummary:
      'Taipei is a food-lover’s dream and one of Asia’s friendliest, easiest cities — night markets, soup dumplings, temples, hot springs and a futuristic skyline backed by green hills. It suits solo travellers, couples, foodies and friends who want street food, culture and convenience over beaches or hard adventure. Visit October–April for cooler, drier weather away from the humid typhoon summer. Safe, clean, affordable and superbly connected, with Taroko Gorge and mountain villages within reach, it’s a brilliant, underrated city break. Choose Taipei to eat brilliantly and feel instantly at home.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 40. SEOUL, SOUTH KOREA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'seoul',
    name: 'Seoul',
    country: 'South Korea',
    continent: 'Asia',
    lat: 37.5665,
    lng: 126.978,
    flag: '🇰🇷',
    capital: 'Seoul',
    population: 9700000,
    bestSeason: 'April for cherry blossom; October for crisp autumn foliage',
    budget: 'Moderate · $60–130 / day',
    timezone: 'KST (UTC+9)',

    wonders: [
      {
        name: 'Gyeongbokgung Palace',
        description:
          'The grandest of the Joseon dynasty palaces, with sweeping tiled roofs, a throne hall and a colourful changing-of-the-guard.',
        imageQuery: 'Gyeongbokgung Palace Seoul hanbok',
      },
      {
        name: 'Bukchon Hanok Village',
        description:
          'A hillside neighbourhood of preserved tile-roofed hanok houses winding between the old royal palaces.',
        imageQuery: 'Bukchon Hanok Village Seoul traditional houses',
      },
      {
        name: 'Namsan & N Seoul Tower',
        description:
          'A wooded mountain in the city centre topped by a tower and a fence of love-locks, with views over the whole metropolis.',
        imageQuery: 'N Seoul Tower Namsan night city',
      },
      {
        name: 'Myeongdong & street food',
        description:
          'A blaze of neon shopping streets where vendors fry, grill and skewer Seoul’s addictive street snacks late into the night.',
        imageQuery: 'Myeongdong Seoul street food night neon',
      },
    ],

    hiddenGems: [
      {
        name: 'Ihwa Mural Village',
        description:
          'A steep hillside neighbourhood transformed by artists into a maze of murals, sculptures and city viewpoints.',
        imageQuery: 'Ihwa Mural Village Seoul art steps',
      },
      {
        name: 'Seoul Forest & Seongsu',
        description:
          'A leafy riverside park beside Seongsu-dong, the warehouse-turned-café district often called Seoul’s Brooklyn.',
        imageQuery: 'Seongsu Seoul cafe district industrial',
      },
      {
        name: 'Bukhansan hiking',
        description:
          'A granite-peaked national park on the city’s edge, where Seoulites scramble to summit views over the skyline.',
        imageQuery: 'Bukhansan national park Seoul hiking granite',
      },
    ],

    food: [
      {
        name: 'Korean BBQ',
        description:
          'Marbled beef and pork grilled at your own table, wrapped in lettuce with garlic, ssamjang and kimchi.',
        imageQuery: 'Korean BBQ grill table Seoul',
      },
      {
        name: 'Bibimbap',
        description:
          'A colourful bowl of rice, seasoned vegetables, beef and egg, mixed with gochujang chili paste.',
        imageQuery: 'bibimbap Korean rice bowl',
      },
      {
        name: 'Tteokbokki',
        description:
          'Chewy rice cakes simmered in a sweet-spicy gochujang sauce — Seoul’s ultimate comforting street snack.',
        imageQuery: 'tteokbokki Korean rice cakes street food',
      },
      {
        name: 'Kimchi & soju',
        description:
          'Fermented, fiery kimchi at every meal and clear soju poured among friends in lively pojangmacha tents.',
        imageQuery: 'kimchi soju Korean table',
      },
    ],

    adventures: [
      {
        name: 'Hanbok palace experience',
        description:
          'Renting a traditional hanbok to wander the palaces in costume (and get in free) for the day.',
        imageQuery: 'hanbok palace Seoul Gyeongbokgung',
      },
      {
        name: 'DMZ border tour',
        description:
          'A sobering day trip to the world’s most fortified border, peering into North Korea from observation posts.',
        imageQuery: 'DMZ Korea border tour observation',
      },
      {
        name: 'Han River & night life',
        description:
          'Cycling or picnicking by the Han River by day, then diving into Hongdae’s clubs and K-pop energy after dark.',
        imageQuery: 'Han River Seoul night picnic bridge',
      },
    ],

    seasons: {
      spring:
        'April erupts in cherry blossom along the rivers and palaces — Seoul at its prettiest and liveliest.',
      summer:
        'June–August is hot, humid and rainy in the monsoon, with energetic festivals and late-night street life.',
      autumn:
        'September–November turns the mountains crimson and gold under crisp blue skies — the ideal season.',
      winter:
        'December–February is cold and dry, glittering with city lights, with steaming food and nearby ski slopes.',
    },

    culture: {
      language: 'Korean; English signage common, less widely spoken',
      religion: 'Mix of Christianity, Buddhism and no religion; Confucian social values',
      greeting: 'A slight bow, deeper for elders; respect for age and seniority matters greatly',
      etiquette: [
        'Use both hands to give and receive, and to pour drinks for elders.',
        'Remove shoes when entering homes and many traditional restaurants.',
        'Don’t stick chopsticks upright in rice or write names in red.',
        'Tipping is not customary and can confuse; service is included.',
      ],
      festivals: [
        {
          name: 'Cherry Blossom Festival',
          when: 'April',
          description:
            'Blossom-lined streets and riverbanks fill with strollers, picnics and night-lit walks.',
        },
        {
          name: 'Lotus Lantern Festival (Yeon Deung Hoe)',
          when: 'May',
          description:
            'A glowing parade of thousands of lanterns celebrates the Buddha’s birthday through the city.',
        },
        {
          name: 'Chuseok',
          when: 'September/October',
          description:
            'Korea’s harvest thanksgiving, when families reunite, honour ancestors and share songpyeon rice cakes.',
        },
      ],
    },

    heroQuote: 'Where royal palaces, neon nightlife and K-pop energy pulse in one electric city.',
    heroMedia: {
      title: 'Palace Roofs and City Lights',
      imageQuery: 'Gyeongbokgung palace Seoul skyline night',
      atmosphere: 'Crisp city air, the sizzle of street grills and neon reflecting in the river.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Seoul skyline mountains Han river aerial',
        description: 'A vast city of towers spreads between mountains and the Han.',
      },
      {
        title: 'The Palace',
        imageQuery: 'Gyeongbokgung palace Seoul hanbok guards',
        description: 'You wander royal palaces among visitors in flowing hanbok.',
      },
      {
        title: 'The Market',
        imageQuery: 'Seoul street food market grilling night',
        description: 'Street stalls fire up tteokbokki, skewers and sizzling pork.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'N Seoul Tower Namsan sunset city',
        description: 'From Namsan the whole city glows as the sun sinks.',
      },
      {
        title: 'Night',
        imageQuery: 'Seoul Hongdae neon nightlife crowd',
        description: 'Hongdae lights up with K-pop, neon and the surge of the night.',
      },
    ],

    photoCollections: {
      hero: ['Gyeongbokgung Palace Seoul', 'N Seoul Tower night', 'Bukchon Hanok Village Seoul'],
      nature: ['Bukhansan Seoul mountains', 'Han River Seoul', 'Seoul cherry blossom spring'],
      culture: ['hanbok Seoul palace', 'Seoul temple lantern festival', 'Seoul changing of the guard'],
      food: ['Korean BBQ Seoul', 'bibimbap Korean food', 'Seoul street food tteokbokki'],
      night: ['Seoul night skyline lights', 'Hongdae Seoul nightlife neon', 'Myeongdong Seoul night'],
      hidden: ['Ihwa mural village Seoul', 'Seongsu cafe district Seoul', 'Bukhansan hiking view Seoul'],
    },

    ambience: {
      soundscape: ['K-pop from shop fronts', 'Sizzling barbecue grills', 'Palace guard drums', 'The hum of the city at night'],
      musicStyle: 'K-pop and Korean indie, with traditional gugak undertones',
      weatherMood: 'Crisp and energetic, blossom-soft in spring, neon-bright at night',
    },

    story:
      'Seoul runs on a current you can feel the moment you arrive — a city of ten million that somehow moves like one organism, ultra-modern and yet wrapped around five-hundred-year-old palaces. You can spend a morning in old Korea, drifting through the tiled courtyards of Gyeongbokgung in a rented hanbok, watching the changing of the guard beneath a mountain, then turn a corner into the future: glass towers, robot cafés, the slick subway, and the relentless gloss of K-pop pouring from every storefront. The two Seouls don’t fight; they fold into each other. The city’s real pulse is in its food and its nights — Korean barbecue grilled at your table and washed down with soju, street stalls steaming with spicy rice cakes, the warehouse cafés of Seongsu, the crush of Hongdae after midnight. And then, a short drive north, the energy stops dead at the world’s most heavily armed border, a reminder of the tension this glittering city lives beside. Seoul is exhilarating, generous and surprisingly soulful — a place that works hard, plays harder, and never quite stops moving.',

    experiences: [
      'Wander the palaces in a rented hanbok',
      'Korean BBQ and soju with the locals',
      'Sunset over the city from N Seoul Tower',
      'Street-food crawl through Myeongdong',
      'Day trip to the DMZ border with North Korea',
      'Explore the hanok lanes of Bukchon',
      'Café-hop the warehouses of Seongsu',
      'Cherry-blossom or autumn-foliage walk by the Han',
    ],

    moods: ['Vibrant', 'Urban', 'Foodie', 'Cultural', 'Nightlife'],
    travelStyle: ['Solo', 'Couples', 'Friends', 'Foodies'],

    aiSummary:
      'Seoul is electric and endlessly layered — royal palaces, hanok villages, world-class food, K-pop nightlife and mountain hikes, all in one ultra-modern megacity. It suits solo travellers, couples, friends and foodies who want urban energy, culture and great eating over beaches or relaxation. Visit April for cherry blossom or October for crisp autumn colour. Safe, hyper-connected, clean and efficient but fast-paced, it rewards curious city travellers, with the DMZ and mountains within easy reach. Choose Seoul to ride the pulse of modern Asia without losing its ancient heart.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 41. TOKYO, JAPAN
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    continent: 'Asia',
    lat: 35.6762,
    lng: 139.6503,
    flag: '🇯🇵',
    capital: 'Tokyo',
    population: 13960000,
    bestSeason: 'Late March–April for cherry blossom; November for autumn colour',
    budget: 'Premium · ¥12,000–25,000 / day',
    timezone: 'JST (UTC+9)',

    wonders: [
      {
        name: 'Shibuya Crossing',
        description:
          'The world’s busiest pedestrian scramble, a hypnotic tide of thousands surging across beneath a canyon of giant screens.',
        imageQuery: 'Shibuya Crossing Tokyo night crowd',
      },
      {
        name: 'Senso-ji & Asakusa',
        description:
          'Tokyo’s oldest temple, approached through a giant red lantern gate and a bustling lane of traditional snack stalls.',
        imageQuery: 'Senso-ji temple Asakusa Tokyo lantern',
      },
      {
        name: 'Meiji Shrine & Harajuku',
        description:
          'A serene forest shrine moments from Harajuku’s wild youth fashion — Tokyo’s calm and chaos side by side.',
        imageQuery: 'Meiji Shrine Tokyo forest torii',
      },
      {
        name: 'Tokyo Skytree & the skyline',
        description:
          'A 634-metre tower over an endless sea of neon and rooftops, with Mount Fuji floating on the horizon on clear days.',
        imageQuery: 'Tokyo Skytree skyline Mount Fuji',
      },
    ],

    hiddenGems: [
      {
        name: 'Golden Gai',
        description:
          'A warren of six narrow alleys packed with tiny, idiosyncratic bars seating just a handful of drinkers each.',
        imageQuery: 'Golden Gai Shinjuku Tokyo tiny bars night',
      },
      {
        name: 'Shimokitazawa',
        description:
          'A bohemian maze of vintage shops, record stores, theatres and coffee houses, free of the big-city glare.',
        imageQuery: 'Shimokitazawa Tokyo vintage street cafe',
      },
      {
        name: 'Yanaka old town',
        description:
          'A rare district that survived the war and the bubble, with wooden houses, a sleepy shopping street and an old cemetery of cherry trees.',
        imageQuery: 'Yanaka Tokyo old town traditional street',
      },
    ],

    food: [
      {
        name: 'Sushi',
        description:
          'From a conveyor belt to a master’s counter, the freshest fish in the world, sliced with reverence over seasoned rice.',
        imageQuery: 'sushi Tokyo omakase counter',
      },
      {
        name: 'Ramen',
        description:
          'Endless regional bowls of rich broth and springy noodles, slurped at counters from tonkotsu to shoyu to tsukemen.',
        imageQuery: 'ramen bowl Tokyo counter',
      },
      {
        name: 'Tempura & tonkatsu',
        description:
          'Feather-light battered seafood and vegetables, and golden panko-crusted pork cutlets, fried to perfection.',
        imageQuery: 'tempura tonkatsu Japanese fried',
      },
      {
        name: 'Izakaya small plates',
        description:
          'Yakitori skewers, edamame and sashimi over cold beer and sake in a smoky after-work tavern.',
        imageQuery: 'izakaya yakitori Tokyo small plates',
      },
    ],

    adventures: [
      {
        name: 'Day trip to Mount Fuji & Hakone',
        description:
          'A scenic escape to lakes, hot springs and the perfect cone of Fuji reflected in the water.',
        imageQuery: 'Mount Fuji Hakone lake Japan',
      },
      {
        name: 'teamLab digital art',
        description:
          'Wandering immersive, ever-shifting rooms of light and projection that respond to your every move.',
        imageQuery: 'teamLab Tokyo digital art lights',
      },
      {
        name: 'Tsukiji & Toyosu food tour',
        description:
          'Grazing the outer market’s stalls for tamago, sea urchin and grilled skewers before the day heats up.',
        imageQuery: 'Tsukiji outer market Tokyo food stalls',
      },
    ],

    seasons: {
      spring:
        'Late March–April brings the famous cherry blossom, filling parks and riverbanks with pink and picnics.',
      summer:
        'June–August is hot, humid and lively, with rooftop beer gardens, fireworks and summer matsuri festivals.',
      autumn:
        'October–November turns the gardens fiery red and gold under clear, crisp, comfortable skies.',
      winter:
        'December–February is cold but bright and dry, with winter illuminations and clear Mount Fuji views.',
    },

    culture: {
      language: 'Japanese; limited English, but signage and goodwill help',
      religion: 'Shinto and Buddhism, practised side by side',
      greeting: 'A bow rather than a handshake; politeness and consideration are paramount',
      etiquette: [
        'Don’t eat while walking, and keep phone calls off trains.',
        'Remove shoes where indicated, in homes, ryokan and some restaurants.',
        'Don’t tip — it can cause confusion or offence.',
        'Queue neatly, stand on the correct side of escalators and keep your voice low in public.',
      ],
      festivals: [
        {
          name: 'Sanja Matsuri',
          when: 'May',
          description:
            'Asakusa explodes with portable shrines, drummers and crowds in one of Tokyo’s biggest traditional festivals.',
        },
        {
          name: 'Sumida River Fireworks',
          when: 'July',
          description:
            'Tens of thousands of fireworks light the river in a beloved summer tradition.',
        },
        {
          name: 'Hanami (cherry blossom)',
          when: 'Late March–April',
          description:
            'The whole city picnics beneath the blossoms in parks like Ueno and along the Meguro River.',
        },
      ],
    },

    heroQuote: 'Where neon-soaked futures and centuries-old shrines share the same electric breath.',
    heroMedia: {
      title: 'Shibuya in Neon Rain',
      imageQuery: 'Shibuya Tokyo neon night rain crossing',
      atmosphere: 'Glistening streets, a thousand screens and the surge and hush of the great crossing.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Tokyo skyline endless city Fuji aerial',
        description: 'An endless sea of buildings runs to Mount Fuji on the horizon.',
      },
      {
        title: 'The Shrine',
        imageQuery: 'Senso-ji temple Tokyo lantern crowd',
        description: 'You pass beneath a giant red lantern into an ancient temple.',
      },
      {
        title: 'The Crossing',
        imageQuery: 'Shibuya crossing Tokyo crowd screens',
        description: 'A tide of thousands floods Shibuya beneath glowing screens.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Tokyo skyline sunset tower Fuji',
        description: 'From a tower the megacity glows with Fuji catching the light.',
      },
      {
        title: 'Night',
        imageQuery: 'Tokyo Golden Gai alley night bars neon',
        description: 'You duck into a tiny lantern-lit bar in a neon backstreet.',
      },
    ],

    photoCollections: {
      hero: ['Shibuya Crossing Tokyo', 'Senso-ji temple Tokyo', 'Tokyo skyline Mount Fuji'],
      nature: ['Mount Fuji Japan lake', 'Shinjuku Gyoen garden Tokyo', 'Meguro river cherry blossom Tokyo'],
      culture: ['Meiji Shrine Tokyo torii', 'Harajuku fashion Tokyo', 'Tokyo temple festival mikoshi'],
      food: ['sushi Tokyo counter', 'ramen Tokyo bowl', 'izakaya yakitori Tokyo'],
      night: ['Shibuya night neon Tokyo', 'Golden Gai Tokyo bars night', 'Shinjuku Tokyo nightlife lights'],
      hidden: ['Golden Gai Tokyo alley', 'Shimokitazawa Tokyo street', 'Yanaka old town Tokyo'],
    },

    ambience: {
      soundscape: ['Train station jingles', 'Pachinko parlour clatter', 'Temple bells in a quiet lane', 'The hum of a thousand neon signs'],
      musicStyle: 'City pop, ambient electronica and traditional koto',
      weatherMood: 'Electric and humming, blossom-soft in spring, neon-bright by night',
    },

    story:
      'Tokyo is too big to understand and too compelling to stop trying. It’s thirteen million people and a hundred cities in one, and it runs with a quiet, almost spiritual efficiency that makes the chaos feel calm. You can stand at Shibuya Crossing and watch a thousand strangers flood past in perfect, polite synchrony beneath a canyon of screens, then walk five minutes into a hushed shrine forest where the only sound is gravel and a hand-clap of prayer. That’s the magic of Tokyo: the future and the centuries-old sit shoulder to shoulder, and neither seems to mind. You eat the best meal of your life standing at a six-seat ramen counter, then the best meal of your life again the next night at a sushi bar the size of a hallway. You get lost in Golden Gai’s lantern-lit alleys, in the vintage warren of Shimokitazawa, in a department-store basement that is somehow an entire world of food. Tokyo never fully reveals itself — there’s always another lane, another tiny bar, another secret — and that endlessness is exactly why you’ll want to come back.',

    experiences: [
      'Witness the scramble at Shibuya Crossing',
      'Sushi or ramen pilgrimage to a master counter',
      'Sunrise temple visit to Senso-ji before the crowds',
      'Bar-hop the tiny alleys of Golden Gai',
      'Day trip to Mount Fuji and Hakone’s hot springs',
      'Lose yourself in teamLab’s digital art',
      'Cherry-blossom picnic in Ueno or along the Meguro',
      'Izakaya crawl for yakitori and sake',
    ],

    moods: ['Urban', 'Foodie', 'Vibrant', 'Cultural', 'Awe'],
    travelStyle: ['Solo', 'Couples', 'Friends', 'Foodies'],

    aiSummary:
      'Tokyo is the ultimate megacity — neon and tradition, the world’s best food, ancient shrines and endless neighbourhoods to get lost in. It suits solo travellers, couples, friends and foodies who want urban energy, culture and dining over beaches or relaxation. Visit late March–April for cherry blossom or November for autumn colour. Spotlessly safe, efficient and deep enough to reward repeat visits, it’s pricier than the rest of Asia but unmatched in variety, with Mount Fuji and Hakone a day trip away. A vivid contrast to serene Kyoto. Choose Tokyo to dive into the most exhilarating city on Earth.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 43. KERALA, INDIA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'kerala',
    name: 'Kerala',
    country: 'India',
    continent: 'Asia',
    lat: 9.4981,
    lng: 76.3388,
    flag: '🇮🇳',
    capital: 'New Delhi',
    population: 35000000,
    bestSeason: 'September–March for dry, green, comfortable days',
    budget: 'Affordable · ₹2,500–7,000 / day',
    timezone: 'IST (UTC+5:30)',

    wonders: [
      {
        name: 'The Backwaters',
        description:
          'A serene web of palm-fringed canals, lakes and rice paddies, drifted slowly by converted rice-barge houseboats.',
        imageQuery: 'Kerala backwaters houseboat palms Alleppey',
      },
      {
        name: 'Munnar tea hills',
        description:
          'Endless emerald tea plantations carpeting the cool Western Ghats, threaded with mist and waterfalls.',
        imageQuery: 'Munnar tea plantation hills Kerala',
      },
      {
        name: 'Fort Kochi',
        description:
          'A salt-stained colonial port of Chinese fishing nets, spice warehouses, an old synagogue and faded Portuguese churches.',
        imageQuery: 'Fort Kochi Chinese fishing nets Kerala',
      },
      {
        name: 'Kathakali theatre',
        description:
          'A mesmerising classical dance-drama of elaborate green-and-red makeup, mudras and storytelling honed over centuries.',
        imageQuery: 'Kathakali dancer Kerala makeup',
      },
    ],

    hiddenGems: [
      {
        name: 'Wayanad',
        description:
          'A misty northern highland of spice plantations, ancient caves, waterfalls and wildlife far off the tourist trail.',
        imageQuery: 'Wayanad Kerala misty hills plantation',
      },
      {
        name: 'Varkala cliffs',
        description:
          'A dramatic red-laterite cliff above a beach where mineral springs meet the Arabian Sea, calmer than Goa.',
        imageQuery: 'Varkala cliff beach Kerala Arabian sea',
      },
      {
        name: 'Theyyam ritual',
        description:
          'A trance ritual of north Kerala where costumed performers become living gods in fire-lit village shrines.',
        imageQuery: 'Theyyam ritual Kerala costume fire',
      },
    ],

    food: [
      {
        name: 'Sadya',
        description:
          'A vegetarian feast of rice and a dozen curries, pickles and payasam served on a banana leaf, eaten with the hand.',
        imageQuery: 'Kerala sadya banana leaf feast',
      },
      {
        name: 'Karimeen pollichathu',
        description:
          'Pearl-spot fish marinated in spices and grilled in a banana-leaf parcel — the taste of the backwaters.',
        imageQuery: 'karimeen pollichathu Kerala fish banana leaf',
      },
      {
        name: 'Appam with stew',
        description:
          'Lacy, bowl-shaped fermented rice pancakes soaked in a fragrant coconut-milk vegetable or meat stew.',
        imageQuery: 'appam stew Kerala coconut',
      },
      {
        name: 'Filter coffee & coconut',
        description:
          'Strong South Indian filter coffee and the sweet water of fresh green coconut against the tropical heat.',
        imageQuery: 'South Indian filter coffee Kerala',
      },
    ],

    adventures: [
      {
        name: 'Backwater houseboat cruise',
        description:
          'An overnight on a thatched houseboat, gliding past village life with meals cooked fresh on board.',
        imageQuery: 'Kerala houseboat backwaters cruise sunset',
      },
      {
        name: 'Periyar wildlife & spice trek',
        description:
          'Boat safaris and guided walks for elephants and birds amid the cardamom hills of Thekkady.',
        imageQuery: 'Periyar wildlife Kerala elephant lake',
      },
      {
        name: 'Ayurveda & yoga retreat',
        description:
          'Kerala is the home of Ayurveda — herbal massage, oil treatments and yoga at a riverside or beachside retreat.',
        imageQuery: 'Ayurveda massage Kerala wellness',
      },
    ],

    seasons: {
      spring:
        'March–May is hot and humid on the coast but cooler and pleasant up in the tea hills.',
      summer:
        'June–August is the dramatic monsoon — lush, green and atmospheric, and prime Ayurveda season.',
      autumn:
        'September–October freshens after the rains, with vivid green landscapes and the spectacular Onam festival.',
      winter:
        'November–March is the ideal season — warm, dry, sunny days, perfect for backwaters, hills and beaches.',
    },

    culture: {
      language: 'Malayalam; English widely spoken',
      religion: 'A long-harmonious mix of Hindu, Christian and Muslim communities',
      greeting: 'Palms together with "Namaskaram"; Keralans are warm and literate',
      etiquette: [
        'Dress modestly, covering shoulders and knees at temples (some admit only Hindus).',
        'Remove shoes before entering temples and homes.',
        'Eat with your right hand, especially a banana-leaf sadya.',
        'Ask before photographing rituals like Theyyam and Kathakali performers.',
      ],
      festivals: [
        {
          name: 'Onam',
          when: 'August/September',
          description:
            'Kerala’s grand harvest festival — flower carpets, banana-leaf feasts, snake-boat races and dancing.',
        },
        {
          name: 'Nehru Trophy Boat Race',
          when: 'August',
          description:
            'Thunderous 100-rower snake boats race across the backwaters before roaring crowds.',
        },
        {
          name: 'Thrissur Pooram',
          when: 'April/May',
          description:
            'A spectacular temple festival of caparisoned elephants, parasols, drumming and fireworks.',
        },
      ],
    },

    heroQuote: 'Where palm-shaded waters drift past green hills in God’s own country.',
    heroMedia: {
      title: 'Backwaters at Golden Hour',
      imageQuery: 'Kerala backwaters houseboat sunset palms',
      atmosphere: 'Warm humid stillness, the splash of an oar and birdsong over glassy palm-lined water.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Kerala backwaters palms canals aerial green',
        description: 'A green world of palms, canals and paddies opens to the sea.',
      },
      {
        title: 'The Houseboat',
        imageQuery: 'Kerala houseboat backwaters thatched',
        description: 'A thatched houseboat drifts you slowly past village life.',
      },
      {
        title: 'The Hills',
        imageQuery: 'Munnar tea hills Kerala mist green',
        description: 'You climb into cool, misty hills carpeted in tea.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Kerala backwaters sunset fishing nets',
        description: 'The water turns gold as fishermen lower their nets.',
      },
      {
        title: 'Night',
        imageQuery: 'Kathakali performance Kerala night lamp',
        description: 'By lamplight, a Kathakali god comes slowly to life.',
      },
    ],

    photoCollections: {
      hero: ['Kerala backwaters houseboat', 'Munnar tea hills Kerala', 'Fort Kochi Chinese fishing nets'],
      nature: ['Kerala palm backwaters canal', 'Munnar tea plantation mist', 'Periyar lake Kerala wildlife'],
      culture: ['Kathakali Kerala dancer', 'Kerala Theyyam ritual', 'Kerala snake boat race'],
      food: ['Kerala sadya banana leaf', 'Kerala fish curry coconut', 'appam stew Kerala'],
      night: ['Kerala houseboat night lights', 'Kathakali night performance Kerala', 'Kerala temple festival night'],
      hidden: ['Wayanad Kerala hills', 'Varkala cliff beach Kerala', 'Kerala Ayurveda retreat'],
    },

    ambience: {
      soundscape: ['Oars dipping in still water', 'Birdsong over the paddies', 'Chenda drums at a temple', 'Monsoon rain on palm leaves'],
      musicStyle: 'Carnatic classical and Kerala chenda percussion',
      weatherMood: 'Warm, humid and lush green, soft on glassy water',
    },

    story:
      'Kerala calls itself God’s Own Country, and after a few slow days you stop arguing. This thin, green ribbon along India’s southwest coast moves to a gentler rhythm than the rest of the country — its currency is shade, water and time. You board a houseboat, a great thatched barge that once carried rice, and drift for a day and a night through the backwaters: a labyrinth of palm-lined canals and glassy lagoons where village life unfolds at the water’s edge — women washing clothes, children waving from the banks, a fisherman casting a net into the gold of evening, the cook on your boat frying a just-caught fish in coconut and spice. Then the land tilts upward into the Western Ghats, where mist pours over endless emerald tea plantations and the air turns cool and fragrant with cardamom. You eat a feast of a dozen curries off a banana leaf with your fingers, take an Ayurvedic massage in a place that invented the practice, and watch a Kathakali god come to life by lamplight. Kerala doesn’t overwhelm you like northern India. It simply, slowly, soothes.',

    experiences: [
      'Overnight houseboat cruise through the backwaters',
      'Stay among the tea plantations of Munnar',
      'Banana-leaf sadya feast eaten by hand',
      'Ayurvedic massage and treatment',
      'Watch a Kathakali dance-drama performance',
      'Wildlife boat safari in Periyar',
      'Wander colonial Fort Kochi and its fishing nets',
      'Spice-plantation walk in the cardamom hills',
    ],

    moods: ['Relaxation', 'Nature', 'Cultural', 'Wellness', 'Romantic'],
    travelStyle: ['Couples', 'Family', 'Slow Travel', 'Wellness Seekers'],

    aiSummary:
      'Kerala is South India’s tranquil green heart — palm-lined backwaters, misty tea hills, Ayurveda, spice and gentle coastal culture. It suits couples, families, wellness-seekers and slow travellers who want calm, nature and culture over the intensity of northern India. Visit September–March for dry, lush, comfortable days; the monsoon is atmospheric and the prime Ayurveda season. Affordable and soothing, it combines houseboat cruises, hill stations, wildlife and beaches in one compact region. A serene counterpoint to Rajasthan’s desert palaces. Choose Kerala to slow right down in God’s own country.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 46. HALONG BAY, VIETNAM
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'halong-bay',
    name: 'Halong Bay',
    country: 'Vietnam',
    continent: 'Asia',
    lat: 20.9101,
    lng: 107.1839,
    flag: '🇻🇳',
    capital: 'Hanoi',
    population: 300000,
    bestSeason: 'October–April for cool, dry, clear cruising days',
    budget: 'Moderate · $60–150 / day including a cruise',
    timezone: 'ICT (UTC+7)',

    wonders: [
      {
        name: 'The limestone karsts',
        description:
          'Nearly two thousand jungle-topped limestone islands and pinnacles rising sheer from emerald water in a drowned dragon’s landscape.',
        imageQuery: 'Halong Bay limestone karsts emerald water',
      },
      {
        name: 'Sung Sot Cave',
        description:
          'A vast, theatrically lit "Surprise Cave" of cathedral chambers, stalactites and stalagmites inside an island.',
        imageQuery: 'Sung Sot Cave Halong Bay stalactites',
      },
      {
        name: 'Ti Top Island viewpoint',
        description:
          'A steep climb to a panorama over the bay’s scattered islands and the boats threading between them.',
        imageQuery: 'Ti Top Island Halong Bay viewpoint boats',
      },
      {
        name: 'Lan Ha & Cat Ba',
        description:
          'A quieter, equally stunning neighbouring bay off Cat Ba Island, with hidden beaches and far fewer boats.',
        imageQuery: 'Lan Ha Bay Cat Ba Vietnam karst beach',
      },
    ],

    hiddenGems: [
      {
        name: 'Floating fishing villages',
        description:
          'Communities living on rafts and stilted huts among the karsts, paddled between by women in conical hats.',
        imageQuery: 'Halong Bay floating fishing village Vietnam',
      },
      {
        name: 'Dark & Bright Lagoon',
        description:
          'Hidden lagoons reached by kayak through low rock tunnels, opening into still water ringed by towering cliffs.',
        imageQuery: 'Halong Bay kayak lagoon cave tunnel',
      },
      {
        name: 'Bai Tu Long Bay',
        description:
          'The bay’s northern, less-visited extension, just as dramatic but wonderfully peaceful and uncrowded.',
        imageQuery: 'Bai Tu Long Bay Vietnam quiet karst',
      },
    ],

    food: [
      {
        name: 'Fresh seafood on board',
        description:
          'Crab, prawns, squid and fish bought straight from the floating villages and cooked fresh on the cruise deck.',
        imageQuery: 'Halong Bay seafood cruise Vietnam',
      },
      {
        name: 'Chả mực (grilled squid cake)',
        description:
          'The signature dish of Halong — bouncy, savoury cakes of hand-pounded squid, fried golden.',
        imageQuery: 'cha muc grilled squid cake Halong',
      },
      {
        name: 'Bún chả & Hanoi flavours',
        description:
          'Grilled pork with herbs and noodles and other northern-Vietnamese classics from nearby Hanoi.',
        imageQuery: 'bun cha Vietnamese grilled pork noodles',
      },
      {
        name: 'Vietnamese egg coffee',
        description:
          'A rich Hanoi specialty of coffee topped with a whipped, custard-like sweet egg cream.',
        imageQuery: 'Vietnamese egg coffee Hanoi',
      },
    ],

    adventures: [
      {
        name: 'Overnight junk-boat cruise',
        description:
          'Sleeping aboard a traditional-style junk among the karsts, waking to mist and a tai-chi sunrise on deck.',
        imageQuery: 'Halong Bay junk boat cruise overnight',
      },
      {
        name: 'Kayak the hidden lagoons',
        description:
          'Paddling through low caves into secret lagoons and around the base of the towering limestone islands.',
        imageQuery: 'kayaking Halong Bay lagoon karst Vietnam',
      },
      {
        name: 'Cat Ba island & national park',
        description:
          'Hiking the jungle trails and viewpoints of Cat Ba, home to the rare golden-headed langur.',
        imageQuery: 'Cat Ba Island national park Vietnam jungle',
      },
    ],

    seasons: {
      spring:
        'March–April is mild and increasingly hazy, with calm seas and warming days.',
      summer:
        'May–August is hot and humid with the best chance of swimming, but also the storm and typhoon season.',
      autumn:
        'September–November brings the clearest, most comfortable cruising weather of the year.',
      winter:
        'December–February is cool and sometimes misty, atmospheric and quiet, with crisp clear spells.',
    },

    culture: {
      language: 'Vietnamese; English on cruises and in tourist areas',
      religion: 'Mahayana Buddhism, ancestor worship and folk beliefs',
      greeting: 'A nod and "Xin chào"; a smile is the universal opener',
      etiquette: [
        'Don’t litter or drop anything into the bay — the ecosystem is fragile and protected.',
        'Respect the floating-village communities; ask before photographing residents.',
        'Dress modestly when visiting caves and temples.',
        'Tipping cruise crew and guides is customary and appreciated.',
      ],
      festivals: [
        {
          name: 'Halong Carnival',
          when: 'Spring/Summer',
          description:
            'A lively street festival of parades, music and fireworks along the Halong waterfront.',
        },
        {
          name: 'Tết (Lunar New Year)',
          when: 'January/February',
          description:
            'Vietnam’s biggest festival, when the region celebrates with flowers, feasts and family.',
        },
        {
          name: 'Yen Tu Festival',
          when: 'Spring',
          description:
            'A major Buddhist pilgrimage to the nearby sacred mountain of Yen Tu and its cliff pagodas.',
        },
      ],
    },

    heroQuote: 'Where thousands of jade islands rise from the sea like a sleeping dragon’s spine.',
    heroMedia: {
      title: 'Mist over the Karsts',
      imageQuery: 'Halong Bay misty karst sunrise junk boat',
      atmosphere: 'Still, milky morning air, the soft chug of a junk and limestone towers fading into mist.',
    },

    visualJourney: [
      {
        title: 'Arrival',
        imageQuery: 'Halong Bay karsts emerald water aerial',
        description: 'A maze of jade islands rises from a calm emerald sea.',
      },
      {
        title: 'The Cruise',
        imageQuery: 'Halong Bay junk boat sailing karst',
        description: 'A junk threads slowly between the towering limestone pillars.',
      },
      {
        title: 'The Lagoon',
        imageQuery: 'Halong Bay kayak cave lagoon Vietnam',
        description: 'You kayak through a low cave into a hidden, silent lagoon.',
      },
      {
        title: 'Golden Hour',
        imageQuery: 'Halong Bay sunset karst boats golden',
        description: 'The karsts glow and the water gilds as the sun lowers.',
      },
      {
        title: 'Night',
        imageQuery: 'Halong Bay junk boat night lights anchored',
        description: 'Cruise boats lie anchored and lit beneath a starry karst sky.',
      },
    ],

    photoCollections: {
      hero: ['Halong Bay karst junk boat', 'Halong Bay emerald islands aerial', 'Halong Bay limestone pillars'],
      nature: ['Halong Bay misty karst', 'Lan Ha Bay Cat Ba beach', 'Halong Bay jungle island'],
      culture: ['Halong Bay floating village', 'Vietnamese conical hat boat Halong', 'Sung Sot cave Halong'],
      food: ['Halong Bay seafood cruise', 'cha muc squid cake Halong', 'Vietnamese egg coffee'],
      night: ['Halong Bay junk boat night', 'Halong Bay anchored boats stars', 'Halong city night lights'],
      hidden: ['Bai Tu Long Bay Vietnam', 'Halong Bay hidden lagoon kayak', 'Cat Ba national park Vietnam'],
    },

    ambience: {
      soundscape: ['The chug of a junk engine', 'Water lapping against the hull', 'Distant birds on the cliffs', 'Wind through the karst gaps'],
      musicStyle: 'Gentle traditional Vietnamese đàn tranh zither',
      weatherMood: 'Cool, misty and still over jade-green water',
    },

    story:
      'Halong Bay looks less like a place than a painting that someone forgot to finish erasing — thousands of limestone islands, sheer-sided and crowned with jungle, rising straight out of jade-green water and trailing off into the mist until you lose count. Legend says a dragon descended here and its thrashing tail carved the bay; on a still grey morning, with the karsts fading layer by layer into the haze, that explanation feels as good as any. You board a wooden junk and sail slowly out among them, the world reduced to water and stone and silence. You kayak through a low cave that opens into a hidden lagoon ringed by cliffs, swim off the back of the boat into water so green it stains the light, and glide past floating villages where families have lived their whole lives on the sea, paddling between the islands in little round boats. As night falls the junk drops anchor in a sheltered cove, the cook lays out a feast of fresh crab and squid, and the only lights are your boat and the stars — and a thousand dark giants standing watch all around you.',

    experiences: [
      'Overnight cruise on a traditional junk boat',
      'Kayak through caves into hidden lagoons',
      'Explore the vast Sung Sot (Surprise) Cave',
      'Climb Ti Top Island for the bay panorama',
      'Visit a floating fishing village',
      'Sunrise tai chi on the boat deck',
      'Fresh seafood feast cooked on board',
      'Escape to quieter Lan Ha or Bai Tu Long Bay',
    ],

    moods: ['Scenic', 'Relaxation', 'Romantic', 'Nature', 'Awe'],
    travelStyle: ['Couples', 'Family', 'Cruisers', 'Nature Lovers'],

    aiSummary:
      'Halong Bay is one of the world’s natural wonders — thousands of jungle-topped limestone karsts rising from emerald water, best seen from an overnight cruise. It suits couples, families and nature lovers who want scenery, calm and a romantic boat experience over nightlife or city sights. Visit October–April for the clearest, coolest cruising weather. Choose a reputable cruise and consider quieter Lan Ha or Bai Tu Long bays to escape the crowds. Easily paired with Hanoi nearby, it offers kayaking, caves and floating villages. A serene contrast to lantern-lit Hoi An. Choose Halong Bay to sail among a drowned dragon’s islands.',
  },
]
