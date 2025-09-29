import Link from "next/link";

export const metadata = {
  title: "Apex – Elite Habit System",
  description:
    "A modern, premium landing for an elite habit system. Discipline engineered with gold-on-black aesthetics.",
};

export default function LandingPage() {
  return (
    <main className="min-h-svh text-foreground bg-[radial-gradient(1200px_600px_at_10%_-20%,rgba(255,215,0,0.14),transparent_60%),radial-gradient(1000px_600px_at_90%_10%,rgba(244,196,48,0.10),transparent_60%),linear-gradient(180deg,#0A0A0A_0%,#111111_35%,#1A1A1A_100%)]">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b border-[#FFD700]/20 bg-black/60 backdrop-blur">
        <div className="mx-auto max-w-[1200px] px-6 h-14 flex items-center justify-between">
          <Link
            href="#top"
            className="inline-flex items-center gap-2 font-extrabold"
          >
            <span
              className="inline-block w-6 h-6 rounded-md shadow-[0_0_0_2px_rgba(255,215,0,0.28),0_8px_24px_rgba(255,215,0,0.25)]"
              style={{
                background:
                  "conic-gradient(from 0deg, #FFD700, #F4C430, #e6c200, #FFD700)",
              }}
            />
            APEX
          </Link>
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#features"
              className="px-3 py-1 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10"
            >
              Features
            </a>
            <a
              href="#how"
              className="px-3 py-1 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10"
            >
              How it works
            </a>
            <a
              href="#why"
              className="px-3 py-1 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10"
            >
              Why Apex
            </a>
            <a
              href="#download"
              className="px-3 py-1 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10"
            >
              Download
            </a>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/login"
              className="px-3 py-2 rounded-lg text-sm border border-[#FFD700]/20 text-white/90 bg-white/5 hover:bg-white/10"
            >
              Login
            </a>
            <a
              href={"/register"}
              className="px-3 py-2 rounded-xl text-sm font-bold text-black bg-gradient-to-b from-[#FFD700] to-[#F4C430] shadow-[0_8px_24px_rgba(255,215,0,0.25)] hover:brightness-105"
            >
              Start free
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header id="top" className="relative overflow-hidden py-20">
        <div className="mx-auto max-w-[1200px] px-6 grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div>
            <h1 className="text-4xl/tight md:text-6xl/tight font-black tracking-tight">
              Build{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#c7a600]">
                Relentless
              </span>{" "}
              Habits
            </h1>
            <p className="mt-3 text-white/70 max-w-prose">
              Apex is the elite habit system for creators and athletes. Track
              ten fundamentals daily. Miss one, reset. Pressure that forges
              discipline.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#download"
                className="px-4 py-3 rounded-xl font-bold text-black bg-gradient-to-b from-[#FFD700] to-[#F4C430] shadow-[0_8px_24px_rgba(255,215,0,0.25)] hover:brightness-105"
              >
                Start your 7‑day run
              </a>
              <a
                href="#features"
                className="px-4 py-3 rounded-xl border border-[#FFD700]/20 bg-white/5 text-white hover:bg-white/10"
              >
                Explore features
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl border border-[#FFD700]/20 bg-white/5 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
              <div className="rounded-xl border border-[#FFD700]/15 bg-gradient-to-br from-[#0d0d0d] to-[#111] overflow-hidden aspect-[16/10] relative">
                {/* Abstract blocks */}
                <div className="grid grid-cols-[1.2fr_1fr] gap-3 p-4">
                  <div className="grid gap-2">
                    <div className="h-[14px] w-2/5 rounded bg-white/10" />
                    <div className="h-[120px] rounded border border-[#FFD700]/15 bg-gradient-to-br from-[#0f0f0f] to-[#151515]" />
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-[74px] rounded border border-[#FFD700]/15 bg-gradient-to-br from-[#0f0f0f] to-[#151515]" />
                      <div className="h-[74px] rounded border border-[#FFD700]/15 bg-gradient-to-br from-[#0f0f0f] to-[#151515]" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="h-7 rounded bg-gradient-to-b from-[#FFD700] to-[#F4C430] shadow-[0_8px_24px_rgba(255,215,0,0.25)]" />
                    <div className="h-7 rounded bg-white/10" />
                    <div className="h-7 rounded bg-white/10" />
                    <div className="h-full rounded border border-[#FFD700]/15 bg-gradient-to-br from-[#0f0f0f] to-[#151515]" />
                  </div>
                </div>
                <div className="absolute left-3 bottom-3 flex gap-2">
                  <span className="px-2.5 py-1 text-xs rounded-full text-black bg-gradient-to-b from-[#FFD700] to-[#F4C430] shadow-[0_4px_18px_rgba(255,215,0,0.25)]">
                    Daily 10
                  </span>
                  <span className="px-2.5 py-1 text-xs rounded-full text-black bg-gradient-to-b from-[#FFD700] to-[#F4C430] shadow-[0_4px_18px_rgba(255,215,0,0.25)]">
                    Streak Safe
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <h2 className="text-center text-3xl md:text-[38px] font-extrabold">
            Engineered for Momentum
          </h2>
          <p className="mt-2 text-center text-white/70 max-w-[760px] mx-auto">
            Every interaction pushes you forward. Apex pairs ruthless simplicity
            with premium craft so your habits stay on autopilot.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <article
                key={i}
                className="relative rounded-xl border border-[#FFD700]/20 bg-white/5 p-6 overflow-hidden hover:translate-y-[-4px] transition-transform shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
              >
                <div className="w-11 h-11 rounded-lg grid place-items-center font-black text-black bg-gradient-to-b from-[#FFD700] to-[#F4C430] shadow-[0_8px_24px_rgba(255,215,0,0.25)]">
                  {i}
                </div>
                <h3 className="mt-3 text-lg font-extrabold">
                  {
                    [
                      "Ten Pillars, One Checklist",
                      "Streaks That Mean It",
                      "Midnight Reset, Your Timezone",
                      "Progress You Can Feel",
                    ][i - 1]
                  }
                </h3>
                <p className="text-white/70">
                  {
                    [
                      "Hydrate, move, read, build. Define your essentials, complete them daily—no fluff.",
                      "Miss a task and the counter resets. Pressure creates diamonds—and discipline.",
                      "Built for travelers and late grinders. We respect your local midnight.",
                      "Gold feedback, subtle glow, and motion. Motivation without noise.",
                    ][i - 1]
                  }
                </p>
                <div
                  className="absolute -right-4 -bottom-4 w-40 h-40 opacity-20 blur-sm rounded-2xl"
                  style={{
                    background:
                      "conic-gradient(from 180deg at 50% 50%, rgba(255,215,0,0.8), rgba(244,196,48,0.4), rgba(230,194,0,0.8), rgba(255,215,0,0.8))",
                  }}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20">
        <div className="mx-auto max-w-[1200px] px-6 grid md:grid-cols-[1.1fr_1fr] gap-10 items-center">
          <div className="rounded-2xl border border-[#FFD700]/20 bg-white/5 p-6">
            <h2 className="text-2xl font-extrabold">How It Works</h2>
            <ol className="mt-3 space-y-2 text-white/80 list-decimal list-inside">
              <li>
                <span className="font-semibold">Set your ten:</span> choose the
                fundamentals that move you forward.
              </li>
              <li>
                <span className="font-semibold">Lock your window:</span> one day
                at a time, midnight reset.
              </li>
              <li>
                <span className="font-semibold">Show your work:</span> tap to
                complete, hold to undo.
              </li>
              <li>
                <span className="font-semibold">Protect the streak:</span> miss
                one and start again stronger.
              </li>
            </ol>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="#download"
                className="px-4 py-2 rounded-xl font-bold text-black bg-gradient-to-b from-[#FFD700] to-[#F4C430] shadow-[0_8px_24px_rgba(255,215,0,0.25)] hover:brightness-105"
              >
                Start free
              </a>
              <a
                href="#why"
                className="px-4 py-2 rounded-xl border border-[#FFD700]/20 bg-white/5 text-white hover:bg-white/10"
              >
                Why Apex
              </a>
            </div>
          </div>
          <div className="relative rounded-xl border border-[#FFD700]/15 bg-gradient-to-br from-[#0d0d0d] to-[#111111] aspect-[4/3] overflow-hidden">
            <div
              className="absolute -left-16 -top-8 w-60 h-60 rounded-full blur-2xl opacity-60"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,215,0,0.8), rgba(255,215,0,0) 60%)",
              }}
            />
            <div
              className="absolute -right-10 -bottom-6 w-60 h-60 rounded-full blur-2xl opacity-60"
              style={{
                background:
                  "radial-gradient(circle, rgba(244,196,48,0.8), rgba(244,196,48,0) 60%)",
              }}
            />
          </div>
        </div>
      </section>

      {/* Why Apex */}
      <section id="why" className="py-20">
        <div className="mx-auto max-w-[1200px] px-6 grid md:grid-cols-[1fr_1.1fr] gap-10 items-center">
          <div className="relative rounded-xl border border-[#FFD700]/15 bg-gradient-to-br from-[#0d0d0d] to-[#111111] aspect-[4/3] overflow-hidden">
            <div
              className="absolute -right-14 -top-10 w-60 h-60 rounded-full blur-2xl opacity-60"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,215,0,0.8), rgba(255,215,0,0) 60%)",
              }}
            />
            <div
              className="absolute -left-10 -bottom-6 w-60 h-60 rounded-full blur-2xl opacity-60"
              style={{
                background:
                  "radial-gradient(circle, rgba(244,196,48,0.8), rgba(244,196,48,0) 60%)",
              }}
            />
          </div>
          <div className="rounded-2xl border border-[#FFD700]/20 bg-white/5 p-6">
            <h2 className="text-2xl font-extrabold">Why Apex</h2>
            <p className="mt-2 text-white/70">
              We remove friction and amplify focus. No ads, no feeds, no
              distractions—just the daily fundamentals that compound into
              something unshakeable.
            </p>
            <ul className="mt-3 text-white/80 list-disc list-inside">
              <li>Premium gold‑on‑black interface with accessible contrast</li>
              <li>
                Designed for speed: fast taps, clear states, instant feedback
              </li>
              <li>
                Built for accountability: deliberate constraints, honest
                progress
              </li>
            </ul>
            <div className="mt-4">
              <a
                href="#download"
                className="px-4 py-2 rounded-xl font-bold text-black bg-gradient-to-b from-[#FFD700] to-[#F4C430] shadow-[0_8px_24px_rgba(255,215,0,0.25)] hover:brightness-105"
              >
                Claim your streak
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-14 border-y border-[#FFD700]/20 bg-gradient-to-b from-[#FFD700]/10 to-transparent">
        <div className="mx-auto max-w-[1200px] px-6 grid place-items-center gap-3 text-center">
          <p className="text-white/70 m-0">
            You can scroll forever. Or you can build.
          </p>
          <h3 className="text-2xl md:text-[32px] font-black tracking-tight">
            Make Today Count—Then Repeat
          </h3>
          <div className="flex flex-wrap gap-3">
            <a
              href="#download"
              className="px-4 py-2 rounded-xl font-bold text-black bg-gradient-to-b from-[#FFD700] to-[#F4C430] shadow-[0_8px_24px_rgba(255,215,0,0.25)] hover:brightness-105"
            >
              Start now
            </a>
            <a
              href="#features"
              className="px-4 py-2 rounded-xl border border-[#FFD700]/20 bg-white/5 text-white hover:bg-white/10"
            >
              Review features
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-14">
        <div className="mx-auto max-w-[1200px] px-6 grid gap-8 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-2 font-extrabold">
              <span
                className="inline-block w-6 h-6 rounded-md shadow-[0_0_0_2px_rgba(255,215,0,0.28),0_8px_24px_rgba(255,215,0,0.25)]"
                style={{
                  background:
                    "conic-gradient(from 0deg, #FFD700, #F4C430, #e6c200, #FFD700)",
                }}
              />
              <span>Apex</span>
            </div>
            <p className="text-sm text-white/70 mt-2">
              © {new Date().getFullYear()} Apex Labs. All rights reserved.
            </p>
          </div>
          <div>
            <div className="font-extrabold mb-2">Product</div>
            <a
              href="#features"
              className="block text-white/70 hover:text-white py-1"
            >
              Features
            </a>
            <a
              href="#how"
              className="block text-white/70 hover:text-white py-1"
            >
              How it works
            </a>
            <a
              href="#why"
              className="block text-white/70 hover:text-white py-1"
            >
              Why Apex
            </a>
          </div>
          <div>
            <div className="font-extrabold mb-2">Company</div>
            <a
              href="#top"
              className="block text-white/70 hover:text-white py-1"
            >
              About
            </a>
            <a
              href="#top"
              className="block text-white/70 hover:text-white py-1"
            >
              Careers
            </a>
            <a
              href="#top"
              className="block text-white/70 hover:text-white py-1"
            >
              Press
            </a>
          </div>
          <div>
            <div className="font-extrabold mb-2">Get the App</div>
            <a
              href="#download"
              className="block text-white/70 hover:text-white py-1"
            >
              iOS
            </a>
            <a
              href="#download"
              className="block text-white/70 hover:text-white py-1"
            >
              Android
            </a>
            <a
              href="#download"
              className="block text-white/70 hover:text-white py-1"
            >
              Web
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
