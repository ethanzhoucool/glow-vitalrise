"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlowParticles from "./GlowParticles";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const bottleRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!bottleRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax: bottle moves slower than scroll (-120px max)
      gsap.fromTo(
        bottleRef.current,
        { y: 0 },
        {
          y: -120,
          scale: 1.06,
          rotation: -1.5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      // Continuous subtle float + micro-rotation
      const inner = bottleRef.current?.querySelector(".bottle-inner");
      if (inner) {
        gsap.to(inner, {
          y: -10,
          rotation: 1,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Let ScrollTrigger recalculate after layout settles
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: "100vh", background: "#fafaf8" }}
    >
      {/* Baby-blue radial glow behind bottle */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "min(900px, 100vw)",
          height: "min(900px, 100vw)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -48%)",
          background:
            "radial-gradient(ellipse at center, rgba(190,218,245,0.35) 0%, rgba(200,220,248,0.18) 35%, transparent 65%)",
        }}
        aria-hidden
      />

      {/* Floating glow particles */}
      <GlowParticles count={22} color="rgba(175,210,245,0.4)" />

      {/* Navbar */}
      <motion.nav
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 md:px-12 py-6 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <Image
          src="/logo.png"
          alt="glow."
          width={80}
          height={32}
          style={{ objectFit: "contain" }}
          priority
        />
        <div className="hidden md:flex items-center gap-10">
          {["About", "Ingredients", "Reviews"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[13px] tracking-[0.08em]"
              style={{ fontFamily: "var(--font-inter)", color: "#888" }}
            >
              {item}
            </a>
          ))}
          <a
            href="#shop"
            className="text-[13px] tracking-[0.08em] px-5 py-2 rounded-full"
            style={{
              fontFamily: "var(--font-inter)",
              color: "#222",
              background: "rgba(0,0,0,0.04)",
            }}
          >
            Shop
          </a>
        </div>
      </motion.nav>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* by VitalRise */}
        <motion.p
          className="text-[11px] tracking-[0.5em] uppercase mb-6"
          style={{ fontFamily: "var(--font-inter)", color: "#bbb" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          by VitalRise
        </motion.p>

        {/* Logo image as hero mark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-2"
        >
          <Image
            src="/logo.png"
            alt="glow."
            width={360}
            height={120}
            className="w-[clamp(220px,40vw,400px)] h-auto"
            style={{ objectFit: "contain" }}
            priority
          />
        </motion.div>

        {/* Glow Protein */}
        <motion.p
          className="mt-2 mb-2 text-sm md:text-base tracking-[0.35em] uppercase"
          style={{ fontFamily: "var(--font-inter)", color: "#aaa" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Glow Protein
        </motion.p>

        {/* Bottle — the hero object */}
        <div ref={bottleRef} className="relative mt-8 md:mt-12">
          {/* Baby-blue halo directly behind bottle */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: "180%",
              height: "180%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(ellipse at center, rgba(185,215,248,0.32) 0%, transparent 60%)",
            }}
            aria-hidden
          />

          <motion.div
            className="bottle-inner relative"
            style={{ width: "clamp(160px, 30vw, 300px)" }}
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/bottle.png"
              alt="glow. protein bottle"
              width={300}
              height={440}
              className="relative z-10 drop-shadow-xl"
              style={{ objectFit: "contain" }}
              priority
            />
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          className="mt-14 text-lg md:text-xl"
          style={{
            fontFamily: "var(--font-playfair)",
            fontStyle: "italic",
            color: "#888",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.0 }}
        >
          Strength inside. Glow outside.
        </motion.p>

        {/* CTA */}
        <motion.a
          href="#shop"
          className="mt-10 inline-block px-10 py-4 rounded-full text-[13px] tracking-[0.15em] uppercase text-white cursor-pointer"
          style={{
            fontFamily: "var(--font-inter)",
            background: "#222",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Shop Now
        </motion.a>

        {/* Scroll indicator */}
        <motion.div
          className="mt-20 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <motion.div
            className="w-px h-12"
            style={{ background: "linear-gradient(to bottom, #ccc, transparent)" }}
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
