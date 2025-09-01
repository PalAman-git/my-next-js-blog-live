"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import dynamic from 'next/dynamic';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const MobileMenu = dynamic(() => import('./MobileMenu'), { ssr: false });

const navItems = [
  { title: 'Home', href: '/' },
  { title: 'Daily', href: '/daily' },
  { title: 'Technical', href: '/technical' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-30 shadow-soft bg-surface/95 backdrop-blur transition py-3">
      <div className="max-w-5xl mx-auto flex items-center gap-3 px-4 py-2 relative">
        <Link href="/" className="flex items-center gap-2">
          <Image src={"./logo.svg"} alt='Logo' width={25} height={100} />
          <span className="font-bold text-lg text-[var(--accent)] hidden sm:inline">Log & Learn</span>
        </Link>
        <div className="flex-1" />
        <div className="hidden md:flex gap-2">
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={`px-4 py-2 rounded-lg font-medium transition border border-transparent
                ${pathname === item.href
                  ? 'bg-accent text-white'
                  : 'hover:border-[var(--accent)] hover:bg-surface'}`}
              prefetch
            >
              {item.title}
            </Link>
          ))}
        </div>
        <ThemeToggle />
        <button
          aria-label="Open menu"
          className="md:hidden p-2 rounded-full text-[var(--accent)] hover:bg-surface border border-[var(--border)] ml-2"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <Menu size={26} />
        </button>
        <MobileMenu
          open={menuOpen}
          setOpen={setMenuOpen}
          navItems={navItems}
        />
      </div>
    </nav>
  );
}
