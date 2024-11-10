import { useState } from "react";

type FilterDropdownProps = {
  onFilterChange: (filter: string) => void;
};

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onFilterChange }) => {
  const options = ["Price: Low to High", "Price: High to Low", "Filter by"];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Filter by");

  const openDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onFilterChange(option);
    closeDropdown();
  };
  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative w-[170px]" onMouseLeave={closeDropdown}>
      <div
        className="text-xs text-[#2b3034e6] font-Averta-Bold gap-4 flex items-center justify-between border border-solid border-[#d5d5d5] bg-[#fcfdfd] rounded-lg h-[38px] px-4 cursor-pointer w-full"
        onClick={openDropdown}
      >
        {selectedOption}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.85892 2.26811L5 6.29356L1.14108 2.26811C0.836791 1.91808 0.532503 1.91078 0.228216 2.24624C-0.076072 2.58169 -0.076072 2.90985 0.228216 3.23072L4.54357 7.78123C4.65422 7.92708 4.80636 8 5 8C5.19364 8 5.34578 7.92708 5.45643 7.78123L9.77178 3.23072C10.0761 2.90985 10.0761 2.58169 9.77178 2.24624C9.4675 1.91078 9.16321 1.91808 8.85892 2.26811Z"
            fill="#2B3034"
            fillOpacity="0.9"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute bg-white border border-gray-300 rounded-lg shadow-lg w-full z-10">
          <ul className="text-sm text-[#2b3034e6] font-Averta-Regular py-1">
            {options.map((option, index) => (
              <li
                key={index}
                className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
