import type { Activity, CategoryKey, LatLng, Market } from "./types";

/** Home cities you can travel from (lat, lng). */
export const CITIES: Record<string, LatLng> = {
  "Amsterdam":[52.3676,4.9041],"Rotterdam":[51.9244,4.4777],"Den Haag":[52.0705,4.3007],"Utrecht":[52.0907,5.1214],
  "Eindhoven":[51.4416,5.4697],"Groningen":[53.2194,6.5665],"Maastricht":[50.8514,5.6910],"Haarlem":[52.3874,4.6462],
  "Leiden":[52.1601,4.4970],"Delft":[52.0116,4.3571],"Arnhem":[51.9851,5.8987],"Nijmegen":[51.8126,5.8372],
  "Zwolle":[52.5168,6.0830],"Den Bosch":[51.6978,5.3037],"Breda":[51.5719,4.7683],"Tilburg":[51.5555,5.0913],
  "Alkmaar":[52.6324,4.7534],"Deventer":[52.2557,6.1639],"Dordrecht":[51.8133,4.6690],"Gouda":[52.0115,4.7105],"Amersfoort":[52.1561,5.3878],"Enschede":[52.2215,6.8937],"Almere":[52.3508,5.2647]
};

export const CATS: Record<CategoryKey, [icon: string, label: string]> = {museum:["🏛️","Museums"],outdoor:["🌳","Outdoors & nature"],family:["🎢","Family & parks"],sight:["📸","Sightseeing"],food:["🍺","Food & drink"],wellness:["🧖","Wellness"],seasonal:["✨","Seasonal events"]};

/**
 * Activities. Prices are approximate 2026 estimates in euros.
 * a = adult price, c = child price (null = adults only), d = hours,
 * m = months it is open (omit = all year), g = price per group (e.g. a boat).
 */
