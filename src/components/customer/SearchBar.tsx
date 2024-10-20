import React from "react";

type TopProps = {
  setSearchTerm: (term: string) => void;
};

const Top: React.FC<TopProps> = ({ setSearchTerm }) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="flex flex-wrap gap-10 w-full max-md:max-w-full">
        <div className="flex gap-5 justify-center my-auto min-w-[240px]">
          <form className="flex items-center my-auto text-sm text-center min-w-[240px] text-neutral-800 w-[252px]">
            <div className="flex self-stretch my-auto min-w-[240px] w-[252px]">
              <div className="flex relative items-center bg-white rounded-l-lg border border-solid border-[rgba(0, 0, 0, 0.5)] h-[38px] w-[147px] px-4">
                <img
                  loading="lazy"
                  src="/images/Dashboard/Customer/search.svg"
                  alt="icon-search"
                  className="object-contain aspect-square"
                />
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search"
                  className="text-sm text-[#202224] px-2 w-full font-Averta-Regular opacity-50 bg-transparent h-full px-2 focus:outline-none"
                  onChange={handleSearchChange}
                />
              </div>

              <div className="text-sm text-[#202224] font-Averta-Regular opacity-50 flex items-center justify-center border border-solid border-[#d5d5d5]  bg-[#eceaea] rounded-r-lg h-[38px] w-[105px]">
                Search By
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Top;
