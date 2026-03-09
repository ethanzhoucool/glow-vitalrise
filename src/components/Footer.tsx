"use client";

export default function Footer() {
  return (
    <footer
      className="w-full py-20 md:py-28 px-6"
      style={{ background: "#fafaf8" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Brand */}
        <div className="text-center mb-16">
          <p
            className="text-2xl tracking-[0.02em] mb-2"
            style={{ fontFamily: "var(--font-playfair)", color: "#222" }}
          >
            glow.
          </p>
          <p
            className="text-xs tracking-wide"
            style={{ fontFamily: "var(--font-inter)", color: "#ccc" }}
          >
            by VitalRise
          </p>
        </div>

        {/* Links — single row */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {[
            "Shop",
            "Ingredients",
            "Reviews",
            "Our Story",
            "FAQ",
            "Contact",
          ].map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm transition-colors duration-200 hover:text-[#222]"
              style={{ fontFamily: "var(--font-inter)", color: "#aaa" }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-12 h-px mx-auto mb-12" style={{ background: "#e0dce0" }} />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs"
            style={{ fontFamily: "var(--font-inter)", color: "#ccc" }}
          >
            © {new Date().getFullYear()} VitalRise
          </p>
          <div className="flex gap-6">
            {["Instagram", "TikTok", "Pinterest"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-xs transition-colors duration-200 hover:text-[#999]"
                style={{ fontFamily: "var(--font-inter)", color: "#ccc" }}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
