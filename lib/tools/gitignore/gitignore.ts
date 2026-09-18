export interface GitignoreTemplate {
  id: string;
  label: string;
  content: string;
}

export const GITIGNORE_TEMPLATES: GitignoreTemplate[] = [
  {
    id: "node",
    label: "Node",
    content: [
      "node_modules/",
      "npm-debug.log*",
      "yarn-debug.log*",
      "yarn-error.log*",
      ".pnpm-debug.log*",
      "dist/",
      "build/",
      "coverage/",
      ".env",
      ".env.local",
      ".env.*.local",
      "*.tsbuildinfo",
    ].join("\n"),
  },
  {
    id: "python",
    label: "Python",
    content: [
      "__pycache__/",
      "*.py[cod]",
      "*.egg-info/",
      ".eggs/",
      ".venv/",
      "venv/",
      "env/",
      "*.egg",
      ".mypy_cache/",
      ".pytest_cache/",
      ".tox/",
      "dist/",
      "build/",
      "*.log",
    ].join("\n"),
  },
  {
    id: "java",
    label: "Java",
    content: ["*.class", "*.jar", "*.war", "*.ear", "target/", ".gradle/", "build/", "out/", "*.iml"].join(
      "\n"
    ),
  },
  {
    id: "macos",
    label: "macOS",
    content: [".DS_Store", ".AppleDouble", ".LSOverride", "._*", ".Spotlight-V100", ".Trashes"].join("\n"),
  },
  {
    id: "windows",
    label: "Windows",
    content: ["Thumbs.db", "ehthumbs.db", "Desktop.ini", "$RECYCLE.BIN/"].join("\n"),
  },
  {
    id: "vscode",
    label: "VS Code",
    content: [".vscode/*", "!.vscode/settings.json", "!.vscode/extensions.json"].join("\n"),
  },
  {
    id: "jetbrains",
    label: "JetBrains",
    content: [".idea/", "*.iml", "*.ipr", "*.iws"].join("\n"),
  },
  {
    id: "nextjs",
    label: "Next.js",
    content: [".next/", "out/", "next-env.d.ts"].join("\n"),
  },
];

export function generateGitignore(selectedIds: string[]): string {
  const seenLines = new Set<string>();
  const sections: string[] = [];

  for (const id of selectedIds) {
    const template = GITIGNORE_TEMPLATES.find((candidate) => candidate.id === id);
    if (!template) continue;

    const lines = template.content.split("\n").filter((line) => {
      if (seenLines.has(line)) return false;
      seenLines.add(line);
      return true;
    });
    if (lines.length === 0) continue;

    sections.push(`# ${template.label}\n${lines.join("\n")}`);
  }

  if (sections.length === 0) {
    throw new Error("Select at least one template.");
  }

  return sections.join("\n\n");
}
