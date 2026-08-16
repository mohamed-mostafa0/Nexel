"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { listDepolymentsForProject } from "@/app/API/deploymentsServices/deploymentServices";
import StatusBadge from "../StatusBadge";
import Button from "../../ui/Button";
import { normalizeProjectDeployment, timeAgo, formatDuration } from "./helpers";

const RocketIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5 15l-1 5 5-1M9 11a4 4 0 015.657-5.657l1.5 1.5A4 4 0 0110.5 12.5m-1.5-1.5l-3 3m9-6.5l3-1-1 3M14 10l-1 3"
    />
  </svg>
);

const ChevronIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

function ExternalLink({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-pill border border-charcoal px-3 py-1.5 text-[13px] font-medium text-ash transition-colors hover:border-smoke hover:text-vellum"
    >
      {label}
      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

function DeploymentRow({ deployment, projectId, isLast }) {
  const { id, status, current, shortSha, url, previewUrl, createdAt, readyAt, errorMessage } =
    deployment;
  const duration = formatDuration(createdAt, readyAt);

  return (
    <div
      className={`flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between ${
        isLast ? "" : "border-b border-white/5"
      }`}
    >
      <Link
        href={`/dashboard/${projectId}/${id}`}
        className="group -mx-2 flex min-w-0 flex-1 items-start gap-3 rounded-card px-2 py-1 transition-colors hover:bg-white/[0.02]"
      >
        <StatusBadge status={status} />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[13px] text-vellum">#{id}</span>
            {current && (
              <span className="rounded-pill border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-emerald-400">
                Current
              </span>
            )}
            {shortSha && (
              <span className="rounded border border-charcoal bg-void/60 px-1.5 py-0.5 font-mono text-[11px] text-smoke">
                {shortSha}
              </span>
            )}
          </div>
          <p className="mt-1 font-mono text-[11px] text-smoke">
            {createdAt ? `Created ${timeAgo(createdAt)}` : "—"}
            {duration && <span> · ready in {duration}</span>}
          </p>
          {errorMessage && <p className="mt-1 text-[12px] text-red-400">{errorMessage}</p>}
        </div>
      </Link>

      <div className="flex flex-none items-center gap-2 sm:pl-3">
        {url && <ExternalLink href={url} label="Visit" />}
        {previewUrl && <ExternalLink href={previewUrl} label="Preview" />}
        <Link
          href={`/dashboard/${projectId}/${id}`}
          aria-label={`View deployment #${id}`}
          className="rounded-pill p-2 text-smoke transition-colors hover:bg-white/5 hover:text-vellum"
        >
          <ChevronIcon className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export default function ProjectDeployments({ projectId }) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["projectDeployments", projectId],
    queryFn: async () => {
      const res = await listDepolymentsForProject(projectId);
      return res.data;
    },
    enabled: !!projectId,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-5 w-16 flex-none rounded-pill bg-white/5" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-1/3 rounded bg-white/5" />
              <div className="h-2.5 w-1/4 rounded bg-white/[0.03]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center rounded-card border border-red-500/20 bg-red-500/[0.04] p-8 text-center">
        <p className="text-[15px] font-medium text-vellum">Couldn't load deployments</p>
        <p className="mt-1 text-[13px] text-ash">The deployments service didn't respond.</p>
        <Button variant="ghost" onClick={() => refetch?.()} className="mt-4">
          Try again
        </Button>
      </div>
    );
  }

  const list = (Array.isArray(data) ? data : data?.deployments || data?.data || []).map(
    normalizeProjectDeployment
  );

  if (list.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-card border border-dashed border-charcoal bg-white/[0.02] p-10 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-card border border-white/10 bg-white/[0.03] text-iris">
          <RocketIcon className="h-6 w-6" />
        </div>
        <p className="mt-4 text-[15px] font-medium text-vellum">No deployments yet</p>
        <p className="mt-1 max-w-sm text-[13px] leading-relaxed text-ash">
          This project doesn't have any deployment builds recorded yet.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {list.map((deployment, i) => (
        <DeploymentRow
          key={deployment.id}
          deployment={deployment}
          projectId={projectId}
          isLast={i === list.length - 1}
        />
      ))}
    </div>
  );
}
