import { categories } from "@/data/categories";
import { tools } from "@/data/tools";
import type { Category } from "@/types/category";
import type { Tool } from "@/types/tool";

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getAllTools(): Tool[] {
  return tools;
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(categorySlug: string): Tool[] {
  return tools.filter((tool) => tool.categorySlug === categorySlug);
}

export function getFeaturedTools(): Tool[] {
  return tools.filter((tool) => tool.featured);
}

export function getRecentTools(limit = 6): Tool[] {
  return [...tools]
    .sort((a, b) => (a.addedAt < b.addedAt ? 1 : -1))
    .slice(0, limit);
}

export function getRelatedTools(tool: Tool): Tool[] {
  return tool.relatedTools
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is Tool => Boolean(t));
}
