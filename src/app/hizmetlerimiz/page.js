import Link from "next/link";
import {
  ArrowRight,
  Brain,
  HeartHandshake,
  Laptop,
  Leaf,
  MessageCircleHeart,
  Users,
} from "lucide-react";

export const metadata = {
  title: "Hizmetlerimiz",
  description:
    "Bireysel terapi, online terapi, kaygı ve stres yönetimi başta olmak üzere psikolojik destek hizmetlerimizi inceleyin.",
};

export default function HizmetlerimizPage() {
  const services = [
    {
      title: "Bireysel Terapi",
      desc: "Kaygı, stres, özgüven, karar verme güçlükleri ve yaşam geçişleri üzerine destek.",
      icon: HeartHandshake,
    },
    {
      title: "Online Terapi",
      desc: "Bulunduğunuz yerden güvenli, düzenli ve sürdürülebilir psikolojik danışmanlık.",
      icon: Laptop,
    },
    {
      title: "Kaygı ve Stres Yönetimi",
      desc: "Zihinsel yoğunluk, bedensel gerginlik ve günlük yaşam stresini anlamaya yönelik destek.",
      icon: Leaf,
    },
    {
      title: "İlişki Problemleri",
      desc: "Yakın ilişkilerde iletişim, sınır koyma ve duygusal ihtiyaçları anlama üzerine çalışmalar.",
      icon: Users,
    },
    {
      title: "Duygu Düzenleme",
      desc: "Yoğun duyguları tanımak, anlamlandırmak ve daha sağlıklı ifade edebilmek için destek.",
      icon: Brain,
    },
    {
      title: "Yaşam Danışmanlığı",
      desc: "Kişisel hedefler, yaşam dengesi ve içsel farkındalık üzerine yapılandırılmış görüşmeler.",
      icon: MessageCircleHeart,
    },
  ];

  const process = [
    "Ön görüşme",
    "İhtiyaç analizi",
    "Terapi planı",
    "Düzenli takip",
  ];

  return (
    <div className="bg-[#f7f5ef] overflow-x-hidden">
      <section className="relative py-24 lg:py-32 border-b border-[#1f332b]/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#d6e7dc,transparent_32%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <span className="text-sm uppercase tracking-[0.35em] text-[#1f5f4b]">
            Hizmetlerimiz
          </span>

          <div className="mt-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-end">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#1f332b] leading-[1.04] tracking-tight">
              İhtiyacınıza göre şekillenen psikolojik destek alanları.
            </h1>

            <p className="text-lg sm:text-xl text-[#5f6f66] leading-relaxed lg:pb-3">
              Her danışanın ihtiyaçları farklıdır. Bu nedenle terapi süreci
              danışanın yaşam deneyimi, beklentileri ve hedefleri doğrultusunda
              kişiye özel olarak planlanır.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 border-b border-[#1f332b]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <div className="border-t border-[#1f332b]/10">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="group grid lg:grid-cols-[120px_1fr_1.3fr_auto] gap-6 items-start lg:items-center py-10 border-b border-[#1f332b]/10"
                >
                  <span className="font-serif text-4xl text-[#7a8b7f] group-hover:text-[#1f5f4b] transition">
                    0{index + 1}
                  </span>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-[#1f332b]/10 flex items-center justify-center shrink-0 group-hover:bg-[#1f332b] group-hover:text-white transition">
                      <Icon
                        size={22}
                        className="text-[#1f5f4b] group-hover:text-white transition"
                      />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1f332b] group-hover:text-[#1f5f4b] transition">
                      {service.title}
                    </h2>
                  </div>

                  <p className="text-[#5f6f66] text-lg leading-relaxed lg:pt-1">
                    {service.desc}
                  </p>

                  <Link
                    href="/iletisim"
                    className="w-12 h-12 rounded-full border border-[#1f332b]/15 flex items-center justify-center text-[#1f332b] group-hover:bg-[#1f332b] group-hover:text-white transition"
                    aria-label={`${service.title} için randevu al`}
                  >
                    <ArrowRight size={18} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-white border-b border-[#1f332b]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-16">
          <div>
            <span className="text-sm uppercase tracking-[0.3em] text-[#1f5f4b]">
              Süreç Nasıl İlerler?
            </span>

            <h2 className="mt-6 text-4xl md:text-5xl font-serif font-bold text-[#1f332b] leading-tight">
              İlk görüşmeden itibaren güvenli ve yapılandırılmış bir süreç.
            </h2>

            <p className="mt-8 text-lg text-[#5f6f66] leading-relaxed">
              İlk görüşmede danışanın ihtiyaçları, beklentileri ve terapi
              hedefleri değerlendirilir. Sonrasında görüşme sıklığı ve süreç
              planı birlikte belirlenir.
            </p>
          </div>

          <div className="border-t border-[#1f332b]/10">
            {process.map((item, index) => (
              <div
                key={item}
                className="grid sm:grid-cols-[90px_1fr] gap-5 py-7 border-b border-[#1f332b]/10"
              >
                <span className="font-serif text-3xl text-[#7a8b7f]">
                  0{index + 1}
                </span>

                <p className="text-2xl font-serif font-bold text-[#1f332b]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-[#1f332b]">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 lg:px-8 text-center">
          <span className="text-sm uppercase tracking-[0.3em] text-white/50">
            Randevu
          </span>

          <h2 className="mt-6 text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
            Size uygun destek alanı için bizimle iletişime geçin.
          </h2>

          <p className="mt-8 text-white/65 text-lg leading-relaxed max-w-2xl mx-auto">
            Görüşme planı ve terapi süreci hakkında bilgi almak için randevu
            talebi oluşturabilirsiniz.
          </p>

          <Link
            href="/iletisim"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#f7f5ef] text-[#1f332b] px-8 py-4 font-bold hover:bg-white transition"
          >
            Randevu Al
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
