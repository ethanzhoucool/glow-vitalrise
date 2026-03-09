"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: "01", label: "Morning", desc: "Wake up, hydrate, and set the tone." },
  { num: "02", label: "Shake", desc: "Mix one scoop of glow. in cold water or milk." },
  { num: "03", label: "Glow", desc: "Nourish from within. Carry your glow all day." },
];

export default function RoutineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numsRef = useRef<(HTMLSpanElement | null)[]>([]);

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

      // Big numbers scale in
      numsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            delay: i * 0.15,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Text slides in
      stepsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.15 + 0.2,
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
      className="w-full py-40 md:py-56 px-6"
      style={{
        background: "linear-gradient(180deg, #fafaf8 0%, #f6f0f2 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Headline — wide-tracked uppercase */}
        <p
          ref={headlineRef}
          className="text-center mb-28 md:mb-36"
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
          Your daily ritual
        </p>

        {/* Steps — three columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-12">
          {steps.map((s, i) => (
            <div key={s.label} className="text-center">
              {/* Oversized number */}
              <span
                ref={(el) => { numsRef.current[i] = el; }}
                className="block mb-4"
                style={{
                  fontFamily: "var(--font-grotesk)",
                  fontSize: "clamp(4rem, 8vw, 6rem)",
                  fontWeight: 700,
                  color: "rgba(0,0,0,0.04)",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  opacity: 0,
                }}
              >
                {s.num}
              </span>

              {/* Label — Playfair */}
              <div ref={(el) => { stepsRef.current[i] = el; }}>
                <h3
                  className="-mt-6 mb-3"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                    color: "#222",
                    lineHeight: 1.15,
                  }}
                >
                  {s.label}
                </h3>
                <p
                  className="text-base leading-relaxed max-w-xs mx-auto"
                  style={{ fontFamily: "var(--font-inter)", color: "#999", fontWeight: 300 }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
