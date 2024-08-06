'use server'

import {
  memberEditSchema,
  MemberEditSchemaType,
} from '@/lib/schemas/memberEditSchema'
import { ActionResult } from '@/types'
import { getAuthUserId } from './authActions'
import { prisma } from '@/lib/prisma'
import { Member } from '@prisma/client'

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
