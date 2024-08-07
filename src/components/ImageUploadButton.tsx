'use client'
import { CldUploadButton } from 'next-cloudinary'
import React from 'react'
import { HiPhoto } from 'react-icons/hi2'

export const ImageUploadButton = () => {
  return (
    <CldUploadButton
      options={{ maxFiles: 1 }}
      onSuccess={(res) => console.log('res', res)}
      signatureEndpoint="/api/sign-image"
      uploadPreset="app-default"
      className="flex items-center gap-2 bg-secondary-50 text-white rounded-lg py-2 px-4 hover:bg-secondary/70"
    >
      <HiPhoto size={28} />
      Upload new image
    </CldUploadButton>
  )
}

export default ImageUploadButton
