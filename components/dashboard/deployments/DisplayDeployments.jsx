import DeploymentCard from "./DeploymentCard";

export default function DisplayDeployments({ deployments, viewMode }) {
  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 gap-5 md:auto-rows-fr md:grid-cols-2 lg:grid-cols-3"
          : "flex flex-col gap-3"
      }
    >
      {deployments.map((deployment, i) => (
        <DeploymentCard
          key={deployment.id}
          deployment={deployment}
          viewMode={viewMode}
          index={i}
        />
      ))}
    </div>
  );
}
