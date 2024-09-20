import Link from 'next/link'
import React from 'react'
import MonitoLogo from '../img/logo'
import SearchInput from '../searchbar/SearchInput'
import JoinCommunityButton from '../button/JoinCommunityButton'
import CurrencySelector from '../currency/CurrencySelector'

const Header = () => {
  return (
    <div className='flex flex-row gap-[48px] justify-center items-center py-[28px] bg-[#F7DBA7]'>
      <MonitoLogo/>
      <Link href={'/dashboard'} className="text-[#103559] font-gilroy-bold">Home</Link>
      <Link href={'/dashboard'} className="text-[#103559] font-gilroy-bold">Category</Link>
      <Link href={'/dashboard'} className="text-[#103559] font-gilroy-bold">About</Link>
      <Link href={'/dashboard'} className="text-[#103559] font-gilroy-bold">Contact</Link>
      <div className='flex gap-[14px]'>
        <SearchInput
          placeholder="Search something here!"
          iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/9e8b0553000d029c767494dd0ec2799fe356489cc07e03b3567dc6ac3c217a36?placeholderIfAbsent=true&apiKey=8d1a3048ff904e58908bc27809a01dd6"
        />
        <section className="community-section">
          <JoinCommunityButton text="Join the community" />
        </section>
      </div>
      <div className='flex ml-[-20px]'>
        <CurrencySelector 
          currencies= {[{ code: 'VND', icon: './img/VND.svg' }]}
        />
      </div>
    </div>  
  )
}

export default Header