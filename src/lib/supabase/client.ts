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
      getAll() {
        return document.cookie
          .split("; ")
          .map((cookie) => {
            const [name, ...rest] = cookie.split("=");
            return { name, value: rest.join("=") };
          })
          .filter((cookie) => cookie.name);
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          if (typeof document === "undefined") return;
          const parts: string[] = [];
          parts.push(`${name}=${encodeURIComponent(value)}`);
          parts.push(`path=${options?.path ?? "/"}`);
          if (options?.maxAge != null) parts.push(`max-age=${options.maxAge}`);
          if (options?.expires) {
            const expires =
              typeof options.expires === "string"
                ? options.expires
                : options.expires.toUTCString?.();
            if (expires) parts.push(`expires=${expires}`);
          }
          if (options?.domain) parts.push(`domain=${options.domain}`);
          if (options?.sameSite)
            parts.push(`samesite=${String(options.sameSite).toLowerCase()}`);
          if (
            typeof window !== "undefined" &&
            window.location.protocol === "https:"
          )
            parts.push("secure");
          document.cookie = parts.join("; ");
        });
      },
    },
  });

  return browserClient;
}
