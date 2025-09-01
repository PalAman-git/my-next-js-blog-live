"use client";
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';

export default function MobileMenu({ open, setOpen, navItems }) {
  const panelRef = useRef();

  // Animate menu panel
  useEffect(() => {
    if (!panelRef.current) return;

    if (open) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.9, clipPath: 'circle(0% at 100% 0%)' },
        { opacity: 1, scale: 1, clipPath: 'circle(140% at 50% 50%)', duration: 0.33, ease: 'power3.out' }
      );
      panelRef.current.focus();
    } else {
      gsap.to(panelRef.current, { opacity: 0, scale: 0.98, duration: 0.21, pointerEvents: 'none' });
    }
  }, [open]);

  // Accessibility: ESC to close, trap focus
  useEffect(() => {
    const closeOnEsc = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      document.addEventListener('keydown', closeOnEsc);
    }
    return () => document.removeEventListener('keydown', closeOnEsc);
  }, [open, setOpen]);

  return (
    <div
      ref={panelRef}
      aria-modal="true"
      role="dialog"
      tabIndex={open ? "0" : "-1"}
      className={`
        fixed top-0 left-0 w-full h-full z-50
        flex flex-col bg-[var(--background)]/95 backdrop-blur shadow-lg-soft transition
        md:hidden duration-300
        ${open ? '' : 'pointer-events-none opacity-0'}
      `}
      style={{ transition: 'opacity 0.3s' }}
    >
      <div className="flex justify-end p-4">
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="p-2 rounded-full focus:outline-[var(--accent)] text-[var(--accent)] hover:bg-surface"
        >
          <X size={30} />
        </button>
      </div>
      <div className="flex flex-col gap-4 px-8 mt-8">
        {navItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            onClick={() => setOpen(false)}
            className="w-full text-xl font-bold px-3 py-4 rounded-2xl text-center bg-surface/60 hover:bg-accent hover:text-white"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
