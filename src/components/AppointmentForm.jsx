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

  const bookedTimes = appointments
    .filter(
      (item) =>
        item.appointmentDate === form.appointmentDate &&
        item.status !== "İptal Edildi"
    )
    .map((item) => item.appointmentTime);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/appointments", {
          cache: "no-store",
        });

        const data = await res.json();
        setAppointments(data);
      } catch (error) {
        console.error("Randevular alınamadı:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "appointmentDate") {
      setForm({
        ...form,
        appointmentDate: value,
        appointmentTime: "",
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }

    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.phone ||
      !form.appointmentDate ||
      !form.appointmentTime ||
      !form.note
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

      const refreshed = await fetch("/api/appointments", {
        cache: "no-store",
      });

      const refreshedData = await refreshed.json();
      setAppointments(refreshedData);
    } catch (error) {
      setError("Sunucu hatası oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-5 sm:p-8 shadow-sm border border-[#ebe4d6] min-w-0">
      <h2 className="text-3xl font-serif font-bold text-[#1f332b]">
        Randevu Talebi Oluştur
      </h2>

      <p className="text-[#5f6f66] mt-2 mb-8">
        Uygun tarih ve saati seçerek ön randevu talebi oluşturabilirsiniz.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          required
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="İsim Soyisim"
          className="w-full px-4 py-4 rounded-2xl border border-[#d8d1bf] outline-none focus:border-[#1f5f4b] bg-[#f7f5ef]"
        />

        <input
          required
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Telefon Numarası"
          className="w-full px-4 py-4 rounded-2xl border border-[#d8d1bf] outline-none focus:border-[#1f5f4b] bg-[#f7f5ef]"
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="relative">
            <CalendarDays
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a8b7f]"
            />

            <input
              required
              type="date"
              name="appointmentDate"
              min={today}
              value={form.appointmentDate}
              onChange={handleChange}
              className="w-fit lg:w-full  pl-12 pr-4 py-4 rounded-2xl border border-[#d8d1bf] outline-none focus:border-[#1f5f4b] bg-[#f7f5ef]"
            />
          </div>

          <div className="relative">
            <Clock
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a8b7f]"
            />

            <select
              required
              name="appointmentTime"
              value={form.appointmentTime}
              onChange={handleChange}
              disabled={!form.appointmentDate}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-[#d8d1bf] outline-none focus:border-[#1f5f4b] bg-[#f7f5ef] disabled:opacity-60"
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
          <div className="bg-yellow-50 text-yellow-700 px-4 py-3 rounded-xl text-sm">
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
          className="w-full px-4 py-4 rounded-2xl border border-[#d8d1bf] outline-none focus:border-[#1f5f4b] bg-[#f7f5ef] resize-none"
        />

        {error && (
          <p className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
            {error}
          </p>
        )}

        {message && (
          <p className="bg-green-50 text-green-700 px-4 py-3 rounded-xl text-sm">
            {message}
          </p>
        )}

        <button
          disabled={loading}
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 bg-[#1f5f4b] text-white px-7 py-4 rounded-full font-bold hover:bg-[#174637] transition disabled:opacity-60"
        >
          <Send size={18} />
          {loading ? "Gönderiliyor..." : "Randevu Talebi Gönder"}
        </button>
      </form>
    </div>
  );
}