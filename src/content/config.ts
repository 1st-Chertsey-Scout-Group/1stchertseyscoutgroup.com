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

export const collections = {
  news: newsCollection,
};
