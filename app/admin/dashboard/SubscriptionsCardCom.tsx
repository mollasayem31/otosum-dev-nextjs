import type { NextComponentType, NextPageContext } from "next";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
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
interface Props {
  subscription: ISubscription;
  setLoadData: Dispatch<SetStateAction<boolean>>;
}

const InfoCardCom: NextComponentType<NextPageContext, {}, Props> = ({
  subscription,
  setLoadData,
}: Props) => {
  const { subscriptionType, name, price, shopCount, des } = subscription;

  const handelDelete = async (name: string) => {
    try {
      const response = await fetch(
        "/api/users/subscriptions/delete-subscriptions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
          }),
        }
      );
      if (response.ok) {
        toast.success("Subscription Delete Successfully");
      } else {
        toast.error("An error occurred while deleting subscription");
      }
    } catch (error) {
      console.error("An error occurred while deleting Subscriptions:", error);
    }
    setLoadData(true);
  };

  return (
    <div className="card  bg-white shadow-xl m-5 w-[250px] h-fit p-5">
      <div className="flex flex-col justify-center items-center">
        <h1 className="uppercase text-xl font-bold text-black">{name}</h1>
        <h1 className="uppercase text-4xl font-bold text-blue-500 py-2">
          ${price}.00
        </h1>
        <h1 className="card-title text-2xl text-[#504C4D] font-light capitalize">
          /{subscriptionType}
        </h1>
        <ul className="py-2 ">
          <li>Open {shopCount} Shops</li>
          {des.map((line) => (
            <li key={line.id}>{line.value}</li>
          ))}
        </ul>
      </div>
      <div
        onClick={() => handelDelete(name)}
        className="btn text-white text-base hover:scale-105 border-0 bg-red-500 py-2 #fc0000]"
      >
        Delete
      </div>
    </div>
  );
};

export default InfoCardCom;
