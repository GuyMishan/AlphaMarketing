"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { LeadForm } from "@/components/lead-form";

export function ContactModal({ open, onClose }: { open:boolean; onClose:()=>void }) {
  useEffect(()=>{
    document.body.classList.toggle("modal-open",open);
    return ()=>document.body.classList.remove("modal-open");
  },[open]);

  useEffect(()=>{
    if(!open) return;
    const onKey=(event:KeyboardEvent)=>{ if(event.key==="Escape") onClose(); };
    window.addEventListener("keydown",onKey);
    return ()=>window.removeEventListener("keydown",onKey);
  },[open,onClose]);

  if(!open) return null;

  return <div className="modal-backdrop" role="presentation" onMouseDown={(e)=>{ if(e.target===e.currentTarget) onClose(); }}>
    <section className="modal" role="dialog" aria-modal="true" aria-labelledby="contact-title">
      <div className="modal-head">
        <div>
          <span className="eyebrow">מתחילים מכאן</span>
          <h2 id="contact-title">רוצים להצטרף ל־ALPHA?</h2>
          <p>השאירו פרטים ונחזור אליכם. מעסיקים עם עד 3 עובדים מתחילים ללא עלות.</p>
        </div>
        <button className="btn icon-btn close-btn" onClick={onClose} aria-label="סגירה"><X size={19}/></button>
      </div>
      <LeadForm />
    </section>
  </div>;
}
