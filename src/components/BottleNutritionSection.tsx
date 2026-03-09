"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlowParticles from "./GlowParticles";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { big: "30g", label: "Dairy Protein", accent: "rgba(185,215,248,0.18)" },
  { big: "1g", label: "Sugar", accent: "rgba(246,230,234,0.25)" },
  { big: "5g", label: "Fiber", accent: "rgba(238,233,246,0.25)" },
  { big: "A\u00A0+\u00A0D", label: "Vitamins", accent: "rgba(185,215,248,0.15)" },
];

/*
 * Architecture: ONE single ScrollTrigger pin covers the entire sequence.
 *
 * The pinned viewport is 100vh. Inside it, one bottle and one text column
 * live together. GSAP animates:
 *   1. Bottle fades in at center, caption appears briefly.
 *   2. Bottle shrinks + moves to the left column.
 *   3. Nutrition steps fade in / out on the right, one at a time.
 *   4. After the last step, the pin releases.
 *
 * Because GSAP pin uses `position: fixed`, it is immune to ancestor
 * `overflow` values that break CSS `position: sticky`.
 */

export default function BottleNutritionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !bottleRef.current) return;

    const mm = gsap.matchMedia();

    /* ─── DESKTOP ─── */
    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        // All steps start invisible
        stepRefs.current.forEach((el) => {
          if (el) gsap.set(el, { opacity: 0, x: 60 });
        });
        gsap.set(headlineRef.current, { opacity: 0, y: 30 });

        /*
         * Timeline duration budget (total = 1.0):
         *  0.00–0.08  Bottle fades in at center
         *  0.08–0.12  Hold + caption in
         *  0.12–0.16  Caption out
         *  0.16–0.28  Bottle shrinks & moves left + headline fades in
         *  0.28–0.44  Step 1 in → hold → out
         *  0.44–0.60  Step 2 in → hold → out
         *  0.60–0.76  Step 3 in → hold → out
         *  0.76–0.92  Step 4 in → hold (stays)
         *  0.92–1.00  Final hold before unpin
         */

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            // Long scroll distance: bottle intro + 4 steps
            end: "+=400%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // ── INTRO: Bottle fades in centered ──
        tl.fromTo(
          bottleRef.current,
          { scale: 1, opacity: 0, x: 0, y: 0 },
          { opacity: 1, duration: 0.08, ease: "power2.out" }
        );

        // Hold at center + show caption
        tl.fromTo(
          captionRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.04, ease: "power2.out" },
          0.08
        );

        // Caption out
        tl.to(captionRef.current, {
          opacity: 0,
          duration: 0.03,
        }, 0.13);

        // ── TRANSITION: Shrink + move left ──
        // Calculate x offset: move bottle from center (50vw) to left column center (25vw)
        // That's -25vw. We compute in px based on viewport.
        tl.to(
          bottleRef.current,
          {
            scale: 0.65,
            x: () => -(window.innerWidth * 0.25),
            y: 0,
            duration: 0.12,
            ease: "power3.inOut",
          },
          0.16
        );

        // Glow follows and dims
        tl.to(
          glowRef.current,
          {
            x: () => -(window.innerWidth * 0.25),
            scale: 0.5,
            opacity: 0.5,
            duration: 0.12,
            ease: "power3.inOut",
          },
          0.16
        );

        // Headline appears
        tl.to(
          headlineRef.current,
          { opacity: 1, y: 0, duration: 0.06, ease: "power2.out" },
          0.22
        );

        // Headline fades out before steps
        tl.to(
          headlineRef.current,
          { opacity: 0, duration: 0.04 },
          0.26
        );

        // ── NUTRITION STEPS: Stagger in/out on right side ──
        const stepStart = 0.30;
        const stepDuration = 0.16; // each step occupies this much of the timeline

        stepRefs.current.forEach((el, i) => {
          if (!el) return;
          const start = stepStart + i * stepDuration;
          const isLast = i === steps.length - 1;

          // Fade + slide in
          tl.fromTo(
            el,
            { opacity: 0, x: 60 },
            {
              opacity: 1,
              x: 0,
              duration: stepDuration * 0.35,
              ease: "power3.out",
            },
            start
          );

          // Fade out (except last step)
          if (!isLast) {
            tl.to(
              el,
              {
                opacity: 0,
                x: -30,
                duration: stepDuration * 0.25,
                ease: "power2.in",
              },
              start + stepDuration * 0.7
            );
          }
        });

        ScrollTrigger.refresh();
      }, sectionRef);

      return () => ctx.revert();
    });

    /* ─── MOBILE ─── */
    mm.add("(max-width: 767px)", () => {
      const ctx = gsap.context(() => {
        // Simple fade-in for bottle
        gsap.fromTo(
          bottleRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Caption
        gsap.fromTo(
          captionRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: captionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Headline
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Steps
        stepRefs.current.forEach((el) => {
          if (!el) return;
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
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
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "100vh", background: "#fafaf8" }}
    >
      {/* ── Full-viewport pinned canvas ── */}
      <div className="relative w-full h-full flex items-center justify-center">

        {/* Ambient glow (follows bottle) */}
        <div
          ref={glowRef}
          className="absolute pointer-events-none"
          style={{
            width: "min(800px, 80vw)",
            height: "min(800px, 80vw)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(ellipse at center, rgba(185,215,248,0.3) 0%, rgba(195,220,250,0.12) 40%, transparent 65%)",
          }}
          aria-hidden
        />

        {/* Particles */}
        <GlowParticles count={12} color="rgba(175,210,245,0.3)" />

        {/* ── Bottle (absolutely centered, GSAP moves it) ── */}
        <div
          ref={bottleRef}
          className="absolute z-10"
          style={{
            width: "clamp(200px, 24vw, 320px)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Close halo */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: "200%",
              height: "200%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(ellipse at center, rgba(185,215,248,0.22) 0%, transparent 55%)",
            }}
            aria-hidden
          />
          <Image
            src="/bottle.png"
            alt="glow. protein bottle"
            width={320}
            height={470}
            className="relative z-10 drop-shadow-xl"
            style={{ objectFit: "contain", width: "100%", height: "auto" }}
            priority
          />
        </div>

        {/* ── Caption (center, appears briefly) ── */}
        <div
          ref={captionRef}
          className="absolute z-20 text-center pointer-events-none"
          style={{ bottom: "12%", left: 0, right: 0, opacity: 0 }}
        >
          <p
            className="text-xs tracking-[0.4em] uppercase mb-2"
            style={{ fontFamily: "var(--font-inter)", color: "#bbb" }}
          >
            Formulated for you
          </p>
          <p
            className="text-lg md:text-xl"
            style={{
              fontFamily: "var(--font-playfair)",
              fontStyle: "italic",
              color: "#666",
            }}
          >
            Clean. Transparent. Nothing to hide.
          </p>
        </div>

        {/* ── Headline (appears during transition, then fades) ── */}
        <div
          ref={headlineRef}
          className="absolute z-20 text-center pointer-events-none px-6"
          style={{ top: "8%", left: 0, right: 0, opacity: 0 }}
        >
          <h2
            style={{
              fontFamily: "var(--font-grotesk)",
              fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
              fontWeight: 500,
              color: "#222",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            Simple ingredients.<br />Serious nutrition.
          </h2>
        </div>

        {/* ── Nutrition steps (right side, absolutely positioned) ── */}
        <div
          className="absolute z-20 hidden md:flex flex-col justify-center"
          style={{
            right: "8%",
            top: 0,
            bottom: 0,
            width: "40%",
          }}
        >
          {steps.map((step, i) => (
            <div
              key={step.big}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className="absolute"
              style={{
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              {/* Decorative ring behind the number */}
              <div
                className="absolute pointer-events-none"
                style={{
                  width: "clamp(160px, 14vw, 220px)",
                  height: "clamp(160px, 14vw, 220px)",
                  top: "50%",
                  left: "-10%",
                  transform: "translateY(-50%)",
                  borderRadius: "50%",
                  border: `2px solid ${step.accent}`,
                  background: step.accent,
                }}
                aria-hidden
              />
              {/* Big number — bold geometric (Space Grotesk) */}
              <span
                className="block relative z-10"
                style={{
                  fontFamily: "var(--font-grotesk)",
                  fontSize: "clamp(5rem, 12vw, 10rem)",
                  fontWeight: 700,
                  color: "#222",
                  lineHeight: 0.9,
                  letterSpacing: "-0.04em",
                }}
              >
                {step.big}
              </span>
              {/* Label — wide-tracked uppercase Inter */}
              <span
                className="block relative z-10 mt-4"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "clamp(0.7rem, 1vw, 0.85rem)",
                  fontWeight: 500,
                  color: "#aaa",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                }}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Mobile steps (stacked, natural flow) ── */}
        <div className="absolute z-20 flex md:hidden flex-col items-center gap-32 px-6 pt-[60vh]">
          {steps.map((step, i) => (
            <div
              key={`m-${step.big}`}
              ref={(el) => {
                if (!stepRefs.current[i]) stepRefs.current[i] = el;
              }}
              className="text-center relative"
            >
              {/* Mobile decorative ring */}
              <div
                className="absolute pointer-events-none"
                style={{
                  width: 140,
                  height: 140,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  borderRadius: "50%",
                  background: step.accent,
                }}
                aria-hidden
              />
              <span
                className="block relative z-10"
                style={{
                  fontFamily: "var(--font-grotesk)",
                  fontSize: "clamp(4rem, 16vw, 8rem)",
                  fontWeight: 700,
                  color: "#222",
                  lineHeight: 0.9,
                  letterSpacing: "-0.04em",
                }}
              >
                {step.big}
              </span>
              <span
                className="block relative z-10 mt-3"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "clamp(0.65rem, 2.5vw, 0.8rem)",
                  fontWeight: 500,
                  color: "#aaa",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                }}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
