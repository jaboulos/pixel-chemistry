'use server'

import {
  memberEditSchema,
  MemberEditSchemaType,
} from '@/lib/schemas/memberEditSchema'
import { ActionResult } from '@/types'
import { getAuthUserId } from './authActions'
import { prisma } from '@/lib/prisma'
import { Member, Photo } from '@prisma/client'
import { cloudinary } from '@/lib/cloudinary'

/**
 * Updates the profile of a member.
 *
 * @param {MemberEditSchemaType} data - The new data for the member's profile.
 * @returns {Promise<ActionResult<Member>>} - The result of the update action.
 */
export const updateMemberProfile = async (
  data: MemberEditSchemaType,
): Promise<ActionResult<Member>> => {
  try {
    // Get the authenticated user's ID
    const userId = await getAuthUserId()

    // Validate the input data using the member edit schema
    const validated = memberEditSchema.safeParse(data)

    // If validation fails, return an error with validation errors
    if (!validated.success) {
      return {
        status: 'error',
        error: validated.error.errors,
      }
    }

    // Destructure the validated data
    const { name, description, city, country } = validated.data

    // Update the member's profile in the database using Prisma
    const member = await prisma.member.update({
      where: { userId }, // Find the member by user ID
      data: {
        // Update the member's profile with the new data
        name,
        description,
        city,
        country,
      },
    })

    // Return a success response with the updated member data
    return {
      status: 'success',
      data: member,
    }
  } catch (error) {
    // Log the error to the console
    console.log(error)

    // Return a generic error response
    return { status: 'error', error: 'Something went wrong' }
  }
}

// call function after image has been uploaded to cloudinary
export const addImage = async (url: string, publicId: string) => {
  try {
    const userId = await getAuthUserId()

    // adds image to db
    return prisma.member.update({
      where: { userId },
      data: {
        photos: {
          create: [
            {
              url,
              publicId,
            },
          ],
        },
      },
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const setMainImage = async (photo: Photo) => {
  try {
    const userId = await getAuthUserId()

    // update image in cookie
    await prisma.user.update({
      where: { id: userId },
      data: { image: photo.url },
    })

    // update image that is displayed
    return prisma.member.update({
      where: { userId },
      data: { image: photo.url },
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

// deletes image from cloudinary and db
export const deleteImage = async (photo: Photo) => {
  try {
    const userId = await getAuthUserId()
    if (photo.publicId) {
      // remove from cloudinary if image has public id
      await cloudinary.v2.uploader.destroy(photo.publicId)
    }

    // delete image from db
    return prisma.member.update({
      where: { userId },
      // data we will delete is inside photos
      data: {
        photos: {
          // pass in the id of the photo to delete
          delete: { id: photo.id },
        },
      },
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getUserInfoForNav() {
  try {
    const userId = await getAuthUserId()
    return prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, image: true },
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}
