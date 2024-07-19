import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'
import React from 'react'
import { GiMatchTip } from 'react-icons/gi'

export const TopNav = () => {
  return (
    <Navbar
      maxWidth="xl"
      className="bg-gradient-to-r from-purple-900 to-blue-400"
      classNames={{
        item: ['text-xl', 'text-white', 'uppercase'],
      }}
    >
      <NavbarBrand as={Link} href="/">
        <GiMatchTip size={40} className="text-gray-200" />
        <div className="font-bold text-3xl flex">
          <span className="text-gray-900">Pixel</span>
          <span className="text-gray-200">Chemistry</span>
        </div>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem as={Link} href="/members">
          members
        </NavbarItem>
        <NavbarItem as={Link} href="/lists">
          lists
        </NavbarItem>
        <NavbarItem as={Link} href="/messages">
          messages
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <Button variant="bordered" className="text-white">
          Login
        </Button>
        <Button variant="bordered" className="text-white">
          Register
        </Button>
      </NavbarContent>
    </Navbar>
  )
}

export default TopNav
