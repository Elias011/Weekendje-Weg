import type { Plan, Settings } from "./types";

const KEY = "wkw";

export interface Saved {
  plan: Plan;
  uid: number;
  s: Partial<Record<keyof Settings, string | boolean>>;
}

/** localStorage can be missing or throw (private mode, sandboxed frames), so never trust it. */
export function loadState(): Saved | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<Saved>;
    if (!data.plan || !Array.isArray(data.plan.sat) || !Array.isArray(data.plan.sun)) return null;
    return { plan: data.plan, uid: data.uid ?? 1000, s: data.s ?? {} };
  } catch {
    return null;
  }
}

export function saveState(state: Saved): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}
