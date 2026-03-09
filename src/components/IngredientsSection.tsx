"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ingredients = [
  {
    num: "01",
    name: "Whey Isolate",
    detail: "Ultra-pure protein — fast absorbing, zero bloat.",
  },
  {
    num: "02",
    name: "Collagen Peptides",
    detail: "Skin elasticity, hair strength, joint support.",
  },
  {
    num: "03",
    name: "Electrolytes",
    detail: "Daily hydration and natural radiance from within.",
  },
  {
    num: "04",
    name: "Real Vanilla",
    detail: "Naturally sourced. Never artificial. Always smooth.",
  },
];

export default function IngredientsSection() {
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
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        const isEven = i % 2 === 0;
        gsap.fromTo(
          el,
          { opacity: 0, x: isEven ? -60 : 60, y: 20 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1.1,
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
      id="ingredients"
      className="w-full py-40 md:py-56 px-6"
      style={{ background: "#fafaf8" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Headline — wide-tracked uppercase */}
        <p
          ref={headlineRef}
          className="text-center mb-32 md:mb-40"
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
          What&apos;s inside
        </p>

        {/* Ingredient rows — alternating alignment */}
        <div className="flex flex-col gap-28 md:gap-36">
          {ingredients.map((ing, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={ing.name}
                ref={(el) => { itemsRef.current[i] = el; }}
                className={`flex flex-col ${isEven ? "md:items-start md:text-left" : "md:items-end md:text-right"} items-center text-center`}
                style={{ maxWidth: "70%", marginLeft: isEven ? 0 : "auto", marginRight: isEven ? "auto" : 0 }}
              >
                {/* Number */}
                <span
                  style={{
                    fontFamily: "var(--font-grotesk)",
                    fontSize: "clamp(3rem, 6vw, 5rem)",
                    fontWeight: 700,
                    color: "rgba(0,0,0,0.04)",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {ing.num}
                </span>

                {/* Name — big Playfair */}
                <h3
                  className="-mt-4 md:-mt-6"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(2.2rem, 5vw, 4rem)",
                    color: "#222",
                    lineHeight: 1.1,
                  }}
                >
                  {ing.name}
                </h3>

                {/* Detail */}
                <p
                  className="mt-4 text-base md:text-lg leading-relaxed max-w-md"
                  style={{ fontFamily: "var(--font-inter)", color: "#999", fontWeight: 300 }}
                >
                  {ing.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
