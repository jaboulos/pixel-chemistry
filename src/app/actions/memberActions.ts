'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

// querying local db to get data
export const getMembers = async () => {
  // use this anywhere to get session data
  const session = await auth()

  if (!session?.user) return null

  try {
    return prisma.member.findMany({
      where: {
        NOT: {
          userId: session.user.id,
        },
      },
    })
  } catch (error) {
    console.log(error)
  }
}

// query db and get record from member table that matches userId
export const getMemberByUserId = (userId: string) => {
  try {
    return prisma.member.findUnique({
      where: { userId },
    })
  } catch (error) {
    console.log('error: ', error)
  }
}
