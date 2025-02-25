import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function assertIsNode(e: EventTarget | null): asserts e is Node {
  if (!e || !("nodeType" in e)) {
    throw new Error(`Node expected`);
  }
}

export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  );
}

function hasSlug(slug?: string): asserts slug is string {
  if (slug == undefined) {
    throw new Error("Slug is undefined");
  }
}

function splitSlug(slug?: string): [string, string] {
  hasSlug(slug);

  var split = slug.split("/");

  if (split.length < 2) {
    throw new Error("Cant get Year, month from slug");
  }

  return [split[0], split[1]];
}

export function getYearFromSlug(slug?: string): string {
  var split = splitSlug(slug);

  return split[0];
}

export function getMonthFromSlug(slug?: string): string {
  var split = splitSlug(slug);

  return split[1];
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}