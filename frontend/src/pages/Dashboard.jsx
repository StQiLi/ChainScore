import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "../components/ui/layout-grid";
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";

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

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Recent Transactions</h1>
      <InfiniteMovingCards items={recentTransactions} />
    </div>
  );
}

export default Dashboard;
