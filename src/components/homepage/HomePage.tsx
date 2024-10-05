import Image from 'next/image';
import { title } from 'process'
import React from 'react'

const HomePage = () => {
    const HomePageData = [
        {
            title: 'Book',
            description: 'Tell us when and where you want your clean.',
        }, 
        {
            title: 'Clean',
            description: 'A Professional cleaner comes over and cleans your place.',
        }, 
        {
            title: 'Freedom',
            description: 'Enjoy your life and come back to a clean space!',
        }
    ];
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='relative'>
                <Image src='/images/HomePage/HeroIllustration.svg' alt='HeroIllustration' width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <div className='font-Averta-Bold text-center text-6xl mt-10'>
                        <p>Your One Stop Cleaning</p>
                        <p>Centre For All Needs</p>
                        <button className="px-7 py-2 mt-[7%] bg-[#1b78f2] rounded-xl text-lg font-Averta-Semibold tracking-normal leading-loose text-center text-white">
                            Book now
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex flex-row max-w-[60%] pt-[8%]'>
                <div className='font-Averta-Bold text-5xl w-full'>
                    <p>Why Choose</p>
                    <p>Shield ?</p>
                </div>
                <div className='m-auto font-Averta-Regular max-w-[40%] w-full'>
                    We understand your home is important to you. That's why we focus on the quality of the clean. Our cleaners aren't contract workers - they are full-time employees.
                    They care as much as we do.
                </div>
            </div>
            <div className='relative mt-[7%] mb-[7%]'>
                <div className='flex flex-row gap-[135px] ml-[7%]'>
                    <Image src='/images/HomePage/Line.svg' alt='Line' width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
                    <Image src='/images/HomePage/Line.svg' alt='Line' width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
                </div>
                <div className='flex flex-row -top-10 -left-52 absolute gap-[143px]'>
                    <Image src='/images/HomePage/Book.svg' alt='WhyChooseShield' width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
                    <Image src='/images/HomePage/Clean.svg' alt='WhyChooseShield' width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
                    <Image src='/images/HomePage/Freedom.svg' alt='WhyChooseShield' width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
                </div>
            </div>

            <div className='flex flex-row gap-[10%] max-w-[60%] w-full'>
            {HomePageData.map((data, index) => (
              <div key={index} className='flex flex-col gap-4'>
                <p className='font-Averta-Bold uppercase text-[#1b78f2]'>{data.title}</p>
                <div className='flex flex-col gap-2'>
                    <p className="text-gray-600 font-Averta-Regular" key={index}>{data.description}</p>
                </div>
              </div>
            ))}      
            </div>
        </div>
    )
}

export default HomePage
