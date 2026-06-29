"use client";

import { createBrowserClient } from '@supabase/ssr'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Car,
  Settings,
  Bell,
  Search,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  FolderOpen,
  UserPlus,
  Shield,
  Activity,
  Users,
  MessageCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  RefreshCw,
  Check,
  Clock,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  role: 'user' | 'expert' | 'admin';
  is_active: boolean;
  created_at: string;
};

type Question = {
  id: string;
  title: string;
  content: string;
  category: string;
  status: 'pending' | 'answered' | 'closed';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  created_at: string;
  profiles?: { full_name: string | null; email: string };
};

type Stats = {
  totalUsers: number;
  todayNewUsers: number;
  totalQuestions: number;
  openCases: number;
  pendingQuestions: number;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(true);
  
  // Data states
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    todayNewUsers: 0,
    totalQuestions: 0,
    openCases: 0,
    pendingQuestions: 0,
  });
  const [users, setUsers] = useState<Profile[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  
  // Pagination
  const [userPage, setUserPage] = useState(1);
  const [questionPage, setQuestionPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  
  // Search
  const [userSearch, setUserSearch] = useState("");
  const [questionSearch, setQuestionSearch] = useState("");
  
  // Question status filter
  const [questionFilter, setQuestionFilter] = useState<string>("all");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Fetch stats
  const fetchStats = useCallback(async () => {
    try {
      const [usersCount, questionsCount, pendingCount] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('questions').select('*', { count: 'exact', head: true }),
        supabase.from('questions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      ]);

      // Today's users
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { count: todayCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString());

      setStats({
        totalUsers: usersCount.count || 0,
        todayNewUsers: todayCount || 0,
        totalQuestions: questionsCount.count || 0,
        openCases: 0, // Cases table not queried yet
        pendingQuestions: pendingCount.count || 0,
      });
    } catch (error) {
      console.error('Stats fetch error:', error);
    }
  }, [supabase]);

  // Fetch users
  const fetchUsers = useCallback(async (page = 1, search = "") => {
    try {
      let query = supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((page - 1) * 10, page * 10 - 1);

      if (search) {
        query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
      }

      const { data, count } = await query;
      setUsers(data || []);
      setTotalUsers(count || 0);
    } catch (error) {
      console.error('Users fetch error:', error);
    }
  }, [supabase]);

  // Fetch questions
  const fetchQuestions = useCallback(async (page = 1, filter = "all") => {
    try {
      let query = supabase
        .from('questions')
        .select(`
          *,
          profiles:user_id (full_name, email)
        `, { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((page - 1) * 10, page * 10 - 1);

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, count } = await query;
      setQuestions(data || []);
      setTotalQuestions(count || 0);
    } catch (error) {
      console.error('Questions fetch error:', error);
    }
  }, [supabase]);

  // Initial load
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchStats(), fetchUsers(), fetchQuestions()]);
      setIsLoading(false);
    };
    loadData();
  }, [fetchStats, fetchUsers, fetchQuestions]);

  // Tab change handlers
  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers(1, userSearch);
      setUserPage(1);
    } else if (activeTab === 'questions') {
      fetchQuestions(1, questionFilter);
      setQuestionPage(1);
    }
  }, [activeTab, userSearch, questionFilter, fetchUsers, fetchQuestions]);

  // Search handlers
  const handleUserSearch = (value: string) => {
    setUserSearch(value);
    fetchUsers(1, value);
    setUserPage(1);
  };

  const handleQuestionFilter = (value: string) => {
    setQuestionFilter(value);
    fetchQuestions(1, value);
    setQuestionPage(1);
  };

  // Update user role
  const handleUpdateRole = async (userId: string, newRole: 'user' | 'expert' | 'admin') => {
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId);

    if (!error) {
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    }
  };

  // Update question status
  const handleUpdateQuestionStatus = async (questionId: string, newStatus: 'pending' | 'answered' | 'closed') => {
    const { error } = await supabase
      .from('questions')
      .update({ status: newStatus })
      .eq('id', questionId);

    if (!error) {
      setQuestions(questions.map(q => q.id === questionId ? { ...q, status: newStatus } : q));
      fetchStats();
    }
  };

  // Delete user
  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) return;
    
    const { error } = await supabase.auth.admin.deleteUser(userId);
    if (!error) {
      setUsers(users.filter(u => u.id !== userId));
      fetchStats();
    }
  };

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "users", label: "Kullanıcılar", icon: Users },
    { id: "questions", label: "Sorular", icon: MessageCircle },
    { id: "settings", label: "Ayarlar", icon: Settings },
  ];

  const roleLabels = { user: 'Kullanıcı', expert: 'Uzman', admin: 'Admin' };
  const statusLabels = { pending: 'Bekliyor', answered: 'Cevaplandı', closed: 'Kapalı' };
  const statusColors = {
    pending: 'warning' as const,
    answered: 'success' as const,
    closed: 'secondary' as const,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-navy mx-auto mb-4" />
          <p className="text-muted-foreground">Yükleniyor...</p>
        </div>
      </div>
    );
  }

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
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Çıkış
            </Button>
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
          {/* DASHBOARD TAB */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
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
                          +{stats.todayNewUsers} bugün
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
                        <p className="text-sm font-medium text-muted-foreground">Toplam Soru</p>
                        <p className="text-3xl font-bold text-navy">{stats.totalQuestions}</p>
                        <p className="text-sm text-muted-foreground">Sistem genelinde</p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
                        <MessageCircle className="h-6 w-6 text-warning" />
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
                        <p className="text-sm text-error">Cevap bekliyor</p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-error/10">
                        <Clock className="h-6 w-6 text-error" />
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
                        <p className="text-sm text-muted-foreground">İşlemde</p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                        <FolderOpen className="h-6 w-6 text-success" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Son Kayıtlar</CardTitle>
                    <CardDescription>En son kaydolan kullanıcılar</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {users.length > 0 ? (
                      <div className="space-y-4">
                        {users.slice(0, 5).map((user) => (
                          <div key={user.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-navy/10 flex items-center justify-center">
                                {user.full_name?.[0] || user.email[0]}
                              </div>
                              <div>
                                <div className="font-medium">{user.full_name || 'İsimsiz'}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                            <Badge variant={user.role === 'admin' ? 'navy' : user.role === 'expert' ? 'warning' : 'secondary'}>
                              {roleLabels[user.role]}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-4">Henüz kullanıcı yok</p>
                    )}
                    <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => setActiveTab('users')}>
                      Tümünü Gör
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Son Sorular</CardTitle>
                    <CardDescription>En son sorulan sorular</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {questions.length > 0 ? (
                      <div className="space-y-4">
                        {questions.slice(0, 5).map((q) => (
                          <div key={q.id} className="flex items-start gap-3">
                            <div className={`mt-1 h-2 w-2 rounded-full ${
                              q.status === 'pending' ? 'bg-error' :
                              q.status === 'answered' ? 'bg-success' : 'bg-gray-400'
                            }`} />
                            <div className="flex-1">
                              <div className="font-medium line-clamp-1">{q.title}</div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Badge variant="secondary" className="text-xs">{q.category}</Badge>
                                <span>{new Date(q.created_at).toLocaleDateString('tr-TR')}</span>
                              </div>
                            </div>
                            <Badge variant={statusColors[q.status]}>
                              {statusLabels[q.status]}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-4">Henüz soru yok</p>
                    )}
                    <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => setActiveTab('questions')}>
                      Tümünü Gör
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* USERS TAB */}
          {activeTab === "users" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-navy">Kullanıcı Yönetimi</h1>
                <p className="text-muted-foreground">Tüm kullanıcıları görüntüleyin ve yönetin</p>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input 
                        placeholder="Kullanıcı ara..." 
                        className="pl-10"
                        value={userSearch}
                        onChange={(e) => handleUserSearch(e.target.value)}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{totalUsers} kullanıcı</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
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
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td className="py-4">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-navy/10 flex items-center justify-center">
                                  {user.full_name?.[0] || user.email[0]}
                                </div>
                                <div>
                                  <div className="font-medium">{user.full_name || 'İsimsiz'}</div>
                                  <div className="text-sm text-muted-foreground">{user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4">
                              <select
                                className="text-sm border rounded px-2 py-1"
                                value={user.role}
                                onChange={(e) => handleUpdateRole(user.id, e.target.value as 'user' | 'expert' | 'admin')}
                              >
                                <option value="user">Kullanıcı</option>
                                <option value="expert">Uzman</option>
                                <option value="admin">Admin</option>
                              </select>
                            </td>
                            <td className="py-4">
                              <Badge variant={user.is_active ? 'success' : 'secondary'}>
                                {user.is_active ? 'Aktif' : 'Pasif'}
                              </Badge>
                            </td>
                            <td className="py-4 text-muted-foreground">
                              {new Date(user.created_at).toLocaleDateString('tr-TR')}
                            </td>
                            <td className="py-4 text-right">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash2 className="h-4 w-4 text-error" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-muted-foreground">
                      Sayfa {userPage} / {Math.ceil(totalUsers / 10) || 1}
                    </span>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={userPage === 1}
                        onClick={() => { setUserPage(userPage - 1); fetchUsers(userPage - 1, userSearch); }}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={userPage >= Math.ceil(totalUsers / 10)}
                        onClick={() => { setUserPage(userPage + 1); fetchUsers(userPage + 1, userSearch); }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* QUESTIONS TAB */}
          {activeTab === "questions" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-navy">Soru Yönetimi</h1>
                <p className="text-muted-foreground">Tüm soruları görüntüleyin ve yönetin</p>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input 
                        placeholder="Soruları ara..." 
                        className="pl-10"
                        value={questionSearch}
                        onChange={(e) => setQuestionSearch(e.target.value)}
                      />
                    </div>
                    <select
                      className="border rounded px-3 py-2 text-sm"
                      value={questionFilter}
                      onChange={(e) => handleQuestionFilter(e.target.value)}
                    >
                      <option value="all">Tümü</option>
                      <option value="pending">Bekleyen</option>
                      <option value="answered">Cevaplandı</option>
                      <option value="closed">Kapalı</option>
                    </select>
                    <span className="text-sm text-muted-foreground">{totalQuestions} soru</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {questions.map((q) => (
                      <div key={q.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary">{q.category}</Badge>
                              <Badge variant={statusColors[q.status]}>
                                {statusLabels[q.status]}
                              </Badge>
                              {q.priority === 'urgent' && (
                                <Badge variant="destructive">Acil</Badge>
                              )}
                            </div>
                            <h3 className="font-medium mb-1">{q.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">{q.content}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span>{q.profiles?.full_name || q.profiles?.email || 'Bilgi yok'}</span>
                              <span>{new Date(q.created_at).toLocaleDateString('tr-TR')}</span>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            {q.status === 'pending' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleUpdateQuestionStatus(q.id, 'answered')}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Cevapla
                              </Button>
                            )}
                            {q.status !== 'closed' && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleUpdateQuestionStatus(q.id, 'closed')}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {questions.length === 0 && (
                      <p className="text-center text-muted-foreground py-8">Henüz soru yok</p>
                    )}
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-muted-foreground">
                      Sayfa {questionPage} / {Math.ceil(totalQuestions / 10) || 1}
                    </span>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={questionPage === 1}
                        onClick={() => { setQuestionPage(questionPage - 1); fetchQuestions(questionPage - 1, questionFilter); }}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={questionPage >= Math.ceil(totalQuestions / 10)}
                        onClick={() => { setQuestionPage(questionPage + 1); fetchQuestions(questionPage + 1, questionFilter); }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-navy">Ayarlar</h1>
                <p className="text-muted-foreground">Sistem ayarlarını yönetin</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Site Ayarları</CardTitle>
                  <CardDescription>Temel site yapılandırması</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Site Adı</label>
                    <Input defaultValue="KazaDanış" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Destek E-postası</label>
                    <Input defaultValue="destek@kazadanis.com" className="mt-1" />
                  </div>
                  <Button>Kaydet</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>E-posta Bildirimleri</CardTitle>
                  <CardDescription>Hangi bildirimlerin gönderileceğini seçin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">Yeni soru oluşturulduğunda bildirim</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">Yeni kayıt olduğunda bildirim</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">Günlük özet e-postası</span>
                  </label>
                  <Button>Kaydet</Button>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
