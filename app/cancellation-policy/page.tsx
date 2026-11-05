import fs from "fs";
import path from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation Policy | Digital Labour Chowk",
  description: "Cancellation policy and rules for hiring and booking services on Digital Labour Chowk.",
};

export default function CancellationPolicyPage() {
  const filePath = path.join(process.cwd(), "public", "raw_pages", "cancellation-policy.html");
  let htmlContent = "";
  try {
    htmlContent = fs.readFileSync(filePath, "utf-8");
  } catch (e) {
    console.error("Error reading cancellation-policy.html:", e);
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
