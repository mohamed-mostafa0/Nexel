import { Reveal } from "../../Motion";
import Button from "../../ui/Button";

const ImportIcon = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
    />
  </svg>
);

export default function DeploymentsHeader({ isLoading, isError, stats }) {
  const showStats = !isLoading && !isError && stats;

  return (
    <>
      <Reveal>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-normal leading-[1.05] tracking-[-0.03em] text-vellum md:text-5xl">
              Deployments
            </h1>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ash md:text-base">
              Every project you've shipped to the edge, live and ready to visit.
            </p>
          </div>

          <Button href="/dashboard/import" icon={ImportIcon} iconPosition="left">
            Import Repository
          </Button>
        </div>
      </Reveal>

      {showStats && (
        <Reveal delay={80} y={16}>
          <div className="mt-10 grid grid-cols-2 gap-6 border-y border-white/5 py-8 md:grid-cols-4">
            {[
              ["Deployments", stats.total, "text-vellum"],
              ["Live", stats.ready, "text-emerald-400"],
              ["Building", stats.building, "text-amber-400"],
              ["Failed", stats.failed, "text-red-400"],
            ].map(([label, value, tone]) => (
              <div key={label}>
                <p className={`text-2xl font-normal tracking-[-0.02em] md:text-4xl ${tone}`}>
                  {value}
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-smoke">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      )}
    </>
  );
}
