import React, { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown, FaWallet } from 'react-icons/fa';
import SummaryCard from '../components/SummaryCard';
import TransactionTable from '../components/TransactionTable';
import TopCategoriesChart from '../components/TopCategoriesChart';
import Insights from "../pages/Insights";

const Dashboard = ({ transactions = [] }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  });
  const [topCategories, setTopCategories] = useState([]);
  
  const recentTransactions = [...(transactions || [])]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  useEffect(() => {
    const timer = setTimeout(() => {
      const income = transactions
        .filter(tx => tx.type === 'income')
        .reduce((sum, tx) => sum + tx.amount, 0);

      const expenses = transactions
        .filter(tx => tx.type === 'expense')
        .reduce((sum, tx) => sum + tx.amount, 0);

      setSummary({
        totalIncome: income,
        totalExpenses: expenses,
        balance: income - expenses,
      });

      const categoryMap = {};

      transactions
        .filter(tx => tx.type === 'expense')
        .forEach(tx => {
          if (!categoryMap[tx.category]) {
            categoryMap[tx.category] = 0;
          }
          categoryMap[tx.category] += tx.amount;
        });

      const categories = Object.entries(categoryMap)
        .map(([category, amount]) => ({
          category,
          amount: parseFloat(amount.toFixed(2)),
        }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5);

      setTopCategories(categories);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [transactions]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen p-4">

      {/* TITLE */}
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 text-center">
  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
    Dashboard
  </h1>
</div>
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard 
          title="Total Income" 
          amount={summary.totalIncome.toFixed(2)} 
          change={5.2} 
          icon={FaArrowUp} 
          trend="up" 
        />
        <SummaryCard 
          title="Total Expenses" 
          amount={summary.totalExpenses.toFixed(2)} 
          change={2.7} 
          icon={FaArrowDown} 
          trend="down" 
        />
        <SummaryCard 
          title="Current Balance" 
          amount={summary.balance.toFixed(2)} 
          change={3.8} 
          icon={FaWallet} 
          trend={summary.balance >= 0 ? 'up' : 'down'} 
        />
      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* RECENT TRANSACTIONS */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h2 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">
              Recent Transactions
            </h2>

            <div className="overflow-x-auto">
              <TransactionTable 
                transactions={recentTransactions} 
                showCategory={true} 
              />
            </div>
          </div>
        </div>
        
        {/* CHART */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <TopCategoriesChart data={topCategories} />
          </div>
        </div>
      </div>

       
<Insights transactions={transactions}  />
    </div>
  );
};

export default Dashboard;