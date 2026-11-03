import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const LEADS_FILE = path.join(process.cwd(), "leads.json");

function getLeads(): any[] {
  try {
    if (!fs.existsSync(LEADS_FILE)) {
      fs.writeFileSync(LEADS_FILE, "[]", "utf-8");
      return [];
    }
    const data = fs.readFileSync(LEADS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveLeads(leads: any[]) {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save leads:", err);
  }
}

export async function GET() {
  const leads = getLeads();
  return NextResponse.json({ success: true, count: leads.length, leads });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, mobile, email, city, workers, count, subject, message, projects, company, company_type, source } = body;

    if (!name || !mobile) {
      return NextResponse.json(
        { success: false, message: "Name and Mobile number are required." },
        { status: 400 }
      );
    }

    const newLead = {
      id: "DLC-" + Math.floor(100000 + Math.random() * 900000),
      name: String(name).trim(),
      mobile: String(mobile).trim(),
      email: email ? String(email).trim() : "",
      city: city ? String(city).trim() : "Delhi NCR",
      workers: workers || (projects && projects.length > 0 ? projects.join(", ") : "General Inquiry"),
      count: count || "2-5 Workers",
      company: company || "",
      company_type: company_type || "",
      subject: subject || "",
      message: message || "",
      projects: projects || [],
      source: source || "Website Inquiry",
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
    };

    // 1. Local JSON Storage (persists locally / on standard servers)
    const leads = getLeads();
    leads.unshift(newLead);
    saveLeads(leads);

    // 2. Optional Cloud Integration (Google Sheets / Webhook / Zapier)
    // If GOOGLE_SHEETS_WEBHOOK_URL or LEADS_WEBHOOK_URL is set in environment, forwards lead data automatically
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.LEADS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newLead),
        });
      } catch (webhookErr) {
        console.error("External webhook forward error:", webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Lead captured successfully",
      lead: newLead,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
