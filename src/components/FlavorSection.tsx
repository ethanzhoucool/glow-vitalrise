"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const flavors = [
  {
    name: "Chocolate",
    gradient: "linear-gradient(160deg, #f5ede6 0%, #e8ddd4 50%, #f0e6dc 100%)",
    accent: "#b89a82",
  },
  {
    name: "Vanilla",
    gradient: "linear-gradient(160deg, #faf6ef 0%, #f2eadb 50%, #faf5ec 100%)",
    accent: "#d4c09e",
  },
  {
    name: "Salted Caramel",
    gradient: "linear-gradient(160deg, #f6ede4 0%, #ecdcc8 50%, #f4eade 100%)",
    accent: "#c4a06a",
  },
];

export default function FlavorSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

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

    cardsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
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
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-40 md:py-56 px-6"
      style={{ background: "#fafaf8" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Headline — elegant serif */}
        <h2
          ref={headlineRef}
          className="text-center mb-24 md:mb-32"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
            fontStyle: "italic",
            color: "#222",
            lineHeight: 1.2,
          }}
        >
          Three classic flavors.
        </h2>

        {/* Flavor blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {flavors.map((f, i) => (
            <div
              key={f.name}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="group relative rounded-3xl overflow-hidden cursor-pointer"
              style={{
                background: f.gradient,
                transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(-6px) scale(1.015)";
                el.style.boxShadow = `0 20px 50px rgba(0,0,0,0.06)`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(0) scale(1)";
                el.style.boxShadow = "none";
              }}
            >
              <div className="flex flex-col items-center justify-center text-center py-20 md:py-28 px-6">
                {/* Small accent dot */}
                <div
                  className="w-2 h-2 rounded-full mb-8 transition-transform duration-500 group-hover:scale-150"
                  style={{ background: f.accent }}
                />

                {/* Flavor name */}
                <h3
                  style={{
                    fontFamily: "var(--font-grotesk)",
                    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                    fontWeight: 600,
                    color: "#333",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {f.name}
                </h3>

                {/* Subtle tagline */}
                <p
                  className="mt-4 text-sm opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
                  style={{
                    fontFamily: "var(--font-inter)",
                    color: "#999",
                  }}
                >
                  Naturally flavored
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
