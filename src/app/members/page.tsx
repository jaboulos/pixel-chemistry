import React from 'react'
import { getMembers } from '../actions/memberActions'
import MemberCard from './MemberCard'
import { fetchCurrentUserLikeIds } from '../actions/likeActions'

export const MembersPage = async () => {
  const members = await getMembers()

  // get ids of users user has liked
  const likeIds = await fetchCurrentUserLikeIds()

  return (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
      {members &&
        members?.map((member) => (
          <MemberCard key={member.id} member={member} likeIds={likeIds} />
        ))}
    </div>
  )
}

export default MembersPage
