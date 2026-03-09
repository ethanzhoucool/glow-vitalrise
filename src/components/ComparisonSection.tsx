"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const rows = [
  { label: "Texture", typical: "Chalky", glow: "Silky smooth" },
  { label: "Sweetener", typical: "Artificial", glow: "Clean, real ingredients" },
  { label: "Packaging", typical: "Bulk tub", glow: "Minimal, beautiful" },
  { label: "Use case", typical: "Post-workout only", glow: "Everyday ritual" },
  { label: "Digestion", typical: "Bloating", glow: "Light & easy" },
];

export default function ComparisonSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      rowsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-40 md:py-56 px-6"
      style={{ background: "#fafaf8" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Headline — grotesk bold */}
        <h2
          ref={headlineRef}
          className="text-center mb-6"
          style={{
            fontFamily: "var(--font-grotesk)",
            fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
            fontWeight: 700,
            color: "#222",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
          }}
        >
          Not all protein is<br />created equal.
        </h2>

        {/* Subtitle */}
        <p
          className="text-center mb-20 md:mb-28"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
            color: "#bbb",
            fontWeight: 300,
          }}
        >
          See how glow. compares to typical protein brands.
        </p>

        {/* Column headers */}
        <div
          className="grid grid-cols-3 gap-4 mb-8 pb-4"
          style={{ borderBottom: "1px solid #e8e4e6" }}
        >
          <span className="text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-inter)", color: "#ccc" }}>
            &nbsp;
          </span>
          <span className="text-xs tracking-[0.3em] uppercase text-center" style={{ fontFamily: "var(--font-inter)", color: "#ccc" }}>
            Typical
          </span>
          <span
            className="text-xs tracking-[0.3em] uppercase text-center"
            style={{ fontFamily: "var(--font-grotesk)", color: "#222", fontWeight: 600 }}
          >
            glow.
          </span>
        </div>

        {/* Rows */}
        {rows.map((row, i) => (
          <div
            key={row.label}
            ref={(el) => { rowsRef.current[i] = el; }}
            className="grid grid-cols-3 gap-4 py-5 items-center"
            style={{
              borderBottom: i < rows.length - 1 ? "1px solid #f0eeef" : "none",
            }}
          >
            <span
              className="text-sm"
              style={{ fontFamily: "var(--font-inter)", color: "#999", fontWeight: 400 }}
            >
              {row.label}
            </span>
            {/* Typical — muted with × */}
            <span
              className="text-sm text-center flex items-center justify-center gap-2"
              style={{ fontFamily: "var(--font-inter)", color: "#ccc" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#dbb" strokeWidth="1.5" strokeLinecap="round">
                <line x1="4" y1="4" x2="10" y2="10" /><line x1="10" y1="4" x2="4" y2="10" />
              </svg>
              {row.typical}
            </span>
            {/* Glow — bold with ✓ */}
            <span
              className="text-sm font-medium text-center flex items-center justify-center gap-2"
              style={{ fontFamily: "var(--font-grotesk)", color: "#222", fontWeight: 600 }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#8bb8d8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3,7 6,10 11,4" />
              </svg>
              {row.glow}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
