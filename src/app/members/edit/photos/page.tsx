import { getAuthUserId, getUserById } from '@/app/actions/authActions'
import { getMemberPhotosByUserId } from '@/app/actions/memberActions'
import DeleteButton from '@/components/DeleteButton'
import ImageUploadButton from '@/components/ImageUploadButton'
import StarButton from '@/components/StarButton'
import { CardHeader, Divider, CardBody, Image } from '@nextui-org/react'
import { notFound } from 'next/navigation'
import React from 'react'
import MemberPhotoUpload from './MemberPhotoUpload'

export const PhotosPage = async () => {
  const userId = await getAuthUserId()
  const photos = await getMemberPhotosByUserId(userId)

  if (!photos) {
    return notFound()
  }

  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Edit Profile
      </CardHeader>
      <Divider />
      <CardBody>
        <MemberPhotoUpload />
        <div className="grid grid-cols-5 gap-3 p-5">
          {photos &&
            photos.map((photo) => (
              <div key={photo.id} className="relative">
                <Image
                  width={220}
                  height={220}
                  src={photo.url}
                  alt="member image"
                />
                <div className="absolute top-3 left-3 z-50">
                  <StarButton selected={false} loading={false} />
                </div>
                <div className="absolute top-3 right-3 z-50">
                  <DeleteButton loading={false} />
                </div>
              </div>
            ))}
        </div>
      </CardBody>
    </>
  )
}

export default PhotosPage
