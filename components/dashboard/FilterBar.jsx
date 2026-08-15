import { Reveal } from "../Motion";



export default function FilterBar({
    setSearchQuery,
    searchQuery,
    viewMode,
    setViewMode,
    placeholder = "Search repositories by name, owner, or branch"
}){


    return (

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
                placeholder={placeholder}
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
    )
}