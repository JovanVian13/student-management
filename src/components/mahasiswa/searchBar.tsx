"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <Search size={18} strokeWidth={2} />
      </div>
      
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari NIM atau email..."
        className="pl-10 h-10" 
      />
    </div>
  );
}