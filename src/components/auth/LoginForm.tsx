"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAction } from "@/app/(auth)/actions";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormValues = z.infer<typeof schema>;

export default function LoginForm() {
  const [rootError, setRootError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (values: FormValues) => {
    setRootError(null);
    const fd = new FormData();
    fd.set("email", values.email);
    fd.set("password", values.password);
    startTransition(async () => {
      const res = await loginAction(fd);
      if (res && !res.ok) {
        setRootError(Object.values(res.error).flat().join("\n"));
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-sm w-full"
    >
      <div>
        <label className="block text-sm font-semibold">Email</label>
        <input
          type="email"
          className="mt-1 w-full rounded-lg border border-[#FFD700]/30 bg-black/40 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50"
          placeholder="you@example.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-semibold">Password</label>
        <input
          type="password"
          className="mt-1 w-full rounded-lg border border-[#FFD700]/30 bg-black/40 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50"
          placeholder="••••••••"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      {rootError && (
        <p className="text-sm text-red-600 whitespace-pre-line">{rootError}</p>
      )}
      <button
        type="submit"
        className="w-full rounded-xl py-2 font-bold text-black bg-gradient-to-b from-[#FFD700] to-[#F4C430] shadow-[0_8px_24px_rgba(255,215,0,0.25)] hover:brightness-105 disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
