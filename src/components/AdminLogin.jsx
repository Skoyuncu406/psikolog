"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function AdminLogin() {
  const router = useRouter();
  const setAdmin = useAuthStore((state) => state.setAdmin);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      setError("Kullanıcı adı ve şifre zorunludur.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Giriş başarısız.");
        return;
      }

      setAdmin();
      router.push("/admin/dashboard");
    } catch (error) {
      setError("Sunucu hatası oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] bg-[#f7f5ef] flex items-center justify-center px-5 py-20">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-xl p-8 border border-[#ebe4d6]">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#e3efe8] rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-[#1f5f4b]" size={30} />
          </div>

          <h1 className="text-3xl font-serif font-bold text-[#1f332b]">
            Admin Girişi
          </h1>

          <p className="mt-2 text-[#5f6f66]">
            Blog ve mesaj yönetimi için giriş yapın.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-semibold text-[#1f332b]">
              Kullanıcı Adı
            </label>

            <div className="relative">
              <User
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a8b7f]"
              />
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Kullanıcı adı"
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-[#d8d1bf] outline-none focus:border-[#1f5f4b] bg-[#f7f5ef]"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-[#1f332b]">
              Şifre
            </label>

            <div className="relative">
              <Lock
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a8b7f]"
              />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Şifre"
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-[#d8d1bf] outline-none focus:border-[#1f5f4b] bg-[#f7f5ef]"
              />
            </div>
          </div>

          {error && (
            <p className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1f5f4b] text-white py-4 rounded-full font-bold hover:bg-[#174637] transition disabled:opacity-60"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}