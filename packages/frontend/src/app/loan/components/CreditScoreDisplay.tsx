import { createTransaction } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useAuthContext } from "@/context/AuthContext";
import { contractAddress } from "@/contract";
import { contractInstance, formatViemBalance, tokenContract } from "@/lib/libs";
import { findUserTransactions } from "@/lib/user";
import { transactionSchema } from "@/types/utils";
import { notification } from "@/utils/notification";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { formatEther, parseEther } from "viem";

const CreditScorePage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { setGroupId, user, setTransactions } = useAuthContext();
    const [repayAmount, setRepayAmount] = useState("");

    const account = useActiveAccount();

    const {
        data: creditScore,
        isLoading: idLoadings,
        refetch: refectUserGroupId,
    } = useReadContract({
        contract: contractInstance,
        method: "function getCreditScore(address) returns (uint256)",
        params: [account?.address ?? "0x00000000"],
    });

    const {
        data: maxloanAmount,
        isLoading: isLoadings,
        refetch: refetchMaxLoanAmount,
    } = useReadContract({
        contract: contractInstance,
        method: "function getMaxLoanAmount(address) returns (uint256)",
        params: [account?.address ?? "0x00000000"],
    });

    const {
        data: loanInterestRate,
        isLoading: isLoadingsRate,
        refetch: refetchMaxLoanInterestRate,
    } = useReadContract({
        contract: contractInstance,
        method: "function getLoanInterestRate(address) returns (uint256)",
        params: [account?.address ?? "0x00000000"],
    });

    const {
        data: flexloan,
        isLoading: isLoadingLoan,
        refetch: refetchFlexLoan,
    } = useReadContract({
        contract: contractInstance,
        method: "function flexLoans(address) returns (uint256)",
        params: [account?.address ?? "0x00000000"],
    });

    const [loanAmount, setLoanAmount] = useState(
        Number(formatEther(maxloanAmount ? maxloanAmount : BigInt(0))),
    );
    // const creditScore = 3; // Example low score
    console.log(formatEther(flexloan ?? BigInt(0)));

    const borrow = async () => {
        try {
            setIsLoading(true);
            const transaction = prepareContractCall({
                contract: contractInstance,
                method: "function requestFlexLoan(uint256)",
                params: [parseEther(String(loanAmount))],
            });

            if (!account) return;
            const waitForReceiptOptions = await sendTransaction({
                account,
                transaction,
            });
            console.log(waitForReceiptOptions);
        } catch (error) {
            console.log(error);
            notification.error("An error occured!");
            setIsLoading(false);
        }
    };

    const repay = async (e: any) => {
        e.preventDefault();
        console.log(e.target.value);
        try {
            const transaction = prepareContractCall({
                contract: tokenContract,
                method: "function approve(address, uint256) returns(bool)",
                params: [contractAddress, parseEther(String(repayAmount))],
            });

            if (!account) return;
            const waitForReceiptOptions = await sendTransaction({
                account,
                transaction,
            });
            console.log(waitForReceiptOptions);
        } catch (error) {
            console.log(error);
        }
        try {
            setIsLoading(true);
            const transaction = prepareContractCall({
                contract: contractInstance,
                method: "function repayFlexLoan(uint256)",
                params: [parseEther(String(repayAmount))],
            });

            if (!account) return;
            const waitForReceiptOptions = await sendTransaction({
                account,
                transaction,
            });
            console.log(waitForReceiptOptions);
            notification.success("Transaction Successful!");
            setIsLoading(false);
            const params: transactionSchema = {
                fromAddress: String(user?.username),
                toAddress: "Flex Loan",
                amount: String(repayAmount),
                type: "Repay Loan",
                transactionHash: String(waitForReceiptOptions.transactionHash),
                status: "success",
            };
            await createTransaction(params);
            const tx = await findUserTransactions(user?.username ?? "");
            setIsLoading(false);
            refetchFlexLoan();
        } catch (error) {
            console.log(error);
            notification.error("An error occured");
            setIsLoading(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 800) return "#4CAF50";
        if (score >= 700) return "#8BC34A";
        if (score >= 600) return "#FFC107";
        return "#F44336";
    };

    const getScoreLabel = (score: number) => {
        if (score >= 800) return "Excellent";
        if (score >= 700) return "Good";
        if (score >= 600) return "Fair";
        return "Poor";
    };

    // Calculate the SVG path for a perfect semicircle
    const createSemicirclePath = () => {
        const centerX = 100;
        const centerY = 90;
        const radius = 80;

        // Create a perfect semicircle path
        return `M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`;
    };

    const semicirclePath = createSemicirclePath();
    const pathLength = 251.2; // Length of the path for strokeDasharray

    return (
        <div className="flex min-h-screen flex-col bg-gray-100">
            <main className="container mx-auto max-w-3xl flex-grow space-y-6 px-4 py-6">
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-semibold">Your Credit Score</h2>
                    <div className="relative">
                        <svg className="w-full" viewBox="0 0 200 120">
                            {/* Background track */}
                            <path
                                d={semicirclePath}
                                fill="none"
                                stroke="#e0e0e0"
                                strokeWidth="16"
                                strokeLinecap="round"
                            />

                            {/* Colored progress arc */}
                            <path
                                d={semicirclePath}
                                fill="none"
                                stroke={getScoreColor(Number(creditScore))}
                                strokeWidth="16"
                                strokeDasharray={pathLength}
                                strokeDashoffset={
                                    pathLength - (Number(creditScore) / 850) * pathLength
                                }
                                strokeLinecap="round"
                            />

                            {/* Score scale markers */}
                            {/* <text x="15" y="100" fill="#6B7280" fontSize="12">0</text>
                            <text x="180" y="100" fill="#6B7280" fontSize="12">850</text> */}

                            {/* Indicator dot */}
                            <circle
                                cx="20"
                                cy="90"
                                r="4"
                                fill="white"
                                stroke={getScoreColor(Number(creditScore))}
                                strokeWidth="2"
                            />
                            <circle
                                cx="180"
                                cy="90"
                                r="4"
                                fill="white"
                                stroke={getScoreColor(Number(creditScore))}
                                strokeWidth="2"
                            />
                        </svg>

                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-bold">
                                {creditScore ? Number(creditScore) : 0}
                            </span>
                            <span className="text-xl">
                                {getScoreLabel(Number(creditScore))}
                            </span>
                        </div>
                    </div>
                    <p className="mt-4 text-center">
                        Your Credit Score is {getScoreLabel(Number(creditScore))}
                    </p>
                    <p className="text-center text-sm text-gray-500">
                        Last Check on {new Date().toLocaleDateString()}
                    </p>
                    <button className="mx-auto mt-2 block text-sm text-blue-500 underline">
                        What these stats mean?
                    </button>
                </div>

                {flexloan ? (
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-xl font-semibold">
                            Personal Loan Options
                        </h2>
                        <p>Outstanding loan amount: {formatViemBalance(flexloan)} NGNS</p>
                        <p>Loan duration: 12 months</p>
                        <p>Estimated interest rate: {Number(loanInterestRate)}%</p>
                        {/* <p>Estimated monthly payment: $175.76</p> */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                    className="mt-4 rounded-full bg-green-700 px-4 py-2 text-base text-white"
                                >
                                    Repay now
                                </button>
                            </SheetTrigger>
                            <SheetContent
                                side="bottom"
                                className="rounded-tl-[50px] rounded-tr-[50px]"
                            >
                                <SheetHeader>
                                    <SheetTitle>Repay Flex Loan</SheetTitle>

                                    <SheetDescription className="pb-32">
                                        <p className="text-md mb-4 text-left font-medium leading-[18px] text-[#0A0F29]">
                                            Loan amount + interest is given as{" "}
                                            <b> {formatViemBalance(flexloan)} NGNS</b>
                                        </p>
                                        <form className="space-y-5">
                                            <div>
                                                <Input
                                                    placeholder="Enter the amount you want to repay"
                                                    className="tect-base font-medium text-[#696F8C] placeholder:text-[#696F8C]"
                                                    value={repayAmount}
                                                    onChange={(e) => setRepayAmount(e.target.value)}
                                                />
                                            </div>
                                            <div className="flex items-center justify-center gap-x-5"></div>
                                            <Button className="bg-[#4A9F17]" onClick={repay}>
                                                {isLoading ? (
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                ) : (
                                                    "Repay Loan"
                                                )}
                                                {/* {!isLoading && text} */}
                                            </Button>
                                        </form>
                                    </SheetDescription>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    </div>
                ) : (
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-xl font-semibold">
                            Personal Loan Options
                        </h2>
                        <input
                            type="range"
                            min="1000"
                            max="50000"
                            step="100"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                            className="mb-4 w-full bg-green-700"
                        />
                        <p>Loan amount: {loanAmount} NGNS</p>
                        <p>Loan duration: 12 months</p>
                        <p>Estimated interest rate: {Number(loanInterestRate)}%</p>
                        {/* <p>Estimated monthly payment: $175.76</p> */}
                        <button
                            className="mt-4 rounded-full bg-green-700 px-4 py-2 text-base text-white"
                            onClick={borrow}
                        >
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                "Borrow Now"
                            )}
                        </button>
                    </div>
                )}

                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-semibold">
                        Credit Improvement Tips
                    </h2>
                    <ul className="list-disc pl-5">
                        <li>Pay your bills on time</li>
                        <li>Keep your credit utilization low</li>
                        <li>Don't close old credit accounts</li>
                        <li>Limit new credit applications</li>
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default CreditScorePage;
