import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ScrollTopButton from "@/components/ScrollTopButton";
import LoadingScreen from "@/components/LoadingScreen";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata = {
  metadataBase: new URL("https://siteadresiniz.com"),
  title: {
    default: "Psikolog Merkezi | Psikolojik Danışmanlık",
    template: "%s | Psikolog Merkezi",
  },
  description:
    "Bireysel terapi, online terapi, kaygı, stres ve psikolojik danışmanlık hizmetleri.",
  keywords: [
    "psikolog",
    "psikolojik danışmanlık",
    "online terapi",
    "bireysel terapi",
    "kaygı terapisi",
    "Ankara psikolog",
  ],
  openGraph: {
    title: "Psikolog Merkezi",
    description:
      "Güvenli, etik ve danışan odaklı psikolojik danışmanlık hizmetleri.",
    url: "https://siteadresiniz.com",
    siteName: "Psikolog Merkezi",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <LoadingScreen />
        <Header />

        <main>
          <PageTransition>{children}</PageTransition>
        </main>

        <Footer />
        <FloatingWhatsApp />
        <ScrollTopButton />
      </body>
    </html>
  );
}
