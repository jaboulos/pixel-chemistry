import { MessageSchema } from '@/lib/schemas/messageSchema'
import React from 'react'
import { useForm } from 'react-hook-form'

export const ChatForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid, errors },
  } = useForm<MessageSchema>()

  return <div>ChatForm</div>
}

export default ChatForm
