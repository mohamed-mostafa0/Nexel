import { Reveal } from "../Motion";
import ArrowIcon from "../ui/ArrowIcon";
import Check from "../ui/Check";
import Framed from "../ui/Framed";




export default function Platform(){

    return <>
          <div id="platform" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 md:py-28 lg:px-8">
            <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
              <Reveal y={20} className="order-2 md:order-1">
                <p className="eyebrow">Preview deployments</p>
                <h2 className="mt-4 max-w-md text-3xl font-normal leading-[1.1] tracking-[-0.02em] text-vellum md:text-[38px]">
                  Every commit becomes a living URL
                </h2>
                <p className="mt-5 max-w-[560px] text-[15px] leading-relaxed text-ash md:text-base">
                  Open a pull request and Nexel builds it, deploys it, and hands your
                  team a shareable link — the exact code, running in a production-grade
                  environment, before anything merges.
                </p>
                <ul className="mt-7 space-y-3">
                  <Check>
                    Isolated URL for every branch and PR
                  </Check>
                  <Check>
                    Comment threads pinned to the live preview
                    </Check>
                  <Check>
                    Automatic teardown when the branch closes
                    </Check>
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
                <p className="eyebrow">Analytics &amp; observability</p>
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
    
    </>
}