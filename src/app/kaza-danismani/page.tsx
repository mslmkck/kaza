"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ROUTES, ACCIDENT_TYPES, LEGAL_DISCLAIMER } from "@/lib/constants";
import { useAccidentWizardStore } from "@/store";
import {
  Car,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Phone,
  FileText,
  Camera,
  Users,
  Shield,
  Clock,
  MapPin,
  Heart,
  AlertCircle,
  Info,
  ChevronRight,
} from "lucide-react";

const questions = [
  {
    id: "has_injury",
    question: "Kazada yaralanan kişi var mı?",
    description: "Sürücü, yolcu veya yayada herhangi bir yaralanma oldu mu?",
    icon: Heart,
    urgent: true,
    options: [
      { value: true, label: "Evet, yaralı var", color: "error" },
      { value: false, label: "Hayır, yaralanma yok", color: "success" },
    ],
  },
  {
    id: "is_material_only",
    question: "Kaza yalnızca maddi hasarlı mı?",
    description: "Sadece araçlarda hasar var, yaralı veya ölüm yok",
    icon: Car,
    options: [
      { value: true, label: "Evet, sadece maddi hasar", color: "success" },
      { value: false, label: "Hayır, başka hasarlar da var", color: "warning" },
    ],
  },
  {
    id: "multiple_vehicles",
    question: "Birden fazla araç mı karıştı?",
    description: "Kaç araç kazaya karıştı?",
    icon: Users,
    options: [
      { value: true, label: "Evet, 2 veya daha fazla araç", color: "warning" },
      { value: false, label: "Hayır, tek araç", color: "success" },
    ],
  },
  {
    id: "public_property_damage",
    question: "Kamu malına zarar verildi mi?",
    description: "Trafik lambası, yol, bariyer gibi kamu mallarına zarar var mı?",
    icon: Shield,
    options: [
      { value: true, label: "Evet", color: "warning" },
      { value: false, label: "Hayır", color: "success" },
    ],
  },
  {
    id: "missing_insurance_or_license",
    question: "Araçlardan birinin sigortası veya ehliyeti yok mu?",
    description: "Karşı tarafta veya sizde sigorta veya ehliyet sorunu olabilir",
    icon: AlertTriangle,
    options: [
      { value: true, label: "Evet, sorun olabilir", color: "error" },
      { value: false, label: "Hayır, her şey normal", color: "success" },
    ],
  },
  {
    id: "alcohol_suspected",
    question: "Sürücülerden biri alkollü olabilir mi?",
    description: "Kazaya karışan sürücülerden herhangi birinde alkol şüphesi var mı?",
    icon: AlertCircle,
    options: [
      { value: true, label: "Evet, şüpheleniyorum", color: "error" },
      { value: false, label: "Hayır", color: "success" },
    ],
  },
  {
    id: "dispute_between_parties",
    question: "Taraflar arasında anlaşmazlık var mı?",
    description: "Kaza tespit tutanağında anlaşma sağlanamadı mı?",
    icon: Users,
    options: [
      { value: true, label: "Evet, anlaşma yok", color: "warning" },
      { value: false, label: "Hayır, her şey açık", color: "success" },
    ],
  },
  {
    id: "public_vehicle_involved",
    question: "Kazaya karışan araçlardan biri kamu aracı mı?",
    description: "Polis, ambulans, itfaiye veya belediye aracı gibi",
    icon: Shield,
    options: [
      { value: true, label: "Evet", color: "warning" },
      { value: false, label: "Hayır", color: "success" },
    ],
  },
  {
    id: "foreign_plate",
    question: "Yabancı plakalı araç var mı?",
    description: "Türkiye plakası olmayan araç kazaya karıştı mı?",
    icon: MapPin,
    options: [
      { value: true, label: "Evet", color: "warning" },
      { value: false, label: "Hayır", color: "success" },
    ],
  },
  {
    id: "hit_and_run",
    question: "Araçlardan biri olay yerinden kaçtı mı?",
    description: "Karşı taraf kaçtı veya kimliği belirsiz mi?",
    icon: AlertTriangle,
    urgent: true,
    options: [
      { value: true, label: "Evet, kaçak var", color: "error" },
      { value: false, label: "Hayır", color: "success" },
    ],
  },
];

