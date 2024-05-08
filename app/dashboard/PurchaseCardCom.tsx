import type { NextComponentType, NextPageContext } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useBusinessNameContext } from "@/app/context/businessNameContext";
// Define the type for a Purchase
interface Purchase {
  _id: string;
  businessName: string;
  shopName: string;
  expensesId: number;
  title: string;
  date: string;
  warehouse: string;
  category: string;
  amount: string;
  note: string;
  description: string;
}

interface Props {
  label: string;
  icon: string;
  bgGradient: string;
}

const PurchaseCardCom: NextComponentType<NextPageContext, {}, Props> = ({
  bgGradient,
  icon,
  label,
}: Props) => {
  const { businessName } = useBusinessNameContext();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
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
          body: JSON.stringify({ businessName, collectionName: "purchases" }),
        });

        if (!res.ok) {
          console.error("Failed to fetch data:", res.status);
          return;
        }
        const data = await res.json();
        setPurchases(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [businessName]);
  // Function to calculate total purchase price
  const calculateTotalPurchasePrice = (purchases: Purchase[]): number => {
    let totalPurchasePrice: number = 0;
    purchases.forEach((purchase) => {
      totalPurchasePrice += parseFloat(purchase.amount);
    });
    return totalPurchasePrice;
  };

  // Calculate total purchase price
  const totalPurchasePrice: number = calculateTotalPurchasePrice(purchases);

  return (
    // min-w-[330px] min-h-[137px]
    <div
      className={`card card-side min-w-[200px] min-h-[100px]  pr-5 ${bgGradient} bg-black text-white fill-black shadow-xl capitalize`}
    >
      <div className="card-body">
        <h1 className="font-bold text-md">{label}</h1>
        <div className="font-bold flex flex-col">
          <span className=" text-4xl">{purchases.length}</span>
          <span className="text-2xl">${totalPurchasePrice}</span>
        </div>
      </div>
      <figure>
        <Image src={icon} alt="alt" width={100} height={100} />
      </figure>
    </div>
  );
};

export default PurchaseCardCom;
