import Link from "next/link";
import { APP_NAME, LEGAL_DISCLAIMER } from "@/lib/constants";

const footerLinks = {
  services: [
    { name: "Kaza Danışmanı", href: "/kaza-danismani" },
    { name: "Ceza Analizi", href: "/ceza-analizi" },
    { name: "Dilekçe Oluştur", href: "/dilekce-olustur" },
    { name: "Kaza Krokisi", href: "/kaza-krokisi" },
  ],
  company: [
    { name: "Hakkımızda", href: "/hakkimizda" },
    { name: "Uzmanlarımız", href: "/uzmanlar" },
    { name: "Blog", href: "/blog" },
    { name: "İletişim", href: "/iletisim" },
  ],
  legal: [
    { name: "Gizlilik Politikası", href: "/gizlilik" },
    { name: "Kullanım Koşulları", href: "/kullanim-sartlari" },
    { name: "KVKK Aydınlatma Metni", href: "/kvkk" },
    { name: "Çerez Politikası", href: "/cerezler" },
  ],
  support: [
    { name: "Sıkça Sorulan Sorular", href: "/sss" },
    { name: "Rehberler", href: "/rehberler" },
    { name: "Nasıl Çalışır?", href: "/nasil-calisir" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-navy">Hizmetler</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-navy"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-navy">Kurumsal</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-navy"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-navy">Destek</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-navy"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-navy">Yasal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-navy"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 border-t pt-8">
          <p className="text-xs text-muted-foreground">{LEGAL_DISCLAIMER}</p>
        </div>

        {/* Copyright */}
        <div className="mt-4 flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground md:flex-row">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}. Tüm hakları saklıdır.</p>
          <p>Türkiye Cumhuriyeti mevzuatına uygun hazırlanmıştır.</p>
        </div>
      </div>
    </footer>
  );
}
