// registers as a client component, fixes error message
'use client'
import 'react-toastify/dist/ReactToastify.css'

import { NextUIProvider } from '@nextui-org/react'
import React, { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <NextUIProvider>
        <ToastContainer position="bottom-right" className="z-50" />
        {children}
      </NextUIProvider>
    </div>
  )
}
