'use client'
import { updateMemberProfile } from '@/app/actions/userActions'
import {
  memberEditSchema,
  MemberEditSchemaType,
} from '@/lib/schemas/memberEditSchema'
import { handleFormServerErrors } from '@/lib/util'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Textarea } from '@nextui-org/react'
import { Member } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

type EditFormProps = {
  member: Member
}

export const EditForm = ({ member }: EditFormProps) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isValid, isDirty, isSubmitting, errors },
  } = useForm<MemberEditSchemaType>({
    resolver: zodResolver(memberEditSchema),
    mode: 'onTouched',
  })

  useEffect(() => {
    if (member) {
      reset({
        name: member.name,
        description: member.description,
        city: member.city,
        country: member.country,
      })
    }
  }, [member, reset])

  const onSubmit = async (data: MemberEditSchemaType) => {
    console.log(data)
    const result = await updateMemberProfile(data)
    if (result.status === 'success') {
      toast.success('profile updated')
      router.refresh()
      // reset form after submission
      reset({ ...data })
    } else {
      handleFormServerErrors(result, setError)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <Input
        label="Name"
        variant="bordered"
        {...register('name')}
        defaultValue={member.name}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />
      <Textarea
        label="Description"
        variant="bordered"
        {...register('description')}
        defaultValue={member.description}
        isInvalid={!!errors.description}
        errorMessage={errors.description?.message}
        minRows={6}
      />
      <div className="flex flex-row gap-3">
        <Input
          label="City"
          variant="bordered"
          {...register('city')}
          defaultValue={member.city}
          isInvalid={!!errors.city}
          errorMessage={errors.city?.message}
        />
        <Input
          label="Country"
          variant="bordered"
          {...register('country')}
          defaultValue={member.country}
          isInvalid={!!errors.country}
          errorMessage={errors.country?.message}
        />
      </div>
      {errors?.root?.serverError && (
        <p className="text-danger text-sm">{errors.root.serverError.message}</p>
      )}
      <Button
        type="submit"
        className="flex self-end"
        variant="solid"
        isDisabled={!isValid || !isDirty}
        isLoading={isSubmitting}
        color="primary"
      >
        Update Profile
      </Button>
    </form>
  )
}

export default EditForm
