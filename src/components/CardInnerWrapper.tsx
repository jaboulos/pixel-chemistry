import { CardHeader, Divider, CardBody, CardFooter } from '@nextui-org/react'
import React, { ReactNode } from 'react'

type CardInnerWrapperProps = {
  header: ReactNode | string
  body: ReactNode
  footer?: ReactNode
}

export const CardInnerWrapper = ({
  header,
  body,
  footer,
}: CardInnerWrapperProps) => {
  return (
    <>
      <CardHeader>
        {typeof header === 'string' ? (
          <div className="text-2xl font-semibold text-secondary">{header}</div>
        ) : (
          <>{header}</>
        )}
      </CardHeader>
      <Divider />
      <CardBody>{body}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </>
  )
}

export default CardInnerWrapper
