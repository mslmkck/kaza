import { createBrowserClient } from "@supabase/ssr";

// Browser client - safe to use in client components
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
  );
}

// Singleton for client-side usage
let supabaseClient: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabase() {
  if (typeof window === "undefined") {
    throw new Error("getSupabase should only be used in client components");
  }
  if (!supabaseClient) {
    supabaseClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
    );
  }
  return supabaseClient;
}

// Export supabase as default client (non-null)
export const supabase = typeof window !== "undefined" 
  ? createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
    )
  : ({} as ReturnType<typeof createBrowserClient>);