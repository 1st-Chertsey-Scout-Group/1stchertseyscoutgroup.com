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

function hasSlug(slug?: string): asserts slug is string {
  if (slug == undefined) {
    throw new Error("Slug is undefined");
  }
}

function splitSlug(slug?: string): [string, string, string] {
  hasSlug(slug);

  var split = slug.split("/");

  if (split.length < 3) {
    throw new Error("Cant get Year, month and day from slug");
  }

  return [split[0], split[1], split[2]];
}

export function getYearFromSlug(slug?: string): string {
  var split = splitSlug(slug);

  return split[0];
}

export function getMonthFromSlug(slug?: string): string {
  var split = splitSlug(slug);

  return split[1];
}

export function getDayFromSlug(slug?: string): string {
  var split = splitSlug(slug);

  return split[2];
}
