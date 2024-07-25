/*
The purpose of this auth.ts file is to configure and set up authentication using NextAuth.js with Prisma as the database adapter. It defines the authentication handlers and integrates with Prisma for user session management.
*/
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import authConfig from './auth.config'
import { prisma } from './lib/prisma'

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ token, session }) {
      console.log({ token, session })
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
})
