import Link from "next/link";
import { categories } from "@/data/categories";
import { GITHUB_URL, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="text-sm font-semibold">{SITE_NAME}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {SITE_TAGLINE}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Categories
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {categories.slice(0, 6).map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/tools/${category.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Product
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <Link
                  href="/tools"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  All tools
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Guides
                </Link>
              </li>
              <li>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} {SITE_NAME}. All tools are free
            to use.
          </p>
          <p>Built for developers, by developers.</p>
        </div>
      </div>
    </footer>
  );
}
