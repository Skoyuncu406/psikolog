import Link from "next/link";
import { Home, ArrowLeft, SearchX, MessageCircle } from "lucide-react";

export default function NotFound() {
  const whatsappNumber = "905550000000";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Merhaba, web sitesinde aradığım sayfayı bulamadım. Yardım alabilir miyim?",
  )}`;

  return (
    <div className="min-h-[75vh] bg-[#f7f5ef] flex items-center justify-center px-4 py-20 overflow-x-hidden">
      <div className="max-w-3xl w-full text-center">
        <div className="mx-auto w-24 h-24 rounded-full bg-[#e3efe8] flex items-center justify-center mb-8">
          <SearchX size={46} className="text-[#1f5f4b]" />
        </div>

        <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white border border-[#ebe4d6] text-[#1f5f4b] font-semibold text-sm mb-5">
          404 — Sayfa Bulunamadı
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#1f332b] leading-tight">
          Aradığınız sayfaya ulaşılamıyor.
        </h1>

        <p className="mt-6 text-[#5f6f66] text-lg leading-relaxed max-w-2xl mx-auto">
          Sayfa kaldırılmış, adres değişmiş veya yanlış bir bağlantıya tıklamış
          olabilirsiniz. Ana sayfaya dönebilir ya da bizimle iletişime
          geçebilirsiniz.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#1f5f4b] text-white px-7 py-4 rounded-full font-bold hover:bg-[#174637] transition"
          >
            <Home size={19} />
            Ana Sayfaya Dön
          </Link>

          <Link
            href="/iletisim"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#1f332b] px-7 py-4 rounded-full font-bold border border-[#d8d1bf] hover:border-[#1f5f4b] transition"
          >
            <ArrowLeft size={19} />
            İletişime Geç
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-7 py-4 rounded-full font-bold hover:scale-105 transition"
          >
            <MessageCircle size={19} />
            WhatsApp
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/hakkimizda"
            className="bg-white rounded-2xl p-5 border border-[#ebe4d6] text-[#1f332b] font-semibold hover:shadow-lg transition"
          >
            Hakkımızda
          </Link>

          <Link
            href="/hizmetlerimiz"
            className="bg-white rounded-2xl p-5 border border-[#ebe4d6] text-[#1f332b] font-semibold hover:shadow-lg transition"
          >
            Hizmetlerimiz
          </Link>

          <Link
            href="/blog"
            className="bg-white rounded-2xl p-5 border border-[#ebe4d6] text-[#1f332b] font-semibold hover:shadow-lg transition"
          >
            Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
