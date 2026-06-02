"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await fetch("/api/blogs", {
        cache: "no-store",
      });

      const data = await res.json();
      const foundBlog = data.find((item) => item.slug === slug);

      setBlog(foundBlog);
      setLoading(false);
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-[#f7f5ef] flex items-center justify-center">
        <p className="text-[#1f5f4b] font-semibold">Makale yükleniyor...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-[70vh] bg-[#f7f5ef] flex items-center justify-center px-5">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-[#1f332b]">
            Makale bulunamadı
          </h1>

          <Link
            href="/blog"
            className="mt-6 inline-flex items-center gap-2 text-[#1f5f4b] font-semibold"
          >
            <ArrowLeft size={18} />
            Blog sayfasına dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-[#f7f5ef]">
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-5">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#1f5f4b] font-semibold mb-8"
          >
            <ArrowLeft size={18} />
            Bloga Dön
          </Link>

          <div className="flex items-center gap-2 text-sm text-[#7a8b7f] mb-5">
            <CalendarDays size={16} />
            {blog.date}
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#1f332b] leading-tight">
            {blog.title}
          </h1>

          <p className="mt-6 text-xl text-[#5f6f66] leading-relaxed">
            {blog.excerpt}
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-5">
          {blog.image && (
            <div className="rounded-[2rem] overflow-hidden bg-white shadow-sm">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-[420px] object-cover"
              />
            </div>
          )}

          <div className="mt-10 bg-white rounded-[2rem] p-8 md:p-12 shadow-sm">
            <p className="text-lg text-[#5f6f66] leading-9 whitespace-pre-line">
              {blog.content}
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
