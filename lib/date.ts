export function parseDateSafe(input: unknown): Date | null {
  if (input === null || input === undefined) return null;
  if (input instanceof Date) return isNaN(input.getTime()) ? null : input;
  if (typeof input === 'number') {
    const n = input < 1e12 ? input * 1000 : input;
    const d = new Date(n);
    return isNaN(d.getTime()) ? null : d;
  }
  if (typeof input === 'string') {
    const s = input.trim();
    if (!s) return null;
    const asNum = Number(s);
    if (!Number.isNaN(asNum)) {
      const n = asNum < 1e12 ? asNum * 1000 : asNum;
      const d = new Date(n);
      return isNaN(d.getTime()) ? null : d;
    }
    const d = new Date(s);
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
}

export function formatDateSafe(input: unknown, options?: Intl.DateTimeFormatOptions): string {
  const d = parseDateSafe(input);
  if (!d) return '—';
  return d.toLocaleDateString(undefined, options);
}


