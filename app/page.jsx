import Hero from "@/components/landing/Hero";
import Platform from "@/components/landing/Platform";
import Features from "@/components/landing/Features";
import GetStarted from "@/components/landing/GetStarted";




export default function Home() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden text-vellum">

      <Hero/>
      <Platform/>
      <Features/>
      <GetStarted/>
    </div>
  );
}
