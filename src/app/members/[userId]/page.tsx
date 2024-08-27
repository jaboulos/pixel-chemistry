import { getMemberByUserId } from '@/app/actions/memberActions'
import CardInnerWrapper from '@/components/CardInnerWrapper'
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
    <CardInnerWrapper header="Profile" body={<div>{member.description}</div>} />
  )
}

export default MemberDetailPage
