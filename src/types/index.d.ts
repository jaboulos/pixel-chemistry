import { ZodIssue } from 'zod'

type ActionResult<T> =
  // discriminated union
  | { status: 'success'; data: T }
  | { status: 'error'; error: string | ZodIssue[] }

type MessageDto = {
  id: string
  text: string
  created: string
  dateRead: string | null
  senderId: string
  senderImage?: string | null
  recipientId: string
  recipientName: string
  recipientImage?: string
}
