import Link from 'next/link'
import React from 'react'
import MonitoLogo from '../img/logo'


const Header = () => {
  return (
    <div className='flex flex-row gap-[48px] justify-center items-center py-[28px]'>
      <MonitoLogo/>
      <Link href={'/dashboard'} className="text-[#103559] font-gilroy-bold">Home</Link>
    </div>  
  )
}

export default Header