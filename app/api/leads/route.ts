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
    const { name, mobile, email, city, workers, count } = body;

    if (!name || !mobile) {
      return NextResponse.json(
        { success: false, message: "Name and Mobile number are required." },
        { status: 400 }
      );
    }

    const newLead = {
      id: "DLC-" + Math.floor(100000 + Math.random() * 900000),
      name,
      mobile,
      email: email || "",
      city: city || "Delhi NCR",
      workers: workers || (body.projects && body.projects.length > 0 ? body.projects.join(", ") : "General Contractor"),
      count: count || "2-5 Workers",
      company: body.company || "",
      company_type: body.company_type || "",
      source: body.source || "Website Inquiry",
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
    };

    const leads = getLeads();
    leads.unshift(newLead);
    saveLeads(leads);

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
