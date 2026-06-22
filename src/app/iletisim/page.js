"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  MessageCircle,
  Send,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";
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

  const inputClass =
    "w-full min-w-0 py-5 bg-transparent border-0 border-b border-[#1f332b]/15 outline-none focus:border-[#1f5f4b] text-[#1f332b] placeholder:text-[#7a8b7f] transition";

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
    <div className="bg-[#f7f5ef] overflow-x-hidden">
      <section className="relative py-24 lg:py-32 border-b border-[#1f332b]/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#d6e7dc,transparent_32%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <span className="text-sm uppercase tracking-[0.35em] text-[#1f5f4b]">
            İletişim
          </span>

          <div className="mt-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-end">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#1f332b] leading-[1.04] tracking-tight">
              Randevu ve bilgi almak için bizimle iletişime geçin.
            </h1>

            <p className="text-lg sm:text-xl text-[#5f6f66] leading-relaxed lg:pb-3">
              Görüşme planı, terapi süreci veya online danışmanlık hakkında
              bilgi almak için formu doldurabilir ya da doğrudan bizimle
              iletişime geçebilirsiniz.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 border-b border-[#1f332b]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-16 items-start min-w-0">
          <div className="min-w-0">
            <span className="text-sm uppercase tracking-[0.3em] text-[#1f5f4b]">
              Mesaj Gönder
            </span>

            <h2 className="mt-6 text-4xl md:text-5xl font-serif font-bold text-[#1f332b] leading-tight">
              Size en kısa sürede dönüş yapalım.
            </h2>

            <p className="mt-6 text-[#5f6f66] text-lg leading-relaxed">
              Tüm alanları doldurduktan sonra mesajınız güvenli şekilde bize
              iletilir.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-12 border-t border-[#1f332b]/10"
            >
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

              <input
                required
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Konu"
                className={inputClass}
              />

              <textarea
                required
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Mesajınız"
                rows="6"
                className={`${inputClass} resize-none`}
              />

              <div className="py-6 border-b border-[#1f332b]/10 min-w-0">
                <div className="flex items-start gap-4">
                  <ShieldCheck
                    size={22}
                    className="text-[#1f5f4b] shrink-0 mt-1"
                  />

                  <div className="min-w-0 flex-1">
                    <label className="block text-sm font-semibold text-[#1f332b]">
                      Güvenlik Doğrulaması
                    </label>

                    <p className="mt-2 text-sm text-[#5f6f66]">
                      Lütfen aşağıdaki işlemin sonucunu yazın:
                    </p>

                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4 min-w-0">
                      <div className="w-full sm:w-auto px-5 py-4 rounded-full bg-[#e3efe8] font-bold text-[#1f332b] text-center shrink-0">
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
                        className="w-full min-w-0 sm:flex-1 px-0 py-4 bg-transparent border-0 border-b border-[#1f332b]/15 outline-none focus:border-[#1f5f4b]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <p className="mt-6 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm break-words">
                  {error}
                </p>
              )}

              {success && (
                <p className="mt-6 bg-green-50 text-green-700 px-4 py-3 rounded-xl text-sm flex items-start gap-2 break-words">
                  <CheckCircle size={18} className="shrink-0 mt-0.5" />
                  {success}
                </p>
              )}

              <button
                type="submit"
                className="mt-8 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#1f332b] text-white px-8 py-4 font-bold hover:bg-[#1f5f4b] transition"
              >
                <Send size={19} />
                Mesaj Gönder
              </button>
            </form>
          </div>

          <div className="min-w-0 lg:sticky lg:top-28">
            <div className="border-t border-[#1f332b]/10">
              <a
                href={`tel:${phoneNumber}`}
                className="group flex items-center justify-between gap-6 py-7 border-b border-[#1f332b]/10"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <Phone size={24} className="text-[#1f5f4b] shrink-0" />

                  <div className="min-w-0">
                    <p className="text-sm uppercase tracking-[0.25em] text-[#7a8b7f]">
                      Telefon
                    </p>
                    <p className="mt-2 text-xl font-serif font-bold text-[#1f332b] break-words">
                      {phoneNumber}
                    </p>
                  </div>
                </div>

                <span className="w-10 h-10 rounded-full border border-[#1f332b]/15 flex items-center justify-center group-hover:bg-[#1f332b] group-hover:text-white transition shrink-0">
                  <Phone size={17} />
                </span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-6 py-7 border-b border-[#1f332b]/10"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <MessageCircle
                    size={24}
                    className="text-[#1f5f4b] shrink-0"
                  />

                  <div className="min-w-0">
                    <p className="text-sm uppercase tracking-[0.25em] text-[#7a8b7f]">
                      WhatsApp
                    </p>
                    <p className="mt-2 text-xl font-serif font-bold text-[#1f332b]">
                      Mesaj Gönder
                    </p>
                  </div>
                </div>

                <span className="w-10 h-10 rounded-full border border-[#1f332b]/15 flex items-center justify-center group-hover:bg-[#1f332b] group-hover:text-white transition shrink-0">
                  <MessageCircle size={17} />
                </span>
              </a>

              <div className="py-7 border-b border-[#1f332b]/10">
                <div className="flex items-start gap-4">
                  <MapPin size={24} className="text-[#1f5f4b] shrink-0 mt-1" />

                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-[#7a8b7f]">
                      Adres
                    </p>
                    <p className="mt-2 text-xl font-serif font-bold text-[#1f332b]">
                      Kavaklıdere, Ankara / Türkiye
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 aspect-[16/11] overflow-hidden rounded-[2.5rem] border border-[#1f332b]/10 bg-[#e3efe8]">
              <iframe
                title="Psikolog Merkezi Harita"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0 block w-full h-full"
              />
            </div>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#1f332b] text-white px-8 py-4 font-bold hover:bg-[#1f5f4b] transition"
            >
              <MapPin size={20} />
              Yol Tarifi Al
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <span className="text-sm uppercase tracking-[0.3em] text-[#1f5f4b]">
              Online Randevu
            </span>

            <h2 className="mt-6 text-4xl md:text-5xl font-serif font-bold text-[#1f332b] leading-tight">
              Uygun tarih ve saat için randevu talebi oluşturun.
            </h2>

            <p className="mt-6 text-[#5f6f66] text-lg leading-relaxed">
              Seçtiğiniz tarih ve saat doluysa sistem otomatik olarak uygun
              olmayan saatleri gizler.
            </p>
          </div>

          <AppointmentForm />
        </div>
      </section>
    </div>
  );
}
