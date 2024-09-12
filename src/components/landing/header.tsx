import Link from 'next/link'
import React from 'react'
import MonitoLogo from '../img/logo'
import localFont from 'next/font/local'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Font } from '@react-pdf/renderer';

const poppins = Poppins({
  weight: "700",
  subsets: ["latin"]
})

Font.register({
  family: "FontName",
  src: "/fonts/Super-Feel.ttf",
});

const Header = () => {
  return (
    <div className='flex flex-row gap-[48px] justify-center items-center py-[28px]'>
      <MonitoLogo/>
      <Link href={'/dashboard'} className={cn("text-[#103559] font-gilroy-regular")} >Home</Link>
    </div>  
  )
}

export default Header