import React, { useEffect, useState } from "react";
import { useReadContract } from "thirdweb/react";
import { formatEther } from "viem";
import { Icons } from "@/components/common/icons";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { useAuthContext } from "@/context/AuthContext";
import { contractInstance } from "@/lib/libs";
import { cn } from "@/lib/utils";
import { PlusCircle, Info } from "lucide-react";

interface GroupProps {
  id: bigint;
  // onDeposit: (id: bigint) => void;
  // onViewDetails: (id: bigint) => void;
}

const GroupRadio: React.FC<GroupProps> = ({ id }) => {
  const [groupInfo, setGroupInfo] = useState<any>([]);
  const { setDepositAmount, setGroupId } = useAuthContext();
  const [isHovered, setIsHovered] = useState(false);
  function onDeposit() {
    console.log(id);
  }

  function onViewDetails() {
    console.log(id);
  }

  const {
    data: groupData,
    isLoading: idLoading,
    refetch: refetchGroupData,
  } = useReadContract({
    contract: contractInstance,
    method:
      "function groups(int256) returns (uint256,uint256,uint256,uint256,uint256,bool,bool,bool,uint256,string,address,uint256)",
    params: [id],
  });

  useEffect(() => {
    setGroupInfo(groupData);
  }, [groupData]);

  function formatViemBalance(balance: bigint): string {
    const balanceInEther = parseFloat(formatEther(balance));
    const formattedBalance = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(balanceInEther);

    if (balanceInEther >= 1000000) {
      return `${formattedBalance}`;
    } else if (balanceInEther >= 1000) {
      return `${formattedBalance}`;
    } else {
      return formattedBalance;
    }
  }

  const onClick = () => {
    setDepositAmount(Number(formatEther(groupInfo[0])));
    setGroupId(id);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      {groupInfo && (
        <div onClick={onClick} key={`groups-${Number(id)}`}>
          <RadioGroupItem
            value={String(id)}
            id={String(id)}
            className="hidden"
          />
          <Label>
            <div
              className={cn(
                "space-y-8 rounded-[8px] border border-[#D7D9E4] bg-white p-4 shadow-[0px_4px_8px_0px_#0000000D] hover:bg-[#BDEBA1] active:bg-[#BDEBA1]",
              )}
            >
              <Icons.bitcoinBag className="h-10 w-10" />
              <div className="space-y-1 font-normal">
                <p className="text-xs leading-[14px] text-[#098C28]">
                  # {groupInfo[0] ? formatViemBalance(groupInfo[0]) : 0}
                </p>
                <p className="text-base font-semibold leading-[18px] text-[#0A0F29]">
                  {groupInfo[9]}
                </p>
              </div>
            </div>
          </Label>
        </div>
      )}
      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center rounded-[8px] bg-black bg-opacity-50">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeposit();
            }}
            className="mr-2 rounded-full bg-green-500 p-2 text-white hover:bg-green-600"
          >
            <PlusCircle size={24} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
            className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600"
          >
            <Info size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default GroupRadio;
