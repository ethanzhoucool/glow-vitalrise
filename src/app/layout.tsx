import type { Metadata } from "next";
import { Playfair_Display, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "glow. — Glow Protein by VitalRise",
  description: "Strength inside. Glow outside. A clean protein shake designed for everyday wellness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} ${grotesk.variable} antialiased`}
        style={{ background: "#fafaf8", color: "#222" }}
      >
        {children}
      </body>
    </html>
  );
}
