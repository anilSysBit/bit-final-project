// Navigation.jsx
import React, { useState } from 'react';
import { Link } from '@inertiajs/react'; // Adjust based on your routing setup
import { asset } from '@/helpers/asset';
import { Person, PersonOutline } from '@mui/icons-material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Navigation = ({props}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-red-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-white text-2xl font-bold flex place-items-center  gap-5">
          <img src={asset('logo1.jpeg')} alt="" width={50} className='rounded-full'/>
          <p>Blood Life Nepal</p>
        </div>

        {/* Hamburger Icon */}
        <button
          className="text-white lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`lg:flex lg:items-center lg:space-x-6 text-white ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
            <Link className='border border-white p-1 rounded-lg'>Support</Link>
            {!props.auth.user ? <p>Login / Signup</p>
            :<p className='flex gap-1'><AccountCircleOutlinedIcon/>Anil Wagle</p>}
        </div>


      </div>
       <div className="sub_nav flex place-content-center mt-5 text-white gap-10">
        <Link>Home</Link>
        <Link>About Us</Link>
        <Link>News</Link>
        <Link>Contact</Link>
        </div>

    </nav>
  );
};

export default Navigation;
