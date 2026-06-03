"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Clock, Phone, Trash2 } from "lucide-react";

export default function AdminAppointments({ onStatsChange }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/appointments", {
        cache: "no-store",
      });

      const data = await res.json();
      setAppointments(data);
    } catch (error) {
      console.error("Randevular alınamadı:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
  await fetch(`/api/appointments/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  fetchAppointments();
  onStatsChange?.();
};

const deleteAppointment = async (id) => {
  const confirmDelete = confirm(
    "Bu randevuyu silmek istediğinize emin misiniz?"
  );

  if (!confirmDelete) return;

  await fetch(`/api/appointments/${id}`, {
    method: "DELETE",
  });

  fetchAppointments();
  onStatsChange?.();
};

  const getStatusClass = (status) => {
    if (status === "Onaylandı") return "bg-green-100 text-green-700";
    if (status === "İptal Edildi") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  if (loading) {
    return (
      <div className="bg-white rounded-[2rem] p-8 border border-[#ebe4d6]">
        <p className="text-[#1f5f4b] font-semibold">
          Randevular yükleniyor...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] p-5 sm:p-8 shadow-sm border border-[#ebe4d6]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-serif font-bold text-[#1f332b]">
            Randevu Takvimi
          </h2>

          <p className="text-[#5f6f66] mt-2">
            Toplam {appointments.length} randevu talebi
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {appointments.length > 0 ? (
          appointments.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl border border-[#ebe4d6] bg-[#f7f5ef] p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-[#1f332b]">{item.name}</h3>

                  <a
                    href={`tel:${item.phone}`}
                    className="mt-2 inline-flex items-center gap-2 text-sm text-[#1f5f4b] font-semibold"
                  >
                    <Phone size={15} />
                    {item.phone}
                  </a>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusClass(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <p className="flex items-center gap-2 text-[#1f332b] font-semibold">
                  <CalendarDays size={18} className="text-[#1f5f4b]" />
                  {item.appointmentDate}
                </p>

                <p className="flex items-center gap-2 text-[#1f332b] font-semibold">
                  <Clock size={18} className="text-[#1f5f4b]" />
                  {item.appointmentTime}
                </p>

                <p className="text-[#5f6f66] leading-relaxed whitespace-pre-line">
                  {item.note}
                </p>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => updateStatus(item._id, "Onaylandı")}
                  className="bg-green-600 text-white px-3 py-2 rounded-full text-sm font-semibold"
                >
                  Onayla
                </button>

                <button
                  onClick={() => updateStatus(item._id, "İptal Edildi")}
                  className="bg-red-600 text-white px-3 py-2 rounded-full text-sm font-semibold"
                >
                  İptal Et
                </button>

                <button
                  onClick={() => updateStatus(item._id, "Bekliyor")}
                  className="bg-yellow-500 text-white px-3 py-2 rounded-full text-sm font-semibold"
                >
                  Bekliyor
                </button>

                <button
                  onClick={() => deleteAppointment(item._id)}
                  className="bg-[#1f332b] text-white px-3 py-2 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-1"
                >
                  <Trash2 size={15} />
                  Sil
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="md:col-span-2 xl:col-span-3 bg-[#f7f5ef] rounded-2xl p-8 text-center">
            <p className="text-[#5f6f66]">Henüz randevu talebi yok.</p>
          </div>
        )}
      </div>
    </div>
  );
}