import fs from "fs";
import path from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Digital Labour Chowk",
  description: "Browse major residential, commercial, and infrastructure construction projects powered by DLC.",
};

export default function ProjectsPage() {
  const filePath = path.join(process.cwd(), "public", "raw_pages", "projects.html");
  let htmlContent = "";
  try {
    htmlContent = fs.readFileSync(filePath, "utf-8");
  } catch (e) {
    console.error("Error reading projects.html:", e);
  }

  return (
    <div
      id="content"
      className="site-content"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
