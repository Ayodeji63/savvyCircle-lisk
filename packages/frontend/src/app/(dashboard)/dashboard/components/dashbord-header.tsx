import IconElement from "@/components/common/icon-element";
import { Icons } from "@/components/common/icons";
import PageWrapper from "@/components/common/page-wrapper";
import {
  ArrowDownLeft,
  ArrowDownUp,
  ArrowRightLeft,
  CreditCard,
  LucideIcon,
  Menu,
  MoreHorizontal,
  Plus,
  PlusCircle,
  Snowflake,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { dashboardNavigation } from "./extras";
import { getContract } from "thirdweb";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { client } from "@/app/client";
import { abi, contractAddress } from "@/contract";
import { defineChain } from "thirdweb/chains";
import { tokenAbi, tokenAddress } from "@/token";
import { formatEther } from "viem";
import React, { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { contractInstance, tokenContract } from "@/lib/libs";

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon: Icon, label }) => (
  <div className="flex flex-col items-center">
    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
      <Icon className="text-green-600" size={20} />
    </div>
    <span className="text-sm text-gray-600">{label}</span>
  </div>
);

const DashboardHeader = () => {
  const account = useActiveAccount();
  const { userGroupId, setUserGroupId } = useAuthContext();

  const {
    data: _userGroupId,
    isLoading: idLoading,
    refetch: refectUserGroupId,
  } = useReadContract({
    contract: contractInstance,
    method: "function getUserGroups(address) returns (int256[])",
    params: [account?.address ?? "0x00000000"],
  });
  useEffect(() => {
    if (account?.address) {
      refectUserGroupId();
    }
  }, [account?.address]);

  useEffect(() => {
    if (_userGroupId) {
      const mutableUserGroupId = [..._userGroupId];
      setUserGroupId(mutableUserGroupId);
    }
  }, [_userGroupId]);
  console.log(_userGroupId);

  function formatViemBalance(balance: bigint): string {
    // Convert the balance to a number
    const balanceInEther = parseFloat(formatEther(balance));

    // Format the number with commas
    const formattedBalance = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(balanceInEther);

    // Add magnitude representation for millions and thousands
    if (balanceInEther >= 1000000) {
      return `${formattedBalance}`;
    } else if (balanceInEther >= 1000) {
      return `${formattedBalance}`;
    } else {
      return formattedBalance;
    }
  }

  const { data: userBalance, isLoading: tokenBalanceLoading } = useReadContract(
    {
      contract: tokenContract,
      method: "function balanceOf(address) returns (uint256)",
      params: account ? [account.address] : ["0x"],
    },
  );

  const { data, isLoading } = useReadContract({
    contract: contractInstance,
    method: "function LOAN_DURATION() returns (uint256)",
    params: [],
  });

  console.log("Data is given as", data);
  console.log("Wallet is given as", account?.address);
  console.log("User Token balance is ", userBalance);
  return (
    <div className="fixed grid h-[192px] w-full place-items-center rounded-bl-[30px] rounded-br-[30px] bg-[#4A9F17]">
      <header className="relative w-full text-white">
        <PageWrapper>
          <div className="flex items-center justify-between pb-[14px]">
            <div className="flex items-center gap-x-2">
              {/* <Icons.logo className="h-[29px] w-[33px]" />
              <p className="text-base font-medium">SavvyCircle</p> */}
              <p className="text-2xl font-bold">Welcome</p>
            </div>
            <button>
              <Menu />
            </button>
          </div>
          <div className="flex w-full items-center justify-between space-y-1">
            <div>
              <p className="text-xs font-normal leading-[14px]">
                Current saving balance
              </p>

              <p className="text-lg font-semibold leading-6">
                {formatViemBalance(userBalance ?? BigInt(200000000000)) ??
                  `200,000`}{" "}
              </p>
            </div>

            {/* <button className="bg-lime-400 text-black px-4 py-2 rounded-full flex items-center">
              <Plus size={14} className="mr-1" /> Add
            </button> */}
          </div>
        </PageWrapper>
        <PageWrapper className="absolute left-0 right-0 mt-5 grid h-[76px] w-[85%] grid-cols-3 items-center justify-center rounded-[8px] border border-[#D7D9E4] bg-[#F8FDF5] shadow-[0px_4px_8px_0px_#0000000D]">
          {dashboardNavigation.map((navigation, index) => (
            <Link key={`dashboard-navigation-${index}`} href={navigation.route}>
              <div className="flex flex-col items-center space-y-[2px]">
                <IconElement iconName={navigation.icon} />
                <p className="text-xs font-normal leading-[14px] text-[#696F8C]">
                  {navigation.text}
                </p>
              </div>
            </Link>
          ))}
        </PageWrapper>
        <PageWrapper className="absolute left-0 right-0 mt-5 rounded-lg bg-white p-4 shadow-md">
          <div className="flex justify-between">
            <ActionButton icon={Wallet} label="Top Up" />
            {/* <ActionButton icon={CreditCard} label="Card Detail" /> */}
            {/* <ActionButton icon={PlusCircle} label="Add Card" />
            <ActionButton icon={Snowflake} label="Freeze" /> */}
            <ActionButton icon={ArrowDownLeft} label="Withdraw" />
            <ActionButton icon={ArrowRightLeft} label="Transfer" />
            <ActionButton icon={MoreHorizontal} label="More" />
          </div>
        </PageWrapper>
        {/* <div className="bg-white p-4 rounded-lg shadow-md">
          
        </div> */}
      </header>
    </div>
  );
};

export default DashboardHeader;
