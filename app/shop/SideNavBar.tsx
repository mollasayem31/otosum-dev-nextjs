"use client";

import Image, { StaticImageData } from "next/image";
import OtosumIcon from "../../public/otosum.svg";
import OIcon from "../../public/o-icon.svg";
import DashboardIcon from "../../public/icons/dashboard.svg";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGlobalState } from "../context/GlobalStateContext";
import { useState } from "react";
import {
  Minus,
  Box,
  LayoutDashboard,
  Layers3,
  Barcode,
  Store,
  BadgeDollarSign,
  UsersRound,
  Briefcase,
  MenuSquare,
  CalendarDays,
  BarChartBig,
  Settings,
} from "lucide-react";

interface MenuItemProps {
  href: string;
  Icon: React.ReactNode;
  label: string;
  isExpanded: boolean;
}
interface DropDownItemProps {
  href: string;
  Icon: React.ReactNode; // Accept any React Node as the icon
  label: string;
  isExpanded: boolean;
}
interface DropDownItemsProps {
  id: number;
  href: string;
  label: string;
  isExpanded: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  href,
  Icon,
  label,
  isExpanded,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const listItemClasses = `
  w-full h-12 text-[#9A9898] my-3 font-bold text-sm
  ${
    isActive
      ? "text-white bg-gradient-to-r from-[#4391fd2b] to-[#00fc4329]"
      : ""
  }
  hover:text-white hover:bg-gradient-to-r hover:from-[#4391fd2b] hover:to-[#00fc4329] flex
`;

  const hoverLineClasses = `
  w-1 h-full
  ${isActive ? "text-white bg-gradient-to-b from-[#00FC44] to-[#438FFD]" : ""}
`;

