import { getCollection } from 'astro:content';
import { DEFAULT_CONFIGURATION } from './constants';

const isPublished = (draft: boolean | undefined) => draft !== true;

export const formatPostAuthors = (authors: string[] | undefined) =>
  authors?.join(', ') ?? DEFAULT_CONFIGURATION.author.name;

export const getPublishedPosts = async () => {
  return (await getCollection('posts'))
    .filter((post) => isPublished(post.data.draft))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
};
