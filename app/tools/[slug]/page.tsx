import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ToolCard } from "@/components/home/tool-card";
import { Icon } from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { JsonLd } from "@/components/seo/json-ld";
import { toolRegistry } from "@/components/tools/registry";
import {
  getAllCategories,
  getAllTools,
  getCategoryBySlug,
  getRelatedTools,
  getToolBySlug,
  getToolsByCategory,
} from "@/lib/data";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const categorySlugs = getAllCategories().map((category) => ({ slug: category.slug }));
  const toolSlugs = getAllTools().map((tool) => ({ slug: tool.slug }));
  return [...categorySlugs, ...toolSlugs];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const category = getCategoryBySlug(slug);
  if (category) {
    return {
      title: category.seoTitle,
      description: category.seoDescription,
      alternates: { canonical: `${SITE_URL}/tools/${category.slug}` },
      openGraph: { title: category.seoTitle, description: category.seoDescription },
    };
  }

  const tool = getToolBySlug(slug);
  if (tool) {
    return {
      title: tool.seoTitle,
      description: tool.seoDescription,
      alternates: { canonical: `${SITE_URL}/tools/${tool.slug}` },
      openGraph: { title: tool.seoTitle, description: tool.seoDescription },
    };
  }

  return {};
}

export default async function ToolOrCategoryPage({ params }: PageProps) {
  const { slug } = await params;

  const category = getCategoryBySlug(slug);
  if (category) {
    return <CategoryView categorySlug={category.slug} />;
  }

  const tool = getToolBySlug(slug);
  if (tool) {
    return <ToolView toolSlug={tool.slug} />;
  }

  notFound();
}

function CategoryView({ categorySlug }: { categorySlug: string }) {
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const categoryTools = getToolsByCategory(category.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
            {
              "@type": "ListItem",
              position: 2,
              name: category.name,
              item: `${SITE_URL}/tools/${category.slug}`,
            },
          ],
        }}
      />
      <Breadcrumb items={[{ label: category.name }]} />
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {category.name} Developer Tools
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
        {category.description}
      </p>

      {categoryTools.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-sm text-muted-foreground">
          No tools in this category yet — more are on the way.
        </p>
      )}
    </div>
  );
}

function ToolView({ toolSlug }: { toolSlug: string }) {
  const tool = getToolBySlug(toolSlug);
  if (!tool) notFound();

  const category = getCategoryBySlug(tool.categorySlug);
  const related = getRelatedTools(tool);
  const ToolComponent = toolRegistry[tool.component];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
            {
              "@type": "ListItem",
              position: 2,
              name: category?.name ?? "Tools",
              item: `${SITE_URL}/tools/${category?.slug ?? ""}`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: tool.name,
              item: `${SITE_URL}/tools/${tool.slug}`,
            },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: tool.name,
          description: tool.seoDescription,
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          url: `${SITE_URL}/tools/${tool.slug}`,
        }}
      />

      <Breadcrumb
        items={[
          ...(category ? [{ label: category.name, href: `/tools/${category.slug}` }] : []),
          { label: tool.name },
        ]}
      />

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {tool.name}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {tool.shortDescription}
          </p>
        </div>
        {tool.clientSide && (
          <span className="flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-muted-foreground">
            <Icon name="ShieldCheck" className="size-3.5" />
            Processed locally in your browser
          </span>
        )}
      </div>

      <div className="mt-8">
        {ToolComponent ? (
          <ToolComponent />
        ) : (
          <Card className="flex flex-col items-center gap-2 py-12 text-center">
            <Icon name="Code2" className="size-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              This tool is coming soon.
            </p>
          </Card>
        )}
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 text-sm font-medium text-muted-foreground">
            Related tools
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((relatedTool) => (
              <ToolCard key={relatedTool.slug} tool={relatedTool} />
            ))}
          </div>
        </div>
      )}

      {category && (
        <p className="mt-10 text-sm text-muted-foreground">
          Browse more{" "}
          <Link href={`/tools/${category.slug}`} className="text-foreground underline-offset-2 hover:underline">
            {category.name} tools
          </Link>
          .
        </p>
      )}
    </div>
  );
}
