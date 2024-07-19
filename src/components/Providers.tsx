// registers as a client component, fixes error message
'use client'

import { NextUIProvider } from '@nextui-org/react'
import React, { ReactNode } from 'react'

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <NextUIProvider>{children}</NextUIProvider>
    </div>
  )
}
