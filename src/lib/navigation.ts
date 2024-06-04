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
        href: "/squirrels",
      },
      {
        type: "link",
        text: "Abbey Beavers",
        href: "/abbey-beavers",
      },
      {
        type: "link",
        text: "Bourne Beavers",
        href: "/bourne-beavers",
      },
      {
        type: "link",
        text: "Dons Cubs",
        href: "/dons-cubs",
      },
      {
        type: "link",
        text: "Hunters Cubs",
        href: "/hunters-cubs",
      },
      {
        type: "link",
        text: "Scouts",
        href: "/scouts",
      },
      {
        type: "link",
        text: "Intrepid Explorers",
        href: "/intrepid-explorers",
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
      /*{
        type: "link",
        text: "Our History",
        href: "/our-history",
      },*/
    ],
  },
  {
    type: "link",
    text: "News",
    href: "/news",
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
