import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "@/app/globals.css";

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  variable: "--font-rubik",
  display: "swap",
});

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
    <html lang="he" dir="rtl" suppressHydrationWarning className={rubik.variable}>
      <body>{children}</body>
    </html>
  );
}
