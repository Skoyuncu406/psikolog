import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("psikologDB");

    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    const totalBlogs = await db.collection("blogs").countDocuments();

    const totalMessages = await db.collection("messages").countDocuments();

    const unreadMessages = await db.collection("messages").countDocuments({
      isRead: false,
    });

    const pendingAppointments = await db
      .collection("appointments")
      .countDocuments({
        status: "Bekliyor",
      });

    const todayAppointments = await db
      .collection("appointments")
      .countDocuments({
        appointmentDate: todayString,
        status: { $ne: "İptal Edildi" },
      });

    return NextResponse.json({
      totalBlogs,
      totalMessages,
      unreadMessages,
      pendingAppointments,
      todayAppointments,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "İstatistikler alınamadı",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
