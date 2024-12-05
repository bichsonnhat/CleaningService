"use client"
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const SelectRole = () => {

  const [selectService, setSelectService] = useState('')

  const router = useRouter();
  const handleRoute = () => {
    router.push('/update-info')
  }

  return (
    <div className='flex flex-col w-full h-full pb-8'>
      <div className='w-full h-[75px]'>
        <div className='w-[5%] h-full flex items-center justify-center'>
          <button>
            <Image src='/images/Select/Arrow_Right_MD.svg' alt='back_icon' width={35} height={30}/>
          </button>
        </div>
      </div>
      <div className='flex flex-col w-full h-full gap-[50px]'>
        <div className='w-full h-fit'>
          <h1 className='text-[#12153a] text-[58px] font-Averta-Semibold leading-[65px] text-center'>
            Bringing Skilled Helpers and Customers Together
          </h1>
        </div>
        <div className='w-full h-fit text-center'>
          <h5 className='text-[#2b3641] text-xl font-normal font-Averta-Regular leading-[25px]'>
            Whether you’re here to offer your skills or find reliable help, we’ve got you covered. 
            <br />
            Choose your path:
          </h5>
        </div>
        <div className='w-[80%] h-fit flex flex-col sm:flex-row max-sm:justify-center max-sm:items-center max-sm:divide-y-2 sm:divide-x-2 divide-dashed m-auto border-2 rounded-2xl p-[20px] shadow-xl'>
            <div 
              className='w-[80%] sm:w-[50%] h-full flex flex-col items-center justify-center gap-[10px] hover:cursor-pointer max-sm:pb-5'
              onMouseEnter={() => setSelectService('Helper')}
              onMouseLeave={() => setSelectService('')}
              onClick={handleRoute}
            >
              <Image src={`${selectService !== 'Helper' ? '/images/Select/helper_unselect.png' : '/images/Select/helper_select.png'}`} alt='helper' width={200} height={200}/>
              <div className='w-full h-[40%] flex flex-col items-center gap-[5px]'>
                <div className='text-[#1d2c4c] text-[34px] font-Averta-Semibold leading-[42px]'>Become a Helper</div>
                <div className='text-[#12153a] text-base font-Averta-Regular leading-[23px] tracking-tight text-center'>
                    Share your skills, earn on your terms, and grow your opportunities. <br />Join a platform that connects you with customers who value your expertise. <br />Enjoy flexible schedules, secure payments, and tools to help you <br />manage your work easily.
                </div>
              </div>
            </div>
            <div 
              className='w-[80%] sm:w-[50%] h-full flex flex-col items-center justify-center gap-[10px] hover:cursor-pointer max-sm:pt-5'
              onMouseEnter={() => setSelectService('Customer')}
              onMouseLeave={() => setSelectService('')}  
              onClick={handleRoute}
            >
              <div className='relative h-[200px] w-[280px]'>
                <Image src={`${selectService !== 'Customer' ? '/images/Select/customer_unselect.png' : '/images/Select/customer_select.png'}`} alt='customer' width={200} height={200} className='absolute bottom-0 right-0'/>
              </div>
              <div className='w-full h-[40%] flex flex-col items-center gap-[5px]'>
                <div className='text-[#1d2c4c] text-[34px] font-Averta-Semibold leading-[42px]'>Become a Customer</div>
                <div className='text-[#12153a] text-base font-Averta-Regular leading-[23px] tracking-tight text-center'>
                    Discover trusted helpers for every task—all in one place. From quick <br />bookings to transparent pricing, we make it simple to find skilled <br />professionals who meet your needs.
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default SelectRole