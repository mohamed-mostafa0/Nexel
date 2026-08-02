"use client"
import Link from "next/link";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserPorjects } from "./API/projectServices/projectService";

const getLanguageColor = (lang) => {
  if (!lang) return "bg-zinc-500";
  const colors = {
    JavaScript: "bg-yellow-400",
    TypeScript: "bg-blue-500",
    Python: "bg-emerald-500",
    HTML: "bg-orange-500",
    CSS: "bg-indigo-400",
    Java: "bg-red-500",
    Go: "bg-cyan-400",
    Rust: "bg-amber-600",
    PHP: "bg-purple-500",
    C: "bg-gray-400",
    "C++": "bg-pink-500",
    Ruby: "bg-rose-500",
  };
  return colors[lang] || "bg-blue-400";
};

const formatUpdatedDate = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 30) return `${diffInDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "";
  }
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("ALL");

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

  const languages = useMemo(() => {
    const langs = new Set(["ALL"]);
    repositories.forEach((repo) => {
      if (repo.language) langs.add(repo.language);
    });
    return Array.from(langs);
  }, [repositories]);

  const filteredRepos = useMemo(() => {
    return repositories.filter((repo) => {
      const matchesSearch =
        (repo.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLang = selectedLanguage === "ALL" || repo.language === selectedLanguage;
      return matchesSearch && matchesLang;
    });
  }, [repositories, searchQuery, selectedLanguage]);


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

        <div className="bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-2xl mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            <div className="relative flex-1 max-w-lg">
              <svg className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search repositories by name or description..."
                className="w-full pl-10 pr-10 py-2.5 bg-zinc-950/80 border border-zinc-800/80 rounded-xl text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/80 transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors p-0.5"
                  title="Clear search"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {!isLoading && languages.length > 1 && (
              <div className="flex items-center gap-1.5 flex-wrap overflow-x-auto py-1">
                <span className="text-xs font-mono font-medium text-zinc-500 mr-1 hidden sm:inline">Filter:</span>
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      selectedLanguage === lang
                        ? "bg-white text-black font-semibold shadow-md scale-105"
                        : "bg-zinc-800/60 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                    }`}
                  >
                    {lang === "ALL" ? "All Languages" : lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {isLoading || isRefetching ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/60 animate-pulse flex flex-col justify-between h-44"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-5 w-48 bg-zinc-800/80 rounded-md" />
                    <div className="h-5 w-16 bg-zinc-800/80 rounded-full" />
                  </div>
                  <div className="h-3 w-full bg-zinc-800/50 rounded" />
                  <div className="h-3 w-2/3 bg-zinc-800/50 rounded" />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-zinc-800/40">
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-20 bg-zinc-800/60 rounded" />
                    <div className="h-4 w-14 bg-zinc-800/60 rounded" />
                  </div>
                  <div className="h-8 w-20 bg-zinc-800/80 rounded-lg" />
                </div>
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
              {searchQuery || selectedLanguage !== "ALL" ? "No matching repositories" : "No repositories found"}
            </h3>
            <p className="text-zinc-400 text-sm mb-6">
              {searchQuery || selectedLanguage !== "ALL"
                ? "Try adjusting your search keywords or clearing the language filter."
                : "Connect your GitHub account or check your access permissions to import projects."}
            </p>
            {(searchQuery || selectedLanguage !== "ALL") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedLanguage("ALL");
                }}
                className="px-5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold uppercase tracking-wider transition-colors border border-zinc-700/50"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRepos.map((repo) => (
              <div
                key={repo.id || repo.name}
                className="group relative p-6 rounded-2xl bg-zinc-900/50 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-blue-500/40 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all duration-500 pointer-events-none" />

                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="p-2 rounded-lg bg-zinc-800/80 text-zinc-300 group-hover:text-white transition-colors">
                        {repo.private ? (
                          <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                          </svg>
                        )}
                      </div>
                      <a
                        href={repo.html_url || `#`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-white text-lg hover:text-blue-400 transition-colors truncate block max-w-[240px] sm:max-w-[280px]"
                      >
                        {repo.name || repo.full_name}
                      </a>
                    </div>
                    <span className={`text-[10px] uppercase font-mono tracking-wider font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                      repo.private
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : "bg-zinc-800/80 text-zinc-400 border-zinc-700/80"
                    }`}>
                      {repo.private ? "Private" : "Public"}
                    </span>
                  </div>

                  <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 min-h-[40px] mb-6">
                    {repo.description || (
                      <span className="italic text-zinc-600">No repository description provided.</span>
                    )}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between gap-4 text-xs font-mono text-zinc-400">
                  <div className="flex items-center gap-4 flex-wrap">
                    {repo.language && (
                      <div className="flex items-center gap-1.5" title="Primary Language">
                        <span className={`h-2.5 w-2.5 rounded-full ${getLanguageColor(repo.language)}`} />
                        <span className="font-medium text-zinc-300">{repo.language}</span>
                      </div>
                    )}
                    {typeof repo.stargazers_count === 'number' && (
                      <div className="flex items-center gap-1 text-zinc-400 hover:text-zinc-200 transition-colors" title="Stargazers">
                        <svg className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        <span>{repo.stargazers_count}</span>
                      </div>
                    )}
                    {repo.updated_at && (
                      <span className="text-zinc-500 hidden sm:inline" title={`Updated: ${new Date(repo.updated_at).toLocaleString()}`}>
                        Updated {formatUpdatedDate(repo.updated_at)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      alert(`Deploying ${repo.name || 'repository'}...`);
                    }}
                    className="px-4 py-2 rounded-xl bg-zinc-800/90 hover:bg-white text-zinc-200 hover:text-black font-sans font-bold text-xs tracking-wide transition-all duration-200 shadow-sm flex items-center gap-1.5 shrink-0 group-hover:bg-blue-600 group-hover:text-white group-hover:hover:bg-blue-500 group-hover:hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] active:scale-95"
                  >
                    <span>Import</span>
                    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
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
