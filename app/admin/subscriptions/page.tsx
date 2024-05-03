"use client";

/* eslint-disable react-hooks/rules-of-hooks */
import { useBusinessNameContext } from "@/app/context/businessNameContext";
import { useEffect, useState } from "react";
import SubscriptionsCardCom from "./SubscriptionsCardCom";
import { Skeleton } from "antd";
import SkeletonCom from "@/app/components/shared/SkeletonCom";
import { Toaster } from "react-hot-toast";
// SUBSCRIPTIONS INTERFACES
interface IDES {
  id: number;
  value: string;
}
interface ISubscription {
  subscriptionId: number;
  subscriptionType: string;
  name: string;
  price: number;
  shopCount: number;
  des: IDES[];
  paymentLInk: string;
}
const page = () => {
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);
  const [loadData, setLoadData] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/users/subscriptions", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          console.error("Failed to fetch data:", res.status);
          return;
        }

        const data = await res.json();
        setSubscriptions(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [loadData]);
  return (
    <div className="min-h-[100vh] w-full">
      <Toaster />
      <div className="bg-white m-5 p-5 rounded-lg">
        <h1 className="text-3xl font-bold text-black">Subscriptions</h1>
      </div>
      <div className="flex justify-start items-center flex-wrap gap-5 p-5 ">
        {subscriptions.length === 0 && <SkeletonCom />}
        {subscriptions.map((subscription) => (
          <SubscriptionsCardCom
            key={subscription.subscriptionId}
            subscription={subscription}
            setLoadData={setLoadData}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
