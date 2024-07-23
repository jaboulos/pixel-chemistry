// server actions
// can call these actions from our client component
// executed on server side
'use server'

import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { registerSchema, RegisterSchema } from '@/lib/schemas/registerSchema'

// take in form fields from forms, validation and process for registering user
export const registerUser = async (data: RegisterSchema) => {
  // validate on server side as well as client side, easy to do with zod
  // data is validated on server side
  // in case this function gets called outside of the server somehow, still needs to pass this validation
  const validated = registerSchema.safeParse(data)

  // if its not valid, throw error
  if (!validated.success) {
    return { error: validated?.error?.errors }
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

  return user
}
