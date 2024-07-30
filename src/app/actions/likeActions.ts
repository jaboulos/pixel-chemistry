'use server'

import { auth } from '@/auth'

import { prisma } from '@/lib/prisma'

import { getAuthUserId } from './authActions'

// Toggles the 'like' status between the authenticated user and another user.
export const toggleLikeMember = async (
  targetUserId: string, // ID of the user being liked or unliked.
  isLiked: boolean, // Boolean flag indicating whether the user is liked (true) or unliked (false).
) => {
  try {
    // Fetch the authenticated user's ID.
    const userId = await getAuthUserId()

    if (!isLiked) {
      // If the user is unliked, delete the corresponding row in the 'like' table where the authenticated user liked the target user.
      await prisma.like.delete({
        where: {
          sourceUserId_targetUserId: {
            sourceUserId: userId, // The authenticated user's ID.
            targetUserId, // The ID of the user being unliked.
          },
        },
      })
    } else {
      // If the user is liked, create a new row in the 'like' table indicating that the authenticated user likes the target user.
      await prisma.like.create({
        data: {
          sourceUserId: userId, // The authenticated user's ID.
          targetUserId, // The ID of the user being liked.
        },
      })
    }
  } catch (error) {
    // Log any errors to the console.
    console.log(error)
    // Rethrow the error to be handled by the caller.
    throw error
  }
}

// Fetches the IDs of all users liked by the authenticated user.
export const fetchCurrentUserLikeIds = async () => {
  try {
    // Fetch the authenticated user's ID.
    const userId = await getAuthUserId()

    // Query the 'like' table for rows where the authenticated user is the source user.
    const likeIds = await prisma.like.findMany({
      where: {
        sourceUserId: userId,
      },
      // Select only the 'targetUserId' field from the result.
      select: {
        targetUserId: true,
      },
    })

    // Return an array of 'targetUserId's, i.e., the IDs of users liked by the authenticated user.
    return likeIds.map((like) => like.targetUserId)
  } catch (error) {
    // Log any errors to the console.
    console.log(error)
    // Rethrow the error to be handled by the caller.
    throw error
  }
}
