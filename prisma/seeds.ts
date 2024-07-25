import { PrismaClient } from '@prisma/client'
import { membersData } from './membersData'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

const seedMembers = async () => {
  return membersData.map(async (member) =>
    prisma.user.create({
      data: {
        email: member.email,
        emailVerified: new Date(),
        name: member.name,
        // seeding users, not a good password but just for demo purposes
        passwordHash: await hash('password', 10),
        // avoid db joins by having member.image
        image: member.image,
        member: {
          create: {
            dateOfBirth: new Date(member.dateOfBirth),
            gender: member.gender,
            name: member.name,
            created: new Date(member.created),
            updated: new Date(member.lastActive),
            description: member.description,
            city: member.city,
            country: member.country,
            image: member.image,
            photos: {
              create: {
                url: member.image,
              },
            },
          },
        },
      },
    }),
  )
}

const main = async () => {
  await seedMembers()
}

// check for errors during seed
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
