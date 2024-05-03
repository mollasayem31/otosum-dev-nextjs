import type { NextComponentType, NextPageContext } from "next";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
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
}

const InfoCardCom: NextComponentType<NextPageContext, {}, Props> = ({
  subscription,
}: Props) => {
  const { subscriptionType, name, price, shopCount, des, paymentLInk } =
    subscription;

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
      <Link
        href={paymentLInk}
        className="btn text-white text-base hover:scale-105 border-0 bg-gradient-to-r py-2 from-[#438FFD] to-[#00FC44] form-submit"
      >
        Subscribe
      </Link>
    </div>
  );
};

export default InfoCardCom;
