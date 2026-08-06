"use client";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserPorjects } from "../API/projectServices/projectService";
import Link from "next/link";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await getUserPorjects();
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  const repositories = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data)
      ? data
      : data?.repos || data?.repositories || data?.data || [];
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
    <div className="flex-1 bg-black min-h-screen text-white font-sans relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-zinc-400 text-lg">
              Manage and deploy your GitHub repositories.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             {!isLoading && !isError && repositories.length > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 text-sm font-mono text-zinc-300 shadow-inner backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  {filteredRepos.length} Repositories
                </div>
              )}
            <Link href="/" className="px-5 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors text-sm font-semibold border border-zinc-700 shadow-sm text-zinc-200 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Home
            </Link>
          </div>
        </div>

        <div className="mb-10 bg-zinc-900/40 border border-zinc-800/80 p-2 pl-4 rounded-2xl flex items-center shadow-lg backdrop-blur-xl group focus-within:border-blue-500/50 transition-colors">
          <svg className="w-5 h-5 text-zinc-500 group-focus-within:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search repositories by name, owner, or branch..."
            className="w-full bg-transparent border-none text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-0 px-4 py-2 text-base"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-2 mr-1 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="min-h-[400px]">
          {isLoading || isRefetching ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-44 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 animate-pulse p-6 flex flex-col justify-between">
                   <div className="flex items-start gap-4">
                     <div className="w-12 h-12 rounded-xl bg-zinc-800/80 shrink-0" />
                     <div className="space-y-3 w-full mt-1">
                        <div className="h-4 w-3/4 bg-zinc-800/80 rounded" />
                        <div className="h-3 w-1/2 bg-zinc-800/50 rounded" />
                     </div>
                   </div>
                   <div className="flex justify-between items-center mt-6 pt-4 border-t border-zinc-800/30">
                     <div className="h-6 w-20 bg-zinc-800/60 rounded-full" />
                     <div className="h-9 w-24 bg-zinc-800/80 rounded-lg" />
                   </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-red-500/5 border border-red-500/20 backdrop-blur-sm shadow-2xl max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 text-red-500">
                 <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                 </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Failed to load repositories</h3>
              <p className="text-zinc-400 mb-8 max-w-md">There was a problem securely connecting to GitHub. Please check your credentials or try again later.</p>
              <button
                onClick={() => refetch()}
                className="px-8 py-3 rounded-full bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-all"
              >
                Try Again
              </button>
            </div>
          ) : filteredRepos.length === 0 ? (
             <div className="flex flex-col items-center justify-center p-16 text-center rounded-3xl bg-zinc-900/20 border border-zinc-800/50 backdrop-blur-sm border-dashed">
                <div className="w-20 h-20 bg-zinc-800/40 rounded-3xl flex items-center justify-center mb-6 text-zinc-600 rotate-12 shadow-inner">
                   <svg className="w-10 h-10 -rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                   </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  {searchQuery ? "No matching repositories" : "No repositories found"}
                </h3>
                <p className="text-zinc-400 max-w-md">
                   {searchQuery 
                    ? `We couldn't find any repositories matching "${searchQuery}".` 
                    : "Connect your GitHub account or check your permissions to see projects here."}
                </p>
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="mt-6 px-6 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors text-sm">
                    Clear Search
                  </button>
                )}
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRepos.map((repo) => {
                const parts = (repo.full_name || "").split("/");
                const owner = parts.length > 1 ? parts[0] : "";
                const repoName = parts.length > 1 ? parts[1] : (repo.name || repo.full_name);

                return (
                  <div
                    key={repo.id || repo.full_name}
                    className="group flex flex-col justify-between bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 hover:bg-zinc-900/80 hover:border-blue-500/40 transition-all duration-300 shadow-lg hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)] relative overflow-hidden backdrop-blur-sm"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div>
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center text-zinc-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-colors shrink-0 shadow-sm">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1 pt-1">
                          <div className="text-sm font-mono text-zinc-500 truncate mb-1">
                            {owner}
                          </div>
                          <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors truncate tracking-tight">
                            {repoName}
                          </h3>
                        </div>
                      </div>
                      
                      <p className="text-zinc-400 text-sm line-clamp-2 min-h-[40px]">
                        {repo.description || "No description provided for this repository."}
                      </p>
                    </div>

                    <div className="mt-6 pt-5 border-t border-zinc-800/50 flex items-center justify-between">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-950/50 border border-zinc-800/80 text-xs font-mono text-zinc-300 shadow-inner">
                        <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 3v12M18 9a3 3 0 100-6 3 3 0 000 6zM6 21a3 3 0 100-6 3 3 0 000 6zm0-6a9 9 0 009-9" />
                        </svg>
                        <span className="truncate max-w-[100px]">{repo.default_branch || "main"}</span>
                      </div>
                      
                      <button
                        onClick={() => console.log("Importing:", repo.full_name)}
                        className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-white text-black font-semibold text-sm transition-all duration-200 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:translate-y-0"
                      >
                        Import
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
