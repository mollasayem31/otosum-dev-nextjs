"use client";

import { FaRegBell } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import Link from "next/link";
import { ShoppingCart, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import CalculatorLayoutCom from "../components/Calculator/CalculatorLayoutCom";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const TopNavBar = () => {
  const router = useRouter();
  const path = usePathname();
  const [user, setUser] = useState({ name: "", role: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handelLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("businessName");
    return router.push("/auth/sign-in");
  };
  return (
    <div
      className={`navbar flex justify-end items-center px-5 bg-white mb-5 h-20 `}
    >
      {path === "/shop/pos/order" ? (
        <CalculatorLayoutCom />
      ) : (
        <Link href="/shop/pos/order" className="mr-5">
          <button className="btn border-0 rounded-xl text-gl hover:scale-105 text-white bg-gradient-to-r from-[#00FC44] to-[#438FFD]">
            <span className="text-lg font-extrabold">
              <ShoppingCart />
            </span>
            POS
          </button>
        </Link>
      )}
      <div className="dropdown dropdown-end">
        <div className="flex justify-center items-center">
          <div className="mr-5 p-2 text-2xl cursor-pointer bg-[#f2f2f2] rounded-full hover:text-black hover:bg-gradient-to-r hover:from-[#4391fd2b] hover:to-[#00fc4329]">
            <FaRegBell />
          </div>
          <div className="mr-5 p-2 text-2xl cursor-pointer bg-[#f2f2f2] rounded-full hover:text-black hover:bg-gradient-to-r hover:from-[#4391fd48] hover:to-[#00fc4346]">
            <AiOutlineMessage />
          </div>
          <div className="mr-5 ">
            <h1 className="font-bold capitalize text-lg text-black">
              {user?.name}
            </h1>
            <h2 className=" text-md capitalize text-green-500">{user?.role}</h2>
          </div>
          <div className="tooltip tooltip-bottom" data-tip="Log Out">
            <div
              onClick={handelLogOut}
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle hover:text-red-500 hover:bg-green-200"
            >
              <LogOut />
            </div>
          </div>
        </div>
        {/* <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52"
        >
          <li className="hover:text-black hover:bg-gradient-to-r hover:from-[#4391fd2b] hover:to-[#00fc4329] rounded-full">
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li className="hover:text-black hover:bg-gradient-to-r hover:from-[#4391fd2b] hover:to-[#00fc4329] rounded-full">
            <a>Settings</a>
          </li>
          <li
            className="hover:text-black hover:bg-gradient-to-r hover:from-[#4391fd2b] hover:to-[#00fc4329] rounded-full"
          >
            <a>Logout</a>
          </li>
        </ul> */}
      </div>
    </div>
  );
};

export default TopNavBar;
