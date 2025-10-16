export type DayKey = { key: string; label: string; date: Date };

export function getLastNDays(n: number): DayKey[] {
  const days: DayKey[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = formatDateKey(d);
    const label = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    days.push({ key, label, date: d });
  }
  return days;
}

export function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function countByDayKeys<T>(items: T[], days: DayKey[], getDate: (item: T) => Date | null | undefined): number[] {
  const counts: Record<string, number> = Object.fromEntries(days.map((d) => [d.key, 0]));
  for (const it of items) {
    const dt = getDate(it);
    if (!dt) continue;
    const d = new Date(dt);
    d.setHours(0, 0, 0, 0);
    const key = formatDateKey(d);
    if (key in counts) counts[key] += 1;
  }
  return days.map((d) => counts[d.key] ?? 0);
}

export function getLastNDaysFromData<T>(items: T[], n: number, getDate: (item: T) => Date | null | undefined): DayKey[] {
  const keys = new Set<string>();
  const byKey = new Map<string, Date>();
  for (const it of items) {
    const d = getDate(it);
    if (!d) continue;
    const date = new Date(d);
    date.setHours(0, 0, 0, 0);
    const key = formatDateKey(date);
    if (!keys.has(key)) {
      keys.add(key);
      byKey.set(key, date);
    }
  }
  const sorted = Array.from(keys.values()).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  const picked = sorted.slice(Math.max(0, sorted.length - n));
  return picked.map((key) => {
    const d = byKey.get(key)!;
    const label = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    return { key, label, date: d };
  });
}


