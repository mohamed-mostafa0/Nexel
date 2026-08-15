"use client";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDeployments as getDeployedProjects } from "@/app/API/deploymentsServices/deploymentServices";
import FilterBar from "@/components/dashboard/FilterBar";
import LoadingRepos from "@/components/dashboard/LoadingRepos";
import DeploymentsHeader from "@/components/dashboard/deployments/DeploymentsHeader";
import DisplayDeployments from "@/components/dashboard/deployments/DisplayDeployments";
import NoDeployments from "@/components/dashboard/deployments/NoDeployments";
import DeploymentsError from "@/components/dashboard/deployments/DeploymentsError";
import { normalizeDeployment, deploymentStats } from "@/components/dashboard/deployments/helpers";

export default function DeploymentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: ["deployments"],
    queryFn: async () => {
      const res = await getDeployedProjects();
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  const deployments = useMemo(() => {
    const list = Array.isArray(data)
      ? data
      : data?.projects || data?.deployments || data?.data || [];
    return list.map(normalizeDeployment);
  }, [data]);

  const stats = useMemo(() => deploymentStats(deployments), [deployments]);

  const filtered = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return deployments.filter(
      (d) =>
        d.name.toLowerCase().includes(query) ||
        d.fullName.toLowerCase().includes(query) ||
        d.branch.toLowerCase().includes(query)
    );
  }, [deployments, searchQuery]);

  return (
    <>
      <DeploymentsHeader isLoading={isLoading} isError={isError} stats={stats} />

      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setViewMode={setViewMode}
        viewMode={viewMode}
        placeholder="Search deployments by name, repo, or branch"
      />

      <div className="mt-10 min-h-[400px]">
        {isLoading || isRefetching ? (
          <LoadingRepos viewMode={viewMode} />
        ) : isError ? (
          <DeploymentsError refetch={refetch} />
        ) : filtered.length === 0 ? (
          <NoDeployments searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        ) : (
          <DisplayDeployments deployments={filtered} viewMode={viewMode} />
        )}
      </div>
    </>
  );
}
