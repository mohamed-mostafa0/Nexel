"use client";
import { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  connectProject,
  getUserPorjects,
  triggerDeplyoment,
  getDeployments,
} from "@/app/API/projectServices/projectService";
import Header from "@/components/dashboard/Header";
import DisplayRepos from "@/components/dashboard/DisplayRepos";
import NoReposFound from "@/components/dashboard/NoReposFound";
import ErrorFetchingRepos from "@/components/dashboard/ErrorFetchingRepos";
import LoadingRepos from "@/components/dashboard/LoadingRepos";
import FilterBar from "@/components/dashboard/FilterBar";

export default function ImportPage() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [deployStates, setDeployStates] = useState({});

  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await getUserPorjects();
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  const handleImport = async (repoFullName) => {
    setDeployStates((prev) => ({
      ...prev,
      [repoFullName]: { status: "CONNECTING" },
    }));

    try {
      const connectRes = await connectProject({ repoFullName });
      const projectId = connectRes.data.id;

      setDeployStates((prev) => ({
        ...prev,
        [repoFullName]: { status: "DEPLOYING" },
      }));

      const deployRes = await triggerDeplyoment(projectId);
      const deploymentId = deployRes.data.id;

      let isReady = false;
      while (!isReady) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const statusRes = await getDeployments(projectId, deploymentId);

        if (statusRes.data.status === "READY") {
          isReady = true;
          setDeployStates((prev) => ({
            ...prev,
            [repoFullName]: { status: "READY", url: statusRes.data.url },
          }));
          // Reflect the freshly-shipped project on the Deployments overview.
          queryClient.invalidateQueries({ queryKey: ["deployments"] });
        } else if (statusRes.data.status === "ERROR" || statusRes.data.status === "FAILED") {
          throw new Error(statusRes.data.errorMessage || "Deployment failed");
        }
      }
    } catch (err) {
      console.error("Deployment Error:", err);
      setDeployStates((prev) => ({
        ...prev,
        [repoFullName]: { status: "ERROR", errorMessage: err.message || "An error occurred" },
      }));
    }
  };

  const repositories = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data) ? data : data?.repos || data?.repositories || data?.data || [];
  }, [data]);

  const filteredRepos = useMemo(() => {
    return repositories.filter((repo) => {
      const query = searchQuery.toLowerCase();
      return (
        (repo.name || "").toLowerCase().includes(query) ||
        (repo.full_name || "").toLowerCase().includes(query) ||
        (repo.default_branch || "").toLowerCase().includes(query)
      );
    });
  }, [repositories, searchQuery]);

  return (
    <>
      <Header
        isError={isError}
        isLoading={isLoading}
        filteredRepos={filteredRepos}
        repositories={repositories}
        readyCount={0}
      />

      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setViewMode={setViewMode}
        viewMode={viewMode}
      />

      <div className="mt-10 min-h-[400px]">
        {isLoading || isRefetching ? (
          <LoadingRepos viewMode={viewMode} />
        ) : isError ? (
          <ErrorFetchingRepos refetch={refetch} />
        ) : filteredRepos.length === 0 ? (
          <NoReposFound searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        ) : (
          <DisplayRepos
            viewMode={viewMode}
            deployStates={deployStates}
            handleImport={handleImport}
            filteredRepos={filteredRepos}
          />
        )}
      </div>
    </>
  );
}
