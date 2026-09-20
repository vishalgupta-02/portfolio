export class PostmortemContentError extends Error {
  constructor(
    message: string,
    public readonly filename?: string,
  ) {
    super(message)
    this.name = "PostmortemContentError"
  }
}
