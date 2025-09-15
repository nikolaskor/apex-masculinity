import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

let browserClient: SupabaseClient<Database> | null = null;

export function getSupabaseBrowserClient(): SupabaseClient<Database> {
  if (browserClient) return browserClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set"
    );
  }

  browserClient = createBrowserClient<Database>(url, anonKey, {
    cookies: {
      get: (key: string) => {
        if (typeof document === "undefined") return undefined;
        const match = document.cookie.match(
          new RegExp("(^| )" + key + "=([^;]+)")
        );
        return match ? decodeURIComponent(match[2]) : undefined;
      },
    },
  });

  return browserClient;
}
