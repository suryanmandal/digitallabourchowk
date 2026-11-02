import fs from "fs";
import path from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Digital Labour Chowk",
  description: "Get in touch with the Digital Labour Chowk support and corporate office team.",
};

export default function ContactPage() {
  const filePath = path.join(process.cwd(), "public", "raw_pages", "contact.html");
  let htmlContent = "";
  try {
    htmlContent = fs.readFileSync(filePath, "utf-8");
  } catch (e) {
    console.error("Error reading contact.html:", e);
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
