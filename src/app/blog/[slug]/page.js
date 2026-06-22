"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Leaf } from "lucide-react";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch("/api/blogs", {
          cache: "no-store",
        });

        const data = await res.json();
        const foundBlog = data.find((item) => item.slug === slug);

        setBlog(foundBlog);
      } catch (error) {
        console.error("Makale alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-[#f7f5ef] flex items-center justify-center px-5">
        <div className="text-center animate-pulse">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#e3efe8] flex items-center justify-center">
            <Leaf size={40} className="text-[#1f5f4b]" />
          </div>

          <h2 className="mt-6 text-3xl font-serif font-bold text-[#1f332b]">
            Makale Yükleniyor
          </h2>

          <p className="mt-3 text-[#7a8b7f]">İçerik hazırlanıyor...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-[70vh] bg-[#f7f5ef] flex items-center justify-center px-5">
        <div className="max-w-2xl text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#e3efe8] flex items-center justify-center">
            <Leaf size={38} className="text-[#1f5f4b]" />
          </div>

          <h1 className="mt-8 text-4xl md:text-5xl font-serif font-bold text-[#1f332b]">
            Makale bulunamadı.
          </h1>

          <p className="mt-4 text-[#5f6f66] leading-relaxed">
            Aradığınız yazı kaldırılmış ya da bağlantı değişmiş olabilir.
          </p>

          <Link
            href="/blog"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1f332b] text-white px-7 py-4 font-semibold hover:bg-[#1f5f4b] transition"
          >
            <ArrowLeft size={18} />
            Blog Sayfasına Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-[#f7f5ef] overflow-x-hidden">
      <section className="relative py-20 lg:py-28 border-b border-[#1f332b]/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#d6e7dc,transparent_32%)]" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-5 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#1f5f4b] font-semibold mb-10"
          >
            <ArrowLeft size={18} />
            Bloga Dön
          </Link>

          <div className="flex items-center gap-2 text-sm text-[#7a8b7f]">
            <CalendarDays size={16} />
            <span>{blog.date}</span>
          </div>

          <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#1f332b] leading-[1.04] tracking-tight">
            {blog.title}
          </h1>

          <p className="mt-8 max-w-3xl text-xl text-[#5f6f66] leading-relaxed">
            {blog.excerpt}
          </p>
        </div>
      </section>

      {blog.image && (
        <section className="py-14 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-5 lg:px-8">
            <div className="aspect-[16/9] rounded-[2.5rem] overflow-hidden border border-[#1f332b]/10 bg-[#e3efe8]">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      <section className={blog.image ? "pb-20 lg:pb-28" : "py-20 lg:py-28"}>
        <div className="max-w-3xl mx-auto px-4 sm:px-5 lg:px-8">
          <div className="border-t border-[#1f332b]/10 pt-10">
            <p className="text-lg sm:text-xl text-[#37483f] leading-9 whitespace-pre-line">
              {blog.content}
            </p>
          </div>

          <div className="mt-16 pt-10 border-t border-[#1f332b]/10">
            <span className="text-sm uppercase tracking-[0.3em] text-[#1f5f4b]">
              Destek Alın
            </span>

            <h2 className="mt-5 text-3xl md:text-4xl font-serif font-bold text-[#1f332b] leading-tight">
              Bu konu hakkında profesyonel destek almak ister misiniz?
            </h2>

            <p className="mt-5 text-[#5f6f66] leading-relaxed">
              Randevu ve detaylı bilgi için iletişim sayfasından bize
              ulaşabilirsiniz.
            </p>

            <Link
              href="/iletisim"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1f332b] text-white px-7 py-4 font-semibold hover:bg-[#1f5f4b] transition"
            >
              Randevu Al
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
