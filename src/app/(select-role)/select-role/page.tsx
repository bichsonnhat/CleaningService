"use client"

import React, { useEffect } from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { userStore } from '@/utils/store/role.store'

const SelectRole = () => {

  const [selectService, setSelectService] = useState('');
  const [curUser, setCurUser] = useState<{ userId: string; role: string | null } | null>(null);

  const setRole = userStore((state) => state.setRole);
  const setUserId = userStore((state) => state.setId);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-info`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setCurUser({ userId: data.userId, role: data.role });
    } catch (error) {
      console.error("Error fetching service types:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    // setCurUser({userId: "4f54507b-7a0c-449c-8b88-91414cf747e9", role: ""})
  }, []);

  const router = useRouter();
  const handleRoute = async (role: 'helper' | 'customer') => {
    if (!curUser?.userId) {
      alert("User ID is undefined!");
      return;
    }

    setRole(role);
    if (role === 'helper') {
      try {
        const helperCheck = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/helpers/${curUser.userId}`);
        
        if (helperCheck.ok) {
          alert("Already helper!");
          return;
        }
  
        if (helperCheck.status === 404) {
          alert("Helper not found!");
          setUserId(curUser?.userId ?? "4f54507b-7a0c-449c-8b88-91414cf747e9");
        } else {
          alert(`Error checking helper: ${helperCheck.statusText}`);
          return;
        }
      } catch (error) {
        alert(`Failed to check helper: ` + error);
        return;
      }
    }
    else{
      setUserId(curUser?.userId ?? "4f54507b-7a0c-449c-8b88-91414cf747e9");
    }
  
    
    router.push('/update-info')
  }

  return (
    <div className='flex flex-col w-full h-full pb-8'>
      <div className='w-full h-[75px]'>
        <div className='w-[5%] h-full flex items-center justify-center'>
          <button>
            <Image src='/images/Select/Arrow_Right_MD.svg' alt='back_icon' width={35} height={30} />
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
            onClick={() => handleRoute('helper')}
          >
            <Image src={`${selectService !== 'Helper' ? '/images/Select/helper_unselect.png' : '/images/Select/helper_select.png'}`} alt='helper' width={200} height={200} />
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
            onClick={() => handleRoute('customer')}
          >
            <div className='relative h-[200px] w-[280px]'>
              <Image src={`${selectService !== 'Customer' ? '/images/Select/customer_unselect.png' : '/images/Select/customer_select.png'}`} alt='customer' width={200} height={200} className='absolute bottom-0 right-0' />
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