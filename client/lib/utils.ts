import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BYTES_PER_GB = 1_000_000_000_000;

export const toBillions = (n: number) => n / 1_000_000_000;
export const billionsToNumber = (n: number) => n * 1_000_000_000;
export const toGbs = (bytes: number) => bytes / BYTES_PER_GB;
export const toBytes = (bytes: number) => bytes * BYTES_PER_GB;

export const formatNumber = (n: number, digits = 2) =>
  new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  }).format(n);

export const formatToBillions = (hits: number, digits = 2) =>
  `${formatNumber(toBillions(hits), digits)}`;

export const formatBillionsToNumber = (hits: number, digits = 2) =>
  `${formatNumber(billionsToNumber(hits), digits)}`;

export const formatToGbs = (bytes: number, digits = 2) =>
  `${formatNumber(toGbs(bytes), digits)}`;

export const formatToBytes = (gbs: number, digits = 2) =>
  `${formatNumber(toBytes(gbs), digits)}`;

export const formatPercentageChange = (
  current: number,
  previous: number,
  digits = 2,
) => {
  if (previous === 0 || !isFinite(previous)) return "—";
  const pct = ((current - previous) / previous) * 100;
  const sign = pct > 0 ? "+" : "";
  return Number(`${sign}${formatNumber(pct, digits)}`);
};
