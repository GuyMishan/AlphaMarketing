"use client";

import { CheckCircle2, Clock3, FileCheck2, ShieldCheck, Sparkles, TrendingUp, UsersRound } from "lucide-react";
import { useEffect, useRef } from "react";

export function DashboardPreview() {
  const stageRef=useRef<HTMLDivElement>(null);

  useEffect(()=>{
    let ticking=false;
    function update(){
      const el=stageRef.current;
      if(!el) return;
      const holder=el.closest(".product-scroll") as HTMLElement | null;
      if(!holder) return;

      const rect=holder.getBoundingClientRect();
      const vh=window.innerHeight;
      const start=vh*.82;
      const end=vh*.18;
      const progress=Math.min(1,Math.max(0,(start-rect.top)/(start-end)));
      const scale=.86 + progress*.16;
      const rotateX=8-progress*8;
      const translateY=(1-progress)*34;
      const glow=.12+progress*.16;

      el.style.transform=`translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg)`;
      el.style.setProperty("--preview-glow",String(glow));
      ticking=false;
    }
    const onScroll=()=>{
      if(ticking) return;
      ticking=true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll",onScroll,{passive:true});
    window.addEventListener("resize",update);
    return ()=>{ window.removeEventListener("scroll",onScroll); window.removeEventListener("resize",update); };
  },[]);

  return <div className="product-scroll" aria-label="תצוגה מקדימה של מערכת ALPHA">
    <div className="product-sticky">
      <div className="floating-card floating-card-a">
        <span className="floating-icon"><CheckCircle2 size={16}/></span>
        <span><b>הדיווח נקלט</b><small>עכשיו</small></span>
      </div>
      <div className="floating-card floating-card-b">
        <span className="floating-icon purple"><TrendingUp size={16}/></span>
        <span><b>128 עובדים</b><small>פעילים החודש</small></span>
      </div>
      <div className="floating-card floating-card-c">
        <span className="floating-icon green"><ShieldCheck size={16}/></span>
        <span><b>כל הבדיקות עברו</b><small>מוכן לשידור</small></span>
      </div>

      <div ref={stageRef} className="product-stage">
        <div className="browser">
          <div className="browser-top">
            <span className="dot"/><span className="dot"/><span className="dot"/>
            <span className="browser-url"/>
            <span className="browser-live"><Sparkles size={12}/>LIVE</span>
          </div>
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
                <div className="metric-card"><div className="metric-label">עובדים פעילים</div><div className="metric-value">128</div><span className="metric-trend">+8 החודש</span></div>
                <div className="metric-card"><div className="metric-label">דיווחים החודש</div><div className="metric-value">12</div><span className="metric-trend">100% הושלמו</span></div>
                <div className="metric-card"><div className="metric-label">לטיפול</div><div className="metric-value">3</div><span className="metric-trend warning">ממתינים לבדיקה</span></div>
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
