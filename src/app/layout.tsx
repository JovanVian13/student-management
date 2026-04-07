// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
// Inter = font Google yang clean dan profesional

export const metadata: Metadata = {
  title: "Sistem Manajemen Mahasiswa",
  description: "Aplikasi manajemen data mahasiswa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {children}
        {/* children = halaman yang sedang aktif */}
      </body>
    </html>
  );
}