"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TextureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const word3Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        word1Ref.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: "power3.out" }
      )
      .fromTo(
        word2Ref.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: "power3.out" },
        "-=0.65"
      )
      .fromTo(
        word3Ref.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: "power3.out" },
        "-=0.65"
      )
      .fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #fafaf8 0%, #f0f3f8 40%, #eef2f8 60%, #fafaf8 100%)",
      }}
    >
      <div className="relative z-10 text-center px-6 py-32 md:py-40 max-w-5xl mx-auto">
        <h2 className="leading-[0.95] mb-12">
          <span
            ref={word1Ref}
            className="block"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(3.5rem, 10vw, 9rem)",
              fontWeight: 500,
              color: "#222",
              opacity: 0,
            }}
          >
            Smooth.
          </span>
          <span
            ref={word2Ref}
            className="block"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(3.5rem, 10vw, 9rem)",
              fontWeight: 500,
              fontStyle: "italic",
              color: "#b0c4de",
              opacity: 0,
            }}
          >
            Not
          </span>
          <span
            ref={word3Ref}
            className="block"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(3.5rem, 10vw, 9rem)",
              fontWeight: 500,
              color: "#222",
              opacity: 0,
            }}
          >
            chalky.
          </span>
        </h2>

        <p
          ref={subRef}
          className="text-lg md:text-xl max-w-md mx-auto leading-relaxed"
          style={{
            fontFamily: "var(--font-inter)",
            color: "#999",
            opacity: 0,
          }}
        >
          A protein shake you&apos;ll actually crave.
        </p>
      </div>
    </section>
  );
}