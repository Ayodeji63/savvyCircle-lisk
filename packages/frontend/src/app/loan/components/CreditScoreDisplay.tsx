import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { contractInstance, formatViemBalance } from '@/lib/libs';
import { notification } from '@/utils/notification';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { prepareContractCall, sendTransaction } from 'thirdweb';
import { useActiveAccount, useReadContract } from 'thirdweb/react';
import { formatEther, parseEther } from 'viem';

const CreditScorePage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

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

    const [loanAmount, setLoanAmount] = useState(Number(formatEther(maxloanAmount ? maxloanAmount : BigInt(0))));
    // const creditScore = 3; // Example low score
    console.log();

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
            notification.success("Flex Loan Borrowed Successfully");
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            notification.error("An error occured");
            setIsLoading(false);
        }
    };


    const getScoreColor = (score: number) => {
        if (score >= 800) return '#4CAF50';
        if (score >= 700) return '#8BC34A';
        if (score >= 600) return '#FFC107';
        return '#F44336';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 800) return 'Excellent';
        if (score >= 700) return 'Good';
        if (score >= 600) return 'Fair';
        return 'Poor';
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
        <div className="flex flex-col min-h-screen bg-gray-100">
            <main className="flex-grow container max-w-3xl mx-auto py-6 px-4 space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Your Credit Score</h2>
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
                                strokeDashoffset={pathLength - (Number(creditScore) / 850) * pathLength}
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
                            <span className="text-5xl font-bold">{Number(creditScore)}</span>
                            <span className="text-xl">{getScoreLabel(Number(creditScore))}</span>
                        </div>
                    </div>
                    <p className="text-center mt-4">
                        Your Credit Score is {getScoreLabel(Number(creditScore))}
                    </p>
                    <p className="text-center text-sm text-gray-500">
                        Last Check on {new Date().toLocaleDateString()}
                    </p>
                    <button className="mt-2 text-blue-500 text-sm underline block mx-auto">
                        What these stats mean?
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Personal Loan Options</h2>
                    <input
                        type="range"
                        min="1000"
                        max="50000"
                        step="100"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="w-full mb-4 bg-green-700"
                    />
                    <p>Loan amount: #{loanAmount}</p>
                    <p>Estimated interest rate: {Number(loanInterestRate)}%</p>
                    <p>Estimated monthly payment: $175.76</p>
                    <button className="mt-4 bg-green-700 text-white px-4 py-2 rounded" onClick={borrow}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Borrow Now"}
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Credit Improvement Tips</h2>
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