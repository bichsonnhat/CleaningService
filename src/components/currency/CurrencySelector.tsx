import React from "react";
import CurrencyOption from "./CurrencyOption";
import DropdownArrow from "./DropdownArrow";

interface CurrencySelectorProps {
  currencies: Array<{ code: string; icon: string }>;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ currencies }) => {
  return (
    <div className="flex gap-1 items-center px-[3px] pt-2.5 pb-2 h-full text-base font-medium leading-none whitespace-nowrap text-sky-950">
      {currencies.map((currency, index) => (
        <CurrencyOption key={index} code={currency.code} icon={currency.icon} />
      ))}
      <DropdownArrow/>
    </div>
  );
};

export default CurrencySelector;