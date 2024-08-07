'use client'
import { addImage } from '@/app/actions/userActions'
import ImageUploadButton from '@/components/ImageUploadButton'
import { CloudinaryUploadWidgetResults } from 'next-cloudinary'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

export const MemberPhotoUpload = () => {
  const router = useRouter()
  const onAddImage = async (result: CloudinaryUploadWidgetResults) => {
    if (result.info && typeof result.info === 'object') {
      await addImage(result.info.secure_url, result.info.public_id)
      // update UI
      router.refresh()
    } else {
      toast.error('Problem adding image')
    }
  }

  return (
    <div className="pt-5 pl-5">
      <ImageUploadButton onUploadImage={onAddImage} />
    </div>
  )
}

export default MemberPhotoUpload
