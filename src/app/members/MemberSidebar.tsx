'use client'
import { calculateAge } from '@/lib/util'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from '@nextui-org/react'
import { Member } from '@prisma/client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type MemberSidebarProps = {
  member: Member
  navLinks: { name: string; href: string }[]
}
export const MemberSidebar = ({ member, navLinks }: MemberSidebarProps) => {
  const pathname = usePathname()

  return (
    <Card className="w-full mt-10 items-center h-[80vh]">
      <Image
        height={200}
        width={200}
        src={member.image || '/images/user.png'}
        alt="User profile main img"
        className="rounded-full mt-6 aspect-square object-cover"
      />
      <CardBody className="flex flex-col items-center">
        <div className="text-2xl">
          {member.name}, {calculateAge(member.dateOfBirth)}
        </div>
        <div className="text-sm text-neutral-500">
          {member.city}, {member.country}
        </div>
        <Divider className="my-3" />
        <nav className="flex flex-col p-4 ml-4 text-2xl gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block rounded ${
                pathname === link.href
                  ? 'text-cyan-600/80'
                  : 'hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </CardBody>
      <CardFooter>
        <Button
          as={Link}
          href="/members"
          fullWidth
          color="default"
          variant="ghost"
        >
          Go Back
        </Button>
      </CardFooter>
    </Card>
  )
}

export default MemberSidebar
