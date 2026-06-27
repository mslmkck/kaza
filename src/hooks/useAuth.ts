import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/store";
import type { Profile } from "@/types";

export function useAuth() {
  const { user, session, loading, setUser, setSession, setLoading, logout: logoutStore } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    logoutStore();
    router.push("/giris");
    router.refresh();
  };

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) throw error;
    return data;
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/sifre-sifirla`,
    });
    if (error) throw error;
  };

  const updatePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error("Kullanıcı bulunamadı");
    const { data, error } = await supabase.from("profiles").update(updates).eq("id", user.id).select().single();
    if (error) throw error;
    setUser(data);
    return data;
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setLoading(false);

      if (event === "SIGNED_IN" && session?.user) {
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
        if (profile) setUser(profile);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (session?.user) {
        supabase.from("profiles").select("*").eq("id", session.user.id).single().then(({ data }) => {
          if (data) setUser(data);
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth, setSession, setLoading, setUser]);

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    resetPassword,
    updatePassword,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isExpert: user?.role === "expert" || user?.role === "lawyer",
  };
}

export function useRequireAuth(redirectTo: string = "/giris") {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(`${redirectTo}?next=${encodeURIComponent(usePathname())}`);
    }
  }, [user, loading, router, redirectTo]);

  return { user, loading };
}

export function useRequireRole(roles: string[], redirectTo: string = "/") {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && !roles.includes(user.role)) {
      router.push(redirectTo);
    }
  }, [user, loading, router, roles, redirectTo]);

  return { user, loading, hasRole: user ? roles.includes(user.role) : false };
}
