/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { FormEvent, SetStateAction, useState } from "react";
import { Plus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useBusinessNameContext } from "@/app/context/businessNameContext";
import DropDownCom from "./DropDownCom";

const page = () => {
  const [subscriptionType, setSubscriptionType] = useState<string | null>(
    "monthly"
  );
  const handleAddExpenses = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      const response = await fetch("/api/users/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          price: formData.get("price"),
          subscriptionType: subscriptionType,
          shopCount: formData.get("shopCount"),
          paymentLink: formData.get("paymentLink"),
          des: [
            { id: 1, value: formData.get("descriptionLine1") },
            { id: 2, value: formData.get("descriptionLine2") },
            { id: 3, value: formData.get("descriptionLine3") },
            { id: 4, value: formData.get("descriptionLine4") },
          ],
        }),
      });
      if (response.ok) {
        toast.success("Subscriptions added successfully");
      } else {
        toast.error("An error occurred while adding Subscriptions");
      }
    } catch (error) {
      console.error("An error occurred while adding Subscriptions:", error);
    }
  };

  return (
    <div className="bg-white p-10 mx-5 rounded-xl">
      <Toaster />
      <div>
        <h1 className="text-2xl font-bold text-black">Add Subscription</h1>
        <p>Create new subscription</p>
      </div>
      <form action="" onSubmit={handleAddExpenses} className="mt-10">
        <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-black mt-10">
          <div className="flex flex-col gap-4   ">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Subscription name"
              className=" border-2 border-[#BBBABA] rounded-lg py-3 px-5 outline-none bg-transparent focus:border-black"
            />
          </div>
          {/* <div className="flex flex-col gap-4   ">
            <label htmlFor="date">Date</label>
            <DatePickerCom date={date} setDate={setDate} />
          </div> */}
          <div className="flex flex-col gap-4   ">
            <label htmlFor="address">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter Subscription Price"
              className=" border-2 border-[#BBBABA] rounded-lg py-3 px-5 outline-none bg-transparent focus:border-black"
            />
          </div>
          <div className="flex flex-col gap-4   ">
            <label htmlFor="type">Type</label>
            <DropDownCom
              selectedItem={subscriptionType}
              setSelectedItem={setSubscriptionType}
              items={[
                {
                  id: 1,
                  value: "trial",
                },
                {
                  id: 2,
                  value: "weekly",
                },
                {
                  id: 3,
                  value: "monthly",
                },
              ]}
            />
          </div>
          <div className="flex flex-col gap-4   ">
            <label htmlFor="shopCount">Number Of Shop</label>
            <input
              type="number"
              id="shopCount"
              name="shopCount"
              placeholder="Enter Number Of Shop"
              className=" border-2 border-[#BBBABA] rounded-lg py-3 px-5 outline-none bg-transparent focus:border-black"
            />
          </div>
          <div className="flex flex-col gap-4   ">
            <label htmlFor="paymentLink"> Payment Link (Stripe)</label>
            <input
              type="text"
              id="paymentLink"
              name="paymentLink"
              placeholder="Enter Stripe Payment Link"
              className=" border-2 border-[#BBBABA] rounded-lg py-3 px-5 outline-none bg-transparent focus:border-black"
            />
          </div>
          <div className="flex flex-col gap-4   ">
            <label htmlFor="descriptionLine1"> Description Line 1</label>
            <input
              type="text"
              id="descriptionLine1"
              name="descriptionLine1"
              placeholder="Enter Subscription Details"
              className=" border-2 border-[#BBBABA] rounded-lg py-3 px-5 outline-none bg-transparent focus:border-black"
            />
          </div>
          <div className="flex flex-col gap-4   ">
            <label htmlFor="descriptionLine2">Description Line 2</label>
            <input
              type="text"
              id="descriptionLine2"
              name="descriptionLine2"
              placeholder="Enter Subscription Details"
              className=" border-2 border-[#BBBABA] rounded-lg py-3 px-5 outline-none bg-transparent focus:border-black"
            />
          </div>
          <div className="flex flex-col gap-4   ">
            <label htmlFor="descriptionLine3">Description Line 3</label>
            <input
              type="text"
              id="descriptionLine3"
              name="descriptionLine3"
              placeholder="Enter Subscription Details"
              className=" border-2 border-[#BBBABA] rounded-lg py-3 px-5 outline-none bg-transparent focus:border-black"
            />
          </div>
          <div className="flex flex-col gap-4   ">
            <label htmlFor="descriptionLine4">Description Line 4</label>
            <input
              type="text"
              id="descriptionLine4"
              name="descriptionLine4"
              placeholder="Enter Subscription Details"
              className=" border-2 border-[#BBBABA] rounded-lg py-3 px-5 outline-none bg-transparent focus:border-black"
            />
          </div>
        </div>
        {/* BUTTON SECTION */}
        <div className="flex justify-start items-end my-5">
          <button
            type="submit"
            className="btn mr-2 text-white text-base hover:scale-105 border-0 bg-gradient-to-r py-2 from-[#438FFD] to-[#00FC44] form-submit"
          >
            <span className="font-bold">
              <Plus />
            </span>
            <span>Add Subscription</span>
          </button>
          <button
            type="reset"
            className="btn mx-2 bg-transparent py-0 px-8 border-2 hover:scale-105 border-[#BBBABA] form-submit text-black text-base hover:bg-transparent"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default page;
