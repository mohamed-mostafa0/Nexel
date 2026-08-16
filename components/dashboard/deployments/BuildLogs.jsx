"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBuildLogs } from "@/app/API/deploymentsServices/deploymentServices";
import Button from "../../ui/Button";

function toLogText(data) {
  if (!data) return "";
  if (typeof data === "string") return data;
  if (Array.isArray(data)) return data.map((l) => (typeof l === "string" ? l : l?.message ?? "")).join("\n");
  return data.logs || data.log || data.output || data.text || "";
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
    }
  };

  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-pill border border-charcoal px-3 py-1 font-mono text-[11px] text-smoke transition-colors hover:text-vellum"
    >
      {copied ? (
        <>
          <svg className="h-3 w-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.75}
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2v-2m-6-12h6a2 2 0 012 2v6m-8-8V3m0 2h4"
            />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

function TerminalDot({ className }) {
  return <span className={`h-2.5 w-2.5 rounded-full ${className}`} />;
}

export default function BuildLogs({ projectId, deploymentId }) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["buildLogs", projectId, deploymentId],
    queryFn: async () => {
      const res = await getBuildLogs(projectId, deploymentId);
      return res.data;
    },
    enabled: !!projectId && !!deploymentId,
    refetchOnWindowFocus: false,
  });

  const logs = toLogText(data);

  return (
    <div className="overflow-hidden rounded-card border border-charcoal bg-void/80">
      <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <TerminalDot className="bg-red-400/60" />
          <TerminalDot className="bg-amber-400/60" />
          <TerminalDot className="bg-emerald-400/60" />
          <span className="ml-2 font-mono text-[11px] text-smoke">build output</span>
        </div>
        {logs && <CopyButton text={logs} />}
      </div>

      <div className="max-h-[60vh] overflow-auto p-4">
        {isLoading ? (
          <div className="animate-pulse space-y-2 font-mono text-[12px]">
            {["w-1/2", "w-3/4", "w-2/5", "w-2/3", "w-1/3"].map((w, i) => (
              <div key={i} className={`h-3 rounded bg-white/5 ${w}`} />
            ))}
          </div>
        ) : isError ? (
          <div className="flex flex-col items-start gap-3 font-mono text-[12px] text-ash">
            <span className="text-red-400">Couldn&apos;t load build logs.</span>
            <Button variant="ghost" onClick={() => refetch()}>
              Try again
            </Button>
          </div>
        ) : logs ? (
          <pre className="whitespace-pre font-mono text-[12px] leading-relaxed text-ash">{logs}</pre>
        ) : (
          <p className="font-mono text-[12px] text-smoke">No build logs available for this deployment.</p>
        )}
      </div>
    </div>
  );
}