export const ACTS: Activity[] = [
 {id:1,n:"Rijksmuseum",city:"Amsterdam",ll:[52.36,4.885],cat:"museum",in:true,a:25,c:0,d:3,kid:true,desc:"Rembrandt's Night Watch, Vermeer and 800 years of Dutch art. Under 18s free."},
 {id:2,n:"Van Gogh Museum",city:"Amsterdam",ll:[52.358,4.881],cat:"museum",in:true,a:22,c:0,d:2,kid:true,desc:"The world's largest Van Gogh collection. Book a timeslot in advance."},
 {id:3,n:"Anne Frank House",city:"Amsterdam",ll:[52.375,4.884],cat:"museum",in:true,a:16,c:7,d:1.5,kid:true,desc:"The secret annex where Anne Frank wrote her diary. Tickets sell out weeks ahead."},
 {id:4,n:"Canal cruise",city:"Amsterdam",ll:[52.373,4.89],cat:"sight",in:true,a:18,c:10,d:1.25,kid:true,desc:"Covered glass boat through the UNESCO canal ring — works in any weather."},
 {id:5,n:"A'DAM Lookout",city:"Amsterdam",ll:[52.384,4.902],cat:"sight",in:true,a:17,c:9,d:1.5,kid:true,desc:"360° view over the city and Europe's highest swing 'Over the Edge'."},
 {id:6,n:"NEMO Science Museum",city:"Amsterdam",ll:[52.374,4.912],cat:"family",in:true,a:17.5,c:17.5,d:3,kid:true,desc:"Five floors of hands-on science, plus a free rooftop terrace."},
 {id:7,n:"Artis Zoo",city:"Amsterdam",ll:[52.366,4.917],cat:"family",in:false,a:28,c:24,d:4,kid:true,desc:"Historic city zoo with aquarium, planetarium and Micropia."},
 {id:8,n:"Heineken Experience",city:"Amsterdam",ll:[52.357,4.892],cat:"food",in:true,a:23,c:null,d:1.5,kid:false,desc:"Interactive brewery tour with tasting. 18+ only."},
 {id:9,n:"Waterland bike ride",city:"Amsterdam",ll:[52.42,4.98],cat:"outdoor",in:false,a:15,c:10,d:4,kid:true,desc:"Rent bikes and ride to Broek in Waterland & Marken — polders, dikes, cows."},
 {id:10,n:"Zaanse Schans windmills",city:"Zaandam",ll:[52.474,4.817],cat:"sight",in:false,a:6,c:4,d:3,kid:true,desc:"Working windmills, clog maker and cheese farm. Village free; price is a windmill visit."},
 {id:11,n:"Keukenhof tulip gardens",city:"Lisse",ll:[52.27,4.546],cat:"seasonal",in:false,a:21,c:10,d:3.5,kid:true,m:[3,4,5],desc:"7 million flowering bulbs. Only open mid-March to mid-May."},
 {id:12,n:"Teylers Museum",city:"Haarlem",ll:[52.38,4.64],cat:"museum",in:true,a:17.5,c:4,d:2,kid:true,desc:"The oldest museum in NL: fossils, instruments and art in a time-capsule building."},
 {id:13,n:"Zandvoort beach & dunes",city:"Zandvoort",ll:[52.371,4.533],cat:"outdoor",in:false,a:0,c:0,d:4,kid:true,desc:"Beach walk and the Kennemerduinen dunes with wild bison. Free."},
 {id:14,n:"Naturalis Biodiversity Center",city:"Leiden",ll:[52.165,4.474],cat:"family",in:true,a:19,c:15,d:3,kid:true,desc:"Real T-rex 'Trix', dinosaurs and a huge natural history collection."},
 {id:15,n:"Mauritshuis",city:"Den Haag",ll:[52.08,4.314],cat:"museum",in:true,a:19.5,c:0,d:1.5,kid:true,desc:"Girl with a Pearl Earring and Dutch Golden Age masters. Under 19s free."},
 {id:16,n:"Madurodam",city:"Den Haag",ll:[52.099,4.299],cat:"family",in:false,a:22,c:22,d:2.5,kid:true,desc:"The whole of Holland in miniature. Interactive and great with kids."},
 {id:17,n:"Scheveningen beach & pier",city:"Den Haag",ll:[52.108,4.273],cat:"outdoor",in:false,a:0,c:0,d:3,kid:true,desc:"Boulevard, pier, beach clubs and fresh herring. Free."},
 {id:18,n:"Royal Delft factory",city:"Delft",ll:[52.016,4.367],cat:"museum",in:true,a:18,c:10,d:1.5,kid:true,desc:"See Delft Blue pottery hand-painted since 1653. Combine with Delft's old centre."},
 {id:19,n:"Kinderdijk windmills",city:"Kinderdijk",ll:[51.885,4.639],cat:"sight",in:false,a:20,c:11,d:3,kid:true,desc:"19 historic windmills (UNESCO). Go by Waterbus from Rotterdam."},
 {id:20,n:"Euromast",city:"Rotterdam",ll:[51.905,4.467],cat:"sight",in:true,a:19,c:12,d:1.5,kid:true,desc:"185 m tower with panoramic views of the skyline and port."},
 {id:21,n:"Spido harbour tour",city:"Rotterdam",ll:[51.909,4.48],cat:"sight",in:true,a:19,c:11.5,d:1.25,kid:true,desc:"Boat tour through one of the world's largest ports."},
 {id:22,n:"Markthal & Cube Houses",city:"Rotterdam",ll:[51.92,4.487],cat:"food",in:true,a:3.5,c:2.5,d:2,kid:true,desc:"Iconic food market hall; price is entry to the show Cube House next door."},
 {id:23,n:"Depot Boijmans Van Beuningen",city:"Rotterdam",ll:[51.913,4.47],cat:"museum",in:true,a:20,c:0,d:2,kid:true,desc:"Mirror-glass art depot with 150,000 works and a rooftop forest."},
 {id:24,n:"Diergaarde Blijdorp",city:"Rotterdam",ll:[51.927,4.449],cat:"family",in:false,a:26,c:21,d:4,kid:true,desc:"Big zoo with the Oceanium aquarium."},
 {id:25,n:"Dom Tower climb",city:"Utrecht",ll:[52.091,5.121],cat:"sight",in:true,a:14,c:9,d:1.25,kid:true,desc:"465 steps up the tallest church tower in NL (guided)."},
 {id:26,n:"Miffy Museum",city:"Utrecht",ll:[52.086,5.122],cat:"family",in:true,a:10,c:10,d:1.5,kid:true,desc:"Play museum for little ones (2–6) in Miffy's home town."},
 {id:27,n:"Efteling theme park",city:"Kaatsheuvel",ll:[51.65,5.043],cat:"family",in:false,a:46,c:46,d:8,kid:true,desc:"Fairy-tale theme park; Winter Efteling runs Nov–Jan. Cheaper online."},
 {id:28,n:"Hoge Veluwe & Kröller-Müller",city:"Otterlo",ll:[52.095,5.81],cat:"outdoor",in:false,a:25,c:12.5,d:5,kid:true,desc:"National park with free white bikes, plus a world-class Van Gogh collection."},
 {id:29,n:"Burgers' Zoo",city:"Arnhem",ll:[52.006,5.9],cat:"family",in:false,a:29,c:27,d:5,kid:true,desc:"Indoor tropical jungle, desert and ocean — good even in bad weather."},
 {id:30,n:"Netherlands Open Air Museum",city:"Arnhem",ll:[52.009,5.909],cat:"museum",in:false,a:22,c:17,d:4,kid:true,desc:"Walk through historic Dutch farms, trams and villages."},
 {id:31,n:"Giethoorn whisper boat",city:"Giethoorn",ll:[52.739,6.077],cat:"outdoor",in:false,a:0,c:0,g:{p:90,size:6},d:3,kid:true,m:[3,4,5,6,7,8,9,10],desc:"Sail yourself through the car-free village of canals. Price is per boat (max 6)."},
 {id:32,n:"Texel day trip + Ecomare",city:"Texel",ll:[52.96,4.76],cat:"outdoor",in:false,a:22,c:17,d:7,kid:true,desc:"Ferry from Den Helder, seal sanctuary, dunes and beaches. Includes foot-passenger ferry."},
 {id:33,n:"Wadlopen (mudflat hiking)",city:"Pieterburen",ll:[53.4,6.45],cat:"outdoor",in:false,a:25,c:20,d:3.5,kid:true,m:[5,6,7,8,9],desc:"Guided walk across the Wadden Sea seabed at low tide. Kids 12+."},
 {id:34,n:"Groninger Museum",city:"Groningen",ll:[53.212,6.566],cat:"museum",in:true,a:17,c:5,d:2,kid:true,desc:"Wildly colourful museum building with modern art and design."},
 {id:35,n:"Maastricht caves (Grotten Noord)",city:"Maastricht",ll:[50.83,5.69],cat:"sight",in:true,a:9.5,c:7,d:1,kid:true,desc:"Guided walk through centuries-old marl tunnels under Mount Saint Peter."},
 {id:37,n:"Amsterdam Light Festival cruise",city:"Amsterdam",ll:[52.37,4.9],cat:"seasonal",in:true,a:25,c:15,d:1.25,kid:true,m:[11,12,1],desc:"Light artworks along the canals, late Nov to mid-Jan."},
 {id:38,n:"Thermae 2000 spa day",city:"Valkenburg",ll:[50.86,5.84],cat:"wellness",in:true,a:45,c:null,d:5,kid:false,desc:"Thermal baths and saunas on a hill top. 16+ in the sauna area."},
 {id:39,n:"Biesbosch National Park boat tour",city:"Drimmelen",ll:[51.706,4.803],cat:"outdoor",in:false,a:15,c:9,d:2.5,kid:true,desc:"Freshwater tidal wetlands with beavers and sea eagles."},
 {id:40,n:"Philips Museum",city:"Eindhoven",ll:[51.44,5.475],cat:"museum",in:true,a:12,c:6,d:1.5,kid:true,desc:"From the first light bulb to modern tech, in Philips' original factory."},
 {id:41,n:"Dolfinarium",city:"Harderwijk",ll:[52.343,5.62],cat:"family",in:false,a:35,c:35,d:5,kid:true,m:[3,4,5,6,7,8,9,10],desc:"Marine park with dolphin and sea-lion shows."},
 {id:42,n:"Walibi Holland",city:"Biddinghuizen",ll:[52.44,5.758],cat:"family",in:false,a:40,c:40,d:7,kid:true,m:[4,5,6,7,8,9,10],desc:"Roller coasters and thrill rides; Fright Nights in October."},
 {id:43,n:"Winter ice skating rink",city:"Utrecht",ll:[52.09,5.12],cat:"seasonal",in:false,a:10,c:8,d:1.5,kid:true,m:[11,12,1,2],desc:"Pop-up city ice rinks appear in most big cities in winter. Skate rental incl."}
];

