import Link from "next/link";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const whatsappNumber = "905442030662";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Merhaba, psikolojik danışmanlık hizmetleri hakkında bilgi almak istiyorum."
  )}`;

  const links = [
    { name: "Anasayfa", href: "/" },
    { name: "Hakkımızda", href: "/hakkimizda" },
    { name: "Hizmetlerimiz", href: "/hizmetlerimiz" },
    { name: "Blog", href: "/blog" },
    { name: "İletişim", href: "/iletisim" },
  ];

  return (
    <footer className="bg-[#1f332b] text-white overflow-x-hidden">
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-end">
            <div>
              <span className="text-sm uppercase tracking-[0.35em] text-white/40">
                Psikolog Merkezi
              </span>

              <h2 className="mt-6 text-4xl md:text-6xl font-serif font-bold leading-tight max-w-4xl">
                Kendiniz için güvenli bir başlangıç yapın.
              </h2>
            </div>

            <div className="lg:text-right">
              <p className="text-white/60 text-lg leading-relaxed">
                Randevu, terapi süreci ve danışmanlık hizmetleri hakkında bilgi
                almak için bizimle iletişime geçebilirsiniz.
              </p>

              <Link
                href="/iletisim"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#f7f5ef] text-[#1f332b] px-8 py-4 font-bold hover:bg-white transition"
              >
                Randevu Al
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 py-16">
        <div className="grid lg:grid-cols-[1.2fr_0.6fr_1fr] gap-12 lg:gap-20">
          <div>
            <h3 className="text-3xl font-serif font-bold">
              Psikolog Merkezi
            </h3>

            <p className="mt-6 text-white/60 leading-relaxed max-w-md">
              Güvenli, sakin ve profesyonel bir terapi süreci için; danışan
              odaklı, etik ve sürdürülebilir psikolojik destek sunuyoruz.
            </p>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.3em] text-white/40">
              Sayfalar
            </h4>

            <nav className="mt-6 space-y-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-white/65 hover:text-white transition"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.3em] text-white/40">
              İletişim
            </h4>

            <div className="mt-6 border-t border-white/10">
              <a
                href="tel:+905442030662"
                className="flex items-center justify-between gap-4 py-5 border-b border-white/10 group"
              >
                <span className="flex items-center gap-3 text-white/65 group-hover:text-white transition">
                  <Phone size={18} />
                  +90 544 203 06 62
                </span>
                <ArrowRight
                  size={16}
                  className="text-white/30 group-hover:text-white transition"
                />
              </a>

              <a
                href="mailto:info@psikologmerkezi.com"
                className="flex items-center justify-between gap-4 py-5 border-b border-white/10 group"
              >
                <span className="flex items-center gap-3 text-white/65 group-hover:text-white transition break-all">
                  <Mail size={18} className="shrink-0" />
                  info@psikologmerkezi.com
                </span>
                <ArrowRight
                  size={16}
                  className="text-white/30 group-hover:text-white transition shrink-0"
                />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 py-5 border-b border-white/10 group"
              >
                <span className="flex items-center gap-3 text-white/65 group-hover:text-white transition">
                  <MessageCircle size={18} />
                  WhatsApp
                </span>
                <ArrowRight
                  size={16}
                  className="text-white/30 group-hover:text-white transition"
                />
              </a>

              <div className="flex items-start gap-3 py-5 border-b border-white/10 text-white/65">
                <MapPin size={18} className="shrink-0 mt-1" />
                <span>Ankara / Türkiye</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-sm text-white/40">
            © {year} Psikolog Merkezi. Tüm hakları saklıdır.
          </p>

          <div className="flex flex-wrap gap-5 text-sm text-white/40">
            <Link href="/gizlilik-politikasi" className="hover:text-white">
              Gizlilik Politikası
            </Link>

            <Link href="/kvkk" className="hover:text-white">
              KVKK
            </Link>

            <Link href="/cerez-politikasi" className="hover:text-white">
              Çerez Politikası
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}