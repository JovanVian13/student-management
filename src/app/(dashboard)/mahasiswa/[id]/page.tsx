"use client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useMahasiswaStore } from "@/lib/store/mahasiswaStore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function DetailMahasiswaPage() {
  const { id } = useParams();
  const router = useRouter();
  const { getById, remove } = useMahasiswaStore();
  const mhs = getById(Number(id));

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

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric", month: "long", year: "numeric",
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl">

      <div className="flex flex-col gap-4">
        <Link 
          href="/mahasiswa" 
          className="group flex items-center text-sm font-medium text-gray-500 hover:text-[#116611] transition-colors w-fit"
        >
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Daftar
        </Link>
        <h1 className="text-2xl font-bold text-[#116611]">Detail Mahasiswa</h1>
      </div>

      <div className="bg-white rounded-xl border border-[#116611]/20 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#116611]">{mhs.nama}</h2>
            <p className="text-gray-500 text-sm mt-1">{mhs.nim}</p>
          </div>
          <Badge jurusan={mhs.jurusan} />
        </div>

        <div className="grid grid-cols-1 gap-4">
          {[
            { label: "Email", value: mhs.email },
            { label: "Tanggal Lahir", value: formatDate(mhs.tanggal_lahir) },
            { label: "Tanggal Daftar", value: formatDate(mhs.created_at) },
            { label: "Terakhir Diperbarui", value: formatDate(mhs.updated_at) },
          ].map((item) => (
            <div key={item.label} className="flex gap-4 py-3 border-b border-[#116611]/10 last:border-0">
              <span className="text-sm text-gray-500 w-40 shrink-0">{item.label}</span>
              <span className="text-sm text-gray-900 font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Link href={`/mahasiswa/${mhs.id}/edit`}>
          <Button style={{ backgroundColor: '#116611' }} className="hover:opacity-90 text-white">Edit Data</Button>
        </Link>
        <Button variant="danger" onClick={handleHapus}>
          Hapus Mahasiswa
        </Button>
      </div>
    </div>
  );
}