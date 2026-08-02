"use client"
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getUserPorjects } from "./API/projectServices/projectService";

export default function Home() {



  const {data, isLoading , isError} = useQuery({
    queryKey: ['projects'],
    queryFn:async()=>{
      const res = await getUserPorjects()
      console.log(res)
      return res.data
    }
    
  })


  return (
    <div className="flex flex-col flex-1 bg-black font-sans text-white overflow-hidden">
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-28 md:pt-32 md:pb-40 max-w-7xl mx-auto text-center flex flex-col items-center">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-purple-600/15 to-rose-500/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping" />
          <span className="text-xs font-mono font-medium text-zinc-300">Vercel AI SDK 4.0 Available</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight max-w-5xl mb-6 bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
          Develop. Preview. Ship.
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-3xl mb-10 font-normal leading-relaxed">
          The cloud platform for frontend teams and AI innovators. Build high-performance web applications that scale effortlessly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <Link
            href="/#deploy"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-base transition-all duration-200 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>Start Deploying</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2 hover:border-zinc-600"
          >
            <span>Explore Docs</span>
          </a>
        </div>
      </section>

      <section id="features" className="px-4 sm:px-6 lg:px-8 py-24 max-w-7xl mx-auto border-t border-zinc-900 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Engineered for global velocity
          </h2>
          <p className="text-zinc-400 text-base md:text-lg">
            Experience automatic CI/CD, edge serverless functions, real-time analytics, and best-in-class developer tooling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Global Edge Network",
              description: "Deliver your content from 100+ edge locations worldwide for sub-millisecond latencies and instant page loading.",
              icon: (
                <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
            },
            {
              title: "Zero-Configuration AI",
              description: "Connect instantly to leading AI providers like OpenAI, Anthropic, and Google with streaming responses out of the box.",
              icon: (
                <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
            },
            {
              title: "Automatic Previews",
              description: "Every git pull request generates a live, shareable URL immediately for seamless design feedback and testing.",
              icon: (
                <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
            },
          ].map((card, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-zinc-800/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">{card.description}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-800/50 flex items-center text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors">
                <span>Learn more</span>
                <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-20 my-12 max-w-5xl mx-auto w-full">
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-zinc-900/80 border border-zinc-700/80 p-10 sm:p-14 text-center overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to deploy your next application?
            </h2>
            <p className="text-zinc-300 text-base sm:text-lg">
              Get started for free in seconds. Connect your GitHub repository and scale with zero configuration.
            </p>
            <div className="pt-2">
              <Link
                href="/#deploy"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-black hover:bg-zinc-200 font-bold text-sm sm:text-base shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-all duration-200"
              >
                Start Your Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
