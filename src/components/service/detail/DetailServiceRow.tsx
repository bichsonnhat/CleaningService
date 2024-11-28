import React from "react";
type DetailServiceRowProps = {
  id: string;
  category: string;
  value: number;
  description?: string;
  basePrice: number;
};

const DetailServiceRow: React.FC<DetailServiceRowProps> = ({
  id,
  category,
  description,
  value,
  basePrice,
}) => {
  return (
    <div className="flex flex-wrap gap-3 w-full border-b border-gray-200 bg-white hover:bg-[#f4f7ff] h-auto items-start md:items-center p-2.5 max-xl:py-4 cursor-pointer">
      <div className="w-full xl:w-[210px] flex items-center justify-start xl:py-6 mb-2 xl:mb-0">
        <div className="text-sm text-[#202224cc] ">
          <span className="xl:hidden font-Averta-Semibold">CATEGORY: </span>
          {category}
        </div>
      </div>
      <div className="w-full xl:w-[160px] flex items-center justify-start xl:py-6 mb-2 xl:mb-0">
        <div className="text-sm text-[#202224cc] ">
          <span className="xl:hidden font-Averta-Semibold">VALUE: </span>
          {value}
        </div>
      </div>

      <div className="w-full xl:w-[640px] flex items-center justify-start xl:py-6 mb-2 xl:mb-0">
        <div className="text-sm text-[#202224cc] ">
          <span className="xl:hidden font-Averta-Semibold">DESCRIPTION: </span>
          {description}
        </div>
      </div>

      <div className="w-full  xl:w-[150px] flex items-center justify-start xl:py-6 mb-2 xl:mb-0">
        <div className="text-sm text-[#202224cc]">
          <span className="xl:hidden font-Averta-Bold">BASE PRICE: </span>
          {`$${basePrice}`}
        </div>
      </div>
    </div>
  );
};
export default DetailServiceRow;
