import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BENGALI_TO_ENGLISH_DIGITS: Record<string, string> = {
  '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
  '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9',
};

const ENGLISH_TO_BENGALI_DIGITS: Record<string, string> = {
  '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
  '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
};

export function parseBengaliPrice(value: string | number | undefined | null): number {
  if (typeof value === 'number') return isNaN(value) ? 0 : value;
  if (!value) return 0;

  // Convert Bengali numerals to ASCII English digits
  const asciiStr = value.toString().replace(/[০-৯]/g, (digit) => BENGALI_TO_ENGLISH_DIGITS[digit] || digit);

  // Remove currency symbols, commas, and all non-digit/decimal characters
  const cleaned = asciiStr.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

export function toBengaliNumerals(value: number | string): string {
  const formatted = typeof value === 'number' ? value.toLocaleString('en-US') : value.toString();
  return formatted.replace(/[0-9]/g, (d) => ENGLISH_TO_BENGALI_DIGITS[d] || d);
}
