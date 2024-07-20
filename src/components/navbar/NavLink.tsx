'use client'
import React from 'react'
import Link from 'next/link'
import { NavbarItem } from '@nextui-org/react'
import { usePathname } from 'next/navigation'

type NavLinkProps = {
  href: string
  label: string
}

export const NavLink = ({ href, label }: NavLinkProps) => {
  // gets the current pathname from browser
  const pathname = usePathname()
  return (
    <NavbarItem isActive={pathname === href} as={Link} href={href}>
      {label}
    </NavbarItem>
  )
}

export default NavLink
