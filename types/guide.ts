export interface Guide {
  slug: string;
  title: string;
  categorySlug?: string;
  relatedTools: string[];
  seoTitle: string;
  seoDescription: string;
  publishedAt: string;
  updatedAt: string;
  contentPath: string;
}
