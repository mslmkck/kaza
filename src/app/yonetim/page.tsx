"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Car,
  Scale,
  FileText,
  MessageCircle,
  Users,
  Settings,
  Bell,
  Search,
  TrendingUp,
  TrendingDown,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Clock,
  BarChart3,
  FolderOpen,
  UserPlus,
  Shield,
  Activity,
} from "lucide-react";
import { useState } from "react";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Demo stats
  const stats = {
    totalUsers: 1250,
    dailyNewUsers: 45,
    openCases: 128,
    completedCases: 892,
    pendingQuestions: 34,
    answeredQuestions: 1567,
    monthlyRevenue: 45600,
    userSatisfaction: 94,
  };

  const recentUsers = [
    { id: "1", name: "Ahmet Yılmaz", email: "ahmet@example.com", role: "user", status: "active", createdAt: "2024-06-20" },
    { id: "2", name: "Fatma Kaya", email: "fatma@example.com", role: "user", status: "active", createdAt: "2024-06-19" },
    { id: "3", name: "Mehmet Demir", email: "mehmet@example.com", role: "expert", status: "pending", createdAt: "2024-06-18" },
    { id: "4", name: "Ayşe Çelik", email: "ayse@example.com", role: "user", status: "inactive", createdAt: "2024-06-17" },
  ];

  const recentQuestions = [
    { id: "1", title: "Radar cezasına itiraz edebilir miyim?", category: "Radar Cezası", status: "new", date: "2024-06-20" },
    { id: "2", title: "Kaza tespit tutanağı nasıl doldurulur?", category: "Kaza Tespit", status: "answered", date: "2024-06-19" },
    { id: "3", title: "Kusur oranıma itiraz etmek istiyorum", category: "Kusur Oranı", status: "under_review", date: "2024-06-18" },
  ];

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "users", label: "Kullanıcılar", icon: Users },
    { id: "experts", label: "Uzmanlar", icon: Shield },
    { id: "cases", label: "Dosyalar", icon: FolderOpen },
    { id: "questions", label: "Sorular", icon: MessageCircle },
    { id: "reports", label: "Raporlar", icon: TrendingUp },
    { id: "settings", label: "Ayarlar", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy">
                <Car className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-navy">KazaDanış</span>
            </Link>
            <Badge variant="navy">Yönetim Paneli</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-navy text-white flex items-center justify-center">
                A
              </div>
              <span className="text-sm font-medium">Admin</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-white p-4 min-h-[calc(100vh-64px)]">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? "bg-navy text-white"
                    : "text-muted-foreground hover:bg-slate-100"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Page Header */}
              <div>
                <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
                <p className="text-muted-foreground">Sistem durumunu ve istatistikleri görüntüleyin</p>
              </div>

              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Toplam Kullanıcı</p>
                        <p className="text-3xl font-bold text-navy">{stats.totalUsers.toLocaleString()}</p>
                        <p className="flex items-center text-sm text-success">
                          <TrendingUp className="mr-1 h-4 w-4" />
                          +{stats.dailyNewUsers} bugün
                        </p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue/10">
                        <Users className="h-6 w-6 text-blue" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Açık Dosyalar</p>
                        <p className="text-3xl font-bold text-navy">{stats.openCases}</p>
                        <p className="text-sm text-muted-foreground">+12 bu hafta</p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
                        <FolderOpen className="h-6 w-6 text-warning" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Bekleyen Sorular</p>
                        <p className="text-3xl font-bold text-navy">{stats.pendingQuestions}</p>
                        <p className="text-sm text-error">+8 bugün</p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-error/10">
                        <MessageCircle className="h-6 w-6 text-error" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Memnuniyet Oranı</p>
                        <p className="text-3xl font-bold text-navy">%{stats.userSatisfaction}</p>
                        <p className="flex items-center text-sm text-success">
                          <TrendingUp className="mr-1 h-4 w-4" />
                          +2% bu ay
                        </p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                        <Activity className="h-6 w-6 text-success" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Users */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Son Kayıtlar</CardTitle>
                      <CardDescription>En son kaydolan kullanıcılar</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      Tümünü Gör
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-navy/10 flex items-center justify-center">
                              {user.name[0]}
                            </div>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={user.role === "expert" ? "navy" : "secondary"}>
                              {user.role === "expert" ? "Uzman" : "Kullanıcı"}
                            </Badge>
                            <Badge variant={user.status === "active" ? "success" : user.status === "pending" ? "warning" : "secondary"}>
                              {user.status === "active" ? "Aktif" : user.status === "pending" ? "Bekliyor" : "Pasif"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Questions */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Son Sorular</CardTitle>
                      <CardDescription>En son sorulan sorular</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      Tümünü Gör
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentQuestions.map((question) => (
                        <div key={question.id} className="flex items-start gap-3">
                          <div className={`mt-1 h-2 w-2 rounded-full ${
                            question.status === "new" ? "bg-error" :
                            question.status === "answered" ? "bg-success" : "bg-warning"
                          }`} />
                          <div className="flex-1">
                            <div className="font-medium">{question.title}</div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="secondary" className="text-xs">{question.category}</Badge>
                              <span>{question.date}</span>
                            </div>
                          </div>
                          <Badge variant={
                            question.status === "new" ? "error" :
                            question.status === "answered" ? "success" : "warning"
                          }>
                            {question.status === "new" ? "Yeni" :
                             question.status === "answered" ? "Cevaplandı" : "İnceleniyor"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Hızlı İşlemler</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <Button variant="outline" className="h-20 flex-col gap-2">
                      <UserPlus className="h-5 w-5" />
                      <span className="text-sm">Yeni Kullanıcı Ekle</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2">
                      <Shield className="h-5 w-5" />
                      <span className="text-sm">Uzman Onayla</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2">
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-sm">Soruları Cevapla</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2">
                      <BarChart3 className="h-5 w-5" />
                      <span className="text-sm">Rapor Oluştur</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-navy">Kullanıcı Yönetimi</h1>
                  <p className="text-muted-foreground">Tüm kullanıcıları görüntüleyin ve yönetin</p>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Yeni Kullanıcı
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="Kullanıcı ara..." className="pl-10" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Kullanıcı</th>
                        <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Rol</th>
                        <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Durum</th>
                        <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Kayıt Tarihi</th>
                        <th className="pb-3 text-right text-sm font-medium text-muted-foreground">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {recentUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-navy/10 flex items-center justify-center">
                                {user.name[0]}
                              </div>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4">
                            <Badge variant={user.role === "expert" ? "navy" : "secondary"}>
                              {user.role === "expert" ? "Uzman" : "Kullanıcı"}
                            </Badge>
                          </td>
                          <td className="py-4">
                            <Badge variant={user.status === "active" ? "success" : user.status === "pending" ? "warning" : "secondary"}>
                              {user.status === "active" ? "Aktif" : user.status === "pending" ? "Bekliyor" : "Pasif"}
                            </Badge>
                          </td>
                          <td className="py-4 text-muted-foreground">{user.createdAt}</td>
                          <td className="py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-error" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab !== "dashboard" && activeTab !== "users" && (
            <div className="flex h-[calc(100vh-120px)] items-center justify-center">
              <div className="text-center">
                <Settings className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h2 className="text-xl font-semibold">{navItems.find(n => n.id === activeTab)?.label}</h2>
                <p className="text-muted-foreground">Bu bölüm geliştirme aşamasında</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
