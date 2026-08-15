// Shape-tolerant helpers for the deployments overview.
// The /api/projects?deployed=true payload is owned by the backend, so every
// field is read defensively with fallbacks — normalize once, consume everywhere.

const READY = ["READY", "LIVE", "SUCCESS", "SUCCEEDED"];
const BUILDING = ["BUILDING", "DEPLOYING", "QUEUED", "PENDING", "INITIALIZING", "IN_PROGRESS"];
const FAILED = ["ERROR", "FAILED", "CANCELED", "CANCELLED"];

export function bucketStatus(status) {
  const s = (status || "").toUpperCase();
  if (READY.includes(s)) return "ready";
  if (BUILDING.includes(s)) return "building";
  if (FAILED.includes(s)) return "failed";
  return "unknown";
}

export function normalizeDeployment(d = {}) {
  const fullName =
    d.repoFullName || d.full_name || d.repo?.fullName || d.repo?.full_name || d.name || "";
  const parts = String(fullName).split("/");
  const owner = parts.length > 1 ? parts[0] : "";
  const repoName = parts.length > 1 ? parts[1] : fullName || d.name || "project";

  const status = String(
    d.status || d.latestDeployment?.status || d.state || "READY"
  ).toUpperCase();

  return {
    id: d.id || d.projectId || fullName,
    projectId: d.id || d.projectId || null,
    fullName,
    owner,
    repoName,
    name: d.name || repoName,
    branch: d.branch || d.default_branch || d.latestDeployment?.branch || "main",
    status,
    url: d.url || d.productionUrl || d.deploymentUrl || d.latestDeployment?.url || "",
    updatedAt:
      d.updatedAt || d.updated_at || d.deployedAt || d.createdAt ||
      d.created_at || d.latestDeployment?.createdAt || null,
  };
}

export function deploymentStats(list = []) {
  return list.reduce(
    (acc, d) => {
      acc.total += 1;
      const bucket = bucketStatus(d.status);
      if (bucket === "ready") acc.ready += 1;
      else if (bucket === "building") acc.building += 1;
      else if (bucket === "failed") acc.failed += 1;
      return acc;
    },
    { total: 0, ready: 0, building: 0, failed: 0 }
  );
}

export function timeAgo(dateish) {
  if (!dateish) return "";
  const then = new Date(dateish).getTime();
  if (Number.isNaN(then)) return "";

  const seconds = Math.round((Date.now() - then) / 1000);
  if (seconds < 45) return "just now";

  const units = [
    ["y", 31536000],
    ["mo", 2592000],
    ["d", 86400],
    ["h", 3600],
    ["m", 60],
  ];
  for (const [label, secs] of units) {
    const value = Math.floor(seconds / secs);
    if (value >= 1) return `${value}${label} ago`;
  }
  return "just now";
}
