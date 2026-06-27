"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ROUTES, OBJECTION_REASONS, DOCUMENT_TYPES, LEGAL_DISCLAIMER } from "@/lib/constants";
import { useFineAnalysisStore } from "@/store";
import {
  Scale,
  AlertTriangle,
  CheckCircle,
  Info,
  ArrowRight,
  Download,
  Printer,
  Share2,
  FileText,
  Camera,
  Users,
  Calendar,
  DollarSign,
  MapPin,
  AlertCircle,
  Check,
  ChevronRight,
  Clock,
  Shield,
} from "lucide-react";

export default function FineAnalysisResultPage() {
  const { formData, analysisResult } = useFineAnalysisStore();

  if (!formData) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Card className="mx-auto max-w-2xl p-8 text-center">
            <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-warning" />
            <h2 className="mb-2 text-xl font-bold">Analiz Bulunamadı</h2>
            <p className="mb-4 text-muted-foreground">
              Analiz sonucu bulunamadı. Lütfen önce ceza bilgilerinizi girin.
            </p>
            <Button asChild>
              <Link href={ROUTES.FINE_ANALYSIS}>Ceza Analizi Yap</Link>
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const data = formData as Record<string, unknown>;
  const fineDate = data.fine_date as string;
  const notificationDate = data.notification_date as string;
  const fineAmount = data.fine_amount as string;
  const articleNumber = data.article_number as string;
  const location = data.location as string;
  const issuedTo = data.issued_to as string;
  const selectedReasons = (data.selectedReasons as string[]) || [];

  // Calculate deadline
  const notifyDate = new Date(notificationDate);
  const deadline = new Date(notifyDate);
  deadline.setDate(deadline.getDate() + 15);
  
  const today = new Date();
  const diffTime = deadline.getTime() - today.getTime();
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Determine analysis result
  const getAnalysisResult = () => {
    if (selectedReasons.length === 0) {
      return {
        status: "low",
        title: "Zayıf İtiraz Potansiyeli",
        description: "Seçtiğiniz gerekçelere göre itiraz şansı düşük görünüyor.",
        color: "error",
        icon: AlertTriangle,
      };
    } else if (selectedReasons.length === 1) {
      return {
        status: "medium",
        title: "Orta İtiraz Potansiyeli",
        description: "Seçtiğiniz gerekçe ile itiraz edilebilir, ancak ek delil faydalı olabilir.",
        color: "warning",
        icon: Info,
      };
    } else {
      return {
        status: "high",
        title: "Güçlü İtiraz Potansiyeli",
        description: "Seçtiğiniz gerekçeler itiraz için güçlü bir temel oluşturuyor.",
        color: "success",
        icon: CheckCircle,
      };
    }
  };

  const result = getAnalysisResult();

  // Get selected reason details
  const getSelectedReasonDetails = () => {
    return selectedReasons.map((reason) => {
      const reasonDetail = OBJECTION_REASONS.find((r) => r.category === reason);
      return reasonDetail;
    }).filter(Boolean);
  };

  const reasonDetails = getSelectedReasonDetails();

  // Required documents
  const getRequiredDocuments = () => {
    const docs: { name: string; required: boolean; description: string }[] = [
      { name: "Trafik İdari Para Cezası Karar Tutanağı", required: true, description: "Ceza tutanağının aslı veya onaylı fotokopisi" },
      { name: "Kimlik Fotokopisi", required: true, description: "T.C. kimlik kartı fotokopisi" },
    ];

    if (issuedTo === "plate") {
      docs.push({ name: "Araç Ruhsat Fotokopisi", required: true, description: "Araç tescil belgesi fotokopisi" });
    }

    if (selectedReasons.includes("plaka_yanlis")) {
      docs.push({ name: "Plaka Fotoğrafı", required: true, description: "Aracın ve plakasının net fotoğrafı" });
    }

    if (selectedReasons.includes("tebligat_sorunu")) {
      docs.push({ name: "Tebligat Belgesi", required: true, description: "PTT tebligat belgesi" });
    }

    if (selectedReasons.includes("radar_olcum")) {
      docs.push({ name: "Radar Kalibrasyon Belgesi", required: false, description: "Radar cihazının kalibrasyon belgesi (kurumdan talep edilebilir)" });
    }

    if (selectedReasons.includes("satis_sonrasi")) {
      docs.push({ name: "Satış Sözleşmesi", required: true, description: "Araç satış sözleşmesi" });
    }

    return docs;
  };

  const requiredDocs = getRequiredDocuments();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <Badge variant="navy" className="mb-4">
              Ceza Analiz Sonucu
            </Badge>
            <h1 className="mb-2 text-3xl font-bold text-navy">
              Analiz Sonuçlarınız
            </h1>
            <p className="text-muted-foreground">
              Ceza bilgilerinize göre hazırlanan değerlendirme
            </p>
          </div>

          {/* Deadline Warning */}
          {daysRemaining > 0 && (
            <Card className="mb-8 border-l-4 border-l-error">
              <CardContent className="flex items-center gap-4 p-4">
                <AlertTriangle className="h-8 w-8 text-error" />
                <div>
                  <div className="font-semibold text-error">
                    Dikkat! İtiraz için {daysRemaining} gününüz var
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Son tarih: {deadline.toLocaleDateString("tr-TR")}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analysis Result Card */}
          <Card className={`mb-8 border-2 ${
            result.status === "high" ? "border-success" :
            result.status === "medium" ? "border-warning" : "border-error"
          }`}>
            <CardHeader className={`${
              result.status === "high" ? "bg-success/5" :
              result.status === "medium" ? "bg-warning/5" : "bg-error/5"
            }`}>
              <div className="flex items-center gap-4">
                <div className={`flex h-16 w-16 items-center justify-center rounded-full ${
                  result.status === "high" ? "bg-success/10 text-success" :
                  result.status === "medium" ? "bg-warning/10 text-warning" : "bg-error/10 text-error"
                }`}>
                  <result.icon className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle className={`text-2xl ${
                    result.status === "high" ? "text-success" :
                    result.status === "medium" ? "text-warning" : "text-error"
                  }`}>
                    {result.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {result.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Ceza Tarihi</div>
                    <div className="font-medium">{new Date(fineDate).toLocaleDateString("tr-TR")}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Ceza Tutarı</div>
                    <div className="font-medium">{Number(fineAmount).toLocaleString("tr-TR")} TL</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Ceza Maddesi</div>
                    <div className="font-medium">{articleNumber}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Gün Kaldı</div>
                    <div className="font-medium">{daysRemaining} gün</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selected Reasons */}
          {reasonDetails.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Seçilen İtiraz Gerekçeleri
                </CardTitle>
                <CardDescription>
                  İtirazınızda kullanabileceğiniz gerekçeler
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reasonDetails.map((reason, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <h4 className="font-semibold text-navy">{reason?.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{reason?.description}</p>
                      <div className="mt-3">
                        <p className="text-sm font-medium">Gerekli Belgeler:</p>
                        <ul className="mt-1 space-y-1">
                          {reason?.requiredDocuments?.map((doc, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <FileText className="h-4 w-4" />
                              {doc}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-3 rounded-lg bg-blue/5 p-3">
                        <p className="text-sm font-medium text-blue">Not:</p>
                        <p className="text-sm text-muted-foreground">{reason?.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Required Documents */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Gerekli Belgeler
              </CardTitle>
              <CardDescription>
                İtiraz dilekçenizle birlikte sunmanız gereken belgeler
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {requiredDocs.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-sm text-muted-foreground">{doc.description}</div>
                      </div>
                    </div>
                    {doc.required ? (
                      <Badge variant="error">Gerekli</Badge>
                    ) : (
                      <Badge variant="secondary">Opsiyonel</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Steps to Follow */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChevronRight className="h-5 w-5" />
                İzlenecek Adımlar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-navy text-white font-bold">1</div>
                  <div>
                    <p className="font-medium">Gerekli belgeleri hazırlayın</p>
                    <p className="text-sm text-muted-foreground">Yukarıdaki listedeki belgeleri eksiksiz hazırlayın</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-navy text-white font-bold">2</div>
                  <div>
                    <p className="font-medium">Dilekçenizi hazırlayın</p>
                    <p className="text-sm text-muted-foreground">Sistemin oluşturduğu dilekçe şablonunu kullanabilir veya kendi dilekçenizi yazabilirsiniz</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-navy text-white font-bold">3</div>
                  <div>
                    <p className="font-medium">Başvurunuzu yapın</p>
                    <p className="text-sm text-muted-foreground">Dilekçe ve belgeleri ilgili makama (trafik tescil şube veya sulh ceza hakimliği) teslim edin</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-navy text-white font-bold">4</div>
                  <div>
                    <p className="font-medium">Sonucu bekleyin</p>
                    <p className="text-sm text-muted-foreground">Başvurunuz değerlendirildikten sonra sonuç hakkında bilgilendirileceksiniz</p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="flex-1" asChild>
              <Link href={ROUTES.PETITION_BUILDER}>
                <FileText className="mr-2 h-5 w-5" />
                Dilekçe Oluştur
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              <Printer className="mr-2 h-5 w-5" />
              Yazdır
            </Button>
            <Button size="lg" variant="secondary" className="flex-1" asChild>
              <Link href={ROUTES.QUESTIONS}>
                <Info className="mr-2 h-5 w-5" />
                Uzman Sor
              </Link>
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 rounded-lg border border-warning/20 bg-warning/5 p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 text-warning" />
              <p className="text-sm text-muted-foreground">
                {LEGAL_DISCLAIMER}
              </p>
            </div>
          </div>

          {/* Expert CTA */}
          <Card className="mt-8 bg-gradient-to-r from-blue/10 to-navy/10">
            <CardContent className="p-6 text-center md:p-8">
              <h3 className="mb-2 text-xl font-bold text-navy">Profesyonel Destek Almak İster misiniz?</h3>
              <p className="mb-4 text-muted-foreground">
                Uzman ekibimiz dilekçenizi gözden geçirebilir ve ek tavsiyelerde bulunabilir
              </p>
              <Button asChild>
                <Link href={ROUTES.QUESTIONS}>
                  Uzman Desteği Al
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
