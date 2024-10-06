"use client";

import { Icons } from "@/components/common/icons";
import PageWrapper from "@/components/common/page-wrapper";
import ElementList from "@/components/misc/element-list";
import Link from "next/link";
import DashboardHeader from "./components/dashbord-header";
import { getContract } from "thirdweb";
import { client } from "@/app/client";
import { defineChain } from "thirdweb/chains";
import { abi, contractAddress } from "@/contract";
import { useAuthContext } from "@/context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import { useFetchGroup } from "@/hooks/useFetchGroup";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import Group from "./components/group";

import { routes } from "@/lib/routes";
import {
  ArrowDown,
  ArrowUp,
  ChevronRight,
  Plus,
  RefreshCcw,
} from "lucide-react";
import FloatingNavBar from "@/app/Navbar";
import { Button } from "antd";
// import EmptyState from "@/components/common/empty-state";

const DashboardPage = () => {
  const liskSepolia = defineChain(534351);
  // const { userGroupId } = useAuthContext()
  const account = useActiveAccount();
  const [userGroup, setUserGroup] = useState<any>([]);

  const contract = getContract({
    client: client,
    chain: liskSepolia,
    address: contractAddress,
    abi: abi,
  });

  const {
    data: _userGroupId,
    isLoading: idLoadings,
    refetch: refectUserGroupId,
  } = useReadContract({
    contract,
    method: "function getUserGroups(address) returns (int256[])",
    params: [account?.address ?? "0x00000000"],
  });

  // const groupInfo = useCallback()
  console.log(_userGroupId);

  return (
    <main className="min-h-screen">
      <DashboardHeader />
      <PageWrapper className="mt-[238px] space-y-5 pb-[34px]">
        {/* <section className="space-y-2">
          <h1 className="py-4 text-base font-medium leading-[18px] text-[#0A0F29]">
            Saving groups
          </h1>
          {Array.isArray(_userGroupId) && _userGroupId.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {_userGroupId.map((id) => (
                <Group key={id.toString()} id={id} />
              ))}
            </div>
          ) : (
            <div>
              <p>Join a group in the telegram</p>
            </div>
          )}
        </section> */}

        <div className="mb-4 mt-[300px] flex items-center justify-between rounded-xl bg-gray-800 p-4 text-white">
          <div>
            <h3 className="font-semibold">Check credit score</h3>
            <p className="text-sm text-gray-400">
              See Your Credit Report Absolutely Free
            </p>
          </div>
          <ChevronRight />
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-lg font-semibold text-gray-800">
            Loan Application Status
          </h2>
          <div className="rounded-lg bg-yellow-100 p-3">
            <p className="text-sm text-yellow-800">
              Your loan application is under review
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-lg font-semibold text-gray-800">
            Financial Goal
          </h2>
          <div className="rounded-lg bg-blue-100 p-3">
            <p className="text-sm text-blue-800">
              Save #1,000,000 by December 2024
            </p>
            <div className="mt-2 h-2.5 w-full rounded-full bg-blue-200">
              <div
                className="h-2.5 rounded-full bg-blue-600"
                style={{ width: "45%" }}
              ></div>
            </div>
          </div>
        </div>

        <section className="space-y-2">
          <h1 className="text-base font-medium leading-[18px] text-[#0A0F29]">
            Recent Transactions
          </h1>
          {/* <EmptyState text="Transaction details go here" /> */}
          <ElementList itemsCount={2} rootClassName="grid gap-y-1">
            <div className="flex items-center justify-between rounded-[8px] border border-[#D7D9E4] bg-white px-4 py-5 shadow-[0px_4px_8px_0px_#0000000D]">
              <div className="flex items-center gap-x-3">
                <Icons.bitcoinBag className="h-10 w-10" />
                <div>
                  <p className="text-base font-normal leading-[18px] text-[#0A0F29]">
                    Group 3
                  </p>
                  <p className="text-xs font-normal leading-[14px] text-[#696F8C]">
                    Today at 12:45pm
                  </p>
                </div>
              </div>
              <div>
                <p className="text-base font-medium leading-[18px] text-[#0A0F29]">
                  #10,000
                </p>
                <p className="flex justify-end text-xs font-normal leading-[14px] text-[#098C28]">
                  Deposit
                </p>
              </div>
            </div>
          </ElementList>
        </section>
      </PageWrapper>
    </main>
  );
};

export default DashboardPage;

// import React from 'react';
// import Image from 'next/image';
// import { Eye, ChevronRight, Home, PieChart, Plus, Bell, Menu } from 'lucide-react';

// export default function DashboardPage() {
//   return (
//     <div className="min-h-screen bg-gray-100 p-4 max-w-md mx-auto">
//       <header className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Welcome</h1>
//         <div className="w-10 h-10 rounded-full bg-pink-200 overflow-hidden">
//           <Image src="/profile-pic.jpg" alt="Profile" width={40} height={40} />
//         </div>
//       </header>

//       <div className="bg-white rounded-xl p-4 shadow mb-4">
//         <p className="text-sm text-gray-500 mb-1">Total Available</p>
//         <div className="flex justify-between items-center">
//           <h2 className="text-2xl font-bold">$32,521.00</h2>
//           <Eye className="text-gray-400" />
//         </div>
//         <div className="flex mt-4 space-x-2">
//           <button className="bg-lime-400 text-black px-4 py-2 rounded-full flex items-center">
//             <Plus size={18} className="mr-1" /> Add
//           </button>
//           <button className="bg-gray-200 text-black px-4 py-2 rounded-full">
//             Request
//           </button>
//           <button className="bg-gray-200 text-black px-4 py-2 rounded-full">
//             ...
//           </button>
//         </div>
//       </div>

// <div className="bg-gray-800 text-white rounded-xl p-4 mb-4 flex justify-between items-center">
//   <div>
//     <h3 className="font-semibold">Check credit score</h3>
//     <p className="text-sm text-gray-400">See Your Credit Report Absolutely Free</p>
//   </div>
//   <ChevronRight />
// </div>

//       <div className="mb-4">
//         <div className="flex justify-between items-center mb-2">
//           <h3 className="font-semibold">Savings</h3>
//           <span className="text-sm text-gray-500">All</span>
//         </div>
//         <div className="bg-white rounded-xl p-4 shadow flex justify-between items-center">
//           <div>
//             <h4 className="font-semibold">New Home</h4>
//             <p className="text-sm text-gray-500">Ends: 9 Dec, 2023</p>
//           </div>
//           <div className="flex items-center">
//             <span className="text-lg font-bold mr-2">$8,460.00</span>
//             <div className="w-10 h-10 rounded-full bg-yellow-200 overflow-hidden">
//               <Image src="/home-icon.jpg" alt="Home" width={40} height={40} />
//             </div>
//           </div>
//         </div>
//       </div>

//       <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
//         <ul className="flex justify-between">
//           <li className="flex flex-col items-center">
//             <Home size={24} className="text-blue-500" />
//             <span className="text-xs mt-1">Home</span>
//           </li>
//           <li className="flex flex-col items-center">
//             <PieChart size={24} className="text-gray-400" />
//             <span className="text-xs mt-1">Insights</span>
//           </li>
//           <li className="flex flex-col items-center">
//             <Plus size={24} className="text-gray-400" />
//             <span className="text-xs mt-1">Add</span>
//           </li>
//           <li className="flex flex-col items-center">
//             <Bell size={24} className="text-gray-400" />
//             <span className="text-xs mt-1">Notifications</span>
//           </li>
//           <li className="flex flex-col items-center">
//             <Menu size={24} className="text-gray-400" />
//             <span className="text-xs mt-1">More</span>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// }
