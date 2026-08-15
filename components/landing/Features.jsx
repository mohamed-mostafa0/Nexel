import { Counter, Reveal } from "../Motion";



export default function Features(){


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

 
return <>

        <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-28 lg:px-8">
            <Reveal>
            <p className="eyebrow">Why Nexel</p>
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
            <p className="eyebrow">Workflow</p>
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
</>
}