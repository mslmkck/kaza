"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ROUTES, OBJECTION_REASONS, LEGAL_DISCLAIMER } from "@/lib/constants";
import { useFineAnalysisStore } from "@/store";
import {
  Scale,
  AlertTriangle,
  CheckCircle,
  Info,
  ArrowRight,
  ArrowLeft,
  Upload,
  FileText,
  Loader2,
  X,
  Camera,
  Radio,
  MapPin,
  Calendar,
  DollarSign,
} from "lucide-react";

const fineAnalysisSchema = z.object({
  fine_date: z.string().min(1, "Ceza tarihi gereklidir"),
  notification_date: z.string().min(1, "Tebliğ tarihi gereklidir"),
  fine_amount: z.string().min(1, "Ceza tutarı gereklidir"),
  article_number: z.string().min(1, "Ceza maddesi gereklidir"),
  fine_series_number: z.string().optional(),
  issued_to: z.enum(["plate", "driver"]),
  location: z.string().min(1, "Ceza yeri gereklidir"),
  description: z.string().optional(),
  has_radar_camera: z.boolean(),
  notification_method: z.string(),
  owner_is_driver: z.boolean(),
  objection_reason: z.string().min(1, "İtiraz gerekçesi gereklidir"),
});

type FineAnalysisForm = z.infer<typeof fineAnalysisSchema>;

