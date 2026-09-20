"use client";

import React from "react";
import { GithubGraph } from "./github-graph";

export default function GithubSection() {
  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-8">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground font-sans">
            Contributions
          </h2>
          <p className="text-xs text-muted-foreground font-display mt-0.5">
            Open source commits, telemetry & continuous delivery
          </p>
        </div>
      </div>

      <GithubGraph
        account="vishalgupta-02"
        months={12}
        variant="github"
        animation="wave"
        animationSpeed={1.2}
        cellGap={3}
        cellRadius={2.5}
        showStats={false}
        showLegend
        showAccount={false}
      />
    </section>
  );
}
