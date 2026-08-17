"use client";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { normalizeCommit, timeAgo } from "./helpers";
import { deployCommit } from "@/app/API/deploymentsServices/deploymentServices";
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

const DeployIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M12 19V5m0 0l-6 6m6-6l6 6"
    />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const Spinner = ({ className }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
    <path
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      className="opacity-75"
    />
  </svg>
);

function DeployCommitButton({ projectId, sha }) {
  const queryClient = useQueryClient();
  const [state, setState] = useState("idle");

  useEffect(() => {
    if (state !== "done" && state !== "error") return;
    const t = setTimeout(() => setState("idle"), 2500);
    return () => clearTimeout(t);
  }, [state]);

  const onDeploy = async () => {
    if (!projectId || !sha || state === "deploying") return;
    setState("deploying");
    try {
      await deployCommit(projectId, sha);
      queryClient.invalidateQueries({ queryKey: ["projectDeployments", projectId] });
      queryClient.invalidateQueries({ queryKey: ["deployments"] });
      setState("done");
    } catch (err) {
      console.error("Deploy commit failed:", err);
      setState("error");
    }
  };

  if (!sha) return null;

  const styles = {
    idle: "border-charcoal text-vellum hover:bg-white/5",
    deploying: "border-charcoal text-ash cursor-not-allowed",
    done: "border-emerald-400/30 bg-emerald-400/10 text-emerald-400",
    error: "border-red-400/30 bg-red-400/10 text-red-400",
  };

  return (
    <button
      onClick={onDeploy}
      disabled={state === "deploying"}
      title="Deploy this commit"
      className={`inline-flex flex-none items-center gap-1.5 rounded-pill border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${styles[state]}`}
    >
      {state === "deploying" ? (
        <>
          <Spinner className="h-3.5 w-3.5 text-iris" />
          <span className="hidden sm:inline">Deploying</span>
        </>
      ) : state === "done" ? (
        <>
          <CheckIcon className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Deployed</span>
        </>
      ) : state === "error" ? (
        <span>Failed — retry</span>
      ) : (
        <>
          <DeployIcon className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Deploy</span>
        </>
      )}
    </button>
  );
}

function CommitRow({ commit, projectId, isLast }) {
  const info = (
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
    </>
  );

  return (
    <div
      className={`flex items-start justify-between gap-3 py-3.5 ${
        isLast ? "" : "border-b border-white/5"
      }`}
    >
      {commit.url ? (
        <a
          href={commit.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group -mx-2 flex min-w-0 flex-1 items-start gap-3 rounded-card px-2 transition-colors hover:bg-white/[0.02]"
        >
          {info}
          <ExternalIcon className="mt-1 h-3.5 w-3.5 flex-none text-smoke transition-colors group-hover:text-iris" />
        </a>
      ) : (
        <div className="flex min-w-0 flex-1 items-start gap-3">{info}</div>
      )}

      <DeployCommitButton projectId={projectId} sha={commit.sha} />
    </div>
  );
}

export default function CommitList({ commits, isLoading, isError, refetch, projectId }) {
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
        <CommitRow
          key={commit.sha || i}
          commit={commit}
          projectId={projectId}
          isLast={i === list.length - 1}
        />
      ))}
    </div>
  );
}
