import { NextResponse } from "next/server";
export function GET() { return NextResponse.json({ status: "ok", service: "online-learning-class", timestamp: new Date().toISOString(), database: process.env.NEXT_PUBLIC_SUPABASE_URL ? "configured" : "demo-mode" }); }
