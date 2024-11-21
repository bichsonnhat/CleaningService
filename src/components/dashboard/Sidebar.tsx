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
    <Link
      href={href}
      className={`flex gap-5 items-center px-5 py-4 w-full sm:w-48 max-w-full min-h-[50px] 
        ${isActive 
          ? 'text-white bg-blue-500 rounded-lg' 
          : 'hover:bg-gray-100 transition-colors rounded-lg'
        }`}
      onClick={onClick}
    >
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

const NavChildItem: React.FC<NavItemProps> = ({ icon, activeIcon, label, href, isActive, onClick }) => {
  return (
    <Link
      href={href}
      className={`flex gap-5 items-center w-full max-w-full px-5 min-h-[50px] 
        ${isActive 
          ? 'text-white bg-blue-500 rounded-lg' 
          : 'hover:bg-gray-200 transition-colors bg-[#F4F7F9] rounded-lg'
        }`}
      onClick={onClick}
    >
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

interface CollapsibleNavItemProps extends Omit<NavItemProps, 'isActive'> {
  isExpanded: boolean;
  children?: React.ReactNode;
}

const CollapsibleNavItem: React.FC<CollapsibleNavItemProps> = ({
  icon,
  activeIcon,
  label,
  href,
  isExpanded,
  children,
  onClick,
}) => {
  return (
    <div className="w-full">
      <NavItem
        icon={icon}
        activeIcon={activeIcon}
        label={label}
        href={href}
        isActive={isExpanded}
        onClick={onClick}
      />
      {isExpanded && (
        <div className="relative pl-7 mt-1 space-y-1">
          <svg
            className="absolute left-0 top-[-4px] w-16 h-full"
            style={{ pointerEvents: 'none' }}
          >
            <path
              d="M 16 0 L 16 70%"
              stroke="#E5E7EB"
              strokeWidth="2"
              fill="none"
            />
            {[10, 65].map((y, index) => (
              <path
                key={index}
                d={`M 16 ${y} C 16 ${y + 20}, 16 ${y + 20}, 40 ${y + 20}`}
                stroke="#E5E7EB"
                strokeWidth="2"
                fill="none"
              />
            ))}
          </svg>
          <div className="space-y-1 relative">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Effect to set initial expanded state based on current path
  useEffect(() => {
    if (pathname.includes('/dashboard/service')) {
      setExpandedMenu('Service');
    }
  }, [pathname]);

  const navItemsAdmin = [
    {
      icon: '/images/Dashboard/Sidebar/InActive/Chart.svg',
      activeIcon: '/images/Dashboard/Sidebar/Active/Chart.svg',
      label: 'Chart',
      href: '/dashboard/chart',
    },
    {
      icon: '/images/Dashboard/Sidebar/InActive/Order.svg',
      activeIcon: '/images/Dashboard/Sidebar/Active/Order.svg',
      label: 'Order',
      href: '/dashboard/order',
    },
    {
      icon: '/images/Dashboard/Sidebar/InActive/Customer.svg',
      activeIcon: '/images/Dashboard/Sidebar/Active/Customer.svg',
      label: 'Customer',
      href: '/dashboard/customer',
    },
    {
      icon: '/images/Dashboard/Sidebar/InActive/Employee.svg',
      activeIcon: '/images/Dashboard/Sidebar/Active/Employee.svg',
      label: 'Employee',
      href: '/dashboard/employee',
    },
    {
      icon: '/images/Dashboard/Sidebar/InActive/Service.svg',
      activeIcon: '/images/Dashboard/Sidebar/Active/Service.svg',
      label: 'Service',
      href: '/dashboard/service/category',
      children: [
        {
          icon: '/images/Dashboard/Sidebar/InActive/C.svg',
          activeIcon: '/images/Dashboard/Sidebar/Active/C.svg',
          label: 'Category',
          href: '/dashboard/service/category',
        },
        {
          icon: '/images/Dashboard/Sidebar/InActive/D.svg',
          activeIcon: '/images/Dashboard/Sidebar/Active/D.svg',
          label: 'Detail',
          href: '/dashboard/service/detail',
        },
      ],
    },
    {
      icon: '/images/Dashboard/Sidebar/InActive/Feedback.svg',
      activeIcon: '/images/Dashboard/Sidebar/Active/Feedback.svg',
      label: 'Feedback',
      href: '/dashboard/feedback',
    },
    {
      icon: '/images/Dashboard/Sidebar/InActive/Issue.svg',
      activeIcon: '/images/Dashboard/Sidebar/Active/Issue.svg',
      label: 'Issue',
      href: '/dashboard/issue',
    },
    {
      icon: '/images/Dashboard/Sidebar/InActive/Refund.svg',
      activeIcon: '/images/Dashboard/Sidebar/Active/Refund.svg',
      label: 'Refund',
      href: '/dashboard/refund',
    },
  ];

  const handleMenuClick = (menu: string) => {
    setExpandedMenu((prev) => (prev === menu ? null : menu));
  };

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
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <nav className="flex flex-col items-center px-5 pt-5 w-full h-full
          font-Averta-Bold tracking-wide whitespace-nowrap
          text-stone-600 overflow-y-auto">
          <div className="w-full space-y-1 pb-8">
            {navItemsAdmin.map((item) => (
              <React.Fragment key={item.label}>
                {item.children ? (
                  <CollapsibleNavItem
                    icon={item.icon}
                    activeIcon={item.activeIcon}
                    label={item.label}
                    href={item.href}
                    isExpanded={expandedMenu === item.label}
                    onClick={() => handleMenuClick(item.label)}
                  >
                    {item.children.map((child) => (
                      <NavChildItem
                        key={child.label}
                        icon={child.icon}
                        activeIcon={child.activeIcon}
                        label={child.label}
                        href={child.href}
                        isActive={pathname === child.href}
                        onClick={handleMobileItemClick}
                      />
                    ))}
                  </CollapsibleNavItem>
                ) : (
                  <NavItem
                    icon={item.icon}
                    activeIcon={item.activeIcon}
                    label={item.label}
                    href={item.href}
                    isActive={pathname === item.href}
                    onClick={handleMobileItemClick}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;