import { time } from 'console'
import Image from 'next/image'
import React from 'react'

const About = () => {
  const working_hours = [
    {
        day: 'Monday - Friday',
        time: '8 AM - 9 PM'
    },
    {
        day: 'Saturday',
        time: '8 AM - 6 PM'
    },
    {
        day: 'Sunday',
        time: '8 AM - 2 PM'
    }
  ]

  const contact = [
    {
        icon: '/images/About/Address.svg',
        info: 'Quarter 6, Linh Trung Ward, Thu Duc City, Ho Chi Minh City'
    }, 
    {
        icon: '/images/About/Phone.svg',
        info: '(+84) 123 456 789'
    },
    {
        icon: '/images/About/Mail.svg',
        info: 'contact@group1.com'
    }
  ]

  const clients = [
    {
        logo: '/images/About/UIT.svg'
    },
    {
        logo: '/images/About/SE_Logo.png'
    },
    {
        logo: '/images/About/FPT.png'
    },
    {
        logo: '/images/About/Google.png'
    }
  ]

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='relative'>
        <Image src='/images/About/HeroBackground.svg' alt='HeroIllustration' width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <div className='font-Averta-Bold text-center text-5xl mt-10'>
                <p>About Us</p>
            </div>
        </div>
      </div>
      <p className='font-Averta-Bold text-center text-3xl mt-20'>The Shield Cleaning.Co Story</p>
      <p className='font-Averta-Regular text-center mt-6 max-w-[900px]'>Our story began in 2014 when we relized there's no convenient way for us to find cleaners in a simple manner. We take our jobs very seriously, just ask
        the 10,000+ recuring customers who keep coming back for our professional services. We use a combination of enterprise grade technology and technical cleaning
        methods to ensure that your house, office or commercial setting is as good as new, healthy and clean - when we're done.
      </p>
      <div className='relative w-full h-[500px] mt-[80px]'>
        <div className='bg-[#eaeef4] absolute inset-0 object-cover'></div>
        <div className='flex flex-col absolute inset-0 items-center justify-center'>
            <p className='font-Averta-Bold text-center text-3xl'>Contact Us</p>
            <p className='font-Averta-Regular text-center max-w-[700px] p-6'>If you call during our business hours you'll get through to us instantly. If you email, we'll usually get back to you within the same business day.
                Our client services team members are eager to answer all of your cleaning services questions.
            </p>
            <div className='flex flex-col max-w-[600px] w-full mt-10'>
                <p className='font-Averta-Bold text-start text-2xl'>Working Hours</p>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-col gap-4 mt-4 max-w-[250px] w-full'>
                        {working_hours.map((hours) => (
                            <div key={hours.day} className='flex flex-row justify-between'>
                                <p className='font-Averta-Regular'>{hours.day}</p>
                                <p className='font-Averta-Bold text-blue-600'>{hours.time}</p>
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-col gap-4 max-w-[250px]'>
                        {contact.map((info) => (
                            <div key={info.info} className='flex flex-row gap-4'>
                                <Image src={info.icon} alt='Icon' width={0} height={0} sizes="100vw" style={{ width: 'auto', height: 'auto' }} />
                                <p className='font-Averta-Regular'>{info.info}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
        <div className='flex flex-col w-full p-32'>
            <h2 className='font-Averta-Bold text-center text-3xl mb-16'>
                Our Amazing Clients
            </h2>
            <div className='container mx-auto'>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16'>
                {clients.map((client) => (
                    <div key={client.logo} className='flex items-center justify-center'>
                    <div className='relative w-full h-[40px] md:h-[50px] lg:h-[60px]'>
                        <Image 
                        src={client.logo} 
                        alt='ClientLogo' 
                        fill
                        className='object-contain filter grayscale'
                        />
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
        <div className='w-full h-[494px] relative'>
            <Image 
                src='/images/About/Footer.svg' 
                alt='Logo_Grat' 
                fill
                className='absolute inset-0 object-cover'/>   
            <div className='flex flex-col absolute inset-0 items-center justify-center'>
                <p className='font-Averta-Bold text-center text-5xl max-w-[600px] mb-9'>Servicing 10K+ Users Across Your City</p>
                <button className="px-7 py-2 bg-[#1b78f2] rounded-xl text-lg font-Averta-Semibold tracking-normal leading-loose text-center text-white">
                    Booking from 80$
                </button>
            </div>
        </div>
    </div>
  )
}

export default About
