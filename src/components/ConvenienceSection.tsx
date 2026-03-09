"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const perks = [
  { icon: "🧊", label: "No refrigeration", desc: "Shelf-stable and aseptically packaged." },
  { icon: "⏱", label: "30 seconds", desc: "Shake, pour, and you're out the door." },
  { icon: "🌿", label: "Clean label", desc: "No artificial colours, flavours, or sweeteners." },
];

export default function ConvenienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
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
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #fafaf8 0%, #f2f4f8 40%, #eef1f6 60%, #fafaf8 100%)",
      }}
    >
      <div className="relative z-10 px-6 py-40 md:py-56 max-w-5xl mx-auto">
        {/* Headline — wide tracked uppercase label */}
        <p
          ref={headlineRef}
          className="text-center mb-24 md:mb-32"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)",
            fontWeight: 500,
            color: "#bbb",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            opacity: 0,
          }}
        >
          Convenience, built in
        </p>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10">
          {perks.map((p, i) => (
            <div
              key={p.label}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="text-center"
              style={{ opacity: 0 }}
            >
              {/* Emoji icon */}
              <span className="block text-4xl mb-6">{p.icon}</span>

              {/* Label — grotesk bold */}
              <h3
                className="mb-3"
                style={{
                  fontFamily: "var(--font-grotesk)",
                  fontSize: "clamp(1.3rem, 2.2vw, 1.8rem)",
                  fontWeight: 600,
                  color: "#222",
                  letterSpacing: "-0.02em",
                }}
              >
                {p.label}
              </h3>

              {/* Description */}
              <p
                className="text-base leading-relaxed max-w-xs mx-auto"
                style={{ fontFamily: "var(--font-inter)", color: "#999", fontWeight: 300 }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
