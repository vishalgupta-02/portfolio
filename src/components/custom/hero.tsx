import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <section className="w-full mx-auto h-full min-h-screen flex items-center px-8">
      <div className="flex flex-col justify-center items-start h-full gap-8">
        <h1 className="text-7xl font-bold w-full max-w-5xl tracking-tight text-left">
          Building digital experiences with{" "}
          <span className="text-teal-500">precision</span>.
        </h1>
        <p className="text-2xl w-full max-w-3xl">
          I am a full-stack software engineer focused on crafting clean,
          performant, and user-centric applications.
        </p>
        <p className="text-md">
          Available for freelance projects and full-time opportunities.
        </p>
        <Button className="w-56 cursor-pointer rounded-none hover:bg-teal-600">
          View My Work
          <ArrowRight className="ml-2 h-8 w-8" />
        </Button>
      </div>
    </section>
  );
}
