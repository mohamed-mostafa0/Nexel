import { Reveal } from "../Motion";

export default function Header({ isLoading, isError, repositories, filteredRepos, readyCount }) {
  return (
    <>
      <Reveal>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-normal leading-[1.05] tracking-[-0.03em] text-vellum md:text-5xl">
              Import a repository
            </h1>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ash md:text-base">
              Connect a GitHub repository and ship it to the edge in seconds.
            </p>
          </div>

          {!isLoading && !isError && repositories.length > 0 && (
            <span className="inline-flex items-center gap-2 self-start rounded-pill border border-charcoal bg-white/[0.03] px-4 py-2 font-mono text-xs text-smoke md:self-auto">
              <span className="h-1.5 w-1.5 rounded-full bg-iris animate-pulse motion-reduce:animate-none" />
              {filteredRepos.length} repositories
            </span>
          )}
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
    </>
  );
}
