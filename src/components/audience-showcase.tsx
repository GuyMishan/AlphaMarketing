"use client";

import { BadgeCheck, Building2, FileSpreadsheet, Layers3, ShieldCheck, UsersRound } from "lucide-react";
import { useState } from "react";

const audiences = [
  {
    id:"employers", label:"מעסיקים", icon:Building2,
    title:"המעסיק רואה תמונה אחת ברורה",
    copy:"במקום לעקוב אחרי קבצים, מיילים וסטטוסים בנפרד, ALPHA מרכזת את העובדים, ההפקדות, הדיווחים והמשובים במקום אחד.",
    bullets:["ניהול עובדים ומוצרים פנסיוניים","דיווח חודשי ותיקונים","מעקב קל אחרי סטטוס ומשוב"],
    metric:"עד 3 עובדים", sub:"מתחילים ללא עלות"
  },
  {
    id:"accounting", label:"מנהלי חשבונות", icon:FileSpreadsheet,
    title:"פחות קבצים. פחות רדיפה.",
    copy:"עבודה חודשית שחוזרת על עצמה הופכת לתהליך קבוע וברור. מעלים נתונים, בודקים חריגות, שולחים ועוברים הלאה.",
    bullets:["קליטת Excel מובנית","בדיקות לפני שליחה","ריכוז התהליך לכל מעסיק"],
    metric:"Excel / XML", sub:"או דיווח ידני"
  },
  {
    id:"payroll", label:"חשבי שכר", icon:BadgeCheck,
    title:"הדיווח ממשיך ישירות מהשכר",
    copy:"ALPHA בנויה סביב חודש דיווח, עובדים, שכר והפרשות — כך שהתהליך מרגיש כמו המשך טבעי של עבודת השכר.",
    bullets:["תיקונים והפרשים","בדיקת שיעורי הפרשה","היסטוריית דיווחים ברורה"],
    metric:"006", sub:"ממשק מעסיקים"
  },
  {
    id:"organizations", label:"ארגונים", icon:Layers3,
    title:"שליטה ברמת הארגון וברמת המעסיק",
    copy:"מנהלים כמה מעסיקים מאותו מקום, בלי לוותר על הפרדה נכונה בהרשאות, בחשבונות ובהגדרות.",
    bullets:["בחירת מעסיק מהירה","הרשאות לפי רמות","הגדרות ארגוניות ומקומיות"],
    metric:"Multi", sub:"Employer ready"
  },
  {
    id:"groups", label:"קבוצות מעסיקים", icon:UsersRound,
    title:"אותו תהליך, לכל החברות בקבוצה",
    copy:"מתאים לקבוצות שמנהלות מספר חברות או ישויות ומבקשות לקבל סטנדרט תפעולי אחיד בלי לנהל כל אחת בנפרד.",
    bullets:["תמונה רוחבית","מעבר מהיר בין מעסיקים","אותו flow לכל ישות"],
    metric:"1→N", sub:"מעסיקים"
  },
  {
    id:"operators", label:"מתפעלים פנסיוניים", icon:ShieldCheck,
    title:"יותר נפח עבודה, פחות רעש",
    copy:"סביבת עבודה שמיועדת לניהול תהליכים חוזרים בכמות גבוהה, עם סטטוסים, חריגים ומעקב שמאפשרים להישאר בשליטה.",
    bullets:["מעקב תפעולי שוטף","איתור חריגים","עבודה לפי סטטוסים ומשובים"],
    metric:"Control", sub:"בכל שלב"
  },
];

export function AudienceShowcase(){
  const [active,setActive]=useState(audiences[0].id);
  const current=audiences.find(x=>x.id===active) ?? audiences[0];
  const Icon=current.icon;

  return <div className="audience-showcase">
    <div className="audience-tabs" role="tablist" aria-label="למי ALPHA מתאימה">
      {audiences.map(item=>{
        const ItemIcon=item.icon;
        return <button
          key={item.id}
          role="tab"
          aria-selected={active===item.id}
          className={"audience-tab" + (active===item.id ? " active" : "")}
          onClick={()=>setActive(item.id)}
        >
          <ItemIcon size={18}/><span>{item.label}</span>
        </button>;
      })}
    </div>

    <div className="audience-panel" key={current.id}>
      <div className="audience-copy">
        <span className="audience-kicker"><Icon size={17}/>{current.label}</span>
        <h3>{current.title}</h3>
        <p>{current.copy}</p>
        <div className="audience-bullets">
          {current.bullets.map(item=><span key={item}><BadgeCheck size={16}/>{item}</span>)}
        </div>
      </div>

      <div className="audience-visual">
        <div className="audience-window">
          <div className="mini-window-bar"><i/><i/><i/></div>
          <div className="audience-window-grid">
            <div className="audience-side-lines"><span/><span/><span/><span/></div>
            <div className="audience-main-card">
              <div className="audience-main-head"><strong>{current.label}</strong><em>ALPHA</em></div>
              <div className="audience-stat-row">
                <div><b>{current.metric}</b><small>{current.sub}</small></div>
                <div><b>100%</b><small>תהליך מסודר</small></div>
              </div>
              <div className="audience-list">
                <span/><span/><span/><span/>
              </div>
            </div>
          </div>
        </div>
        <div className="audience-float af-one">משוב התקבל ✓</div>
        <div className="audience-float af-two">דיווח מוכן לשליחה</div>
      </div>
    </div>
  </div>;
}
