import React from "react"
import { GithubGraph } from "./github-graph"

const KuchToHai = () => {
  return (
    <div>
      <GithubGraph
        account='vishalgupta-02'
        months={12}
        variant='graphite'
        animation='wave'
        animationSpeed={1.4}
        cellSize={20}
        cellGap={4}
        cellRadius={6}
        ambientEffect='twinkle'
        ambientIntensity={0.7}
        showLegend
      />
    </div>
  )
}

export default KuchToHai
