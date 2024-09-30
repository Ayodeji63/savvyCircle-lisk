import { client } from '@/app/client';
import { Icons } from '@/components/common/icons'
import { Label } from '@/components/ui/label'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { useAuthContext } from '@/context/AuthContext';
import { contractAddress } from '@/contract';
import { amounts, cn, groups } from "@/lib/utils";

import React, { useEffect, useState } from 'react'
import { defineChain, getContract } from 'thirdweb';
import { useActiveAccount, useReadContract } from 'thirdweb/react';
import { formatEther } from 'viem';

interface GroupProps {
    id: bigint
}
const liskSepolia = defineChain(534351);


const GroupRadio: React.FC<GroupProps> = ({ id }) => {

    const account = useActiveAccount();
    const [groupInfo, setGroupInfo] = useState<any>([]);
    const { depositAmount, setDepositAmount, setGroupId } = useAuthContext();

    const contract = getContract({
        client: client,
        chain: liskSepolia,
        address: contractAddress,
    });

    const {
        data: groupData,
        isLoading: idLoading,
        refetch: refetchGroupData,
    } = useReadContract({
        contract,
        method:
            "function groups(int256) returns (uint256,uint256,uint256,uint256,uint256,bool,bool,bool,uint256,string,address,uint256)",
        params: [id],
    });

    useEffect(() => {
        setGroupInfo(groupData);
    }, [groupData]);
    // {
    //     "bg-[#BDEBA1]": Number(value) === Number(index)
    // },

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

    const onClick = () => {
        setDepositAmount(Number(formatEther(groupInfo[0])));
        setGroupId(id);
    }
    return (
        <div>
            {groupInfo && (<div onClick={() => onClick()} key={`groups-${Number(id)}`}>
                <RadioGroupItem
                    value={String(id)}
                    id={String(id)}
                    className="hidden"

                />
                <Label>
                    <div
                        className={cn(
                            "space-y-8 rounded-[8px] border border-[#D7D9E4] bg-white p-4 shadow-[0px_4px_8px_0px_#0000000D] hover:bg-[#BDEBA1] active:bg-[#BDEBA1]"

                        )}
                    >
                        <Icons.bitcoinBag className="h-10 w-10" />
                        <div className="space-y-1 font-normal">
                            <p className="text-xs leading-[14px] text-[#098C28]">
                                # {groupInfo[0] ? formatViemBalance(groupInfo[0]) : 0}
                            </p>
                            <p className="text-base leading-[18px] text-[#0A0F29]">
                                {groupInfo[8]}
                            </p>
                        </div>
                    </div>
                </Label>
            </div>)}
        </div>
    )
}

export default GroupRadio