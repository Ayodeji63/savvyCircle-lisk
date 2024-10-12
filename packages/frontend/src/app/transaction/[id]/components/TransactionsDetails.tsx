"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { CheckCircle, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthContext } from '@/context/AuthContext';
import { findTransaction } from '@/lib/user';

interface Transaction {
    data: string | null;
    type: string;
    id: string;
    status: string;
    amount: string;
    transactionHash: string;
    fromAddress: string;
    toAddress: string;
    createdAt: string | Date;
    userId: string;
}

interface DetailRowProps {
    label: string;
    value: string;
}

const TransactionDetails = ({ id }: any) => {
    const [transaction, setTransaction] = useState<Transaction | null>();

    const formatDate = (date: string | Date) => {
        if (typeof date === 'string') {
            return new Date(date).toLocaleString();
        }
        return date.toLocaleString();
    };

    const formatTransactionHash = (hash: string) => {
        if (hash.length > 10) {
            return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
        }
        return hash;
    };

    const handleTransaction = useCallback(async () => {
        const tx = await findTransaction(String(id));
        console.log(tx);

        setTransaction(tx)
    }, [transaction])


    return (
        <>
            {transaction && <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <CardHeader className="bg-green-50 py-6 text-center">
                    <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
                    <CardTitle className="text-2xl font-bold mt-4 text-gray-800">
                        Transaction Successful!
                    </CardTitle>
                    <p className="text-gray-600 mt-2">
                        Successfully processed {transaction.type} for {transaction.amount}
                    </p>
                </CardHeader>
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Transaction Details</h3>
                    <div className="space-y-3">
                        <DetailRow label="Transaction ID" value={transaction.id} />
                        <DetailRow label="Date" value={formatDate(transaction.createdAt)} />
                        <DetailRow label="Type" value={transaction.type} />
                        <DetailRow label="Amount" value={transaction.amount} />
                        <DetailRow label="From" value={transaction.fromAddress} />
                        <DetailRow label="To" value={transaction.toAddress} />
                        <DetailRow label="Status" value={transaction.status} />
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">Transaction Hash</span>
                            <a
                                href={`https://basescan.org/tx/${transaction.transactionHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                            >
                                {formatTransactionHash(transaction.transactionHash)}
                                <ExternalLink className="w-4 h-4 ml-1" />
                            </a>
                        </div>
                    </div>
                </CardContent>
            </Card>}
        </>
    );
};

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => (
    <div className="flex justify-between">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <span className="text-sm text-gray-800">{value}</span>
    </div>
);

export default TransactionDetails;