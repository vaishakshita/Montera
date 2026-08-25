"use client"
import React from 'react'
import { useRouter } from 'next/navigation';

const RecentTransaction = ({transactions}) => {
    const router = useRouter()
    const safeTransactions = Array.isArray(transactions) ? transactions : [];
    const recentTransactions = safeTransactions.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)
    const formatCurrency = (amount) => `₹${amount.toLocaleString("en-IN")}`;

  return (
    <div>
      <h2 className='text-2xl text-[#173F35] font-sans font-bold mb-4'>Recent Transactions</h2>
            <button
              onClick={() => router.push("/dashboard/transactions")}
              className="text-sm bg-[#F1F6F3] text-[#2F6F5E] border-2 border-[#2F6F5E] px-4 py-2 mb-2 rounded-xl hover:bg-[#2F6F5E] hover:text-white transition"
            >
              View All →
            </button>

            {transactions.length === 0 ? (
              <p className='text-xl font-mono font-bold mb-4 text-[#173F35]'>Start by adding your first transaction.</p>
            ) : (
              recentTransactions.map((t) => (
                <div
                  key={t._id}
                  className="flex justify-between bg-[#E1EEE8] border-2 border-[#9FC4B5] shadow-2xl rounded-2xl px-4 py-3 mt-3 mb-6">
                  <div>
                    <p className='text-xl font-sans font-semibold text-[#2F6F5E]'>{t.title}</p>
                    <p className='text-[#173F35] font-sans font-semibold'>{t.category}</p>
                    <p className='text-[#64748B]'>{t.date
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
                      : "text-[#23804F] font-semibold"
                  }>{t.type === "expense" ? "-" : "+"} {formatCurrency(t.amount)}</p>

                </div>
              ))
            )}
    </div>
  )
}

export default RecentTransaction
