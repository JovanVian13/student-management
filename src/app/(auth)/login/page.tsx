"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email dan password wajib diisi");
      return;
    }

    setIsLoading(true);
    setError("");

    await new Promise((resolve) => setTimeout(resolve, 500));

    const success = login(email, password);

    if (success) {
      const from = searchParams.get("from") || "/dashboard";
      router.push(from);
    } else {
      setError("Email atau password salah");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#116611]/5 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-[#116611]/20 w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#116611]">Selamat Datang</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Masuk ke Sistem Manajemen Mahasiswa
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="focus:ring-[#116611] focus:border-[#116611]"
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="focus:ring-[#116611] focus:border-[#116611]"
          />

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            isLoading={isLoading}
            style={{ backgroundColor: '#116611' }}
            className="w-full mt-2 hover:opacity-90 text-white"
          >
            {isLoading ? "Memproses..." : "Masuk"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Belum punya akun?{" "}
          <Link href="/register" className="text-[#116611] hover:underline font-medium">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}