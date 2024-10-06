import { Check, Star } from 'lucide-react';
import Image from 'next/image';
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

    const FeedBack = [
        {
            customer: 'HurryKhang',
            feedback: [
                { text: "I'm so glad I decided to try this cleaning service! ", isHighlighted: false },
                { text: "The cleaners were incredibly thorough and paid attention to all those little details I usually miss. ", isHighlighted: false },
                { text: "My kitchen and bathrooms sparkle,", isHighlighted: true },
                { text: " and they even got rid of the dust bunnies under the furniture! It's such a relief to come home to a truly clean house ", isHighlighted: false },
                { text: "without having to spend hours cleaning myself. This service is definitely worth it! Love it!", isHighlighted: false }
            ],
            avatar: '/images/HomePage/users/user-1.png'
        },
        {
            customer: 'HuyRui',
            feedback: [
                { text: "Having a cleaning service has been a ", isHighlighted: false },
                { text: "lifesaver for my busy schedule! ", isHighlighted: false },
                { text: "I travel a lot for work, and it was always such a burden to come home to a messy house after a long trip. ", isHighlighted: false },
                { text: "Now, I can relax knowing my home will be clean", isHighlighted: true },
                { text: " and welcoming when I return. The cleaners are always punctual and professional, and they do a fantastic job. It's one less thing I have to worry about, and it's made a huge difference in my quality of life.", isHighlighted: false }
            ],
            avatar: '/images/HomePage/users/user-2.png'
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
                            Booking from 80$
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex flex-row max-w-[1000px] pt-[112px] items-center justify-center'>
                <div className='font-Averta-Bold text-5xl w-full flex flex-col gap-5'>
                    <p>Why Choose Us?</p>
                    <div className='flex flex-col max-w-[400px] gap-3'>
                        <li className='flex gap-1.5 '>
                            <Check className='h-5 w-5 shrink-0 text-blue-600'/>
                            <p className='font-Averta-Regular text-[15px]'><a className='font-Averta-Bold'>Sparkling clean home:</a> Sit back and relax while professionals deep clean every nook and cranny, leaving your home spotless.</p>                   
                        </li>
                        <li className='flex gap-1.5 '>
                            <Check className='h-5 w-5 shrink-0 text-blue-600'/>
                            <p className='font-Averta-Regular text-[15px]'><a className='font-Averta-Bold'>More time for you:</a> Reclaim your weekends! Skip the scrubbing and spend your time on hobbies, family, and fun.</p>                   
                        </li>
                        <li className='flex gap-1.5 '>
                            <Check className='h-5 w-5 shrink-0 text-blue-600'/>
                            <p className='font-Averta-Regular text-[15px]'><a className='font-Averta-Bold'>Healthy living:</a> A professional clean reduces allergens and germs, creating a healthier environment for you and your loved ones.</p>                   
                        </li>
                    </div>
                    <div className='flex flex-row items-start gap-5 mt-5'>
                        <div className='flex -space-x-4'>
                        <Image src='/images/HomePage/users/user-1.png' alt='user image' width={0} height={0} sizes="100vw" style={{ width: '40px', height: 'auto' }} className='inline-block rounded-full ring-2 ring-slate-100' />
                        <Image src='/images/HomePage/users/user-2.png' alt='user image' width={0} height={0} sizes="100vw" style={{ width: '40px', height: 'auto' }} className='inline-block rounded-full ring-2 ring-slate-100' />
                        <Image src='/images/HomePage/users/user-3.png' alt='user image' width={0} height={0} sizes="100vw" style={{ width: '40px', height: 'auto' }} className='inline-block rounded-full ring-2 ring-slate-100' />
                        <Image src='/images/HomePage/users/user-4.jpg' alt='user image' width={0} height={0} sizes="100vw" style={{ width: '40px', height: 'auto' }} className='inline-block rounded-full ring-2 ring-slate-100' />
                        <Image src='/images/HomePage/users/user-5.jpg' alt='user image' width={0} height={0} sizes="100vw" style={{ width: '40px', height: 'auto' }} className='inline-block rounded-full ring-2 ring-slate-100 object-cover' />
                        </div>
                        <div className='flex flex-col justify-between items-start gap-2'>
                            <div className='flex gap-0.5'>
                                <Star className='h-4 w-4 text-blue-600 fill-blue-600'/>
                                <Star className='h-4 w-4 text-blue-600 fill-blue-600'/>
                                <Star className='h-4 w-4 text-blue-600 fill-blue-600'/>
                                <Star className='h-4 w-4 text-blue-600 fill-blue-600'/>
                                <Star className='h-4 w-4 text-blue-600 fill-blue-600'/>
                            </div>
                            <div className='text-[15px]'>
                                <p className='font-Averta-Regular'><span className='font-Averta-Bold'>1.250+</span> happy customers</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='m-auto font-Averta-Regular max-w-[40%] w-full'>
                    We understand your home is important to you. That's why we focus on the quality of the clean. Our cleaners aren't contract workers - they are full-time employees.
                    They care as much as we do.
                </div>
            </div>
            <div className='relative mt-[147px] mb-[147px]'>
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

            <div className='flex flex-row gap-[10%] max-w-[1000px] w-full'>
                {HomePageData.map((data, index) => (
                <div key={index} className='flex flex-col gap-4'>
                    <p className='font-Averta-Bold uppercase text-[#1b78f2]'>{data.title}</p>
                    <div className='flex flex-col gap-2'>
                        <p className="text-gray-600 font-Averta-Regular" key={index}>{data.description}</p>
                    </div>
                </div>
                ))}      
            </div>
            <div className='mt-[140px] w-full h-[700px] relative'>
                <Image 
                    src='/images/HomePage/Background_feedback.svg' 
                    alt='Logo_Grat' 
                    fill
                    className='absolute inset-0 object-cover'/>                
                <div className='flex flex-col absolute inset-0 items-center justify-center'>
                    <h1 className='text-white text-4xl font-Averta-Bold z-10'>
                        <p>What our customers say?</p>
                    </h1>
                    <div className='flex flex-row mt-20 gap-32'>
                    {FeedBack.map((data, index) => (
                        <div className='flex flex-row gap-5 p-4 bg-white rounded-lg' key={index}>
                            <div className='flex flex-col gap-5 p-4'>
                                <div className='flex gap-0.5'>
                                    <Star className='h-5 w-5 text-blue-600 fill-blue-600'/>
                                    <Star className='h-5 w-5 text-blue-600 fill-blue-600'/>
                                    <Star className='h-5 w-5 text-blue-600 fill-blue-600'/>
                                    <Star className='h-5 w-5 text-blue-600 fill-blue-600'/>
                                    <Star className='h-5 w-5 text-blue-600 fill-blue-600'/>
                                </div>
                                <div className='max-w-[470px] text-black font-Averta-Regular text-lg leading-8'>
                                    "{data.feedback.map((segment, segmentIndex) => (
                                        <span 
                                            key={segmentIndex}
                                            className={segment.isHighlighted ? 'p-0.5 bg-slate-800 text-white' : ''}
                                        >
                                            {segment.text}
                                        </span>
                                    ))}"
                                </div>
                                <div className='flex flex-row gap-3'>
                                    <Image src={data.avatar} alt='user image' width={0} height={0} sizes="100vw" style={{ width: '50px', height: 'auto' }} className='inline-block rounded-full ring-2 ring-slate-100' />
                                    <div className='flex flex-col justify-between items-start'>
                                        <p className='font-Averta-Bold'>{data.customer}</p>
                                        <div className='text-[15px] flex flex-row gap-1'>
                                            <Check className='h-5 w-5 shrink-0 text-blue-600'/>
                                            <p className='font-Averta-Regular'>Verified Customer</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
            <div className='w-full h-[300px] relative'>
                <Image 
                    src='/images/HomePage/Background_Footer_Booking.svg' 
                    alt='Logo_Grat' 
                    fill
                    className='absolute inset-0 object-cover'/>   
                <div className='flex flex-col absolute inset-0 items-center justify-center'>
                    <button className="px-7 py-2 bg-[#1b78f2] rounded-xl text-lg font-Averta-Semibold tracking-normal leading-loose text-center text-white">
                        Booking from 80$
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomePage