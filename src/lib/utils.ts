import type { Tag } from '$lib/types';

export function buildTagTree(tags: { name: string; slug: string; description: string; parent: string }[]): Tag[] {
  const tagMap: { [key: string]: Tag } = {};
  tags.forEach(tag => {
    tagMap[tag.slug] = { ...tag, children: [] };
  });

  const rootTags: Tag[] = [];
  Object.values(tagMap).forEach(tag => {
    if (tag.parent) {
      tagMap[tag.parent].children.push(tag);
    } else {
      rootTags.push(tag);
    }
  });

  return rootTags;
}