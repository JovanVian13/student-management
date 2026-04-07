"use client";
import { useMahasiswaStore } from "@/lib/store/mahasiswaStore";
import { useAuthStore } from "@/lib/store/authStore";
import { JURUSAN_OPTIONS } from "@/lib/utils/constants";

export default function DashboardPage() {
  const { data } = useMahasiswaStore();
  const { user } = useAuthStore();
  const stats = {
    total: data.length,
    aktif: data.length,
    jurusan: JURUSAN_OPTIONS.map((j) => ({
      nama: j,
      count: data.filter((m) => m.jurusan === j).length,
    })),
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Selamat datang kembali, {user?.name}!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Total Mahasiswa</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
        </div>

        {stats.jurusan.map((j) => (
          <div key={j.nama} className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500">{j.nama}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{j.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}