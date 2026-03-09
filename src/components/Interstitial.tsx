"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface InterstitialProps {
  text: string;
  variant?: "serif" | "grotesk" | "wide" | "italic";
  color?: string;
  bg?: string;
}

export default function Interstitial({
  text,
  variant = "serif",
  color = "#222",
  bg = "#fafaf8",
}: InterstitialProps) {
  const ref = useRef<HTMLDivElement>(null);

  const fontMap: Record<string, { fontFamily: string; extra: React.CSSProperties }> = {
    serif: {
      fontFamily: "var(--font-playfair)",
      extra: { fontWeight: 400, fontStyle: "italic" },
    },
    grotesk: {
      fontFamily: "var(--font-grotesk)",
      extra: { fontWeight: 700, letterSpacing: "-0.04em" },
    },
    wide: {
      fontFamily: "var(--font-inter)",
      extra: { fontWeight: 300, letterSpacing: "0.35em", textTransform: "uppercase" as const, fontSize: "clamp(0.9rem, 2vw, 1.4rem)" },
    },
    italic: {
      fontFamily: "var(--font-playfair)",
      extra: { fontWeight: 400, fontStyle: "italic" },
    },
  };

  const style = fontMap[variant];

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      className="w-full flex items-center justify-center px-6"
      style={{ background: bg, minHeight: "50vh", padding: "6rem 1.5rem" }}
    >
      <p
        ref={ref}
        className="text-center max-w-5xl mx-auto"
        style={{
          fontFamily: style.fontFamily,
          fontSize: variant === "wide" ? style.extra.fontSize : "clamp(2rem, 5.5vw, 4.5rem)",
          color,
          lineHeight: 1.2,
          opacity: 0,
          ...style.extra,
        }}
      >
        {text}
      </p>
    </div>
  );
}
