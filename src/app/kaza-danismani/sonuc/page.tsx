"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ROUTES, LEGAL_DISCLAIMER } from "@/lib/constants";
import { useAccidentWizardStore } from "@/store";
import {
  Car,
  CheckCircle,
  AlertTriangle,
  Phone,
  Camera,
  FileText,
  Users,
  Clock,
  MapPin,
  Heart,
  Shield,
  Download,
  Printer,
  Share2,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

export default function AccidentResultPage() {
  const { step1Data } = useAccidentWizardStore();
  const [showAllActions, setShowAllActions] = useState(false);

  const answers = (step1Data || {}) as Record<string, boolean>;

  // Determine case type and guidance
  const hasInjury = answers.has_injury === true;
  const isMaterialOnly = answers.is_material_only === true;
  const hasMultipleVehicles = answers.multiple_vehicles === true;
  const publicPropertyDamage = answers.public_property_damage === true;
  const missingDocs = answers.missing_insurance_or_license === true;
  const alcoholSuspected = answers.alcohol_suspected === true;
  const hasDispute = answers.dispute_between_parties === true;
  const publicVehicle = answers.public_vehicle_involved === true;
  const foreignPlate = answers.foreign_plate === true;
  const hitAndRun = answers.hit_and_run === true;

  // Categorize case
  const getCaseType = () => {
    if (hasInjury) return { label: "Yaralanmalı Kaza", color: "error", icon: Heart };
    if (hitAndRun) return { label: "Kaçak Kaza", color: "error", icon: AlertTriangle };
    if (publicPropertyDamage) return { label: "Kamu Malı Zararlı Kaza", color: "warning", icon: Shield };
    if (alcoholSuspected) return { label: "Alkol Şüpheli Kaza", color: "warning", icon: AlertTriangle };
    if (foreignPlate) return { label: "Yabancı Plakalı Araç İçeren Kaza", color: "warning", icon: MapPin };
    if (publicVehicle) return { label: "Kamu Aracı İçeren Kaza", color: "warning", icon: Shield };
    if (hasMultipleVehicles) return { label: "Çoklu Araç Kazası", color: "secondary", icon: Users };
    if (isMaterialOnly) return { label: "Maddi Hasarlı Kaza", color: "success", icon: Car };
    return { label: "Bilinmeyen Kaza Türü", color: "secondary", icon: Car };
  };

  const caseType = getCaseType();

  // Generate action items based on answers
  const getActions = () => {
    const immediate: { icon: typeof Phone; text: string; urgent?: boolean; done?: boolean }[] = [];
    const shortTerm: { icon: typeof Camera; text: string; done?: boolean }[] = [];
    const documentation: { icon: typeof FileText; text: string; done?: boolean }[] = [];
    const followUp: { icon: typeof Clock; text: string; done?: boolean }[] = [];

    if (hasInjury) {
      immediate.push({
        icon: Phone,
        text: "112 Acil Çağrı Merkezi'ni hemen arayın",
        urgent: true,
      });
      immediate.push({
        icon: Heart,
        text: "Yaralılara ilk müdahaleyi yapın veya yardım isteyin",
        urgent: true,
      });
    }

    if (hitAndRun) {
      immediate.push({
        icon: Phone,
        text: "Polisi (155) hemen arayın",
        urgent: true,
      });
      immediate.push({
        icon: Camera,
        text: "Olay yerini ve varsa kamera kayıtlarını araştırın",
      });
    }

    if (alcoholSuspected) {
      immediate.push({
        icon: AlertTriangle,
        text: "Polise haber verin, alkol testi talep edilebilir",
        urgent: true,
      });
    }

    if (!hasInjury && !hitAndRun) {
      immediate.push({
        icon: Car,
        text: "Araçları güvenli bir yere alın veya ikinci kazayı önleyin",
      });
    }

    shortTerm.push({
      icon: Camera,
      text: "Olay yerini farklı açılardan fotoğraflayın (ön, arka, yan, çarpışma noktası)",
    });

    shortTerm.push({
      icon: FileText,
      text: "Karşı tarafın plaka, sürücü belgesi ve sigorta bilgilerini alın",
    });

    if (isMaterialOnly && !hasMultipleVehicles && !hasDispute) {
      documentation.push({
        icon: FileText,
        text: "Kaza tespit tutanağını doldurun (2 nüsha)",
      });
    } else {
      documentation.push({
        icon: Phone,
        text: "Kolluk birimini (polis/trafik) olay yerine çağırın",
      });
    }

    shortTerm.push({
      icon: Users,
      text: "Görgü tanığı varsa iletişim bilgilerini kaydedin",
    });

    documentation.push({
      icon: Camera,
      text: "Araç hasarlarını detaylı fotoğraflayın",
    });

    if (missingDocs) {
      shortTerm.push({
        icon: Shield,
        text: "Sigorta ve ehliyet durumunu kontrol edin, gerekirse noter sorgusu yapın",
      });
    }

    followUp.push({
      icon: Phone,
      text: "Sigorta şirketine hasar bildiriminde bulunun",
    });

    followUp.push({
      icon: FileText,
      text: "Kaza tespit tutanağını imzalayın ve bir kopyasını alın",
    });

    followUp.push({
      icon: Clock,
      text: "Tıbbi rapor ve faturaları muhafaza edin",
    });

    followUp.push({
      icon: FileText,
      text: "Gerekli belgeleri eksiksiz saklayın",
    });

    return { immediate, shortTerm, documentation, followUp };
  };

  const actions = getActions();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <Badge
              variant={caseType.color as "error" | "warning" | "success" | "secondary" | "navy"}
              className="mb-4 px-4 py-1"
            >
              <caseType.icon className="mr-1 h-4 w-4" />
              {caseType.label}
            </Badge>
            <h1 className="mb-2 text-3xl font-bold text-navy">
              Kaza Sonrası Yapmanız Gerekenler
            </h1>
            <p className="text-muted-foreground">
              Durumunuza özel hazırlanmış adım adım rehber
            </p>
          </div>

          {/* Case Summary */}
          <Card className="mb-8 border-2 border-navy/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-success" />
                Durum Analizi
              </CardTitle>
              <CardDescription>
                Verdiğiniz bilgilere göre kaza türünüz belirlendi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    hasInjury ? "bg-error/10 text-error" : "bg-success/10 text-success"
                  }`}>
                    <Heart className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Yaralanma Durumu</div>
                    <div className="font-medium">{hasInjury ? "Yaralı var" : "Yaralanma yok"}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    hasMultipleVehicles ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
                  }`}>
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Araç Sayısı</div>
                    <div className="font-medium">{hasMultipleVehicles ? "Birden fazla" : "Tek araç"}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    hitAndRun ? "bg-error/10 text-error" : "bg-success/10 text-success"
                  }`}>
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Kaçak Durumu</div>
                    <div className="font-medium">{hitAndRun ? "Kaçak var" : "Kaçak yok"}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    hasDispute ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
                  }`}>
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Anlaşma Durumu</div>
                    <div className="font-medium">{hasDispute ? "Anlaşmazlık var" : "Anlaşma sağlandı"}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Items */}
          <div className="space-y-6">
            {/* Immediate Actions */}
            {actions.immediate.length > 0 && (
              <Card className="border-l-4 border-l-error">
                <CardHeader className="bg-error/5">
                  <CardTitle className="flex items-center gap-2 text-error">
                    <AlertTriangle className="h-5 w-5" />
                    Acil Yapılması Gerekenler
                  </CardTitle>
                  <CardDescription>
                    Bu adımları hemen uygulayın
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-3">
                    {actions.immediate.map((action, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-error/10 text-error">
                          <span className="text-xs font-bold">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <span className={action.urgent ? "font-medium" : ""}>{action.text}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Short Term Actions */}
            <Card className="border-l-4 border-l-warning">
              <CardHeader className="bg-warning/5">
                <CardTitle className="flex items-center gap-2 text-warning">
                  <Clock className="h-5 w-5" />
                  Olay Yerinde Yapılacaklar
                </CardTitle>
                <CardDescription>
                  Olay yerindeyken bu adımları uygulayın
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  {actions.shortTerm.map((action, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-warning/10 text-warning">
                        <span className="text-xs font-bold">{index + 1}</span>
                      </div>
                      <span>{action.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Documentation */}
            <Card className="border-l-4 border-l-blue">
              <CardHeader className="bg-blue/5">
                <CardTitle className="flex items-center gap-2 text-blue">
                  <FileText className="h-5 w-5" />
                  Belgelendirme
                </CardTitle>
                <CardDescription>
                  Toplamanız ve saklamanız gereken belgeler
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  {actions.documentation.map((action, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue" />
                      <span>{action.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Follow Up */}
            <Card className="border-l-4 border-l-success">
              <CardHeader className="bg-success/5">
                <CardTitle className="flex items-center gap-2 text-success">
                  <Clock className="h-5 w-5" />
                  Sonraki Adımlar
                </CardTitle>
                <CardDescription>
                  Kazadan sonra yapmanız gerekenler
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  {actions.followUp.map((action, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
                      <span>{action.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="flex-1" asChild>
              <Link href={ROUTES.PETITION_BUILDER}>
                <FileText className="mr-2 h-5 w-5" />
                Dilekçe Oluştur
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="flex-1" asChild>
              <Link href={ROUTES.ACCIDENT_DIAGRAM}>
                <Car className="mr-2 h-5 w-5" />
                Kaza Krokisi Çiz
              </Link>
            </Button>
            <Button size="lg" variant="secondary" className="flex-1" asChild>
              <Link href={ROUTES.FINE_ANALYSIS}>
                <AlertTriangle className="mr-2 h-5 w-5" />
                Ceza Analizi Yap
              </Link>
            </Button>
          </div>

          {/* Export/Share */}
          <Card className="mt-8">
            <CardContent className="flex flex-col items-center justify-between gap-4 p-4 md:flex-row">
              <div className="flex items-center gap-3">
                <Printer className="h-8 w-8 text-muted-foreground" />
                <div>
                  <div className="font-medium">Bu rehberi kaydedin</div>
                  <div className="text-sm text-muted-foreground">
                    Daha sonra tekrar erişmek veya yazdırmak için
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Printer className="mr-2 h-4 w-4" />
                  Yazdır
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  PDF İndir
                </Button>
                <Button variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Paylaş
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <div className="mt-8 rounded-lg border border-warning/20 bg-warning/5 p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 text-warning" />
              <p className="text-sm text-muted-foreground">
                {LEGAL_DISCLAIMER}
              </p>
            </div>
          </div>

          {/* CTA */}
          <Card className="mt-8 bg-gradient-to-r from-navy to-blue text-white">
            <CardContent className="p-6 text-center md:p-8">
              <h3 className="mb-2 text-xl font-bold">Profesyonel Destek Alın</h3>
              <p className="mb-4 text-slate-200">
                Bu süreçte size yardımcı olacak uzman ekibimiz hazır
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href={ROUTES.QUESTIONS}>
                  Uzman Soru Sor
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
