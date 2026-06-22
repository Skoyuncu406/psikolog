"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, Leaf } from "lucide-react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs", {
          cache: "no-store",
        });

        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error("Bloglar alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-[#f7f5ef] flex items-center justify-center px-5">
        <div className="text-center animate-pulse">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#e3efe8] flex items-center justify-center">
            <Leaf size={40} className="text-[#1f5f4b]" />
          </div>

          <h2 className="mt-6 text-3xl font-serif font-bold text-[#1f332b]">
            Blog Yazıları Yükleniyor
          </h2>

          <p className="mt-3 text-[#7a8b7f]">İçerikler hazırlanıyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f5ef] overflow-x-hidden">
      <section className="relative py-24 lg:py-32 border-b border-[#1f332b]/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#d6e7dc,transparent_32%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <span className="text-sm uppercase tracking-[0.35em] text-[#1f5f4b]">
            Blog
          </span>

          <div className="mt-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-end">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#1f332b] leading-[1.04] tracking-tight">
              Psikoloji, terapi ve iyi oluş üzerine yazılar.
            </h1>

            <p className="text-lg sm:text-xl text-[#5f6f66] leading-relaxed lg:pb-3">
              Ruh sağlığı, terapi süreci, kaygı, stres ve kişisel farkındalık
              üzerine hazırlanan bilgilendirici içerikler.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          {blogs.length > 0 ? (
            <div className="border-t border-[#1f332b]/10">
              {blogs.map((blog, index) => (
                <article
                  key={blog._id}
                  className="group grid lg:grid-cols-[110px_1fr_1.25fr_auto] gap-6 items-start lg:items-center py-10 border-b border-[#1f332b]/10"
                >
                  <span className="font-serif text-4xl text-[#7a8b7f] group-hover:text-[#1f5f4b] transition">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {blog.image ? (
                    <div className="aspect-[4/3] w-full max-w-[260px] rounded-[2rem] overflow-hidden border border-[#1f332b]/10 bg-[#e3efe8]">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] w-full max-w-[260px] rounded-[2rem] border border-[#1f332b]/10 bg-[#e3efe8] flex items-center justify-center">
                      <Leaf size={34} className="text-[#1f5f4b]" />
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-sm text-[#7a8b7f]">
                      <CalendarDays size={16} />
                      <span>{blog.date}</span>
                    </div>

                    <h2 className="mt-4 text-3xl md:text-4xl font-serif font-bold text-[#1f332b] group-hover:text-[#1f5f4b] transition leading-tight">
                      {blog.title}
                    </h2>

                    <p className="mt-5 text-[#5f6f66] text-lg leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>

                  <Link
                    href={`/blog/${blog.slug}`}
                    className="w-12 h-12 rounded-full border border-[#1f332b]/15 flex items-center justify-center text-[#1f332b] group-hover:bg-[#1f332b] group-hover:text-white transition"
                    aria-label={`${blog.title} yazısını oku`}
                  >
                    <ArrowRight size={18} />
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="py-20 border-y border-[#1f332b]/10 text-center">
              <Leaf size={44} className="mx-auto text-[#1f5f4b]" />

              <h2 className="mt-6 text-4xl font-serif font-bold text-[#1f332b]">
                Henüz blog yazısı eklenmemiş.
              </h2>

              <p className="mt-4 text-[#5f6f66] text-lg">
                Yakında psikoloji ve terapi üzerine yeni içerikler burada yer
                alacak.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
