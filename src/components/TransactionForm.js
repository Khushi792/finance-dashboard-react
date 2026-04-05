import React, { useState } from 'react';

const TransactionForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    amount: initialData.amount || '',
    category: initialData.category || 'Food',
    type: initialData.type || 'expense',
    date: initialData.date || new Date().toISOString().split('T')[0],
  });

  const categories = [
    'Food', 'Shopping', 'Transport', 'Housing', 'Entertainment', 
    'Utilities', 'Healthcare', 'Education', 'Salary', 'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || '' : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = {
      ...formData,
      id: Date.now(),
      amount: parseFloat(formData.amount)
    };
    onSubmit(transaction);
    
    // Reset form
    if (!initialData.id) {
      setFormData({
        title: '',
        amount: '',
        category: 'Food',
        type: 'expense',
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

  {/* Title */}
  <div>
    <label className="block text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
      Title
    </label>
    <input
      type="text"
      name="title"
      value={formData.title}
      onChange={handleChange}
      className="
        w-full px-3 py-1 md:py-3
        text-sm md:text-base
        rounded-xl
        bg-white/70 dark:bg-gray-800/80
        border border-gray-300 dark:border-gray-600
        text-gray-800 dark:text-gray-200
        placeholder-gray-400 dark:placeholder-gray-500
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
        transition-all duration-200 shadow-sm hover:shadow-md
      "
      placeholder="Enter title"
      required
    />
  </div>

  {/* Amount */}
  <div>
    <label className="block text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
      Amount
    </label>
    <div className="relative">
      <span className="absolute left-3 top-3 text-gray-400">₹</span>
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        className="
          w-full pl-8 pr-4 py-3 md:py-3.5
          text-sm md:text-base font-medium
          rounded-xl
          bg-white/70 dark:bg-gray-800/80
          border border-gray-300 dark:border-gray-600
          text-gray-900 dark:text-white
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
          transition-all duration-200 shadow-sm hover:shadow-md
        "
        placeholder="0.00"
        required
      />
    </div>
  </div>

  {/* Category + Type */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* Category */}
    <div>
      <label className="block text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Category
      </label>
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="
          w-full px-4 py-3 md:py-3.5
          text-sm md:text-base
          rounded-xl
          bg-white/70 dark:bg-gray-800/80
          border border-gray-300 dark:border-gray-600
          text-gray-800 dark:text-gray-200
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          transition-all duration-200 shadow-sm hover:shadow-md
        "
      >
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>

    {/* Type */}
    <div>
      <label className="block text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Type
      </label>
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="
          w-full px-4 py-3 md:py-3.5
          text-sm md:text-base
          rounded-xl
          bg-white/70 dark:bg-gray-800/80
          border border-gray-300 dark:border-gray-600
          text-gray-800 dark:text-gray-200
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          transition-all duration-200 shadow-sm hover:shadow-md
        "
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
    </div>
  </div>

  {/* Date */}
  <div>
    <label className="block text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
      Date
    </label>
    <input
      type="date"
      name="date"
      value={formData.date}
      onChange={handleChange}
      className="
        w-full px-4 py-3 md:py-3.5
        text-sm md:text-base
        rounded-xl
        bg-white/70 dark:bg-gray-800/80
        border border-gray-300 dark:border-gray-600
        text-gray-800 dark:text-gray-200
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
        transition-all duration-200 shadow-sm hover:shadow-md
      "
      required
    />
  </div>

  {/* Buttons */}
  <div className="flex justify-end gap-3">
    <button
      type="button"
      onClick={() => {
        setFormData({
          title: '',
          amount: '',
          category: 'Food',
          type: 'expense',
          date: new Date().toISOString().split('T')[0]
        });
      }}
      className="
        px-5 py-2.5 rounded-xl
        bg-gray-200 dark:bg-gray-700
        text-gray-700 dark:text-gray-300
        hover:bg-gray-300 dark:hover:bg-gray-600
        transition
      "
    >
      Reset
    </button>

    <button
      type="submit"
      className="
        px-6 py-2.5 rounded-xl
        bg-indigo-600 text-white
        hover:bg-indigo-700
        shadow-md hover:shadow-lg
        transition
      "
    >
      {initialData.id ? 'Update' : 'Add'} Transaction
    </button>
  </div>

</form>  );
};

export default TransactionForm;
