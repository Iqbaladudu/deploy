"use client";

import "./globals.scss";
import "./global.css";
import { Inter } from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/drag-drop/dist/style.min.css";
import "@uppy/progress-bar/dist/style.min.css";
import "@uppy/status-bar/dist/style.min.css";
import "@uppy/drop-target/dist/style.min.css";
import "@uppy/informer/dist/style.min.css";
import "@uppy/image-editor/dist/style.min.css";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { useThemeStore } from "./store";

const inter = Inter({ subsets: ["latin"], preload: true });

// export const metadata = {
//   title: "Axioma",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  const theme = useThemeStore((state) => state.theme);
  return (
    <html lang="en" data-bs-theme={theme}>
      <head>
        <title>Axioma</title>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
