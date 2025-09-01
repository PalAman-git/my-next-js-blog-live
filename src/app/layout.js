import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ThemeToggle from '../components/ThemeToggle';
import dynamic from 'next/dynamic';

// Default dark theme on SSR
export const metadata = {
  title: {
    default: 'Next.js 15 Blog',
    template: '%s · Next.js 15 Blog'
  },
  description: 'A modern Next.js blog with MDX, GSAP, Tailwind CSS 4.1, and advanced UI.',
  openGraph: {
    title: 'Next.js 15 Blog',
    description: 'A modern blog boilerplate with top-tier tech and UI.',
    images: [{ url: '/cover-default.jpg', width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nextjs',
    title: 'Next.js 15 Blog',
    description: 'A modern blog with MDX, GSAP, and Tailwind.',
    images: ['/cover-default.jpg']
  }
};

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* Font variable, no flash */}
      </head>
      <body className={`${inter.variable} min-h-screen bg-[var(--background)] text-[var(--text)] duration-300 selection:bg-[var(--accent)] selection:text-white`}>
        <Navbar />
        <main className="flex-1 flex flex-col items-center">{children}</main>
        <Footer />
        {/* Place ThemeToggle here if global access wanted */}
      </body>
    </html>
  );
}
