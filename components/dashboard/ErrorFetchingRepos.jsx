import { Reveal } from "../Motion";
import Button from "../ui/Button";

export default function ErrorFetchingRepos({
    refetch
}){

return (
    <Reveal>
        <div className="mx-auto flex max-w-lg flex-col items-center rounded-feature border border-red-500/20 bg-red-500/[0.04] p-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 text-red-400/90">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        </div>
        <h3 className="mt-5 text-xl font-medium text-vellum">Couldn't load repositories</h3>
        <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ash">
            There was a problem connecting to GitHub. Check your credentials or try again.
        </p>
        <Button onClick={() => refetch()} className="mt-7">
            Try again
        </Button>
        </div>
    </Reveal>
    )
}