/**
 * Christmas markets 2026 (dates checked 31 Oct 2026).
 * start/end = open every day in between (minus `closed`); `days` = only these dates.
 * a/c = adult/child price in euros (null = not published). ind = dates still indicative. est = price is an estimate.
 */
export const MARKETS: Market[] = [
 {id:1,n:"Kerstmarkt Gemeentegrot",city:"Valkenburg",ll:[50.8636,5.8312],start:"2026-11-13",end:"2026-12-30",closed:["2026-12-25"],in:true,a:11.3,c:6.8,d:1.5,
  hrs:"Mon–Fri 11:00–19:00 · Sat–Sun 10:00–19:00",price:"€11.30 Fri–Sun, €9.30 Mon–Thu (online) · kids 5–11 €6.80 · 0–4 free with ticket",
  desc:"Europe's largest underground Christmas market, in the marl tunnels under the Cauberg. Book a timeslot online — weekends sell out first."},
 {id:2,n:"Kerstmarkt Fluweelengrot",city:"Valkenburg",ll:[50.8653,5.8295],start:"2026-11-13",end:"2026-12-30",closed:["2026-12-25"],in:true,a:10,c:7,est:true,d:1.5,
  hrs:"Daily, approx. 10:00/11:00–19:00",price:"About €10 adult (estimate) · combi ticket with the castle ruin online",
  desc:"Smaller cave market under the castle ruin, with a North Pole theme and an 18th-century underground chapel."},
 {id:3,n:"Kerststad Valkenburg (town & parade)",city:"Valkenburg",ll:[50.865,5.832],start:"2026-11-13",end:"2027-01-03",in:false,a:0,c:0,d:3,
  hrs:"Town centre all day · parade on selected evenings",price:"Free (cave markets & attractions paid separately)",
  desc:"The whole town becomes a Christmas town: lights, Santa's village and the free Landal Christmas Parade."},
 {id:4,n:"Magisch Maastricht Vrijthof",city:"Maastricht",ll:[50.8486,5.6889],start:"2026-11-27",end:"2026-12-27",in:false,a:0,c:0,d:3,
  hrs:"Day and evening",price:"Free entry · ice rink & rides paid",
  desc:"Christmas market, ice rink, Ferris wheel and Alpine huts on Maastricht's most beautiful square."},
 {id:5,n:"Royal Christmas Fair",city:"Den Haag",ll:[52.0817,4.3147],start:"2026-12-03",end:"2026-12-23",in:false,a:0,c:0,d:2.5,
  hrs:"Daily 12:00–21:00",price:"Free",
  desc:"About 100 chalets on the stately Lange Voorhout, with fires, choirs, storytellers and Santa."},
 {id:6,n:"Kerstmarkt Haarlem",city:"Haarlem",ll:[52.3812,4.6364],start:"2026-12-11",end:"2026-12-13",in:false,a:0,c:0,d:3,
  hrs:"Fri–Sat 10:30–20:00 · Sun 10:30–19:00",price:"Free",
  desc:"Nearly 350 stalls across 12 spots in the old centre, around the Grote Markt and St. Bavo church."},
 {id:7,n:"Dickens Festijn",city:"Deventer",ll:[52.2513,6.1590],start:"2026-12-12",end:"2026-12-13",in:false,a:7.75,c:7.75,d:3,
  hrs:"10:00–17:00 · timeslot required",price:"€7.50 online + €0.25 fee · under 7 free",
  desc:"Hundreds of costumed characters bring Dickens' 19th-century England to life in the Bergkwartier. Expect queues."},
 {id:8,n:"Dordtse Decembermarkt",city:"Dordrecht",ll:[51.8133,4.6690],start:"2026-12-10",end:"2026-12-13",in:false,a:0,c:0,d:2.5,
  hrs:"Part of the Dordtse Decemberdagen (10 Dec – 3 Jan)",price:"Free",
  desc:"Christmas market in the historic centre, with a winter square and skating during the Decemberdagen."},
 {id:9,n:"Nostalgische Kerstmarkt Leiden",city:"Leiden",ll:[52.1583,4.4931],days:["2026-12-11","2026-12-12","2026-12-13","2026-12-17","2026-12-18","2026-12-19","2026-12-20"],in:false,a:0,c:0,d:2,
  hrs:"Two long weekends",price:"Free",
  desc:"Nostalgic market along Leiden's canals, spread over two long weekends."},
 {id:10,n:"Kerstmarkt Vesting Bourtange",city:"Bourtange",ll:[53.0071,7.1917],days:["2026-12-05","2026-12-06","2026-12-12","2026-12-13","2026-12-19","2026-12-20"],in:false,a:null,c:0,d:3,
  hrs:"Sat 11:00–21:00 · Sun 11:00–18:00",price:"Paid entry (see website) · kids 0–5 free · free parking",
  desc:"Christmas market inside a star-shaped 16th-century fortress village near the German border."},
 {id:11,n:"Gouda bij Kaarslicht + Winterfair",city:"Gouda",ll:[52.0115,4.7105],start:"2026-12-11",end:"2026-12-12",in:false,a:0,c:0,d:3,
  hrs:"Fri 11:00–22:00 (candle-lit evening) · Sat 10:00–17:00",price:"Free",
  desc:"The market square lit only by candles and a giant Christmas tree, plus a winter fair the next day."},
 {id:12,n:"Kerstmarkt Arnhem",city:"Arnhem",ll:[51.9851,5.8987],start:"2026-12-13",end:"2026-12-13",in:false,a:0,c:0,d:2.5,
  hrs:"Sunday",price:"Free",desc:"One-day Christmas market in Arnhem's city centre."},
 {id:13,n:"Zweedse Kerstmarkt",city:"Groningen",ll:[53.2194,6.5665],start:"2026-12-12",end:"2026-12-13",in:true,a:null,c:0,d:2,
  hrs:"Sat & Sun",price:"See website",desc:"Indoor Swedish-style Christmas market — no cold or rain, with a carrousel, train and Santa for kids."},
 {id:14,n:"Kerstmarkt Thorn",city:"Thorn",ll:[51.1617,5.8417],start:"2026-12-13",end:"2026-12-13",in:false,a:0,c:0,d:2.5,
  hrs:"Sunday",price:"Free",desc:"Christmas market in 'the white village' of Limburg, among whitewashed historic houses."},
 {id:15,n:"Kerstmarkten Zeist",city:"Zeist",ll:[52.0894,5.2332],days:["2026-12-13","2026-12-20"],in:false,a:null,c:0,d:2,
  hrs:"Sundays",price:"See website",desc:"Two Sunday Christmas markets (after the Sinterfair on 29 Nov)."},
 {id:16,n:"Christmas Village Amsterdam",city:"Amsterdam",ll:[52.37,4.89],start:"2026-12-03",end:"2026-12-27",in:false,a:null,c:0,d:2,
  hrs:"Daily",price:"See website",desc:"Christmas village with chalets and winter food & drinks in Amsterdam."},
 {id:17,n:"Het Amsterdamse Winterparadijs",city:"Amsterdam (RAI)",ll:[52.3416,4.8900],start:"2026-12-17",end:"2027-01-02",ind:true,in:true,a:18.5,c:18.5,est:true,d:4,
  hrs:"Timeslot entry, stay as long as you like",price:"From €18.50 · price varies per timeslot",
  desc:"55,000 m² winter event at the RAI: skating, cross-country skiing, shows and an après-ski village. Dates still indicative."},
 {id:18,n:"Dickensfestijn Drunen",city:"Drunen",ll:[51.686,5.13],start:"2026-12-19",end:"2026-12-20",in:false,a:null,c:0,d:2.5,
  hrs:"Sat & Sun",price:"See website",desc:"Smaller Dickens-themed Christmas festival in Brabant."},
 {id:19,n:"Kerstmarkt Eext",city:"Eext",ll:[53.0175,6.7333],start:"2026-12-19",end:"2026-12-20",in:false,a:null,c:0,d:2.5,
  hrs:"Sat & Sun",price:"See website",desc:"Village Christmas market in Drenthe."}
];
