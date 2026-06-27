import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, locale: string = "tr-TR"): string {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateTime(date: string | Date, locale: string = "tr-TR"): string {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatCurrency(amount: number, currency: string = "TRY"): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function generateCaseNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `KZ-${year}${month}${day}-${random}`;
}

export function generateFineNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const random = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `CZ-${year}${month}-${random}`;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function validateTCKimlik(tc: string): boolean {
  if (!tc || tc.length !== 11) return false;
  if (!/^\d{11}$/.test(tc)) return false;
  if (tc[0] === "0") return false;

  const digits = tc.split("").map(Number);
  const sum1 = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
  const sum2 = digits[1] + digits[3] + digits[5] + digits[7];
  const check10 = (sum1 * 7 - sum2) % 10;
  if (check10 !== digits[9]) return false;

  const sumAll = digits.slice(0, 10).reduce((a, b) => a + b, 0);
  const check11 = sumAll % 10;
  if (check11 !== digits[10]) return false;

  return true;
}

export function validatePlate(plate: string): boolean {
  // Turkish plate format: 06 AB 123, 06 ABC 12, 06 ABC 123, etc.
  const normalized = plate.replace(/\s/g, "").toUpperCase();
  const patterns = [
    /^\d{2}[A-Z]{1,3}\d{2,4}$/, // Standard format
    /^\d{2}[A-Z]{1,3}\d{2,3}[A-Z]$/, // With letter at end
  ];
  return patterns.some((p) => p.test(normalized));
}

export function formatPlate(plate: string): string {
  const normalized = plate.replace(/\s/g, "").toUpperCase();
  if (normalized.length >= 6) {
    return `${normalized.slice(0, 2)} ${normalized.slice(2, -2)} ${normalized.slice(-2)}`;
  }
  return normalized;
}

export function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function isValidFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.some((type) => {
    if (type.endsWith("/*")) {
      return file.type.startsWith(type.slice(0, -1));
    }
    return file.type === type;
  });
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Bilinmeyen bir hata oluştu";
}