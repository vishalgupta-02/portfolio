import type { ShikiTransformer } from "shiki"

export const copyCodeTransformer: ShikiTransformer = {
  name: "copy-code",

  pre(node) {
    node.properties["data-code"] = this.source
  },
}
