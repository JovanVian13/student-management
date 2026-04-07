// src/components/mahasiswa/SearchBar.tsx
"use client";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-sm">
      {/* Icon search */}
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
        🔍
      </span>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari NIM atau email..."
        className="pl-9" // padding kiri untuk icon
      />
    </div>
  );
}