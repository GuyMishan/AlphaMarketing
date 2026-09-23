"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = {
      fullName: String(form.get("fullName") || ""),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      organizationName: String(form.get("organizationName") || ""),
      userType: String(form.get("userType") || ""),
      employeeCount: Number(form.get("employeeCount") || 0),
      message: String(form.get("message") || ""),
      website: String(form.get("website") || ""),
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "שליחת הפרטים נכשלה.");

      event.currentTarget.reset();
      setStatus("success");
      setMessage("תודה! הפרטים התקבלו ונחזור אליכם בהקדם.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "שליחת הפרטים נכשלה.");
    }
  }

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 12, marginTop: 28 }}>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
      <input name="fullName" placeholder="שם מלא" required />
      <input name="phone" placeholder="טלפון" inputMode="tel" required />
      <input name="email" placeholder="אימייל" type="email" required />
      <input name="organizationName" placeholder="שם העסק / הארגון" required />
      <select name="userType" required defaultValue="">
        <option value="" disabled>מה התפקיד שלכם?</option>
        <option value="employer">מעסיק</option>
        <option value="accountant">מנהל/ת חשבונות</option>
        <option value="payroll">חשב/ת שכר</option>
        <option value="organization">ארגון / קבוצת מעסיקים</option>
        <option value="operator">מתפעל/ת פנסיוני/ת</option>
        <option value="other">אחר</option>
      </select>
      <input name="employeeCount" placeholder="מספר עובדים" type="number" min="1" max="1000000" required />
      <textarea name="message" placeholder="משהו שחשוב שנדע? (לא חובה)" maxLength={1000} />
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "שולח..." : "השאירו פרטים והצטרפו"}
      </button>
      {message ? <p role={status === "error" ? "alert" : "status"}>{message}</p> : null}
    </form>
  );
}
