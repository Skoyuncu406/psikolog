import Link from "next/link";
import {
  ArrowRight,
  HeartHandshake,
  Leaf,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Anasayfa",
  description:
    "Psikolog Merkezi ile bireysel terapi, online terapi ve psikolojik danışmanlık sürecine güvenli bir başlangıç yapın.",
};

export default function HomePage() {
  const services = [
    {
      title: "Bireysel Terapi",
      desc: "Kaygı, stres, özgüven, ilişki sorunları ve yaşam geçişleri üzerine destek.",
      icon: HeartHandshake,
    },
    {
      title: "Online Terapi",
      desc: "Bulunduğunuz yerden güvenli ve düzenli psikolojik danışmanlık süreci.",
      icon: MessageCircle,
    },
    {
      title: "Kaygı ve Stres Yönetimi",
      desc: "Günlük yaşamı zorlaştıran düşünce ve duygu döngülerini anlamaya yönelik destek.",
      icon: Leaf,
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative bg-[#f7f5ef]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#c9dfd2,transparent_35%),radial-gradient(circle_at_bottom_left,#efe5d3,transparent_35%)]" />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-10 lg:pt-15 lg:pb-26 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-white/70 border border-[#d8d1bf] px-4 py-2 rounded-full text-sm text-[#1f5f4b] font-medium mb-6">
              <Sparkles size={16} />
              Psikolojik Danışmanlık & Terapi
            </span>

            <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#1f332b] leading-tight">
              Kendinize iyi gelmek için güvenli bir alan.
            </h1>

            <p className="mt-6 text-lg text-[#5f6f66] leading-relaxed max-w-xl">
              Zorlayıcı duygu, düşünce ve yaşam deneyimlerinizi anlamlandırmak;
              daha dengeli ve sağlıklı bir yaşam kurmak için profesyonel destek
              sunuyoruz.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/iletisim"
                className="bg-[#1f5f4b] text-white px-7 py-4 rounded-full font-semibold hover:bg-[#174637] transition flex items-center justify-center gap-2"
              >
                Randevu Al
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/hizmetlerimiz"
                className="bg-white text-[#1f332b] px-7 py-4 rounded-full font-semibold border border-[#d8d1bf] hover:border-[#1f5f4b] transition text-center"
              >
                Hizmetleri İncele
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2.5rem] bg-white p-4 shadow-2xl shadow-[#1f332b]/10">
              <div className="h-[430px] rounded-[2rem] bg-gradient-to-br from-[#d6e7dc] via-[#f4efe3] to-[#9db9a9] flex items-center justify-center">
                <div className="text-center px-8">
                  <div className="w-24 h-24 rounded-full bg-white/80 mx-auto mb-6 flex items-center justify-center">
                    <Leaf size={42} className="text-[#1f5f4b]" />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-[#1f332b]">
                    Sakin, güvenli ve profesyonel terapi süreci
                  </h3>
                  <p className="mt-4 text-[#5f6f66]">
                    Her danışanın ihtiyacına göre şekillenen bireysel yaklaşım.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-4 bg-white rounded-3xl shadow-xl p-5 max-w-xs hidden md:block">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-[#1f5f4b]" />
                <p className="text-sm text-[#5f6f66]">
                  Gizlilik, güven ve etik ilkeler çerçevesinde danışmanlık.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KISA TANITIM */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-3 gap-10 items-start">
          <div>
            <span className="text-[#1f5f4b] font-semibold">Hakkımızda</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-serif font-bold text-[#1f332b]">
              Danışan odaklı, güven veren ve sürdürülebilir destek.
            </h2>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[#5f6f66] text-lg leading-relaxed">
              Psikolog Merkezi olarak terapi sürecini yalnızca sorunlara çözüm
              aranan bir alan değil; kişinin kendini tanıdığı, duygularını
              anlamlandırdığı ve yaşamla daha sağlıklı bağ kurduğu bir yolculuk
              olarak görüyoruz.
            </p>

            <div className="mt-8">
              <Link
                href="/hakkimizda"
                className="inline-flex items-center gap-2 text-[#1f5f4b] font-semibold"
              >
                Daha fazla bilgi
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HİZMETLER */}
      <section className="bg-[#f7f5ef] py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[#1f5f4b] font-semibold">Hizmetlerimiz</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-serif font-bold text-[#1f332b]">
              İhtiyacınıza uygun psikolojik destek alanları
            </h2>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-7">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition border border-[#ebe4d6]"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#e3efe8] flex items-center justify-center mb-6">
                    <Icon className="text-[#1f5f4b]" size={28} />
                  </div>

                  <h3 className="text-xl font-serif font-bold text-[#1f332b]">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-[#5f6f66] leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/hizmetlerimiz"
              className="inline-flex items-center gap-2 bg-[#1f5f4b] text-white px-7 py-4 rounded-full font-semibold hover:bg-[#174637] transition"
            >
              Tüm Hizmetleri Gör
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* YAKLAŞIM */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div className="rounded-[2.5rem] bg-[#e3efe8] p-10">
            <div className="bg-white rounded-[2rem] p-8">
              <h3 className="text-2xl font-serif font-bold text-[#1f332b]">
                Terapi sürecinde amaç
              </h3>

              <p className="mt-4 text-[#5f6f66] leading-relaxed">
                Kişinin yaşadığı zorlukları anlamlandırması, duygu ve düşünce
                kalıplarını fark etmesi, daha sağlıklı baş etme yolları
                geliştirmesi hedeflenir.
              </p>
            </div>
          </div>

          <div>
            <span className="text-[#1f5f4b] font-semibold">Yaklaşımımız</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-serif font-bold text-[#1f332b]">
              Her danışan için kişiye özel ve güvenli bir süreç.
            </h2>

            <p className="mt-6 text-[#5f6f66] text-lg leading-relaxed">
              Terapi sürecinde danışanın ihtiyaçları, yaşam deneyimleri ve
              hedefleri dikkate alınır. Yargılayıcı olmayan, güvenli ve etik
              çerçeve içinde ilerleyen bir destek sunulur.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="bg-[#f7f5ef] rounded-2xl p-5">
                <h4 className="font-bold text-[#1f332b]">Gizlilik</h4>
                <p className="text-sm text-[#5f6f66] mt-2">
                  Danışan mahremiyeti önceliklidir.
                </p>
              </div>

              <div className="bg-[#f7f5ef] rounded-2xl p-5">
                <h4 className="font-bold text-[#1f332b]">Güven</h4>
                <p className="text-sm text-[#5f6f66] mt-2">
                  Güvenli bir görüşme alanı sunulur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1f5f4b] py-20">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
            İlk adımı atmak için doğru zamanı beklemek zorunda değilsiniz.
          </h2>

          <p className="mt-5 text-white/80 text-lg">
            Size uygun görüşme planı için bizimle iletişime geçebilirsiniz.
          </p>

          <Link
            href="/iletisim"
            className="mt-8 inline-flex items-center gap-2 bg-white text-[#1f5f4b] px-8 py-4 rounded-full font-bold hover:bg-[#f7f5ef] transition"
          >
            İletişime Geç
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
