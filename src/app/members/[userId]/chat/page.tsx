import CardInnerWrapper from '@/components/CardInnerWrapper'
import { CardBody, CardHeader, Divider } from '@nextui-org/react'
import React from 'react'
import ChatForm from './ChatForm'
import { getMessageThread } from '@/app/actions/messageActions'

export const ChatPage = async ({ params }: { params: { userId: string } }) => {
  const messages = await getMessageThread(params.userId)
  console.log({ messages })
  return (
    <CardInnerWrapper
      header="Chat"
      body={<div>Chat goes here</div>}
      footer={<ChatForm />}
    />
  )
}

export default ChatPage
