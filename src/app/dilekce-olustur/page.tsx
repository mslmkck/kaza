"use client";

import { useState, useEffect } from "react";
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
import { ROUTES, LEGAL_DISCLAIMER } from "@/lib/constants";
import { usePetitionBuilderStore, useFineAnalysisStore } from "@/store";
import {
  FileText,
  Download,
  Printer,
  FileJson,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Eye,
  Edit,
  Save,
  RefreshCw,
} from "lucide-react";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";

const petitionSchema = z.object({
  // Authority
  authority: z.string().min(1, "Başvuru makamı gereklidir"),
  
  // Applicant Info
  applicant_name: z.string().min(2, "Ad soyad gereklidir"),
  applicant_tc: z.string().regex(/^[0-9]{11}$/, "Geçerli T.C. kimlik numarası girin"),
  applicant_address: z.string().min(1, "Adres gereklidir"),
  applicant_phone: z.string().min(1, "Telefon gereklidir"),
  applicant_email: z.string().email("Geçerli e-posta adresi girin").or(z.string().min(0)),
  
  // Vehicle Info
  plate_number: z.string().min(1, "Plaka gereklidir"),
  
  // Fine Info
  fine_number: z.string().optional(),
  fine_date: z.string().min(1, "Ceza tarihi gereklidir"),
  notification_date: z.string().optional(),
  fine_amount: z.string().optional(),
  article_number: z.string().optional(),
  
  // Content
  incident_description: z.string().min(1, "Olay açıklaması gereklidir"),
  objection_reasons: z.string().min(1, "İtiraz gerekçeleri gereklidir"),
  legal_basis: z.string().optional(),
  evidence: z.string().optional(),
  
  // Request
  request: z.string().min(1, "Talep bölümü gereklidir"),
});

type PetitionForm = z.infer<typeof petitionSchema>;

