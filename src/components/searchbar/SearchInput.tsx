import React from 'react';

interface SearchInputProps {
  placeholder: string;
  iconSrc: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, iconSrc }) => {
  return (
    <form className="flex gap-3 items-center py-3 pr-5 pl-4 text-sm font-medium leading-none bg-white rounded-[46px] text-zinc-400 w-[280px]">
      <img loading="lazy" src={iconSrc} alt="" className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square" />
      <label htmlFor="searchInput" className="sr-only">Search</label>
      <input
        type="text"
        id="searchInput"
        placeholder={placeholder}
        className="bg-transparent border-none outline-none flex-grow font-gilroy-medium"
      />
    </form>
  );
};

export default SearchInput;