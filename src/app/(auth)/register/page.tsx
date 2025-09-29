import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-svh flex items-center justify-center p-6 bg-[radial-gradient(1200px_600px_at_10%_-20%,rgba(255,215,0,0.14),transparent_60%),radial-gradient(1000px_600px_at_90%_10%,rgba(244,196,48,0.10),transparent_60%),linear-gradient(180deg,#0A0A0A_0%,#111111_35%,#1A1A1A_100%)]">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-[#FFD700]/20 bg-white/5 backdrop-blur p-6 shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-black tracking-tight">Join Apex</h1>
            <p className="text-sm text-white/70">
              Create your account to start the challenge
            </p>
          </div>
          <div className="mt-6">
            <RegisterForm />
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-white/60">
          Already have an account?{" "}
          <a className="text-[#FFD700] hover:brightness-110" href="/login">
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}
