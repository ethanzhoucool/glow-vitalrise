"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    word: "Glow",
    desc: "Collagen peptides for radiant skin and stronger hair.",
    align: "left" as const,
  },
  {
    word: "Energy",
    desc: "Balanced protein that fuels you through the day.",
    align: "right" as const,
  },
  {
    word: "Ease",
    desc: "A light, smooth formula that your body loves.",
    align: "left" as const,
  },
];

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const wordsRef = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Words: scale up + fade
      wordsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Descriptions: gentle fade
      itemsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
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
      className="w-full py-40 md:py-56 px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #fafaf8 0%, #fdf5f6 50%, #fafaf8 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-32 md:gap-44">
          {benefits.map((b, i) => (
            <div
              key={b.word}
              className={`flex flex-col items-center ${b.align === "right" ? "md:items-end" : "md:items-start"}`}
            >
              {/* Big single word — Playfair italic, oversized */}
              <h3
                ref={(el) => { wordsRef.current[i] = el; }}
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(4rem, 12vw, 10rem)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#222",
                  lineHeight: 0.9,
                  letterSpacing: "-0.03em",
                  opacity: 0,
                }}
              >
                {b.word}
              </h3>

              {/* Description */}
              <p
                ref={(el) => { itemsRef.current[i] = el; }}
                className="mt-5 text-base md:text-lg leading-relaxed max-w-sm"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: "#999",
                  fontWeight: 300,
                  textAlign: b.align === "right" ? "right" : "left",
                  opacity: 0,
                }}
              >
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
