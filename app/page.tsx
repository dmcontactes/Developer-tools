import Link from "next/link";
import { SearchBar } from "@/components/layout/search-bar";
import { CategoryCard } from "@/components/home/category-card";
import { ToolCard } from "@/components/home/tool-card";
import { Icon } from "@/components/ui/icon";
import { getAllCategories, getFeaturedTools, getRecentTools } from "@/lib/data";
import { SITE_DESCRIPTION, SITE_TAGLINE } from "@/lib/constants";

export default function HomePage() {
  const categories = getAllCategories();
  const popularTools = getFeaturedTools();
  const recentTools = getRecentTools(6);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <section className="flex flex-col items-center gap-6 py-16 text-center sm:py-24">
        <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {SITE_TAGLINE}
        </h1>
        <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
          {SITE_DESCRIPTION}
        </p>
        <SearchBar size="lg" className="max-w-xl" />
      </section>

      <section className="pb-16">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-medium text-muted-foreground">
            Categories
          </h2>
          <Link
            href="/tools"
            className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View all tools
            <Icon name="ArrowRight" className="size-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className="pb-16">
        <h2 className="mb-5 text-sm font-medium text-muted-foreground">
          Popular tools
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {popularTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="pb-16">
        <h2 className="mb-5 text-sm font-medium text-muted-foreground">
          Recently added
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {recentTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="border-t border-border py-10">
        <p className="mx-auto flex max-w-2xl items-center justify-center gap-2 text-center text-xs text-muted-foreground">
          <Icon name="ShieldCheck" className="size-3.5 shrink-0" />
          Every tool that can run in your browser does — your data isn&apos;t
          uploaded to a server unless a tool explicitly says otherwise.
        </p>
      </section>
    </div>
  );
}
