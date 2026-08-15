


export default function LoadingRepos({
    viewMode
}){


    return (
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
    )
}