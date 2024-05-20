"use client";

/* eslint-disable react-hooks/rules-of-hooks */
import InfoCardCom from "./components/InfoCardCom";
import StoreCardCom from "../components/cards/StoreCardCom";
import TotalSalesIcon from "../../public/icons/totalsalesicon.svg";
import { useBusinessNameContext } from "@/app/context/businessNameContext";
import { useEffect, useState } from "react";
import SalesCardCom from "./components/SalesCardCom";
import PurchaseCardCom from "./components/PurchaseCardCom";
import ExpensesCardCom from "./components/ExpensesCardCom";
import ProductsCardCom from "./components/ProductsCardCom";
import RevenueCardCom from "./components/RevenueCardCom";
import SalesListCom from "./components/SalesListCom";
interface FileData {
  fileName: string;
  fileImage: string;
}
interface IShop {
  products: any;
  businessName: string;
  shopId: number;
  name: string;
  address: string;
  type: string;
  img: FileData;
}

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

const page = () => {
  const [shopName, setShopName] = useState<string | null>();
  const { businessName } = useBusinessNameContext();
  const [stores, setStores] = useState<IShop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storeName = localStorage.getItem("shopName");
    if (storeName) {
      setShopName(storeName);
    }
  }, []);

  // GET SHOP DATA FROM BACKEND
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
  }, [businessName, shopName]);

  useEffect(() => {
    localStorage.removeItem("shopName");
  }, []);

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
    <div className="min-h-[100vh] w-full">
      {/*SALES INFO SECTION START */}
      <div className="bg-white p-5 mb-5 m-5 rounded-2xl  ">
        <h1 className="text-2xl text-black font-bold p-5">Overview</h1>
        <div className="w-full h-full inline-grid grid-cols-3 gap-8 ">
          <SalesCardCom
            label="Total Sales"
            icon={TotalSalesIcon}
            bgGradient="text-white bg-gradient-to-r from-[#454CEA] to-[#5596CF]"
          />
          <ProductsCardCom
            label="Total Products"
            icon={TotalSalesIcon}
            setDashProducts={setProducts}
            bgGradient="text-white bg-gradient-to-r from-[#F85900] to-[#FAC250]"
          />
          <ExpensesCardCom
            label="Total Expenses"
            icon={TotalSalesIcon}
            bgGradient="text-white bg-gradient-to-r from-[#DC1818] to-[#FF6565]"
          />
          <RevenueCardCom
            label="Total Revenue"
            icon={TotalSalesIcon}
            bgGradient="text-white bg-gradient-to-r from-green-500 to-blue-500"
          />
          <PurchaseCardCom
            label="Total Purchase"
            icon={TotalSalesIcon}
            bgGradient="text-white bg-gradient-to-r from-[#F85900] to-[#FAC250]"
          />
        </div>
      </div>
      {/*SALES INFO SECTION END  */}
      {/*STORES SECTION START  */}
      <div>
        <h1 className="text-black bg-white p-5 m-5 text-xl font-bold rounded-lg">
          Stores
        </h1>
        <div className="flex justify-start items-center flex-wrap gap-5 px-5 ">
          {stores.map((store) => (
            <StoreCardCom
              key={store.shopId}
              name={store.name}
              img={store.img}
            />
          ))}
        </div>
      </div>
      {/*STORES SECTION END */}
      {/* sales list */}
      <div>
        <SalesListCom />
      </div>
    </div>
  );
};

export default page;
