"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useMahasiswaStore } from "@/lib/store/mahasiswaStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JURUSAN_OPTIONS } from "@/lib/utils/constants";
import type { Jurusan } from "@/lib/types/mahasiswa";
import { ChevronLeft } from "lucide-react";

export default function EditMahasiswaPage() {
  const { id } = useParams();
  const router = useRouter();
  const { getById, update, data } = useMahasiswaStore();

  const mhs = getById(Number(id));

  const [form, setForm] = useState({
    nim: "", nama: "", email: "",
    jurusan: "" as Jurusan | "",
    tanggal_lahir: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (mhs) {
      setForm({
        nim: mhs.nim,
        nama: mhs.nama,
        email: mhs.email,
        jurusan: mhs.jurusan,
        tanggal_lahir: mhs.tanggal_lahir || "",
      });
    }
  }, [mhs]);

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

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.nim.trim()) newErrors.nim = "NIM wajib diisi";
    else if (data.some((m) => m.nim === form.nim && m.id !== mhs.id)) {
      newErrors.nim = "NIM sudah digunakan mahasiswa lain";
    }

    if (!form.nama.trim()) newErrors.nama = "Nama wajib diisi";

    if (!form.email.trim()) newErrors.email = "Email wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Format email tidak valid";
    else if (data.some((m) => m.email === form.email && m.id !== mhs.id)) {
      newErrors.email = "Email sudah digunakan mahasiswa lain";
    }

    if (!form.jurusan) newErrors.jurusan = "Jurusan wajib dipilih";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    update(mhs.id, {
      nim: form.nim,
      nama: form.nama,
      email: form.email,
      jurusan: form.jurusan as Jurusan,
      tanggal_lahir: form.tanggal_lahir || undefined,
    });

    router.push("/mahasiswa");
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex flex-col gap-4">
        <Link 
          href="/mahasiswa" 
          className="group flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors w-fit"
        >
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Daftar
        </Link>
        
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Edit Mahasiswa</h1>
          <p className="text-gray-500 mt-1">Perbarui data {mhs.nama}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <Input
            label="NIM"
            value={form.nim}
            onChange={(e) => handleChange("nim", e.target.value)}
            error={errors.nim}
            required
          />

          <Input
            label="Nama Lengkap"
            value={form.nama}
            onChange={(e) => handleChange("nama", e.target.value)}
            error={errors.nama}
            required
          />

          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={errors.email}
            required
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Jurusan <span className="text-red-500">*</span>
            </label>
            <select
              value={form.jurusan}
              onChange={(e) => handleChange("jurusan", e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih jurusan...</option>
              {JURUSAN_OPTIONS.map((j) => (
                <option key={j} value={j}>{j}</option>
              ))}
            </select>
            {errors.jurusan && (
              <p className="text-xs text-red-500">⚠ {errors.jurusan}</p>
            )}
          </div>

          <Input
            label="Tanggal Lahir"
            type="date"
            value={form.tanggal_lahir}
            onChange={(e) => handleChange("tanggal_lahir", e.target.value)}
          />

          <div className="flex gap-3 pt-2">
            <Button type="submit" isLoading={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
            <Link href={`/mahasiswa/${id}`}>
              <Button variant="secondary" type="button">Batal</Button>
            </Link>
          </div>

        </form>
      </div>

    </div>
  );
}