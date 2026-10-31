import type { ISODate, Market, MarketStatus } from "./types";

const pad = (n: number): string => String(n).padStart(2, "0");

export const iso = (d: Date): ISODate =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const parse = (s: ISODate): Date => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const addDays = (s: ISODate, n: number): ISODate => {
  const d = parse(s);
  d.setDate(d.getDate() + n);
  return iso(d);
};

/** Whole days from a to b. */
export const dayDiff = (a: ISODate, b: ISODate): number =>
  Math.round((parse(b).getTime() - parse(a).getTime()) / 864e5);

export const TODAY: ISODate = iso(new Date());

export const fmtD = (
  s: ISODate,
  o: Intl.DateTimeFormatOptions = { weekday: "short", day: "numeric", month: "short" },
): string => parse(s).toLocaleDateString("en-GB", o);

export const monthOf = (s: ISODate): number => parse(s).getMonth() + 1;

const dayCache = new WeakMap<Market, ISODate[]>();

/** All dates a market is open, sorted. */
export function marketDays(m: Market): ISODate[] {
  const cached = dayCache.get(m);
  if (cached) return cached;
  let out: ISODate[] = [];
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

export const firstDay = (m: Market): ISODate => marketDays(m)[0];
export const lastDay = (m: Market): ISODate => marketDays(m)[marketDays(m).length - 1];
export const openOn = (m: Market, s: ISODate): boolean => marketDays(m).includes(s);
export const openOnWeekend = (m: Market, sat: ISODate): boolean =>
  openOn(m, sat) || openOn(m, addDays(sat, 1));

/** Consecutive open periods, e.g. [["2026-12-11","2026-12-13"], ["2026-12-17","2026-12-20"]]. */
export function segments(m: Market): [ISODate, ISODate][] {
  const out: [ISODate, ISODate][] = [];
  for (const d of marketDays(m)) {
    const last = out[out.length - 1];
    if (last && addDays(last[1], 1) === d) last[1] = d;
    else out.push([d, d]);
  }
  return out;
}

/** Human-readable date range, e.g. "13 Nov – 30 Dec (closed 25 Dec)". */
export function rangeText(m: Market): string {
  const span = (a: ISODate, b: ISODate): string =>
    a === b
      ? fmtD(a)
      : `${fmtD(a, { day: "numeric", month: "short" })} – ${fmtD(b, {
          day: "numeric",
          month: "short",
          year: a.slice(0, 4) !== b.slice(0, 4) ? "numeric" : undefined,
        })}`;
  if (m.days) return segments(m).map(([a, b]) => span(a, b)).join(" & ");
  if (!m.start || !m.end) return "Dates to be announced";
  const closed = m.closed?.length
    ? ` (closed ${m.closed.map((c) => fmtD(c, { day: "numeric", month: "short" })).join(", ")})`
    : "";
  return span(m.start, m.end) + closed;
}

export function marketStatus(m: Market, today: ISODate = TODAY): MarketStatus {
  const first = firstDay(m);
  const last = lastDay(m);
  if (today > last) return ["ended", "Ended"];
  if (today < first) {
    const n = dayDiff(today, first);
    return ["soon", n === 1 ? "Opens tomorrow" : `Opens in ${n} days`];
  }
  const left = dayDiff(today, last);
  if (openOn(m, today)) {
    return ["open", left <= 6 ? `Open now · last ${left + 1} day${left ? "s" : ""}` : "Open now"];
  }
  const next = marketDays(m).find((d) => d > today);
  return ["soon", next ? `Next open ${fmtD(next)}` : "Ended"];
}

/** The Saturdays of the current and the next `count - 1` weekends. */
export function weekendList(count = 11, today: ISODate = TODAY): ISODate[] {
  const t = parse(today);
  const dow = t.getDay();
  const sat = new Date(t);
  sat.setDate(t.getDate() + (dow === 0 ? -1 : 6 - dow));
  const out: ISODate[] = [];
  for (let i = 0; i < count; i++) {
    out.push(iso(sat));
    sat.setDate(sat.getDate() + 7);
  }
  return out;
}
