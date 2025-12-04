"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger button: shown on tablet/mobile only */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 sm:w-12 sm:h-12 bg-[#000000] rounded-lg flex items-center justify-center border border-[#383838]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col gap-1">
          <div
            className={`w-4 h-0.5 sm:w-5 sm:h-0.5 bg-white transition-transform ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></div>
          <div
            className={`w-4 h-0.5 sm:w-5 sm:h-0.5 bg-white transition-opacity ${
              isOpen ? "opacity-0" : ""
            }`}
          ></div>
          <div
            className={`w-4 h-0.5 sm:w-5 sm:h-0.5 bg-white transition-transform ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></div>
        </div>
      </button>

      {/* Mobile/Tablet overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
                    fixed lg:static top-0 left-0 h-full bg-[#000000] flex flex-col items-center py-1 px-2 z-50
                    transition-transform duration-300 border-r border-[#383838]
                    w-16 sm:w-20 md:w-24 lg:w-[70px]
                    ${
                      isOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0
                `}
      >
        {/* Top logo */}
        <div className="flex flex-col items-center">
          <div className="mb-4 sm:mb-5.5 mt-2">
            <Image
              src="/logo.svg"
              alt="logo"
              width={53}
              height={47}
              className="h-[35px] w-10 sm:h-10 sm:w-[45px] md:h-[45px] md:w-[50px] lg:h-[47px] lg:w-[53px]"
            />
          </div>
        </div>

        {/* Middle navigation */}
        <div className="flex flex-col items-center gap-y-3 sm:gap-y-4">
          <button>
            <SideBarIcon href="/add" imgSrc="/add.svg" alt="add" label="Add" />
          </button>
          <SideBarIcon href="/" imgSrc="/home.svg" alt="home" label="Home" />
          <SideBarIcon
            href="/explore"
            imgSrc="/explore.svg"
            alt="explore"
            label="Explore"
          />
          <SideBarIcon
            href="/library"
            imgSrc="/lib.svg"
            alt="library"
            label="Library"
            extraClass="mb-1 sm:mb-2"
          />
        </div>

        {/* Bottom DNA button */}
        <div className="w-[45px] h-[35px] sm:w-[50px] sm:h-[38px] md:w-[52px] md:h-10 lg:w-[54px] lg:h-[43px] bg-[#1C1E1F] font-bold text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] text-white flex items-center justify-center rounded-lg sm:rounded-[9px] md:rounded-[10px] lg:rounded-[11px] mt-3 sm:mt-4">
          <span>DNA</span>
        </div>
      </div>
    </>
  );
}

function SideBarIcon({
  href,
  imgSrc,
  alt,
  label,
  extraClass = "",
}: {
  href: string;
  imgSrc: string;
  alt: string;
  label: string;
  extraClass?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative flex items-center justify-center ${extraClass}`}
    >
      <Image
        src={imgSrc}
        alt={alt}
        width={28}
        height={28}
        className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-7 lg:w-7"
      />
      {/* Tooltip for large screen */}
      <div className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
        <div className="bg-linear-to-r from-[#6A38D9] to-[#8F6FFF] p-0.5 rounded-xl">
          <div className="bg-[#1F1F1F] rounded-lg px-2 py-1 text-white text-sm font-medium border border-transparent min-w-[60px] text-center">
            {label}
          </div>
        </div>
      </div>
    </Link>
  );
}
