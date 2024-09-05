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
        senderId: userId,
      },
    })

    return { status: 'success', data: message }
  } catch (error) {
    console.log(error)
    return { status: 'error', error: 'Something went wrong' }
  }
}

// get both sides of the conversation between two users
// long query to get message information we need
export const getMessageThread = async (recipientId: string) => {
  try {
    const userId = await getAuthUserId()

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            recipientId,
          },
          {
            senderId: recipientId,
            recipientId: userId,
          },
        ],
      },
      // sorting
      orderBy: {
        created: 'asc',
      },
      select: {
        id: true,
        text: true,
        created: true,
        dateRead: true,
        sender: {
          select: {
            userId: true,
            name: true,
            image: true,
          },
        },
        recipient: {
          select: {
            userId: true,
            name: true,
            image: true,
          },
        },
      },
    })
    return messages.map((message) => ({
      id: message.id,
      text: message.text,
    }))
  } catch (error) {
    console.log(error)
    throw error
  }
}
