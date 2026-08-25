"use client";

import { FaPlusCircle } from "react-icons/fa";

const EmptyTransaction = ({ onAdd }) => {
  return (
    <div className="mt-10 bg-white rounded-3xl shadow-xl p-5 text-center border border-purple-200">

      {/* Illustration */}
      <div className="text-6xl mb-4">💸</div>

      <h2 className="text-3xl font-bold text-emerald-700">
        Welcome to Montera!
      </h2>

      <p className="text-gray-600 mt-3 max-w-xl mx-auto">
        You haven't added any transactions yet.Start by recording your first income or expense and Montera will automatically generate analytics,budgets and financial insights.
      </p>

      <button
        onClick={onAdd}
        className="mt-8 bg-emerald-700 hover:bg-emerald-800 transition text-white px-6 py-3 rounded-xl flex items-center gap-2 mx-auto"
      >
        <FaPlusCircle />
        Add First Transaction
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">

        <div className="bg-green-50 rounded-xl p-5">
          <h3 className="font-semibold text-green-700">
            Track Income
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            Record salary, freelance work and other earnings.
          </p>
        </div>

        <div className="bg-green-50 rounded-xl p-5">
          <h3 className="font-semibold text-green-700">
            Monitor Expenses
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            Categorize spending and understand where your money goes.
          </p>
        </div>

        <div className="bg-green-50 rounded-xl p-5">
          <h3 className="font-semibold text-green-700">
            Build Savings
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            Set goals and grow your financial health.
          </p>
        </div>

      </div>
    </div>
  );
};

export default EmptyTransaction;