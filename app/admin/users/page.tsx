"use client";

/* eslint-disable react-hooks/rules-of-hooks */

import TableRow from "./TableRow";
import { useEffect, useState } from "react";
import SkeletonCom from "@/app/components/shared/SkeletonCom";
import { Toaster } from "react-hot-toast";

const page = () => {
  const [users, setUsers] = useState<[]>([]);
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
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [loadData]);

  return (
    <div className="p-5 m-5 bg-white rounded-2xl w-ful">
      <Toaster />
      <div className="flex justify-between items-center mb-5 p-5">
        <h1 className="mb-5 text-black text-2xl font-extrabold">Users List</h1>
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
  );
};

export default page;
