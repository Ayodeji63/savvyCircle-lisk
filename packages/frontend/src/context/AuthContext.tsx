'use client'
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { client } from "@/app/client";
import { contractAddress } from "@/contract";
import { createContext, useEffect } from "react"
import { getContract } from "thirdweb";

import { undefined } from "zod";


interface IAuthContext {
    userGroupId: bigint[];
    setUserGroupId: (value: bigint[]) => void;
    depositAmount: number;
    setDepositAmount: (value: number) => void;
    groupId: bigint | undefined;
    setGroupId: (value: bigint) => void;
    CARDS: Card[];
    setCARDS: Dispatch<SetStateAction<Card[]>>;
}
export const AuthContext = createContext({} as IAuthContext);

export type Card = {
    id: number;
    text: string;
    value: string;
    className?: string;
};

export default function AuthContextProvider({ children }: { children: React.ReactNode; }) {
    const [userGroupId, setUserGroupId] = useState<bigint[]>([])
    const [depositAmount, setDepositAmount] = useState<number>(0);
    const [groupId, setGroupId] = useState<bigint>();
    const [CARDS, setCARDS] = useState<Card[]>([
        {
            id: 0,
            text: "Total Group Savings",
            value: "#200,000",
            className: "bg-gradient-to-bl from-[#00A6C2] to-[#70E77E]",
        },
        {
            id: 1,
            className: "bg-gradient-to-bl from-[#1544DF] to-[#00A6C2]",
            text: "Total Group members",
            value: "10",
        },
        {
            id: 2,
            className: "bg-gradient-to-bl from-[#6C40D9] to-[#A858EE]",
            text: "Total loan given out",
            value: "#250,000",
        },
    ])


    return (
        <AuthContext.Provider value={{
            userGroupId,
            setUserGroupId,
            depositAmount,
            setDepositAmount,
            groupId,
            setGroupId,
            CARDS,
            setCARDS
        }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuthContext = () => useContext(AuthContext);