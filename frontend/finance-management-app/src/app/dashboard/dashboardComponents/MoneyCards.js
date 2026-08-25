import React from 'react'
import { FaCircleArrowUp } from "react-icons/fa6";
import { FaArrowCircleDown } from "react-icons/fa";
import { MdDataSaverOn } from "react-icons/md";

const SummaryCards = ({ transactions }) => {
  const safeTransactions = Array.isArray(transactions) ? transactions : [];
  const latestTransaction = safeTransactions[0]
  const income = safeTransactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
  const expense = safeTransactions.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);
  const savings = income - expense;

  if (!Array.isArray(transactions)) {
    return <div>Loading or Invalid Data...</div>
  }

  const formatCurrency = (amount) => `₹${amount.toLocaleString("en-IN")}`;
  return (
    <div>
      <div className='flex flex-col sm:flex-row gap-10 lg:gap-20 mt-6'>
        <div className='flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow-xl border-2 border-r border-[#D5DDD7] h-40 w-50 lg:w-60'>
          <div className='flex flex-row gap-2'>
            <FaCircleArrowUp size={30} className='text-[#3F8065]'/>
            <h3 className='text-sm font-semibold font-sans mt-1 text-[#3F8065]'>Total Income</h3>
          </div>
          <p className='text-4xl text-green-800 font-bold font-sans'>{formatCurrency(income)}</p>
          <p className="text-xs lg:text-sm text-gray-500 mt-4">
            Updated: {latestTransaction?.date
              ? new Date(latestTransaction.date).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "2-digit",
              })
              : "No data"}
          </p>
        </div>

        <div className='flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow-xl border-2 border-r border-[#D5DDD7] h-40 w-50 lg:w-60'>
          <div className='flex flex-row gap-2'>
            <FaArrowCircleDown size={30} className='text-[#3F8065]'/>
            <h3 className='text-sm font-semibold font-sans mt-1 text-[#3F8065]'>Total Expense</h3>
          </div>
          <p className='text-4xl text-gray-600 font-bold font-sans'>{formatCurrency(expense)}</p>
          <p className="text-xs lg:text-sm text-gray-500 mt-4">
            Updated: {latestTransaction?.date
              ? new Date(latestTransaction.date).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "2-digit",
              })
              : "No data"}
          </p>
        </div>

        <div className='flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow-xl border-2 border-r border-[#D5DDD7] h-40 w-50 lg:w-60'>
          <div className='flex flex-row gap-1'>
            <MdDataSaverOn size={33} className='text-[#3F8065]'/>
            <h3 className='text-sm font-semibold font-sans mt-1 text-[#3F8065]'>Total Savings</h3>
          </div>
          <p className='text-4xl text-green-800 font-bold font-sans'>{formatCurrency(savings)}</p>
          <p className="text-xs lg:text-sm text-gray-500 mt-4">
            Updated: {latestTransaction?.date
              ? new Date(latestTransaction.date).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "2-digit",
              })
              : "No data"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SummaryCards
