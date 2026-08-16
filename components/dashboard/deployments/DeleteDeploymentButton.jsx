"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { deleteDeployment } from "@/app/API/deploymentsServices/deploymentServices";

const TrashIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
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

export default function DeleteDeploymentButton({ projectId, name }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const onDelete = async () => {
    if (!projectId || deleting) return;
    setDeleting(true);
    setError(null);
    try {
      await deleteDeployment(projectId);
      queryClient.invalidateQueries({ queryKey: ["deployments"] });
      router.push("/dashboard");
    } catch (err) {
      console.error("Delete deployment failed:", err);
      setError(err?.response?.data?.message || err?.message || "Failed to delete deployment.");
      setDeleting(false);
      setConfirming(false);
    }
  };

  if (!projectId) return null;

  return (
    <div className="flex flex-col items-start gap-2">
      {!confirming ? (
        <button
          onClick={() => setConfirming(true)}
          className="inline-flex items-center gap-2 rounded-pill border border-red-500/30 bg-red-500/[0.06] px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/[0.12]"
        >
          <TrashIcon className="h-4 w-4" />
          Delete deployment
        </button>
      ) : (
        <div className="flex flex-wrap items-center gap-3 rounded-card border border-red-500/25 bg-red-500/[0.05] px-4 py-3">
          <span className="text-[13px] text-ash">
            Delete{" "}
            <span className="font-medium text-vellum">{name || "this deployment"}</span>? This
            can't be undone.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onDelete}
              disabled={deleting}
              className="inline-flex items-center gap-2 rounded-pill bg-red-500 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {deleting && <Spinner className="h-4 w-4" />}
              {deleting ? "Deleting" : "Confirm delete"}
            </button>
            <button
              onClick={() => setConfirming(false)}
              disabled={deleting}
              className="rounded-pill border border-charcoal px-4 py-1.5 text-sm font-medium text-vellum transition-colors hover:bg-white/5 disabled:opacity-70"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-[13px] text-red-400">{error}</p>}
    </div>
  );
}
