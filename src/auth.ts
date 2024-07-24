import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
// import { PrismaClient } from '@prisma/client'
import authConfig from './auth.config'
import { prisma } from './lib/prisma'

// const prisma = new PrismaClient()

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
