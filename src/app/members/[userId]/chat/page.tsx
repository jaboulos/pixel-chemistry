import CardInnerWrapper from '@/components/CardInnerWrapper'
import { CardBody, CardHeader, Divider } from '@nextui-org/react'
import React from 'react'

export const ChatPage = () => {
  return (
    <CardInnerWrapper
      header="Chat"
      body={<div>Chat goes here</div>}
      footer={<div>Chat form here</div>}
    />
  )
}

export default ChatPage
