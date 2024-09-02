import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full p-4 pt-8">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-4">
            <p className="md:text-lg lg:text-xl font-semibold">
              Support
            </p>
            <ul className="flex flex-col gap-4 text-sm">
              <li>Address</li>
              <li>Email</li>
              <li>Phone</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <p className="md:text-lg lg:text-xl font-semibold">
              Account
            </p>
            <ul className="flex flex-col gap-4 text-sm">
              <li>Profile</li>
              <li>Wishlist</li>
              <li>Cart</li>
              <li>Orders</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <p className="md:text-lg lg:text-xl font-semibold">
              Quick Link
            </p>
            <ul className="flex flex-col gap-4 text-sm">
              <li>Home</li>
              <li>Products</li>
              <li>Categories</li>
              <li>Cart</li>
            </ul>
          </div>
        </div>
        <p className="text-center text-sm">© 2024 eTrade. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer