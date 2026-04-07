// src/app/(dashboard)/mahasiswa/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { useMahasiswaStore } from "@/lib/store/mahasiswaStore";
import { usePagination } from "@/lib/hooks/usePagination";
import { MahasiswaTable } from "@/components/mahasiswa/mahasiswaTable";
import { SearchBar } from "@/components/mahasiswa/searchBar";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

export default function MahasiswaPage() {
  const [query, setQuery] = useState("");
  const { search } = useMahasiswaStore();
  const filtered = search(query);
  const { paginated, currentPage, totalPages, setCurrentPage, reset } = usePagination(filtered);

  const handleSearch = (value: string) => {
    setQuery(value);
    reset();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Mahasiswa</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Total {filtered.length} mahasiswa ditemukan
          </p>
        </div>
        <Link href="/mahasiswa/tambah">
          <Button>+ Tambah Mahasiswa</Button>
        </Link>
      </div>

      <SearchBar value={query} onChange={handleSearch} />

      <MahasiswaTable data={paginated} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={setCurrentPage}
      />
    </div>
  );
}