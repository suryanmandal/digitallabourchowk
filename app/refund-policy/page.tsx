import fs from "fs";
import path from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | Digital Labour Chowk",
  description: "Refund policy and guidelines for service bookings and payments on Digital Labour Chowk.",
};

export default function RefundPolicyPage() {
  const filePath = path.join(process.cwd(), "public", "raw_pages", "refund-policy.html");
  let htmlContent = "";
  try {
    htmlContent = fs.readFileSync(filePath, "utf-8");
  } catch (e) {
    console.error("Error reading refund-policy.html:", e);
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
