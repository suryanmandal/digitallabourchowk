import fs from "fs";
import path from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Digital Labour Chowk",
  description: "Terms and conditions for using the Digital Labour Chowk platform, mobile app, and services.",
};

export default function TermsAndConditionsPage() {
  const filePath = path.join(process.cwd(), "public", "raw_pages", "terms-and-conditions.html");
  let htmlContent = "";
  try {
    htmlContent = fs.readFileSync(filePath, "utf-8");
  } catch (e) {
    console.error("Error reading terms-and-conditions.html:", e);
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
