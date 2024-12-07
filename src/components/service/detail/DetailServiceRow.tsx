import React from "react";

const DetailServiceRow: React.FC<DetailServiceRowProps> = ({
  id,
  serviceTypeId,
  title,
  additionalPrice,
  multiplyPrice,
  serviceType,
  onRowClick,
}) => {
  return (
    <div
      className="flex flex-wrap gap-3 w-full border-b border-gray-200 bg-white hover:bg-[#f4f7ff] h-auto items-start md:items-center p-2.5 max-xl:py-4 cursor-pointer"
      onClick={() => onRowClick(id)}
    >
      <div className="w-full xl:w-[210px] flex items-center justify-start xl:py-6 mb-2 xl:mb-0">
        <div className="text-sm text-[#202224cc] ">
          <span className="xl:hidden font-Averta-Semibold">CATEGORY: </span>
          {serviceType?.name}
        </div>
      </div>
      <div className="w-full xl:w-[350px] flex items-center justify-start xl:py-6 mb-2 xl:mb-0">
        <div className="text-sm text-[#202224cc] ">
          <span className="xl:hidden font-Averta-Semibold">Title: </span>
          {title}
        </div>
      </div>

      <div className="w-full  xl:w-[300px] flex items-center justify-start xl:py-6 mb-2 xl:mb-0">
        <div className="text-sm text-[#202224cc]">
          <span className="xl:hidden font-Averta-Bold">MULTIPLY PRICE: </span>
          {`$${additionalPrice}`}
        </div>
      </div>
      <div className="w-full  xl:w-[300px] flex items-center justify-start xl:py-6 mb-2 xl:mb-0">
        <div className="text-sm text-[#202224cc]">
          <span className="xl:hidden font-Averta-Bold">ADDITIONAL PRICE: </span>
          {`${multiplyPrice}x`}
        </div>
      </div>
    </div>
  );
};
export default DetailServiceRow;
