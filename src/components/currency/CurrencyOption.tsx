import React from "react";

interface CurrencyOptionProps {
  code: string;
  icon: string;
}

const CurrencyOption: React.FC<CurrencyOptionProps> = ({ code, icon }) => {
  return (
    <div className="flex gap-1.5 items-center self-stretch my-auto">
      <img loading="lazy" src={icon} alt={`${code} currency icon`} className="object-contain shrink-0 self-stretch my-auto aspect-square w-[21px]" />
      <div className="self-stretch my-auto">{code}</div>
    </div>
  );
};

export default CurrencyOption;