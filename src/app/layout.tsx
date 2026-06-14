import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/sections/navbar";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Jifriya Nargees | Full Stack Developer & Software Engineer",
  description: "Personal portfolio of Jifriya Nargees, a Full Stack Developer specializing in building scalable web applications with Next.js, Laravel, and React.",
  keywords: ["Jifriya Nargees", "Full Stack Developer", "Software Engineer", "Portfolio", "Next.js", "Laravel", "React", "PHP", "Python"],
  authors: [{ name: "Jifriya Nargees" }],
  creator: "Jifriya Nargees",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jifiriya.vercel.app/", // Replace with actual domain after deployment
    title: "Jifriya Nargees | Full Stack Developer",
    description: "Engineering high-performance digital experiences. Explore the portfolio of Jifriya Nargees.",
    siteName: "Jifriya Nargees Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jifriya Nargees | Full Stack Developer",
    description: "Full Stack Developer specializing in scalable web applications.",
  },
  verification: {
    google: "SeRnuMCuptWgT-jx5e_LwgRGOrehvmLIXWUe3UT_WCA"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          outfit.variable
        )}
      >
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
