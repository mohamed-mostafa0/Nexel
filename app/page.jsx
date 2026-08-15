import Link from "next/link";
import { Reveal, Counter } from "@/components/Motion";

/* --- shared building blocks (Server Components, no client hooks) --- */

const primaryPill =
  "inline-flex items-center justify-center gap-2 rounded-pill bg-vellum px-6 py-3 text-sm font-medium text-obsidian transition-colors duration-200 hover:bg-white";
const ghostPill =
  "inline-flex items-center justify-center gap-2 rounded-pill border border-charcoal px-6 py-3 text-sm font-medium text-vellum transition-colors duration-200 hover:border-smoke hover:bg-white/[0.04]";

function Eyebrow({ children, className = "" }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

function ArrowIcon({ className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}

/* Product imagery frame: 10px radius, 1px violet border, a soft violet halo —
   the only "frame" the reference allows. */
function Framed({ children, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[48px] bg-twilight/20 blur-[60px]"
      />
      <div className="overflow-hidden rounded-card border border-twilight/60 bg-graphite">
        {children}
      </div>
    </div>
  );
}

const frameworks = [
  "Next.js", "React", "Svelte", "Vue", "Nuxt",
  "Remix", "Astro", "SolidJS", "Angular", "Gatsby",
];

const stats = [
  { to: 100, suffix: "+", label: "Edge regions worldwide" },
  { to: 99.99, decimals: 2, suffix: "%", label: "Uptime SLA" },
  { to: 45, suffix: "ms", label: "Median global response" },
  { to: 1.2, decimals: 1, suffix: "M", label: "Deploys shipped daily" },
];

const pillars = [
  {
    title: "Edge by default",
    desc: "Every route is served from 100+ regions, so your first paint is fast whether the visitor is in Berlin or Bengaluru.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  {
    title: "Zero-config AI",
    desc: "Stream from OpenAI, Anthropic, and Google with one import. No servers to manage, no keys to leak.",
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />,
  },
  {
    title: "Observable everything",
    desc: "Real-user Core Web Vitals, per-request logs, and traces — no instrumentation, no sampling, no add-ons.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    ),
  },
];

const steps = [
  { n: "01", title: "Connect", desc: "Link GitHub, GitLab, or Bitbucket. Nexel detects your framework and configures the build — no YAML." },
  { n: "02", title: "Preview", desc: "Every push gets a live, shareable URL so your team reviews the real thing before it merges." },
  { n: "03", title: "Ship", desc: "Merge to production and go global in seconds, with instant rollbacks and automatic scaling." },
];

function Check({ children }) {
  return (
    <li className="flex items-start gap-3 text-[15px] leading-relaxed text-ash">
      <svg className="mt-0.5 h-4 w-4 flex-none text-iris" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <span>{children}</span>
    </li>
  );
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden text-vellum">
      <section className="relative px-6 pt-16 pb-20 md:pt-24 md:pb-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Eyebrow>The Nexel platform</Eyebrow>
            </Reveal>

            <Reveal delay={80} y={18}>
              <h1 className="mx-auto mt-5 max-w-4xl text-balance text-[2.75rem] font-normal leading-[1.03] tracking-[-0.035em] text-vellum sm:text-6xl md:text-7xl lg:text-[5rem]">
                Ship the work,
                <br className="hidden sm:block" /> not the wait
              </h1>
            </Reveal>

            <Reveal delay={140} y={16}>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ash md:text-lg">
                Nexel is the deployment platform for teams who move at the speed
                of thought — from your first commit to global production, without
                the infrastructure standing in the way.
              </p>
            </Reveal>

            <Reveal delay={200} y={14}>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/dashboard" className={primaryPill}>
                  Start deploying
                  <ArrowIcon />
                </Link>
                <a href="#platform" className={ghostPill}>
                  Explore the platform
                </a>
              </div>
            </Reveal>
          </div>


        </div>
      </section>

      <section className="border-y border-white/5 py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.16em] text-smoke">
            Trusted by teams shipping the modern web
          </p>
        </div>
        <div className="edge-fade mt-8 overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-14 pr-14">
            {[...frameworks, ...frameworks].map((name, i) => (
              <span
                key={i}
                className="whitespace-nowrap text-lg font-medium text-smoke transition-colors duration-200 hover:text-lilac"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div id="platform" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 md:py-28 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal y={20} className="order-2 md:order-1">
            <Eyebrow>Preview deployments</Eyebrow>
            <h2 className="mt-4 max-w-md text-3xl font-normal leading-[1.1] tracking-[-0.02em] text-vellum md:text-[38px]">
              Every commit becomes a living URL
            </h2>
            <p className="mt-5 max-w-[560px] text-[15px] leading-relaxed text-ash md:text-base">
              Open a pull request and Nexel builds it, deploys it, and hands your
              team a shareable link — the exact code, running in a production-grade
              environment, before anything merges.
            </p>
            <ul className="mt-7 space-y-3">
              <Check>Isolated URL for every branch and PR</Check>
              <Check>Comment threads pinned to the live preview</Check>
              <Check>Automatic teardown when the branch closes</Check>
            </ul>
            <a href="#workflow" className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-iris transition-colors hover:text-lilac">
              See the workflow
              <ArrowIcon className="h-3.5 w-3.5" />
            </a>
          </Reveal>

          <Reveal delay={120} y={24} className="order-1 md:order-2">
            <Framed>
              <div className="flex items-center gap-2 border-b border-white/5 bg-void/70 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="ml-2 truncate font-mono text-[11px] text-smoke">
                  feat/checkout-redesign · preview
                </span>
                <span className="ml-auto inline-flex items-center gap-1.5 rounded-pill border border-iris/30 bg-iris/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-iris">
                  Ready
                </span>
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                    <svg className="h-4 w-4 text-iris" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 010 5.656m-3.656-1.656a4 4 0 010-5.656m5.656-2.828a8 8 0 010 11.313M8.343 6.343a8 8 0 000 11.313" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm text-vellum">checkout-redesign-9f3a.nexel.app</p>
                    <p className="font-mono text-[11px] text-smoke">deployed 40s ago · 45ms</p>
                  </div>
                </div>
                <div className="h-px bg-white/5" />
                {[
                  { m: "aria labels on the pay button", who: "ava" },
                  { m: "swap card icons to outline set", who: "leo" },
                  { m: "fix total rounding on tax", who: "mira" },
                ].map((c) => (
                  <div key={c.m} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 flex-none rounded-full bg-twilight" />
                    <p className="truncate text-[13px] text-ash">{c.m}</p>
                    <span className="ml-auto font-mono text-[11px] text-smoke">@{c.who}</span>
                  </div>
                ))}
              </div>
            </Framed>
          </Reveal>
        </div>

        <div className="mt-24 grid items-center gap-12 md:mt-28 md:grid-cols-2 md:gap-16">
          <Reveal y={24} className="order-1">
            <Framed>
              <div className="flex items-center justify-between border-b border-white/5 bg-void/70 px-4 py-2.5">
                <span className="font-mono text-[11px] text-smoke">Analytics · last 24h</span>
                <span className="font-mono text-[11px] text-iris">Real Experience Score 98</span>
              </div>
              <div className="p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-smoke">Requests</p>
                    <p className="mt-1 text-3xl font-normal tracking-tight text-vellum">4.82M</p>
                  </div>
                  <p className="font-mono text-[11px] text-iris">+12.4%</p>
                </div>
                <div className="mt-6 flex items-end gap-1.5" aria-hidden="true">
                  {[38, 52, 44, 66, 58, 72, 61, 84, 70, 90, 78, 64].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm bg-gradient-to-t from-twilight/40 to-iris/80"
                      style={{ height: `${h}px` }}
                    />
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/5 pt-5">
                  {[
                    ["LCP", "1.1s"],
                    ["INP", "42ms"],
                    ["CLS", "0.01"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-smoke">{k}</p>
                      <p className="mt-1 text-lg font-normal text-vellum">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Framed>
          </Reveal>

          <Reveal delay={120} y={20} className="order-2">
            <Eyebrow>Analytics &amp; observability</Eyebrow>
            <h2 className="mt-4 max-w-md text-3xl font-normal leading-[1.1] tracking-[-0.02em] text-vellum md:text-[38px]">
              Understand real users, not synthetic ones
            </h2>
            <p className="mt-5 max-w-[560px] text-[15px] leading-relaxed text-ash md:text-base">
              Core Web Vitals from actual visitors, per-request logs, and traces
              land in your dashboard the moment you deploy — no SDK to install and
              nothing to sample away.
            </p>
            <ul className="mt-7 space-y-3">
              <Check>Field-data vitals segmented by route and device</Check>
              <Check>Streaming logs with full request context</Check>
              <Check>Anomaly alerts routed to Slack or PagerDuty</Check>
            </ul>
          </Reveal>
        </div>
      </div>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-28 lg:px-8">
          <Reveal>
            <Eyebrow>Why Nexel</Eyebrow>
            <h2 className="mt-4 max-w-2xl text-3xl font-normal leading-[1.1] tracking-[-0.025em] text-vellum md:text-[42px]">
              Infrastructure that gets out of the way
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 100} y={18}>
                <div className="border-t border-white/10 pt-6">
                  <svg className="h-6 w-6 text-iris" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {p.icon}
                  </svg>
                  <h3 className="mt-5 text-lg font-medium text-vellum">{p.title}</h3>
                  <p className="mt-2.5 max-w-xs text-[15px] leading-relaxed text-ash">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:grid-cols-4 md:py-20">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90} y={16}>
                <p className="text-4xl font-normal tracking-[-0.02em] text-vellum md:text-5xl">
                  <Counter to={s.to} decimals={s.decimals} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-sm text-ash">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="border-t border-white/5 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-28 lg:px-8">
          <Reveal>
            <Eyebrow>Workflow</Eyebrow>
            <h2 className="mt-4 max-w-2xl text-3xl font-normal leading-[1.1] tracking-[-0.025em] text-vellum md:text-[42px]">
              From commit to production in three steps
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 110} y={18}>
                <div className="border-t border-white/10 pt-6">
                  <span className="font-mono text-sm text-iris">{step.n}</span>
                  <h3 className="mt-4 text-xl font-medium text-vellum">{step.title}</h3>
                  <p className="mt-2.5 max-w-xs text-[15px] leading-relaxed text-ash">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full"
          style={{
            background:
              "radial-gradient(50rem 30rem at 50% 0%, rgba(97,153,246,0.14), transparent 60%), radial-gradient(40rem 30rem at 50% 100%, rgba(79,79,128,0.16), transparent 65%)",
          }}
        />
        <div className="mx-auto max-w-3xl px-6 py-28 text-center md:py-32 lg:px-8">
          <Reveal>
            <Eyebrow className="!text-iris">Get started</Eyebrow>
          </Reveal>
          <Reveal delay={80} y={18}>
            <h2 className="mx-auto mt-5 max-w-2xl text-balance text-4xl font-normal leading-[1.05] tracking-[-0.03em] text-vellum md:text-6xl">
              Deploy your next idea tonight
            </h2>
          </Reveal>
          <Reveal delay={140} y={14}>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-ash md:text-lg">
              Connect a repository and watch it go global in seconds. Free to
              start, no credit card, zero configuration.
            </p>
          </Reveal>
          <Reveal delay={200} y={12}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/dashboard" className={primaryPill}>
                Start deploying
                <ArrowIcon />
              </Link>
              <a href="#platform" className={ghostPill}>
                Read the docs
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
