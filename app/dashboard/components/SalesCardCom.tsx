import type { NextComponentType, NextPageContext } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useBusinessNameContext } from "@/app/context/businessNameContext";
// Define the type for a product
interface Product {
  businessName: string;
  shopName: string;
  productId: number;
  productName: string;
  category: string;
  subCategory: string;
  brand: string;
  cost: string;
  quantity: number;
  discountType: string;
  discount: string;
  taxType: string;
  tax: string;
  price: string;
  promotionalStatus: string | null;
  promotionalPrice: string | null;
  promotionalStartDate: string;
  promotionalEndDate: string;
  description: string;
}

// Define the type for a sale
interface Sale {
  _id: string;
  saleId: number;
  businessName: string;
  shopName: string;
  paymentMethod: string;
  name: string;
  email: string;
  role: string;
  salesDate: string;
  salesTime: string;
  products: Product[]; // This indicates that the 'products' property is an array of Product objects
}
interface Props {
  label: string;
  icon: string;
  bgGradient: string;
}

const SalesCardCom: NextComponentType<NextPageContext, {}, Props> = ({
  bgGradient,
  icon,
  label,
}: Props) => {
  const { businessName } = useBusinessNameContext();
  const [sales, setSales] = useState<Sale[]>([]);
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
  }, [businessName, sales]);
  // Initialize total sales price
  let totalSalesPrice = 0;

  // Iterate through each sale
  for (let sale of sales) {
    // Iterate through each product in the sale
    for (let product of sale.products) {
      // Calculate the discounted price
      let discountedPrice = parseFloat(product.price);
      if (product.discountType === "percentage") {
        // If discount type is percentage, calculate the discounted price
        discountedPrice -=
          (parseFloat(product.price) * parseFloat(product.discount)) / 100;
      } else if (product.discountType === "amount") {
        // If discount type is amount, subtract the discount amount from the price
        discountedPrice -= parseFloat(product.discount);
      }

      // Add the discounted price multiplied by quantity to the total sales price
      totalSalesPrice += discountedPrice * product.quantity;

      // Determine the tax amount based on the tax type
      if (product.taxType === "percentage") {
        // If tax type is percentage, calculate tax based on percentage of the discounted price
        totalSalesPrice +=
          (discountedPrice * product.quantity * parseFloat(product.tax)) / 100;
      } else if (product.taxType === "amount") {
        // If tax type is amount, add the tax amount to the total sales price
        totalSalesPrice += parseFloat(product.tax) * product.quantity;
      }
    }
  }
  // Calculate the number of objects in the array
  const numberOfSales = sales.length;
  // Format the total sales price to two decimal places
  const formattedTotalSalesPrice = totalSalesPrice.toFixed(2);

  return (
    // min-w-[330px] min-h-[137px]
    <div
      className={`card card-side min-w-[200px] min-h-[100px]  pr-5 ${bgGradient} bg-black text-white fill-black shadow-xl capitalize`}
    >
      <div className="card-body">
        <h1 className="font-bold text-md">{label}</h1>
        <div className="font-bold flex flex-col">
          <span className=" text-4xl">{numberOfSales}</span>
          <span className="text-2xl">${formattedTotalSalesPrice}</span>
        </div>
      </div>
      <figure>
        <Image src={icon} alt="alt" width={100} height={100} />
      </figure>
    </div>
  );
};

export default SalesCardCom;
