'use client';
import Image from 'next/image';
import React, { useState } from 'react';

interface SearchInputProps {
  placeholder: string;
  iconSrc: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, iconSrc }) => {
  return (
    <div className="relative w-[300px]">
      <form className="flex flex-row gap-3 items-center py-3 pr-[100px] pl-4 font-Averta-Regular leading-none bg-white rounded-lg text-zinc-400">
        <Image src={iconSrc} alt="" width={20} height={20} className='' />
        <label htmlFor="searchInput" className="sr-only">Search</label>
        <input
          type="text"
          id="searchInput"
          placeholder={placeholder}
          className="bg-transparent border-none outline-none flex-grow font-Averta-Regular max-w-[140px] text-[17px]"
        />
      </form>
      <div className="absolute top-0 right-0 h-full flex items-center">
        <p className='px-4 py-2.5 mb-0.5 bg-[#eceaea] text-[#868687] rounded-r-lg font-Averta-Regular'>Search By</p>
      </div>
    </div>
  );
};

const SearchAndFilter: React.FC = () => {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { value: '', label: 'Filter By' },
    { value: 'name', label: 'Name' },
    { value: 'status', label: 'Status' },
    { value: 'date', label: 'Date' },
  ];
  
  function handleSelect(selectedValue: string) {
    setValue(selectedValue);
    setIsOpen(false);
  }

  return (
    <div className='flex flex-row justify-between'>
       <div className='flex flex-row gap-5'>
          <SearchInput
            placeholder="Search"
            iconSrc="/images/Dashboard/Feedback/Search.svg"
          />
          <div className="relative">
            <button
              className="flex items-center justify-between w-[150px] p-2.5 border rounded-xl bg-white font-Averta-Semibold pl-5"
              onClick={() => setIsOpen(!isOpen)}
            >
              {options.find(option => option.value === value)?.label || 'Filter By'}
              <Image src="/images/Dashboard/Feedback/ArrowDown.svg" alt="" width={18} height={18} />
            </button>
            {isOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                {options.map((option) => (
                  <div
                    key={option.value}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 font-Averta-Regular"
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
       </div>
       <button className="flex flex-row justify-center items-center bg-[#e11b1a] w-36 rounded-xl font-Averta-Semibold tracking-normal leading-loose text-center text-white gap-1">
            <Image src="/images/Dashboard/Feedback/Trash.svg" alt="" width={18} height={18} />
            <p className='mt-0.5'>Delete</p>
        </button>
    </div>
  );
};

export default SearchAndFilter;