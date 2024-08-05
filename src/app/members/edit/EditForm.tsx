import { Member } from '@prisma/client'
import React from 'react'

type EditFormProps = {
  member: Member
}

export const EditForm = ({ member }: EditFormProps) => {
  return (
    <div>
      <div>edit form</div>
    </div>
  )
}

export default EditForm
