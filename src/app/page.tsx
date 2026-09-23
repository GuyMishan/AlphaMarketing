import { LeadForm } from "@/components/lead-form";

export default function Home() {
  return (
    <main style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px", fontFamily: "Arial, sans-serif" }}>
      <h1>ALPHA – תפעול פנסיוני</h1>
      <p>אתר השיווק המלא בבנייה. תשתית הלידים כבר פעילה.</p>
      <LeadForm />
    </main>
  );
}
