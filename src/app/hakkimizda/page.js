import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  HeartHandshake,
  Leaf,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "Hakkımızda",
  description:
    "Psikolog Merkezi hakkında bilgi alın. Güvenli, etik ve danışan odaklı psikolojik danışmanlık yaklaşımımızı keşfedin.",
};

export default function HakkimizdaPage() {
  const values = [
    "Gizlilik ve etik ilkelere bağlılık",
    "Danışan odaklı profesyonel yaklaşım",
    "Güvenli ve yargılayıcı olmayan görüşme alanı",
    "Kişiye özel terapi süreci",
  ];

  return (
    <div className="bg-[#f7f5ef]">
      <section className="relative py-10 lg:py-15 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#d6e7dc,transparent_35%)]" />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-[#1f5f4b] font-semibold">Hakkımızda</span>

            <h1 className="mt-4 text-4xl md:text-6xl font-serif font-bold text-[#1f332b] leading-tight">
              Güvenli, sakin ve profesyonel bir terapi alanı.
            </h1>

            <p className="mt-6 text-lg text-[#5f6f66] leading-relaxed">
              Psikolog Merkezi, bireyin kendini daha iyi tanımasına, duygusal
              ihtiyaçlarını fark etmesine ve yaşamındaki zorlayıcı süreçlerle
              daha sağlıklı baş etmesine destek olmayı amaçlar.
            </p>

            <p className="mt-4 text-lg text-[#5f6f66] leading-relaxed">
              Çalışmalarımızda danışanın yaşam öyküsü, ihtiyaçları ve hedefleri
              dikkate alınır. Terapi süreci güven, gizlilik ve etik ilkeler
              doğrultusunda yürütülür.
            </p>

            <Link
              href="/iletisim"
              className="mt-8 inline-flex items-center gap-2 bg-[#1f5f4b] text-white px-7 py-4 rounded-full font-semibold hover:bg-[#174637] transition"
            >
              Randevu Al
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="bg-white rounded-[2.5rem] p-5 shadow-xl shadow-[#1f332b]/10">
            <div className="rounded-[2rem] bg-gradient-to-br from-[#d6e7dc] to-[#f4efe3] min-h-[430px] flex items-center justify-center p-10">
              <div className="text-center">
                <div className="w-24 h-24 bg-white/80 rounded-full mx-auto flex items-center justify-center mb-6">
                  <HeartHandshake size={44} className="text-[#1f5f4b]" />
                </div>

                <h2 className="text-3xl font-serif font-bold text-[#1f332b]">
                  Danışan odaklı yaklaşım
                </h2>

                <p className="mt-4 text-[#5f6f66] leading-relaxed">
                  Her bireyin süreci kendine özgüdür. Bu nedenle terapi planı
                  kişisel ihtiyaçlara göre şekillenir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEĞERLER */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-14">
          <div>
            <span className="text-[#1f5f4b] font-semibold">
              Çalışma İlkelerimiz
            </span>

            <h2 className="mt-3 text-3xl md:text-4xl font-serif font-bold text-[#1f332b]">
              Terapi sürecinde güven, gizlilik ve sürdürülebilir destek.
            </h2>
          </div>

          <div className="space-y-4">
            {values.map((item) => (
              <div
                key={item}
                className="flex items-start gap-4 bg-[#f7f5ef] rounded-2xl p-5"
              >
                <CheckCircle className="text-[#1f5f4b] shrink-0" size={22} />
                <p className="text-[#5f6f66]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MİSYON / VİZYON */}
      <section className="bg-[#f7f5ef] py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#ebe4d6]">
            <div className="w-14 h-14 rounded-2xl bg-[#e3efe8] flex items-center justify-center mb-6">
              <Leaf className="text-[#1f5f4b]" size={28} />
            </div>

            <h3 className="text-2xl font-serif font-bold text-[#1f332b]">
              Misyonumuz
            </h3>

            <p className="mt-4 text-[#5f6f66] leading-relaxed">
              Danışanların yaşamlarında karşılaştıkları duygusal, zihinsel ve
              ilişkisel zorlukları anlamlandırmalarına destek olmak; güvenli ve
              etik bir terapi süreci sunmak.
            </p>
          </div>

          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#ebe4d6]">
            <div className="w-14 h-14 rounded-2xl bg-[#e3efe8] flex items-center justify-center mb-6">
              <ShieldCheck className="text-[#1f5f4b]" size={28} />
            </div>

            <h3 className="text-2xl font-serif font-bold text-[#1f332b]">
              Vizyonumuz
            </h3>

            <p className="mt-4 text-[#5f6f66] leading-relaxed">
              Psikolojik desteğe ulaşımı kolaylaştıran, danışan güvenini ön
              planda tutan ve toplumda ruh sağlığı farkındalığını artıran bir
              danışmanlık merkezi olmak.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1f5f4b] py-20">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
            Kendinizi anlamak için güvenli bir başlangıç yapın.
          </h2>

          <p className="mt-5 text-white/80 text-lg">
            Randevu ve detaylı bilgi için bizimle iletişime geçebilirsiniz.
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
