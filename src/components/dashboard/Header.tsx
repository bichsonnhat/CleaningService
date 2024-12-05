"use client";
import { UserButton } from "@clerk/nextjs";
import { link } from "fs";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = ["Residential", "Office", "Commercial", "FAQ's"];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="flex flex-wrap gap-10 justify-between items-center py-6 pr-5 pl-12 w-full bg-white min-h-[100px] max-md:pl-5 max-md:max-w-full">
      <Image
        src="/images/Header/Logo.svg"
        alt="HeroIllustration"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "126px", height: "auto" }}
      />
      <div className="md:hidden flex items-center gap-3.5">
        <UserButton />
        <button
          onClick={toggleMenu}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden flex flex-col w-full mt-4 bg-white rounded-lg shadow-lg p-4 space-y-4">
          {links.map((link) => (
            <a
              href={`#${link.toLowerCase()}`}
              key={link}
              className="text-gray-700 font-Averta-Semibold hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link}
            </a>
          ))}
        </nav>
      )}
      <nav className="hidden md:flex md:flex-wrap gap-8 items-center self-stretch my-auto min-w-[240px] max-md:max-w-full">
        {links.map((link) => (
          <a
            href={`#${link.toLowerCase()}`}
            key={link}
            className="text-slate-800 font-Averta-Semibold"
          >
            {link}
          </a>
        ))}
        <div className="hidden md:flex md:gap-3.5 md:items-start mr-2">
          <UserButton />
        </div>
      </nav>
    </header>
  );
};

export default Header;
