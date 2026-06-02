"use client";

import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";
import BlogCard from "@/components/BlogCard";

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
    <div className="bg-[#f7f5ef]">
      <section className="py-10 lg:py-15 text-center">
        <div className="max-w-4xl mx-auto px-5">
          <span className="text-[#1f5f4b] font-semibold">Blog</span>

          <h1 className="mt-4 text-4xl md:text-6xl font-serif font-bold text-[#1f332b]">
            Psikoloji, terapi ve iyi oluş üzerine yazılar
          </h1>

          <p className="mt-6 text-lg text-[#5f6f66] leading-relaxed">
            Ruh sağlığı, terapi süreci, kaygı, stres ve kişisel farkındalık
            üzerine bilgilendirici içerikler.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid md:grid-cols-2 gap-8">
          {blogs.length > 0 ? (
            blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
          ) : (
            <div className="md:col-span-2 bg-white rounded-[2rem] p-10 text-center border border-[#ebe4d6]">
              <h2 className="text-2xl font-serif font-bold text-[#1f332b]">
                Henüz blog yazısı eklenmemiş
              </h2>

              <p className="mt-3 text-[#5f6f66]">
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
