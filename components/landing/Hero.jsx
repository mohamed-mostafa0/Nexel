import { Reveal } from "../Motion";
import ArrowIcon from "../ui/ArrowIcon";
import Button from "../ui/Button";



export default function Hero(){

    
    const frameworks = [
    "Next.js", "React", "Svelte", "Vue", "Nuxt",
    "Remix", "Astro", "SolidJS", "Angular", "Gatsby",
    ];

    return <>
          <section className="relative px-6 pt-16 pb-20 md:pt-24 md:pb-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="eyebrow">The Nexel platform</p>
            </Reveal>

            <Reveal delay={80} y={18}>
              <h1 className="mx-auto mt-5 max-w-4xl text-balance text-[2.75rem] font-normal leading-[1.03] tracking-[-0.035em] text-vellum sm:text-6xl md:text-7xl lg:text-[5rem]">
                Ship the work,
                <br className="hidden sm:block" /> not the wait
              </h1>
            </Reveal>

            <Reveal delay={140} y={16}>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ash md:text-lg">
                Nexel is the deployment platform for teams who move at the speed
                of thought — from your first commit to global production, without
                the infrastructure standing in the way.
              </p>
            </Reveal>

            <Reveal delay={200} y={14}>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

                <Button
                    href={"/dashboard"}
                    children={"Start deploying"}
                    icon={<ArrowIcon/>}
                    variant="primary"
                ></Button>

                <Button
                    href="#platform"
                    children={"Explore the platform"}
                    variant="ghost"
                ></Button>
              </div>
            </Reveal>
          </div>


        </div>
      </section>

      <section className="border-y border-white/5 py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.16em] text-smoke">
            Trusted by teams shipping the modern web
          </p>
        </div>
        <div className="edge-fade mt-8 overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-14 pr-14">
            {[...frameworks, ...frameworks].map((name, i) => (
              <span
                key={i}
                className="whitespace-nowrap text-lg font-medium text-smoke transition-colors duration-200 hover:text-lilac"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>
    
    
    </>
}