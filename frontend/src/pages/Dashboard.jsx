import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "../components/ui/layout-grid";
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";
import { AnimatePresence, motion } from "framer-motion";
import { RoundedBox } from "../components/ui/RoundedBox"


const recentTransactions = [
  {
    date: '2024-05-20',
    amount: '0.5 BTC',
    sender: 'Alice',
    receiver: 'Bob',
    transactionType: 'Transfer',
    status: 'Completed',
  },
  {
    date: '2024-05-21',
    amount: '1.2 ETH',
    sender: 'Charlie',
    receiver: 'Dave',
    transactionType: 'Payment',
    status: 'Pending',
  },
  // Add more transactions as needed
];

export const projects = [
  {
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft.com",
  },
];

function Dashboard() {
  return (
    <div className="dashboard border border-black w-screen h-screen">
        <div className="flex content-center gap-4">
            <div className="flex justify-center">
              <RoundedBox children={<div className="group-hover:border-gray-400 group-hover:bg-white group-hover:text-black"><h2>Total Volume</h2></div>}></RoundedBox>
              <RoundedBox children={<div className="group-hover:border-gray-400 group-hover:bg-white group-hover:text-black"><h2>Average Volume</h2></div>}></RoundedBox>
              <RoundedBox children={<div className="group-hover:border-gray-400 group-hover:bg-white group-hover:text-black"><h2>Frequency</h2></div>}></RoundedBox>
            </div>
            <div className="flex justify-center">
              <RoundedBox children={<div className="group-hover:border-gray-400 group-hover:bg-white group-hover:text-black"><h2>History</h2></div>}></RoundedBox>
              <RoundedBox children={<div className="group-hover:border-gray-400 group-hover:bg-white group-hover:text-black"><h2>Wallet Health</h2></div>}></RoundedBox>
              <RoundedBox children={<div className="group-hover:border-gray-400 group-hover:bg-white group-hover:text-black"><h2>Suggested Loan Volume</h2></div>}></RoundedBox>
            </div>
        </div>
    </div>
  );
}

export default Dashboard;