export default function AccidentWizardPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const { setStep1Data, setCurrentStep: setStoreStep } = useAccidentWizardStore();

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (value: boolean) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (isLastStep) {
      // Save answers and navigate to result
      setStep1Data(answers);
      setStoreStep(1);
      router.push("/kaza-danismani/sonuc");
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const canProceed = answers[currentQuestion.id] !== undefined;

  // Determine guidance based on answers
  const getGuidance = () => {
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

    const actions: { icon: typeof AlertTriangle; text: string; urgent?: boolean }[] = [];

    if (hasInjury) {
      actions.push({
        icon: Phone,
        text: "112 Acil Çağrı Merkezi'ni hemen arayın",
        urgent: true,
      });
      actions.push({
        icon: Heart,
        text: "Yaralılara ilk müdahaleyi yapın veya yardım isteyin",
        urgent: true,
      });
    }

    if (hitAndRun) {
      actions.push({
        icon: AlertTriangle,
        text: "Polisi (155) hemen arayın",
        urgent: true,
      });
      actions.push({
        icon: Camera,
        text: "Olay yerini ve varsa kamera kayıtlarını araştırın",
      });
    }

    if (alcoholSuspected) {
      actions.push({
        icon: AlertTriangle,
        text: "Polise haber verin, alkol testi talep edilebilir",
        urgent: true,
      });
    }

    if (!hasInjury && !hitAndRun) {
      actions.push({
        icon: Car,
        text: "Araçları güvenli bir yere alın veya ikinci kazayı önleyin",
      });
    }

    actions.push({
      icon: Camera,
      text: "Olay yerini farklı açılardan fotoğraflayın",
    });

    actions.push({
      icon: FileText,
      text: "Karşı tarafın plaka, sürücü belgesi ve sigorta bilgilerini alın",
    });

    if (isMaterialOnly && !hasMultipleVehicles) {
      actions.push({
        icon: FileText,
        text: "Kaza tespit tutanağı doldurun",
      });
    } else {
      actions.push({
        icon: Phone,
        text: "Kolluk birimini (polis/trafik) olay yerine çağırın",
      });
    }

    actions.push({
      icon: Users,
      text: "Görgü tanığı varsa iletişim bilgilerini kaydedin",
    });

    return actions;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <Badge variant="navy" className="mb-4">
              Kaza Danışmanı
            </Badge>
            <h1 className="mb-2 text-3xl font-bold text-navy">
              Kaza Sonrası Yapmanız Gerekenler
            </h1>
            <p className="text-muted-foreground">
              Sorularımıza cevap verin, size özel yönlendirme alın
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Adım {currentStep + 1} / {questions.length}</span>
              <span>{Math.round(progress)}% tamamlandı</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
              <div
                className="h-2 rounded-full bg-navy transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${currentQuestion.urgent ? "bg-error/10 text-error" : "bg-blue/10 text-blue"}`}>
                  <currentQuestion.icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
                  <CardDescription>{currentQuestion.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value.toString()}
                    onClick={() => handleAnswer(option.value)}
                    className={`flex items-center justify-between rounded-lg border-2 p-4 text-left transition-all ${
                      answers[currentQuestion.id] === option.value
                        ? option.color === "error"
                          ? "border-error bg-error/5"
                          : option.color === "warning"
                          ? "border-warning bg-warning/5"
                          : "border-success bg-success/5"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span className="font-medium">{option.label}</span>
                    {answers[currentQuestion.id] === option.value && (
                      <CheckCircle className={`h-5 w-5 ${
                        option.color === "error" ? "text-error" : 
                        option.color === "warning" ? "text-warning" : "text-success"
                      }`} />
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Geri
            </Button>

            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => router.push("/kaza-danismani/sonuc")}>
                Sonucu Gör
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button onClick={handleNext} disabled={!canProceed}>
                {isLastStep ? "Sonucu Gör" : "Devam"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Actions Preview */}
          {Object.keys(answers).length > 0 && (
            <Card className="mt-8 bg-gradient-to-r from-blue/5 to-navy/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Info className="h-5 w-5 text-blue" />
                  Şimdiye Kadar Belirlenen Eylemler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {getGuidance().slice(0, 5).map((action, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <action.icon className={`h-4 w-4 ${action.urgent ? "text-error" : "text-navy"}`} />
                      <span className={action.urgent ? "font-medium" : ""}>{action.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Disclaimer */}
          <div className="mt-8 rounded-lg border border-warning/20 bg-warning/5 p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 text-warning" />
              <p className="text-sm text-muted-foreground">
                {LEGAL_DISCLAIMER}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
