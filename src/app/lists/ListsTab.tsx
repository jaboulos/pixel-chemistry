'use client' // This directive indicates that the following code should be executed on the client side.

import { Tab, Tabs } from '@nextui-org/react'
import { Member } from '@prisma/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { Key, useTransition } from 'react'
import MemberCard from '../members/MemberCard'
import LoadingComponent from '@/components/LoadingComponent'

type ListsTabProps = {
  members: Member[]
  likeIds: string[]
}

export const ListsTab = ({ members, likeIds }: ListsTabProps) => {
  const searchParams = useSearchParams() // Get the current URL search parameters.
  const router = useRouter() // Get the router instance for navigation.
  const pathname = usePathname() // Get the current pathname.
  const [isPending, startTransition] = useTransition() // useTransition hook for managing transitions.

  const tabs = [
    { id: 'source', label: 'Members I have liked' }, // Define the tabs for navigation.
    { id: 'target', label: 'Members that like me' },
    { id: 'mutual', label: 'Mutual likes' },
  ]

  const handleTabChange = (key: Key) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams) // Create a new URLSearchParams object from the current search parameters.
      params.set('type', key.toString()) // Set the 'type' parameter to the selected tab key.
      router.replace(`${pathname}?${params.toString()}`) // Replace the current URL with the new search parameters.
    })
  }

  return (
    <div className="flex w-full flex-col mt-10 gap-5">
      {' '}
      {/* Main container for the component */}
      <Tabs
        aria-label="like tabs"
        items={tabs}
        color="secondary"
        onSelectionChange={(key) => handleTabChange(key)} // Event handler for tab selection changes.
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            {' '}
            {/* Render each tab */}
            {isPending ? ( // Check if a transition is pending
              <LoadingComponent /> // Display loading component if a transition is pending.
            ) : (
              <>
                {members.length > 0 ? ( // Check if there are members to display
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
                    {' '}
                    {/* Grid layout for member cards */}
                    {members.map((member) => (
                      <MemberCard
                        key={member.id}
                        member={member} // The member data to display in the card.
                        likeIds={likeIds} // Array of likeIds to determine liked members.
                      />
                    ))}
                  </div>
                ) : (
                  <div>No members for this filter</div> // Display message if no members match the filter
                )}
              </>
            )}
          </Tab>
        )}
      </Tabs>
    </div>
  )
}

export default ListsTab
