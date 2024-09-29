import React from 'react'


const Header = () => {
  const links = ['Residential', 'Office', 'Commercial', 'FAQ\'s'];
  return (
    <header className='flex justify-center bg-transparent'>
      <div className='flex flex-row w-full max-w-[1170px] h-[38px] justify-between items-end mt-[20px]'>
        <img src='/img/Logo.svg' alt='Clean' className='h-[38px]' /> 
        <nav className='flex flex-wrap gap-8 items-center'>
          {links.map((link) => (
            <a href={`#${link.toLowerCase()}`} key={link} className='text-gray-700 font-Averta-Semibold mt-1'>
              {link}
            </a>
          ))}
          <button className=" text-center text-blue-600 rounded-xl border-[3px] px-6 py-1 border-blue-600 border-solid font-Averta-Semibold">
            Login
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header