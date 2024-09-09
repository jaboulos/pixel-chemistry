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
  senderId?: string
  senderName?: string
  senderImage?: string | null
  recipientId?: string
  recipientName?: string
  recipientImage?: string
}

type MessageWithSenderRecipient = Prisma.MessageGetPayload<{
  select: {
    id: true
    text: true
    created: true
    dateRead: true
    sender: {
      select: { userId; name; image }
    }
    recipient: {
      select: { userId; name; image }
    }
  }
}>
