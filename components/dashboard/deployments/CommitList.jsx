import { normalizeCommit, timeAgo } from "./helpers";
import Button from "../../ui/Button";

const CommitIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M12 15a3 3 0 100-6 3 3 0 000 6zM3 12h6m6 0h6"
    />
  </svg>
);

const ExternalIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

function CommitRow({ commit, isLast }) {
  const inner = (
    <>
      <span className="mt-1.5 flex h-2 w-2 flex-none rounded-full bg-iris/70 ring-4 ring-iris/10" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-medium text-vellum">{commit.message}</p>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-[11px] text-smoke">
          <span className="text-ash">{commit.author}</span>
          {commit.date && <span>· {timeAgo(commit.date)}</span>}
          {commit.shortSha && (
            <span className="rounded border border-charcoal bg-void/60 px-1.5 py-0.5">
              {commit.shortSha}
            </span>
          )}
        </p>
      </div>
      {commit.url && (
        <ExternalIcon className="mt-1 h-3.5 w-3.5 flex-none text-smoke transition-colors group-hover:text-iris" />
      )}
    </>
  );

  const base = `group flex items-start gap-3 py-3.5 ${isLast ? "" : "border-b border-white/5"}`;

  return commit.url ? (
    <a href={commit.url} target="_blank" rel="noopener noreferrer" className={`${base} -mx-2 rounded-card px-2 transition-colors hover:bg-white/[0.02]`}>
      {inner}
    </a>
  ) : (
    <div className={base}>{inner}</div>
  );
}

export default function CommitList({ commits, isLoading, isError, refetch }) {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="mt-1.5 h-2 w-2 flex-none rounded-full bg-white/10" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-2/3 rounded bg-white/5" />
              <div className="h-2.5 w-1/3 rounded bg-white/[0.03]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center rounded-card border border-red-500/20 bg-red-500/[0.04] p-8 text-center">
        <p className="text-[15px] font-medium text-vellum">Couldn't load commits</p>
        <p className="mt-1 text-[13px] text-ash">The commit history service didn't respond.</p>
        <Button variant="ghost" onClick={() => refetch?.()} className="mt-4">
          Try again
        </Button>
      </div>
    );
  }

  const list = (commits || []).map(normalizeCommit);

  if (list.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-card border border-dashed border-charcoal bg-white/[0.02] p-10 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-card border border-white/10 bg-white/[0.03] text-iris">
          <CommitIcon className="h-6 w-6" />
        </div>
        <p className="mt-4 text-[15px] font-medium text-vellum">No commits found</p>
        <p className="mt-1 max-w-sm text-[13px] leading-relaxed text-ash">
          We couldn't find any commit history for this project's repository.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {list.map((commit, i) => (
        <CommitRow key={commit.sha || i} commit={commit} isLast={i === list.length - 1} />
      ))}
    </div>
  );
}
