import React from 'react'
import NavLink from '../navigation/NavLink';

const headerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Create product', href: '/product/new' },
]

const Header = () => {
  return (
    <header className="w-full p-4 shadow-md bg-white sticky top-0 z-50">
      <div className='w-full max-w-6xl mx-auto flex items-center justify-between'>
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">eTrade</h1>
        <ul className='flex items-center gap-4'>
          {headerLinks.map((link) => (
            <li key={link.href}>
              <NavLink label={link.label} href={link.href} />
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Header