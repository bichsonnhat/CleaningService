import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'
import Link from 'next/link'
import React from 'react'

const CategoryPage = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center">
      <Header />
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col w-full max-w-[1200px]">
          <div className='flex flex-row font-gilroy-regular text-gray-500 mt-[7px] gap-[6px]'>
          <Link href={'/'}>Home</Link>
          <img src="/img/Arrow.svg" alt="arrow"/>
          <Link href={'/dogs'}>Dogs</Link>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}

export default CategoryPage