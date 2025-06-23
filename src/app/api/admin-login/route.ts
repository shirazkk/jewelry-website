import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const adminEmail = process.env.ADMIN_DASHBOARD_EMAIL;
  const adminPassword = process.env.ADMIN_DASHBOARD_PASSWORD;

  if (email === adminEmail && password === adminPassword) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
} 