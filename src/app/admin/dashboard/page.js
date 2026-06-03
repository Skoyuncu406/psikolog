"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, LogOut, Newspaper, Trash2 } from "lucide-react";

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
      setBlogs(data);
    } catch (error) {
      console.error("Bloglar alınamadı:", error);
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
        <div className="bg-white rounded-[2rem] p-8 text-center shadow-sm border border-[#ebe4d6]">
          <h1 className="text-3xl font-serif font-bold text-[#1f332b]">
            Yetkisiz Giriş
          </h1>

          <Link
            href="/admin"
            className="mt-6 inline-flex bg-[#1f5f4b] text-white px-6 py-3 rounded-full font-semibold"
          >
            Admin Girişine Git
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f5ef] min-h-screen py-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
          <div>
            <span className="text-[#1f5f4b] font-semibold">Admin Paneli</span>

            <h1 className="mt-2 text-4xl md:text-5xl font-serif font-bold text-[#1f332b]">
              Blog Yönetimi
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 bg-[#1f332b] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#111f19] transition"
          >
            <LogOut size={18} />
            Çıkış Yap
          </button>
        </div>

        <AdminStats stats={stats} loading={statsLoading} />

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          <BlogForm
            editingBlog={editingBlog}
            onSuccess={() => {
              fetchBlogs();
              fetchStats();
              setEditingBlog(null);
            }}
            onCancel={() => setEditingBlog(null)}
          />

          <div className="bg-white rounded-[2rem] p-5 sm:p-8 shadow-sm border border-[#ebe4d6] min-w-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#e3efe8] rounded-2xl flex items-center justify-center shrink-0">
                <Newspaper className="text-[#1f5f4b]" size={24} />
              </div>

              <div className="min-w-0">
                <h2 className="text-2xl font-serif font-bold text-[#1f332b]">
                  Yayındaki Makaleler
                </h2>
                <p className="text-sm text-[#5f6f66]">
                  Toplam {blogs.length} makale
                </p>
              </div>
            </div>

            <div className="space-y-4 max-h-[720px] overflow-y-auto pr-2">
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="border border-[#ebe4d6] rounded-2xl p-4 bg-[#f7f5ef]"
                  >
                    <div className="flex gap-4 min-w-0">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-20 h-20 rounded-xl object-cover bg-[#d6e7dc] shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[#1f332b] line-clamp-2 break-words">
                          {blog.title}
                        </h3>

                        <p className="text-sm text-[#7a8b7f] mt-1">
                          {blog.date}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-3">
                          <button
                            onClick={() => setEditingBlog(blog)}
                            className="inline-flex items-center gap-1 text-sm bg-[#1f5f4b] text-white px-3 py-2 rounded-full"
                          >
                            <Edit size={14} />
                            Düzenle
                          </button>

                          <button
                            onClick={() => handleDelete(blog._id)}
                            className="inline-flex items-center gap-1 text-sm bg-red-600 text-white px-3 py-2 rounded-full"
                          >
                            <Trash2 size={14} />
                            Sil
                          </button>

                          <Link
                            href={`/blog/${blog.slug}`}
                            className="inline-flex items-center gap-1 text-sm bg-white text-[#1f5f4b] px-3 py-2 rounded-full"
                          >
                            Görüntüle
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[#5f6f66]">Henüz makale eklenmemiş.</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <AdminAppointments onStatsChange={fetchStats} />
        </div>

        <div className="mt-8">
          <AdminMessages onStatsChange={fetchStats} />
        </div>
      </div>
    </div>
  );
}
