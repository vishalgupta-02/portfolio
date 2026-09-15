"use client"

import React from "react"
import MainLayout from "./main-layout"
import { GithubGraph } from "./github-graph"

export default function GithubSection() {
  return (
    <MainLayout>
      <section className="w-full max-w-2xl mx-auto py-4 px-4">
        {/* <div className="mb-4">
          <h2 className="text-[24px] font-semibold tracking-tight text-center md:text-left">
            GitHub Activity
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 text-center md:text-left">
            Open-source contributions, repositories, and engineering streak.
          </p>
        </div> */}
        <GithubGraph
          account="vishalgupta-02"
          months={12}
          variant="github"
          animation="wave"
          animationSpeed={1.2}
          cellSize={9}
          cellGap={2.5}
          cellRadius={2}
          showStats={false}
          showLegend
          showAccount
        />
      </section>
    </MainLayout>
  )
}

