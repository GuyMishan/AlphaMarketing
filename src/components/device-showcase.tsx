"use client";

import { CheckCircle2, ChevronLeft, FileCheck2, Smartphone, UsersRound } from "lucide-react";
import { useState } from "react";

const screens = [
  {id:"dashboard",label:"דף הבית",title:"תמונה מלאה, מהרגע שנכנסים",desc:"סטטוסים, עובדים, דיווחים ופעולות מהירות במסך אחד."},
  {id:"reports",label:"דיווחים",title:"כל הדיווחים במקום אחד",desc:"רואים מה נשלח, מה נקלט, מה דורש תיקון ומה כבר מאחוריכם."},
  {id:"employees",label:"עובדים",title:"ניהול עובדים בלי להתפזר",desc:"פרטי עובד, תמהיל, מוצרים והיסטוריה באותה סביבת עבודה."},
];

export function DeviceShowcase(){
  const [active,setActive]=useState("dashboard");
  const current=screens.find(x=>x.id===active) ?? screens[0];

  return <div className="device-showcase">
    <div className="device-copy">
      <span className="eyebrow"><Smartphone size={14}/>מהמחשב ועד לטלפון</span>
      <h2 className="section-title">אותה ALPHA.<br/>בכל מסך.</h2>
      <p className="section-copy">{current.desc}</p>

      <div className="screen-tabs">
        {screens.map(item=><button key={item.id} onClick={()=>setActive(item.id)} className={active===item.id?"active":""}>{item.label}</button>)}
      </div>
      <div className="screen-caption"><strong>{current.title}</strong><span>תצוגה מותאמת למוצר</span></div>
    </div>

    <div className={"devices-canvas screen-" + active}>
      <div className="desktop-device">
        <div className="desktop-top"><i/><i/><i/><span/></div>
        <div className="desktop-body">
          <aside><b>ALPHA</b><span className="on"/><span/><span/><span/><span/></aside>
          <main>
            <div className="desk-heading"><div><b>{current.label}</b><small>כל הנתונים מעודכנים</small></div><em><CheckCircle2 size={13}/>מחובר</em></div>
            <div className="desk-cards"><span/><span/><span/></div>
            <div className="desk-chart"><i/><i/><i/><i/><i/><i/></div>
            <div className="desk-table"><span/><span/><span/><span/></div>
          </main>
        </div>
      </div>

      <div className="phone-device">
        <div className="phone-speaker"/>
        <div className="phone-screen">
          <div className="phone-head"><b>ALPHA</b><span>•••</span></div>
          <div className="phone-hello">שלום 👋<small>הכול מסודר להיום</small></div>
          <div className="phone-stat"><span><UsersRound size={16}/>עובדים פעילים</span><b>128</b></div>
          <div className="phone-stat"><span><FileCheck2 size={16}/>דיווחים</span><b>12</b></div>
          <div className="phone-action">צפייה בסטטוסים <ChevronLeft size={15}/></div>
        </div>
      </div>

      <div className="device-bubble bubble-one"><CheckCircle2 size={15}/>הדיווח נקלט בהצלחה</div>
      <div className="device-bubble bubble-two">3 פריטים דורשים טיפול</div>
    </div>
  </div>;
}
