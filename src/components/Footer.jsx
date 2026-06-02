import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1f332b] text-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-2xl font-serif font-bold mb-4">
            Psikolog Merkezi
          </h3>
          <p className="text-white/70 leading-relaxed">
            Güvenli, sakin ve profesyonel bir terapi süreci için yanınızdayız.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Sayfalar</h4>
          <div className="space-y-2 text-white/70">
            <Link href="/" className="block hover:text-white">Anasayfa</Link>
            <Link href="/hakkimizda" className="block hover:text-white">Hakkımızda</Link>
            <Link href="/hizmetlerimiz" className="block hover:text-white">Hizmetlerimiz</Link>
            <Link href="/blog" className="block hover:text-white">Blog</Link>
            <Link href="/iletisim" className="block hover:text-white">İletişim</Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">İletişim</h4>
          <div className="space-y-3 text-white/70">
            <p className="flex gap-3">
              <Phone size={18} /> +90 555 000 00 00
            </p>
            <p className="flex gap-3">
              <Mail size={18} /> info@psikologmerkezi.com
            </p>
            <p className="flex gap-3">
              <MapPin size={18} /> Ankara / Türkiye
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 text-center py-5 text-sm text-white/50">
        © {new Date().getFullYear()} Psikolog Merkezi. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}