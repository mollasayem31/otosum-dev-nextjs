// TableRow.tsx
import { Trash2 } from "lucide-react";
import { NextComponentType, NextPageContext } from "next";
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

interface IImage {
  fileImage: string;
  fileName: string;
}
interface IUser {
  name: string;
  email: string;
  password: string;
  businessName: string;
  category: string;
  role: string;
  subscription: ISubscription;
  img?: IImage;
}

interface Props {
  user: IUser;
  setLoadData: Dispatch<SetStateAction<boolean>>;
}

const TableRow: NextComponentType<NextPageContext, {}, Props> = ({
  user,
  setLoadData,
}) => {
  const { name, email, businessName, category, subscription, img } = user;

  const handelDelete = async (email: string) => {
    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      if (response.ok) {
        toast.success("User Delete Successfully");
      } else {
        toast.error("An error occurred while deleting user");
      }
    } catch (error) {
      console.error("An error occurred while deleting Subscriptions:", error);
    }
    setLoadData(true);
  };

  return (
    <tr className="border border-[#F2F2F2] text-start ">
      <td>{name}</td>
      <td>{email}</td>
      <td>{businessName}</td>
      <td>{category}</td>
      <td
        className={`${
          subscription ? "text-green-500" : "text-red-500"
        } font-bold`}
      >
        {subscription ? "Paid" : "Unpaid"}
      </td>
      <th>
        <div
          tabIndex={0}
          className="flex items-center gap-3 justify-start text-start"
        >
          <div
            onClick={() => handelDelete(email)}
            className="hover:text-red-500 hover:scale-110"
          >
            <Trash2 />
          </div>
        </div>
      </th>
    </tr>
  );
};

export default TableRow;
