"use client";

import { create } from "zustand";
import { initialBlogs } from "@/data/initialBlogs";

const createSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

export const useBlogStore = create((set) => ({
  blogs: initialBlogs,

  addBlog: (blog) =>
    set((state) => ({
      blogs: [
        {
          id: Date.now(),
          title: blog.title,
          slug: createSlug(blog.title),
          excerpt: blog.excerpt,
          content: blog.content,
          image: blog.image,
          date: new Date().toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
        },
        ...state.blogs,
      ],
    })),
}));
