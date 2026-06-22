"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle,
  Clock,
  Phone,
  RotateCcw,
  Trash2,
  XCircle,
} from "lucide-react";

export default function AdminAppointments({ onStatsChange }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const normalizeAppointments = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.appointments)) return data.appointments;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  };

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/appointments", {
        cache: "no-store",
      });

      const data = await res.json();
      setAppointments(normalizeAppointments(data));
    } catch (error) {
      console.error("Randevular alınamadı:", error);
      setAppointments([]);
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
    if (status === "Onaylandı") {
      return "bg-green-50 text-green-700 border-green-200";
    }

    if (status === "İptal Edildi") {
      return "bg-red-50 text-red-700 border-red-200";
    }

    return "bg-yellow-50 text-yellow-700 border-yellow-200";
  };

  if (loading) {
    return (
      <div className="border-t border-[#1f332b]/10 pt-8">
        <p className="text-[#1f5f4b] font-semibold">
          Randevular yükleniyor...
        </p>
      </div>
    );
  }

  return (
    <div className="min-w-0">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
        <div>
          <span className="text-sm uppercase tracking-[0.3em] text-[#1f5f4b]">
            Randevu Talepleri
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-serif font-bold text-[#1f332b] leading-tight">
            Görüşme takvimi ve talepler.
          </h2>

          <p className="mt-4 text-[#5f6f66] text-lg leading-relaxed">
            Toplam {appointments.length} randevu talebi bulunuyor.
          </p>
        </div>
      </div>

      {appointments.length > 0 ? (
        <div className="border-t border-[#1f332b]/10">
          {appointments.map((item, index) => (
            <div
              key={item._id}
              className="group grid grid-cols-1 xl:grid-cols-[80px_1.1fr_0.9fr_1.1fr_auto] gap-6 items-start py-8 border-b border-[#1f332b]/10"
            >
              <span className="font-serif text-3xl text-[#7a8b7f] group-hover:text-[#1f5f4b] transition">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <h3 className="text-2xl font-serif font-bold text-[#1f332b] break-words group-hover:text-[#1f5f4b] transition">
                  {item.name}
                </h3>

                <a
                  href={`tel:${item.phone}`}
                  className="mt-3 inline-flex items-center gap-2 text-sm text-[#1f5f4b] font-semibold break-all"
                >
                  <Phone size={15} />
                  {item.phone}
                </a>
              </div>

              <div className="space-y-3">
                <p className="flex items-center gap-2 text-[#1f332b] font-semibold">
                  <CalendarDays size={18} className="text-[#1f5f4b]" />
                  {item.appointmentDate}
                </p>

                <p className="flex items-center gap-2 text-[#1f332b] font-semibold">
                  <Clock size={18} className="text-[#1f5f4b]" />
                  {item.appointmentTime}
                </p>

                <span
                  className={`inline-flex border text-xs px-3 py-1 rounded-full font-semibold ${getStatusClass(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>

              <p className="text-[#5f6f66] leading-relaxed whitespace-pre-line break-words">
                {item.note}
              </p>

              <div className="flex xl:flex-col flex-wrap gap-3 xl:items-start">
                <button
                  onClick={() => updateStatus(item._id, "Onaylandı")}
                  className="inline-flex items-center gap-2 text-sm text-green-700 font-semibold hover:text-green-900 transition"
                >
                  <CheckCircle size={15} />
                  Onayla
                </button>

                <button
                  onClick={() => updateStatus(item._id, "İptal Edildi")}
                  className="inline-flex items-center gap-2 text-sm text-red-600 font-semibold hover:text-red-800 transition"
                >
                  <XCircle size={15} />
                  İptal Et
                </button>

                <button
                  onClick={() => updateStatus(item._id, "Bekliyor")}
                  className="inline-flex items-center gap-2 text-sm text-yellow-700 font-semibold hover:text-yellow-900 transition"
                >
                  <RotateCcw size={15} />
                  Bekliyor
                </button>

                <button
                  onClick={() => deleteAppointment(item._id)}
                  className="inline-flex items-center gap-2 text-sm text-[#1f332b] font-semibold hover:text-red-600 transition"
                >
                  <Trash2 size={15} />
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-10 border-y border-[#1f332b]/10">
          <p className="text-[#5f6f66]">Henüz randevu talebi yok.</p>
        </div>
      )}
    </div>
  );
}