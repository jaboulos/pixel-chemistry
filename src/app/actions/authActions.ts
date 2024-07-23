// server actions
// can call these actions from our client component
// executed on server side
'use server'

import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { registerSchema, RegisterSchema } from '@/lib/schemas/registerSchema'
import { User } from '@prisma/client'
import { ActionResult } from '@/types'

// take in form fields from forms, validation and process for registering user
export const registerUser = async (
  data: RegisterSchema,
  // return promise of type ActionResult
  // return a User from this method
): Promise<ActionResult<User>> => {
  try {
    // validate on server side as well as client side, easy to do with zod
    // data is validated on server side
    // in case this function gets called outside of the server somehow, still needs to pass this validation
    const validated = registerSchema.safeParse(data)

    // if its not valid, throw error
    if (!validated.success) {
      // add the property "status" because it is part of the type defintion of what can be returned by ActionResult
      return { status: 'error', error: validated?.error?.errors }
    }

    // if data passes validation, start process of creating user in db
    const { name, email, password } = validated.data

    // hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10)

    // check if user already exists in db with existing email
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    })

    // if user already exists throw server side error
    if (existingUser) {
      return {
        status: 'error',
        error: 'User already exists',
      }
    }

    // otherwise create user in db
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
      },
    })

    // return in format typescript is expecting of type ActionResult
    return { status: 'success', data: user }
  } catch (error) {
    console.log(error)
    return {
      status: 'error',
      error: 'Something went wrong',
    }
  }
}
