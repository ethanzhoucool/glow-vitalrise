"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlowParticles from "./GlowParticles";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current || !bottleRef.current) return;

    const ctx = gsap.context(() => {
      // Content fade-in
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Bottle scale-in
      gsap.fromTo(
        bottleRef.current,
        { opacity: 0, scale: 0.85, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Slow parallax: bottle moves -80px during scroll for depth
      gsap.fromTo(
        bottleRef.current,
        { y: 0 },
        {
          y: -80,
          rotation: -1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        }
      );

      // Continuous float + micro-rotate
      const inner = bottleRef.current?.querySelector(".bottle-inner-cta");
      if (inner) {
        gsap.to(inner, {
          y: -8,
          rotation: 0.8,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="shop"
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{
        minHeight: "100vh",
        background: "#fafaf8",
      }}
    >
      {/* Baby-blue ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "80vw",
          height: "80vw",
          maxWidth: "900px",
          maxHeight: "900px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -48%)",
          background:
            "radial-gradient(ellipse at center, rgba(185,215,248,0.28) 0%, rgba(195,220,250,0.12) 40%, transparent 65%)",
        }}
        aria-hidden
      />

      {/* Floating glow particles */}
      <GlowParticles count={16} color="rgba(175,210,245,0.35)" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center px-6 py-28 max-w-3xl mx-auto"
      >
        {/* Bottle — the closing hero moment */}
        <div
          ref={bottleRef}
          className="relative mb-16"
          style={{ width: "clamp(140px, 24vw, 240px)" }}
        >
          {/* Close baby-blue halo */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: "200%",
              height: "200%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(ellipse at center, rgba(185,215,248,0.25) 0%, transparent 55%)",
            }}
            aria-hidden
          />
          <div className="bottle-inner-cta relative">
            <Image
              src="/bottle.png"
              alt="glow. protein bottle"
              width={240}
              height={360}
              className="relative z-10 drop-shadow-xl"
              style={{ objectFit: "contain", width: "100%", height: "auto" }}
            />
          </div>
        </div>

        {/* Headline */}
        <h2
          className="mb-6"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
            color: "#222",
            lineHeight: 1.15,
          }}
        >
          Start your glow routine.
        </h2>

        <p
          className="text-base md:text-lg mb-14 max-w-md leading-relaxed"
          style={{ fontFamily: "var(--font-inter)", color: "#999" }}
        >
          Clean protein. Real ingredients. Designed for everyday wellness.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="px-10 py-4 rounded-full text-sm tracking-widest uppercase text-white cursor-pointer transition-all duration-300 hover:opacity-85"
            style={{
              fontFamily: "var(--font-inter)",
              background: "#222",
              letterSpacing: "0.18em",
            }}
          >
            Buy Now
          </button>

          <button
            className="px-10 py-4 rounded-full text-sm tracking-widest uppercase cursor-pointer transition-all duration-300 hover:border-[#999]"
            style={{
              fontFamily: "var(--font-inter)",
              color: "#888",
              border: "1.5px solid #ddd",
              background: "transparent",
              letterSpacing: "0.18em",
            }}
          >
            Subscribe &amp; Save
          </button>
        </div>

        {/* Micro-copy */}
        <p
          className="text-xs mt-10"
          style={{ fontFamily: "var(--font-inter)", color: "#ccc" }}
        >
          Free shipping · Cancel anytime
        </p>
      </div>
    </section>
  );
}
