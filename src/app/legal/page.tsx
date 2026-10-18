import { LegalMarkdown } from "@/components/legal-markdown";
import { LegalShell } from "@/components/legal-shell";
import { getActiveLegalDocument } from "@/lib/legal-document";

export const dynamic = "force-dynamic";

const date = (iso: string) => new Intl.DateTimeFormat("he-IL", {
  year: "numeric", month: "2-digit", day: "2-digit", timeZone: "Asia/Jerusalem",
}).format(new Date(iso));

export default async function LegalPage() {
  const document = await getActiveLegalDocument();
  return <LegalShell>
    <h1>מדיניות ומידע משפטי</h1>
    <p>מסמך משפטי מרכזי של ALPHA — תנאי שימוש, פרטיות ומדיניויות נלוות.</p>
    {document ? <>
      <h2>{document.title}</h2>
      <p>גרסה {document.version} · פורסם {date(document.publishedAt)} · בתוקף מ־{date(document.effectiveAt)}</p>
      <LegalMarkdown markdown={document.markdown} />
    </> : <p role="status">המסמך המשפטי אינו זמין כרגע, או שטרם פורסמה גרסה מאושרת.</p>}
  </LegalShell>;
}
