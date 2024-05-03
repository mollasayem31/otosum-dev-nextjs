"use client";

import { NextComponentType, NextPageContext } from "next";
import SubscriptionCardCom from "./SubscriptionCardCom";
import { useEffect, useState } from "react";

// SUBSCRIPTIONS INTERFACES
interface FileData {
  fileName: string;
  fileImage: string;
}
interface ISubscription {
  subscriptionId: number;
  subscriptionType: string;
  img: FileData;
  name: string;
  price: number;
  shopCount: number;
  des: string;
  paymentLInk: string;
}
interface Props {}

const SubscriptionsCom: NextComponentType<NextPageContext, {}, Props> = () => {
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);

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
  }, []);
  // Return JSX
  return (
    <div>
      <div className="">
        <div className="bg-white p-5 m-5 rounded-xl">
          <h1 className="text-black text-2xl">Select Subscription</h1>
        </div>
        <div className="w-full h-full flex justify-start items-center flex-wrap gap-5 m-5  ">
          {subscriptions.map((subscription) => (
            <SubscriptionCardCom
              key={subscription.subscriptionId}
              subscription={subscription}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsCom;
