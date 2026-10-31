# Weekendje Weg 🇳🇱

A web app to find weekend activities and Christmas markets in the Netherlands and calculate the budget.

## Features
- 40+ activities across the Netherlands (museums, nature, theme parks, sightseeing, seasonal events)
- Filters: category, city, indoor (rain plan), kid-friendly, free, max price, "in season on my weekend"
- Plan Saturday and Sunday for a chosen weekend, move items between days, edit prices, add your own activities
- Budget calculator: tickets, transport (NS train or car), food, overnight stay, buffer
- Compare against your budget and copy the plan as text
- 🎄 Christmas markets 2026: 19 markets with start & end dates, weekend picker, season timeline, open/closed status and a warning if a market is closed on your plan day

## Project structure

```
index.html        Page markup
styles.css        Styles
src/
  types.ts        Shared TypeScript types (Activity, Market, PlanItem, Settings, Budget…)
  data.ts         Cities, activities and Christmas markets
  dates.ts        Date helpers: market open days, status, weekends
  budget.ts       Distance, train fares and the budget calculation
  storage.ts      Save/load the plan in localStorage
  main.ts         UI: rendering and event handling
dist/app.js       Compiled bundle loaded by index.html (committed so GitHub Pages works without a build step)
```

## Development

```bash
npm install
npm run build      # type-check with tsc, then bundle src/ → dist/app.js with esbuild
npm run watch      # rebuild on every change
npm run serve      # serve the folder locally
```

You can also just open `index.html` in a browser after building.

**After changing anything in `src/`, run `npm run build` and commit `dist/app.js` too.**

### Adding a Christmas market
Add an entry to `MARKETS` in `src/data.ts`. Use `start`/`end` (and optional `closed`) for a continuous period, or `days` for specific dates. TypeScript will tell you if a field is missing.

## Deploy
Enable GitHub Pages: Settings → Pages → deploy from branch `main`, folder `/ (root)`.

> Prices are approximate 2026 estimates. Always check the official site before booking.
