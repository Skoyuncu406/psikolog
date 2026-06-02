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

  return (
    <div className="bg-[#f7f5ef]">
      <section className="py-10 lg:py-15">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <span className="text-[#1f5f4b] font-semibold">Hizmetlerimiz</span>

          <h1 className="mt-4 text-4xl md:text-6xl font-serif font-bold text-[#1f332b]">
            İhtiyacınıza uygun psikolojik destek alanları
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-[#5f6f66] leading-relaxed">
            Her danışanın ihtiyaçları farklıdır. Bu nedenle terapi süreci
            danışanın yaşam deneyimi, beklentileri ve hedefleri doğrultusunda
            kişiye özel olarak planlanır.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-7">
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

                <h3 className="text-2xl font-serif font-bold text-[#1f332b]">
                  {service.title}
                </h3>

                <p className="mt-4 text-[#5f6f66] leading-relaxed">
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#1f5f4b] font-semibold">
              Süreç Nasıl İlerler?
            </span>

            <h2 className="mt-3 text-3xl md:text-4xl font-serif font-bold text-[#1f332b]">
              İlk görüşmeden itibaren güvenli ve yapılandırılmış bir süreç.
            </h2>

            <p className="mt-6 text-[#5f6f66] text-lg leading-relaxed">
              İlk görüşmede danışanın ihtiyaçları, beklentileri ve terapi
              hedefleri değerlendirilir. Sonrasında görüşme sıklığı ve süreç
              planı birlikte belirlenir.
            </p>
          </div>

          <div className="space-y-4">
            {[
              "Ön görüşme",
              "İhtiyaç analizi",
              "Terapi planı",
              "Düzenli takip",
            ].map((item, index) => (
              <div
                key={item}
                className="bg-[#f7f5ef] rounded-2xl p-5 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-[#1f5f4b] text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <p className="font-semibold text-[#1f332b]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1f5f4b] py-20">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
            Size uygun destek alanı için bizimle iletişime geçin.
          </h2>

          <Link
            href="/iletisim"
            className="mt-8 inline-flex items-center gap-2 bg-white text-[#1f5f4b] px-8 py-4 rounded-full font-bold hover:bg-[#f7f5ef] transition"
          >
            Randevu Al
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
