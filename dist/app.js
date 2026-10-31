"use strict";
(() => {
  // src/data.ts
  var CITIES = {
    "Amsterdam": [52.3676, 4.9041],
    "Rotterdam": [51.9244, 4.4777],
    "Den Haag": [52.0705, 4.3007],
    "Utrecht": [52.0907, 5.1214],
    "Eindhoven": [51.4416, 5.4697],
    "Groningen": [53.2194, 6.5665],
    "Maastricht": [50.8514, 5.691],
    "Haarlem": [52.3874, 4.6462],
    "Leiden": [52.1601, 4.497],
    "Delft": [52.0116, 4.3571],
    "Arnhem": [51.9851, 5.8987],
    "Nijmegen": [51.8126, 5.8372],
    "Zwolle": [52.5168, 6.083],
    "Den Bosch": [51.6978, 5.3037],
    "Breda": [51.5719, 4.7683],
    "Tilburg": [51.5555, 5.0913],
    "Alkmaar": [52.6324, 4.7534],
    "Deventer": [52.2557, 6.1639],
    "Dordrecht": [51.8133, 4.669],
    "Gouda": [52.0115, 4.7105],
    "Amersfoort": [52.1561, 5.3878],
    "Enschede": [52.2215, 6.8937],
    "Almere": [52.3508, 5.2647]
  };
  var CATS = { museum: ["\u{1F3DB}\uFE0F", "Museums"], outdoor: ["\u{1F333}", "Outdoors & nature"], family: ["\u{1F3A2}", "Family & parks"], sight: ["\u{1F4F8}", "Sightseeing"], food: ["\u{1F37A}", "Food & drink"], wellness: ["\u{1F9D6}", "Wellness"], seasonal: ["\u2728", "Seasonal events"] };
  var ACTS = [
    { id: 1, n: "Rijksmuseum", city: "Amsterdam", ll: [52.36, 4.885], cat: "museum", in: true, a: 25, c: 0, d: 3, kid: true, desc: "Rembrandt's Night Watch, Vermeer and 800 years of Dutch art. Under 18s free." },
    { id: 2, n: "Van Gogh Museum", city: "Amsterdam", ll: [52.358, 4.881], cat: "museum", in: true, a: 22, c: 0, d: 2, kid: true, desc: "The world's largest Van Gogh collection. Book a timeslot in advance." },
    { id: 3, n: "Anne Frank House", city: "Amsterdam", ll: [52.375, 4.884], cat: "museum", in: true, a: 16, c: 7, d: 1.5, kid: true, desc: "The secret annex where Anne Frank wrote her diary. Tickets sell out weeks ahead." },
    { id: 4, n: "Canal cruise", city: "Amsterdam", ll: [52.373, 4.89], cat: "sight", in: true, a: 18, c: 10, d: 1.25, kid: true, desc: "Covered glass boat through the UNESCO canal ring \u2014 works in any weather." },
    { id: 5, n: "A'DAM Lookout", city: "Amsterdam", ll: [52.384, 4.902], cat: "sight", in: true, a: 17, c: 9, d: 1.5, kid: true, desc: "360\xB0 view over the city and Europe's highest swing 'Over the Edge'." },
    { id: 6, n: "NEMO Science Museum", city: "Amsterdam", ll: [52.374, 4.912], cat: "family", in: true, a: 17.5, c: 17.5, d: 3, kid: true, desc: "Five floors of hands-on science, plus a free rooftop terrace." },
    { id: 7, n: "Artis Zoo", city: "Amsterdam", ll: [52.366, 4.917], cat: "family", in: false, a: 28, c: 24, d: 4, kid: true, desc: "Historic city zoo with aquarium, planetarium and Micropia." },
    { id: 8, n: "Heineken Experience", city: "Amsterdam", ll: [52.357, 4.892], cat: "food", in: true, a: 23, c: null, d: 1.5, kid: false, desc: "Interactive brewery tour with tasting. 18+ only." },
    { id: 9, n: "Waterland bike ride", city: "Amsterdam", ll: [52.42, 4.98], cat: "outdoor", in: false, a: 15, c: 10, d: 4, kid: true, desc: "Rent bikes and ride to Broek in Waterland & Marken \u2014 polders, dikes, cows." },
    { id: 10, n: "Zaanse Schans windmills", city: "Zaandam", ll: [52.474, 4.817], cat: "sight", in: false, a: 6, c: 4, d: 3, kid: true, desc: "Working windmills, clog maker and cheese farm. Village free; price is a windmill visit." },
    { id: 11, n: "Keukenhof tulip gardens", city: "Lisse", ll: [52.27, 4.546], cat: "seasonal", in: false, a: 21, c: 10, d: 3.5, kid: true, m: [3, 4, 5], desc: "7 million flowering bulbs. Only open mid-March to mid-May." },
    { id: 12, n: "Teylers Museum", city: "Haarlem", ll: [52.38, 4.64], cat: "museum", in: true, a: 17.5, c: 4, d: 2, kid: true, desc: "The oldest museum in NL: fossils, instruments and art in a time-capsule building." },
    { id: 13, n: "Zandvoort beach & dunes", city: "Zandvoort", ll: [52.371, 4.533], cat: "outdoor", in: false, a: 0, c: 0, d: 4, kid: true, desc: "Beach walk and the Kennemerduinen dunes with wild bison. Free." },
    { id: 14, n: "Naturalis Biodiversity Center", city: "Leiden", ll: [52.165, 4.474], cat: "family", in: true, a: 19, c: 15, d: 3, kid: true, desc: "Real T-rex 'Trix', dinosaurs and a huge natural history collection." },
    { id: 15, n: "Mauritshuis", city: "Den Haag", ll: [52.08, 4.314], cat: "museum", in: true, a: 19.5, c: 0, d: 1.5, kid: true, desc: "Girl with a Pearl Earring and Dutch Golden Age masters. Under 19s free." },
    { id: 16, n: "Madurodam", city: "Den Haag", ll: [52.099, 4.299], cat: "family", in: false, a: 22, c: 22, d: 2.5, kid: true, desc: "The whole of Holland in miniature. Interactive and great with kids." },
    { id: 17, n: "Scheveningen beach & pier", city: "Den Haag", ll: [52.108, 4.273], cat: "outdoor", in: false, a: 0, c: 0, d: 3, kid: true, desc: "Boulevard, pier, beach clubs and fresh herring. Free." },
    { id: 18, n: "Royal Delft factory", city: "Delft", ll: [52.016, 4.367], cat: "museum", in: true, a: 18, c: 10, d: 1.5, kid: true, desc: "See Delft Blue pottery hand-painted since 1653. Combine with Delft's old centre." },
    { id: 19, n: "Kinderdijk windmills", city: "Kinderdijk", ll: [51.885, 4.639], cat: "sight", in: false, a: 20, c: 11, d: 3, kid: true, desc: "19 historic windmills (UNESCO). Go by Waterbus from Rotterdam." },
    { id: 20, n: "Euromast", city: "Rotterdam", ll: [51.905, 4.467], cat: "sight", in: true, a: 19, c: 12, d: 1.5, kid: true, desc: "185 m tower with panoramic views of the skyline and port." },
    { id: 21, n: "Spido harbour tour", city: "Rotterdam", ll: [51.909, 4.48], cat: "sight", in: true, a: 19, c: 11.5, d: 1.25, kid: true, desc: "Boat tour through one of the world's largest ports." },
    { id: 22, n: "Markthal & Cube Houses", city: "Rotterdam", ll: [51.92, 4.487], cat: "food", in: true, a: 3.5, c: 2.5, d: 2, kid: true, desc: "Iconic food market hall; price is entry to the show Cube House next door." },
    { id: 23, n: "Depot Boijmans Van Beuningen", city: "Rotterdam", ll: [51.913, 4.47], cat: "museum", in: true, a: 20, c: 0, d: 2, kid: true, desc: "Mirror-glass art depot with 150,000 works and a rooftop forest." },
    { id: 24, n: "Diergaarde Blijdorp", city: "Rotterdam", ll: [51.927, 4.449], cat: "family", in: false, a: 26, c: 21, d: 4, kid: true, desc: "Big zoo with the Oceanium aquarium." },
    { id: 25, n: "Dom Tower climb", city: "Utrecht", ll: [52.091, 5.121], cat: "sight", in: true, a: 14, c: 9, d: 1.25, kid: true, desc: "465 steps up the tallest church tower in NL (guided)." },
    { id: 26, n: "Miffy Museum", city: "Utrecht", ll: [52.086, 5.122], cat: "family", in: true, a: 10, c: 10, d: 1.5, kid: true, desc: "Play museum for little ones (2\u20136) in Miffy's home town." },
    { id: 27, n: "Efteling theme park", city: "Kaatsheuvel", ll: [51.65, 5.043], cat: "family", in: false, a: 46, c: 46, d: 8, kid: true, desc: "Fairy-tale theme park; Winter Efteling runs Nov\u2013Jan. Cheaper online." },
    { id: 28, n: "Hoge Veluwe & Kr\xF6ller-M\xFCller", city: "Otterlo", ll: [52.095, 5.81], cat: "outdoor", in: false, a: 25, c: 12.5, d: 5, kid: true, desc: "National park with free white bikes, plus a world-class Van Gogh collection." },
    { id: 29, n: "Burgers' Zoo", city: "Arnhem", ll: [52.006, 5.9], cat: "family", in: false, a: 29, c: 27, d: 5, kid: true, desc: "Indoor tropical jungle, desert and ocean \u2014 good even in bad weather." },
    { id: 30, n: "Netherlands Open Air Museum", city: "Arnhem", ll: [52.009, 5.909], cat: "museum", in: false, a: 22, c: 17, d: 4, kid: true, desc: "Walk through historic Dutch farms, trams and villages." },
    { id: 31, n: "Giethoorn whisper boat", city: "Giethoorn", ll: [52.739, 6.077], cat: "outdoor", in: false, a: 0, c: 0, g: { p: 90, size: 6 }, d: 3, kid: true, m: [3, 4, 5, 6, 7, 8, 9, 10], desc: "Sail yourself through the car-free village of canals. Price is per boat (max 6)." },
    { id: 32, n: "Texel day trip + Ecomare", city: "Texel", ll: [52.96, 4.76], cat: "outdoor", in: false, a: 22, c: 17, d: 7, kid: true, desc: "Ferry from Den Helder, seal sanctuary, dunes and beaches. Includes foot-passenger ferry." },
    { id: 33, n: "Wadlopen (mudflat hiking)", city: "Pieterburen", ll: [53.4, 6.45], cat: "outdoor", in: false, a: 25, c: 20, d: 3.5, kid: true, m: [5, 6, 7, 8, 9], desc: "Guided walk across the Wadden Sea seabed at low tide. Kids 12+." },
    { id: 34, n: "Groninger Museum", city: "Groningen", ll: [53.212, 6.566], cat: "museum", in: true, a: 17, c: 5, d: 2, kid: true, desc: "Wildly colourful museum building with modern art and design." },
    { id: 35, n: "Maastricht caves (Grotten Noord)", city: "Maastricht", ll: [50.83, 5.69], cat: "sight", in: true, a: 9.5, c: 7, d: 1, kid: true, desc: "Guided walk through centuries-old marl tunnels under Mount Saint Peter." },
    { id: 37, n: "Amsterdam Light Festival cruise", city: "Amsterdam", ll: [52.37, 4.9], cat: "seasonal", in: true, a: 25, c: 15, d: 1.25, kid: true, m: [11, 12, 1], desc: "Light artworks along the canals, late Nov to mid-Jan." },
    { id: 38, n: "Thermae 2000 spa day", city: "Valkenburg", ll: [50.86, 5.84], cat: "wellness", in: true, a: 45, c: null, d: 5, kid: false, desc: "Thermal baths and saunas on a hill top. 16+ in the sauna area." },
    { id: 39, n: "Biesbosch National Park boat tour", city: "Drimmelen", ll: [51.706, 4.803], cat: "outdoor", in: false, a: 15, c: 9, d: 2.5, kid: true, desc: "Freshwater tidal wetlands with beavers and sea eagles." },
    { id: 40, n: "Philips Museum", city: "Eindhoven", ll: [51.44, 5.475], cat: "museum", in: true, a: 12, c: 6, d: 1.5, kid: true, desc: "From the first light bulb to modern tech, in Philips' original factory." },
    { id: 41, n: "Dolfinarium", city: "Harderwijk", ll: [52.343, 5.62], cat: "family", in: false, a: 35, c: 35, d: 5, kid: true, m: [3, 4, 5, 6, 7, 8, 9, 10], desc: "Marine park with dolphin and sea-lion shows." },
    { id: 42, n: "Walibi Holland", city: "Biddinghuizen", ll: [52.44, 5.758], cat: "family", in: false, a: 40, c: 40, d: 7, kid: true, m: [4, 5, 6, 7, 8, 9, 10], desc: "Roller coasters and thrill rides; Fright Nights in October." },
    { id: 43, n: "Winter ice skating rink", city: "Utrecht", ll: [52.09, 5.12], cat: "seasonal", in: false, a: 10, c: 8, d: 1.5, kid: true, m: [11, 12, 1, 2], desc: "Pop-up city ice rinks appear in most big cities in winter. Skate rental incl." }
  ];
  var MARKETS = [
    {
      id: 1,
      n: "Kerstmarkt Gemeentegrot",
      city: "Valkenburg",
      ll: [50.8636, 5.8312],
      start: "2026-11-13",
      end: "2026-12-30",
      closed: ["2026-12-25"],
      in: true,
      a: 11.3,
      c: 6.8,
      d: 1.5,
      hrs: "Mon\u2013Fri 11:00\u201319:00 \xB7 Sat\u2013Sun 10:00\u201319:00",
      price: "\u20AC11.30 Fri\u2013Sun, \u20AC9.30 Mon\u2013Thu (online) \xB7 kids 5\u201311 \u20AC6.80 \xB7 0\u20134 free with ticket",
      desc: "Europe's largest underground Christmas market, in the marl tunnels under the Cauberg. Book a timeslot online \u2014 weekends sell out first."
    },
    {
      id: 2,
      n: "Kerstmarkt Fluweelengrot",
      city: "Valkenburg",
      ll: [50.8653, 5.8295],
      start: "2026-11-13",
      end: "2026-12-30",
      closed: ["2026-12-25"],
      in: true,
      a: 10,
      c: 7,
      est: true,
      d: 1.5,
      hrs: "Daily, approx. 10:00/11:00\u201319:00",
      price: "About \u20AC10 adult (estimate) \xB7 combi ticket with the castle ruin online",
      desc: "Smaller cave market under the castle ruin, with a North Pole theme and an 18th-century underground chapel."
    },
    {
      id: 3,
      n: "Kerststad Valkenburg (town & parade)",
      city: "Valkenburg",
      ll: [50.865, 5.832],
      start: "2026-11-13",
      end: "2027-01-03",
      in: false,
      a: 0,
      c: 0,
      d: 3,
      hrs: "Town centre all day \xB7 parade on selected evenings",
      price: "Free (cave markets & attractions paid separately)",
      desc: "The whole town becomes a Christmas town: lights, Santa's village and the free Landal Christmas Parade."
    },
    {
      id: 4,
      n: "Magisch Maastricht Vrijthof",
      city: "Maastricht",
      ll: [50.8486, 5.6889],
      start: "2026-11-27",
      end: "2026-12-27",
      in: false,
      a: 0,
      c: 0,
      d: 3,
      hrs: "Day and evening",
      price: "Free entry \xB7 ice rink & rides paid",
      desc: "Christmas market, ice rink, Ferris wheel and Alpine huts on Maastricht's most beautiful square."
    },
    {
      id: 5,
      n: "Royal Christmas Fair",
      city: "Den Haag",
      ll: [52.0817, 4.3147],
      start: "2026-12-03",
      end: "2026-12-23",
      in: false,
      a: 0,
      c: 0,
      d: 2.5,
      hrs: "Daily 12:00\u201321:00",
      price: "Free",
      desc: "About 100 chalets on the stately Lange Voorhout, with fires, choirs, storytellers and Santa."
    },
    {
      id: 6,
      n: "Kerstmarkt Haarlem",
      city: "Haarlem",
      ll: [52.3812, 4.6364],
      start: "2026-12-11",
      end: "2026-12-13",
      in: false,
      a: 0,
      c: 0,
      d: 3,
      hrs: "Fri\u2013Sat 10:30\u201320:00 \xB7 Sun 10:30\u201319:00",
      price: "Free",
      desc: "Nearly 350 stalls across 12 spots in the old centre, around the Grote Markt and St. Bavo church."
    },
    {
      id: 7,
      n: "Dickens Festijn",
      city: "Deventer",
      ll: [52.2513, 6.159],
      start: "2026-12-12",
      end: "2026-12-13",
      in: false,
      a: 7.75,
      c: 7.75,
      d: 3,
      hrs: "10:00\u201317:00 \xB7 timeslot required",
      price: "\u20AC7.50 online + \u20AC0.25 fee \xB7 under 7 free",
      desc: "Hundreds of costumed characters bring Dickens' 19th-century England to life in the Bergkwartier. Expect queues."
    },
    {
      id: 8,
      n: "Dordtse Decembermarkt",
      city: "Dordrecht",
      ll: [51.8133, 4.669],
      start: "2026-12-10",
      end: "2026-12-13",
      in: false,
      a: 0,
      c: 0,
      d: 2.5,
      hrs: "Part of the Dordtse Decemberdagen (10 Dec \u2013 3 Jan)",
      price: "Free",
      desc: "Christmas market in the historic centre, with a winter square and skating during the Decemberdagen."
    },
    {
      id: 9,
      n: "Nostalgische Kerstmarkt Leiden",
      city: "Leiden",
      ll: [52.1583, 4.4931],
      days: ["2026-12-11", "2026-12-12", "2026-12-13", "2026-12-17", "2026-12-18", "2026-12-19", "2026-12-20"],
      in: false,
      a: 0,
      c: 0,
      d: 2,
      hrs: "Two long weekends",
      price: "Free",
      desc: "Nostalgic market along Leiden's canals, spread over two long weekends."
    },
    {
      id: 10,
      n: "Kerstmarkt Vesting Bourtange",
      city: "Bourtange",
      ll: [53.0071, 7.1917],
      days: ["2026-12-05", "2026-12-06", "2026-12-12", "2026-12-13", "2026-12-19", "2026-12-20"],
      in: false,
      a: null,
      c: 0,
      d: 3,
      hrs: "Sat 11:00\u201321:00 \xB7 Sun 11:00\u201318:00",
      price: "Paid entry (see website) \xB7 kids 0\u20135 free \xB7 free parking",
      desc: "Christmas market inside a star-shaped 16th-century fortress village near the German border."
    },
    {
      id: 11,
      n: "Gouda bij Kaarslicht + Winterfair",
      city: "Gouda",
      ll: [52.0115, 4.7105],
      start: "2026-12-11",
      end: "2026-12-12",
      in: false,
      a: 0,
      c: 0,
      d: 3,
      hrs: "Fri 11:00\u201322:00 (candle-lit evening) \xB7 Sat 10:00\u201317:00",
      price: "Free",
      desc: "The market square lit only by candles and a giant Christmas tree, plus a winter fair the next day."
    },
    {
      id: 12,
      n: "Kerstmarkt Arnhem",
      city: "Arnhem",
      ll: [51.9851, 5.8987],
      start: "2026-12-13",
      end: "2026-12-13",
      in: false,
      a: 0,
      c: 0,
      d: 2.5,
      hrs: "Sunday",
      price: "Free",
      desc: "One-day Christmas market in Arnhem's city centre."
    },
    {
      id: 13,
      n: "Zweedse Kerstmarkt",
      city: "Groningen",
      ll: [53.2194, 6.5665],
      start: "2026-12-12",
      end: "2026-12-13",
      in: true,
      a: null,
      c: 0,
      d: 2,
      hrs: "Sat & Sun",
      price: "See website",
      desc: "Indoor Swedish-style Christmas market \u2014 no cold or rain, with a carrousel, train and Santa for kids."
    },
    {
      id: 14,
      n: "Kerstmarkt Thorn",
      city: "Thorn",
      ll: [51.1617, 5.8417],
      start: "2026-12-13",
      end: "2026-12-13",
      in: false,
      a: 0,
      c: 0,
      d: 2.5,
      hrs: "Sunday",
      price: "Free",
      desc: "Christmas market in 'the white village' of Limburg, among whitewashed historic houses."
    },
    {
      id: 15,
      n: "Kerstmarkten Zeist",
      city: "Zeist",
      ll: [52.0894, 5.2332],
      days: ["2026-12-13", "2026-12-20"],
      in: false,
      a: null,
      c: 0,
      d: 2,
      hrs: "Sundays",
      price: "See website",
      desc: "Two Sunday Christmas markets (after the Sinterfair on 29 Nov)."
    },
    {
      id: 16,
      n: "Christmas Village Amsterdam",
      city: "Amsterdam",
      ll: [52.37, 4.89],
      start: "2026-12-03",
      end: "2026-12-27",
      in: false,
      a: null,
      c: 0,
      d: 2,
      hrs: "Daily",
      price: "See website",
      desc: "Christmas village with chalets and winter food & drinks in Amsterdam."
    },
    {
      id: 17,
      n: "Het Amsterdamse Winterparadijs",
      city: "Amsterdam (RAI)",
      ll: [52.3416, 4.89],
      start: "2026-12-17",
      end: "2027-01-02",
      ind: true,
      in: true,
      a: 18.5,
      c: 18.5,
      est: true,
      d: 4,
      hrs: "Timeslot entry, stay as long as you like",
      price: "From \u20AC18.50 \xB7 price varies per timeslot",
      desc: "55,000 m\xB2 winter event at the RAI: skating, cross-country skiing, shows and an apr\xE8s-ski village. Dates still indicative."
    },
    {
      id: 18,
      n: "Dickensfestijn Drunen",
      city: "Drunen",
      ll: [51.686, 5.13],
      start: "2026-12-19",
      end: "2026-12-20",
      in: false,
      a: null,
      c: 0,
      d: 2.5,
      hrs: "Sat & Sun",
      price: "See website",
      desc: "Smaller Dickens-themed Christmas festival in Brabant."
    },
    {
      id: 19,
      n: "Kerstmarkt Eext",
      city: "Eext",
      ll: [53.0175, 6.7333],
      start: "2026-12-19",
      end: "2026-12-20",
      in: false,
      a: null,
      c: 0,
      d: 2.5,
      hrs: "Sat & Sun",
      price: "See website",
      desc: "Village Christmas market in Drenthe."
    }
  ];

  // src/budget.ts
  var DAYS = ["sat", "sun"];
  function distanceKm(a, b) {
    const R = 6371;
    const r = Math.PI / 180;
    const dLa = (b[0] - a[0]) * r;
    const dLo = (b[1] - a[1]) * r;
    const x = Math.sin(dLa / 2) ** 2 + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin(dLo / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(x)) * 1.3;
  }
  function trainFare(km) {
    const fare = km <= 40 ? 2.6 + 0.26 * km : 13 + 0.17 * (km - 40);
    return Math.min(fare, 30);
  }
  var RAILRUNNER = 2.8;
  function priceFor(item, adults, kids) {
    if (item.g) return Math.ceil((adults + kids) / item.g.size) * item.g.p;
    return item.a * adults + (item.c ?? 0) * kids;
  }
  var adultCost = (item) => item.g ? item.g.p / item.g.size : item.a;
  var STAY = {
    hostelPerPerson: 40,
    hotelPerRoom: 130,
    hotelKidsRoom: 60,
    bnbTotal: 160
  };
  function calculateBudget(plan, s, home) {
    const A = Math.max(1, s.adults || 1);
    const K = Math.max(0, s.kids || 0);
    const P = A + K;
    const overnight = s.stay !== "0";
    const bothDays = plan.sat.length > 0 && plan.sun.length > 0;
    const days = DAYS.filter((d) => plan[d].length).length;
    let tickets = 0;
    let adultsOnlyWarn = false;
    for (const d of DAYS) {
      for (const p of plan[d]) {
        tickets += priceFor(p, A, K);
        if (p.c === null && K > 0) adultsOnlyWarn = true;
      }
    }
    const legs = { sat: 0, sun: 0 };
    let start = home;
    for (const d of DAYS) {
      const items = plan[d];
      if (!items.length) continue;
      let km2 = 0;
      let cur = start;
      for (const p of items) {
        km2 += distanceKm(cur, p.ll);
        cur = p.ll;
      }
      const stayingAfter = overnight && d === "sat" && plan.sun.length > 0;
      if (!stayingAfter) km2 += distanceKm(cur, home);
      start = stayingAfter ? cur : home;
      legs[d] = km2;
    }
    const km = legs.sat + legs.sun;
    let transport = 0;
    if (s.mode === "train") {
      const discount = s.offpeak ? 0.6 : 1;
      for (const d of DAYS) {
        if (!plan[d].length) continue;
        transport += trainFare(legs[d] / 2) * 2 * discount * A + K * RAILRUNNER;
      }
    } else if (s.mode === "car") {
      transport = km / 100 * (s.cons || 0) * (s.fuel || 0) + days * (s.park || 0);
    }
    const food = days * s.food * (A + K * 0.6);
    let lodging = 0;
    if (overnight && bothDays) {
      if (s.stay === "hostel") lodging = STAY.hostelPerPerson * P;
      else if (s.stay === "hotel")
        lodging = STAY.hotelPerRoom * Math.ceil(A / 2) + (K > 0 ? Math.ceil(K / 2) * STAY.hotelKidsRoom : 0);
      else lodging = STAY.bnbTotal;
    }
    const subtotal = tickets + transport + food + lodging;
    const extras = subtotal * (s.buffer / 100);
    return {
      adults: A,
      kids: K,
      people: P,
      tickets,
      transport,
      food,
      lodging,
      extras,
      total: subtotal + extras,
      km,
      days,
      adultsOnlyWarn,
      overnightIgnored: overnight && !bothDays && days > 0
    };
  }

  // src/dates.ts
  var pad = (n) => String(n).padStart(2, "0");
  var iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  var parse = (s) => {
    const [y, m, d] = s.split("-").map(Number);
    return new Date(y, m - 1, d);
  };
  var addDays = (s, n) => {
    const d = parse(s);
    d.setDate(d.getDate() + n);
    return iso(d);
  };
  var dayDiff = (a, b) => Math.round((parse(b).getTime() - parse(a).getTime()) / 864e5);
  var TODAY = iso(/* @__PURE__ */ new Date());
  var fmtD = (s, o = { weekday: "short", day: "numeric", month: "short" }) => parse(s).toLocaleDateString("en-GB", o);
  var monthOf = (s) => parse(s).getMonth() + 1;
  var dayCache = /* @__PURE__ */ new WeakMap();
  function marketDays(m) {
    const cached = dayCache.get(m);
    if (cached) return cached;
    let out = [];
    if (m.days) {
      out = [...m.days].sort();
    } else if (m.start && m.end) {
      const closed = m.closed ?? [];
      for (let s = m.start; s <= m.end; s = addDays(s, 1)) {
        if (!closed.includes(s)) out.push(s);
      }
    }
    dayCache.set(m, out);
    return out;
  }
  var firstDay = (m) => marketDays(m)[0];
  var lastDay = (m) => marketDays(m)[marketDays(m).length - 1];
  var openOn = (m, s) => marketDays(m).includes(s);
  var openOnWeekend = (m, sat) => openOn(m, sat) || openOn(m, addDays(sat, 1));
  function segments(m) {
    const out = [];
    for (const d of marketDays(m)) {
      const last = out[out.length - 1];
      if (last && addDays(last[1], 1) === d) last[1] = d;
      else out.push([d, d]);
    }
    return out;
  }
  function rangeText(m) {
    const span = (a, b) => a === b ? fmtD(a) : `${fmtD(a, { day: "numeric", month: "short" })} \u2013 ${fmtD(b, {
      day: "numeric",
      month: "short",
      year: a.slice(0, 4) !== b.slice(0, 4) ? "numeric" : void 0
    })}`;
    if (m.days) return segments(m).map(([a, b]) => span(a, b)).join(" & ");
    if (!m.start || !m.end) return "Dates to be announced";
    const closed = m.closed?.length ? ` (closed ${m.closed.map((c) => fmtD(c, { day: "numeric", month: "short" })).join(", ")})` : "";
    return span(m.start, m.end) + closed;
  }
  function marketStatus(m, today = TODAY) {
    const first = firstDay(m);
    const last = lastDay(m);
    if (today > last) return ["ended", "Ended"];
    if (today < first) {
      const n = dayDiff(today, first);
      return ["soon", n === 1 ? "Opens tomorrow" : `Opens in ${n} days`];
    }
    const left = dayDiff(today, last);
    if (openOn(m, today)) {
      return ["open", left <= 6 ? `Open now \xB7 last ${left + 1} day${left ? "s" : ""}` : "Open now"];
    }
    const next = marketDays(m).find((d) => d > today);
    return ["soon", next ? `Next open ${fmtD(next)}` : "Ended"];
  }
  function weekendList(count = 11, today = TODAY) {
    const t = parse(today);
    const dow = t.getDay();
    const sat = new Date(t);
    sat.setDate(t.getDate() + (dow === 0 ? -1 : 6 - dow));
    const out = [];
    for (let i = 0; i < count; i++) {
      out.push(iso(sat));
      sat.setDate(sat.getDate() + 7);
    }
    return out;
  }

  // src/storage.ts
  var KEY = "wkw";
  function loadState() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data.plan || !Array.isArray(data.plan.sat) || !Array.isArray(data.plan.sun)) return null;
      return { plan: data.plan, uid: data.uid ?? 1e3, s: data.s ?? {} };
    } catch {
      return null;
    }
  }
  function saveState(state2) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state2));
    } catch {
    }
  }

  // src/main.ts
  function $(id) {
    const el = document.getElementById(id);
    if (!el) throw new Error(`Missing element #${id}`);
    return el;
  }
  var input = (id) => $(id);
  var select = (id) => $(id);
  var esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  var eur = (v) => "\u20AC" + (Math.round(v * 100) / 100).toLocaleString("nl-NL", {
    minimumFractionDigits: v % 1 ? 2 : 0,
    maximumFractionDigits: 2
  });
  var short = (s) => fmtD(s, { day: "numeric", month: "short" });
  var dayName = (d) => d === "sat" ? "Saturday" : "Sunday";
  var WEEKENDS = weekendList();
  var state = {
    cat: null,
    plan: { sat: [], sun: [] },
    uid: 1e3
  };
  var SETTING_IDS = ["wk", "adults", "kids", "home", "mode", "fuel", "cons", "park", "food", "stay", "buffer", "target"];
  function readSettings() {
    return {
      wk: select("wk").value || WEEKENDS[0],
      adults: Number(input("adults").value),
      kids: Number(input("kids").value),
      home: select("home").value,
      mode: select("mode").value,
      offpeak: input("offpeak").checked,
      fuel: Number(input("fuel").value),
      cons: Number(input("cons").value),
      park: Number(input("park").value),
      food: Number(select("food").value),
      stay: select("stay").value,
      buffer: Number(select("buffer").value),
      target: Number(input("target").value)
    };
  }
  function rawSettings() {
    const o = {};
    for (const id of SETTING_IDS) o[id] = $(id).value;
    o.offpeak = input("offpeak").checked;
    return o;
  }
  function persist() {
    saveState({ plan: state.plan, uid: state.uid, s: rawSettings() });
  }
  function restore() {
    const saved = loadState();
    if (!saved) return;
    state.plan = saved.plan;
    state.uid = saved.uid;
    for (const [k, v] of Object.entries(saved.s)) {
      if (k === "offpeak") input("offpeak").checked = Boolean(v);
      else {
        const el = document.getElementById(k);
        if (el && typeof v === "string") el.value = v;
      }
    }
  }
  var satISO = () => select("wk").value || WEEKENDS[0];
  var dateOf = (d) => d === "sat" ? satISO() : addDays(satISO(), 1);
  var homeLL = () => CITIES[select("home").value] ?? CITIES.Amsterdam;
  var isInSeason = (a) => {
    if (!a.m) return true;
    const sat = satISO();
    return [monthOf(sat), monthOf(addDays(sat, 1))].some((m) => a.m.includes(m));
  };
  var toastTimer;
  function toast(msg) {
    const t = $("toast");
    t.textContent = msg;
    t.classList.add("on");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => t.classList.remove("on"), 1800);
  }
  function addActivity(id, day) {
    const a = ACTS.find((x) => x.id === id);
    if (!a) return;
    state.plan[day].push({ uid: state.uid++, ref: id, n: a.n, city: a.city, ll: a.ll, a: a.a, c: a.c, g: a.g ? { ...a.g } : null, d: a.d });
    toast(`Added \u201C${a.n}\u201D to ${dayName(day)}`);
    refreshAll();
  }
  function addMarket(id, day) {
    const m = MARKETS.find((x) => x.id === id);
    if (!m) return;
    state.plan[day].push({
      uid: state.uid++,
      ref: null,
      mk: id,
      n: m.n,
      city: m.city,
      ll: m.ll,
      a: m.a ?? 0,
      c: m.c ?? 0,
      g: null,
      d: m.d,
      unk: m.a === null
    });
    toast(`\u{1F384} Added \u201C${m.n}\u201D to ${dayName(day)}`);
    refreshAll();
  }
  function removeItem(day, uid) {
    state.plan[day] = state.plan[day].filter((p) => p.uid !== uid);
    refreshAll();
  }
  function moveItem(day, uid) {
    const other = day === "sat" ? "sun" : "sat";
    const item = state.plan[day].find((p) => p.uid === uid);
    if (!item) return;
    state.plan[day] = state.plan[day].filter((p) => p.uid !== uid);
    state.plan[other].push(item);
    updatePlan();
  }
  function editItem(day, uid, field, value) {
    const p = state.plan[day].find((x) => x.uid === uid);
    if (!p) return;
    const n = Number(value) || 0;
    if (field === "g" && p.g) p.g.p = n;
    else if (field === "a") p.a = n;
    else if (field === "c") p.c = n;
    updatePlan(false);
  }
  function priceLabel(a) {
    if (a.g) return `${eur(a.g.p)} <small>per boat (\u2264${a.g.size})</small>`;
    if (a.a === 0 && (a.c ?? 0) === 0) return "Free";
    const child = a.c === null ? " <small>\xB7 adults only</small>" : ` \xB7 ${a.c === 0 ? "free" : eur(a.c)} <small>child</small>`;
    return `${eur(a.a)} <small>adult</small>${child}`;
  }
  function renderActivities() {
    const q = input("q").value.trim().toLowerCase();
    const city = select("fCity").value;
    const max = Number(input("fMax").value);
    $("maxV").textContent = max >= 50 ? "any" : eur(max);
    const home = homeLL();
    const list = ACTS.filter((a) => {
      if (state.cat && a.cat !== state.cat) return false;
      if (city && a.city !== city) return false;
      if (input("fOpen").checked && !isInSeason(a)) return false;
      if (input("fIndoor").checked && !a.in) return false;
      if (input("fKids").checked && !a.kid) return false;
      if (input("fFree").checked && (a.a > 0 || a.g)) return false;
      if (max < 50 && adultCost(a) > max) return false;
      if (q && !`${a.n} ${a.city} ${a.desc} ${CATS[a.cat][1]}`.toLowerCase().includes(q)) return false;
      return true;
    }).map((a) => ({ a, km: distanceKm(home, a.ll) }));
    const sort = select("sort").value;
    list.sort((x, y) => sort === "dist" ? x.km - y.km : sort === "priceAsc" ? adultCost(x.a) - adultCost(y.a) : sort === "priceDesc" ? adultCost(y.a) - adultCost(x.a) : x.a.n.localeCompare(y.a.n));
    const inPlan = new Set([...state.plan.sat, ...state.plan.sun].map((p) => p.ref));
    $("count").textContent = `${list.length} activit${list.length === 1 ? "y" : "ies"} \xB7 distances from ${select("home").value}`;
    $("grid").innerHTML = list.length ? list.map(({ a, km }) => {
      const tags = [`${a.d} h`, a.in ? "Indoor" : "Outdoor", `~${Math.round(km)} km`];
      let extra = "";
      if (a.m) extra += `<span class="tag ${isInSeason(a) ? "ok" : "warn"}">${isInSeason(a) ? "In season" : "Out of season"}</span>`;
      if (a.c === null) extra += `<span class="tag warn">Adults only</span>`;
      return `<article class="act">
          <div class="top"><div><h3>${esc(a.n)}</h3><div class="city">\u{1F4CD} ${esc(a.city)}</div></div><span class="ico">${CATS[a.cat][0]}</span></div>
          <div class="desc">${esc(a.desc)}</div>
          <div class="tags">${tags.map((t) => `<span class="tag">${t}</span>`).join("")}${extra}</div>
          <div class="price">${priceLabel(a)}</div>
          <div class="btns">
            <button class="btn o sm" data-act="${a.id}" data-day="sat">+ Saturday</button>
            <button class="btn g sm" data-act="${a.id}" data-day="sun">+ Sunday</button>
            ${inPlan.has(a.id) ? '<span class="tag ok" style="align-self:center">\u2713 in plan</span>' : ""}
          </div>
          <a class="lnk" href="https://www.google.com/search?q=${encodeURIComponent(`${a.n} ${a.city} tickets`)}" target="_blank" rel="noopener">Check tickets & opening times \u2197</a>
        </article>`;
    }).join("") : `<div class="panel empty">Nothing matches \u2014 try removing a filter.</div>`;
  }
  function renderTimeline(sat) {
    const all = [...MARKETS].sort((a, b) => firstDay(a).localeCompare(firstDay(b)));
    const t0 = all.map(firstDay).sort()[0];
    const t1 = all.map(lastDay).sort().at(-1);
    const W = 14;
    const N = dayDiff(t0, t1) + 1;
    const X = (s) => dayDiff(t0, s) * W;
    let weekendBg = "";
    let header = "";
    for (let i = 0; i < N; i++) {
      const s = addDays(t0, i);
      const d = parse(s);
      if (d.getDay() === 6) weekendBg += `<div class="tl-wk" style="left:${i * W}px;width:${2 * W}px"></div>`;
      if (d.getDay() === 6 || d.getDate() === 1)
        header += `<span style="left:${i * W}px">${d.getDate() === 1 || i === 0 ? short(s) : d.getDate()}</span>`;
    }
    const selLeft = X(sat);
    const sel = selLeft > -2 * W && selLeft < N * W ? `<div class="tl-sel" style="left:${selLeft}px;width:${2 * W}px"></div>` : "";
    const today = TODAY >= t0 && TODAY <= t1 ? `<div class="tl-today" style="left:${X(TODAY) + W / 2}px"></div>` : "";
    $("tl").innerHTML = `<div class="tl-hd"><div class="tl-name"></div><div class="tl-track" style="width:${N * W}px">${header}</div></div>` + all.map((m) => `<div class="tl-row" data-scroll="mk${m.id}" title="${esc(m.n)}: ${esc(rangeText(m))}">
        <div class="tl-name">${esc(m.n)} <span style="color:var(--ink2)">\xB7 ${esc(m.city)}</span></div>
        <div class="tl-track" style="width:${N * W}px">${weekendBg}${sel}${today}${segments(m).map(([a, b]) => `<div class="tl-bar ${m.ind ? "ind" : ""}" style="left:${X(a) + 1}px;width:${(dayDiff(a, b) + 1) * W - 2}px"></div>`).join("")}</div>
      </div>`).join("");
  }
  function marketCard(m, km, sat, sun, inPlan) {
    const [cls, txt] = marketStatus(m);
    const oS = openOn(m, sat);
    const oU = openOn(m, sun);
    return `<article class="mk ${cls === "ended" ? "closed" : ""}" id="mk${m.id}">
    <div class="top" style="display:flex;justify-content:space-between;gap:8px;align-items:start">
      <div><h3 style="font-size:17px;font-weight:600;line-height:1.2">${esc(m.n)}</h3><div class="city">\u{1F4CD} ${esc(m.city)} \xB7 ~${Math.round(km)} km</div></div>
      <span class="pill ${cls}">${txt}</span>
    </div>
    <div class="dates">\u{1F4C5} ${rangeText(m)}${m.ind ? ' <span class="tag warn">indicative</span>' : ""}</div>
    <div class="small">\u{1F552} ${esc(m.hrs)}</div>
    <div class="desc">${esc(m.desc)}</div>
    <div class="tags"><span class="tag">${m.in ? "Indoor / underground" : "Outdoor"}</span><span class="tag">~${m.d} h visit</span>${m.a === 0 ? '<span class="tag ok">Free entry</span>' : ""}</div>
    <div class="small">\u{1F39F}\uFE0F ${esc(m.price)}</div>
    <div class="wkst"><span class="${oS ? "y" : "n"}">Sat ${short(sat)} ${oS ? "\u2713" : "\u2715"}</span><span class="${oU ? "y" : "n"}">Sun ${short(sun)} ${oU ? "\u2713" : "\u2715"}</span></div>
    <div class="btns">
      <button class="btn xr sm" data-mk="${m.id}" data-day="sat" ${oS ? "" : "disabled title='Closed on this Saturday'"}>+ Saturday</button>
      <button class="btn g sm" data-mk="${m.id}" data-day="sun" ${oU ? "" : "disabled title='Closed on this Sunday'"}>+ Sunday</button>
      ${inPlan ? '<span class="tag ok" style="align-self:center">\u2713 in plan</span>' : ""}
    </div>
    <a class="lnk" href="https://www.google.com/search?q=${encodeURIComponent(`${m.n} ${m.city} 2026`)}" target="_blank" rel="noopener">Official info & tickets \u2197</a>
  </article>`;
  }
  function renderChristmas() {
    const sat = satISO();
    const sun = addDays(sat, 1);
    const home = homeLL();
    $("wks").innerHTML = WEEKENDS.map((s) => {
      const n = MARKETS.filter((m) => openOnWeekend(m, s)).length;
      return `<button class="wkc ${s === sat ? "on" : ""}" data-wk="${s}"><b>${short(s)}\u2013${short(addDays(s, 1))}</b><span class="n">${n ? `\u{1F384} ${n} market${n > 1 ? "s" : ""}` : "\u2014"}</span></button>`;
    }).join("");
    const openCount = MARKETS.filter((m) => openOnWeekend(m, sat)).length;
    $("xsub").textContent = `Weekend of ${fmtD(sat, { weekday: "long", day: "numeric", month: "long" })}: ${openCount} of ${MARKETS.length} markets open.`;
    renderTimeline(sat);
    const list = MARKETS.filter((m) => {
      if (input("xOpen").checked && !openOnWeekend(m, sat)) return false;
      if (input("xIn").checked && !m.in) return false;
      if (input("xFree").checked && m.a !== 0) return false;
      return true;
    }).map((m) => ({ m, km: distanceKm(home, m.ll) }));
    const sort = select("xSort").value;
    list.sort((x, y) => sort === "dist" ? x.km - y.km : sort === "end" ? lastDay(x.m).localeCompare(lastDay(y.m)) : firstDay(x.m).localeCompare(firstDay(y.m)));
    const inPlan = new Set([...state.plan.sat, ...state.plan.sun].map((p) => p.mk));
    $("xcount").textContent = `${list.length} market${list.length === 1 ? "" : "s"}${input("xOpen").checked ? ` open on ${short(sat)}\u2013${short(sun)}` : ""} \xB7 distances from ${select("home").value}`;
    const seasonStart = MARKETS.map(firstDay).sort()[0];
    $("xgrid").innerHTML = list.length ? list.map(({ m, km }) => marketCard(m, km, sat, sun, inPlan.has(m.id))).join("") : `<div class="panel empty">No Christmas markets open on this weekend${sat < seasonStart ? ` yet \u2014 the season starts ${fmtD(seasonStart, { weekday: "long", day: "numeric", month: "long" })}. Pick a later weekend above.` : "."}</div>`;
    const seasonEnd = MARKETS.map(lastDay).sort().at(-1);
    $("xbanner").innerHTML = `<span><b>\u{1F384} Christmas market season</b><br>${openCount ? `${openCount} market${openCount > 1 ? "s" : ""} open on your chosen weekend` : `Season runs ${short(seasonStart)} \u2013 ${short(seasonEnd)}, see all start & end dates`}</span><span>View markets \u2192</span>`;
  }
  function itemWarning(p, date) {
    if (p.mk) {
      const m = MARKETS.find((x) => x.id === p.mk);
      if (m && !openOn(m, date)) return `<span class="tag warn">Closed on ${short(date)} \xB7 open ${rangeText(m)}</span>`;
    }
    if (p.ref) {
      const a = ACTS.find((x) => x.id === p.ref);
      if (a?.m && !a.m.includes(monthOf(date))) return `<span class="tag warn">Out of season on this date</span>`;
    }
    return "";
  }
  function dayHTML(day) {
    const items = state.plan[day];
    const date = dateOf(day);
    const hrs = items.reduce((s, p) => s + (p.d || 0), 0);
    const head = `<h4><span>${dayName(day)} ${short(date)}</span><span>${items.length ? `${hrs} h${hrs > 10 ? " \u26A0\uFE0F busy!" : ""}` : ""}</span></h4>`;
    if (!items.length) return head + `<div class="empty">Nothing planned yet \u2014 add activities from the list.</div>`;
    const other = day === "sat" ? "Sunday" : "Saturday";
    return head + items.map((p) => {
      const edit = p.g ? `\u20AC per boat <input type="number" min="0" step="1" value="${p.g.p}" data-edit="g" data-day="${day}" data-uid="${p.uid}"> (\u2264${p.g.size} people)` : `Adult \u20AC <input type="number" min="0" step="0.5" value="${p.a}" data-edit="a" data-day="${day}" data-uid="${p.uid}">
         ${p.c === null ? '<span class="tag warn">adults only</span>' : `Child \u20AC <input type="number" min="0" step="0.5" value="${p.c}" data-edit="c" data-day="${day}" data-uid="${p.uid}">`}`;
      return `<div class="item">
      <div><div class="nm">${p.mk ? "\u{1F384} " : ""}${esc(p.n)}</div><div class="city">${esc(p.city)}</div>${itemWarning(p, date)}${p.unk ? '<span class="tag warn">Entry price not published \u2014 enter it below</span>' : ""}</div>
      <div><button class="x" title="Move to ${other}" data-move="${p.uid}" data-day="${day}">\u21C4</button><button class="x" title="Remove" data-remove="${p.uid}" data-day="${day}">\xD7</button></div>
      <div class="ed">${edit}</div>
    </div>`;
    }).join("");
  }
  function updatePlan(rerender = true) {
    if (rerender) {
      $("day-sat").innerHTML = dayHTML("sat");
      $("day-sun").innerHTML = dayHTML("sun");
    }
    const s = readSettings();
    $("trainOpts").style.display = s.mode === "train" ? "" : "none";
    $("carOpts").style.display = s.mode === "car" ? "" : "none";
    const r = calculateBudget(state.plan, s, homeLL());
    $("tot").textContent = eur(Math.round(r.total));
    $("perP").textContent = r.total ? `${eur(Math.round(r.total / r.people))} per person \xB7 ${r.people} ${r.people === 1 ? "person" : "people"} \xB7 ~${Math.round(r.km)} km travel` : "Add an activity to start.";
    const parts = [
      ["Tickets", r.tickets, "#ff6a13"],
      ["Transport", r.transport, "#5b8def"],
      ["Food", r.food, "#f2c14e"],
      ["Stay", r.lodging, "#4cc38a"],
      ["Buffer", r.extras, "#a78bfa"]
    ];
    $("bar").innerHTML = r.total ? parts.map(([l, v, c]) => `<div style="width:${v / r.total * 100}%;background:${c}" title="${l}"></div>`).join("") : "";
    $("leg").innerHTML = parts.map(([l, v, c]) => `<span><i class="d" style="background:${c}"></i>${l}</span><span>${eur(Math.round(v))}</span>`).join("");
    let cls = "na";
    let msg;
    if (s.target > 0 && r.total) {
      const diff = s.target - r.total;
      cls = diff >= 0 ? "ok" : "over";
      msg = diff >= 0 ? `\u2713 Within budget \u2014 ${eur(Math.round(diff))} left over` : `\u2715 ${eur(Math.round(-diff))} over budget. Try day trips, cheaper food or free activities.`;
    } else {
      msg = s.target > 0 ? "Add activities to compare with your budget." : "Set a budget to compare.";
    }
    if (r.adultsOnlyWarn) msg += "<br><span style='font-weight:400'>\u26A0\uFE0F Your plan includes an adults-only activity \u2014 kids aren't counted for it.</span>";
    if (r.overnightIgnored) msg += "<br><span style='font-weight:400'>\u2139\uFE0F Overnight stay only counts when you plan both days.</span>";
    const st = $("status");
    st.className = `status ${cls}`;
    st.innerHTML = msg;
    $("fab").textContent = `Plan \xB7 ${eur(Math.round(r.total))}`;
    persist();
  }
  function refreshAll() {
    updatePlan();
    renderActivities();
    renderChristmas();
  }
  function planText() {
    const s = readSettings();
    const r = calculateBudget(state.plan, s, homeLL());
    const sat = satISO();
    const lines = [
      `\u{1F1F3}\u{1F1F1} Weekend plan ${short(sat)}\u2013${fmtD(addDays(sat, 1), { day: "numeric", month: "short", year: "numeric" })} (${r.adults} adults${r.kids ? `, ${r.kids} kids` : ""}, from ${s.home})`,
      ""
    ];
    for (const d of ["sat", "sun"]) {
      if (!state.plan[d].length) continue;
      lines.push(`${dayName(d).toUpperCase()} ${short(dateOf(d))}`);
      for (const p of state.plan[d]) lines.push(`\u2022 ${p.n} (${p.city}) \u2013 ${eur(priceFor(p, r.adults, r.kids))}`);
      lines.push("");
    }
    lines.push(`Tickets ${eur(Math.round(r.tickets))} | Transport ${eur(Math.round(r.transport))} | Food ${eur(Math.round(r.food))} | Stay ${eur(Math.round(r.lodging))} | Buffer ${eur(Math.round(r.extras))}`);
    lines.push(`TOTAL \u2248 ${eur(Math.round(r.total))} (${eur(Math.round(r.total / r.people))} pp)`);
    return lines.join("\n");
  }
  function showView(v) {
    const x = v === "christmas";
    $("view-christmas").hidden = !x;
    $("view-all").hidden = x;
    document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("on", t.dataset.v === v));
    try {
      history.replaceState(null, "", x ? "#christmas" : location.pathname + location.search);
    } catch {
    }
  }
  function setupSelects() {
    const cityNames = Object.keys(CITIES).sort();
    select("home").innerHTML = cityNames.map((c) => `<option ${c === "Amsterdam" ? "selected" : ""}>${c}</option>`).join("");
    select("cCity").innerHTML = cityNames.map((c) => `<option>${c}</option>`).join("");
    const actCities = [...new Set(ACTS.map((a) => a.city))].sort();
    select("fCity").innerHTML += actCities.map((c) => `<option>${c}</option>`).join("");
    $("cats").innerHTML = `<button class="chip on" data-c="">All</button>` + Object.entries(CATS).map(([k, [icon, label]]) => `<button class="chip" data-c="${k}">${icon} ${label}</button>`).join("");
    select("wk").innerHTML = WEEKENDS.map((s) => {
      const n = MARKETS.filter((m) => openOnWeekend(m, s)).length;
      return `<option value="${s}">${fmtD(s)} \u2013 ${fmtD(addDays(s, 1))}${n ? ` \xB7 \u{1F384} ${n} markets` : ""}</option>`;
    }).join("");
  }
  function bindEvents() {
    $("cats").addEventListener("click", (e) => {
      const b = e.target.closest(".chip");
      if (!b) return;
      state.cat = b.dataset.c || null;
      $("cats").querySelectorAll(".chip").forEach((x) => x.classList.toggle("on", x === b));
      renderActivities();
    });
    document.addEventListener("click", (e) => {
      const t = e.target;
      const add = t.closest("[data-act],[data-mk]");
      if (add && !add.disabled) {
        const day = add.dataset.day;
        if (add.dataset.act) addActivity(Number(add.dataset.act), day);
        else addMarket(Number(add.dataset.mk), day);
        return;
      }
      const mv = t.closest("[data-move]");
      if (mv) return moveItem(mv.dataset.day, Number(mv.dataset.move));
      const rm = t.closest("[data-remove]");
      if (rm) return removeItem(rm.dataset.day, Number(rm.dataset.remove));
      const wk = t.closest("[data-wk]");
      if (wk) {
        select("wk").value = wk.dataset.wk;
        return refreshAll();
      }
      const sc = t.closest("[data-scroll]");
      if (sc) document.getElementById(sc.dataset.scroll)?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    $("plan").addEventListener("input", (e) => {
      const el = e.target;
      if (el.dataset.edit) editItem(el.dataset.day, Number(el.dataset.uid), el.dataset.edit, el.value);
    });
    ["q", "fCity", "sort", "fOpen", "fIndoor", "fKids", "fFree", "fMax"].forEach((id) => $(id).addEventListener("input", renderActivities));
    ["xOpen", "xIn", "xFree", "xSort"].forEach((id) => $(id).addEventListener("input", renderChristmas));
    ["adults", "kids", "mode", "offpeak", "fuel", "cons", "park", "food", "stay", "buffer", "target"].forEach((id) => $(id).addEventListener("input", () => updatePlan(false)));
    $("home").addEventListener("input", () => {
      updatePlan(false);
      renderActivities();
      renderChristmas();
    });
    $("wk").addEventListener("input", refreshAll);
    $("custom").addEventListener("submit", (e) => {
      e.preventDefault();
      const city = select("cCity").value;
      const day = select("cDay").value;
      state.plan[day].push({
        uid: state.uid++,
        ref: null,
        n: input("cName").value.trim() || "My activity",
        city,
        ll: CITIES[city],
        a: Number(input("cA").value) || 0,
        c: Number(input("cC").value) || 0,
        g: null,
        d: 2
      });
      input("cName").value = "";
      toast("Custom activity added");
      updatePlan();
    });
    $("copy").addEventListener("click", async () => {
      const txt = planText();
      try {
        await navigator.clipboard.writeText(txt);
        toast("Plan copied to clipboard");
      } catch {
        let ta = document.getElementById("cpy");
        if (!ta) {
          ta = document.createElement("textarea");
          ta.id = "cpy";
          $("day-sun").after(ta);
        }
        ta.value = txt;
        ta.select();
        toast("Select & copy the text below");
      }
    });
    $("clear").addEventListener("click", () => {
      state.plan = { sat: [], sun: [] };
      refreshAll();
    });
    $("fab").addEventListener("click", () => $("plan").scrollIntoView({ behavior: "smooth" }));
    document.querySelectorAll(".tab").forEach((t) => t.addEventListener("click", () => {
      showView(t.dataset.v);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }));
    $("xbanner").addEventListener("click", () => {
      showView("christmas");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    window.addEventListener("hashchange", () => showView(location.hash === "#christmas" ? "christmas" : "all"));
  }
  function init() {
    setupSelects();
    restore();
    if (!WEEKENDS.includes(select("wk").value)) select("wk").value = WEEKENDS[0];
    bindEvents();
    refreshAll();
    showView(location.hash === "#christmas" ? "christmas" : "all");
  }
  init();
})();
