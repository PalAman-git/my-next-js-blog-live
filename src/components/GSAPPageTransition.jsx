"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function GSAPPageTransition({ children }) {
  const ref = useRef();
  const pathname = usePathname();

  useEffect(() => {
    if (!ref.current) return;

    // Scoped animations for cleanup
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.58, ease: "power3.out" }
      );
    }, ref);

    return () => ctx.revert(); // cleanup on unmount
  }, [pathname]);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const h1 = ref.current.querySelector("h1");
      if (!h1) return;

      const words = h1.innerText.split(" ");
      h1.innerHTML = words
        .map(
          (word) =>
            `<span class="inline-block opacity-0 translate-y-6" data-split="1">${word}&nbsp;</span>`
        )
        .join("");

      const splitSpans = h1.querySelectorAll('[data-split="1"]');
      gsap.to(splitSpans, {
        opacity: 1,
        y: 0,
        stagger: 0.045,
        ease: "power2.out",
        duration: 0.5,
        delay: 0.18,
      });
    }, ref);

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div ref={ref} className="w-full flex justify-center items-center my-20">
      {children}
    </div>
  );
}
