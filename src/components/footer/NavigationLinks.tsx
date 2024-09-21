import React from 'react';

const NavigationLinks: React.FC = () => {
  const links = ['Home', 'Category', 'About', 'Contact'];

  return (
    <nav className="flex gap-10 items-start text-base font-medium whitespace-nowrap min-w-[240px] font-gilroy-regular">
      {links.map((link) => (
        <a href={`#${link.toLowerCase()}`} key={link}>
          {link}
        </a>
      ))}
    </nav>
  );
};

export default NavigationLinks;