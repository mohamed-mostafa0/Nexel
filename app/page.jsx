"use client"
import Link from "next/link";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserPorjects } from "./API/projectServices/projectService";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await getUserPorjects();
      console.log(res);
      return res.data;
    }
  });

  const repositories = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data) ? data : (data?.repos || data?.repositories || data?.data || []);
  }, [data]);

  const filteredRepos = useMemo(() => {
    return repositories.filter((repo) => {
      const query = searchQuery.toLowerCase();
      return (
        (repo.name || "").toLowerCase().includes(query) ||
        (repo.full_name || "").toLowerCase().includes(query) ||
        (repo.default_branch || "").toLowerCase().includes(query)
      );
    });
  }, [repositories, searchQuery]);



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

      {/* GitHub Repositories Section */}
      <section id="deploy" className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto w-full border-t border-zinc-900/80 relative">
        <div className="absolute top-0 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[250px] bg-gradient-to-br from-blue-600/10 via-emerald-500/10 to-transparent blur-[100px] pointer-events-none rounded-full" />
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 mb-4">
              <svg className="w-3.5 h-3.5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span className="text-xs font-mono font-medium text-blue-300">GitHub Integrated</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              Import Git Repository
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              Select a repository from your GitHub account to instantly deploy with automatic CI/CD and edge scaling.
            </p>
          </div>

          {!isLoading && !isError && repositories.length > 0 && (
            <div className="flex items-center gap-3 text-sm font-mono text-zinc-400 bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-xl backdrop-blur-sm shadow-inner">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span>{filteredRepos.length} {filteredRepos.length === 1 ? 'Repository' : 'Repositories'} Available</span>
            </div>
          )}
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-2xl mb-8">
          <div className="relative w-full">
            <svg className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search repositories by name, username, or branch..."
              className="w-full pl-12 pr-10 py-3 bg-zinc-950/90 border border-zinc-800/80 rounded-xl text-base text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/80 transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors p-1 rounded-lg bg-zinc-800/80 hover:bg-zinc-700"
                title="Clear search"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {isLoading || isRefetching ? (
          <div className="space-y-3.5">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/60 animate-pulse flex items-center justify-between gap-4 h-24"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-zinc-800/80 shrink-0" />
                  <div className="space-y-2">
                    <div className="h-5 w-56 bg-zinc-800/80 rounded-md" />
                    <div className="h-3.5 w-32 bg-zinc-800/50 rounded" />
                  </div>
                </div>
                <div className="h-9 w-24 bg-zinc-800/80 rounded-xl shrink-0" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="p-10 rounded-3xl bg-zinc-900/50 border border-rose-500/30 text-center max-w-2xl mx-auto shadow-2xl backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-4 text-rose-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Unable to load repositories</h3>
            <p className="text-zinc-400 text-sm mb-6 max-w-md mx-auto">
              We couldn't reach GitHub to fetch your repositories. Ensure your authentication token is valid and you are signed in.
            </p>
            <button
              onClick={() => refetch()}
              className="px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold transition-all duration-200 border border-zinc-700/80 flex items-center gap-2 mx-auto shadow-lg hover:scale-105"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Retry Fetch</span>
            </button>
          </div>
        ) : filteredRepos.length === 0 ? (
          <div className="p-12 rounded-3xl bg-zinc-900/30 border border-zinc-800/80 text-center max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-zinc-800/60 flex items-center justify-center mx-auto mb-4 text-zinc-500">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">
              {searchQuery ? "No matching repositories" : "No repositories found"}
            </h3>
            <p className="text-zinc-400 text-sm mb-6">
              {searchQuery
                ? "Try adjusting your search keywords."
                : "Connect your GitHub account or check your access permissions to import projects."}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="px-5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold uppercase tracking-wider transition-colors border border-zinc-700/50"
              >
                Reset Search
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredRepos.map((repo) => {
              const parts = (repo.full_name || "").split("/");
              const owner = parts.length > 1 ? parts[0] : "";
              const repoName = parts.length > 1 ? parts[1] : (repo.name || repo.full_name);

              return (
                <div
                  key={repo.id || repo.full_name}
                  className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:px-6 rounded-2xl bg-zinc-900/50 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-[0_4px_25px_rgba(59,130,246,0.15)] overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-zinc-800/80 group-hover:bg-blue-500/10 border border-zinc-700/60 group-hover:border-blue-500/30 flex items-center justify-center text-zinc-400 group-hover:text-blue-400 transition-all duration-300 shrink-0">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-lg truncate">
                        {owner && (
                          <span className="text-zinc-500 font-mono text-sm sm:text-base font-medium shrink-0">
                            {owner} /
                          </span>
                        )}
                        <span className="font-extrabold text-white group-hover:text-blue-400 transition-colors tracking-tight truncate">
                          {repoName}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-950/80 border border-zinc-800 text-zinc-300 font-mono text-xs shadow-inner">
                          <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 3v12M18 9a3 3 0 100-6 3 3 0 000 6zM6 21a3 3 0 100-6 3 3 0 000 6zm0-6a9 9 0 009-9" />
                          </svg>
                          <span>{repo.default_branch || "main"}</span>
                        </div>
                        {repo.id && (
                          <span className="text-zinc-500 font-mono text-xs">
                            ID: <span className="text-zinc-400">{repo.id}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end sm:shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-zinc-800/60 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        console.log("Importing:", repo.full_name);
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-white text-zinc-200 hover:text-black font-semibold text-sm transition-all duration-200 shadow-sm flex items-center justify-center gap-2 group-hover:bg-blue-600 group-hover:text-white group-hover:hover:bg-blue-500 group-hover:hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-95"
                    >
                      <span>Import</span>
                      <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
