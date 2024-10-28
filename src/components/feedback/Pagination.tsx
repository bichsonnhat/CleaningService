import React from 'react';

const Pagination: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-10 justify-between items-center mt-3.5 w-full max-md:max-w-full">
      <div className="self-stretch my-auto text-sm font-semibold bg-blend-normal text-neutral-800">
        Showing 1-12 of 1,253
      </div>
      <div className="flex gap-2.5 justify-center items-center self-stretch my-auto min-h-[38px] w-[86px]">
        <img 
          loading="lazy" 
          src="" 
          alt="Pagination controls" 
          className="object-contain self-stretch my-auto rounded-lg aspect-[2.26] bg-slate-50 w-[86px]" 
        />
      </div>
    </div>
  );
};

export default Pagination;