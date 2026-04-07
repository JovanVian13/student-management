// src/app/(dashboard)/mahasiswa/[id]/page.tsx
"use client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useMahasiswaStore } from "@/lib/store/mahasiswaStore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function DetailMahasiswaPage() {
  const { id } = useParams();
  // useParams() = ambil nilai dari URL dinamis [id]
  // Kalau URL-nya /mahasiswa/5, maka id = "5"

  const router = useRouter();
  const { getById, remove } = useMahasiswaStore();

  const mhs = getById(Number(id)); // konversi string ke number

  // Kalau data tidak ditemukan
  if (!mhs) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-gray-500">Mahasiswa tidak ditemukan</p>
        <Link href="/mahasiswa">
          <Button variant="secondary">Kembali ke Daftar</Button>
        </Link>
      </div>
    );
  }

  const handleHapus = () => {
    remove(mhs.id);
    router.push("/mahasiswa");
  };

  // Format tanggal dari ISO string ke format Indonesia
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric", month: "long", year: "numeric",
    });
    // Output: "10 Mei 2003"
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl">

      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/mahasiswa">
          <Button variant="ghost" size="sm">← Kembali</Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Detail Mahasiswa</h1>
      </div>

      {/* Card detail */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">

        {/* Nama dan jurusan */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{mhs.nama}</h2>
            <p className="text-gray-500 text-sm mt-1">{mhs.nim}</p>
          </div>
          <Badge jurusan={mhs.jurusan} />
        </div>

        {/* Tabel detail */}
        <div className="grid grid-cols-1 gap-4">
          {[
            { label: "Email", value: mhs.email },
            { label: "Tanggal Lahir", value: formatDate(mhs.tanggal_lahir) },
            { label: "Tanggal Daftar", value: formatDate(mhs.created_at) },
            { label: "Terakhir Diperbarui", value: formatDate(mhs.updated_at) },
          ].map((item) => (
            <div key={item.label} className="flex gap-4 py-3 border-b border-gray-100 last:border-0">
              <span className="text-sm text-gray-500 w-40 flex-shrink-0">{item.label}</span>
              <span className="text-sm text-gray-900 font-medium">{item.value}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Tombol aksi */}
      <div className="flex gap-3">
        <Link href={`/mahasiswa/${mhs.id}/edit`}>
          <Button>Edit Data</Button>
        </Link>
        <Button variant="danger" onClick={handleHapus}>
          Hapus Mahasiswa
        </Button>
      </div>

    </div>
  );
}