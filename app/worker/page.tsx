import fs from "fs";
import path from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Construction Jobs in Delhi NCR | Digital Labour Chowk",
  description: "Find daily wage construction jobs near you with guaranteed fair wages and zero commission.",
};

export default function WorkerPage() {
  const filePath = path.join(process.cwd(), "public", "raw_pages", "worker.html");
  let htmlContent = "";
  try {
    htmlContent = fs.readFileSync(filePath, "utf-8");
  } catch (e) {
    console.error("Error reading worker.html:", e);
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
