import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
// REMOVED: import { CustomCursor } from "@/components/ui/custom-cursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Spotmies | Next Gen Solutions",
  description: "Innovative solutions to stay ahead of the competition.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased no-scrollbar font-sans`}
      >
        {/* REMOVED: CustomCursor component */}

        {children}
      </body>
    </html>
  );
}