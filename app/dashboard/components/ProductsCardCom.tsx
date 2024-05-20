import type { NextComponentType, NextPageContext } from "next";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useBusinessNameContext } from "@/app/context/businessNameContext";
// Define the type for a Product
interface Product {
  _id: string;
  businessName: string;
  shopName: string;
  productId: number;
  productName: string;
  description: string;
  category: string;
  subCategory: string;
  brand: string;
  cost: string;
  quantity: string;
  alertQuantity: string;
  discountType: string;
  discount: string;
  taxType: string;
  tax: string;
  price: string;
  promotionalStatus: string | null;
  promotionalPrice: string | null;
  promotionalStartDate: string;
  promotionalEndDate: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  label: string;
  icon: string;
  bgGradient: string;
  setDashProducts: Dispatch<SetStateAction<Product[]>>;
}

const ExpensesCardCom: NextComponentType<NextPageContext, {}, Props> = ({
  bgGradient,
  icon,
  label,
  setDashProducts,
}: Props) => {
  const { businessName } = useBusinessNameContext();
  const [products, setProducts] = useState<Product[]>([]);
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
          body: JSON.stringify({ businessName, collectionName: "products" }),
        });

        if (!res.ok) {
          console.error("Failed to fetch data:", res.status);
          return;
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [businessName]);

  // // Function to calculate total product price including tax and discount
  // const calculateTotalProductPrice = (products: Product[]): number => {
  //   let totalProductPrice: number = 0;
  //   products.forEach((product) => {
  //     const price =
  //       product.promotionalStatus === "open" && product.promotionalPrice
  //         ? parseFloat(product.promotionalPrice)
  //         : parseFloat(product.price);
  //     let discount: number;
  //     if (product.discountType === "percentage") {
  //       discount = (price * parseFloat(product.discount)) / 100;
  //     } else if (product.discountType === "amount") {
  //       discount = parseFloat(product.discount);
  //     } else {
  //       discount = 0;
  //     }
  //     let tax: number;
  //     if (product.taxType === "percentage") {
  //       tax = ((price - discount) * parseFloat(product.tax)) / 100;
  //     } else if (product.taxType === "amount") {
  //       tax = parseFloat(product.tax);
  //     } else {
  //       tax = 0;
  //     }
  //     totalProductPrice +=
  //       price - discount + (product.taxType === "amount" ? -tax : tax);
  //   });
  //   return totalProductPrice;
  // };

  // // Calculate total product price including tax and discount
  // const totalProductPrice: number = calculateTotalProductPrice(products);

  // Function to calculate total cost
  const calculateTotalCost = (products: Product[]): number => {
    let totalCost: number = 0;
    products.forEach((product) => {
      totalCost += parseFloat(product.cost) * parseFloat(product.quantity);
    });
    return totalCost;
  };

  // Calculate total cost
  const totalCost: number = calculateTotalCost(products);

  return (
    // min-w-[330px] min-h-[137px]
    <div
      className={`card card-side min-w-[200px] min-h-[100px]  pr-5 ${bgGradient} bg-black text-white fill-black shadow-xl capitalize`}
    >
      <div className="card-body">
        <h1 className="font-bold text-md">{label}</h1>
        <div className="font-bold flex flex-col">
          <span className=" text-4xl">{products.length}</span>
          <span className="text-2xl">${totalCost}</span>
        </div>
      </div>
      <figure>
        <Image src={icon} alt="alt" width={100} height={100} />
      </figure>
    </div>
  );
};

export default ExpensesCardCom;
