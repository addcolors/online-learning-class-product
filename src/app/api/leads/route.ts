import { NextResponse } from "next/server";
import { z } from "zod";

const leadSchema = z.object({
  type: z.enum(["waitlist", "counselor", "institution"]),
  email: z.string().email().max(320),
  name: z.string().max(200).optional().default(""),
  organization: z.string().max(300).optional().default(""),
  message: z.string().max(4000).optional().default(""),
  source_path: z.string().max(500).optional().default(""),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 422 });
  }
  const lead = parsed.data;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && serviceKey) {
    const response = await fetch(`${url}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ ...lead, source_path: lead.source_path.slice(0, 500) }),
    });
    if (!response.ok) {
      console.error("lead insert failed", { status: response.status });
      return NextResponse.json({ error: "We could not save your request. Please try again." }, { status: 502 });
    }
    return NextResponse.json({ ok: true, stored: "supabase" });
  }

  console.log("demo lead captured", { type: lead.type, email: lead.email, source: lead.source_path });
  return NextResponse.json({ ok: true, stored: "demo" });
}
