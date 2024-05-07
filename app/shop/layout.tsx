import { useState } from "react";
import SideNavBar from "./SideNavBar";
import TopNavBar from "./TopNavBar";
import { AuthContextProvider } from "../context/Auth/AuthContext";
interface Props {
  children: React.ReactNode;
}

const shopLayout = ({ children }: Props) => {

  return (
    <AuthContextProvider>
      <div className="flex min-h-screen w-full">
        <span className="flex ">
          <SideNavBar />
        </span>
        <div className="grow w-full bg-[#f2f2f2]">
          <TopNavBar />
          <div>{children}</div>
        </div>
      </div>
    </AuthContextProvider>
  );
};

export default shopLayout;
