import { Button, Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { GiMatchTip } from 'react-icons/gi'
import NavLink from './NavLink'

export const TopNav = () => {
  return (
    <Navbar
      maxWidth="xl"
      className="bg-gradient-to-r from-teal-400 to-sky-500"
      classNames={{
        item: [
          'text-xl',
          'text-white',
          'uppercase',
          'data-[active=true]:text-green-200',
        ],
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
        <NavLink label="Members" href="/members" />
        <NavLink label="Lists" href="/lists" />
        <NavLink label="Messages" href="/messages" />
      </NavbarContent>
      <NavbarContent justify="end">
        <Button
          variant="bordered"
          as={Link}
          href="/login"
          className="text-white"
        >
          Login
        </Button>
        <Button
          variant="bordered"
          as={Link}
          href="/register"
          className="text-white"
        >
          Register
        </Button>
      </NavbarContent>
    </Navbar>
  )
}

export default TopNav
