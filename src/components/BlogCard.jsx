import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

export default function BlogCard({ blog }) {
  return (
    <article className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-[#ebe4d6] hover:shadow-xl transition">
      <div className="h-60 bg-[#d6e7dc] overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
        />
      </div>

      <div className="p-7">
        <div className="flex items-center gap-2 text-sm text-[#7a8b7f] mb-4">
          <CalendarDays size={16} />
          {blog.date}
        </div>

        <h2 className="text-2xl font-serif font-bold text-[#1f332b]">
          {blog.title}
        </h2>

        <p className="mt-4 text-[#5f6f66] leading-relaxed">{blog.excerpt}</p>

        <Link
          href={`/blog/${blog.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-[#1f5f4b] font-semibold"
        >
          Devamını Oku
          <ArrowRight size={18} />
        </Link>
      </div>
    </article>
  );
}