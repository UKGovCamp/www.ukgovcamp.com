import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

const authors = defineCollection({
  loader: glob({
    pattern: "*.yaml",
    base: "./authors",
  }),
  schema: z.object({
    name: z.string(),
    pronouns: z.string().optional(),
  }),
});

const wordpressExport = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./wordpress-export",
    generateId: ({ entry, data }) => {
      const date = data.date as Date;
      if (!date) return entry.replace(/\/index\.md/, "");
      return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}/${entry.replace(/\/index\.md/, "")}`;
    },
  }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: reference("authors"),
  }),
});

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./posts",
  }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: reference("authors"),
    excerpt: z.string().optional(),
  }),
});

export const collections = { posts, wordpressExport, authors };
