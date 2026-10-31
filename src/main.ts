import { ACTS, CATS, CITIES, MARKETS } from "./data";
import { adultCost, calculateBudget, distanceKm, priceFor } from "./budget";
import {
  TODAY, addDays, dayDiff, firstDay, fmtD, lastDay, marketStatus,
  monthOf, openOn, openOnWeekend, parse, rangeText, segments, weekendList,
} from "./dates";
import { loadState, saveState } from "./storage";
import type {
  Activity, CategoryKey, DayKey, ISODate, LatLng, Market, Plan, PlanItem, Settings, StayType, TransportMode,
} from "./types";

// ---------- DOM helpers ----------
function $<T extends HTMLElement = HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing element #${id}`);
  return el as T;
}
const input = (id: string) => $<HTMLInputElement>(id);
const select = (id: string) => $<HTMLSelectElement>(id);
const esc = (s: string): string =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const eur = (v: number): string =>
  "€" + (Math.round(v * 100) / 100).toLocaleString("nl-NL", {
    minimumFractionDigits: v % 1 ? 2 : 0,
    maximumFractionDigits: 2,
  });
const short = (s: ISODate) => fmtD(s, { day: "numeric", month: "short" });
const dayName = (d: DayKey) => (d === "sat" ? "Saturday" : "Sunday");

// ---------- state ----------
const WEEKENDS = weekendList();
const state: { cat: CategoryKey | null; plan: Plan; uid: number } = {
  cat: null,
  plan: { sat: [], sun: [] },
  uid: 1000,
};

const SETTING_IDS = ["wk", "adults", "kids", "home", "mode", "fuel", "cons", "park", "food", "stay", "buffer", "target"] as const;

function readSettings(): Settings {
  return {
    wk: select("wk").value || WEEKENDS[0],
    adults: Number(input("adults").value),
    kids: Number(input("kids").value),
    home: select("home").value,
    mode: select("mode").value as TransportMode,
    offpeak: input("offpeak").checked,
    fuel: Number(input("fuel").value),
    cons: Number(input("cons").value),
    park: Number(input("park").value),
    food: Number(select("food").value),
    stay: select("stay").value as StayType,
    buffer: Number(select("buffer").value),
    target: Number(input("target").value),
  };
}

function rawSettings(): Record<string, string | boolean> {
  const o: Record<string, string | boolean> = {};
  for (const id of SETTING_IDS) o[id] = ($(id) as HTMLInputElement | HTMLSelectElement).value;
  o.offpeak = input("offpeak").checked;
  return o;
}

function persist(): void {
  saveState({ plan: state.plan, uid: state.uid, s: rawSettings() });
}

function restore(): void {
  const saved = loadState();
  if (!saved) return;
  state.plan = saved.plan;
  state.uid = saved.uid;
  for (const [k, v] of Object.entries(saved.s)) {
    if (k === "offpeak") input("offpeak").checked = Boolean(v);
    else {
      const el = document.getElementById(k) as HTMLInputElement | HTMLSelectElement | null;
      if (el && typeof v === "string") el.value = v;
    }
  }
}

const satISO = (): ISODate => select("wk").value || WEEKENDS[0];
const dateOf = (d: DayKey): ISODate => (d === "sat" ? satISO() : addDays(satISO(), 1));
const homeLL = (): LatLng => CITIES[select("home").value] ?? CITIES.Amsterdam;
const isInSeason = (a: Activity): boolean => {
  if (!a.m) return true;
  const sat = satISO();
  return [monthOf(sat), monthOf(addDays(sat, 1))].some((m) => a.m!.includes(m));
};

// ---------- toast ----------
let toastTimer: number | undefined;
function toast(msg: string): void {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("on");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => t.classList.remove("on"), 1800);
}

// ---------- plan actions ----------
function addActivity(id: number, day: DayKey): void {
  const a = ACTS.find((x) => x.id === id);
  if (!a) return;
  state.plan[day].push({ uid: state.uid++, ref: id, n: a.n, city: a.city, ll: a.ll, a: a.a, c: a.c, g: a.g ? { ...a.g } : null, d: a.d });
  toast(`Added “${a.n}” to ${dayName(day)}`);
  refreshAll();
}

