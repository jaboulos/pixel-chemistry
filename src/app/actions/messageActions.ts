'use server'

import { messageSchema, MessageSchema } from '@/lib/schemas/messageSchema'
import { ActionResult } from '@/types'
import { Message } from '@prisma/client'
import { getAuthUserId } from './authActions'
import { prisma } from '@/lib/prisma'

export const createMessage = async (
  recipientUserId: string,
  data: MessageSchema,
): Promise<ActionResult<Message>> => {
  try {
    // get id of current logged in user
    // userId unused, temporary
    const userId = await getAuthUserId()
    const validated = messageSchema.safeParse(data)

    if (!validated.success)
      return { status: 'error', error: validated.error.errors }

    const { text } = validated.data

    const message = await prisma.message.create({
      data: {
        text,
        recipientId: recipientUserId,
      },
    })

    return { status: 'success', data: message }
  } catch (error) {
    console.log(error)
    return { status: 'error', error: 'Something went wrong' }
  }
}
