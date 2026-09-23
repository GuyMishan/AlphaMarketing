import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ALPHA – תפעול פנסיוני",
  description: "תפעול פנסיוני חכם, פשוט ומתקדם למעסיקים וארגונים.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