function addMarket(id: number, day: DayKey): void {
  const m = MARKETS.find((x) => x.id === id);
  if (!m) return;
  state.plan[day].push({
    uid: state.uid++, ref: null, mk: id, n: m.n, city: m.city, ll: m.ll,
    a: m.a ?? 0, c: m.c ?? 0, g: null, d: m.d, unk: m.a === null,
  });
  toast(`🎄 Added “${m.n}” to ${dayName(day)}`);
  refreshAll();
}

function removeItem(day: DayKey, uid: number): void {
  state.plan[day] = state.plan[day].filter((p) => p.uid !== uid);
  refreshAll();
}

function moveItem(day: DayKey, uid: number): void {
  const other: DayKey = day === "sat" ? "sun" : "sat";
  const item = state.plan[day].find((p) => p.uid === uid);
  if (!item) return;
  state.plan[day] = state.plan[day].filter((p) => p.uid !== uid);
  state.plan[other].push(item);
  updatePlan();
}

function editItem(day: DayKey, uid: number, field: "a" | "c" | "g", value: string): void {
  const p = state.plan[day].find((x) => x.uid === uid);
  if (!p) return;
  const n = Number(value) || 0;
  if (field === "g" && p.g) p.g.p = n;
  else if (field === "a") p.a = n;
  else if (field === "c") p.c = n;
  updatePlan(false);
}

// ---------- activities view ----------
function priceLabel(a: Activity): string {
  if (a.g) return `${eur(a.g.p)} <small>per boat (≤${a.g.size})</small>`;
  if (a.a === 0 && (a.c ?? 0) === 0) return "Free";
  const child = a.c === null ? " <small>· adults only</small>" : ` · ${a.c === 0 ? "free" : eur(a.c)} <small>child</small>`;
  return `${eur(a.a)} <small>adult</small>${child}`;
}

function renderActivities(): void {
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
  list.sort((x, y) =>
    sort === "dist" ? x.km - y.km
    : sort === "priceAsc" ? adultCost(x.a) - adultCost(y.a)
    : sort === "priceDesc" ? adultCost(y.a) - adultCost(x.a)
    : x.a.n.localeCompare(y.a.n));

  const inPlan = new Set([...state.plan.sat, ...state.plan.sun].map((p) => p.ref));
  $("count").textContent = `${list.length} activit${list.length === 1 ? "y" : "ies"} · distances from ${select("home").value}`;
  $("grid").innerHTML = list.length
    ? list.map(({ a, km }) => {
        const tags = [`${a.d} h`, a.in ? "Indoor" : "Outdoor", `~${Math.round(km)} km`];
        let extra = "";
        if (a.m) extra += `<span class="tag ${isInSeason(a) ? "ok" : "warn"}">${isInSeason(a) ? "In season" : "Out of season"}</span>`;
        if (a.c === null) extra += `<span class="tag warn">Adults only</span>`;
        return `<article class="act">
          <div class="top"><div><h3>${esc(a.n)}</h3><div class="city">📍 ${esc(a.city)}</div></div><span class="ico">${CATS[a.cat][0]}</span></div>
          <div class="desc">${esc(a.desc)}</div>
          <div class="tags">${tags.map((t) => `<span class="tag">${t}</span>`).join("")}${extra}</div>
          <div class="price">${priceLabel(a)}</div>
          <div class="btns">
            <button class="btn o sm" data-act="${a.id}" data-day="sat">+ Saturday</button>
            <button class="btn g sm" data-act="${a.id}" data-day="sun">+ Sunday</button>
            ${inPlan.has(a.id) ? '<span class="tag ok" style="align-self:center">✓ in plan</span>' : ""}
          </div>
          <a class="lnk" href="https://www.google.com/search?q=${encodeURIComponent(`${a.n} ${a.city} tickets`)}" target="_blank" rel="noopener">Check tickets & opening times ↗</a>
        </article>`;
      }).join("")
    : `<div class="panel empty">Nothing matches — try removing a filter.</div>`;
}

