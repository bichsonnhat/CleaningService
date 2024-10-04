import React from 'react'

const Footer = () => {
  const footerData = [
    {
      title: 'Company',
      items: ['About Us', 'Career', 'Press', 'Blog']
    },
    {
      title: 'Services',
      items: ['Residential', 'Office Cleaning', 'Commercial Cleaning']
    },
    {
      title: 'Support',
      items: ['Contact Us', "FAQ's"]
    }
  ];

  return (
    <footer className='py-12'>
      <div className='max-w-[1064px] mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between items-start gap-8'>
          <div className='w-full md:w-auto'>
            <div className='flex gap-8'>
              <img src='/images/Footer/Facebook.svg' alt='Facebook' className='w-8 h-8' />
              <img src='/images/Footer/Twitter.svg' alt='Twitter' className='w-8 h-8' />
              <img src='/images/Footer/Instagram.svg' alt='Instagram' className='w-8 h-8' />
              <img src='/images/Footer/Youtube.svg' alt='Youtube' className='w-8 h-8' />
            </div>
          </div>
          <div className='flex flex-wrap gap-8 md:gap-16'>
            {footerData.map((column, index) => (
              <div key={index} className='flex flex-col gap-4'>
                <p className='font-Averta-Bold uppercase'>{column.title}</p>
                <div className='flex flex-col gap-2'>
                  {column.items.map((item, itemIndex) => (
                    <a href="#" className="text-gray-600 hover:underline font-Averta-Regular" key={itemIndex}>{item}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='mt-8 pt-8 flex items-baseline row gap-2'>
          <img src='/images/Footer/Logo_Gray.svg' alt='Copyright Logo' className='h-6' />
          <p className='text-gray-600 font-Averta-Regular'>© Clean Co. All rights reserved  .  <a href='#' className='hover:underline'>Terms of Service</a>  .  <a href='#' className='hover:underline'>Privacy Policy</a></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer