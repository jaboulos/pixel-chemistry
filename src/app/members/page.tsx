import React from 'react'
import { getMembers } from '../actions/memberActions'

export const MembersPage = async () => {
  const members = await getMembers()
  return (
    <div>
      <ul>
        {members?.map((member) => (
          <li key={member.id}>name: {member.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default MembersPage
