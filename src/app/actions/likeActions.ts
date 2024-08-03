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

// fetch current users the user has liked, current user is the source
export const fetchLikedMembers = async (type = 'source') => {
  try {
    const userId = await getAuthUserId()

    switch (type) {
      case 'source':
        return await fetchSourceLikes(userId)
      case 'target':
        return await fetchTargetLikes(userId)
      case 'mutual':
        return await fetchMutualLikes(userId)
      default:
        return []
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

// sourceUserId is our current id
const fetchSourceLikes = async (userId: string) => {
  const sourceList = await prisma.like.findMany({
    where: { sourceUserId: userId },
    // get the target member, join to member tabele to get the full member back from this
    select: { targetMember: true },
  })
  // returns target member without current user info with it
  // it is just the other user member properties
  return sourceList.map((x) => x.targetMember)
}

const fetchTargetLikes = async (userId: string) => {
  const targetList = await prisma.like.findMany({
    where: { targetUserId: userId },
    select: { sourceMember: true },
  })
  return targetList.map((x) => x.sourceMember)
}

// 1 get list of members source user has liked
// 2 find out if any of those user ids are inside the target members as well
// will give a list of the mutual likes between two users
const fetchMutualLikes = async (userId: string) => {
  const likedUsers = await prisma.like.findMany({
    where: { sourceUserId: userId },
    select: { targetUserId: true },
  })
  // returns an array of strings
  const likedIds = likedUsers.map((x) => x.targetUserId)
  const mutualList = await prisma.like.findMany({
    where: {
      AND: [{ targetUserId: userId }, { sourceUserId: { in: likedIds } }],
    },
    // sourceMember is not the current user, its the "OTHER" user
    select: { sourceMember: true },
  })
  return mutualList.map((x) => x.sourceMember)
}
