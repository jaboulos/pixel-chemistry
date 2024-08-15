/*

Error: Event handlers cannot be passed to Client Component props.
  <... color="danger" onClick={function onClick} children=...>
                              ^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.

*/
'use client'
import { signOutUser } from '@/app/actions/authActions'
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react'
import { Session } from 'next-auth'
import Link from 'next/link'
import React from 'react'

type UserMenuProps = {
  user: Session['user']
  member: any
}

export const UserMenu = ({ user, member }: UserMenuProps) => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name={member?.name || 'user avatar'}
          size="sm"
          src={member?.image || '/images/user.png'}
        />
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="User actions menu">
        <DropdownSection showDivider>
          <DropdownItem
            isReadOnly
            as="span"
            className="h-14 flex flex-row"
            aria-label="username"
          >
            Signed in as {member?.name}
          </DropdownItem>
        </DropdownSection>
        <DropdownItem as={Link} href="/members/edit">
          Edit profile
        </DropdownItem>
        <DropdownItem color="danger" onClick={async () => signOutUser()}>
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default UserMenu
