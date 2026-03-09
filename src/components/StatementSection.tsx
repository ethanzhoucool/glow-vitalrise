"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        line1Ref.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      ).fromTo(
        line2Ref.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
        "-=0.7"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ minHeight: "100vh", background: "#fafaf8" }}
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="leading-[1.05]">
          {/* Line 1 — Bold grotesk for "strength" contrast */}
          <span
            ref={line1Ref}
            className="block"
            style={{
              fontFamily: "var(--font-grotesk)",
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#222",
              opacity: 0,
            }}
          >
            Protein for strength.
          </span>
          {/* Line 2 — Italic Playfair for "glow" elegance */}
          <span
            ref={line2Ref}
            className="block mt-2"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              fontStyle: "italic",
              color: "#b0c4de",
              opacity: 0,
            }}
          >
            Collagen for glow.
          </span>
        </h2>
      </div>
    </section>
  );
}
