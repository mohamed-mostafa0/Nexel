"use client";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { connectProject, getUserPorjects, triggerDeplyoment, getDeployments } from "../API/projectServices/projectService";
import Link from "next/link";
import { Reveal } from "@/components/Motion";

const primaryPill =
  "inline-flex items-center justify-center gap-2 rounded-pill bg-vellum px-4 py-2 text-sm font-medium text-obsidian transition-colors duration-200 hover:bg-white";
const ghostPill =
  "inline-flex items-center justify-center gap-2 rounded-pill border border-charcoal px-4 py-2 text-sm font-medium text-vellum transition-colors duration-200 hover:border-smoke hover:bg-white/[0.04]";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await getUserPorjects();
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  const [deployStates, setDeployStates] = useState({});

  const handleImport = async (repoFullName) => {
    setDeployStates((prev) => ({
      ...prev,
      [repoFullName]: { status: "CONNECTING" },
    }));

    try {
      const connectRes = await connectProject({ repoFullName  });
      const projectId = connectRes.data.id;

      setDeployStates((prev) => ({
        ...prev,
        [repoFullName]: { status: "DEPLOYING" },
      }));

      const deployRes = await triggerDeplyoment(projectId);
      const deploymentId = deployRes.data.id;

      let isReady = false;
      while (!isReady) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const statusRes = await getDeployments(projectId, deploymentId);

        if (statusRes.data.status === "READY") {
          isReady = true;
          setDeployStates((prev) => ({
            ...prev,
            [repoFullName]: { status: "READY", url: statusRes.data.url },
          }));
        } else if (statusRes.data.status === "ERROR" || statusRes.data.status === "FAILED") {
          throw new Error(statusRes.data.errorMessage || "Deployment failed");
        }
      }
    } catch (err) {
      console.error("Deployment Error:", err);
      setDeployStates((prev) => ({
        ...prev,
        [repoFullName]: { status: "ERROR", errorMessage: err.message || "An error occurred" },
      }));
    }
  };

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

  const readyCount = useMemo(
    () => Object.values(deployStates).filter((s) => s?.status === "READY").length,
    [deployStates]
  );

  return (
    <div className="relative flex-1 overflow-hidden text-vellum">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[440px]"
        style={{
          background:
            "radial-gradient(48rem 22rem at 18% -12%, rgba(97,153,246,0.1), transparent 60%), radial-gradient(42rem 22rem at 92% -4%, rgba(79,79,128,0.14), transparent 62%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Dashboard</p>
              <h1 className="mt-4 text-4xl font-normal leading-[1.05] tracking-[-0.03em] text-vellum md:text-5xl">
                Your repositories
              </h1>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ash md:text-base">
                Connect a GitHub repository and ship it to the edge in seconds.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {!isLoading && !isError && repositories.length > 0 && (
                <span className="inline-flex items-center gap-2 rounded-pill border border-charcoal bg-white/[0.03] px-4 py-2 font-mono text-xs text-smoke">
                  <span className="h-1.5 w-1.5 rounded-full bg-iris animate-pulse motion-reduce:animate-none" />
                  {filteredRepos.length} repositories
                </span>
              )}
              <Link href="/" className={ghostPill}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Home
              </Link>
            </div>
          </div>
        </Reveal>

        {!isLoading && !isError && (
          <Reveal delay={80} y={16}>
            <div className="mt-10 grid grid-cols-3 gap-6 border-y border-white/5 py-8">
              {[
                ["Repositories", repositories.length],
                ["Deployed", readyCount],
                ["Edge regions", "100+"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-2xl font-normal tracking-[-0.02em] text-vellum md:text-4xl">
                    {value}
                  </p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-smoke">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        <Reveal delay={120} y={14}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="group flex flex-1 items-center gap-2 rounded-pill border border-charcoal bg-graphite/60 px-5 py-1.5 transition-colors duration-200 focus-within:border-iris/60 focus-within:bg-graphite">
              <svg className="h-5 w-5 flex-none text-smoke transition-colors duration-200 group-focus-within:text-iris" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search repositories by name, owner, or branch"
                className="w-full bg-transparent px-2 py-2 text-[15px] text-vellum placeholder-smoke focus:outline-none focus:ring-0"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="rounded-pill p-1.5 text-smoke transition-colors hover:bg-white/5 hover:text-vellum"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 rounded-pill border border-charcoal bg-graphite/60 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded-full p-2 transition-colors ${viewMode === "grid" ? "bg-white/10 text-vellum" : "text-smoke hover:text-vellum"}`}
                aria-label="Grid view"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`rounded-full p-2 transition-colors ${viewMode === "list" ? "bg-white/10 text-vellum" : "text-smoke hover:text-vellum"}`}
                aria-label="List view"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 min-h-[400px]">
          {isLoading || isRefetching ? (
            <div className={viewMode === "grid" ? "grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-3"}>
              {[...Array(viewMode === "grid" ? 6 : 4)].map((_, i) => (
                <div
                  key={i}
                  className={`animate-pulse rounded-card border border-white/5 bg-graphite/50 ${viewMode === "grid" ? "flex h-44 flex-col justify-between p-6" : "flex items-center justify-between p-4"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-11 w-11 flex-none rounded-card bg-white/5" />
                    <div className="w-48 space-y-2.5">
                      <div className="h-3.5 w-3/4 rounded bg-white/5" />
                      <div className="h-3 w-1/2 rounded bg-white/[0.03]" />
                    </div>
                  </div>
                  {viewMode === "grid" && (
                    <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-4">
                      <div className="h-6 w-20 rounded-pill bg-white/5" />
                      <div className="h-8 w-20 rounded-pill bg-white/5" />
                    </div>
                  )}
                  {viewMode === "list" && (
                    <div className="flex items-center gap-4">
                      <div className="h-6 w-20 rounded-pill bg-white/5" />
                      <div className="h-8 w-20 rounded-pill bg-white/5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : isError ? (
            <Reveal>
              <div className="mx-auto flex max-w-lg flex-col items-center rounded-feature border border-red-500/20 bg-red-500/[0.04] p-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 text-red-400/90">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="mt-5 text-xl font-medium text-vellum">Couldn't load repositories</h3>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ash">
                  There was a problem connecting to GitHub. Check your credentials or try again.
                </p>
                <button onClick={() => refetch()} className={`${primaryPill} mt-7`}>
                  Try again
                </button>
              </div>
            </Reveal>
          ) : filteredRepos.length === 0 ? (
            <Reveal>
              <div className="mx-auto flex max-w-lg flex-col items-center rounded-feature border border-dashed border-charcoal bg-white/[0.02] p-14 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-card border border-white/10 bg-white/[0.03] text-iris">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="mt-5 text-xl font-medium text-vellum">
                  {searchQuery ? "No matching repositories" : "No repositories found"}
                </h3>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ash">
                  {searchQuery
                    ? `We couldn't find any repositories matching "${searchQuery}".`
                    : "Connect your GitHub account or check your permissions to see projects here."}
                </p>
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className={`${ghostPill} mt-6`}>
                    Clear search
                  </button>
                )}
              </div>
            </Reveal>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 gap-5 md:auto-rows-fr md:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-3"}>
              {filteredRepos.map((repo, i) => {
                const parts = (repo.full_name || "").split("/");
                const owner = parts.length > 1 ? parts[0] : "";
                const repoName = parts.length > 1 ? parts[1] : (repo.name || repo.full_name);
                const state = deployStates[repo.full_name];

                if (viewMode === "list") {
                  return (
                    <Reveal key={repo.id || repo.full_name} delay={Math.min(i, 8) * 30} y={10}>
                      <div className="group flex items-center justify-between gap-4 rounded-card border border-twilight/40 bg-graphite/70 p-4 transition-colors duration-300 hover:border-twilight hover:bg-white/[0.02]">
                        <div className="flex min-w-0 items-center gap-4">
                          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-card border border-white/10 bg-white/[0.03] text-smoke transition-colors duration-300 group-hover:border-iris/40 group-hover:bg-iris/5 group-hover:text-iris">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="truncate text-[15px] font-medium tracking-tight text-vellum">
                                {owner ? <span className="text-smoke font-normal">{owner}/</span> : ""}{repoName}
                              </h3>
                              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-pill border border-charcoal bg-void/60 px-2 py-0.5 font-mono text-[10px] text-smoke">
                                <svg className="h-3 w-3 text-iris" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 3v12M18 9a3 3 0 100-6 3 3 0 000 6zM6 21a3 3 0 100-6 3 3 0 000 6zm0-6a9 9 0 009-9" />
                                </svg>
                                <span className="max-w-[100px] truncate">{repo.default_branch || "main"}</span>
                              </span>
                            </div>
                            <p className="mt-0.5 truncate text-[13px] text-ash hidden md:block max-w-lg">
                              {repo.description || "No description provided."}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-none items-center gap-4">
                          {state?.status === "CONNECTING" || state?.status === "DEPLOYING" ? (
                            <div className="inline-flex items-center gap-2 rounded-pill border border-charcoal bg-white/[0.03] px-4 py-1.5 text-sm font-medium text-ash">
                              <svg className="h-4 w-4 animate-spin text-iris" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
                              </svg>
                              <span className="hidden sm:inline">{state.status === "CONNECTING" ? "Connecting" : "Deploying"}</span>
                            </div>
                          ) : state?.status === "READY" ? (
                            <a
                              href={state.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-pill border border-iris/40 bg-iris/10 px-4 py-1.5 text-sm font-medium text-iris transition-colors duration-200 hover:bg-iris/15"
                            >
                              Visit
                              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          ) : state?.status === "ERROR" ? (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-red-400">Failed</span>
                              <button
                                onClick={() => handleImport(repo.full_name)}
                                className="inline-flex items-center gap-1.5 rounded-pill border border-charcoal px-4 py-1.5 text-sm font-medium text-vellum hover:bg-white/5"
                              >
                                Retry
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleImport(repo.full_name)}
                              className="inline-flex items-center gap-1.5 rounded-pill border border-charcoal bg-vellum px-4 py-1.5 text-sm font-medium text-obsidian transition-colors hover:bg-white"
                            >
                              Import
                            </button>
                          )}
                        </div>
                      </div>
                    </Reveal>
                  );
                }

                return (
                  <Reveal key={repo.id || repo.full_name} delay={Math.min(i, 8) * 50} y={16} className="h-full">
                    <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-card border border-twilight/40 bg-graphite/70 p-6 transition-colors duration-300 hover:border-twilight hover:shadow-[0_0_30px_rgba(79,79,128,0.15)]">
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-twilight/30 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                      />

                      <div className="relative">
                        <div className="flex items-start gap-4">
                          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-card border border-white/10 bg-white/[0.03] text-smoke transition-colors duration-300 group-hover:border-iris/40 group-hover:bg-iris/5 group-hover:text-iris">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                          </div>
                          <div className="min-w-0 flex-1 pt-0.5">
                            <p className="truncate font-mono text-[11px] text-smoke">{owner}</p>
                            <h3 className="mt-0.5 truncate text-lg font-medium tracking-tight text-vellum">
                              {repoName}
                            </h3>
                          </div>
                        </div>

                        <p className="mt-4 line-clamp-2 min-h-[40px] text-[13px] leading-relaxed text-ash">
                          {repo.description || "No description provided for this repository."}
                        </p>
                      </div>

                      <div className="relative mt-6 flex items-center justify-between border-t border-white/5 pt-5">
                        <span className="inline-flex items-center gap-1.5 rounded-pill border border-charcoal bg-void/60 px-3 py-1.5 font-mono text-[11px] text-smoke">
                          <svg className="h-3.5 w-3.5 text-iris" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 3v12M18 9a3 3 0 100-6 3 3 0 000 6zM6 21a3 3 0 100-6 3 3 0 000 6zm0-6a9 9 0 009-9" />
                          </svg>
                          <span className="max-w-[100px] truncate">{repo.default_branch || "main"}</span>
                        </span>

                        {state?.status === "CONNECTING" || state?.status === "DEPLOYING" ? (
                          <div className="inline-flex items-center gap-2 rounded-pill border border-charcoal bg-white/[0.03] px-4 py-2 text-sm font-medium text-ash">
                            <svg className="h-4 w-4 animate-spin text-iris" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                              <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
                            </svg>
                            <span>{state.status === "CONNECTING" ? "Connecting" : "Deploying"}</span>
                          </div>
                        ) : state?.status === "READY" ? (
                          <a
                            href={state.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-pill border border-iris/40 bg-iris/10 px-4 py-2 text-sm font-medium text-iris transition-colors duration-200 hover:bg-iris/15"
                          >
                            Visit
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        ) : state?.status === "ERROR" ? (
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-[11px] text-red-400">Failed</span>
                            <button
                              onClick={() => handleImport(repo.full_name)}
                              className="inline-flex items-center gap-1.5 rounded-pill border border-charcoal px-4 py-1.5 text-sm font-medium text-vellum hover:bg-white/5"
                            >
                              Retry
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleImport(repo.full_name)}
                            className="inline-flex items-center gap-1.5 rounded-pill border border-charcoal bg-vellum px-4 py-2 text-sm font-medium text-obsidian transition-colors hover:bg-white"
                          >
                            Import
                          </button>
                        )}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
