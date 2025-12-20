"use client";

export default function Exploring() {
  return (
    <>
      <div>
        <div className="px-8 py-4 border-b border-zinc-300 p-4">
          <p className="text-xl font-semibold tracking-tight">Exploring</p>
          <p className="text-zinc-600 text-sm mt-1 font-medium">
            Currently learning and experimenting with.
          </p>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-4 text-md px-8 py-4 gap-6 text-zinc-900 font-medium">
          <li>Kubernetes</li>
          <li>GitLab</li>
          <li>Three.js</li>
          <li>Artificial Intelligence</li>
          <li>Machine Learning (Python)</li>
        </ul>
      </div>
    </>
  );
}
