"use client";

/* eslint-disable react-hooks/rules-of-hooks */
import StoreCardCom from "../../components/cards/StoreCardCom";

import { useBusinessNameContext } from "@/app/context/businessNameContext";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
interface FileData {
  fileName: string;
  fileImage: string;
}
interface IShop {
  businessName: string;
  shopId: number;
  name: string;
  address: string;
  type: string;
  img: FileData;
}
const page = () => {
  const { businessName } = useBusinessNameContext();
  const [stores, setStores] = useState<IShop[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!businessName) {
          return;
        }
        const res = await fetch("/api/dashboard/stores", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ businessName }),
        });

        if (!res.ok) {
          console.error("Failed to fetch data:", res.status);
          return;
        }

        const data = await res.json();
        setStores(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [businessName]);
  return (
    <div className="min-h-[100vh] w-full">
      <div className="bg-white p-10 mx-5 rounded-xl">
        <h1 className="text-2xl font-bold text-black"> Stores List</h1>
      </div>
      <>
        <div className="flex justify-start items-center flex-wrap gap-5 p-5 ">
          {stores.length === 0 && (
            <div>
              <h1 className="text-lg">
                There was to shops! Please Create a new shop
              </h1>
              <Link
                href="/dashboard/stores/add-store"
                className="btn mr-2 text-white text-base hover:scale-105 border-0 bg-gradient-to-r py-2 from-[#438FFD] to-[#00FC44] form-submit"
              >
                <span className="font-bold">
                  <Plus />
                </span>
                <span>Add Store</span>
              </Link>
            </div>
          )}
          {stores.map((store) => (
            <StoreCardCom
              key={store.shopId}
              name={store.name}
              img={store.img}
            />
          ))}
        </div>
      </>
    </div>
  );
};

export default page;
