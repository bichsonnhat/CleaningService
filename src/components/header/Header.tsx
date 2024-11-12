"use client";
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = ['Residential', 'Office', 'Commercial', "FAQ's"];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='flex justify-center bg-transparent w-full'>
      <div className='flex flex-col w-full max-w-[1170px] px-4 md:px-6 lg:px-8'>
        {/* Desktop Navigation */}
        <div className='flex flex-row w-full h-[38px] justify-between items-end mt-5'>
          <img src='/images/Header/Logo.svg' alt='Clean' className='h-[38px]' />
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className='md:hidden p-2'
            aria-label='Toggle menu'
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Menu */}
          <nav className='hidden md:flex flex-wrap gap-4 lg:gap-8 items-center'>
            {links.map((link) => (
              <a
                href={`#${link.toLowerCase()}`}
                key={link}
                className='text-gray-700 font-Averta-Semibold mt-1 hover:text-blue-600 transition-colors'
              >
                {link}
              </a>
            ))}
            <button className="text-center text-blue-600 rounded-xl border-[3px] px-4 lg:px-6 py-1 border-blue-600 border-solid font-semibold hover:bg-blue-600 hover:text-white transition-colors">
              Login
            </button>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className='md:hidden flex flex-col w-full mt-4 bg-white rounded-lg shadow-lg p-4 space-y-4'>
            {links.map((link) => (
              <a
                href={`#${link.toLowerCase()}`}
                key={link}
                className='text-gray-700 font-semibold hover:text-blue-600 transition-colors'
                onClick={() => setIsMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <button className="text-center text-blue-600 rounded-xl border-[3px] px-6 py-1 border-blue-600 border-solid font-semibold hover:bg-blue-600 hover:text-white transition-colors w-full">
              Login
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;