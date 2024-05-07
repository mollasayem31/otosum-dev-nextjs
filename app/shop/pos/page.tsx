"use client";

import ItemsList from "./ItemsList/ItemsList";
import OrderSystem from "./OrderSystem/OrderSystemLayout";
import { PosAuthContextProvider } from "../../context/Auth/PosAuthContext";

const page = () => {
  localStorage.removeItem("selectedItems");
  return (
    <>
      <PosAuthContextProvider>
        <div className=" grid grid-cols-2 grid-flow-col mx-5">
          <div className="">
            <ItemsList />
          </div>
          <div className="">
            <OrderSystem />
          </div>
        </div>
      </PosAuthContextProvider>
    </>
  );
};
export default page;
