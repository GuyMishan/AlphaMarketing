import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { leadSchema, userTypeLabels } from "@/lib/leads";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

function clientKey(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_REQUESTS;
}

function mailConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "465");
  const secure = (process.env.SMTP_SECURE || "true").toLowerCase() === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) return null;
  return { host, port, secure, user, pass };
}

export async function POST(request: NextRequest) {
  const key = clientKey(request);
  if (isRateLimited(key)) {
    return NextResponse.json({ error: "יותר מדי ניסיונות. נסו שוב בעוד מספר דקות." }, { status: 429 });
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "סוג הבקשה אינו נתמך." }, { status: 415 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "הבקשה אינה תקינה." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "הפרטים שהוזנו אינם תקינים." },
      { status: 400 },
    );
  }

  const lead = parsed.data;

  // Honeypot: bots often fill hidden fields. Return success without sending.
  if (lead.website) {
    return NextResponse.json({ ok: true });
  }

  const config = mailConfig();
  if (!config) {
    console.error("Lead email is not configured: missing SMTP environment variables.");
    return NextResponse.json(
      { error: "שירות שליחת הפניות עדיין אינו מוגדר. נסו שוב מאוחר יותר." },
      { status: 503 },
    );
  }

  const to = process.env.LEADS_TO_EMAIL || "Alphapensia@gmail.com";
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
  });

  const submittedAt = new Intl.DateTimeFormat("he-IL", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Asia/Jerusalem",
  }).format(new Date());

  const subject = `ליד חדש מאתר ALPHA – ${lead.fullName}`;
  const text = [
    "התקבל ליד חדש באתר ALPHA",
    "",
    `שם מלא: ${lead.fullName}`,
    `טלפון: ${lead.phone}`,
    `אימייל: ${lead.email}`,
    `עסק / ארגון: ${lead.organizationName}`,
    `סוג משתמש: ${userTypeLabels[lead.userType]}`,
    `מספר עובדים: ${lead.employeeCount}`,
    `הודעה: ${lead.message || "לא נכתבה הודעה"}`,
    `זמן שליחה: ${submittedAt}`,
  ].join("\n");

  const html = `
    <div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.7;color:#172033">
      <h2 style="margin:0 0 18px">ליד חדש מאתר ALPHA</h2>
      <table cellpadding="7" cellspacing="0" style="border-collapse:collapse">
        <tr><td><strong>שם מלא</strong></td><td>${escapeHtml(lead.fullName)}</td></tr>
        <tr><td><strong>טלפון</strong></td><td>${escapeHtml(lead.phone)}</td></tr>
        <tr><td><strong>אימייל</strong></td><td>${escapeHtml(lead.email)}</td></tr>
        <tr><td><strong>עסק / ארגון</strong></td><td>${escapeHtml(lead.organizationName)}</td></tr>
        <tr><td><strong>סוג משתמש</strong></td><td>${escapeHtml(userTypeLabels[lead.userType])}</td></tr>
        <tr><td><strong>מספר עובדים</strong></td><td>${lead.employeeCount}</td></tr>
        <tr><td><strong>הודעה</strong></td><td>${escapeHtml(lead.message || "לא נכתבה הודעה")}</td></tr>
        <tr><td><strong>זמן שליחה</strong></td><td>${escapeHtml(submittedAt)}</td></tr>
      </table>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || "ALPHA"}" <${config.user}>`,
      to,
      replyTo: lead.email,
      subject,
      text,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send ALPHA lead email", error);
    return NextResponse.json(
      { error: "שליחת הפרטים נכשלה. נסו שוב בעוד מספר דקות." },
      { status: 502 },
    );
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char] || char);
}
