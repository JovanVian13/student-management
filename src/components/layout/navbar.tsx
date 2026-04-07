"use client";
import { useAuthStore } from "@/lib/store/authStore";

export function Navbar() {
  const { user } = useAuthStore();

  return (
    <nav className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      
      <h1 className="font-bold text-lg text-gray-900">
        Sistem Manajemen Mahasiswa
      </h1>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
      </div>
    </nav>
  );
}