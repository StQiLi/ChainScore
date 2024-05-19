import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "../components/ui/layout-grid";
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";
import { AnimatePresence, motion } from "framer-motion";
import { SquishyCard } from "../components/SquishyCard";
import { CanvasRevealCard } from "../components/CanvasRevealCard";

const recentTransactions = [
  {
    date: '2024-05-20',
    amount: '10',
    sender: 'H5yjNE63YZxB4LC2J596ATKGgphgt4qrEj5btaEbnGfg',
    receiver: 'temp-1716114405179.testnet',
    transactionType: 'Transfer',
    status: 'Completed',
  },
  {
    date: '2024-05-19',
    amount: '10',
    sender: 'GFajmrnt3V3rE1zApHnJgNmLVrPiCkhNvH9tAkfuS1RX',
    receiver: 'temp-1716114390772.testnet',
    transactionType: 'Payment',
    status: 'Completed',
  },
  {
    date: '2024-05-19',
    amount: '10',
    sender: '14KV3crhfdcLLoKovY2W4BhJBSgNADeSc74JbD9VTcnf',
    receiver: 'temp-1716114389465.testnet',
    transactionType: 'Payment',
    status: 'Completed',
  },
  {
    date: '2024-05-19',
    amount: '10',
    sender: 'HRiEnHgBBj62y7aPpS6Pg3LEPHd9d9qEEJausiqhSNTX',
    receiver: 'temp-1716114334156.testnet',
    transactionType: 'Payment',
    status: 'Completed',
  },
  {
    date: '2024-05-19',
    amount: '10',
    sender: '9oHA75rf1kqtnuGJ6GNv4tmKKguMkKg7HbJRAmRTJuT5',
    receiver: 'temp-1716114302058.testnet',
    transactionType: 'Payment',
    status: 'Completed',
  },
  {
    date: '2024-05-19',
    amount: '10',
    sender: '6pY7b7P7xPvidysBCCp3bYJ3Z4qaT1Z3C2R8Yg1DSvqn',
    receiver: 'temp-1716114002177.testnet',
    transactionType: 'Payment',
    status: 'Completed',
  },
  {
    date: '2024-05-19',
    amount: '10',
    sender: '2LH47182KB5QgGJywcDSnDPA1A7bPfhmgfZRjoxgEeNy',
    receiver: 'temp-1716113726545.testnet',
    transactionType: 'Payment',
    status: 'Completed',
  },
  {
    date: '2024-05-19',
    amount: '10',
    sender: 'CbYrCci4tJvT6bePmmzUEEJbUWpfQo6HUPDkSGqZj4Jh',
    receiver: 'temp-1716113402293.testnet',
    transactionType: 'Payment',
    status: 'Completed',
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
    <div className="dashboard-container">
      <h2>Recent Transactions</h2>
      <InfiniteMovingCards items={recentTransactions} />

      <h2>Credit Score: B-</h2>
      
    </div>
  );
}

export default Dashboard;