export default function FineAnalysisPage() {
  const router = useRouter();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const { setFormData, setAnalysisResult } = useFineAnalysisStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FineAnalysisForm>({
    resolver: zodResolver(fineAnalysisSchema),
    defaultValues: {
      issued_to: "plate",
      has_radar_camera: false,
      owner_is_driver: true,
    },
  });

  const watchIssuedTo = watch("issued_to");
  const watchNotificationMethod = watch("notification_method");

  const toggleReason = (reason: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  };

  const onSubmit = async (data: FineAnalysisForm) => {
    setIsAnalyzing(true);
    
    // Simulate analysis
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const analysis = {
      ...data,
      selectedReasons,
      analysisDate: new Date().toISOString(),
      confidenceLevel: "medium" as const,
      recommendation: selectedReasons.length > 0 ? "Güçlü itiraz potansiyeli" : "Zayıf itiraz potansiyeli",
    };

    setFormData(analysis);
    setAnalysisResult(analysis);
    setIsAnalyzing(false);
    router.push("/ceza-analizi/sonuc");
  };

  // Calculate days remaining
  const calculateDaysRemaining = () => {
    const notificationDate = watch("notification_date");
    if (!notificationDate) return null;
    
    const notifyDate = new Date(notificationDate);
    const deadline = new Date(notifyDate);
    deadline.setDate(deadline.getDate() + 15);
    
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const daysRemaining = calculateDaysRemaining();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <Badge variant="navy" className="mb-4">
              Trafik Ceza Analizi
            </Badge>
            <h1 className="mb-2 text-3xl font-bold text-navy">
              Trafik Cezanızı Analiz Edelim
            </h1>
            <p className="text-muted-foreground">
              Ceza bilgilerinizi girin, itiraz edilebilirliğini öğrenin
            </p>
          </div>

          {/* Deadline Warning */}
          {daysRemaining !== null && daysRemaining > 0 && (
            <Card className="mb-8 border-l-4 border-l-error">
              <CardContent className="flex items-center gap-4 p-4">
                <AlertTriangle className="h-8 w-8 text-error" />
                <div>
                  <div className="font-semibold text-error">
                    Dikkat! İtiraz için {daysRemaining} gününüz var
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Tebliğ tarihinden itibaren 15 gün içinde itiraz edilebilir
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Basic Information */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Ceza Bilgileri
                </CardTitle>
                <CardDescription>
                  Ceza tutanağınızdaki bilgileri girin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fine_date">Ceza Tarihi</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="fine_date"
                        type="date"
                        className="pl-10"
                        {...register("fine_date")}
                      />
                    </div>
                    {errors.fine_date && (
                      <p className="text-sm text-error">{errors.fine_date.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notification_date">Tebliğ Tarihi</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="notification_date"
                        type="date"
                        className="pl-10"
                        {...register("notification_date")}
                      />
                    </div>
                    {errors.notification_date && (
                      <p className="text-sm text-error">{errors.notification_date.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fine_amount">Ceza Tutarı (TL)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="fine_amount"
                        type="number"
                        placeholder="ör: 1500"
                        className="pl-10"
                        {...register("fine_amount")}
                      />
                    </div>
                    {errors.fine_amount && (
                      <p className="text-sm text-error">{errors.fine_amount.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="article_number">Ceza Maddesi</Label>
                    <Input
                      id="article_number"
                      placeholder="ör: 76/2-b"
                      {...register("article_number")}
                    />
                    {errors.article_number && (
                      <p className="text-sm text-error">{errors.article_number.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fine_series_number">Tutanak Seri ve Sıra No</Label>
                  <Input
                    id="fine_series_number"
                    placeholder="varsa"
                    {...register("fine_series_number")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Ceza Düzenlenen Konum</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="ör: İstanbul, Kadıköy, Bağdat Caddesi"
                      className="pl-10"
                      {...register("location")}
                    />
                  </div>
                  {errors.location && (
                    <p className="text-sm text-error">{errors.location.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Ceza Kime Düzenlendi?</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="plate"
                        {...register("issued_to")}
                        className="h-4 w-4"
                      />
                      <span>Plakaya</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="driver"
                        {...register("issued_to")}
                        className="h-4 w-4"
                      />
                      <span>Sürücüye</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Ceza Açıklaması</Label>
                  <Textarea
                    id="description"
                    placeholder="Ceza tutanağındaki açıklamayı buraya yazabilirsiniz"
                    rows={3}
                    {...register("description")}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Technical Details */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Radio className="h-5 w-5" />
                  Ceza Türü
                </CardTitle>
                <CardDescription>
                  Ceza türüyle ilgili bilgiler
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Ceza nasıl tespit edildi?</Label>
                  <div className="grid gap-2 md:grid-cols-3">
                    {[
                      { value: "radar", label: "Radar" },
                      { value: "camera", label: "Kamera" },
                      { value: "manual", label: "Polis/Trafik" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-2 rounded-lg border p-3 hover:bg-slate-50"
                      >
                        <input
                          type="radio"
                          value={option.value}
                          {...register("notification_method")}
                          className="h-4 w-4"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Araç sahibi sürücü mü?</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="true"
                        {...register("owner_is_driver")}
                        className="h-4 w-4"
                      />
                      <span>Evet, aynı kişi</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="false"
                        {...register("owner_is_driver")}
                        className="h-4 w-4"
                      />
                      <span>Hayır, farklı kişi</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Objection Reasons */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  İtiraz Gerekçeleri
                </CardTitle>
                <CardDescription>
                  Durumunuzla ilgili gerekçeleri seçin (birden fazla seçebilirsiniz)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  {OBJECTION_REASONS.map((reason) => (
                    <button
                      key={reason.category}
                      type="button"
                      onClick={() => toggleReason(reason.category)}
                      className={`flex items-start gap-3 rounded-lg border-2 p-3 text-left transition-all ${
                        selectedReasons.includes(reason.category)
                          ? "border-blue bg-blue/5"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border ${
                        selectedReasons.includes(reason.category)
                          ? "border-blue bg-blue text-white"
                          : "border-slate-300"
                      }`}>
                        {selectedReasons.includes(reason.category) && (
                          <CheckCircle className="h-3 w-3" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{reason.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {reason.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Ek Bilgiler
                </CardTitle>
                <CardDescription>
                  Başka belirtmek istediğiniz bir şey var mı?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Ceza ile ilgili ek bilgiler, açıklamalar..."
                  rows={4}
                  {...register("objection_reason")}
                />
                {errors.objection_reason && (
                  <p className="mt-2 text-sm text-error">{errors.objection_reason.message}</p>
                )}
              </CardContent>
            </Card>

            {/* Document Upload */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Belge Yükleme (Opsiyonel)
                </CardTitle>
                <CardDescription>
                  Ceza tutanağı veya diğer belgeleri yükleyin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center">
                  <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    Ceza tutanağınızı sürükleyip bırakın veya
                  </p>
                  <Button variant="outline" size="sm">
                    Dosya Seçin
                  </Button>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Desteklenen formatlar: JPG, PNG, PDF (Maks. 10MB)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button variant="outline" asChild>
                <Link href={ROUTES.HOME}>İptal</Link>
              </Button>
              <Button type="submit" disabled={isAnalyzing}>
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analiz Yapılıyor...
                  </>
                ) : (
                  <>
                    Analiz Yap
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>

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
