import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const client = await clientPromise;
    const db = client.db("psikologDB");

    await db.collection("appointments").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: body.status,
          updatedAt: new Date(),
        },
      },
    );

    return NextResponse.json({ message: "Randevu güncellendi." });
  } catch (error) {
    return NextResponse.json(
      { message: "Randevu güncellenemedi", error: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const client = await clientPromise;
    const db = client.db("psikologDB");

    await db.collection("appointments").deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({ message: "Randevu silindi." });
  } catch (error) {
    return NextResponse.json(
      { message: "Randevu silinemedi", error: error.message },
      { status: 500 },
    );
  }
}
