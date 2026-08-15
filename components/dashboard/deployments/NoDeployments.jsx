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

export default function NoDeployments({ searchQuery, setSearchQuery }) {
  return (
    <Reveal>
      <div className="mx-auto flex max-w-lg flex-col items-center rounded-feature border border-dashed border-charcoal bg-white/[0.02] p-14 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-card border border-white/10 bg-white/[0.03] text-iris">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-9c2.5 2.4 3.9 5.7 3.9 9s-1.4 6.6-3.9 9c-2.5-2.4-3.9-5.7-3.9-9S9.5 5.4 12 3zM3.6 9h16.8M3.6 15h16.8"
            />
          </svg>
        </div>

        <h3 className="mt-5 text-xl font-medium text-vellum">
          {searchQuery ? "No matching deployments" : "No deployments yet"}
        </h3>
        <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ash">
          {searchQuery
            ? `We couldn't find any deployments matching "${searchQuery}".`
            : "Import a GitHub repository to ship your first project to the edge."}
        </p>

        {searchQuery ? (
          <Button variant="ghost" onClick={() => setSearchQuery("")} className="mt-6">
            Clear search
          </Button>
        ) : (
          <Button href="/dashboard/import" icon={ImportIcon} iconPosition="left" className="mt-6">
            Import a repository
          </Button>
        )}
      </div>
    </Reveal>
  );
}
