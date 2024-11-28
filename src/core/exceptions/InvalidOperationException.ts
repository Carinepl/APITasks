export class InvalidOperationException extends Error {
    constructor() {
      super("You cannot trigger this operation for this task.");
    }
  }