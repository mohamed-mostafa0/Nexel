import { bucketStatus } from "./deployments/helpers";


const STYLES = {
  ready: {
    label: "Ready",
    className: "border-emerald-400/30 bg-emerald-400/10 text-emerald-400",
    dot: "bg-emerald-400",
    pulse: false,
  },
  building: {
    label: "Building",
    className: "border-amber-400/30 bg-amber-400/10 text-amber-400",
    dot: "bg-amber-400",
    pulse: true,
  },
  failed: {
    label: "Failed",
    className: "border-red-400/30 bg-red-400/10 text-red-400",
    dot: "bg-red-400",
    pulse: false,
  },
  unknown: {
    label: "Unknown",
    className: "border-charcoal bg-white/[0.03] text-smoke",
    dot: "bg-smoke",
    pulse: false,
  },
};

export default function StatusBadge({ status, label }) {
  const bucket = bucketStatus(status);
  const style = STYLES[bucket] || STYLES.unknown;

  const text = label || (status ? titleCase(status) : style.label);

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] ${style.className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${style.dot} ${
          style.pulse ? "animate-pulse motion-reduce:animate-none" : ""
        }`}
      />
      {text}
    </span>
  );
}

function titleCase(value) {
  const s = String(value).toLowerCase().replace(/_/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}
