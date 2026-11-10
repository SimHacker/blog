export type Tag = {
  name: string;
  slug: string;
  description: string;
  parent?: string;
  children: Tag[]; // Ensure children is included
};

export type Article = {
  title: string;
  slug: string;
  tags: string[];
  imported: boolean;
  mediumUrl?: string;
  pinned?: boolean; // New property for pinned articles
};

export interface MarkdownModule {
  default: string;
};
