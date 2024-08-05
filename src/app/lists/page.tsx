import React from 'react'
import ListsTab from './ListsTab'
import {
  fetchCurrentUserLikeIds,
  fetchLikedMembers,
} from '../actions/likeActions'

/*
1. Fetch the current user's liked member IDs and the liked members based on the search parameters.
2. Pass the fetched data to the ListsTab component to display the member lists.
*/

export const ListsPage = async ({
  searchParams,
}: {
  searchParams: { type: string }
}) => {
  // Fetch the IDs of members liked by the current user.
  const likeIds = await fetchCurrentUserLikeIds()

  // Fetch the members liked by the user based on the type specified in search parameters.
  const members = await fetchLikedMembers(searchParams.type)

  return (
    <div>
      <ListsTab members={members} likeIds={likeIds} />
    </div>
  )
}

export default ListsPage
