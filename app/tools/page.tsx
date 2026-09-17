import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ToolsDirectory } from "@/components/tools/tools-directory";
import { getAllCategories, getAllTools } from "@/lib/data";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "All Developer Tools",
  description:
    "Browse every free developer tool: JSON, regex, encoding, SQL, security and more. Fast, free and processed locally in your browser whenever possible.",
  alternates: { canonical: `${SITE_URL}/tools` },
};

export default function ToolsPage() {
  const tools = getAllTools();
  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumb items={[{ label: "Tools" }]} />
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        All developer tools
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
        {tools.length} free tools, filterable by category. New ones ship
        regularly.
      </p>

      <div className="mt-8">
        <ToolsDirectory tools={tools} categories={categories} />
      </div>
    </div>
  );
}
