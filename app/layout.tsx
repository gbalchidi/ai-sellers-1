import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI-агент для контроля маржинальности рекламы | Wildberries",
  description: "AI-агент, который покажет реальную прибыль с каждой карточки и увеличит маржу на 30%. Для селлеров с 50+ карточками.",
  keywords: "маржинальность, реклама wildberries, контроль рекламы, AI агент, селлер инструменты",
  openGraph: {
    title: "Контролируйте маржинальность каждой рекламной фразы",
    description: "AI-агент для селлеров с 50+ карточками. Увеличьте маржу на 30%.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
