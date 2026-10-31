/** [latitude, longitude] */
export type LatLng = [number, number];

/** ISO date string, e.g. "2026-12-12". */
export type ISODate = string;

export type CategoryKey =
  | "museum"
  | "outdoor"
  | "family"
  | "sight"
  | "food"
  | "wellness"
  | "seasonal";

export interface GroupPrice {
  /** Price per group (e.g. one boat). */
  p: number;
  /** Max people per group. */
  size: number;
}

export interface Activity {
  id: number;
  n: string;
  city: string;
  ll: LatLng;
  cat: CategoryKey;
  in: boolean;
  /** Adult price in euros. */
  a: number;
  /** Child price in euros, null = adults only. */
  c: number | null;
  /** Typical visit duration in hours. */
  d: number;
  kid: boolean;
  desc: string;
  /** Months (1–12) it is open; omitted = all year. */
  m?: number[];
  g?: GroupPrice;
}

export interface Market {
  id: number;
  n: string;
  city: string;
  ll: LatLng;
  /** Open every day from start to end (inclusive), minus `closed`. */
  start?: ISODate;
  end?: ISODate;
  closed?: ISODate[];
  /** Or: open only on these specific dates. */
  days?: ISODate[];
  in: boolean;
  /** Adult price in euros, null = not published. */
  a: number | null;
  c: number | null;
  d: number;
  hrs: string;
  price: string;
  desc: string;
  /** Price is an estimate. */
  est?: boolean;
  /** Dates are still indicative. */
  ind?: boolean;
}

export type DayKey = "sat" | "sun";

export interface PlanItem {
  uid: number;
  /** Activity id, if added from the activity list. */
  ref: number | null;
  /** Market id, if added from the Christmas markets. */
  mk?: number;
  n: string;
  city: string;
  ll: LatLng;
  a: number;
  c: number | null;
  g: GroupPrice | null;
  d: number;
  /** Entry price not published yet. */
  unk?: boolean;
}

export type Plan = Record<DayKey, PlanItem[]>;

export type TransportMode = "train" | "car" | "none";
export type StayType = "0" | "hostel" | "hotel" | "bnb";

export interface Settings {
  wk: ISODate;
  adults: number;
  kids: number;
  home: string;
  mode: TransportMode;
  offpeak: boolean;
  fuel: number;
  cons: number;
  park: number;
  food: number;
  stay: StayType;
  buffer: number;
  target: number;
}

export interface Budget {
  adults: number;
  kids: number;
  people: number;
  tickets: number;
  transport: number;
  food: number;
  lodging: number;
  extras: number;
  total: number;
  km: number;
  days: number;
  adultsOnlyWarn: boolean;
  overnightIgnored: boolean;
}

export type MarketStatus = ["open" | "soon" | "ended", string];