// ---------- Christmas view ----------
function renderTimeline(sat: ISODate): void {
  const all = [...MARKETS].sort((a, b) => firstDay(a).localeCompare(firstDay(b)));
  const t0 = all.map(firstDay).sort()[0];
  const t1 = all.map(lastDay).sort().at(-1)!;
  const W = 14;
  const N = dayDiff(t0, t1) + 1;
  const X = (s: ISODate) => dayDiff(t0, s) * W;

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

  $("tl").innerHTML =
    `<div class="tl-hd"><div class="tl-name"></div><div class="tl-track" style="width:${N * W}px">${header}</div></div>` +
    all.map((m) => `<div class="tl-row" data-scroll="mk${m.id}" title="${esc(m.n)}: ${esc(rangeText(m))}">
        <div class="tl-name">${esc(m.n)} <span style="color:var(--ink2)">· ${esc(m.city)}</span></div>
        <div class="tl-track" style="width:${N * W}px">${weekendBg}${sel}${today}${segments(m)
          .map(([a, b]) => `<div class="tl-bar ${m.ind ? "ind" : ""}" style="left:${X(a) + 1}px;width:${(dayDiff(a, b) + 1) * W - 2}px"></div>`)
          .join("")}</div>
      </div>`).join("");
}

function marketCard(m: Market, km: number, sat: ISODate, sun: ISODate, inPlan: boolean): string {
  const [cls, txt] = marketStatus(m);
  const oS = openOn(m, sat);
  const oU = openOn(m, sun);
  return `<article class="mk ${cls === "ended" ? "closed" : ""}" id="mk${m.id}">
    <div class="top" style="display:flex;justify-content:space-between;gap:8px;align-items:start">
      <div><h3 style="font-size:17px;font-weight:600;line-height:1.2">${esc(m.n)}</h3><div class="city">📍 ${esc(m.city)} · ~${Math.round(km)} km</div></div>
      <span class="pill ${cls}">${txt}</span>
    </div>
    <div class="dates">📅 ${rangeText(m)}${m.ind ? ' <span class="tag warn">indicative</span>' : ""}</div>
    <div class="small">🕒 ${esc(m.hrs)}</div>
    <div class="desc">${esc(m.desc)}</div>
    <div class="tags"><span class="tag">${m.in ? "Indoor / underground" : "Outdoor"}</span><span class="tag">~${m.d} h visit</span>${m.a === 0 ? '<span class="tag ok">Free entry</span>' : ""}</div>
    <div class="small">🎟️ ${esc(m.price)}</div>
    <div class="wkst"><span class="${oS ? "y" : "n"}">Sat ${short(sat)} ${oS ? "✓" : "✕"}</span><span class="${oU ? "y" : "n"}">Sun ${short(sun)} ${oU ? "✓" : "✕"}</span></div>
    <div class="btns">
      <button class="btn xr sm" data-mk="${m.id}" data-day="sat" ${oS ? "" : "disabled title='Closed on this Saturday'"}>+ Saturday</button>
      <button class="btn g sm" data-mk="${m.id}" data-day="sun" ${oU ? "" : "disabled title='Closed on this Sunday'"}>+ Sunday</button>
      ${inPlan ? '<span class="tag ok" style="align-self:center">✓ in plan</span>' : ""}
    </div>
    <a class="lnk" href="https://www.google.com/search?q=${encodeURIComponent(`${m.n} ${m.city} 2026`)}" target="_blank" rel="noopener">Official info & tickets ↗</a>
  </article>`;
}

