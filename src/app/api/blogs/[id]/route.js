import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
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

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const client = await clientPromise;
    const db = client.db("psikologDB");

    await db.collection("blogs").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: body.title,
          slug: createSlug(body.title),
          excerpt: body.excerpt,
          content: body.content,
          image: body.image,
          updatedAt: new Date(),
        },
      },
    );

    return NextResponse.json({ message: "Makale güncellendi" });
  } catch (error) {
    return NextResponse.json(
      { message: "Makale güncellenemedi", error: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const client = await clientPromise;
    const db = client.db("psikologDB");

    await db.collection("blogs").deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({ message: "Makale silindi" });
  } catch (error) {
    return NextResponse.json(
      { message: "Makale silinemedi", error: error.message },
      { status: 500 },
    );
  }
}
