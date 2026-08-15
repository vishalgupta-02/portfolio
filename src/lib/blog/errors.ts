export class BlogContentError extends Error {
  constructor(
    message: string,
    public readonly file?: string,
  ) {
    super(message)

    this.name = "BlogContentError"
  }
}
