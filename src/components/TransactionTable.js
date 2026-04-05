import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const TransactionTable = ({ transactions = [], showCategory = true }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-lg overflow-hidden">
        
        {/* HEADER */}
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Date
            </th>

            {showCategory && (
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Category
              </th>
            )}

            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Amount
            </th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          
          {/* EMPTY STATE */}
          {transactions.length === 0 ? (
            <tr>
              <td
                colSpan={showCategory ? 4 : 3}
                className="text-center py-6 text-gray-500 dark:text-gray-400"
              >
                No transactions found
              </td>
            </tr>
          ) : (
            transactions.map((transaction) => {
              console.log("Transaction:", transaction); // ✅ moved outside JSX return

              return (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  {/* DESCRIPTION */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-full ${
                          transaction.type === 'income'
                            ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                            : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
                        }`}
                      >
                        {transaction.type === 'income' ? (
                          <FaArrowUp />
                        ) : (
                          <FaArrowDown />
                        )}
                      </div>

                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {transaction.title || "Untitled"}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* DATE */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(transaction.date)}
                  </td>

                  {/* CATEGORY */}
                  {showCategory && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        {transaction.category || "General"}
                      </span>
                    </td>
                  )}

                  {/* AMOUNT */}
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-right text-sm font-semibold ${
                      transaction.type === 'income'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}$
                    {Math.abs(Number(transaction.amount || 0)).toFixed(2)}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;