export default function PetitionBuilderPage() {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "preview">("form");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPetition, setGeneratedPetition] = useState<string>("");
  const { formData: fineData } = useFineAnalysisStore();
  const { setFormData, setGeneratedContent } = usePetitionBuilderStore();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PetitionForm>({
    resolver: zodResolver(petitionSchema),
    defaultValues: {
      authority: "Trafik Denetimi Şube Müdürlüğü",
      fine_date: new Date().toISOString().split("T")[0],
    },
  });

  // Auto-fill from fine analysis if available
  useEffect(() => {
    if (fineData) {
      const data = fineData as Record<string, unknown>;
      if (data.fine_date) setValue("fine_date", data.fine_date as string);
      if (data.fine_amount) setValue("fine_amount", data.fine_amount as string);
      if (data.article_number) setValue("article_number", data.article_number as string);
      if (data.location) setValue("fine_number", data.location as string);
    }
  }, [fineData, setValue]);

  const onSubmit = async (data: PetitionForm) => {
    setIsGenerating(true);
    
    // Generate petition content
    const petitionContent = generatePetitionContent(data);
    setGeneratedPetition(petitionContent);
    setFormData(data);
    setGeneratedContent(petitionContent);
    
    setIsGenerating(false);
    setStep("preview");
  };

  const generatePetitionContent = (data: PetitionForm): string => {
    const currentDate = new Date().toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const fineDateFormatted = data.fine_date 
      ? new Date(data.fine_date).toLocaleDateString("tr-TR")
      : "";

    return `
T.C.
${data.authority}
İl Müdürlüğü

Konu: Trafik İdari Para Cezasına İtiraz

${currentDate}

İş bu dilekçemiz ile;
T.C. Kimlik No: ${data.applicant_tc}
Ad Soyad: ${data.applicant_name}
Adres: ${data.applicant_address}
Telefon: ${data.applicant_phone}
${data.applicant_email ? `E-posta: ${data.applicant_email}` : ""}

Plaka: ${data.plate_number}

tarafımdan ${fineDateFormatted} tarihinde ${data.fine_amount || "belirtilen"} tutarında kesilen trafik idari para cezasına itiraz etmek istiyorum.

OLAYIN AÇIKLAMASI:
${data.incident_description}

İTİRAZ GEREKÇELERİM:
${data.objection_reasons}

${data.legal_basis ? `HUKUKİ DAYANAK:\n${data.legal_basis}` : ""}

${data.evidence ? `DELİLLER:\n${data.evidence}` : ""}

TALEP VE SONUÇ:
${data.request}

Yukarıda açıklanan nedenlerle;
${data.fine_amount ? `${data.fine_amount} TL tutarındaki` : "İlgili"} trafik idari para cezasının iptaline karar verilmesini saygılarımla arz ederim.

İmza
${data.applicant_name}
    `.trim();
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const lines = generatedPetition.split("\n");
    
    doc.setFont("helvetica");
    doc.setFontSize(11);
    
    let y = 20;
    const lineHeight = 7;
    const pageHeight = 280;
    
    lines.forEach((line) => {
      if (y > pageHeight) {
        doc.addPage();
        y = 20;
      }
      
      // Handle indentation
      if (line.startsWith("T.C.") || line === data.authority) {
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
      } else if (line.startsWith("Konu:") || line.startsWith("İş bu")) {
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
      } else {
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
      }
      
      doc.text(line, 20, y);
      y += lineHeight;
    });
    
    doc.save("itiraz-dilekcesi.pdf");
  };

  const downloadWord = async () => {
    const data = watch();
    
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: "T.C.",
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            text: data.authority,
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Konu: ", bold: true }),
              new TextRun({ text: "Trafik İdari Para Cezasına İtiraz" }),
            ],
          }),
          new Paragraph({
            text: new Date().toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
            children: [
              new TextRun({ text: "T.C. Kimlik No: ", bold: true }),
              new TextRun({ text: data.applicant_tc }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Ad Soyad: ", bold: true }),
              new TextRun({ text: data.applicant_name }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Adres: ", bold: true }),
              new TextRun({ text: data.applicant_address }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Telefon: ", bold: true }),
              new TextRun({ text: data.applicant_phone }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Plaka: ", bold: true }),
              new TextRun({ text: data.plate_number }),
            ],
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
            children: [
              new TextRun({ text: "Olayın Açıklaması:", bold: true }),
            ],
          }),
          new Paragraph({
            text: data.incident_description,
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
            children: [
              new TextRun({ text: "İtiraz Gerekçelerim:", bold: true }),
            ],
          }),
          new Paragraph({
            text: data.objection_reasons,
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
            children: [
              new TextRun({ text: "Talep ve Sonuç:", bold: true }),
            ],
          }),
          new Paragraph({
            text: data.request,
          }),
          new Paragraph({ text: "" }),
          new Paragraph({ text: "" }),
          new Paragraph({ text: "İmza" }),
          new Paragraph({
            text: data.applicant_name,
          }),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "itiraz-dilekcesi.docx");
  };

  const data = watch();

  if (step === "preview") {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <Badge variant="success" className="mb-2">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Dilekçe Hazır
                </Badge>
                <h1 className="text-2xl font-bold text-navy">Dilekçeniz Hazır</h1>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep("form")}>
                  <Edit className="mr-2 h-4 w-4" />
                  Düzenle
                </Button>
                <Button onClick={downloadPDF}>
                  <Download className="mr-2 h-4 w-4" />
                  PDF İndir
                </Button>
                <Button variant="secondary" onClick={downloadWord}>
                  <FileJson className="mr-2 h-4 w-4" />
                  Word İndir
                </Button>
              </div>
            </div>

            {/* Petition Preview */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Dilekçe Önizleme
                </CardTitle>
                <CardDescription>
                  Dilekçenizi kontrol edin ve indirin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-slate-50 p-8 font-serif text-sm leading-relaxed whitespace-pre-wrap">
                  {generatedPetition}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="flex-1" onClick={downloadPDF}>
                <Download className="mr-2 h-5 w-5" />
                PDF Olarak İndir
              </Button>
              <Button size="lg" variant="outline" className="flex-1" onClick={downloadWord}>
                <FileJson className="mr-2 h-5 w-5" />
                Word Olarak İndir
              </Button>
              <Button size="lg" variant="secondary" className="flex-1" asChild>
                <Link href={ROUTES.QUESTIONS}>
                  Uzman Görüşü Al
                </Link>
              </Button>
            </div>

            {/* Instructions */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-lg">Sonraki Adımlar</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-navy text-sm text-white">1</span>
                    <span>Dilekçeyi PDF veya Word olarak indirin</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-navy text-sm text-white">2</span>
                    <span>Dilekçeyi ıslak imzalayın</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-navy text-sm text-white">3</span>
                    <span>Gerekli belgeleri ekleyin (ceza tutanağı, kimlik fotokopisi vb.)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-navy text-sm text-white">4</span>
                    <span>Trafik tescil şube müdürlüğüne veya sulh ceza hakimliğine teslim edin</span>
                  </li>
                </ol>
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
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-6 md:mb-8 text-center">
            <Badge variant="navy" className="mb-3 md:mb-4 text-xs md:text-sm">
              Dilekçe Oluşturucu
            </Badge>
            <h1 className="mb-2 text-2xl md:text-3xl font-bold text-navy">
              İtiraz Dilekçesi Hazırlayın
            </h1>
            <p className="text-muted-foreground">
              Formu doldurun, otomatik dilekçe oluşturun
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Applicant Info */}
            <Card className="mb-4 md:mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <FileText className="h-5 w-5" />
                  Başvuru Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="authority" className="text-sm">Başvuru Makamı</Label>
                  <Input
                    id="authority"
                    {...register("authority")}
                    className="text-base"
                  />
                  {errors.authority && (
                    <p className="text-sm text-error">{errors.authority.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="applicant_name" className="text-sm">Ad Soyad</Label>
                    <Input
                      id="applicant_name"
                      placeholder="Ad Soyad"
                      {...register("applicant_name")}
                      className="text-base"
                    />
                    {errors.applicant_name && (
                      <p className="text-sm text-error">{errors.applicant_name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="applicant_tc" className="text-sm">T.C. Kimlik No</Label>
                    <Input
                      id="applicant_tc"
                      placeholder="11 haneli T.C. kimlik no"
                      maxLength={11}
                      {...register("applicant_tc")}
                      className="text-base"
                    />
                    {errors.applicant_tc && (
                      <p className="text-sm text-error">{errors.applicant_tc.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="applicant_address" className="text-sm">Adres</Label>
                  <Textarea
                    id="applicant_address"
                    placeholder="Tam adresiniz"
                    rows={2}
                    {...register("applicant_address")}
                    className="text-base"
                  />
                  {errors.applicant_address && (
                    <p className="text-sm text-error">{errors.applicant_address.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="applicant_phone" className="text-sm">Telefon</Label>
                    <Input
                      id="applicant_phone"
                      placeholder="05XX XXX XX XX"
                      {...register("applicant_phone")}
                      className="text-base"
                    />
                    {errors.applicant_phone && (
                      <p className="text-sm text-error">{errors.applicant_phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="applicant_email">E-posta (Opsiyonel)</Label>
                    <Input
                      id="applicant_email"
                      type="email"
                      placeholder="ornek@email.com"
                      {...register("applicant_email")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vehicle and Fine Info */}
            <Card className="mb-4 md:mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <FileText className="h-5 w-5" />
                  Ceza Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="plate_number" className="text-sm">Araç Plakası</Label>
                  <Input
                    id="plate_number"
                    placeholder="34 ABC 123"
                    {...register("plate_number")}
                    className="text-base uppercase"
                  />
                  {errors.plate_number && (
                    <p className="text-sm text-error">{errors.plate_number.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fine_number" className="text-sm">Ceza Tutanağı No (varsa)</Label>
                    <Input
                      id="fine_number"
                      placeholder="Seri-Sıra"
                      {...register("fine_number")}
                      className="text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fine_date" className="text-sm">Ceza Tarihi</Label>
                    <Input
                      id="fine_date"
                      type="date"
                      {...register("fine_date")}
                      className="text-base"
                    />
                    {errors.fine_date && (
                      <p className="text-sm text-error">{errors.fine_date.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fine_amount" className="text-sm">Ceza Tutarı (TL)</Label>
                    <Input
                      id="fine_amount"
                      placeholder="ör: 1500"
                      {...register("fine_amount")}
                      className="text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="article_number" className="text-sm">Ceza Maddesi</Label>
                    <Input
                      id="article_number"
                      placeholder="ör: 76/2-b"
                      {...register("article_number")}
                      className="text-base"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content */}
            <Card className="mb-4 md:mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <FileText className="h-5 w-5" />
                  Dilekçe İçeriği
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="incident_description" className="text-sm">Olayın Açıklaması</Label>
                  <Textarea
                    id="incident_description"
                    placeholder="Olayı detaylı bir şekilde açıklayın..."
                    rows={5}
                    className="text-base"
                    {...register("incident_description")}
                  />
                  {errors.incident_description && (
                    <p className="text-sm text-error">{errors.incident_description.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="objection_reasons">İtiraz Gerekçeleri</Label>
                  <Textarea
                    id="objection_reasons"
                    placeholder="Neden itiraz ettiğinizi açıklayın..."
                    rows={5}
                    {...register("objection_reasons")}
                  />
                  {errors.objection_reasons && (
                    <p className="text-sm text-error">{errors.objection_reasons.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="legal_basis">Hukuki Dayanak (Opsiyonel)</Label>
                  <Textarea
                    id="legal_basis"
                    placeholder="İlgili mevzuat ve içtihatlar..."
                    rows={3}
                    {...register("legal_basis")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="evidence">Deliller (Opsiyonel)</Label>
                  <Textarea
                    id="evidence"
                    placeholder="Sunacağınız deliller..."
                    rows={3}
                    {...register("evidence")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="request">Talep ve Sonuç</Label>
                  <Textarea
                    id="request"
                    placeholder="Mahkemenizden veya makamınızdan ne istiyorsunuz?"
                    rows={4}
                    {...register("request")}
                  />
                  {errors.request && (
                    <p className="text-sm text-error">{errors.request.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:items-center sm:justify-between">
              <Button variant="outline" asChild className="w-full sm:w-auto justify-center">
                <Link href={ROUTES.HOME}>İptal</Link>
              </Button>
              <Button type="submit" disabled={isGenerating} className="w-full sm:w-auto justify-center">
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Oluşturuluyor...
                  </>
                ) : (
                  <>
                    Dilekçe Oluştur
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Disclaimer */}
          <div className="mt-6 md:mt-8 rounded-lg border border-warning/20 bg-warning/5 p-3 md:p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 text-warning mt-0.5" />
              <p className="text-xs md:text-sm text-muted-foreground">
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
