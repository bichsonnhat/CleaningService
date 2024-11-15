'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
      className={`flex gap-5 items-center px-5 py-4 w-48 max-w-full min-h-[50px] ${isActive ? 'text-white bg-blue-500 rounded-lg' : 'hover:bg-gray-100 transition-colors rounded-lg'
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
      className={`flex gap-5 items-center max-w-full  px-5 min-h-[50px] ${isActive ? 'text-white bg-blue-500 rounded-lg' : 'hover:bg-gray-200 transition-colors bg-[#F4F7F9] rounded-lg'
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
    <div>
      <NavItem
        icon={icon}
        activeIcon={activeIcon}
        label={label}
        href={href}
        isActive={isExpanded}
        onClick={onClick}
      />
      {isExpanded &&
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
      }
    </div>
  );
};

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

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

  return (
    <aside className="flex flex-col w-[16%] max-md:ml-0 max-md:w-full">
      <nav className="flex flex-col items-center px-5 pt-5 mx-auto w-full
       font-Averta-Bold tracking-wide whitespace-nowrap bg-white min-h-[970px]
        pb-[700px] text-stone-600 max-md:pb-24 space-y-1">
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
                onClick={() => setExpandedMenu(null)}
              />
            )}
          </React.Fragment>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;