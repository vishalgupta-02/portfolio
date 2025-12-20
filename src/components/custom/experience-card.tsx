import { ExperCardProps } from "@/types/types";

export default function ExperienceCard({
  role,
  company,
  description1,
  description2,
  description3,
}: ExperCardProps) {
  return (
    <div className="w-full h-1/2 max-h-full border-b border-zinc-400 flex items-center justify-start">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-teal-500">{role}</h3>
        <h4 className="text-sm font-medium mb-2">{company}</h4>
        <ul className="px-4 py-2 space-y-2">
          <li className="text-md text-zinc-700">
            • <span className="ml-2">{description1}</span>
          </li>
          <li className="text-md text-zinc-700">
            • <span className="ml-2">{description2}</span>
          </li>
          <li className="text-md text-zinc-700">
            • <span className="ml-2">{description3}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
