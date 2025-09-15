"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z
    .string()
    .min(3)
    .max(24)
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores"),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export async function registerAction(formData: FormData) {
  const parsed = registerSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    username: formData.get("username"),
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.flatten().fieldErrors } as const;
  }

  const { email, password, username } = parsed.data;
  const supabase = getSupabaseServerClient();

  // Provide username via user_metadata so DB trigger can consume it
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { username } },
  });
  if (signUpError) {
    return { ok: false, error: { root: [signUpError.message] } } as const;
  }
  const userId = signUpData.user?.id;
  if (!userId) {
    return {
      ok: false,
      error: { root: ["Signup failed. No user id returned."] },
    } as const;
  }

  // No manual inserts here; handled by DB trigger
  redirect("/dashboard");
}

export async function loginAction(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.flatten().fieldErrors } as const;
  }

  const supabase = getSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    return { ok: false, error: { root: [error.message] } } as const;
  }

  redirect("/dashboard");
}
