"use client";

import { CheckCircle2, X } from "lucide-react";
import { useEffect } from "react";
import { LeadForm } from "@/components/lead-form";

function useModalBehavior(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("modal-open");
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);
}

export function ContactModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  useModalBehavior(open, onClose);

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="contact-title">
        <div className="modal-head">
          <div>
            <span className="eyebrow">מתחילים מכאן</span>
            <h2 id="contact-title">רוצים להצטרף ל־ALPHA?</h2>
            <p>השאירו פרטים ונחזור אליכם. מעסיקים עם עד 3 עובדים מתחילים ללא עלות.</p>
          </div>
          <button className="btn icon-btn close-btn" onClick={onClose} aria-label="סגירה"><X size={19}/></button>
        </div>
        <LeadForm onSuccess={onSuccess} />
      </section>
    </div>
  );
}

export function LeadSuccessModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useModalBehavior(open, onClose);

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <section className="success-modal" role="dialog" aria-modal="true" aria-labelledby="lead-success-title">
        <button className="btn icon-btn close-btn success-close" onClick={onClose} aria-label="סגירה"><X size={19}/></button>
        <div className="success-icon" aria-hidden="true"><CheckCircle2 size={38}/></div>
        <h2 id="lead-success-title">הפרטים נשלחו בהצלחה!</h2>
        <p>תודה שהצטרפתם ל־ALPHA. קיבלנו את הפרטים וניצור איתכם קשר בהקדם.</p>
        <button className="btn btn-brand success-action" onClick={onClose}>מעולה, תודה</button>
      </section>
    </div>
  );
}
