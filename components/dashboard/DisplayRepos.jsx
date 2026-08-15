import { Reveal } from "../Motion";

export default function DisplayRepos({
    viewMode,
    filteredRepos,
    handleImport,
    deployStates

}){


return <>
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
    
    </>
}