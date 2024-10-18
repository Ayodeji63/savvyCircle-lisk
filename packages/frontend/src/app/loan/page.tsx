"use client"
import React from 'react';
import { useState } from 'react';
import { LoanEligibility } from './components/LoanEligibility';
import { CreditImprovementTips } from './components/CreditImprovementTips';
import CreditScorePage from './components/CreditScoreDisplay';
import BackButton from '@/components/common/back-button';
import FloatingNavBar from '../Navbar';
// import { TransactionHistory } from './TransactionHistory';
// import { ConnectedAccounts } from './ConnectedAccounts';

interface User {
    name: string;
    creditScore: number;
}

const CreditScoreLoanPage: React.FC = () => {
    const [user, setUser] = useState<User>({
        name: 'John Doe',
        creditScore: 10
    });

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">

            <div className="bg-green-900 p-6 rounded-br-lg drop-shadow-sm rounded-bl-lg mb-4 shadow-md">
                <h2 className="text-2xl font-bold text-green-100 mb-2"><BackButton /></h2>
                <p className="text-green-200">Get a personal loan</p>
            </div>

            <main className="flex-grow container mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CreditScorePage />
                    {/* <LoanEligibility creditScore={user.creditScore} /> */}
                </div>
                <div className="mt-6">
                    {/* <CreditImprovementTips /> */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {/* <TransactionHistory />
          <ConnectedAccounts /> */}
                </div>
            </main>

            <FloatingNavBar />

        </div>
    );
};

export default CreditScoreLoanPage;

// CreditScoreDisplay.tsx






// // TransactionHistory.tsx
// export const TransactionHistory: React.FC = () => {
//   const transactions = [
//     { id: 1, description: 'Grocery Store', amount: -75.50, date: '2023-04-15' },
//     { id: 2, description: 'Salary Deposit', amount: 2500.00, date: '2023-04-01' },
//     { id: 3, description: 'Electric Bill', amount: -120.00, date: '2023-04-10' },
//   ];

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
//       <ul>
//         {transactions.map((transaction) => (
//           <li key={transaction.id} className="mb-2">
//             <span>{transaction.date}</span>
//             <span className="ml-2">{transaction.description}</span>
//             <span className={`float-right ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
//               ${Math.abs(transaction.amount).toFixed(2)}
//             </span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// // ConnectedAccounts.tsx
// export const ConnectedAccounts: React.FC = () => {
//   const accounts = [
//     { id: 1, name: 'Checking Account', balance: 5432.10 },
//     { id: 2, name: 'Savings Account', balance: 10000.00 },
//     { id: 3, name: 'Credit Card', balance: -1500.75 },
//   ];

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Connected Accounts</h2>
//       <ul>
//         {accounts.map((account) => (
//           <li key={account.id} className="mb-2">
//             <span>{account.name}</span>
//             <span className={`float-right ${account.balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//               ${Math.abs(account.balance).toFixed(2)}
//             </span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };