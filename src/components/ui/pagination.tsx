// src/components/ui/Pagination.tsx
import { cn } from "@/lib/utils/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onChange }: PaginationProps) {
  // Tidak perlu render kalau hanya 1 halaman
  if (totalPages <= 1) return null;

  // Buat array nomor halaman: [1, 2, 3, 4, 5]
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between mt-4">
      
      {/* Info halaman */}
      <p className="text-sm text-gray-500">
        Halaman {currentPage} dari {totalPages}
      </p>

      {/* Tombol navigasi */}
      <div className="flex items-center gap-1">
        
        {/* Tombol Previous */}
        <button
          onClick={() => onChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "px-3 py-1.5 rounded-lg text-sm transition-colors",
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed"  // disabled
              : "text-gray-600 hover:bg-gray-100"   // aktif
          )}
        >
          ← Prev
        </button>

        {/* Nomor halaman */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onChange(page)}
            className={cn(
              "w-8 h-8 rounded-lg text-sm transition-colors",
              page === currentPage
                ? "bg-blue-600 text-white"        // halaman aktif
                : "text-gray-600 hover:bg-gray-100" // halaman lain
            )}
          >
            {page}
          </button>
        ))}

        {/* Tombol Next */}
        <button
          onClick={() => onChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "px-3 py-1.5 rounded-lg text-sm transition-colors",
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-100"
          )}
        >
          Next →
        </button>

      </div>
    </div>
  );
}