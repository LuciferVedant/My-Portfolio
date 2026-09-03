import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AiChatWidget } from '@/components/AiChatWidget';
import { MatrixRain } from '@/components/MatrixRain';
import { TickerBanner } from '@/components/TickerBanner';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vedant Khatri | Full Stack Developer & Software Engineer',
  description:
    'Portfolio of Vedant Khatri, Full Stack Developer with 2+ years of experience in React, TypeScript, Go, Java (Spring Boot), Next.js, and NestJS.',
  keywords: [
    'Vedant Khatri',
    'Full Stack Developer',
    'Software Engineer',
    'React',
    'TypeScript',
    'Go',
    'Spring Boot',
    'Next.js',
    'NestJS',
    'Bengaluru',
    'Karnataka',
    'India',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark scroll-smooth ${jetbrainsMono.variable}`}>
      <body className="antialiased selection:bg-emerald-500 selection:text-black flex flex-col min-h-screen font-mono crt-vignette">
        {/* Background FX layers */}
        <div className="bg-vignette" />
        <div className="bg-grid" />
        <MatrixRain />
        <div className="scanlines" />
        <div className="scanline-sweep" />

        <TickerBanner />
        <Navbar />
        <main className="flex-1 pt-24 relative z-10">{children}</main>
        <Footer />
        <AiChatWidget />
      </body>
    </html>
  );
}
