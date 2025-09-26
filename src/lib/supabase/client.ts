import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

let browserClient: SupabaseClient<Database> | null = null;

type CookieOptions = {
  path?: string;
  domain?: string;
  sameSite?: "lax" | "strict" | "none" | string;
  expires?: string | Date;
  maxAge?: number;
};

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
      get(name: string) {
        if (typeof document === "undefined") return undefined;
        const match = document.cookie.match(
          new RegExp(
            "(?:^|; )" +
              name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, "\\$1") +
              "=([^;]*)"
          )
        );
        return match ? decodeURIComponent(match[1]) : undefined;
      },
      set(name: string, value: string, options?: CookieOptions) {
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
      },
      remove(name: string, options?: CookieOptions) {
        if (typeof document === "undefined") return;
        const parts: string[] = [];
        parts.push(`${name}=`);
        parts.push(`path=${options?.path ?? "/"}`);
        if (options?.domain) parts.push(`domain=${options.domain}`);
        parts.push("max-age=0");
        parts.push("expires=Thu, 01 Jan 1970 00:00:00 GMT");
        document.cookie = parts.join("; ");
      },
    },
  });

  return browserClient;
}
