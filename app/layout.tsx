import type { Metadata, Viewport } from "next";
import { Alexandria } from "next/font/google";
import "./globals.css";

const arabic = Alexandria({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
});

const siteUrl = "https://nura-skin-demo.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "نُورا سكين — عناية بسيطة، جمال هادئ",
  description: "نُورا سكين علامة عناية بالبشرة توضيحية: روتين بسيط، منتجات مدروسة، وتجربة تسوق عربية أنيقة.",
  keywords: ["نُورا", "العناية بالبشرة", "سيروم", "نموذج portfolio", "Nura Skin"],
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: siteUrl,
    siteName: "نُورا سكين",
    title: "نُورا سكين — عناية بسيطة، جمال هادئ",
    description: "متجر توضيحي لعلامة عناية بالبشرة بتصميم عربي RTL متكامل.",
  },
  twitter: { card: "summary_large_image", title: "نُورا سكين" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#F8F6F0", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={arabic.variable}>
      <body>{children}</body>
    </html>
  );
}
