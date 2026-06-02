"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

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
    <header className="sticky top-0 z-50 bg-[#f7f5ef]/90 backdrop-blur-md border-b border-[#d8d1bf]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex flex-col">
          <span className="text-2xl font-serif font-bold text-[#1f5f4b]">
            Psikolog Merkezi
          </span>
          <span className="text-xs tracking-[0.25em] text-[#7a8b7f]">
            TERAPİ & DANIŞMANLIK
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#1f332b] hover:text-[#1f5f4b] transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <Link
          href="/iletisim"
          className="hidden lg:flex items-center gap-2 bg-[#1f5f4b] text-white px-5 py-3 rounded-full text-sm font-semibold hover:bg-[#174637] transition"
        >
          <Phone size={17} />
          Randevu Al
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-[#1f332b]"
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#f7f5ef] border-t border-[#d8d1bf] px-5 py-6 space-y-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-[#1f332b] font-medium"
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/iletisim"
            onClick={() => setOpen(false)}
            className="block text-center bg-[#1f5f4b] text-white px-5 py-3 rounded-full font-semibold"
          >
            Randevu Al
          </Link>
        </div>
      )}
    </header>
  );
}