import React from 'react'


const Header = () => {
  const links = ['Residential', 'Office', 'Commercial', 'FAQ\'s'];
  return (
    <header className='flex justify-center w-full bg-transparent'>
      <div className='flex flex-row w-full max-w-[1170px] justify-between items-end mt-[20px]'>
        <img src='/img/Logo.svg' alt='Clean' className='h-8' /> {/* Adjust height as needed */}
        <nav className='flex gap-[31px] items-end'>
          {links.map((link) => (
            <a href={`#${link.toLowerCase()}`} key={link} className='text-gray-700 hover:text-gray-900 py-3 font-Averta-Semibold'>
              {link}
            </a>
          ))}
          <button className=" text-center text-blue-600 rounded-xl border-[3px] px-6 py-2 border-blue-600 border-solid font-Averta-Semibold">
            Login
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header