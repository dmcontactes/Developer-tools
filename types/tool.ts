export interface Tool {
  slug: string;
  name: string;
  categorySlug: string;
  shortDescription: string;
  seoTitle: string;
  seoDescription: string;
  icon: string;
  keywords: string[];
  relatedTools: string[];
  relatedGuides: string[];
  clientSide: boolean;
  featured: boolean;
  addedAt: string;
  component: string;
}
