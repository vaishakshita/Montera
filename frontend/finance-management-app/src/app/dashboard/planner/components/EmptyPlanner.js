"use client";

import { FaBullseye, FaWallet, FaPiggyBank } from "react-icons/fa";

const EmptyPlanner = ({ onAddGoal, onAddBudget }) => {
  return (
    <div className="mt-8 bg-white rounded-3xl shadow-xl mx-auto xl:w-2/3 p-10 text-center">

      {/* Icon */}
      <div className="text-6xl mb-4">🎯</div>

      {/* Heading */}
      <h2 className="text-4xl font-bold text-emerald-700">
        Start Planning Your Financial Future
      </h2>

      {/* Description */}
      <p className="text-gray-600 text-lg mt-4 max-w-3xl mx-auto">
        Create savings goals and monthly budgets to stay on track.
        Montera will automatically monitor your progress,
        notify you when you're close to your limits,
        and help you achieve your financial goals faster.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

        <button
          onClick={onAddGoal}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition"
        >
          + Create First Goal
        </button>

        <button
          onClick={onAddBudget}
          className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white px-8 py-3 rounded-xl font-semibold transition"
        >
          + Create Budget
        </button>

      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">

        <div className="bg-green-50 rounded-2xl p-6">
          <FaBullseye
            size={40}
            className="mx-auto text-emerald-600 mb-4"
          />

          <h3 className="text-xl font-semibold text-emerald-700">
            Savings Goals
          </h3>

          <p className="text-gray-600 mt-2">
            Create goals like a new laptop, vacation, bike, or emergency fund
            and track your savings progress.
          </p>
        </div>

        <div className="bg-green-50 rounded-2xl p-6">
          <FaWallet
            size={40}
            className="mx-auto text-emerald-600 mb-4"
          />

          <h3 className="text-xl font-semibold text-emerald-700">
            Monthly Budgets
          </h3>

          <p className="text-gray-600 mt-2">
            Set spending limits for Food, Shopping, Bills, Travel,
            Entertainment and more.
          </p>
        </div>

        <div className="bg-green-50 rounded-2xl p-6">
          <FaPiggyBank
            size={40}
            className="mx-auto text-emerald-600 mb-4"
          />

          <h3 className="text-xl font-semibold text-emerald-700">
            Track Progress
          </h3>

          <p className="text-gray-600 mt-2">
            Watch your savings grow, stay within your budget,
            and achieve your financial targets.
          </p>
        </div>

      </div>
    </div>
  );
};

export default EmptyPlanner;