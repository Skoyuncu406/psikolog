import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const client = await clientPromise;
    const db = client.db("psikologDB");

    await db.collection("messages").deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({ message: "Mesaj silindi" });
  } catch (error) {
    return NextResponse.json(
      { message: "Mesaj silinemedi", error: error.message },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;

    const client = await clientPromise;
    const db = client.db("psikologDB");

    await db.collection("messages").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          isRead: true,
          updatedAt: new Date(),
        },
      },
    );

    return NextResponse.json({ message: "Mesaj okundu olarak işaretlendi" });
  } catch (error) {
    return NextResponse.json(
      { message: "Mesaj güncellenemedi", error: error.message },
      { status: 500 },
    );
  }
}
