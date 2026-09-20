import {
  ChatGPT,
  Claude,
  Docker,
  Gemini,
  Git,
  Github,
  JavaScript,
  MongoDB,
  Motion,
  NextJS,
  NodeJS,
  PostgreSQL,
  Python,
  React,
  ShadCN,
  TailwindCSS,
  TanStack,
  TypeScript,
  Vercel,
} from "./ui/svgs-of-techs";

const SKILL_CATEGORIES = [
  {
    name: "Languages & Runtimes",
    skills: [
      { name: "TypeScript", icon: TypeScript },
      { name: "JavaScript", icon: JavaScript },
      { name: "Python", icon: Python },
      { name: "C++", icon: null },
      { name: "SQL", icon: null },
    ],
  },
  {
    name: "Backend & Systems",
    skills: [
      { name: "Node.js", icon: NodeJS },
      { name: "Express.js", icon: null },
      { name: "PostgreSQL", icon: PostgreSQL },
      { name: "MongoDB", icon: MongoDB },
      { name: "Docker", icon: Docker },
      { name: "Django", icon: null },
    ],
  },
  {
    name: "Frontend & UI",
    skills: [
      { name: "Next.js", icon: NextJS },
      { name: "React", icon: React },
      { name: "TailwindCSS", icon: TailwindCSS },
      { name: "Motion", icon: Motion },
      { name: "ShadCN", icon: ShadCN },
      { name: "TanStack", icon: TanStack },
    ],
  },
  {
    name: "Infrastructure & Tooling",
    skills: [
      { name: "Git", icon: Git },
      { name: "GitHub", icon: Github },
      { name: "Vercel", icon: Vercel },
      { name: "Docker", icon: Docker },
      { name: "Claude AI", icon: Claude },
      { name: "Gemini", icon: Gemini },
      { name: "ChatGPT", icon: ChatGPT },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section className="w-full max-w-2xl mx-auto py-8 px-4 border-b border-border/40">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground font-sans">
            Technical Stack
          </h2>
          <p className="text-xs text-muted-foreground font-display mt-0.5">
            Core technologies, systems architecture, and engineering primitives
          </p>
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SKILL_CATEGORIES.map((category) => (
          <div
            key={category.name}
            className="rounded-xl border border-border/40 bg-card/30 p-3.5 hover:border-border/80 hover:bg-card/60 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200"
          >
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
              {category.name}
            </h3>

            <div className="flex flex-wrap gap-1.5">
              {category.skills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border/40 bg-background/60 px-2.5 py-1 text-xs font-medium text-foreground hover:border-foreground/30 hover:bg-muted/60 hover:-translate-y-0.5 hover:shadow-xs active:scale-95 transition-all duration-150 cursor-default select-none"
                  >
                    {Icon && <Icon className="size-3.5 shrink-0" />}
                    <span>{skill.name}</span>
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
