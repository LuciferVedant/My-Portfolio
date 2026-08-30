import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AiChatWidget } from '@/components/AiChatWidget';

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
    'Bangalore',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased selection:bg-indigo-500 selection:text-white flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-24">{children}</main>
        <Footer />
        <AiChatWidget />
      </body>
    </html>
  );
}