function renderChristmas(): void {
  const sat = satISO();
  const sun = addDays(sat, 1);
  const home = homeLL();

  $("wks").innerHTML = WEEKENDS.map((s) => {
    const n = MARKETS.filter((m) => openOnWeekend(m, s)).length;
    return `<button class="wkc ${s === sat ? "on" : ""}" data-wk="${s}"><b>${short(s)}–${short(addDays(s, 1))}</b><span class="n">${n ? `🎄 ${n} market${n > 1 ? "s" : ""}` : "—"}</span></button>`;
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
  list.sort((x, y) =>
    sort === "dist" ? x.km - y.km
    : sort === "end" ? lastDay(x.m).localeCompare(lastDay(y.m))
    : firstDay(x.m).localeCompare(firstDay(y.m)));

  const inPlan = new Set([...state.plan.sat, ...state.plan.sun].map((p) => p.mk));
  $("xcount").textContent = `${list.length} market${list.length === 1 ? "" : "s"}${
    input("xOpen").checked ? ` open on ${short(sat)}–${short(sun)}` : ""} · distances from ${select("home").value}`;

  const seasonStart = MARKETS.map(firstDay).sort()[0];
  $("xgrid").innerHTML = list.length
    ? list.map(({ m, km }) => marketCard(m, km, sat, sun, inPlan.has(m.id))).join("")
    : `<div class="panel empty">No Christmas markets open on this weekend${
        sat < seasonStart ? ` yet — the season starts ${fmtD(seasonStart, { weekday: "long", day: "numeric", month: "long" })}. Pick a later weekend above.` : "."}</div>`;

  const seasonEnd = MARKETS.map(lastDay).sort().at(-1)!;
  $("xbanner").innerHTML = `<span><b>🎄 Christmas market season</b><br>${
    openCount ? `${openCount} market${openCount > 1 ? "s" : ""} open on your chosen weekend`
    : `Season runs ${short(seasonStart)} – ${short(seasonEnd)}, see all start & end dates`}</span><span>View markets →</span>`;
}

// ---------- plan & budget ----------
function itemWarning(p: PlanItem, date: ISODate): string {
  if (p.mk) {
    const m = MARKETS.find((x) => x.id === p.mk);
    if (m && !openOn(m, date)) return `<span class="tag warn">Closed on ${short(date)} · open ${rangeText(m)}</span>`;
  }
  if (p.ref) {
    const a = ACTS.find((x) => x.id === p.ref);
    if (a?.m && !a.m.includes(monthOf(date))) return `<span class="tag warn">Out of season on this date</span>`;
  }
  return "";
}

function dayHTML(day: DayKey): string {
  const items = state.plan[day];
  const date = dateOf(day);
  const hrs = items.reduce((s, p) => s + (p.d || 0), 0);
  const head = `<h4><span>${dayName(day)} ${short(date)}</span><span>${items.length ? `${hrs} h${hrs > 10 ? " ⚠️ busy!" : ""}` : ""}</span></h4>`;
  if (!items.length) return head + `<div class="empty">Nothing planned yet — add activities from the list.</div>`;
  const other = day === "sat" ? "Sunday" : "Saturday";
  return head + items.map((p) => {
    const edit = p.g
      ? `€ per boat <input type="number" min="0" step="1" value="${p.g.p}" data-edit="g" data-day="${day}" data-uid="${p.uid}"> (≤${p.g.size} people)`
      : `Adult € <input type="number" min="0" step="0.5" value="${p.a}" data-edit="a" data-day="${day}" data-uid="${p.uid}">
         ${p.c === null ? '<span class="tag warn">adults only</span>'
           : `Child € <input type="number" min="0" step="0.5" value="${p.c}" data-edit="c" data-day="${day}" data-uid="${p.uid}">`}`;
    return `<div class="item">
      <div><div class="nm">${p.mk ? "🎄 " : ""}${esc(p.n)}</div><div class="city">${esc(p.city)}</div>${itemWarning(p, date)}${
        p.unk ? '<span class="tag warn">Entry price not published — enter it below</span>' : ""}</div>
      <div><button class="x" title="Move to ${other}" data-move="${p.uid}" data-day="${day}">⇄</button><button class="x" title="Remove" data-remove="${p.uid}" data-day="${day}">×</button></div>
      <div class="ed">${edit}</div>
    </div>`;
  }).join("");
}

function updatePlan(rerender = true): void {
  if (rerender) {
    $("day-sat").innerHTML = dayHTML("sat");
    $("day-sun").innerHTML = dayHTML("sun");
  }
  const s = readSettings();
  $("trainOpts").style.display = s.mode === "train" ? "" : "none";
  $("carOpts").style.display = s.mode === "car" ? "" : "none";

  const r = calculateBudget(state.plan, s, homeLL());
  $("tot").textContent = eur(Math.round(r.total));
  $("perP").textContent = r.total
    ? `${eur(Math.round(r.total / r.people))} per person · ${r.people} ${r.people === 1 ? "person" : "people"} · ~${Math.round(r.km)} km travel`
    : "Add an activity to start.";

  const parts: [string, number, string][] = [
    ["Tickets", r.tickets, "#ff6a13"],
    ["Transport", r.transport, "#5b8def"],
    ["Food", r.food, "#f2c14e"],
    ["Stay", r.lodging, "#4cc38a"],
    ["Buffer", r.extras, "#a78bfa"],
  ];
  $("bar").innerHTML = r.total
    ? parts.map(([l, v, c]) => `<div style="width:${(v / r.total) * 100}%;background:${c}" title="${l}"></div>`).join("")
    : "";
  $("leg").innerHTML = parts
    .map(([l, v, c]) => `<span><i class="d" style="background:${c}"></i>${l}</span><span>${eur(Math.round(v))}</span>`)
    .join("");

  let cls = "na";
  let msg: string;
  if (s.target > 0 && r.total) {
    const diff = s.target - r.total;
    cls = diff >= 0 ? "ok" : "over";
    msg = diff >= 0
      ? `✓ Within budget — ${eur(Math.round(diff))} left over`
      : `✕ ${eur(Math.round(-diff))} over budget. Try day trips, cheaper food or free activities.`;
  } else {
    msg = s.target > 0 ? "Add activities to compare with your budget." : "Set a budget to compare.";
  }
  if (r.adultsOnlyWarn) msg += "<br><span style='font-weight:400'>⚠️ Your plan includes an adults-only activity — kids aren't counted for it.</span>";
  if (r.overnightIgnored) msg += "<br><span style='font-weight:400'>ℹ️ Overnight stay only counts when you plan both days.</span>";
  const st = $("status");
  st.className = `status ${cls}`;
  st.innerHTML = msg;
  $("fab").textContent = `Plan · ${eur(Math.round(r.total))}`;
  persist();
}

function refreshAll(): void {
  updatePlan();
  renderActivities();
  renderChristmas();
}

function planText(): string {
  const s = readSettings();
  const r = calculateBudget(state.plan, s, homeLL());
  const sat = satISO();
  const lines = [
    `🇳🇱 Weekend plan ${short(sat)}–${fmtD(addDays(sat, 1), { day: "numeric", month: "short", year: "numeric" })} (${r.adults} adults${r.kids ? `, ${r.kids} kids` : ""}, from ${s.home})`,
    "",
  ];
  for (const d of ["sat", "sun"] as DayKey[]) {
    if (!state.plan[d].length) continue;
    lines.push(`${dayName(d).toUpperCase()} ${short(dateOf(d))}`);
    for (const p of state.plan[d]) lines.push(`• ${p.n} (${p.city}) – ${eur(priceFor(p, r.adults, r.kids))}`);
    lines.push("");
  }
  lines.push(`Tickets ${eur(Math.round(r.tickets))} | Transport ${eur(Math.round(r.transport))} | Food ${eur(Math.round(r.food))} | Stay ${eur(Math.round(r.lodging))} | Buffer ${eur(Math.round(r.extras))}`);
  lines.push(`TOTAL ≈ ${eur(Math.round(r.total))} (${eur(Math.round(r.total / r.people))} pp)`);
  return lines.join("\n");
}

// ---------- views ----------
type View = "all" | "christmas";
function showView(v: View): void {
  const x = v === "christmas";
  $("view-christmas").hidden = !x;
  $("view-all").hidden = x;
  document.querySelectorAll<HTMLElement>(".tab").forEach((t) => t.classList.toggle("on", t.dataset.v === v));
  try {
    history.replaceState(null, "", x ? "#christmas" : location.pathname + location.search);
  } catch {
    /* sandboxed frames may refuse */
  }
}

// ---------- setup ----------
function setupSelects(): void {
  const cityNames = Object.keys(CITIES).sort();
  select("home").innerHTML = cityNames.map((c) => `<option ${c === "Amsterdam" ? "selected" : ""}>${c}</option>`).join("");
  select("cCity").innerHTML = cityNames.map((c) => `<option>${c}</option>`).join("");
  const actCities = [...new Set(ACTS.map((a) => a.city))].sort();
  select("fCity").innerHTML += actCities.map((c) => `<option>${c}</option>`).join("");
  $("cats").innerHTML = `<button class="chip on" data-c="">All</button>` +
    (Object.entries(CATS) as [CategoryKey, [string, string]][])
      .map(([k, [icon, label]]) => `<button class="chip" data-c="${k}">${icon} ${label}</button>`).join("");
  select("wk").innerHTML = WEEKENDS.map((s) => {
    const n = MARKETS.filter((m) => openOnWeekend(m, s)).length;
    return `<option value="${s}">${fmtD(s)} – ${fmtD(addDays(s, 1))}${n ? ` · 🎄 ${n} markets` : ""}</option>`;
  }).join("");
}

function bindEvents(): void {
  // category chips
  $("cats").addEventListener("click", (e) => {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>(".chip");
    if (!b) return;
    state.cat = (b.dataset.c || null) as CategoryKey | null;
    $("cats").querySelectorAll(".chip").forEach((x) => x.classList.toggle("on", x === b));
    renderActivities();
  });

  // add buttons (activities + markets)
  document.addEventListener("click", (e) => {
    const t = e.target as HTMLElement;
    const add = t.closest<HTMLButtonElement>("[data-act],[data-mk]");
    if (add && !add.disabled) {
      const day = add.dataset.day as DayKey;
      if (add.dataset.act) addActivity(Number(add.dataset.act), day);
      else addMarket(Number(add.dataset.mk), day);
      return;
    }
    const mv = t.closest<HTMLElement>("[data-move]");
    if (mv) return moveItem(mv.dataset.day as DayKey, Number(mv.dataset.move));
    const rm = t.closest<HTMLElement>("[data-remove]");
    if (rm) return removeItem(rm.dataset.day as DayKey, Number(rm.dataset.remove));
    const wk = t.closest<HTMLElement>("[data-wk]");
    if (wk) {
      select("wk").value = wk.dataset.wk!;
      return refreshAll();
    }
    const sc = t.closest<HTMLElement>("[data-scroll]");
    if (sc) document.getElementById(sc.dataset.scroll!)?.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  // inline price edits in the plan
  $("plan").addEventListener("input", (e) => {
    const el = e.target as HTMLInputElement;
    if (el.dataset.edit) editItem(el.dataset.day as DayKey, Number(el.dataset.uid), el.dataset.edit as "a" | "c" | "g", el.value);
  });

  // filters
  ["q", "fCity", "sort", "fOpen", "fIndoor", "fKids", "fFree", "fMax"].forEach((id) => $(id).addEventListener("input", renderActivities));
  ["xOpen", "xIn", "xFree", "xSort"].forEach((id) => $(id).addEventListener("input", renderChristmas));

  // budget settings
  ["adults", "kids", "mode", "offpeak", "fuel", "cons", "park", "food", "stay", "buffer", "target"].forEach((id) =>
    $(id).addEventListener("input", () => updatePlan(false)));
  $("home").addEventListener("input", () => { updatePlan(false); renderActivities(); renderChristmas(); });
  $("wk").addEventListener("input", refreshAll);

  // custom activity
  $<HTMLFormElement>("custom").addEventListener("submit", (e) => {
    e.preventDefault();
    const city = select("cCity").value;
    const day = select("cDay").value as DayKey;
    state.plan[day].push({
      uid: state.uid++, ref: null, n: input("cName").value.trim() || "My activity", city, ll: CITIES[city],
      a: Number(input("cA").value) || 0, c: Number(input("cC").value) || 0, g: null, d: 2,
    });
    input("cName").value = "";
    toast("Custom activity added");
    updatePlan();
  });

  // copy / clear
  $("copy").addEventListener("click", async () => {
    const txt = planText();
    try {
      await navigator.clipboard.writeText(txt);
      toast("Plan copied to clipboard");
    } catch {
      let ta = document.getElementById("cpy") as HTMLTextAreaElement | null;
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

  // tabs
  document.querySelectorAll<HTMLElement>(".tab").forEach((t) =>
    t.addEventListener("click", () => {
      showView(t.dataset.v as View);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }));
  $("xbanner").addEventListener("click", () => {
    showView("christmas");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  window.addEventListener("hashchange", () => showView(location.hash === "#christmas" ? "christmas" : "all"));
}

function init(): void {
  setupSelects();
  restore();
  if (!WEEKENDS.includes(select("wk").value)) select("wk").value = WEEKENDS[0];
  bindEvents();
  refreshAll();
  showView(location.hash === "#christmas" ? "christmas" : "all");
}

init();
