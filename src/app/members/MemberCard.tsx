import React from 'react'
import { Member } from '@prisma/client'
import { Card, CardFooter, Image } from '@nextui-org/react'
import Link from 'next/link'
import { calculateAge } from '@/lib/util'

type MemberCardProps = {
  member: Member
}

export const MemberCard = ({ member }: MemberCardProps) => {
  const memberAge = calculateAge(member.dateOfBirth)

  return (
    <Card fullWidth as={Link} href={`/members/${member.userId}`}>
      <Image
        isZoomed
        alt={member.name}
        width={300}
        src={member.image || '/images/user.png'}
        className="aspect-square object-cover"
      />
      <CardFooter className="flex justify-start bg-black bg-dark-gradient overflow-hidden absolute bottom-0 z-10">
        <div className="flex flex-col text-white">
          <span className="font-semibold">
            {member?.name}, {memberAge}
          </span>
          <span className="text-sm">{member?.city}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

export default MemberCard
