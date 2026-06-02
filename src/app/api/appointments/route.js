import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("psikologDB");

    const appointments = await db
      .collection("appointments")
      .find({})
      .sort({ appointmentDate: 1, appointmentTime: 1 })
      .toArray();

    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json(
      { message: "Randevular alınamadı", error: error.message },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (
      !body.name ||
      !body.phone ||
      !body.appointmentDate ||
      !body.appointmentTime ||
      !body.note
    ) {
      return NextResponse.json(
        { message: "Tüm alanlar zorunludur." },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("psikologDB");

    const exists = await db.collection("appointments").findOne({
      appointmentDate: body.appointmentDate,
      appointmentTime: body.appointmentTime,
      status: { $ne: "İptal Edildi" },
    });

    if (exists) {
      return NextResponse.json(
        { message: "Bu tarih ve saat için zaten randevu talebi var." },
        { status: 409 },
      );
    }

    const newAppointment = {
      name: body.name,
      phone: body.phone,
      appointmentDate: body.appointmentDate,
      appointmentTime: body.appointmentTime,
      note: body.note,
      status: "Bekliyor",
      createdAt: new Date(),
    };

    await db.collection("appointments").insertOne(newAppointment);

    return NextResponse.json(
      { message: "Randevu talebi oluşturuldu." },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Randevu oluşturulamadı", error: error.message },
      { status: 500 },
    );
  }
}
