// src/app/(dashboard)/layout.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { useAuthStore } from "@/lib/store/authStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  // Double check auth di client side
  // (middleware sudah handle di server, ini sebagai backup)
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* Sidebar kiri */}
      <Sidebar />

      {/* Konten kanan */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Navbar atas */}
        <Navbar />

        {/* Area konten utama */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
          {/* children = halaman aktif (dashboard, mahasiswa, dll) */}
        </main>

      </div>
    </div>
  );
}