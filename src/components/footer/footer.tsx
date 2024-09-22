import Link from 'next/link'
import React from 'react'
import SubscriptionForm from './SubscriptionForm'
import NavigationLinks from './NavigationLinks'
import SocialIcons from './SocialIcons'

const Footer = () => {
  return (
    <footer className="flex flex-col pb-[40px] pt[80px] bg-[#F7DBA7] rounded-t-[40px] justify-center items-center">
    <div className="flex flex-col w-full max-w-[1200px] max-md:max-w-full">
      <div className="flex flex-col pb-10 border-b border-solid border-b-neutral-300 max-md:max-w-full mt-[80px]">
        <SubscriptionForm />
        <div className="flex flex-wrap gap-10 items-start justify-between mt-10 max-md:max-w-full">
          <NavigationLinks />
          <SocialIcons />
        </div>
      </div>
      <div className="flex gap-5 justify-between items-center mt-10 text-sm font-medium leading-none text-gray-500 max-md:max-w-full">
        <p className="font-gilroy-regular">© 2024 Monito. All rights reserved.</p>
        <img loading="lazy" src="/img/logo.svg" className="object-contain shrink-0 self-stretch max-w-full aspect-[2.87] w-[115px]" alt="" />
        <p className="font-gilroy-regular">Terms of Service Privacy Policy</p>
      </div>
      </div>
      </footer>
    // <div className='flex flex-col pb-[40px] pt[80px] bg-[#F7DBA7] rounded-t-[40px] justify-center items-center md:w-auto'>
    // <section className="flex flex-wrap gap-5 items-start p-8 rounded-2xl bg-sky-950 max-md:px-5 mt-[80px] mx-[130px]">
    //   <h2 className="text-2xl font-bold leading-9 text-white capitalize w-[389px] font-gilroy-bold">
    //     Register now so you don't miss our programs
    //   </h2>
    //   <form className="flex flex-wrap gap-3 items-center p-3 font-medium bg-white rounded-2xl min-w-[240px] w-[707px] max-md:max-w-full">
    //     <label htmlFor="emailInput" className="sr-only">Enter your Email</label>
    //     <input
    //       id="emailInput"
    //       type="email"
    //       placeholder="Enter your Email"
    //       className="flex-1 shrink gap-2.5 self-stretch px-7 py-3.5 my-auto text-sm leading-none bg-white rounded-lg border border-solid border-zinc-400 min-w-[240px] text-zinc-400 max-md:px-5 max-md:max-w-full font-gilroy-medium"
    //       aria-label="Enter your Email"
    //     />
    //     <button
    //       type="submit"
    //       className="gap-2.5 self-stretch pt-3.5 pb-2.5 my-auto text-white rounded-lg bg-sky-950 w-[163px] max-md:px-5 font-gilroy-medium"
    //     >
    //       Subscribe Now
    //     </button>
    //   </form>
    // </section>
    // <div className='flex flex-wrap gap-10 items-start m-[40px] md:w-auto'>
    //   <div className='flex gap-[60px]'>
    //     <Link href={'/dashboard'} className="font-gilroy-medium">Home</Link>
    //     <Link href={'/dashboard'} className="font-gilroy-medium">Category</Link>
    //     <Link href={'/dashboard'} className="font-gilroy-medium">About</Link>
    //     <Link href={'/dashboard'} className="font-gilroy-medium">Contact</Link>
    //   </div>
    //   <div className='flex gap-[40px]'>
    //     <img src="/img/Facebook.svg" alt="logo"/>
    //     <img src="/img/Twitter.svg" alt="logo"/>
    //     <img src="/img/Instagram.svg" alt="logo"/>
    //     <img src="/img/Youtube.svg" alt="logo"/>
    //   </div>
    // </div>
    // <hr/>
    // </div>
  )
}

export default Footer