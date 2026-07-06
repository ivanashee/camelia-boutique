export function formatGs(v: number): string {
  return "Gs. " + Math.round(v).toLocaleString("es-PY");
}

export function truncate(s: string, n = 90): string {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}
