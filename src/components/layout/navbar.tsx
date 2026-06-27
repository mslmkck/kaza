"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ROUTES, APP_NAME } from "@/lib/constants";
import { Menu, X, Car, Bell, User, LogOut, Home, FileText, Scale, HelpCircle, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store";

const navigation = [
  { name: "Ana Sayfa", href: ROUTES.HOME, icon: Home },
  { name: "Kaza Danışmanı", href: ROUTES.ACCIDENT_WIZARD, icon: Car },
  { name: "Ceza Analizi", href: ROUTES.FINE_ANALYSIS, icon: Scale },
  { name: "Dilekçe Oluştur", href: ROUTES.PETITION_BUILDER, icon: FileText },
  { name: "Sorular", href: ROUTES.QUESTIONS, icon: HelpCircle },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuthStore();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-200",
      scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b" : "bg-white border-b"
    )}>
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Link href={ROUTES.HOME} className="flex items-center gap-2 flex-shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy">
            <Car className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg lg:text-xl font-bold text-navy hidden sm:block">{APP_NAME}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                pathname === item.href
                  ? "bg-navy/10 text-navy"
                  : "text-muted-foreground hover:bg-slate-100 hover:text-navy"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex lg:items-center lg:gap-2">
          {user ? (
            <>
              <Button variant="ghost" size="icon" asChild className="relative">
                <Link href={ROUTES.DASHBOARD}>
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-error text-[10px] text-white flex items-center justify-center">
                    3
                  </span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href={ROUTES.PROFILE}>
                  <User className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={logout} className="text-error hover:text-error hover:bg-error/10">
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href={ROUTES.LOGIN}>Giriş Yap</Link>
              </Button>
              <Button asChild>
                <Link href={ROUTES.REGISTER}>Kayıt Ol</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden p-2 -mr-2 rounded-lg hover:bg-slate-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menüyü aç/kapat"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-navy" />
          ) : (
            <Menu className="h-6 w-6 text-navy" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden border-t transition-all duration-300 overflow-hidden",
        mobileMenuOpen ? "max-h-screen" : "max-h-0"
      )}>
        <div className="bg-white px-4 py-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors",
                pathname === item.href
                  ? "bg-navy/10 text-navy"
                  : "text-muted-foreground hover:bg-slate-100 hover:text-navy"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.name}</span>
            </Link>
          ))}
          
          <div className="pt-4 mt-4 border-t space-y-2">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="h-10 w-10 rounded-full bg-navy text-white flex items-center justify-center">
                    {user.full_name?.[0] || "K"}
                  </div>
                  <div>
                    <div className="font-medium">{user.full_name || "Kullanıcı"}</div>
                    <div className="text-sm text-muted-foreground truncate max-w-[180px]">{user.email}</div>
                  </div>
                </div>
                <Link
                  href={ROUTES.DASHBOARD}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-muted-foreground hover:bg-slate-100 hover:text-navy"
                >
                  <Settings className="h-5 w-5" />
                  <span>Panel</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-error hover:bg-error/10"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Çıkış Yap</span>
                </button>
              </>
            ) : (
              <>
                <Button variant="outline" className="w-full justify-center" asChild>
                  <Link href={ROUTES.LOGIN}>Giriş Yap</Link>
                </Button>
                <Button className="w-full justify-center" asChild>
                  <Link href={ROUTES.REGISTER}>Kayıt Ol</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
