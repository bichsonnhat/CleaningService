'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

interface NavItemProps {
  icon: string;
  activeIcon: string;
  label: string;
  href: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, activeIcon, label, href, isActive, onClick }) => {
  return (
    <Link href={href}
      className={`flex gap-5 items-center px-5 py-4 w-full sm:w-48 max-w-full min-h-[50px] 
      ${isActive
          ? 'text-white bg-blue-500 rounded-lg'
          : 'hover:bg-gray-100 transition-colors rounded-lg'
        }`}
      onClick={onClick}>
      <img
        loading="lazy"
        src={isActive ? activeIcon : icon}
        alt=""
        className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
      />
      <div className="self-stretch my-auto">{label}</div>
    </Link>
  );
};

const SidebarCustomer: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      icon: "/images/Dashboard/Sidebar/InActive/Employee.svg",
      activeIcon: "/images/Dashboard/Sidebar/Active/Employee.svg",
      label: "Personal",
      href: "/dashboard/personal"
    },
    {
      icon: "/images/Dashboard/Sidebar/InActive/OrderHistory.svg",
      activeIcon: "/images/Dashboard/Sidebar/Active/OrderHistory.svg",
      label: "Order History",
      href: "/dashboard/order-history"
    },
    {
      icon: "/images/Dashboard/Sidebar/InActive/Calendar.svg",
      activeIcon: "/images/Dashboard/Sidebar/Active/Calendar.svg",
      label: "Calendar",
      href: "/dashboard/calendar"
    },
    {
      icon: "/images/Dashboard/Sidebar/InActive/Feedback.svg",
      activeIcon: "/images/Dashboard/Sidebar/Active/Feedback.svg",
      label: "Feedback",
      href: "/dashboard/feedback"
    },
    {
      icon: "/images/Dashboard/Sidebar/InActive/Refund.svg",
      activeIcon: "/images/Dashboard/Sidebar/Active/Refund.svg",
      label: "Refund",
      href: "/dashboard/refund"
    },
  ];

  const handleMobileItemClick = () => {
    // Only close mobile menu, don't reset expandedMenu
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-lg md:hidden"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 h-screen w-[85%] md:w-[16%] 
          transform transition-transform duration-300 ease-in-out bg-white
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <nav className="flex flex-col items-center px-5 pt-5 w-full h-full
          font-Averta-Bold tracking-wide whitespace-nowrap
          text-stone-600 overflow-y-auto">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              activeIcon={item.activeIcon}
              label={item.label}
              href={item.href}
              isActive={pathname === item.href}
              onClick={handleMobileItemClick}
            />
          ))}
        </nav>
      </aside>
    </>
  );
};

export default SidebarCustomer;