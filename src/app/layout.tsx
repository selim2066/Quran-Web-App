import type { Metadata } from "next";
import { inter, amiri, scheherazade, notoNaskh, playfair } from "@/lib/fonts";
import { Providers } from "@/providers";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quran Mazid | Premium Quran Reading Experience",
  description: "Read, study, and listen to the Holy Quran with a premium, immersive interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${amiri.variable} ${scheherazade.variable} ${notoNaskh.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Providers>
          {children}
          <Toaster position="bottom-right" expand={false} richColors />
        </Providers>
      </body>
    </html>
  );
}
