"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPorjectDeployment } from "@/app/API/deploymentsServices/deploymentServices";
import { Reveal } from "@/components/Motion";
import StatusBadge from "@/components/dashboard/StatusBadge";
import Button from "@/components/ui/Button";
import {
  normalizeProjectDeployment,
  timeAgo,
  formatDuration,
} from "@/components/dashboard/deployments/helpers";

const BackIcon = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 19l-7-7 7-7" />
  </svg>
);

const ExternalIcon = (
  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

function Field({ label, children }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-smoke">{label}</p>
      <div className="mt-1.5 text-[14px] text-vellum">{children || <span className="text-smoke">—</span>}</div>
    </div>
  );
}

export default function DeploymentDetailPage() {
  const { projectId, deploymentId } = useParams();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["deployment", projectId, deploymentId],
    queryFn: async () => {
      const res = await getPorjectDeployment(projectId, deploymentId);
      return res.data;
    },
    enabled: !!projectId && !!deploymentId,
    refetchOnWindowFocus: false,
  });

  const deployment = data ? normalizeProjectDeployment(data) : null;
  const duration = deployment ? formatDuration(deployment.createdAt, deployment.readyAt) : "";

  return (
    <>
      <Reveal>
        <Link
          href={`/dashboard/${projectId}`}
          className="inline-flex items-center gap-1.5 text-sm text-smoke transition-colors hover:text-vellum"
        >
          {BackIcon}
          Back to project
        </Link>
      </Reveal>

      {isLoading ? (
        <div className="mt-6 animate-pulse space-y-3">
          <div className="h-8 w-56 rounded bg-white/5" />
          <div className="h-3 w-40 rounded bg-white/[0.03]" />
        </div>
      ) : isError ? (
        <Reveal delay={60}>
          <div className="mt-6 flex flex-col items-center rounded-feature border border-red-500/20 bg-red-500/[0.04] p-12 text-center">
            <h1 className="text-xl font-medium text-vellum">Couldn't load deployment</h1>
            <p className="mt-2 max-w-md text-[15px] text-ash">
              The deployment service didn't respond. Check your connection or try again.
            </p>
            <Button onClick={() => refetch()} className="mt-6">
              Try again
            </Button>
          </div>
        </Reveal>
      ) : !deployment ? (
        <div className="mt-6 animate-pulse space-y-3">
          <div className="h-8 w-56 rounded bg-white/5" />
          <div className="h-3 w-40 rounded bg-white/[0.03]" />
        </div>
      ) : (
        <>
          <Reveal delay={60} y={16}>
            <div className="mt-6 flex flex-col gap-4 border-b border-white/5 pb-8 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-normal tracking-[-0.02em] text-vellum md:text-3xl">
                    Deployment #{deployment.id}
                  </h1>
                  <StatusBadge status={deployment.status} />
                  {deployment.current && (
                    <span className="rounded-pill border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-emerald-400">
                      Current
                    </span>
                  )}
                </div>
                <p className="mt-2 font-mono text-[11px] text-smoke">
                  {deployment.createdAt ? `Created ${timeAgo(deployment.createdAt)}` : ""}
                </p>
              </div>

              {deployment.url && (
                <a
                  href={deployment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-none items-center gap-2 self-start rounded-pill border border-iris/40 bg-iris/10 px-5 py-2 text-sm font-medium text-iris transition-colors duration-200 hover:bg-iris/15"
                >
                  Visit
                  {ExternalIcon}
                </a>
              )}
            </div>
          </Reveal>

          {deployment.errorMessage && (
            <Reveal delay={100}>
              <div className="mt-6 rounded-card border border-red-500/20 bg-red-500/[0.05] p-4 text-[13px] text-red-400">
                {deployment.errorMessage}
              </div>
            </Reveal>
          )}

          <Reveal delay={120} y={16}>
            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <Field label="Status">{titleCase(deployment.status)}</Field>
              <Field label="Build time">{duration || "—"}</Field>
              <Field label="Created">
                {deployment.createdAt ? new Date(deployment.createdAt).toLocaleString() : null}
              </Field>
              <Field label="Ready">
                {deployment.readyAt ? new Date(deployment.readyAt).toLocaleString() : null}
              </Field>
              <Field label="Commit">
                {deployment.shortSha ? (
                  <span className="font-mono">{deployment.shortSha}</span>
                ) : null}
              </Field>
              <Field label="Preview URL">
                {deployment.previewUrl ? (
                  <a
                    href={deployment.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-iris hover:underline"
                  >
                    Open preview {ExternalIcon}
                  </a>
                ) : null}
              </Field>
            </div>
          </Reveal>
        </>
      )}
    </>
  );
}

function titleCase(value) {
  const s = String(value || "").toLowerCase().replace(/_/g, " ");
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
}
