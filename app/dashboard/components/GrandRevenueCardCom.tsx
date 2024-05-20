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

const RevenueCardCom: NextComponentType<NextPageContext, {}, Props> = ({
  bgGradient,
  icon,
  label,
}: Props) => {
  const { businessName } = useBusinessNameContext();
  const [sales, setSales] = useState<Sale[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
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

  // get products
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

  // Function to calculate total cost
  const calculateTotalCost = (products: Product[]): number => {
    let totalCost: number = 0;
    products.forEach((product) => {
      totalCost += parseFloat(product.cost) * product.quantity;
    });
    return totalCost;
  };

  // GET PURCHASES
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

  // GET EXPENSES
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

  // Calculate total purchase price
  const totalPurchasePrice: number = calculateTotalPurchasePrice(purchases);
  // Calculate total expenses price
  const totalExpensesPrice: number = calculateTotalExpensesPrice(expenses);

  // Calculate total cost
  const totalCost: number = calculateTotalCost(products);
  // Calculate total cost
  const grandtotalCost: number =
    totalCost + totalPurchasePrice + totalExpensesPrice;
  // Calculate the difference between total product price and total sales price
  const revenueDifference = totalSalesPrice - grandtotalCost;

  // Format the Grand revenue difference to display with two decimal places
  const formattedRevenueDifference = revenueDifference.toFixed(2);

  return (
    // min-w-[330px] min-h-[137px]
    <div
      className={`card card-side min-w-[200px] min-h-[100px]  pr-5 ${bgGradient} bg-black text-white fill-black shadow-xl capitalize`}
    >
      <div className="card-body">
        <h1 className="font-bold text-md">{label}</h1>
        <div className="font-bold flex flex-col">
          <span
            className={`text-2xl ${
              grandtotalCost > totalSalesPrice && "text-red"
            }`}
          >
            ${formattedRevenueDifference}
          </span>
        </div>
      </div>
      <figure>
        <Image src={icon} alt="alt" width={100} height={100} />
      </figure>
    </div>
  );
};

export default RevenueCardCom;
