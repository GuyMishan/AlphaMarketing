"use client";

import { CheckCircle2, Clock3, FileCheck2, UsersRound } from "lucide-react";
import { useEffect, useRef } from "react";

export function DashboardPreview() {
  const stageRef=useRef<HTMLDivElement>(null);

  useEffect(()=>{
    function update(){
      const el=stageRef.current;
      if(!el) return;
      const holder=el.closest(".product-scroll") as HTMLElement | null;
      if(!holder) return;
      const rect=holder.getBoundingClientRect();
      const total=Math.max(holder.offsetHeight-window.innerHeight*.5,1);
      const progress=Math.min(1,Math.max(0,-rect.top/total));
      const scale=.86 + progress*.14;
      const rotateX=8-progress*8;
      const translateY=(1-progress)*32;
      el.style.transform=`translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg)`;
    }
    update();
    window.addEventListener("scroll",update,{passive:true});
    window.addEventListener("resize",update);
    return ()=>{ window.removeEventListener("scroll",update); window.removeEventListener("resize",update); };
  },[]);

  return <div className="product-scroll" aria-label="תצוגה מקדימה של מערכת ALPHA">
    <div className="product-sticky">
      <div ref={stageRef} className="product-stage">
        <div className="browser">
          <div className="browser-top"><span className="dot"/><span className="dot"/><span className="dot"/><span className="browser-url"/></div>
          <div className="app-preview">
            <aside className="preview-side">
              <div className="preview-brand">ALPHA</div>
              <div className="preview-nav-item active"><FileCheck2 size={14}/>דף הבית</div>
              <div className="preview-nav-item"><UsersRound size={14}/>עובדים</div>
              <div className="preview-nav-item"><FileCheck2 size={14}/>דיווחים</div>
              <div className="preview-nav-item"><Clock3 size={14}/>משובים</div>
            </aside>
            <div className="preview-main">
              <div className="preview-head">
                <div><h3>בוקר טוב 👋</h3><p>כל מה שקורה בתפעול הפנסיוני שלכם, במקום אחד.</p></div>
                <span className="status"><CheckCircle2 size={12}/>הכול תקין</span>
              </div>
              <div className="metric-grid">
                <div className="metric-card"><div className="metric-label">עובדים פעילים</div><div className="metric-value">128</div></div>
                <div className="metric-card"><div className="metric-label">דיווחים החודש</div><div className="metric-value">12</div></div>
                <div className="metric-card"><div className="metric-label">לטיפול</div><div className="metric-value">3</div></div>
              </div>
              <div className="preview-table">
                <div className="preview-row"><span>דיווח</span><span>חודש</span><span>סטטוס</span><span>עודכן</span></div>
                <div className="preview-row"><b>דיווח שוטף</b><span>09/2026</span><span className="status">נקלט</span><span>היום, 09:42</span></div>
                <div className="preview-row"><b>דיווח שוטף</b><span>08/2026</span><span className="status">הושלם</span><span>31/08/2026</span></div>
                <div className="preview-row"><b>תיקון דיווח</b><span>07/2026</span><span className="status">בטיפול</span><span>28/08/2026</span></div>
                <div className="preview-row"><b>דיווח שוטף</b><span>07/2026</span><span className="status">הושלם</span><span>31/07/2026</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}
