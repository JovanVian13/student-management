"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Save, XCircle, AlertCircle } from "lucide-react";
import { useMahasiswaStore } from "@/lib/store/mahasiswaStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JURUSAN_OPTIONS } from "@/lib/utils/constants";
import type { Jurusan } from "@/lib/types/mahasiswa";

export default function TambahMahasiswaPage() {
  const router = useRouter();
  const { add, data } = useMahasiswaStore();

  const [form, setForm] = useState({
    nim: "",
    nama: "",
    email: "",
    jurusan: "" as Jurusan | "",
    tanggal_lahir: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.nim.trim()) newErrors.nim = "NIM wajib diisi";
    else if (data.some((m) => m.nim === form.nim))
      newErrors.nim = "NIM sudah digunakan";

    if (!form.nama.trim()) newErrors.nama = "Nama wajib diisi";

    if (!form.email.trim()) newErrors.email = "Email wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Format email tidak valid";
    else if (data.some((m) => m.email === form.email))
      newErrors.email = "Email sudah digunakan";

    if (!form.jurusan) newErrors.jurusan = "Jurusan wajib dipilih";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    add({
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
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Tambah Mahasiswa</h1>
          <p className="text-gray-500 mt-1">Lengkapi formulir di bawah untuk mendaftarkan mahasiswa baru.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="NIM"
            placeholder="Contoh: 2021001"
            value={form.nim}
            onChange={(e) => handleChange("nim", e.target.value)}
            error={errors.nim}
            required
          />

          <Input
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap"
            value={form.nama}
            onChange={(e) => handleChange("nama", e.target.value)}
            error={errors.nama}
            required
          />

          <Input
            label="Email"
            type="email"
            placeholder="nama@student.ac.id"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={errors.email}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Jurusan <span className="text-red-500">*</span>
            </label>
            <select
              value={form.jurusan}
              onChange={(e) => handleChange("jurusan", e.target.value)}
              className={`border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.jurusan ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            >
              <option value="">Pilih jurusan...</option>
              {JURUSAN_OPTIONS.map((j) => (
                <option key={j} value={j}>
                  {j}
                </option>
              ))}
            </select>
            {errors.jurusan && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" /> {errors.jurusan}
              </p>
            )}
          </div>

          <Input
            label="Tanggal Lahir"
            type="date"
            value={form.tanggal_lahir}
            onChange={(e) => handleChange("tanggal_lahir", e.target.value)}
          />

          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="flex items-center gap-2 px-6"
            >
              {isLoading ? (
                "Menyimpan..."
              ) : (
                <>
                  <Save className="w-4 h-4" /> Simpan Data
                </>
              )}
            </Button>
            
            <Link href="/mahasiswa">
              <Button variant="secondary" type="button" className="flex items-center gap-2">
                <XCircle className="w-4 h-4" /> Batal
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}