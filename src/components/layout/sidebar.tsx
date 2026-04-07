// src/components/layout/Sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { ROUTES } from "@/lib/utils/constants";

// Definisikan menu items
const MENU_ITEMS = [
  { label: "Dashboard", href: ROUTES.DASHBOARD, icon: "📊" },
  { label: "Mahasiswa", href: ROUTES.MAHASISWA, icon: "🎓" },
];

export function Sidebar() {
  const pathname = usePathname();
  // pathname = URL halaman aktif sekarang, misal "/mahasiswa"

  return (
    <aside className="w-64 bg-gray-900 min-h-screen p-4">
      
      <nav className="flex flex-col gap-1 mt-4">
        {MENU_ITEMS.map((item) => {
          // Cek apakah menu ini sedang aktif
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-blue-600 text-white"           // aktif
                  : "text-gray-400 hover:bg-gray-800 hover:text-white" // tidak aktif
              )}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}