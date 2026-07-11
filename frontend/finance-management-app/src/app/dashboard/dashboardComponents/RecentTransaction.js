import React from 'react'

const RecentTransaction = ({transactions}) => {
    const safeTransactions = Array.isArray(transactions) ? transactions : [];
    const recentTransactions = safeTransactions.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)
    const formatCurrency = (amount) => `₹${amount.toLocaleString("en-IN")}`;

  return (
    <div>
      <h2 className='text-2xl text-blue-900 font-sans font-bold mb-4'>Recent Transactions</h2>
            <button
              onClick={() => router.push("/dashboard/transactions")}
              className="text-sm bg-purple-50 text-purple-800 border-2 border-purple-800 px-4 py-2 mb-2 rounded-xl hover:bg-purple-700 hover:text-white transition"
            >
              View All →
            </button>

            {transactions.length === 0 ? (
              <p className='text-xl font-mono font-bold mb-4'>Start by adding your first transaction.</p>
            ) : (
              recentTransactions.map((t) => (
                <div
                  key={t._id}
                  className="flex justify-between bg-indigo-100 border-2 border-indigo-400 shadow-2xl rounded-2xl px-4 py-2 mb-4">
                  <div>
                    <p className='text-xl font-sans font-semibold text-indigo-800'>{t.title}</p>
                    <p className='text-slate-800 font-sans font-semibold'>{t.category}</p>
                    <p>{t.date
                      ? new Date(t.date).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "2-digit",
                      })
                      : "No date"}</p>
                  </div>
                  <p className={
                    t.type === "expense"
                      ? "text-red-500 font-semibold"
                      : "text-green-500 font-semibold"
                  }>{t.type === "expense" ? "-" : "+"} {formatCurrency(t.amount)}</p>

                </div>
              ))
            )}
    </div>
  )
}

export default RecentTransaction
