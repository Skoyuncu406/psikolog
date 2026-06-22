"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Clock, Send } from "lucide-react";

export default function AppointmentForm() {
  const allTimes = [
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    appointmentDate: "",
    appointmentTime: "",
    note: "",
  });

  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const normalizeAppointments = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.appointments)) return data.appointments;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  };

  const bookedTimes = Array.isArray(appointments)
    ? appointments
        .filter(
          (item) =>
            item.appointmentDate === form.appointmentDate &&
            item.status !== "İptal Edildi"
        )
        .map((item) => item.appointmentTime)
    : [];

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
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "appointmentDate") {
      setForm((prev) => ({
        ...prev,
        appointmentDate: value,
        appointmentTime: "",
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.appointmentDate ||
      !form.appointmentTime ||
      !form.note.trim()
    ) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }

    if (bookedTimes.includes(form.appointmentTime)) {
      setError("Seçtiğiniz saat dolu. Lütfen başka bir saat seçin.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Randevu talebi oluşturulamadı.");
        return;
      }

      setMessage("Randevu talebiniz başarıyla oluşturuldu.");

      setForm({
        name: "",
        phone: "",
        appointmentDate: "",
        appointmentTime: "",
        note: "",
      });

      await fetchAppointments();
    } catch (error) {
      console.error(error);
      setError("Sunucu hatası oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full min-w-0 py-5 bg-transparent border-0 border-b border-[#1f332b]/15 outline-none focus:border-[#1f5f4b] text-[#1f332b] placeholder:text-[#7a8b7f] transition";

  return (
    <div className="border-t border-[#1f332b]/10 pt-10 min-w-0">
      <form onSubmit={handleSubmit} className="space-y-0">
        <input
          required
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="İsim Soyisim"
          className={inputClass}
        />

        <input
          required
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Telefon Numarası"
          className={inputClass}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="relative min-w-0">
            <CalendarDays
              size={19}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-[#7a8b7f]"
            />

            <input
              required
              type="date"
              name="appointmentDate"
              min={today}
              value={form.appointmentDate}
              onChange={handleChange}
              className="w-full min-w-0 pl-8 py-5 bg-transparent border-0 border-b border-[#1f332b]/15 outline-none focus:border-[#1f5f4b] text-[#1f332b] transition"
            />
          </div>

          <div className="relative min-w-0">
            <Clock
              size={19}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-[#7a8b7f]"
            />

            <select
              required
              name="appointmentTime"
              value={form.appointmentTime}
              onChange={handleChange}
              disabled={!form.appointmentDate}
              className="w-full min-w-0 pl-8 py-5 bg-transparent border-0 border-b border-[#1f332b]/15 outline-none focus:border-[#1f5f4b] text-[#1f332b] disabled:opacity-60 transition"
            >
              <option value="">
                {form.appointmentDate ? "Saat Seçin" : "Önce tarih seçin"}
              </option>

              {allTimes.map((time) => {
                const isBooked = bookedTimes.includes(time);

                return (
                  <option key={time} value={time} disabled={isBooked}>
                    {isBooked ? `${time} - Dolu` : time}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {form.appointmentDate && bookedTimes.length > 0 && (
          <div className="mt-6 bg-yellow-50 text-yellow-700 px-4 py-3 rounded-xl text-sm">
            Bu tarihte dolu saatler: {bookedTimes.join(", ")}
          </div>
        )}

        <textarea
          required
          name="note"
          value={form.note}
          onChange={handleChange}
          placeholder="Kısaca görüşme sebebinizi yazın"
          rows="5"
          className={`${inputClass} resize-none`}
        />

        {error && (
          <p className="mt-6 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
            {error}
          </p>
        )}

        {message && (
          <p className="mt-6 bg-green-50 text-green-700 px-4 py-3 rounded-xl text-sm">
            {message}
          </p>
        )}

        <button
          disabled={loading}
          type="submit"
          className="mt-8 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#1f332b] text-white px-8 py-4 font-bold hover:bg-[#1f5f4b] transition disabled:opacity-60"
        >
          <Send size={18} />
          {loading ? "Gönderiliyor..." : "Randevu Talebi Gönder"}
        </button>
      </form>
    </div>
  );
}