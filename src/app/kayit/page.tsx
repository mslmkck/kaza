"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES, APP_NAME } from "@/lib/constants";
import { Car, Mail, Lock, Eye, EyeOff, User, Phone, Loader2, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { getSupabase } from "@/lib/supabase/client";

const registerSchema = z.object({
  fullName: z.string().min(2, "Ad soyad en az 2 karakter olmalı"),
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  phone: z.string().regex(/^[0-9]{10,11}$/, "Geçerli bir telefon numarası girin"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalı"),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, "Kullanım koşullarını kabul etmelisiniz"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            phone: data.phone,
          },
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Kayıt başarılı! E-posta adresinizi doğrulayın.");
      router.push(ROUTES.DASHBOARD);
    } catch (error) {
      toast.error("Kayıt olurken bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-96 w-96 rounded-full bg-blue/5" />
        <div className="absolute -bottom-1/4 -right-1/4 h-96 w-96 rounded-full bg-navy/5" />
      </div>

      <Link href={ROUTES.HOME} className="mb-8 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy">
          <Car className="h-6 w-6 text-white" />
        </div>
        <span className="text-2xl font-bold text-navy">{APP_NAME}</span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-navy">Hesap Oluşturun</CardTitle>
          <CardDescription>
            Ücretsiz hesap oluşturun ve hemen başlayın
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Ad Soyad</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Ad Soyad"
                  className="pl-10"
                  {...register("fullName")}
                />
              </div>
              {errors.fullName && (
                <p className="text-sm text-error">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  className="pl-10"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-error">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="05XX XXX XX XX"
                  className="pl-10"
                  {...register("phone")}
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-error">{errors.phone.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-error">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10"
                  {...register("confirmPassword")}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-error">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="acceptTerms"
                className="mt-1 h-4 w-4 rounded border-gray-300"
                {...register("acceptTerms")}
              />
              <label htmlFor="acceptTerms" className="text-sm text-muted-foreground">
                <Link href={ROUTES.LEGAL_TERMS} className="text-blue hover:underline">
                  Kullanım Koşulları
                </Link>{" "}
                ve{" "}
                <Link href={ROUTES.LEGAL_PRIVACY} className="text-blue hover:underline">
                  Gizlilik Politikası
                </Link>
                'nı okudum ve kabul ediyorum.
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="text-sm text-error">{errors.acceptTerms.message}</p>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Kayıt Ol
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Zaten hesabınız var mı?{" "}
              <Link href={ROUTES.LOGIN} className="text-blue hover:underline">
                Giriş Yapın
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
