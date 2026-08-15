import Button from "@/components/ui/Button";
import DashboardNav from "@/components/dashboard/DashboardNav";

const HomeIcon = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
);

export default function DashboardLayout({ children }) {
  return (
    <div className="relative flex-1 overflow-hidden text-vellum">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[440px]"
        style={{
          background:
            "radial-gradient(48rem 22rem at 18% -12%, rgba(97,153,246,0.1), transparent 60%), radial-gradient(42rem 22rem at 92% -4%, rgba(79,79,128,0.14), transparent 62%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16 lg:px-8">
        <div className="flex items-center justify-between">
          <p className="eyebrow">Dashboard</p>
          <Button href="/" icon={HomeIcon} iconPosition="left" variant="ghost">
            Home
          </Button>
        </div>

        <DashboardNav />

        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}
