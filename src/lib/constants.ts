import type { z } from 'astro/zod';
import MetaDefaultImage from '@/assets/images/meta-default.png';
import type { seoSchemaWithoutImage } from '@/content.config';
import astroConfig from 'astro.config.mjs';

export type AuthorInfo = {
  name: string;
  headline: string;
  location?: string;
}

export type Seo = z.infer<typeof seoSchemaWithoutImage> & {
  image?: any;
}

type DefaultConfigurationType = {
  baseUrl: string,
  author: AuthorInfo;
  seo: Seo;
}

export const DEFAULT_CONFIGURATION: DefaultConfigurationType = {
  baseUrl: astroConfig.site || 'https://rosalesi.github.io',
  author: {
    name: 'Ivan Rosales',
    headline: 'MSCS',
    location: 'Duke',
  },
  seo: {
    title: 'Ivan Rosales',
    description: 'Hey I\'m Ivan, a student passionate about low-level systems and algorithms.',
    type: 'website',
    image: MetaDefaultImage,
    robots: 'noindex, nofollow',
  }
};