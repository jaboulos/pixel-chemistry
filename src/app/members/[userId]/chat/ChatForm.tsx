'use client'
import { createMessage } from '@/app/actions/messageActions'
import { messageSchema, MessageSchema } from '@/lib/schemas/messageSchema'
import { handleFormServerErrors } from '@/lib/util'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@nextui-org/react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { HiPaperAirplane } from 'react-icons/hi2'

export const ChatForm = () => {
  const router = useRouter()
  const params = useParams<{ userId: string }>()
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setFocus, // set focus when component first loads
    formState: { isSubmitting, isValid, errors },
  } = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
  })

  useEffect(() => {
    // when the app loads set focus on specific field
    setFocus('text')
  }, [setFocus])

  const onSubmit = async (data: MessageSchema) => {
    const result = await createMessage(params.userId, data)
    if (result.status == 'error') {
      handleFormServerErrors(result, setError)
    } else {
      reset()
      router.refresh()
      // after submitting a message, refocus the cursor into the input
      // since these are not async, need to add a delay for setFocus call
      setTimeout(() => setFocus('text'), 50)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex items-center gap-2">
        <Input
          fullWidth
          placeholder="Type a message"
          variant="faded"
          {...register('text')}
          isInvalid={!!errors.text}
          errorMessage={errors.text?.message}
        />
        <Button
          type="submit"
          isIconOnly
          color="secondary"
          radius="full"
          isLoading={isSubmitting}
          isDisabled={!isValid || isSubmitting}
        >
          <HiPaperAirplane size={18} />
        </Button>
      </div>
      <div className="flex flex-col">
        {errors.root?.serverError && (
          <p className="text-danger text-sm">
            {errors.root.serverError.message}
          </p>
        )}
      </div>
    </form>
  )
}

export default ChatForm
