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
import Link from "next/link";
import { routes } from "@/lib/routes";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface GroupProps {
    id: bigint;
    isHovered: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const GroupRadio: React.FC<GroupProps> = ({ id, isHovered, onMouseEnter, onMouseLeave }) => {
    const [groupInfo, setGroupInfo] = useState<any>([]);
    const { setDepositAmount, setGroupId } = useAuthContext();
    const router = useRouter();

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
        if (groupData) {
            setGroupInfo(groupData);
        }
    }, [groupData, setGroupInfo]);

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
            onMouseEnter={(e) => {
                e.stopPropagation();
                onMouseEnter();
            }}
            onMouseLeave={(e) => {
                e.stopPropagation();
                onMouseLeave();
            }}
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
                                "space-y-8 rounded-[8px] border border-[#D7D9E4] bg-white p-4 shadow-[0px_4px_8px_0px_#0000000D]",
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
                    <Sheet>
                        <SheetTrigger asChild>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                className="mr-2 rounded-full bg-green-500 p-2 text-white hover:bg-green-600"
                            >
                                <PlusCircle size={24} />
                            </button>
                        </SheetTrigger>
                        <SheetContent
                            side="bottom"
                            className="rounded-tl-[50px] rounded-tr-[50px]"
                        >
                            <SheetHeader>
                                <SheetTitle>Make Deposit</SheetTitle>
                                <SheetDescription className="pb-32">
                                    <form className="space-y-5">
                                        <div>
                                            <Input
                                                placeholder="Enter the amount you want to repay"
                                                className="tect-base font-medium text-[#696F8C] placeholder:text-[#696F8C]"
                                            />
                                        </div>
                                        <div className="flex items-center justify-center gap-x-5">
                                        </div>
                                        <Button className="bg-[#4A9F17]">Deposit</Button>
                                    </form>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                    {/* <Link href={routes.groupById(id.toString())}> */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log("I'm ");
                            router.push(routes.groupById(id.toString()))

                        }}
                        className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600"
                    >
                        <Info size={24} />
                    </button>
                    {/* </Link> */}
                </div>
            )}
        </div>
    );
};

export default GroupRadio;