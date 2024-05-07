"use client";

import { MoveLeft, Printer } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import ItemsCalculationCom from "./ItemsCalculationCom";
import { useReactToPrint } from "react-to-print";

const OrderCompletedCom = () => {
  const router = useRouter();
  const [user, setUser] = useState({ name: "", role: "", email: "" });
  const [shopName, setShopName] = useState<string | null>("");
  const [selectedItems, setSelectedItems] = useState<any[]>(
    JSON.parse(localStorage.getItem("selectedItems") || "[]")
  );
  const currentDate = new Date();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storeName = localStorage.getItem("shopName");
    setShopName(storeName || null);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // const targetContent = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => targetContent.current, // Pass a function returning the content to be printed
  // });
  const targetContent = useRef<HTMLDivElement>(null); // Correct the type of the ref
  const handlePrint = useReactToPrint({
    content: () => targetContent.current, // Pass a function returning the content to be printed
  });

  return (
    <div className=" bg-white mx-5 rounded-lg rounded-t-lg">
      <>
        {/* InVoice section */}
        <div
          ref={targetContent}
          className="w-full h-full flex flex-col justify-start items-center text-black bg-white"
        >
          <div className="">
            <h1 className="capitalize text-4xl font-extrabold py-4">
              {shopName}
            </h1>
            <p>Biller Name: {user.name}</p>
            <p>Biller Email: {user.email}</p>
            <p>Date: {currentDate.toDateString()}</p>
          </div>
          <div>
            <table className="table text-sm text-black">
              {/* head */}
              <thead>
                <tr className="text-center text-lg text-black">
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {/* rows */}
                {selectedItems.map(
                  ({
                    productId,
                    productName,
                    price,
                    quantity,
                    promotionalStatus,
                    promotionalPrice,
                    discount,
                    tax,
                  }) => (
                    <tr
                      key={productId}
                      className="text-center text-black text-base text-nowrap"
                    >
                      <td>{productName}</td>
                      <td>${promotionalStatus ? promotionalPrice : price}</td>
                      <td>{quantity}</td>
                      <td>${price * quantity}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <div className="border border-dashed border-[#959595]"></div>
            <ItemsCalculationCom />
          </div>
        </div>
        {/* BUttons Section */}
        <div className="flex justify-end py-5">
          <button
            onClick={() => router.push("/shop/pos")}
            className="py-3 px-5 border rounded-lg mx-5 capitalize font-bold border-black flex justify-center items-center"
          >
            <MoveLeft /> <span className="px-2">Back to pos</span>
          </button>
          <button
            onClick={handlePrint}
            className="py-3 px-5 border-none rounded-lg mx-5 capitalize font-bold flex justify-center items-center text-white bg-gradient-to-r from-[#438FFD] to-[#00FC44]"
          >
            <span className="px-2">print</span> <Printer />
          </button>
        </div>
      </>
    </div>
  );
};

export default OrderCompletedCom;
