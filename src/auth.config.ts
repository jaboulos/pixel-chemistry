import Credentials from 'next-auth/providers/credentials'
import type { NextAuthConfig } from 'next-auth'
import { compare } from 'bcryptjs'

import { loginSchema } from './lib/schemas/loginSchema'
import { getUserByEmail } from './app/actions/authActions'

export default {
  providers: [
    Credentials({
      name: 'credentials',
      // aync function, authorize, is available when using the Credentials provider
      async authorize(creds) {
        // validate creds from login form
        const validated = loginSchema.safeParse(creds)
        if (validated.success) {
          const { email, password } = validated.data

          // get user from db
          const user = await getUserByEmail(email)

          // check if got user by email
          // bcrypt function (compare) that compares hash with normal pw
          if (!user || !(await compare(password, user.passwordHash))) {
            return null
          }
          // if we were able to get the user by email and their pw matches, return the user
          return user
          // compare hashed pw with clear text pw
        }
        // if validation was not successful (user is not authorized or logged in)
        return null
      },
    }),
  ],
} satisfies NextAuthConfig
