'use server'

import { prisma } from '@/lib/prisma'
import { getAuthUserId } from './authActions'

export const toggleLikeMember = async (
  targetUserId: string,
  isLiked: boolean,
) => {
  // Defines an async function to toggle the "like" status of a member.
  try {
    const userId = await getAuthUserId() // Fetches the authenticated user ID.

    if (isLiked) {
      // Checks if the user has already liked the target member.
      await prisma.like.delete({
        // Deletes the like record if it exists.
        where: {
          sourceUserId_targetUserId: {
            sourceUserId: userId, // Source user ID is the authenticated user.
            targetUserId, // Target user ID is the member to be unliked.
          },
        },
      })
    } else {
      // If the user has not liked the target member yet.
      await prisma.like.create({
        // Creates a new like record.
        data: {
          sourceUserId: userId, // Source user ID is the authenticated user.
          targetUserId, // Target user ID is the member to be liked.
        },
      })
    }
  } catch (error) {
    console.log(error) // Logs any error that occurs.
    throw error // Throws the error to be handled by the caller.
  }
}

export const fetchCurrentUserLikeIds = async () => {
  // Defines an async function to fetch IDs of members liked by the current user.
  try {
    const userId = await getAuthUserId() // Fetches the authenticated user ID.

    const likeIds = await prisma.like.findMany({
      // Finds all like records where the source user ID matches the authenticated user.
      where: {
        sourceUserId: userId,
      },
      select: {
        targetUserId: true, // Selects only the target user IDs.
      },
    })

    return likeIds.map((like) => like.targetUserId) // Maps the result to an array of target user IDs.
  } catch (error) {
    console.log(error) // Logs any error that occurs.
    throw error // Throws the error to be handled by the caller.
  }
}
