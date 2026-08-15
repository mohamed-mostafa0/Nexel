"use client";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Reveal } from "../../Motion";
import StatusBadge from "../StatusBadge";
import { timeAgo } from "./helpers";
import { triggerDeplyoment } from "@/app/API/projectServices/projectService";

const GlobeIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-9c2.5 2.4 3.9 5.7 3.9 9s-1.4 6.6-3.9 9c-2.5-2.4-3.9-5.7-3.9-9S9.5 5.4 12 3zM3.6 9h16.8M3.6 15h16.8"
    />
  </svg>
);

const BranchIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 3v12M18 9a3 3 0 100-6 3 3 0 000 6zM6 21a3 3 0 100-6 3 3 0 000 6zm0-6a9 9 0 009-9"
    />
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

function useRedeploy(projectId) {
  const queryClient = useQueryClient();
  const [redeploying, setRedeploying] = useState(false);

  const redeploy = async () => {
    if (!projectId || redeploying) return;
    setRedeploying(true);
    try {
      await triggerDeplyoment(projectId);
      // Surface the freshly-triggered deployment in the overview.
      queryClient.invalidateQueries({ queryKey: ["deployments"] });
    } catch (err) {
      console.error("Redeploy failed:", err);
    } finally {
      setRedeploying(false);
    }
  };

  return { redeploying, redeploy };
}

function VisitButton({ url, size = "md" }) {
  const pad = size === "sm" ? "px-4 py-1.5" : "px-4 py-2";
  if (!url) {
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-pill border border-charcoal bg-white/[0.02] ${pad} text-sm font-medium text-smoke`}
      >
        No URL
      </span>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-pill border border-iris/40 bg-iris/10 ${pad} text-sm font-medium text-iris transition-colors duration-200 hover:bg-iris/15`}
    >
      Visit
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  );
}

function RedeployButton({ projectId, redeploying, onClick, size = "md" }) {
  if (!projectId) return null;
  const pad = size === "sm" ? "px-4 py-1.5" : "px-4 py-2";
  return (
    <button
      onClick={onClick}
      disabled={redeploying}
      className={`inline-flex items-center gap-1.5 rounded-pill border border-charcoal ${pad} text-sm font-medium text-vellum transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {redeploying ? (
        <>
          <Spinner className="h-4 w-4 text-iris" />
          <span className="hidden sm:inline">Redeploying</span>
        </>
      ) : (
        <>
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span className="hidden sm:inline">Redeploy</span>
        </>
      )}
    </button>
  );
}

export default function DeploymentCard({ deployment, viewMode, index = 0 }) {
  const { owner, repoName, branch, status, url, updatedAt, projectId } = deployment;
  const { redeploying, redeploy } = useRedeploy(projectId);
  const updated = timeAgo(updatedAt);

  if (viewMode === "list") {
    return (
      <Reveal delay={Math.min(index, 8) * 30} y={10}>
        <div className="group flex items-center justify-between gap-4 rounded-card border border-twilight/40 bg-graphite/70 p-4 transition-colors duration-300 hover:border-twilight hover:bg-white/[0.02]">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-10 w-10 flex-none items-center justify-center rounded-card border border-white/10 bg-white/[0.03] text-smoke transition-colors duration-300 group-hover:border-iris/40 group-hover:bg-iris/5 group-hover:text-iris">
              <GlobeIcon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-[15px] font-medium tracking-tight text-vellum">
                  {owner ? <span className="font-normal text-smoke">{owner}/</span> : ""}
                  {repoName}
                </h3>
                <StatusBadge status={status} />
              </div>
              <div className="mt-0.5 flex items-center gap-3 text-[13px] text-ash">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-smoke">
                  <BranchIcon className="h-3 w-3 text-iris" />
                  <span className="max-w-[120px] truncate">{branch}</span>
                </span>
                {updated && <span className="hidden text-smoke sm:inline">· {updated}</span>}
              </div>
            </div>
          </div>

          <div className="flex flex-none items-center gap-2.5">
            <RedeployButton
              projectId={projectId}
              redeploying={redeploying}
              onClick={redeploy}
              size="sm"
            />
            <VisitButton url={url} size="sm" />
          </div>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal delay={Math.min(index, 8) * 50} y={16} className="h-full">
      <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-card border border-twilight/40 bg-graphite/70 p-6 transition-colors duration-300 hover:border-twilight hover:shadow-[0_0_30px_rgba(79,79,128,0.15)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-twilight/30 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="relative">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-card border border-white/10 bg-white/[0.03] text-smoke transition-colors duration-300 group-hover:border-iris/40 group-hover:bg-iris/5 group-hover:text-iris">
              <GlobeIcon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="truncate font-mono text-[11px] text-smoke">{owner || "—"}</p>
              <h3 className="mt-0.5 truncate text-lg font-medium tracking-tight text-vellum">
                {repoName}
              </h3>
            </div>
            <StatusBadge status={status} />
          </div>

          <div className="mt-4 flex items-center gap-3 text-[13px] text-ash">
            <span className="inline-flex items-center gap-1.5 rounded-pill border border-charcoal bg-void/60 px-3 py-1.5 font-mono text-[11px] text-smoke">
              <BranchIcon className="h-3.5 w-3.5 text-iris" />
              <span className="max-w-[110px] truncate">{branch}</span>
            </span>
            {updated && <span className="text-smoke">Updated {updated}</span>}
          </div>
        </div>

        <div className="relative mt-6 flex items-center justify-between gap-2 border-t border-white/5 pt-5">
          <RedeployButton projectId={projectId} redeploying={redeploying} onClick={redeploy} />
          <VisitButton url={url} />
        </div>
      </div>
    </Reveal>
  );
}
