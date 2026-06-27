"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useState, createContext, useContext } from "react";
import { Toaster } from "sonner";

// Simple auth context without supabase auth helpers
interface AuthContextType {
  user: { id: string; email: string; user_metadata: { full_name?: string } } | null;
  session: { access_token: string } | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: false,
});

export const useAuth = () => useContext(AuthContext);

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ user: null, session: null, isLoading: false }}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "hsl(var(--background))",
              color: "hsl(var(--foreground))",
              border: "1px solid hsl(var(--border))",
            },
          }}
        />
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}
