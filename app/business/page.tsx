import fs from "fs";
import path from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hire Skilled Construction Workers in Delhi NCR | Digital Labour Chowk",
  description: "Enterprise and contractor workforce solutions. Book bulk vetted laborers with 15-minute dispatch.",
};

export default function BusinessPage() {
  const filePath = path.join(process.cwd(), "public", "raw_pages", "business.html");
  let htmlContent = "";
  try {
    htmlContent = fs.readFileSync(filePath, "utf-8");
  } catch (e) {
    console.error("Error reading business.html:", e);
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
