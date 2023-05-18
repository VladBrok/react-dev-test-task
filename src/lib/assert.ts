export class AssertionError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "AssertionError";
  }
}

export function assert(condition: boolean, message?: string): void {
  if (!condition) {
    if (import.meta.env.PROD) {
      console.assert(condition, message);
    } else {
      throw new AssertionError(message);
    }
  }
}
