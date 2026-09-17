import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { SITE_NAME } from "@/lib/constants";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const allItems: BreadcrumbItem[] = [{ label: SITE_NAME, href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
      {allItems.map((item, index) => {
        const isLast = index === allItems.length - 1;
        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-1.5">
            {item.href && !isLast ? (
              <Link href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-foreground" : undefined}>{item.label}</span>
            )}
            {!isLast && <Icon name="ArrowRight" className="size-3" />}
          </span>
        );
      })}
    </nav>
  );
}
