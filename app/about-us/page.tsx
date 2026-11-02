import fs from "fs";
import path from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Digital Labour Chowk",
  description: "Learn about the mission, vision, and team transforming daily wage labor in India.",
};

export default function AboutUsPage() {
  const filePath = path.join(process.cwd(), "public", "raw_pages", "about-us.html");
  let htmlContent = "";
  try {
    htmlContent = fs.readFileSync(filePath, "utf-8");
  } catch (e) {
    console.error("Error reading about-us.html:", e);
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
