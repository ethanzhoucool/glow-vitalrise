"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "I actually look forward to drinking this every morning.",
    author: "Mia R.",
  },
  {
    quote: "Finally a protein shake that feels like wellness, not a gym chore.",
    author: "Sophie L.",
  },
  {
    quote: "The texture is unreal — so smooth. This is the one.",
    author: "Jordan T.",
  },
  {
    quote: "Not too sweet, not chalky. It actually tastes like real vanilla.",
    author: "Clara M.",
  },
];

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
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
      id="reviews"
      className="w-full py-40 md:py-56 px-6"
      style={{ background: "#fafaf8" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header — italic Playfair */}
        <div className="text-center mb-24 md:mb-32">
          <h2
            ref={headlineRef}
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
              fontStyle: "italic",
              color: "#222",
              lineHeight: 1.2,
            }}
          >
            People are glowing.
          </h2>
        </div>

        {/* Testimonials — 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-20 md:gap-y-24">
          {testimonials.map((t, i) => (
            <div
              key={i}
              ref={(el) => { itemsRef.current[i] = el; }}
              className="relative text-center md:text-left"
              style={{ opacity: 0 }}
            >
              {/* Big decorative quotation mark */}
              <span
                className="block mb-4 select-none pointer-events-none"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "4rem",
                  lineHeight: 1,
                  color: "rgba(185,215,248,0.35)",
                }}
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <p
                className="text-xl md:text-2xl leading-relaxed mb-6 -mt-4"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontStyle: "italic",
                  color: "#444",
                }}
              >
                {t.quote}
              </p>

              {/* Author — grotesk small caps feel */}
              <p
                className="text-xs"
                style={{
                  fontFamily: "var(--font-grotesk)",
                  fontWeight: 600,
                  color: "#bbb",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                {t.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
