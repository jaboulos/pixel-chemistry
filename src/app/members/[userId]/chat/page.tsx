import CardInnerWrapper from '@/components/CardInnerWrapper'
import { CardBody, CardHeader, Divider } from '@nextui-org/react'
import React from 'react'
import ChatForm from './ChatForm'

export const ChatPage = () => {
  return (
    <CardInnerWrapper
      header="Chat"
      body={<div>Chat goes here</div>}
      footer={<ChatForm />}
    />
  )
}

export default ChatPage
