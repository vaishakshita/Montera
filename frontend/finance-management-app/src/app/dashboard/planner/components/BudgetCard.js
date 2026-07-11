import React from 'react'
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { categoryIcons } from './BudgetModel';


const BudgetCard = ({ budget, onEdit, onDelete }) => {
  const Icon = categoryIcons[budget.category] || FaQuestionCircle;
  const getBudgetStatus = () => {
    if (budget.percentage < 50) {
      return {
        text: "Healthy",
        color: "bg-green-100 text-green-700",
      };
    }

    if (budget.percentage < 80) {
      return {
        text: "Near Limit",
        color: "bg-yellow-100 text-yellow-700",
      };
    }

    if (budget.percentage < 100) {
      return {
        text: "Critical",
        color: "bg-orange-100 text-orange-700",
      };
    }

    return {
      text: "Over Budget",
      color: "bg-red-100 text-red-700",
    };
  };
  const status = getBudgetStatus();

  const getProgressColor = () => {
    if (budget.percentage <= 50) return "bg-green-500";
    if (budget.percentage <= 80) return "bg-yellow-500";
    if (budget.percentage <= 100) return "bg-red-500";
    return "bg-black";

  }

  const formatMoney = (amount) =>
    new Intl.NumberFormat("en-IN").format(amount);

  return (
    <div className="bg-white rounded-2xl shadow-md border border-purple-100 p-6 hover:shadow-xl transition mb-6">

      {/* header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Icon className="text-purple-700 text-3xl" />
          <h2 className="text-2xl font-bold text-purple-900">{budget.category}</h2>
        </div>
        <span
          className={`rounded-full px-4 py-1 text-sm font-semibold ${status.color}`}
        >
          {status.text}
        </span>
      </div>

      {/* budget */}
      <p className='text-gray-500 mt-2'>₹{formatMoney(budget.spent)} / ₹{formatMoney(budget.budget)}</p>
      <p className='text-gray-500 mb-4 mt-1'>{budget.percentage.toFixed(0)}%  used</p>
      <p
        className={`font-medium ${budget.remaining >= 0 ? "text-green-600" : "text-red-600"
          }`}
      >
        {budget.remaining >= 0
          ? `₹${formatMoney(budget.remaining)} left`
          : `₹${formatMoney(Math.abs(budget.remaining))} over budget`}
      </p>

      {/* progress */}
      <div className='mt-3'>
        <div className='h-3 w-full rounded-full bg-gray-200 overflow-hidden'>
          <div className={`h-full ${getProgressColor()}`} style={{ width: `${Math.min(budget.percentage, 100)}%`, }} />
        </div>
      </div>

      {/* buttons */}
      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={onEdit}
          className="rounded-lg bg-yellow-100 p-2 text-yellow-700 hover:bg-yellow-200 transition"
        >
          <MdEdit className="text-yellow-700" />
        </button>

        <button
          onClick={onDelete}
          className="rounded-lg bg-red-100 p-2 text-red-700 hover:bg-red-200 transition"
        >
          <RiDeleteBin6Line className="text-red-700" />
        </button>

      </div>


    </div>
  )
}

export default BudgetCard
