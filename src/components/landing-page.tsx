"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Building2, CheckCircle2, FileCode2, FileSpreadsheet, LockKeyhole, MessagesSquare, RefreshCw, ShieldCheck, Sparkles, UploadCloud, UsersRound, WalletCards, Zap } from "lucide-react";
import { AlphaLogo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { AccessibilityWidget } from "@/components/accessibility-widget";
import { ContactModal } from "@/components/contact-modal";
import { DashboardPreview } from "@/components/dashboard-preview";

const appUrl=process.env.NEXT_PUBLIC_APP_URL || "https://alpha-ochre-ten.vercel.app";

export function LandingPage() {
  const [contactOpen,setContactOpen]=useState(false);
  const open=()=>setContactOpen(true);

  return <div className="site-shell">
    <header className="site-header">
      <div className="container nav">
        <a href="#top"><AlphaLogo/></a>
        <nav className="nav-links" aria-label="ניווט ראשי">
          <a href="#product">המוצר</a>
          <a href="#how">איך זה עובד</a>
          <a href="#audience">למי זה מתאים</a>
          <a href="#security">אבטחה</a>
          <a href="#faq">שאלות</a>
        </nav>
        <div className="nav-actions">
          <ThemeToggle/>
          <a className="btn btn-ghost login-link" href={appUrl + "/login"}>כניסה למערכת</a>
          <button className="btn btn-brand" onClick={open}>הצטרפו</button>
        </div>
      </div>
    </header>

    <main id="top">
      <section className="hero">
        <div className="hero-orb a"/><div className="hero-orb b"/>
        <div className="container hero-copy">
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

      <section id="audience" className="section-tight">
        <div className="container" style={{textAlign:"center"}}>
          <span className="eyebrow">מערכת אחת. לכל מי שמפעיל פנסיה.</span>
          <div className="logo-strip">
            {["מעסיקים","מנהלי חשבונות","חשבי שכר","ארגונים","קבוצות מעסיקים","מתפעלים פנסיוניים"].map(x=><span className="audience-pill" key={x}>{x}</span>)}
          </div>
        </div>
      </section>

      <section id="product" className="section">
        <div className="container">
          <span className="eyebrow"><Zap size={14}/>פחות תפעול. יותר שליטה.</span>
          <h2 className="section-title">כל מה שצריך לדיווח פנסיוני,<br/>במערכת אחת.</h2>
          <p className="section-copy">במקום קבצים מפוזרים, מעקבים ידניים ושאלות של “מה קרה עם הדיווח?”, ALPHA מחברת את כל שלבי העבודה לרצף אחד ברור.</p>
          <div className="feature-grid">
            <article className="feature-card large"><div className="feature-icon"><FileSpreadsheet/></div><h3>דיווח בדרך שנוחה לכם</h3><p>דיווח ידני, קליטת Excel או ממשק מעסיקים XML 006 — שלוש דרכים שונות שנכנסות לאותו תהליך אחיד של בדיקות, סיכום ושליחה.</p></article>
            <article className="feature-card"><div className="feature-icon"><UsersRound/></div><h3>עובדים ותמהילים</h3><p>ניהול פרטי העובד, המוצרים הפנסיוניים, שיעורי ההפרשות והשכר במקום אחד.</p></article>
            <article className="feature-card"><div className="feature-icon"><MessagesSquare/></div><h3>משובים וסטטוסים</h3><p>רואים מה נקלט, מה דורש טיפול ומה הושלם — בלי לחפש תשובות בין מערכות.</p></article>
            <article className="feature-card large"><div className="feature-icon"><RefreshCw/></div><h3>תיקונים בלי לאבד את ההקשר</h3><p>דיווחי תיקון והפרשים נשענים על הדיווח הקודם, כך שהמערכת שומרת את הרצף ומקטינה עבודה כפולה.</p></article>
            <article className="feature-card"><div className="feature-icon"><WalletCards/></div><h3>תשלומים והפקדות</h3><p>חשבון תשלום, פרטי הפקדה והרשאות נשמרים ומחוברים ישירות לדיווח הרלוונטי.</p></article>
          </div>
        </div>
      </section>

      <section id="how" className="section flow-section">
        <div className="container">
          <span className="eyebrow">איך זה עובד</span>
          <h2 className="section-title">מהנתונים ועד לסיום הדיווח.<br/>שלושה צעדים.</h2>
          <div className="steps">
            <article className="step-card"><span className="step-num">1</span><h3>קולטים נתונים</h3><p className="section-copy">ידנית, Excel או XML. ALPHA מרכזת את הנתונים לדיווח אחד מסודר.</p></article>
            <article className="step-card"><span className="step-num">2</span><h3>בודקים ומתקנים</h3><p className="section-copy">המערכת בודקת עובדים, מוצרים, הפרשות ונתוני הפקדה לפני שהדיווח מתקדם.</p></article>
            <article className="step-card"><span className="step-num">3</span><h3>שולחים ועוקבים</h3><p className="section-copy">הדיווח נשלח, הסטטוס נשמר והמשובים חוזרים למקום אחד שאפשר לעבוד ממנו.</p></article>
          </div>
        </div>
      </section>

      <section id="security" className="section">
        <div className="container security-grid">
          <div>
            <span className="eyebrow"><ShieldCheck size={14}/>בנויה לעבודה רצינית</span>
            <h2 className="section-title">גישה נכונה למידע הנכון.</h2>
            <p className="section-copy">ALPHA בנויה סביב ארגונים, מעסיקים והרשאות — כך שכל משתמש רואה ופועל רק במקום שבו הוא אמור.</p>
          </div>
          <div className="security-visual">
            <div className="security-row"><LockKeyhole/><div><b>הרשאות לפי ארגון ומעסיק</b><span>שליטה בגישה, יצירה, עריכה ושידור לפי סוג המשתמש.</span></div></div>
            <div className="security-row"><Building2/><div><b>עבודה עם מעסיק יחיד או קבוצה</b><span>אותה מערכת מתאימה לעסק קטן, לארגון ולניהול מספר מעסיקים.</span></div></div>
            <div className="security-row"><FileCode2/><div><b>בדיקות לפני שידור</b><span>Validation מובנה לקבצים ולנתוני הדיווח כדי לעצור טעויות לפני שהן ממשיכות הלאה.</span></div></div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="cta-panel">
            <h2>רוצים לראות איך ALPHA עובדת אצלכם?</h2>
            <p>השאירו לנו פרטים וניצור איתכם קשר. אם אתם מעסיק עם עד 3 עובדים, תוכלו להתחיל ללא עלות.</p>
            <button className="btn btn-primary" onClick={open}>השאירו פרטים והצטרפו <ArrowLeft size={17}/></button>
          </div>
        </div>
      </section>

      <section id="faq" className="section">
        <div className="container">
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
