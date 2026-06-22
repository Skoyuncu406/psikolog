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

  const process = [
    "İlk görüşme",
    "İhtiyaçları anlama",
    "Kişiye özel terapi planı",
    "Düzenli süreç takibi",
  ];

  return (
    <div className="bg-[#f7f5ef] overflow-x-hidden">
      <section className="relative py-24 lg:py-32 border-b border-[#1f332b]/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#d6e7dc,transparent_32%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <span className="text-sm uppercase tracking-[0.35em] text-[#1f5f4b]">
            Hakkımızda
          </span>

          <div className="mt-8 grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-end">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#1f332b] leading-[1.04] tracking-tight">
              Kendinizi anlamaya giden yolculukta güvenli bir alan.
            </h1>

            <div className="lg:pb-3">
              <p className="text-lg sm:text-xl text-[#5f6f66] leading-relaxed">
                Psikolog Merkezi, bireyin kendini daha iyi tanımasına, duygusal
                ihtiyaçlarını fark etmesine ve yaşamındaki zorlayıcı süreçlerle
                daha sağlıklı baş etmesine destek olmayı amaçlar.
              </p>

              <Link
                href="/iletisim"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1f332b] text-white px-7 py-4 font-semibold hover:bg-[#1f5f4b] transition"
              >
                Randevu Al
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 border-b border-[#1f332b]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-16">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-full border border-[#1f332b]/10 flex items-center justify-center shrink-0">
              <HeartHandshake size={26} className="text-[#1f5f4b]" />
            </div>

            <div>
              <span className="text-sm uppercase tracking-[0.3em] text-[#1f5f4b]">
                Yaklaşım
              </span>
              <p className="mt-4 text-[#5f6f66] leading-relaxed">
                Her bireyin süreci kendine özgüdür. Bu nedenle terapi planı
                kişisel ihtiyaçlara göre şekillenir.
              </p>
            </div>
          </div>

          <div>
            <p className="text-3xl md:text-5xl font-serif font-bold text-[#1f332b] leading-tight">
              Terapiyi yalnızca sorun çözme alanı olarak değil; kişinin kendini
              duyduğu, anladığı ve yaşamla daha sağlıklı bağ kurduğu bir keşif
              süreci olarak görüyoruz.
            </p>

            <p className="mt-8 text-lg text-[#5f6f66] leading-relaxed">
              Çalışmalarımızda danışanın yaşam öyküsü, ihtiyaçları ve hedefleri
              dikkate alınır. Terapi süreci güven, gizlilik ve etik ilkeler
              doğrultusunda yürütülür.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-white border-b border-[#1f332b]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16">
            <div>
              <span className="text-sm uppercase tracking-[0.3em] text-[#1f5f4b]">
                Çalışma İlkelerimiz
              </span>

              <h2 className="mt-6 text-4xl md:text-5xl font-serif font-bold text-[#1f332b] leading-tight">
                Güven, gizlilik ve sürdürülebilir destek.
              </h2>
            </div>

            <div className="border-t border-[#1f332b]/10">
              {values.map((item, index) => (
                <div
                  key={item}
                  className="grid sm:grid-cols-[90px_1fr] gap-5 py-7 border-b border-[#1f332b]/10"
                >
                  <span className="font-serif text-3xl text-[#7a8b7f]">
                    0{index + 1}
                  </span>

                  <div className="flex items-start gap-4">
                    <CheckCircle
                      className="text-[#1f5f4b] shrink-0 mt-1"
                      size={22}
                    />
                    <p className="text-lg text-[#1f332b] font-medium">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 border-b border-[#1f332b]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 grid lg:grid-cols-2 gap-16">
          <div>
            <div className="flex items-center gap-4">
              <Leaf size={30} className="text-[#1f5f4b]" />
              <span className="text-sm uppercase tracking-[0.3em] text-[#1f5f4b]">
                Misyon
              </span>
            </div>

            <h3 className="mt-8 text-4xl md:text-5xl font-serif font-bold text-[#1f332b] leading-tight">
              Danışanın içsel kaynaklarını fark etmesine eşlik etmek.
            </h3>

            <p className="mt-8 text-lg text-[#5f6f66] leading-relaxed">
              Danışanların yaşamlarında karşılaştıkları duygusal, zihinsel ve
              ilişkisel zorlukları anlamlandırmalarına destek olmak; güvenli ve
              etik bir terapi süreci sunmak.
            </p>
          </div>

          <div className="lg:border-l lg:border-[#1f332b]/10 lg:pl-16">
            <div className="flex items-center gap-4">
              <ShieldCheck size={30} className="text-[#1f5f4b]" />
              <span className="text-sm uppercase tracking-[0.3em] text-[#1f5f4b]">
                Vizyon
              </span>
            </div>

            <h3 className="mt-8 text-4xl md:text-5xl font-serif font-bold text-[#1f332b] leading-tight">
              Ruh sağlığına erişimi güvenli ve anlaşılır hale getirmek.
            </h3>

            <p className="mt-8 text-lg text-[#5f6f66] leading-relaxed">
              Psikolojik desteğe ulaşımı kolaylaştıran, danışan güvenini ön
              planda tutan ve toplumda ruh sağlığı farkındalığını artıran bir
              danışmanlık merkezi olmak.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-white border-b border-[#1f332b]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16">
            <div>
              <span className="text-sm uppercase tracking-[0.3em] text-[#1f5f4b]">
                Terapi Süreci
              </span>

              <h2 className="mt-6 text-4xl md:text-5xl font-serif font-bold text-[#1f332b] leading-tight">
                İlk adımdan itibaren yapılandırılmış ve güvenli ilerler.
              </h2>
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
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-[#1f332b]">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 lg:px-8 text-center">
          <span className="text-sm uppercase tracking-[0.3em] text-white/50">
            Güvenli Başlangıç
          </span>

          <h2 className="mt-6 text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
            Kendinizi anlamak için güvenli bir başlangıç yapın.
          </h2>

          <p className="mt-8 text-white/65 text-lg leading-relaxed">
            Randevu ve detaylı bilgi için bizimle iletişime geçebilirsiniz.
          </p>

          <Link
            href="/iletisim"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#f7f5ef] text-[#1f332b] px-8 py-4 font-bold hover:bg-white transition"
          >
            İletişime Geç
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
