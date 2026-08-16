"use client";
import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  getDeployments as getDeployedProjects,
  getPorjectCommits,
} from "@/app/API/deploymentsServices/deploymentServices";
import { Reveal } from "@/components/Motion";
import StatusBadge from "@/components/dashboard/StatusBadge";
import CommitList from "@/components/dashboard/deployments/CommitList";
import DeleteDeploymentButton from "@/components/dashboard/deployments/DeleteDeploymentButton";
import { normalizeDeployment, timeAgo } from "@/components/dashboard/deployments/helpers";

const COMMIT_LIMIT = 20;

const BackIcon = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 19l-7-7 7-7" />
  </svg>
);

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

export default function DeploymentDetailPage() {
  const { projectId } = useParams();

  const { data: depData, isLoading: metaLoading } = useQuery({
    queryKey: ["deployments"],
    queryFn: async () => {
      const res = await getDeployedProjects();
      console.log(res.data);
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  const deployment = useMemo(() => {
    const list = Array.isArray(depData)
      ? depData
      : depData?.projects || depData?.deployments || depData?.data || [];
    return list
      .map(normalizeDeployment)
      .find((d) => String(d.projectId) === String(projectId) || String(d.id) === String(projectId));
  }, [depData, projectId]);

  const {data: commitsData,isLoading: commitsLoading,isError: commitsError,refetch: refetchCommits,} = useQuery({
    queryKey: ["commits", projectId],
    queryFn: async () => {
      const res = await getPorjectCommits(projectId, COMMIT_LIMIT);
      return res.data;
    },
    enabled: !!projectId,
    refetchOnWindowFocus: false,
  });

  const title = deployment?.repoName || deployment?.name || "Deployment";
  const updated = deployment?.updatedAt ? timeAgo(deployment.updatedAt) : "";

  return (
    <>
      <Reveal>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-smoke transition-colors hover:text-vellum"
        >
          {BackIcon}
          Back to Deployments
        </Link>
      </Reveal>

      <Reveal delay={60} y={16}>
        <div className="mt-6 flex flex-col gap-5 border-b border-white/5 pb-8 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-none items-center justify-center rounded-card border border-white/10 bg-white/[0.03] text-iris">
              <GlobeIcon className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              {metaLoading && !deployment ? (
                <div className="animate-pulse space-y-2 pt-1">
                  <div className="h-6 w-48 rounded bg-white/5" />
                  <div className="h-3 w-32 rounded bg-white/[0.03]" />
                </div>
              ) : (
                <>
                  {deployment?.owner && (
                    <p className="truncate font-mono text-[11px] text-smoke">{deployment.owner}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="truncate text-2xl font-normal tracking-[-0.02em] text-vellum md:text-3xl">
                      {title}
                    </h1>
                    {deployment?.status && <StatusBadge status={deployment.status} />}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-[13px] text-ash">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-smoke">
                      <BranchIcon className="h-3.5 w-3.5 text-iris" />
                      {deployment?.branch || "main"}
                    </span>
                    {updated && <span className="text-smoke">· Updated {updated}</span>}
                  </div>
                </>
              )}
            </div>
          </div>

          {deployment?.url && (
            <a
              href={deployment.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-none items-center gap-2 self-start rounded-pill border border-iris/40 bg-iris/10 px-5 py-2 text-sm font-medium text-iris transition-colors duration-200 hover:bg-iris/15"
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
          )}
        </div>
      </Reveal>

      <Reveal delay={120} y={16}>
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-smoke">
              Commit history
            </h2>
          </div>
          <div className="mt-4">
            <CommitList
              commits={commitsData}
              isLoading={commitsLoading}
              isError={commitsError}
              refetch={refetchCommits}
            />
          </div>
        </section>
      </Reveal>

      <Reveal delay={160} y={16}>
        <section className="mt-12 rounded-feature border border-red-500/15 bg-red-500/[0.02] p-6">
          <h2 className="text-[15px] font-medium text-vellum">Danger zone</h2>
          <p className="mt-1 max-w-lg text-[13px] leading-relaxed text-ash">
            Deleting this deployment removes the project and takes its live URL offline. This action
            is permanent.
          </p>
          <div className="mt-5">
            <DeleteDeploymentButton projectId={projectId} name={title} />
          </div>
        </section>
      </Reveal>
    </>
  );
}
