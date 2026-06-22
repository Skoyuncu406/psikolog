import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  HeartHandshake,
  Leaf,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "Anasayfa",
  description:
    "Psikolog Merkezi ile bireysel terapi, online terapi ve psikolojik danışmanlık sürecine güvenli bir başlangıç yapın.",
};

export default function HomePage() {
  const services = [
    "Bireysel Terapi",
    "Online Terapi",
    "Kaygı ve Stres Yönetimi",
    "İlişki Problemleri",
  ];

  const principles = [
    "Gizlilik ve etik ilkeler",
    "Danışan odaklı yaklaşım",
    "Yargılayıcı olmayan güvenli alan",
  ];

  return (
    <div className="bg-[#f7f5ef] overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center border-b border-[#1f332b]/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#d6e7dc,transparent_32%),radial-gradient(circle_at_15%_80%,#efe5d3,transparent_34%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 py-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <div>
            <div className="mb-8 inline-flex items-center gap-3 border border-[#1f332b]/10 bg-white/50 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-[#1f5f4b]" />
              <span className="text-sm text-[#1f332b]/70">
                Terapi & Psikolojik Danışmanlık
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-[#1f332b] leading-[1.02]">
              Kendinizi duymak için sakin bir alan.
            </h1>

            <p className="mt-8 max-w-2xl text-lg sm:text-xl text-[#5f6f66] leading-relaxed">
              Zorlayıcı duygu, düşünce ve yaşam deneyimlerinizi anlamlandırmak;
              daha dengeli, güvenli ve sürdürülebilir bir içsel yaşam kurmak
              için profesyonel destek sunuyoruz.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1f332b] text-white px-8 py-4 font-semibold hover:bg-[#1f5f4b] transition"
              >
                Randevu Al
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/hizmetlerimiz"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1f332b]/15 bg-white/50 text-[#1f332b] px-8 py-4 font-semibold hover:bg-white transition"
              >
                Hizmetleri İncele
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-6 max-w-xl border-t border-[#1f332b]/10 pt-8">
              <div>
                <p className="text-3xl font-serif font-bold text-[#1f332b]">
                  01
                </p>
                <p className="mt-2 text-sm text-[#5f6f66]">Güvenli Alan</p>
              </div>

              <div>
                <p className="text-3xl font-serif font-bold text-[#1f332b]">
                  02
                </p>
                <p className="mt-2 text-sm text-[#5f6f66]">Etik Yaklaşım</p>
              </div>

              <div>
                <p className="text-3xl font-serif font-bold text-[#1f332b]">
                  03
                </p>
                <p className="mt-2 text-sm text-[#5f6f66]">Kişiye Özel</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-t-full border border-[#1f332b]/10 bg-[#e3efe8] overflow-hidden">
              <div className="h-full w-full bg-[linear-gradient(145deg,#d6e7dc,#f7f5ef,#9db9a9)] flex items-center justify-center">
                <div className="text-center px-10">
                  <Leaf size={64} className="mx-auto text-[#1f5f4b]" />

                  <h2 className="mt-8 text-4xl font-serif font-bold text-[#1f332b]">
                    Sakinlik, güven ve farkındalık.
                  </h2>

                  <p className="mt-5 text-[#5f6f66] leading-relaxed">
                    Terapi süreci, kişinin kendisini daha iyi anlaması için
                    güvenli ve etik bir çerçeve sunar.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -left-6 bottom-14 hidden md:block bg-[#f7f5ef] border border-[#1f332b]/10 px-6 py-5 rounded-full shadow-sm">
              <div className="flex items-center gap-3">
                <ShieldCheck size={22} className="text-[#1f5f4b]" />
                <span className="text-sm font-semibold text-[#1f332b]">
                  Gizlilik önceliklidir
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT INTRO */}
      <section className="py-24 lg:py-32 border-b border-[#1f332b]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-14">
          <div>
            <span className="text-sm uppercase tracking-[0.3em] text-[#1f5f4b]">
              Hakkımızda
            </span>

            <h2 className="mt-6 text-4xl md:text-5xl font-serif font-bold text-[#1f332b] leading-tight">
              Danışan odaklı, sakin ve sürdürülebilir bir terapi yaklaşımı.
            </h2>
          </div>

          <div className="lg:pt-12">
            <p className="text-xl text-[#5f6f66] leading-relaxed">
              Terapiyi yalnızca sorunlara çözüm aranan bir alan olarak değil;
              kişinin kendini duyduğu, duygularını anlamlandırdığı ve yaşamla
              daha sağlıklı bağ kurduğu bir yolculuk olarak görüyoruz.
            </p>

            <div className="mt-10 space-y-5 border-t border-[#1f332b]/10 pt-8">
              {principles.map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <CheckCircle size={22} className="text-[#1f5f4b] shrink-0" />
                  <p className="text-[#1f332b] font-medium">{item}</p>
                </div>
              ))}
            </div>

            <Link
              href="/hakkimizda"
              className="mt-10 inline-flex items-center gap-2 text-[#1f5f4b] font-bold"
            >
              Yaklaşımımızı İncele
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES - NO CARDS */}
      <section className="py-24 lg:py-32 border-b border-[#1f332b]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm uppercase tracking-[0.3em] text-[#1f5f4b]">
              Hizmetlerimiz
            </span>

            <h2 className="mt-6 text-4xl md:text-6xl font-serif font-bold text-[#1f332b] leading-tight">
              İhtiyacınıza göre şekillenen psikolojik destek alanları.
            </h2>
          </div>

          <div className="mt-16 border-t border-[#1f332b]/10">
            {services.map((service, index) => (
              <Link
                href="/hizmetlerimiz"
                key={service}
                className="group grid md:grid-cols-[160px_1fr_auto] gap-6 items-center py-8 border-b border-[#1f332b]/10"
              >
                <span className="text-[#7a8b7f] font-serif text-2xl">
                  0{index + 1}
                </span>

                <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#1f332b] group-hover:text-[#1f5f4b] transition">
                  {service}
                </h3>

                <div className="w-12 h-12 rounded-full border border-[#1f332b]/15 flex items-center justify-center group-hover:bg-[#1f332b] group-hover:text-white transition">
                  <ArrowRight size={18} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="py-24 lg:py-32 border-b border-[#1f332b]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[5/4] rounded-[3rem] border border-[#1f332b]/10 bg-[#e3efe8] flex items-center justify-center px-10">
              <HeartHandshake size={80} className="text-[#1f5f4b]" />
            </div>

            <div className="absolute inset-8 border border-white/70 rounded-[2.5rem]" />
          </div>

          <div>
            <span className="text-sm uppercase tracking-[0.3em] text-[#1f5f4b]">
              Yaklaşım
            </span>

            <h2 className="mt-6 text-4xl md:text-5xl font-serif font-bold text-[#1f332b] leading-tight">
              Her görüşme, kişinin kendi ritmine saygı duyan bir süreçtir.
            </h2>

            <p className="mt-8 text-lg text-[#5f6f66] leading-relaxed">
              İlk görüşmeden itibaren danışanın ihtiyaçları, yaşam deneyimleri
              ve hedefleri dikkate alınır. Süreç; güven, gizlilik ve etik
              çerçeve içinde ilerler.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-8 border-t border-[#1f332b]/10 pt-8">
              <div>
                <ShieldCheck size={28} className="text-[#1f5f4b]" />
                <h3 className="mt-4 font-serif text-2xl font-bold text-[#1f332b]">
                  Gizlilik
                </h3>
                <p className="mt-3 text-[#5f6f66] leading-relaxed">
                  Danışan mahremiyeti ve etik sınırlar merkezdedir.
                </p>
              </div>

              <div>
                <MessageCircle size={28} className="text-[#1f5f4b]" />
                <h3 className="mt-4 font-serif text-2xl font-bold text-[#1f332b]">
                  Diyalog
                </h3>
                <p className="mt-3 text-[#5f6f66] leading-relaxed">
                  Yargılayıcı olmayan, açık ve güvenli bir iletişim kurulur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-[#1f332b]">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 lg:px-8 text-center">
          <span className="text-sm uppercase tracking-[0.3em] text-white/50">
            İlk Adım
          </span>

          <h2 className="mt-6 text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
            Kendiniz için güvenli bir başlangıç yapabilirsiniz.
          </h2>

          <p className="mt-8 text-lg text-white/65 leading-relaxed max-w-2xl mx-auto">
            Randevu ve detaylı bilgi için iletişim sayfasından bize
            ulaşabilirsiniz.
          </p>

          <Link
            href="/iletisim"
            className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-[#f7f5ef] text-[#1f332b] px-8 py-4 font-bold hover:bg-white transition"
          >
            İletişime Geç
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
