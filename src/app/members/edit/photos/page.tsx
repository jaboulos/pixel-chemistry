import { getAuthUserId, getUserById } from '@/app/actions/authActions'
import {
  getMemberByUserId,
  getMemberPhotosByUserId,
} from '@/app/actions/memberActions'
import DeleteButton from '@/components/DeleteButton'
import StarButton from '@/components/StarButton'
import { CardHeader, Divider, CardBody, Image } from '@nextui-org/react'
import { notFound } from 'next/navigation'
import React from 'react'
import MemberPhotoUpload from './MemberPhotoUpload'
import MemberImage from '@/components/MemberImage'
import MemberPhotos from '@/components/MemberPhotos'

export const PhotosPage = async () => {
  const userId = await getAuthUserId()
  const member = await getMemberByUserId(userId)
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
        <MemberPhotos
          photos={photos}
          editing={true}
          mainImageUrl={member?.image}
        />
      </CardBody>
    </>
  )
}

export default PhotosPage
