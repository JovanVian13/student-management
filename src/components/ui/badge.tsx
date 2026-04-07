// src/components/ui/Badge.tsx
import { cn } from "@/lib/utils/cn";
import type { Jurusan } from "@/lib/types/mahasiswa";

// Map setiap jurusan ke warna Tailwind
const JURUSAN_COLORS: Record<Jurusan, string> = {
  "Informatika":      "bg-blue-100 text-blue-700",
  "Sistem Informasi": "bg-purple-100 text-purple-700",
  "Teknik Elektro":   "bg-yellow-100 text-yellow-700",
  "Manajemen":        "bg-green-100 text-green-700",
};

interface BadgeProps {
  jurusan: Jurusan;
}

export function Badge({ jurusan }: BadgeProps) {
  return (
    <span
      className={cn(
        "px-2.5 py-0.5 rounded-full text-xs font-medium",
        JURUSAN_COLORS[jurusan]
      )}
    >
      {jurusan}
    </span>
  );
}