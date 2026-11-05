import fs from "fs";
import path from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | Digital Labour Chowk",
  description: "Official legal disclaimer for Gaudrika Digital Labour Chowk (OPC) Private Limited.",
};

export default function DisclaimerPage() {
  const filePath = path.join(process.cwd(), "public", "raw_pages", "disclaimer.html");
  let htmlContent = "";
  try {
    htmlContent = fs.readFileSync(filePath, "utf-8");
  } catch (e) {
    console.error("Error reading disclaimer.html:", e);
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
