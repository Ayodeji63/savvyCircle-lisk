"use client"
import React, { useState } from "react";

// LoanEligibility.tsx
export const LoanEligibility: React.FC<{ creditScore: number }> = ({ creditScore }) => {
    const [loanAmount, setLoanAmount] = useState(5000);

    const estimatedInterestRate = () => {
        if (creditScore >= 750) return 5.99;
        if (creditScore >= 700) return 7.99;
        if (creditScore >= 650) return 10.99;
        return 15.99;
    };

    const monthlyPayment = () => {
        const rate = estimatedInterestRate() / 100 / 12;
        const term = 36; // 3 years
        return (loanAmount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Personal Loan Options</h2>
            <input
                type="range"
                min="1000"
                max="50000"
                step="100"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full mb-4"
            />
            <p>Loan amount: ${loanAmount}</p>
            <p>Estimated interest rate: {estimatedInterestRate().toFixed(2)}%</p>
            <p>Estimated monthly payment: ${monthlyPayment().toFixed(2)}</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Apply Now
            </button>
        </div>
    );
};