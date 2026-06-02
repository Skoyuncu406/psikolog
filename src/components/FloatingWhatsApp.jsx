"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const whatsappNumber = "905442030662";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Merhaba, psikolojik danışmanlık hizmetleri hakkında bilgi almak istiyorum."
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile iletişime geç"
      className="fixed bottom-6 left-6 md:left-auto md:right-6 z-50 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-105 transition flex items-center gap-3 px-5 py-4"
    >
      <MessageCircle size={24} />

      <span className="hidden sm:inline font-bold">WhatsApp</span>
    </a>
  );
}