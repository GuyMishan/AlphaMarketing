import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "ALPHA – תפעול פנסיוני",
  description: "מערכת חכמה לניהול עובדים, דיווחים, הפקדות, תיקונים ומשובים פנסיוניים במקום אחד.",
  openGraph: {
    title: "ALPHA – תפעול פנסיוני",
    description: "תפעול פנסיוני, פשוט יותר.",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
