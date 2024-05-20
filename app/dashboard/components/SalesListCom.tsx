"use client";

/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect, useState } from "react";
import { useBusinessNameContext } from "@/app/context/businessNameContext";
import SkeletonCom from "@/app/components/shared/SkeletonCom";
import TableRow from "./TableRow";

const SalesListCom = () => {
  const { businessName } = useBusinessNameContext();
  const [sales, setSales] = useState<[]>([]);
  const [shopName, setShopName] = useState<string | null>();

  useEffect(() => {
    const storeName = localStorage.getItem("shopName");
    if (storeName) {
      setShopName(storeName);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!businessName) {
          return;
        }
        const res = await fetch("/api/dashboard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ businessName, collectionName: "sales" }),
        });

        if (!res.ok) {
          console.error("Failed to fetch data:", res.status);
          return;
        }

        const data = await res.json();
        setSales(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [businessName, shopName]);

  return (
    <div className="p-5 m-5 bg-white rounded-2xl w-ful">
      <div className="flex justify-between items-center mb-5 p-5">
        <h1 className="mb-5 text-black text-2xl font-extrabold">Sales List</h1>
      </div>
      <div>
        <div className="p-5 m-2 rounded-2xl overflow-auto">
          {sales.length >= 0 && (
            <table className="table w-full ">
              {/* head */}
              <thead className="text-[#6C696A] border border-[#F2F2F2] text-base bg-[#f8f8f8] border-b-2  min-h-screen">
                <tr>
                  <th>Date</th>
                  <th>Products Name</th>
                  <th>Biller</th>
                  <th>Total Products</th>
                  <th>Total Discounts</th>
                  <th>Total Taxes</th>
                  <th>Total Price</th>
                  <th>Payment Method</th>
                </tr>
              </thead>
              <tbody className="text-black text-md border rounded-lg border-[#F2F2F2] ">
                {sales.map((sale) => (
                  <TableRow key={1} sale={sale} />
                ))}
              </tbody>
            </table>
          )}
          {sales.length === 0 && <SkeletonCom />}
        </div>
      </div>
    </div>
  );
};

export default SalesListCom;
