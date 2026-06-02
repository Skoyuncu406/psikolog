"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Mail, Phone, Trash2 } from "lucide-react";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages", {
        cache: "no-store",
      });

      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("Mesajlar alınamadı:", error);
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
  };

  const deleteMessage = async (id) => {
    const confirmDelete = confirm("Bu mesajı silmek istediğinize emin misiniz?");

    if (!confirmDelete) return;

    await fetch(`/api/messages/${id}`, {
      method: "DELETE",
    });

    fetchMessages();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-[2rem] p-8 border border-[#ebe4d6]">
        <p className="text-[#1f5f4b] font-semibold">Mesajlar yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#ebe4d6]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-[#e3efe8] rounded-2xl flex items-center justify-center">
          <Mail className="text-[#1f5f4b]" size={24} />
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-[#1f332b]">
            Gelen Mesajlar
          </h2>
          <p className="text-sm text-[#5f6f66]">
            Toplam {messages.length} mesaj
          </p>
        </div>
      </div>

      <div className="space-y-4 max-h-[720px] overflow-y-auto pr-2">
        {messages.length > 0 ? (
          messages.map((item) => (
            <div
              key={item._id}
              className={`rounded-2xl p-5 border ${
                item.isRead
                  ? "bg-[#f7f5ef] border-[#ebe4d6]"
                  : "bg-[#e3efe8] border-[#1f5f4b]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-[#1f332b]">{item.name}</h3>

                  <a
                    href={`tel:${item.phone}`}
                    className="mt-1 inline-flex items-center gap-2 text-sm text-[#1f5f4b] font-semibold"
                  >
                    <Phone size={15} />
                    {item.phone}
                  </a>

                  <p className="mt-3 text-sm text-[#7a8b7f]">{item.date}</p>
                </div>

                {!item.isRead && (
                  <span className="bg-[#1f5f4b] text-white text-xs px-3 py-1 rounded-full">
                    Yeni
                  </span>
                )}
              </div>

              <div className="mt-4">
                <p className="font-semibold text-[#1f332b]">{item.subject}</p>

                <p className="mt-2 text-[#5f6f66] leading-relaxed whitespace-pre-line">
                  {item.message}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                {!item.isRead && (
                  <button
                    onClick={() => markAsRead(item._id)}
                    className="inline-flex items-center gap-1 text-sm bg-[#1f5f4b] text-white px-3 py-2 rounded-full"
                  >
                    <CheckCircle size={15} />
                    Okundu
                  </button>
                )}

                <button
                  onClick={() => deleteMessage(item._id)}
                  className="inline-flex items-center gap-1 text-sm bg-red-600 text-white px-3 py-2 rounded-full"
                >
                  <Trash2 size={15} />
                  Sil
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-[#5f6f66]">Henüz mesaj yok.</p>
        )}
      </div>
    </div>
  );
}