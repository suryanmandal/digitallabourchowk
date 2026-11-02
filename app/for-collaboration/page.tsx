import fs from "fs";
import path from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media & Coverage | Digital Labour Chowk",
  description: "Press coverage, national awards, and strategic partnerships transforming daily wage labor.",
};

export default function CollaborationPage() {
  const filePath = path.join(process.cwd(), "public", "raw_pages", "media-coverage.html");
  let htmlContent = "";
  try {
    htmlContent = fs.readFileSync(filePath, "utf-8");
  } catch (e) {
    console.error("Error reading media-coverage.html:", e);
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
