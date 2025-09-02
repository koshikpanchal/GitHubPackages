const BYTES_PER_GB = 1_000_000_000; // or: 1024 ** 3

export const toBillions = (n: number) => n / 1_000_000_000;
export const toGBs = (bytes: number) => bytes / BYTES_PER_GB;

export const fmtNumber = (n: number, digits = 2) =>
  new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  }).format(n);

export const fmtBillions = (hits: number, digits = 2) =>
  `${fmtNumber(toBillions(hits), digits)}`;

export const fmtGBs = (bytes: number, digits = 2) =>
  `${fmtNumber(toGBs(bytes), digits)}`;

export const fmtPctChange = (current: number, previous: number, digits = 2) => {
  if (previous === 0 || !isFinite(previous)) return "—";
  const pct = ((current - previous) / previous) * 100;
  const sign = pct > 0 ? "+" : "";
  return `${sign}${fmtNumber(pct, digits)}%`;
};
