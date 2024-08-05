'use client'
import { memberEditSchema } from '@/lib/schemas/memberEditSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Member } from '@prisma/client'
import React from 'react'
import { useForm } from 'react-hook-form'

type EditFormProps = {
  member: Member
}

export const EditForm = ({ member }: EditFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isDirty, isSubmitting },
  } = useForm({
    resolver: zodResolver(memberEditSchema),
  })

  return (
    <div>
      <div>edit form</div>
    </div>
  )
}

export default EditForm
