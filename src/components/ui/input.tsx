// src/components/ui/Input.tsx
import { cn } from "@/lib/utils/cn";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;       // teks label di atas input
  error?: string;       // pesan error di bawah input
  helperText?: string;  // teks bantuan (opsional, bukan error)
}

// forwardRef diperlukan supaya react-hook-form bisa "pegang" input ini
// Tanpa forwardRef, library form tidak bisa akses input element-nya
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        
        {/* Label — hanya tampil kalau ada */}
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
            {/* Tampilkan tanda * kalau input required */}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Input field */}
        <input
          ref={ref} // sambungkan ref dari forwardRef
          className={cn(
            "border rounded-lg px-3 py-2 text-sm w-full outline-none transition-all duration-200",
            "placeholder:text-gray-400",
            // Normal state
            "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            // Error state — ganti warna border dan ring
            error && "border-red-500 focus:ring-red-500",
            // Disabled state
            props.disabled && "bg-gray-50 cursor-not-allowed text-gray-400",
            className
          )}
          {...props}
        />

        {/* Pesan error */}
        {error && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}

        {/* Helper text — hanya tampil kalau tidak ada error */}
        {helperText && !error && (
          <p className="text-xs text-gray-400">{helperText}</p>
        )}

      </div>
    );
  }
);
Input.displayName = "Input"; // untuk debugging di React DevTools