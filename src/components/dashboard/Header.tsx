import Image from 'next/image';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex flex-wrap gap-10 justify-between items-center py-6 pr-5 pl-12 w-full bg-white min-h-[100px] max-md:pl-5 max-md:max-w-full">
      <Image src='/images/Header/Logo.svg' alt='HeroIllustration' width={0} height={0} sizes="100vw" style={{ width: '126px', height: 'auto' }} />
      <nav className="flex flex-wrap gap-8 items-center self-stretch my-auto min-w-[240px] max-md:max-w-full">
        <a href="#" className="text-slate-800 font-Averta-Semibold">Residential</a>
        <a href="#" className="text-slate-800 font-Averta-Semibold">Office</a>
        <a href="#" className="text-slate-800 font-Averta-Semibold">Commercial</a>
        <a href="#" className="text-slate-800 font-Averta-Semibold">FAQ's</a>
        <div className="flex gap-3.5 items-start self-stretch my-auto w-[169px]">
          <div className="flex gap-5 justify-between items-center w-[169px]">
            <Image 
              src="/images/Dashboard/Header/Avatar.png" 
              alt="Avatar" 
              width={44}
              height={44}
              sizes='100vw'
              style={{ width: '44px', height: 'auto' }}
            />
            <div className="flex flex-col self-stretch my-auto">
              <div className="text-sm font-bold text-neutral-700 font-Averta-Semibold">Moni Roy</div>
              <div className="self-start text-xs font-semibold text-neutral-600 font-Averta-Regular">Admin</div>
            </div>
            <Image 
              src='/images/Dashboard/Header/DropDown.svg' 
              alt='' 
              width={18} 
              height={18} 
              sizes="100vw" 
              style={{ width: '18px', height: 'auto' }} />
            {/* <img loading="lazy" src="/images/Dashboard/Header/DropDown.svg" alt="" className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]" /> */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;