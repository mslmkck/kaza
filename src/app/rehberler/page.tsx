import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ROUTES } from "@/lib/constants";
import { FileText, ArrowRight, CheckCircle, Clock, Shield, Car, Scale, MessageCircle } from "lucide-react";

const guides = [
  {
    id: "kaza-sonrasi",
    title: "Trafik Kazası Sonrası Ne Yapılır?",
    description: "Kaza sonrasında yapmanız gereken adımlar ve dikkat edilmesi gerekenler",
    icon: Car,
    readTime: "8 dk",
    category: "Kaza",
    slug: "trafik-kazasi-sonrasi-ne-yapilir",
  },
  {
    id: "kaza-tespit",
    title: "Kaza Tespit Tutanağı Nasıl Doldurulur?",
    description: "Adım adım kaza tespit tutanağı doldurma rehberi",
    icon: FileText,
    readTime: "6 dk",
    category: "Kaza",
    slug: "kaza-tespit-tutanagi-nasil-doldurulur",
  },
  {
    id: "ceza-itiraz",
    title: "Trafik Cezasına Nasıl İtiraz Edilir?",
    description: "Ceza itiraz süreci ve dikkat edilmesi gerekenler",
    icon: Scale,
    readTime: "10 dk",
    category: "Ceza",
    slug: "trafik-cezasina-nasil-itiraz-edilir",
  },
  {
    id: "radar-ceza",
    title: "Radar Cezasına İtiraz Edilir mi?",
    description: "Radar cezalarına itiraz gerekçeleri ve yöntemleri",
    icon: Scale,
    readTime: "7 dk",
    category: "Ceza",
    slug: "radar-cezasina-itiraz",
  },
  {
    id: "kusur-orani",
    title: "Kusur Oranına Nasıl İtiraz Edilir?",
    description: "Kaza sonrası kusur oranı belirleme ve itiraz süreci",
    icon: Shield,
    readTime: "9 dk",
    category: "Kaza",
    slug: "kusur-orani-itiraz",
  },
  {
    id: "sigorta-bildirim",
    title: "Sigorta Hasar Dosyası Nasıl Açılır?",
    description: "Kaza sonrası sigorta şirketine bildirim ve hasar süreci",
    icon: FileText,
    readTime: "5 dk",
    category: "Sigorta",
    slug: "sigorta-hasar-dosyasi",
  },
  {
    id: "deger-kaybi",
    title: "Araç Değer Kaybı Nedir?",
    description: "Değer kaybı hesaplama ve tazminat alma yöntemleri",
    icon: Car,
    readTime: "6 dk",
    category: "Tazminat",
    slug: "arac-deger-kaybi",
  },
  {
    id: "kacak-kaza",
    title: "Kazada Karşı Taraf Kaçarsa Ne Yapılır?",
    description: "Kaçak kaza durumunda yapılması gerekenler",
    icon: Shield,
    readTime: "5 dk",
    category: "Kaza",
    slug: "kacak-kaza-ne-yapilir",
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <Badge variant="navy" className="mb-4">
            Rehberler
          </Badge>
          <h1 className="mb-4 text-4xl font-bold text-navy">
            Trafik Hukuku Rehberleri
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Trafik kazası ve ceza itiraz süreçleriniz hakkında kapsamlı bilgilendirme
          </p>
        </div>

        {/* Featured Guide */}
        <Card className="mb-12 bg-gradient-to-r from-navy to-blue text-white">
          <CardContent className="p-8 md:flex md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <Badge variant="secondary" className="mb-4">Öne Çıkan</Badge>
              <h2 className="mb-2 text-2xl font-bold">
                Trafik Kazası Sonrası Yapılması Gerekenler
              </h2>
              <p className="mb-4 text-slate-200">
                Kaza sonrasında panik yapmadan yapmanız gereken adımları öğrenin
              </p>
              <Button variant="secondary" asChild>
                <Link href={`/rehberler/trafik-kazasi-sonrasi-ne-yapilir`}>
                  Rehberi Oku
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="hidden md:block">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white/10">
                <Car className="h-12 w-12" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guides Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Card key={guide.id} className="card-hover">
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-navy/10 text-navy">
                  <guide.icon className="h-7 w-7" />
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">{guide.category}</Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {guide.readTime}
                  </div>
                </div>
                <CardTitle className="text-lg">{guide.title}</CardTitle>
                <CardDescription>{guide.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" className="p-0 text-navy" asChild>
                  <Link href={`/rehberler/${guide.slug}`}>
                    Rehberi Oku
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Categories */}
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-navy">Kategorilere Göre Rehberler</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-blue/5 border-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue text-white">
                    <Car className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy">Kaza Rehberleri</h3>
                    <p className="text-sm text-muted-foreground">5 rehber</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-warning/5 border-warning/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning text-white">
                    <Scale className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy">Ceza Rehberleri</h3>
                    <p className="text-sm text-muted-foreground">3 rehber</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-success/5 border-success/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success text-white">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy">Sigorta ve Tazminat</h3>
                    <p className="text-sm text-muted-foreground">2 rehber</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <Card className="mt-16 bg-gradient-to-r from-navy/5 to-blue/5">
          <CardContent className="p-8 text-center">
            <MessageCircle className="mx-auto mb-4 h-12 w-12 text-navy" />
            <h3 className="mb-2 text-xl font-bold text-navy">Hâlâ sorularınız mı var?</h3>
            <p className="mb-4 text-muted-foreground">
              Rehberlerimizde cevap bulamadığınız sorular için uzmanlarımıza sorabilirsiniz
            </p>
            <Button asChild>
              <Link href={ROUTES.QUESTIONS}>
                Uzmanına Sor
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
