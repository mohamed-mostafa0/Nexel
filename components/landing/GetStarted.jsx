import { Reveal } from "../Motion";
import ArrowIcon from "../ui/ArrowIcon";
import Button from "../ui/Button";


export default function GetStarted(){

    return <>
    
      <section className="relative overflow-hidden border-t border-white/5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full"
          style={{
            background:
              "radial-gradient(50rem 30rem at 50% 0%, rgba(97,153,246,0.14), transparent 60%), radial-gradient(40rem 30rem at 50% 100%, rgba(79,79,128,0.16), transparent 65%)",
          }}
        />
        <div className="mx-auto max-w-3xl px-6 py-28 text-center md:py-32 lg:px-8">
          <Reveal>
            <p className="!text-iris eyebrow">Get started</p>
          </Reveal>
          <Reveal delay={80} y={18}>
            <h2 className="mx-auto mt-5 max-w-2xl text-balance text-4xl font-normal leading-[1.05] tracking-[-0.03em] text-vellum md:text-6xl">
              Deploy your next idea tonight
            </h2>
          </Reveal>
          <Reveal delay={140} y={14}>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-ash md:text-lg">
              Connect a repository and watch it go global in seconds. Free to
              start, no credit card, zero configuration.
            </p>
          </Reveal>
          <Reveal delay={200} y={12}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {/* <Link href="/dashboard" className={primaryPill}>
                Start deploying
                <ArrowIcon />
              </Link> */}
              <Button
              children={`Start deploying`} 
              href = "/dashboard"
              icon={<ArrowIcon/>}
              variant="primary"
              >
              </Button>

              <Button
              children={`Read the docs`} 
              href = "#platform"
              icon={<ArrowIcon/>}
              variant="ghost"
              ></Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
}