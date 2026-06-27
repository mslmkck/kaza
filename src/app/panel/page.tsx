"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ROUTES, APP_NAME, CASE_STATUSES, FINE_STATUSES, QUESTION_STATUSES } from "@/lib/constants";
import { useAuthStore } from "@/store";
import {
  Car,
  Scale,
  FileText,
  MessageCircle,
  Bell,
  Settings,
  User,
  LogOut,
  Plus,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileCheck,
  FolderOpen,
  ArrowRight,
  TrendingUp,
  Calendar,
  Upload,
  HelpCircle,
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuthStore();

  // Demo data - in real app, this would come from API
  const stats = {
    openCases: 3,
    pendingDocuments: 5,
    upcomingDeadlines: 2,
    unansweredQuestions: 1,
    recentPetitions: 4,
  };

  const recentCases = [
    {
      id: "1",
      type: "accident",
      title: "Maddi Hasarlı Kaza - 15.06.2024",
      status: "under_review",
      date: "2024-06-15",
    },
    {
      id: "2",
      type: "fine",
      title: "Radar Cezası - İtiraz",
      status: "objection_submitted",
      date: "2024-06-10",
    },
    {
      id: "3",
      type: "accident",
      title: "Yaralamalı Kaza - 20.05.2024",
      status: "completed",
      date: "2024-05-20",
    },
  ];

  const upcomingTasks = [
    {
      id: "1",
      title: "Ekspertiz raporunu yükleyin",
      deadline: "2024-06-25",
      type: "document",
    },
    {
      id: "2",
      title: "İtiraz dilekçesi son tarihi",
      deadline: "2024-06-20",
      type: "deadline",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: "default" | "secondary" | "success" | "warning" | "error" | "navy"; label: string }> = {
      draft: { variant: "secondary", label: "Taslak" },
      submitted: { variant: "default", label: "Gönderildi" },
      under_review: { variant: "warning", label: "İnceleniyor" },
      expert_assigned: { variant: "navy", label: "Uzman Atandı" },
      completed: { variant: "success", label: "Tamamlandı" },
      closed: { variant: "secondary", label: "Kapatıldı" },
      objection_submitted: { variant: "default", label: "İtiraz Gönderildi" },
    };

    const config = statusConfig[status] || { variant: "secondary", label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-navy">
                  Merhaba, {user?.full_name || "Kullanıcı"}
                </h1>
                <p className="text-muted-foreground">
                  Dosyalarınızı ve süreçlerinizi yönetin
                </p>
              </div>
              <div className="flex gap-2">
                <Button asChild>
                  <Link href="/kaza-danismani">
                    <Plus className="mr-2 h-4 w-4" />
                    Yeni Kaza Dosyası
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/ceza-analizi">
                    <Plus className="mr-2 h-4 w-4" />
                    Yeni Ceza Analizi
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue/10">
                      <FolderOpen className="h-6 w-6 text-blue" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-navy">{stats.openCases}</div>
                      <div className="text-sm text-muted-foreground">Açık Dosya</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10">
                      <Upload className="h-6 w-6 text-warning" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-navy">{stats.pendingDocuments}</div>
                      <div className="text-sm text-muted-foreground">Eksik Belge</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-error/10">
                      <Clock className="h-6 w-6 text-error" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-navy">{stats.upcomingDeadlines}</div>
                      <div className="text-sm text-muted-foreground">Yaklaşan Son Tarih</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy/10">
                      <HelpCircle className="h-6 w-6 text-navy" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-navy">{stats.unansweredQuestions}</div>
                      <div className="text-sm text-muted-foreground">Bekleyen Soru</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Cases */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FolderOpen className="h-5 w-5" />
                    Son Dosyalarım
                  </CardTitle>
                  <CardDescription>En son oluşturduğunuz dosyalar</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/panel/dosyalar">
                    Tümünü Gör
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCases.map((caseItem) => (
                    <div
                      key={caseItem.id}
                      className="flex items-center justify-between rounded-lg border p-4 hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                          caseItem.type === "accident" ? "bg-blue/10" : "bg-warning/10"
                        }`}>
                          {caseItem.type === "accident" ? (
                            <Car className="h-5 w-5 text-blue" />
                          ) : (
                            <Scale className="h-5 w-5 text-warning" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{caseItem.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(caseItem.date).toLocaleDateString("tr-TR")}
                          </div>
                        </div>
                      </div>
                      {getStatusBadge(caseItem.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-error" />
                  Yapılacaklar
                </CardTitle>
                <CardDescription>Halletmeniz gereken işler</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between rounded-lg border border-l-4 border-l-error p-4"
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-error" />
                        <div>
                          <div className="font-medium">{task.title}</div>
                          <div className="text-sm text-muted-foreground">
                            Son tarih: {new Date(task.deadline).toLocaleDateString("tr-TR")}
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        İşaretle
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Hızlı İşlemler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/kaza-danismani">
                    <Car className="mr-3 h-4 w-4" />
                    Kaza Danışmanı
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/ceza-analizi">
                    <Scale className="mr-3 h-4 w-4" />
                    Ceza Analizi
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/dilekce-olustur">
                    <FileText className="mr-3 h-4 w-4" />
                    Dilekçe Oluştur
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/sorular">
                    <MessageCircle className="mr-3 h-4 w-4" />
                    Soru Sor
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Bildirimler
                </CardTitle>
                <Badge variant="error">{stats.unansweredQuestions + stats.pendingDocuments}</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 rounded-lg bg-blue/5 p-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 text-success" />
                    <div>
                      <div className="text-sm font-medium">Dilekçeniz hazır</div>
                      <div className="text-xs text-muted-foreground">2 saat önce</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg bg-warning/5 p-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 text-warning" />
                    <div>
                      <div className="text-sm font-medium">Eksik belge var</div>
                      <div className="text-xs text-muted-foreground">5 saat önce</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg bg-navy/5 p-3">
                    <MessageCircle className="mt-0.5 h-5 w-5 text-navy" />
                    <div>
                      <div className="text-sm font-medium">Uzman cevapladı</div>
                      <div className="text-xs text-muted-foreground">1 gün önce</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white">
                    {user?.full_name?.[0] || "K"}
                  </div>
                  <div>
                    <div className="font-medium">{user?.full_name || "Kullanıcı"}</div>
                    <div className="text-sm text-muted-foreground">{user?.email || "email@example.com"}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/profil">
                      <User className="mr-3 h-4 w-4" />
                      Profili Düzenle
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/ayarlar">
                      <Settings className="mr-3 h-4 w-4" />
                      Ayarlar
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-error hover:text-error">
                    <LogOut className="mr-3 h-4 w-4" />
                    Çıkış Yap
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Help */}
            <Card className="bg-gradient-to-br from-blue/10 to-navy/10">
              <CardContent className="p-6 text-center">
                <HelpCircle className="mx-auto mb-3 h-10 w-10 text-navy" />
                <h3 className="mb-2 font-semibold text-navy">Yardıma mı ihtiyacınız var?</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Uzman ekibimiz 7/24 size yardımcı olmaya hazır
                </p>
                <Button size="sm" asChild>
                  <Link href="/sorular">
                    Soru Sor
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
