import { ZodIssue } from 'zod'

type ActionResult<T> =
  // discriminated union
  | { status: 'success'; data: T }
  | { status: 'error'; error: string | ZodIssue[] }
