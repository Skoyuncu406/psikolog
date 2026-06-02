"use client";

import { useState } from "react";
import { MapPin, Phone, MessageCircle, Send, CheckCircle } from "lucide-react";
import AppointmentForm from "@/components/AppointmentForm";

export default function IletisimPage() {
  const captchaResult = 7 + 4;

  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const phoneNumber = "+905442030662";
  const whatsappNumber = "905442030662";

  const address = "Kavaklıdere, Ankara";
  const mapQuery = encodeURIComponent(address);

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Merhaba, psikolojik danışmanlık hizmetleri hakkında bilgi almak istiyorum.",
  )}`;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^[0-9+\s()-]{10,20}$/;
    const nameParts = form.name.trim().split(" ").filter(Boolean);

    if (!form.name.trim()) {
      setError("İsim soyisim alanı zorunludur.");
      return;
    }

    if (nameParts.length < 2) {
      setError("Lütfen isim ve soyisim girin.");
      return;
    }

    if (!form.phone.trim()) {
      setError("Telefon numarası zorunludur.");
      return;
    }

    if (!phoneRegex.test(form.phone)) {
      setError("Lütfen geçerli bir telefon numarası girin.");
      return;
    }

    if (!form.subject.trim()) {
      setError("Konu alanı zorunludur.");
      return;
    }

    if (!form.message.trim()) {
      setError("Mesaj alanı zorunludur.");
      return;
    }

    if (form.message.trim().length < 20) {
      setError("Mesajınız en az 20 karakter olmalıdır.");
      return;
    }

    if (!captchaAnswer.trim()) {
      setError("Lütfen güvenlik doğrulamasını doldurun.");
      return;
    }

    if (Number(captchaAnswer) !== captchaResult) {
      setError("Güvenlik doğrulaması hatalı.");
      return;
    }

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        setError("Mesaj gönderilirken hata oluştu.");
        return;
      }

      setSuccess(
        "Mesajınız başarıyla gönderildi. En kısa sürede dönüş yapılacaktır.",
      );

      setForm({
        name: "",
        phone: "",
        subject: "",
        message: "",
      });

      setCaptchaAnswer("");
    } catch (error) {
      console.error(error);
      setError("Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.");
    }
  };

  return (
    <div className="bg-[#f7f5ef]">
      <section className="py-10 lg:py-15">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <span className="text-[#1f5f4b] font-semibold">İletişim</span>

          <h1 className="mt-4 text-4xl md:text-6xl font-serif font-bold text-[#1f332b]">
            Randevu ve bilgi almak için bizimle iletişime geçin
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-[#5f6f66] leading-relaxed">
            Görüşme planı, terapi süreci veya online danışmanlık hakkında bilgi
            almak için formu doldurabilir ya da doğrudan bizimle iletişime
            geçebilirsiniz.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <AppointmentForm />
        </div>
      </section>

      <section className="pb-20 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start min-w-0">
          <div className="bg-white rounded-[2rem] p-5 sm:p-8 shadow-sm border border-[#ebe4d6] min-w-0">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1f332b] mb-2">
              İletişim Formu
            </h2>

            <p className="text-[#5f6f66] mb-8">
              Tüm alanları doldurduktan sonra sizinle en kısa sürede iletişime
              geçilir.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                required
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="İsim Soyisim"
                className="w-full min-w-0 px-4 py-4 rounded-2xl border border-[#d8d1bf] outline-none focus:border-[#1f5f4b] bg-[#f7f5ef]"
              />

              <input
                required
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Telefon Numarası"
                className="w-full min-w-0 px-4 py-4 rounded-2xl border border-[#d8d1bf] outline-none focus:border-[#1f5f4b] bg-[#f7f5ef]"
              />

              <input
                required
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Konu"
                className="w-full min-w-0 px-4 py-4 rounded-2xl border border-[#d8d1bf] outline-none focus:border-[#1f5f4b] bg-[#f7f5ef]"
              />

              <textarea
                required
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Mesajınız"
                rows="6"
                className="w-full min-w-0 px-4 py-4 rounded-2xl border border-[#d8d1bf] outline-none focus:border-[#1f5f4b] bg-[#f7f5ef] resize-none"
              />

              <div className="bg-[#f7f5ef] border border-[#d8d1bf] rounded-2xl p-4 sm:p-5 min-w-0">
                <label className="block mb-2 text-sm font-semibold text-[#1f332b]">
                  Güvenlik Doğrulaması
                </label>

                <p className="text-sm text-[#5f6f66] mb-3">
                  Lütfen aşağıdaki işlemin sonucunu yazın:
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 min-w-0">
                  <div className="w-full sm:w-auto px-5 py-4 rounded-2xl bg-white border border-[#d8d1bf] font-bold text-[#1f332b] text-center shrink-0">
                    7 + 4 =
                  </div>

                  <input
                    required
                    type="number"
                    value={captchaAnswer}
                    onChange={(e) => {
                      setCaptchaAnswer(e.target.value);
                      setError("");
                      setSuccess("");
                    }}
                    placeholder="Sonuç"
                    className="w-full min-w-0 sm:flex-1 px-4 py-4 rounded-2xl border border-[#d8d1bf] outline-none focus:border-[#1f5f4b] bg-white"
                  />
                </div>
              </div>

              {error && (
                <p className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm break-words">
                  {error}
                </p>
              )}

              {success && (
                <p className="bg-green-50 text-green-700 px-4 py-3 rounded-xl text-sm flex items-start gap-2 break-words">
                  <CheckCircle size={18} className="shrink-0 mt-0.5" />
                  {success}
                </p>
              )}

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#1f5f4b] text-white px-5 sm:px-7 py-4 rounded-full font-bold hover:bg-[#174637] transition"
              >
                <Send size={19} />
                Mesaj Gönder
              </button>
            </form>
          </div>

          <div className="space-y-6 min-w-0">
            <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-[#ebe4d6] min-w-0">
              <div className="rounded-[1.5rem] overflow-hidden h-[300px] sm:h-[360px] min-w-0">
                <iframe
                  title="Psikolog Merkezi Harita"
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="border-0 block w-full"
                />
              </div>
            </div>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#1f5f4b] text-white px-5 sm:px-7 py-4 rounded-full font-bold hover:bg-[#174637] transition"
            >
              <MapPin size={20} />
              Yol Tarifi Al
            </a>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
              <a
                href={`tel:${phoneNumber}`}
                className="bg-white rounded-[2rem] p-5 sm:p-6 border border-[#ebe4d6] shadow-sm hover:shadow-lg transition flex items-center gap-4 min-w-0"
              >
                <div className="w-12 h-12 bg-[#e3efe8] rounded-2xl flex items-center justify-center shrink-0">
                  <Phone className="text-[#1f5f4b]" size={24} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-[#7a8b7f]">Telefon</p>
                  <p className="font-bold text-[#1f332b] text-sm sm:text-base break-words">
                    +90 555 000 00 00
                  </p>
                </div>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-[2rem] p-5 sm:p-6 border border-[#ebe4d6] shadow-sm hover:shadow-lg transition flex items-center gap-4 min-w-0"
              >
                <div className="w-12 h-12 bg-[#e3efe8] rounded-2xl flex items-center justify-center shrink-0">
                  <MessageCircle className="text-[#1f5f4b]" size={24} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-[#7a8b7f]">WhatsApp</p>
                  <p className="font-bold text-[#1f332b] text-sm sm:text-base break-words">
                    Mesaj Gönder
                  </p>
                </div>
              </a>
            </div>

            <div className="bg-white rounded-[2rem] p-5 sm:p-6 border border-[#ebe4d6] shadow-sm min-w-0">
              <h3 className="text-xl font-serif font-bold text-[#1f332b]">
                Adres
              </h3>

              <p className="mt-3 text-[#5f6f66] leading-relaxed break-words">
                Kavaklıdere, Ankara / Türkiye
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
