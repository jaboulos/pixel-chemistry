import { getMemberByUserId } from '@/app/actions/memberActions'
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
    <div>
      <div>Member name: {member.name}</div>
    </div>
  )
}

export default MemberDetailPage
