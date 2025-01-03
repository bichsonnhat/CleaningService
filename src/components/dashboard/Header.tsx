"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { link } from "fs";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, isSignedIn } = useUser();
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const links = [
    {
      name: "About Us",
      url: "/about-us",
    },
    {
      name: "Career",
      url: "/career",
    },
    {
      name: "Dashboard",
      url: "/dashboard/chart",
      canAccess: ["admin"],
    },
    {
      name: "Dashboard",
      url: "/dashboard/personal",
      canAccess: ["customer", "helper"],
    },
    {
      name: "Booking",
      url: "/select",
      canAccess: ["customer"],
    },
  ];

  const fetchUser = async () => {
    const userResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user-info`
    );
    const userInfo = await userResponse.json();
    console.log("User: ", userInfo);
    setUserId(userInfo.userId);
    setRole(userInfo.role);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // if (!userId || !role) {
  //   return <></>;
  // }
  return (
    <header className="flex flex-wrap gap-10 justify-between items-center py-6 pr-5 pl-12 w-full bg-white min-h-[100px] max-md:pl-5 max-md:max-w-full">
      <a href="/">
        <Image
          src="/images/Header/Logo.svg"
          alt="HeroIllustration"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "126px", height: "auto" }}
        />
      </a>
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
          {/* {links.map((link) => (
            <a
              href={`#${link.toLowerCase()}`}
              key={link}
              className="text-gray-700 font-Averta-Semibold hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link}
            </a>
          ))} */}
          {links.map((link) => {
            if (link.canAccess) {
              if (
                !isSignedIn ||
                !role ||
                !link.canAccess.some((canAccess) => canAccess === role)
              ) {
                return null;
              }
            }
            return (
              <a
                href={`${link.url}`}
                key={link.url}
                className="text-gray-700 font-Averta-Semibold hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            );
          })}
        </nav>
      )}
      <nav className="hidden md:flex md:flex-wrap gap-8 items-center justify-center self-stretch my-auto min-w-[240px] max-md:max-w-full">
        {/* {links.map((link) => (
          <a
            href={`#${link.toLowerCase()}`}
            key={link}
            className="text-slate-800 font-Averta-Semibold"
          >
            {link}
          </a>
        ))} */}
        {links.map((link) => {
          if (link.canAccess) {
            if (
              !isSignedIn ||
              !role ||
              !link.canAccess.some((canAccess) => canAccess === role)
            ) {
              return null;
            }
          }
          return (
            <a
              href={`${link.url}`}
              key={link.url}
              className="text-gray-700 font-Averta-Semibold hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          );
        })}
        <div className="hidden md:flex flex-row md:gap-3.5 mr-2">
          <UserButton />
          <div className="flex flex-col text-slate-800 font-Averta-Semibold">
            <span>{user?.fullName || "Guest"}</span>
            <span>{String(user?.publicMetadata?.role).charAt(0) + String(user?.publicMetadata?.role).slice(1) || "Guest"}</span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
