import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ROUTES, APP_NAME } from "@/lib/constants";
import { Shield, Lock, Eye, FileText, AlertTriangle } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="container mx-auto max-w-4xl px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold text-navy">Gizlilik Politikası</h1>
          <p className="text-muted-foreground">Son güncelleme: 01.01.2024</p>
        </div>

        <div className="space-y-6">
          {/* Important Notice */}
          <Card className="border-l-4 border-l-blue">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Shield className="h-8 w-8 flex-shrink-0 text-blue" />
                <div>
                  <h3 className="font-semibold text-navy">Verileriniz Güvende</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {APP_NAME} olarak kişisel verilerinizin korunmasını en üst düzeyde tutuyoruz.
                    Bu politika, verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <Card>
            <CardContent className="prose max-w-none p-6">
              <h2 className="text-xl font-bold text-navy">1. Toplanan Bilgiler</h2>
              <p>
                Aşağıdaki bilgileri toplayabiliriz:
              </p>
              <ul>
                <li><strong>Kimlik Bilgileri:</strong> Ad, soyad, T.C. kimlik numarası, e-posta adresi, telefon numarası</li>
                <li><strong>Araç Bilgileri:</strong> Plaka, ruhsat bilgileri, sigorta bilgileri</li>
                <li><strong>Kaza/Ceza Bilgileri:</strong> Olay tarihi, konumu, açıklaması ve ilgili belgeler</li>
                <li><strong>Kullanım Verileri:</strong> IP adresi, tarayıcı bilgileri, sayfa görüntüleme verileri</li>
              </ul>

              <h2 className="text-xl font-bold text-navy">2. Bilgilerin Kullanımı</h2>
              <p>Topladığımız bilgileri şu amaçlarla kullanırız:</p>
              <ul>
                <li>Hizmetlerimizi sunmak ve geliştirmek</li>
                <li>Kullanıcı hesaplarını yönetmek</li>
                <li>Sorularınızı cevaplamak ve destek sağlamak</li>
                <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                <li>Platform güvenliğini sağlamak</li>
              </ul>

              <h2 className="text-xl font-bold text-navy">3. Bilgilerin Paylaşımı</h2>
              <p>
                Kişisel bilgilerinizi üçüncü taraflarla satmıyoruz. Bilgileriniz yalnızca şu durumlarda paylaşılabilir:
              </p>
              <ul>
                <li>Yasal zorunluluk durumunda yetkili makamlarla</li>
                <li>Hizmet sağlayıcılarımızla (hosting, analitik vb.)</li>
                <li>Açık rızanız olduğunda</li>
              </ul>

              <h2 className="text-xl font-bold text-navy">4. Veri Güvenliği</h2>
              <p>
                Verilerinizi korumak için endüstri standardı güvenlik önlemleri kullanıyoruz:
              </p>
              <ul>
                <li>SSL/TLS şifreleme</li>
                <li>Güvenli sunucu altyapısı</li>
                <li>Erişim kontrolü ve yetkilendirme</li>
                <li>Düzenli güvenlik denetimleri</li>
              </ul>

              <h2 className="text-xl font-bold text-navy">5. Çerezler</h2>
              <p>
                Web sitemiz çerez kullanır. Çerezler, tercihlerinizi hatırlamak ve
                hizmet kalitesini artırmak için kullanılır. Tarayıcı ayarlarınızdan çerezleri
                devre dışı bırakabilirsiniz.
              </p>

              <h2 className="text-xl font-bold text-navy">6. Haklarınız</h2>
              <p>KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
              <ul>
                <li>Verilerinize erişim hakkı</li>
                <li>Düzeltme hakkı</li>
                <li>Silme hakkı</li>
                <li>İşlemeyi kısıtlama hakkı</li>
                <li>Veri taşınabilirliği hakkı</li>
                <li>İtiraz hakkı</li>
              </ul>

              <h2 className="text-xl font-bold text-navy">7. Veri Saklama</h2>
              <p>
                Verilerinizi, yasal yükümlülüklerimizi yerine getirmek ve hizmetlerimizi
                sunmak için gerekli olan süre boyunca saklarız. Hesabınızı sildiğinizde,
                verileriniz yasal saklama sürelerine uygun olarak işlenir.
              </p>

              <h2 className="text-xl font-bold text-navy">8. İletişim</h2>
              <p>
                Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:
              </p>
              <ul>
                <li>E-posta: gizlilik@{APP_NAME.toLowerCase().replace("ş", "s")}.com</li>
                <li>Adres: İstanbul, Türkiye</li>
              </ul>
            </CardContent>
          </Card>

          {/* Related Links */}
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 font-semibold text-navy">İlgili Belgeler</h3>
              <div className="grid gap-3 md:grid-cols-2">
                <Link href={ROUTES.LEGAL_TERMS} className="flex items-center gap-2 rounded-lg border p-3 hover:bg-slate-50">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <span>Kullanım Koşulları</span>
                </Link>
                <Link href="/kvkk" className="flex items-center gap-2 rounded-lg border p-3 hover:bg-slate-50">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  <span>KVKK Aydınlatma Metni</span>
                </Link>
                <Link href="/cerezler" className="flex items-center gap-2 rounded-lg border p-3 hover:bg-slate-50">
                  <Eye className="h-5 w-5 text-muted-foreground" />
                  <span>Çerez Politikası</span>
                </Link>
                <Link href={ROUTES.QUESTIONS} className="flex items-center gap-2 rounded-lg border p-3 hover:bg-slate-50">
                  <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                  <span>Sorularınız için</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
