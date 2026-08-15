import { Reveal } from "../Motion";
import Button from "../ui/Button";

export default function NoReposFound({
    searchQuery,
    setSearchQuery,
}){

    return <>
        <Reveal>
            <div className="mx-auto flex max-w-lg flex-col items-center rounded-feature border border-dashed border-charcoal bg-white/[0.02] p-14 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-card border border-white/10 bg-white/[0.03] text-iris">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <h3 className="mt-5 text-xl font-medium text-vellum">
                {searchQuery ? "No matching repositories" : "No repositories found"}
            </h3>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ash">
                {searchQuery
                ? `We couldn't find any repositories matching "${searchQuery}".`
                : "Connect your GitHub account or check your permissions to see projects here."}
            </p>
            {searchQuery && (
                <Button variant="ghost" onClick={() => setSearchQuery("")} className="mt-6">
                Clear search
                </Button>
            )}
            </div>
        </Reveal>
    </>
}