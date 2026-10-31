import type { Budget, DayKey, GroupPrice, LatLng, Plan, Settings } from "./types";

const DAYS: DayKey[] = ["sat", "sun"];

/** Road distance estimate in km: straight line (haversine) × 1.3. */
export function distanceKm(a: LatLng, b: LatLng): number {
  const R = 6371;
  const r = Math.PI / 180;
  const dLa = (b[0] - a[0]) * r;
  const dLo = (b[1] - a[1]) * r;
  const x = Math.sin(dLa / 2) ** 2 + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin(dLo / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x)) * 1.3;
}

/** Rough NS single fare, 2nd class (degressive per km, capped). */
export function trainFare(km: number): number {
  const fare = km <= 40 ? 2.6 + 0.26 * km : 13 + 0.17 * (km - 40);
  return Math.min(fare, 30);
}

/** Kids 4–11 travel with an NS Railrunner (return, per day). */
export const RAILRUNNER = 2.8;

interface Priced {
  a: number;
  c: number | null;
  g?: GroupPrice | null;
}

/** Ticket cost of one activity for the whole group. */
export function priceFor(item: Priced, adults: number, kids: number): number {
  if (item.g) return Math.ceil((adults + kids) / item.g.size) * item.g.p;
  return item.a * adults + (item.c ?? 0) * kids;
}

/** Adult price used for sorting/filtering (group prices split per person). */
export const adultCost = (item: Priced): number => (item.g ? item.g.p / item.g.size : item.a);

const STAY = {
  hostelPerPerson: 40,
  hotelPerRoom: 130,
  hotelKidsRoom: 60,
  bnbTotal: 160,
} as const;

export function calculateBudget(plan: Plan, s: Settings, home: LatLng): Budget {
  const A = Math.max(1, s.adults || 1);
  const K = Math.max(0, s.kids || 0);
  const P = A + K;
  const overnight = s.stay !== "0";
  const bothDays = plan.sat.length > 0 && plan.sun.length > 0;
  const days = DAYS.filter((d) => plan[d].length).length;

  // Tickets
  let tickets = 0;
  let adultsOnlyWarn = false;
  for (const d of DAYS) {
    for (const p of plan[d]) {
      tickets += priceFor(p, A, K);
      if (p.c === null && K > 0) adultsOnlyWarn = true;
    }
  }

  // Route: home → activities (→ home, unless staying over after Saturday)
  const legs: Record<DayKey, number> = { sat: 0, sun: 0 };
  let start = home;
  for (const d of DAYS) {
    const items = plan[d];
    if (!items.length) continue;
    let km = 0;
    let cur = start;
    for (const p of items) {
      km += distanceKm(cur, p.ll);
      cur = p.ll;
    }
    const stayingAfter = overnight && d === "sat" && plan.sun.length > 0;
    if (!stayingAfter) km += distanceKm(cur, home);
    start = stayingAfter ? cur : home;
    legs[d] = km;
  }
  const km = legs.sat + legs.sun;

  // Transport
  let transport = 0;
  if (s.mode === "train") {
    const discount = s.offpeak ? 0.6 : 1;
    for (const d of DAYS) {
      if (!plan[d].length) continue;
      transport += trainFare(legs[d] / 2) * 2 * discount * A + K * RAILRUNNER;
    }
  } else if (s.mode === "car") {
    transport = (km / 100) * (s.cons || 0) * (s.fuel || 0) + days * (s.park || 0);
  }

  // Food (kids ≈ 60% of an adult)
  const food = days * s.food * (A + K * 0.6);

  // Overnight stay (only when both days are planned)
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
    overnightIgnored: overnight && !bothDays && days > 0,
  };
}
