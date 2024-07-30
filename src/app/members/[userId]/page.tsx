import { getMemberByUserId } from '@/app/actions/memberActions'
import { CardBody, CardHeader, Divider } from '@nextui-org/react'
import { notFound } from 'next/navigation'
import React from 'react'

export const MemberDetailPage = async ({
  params,
}: {
  params: { userId: string }
}) => {
  const member = await getMemberByUserId(params?.userId)
  // if query did not succeed, redirect user
  if (!member) {
    // 404 not found page
    return notFound()
  }

  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Profile
      </CardHeader>
      <Divider />
      <CardBody>{member.description}</CardBody>
    </>
  )
}

export default MemberDetailPage
