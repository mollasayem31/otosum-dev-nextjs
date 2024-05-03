import type { NextComponentType, NextPageContext } from "next";
import React from "react";

interface Props {
  subscription: ISubscription;
}

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
const SubscriptionCardCom: NextComponentType<NextPageContext, {}, Props> = ({
  subscription,
}) => {
  const { name, price, shopCount, des } = subscription;
  return (
    <div className="text-[#7d7a7b border-[#e9e9e9] w-fit bg-white p-10 text-center rounded-lg">
      <div className="py-3">
        <h2 className="text-black text-xl">{name}</h2>
        <h1 className="text-blue-500 text-4xl">${price}</h1>
        <h3 className="text-blue-500 text-lg ">/{shopCount}</h3>
      </div>
      <p>{des}</p>
    </div>
  );
};

export default SubscriptionCardCom;
