"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export function LeadForm({ onSuccess }: { onSuccess?: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setMessage("");

    // Keep the form element itself before the async request. React's event
    // currentTarget is not guaranteed to remain available after an await.
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
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

      formElement.reset();
      setStatus("success");
      setMessage("תודה! הפרטים התקבלו. ניצור איתכם קשר בהקדם.");
      onSuccess?.();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "שליחת הפרטים נכשלה.");
    }
  }

  return (
    <form className="lead-form" onSubmit={submit}>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
      <div className="field">
        <label htmlFor="lead-full-name">שם מלא *</label>
        <input id="lead-full-name" name="fullName" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="lead-phone">טלפון *</label>
        <input id="lead-phone" name="phone" inputMode="tel" autoComplete="tel" required />
      </div>
      <div className="field">
        <label htmlFor="lead-email">אימייל *</label>
        <input id="lead-email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="field">
        <label htmlFor="lead-org">שם העסק / הארגון *</label>
        <input id="lead-org" name="organizationName" autoComplete="organization" required />
      </div>
      <div className="field">
        <label htmlFor="lead-role">מי אתם? *</label>
        <select id="lead-role" name="userType" required defaultValue="">
          <option value="" disabled>בחרו סוג משתמש</option>
          <option value="employer">מעסיק</option>
          <option value="accountant">מנהל/ת חשבונות</option>
          <option value="payroll">חשב/ת שכר</option>
          <option value="organization">ארגון / קבוצת מעסיקים</option>
          <option value="operator">מתפעל/ת פנסיוני/ת</option>
          <option value="other">אחר</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="lead-employees">מספר עובדים *</label>
        <input id="lead-employees" name="employeeCount" type="number" min="1" max="1000000" required />
      </div>
      <div className="field full">
        <label htmlFor="lead-message">משהו שחשוב שנדע?</label>
        <textarea id="lead-message" name="message" maxLength={1000} />
      </div>
      <p className="form-note">בלחיצה על שליחה אתם מאשרים שנוכל ליצור איתכם קשר בנוגע ל־ALPHA. אפשר לקרוא עוד במדיניות הפרטיות.</p>
      <button className="btn btn-brand full" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "שולח פרטים..." : "שלחו פרטים והצטרפו"}
      </button>
      {message ? <p className={"form-status " + (status === "error" ? "error" : "")} role={status === "error" ? "alert" : "status"}>{message}</p> : null}
    </form>
  );
}
