import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionForm from '../components/TransactionForm';

const AddTransaction = ({ onAddTransaction }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (transaction) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await onAddTransaction(transaction);
      navigate('/');
    } catch (err) {
      console.error('Error adding transaction:', err);
      setError('Failed to add transaction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex justify-center items-start py-12 px-4">
      
      <div className="w-full max-w-3xl"> {/* ⬅️ Increased size */}
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">
            Add Transaction
          </h1>

          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-sm font-medium rounded-lg 
                       bg-white dark:bg-gray-800 
                       border border-gray-300 dark:border-gray-700 
                       text-gray-700 dark:text-gray-300
                       hover:bg-indigo-50 dark:hover:bg-gray-700 
                       transition"
          >
            ← Back
          </button>
        </div>

        {/* Card */}
        <div className="
  bg-gradient-to-br from-white to-indigo-50 
  dark:from-gray-900 dark:to-gray-800
  backdrop-blur-lg
  rounded-2xl
  shadow-lg hover:shadow-2xl
  border border-indigo-200 dark:border-gray-700
  p-6 md:p-8 lg:p-10
  max-w-xl w-full
  mx-auto
  transition-all duration-300
">
          
          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 
                            bg-red-50 dark:bg-red-900/30 
                            border border-red-300 dark:border-red-700 
                            text-red-700 dark:text-red-300 
                            px-4 py-3 rounded-lg mb-6">
              <svg
                className="h-5 w-5 mt-0.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <TransactionForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;