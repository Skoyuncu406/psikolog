import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { sendContactMail } from "@/lib/mail";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("psikologDB");

    const messages = await db
      .collection("messages")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(
      { message: "Mesajlar alınamadı", error: error.message },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.name || !body.phone || !body.subject || !body.message) {
      return NextResponse.json(
        { message: "Tüm alanlar zorunludur." },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("psikologDB");

    const newMessage = {
      name: body.name,
      phone: body.phone,
      subject: body.subject,
      message: body.message,
      isRead: false,
      createdAt: new Date(),
      date: new Date().toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    await db.collection("messages").insertOne(newMessage);

    try {
      await sendContactMail({
        name: body.name,
        phone: body.phone,
        subject: body.subject,
        message: body.message,
      });
    } catch (mailError) {
      console.error("Mail gönderilemedi:", mailError);
    }

    return NextResponse.json(
      { message: "Mesaj başarıyla kaydedildi" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Mesaj kaydedilemedi", error: error.message },
      { status: 500 },
    );
  }
}
