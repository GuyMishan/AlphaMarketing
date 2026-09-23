"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, BadgeCheck, Building2, CheckCircle2, CircleDollarSign, FileCheck2, FileCode2, FileSpreadsheet, Gauge, Layers3, LockKeyhole, MessagesSquare, RefreshCw, ScanLine, ShieldCheck, Sparkles, Upload, UsersRound, WalletCards, WandSparkles, Zap } from "lucide-react";
import { AlphaLogo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { AccessibilityWidget } from "@/components/accessibility-widget";
import { ContactModal } from "@/components/contact-modal";
import { DashboardPreview } from "@/components/dashboard-preview";

const appUrl=process.env.NEXT_PUBLIC_APP_URL || "https://alpha-ochre-ten.vercel.app";

export function LandingPage() {
  const [contactOpen,setContactOpen]=useState(false);
  const open=()=>setContactOpen(true);

  useEffect(()=>{
    const observer=new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    },{threshold:.16});
    document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
    return ()=>observer.disconnect();
  },[]);

  return <div className="site-shell">
    <header className="site-header">
      <div className="container nav">
        <a className="nav-brand" href="#top"><AlphaLogo/></a>
        <nav className="nav-links" aria-label="ניווט ראשי">
          <a href="#product"><span/>המוצר</a>
          <a href="#how"><span/>איך זה עובד</a>
          <a href="#audience"><span/>למי זה מתאים</a>
          <a href="#security"><span/>אבטחה</a>
          <a href="#faq"><span/>שאלות</a>
        </nav>
        <div className="nav-actions">
          <ThemeToggle/>
          <a className="btn btn-ghost login-link" href={appUrl + "/login"}>כניסה</a>
          <button className="btn btn-brand nav-cta" onClick={open}>הצטרפו <ArrowLeft size={15}/></button>
        </div>
      </div>
    </header>

    <main id="top">
      <section className="hero">
        <div className="hero-grid"/>
        <div className="hero-orb a"/><div className="hero-orb b"/>
        <div className="hero-float hero-float-a"><FileCheck2 size={18}/><span>דיווח נקלט</span></div>
        <div className="hero-float hero-float-b"><UsersRound size={18}/><span>עובדים מסונכרנים</span></div>
        <div className="hero-float hero-float-c"><ShieldCheck size={18}/><span>בדיקות תקינות</span></div>
        <div className="container hero-copy reveal is-visible">
          <span className="eyebrow"><Sparkles size={14}/>הדור החדש של התפעול הפנסיוני</span>
          <h1>תפעול פנסיוני.<br/><span>פשוט יותר.</span></h1>
          <p>ALPHA מרכזת עובדים, דיווחים, הפקדות, תיקונים ומשובים למקום אחד — כדי שתוכלו לנהל את כל התהליך בצורה ברורה, מהירה ומדויקת.</p>
          <div className="hero-actions">
            <button className="btn btn-brand" onClick={open}>השאירו פרטים והצטרפו <ArrowLeft size={17}/></button>
            <a className="btn btn-ghost" href={appUrl + "/login"}>כניסה למערכת</a>
          </div>
          <div className="free-pill"><CheckCircle2 size={15}/><span><b>עד 3 עובדים ללא עלות</b> למעסיקים שמתחילים עם ALPHA</span></div>
        </div>
        <DashboardPreview/>
      </section>

      <section id="audience" className="section-tight reveal">
        <div className="container" style={{textAlign:"center"}}>
          <span className="eyebrow">מערכת אחת. לכל מי שמפעיל פנסיה.</span>
          <div className="logo-strip">
            {[
              [Building2,"מעסיקים"],[FileSpreadsheet,"מנהלי חשבונות"],[BadgeCheck,"חשבי שכר"],
              [Layers3,"ארגונים"],[UsersRound,"קבוצות מעסיקים"],[ShieldCheck,"מתפעלים פנסיוניים"]
            ].map(([Icon,label])=>{
              const C=Icon as typeof Building2;
              return <span className="audience-pill" key={String(label)}><C size={16}/>{label as string}</span>;
            })}
          </div>
        </div>
      </section>

      <section id="product" className="section">
        <div className="container">
          <div className="reveal">
            <span className="eyebrow"><Zap size={14}/>פחות תפעול. יותר שליטה.</span>
            <h2 className="section-title">כל מה שצריך לדיווח פנסיוני,<br/>במערכת אחת.</h2>
            <p className="section-copy">במקום קבצים מפוזרים, מעקבים ידניים ושאלות של “מה קרה עם הדיווח?”, ALPHA מחברת את כל שלבי העבודה לרצף אחד ברור.</p>
          </div>
          <div className="feature-grid">
            <article className="feature-card large reveal"><div className="feature-icon"><FileSpreadsheet/></div><div className="feature-art file-art"><Upload/><span>Excel</span><FileCode2/></div><h3>דיווח בדרך שנוחה לכם</h3><p>ידני, Excel או XML 006 — שלוש דרכים שונות שנכנסות לאותו תהליך אחיד של בדיקות, סיכום ושליחה.</p></article>
            <article className="feature-card reveal"><div className="feature-icon"><UsersRound/></div><div className="mini-stack"><span/><span/><span/></div><h3>עובדים ותמהילים</h3><p>ניהול פרטי העובד, המוצרים הפנסיוניים, שיעורי ההפרשות והשכר במקום אחד.</p></article>
            <article className="feature-card reveal"><div className="feature-icon"><MessagesSquare/></div><div className="pulse-status"><span/><b>נקלט בהצלחה</b></div><h3>משובים וסטטוסים</h3><p>רואים מה נקלט, מה דורש טיפול ומה הושלם — בלי לחפש תשובות בין מערכות.</p></article>
            <article className="feature-card large reveal"><div className="feature-icon"><RefreshCw/></div><div className="correction-track"><i/><i/><i/></div><h3>תיקונים בלי לאבד את ההקשר</h3><p>דיווחי תיקון והפרשים נשענים על הדיווח הקודם, כך שהמערכת שומרת את הרצף ומקטינה עבודה כפולה.</p></article>
            <article className="feature-card reveal"><div className="feature-icon"><WalletCards/></div><div className="money-visual"><CircleDollarSign/><ScanLine/></div><h3>תשלומים והפקדות</h3><p>חשבון תשלום, פרטי הפקדה והרשאות נשמרים ומחוברים ישירות לדיווח הרלוונטי.</p></article>
          </div>
        </div>
      </section>

      <section className="section visual-story">
        <div className="container visual-story-grid">
          <div className="reveal">
            <span className="eyebrow"><WandSparkles size={14}/>המערכת עובדת איתכם</span>
            <h2 className="section-title">המידע זז.<br/>אתם נשארים בשליטה.</h2>
            <p className="section-copy">כל פעולה במערכת מעדכנת את התמונה המלאה: עובד, דיווח, סטטוס, משוב ותיקון — בלי לקפוץ בין מסכים ולרדוף אחרי קבצים.</p>
          </div>
          <div className="activity-canvas reveal">
            <div className="activity-orbit orbit-one"><span><UsersRound size={18}/></span></div>
            <div className="activity-orbit orbit-two"><span><FileCheck2 size={18}/></span></div>
            <div className="activity-orbit orbit-three"><span><MessagesSquare size={18}/></span></div>
            <div className="activity-core"><Gauge size={32}/><b>ALPHA</b><small>כל התפעול במקום אחד</small></div>
            <div className="activity-note note-a"><CheckCircle2 size={15}/> עובד עודכן</div>
            <div className="activity-note note-b"><FileCode2 size={15}/> XML נבדק</div>
            <div className="activity-note note-c"><BadgeCheck size={15}/> משוב התקבל</div>
          </div>
        </div>
      </section>

      <section id="how" className="section flow-section">
        <div className="container">
          <div className="reveal">
            <span className="eyebrow">איך זה עובד</span>
            <h2 className="section-title">מהנתונים ועד לסיום הדיווח.<br/>שלושה צעדים.</h2>
          </div>
          <div className="steps">
            <article className="step-card reveal"><span className="step-num">1</span><div className="step-icon"><Upload/></div><h3>קולטים נתונים</h3><p className="section-copy">ידנית, Excel או XML. ALPHA מרכזת את הנתונים לדיווח אחד מסודר.</p></article>
            <article className="step-card reveal"><span className="step-num">2</span><div className="step-icon"><ScanLine/></div><h3>בודקים ומתקנים</h3><p className="section-copy">המערכת בודקת עובדים, מוצרים, הפרשות ונתוני הפקדה לפני שהדיווח מתקדם.</p></article>
            <article className="step-card reveal"><span className="step-num">3</span><div className="step-icon"><FileCheck2/></div><h3>שולחים ועוקבים</h3><p className="section-copy">הדיווח נשלח, הסטטוס נשמר והמשובים חוזרים למקום אחד שאפשר לעבוד ממנו.</p></article>
          </div>
        </div>
      </section>

      <section id="security" className="section">
        <div className="container security-grid">
          <div className="reveal">
            <span className="eyebrow"><ShieldCheck size={14}/>בנויה לעבודה רצינית</span>
            <h2 className="section-title">גישה נכונה למידע הנכון.</h2>
            <p className="section-copy">ALPHA בנויה סביב ארגונים, מעסיקים והרשאות — כך שכל משתמש רואה ופועל רק במקום שבו הוא אמור.</p>
          </div>
          <div className="security-visual reveal">
            <div className="security-shield"><ShieldCheck size={42}/><span className="shield-ring"/></div>
            <div className="security-row"><LockKeyhole/><div><b>הרשאות לפי ארגון ומעסיק</b><span>שליטה בגישה, יצירה, עריכה ושידור לפי סוג המשתמש.</span></div></div>
            <div className="security-row"><Building2/><div><b>עבודה עם מעסיק יחיד או קבוצה</b><span>אותה מערכת מתאימה לעסק קטן, לארגון ולניהול מספר מעסיקים.</span></div></div>
            <div className="security-row"><FileCode2/><div><b>בדיקות לפני שידור</b><span>Validation מובנה לקבצים ולנתוני הדיווח כדי לעצור טעויות לפני שהן ממשיכות הלאה.</span></div></div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container reveal">
          <div className="cta-panel">
            <div className="cta-spark spark-a"/><div className="cta-spark spark-b"/>
            <h2>רוצים לראות איך ALPHA עובדת אצלכם?</h2>
            <p>השאירו לנו פרטים וניצור איתכם קשר. אם אתם מעסיק עם עד 3 עובדים, תוכלו להתחיל ללא עלות.</p>
            <button className="btn btn-primary" onClick={open}>השאירו פרטים והצטרפו <ArrowLeft size={17}/></button>
          </div>
        </div>
      </section>

      <section id="faq" className="section">
        <div className="container reveal">
          <span className="eyebrow">שאלות נפוצות</span>
          <h2 className="section-title">לפני שמתחילים.</h2>
          <div className="faq">
            <details><summary>למי ALPHA מתאימה?</summary><p>למעסיקים, חשבי שכר, מנהלי חשבונות, ארגונים שמנהלים מספר מעסיקים ומתפעלים פנסיוניים.</p></details>
            <details><summary>איך אפשר להכניס דיווח למערכת?</summary><p>אפשר לעבוד ידנית, להעלות קובץ Excel או לקלוט XML בממשק מעסיקים 006.</p></details>
            <details><summary>האם אפשר להתחיל בחינם?</summary><p>כן. מעסיקים עם עד 3 עובדים יכולים להתחיל ללא עלות.</p></details>
            <details><summary>אפשר לעבוד עם כמה מעסיקים?</summary><p>כן. ALPHA תומכת במבנה של ארגון עם מספר מעסיקים ובהרשאות שונות לכל משתמש.</p></details>
            <details><summary>איך מצטרפים?</summary><p>משאירים פרטים באתר ואנחנו חוזרים אליכם כדי להשלים את ההצטרפות.</p></details>
          </div>
        </div>
      </section>
    </main>

    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div><AlphaLogo/><p>מערכת חכמה לניהול ותפעול דיווחים פנסיוניים למעסיקים וארגונים.</p><p><a href="mailto:Alphapensia@gmail.com">Alphapensia@gmail.com</a></p></div>
          <div><b>ALPHA</b><div className="footer-links"><a href="#product">המוצר</a><a href="#how">איך זה עובד</a><a href="#faq">שאלות נפוצות</a><a href={appUrl + "/login"}>כניסה למערכת</a></div></div>
          <div><b>מידע משפטי</b><div className="footer-links"><Link href="/terms">תקנון ותנאי שימוש</Link><Link href="/privacy">מדיניות פרטיות</Link><Link href="/accessibility">הצהרת נגישות</Link></div></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} ALPHA. כל הזכויות שמורות.</span><span>תפעול פנסיוני, פשוט יותר.</span></div>
      </div>
    </footer>

    <AccessibilityWidget/>
    <ContactModal open={contactOpen} onClose={()=>setContactOpen(false)}/>
  </div>;
}
