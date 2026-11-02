import fs from "fs";
import path from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Construction Blog | Digital Labour Chowk",
  description: "Read the latest insights, updates, and articles on the construction labor market, site efficiency, and worker welfare from Digital Labour Chowk.",
};

export default function BlogsPage() {
  const filePath = path.join(process.cwd(), "public", "raw_pages", "blogs.html");
  let htmlContent = "";
  try {
    htmlContent = fs.readFileSync(filePath, "utf-8");
  } catch (e) {
    console.error("Error reading blogs.html:", e);
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
