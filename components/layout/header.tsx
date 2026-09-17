"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { GithubIcon } from "@/components/ui/github-icon";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { GITHUB_URL, SITE_NAME } from "@/lib/constants";

const navLinks = [
  { href: "/tools", label: "Tools" },
  { href: "/guides", label: "Guides" },
  { href: "/tools", label: "Categories" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Icon name="Braces" className="size-5 text-accent" />
            <span className="text-sm sm:text-base">{SITE_NAME}</span>
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden sm:block"
          >
            <Button type="button" variant="ghost" size="sm" className="w-9 px-0">
              <GithubIcon className="size-4" />
            </Button>
          </a>
          <ThemeToggle />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-9 px-0 md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <Icon name={mobileOpen ? "X" : "Menu"} className="size-4" />
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-border px-4 py-3 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
          >
            GitHub
          </a>
        </nav>
      )}
    </header>
  );
}
