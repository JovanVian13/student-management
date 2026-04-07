// src/components/ui/Button.tsx
import { cn } from "@/lib/utils/cn";

// Definisikan props yang bisa diterima Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // extends = ambil semua props button HTML biasa (onClick, disabled, type, dll)
  // lalu tambah props custom kita sendiri:
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean; // untuk tampilkan spinner saat loading
}

export function Button({
  variant = "primary",  // default kalau tidak diisi
  size = "md",
  isLoading = false,
  className,            // className dari luar bisa override
  children,             // isi dalam button
  disabled,
  ...props              // semua props HTML biasa (onClick, type, dll)
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      // disabled kalau memang disabled, ATAU sedang loading
      className={cn(
        // Base style — selalu ada
        "rounded-lg font-medium transition-colors duration-200 inline-flex items-center justify-center gap-2",

        // Style berdasarkan variant
        variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300",
        variant === "secondary" && "bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50",
        variant === "danger" && "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300",
        variant === "ghost" && "text-gray-600 hover:bg-gray-100 disabled:opacity-50",

        // Style berdasarkan size
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-4 py-2 text-sm",
        size === "lg" && "px-6 py-3 text-base",

        // Kalau loading, cursor berubah
        isLoading && "cursor-not-allowed",

        className // style dari luar (bisa override)
      )}
      {...props}
    >
      {/* Spinner saat loading */}
      {isLoading && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}