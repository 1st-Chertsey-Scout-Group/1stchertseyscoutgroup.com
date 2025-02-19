import { defineCollection, z } from "astro:content";

const newsCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      author: z.string(),
      thumbnail: image().optional(),
      excerpt: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
});

const sectionsCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      section: z.string(),
      tags: z.array(z.string()).optional(),
      meeting: z.object({
        day: z.string(),
        start: z.string().transform((x) => x.trim()),
        end: z.string().transform((x) => x.trim()),
      }),
      programmeAndEvents: z
        .object({
          programmeFeed: z.string().optional(),
          eventsFeed: z.string().optional(),
          caption: z.string(),
          image: image(),
          imageAlt: z.string(),
        })
        .optional(),

      latestNews: z
        .object({
          caption: z.string(),
          image: image(),
          imageAlt: z.string(),
        })
        .optional(),

      uniform: z
        .object({
          url: z.string(),
          caption: z.string(),
          image: image(),
          imageAlt: z.string(),
        })
        .optional(),

      badges: z
        .object({
          url: z.string(),
          caption: z.string(),
          image: image(),
          imageAlt: z.string(),
        })
        .optional(),

      leaders: z
        .array(
          z.object({
            role: z.string(),
            name: z.string(),
            aka: z.string().optional(),
          })
        )
        .optional(),
    }),
});

export const collections = {
  news: newsCollection,
  sections: sectionsCollection,
};
