import { Inter, Amiri, Scheherazade_New, Noto_Naskh_Arabic } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

export const scheherazade = Scheherazade_New({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-scheherazade",
});

export const notoNaskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-noto-naskh",
});
