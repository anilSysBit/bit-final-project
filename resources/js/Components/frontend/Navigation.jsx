// Navigation.jsx
import React, { useState } from 'react';
import { Link } from '@inertiajs/react'; // Adjust based on your routing setup
import { asset } from '@/helpers/asset';
import Dropdown from '@/Components/Dropdown';

const Navigation = ({props}) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log('props',props)
  return (
    <nav className="bg-[#bc0202]">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-white text-xl font-bold flex place-items-center  gap-5 mt-2">
          <img src={asset('logo1.jpeg')} alt="" width={40} className='rounded-full'/>
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
            {!props.auth.user ? <Link href={route('login')}>Login / Signup</Link>
            :                        <div className="hidden sm:flex sm:items-center sm:ml-6">
            <div className="ml-3 relative">
                <Dropdown>
                    <Dropdown.Trigger>
                        <span className="inline-flex rounded-md">
                            <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                            >
                                {props.auth.user.name}

                                <svg
                                    className="ml-2 -mr-0.5 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </span>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                        {props.auth.user.is_admin ? <Dropdown.Link href={route('dashboard')}>Dashboard</Dropdown.Link>:''}
                        <Dropdown.Link href={route('logout')} method="post" as="button">
                            Log Out
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </div>}
        </div>


      </div>
       <div className="sub_nav flex place-content-center mt-5 gap-10 text-white bg-[#034456] p-2">
        <Link className='border-b  white'>Home</Link>
        <Link>About Us</Link>
        <Link>News</Link>
        <Link>Contact</Link>
        </div>

    </nav>
  );
};

export default Navigation;
