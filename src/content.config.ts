import { defineCollection, type ImageFunction } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

export const seoSchemaWithoutImage = z.object({
  title: z.string(),
  description: z.string(),
  type: z.string().optional(),
  keywords: z.string().optional(),
  canonicalUrl: z.string().optional(),
  twitter: z.object({
    creator: z.string().optional(),
  }).optional(),
  robots: z.string().optional(),
})

const seoSchema = (image: ImageFunction) =>
  z.object({
    image: image().optional(),
  }).merge(seoSchemaWithoutImage);

const pageCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/pages' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    seo: seoSchema(image),
  }),
});

const linkCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.yml', base: './src/content/links' }),
  schema: z.object({
    label: z.string(),
    name: z.string(),
    url: z.string(),
  }),
});

const jobCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/jobs' }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    location: z.string(),
    from: z.number(),
    to: z.number(),
    url: z.string(),
  }),
});

const researchCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/researches' }),
  schema: z.object({
    title: z.string(),
    lab: z.string(),
    location: z.string(),
    from: z.number(),
    to: z.number(),
    url: z.string(),
  }),
});

const teachingCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/teachings' }),
  schema: z.object({
    title: z.string(),
    institution: z.string(),
    location: z.string(),
    from: z.number(),
    to: z.number(),
    url: z.string(),
  }),
});

const projectCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    url: z.string(),
  }),
});

const postCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.date(),
      authors: z.array(z.string()).optional(),
      draft: z.boolean().optional(),
      category: z.string().optional(),
      image: image().optional(),
      seo: seoSchema(image),
    }),
});

export const collections = {
  pages: pageCollection,
  links: linkCollection,
  jobs: jobCollection,
  researches: researchCollection,
  teachings: teachingCollection,
  projects: projectCollection,
  posts: postCollection,
};
