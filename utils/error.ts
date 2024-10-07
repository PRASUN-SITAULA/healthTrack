export type ActionError = {
  error: string
}

export function isActionError(error: any): error is ActionError {
  return error && "error" in error && error.error
}
