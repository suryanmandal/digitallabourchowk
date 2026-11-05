import fs from "fs";
import path from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Digital Labour Chowk",
  description: "Privacy policy for user data protection, collection, and usage on Digital Labour Chowk.",
};

export default function PrivacyPolicyPage() {
  const filePath = path.join(process.cwd(), "public", "raw_pages", "privacy-policy.html");
  let htmlContent = "";
  try {
    htmlContent = fs.readFileSync(filePath, "utf-8");
  } catch (e) {
    console.error("Error reading privacy-policy.html:", e);
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
