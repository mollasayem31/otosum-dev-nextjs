"use client";

/* eslint-disable react-hooks/rules-of-hooks */
import { useBusinessNameContext } from "@/app/context/businessNameContext";
import { useEffect, useState } from "react";
import SubscriptionsCardCom from "./SubscriptionsCardCom";
import SkeletonCom from "@/app/components/shared/SkeletonCom";
import AuthHeaderCom from "../shared/AuthHeaderCom";
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
  const { businessName } = useBusinessNameContext();
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!businessName) {
          return;
        }
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
  }, [businessName]);
  return (
    <div className="min-h-screen min-w-screen bg-white text-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 justify-start items-center">
      {/* AuthHeaderCom component for header */}
      <AuthHeaderCom />
      {/* Form section */}
      <div className="h-full w-full flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-black mb-2">
          Pick a Subscription
        </h1>
        <div className="flex justify-start items-center flex-wrap gap-5 p-5 ">
          {subscriptions.length === 0 && <SkeletonCom />}
          {subscriptions.map((subscription) => (
            <SubscriptionsCardCom
              key={subscription.subscriptionId}
              subscription={subscription}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
