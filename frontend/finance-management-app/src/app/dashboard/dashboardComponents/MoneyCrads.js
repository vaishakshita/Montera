import React from 'react'

const SummaryCards = ({transactions}) => {
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
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-4 mt-6'>
          <div className='bg-white p-4 rounded-xl shadow-xl border-4 border-green-700 h-40 w-50 lg:w-60'>
            <h3 className='text-xl font-semibold font-sans text-slate-800'>Total Income</h3>
            <p className='text-4xl text-green-700 font-bold font-sans'>{formatCurrency(income)}</p>
            <p className="text-xs lg:text-sm text-gray-500 mt-4">
              Updated: {latestTransaction?.date
                ? new Date(latestTransaction.date).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })
                : "No data"}
            </p>
          </div>

          <div className='bg-white p-4 rounded-xl shadow-xl border-4 border-red-700 h-40 w-50 lg:w-60'>
            <h3 className='text-xl font-semibold font-sans text-slate-800'>Total Expense</h3>
            <p className='text-4xl text-red-700 font-bold font-sans'>{formatCurrency(expense)}</p>
            <p className="text-xs lg:text-sm text-gray-500 mt-4">
              Updated: {latestTransaction?.date
                ? new Date(latestTransaction.date).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })
                : "No data"}
            </p>
          </div>

          <div className='bg-white p-4 rounded-xl shadow-xl border-4 border-orange-400 h-40 w-50 lg:w-60'>
            <h3 className='text-xl font-semibold font-sans text-slate-800'>Total Savings</h3>
            <p className='text-4xl text-orange-400 font-bold font-sans'>{formatCurrency(savings)}</p>
            <p className="text-xs lg:text-sm text-gray-500 mt-4">
              Updated: {latestTransaction?.date
                ? new Date(latestTransaction.date).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })
                : "No data"}
            </p>
          </div>
        </div>
    </div>
  )
}

export default SummaryCards
