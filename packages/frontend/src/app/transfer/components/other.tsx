"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Home, Clock, CreditCard, DollarSign, Plus } from "lucide-react";
import { findMany } from "./lib/findmany";

interface Friend {
  id: string;
  username: string;
  address: string;
}

// Helper function to generate a color based on username
const getColorFromUsername = (username: string) => {
  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];
  const index = username.charCodeAt(0) % colors.length;
  return colors[index];
};

const FriendAvatar: React.FC<{ friend: Friend }> = ({ friend }) => (
  <motion.div
    className="mr-4 flex flex-col items-center"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <div
      className="mb-1 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white"
      style={{ backgroundColor: getColorFromUsername(friend.username) }}
    >
      {friend.username[0] ? friend.username[0].toUpperCase() : ""}
    </div>
    <span className="text-xs text-gray-600">{`${friend.username.toLowerCase()}.base.eth`}</span>
  </motion.div>
);

// const TransactionItem = ({ icon: Icon, name, time, amount }) => (
//   <div className="flex items-center justify-between mb-4">
//     <div className="flex items-center">
//       <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
//         <Icon size={20} />
//       </div>
//       <div>
//         <p className="font-semibold">{name}</p>
//         <p className="text-xs text-gray-500">{time}</p>
//       </div>
//     </div>
//     <span className="font-semibold">{amount}</span>
//   </div>
// );

const MoneyTransfer = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [balance, setBalance] = useState(25685.55);

  useEffect(() => {
    const fetchFriends = async () => {
      const fetchedFriends = await findMany();
      setFriends(fetchedFriends);
    };
    fetchFriends();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <motion.div
        className="rounded-3xl bg-white p-6 shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-2 h-6 w-6 rounded-full bg-blue-500"></div>
            <span className="font-semibold">US Dollar</span>
          </div>
          <DollarSign size={24} />
        </header>

        <div className="mb-4">
          <h1 className="text-4xl font-bold">${balance.toFixed(2)}</h1>
        </div>

        <motion.button
          className="mb-6 rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={16} className="mr-1 inline" />
          ADD MONEY
        </motion.button>

        <motion.div
          className="mb-8 flex overflow-x-auto"
          whileTap={{ cursor: "grabbing" }}
        >
          {friends.map((friend) => (
            <FriendAvatar key={friend.id} friend={friend} />
          ))}
        </motion.div>

        {/* <div className="recent-transactions">
          <h2 className="font-semibold mb-4">Today</h2>
          <TransactionItem 
            icon={User} 
            name="Amazon" 
            time="2:15pm" 
            amount="$8.90" 
          />
          <TransactionItem 
            icon={User} 
            name="Cash from ATM" 
            time="5:40pm" 
            amount="$250.00" 
          />
        </div> */}
      </motion.div>

      <motion.nav
        className="fixed bottom-0 left-0 right-0 flex justify-around bg-white p-4"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Home size={24} />
        <Clock size={24} />
        <CreditCard size={24} />
        <User size={24} />
      </motion.nav>
    </div>
  );
};

export default MoneyTransfer;
