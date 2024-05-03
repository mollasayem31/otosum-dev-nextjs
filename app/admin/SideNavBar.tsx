"use client";

import Image, { StaticImageData } from "next/image";
import OtosumIcon from "../../public/otosum.svg";
import OIcon from "../../public/o-icon.svg";

import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGlobalState } from "../context/GlobalStateContext";
import { useState } from "react";
import {
  Minus,
  LayoutDashboard,
  CalendarDays,
  BarChartBig,
  Settings,
  CreditCard,
  PersonStanding,
  UserRound,
  Store,
  Users,
} from "lucide-react";

interface MenuItemProps {
  href: string;
  Icon: React.ReactNode;
  label: string;
  isExpanded: boolean;
}
interface DropDownItemProps {
  Icon: React.ReactNode; // Accept any React Node as the icon
  label: string;
  isExpanded: boolean;
  items?: {
    id: number;
    href: string;
    label: string;
  }[];
}

interface ItemProps {
  id: number;
  href: string;
  label: string;
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
   w-full h-12 text-[#9A9898]  font-bold text-sm
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
  Icon,
  label,
  isExpanded,
  items,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
      <div className="h-12 flex justify-start items-center m-0 p-0">
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
      </div>
      {isDropdownOpen && (
        <ul className="ml-5">
          {items?.map(({ id, href, label }) => (
            <li key={id}>
              <Link
                href={href}
                className="block px-4 text-[#9A9898] transition-all duration-300 hover:text-white font-bold"
              >
                <div className="flex justify-start items-center hover:scale-105">
                  <span className="p-1">
                    <Minus size={20} strokeWidth={3} />
                  </span>
                  <span
                    className={`text-sm scale-100 ${
                      pathname === href && "text-white"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const SideNav: React.FC = () => {
  const { toggleSidebar, isSidebarExpanded } = useGlobalState();

  const sidebarWidth = isSidebarExpanded ? "w-[15rem]" : "w-[4rem]";

  return (
    <div
      className={`inset-y-0 left-0 bg-card  bg-[#0b1642] ${sidebarWidth}  transition-all duration-300`}
    >
      <div
        className={`my-1 px-3 flex justify-center items-center text-center bg-[#0b1642] h-20 `}
      >
        <div>
          <Image
            src={isSidebarExpanded ? OtosumIcon : OIcon}
            alt={isSidebarExpanded ? "Otosum" : "Otosum"}
            width={isSidebarExpanded ? 200 : 50}
            height={isSidebarExpanded ? 20 : 50}
            className="bg-transparent transition-all duration-300"
          />
        </div>
        {/* dashboard expend and collapse button */}
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
            href="/admin/dashboard"
            Icon={<LayoutDashboard />}
            label="Dashboard"
            isExpanded={isSidebarExpanded}
          />
          <MenuItem
            href="/admin/users"
            Icon={<Users />}
            label="Users"
            isExpanded={isSidebarExpanded}
          />
          <DropDownItem
            Icon={<CreditCard />}
            label="Subscriptions"
            isExpanded={isSidebarExpanded}
            items={[
              {
                id: 1,
                href: "/admin/subscriptions",
                label: "Subscriptions",
              },
              {
                id: 2,
                href: "/admin/subscriptions/add-subscription",
                label: "Add Subscription",
              },
            ]}
          />
          <MenuItem
            href="/dashboard/calendar"
            Icon={<CalendarDays />}
            label="Calendar"
            isExpanded={isSidebarExpanded}
          />

          {/* <MenuItem
            href="/dashboard/settings"
            Icon={<Settings />}
            label="Settings"
            isExpanded={isSidebarExpanded}
          /> */}
          {/* ... other menu items ... */}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
