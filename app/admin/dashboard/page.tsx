"use client";

/* eslint-disable react-hooks/rules-of-hooks */
import InfoCardCom from "./InfoCardCom";
import StoreCardCom from "../../components/cards/StoreCardCom";
import TotalSalesIcon from "../../../public/icons/totalsalesicon.svg";
import { useEffect, useState } from "react";
import SubscriptionsCardCom from "./SubscriptionsCardCom";
import SkeletonCom from "@/app/components/shared/SkeletonCom";
import { Toaster } from "react-hot-toast";
import TableRow from "./TableRow";

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
  //all users state
  const [users, setUsers] = useState<[]>([]);
  //all subscriptions state
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);
  //all subscriptions data loading state
  const [loadData, setLoadData] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/users", {
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
        //total user
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);
  // Function to calculate total price
  const calculateTotalPrice = (users: any) => {
    let totalPrice = 0;
    // Iterate over each user data
    users.forEach((user: { subscription: { price: any } }) => {
      // Check if user data has subscription information
      if (user.subscription && typeof user.subscription.price === "string") {
        // Add subscription price to total price
        totalPrice += Number(user.subscription.price);
      }
    });
    return totalPrice;
  };
  // Function to calculate paid users
  const calculatePaidUsers = (users: any) => {
    let paidUsersCount = 0;

    // Iterate over each user data
    users.forEach((user: { subscription: any }) => {
      // Check if user has a subscription
      if (user.subscription) {
        paidUsersCount++;
      }
    });

    return Number(paidUsersCount);
  };
  // Function to calculate unpaid users
  const calculateUnpaidUsers = (users: any) => {
    let unpaidUsersCount = 0;

    // Iterate over each user data
    users.forEach((user: { subscription: any }) => {
      // Check if user does not have a subscription
      if (!user.subscription) {
        unpaidUsersCount++;
      }
    });

    return unpaidUsersCount;
  };

  //subscriptions data load

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

  return (
    <div className="min-h-[100vh] w-full">
      {/*SALES INFO SECTION START */}
      <div className="bg-white p-5 mb-5 m-5 rounded-2xl  ">
        <h1 className="text-2xl text-black font-bold p-5">Overview</h1>
        <div className="w-full h-full inline-grid grid-cols-4 gap-8 ">
          <InfoCardCom
            label="Total Users"
            icon={TotalSalesIcon}
            amount={Number(users.length)}
            bgGradient="text-white bg-gradient-to-r from-[#454CEA] to-[#5596CF]"
          />
          <InfoCardCom
            label="Total Sales"
            icon={TotalSalesIcon}
            amount={calculateTotalPrice(users)}
            bgGradient="text-white bg-gradient-to-r from-[#F85900] to-[#FAC250]"
          />
          <InfoCardCom
            label="Paid Users"
            icon={TotalSalesIcon}
            amount={calculatePaidUsers(users)}
            bgGradient="text-white bg-gradient-to-r from-[#50dc18] to-[#6593ff]"
          />
          <InfoCardCom
            label="Unpaid Users"
            icon={TotalSalesIcon}
            amount={calculateUnpaidUsers(users)}
            bgGradient="text-white bg-gradient-to-r from-[#DC1818] to-[#FF6565]"
          />
        </div>
      </div>
      {/*Subscriptions list INFO SECTION START */}
      <div className="bg-white p-5 mb-5 m-5 rounded-2xl  ">
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
      {/* all user section */}
      <div className="p-5 m-5 bg-white rounded-2xl w-ful">
        <Toaster />
        <div className="flex justify-between items-center mb-5 p-5">
          <h1 className="mb-5 text-black text-2xl font-extrabold">
            Users List
          </h1>
        </div>
        <div>
          <div className="p-5 m-2 rounded-2xl overflow-auto">
            {users.length >= 0 && (
              <table className="table w-full ">
                {/* head */}
                <thead className="text-[#6C696A] border border-[#F2F2F2] text-base bg-[#f8f8f8] border-b-2  min-h-screen">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Business Name</th>
                    <th>Business Category</th>
                    <th>Payment status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="text-black text-md border rounded-lg border-[#F2F2F2] ">
                  {users.map((user) => (
                    <TableRow key={1} user={user} setLoadData={setLoadData} />
                  ))}
                </tbody>
              </table>
            )}
            {users.length === 0 && <SkeletonCom />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
