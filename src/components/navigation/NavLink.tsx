'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type PropsType = {
  label: string
  href: string
  className?: string
}

const NavLink = ({ label, href, className }: PropsType) => {
  const pathname = usePathname()

  const isActive = pathname === href
  return (
    <Link
      href={href}
      data-active={isActive}
      className={`font-medium data-[active=true]:text-blue-500 ${className}`}
    >
      {label}
    </Link>
  )
}

export default NavLink