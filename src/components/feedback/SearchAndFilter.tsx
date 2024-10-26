import React from 'react';

const SearchAndFilter: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-10 justify-between w-full max-md:max-w-full">
      <div className="flex gap-5 justify-center my-auto min-w-[240px]">
        <form className="flex gap-5 items-center my-auto text-sm text-center min-w-[240px] text-neutral-800 w-[252px]">
          <div className="flex self-stretch my-auto min-w-[240px] w-[252px]">
            <div className="flex relative gap-3.5 items-center px-4 py-2.5 whitespace-nowrap border-r-0 border-black border-opacity-50 min-h-[38px]">
              <div className="flex absolute inset-0 z-0 shrink-0 self-start bg-white rounded-lg border border-solid border-neutral-300 h-[38px] w-[147px]" />
              <img loading="lazy" src="" alt="" className="object-contain z-0 shrink-0 self-stretch my-auto bg-blend-normal aspect-[0.94] w-[15px]" />
              <label htmlFor="search" className="sr-only">Search</label>
              <input type="text" id="search" placeholder="Search" className="z-0 self-stretch my-auto bg-blend-normal" />
            </div>
            <div className="flex relative gap-3.5 items-start px-4 py-2.5 min-h-[38px]">
              <div className="flex absolute inset-0 z-0 shrink-0 self-start bg-gray-200 rounded-none border border-solid border-neutral-300 h-[38px] w-[105px]" />
              <div className="z-0 my-auto bg-blend-normal">Search By</div>
            </div>
          </div>
        </form>
        <div className="flex relative flex-col justify-center px-4 py-2.5 text-xs font-bold leading-none text-right text-zinc-800 text-opacity-90 w-[104px]">
          <div className="flex absolute inset-0 z-0 max-w-full bg-white rounded-lg border border-solid border-neutral-300 min-h-[38px] w-[104px]" />
          <div className="flex z-0 gap-4 self-center w-[70px]">
            <button>Filter By</button>
            <img loading="lazy" src="" alt="" className="object-contain shrink-0 w-2.5 aspect-square" />
          </div>
        </div>
      </div>
      <button className="flex flex-col justify-center text-xs font-bold text-center text-white whitespace-nowrap rounded-lg w-[129px]">
        <div className="flex flex-1 gap-1.5 justify-center items-center px-6 py-2.5 bg-red-600 rounded-lg size-full max-md:px-5">
          <img loading="lazy" src="" alt="" className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]" />
          <span className="self-stretch my-auto">Delete</span>
        </div>
      </button>
    </div>
  );
};

export default SearchAndFilter;