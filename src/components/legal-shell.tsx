import Link from "next/link";
import { AlphaLogo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { AccessibilityWidget } from "@/components/accessibility-widget";

export function LegalShell({ children }: { children: React.ReactNode }) {
  return <>
    <header className="site-header">
      <div className="container nav">
        <Link href="/"><AlphaLogo/></Link>
        <div className="nav-actions"><ThemeToggle/><Link className="btn btn-ghost" href="/">חזרה לאתר</Link></div>
      </div>
    </header>
    <main className="legal-page"><div className="container"><article className="legal-card">{children}</article></div></main>
    <AccessibilityWidget/>
  </>;
}
