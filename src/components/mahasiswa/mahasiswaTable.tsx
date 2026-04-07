"use client";
import Link from "next/link";
import { useState } from "react";
import type { Mahasiswa } from "@/lib/types/mahasiswa";
import { useMahasiswaStore } from "@/lib/store/mahasiswaStore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface MahasiswaTableProps {
  data: Mahasiswa[];
}

export function MahasiswaTable({ data }: MahasiswaTableProps) {
  const { remove } = useMahasiswaStore();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHapusClick = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleConfirmHapus = () => {
    if (selectedId) remove(selectedId);
    setIsModalOpen(false);
    setSelectedId(null);
  };

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-[#116611]/20">
        <table className="w-full text-sm">
          <thead className="bg-[#116611]/5 border-b border-[#116611]/20">
            <tr>
              {["NIM", "Nama", "Email", "Jurusan", "Aksi"].map((col) => (
                <th 
                  key={col} 
                  className="px-4 py-3 text-left text-xs font-semibold text-[#116611] uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#116611]/20">
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                  Tidak ada data mahasiswa
                </td>
              </tr>
            ) : (
              data.map((mhs) => (
                <tr key={mhs.id} className="hover:bg-[#116611]/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-gray-900">{mhs.nim}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{mhs.nama}</td>
                  <td className="px-4 py-3 text-gray-500">{mhs.email}</td>
                  <td className="px-4 py-3">
                    <Badge jurusan={mhs.jurusan} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/mahasiswa/${mhs.id}`} aria-label="Detail Mahasiswa">
                        <Button variant="ghost" className="h-8 w-8 text-blue-600 p-0 hover:bg-blue-100">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>

                      <Link href={`/mahasiswa/${mhs.id}/edit`} aria-label="Edit Mahasiswa">
                        <Button variant="ghost" className="h-8 w-8 text-yellow-600 p-0 hover:bg-yellow-50">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>

                      <Button
                        variant="ghost"
                        className="h-8 w-8 text-red-600 hover:bg-red-100 p-0"
                        aria-label="Hapus Mahasiswa"
                        onClick={() => handleHapusClick(mhs.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

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