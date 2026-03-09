"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface GlowParticlesProps {
  count?: number;
  color?: string;
  className?: string;
}

export default function GlowParticles({
  count = 18,
  color = "rgba(180, 210, 240, 0.45)",
  className = "",
}: GlowParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const particles = containerRef.current.querySelectorAll<HTMLDivElement>(".gp");

    particles.forEach((p) => {
      const dur = 4 + Math.random() * 6;
      const delay = Math.random() * dur;
      const xRange = 20 + Math.random() * 40;
      const yRange = 30 + Math.random() * 50;

      gsap.set(p, {
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
      });

      gsap.to(p, {
        keyframes: [
          { x: `+=${xRange}`, y: `-=${yRange}`, opacity: 0.8, duration: dur * 0.5 },
          { x: `-=${xRange * 0.6}`, y: `+=${yRange * 0.3}`, opacity: 0.3, duration: dur * 0.5 },
        ],
        repeat: -1,
        yoyo: true,
        delay,
        ease: "sine.inOut",
      });
    });
  }, [count]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden
    >
      {Array.from({ length: count }).map((_, i) => {
        const size = 3 + Math.random() * 6;
        return (
          <div
            key={i}
            className="gp absolute rounded-full"
            style={{
              width: size,
              height: size,
              background: color,
              filter: `blur(${1 + Math.random() * 2}px)`,
              top: `${10 + Math.random() * 80}%`,
              left: `${10 + Math.random() * 80}%`,
              opacity: 0.2 + Math.random() * 0.4,
            }}
          />
        );
      })}
    </div>
  );
}
