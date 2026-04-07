"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuthStore();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) newErrors.name = "Nama wajib diisi";
    if (!form.email.trim()) newErrors.email = "Email wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Format email tidak valid";

    if (!form.password) newErrors.password = "Password wajib diisi";
    else if (form.password.length < 6) newErrors.password = "Password minimal 6 karakter";

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const success = register(form.name, form.email, form.password);

    if (success) {
      router.push("/login");
    } else {
      setErrors({ email: "Email sudah digunakan" });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#116611]/5 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-[#116611]/20 w-full max-w-md p-8">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#116611]">Buat Akun</h1>
          <p className="text-gray-500 mt-1 text-sm">Daftarkan akun baru Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Nama Lengkap"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            error={errors.name}
            required
            className="focus:ring-[#116611] focus:border-[#116611]"
          />

          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={errors.email}
            required
            className="focus:ring-[#116611] focus:border-[#116611]"
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            error={errors.password}
            helperText="Minimal 6 karakter"
            required
            className="focus:ring-[#116611] focus:border-[#116611]"
          />

          <Input
            label="Konfirmasi Password"
            type="password"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            error={errors.confirmPassword}
            required
            className="focus:ring-[#116611] focus:border-[#116611]"
          />

          <Button 
            type="submit" 
            size="lg" 
            isLoading={isLoading} 
            style={{ backgroundColor: '#116611' }}
            className="w-full mt-2 hover:opacity-90 text-white"
          >
            {isLoading ? "Memproses..." : "Daftar"}
          </Button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-[#116611] hover:underline font-medium">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}