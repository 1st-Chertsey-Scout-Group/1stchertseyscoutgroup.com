import type { ActionLink, MenuLink } from "@/types";

export const navigation: Array<MenuLink | ActionLink> = [
  {
    type: "link",
    text: "Sections",
    href: "",
    links: [
      {
        type: "link",
        text: "Squirrels",
        href: "/sections/squirrels",
      },
      {
        type: "link",
        text: "Abbey Beavers",
        href: "/sections/abbey-beavers",
      },
      {
        type: "link",
        text: "Bourne Beavers",
        href: "/sections/bourne-beavers",
      },
      {
        type: "link",
        text: "Dons Cubs",
        href: "/sections/dons-cubs",
      },
      {
        type: "link",
        text: "Hunters Cubs",
        href: "/sections/hunters-cubs",
      },
      {
        type: "link",
        text: "Scouts",
        href: "/sections/scouts",
      },
      {
        type: "link",
        text: "Explorers",
        href: "/sections/explorers",
      },
    ],
  },
  {
    type: "link",
    text: "About us",
    href: "",
    links: [
      {
        type: "link",
        text: "Our Group",
        href: "/our-group",
      },
      {
        type: "link",
        text: "Our History",
        href: "/our-history",
      },
    ],
  },
  {
    type: "action",
    text: "Donate",
    variant: "primary",
    href: "/donate",
  },
  {
    type: "link",
    text: "Contact",
    href: "/get-in-touch",
  },
];
