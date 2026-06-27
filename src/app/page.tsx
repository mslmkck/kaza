import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ROUTES, APP_NAME, ACCIDENT_TYPES, QUESTION_CATEGORIES } from "@/lib/constants";
import {
  Car,
  Scale,
  FileText,
  MessageCircle,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Phone,
  Users,
  Star,
  ChevronRight,
  Lightbulb,
  FileCheck,
  Target,
  Heart,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-20 lg:py-32">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-1/4 -top-1/4 h-96 w-96 rounded-full bg-blue/5" />
          <div className="absolute -bottom-1/4 -right-1/4 h-96 w-96 rounded-full bg-navy/5" />
        </div>

        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <Badge variant="secondary" className="mb-4 md:mb-6 px-3 md:px-4 py-1.5 text-xs md:text-sm font-medium">
              <span className="mr-2 text-blue">●</span>
              Türkiye'nin Güvenilir Trafik Danışmanlık Platformu
            </Badge>

            {/* Main heading */}
            <h1 className="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-navy leading-tight">
              Trafik kazası veya trafik cezası konusunda{" "}
              <span className="gradient-text">ne yapacağınızı</span> bilmiyor musunuz?
            </h1>

            {/* Subheading */}
            <p className="mb-6 md:mb-8 text-base md:text-lg text-muted-foreground px-2">
              Olayınızı anlatın, gerekli adımları öğrenin, belgelerinizi hazırlayın ve sürecinizi tek yerden takip edin.
            </p>

            {/* Main CTA buttons */}
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
              <Button size="lg" asChild className="w-full sm:w-auto text-base">
                <Link href={ROUTES.ACCIDENT_WIZARD}>
                  <Car className="mr-2 h-5 w-5" />
                  Kaza Sonrası Ne Yapmalıyım?
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-base">
                <Link href={ROUTES.FINE_ANALYSIS}>
                  <Scale className="mr-2 h-5 w-5" />
                  Trafik Cezamı Analiz Et
                </Link>
              </Button>
            </div>

            <div className="mt-3 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
              <Button size="default" variant="secondary" asChild className="w-full sm:w-auto">
                <Link href={ROUTES.PETITION_BUILDER}>
                  <FileText className="mr-2 h-4 w-4" />
                  İtiraz Dilekçesi Hazırla
                </Link>
              </Button>
              <Button size="default" variant="ghost" asChild className="w-full sm:w-auto">
                <Link href={ROUTES.QUESTIONS}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Uzmanına Sor
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-white py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            {[
              { label: "Aktif Kullanıcı", value: "12.000+", icon: Users },
              { label: "Başarılı Danışmanlık", value: "8.500+", icon: CheckCircle },
              { label: "Yanıt Süresi", value: "< 24 saat", icon: Clock },
              { label: "Memnuniyet", value: "% 96", icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-lg bg-blue/10 flex-shrink-0">
                  <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-blue" />
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold text-navy">{stat.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="mb-3 md:mb-4 text-2xl md:text-3xl lg:text-4xl font-bold text-navy leading-tight">
              Size Nasıl Yardımcı Olabiliriz?
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-sm md:text-base">
              Trafik kazası ve ceza itiraz süreçlerinizde ihtiyacınız olan her şey tek platformda
            </p>
          </div>

          <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
            {/* Service Card 1 */}
            <Card className="card-hover group cursor-pointer border-2 border-transparent hover:border-blue">
              <CardHeader className="pb-2">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white">
                  <Car className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Kaza Danışmanı</CardTitle>
                <CardDescription className="text-sm">
                  Kaza sonrasında yapmanız gerekenleri adım adım öğrenin
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                    Acil durum yönlendirmesi
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                    Olay yeri kontrol listesi
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                    Sigorta süreç rehberi
                  </li>
                </ul>
                <Button variant="link" className="mt-3 p-0 h-auto text-blue text-sm" asChild>
                  <Link href={ROUTES.ACCIDENT_WIZARD}>
                    Hemen Başla <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Service Card 2 */}
            <Card className="card-hover group cursor-pointer border-2 border-transparent hover:border-blue">
              <CardHeader className="pb-2">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue text-white">
                  <Scale className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Ceza Analizi</CardTitle>
                <CardDescription className="text-sm">
                  Trafik cezanıza itiraz edilip edilemeyeceğini öğrenin
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                    Otomatik ceza analizi
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                    İtiraz gerekçeleri listesi
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                    Gerekli belgeler listesi
                  </li>
                </ul>
                <Button variant="link" className="mt-4 p-0 text-blue" asChild>
                  <Link href={ROUTES.FINE_ANALYSIS}>
                    Hemen Başla <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Service Card 3 */}
            <Card className="card-hover group cursor-pointer border-2 border-transparent hover:border-blue">
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-success text-white">
                  <FileText className="h-7 w-7" />
                </div>
                <CardTitle>Dilekçe Oluşturucu</CardTitle>
                <CardDescription>
                  Kişiselleştirilmiş itiraz dilekçesi hazırlayın
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Otomatik dilekçe oluşturma
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    PDF ve Word formatında indirme
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Hukuki dayanak desteği
                  </li>
                </ul>
                <Button variant="link" className="mt-4 p-0 text-blue" asChild>
                  <Link href={ROUTES.PETITION_BUILDER}>
                    Hemen Başla <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Service Card 4 */}
            <Card className="card-hover group cursor-pointer border-2 border-transparent hover:border-blue">
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-warning text-white">
                  <Target className="h-7 w-7" />
                </div>
                <CardTitle>Kaza Krokisi</CardTitle>
                <CardDescription>
                  Sürükle-bırak ile profesyonel kaza krokisi hazırlayın
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Hazır yol ve kavşak şablonları
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Araç ve işaret ekleme
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    PNG ve PDF çıktı
                  </li>
                </ul>
                <Button variant="link" className="mt-4 p-0 text-blue" asChild>
                  <Link href={ROUTES.ACCIDENT_DIAGRAM}>
                    Hemen Başla <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Service Card 5 */}
            <Card className="card-hover group cursor-pointer border-2 border-transparent hover:border-blue">
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-error text-white">
                  <FileCheck className="h-7 w-7" />
                </div>
                <CardTitle>Belge Kontrol</CardTitle>
                <CardDescription>
                  Başvuru için gerekli belgeleri eksiksiz hazırlayın
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Belge şablonları
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Yükleme ve düzenleme
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Eksik belge uyarıları
                  </li>
                </ul>
                <Button variant="link" className="mt-4 p-0 text-blue" asChild>
                  <Link href={ROUTES.DOCUMENTS}>
                    Hemen Başla <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Service Card 6 */}
            <Card className="card-hover group cursor-pointer border-2 border-transparent hover:border-blue">
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-navy-light text-white">
                  <MessageCircle className="h-7 w-7" />
                </div>
                <CardTitle>Uzman Danışmanlığı</CardTitle>
                <CardDescription>
                  Trafik uzmanlarından ve avukatlardan profesyonel destek alın
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    7/24 soru sorabilme
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Dosya inceleme
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Görüntülü görüşme
                  </li>
                </ul>
                <Button variant="link" className="mt-4 p-0 text-blue" asChild>
                  <Link href={ROUTES.QUESTIONS}>
                    Hemen Başla <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-navy md:text-4xl">
              Nasıl Çalışır?
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Üç basit adımda sürecinizi başlatın
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Durumunuzu Anlatın",
                description: "Kaza veya ceza bilgilerinizi form aracılığıyla girin",
                icon: Lightbulb,
              },
              {
                step: "02",
                title: "Analiz ve Yönlendirme Alın",
                description: "Yapay zeka destekli sistem size özel rehberlik sunsun",
                icon: Target,
              },
              {
                step: "03",
                title: "Sürecinizi Takip Edin",
                description: "Belgelerinizi hazırlayın, dilekçenizi oluşturun, uzmandan destek alın",
                icon: Heart,
              },
            ].map((item, index) => (
              <div key={item.step} className="relative text-center">
                {/* Connector line */}
                {index < 2 && (
                  <div className="absolute -top-10 left-1/2 hidden h-8 w-full border-t-2 border-dashed border-blue/30 md:block" />
                )}
                <div className="relative z-10 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-navy text-white">
                  <item.icon className="h-8 w-8" />
                </div>
                <div className="mb-2 text-4xl font-bold text-blue/20">{item.step}</div>
                <h3 className="mb-2 text-xl font-semibold text-navy">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Scenarios Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-navy md:text-4xl">
              Popüler Kaza Senaryoları
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              En sık karşılaşılan kaza türleri ve yapmanız gerekenler
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ACCIDENT_TYPES.map((type) => (
              <Card key={type.value} className="card-hover cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-navy">{type.label}</h3>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-navy py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Sık Sorulan Sorular
            </h2>
            <p className="mx-auto max-w-2xl text-slate-300">
              En merak edilen soruların cevapları
            </p>
          </div>

          <div className="mx-auto grid max-w-3xl gap-4">
            {[
              {
                q: "Trafik cezasına itiraz etmek için son tarih nedir?",
                a: "Trafik cezasına tebliğ tarihinden itibaren 15 gün içinde itiraz edebilirsiniz.",
              },
              {
                q: "Kaza tespit tutanağı nereden alınır?",
                a: "Kaza tespit tutanağı formlarını trafik polislerinden,noterlerden veya online olarak indirebilirsiniz.",
              },
              {
                q: "İtiraz dilekçesi ücretli mi?",
                a: "Hayır, sistemimizde temel dilekçe oluşturma ücretsizdir. Profesyonel inceleme için ek paketler mevcuttur.",
              },
              {
                q: "Kaza sonrası sigorta şirketine ne kadar sürede bildirim yapmalıyım?",
                a: "Kaza sonrası en kısa sürede, tercihen 24 saat içinde sigorta şirketinize bildirim yapmanız önerilir.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="secondary" asChild>
              <Link href={ROUTES.FAQ}>Tüm Soruları Gör</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-navy to-blue text-white">
            <CardContent className="p-8 text-center md:p-12">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Hemen Başlayın, Geç Kalmayın!
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-slate-200">
                Trafik kazası veya ceza itiraz sürecinizde size yardımcı olmak için buradayız.
                7/24 destek, hızlı yanıt, güvenilir sonuç.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" asChild>
                  <Link href={ROUTES.ACCIDENT_WIZARD}>
                    <Car className="mr-2 h-5 w-5" />
                    Kaza Danışmanı
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-navy hover:bg-white/10" asChild>
                  <Link href={ROUTES.FINE_ANALYSIS}>
                    <Scale className="mr-2 h-5 w-5" />
                    Ceza Analizi
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { icon: Shield, label: "SSL Güvenli Bağlantı" },
              { icon: CheckCircle, label: "KVKK Uyumlu" },
              { icon: AlertTriangle, label: "Hukuki Uyarı" },
              { icon: Clock, label: "7/24 Destek" },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-muted-foreground">
                <badge.icon className="h-5 w-5" />
                <span className="text-sm">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
