import type { HTMLAttributes } from "astro/types";

export interface SplitSlug {
  year: string;
  month: string;
  day: string;
}

export interface QuickLink {
  text?: string;
  href?: string;
}

export interface CallToAction extends HTMLAttributes<a> {
  variant?: "primary" | "secondary" | "tertiary" | "link";
  text?: string;
  icon?: string;
  classes?: Record<string, string>;
  type?: "button" | "submit" | "reset";
}

interface Link {
  type: "action" | "link";
  text?: string;
  href?: string;
  ariaLabel?: string;
  icon?: string;
}

interface ActionLink extends CallToAction {
  type: "action";
}

interface MenuLink extends Link {
  type: "link";
  links?: Array<MenuLink>;
}