  return (
    <li className={listItemClasses}>
      {isActive && <div className={hoverLineClasses}></div>}
      <button className="pl-3">
        <Link href={href} passHref>
          <div className="flex items-center justify-start transition-all duration-300">
            {Icon && <span className="flex items-center px-2">{Icon}</span>}
            {isExpanded && (
              <span
                className={`ml-2 bg-transparent whitespace-nowrap${
                  isExpanded
                    ? "transition-all duration-300 delay-100"
                    : "hidden"
                }`}
              >
                {label}
              </span>
            )}
          </div>
        </Link>
      </button>
    </li>
  );
};
const DropDownItem: React.FC<DropDownItemProps> = ({
  href,
  Icon,
  label,
  isExpanded,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const dropDownItemsClasses = `block px-4  text-[#9A9898] transition-all duration-300 hover:text-white font-bold`;

  const hoverLineClasses = `
    w-1 h-full
    ${
      isDropdownOpen
        ? "text-white bg-gradient-to-b from-[#00FC44] to-[#438FFD]"
        : ""
    }
  `;

  return (
    <li className="">
      <span className="h-12 flex justify-start items-center m-0 p-0">
        {isDropdownOpen && <div className={hoverLineClasses}> &nbsp;</div>}
        <button
          onClick={handleDropdownToggle}
          className={`w-full h-12 pl-3 text-[#9A9898] font-bold text-sm hover:text-white hover:bg-gradient-to-r hover:from-[#4391fd2b] hover:to-[#00fc4329] ${
            isDropdownOpen
              ? "text-white bg-gradient-to-r from-[#4391fd2b] to-[#00fc4329]"
              : ""
          }`}
        >
          <div className="flex justify-start items-center">
            {Icon && (
              <span className="flex items-center px-2 text-nowrap">{Icon}</span>
            )}
            <div className="flex items-center px-2">{isExpanded && label}</div>
            {isExpanded ? (
              <FaChevronDown
                className={` transition-all duration-300 ${
                  isDropdownOpen ? "transform rotate-180" : ""
                }`}
              />
            ) : (
              <div className="hidden sm:block"></div>
            )}
          </div>
        </button>
      </span>
      {isDropdownOpen && (
        <ul className="pl-3 text-sm">{/* Your dropdown menu items here */}</ul>
      )}
    </li>
  );
};

const SideNav: React.FC = () => {
  const { toggleSidebar, isSidebarExpanded } = useGlobalState();

  const sidebarWidth = isSidebarExpanded
    ? "tablet:w-[30vw] laptop:w-[25vw] desktop:w-[20vw]"
    : "tablet:w-[9vw] laptop:w-[6.1vw] desktop:w-[5vw]";
  // const sidebarWidthMd = isSidebarExpanded ? "w-[20vw]" : "w-[4vw]";
  // tablet:bg-red-500 laptop:bg-pink-500 desktop:bg-green-500
  return (
    <div
      className={` inset-y-0 left-0 bg-card  bg-[#0b1642]    ${sidebarWidth} transition-all duration-300 w-`}
    >
      <div
        className={`my-1 px-3 flex justify-center items-center text-center bg-[#0b1642] h-20 `}
      >
        <Link href="/">
          <Image
            src={isSidebarExpanded ? OtosumIcon : OIcon}
            alt={isSidebarExpanded ? "Otosum" : "Otosum"}
            width={isSidebarExpanded ? 200 : 50}
            height={isSidebarExpanded ? 20 : 50}
            className="bg-transparent transition-all duration-300"
          />
        </Link>{" "}
        {/* dashboard expent and collapse button */}
        <button
          onClick={toggleSidebar}
          className={`fixed ${
            isSidebarExpanded ? "left-22" : "left-3.7"
          } bottom-5 transition-all duration-300`}
        >
          <div className="bg-[#5c6280] w-10 h-10 rounded-full flex justify-center items-center">
            {isSidebarExpanded ? (
              <FaChevronLeft className="text-white bg-transparent" />
            ) : (
              <FaChevronRight className="text-white bg-transparent" />
            )}
          </div>
        </button>
      </div>
      {isSidebarExpanded && (
        <h1 className="py-5 mt-5 px-5 text-md bg-transparent text-[#9A9898] transition-all duration-300 uppercase">
          Menu
        </h1>
      )}
      <div className="transition-all duration-300">
        <ul>
          {/* Pass isExpanded to MenuItem component */}
          <MenuItem
            href="/shop/dashboard"
            Icon={<LayoutDashboard />}
            label="Dashboard"
            isExpanded={isSidebarExpanded}
          />
          <DropDownItem
            href="/shop/pos"
            Icon={<Box />}
            label="POS"
            isExpanded={isSidebarExpanded}
          />

          <DropDownItem
            href="/shop/products"
            Icon={<Layers3 />}
            label="Products"
            isExpanded={isSidebarExpanded}
          />
          <MenuItem
            href="/shop/print-Barcode"
            Icon={<Barcode />}
            label="Print Barcode"
            isExpanded={isSidebarExpanded}
          />
          <DropDownItem
            href="/shop/inventory"
            Icon={<Store />}
            label="Inventory"
            isExpanded={isSidebarExpanded}
          />
          <DropDownItem
            href="/shop/sales"
            Icon={<BadgeDollarSign />}
            label="Sales"
            isExpanded={isSidebarExpanded}
          />
          <DropDownItem
            href="/shop/purchase"
            Icon={<Briefcase />}
            // <BaggageClaim />
            label="Purchase"
            isExpanded={isSidebarExpanded}
          />
          <DropDownItem
            href="/shop/expenses"
            Icon={<MenuSquare />}
            label="Expenses"
            isExpanded={isSidebarExpanded}
          />
          <DropDownItem
            href="/shop/employee-manage"
            Icon={<UsersRound />}
            label="Employee Manage"
            isExpanded={isSidebarExpanded}
          />
          <MenuItem
            href="/dashboard/Calendar"
            Icon={<CalendarDays />}
            label="Calendar"
            isExpanded={isSidebarExpanded}
          />
          <DropDownItem
            href="/shop/reports"
            Icon={<BarChartBig />}
            label="Reports"
            isExpanded={isSidebarExpanded}
          />
          <MenuItem
            href="/dashboard/settings"
            Icon={<Settings />}
            label="Settings"
            isExpanded={isSidebarExpanded}
          />
          {/* ... other menu items ... */}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
