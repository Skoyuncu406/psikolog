"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle,
  Mail,
  Phone,
  Trash2,
  Circle,
} from "lucide-react";

export default function AdminMessages({ onStatsChange }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const normalizeMessages = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.messages)) return data.messages;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages", {
        cache: "no-store",
      });

      const data = await res.json();
      setMessages(normalizeMessages(data));
    } catch (error) {
      console.error("Mesajlar alınamadı:", error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id) => {
    await fetch(`/api/messages/${id}`, {
      method: "PATCH",
    });

    fetchMessages();
    onStatsChange?.();
  };

  const deleteMessage = async (id) => {
    const confirmDelete = confirm("Bu mesajı silmek istediğinize emin misiniz?");

    if (!confirmDelete) return;

    await fetch(`/api/messages/${id}`, {
      method: "DELETE",
    });

    fetchMessages();
    onStatsChange?.();
  };

  const getStatusClass = (isRead) => {
    if (isRead) {
      return "bg-green-50 text-green-700 border-green-200";
    }

    return "bg-yellow-50 text-yellow-700 border-yellow-200";
  };

  if (loading) {
    return (
      <div className="border-t border-[#1f332b]/10 pt-8">
        <p className="text-[#1f5f4b] font-semibold">Mesajlar yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-w-0">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
        <div>
          <span className="text-sm uppercase tracking-[0.3em] text-[#1f5f4b]">
            Mesaj Yönetimi
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-serif font-bold text-[#1f332b] leading-tight">
            İletişim formundan gelen talepler.
          </h2>

          <p className="mt-4 text-[#5f6f66] text-lg leading-relaxed">
            Toplam {messages.length} mesaj bulunuyor.
          </p>
        </div>
      </div>

      {messages.length > 0 ? (
        <div className="border-t border-[#1f332b]/10">
          {messages.map((item, index) => (
            <div
              key={item._id}
              className="group grid grid-cols-1 xl:grid-cols-[80px_1fr_0.8fr_1.3fr_auto] gap-6 items-start py-8 border-b border-[#1f332b]/10"
            >
              <span className="font-serif text-3xl text-[#7a8b7f] group-hover:text-[#1f5f4b] transition">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <div className="flex items-start gap-3">
                  {item.isRead ? (
                    <CheckCircle
                      size={20}
                      className="text-green-600 shrink-0 mt-1"
                    />
                  ) : (
                    <Circle
                      size={20}
                      className="text-yellow-600 shrink-0 mt-1"
                    />
                  )}

                  <div className="min-w-0">
                    <h3 className="text-2xl font-serif font-bold text-[#1f332b] break-words group-hover:text-[#1f5f4b] transition">
                      {item.name}
                    </h3>

                    <p className="mt-2 text-sm text-[#7a8b7f]">
                      {item.date}
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:${item.phone}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm text-[#1f5f4b] font-semibold break-all"
                >
                  <Phone size={15} />
                  {item.phone}
                </a>
              </div>

              <div className="space-y-3">
                <span
                  className={`inline-flex border text-xs px-3 py-1 rounded-full font-semibold ${getStatusClass(
                    item.isRead
                  )}`}
                >
                  {item.isRead ? "Okundu" : "Yeni Mesaj"}
                </span>

                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#7a8b7f]">
                    Konu
                  </p>

                  <p className="mt-2 font-semibold text-[#1f332b] break-words">
                    {item.subject}
                  </p>
                </div>
              </div>

              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.25em] text-[#7a8b7f]">
                  Mesaj
                </p>

                <p className="mt-3 text-[#5f6f66] leading-relaxed whitespace-pre-line break-words">
                  {item.message}
                </p>
              </div>

              <div className="flex xl:flex-col flex-wrap gap-3 xl:items-start">
                {!item.isRead && (
                  <button
                    onClick={() => markAsRead(item._id)}
                    className="inline-flex items-center gap-2 text-sm text-[#1f5f4b] font-semibold hover:text-[#1f332b] transition"
                  >
                    <CheckCircle size={15} />
                    Okundu Yap
                  </button>
                )}

                <button
                  onClick={() => deleteMessage(item._id)}
                  className="inline-flex items-center gap-2 text-sm text-red-600 font-semibold hover:text-red-800 transition"
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
          <p className="text-[#5f6f66]">Henüz mesaj yok.</p>
        </div>
      )}
    </div>
  );
}