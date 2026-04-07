"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, LogOut } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { ROUTES } from "@/lib/utils/constants";
import { Button } from "../ui/button";
import { useAuthStore } from "@/lib/store/authStore";

const MENU_ITEMS = [
  { label: "Dashboard", href: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: "Mahasiswa", href: ROUTES.MAHASISWA, icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuthStore();
  const router = useRouter();
  
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-gray-900 h-screen p-4 text-white flex flex-col">
      
      <div className="mb-8 px-3">
        <h1 className="text-xl font-bold">Kampus Admin</h1>
      </div>

      <nav className="flex flex-col gap-1">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-[#116611] text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              )}
            >
              <Icon size={20} strokeWidth={2} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-800">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-gray-400 hover:text-white hover:bg-red-600/10 transition-all"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </Button>
      </div>

    </aside>
  );
}