import React, { useState, useEffect } from 'react';
import { FaSearch, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

const TransactionHistory = ({ transactions = [] }) => {
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
    startDate: '',
    endDate: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setFilteredTransactions(transactions || []);
    setIsLoading(false);
  }, [transactions]);

  useEffect(() => {
    let result = [...(transactions || [])];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(tx => {
        const title = tx.title || tx.desc || "";
        const category = tx.category || "";
        const amount = tx.amount || "";

        return (
          title.toLowerCase().includes(term) ||
          category.toLowerCase().includes(term) ||
          amount.toString().includes(term)
        );
      });
    }

    if (filters.type !== 'all') {
      result = result.filter(tx => tx.type === filters.type);
    }

    if (filters.category !== 'all') {
      result = result.filter(tx => tx.category === filters.category);
    }

    if (filters.startDate) {
      result = result.filter(tx => tx.date >= filters.startDate);
    }
    if (filters.endDate) {
      result = result.filter(tx => tx.date <= filters.endDate);
    }

    if (sortConfig.key) {
      result.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'title') {
          aValue = a.title || a.desc || "";
          bValue = b.title || b.desc || "";
        }

        if (sortConfig.key === 'amount') {
          aValue = Number(aValue || 0);
          bValue = Number(bValue || 0);
        }

        if (sortConfig.key === 'date') {
          aValue = new Date(aValue || 0);
          bValue = new Date(bValue || 0);
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredTransactions(result);
  }, [transactions, searchTerm, filters, sortConfig]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const categories = [...new Set(transactions.map(tx => tx.category))].filter(Boolean);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-white dark:bg-gray-900 text-black dark:text-white p-4 min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
          Transaction History
        </h1>

        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <FaSearch className="text-gray-400 dark:text-gray-300" />
          </div>
          <input
            type="text"
            className="pl-10 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
            placeholder="Search..."
              title=" you can search by Type, amount or date.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* FILTERS */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          <select name="type" value={filters.type} onChange={handleFilterChange}
            className="px-3 py-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600">
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select name="category" value={filters.category} onChange={handleFilterChange}
            className="px-3 py-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600">
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>

          <input type="date" name="startDate" value={filters.startDate} title='Start-Date'
            onChange={handleFilterChange}
            className="px-3 py-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600" />

          <input type="date" name="endDate" value={filters.endDate} title='End-Date'
            onChange={handleFilterChange}
            className="px-3 py-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600" />

        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">

            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th onClick={() => handleSort('title')} className="px-6 py-3 cursor-pointer text-gray-600 dark:text-gray-300">
                  Description {sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />)}
                </th>

                <th onClick={() => handleSort('date')} className="px-6 py-3 cursor-pointer text-gray-600 dark:text-gray-300">
                  Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />)}
                </th>

                <th onClick={() => handleSort('category')} className="px-6 py-3 cursor-pointer text-gray-600 dark:text-gray-300">
                  Category {sortConfig.key === 'category' && (sortConfig.direction === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />)}
                </th>

                <th onClick={() => handleSort('amount')} className="px-6 py-3 text-right cursor-pointer text-gray-600 dark:text-gray-300">
                  Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />)}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">

                    <td className="px-6 py-4">
                      {tx.title || tx.desc || "Untitled"}
                    </td>

                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {formatDate(tx.date)}
                    </td>

                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded text-xs">
                        {tx.category || "General"}
                      </span>
                    </td>

                    <td className={`px-6 py-4 text-right font-medium ${
                      tx.type === 'income'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {tx.type === 'income' ? '+' : '-'}${Number(tx.amount || 0).toFixed(2)}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500 dark:text-gray-400">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;