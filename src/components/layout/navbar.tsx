// src/components/layout/Navbar.tsx
"use client"; // perlu karena pakai useState dan store
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      
      {/* Kiri: Nama aplikasi */}
      <h1 className="font-bold text-lg text-gray-900">
        Sistem Manajemen Mahasiswa
      </h1>

      {/* Kanan: Info user + tombol logout */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>

    </nav>
  );
}