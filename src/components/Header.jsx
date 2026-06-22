"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, ArrowRight } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Anasayfa", href: "/" },
    { name: "Hakkımızda", href: "/hakkimizda" },
    { name: "Hizmetlerimiz", href: "/hizmetlerimiz" },
    { name: "Blog", href: "/blog" },
    { name: "İletişim", href: "/iletisim" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#f7f5ef]/80 backdrop-blur-xl border-b border-[#1f332b]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          <Link href="/" onClick={() => setOpen(false)}>
            <div className="flex flex-col leading-none">
              <span className="text-[22px] sm:text-2xl font-serif font-bold tracking-tight text-[#1f332b]">
                Psikolog Merkezi
              </span>
              <span className="mt-2 text-[10px] tracking-[0.35em] uppercase text-[#7a8b7f]">
                Terapi & Danışmanlık
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 rounded-full bg-white/60 border border-[#1f332b]/10 px-2 py-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-5 py-3 rounded-full text-sm font-medium text-[#1f332b]/80 hover:bg-[#e3efe8] hover:text-[#1f5f4b] transition"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <Link
            href="/iletisim"
            className="hidden lg:inline-flex items-center gap-2 rounded-full bg-[#1f332b] text-white px-5 py-3 text-sm font-semibold hover:bg-[#1f5f4b] transition"
          >
            <Phone size={16} />
            Randevu Al
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden relative w-12 h-12 rounded-full border border-[#1f332b]/10 bg-white/70 text-[#1f332b] flex items-center justify-center shadow-sm active:scale-95 transition"
            aria-label="Menüyü aç"
          >
            <span className="absolute inset-0 rounded-full bg-[#e3efe8]/60 scale-0 transition group-hover:scale-100" />
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden fixed left-0 right-0 top-20 z-40 bg-[#f7f5ef]/95 backdrop-blur-2xl border-b border-[#1f332b]/10 transition-all duration-500 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-4 sm:px-5 py-8">
          <div className="border-t border-[#1f332b]/10">
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between py-5 border-b border-[#1f332b]/10"
              >
                <div className="flex items-center gap-4">
                  <span className="font-serif text-2xl text-[#7a8b7f]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-2xl font-serif font-bold text-[#1f332b] group-hover:text-[#1f5f4b] transition">
                    {link.name}
                  </span>
                </div>

                <ArrowRight
                  size={18}
                  className="text-[#1f332b]/40 group-hover:text-[#1f5f4b] transition"
                />
              </Link>
            ))}
          </div>

          <Link
            href="/iletisim"
            onClick={() => setOpen(false)}
            className="mt-8 flex items-center justify-center gap-2 rounded-full bg-[#1f332b] text-white px-6 py-4 font-semibold hover:bg-[#1f5f4b] transition"
          >
            <Phone size={17} />
            Randevu Al
          </Link>

          <p className="mt-6 text-center text-xs tracking-[0.25em] uppercase text-[#7a8b7f]">
            Güvenli Terapi Alanı
          </p>
        </div>
      </div>
    </header>
  );
}