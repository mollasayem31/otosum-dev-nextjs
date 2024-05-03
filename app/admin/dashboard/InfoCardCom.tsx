import type { NextComponentType, NextPageContext } from "next";
import Image from "next/image";

interface Props {
  label: string;
  icon: string;
  amount: number;
  bgGradient: string;
}

const InfoCardCom: NextComponentType<NextPageContext, {}, Props> = ({
  label,
  icon,
  amount,
  bgGradient,
}: Props) => {
  return (
    // min-w-[330px] min-h-[137px]
    <div
      className={`card card-side min-w-[200px] min-h-[100px]  pr-5 ${bgGradient} bg-black text-white fill-black shadow-xl capitalize`}
    >
      <div className="card-body">
        <h1 className="font-bold text-md">{label}</h1>
        <div className="font-bold text-4xl">
          {amount === 0 ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <span>{amount}</span>
          )}
        </div>
      </div>
      <figure>
        <Image src={icon} alt="alt" width={100} height={100} />
      </figure>
    </div>
  );
};

export default InfoCardCom;
