import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { cookies } from 'next/headers';
import { LanguageProvider } from "@/context/language-context";
import { Locale } from "@/lib/dictionary";

// FONTS
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bunny Nun",
  description: "NSFW Developer/Artist",
  keywords: ['nsfw', 'porn', 'hairy', 'anus', 'lewd', 'hentai', 'indie games', 'game development', 'bunny nun', 'bunnynun', 'bunninunni', "bunny_nun", "bunny-nun"],
  themeColor: '#04010A',
  icons: {
    icon:'/favicon.ico',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1.0,
  },
  openGraph: {
    type: 'website',
    title: 'The Church of Bunny Nun',
    description: 'Our church hosts Bunny\'s unholy lewd games and art',
    locale: 'en_US',
    url: 'https://www.bunnynun.church/',
    images: [
      {
        url: '/images/site/siteLogoBig.png',
        width: 960, 
        height: 960,
        alt: 'Bunny\'s Womb Tattoo',
      },
    ],
    
  },
  twitter: {
    card: 'summary',
    title: 'The Church of Bunny Nun',
    description: 'Our church hosts Bunny\'s unholy lewd games and art"',
    site: '@bunninunni',
    creator: '@bunninunni',
    images: [
      {
        url: '/images/site/siteLogoBig.png',
        width: 960, 
        height: 960,
        alt: 'Bunny\'s Womb Tattoo',
      },
    ],
  },
};


export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get('bunny_lang');
  const initialLang = (langCookie?.value === 'ja' ? 'ja' : 'en') as Locale;

  return (
    <html lang={initialLang} className={`${cinzel.variable} ${mono.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <LanguageProvider initialLang={initialLang}>
             {children}
             <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}