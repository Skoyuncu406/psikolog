"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Edit, LogOut, Newspaper, Trash2 } from "lucide-react";

import BlogForm from "@/components/BlogForm";
import AdminMessages from "@/components/AdminMessages";
import AdminAppointments from "@/components/AdminAppointments";
import AdminStats from "@/components/AdminStats";
import { useAuthStore } from "@/store/authStore";

export default function AdminDashboardPage() {
  const router = useRouter();

  const isAdmin = useAuthStore((state) => state.isAdmin);
  const logout = useAuthStore((state) => state.logout);

  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);

  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalMessages: 0,
    unreadMessages: 0,
    pendingAppointments: 0,
    todayAppointments: 0,
  });

  const [statsLoading, setStatsLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats", {
        cache: "no-store",
      });

      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("İstatistikler alınamadı:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs", {
        cache: "no-store",
      });

      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Bloglar alınamadı:", error);
      setBlogs([]);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchStats();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Bu makaleyi silmek istediğinize emin misiniz?",
    );

    if (!confirmDelete) return;

    await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
    });

    fetchBlogs();
    fetchStats();
  };

  const handleLogout = () => {
    logout();
    router.push("/admin");
  };

  if (!isAdmin) {
    return (
      <div className="min-h-[75vh] bg-[#f7f5ef] flex items-center justify-center px-5">
        <div className="max-w-md text-center border-t border-[#1f332b]/10 pt-10">
          <h1 className="text-4xl font-serif font-bold text-[#1f332b]">
            Yetkisiz Giriş
          </h1>

          <p className="mt-4 text-[#5f6f66]">
            Admin paneline erişmek için giriş yapmanız gerekir.
          </p>

          <Link
            href="/admin"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1f332b] text-white px-7 py-4 font-semibold hover:bg-[#1f5f4b] transition"
          >
            Admin Girişine Git
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f5ef] min-h-screen overflow-x-hidden">
      <section className="border-b border-[#1f332b]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <span className="text-sm uppercase tracking-[0.35em] text-[#1f5f4b]">
                Admin Paneli
              </span>

              <h1 className="mt-5 text-5xl md:text-6xl font-serif font-bold text-[#1f332b] leading-tight">
                İçerik ve randevu yönetimi.
              </h1>

              <p className="mt-5 max-w-2xl text-[#5f6f66] text-lg leading-relaxed">
                Blog yazılarını, gelen mesajları ve randevu taleplerini tek
                panelden yönetin.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1f332b] text-white px-7 py-4 font-semibold hover:bg-[#1f5f4b] transition"
            >
              <LogOut size={18} />
              Çıkış Yap
            </button>
          </div>
        </div>
      </section>

      <section className="py-10 border-b border-[#1f332b]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <AdminStats stats={stats} loading={statsLoading} />
        </div>
      </section>

      <section className="py-14 lg:py-20 border-b border-[#1f332b]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 items-start">
          <div className="min-w-0">
            <span className="text-sm uppercase tracking-[0.3em] text-[#1f5f4b]">
              Blog Formu
            </span>

            <h2 className="mt-5 text-4xl md:text-5xl font-serif font-bold text-[#1f332b] leading-tight">
              Yeni içerik oluşturun veya mevcut yazıyı düzenleyin.
            </h2>

            <div className="mt-10">
              <BlogForm
                editingBlog={editingBlog}
                onSuccess={() => {
                  fetchBlogs();
                  fetchStats();
                  setEditingBlog(null);
                }}
                onCancel={() => setEditingBlog(null)}
              />
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center justify-between gap-6 border-b border-[#1f332b]/10 pb-6">
              <div className="flex items-center gap-4 min-w-0">
                <Newspaper className="text-[#1f5f4b] shrink-0" size={26} />

                <div className="min-w-0">
                  <h2 className="text-3xl font-serif font-bold text-[#1f332b]">
                    Yayındaki Makaleler
                  </h2>

                  <p className="mt-1 text-sm text-[#5f6f66]">
                    Toplam {blogs.length} makale
                  </p>
                </div>
              </div>
            </div>

            <div className="max-h-[760px] overflow-y-auto pr-2">
              {blogs.length > 0 ? (
                <div className="border-t border-[#1f332b]/10">
                  {blogs.map((blog, index) => (
                    <div
                      key={blog._id}
                      className="group py-6 border-b border-[#1f332b]/10"
                    >
                      <div className="grid grid-cols-[44px_1fr] gap-4 min-w-0">
                        <span className="font-serif text-2xl text-[#7a8b7f] group-hover:text-[#1f5f4b] transition">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className="min-w-0">
                          <div className="flex gap-4 min-w-0">
                            {blog.image && (
                              <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-16 h-16 rounded-2xl object-cover bg-[#d6e7dc] shrink-0"
                              />
                            )}

                            <div className="min-w-0 flex-1">
                              <h3 className="font-serif text-xl font-bold text-[#1f332b] line-clamp-2 break-words group-hover:text-[#1f5f4b] transition">
                                {blog.title}
                              </h3>

                              <p className="mt-1 text-sm text-[#7a8b7f]">
                                {blog.date}
                              </p>
                            </div>
                          </div>

                          <div className="mt-5 flex flex-wrap gap-3">
                            <button
                              onClick={() => setEditingBlog(blog)}
                              className="inline-flex items-center gap-2 text-sm text-[#1f5f4b] font-semibold hover:text-[#1f332b] transition"
                            >
                              <Edit size={15} />
                              Düzenle
                            </button>

                            <button
                              onClick={() => handleDelete(blog._id)}
                              className="inline-flex items-center gap-2 text-sm text-red-600 font-semibold hover:text-red-700 transition"
                            >
                              <Trash2 size={15} />
                              Sil
                            </button>

                            <Link
                              href={`/blog/${blog.slug}`}
                              className="inline-flex items-center gap-2 text-sm text-[#1f332b] font-semibold hover:text-[#1f5f4b] transition"
                            >
                              Görüntüle
                              <ArrowRight size={15} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-10 border-b border-[#1f332b]/10">
                  <p className="text-[#5f6f66]">Henüz makale eklenmemiş.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20 border-b border-[#1f332b]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <AdminAppointments onStatsChange={fetchStats} />
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <AdminMessages onStatsChange={fetchStats} />
        </div>
      </section>
    </div>
  );
}
