"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ROUTES, QUESTION_CATEGORIES, LEGAL_DISCLAIMER } from "@/lib/constants";
import {
  MessageCircle,
  Plus,
  Search,
  Send,
  Clock,
  CheckCircle,
  User,
  AlertCircle,
  ChevronRight,
  Shield,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
} from "lucide-react";

export default function QuestionsPage() {
  const [view, setView] = useState<"list" | "ask">("list");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Demo questions
  const questions = [
    {
      id: "1",
      title: "Radar cezasına itiraz edebilir miyim?",
      description: "Saat 22:00'de radar cezası yedim. Radarın kalibrasyonunu sorgulayabilir miyim?",
      category: "radar_fine",
      status: "new",
      author: "Anonim",
      createdAt: "2024-06-20",
      answerCount: 2,
    },
    {
      id: "2",
      title: "Kaza tespit tutanağı nasıl doldurulur?",
      description: "Arabamla park halindeki bir araca çarptım. Tutanak doldurmam gerekiyor ama nasıl?",
      category: "accident_report",
      status: "answered",
      author: "Ahmet Y.",
      createdAt: "2024-06-19",
      answerCount: 5,
    },
    {
      id: "3",
      title: "Kusur oranıma itiraz etmek istiyorum",
      description: "Kaza tespit tutanağında %70 kusurlu bulundum ama haksız olduğumu düşünüyorum.",
      category: "fault_ratio",
      status: "under_review",
      author: "Fatma K.",
      createdAt: "2024-06-18",
      answerCount: 1,
    },
    {
      id: "4",
      title: "Park cezası itirazı için dilekçe örneği",
      description: "Engelli park alanına park ettim ama engelli kimliğim vardı. Ceza yazılmış.",
      category: "parking_fine",
      status: "answered",
      author: "Mehmet D.",
      createdAt: "2024-06-17",
      answerCount: 3,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <AlertCircle className="h-4 w-4 text-error" />;
      case "answered":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "under_review":
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "new":
        return "Yeni";
      case "answered":
        return "Cevaplandı";
      case "under_review":
        return "İnceleniyor";
      default:
        return status;
    }
  };

  const getCategoryLabel = (category: string) => {
    const cat = QUESTION_CATEGORIES.find((c) => c.value === category);
    return cat?.label || category;
  };

  const filteredQuestions = questions.filter((q) => {
    if (selectedCategory && q.category !== selectedCategory) return false;
    if (searchQuery && !q.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  if (view === "ask") {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <main className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-2xl">
            <Button variant="ghost" className="mb-4" onClick={() => setView("list")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Sorulara Dön
            </Button>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Uzmanına Sor
                </CardTitle>
                <CardDescription>
                  Sorunuzu detaylı bir şekilde yazın, uzmanlarımız en kısa sürede cevaplayacaktır
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <select
                    id="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Kategori seçin</option>
                    {QUESTION_CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Soru Başlığı</Label>
                  <Input
                    id="title"
                    placeholder="Kısaca ne sormak istediğinizi yazın"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Soru Detayı</Label>
                  <Textarea
                    id="description"
                    placeholder="Sorunuzu detaylı bir şekilde açıklayın..."
                    rows={8}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Soru Gizliliği</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 rounded-lg border p-3 flex-1 cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="privacy"
                        value="public"
                        defaultChecked
                        className="h-4 w-4"
                      />
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Herkese Açık</div>
                          <div className="text-xs text-muted-foreground">Sorunuz herkes tarafından görülebilir</div>
                        </div>
                      </div>
                    </label>
                    <label className="flex items-center gap-2 rounded-lg border p-3 flex-1 cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="privacy"
                        value="private"
                        className="h-4 w-4"
                      />
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Gizli</div>
                          <div className="text-xs text-muted-foreground">Sadece uzmanlar görür</div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <Button className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Soruyu Gönder
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <div className="mt-6 rounded-lg border border-warning/20 bg-warning/5 p-4">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-warning" />
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

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-navy">Uzmanına Sor</h1>
              <p className="text-muted-foreground">
                Trafik kazası ve ceza konusunda sorularınızı sorun
              </p>
            </div>
            <Button onClick={() => setView("ask")}>
              <Plus className="mr-2 h-4 w-4" />
              Yeni Soru Sor
            </Button>
          </div>

          {/* Search and Filter */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Sorularda arayın..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={selectedCategory === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                  >
                    Tümü
                  </Button>
                  {QUESTION_CATEGORIES.slice(0, 5).map((cat) => (
                    <Button
                      key={cat.value}
                      variant={selectedCategory === cat.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(cat.value)}
                    >
                      {cat.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Questions List */}
          <div className="space-y-4">
            {filteredQuestions.map((question) => (
              <Card key={question.id} className="card-hover cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                      question.status === "new" ? "bg-error/10 text-error" :
                      question.status === "answered" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                    }`}>
                      {getStatusIcon(question.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs">
                          {getCategoryLabel(question.category)}
                        </Badge>
                        <Badge variant={
                          question.status === "new" ? "error" :
                          question.status === "answered" ? "success" : "warning"
                        } className="text-xs">
                          {getStatusLabel(question.status)}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-navy">{question.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {question.description}
                      </p>
                      <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {question.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {question.createdAt}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {question.answerCount} cevap
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredQuestions.length === 0 && (
            <Card className="p-8 text-center">
              <MessageCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 font-semibold">Sonuç Bulunamadı</h3>
              <p className="text-muted-foreground">
                Arama kriterlerinize uygun soru bulunamadı
              </p>
            </Card>
          )}

          {/* Info Card */}
          <Card className="mt-8 bg-gradient-to-r from-blue/10 to-navy/10">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-navy text-white">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy">Gizlilik Garantisi</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Sorularınız gizli olarak gönderilebilir ve sadece uzmanlar tarafından görüntülenebilir.
                    Kişisel bilgileriniz korunur ve asla üçüncü taraflarla paylaşılmaz.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
