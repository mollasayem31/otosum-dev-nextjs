import type { NextComponentType, NextPageContext } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useBusinessNameContext } from "@/app/context/businessNameContext";
// Define the type for a Purchase
interface Expense {
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
  img: any;
}

interface Props {
  label: string;
  icon: string;
  bgGradient: string;
}

const ExpensesCardCom: NextComponentType<NextPageContext, {}, Props> = ({
  bgGradient,
  icon,
  label,
}: Props) => {
  const { businessName } = useBusinessNameContext();
  const [expenses, setExpenses] = useState<Expense[]>([]);
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
          body: JSON.stringify({ businessName, collectionName: "expenses" }),
        });

        if (!res.ok) {
          console.error("Failed to fetch data:", res.status);
          return;
        }
        const data = await res.json();
        setExpenses(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [businessName]);

  // Function to calculate total expenses price
  const calculateTotalExpensesPrice = (expenses: Expense[]): number => {
    let totalExpensesPrice: number = 0;
    expenses.forEach((expense) => {
      totalExpensesPrice += parseFloat(expense.amount);
    });
    return totalExpensesPrice;
  };

  // Calculate total expenses price
  const totalExpensesPrice: number = calculateTotalExpensesPrice(expenses);

  return (
    // min-w-[330px] min-h-[137px]
    <div
      className={`card card-side min-w-[200px] min-h-[100px]  pr-5 ${bgGradient} bg-black text-white fill-black shadow-xl capitalize`}
    >
      <div className="card-body">
        <h1 className="font-bold text-md">{label}</h1>
        <div className="font-bold flex flex-col">
          <span className=" text-4xl">{expenses.length}</span>
          <span className="text-2xl">${totalExpensesPrice}</span>
        </div>
      </div>
      <figure>
        <Image src={icon} alt="alt" width={100} height={100} />
      </figure>
    </div>
  );
};

export default ExpensesCardCom;
