// src/components/mahasiswa/MahasiswaTable.tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import type { Mahasiswa } from "@/lib/types/mahasiswa";
import { useMahasiswaStore } from "@/lib/store/mahasiswaStore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

interface MahasiswaTableProps {
  data: Mahasiswa[]; // data yang sudah dipaginasi
}

export function MahasiswaTable({ data }: MahasiswaTableProps) {
  const { remove } = useMahasiswaStore();

  // State untuk modal konfirmasi hapus
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHapusClick = (id: number) => {
    setSelectedId(id);   // simpan ID yang mau dihapus
    setIsModalOpen(true); // buka modal
  };

  const handleConfirmHapus = () => {
    if (selectedId) remove(selectedId); // hapus dari store
    setIsModalOpen(false);              // tutup modal
    setSelectedId(null);               // reset ID
  };

  return (
    <>
      {/* Tabel */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        {/* overflow-x-auto = kalau tabel terlalu lebar, bisa scroll horizontal */}
        <table className="w-full text-sm">
          
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["NIM", "Nama", "Email", "Jurusan", "Aksi"].map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {/* Kalau data kosong */}
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                  Tidak ada data mahasiswa
                </td>
              </tr>
            ) : (
              data.map((mhs) => (
                <tr key={mhs.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-gray-900">{mhs.nim}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{mhs.nama}</td>
                  <td className="px-4 py-3 text-gray-500">{mhs.email}</td>
                  <td className="px-4 py-3">
                    <Badge jurusan={mhs.jurusan} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/mahasiswa/${mhs.id}`}>
                        <Button variant="ghost" size="sm">Detail</Button>
                      </Link>
                      <Link href={`/mahasiswa/${mhs.id}/edit`}>
                        <Button variant="secondary" size="sm">Edit</Button>
                      </Link>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleHapusClick(mhs.id)}
                      >
                        Hapus
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* Modal konfirmasi hapus */}
      <Modal
        isOpen={isModalOpen}
        title="Hapus Mahasiswa?"
        message="Data mahasiswa yang dihapus tidak bisa dikembalikan. Apakah kamu yakin?"
        onConfirm={handleConfirmHapus}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
}