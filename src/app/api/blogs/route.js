import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

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

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("psikologDB");

    const blogs = await db
      .collection("blogs")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(
      { message: "Bloglar alınamadı", error: error.message },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.title || !body.excerpt || !body.content) {
      return NextResponse.json(
        { message: "Başlık, kısa açıklama ve içerik zorunludur." },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("psikologDB");

    const newBlog = {
      title: body.title,
      slug: createSlug(body.title),
      excerpt: body.excerpt,
      content: body.content,
      image: body.image || "",
      date: new Date().toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      createdAt: new Date(),
    };

    await db.collection("blogs").insertOne(newBlog);

    return NextResponse.json(
      { message: "Makale başarıyla eklendi", blog: newBlog },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Makale eklenemedi", error: error.message },
      { status: 500 },
    );
  }
}
