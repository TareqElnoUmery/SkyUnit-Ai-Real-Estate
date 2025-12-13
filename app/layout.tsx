import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SkyUnit AI - تحليل سوق العقارات المصري',
  description: 'منصة تحليل ذكية لسوق العقارات المصري بدعم الذكاء الاصطناعي',
  lang: 'ar',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  );
}
