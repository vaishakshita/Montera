"use client"
import React, { useState, useEffect } from 'react'
import AnalyticsSkeleton from '@/app/components/loading/AnalyticsSkeleton';
import EmptyAnalytics from './components/EmptyAnalytics';
import ExpensePieChart from "@/app/dashboard/analytics/components/ExpensePieChart";
import IncomeExpenseChart from '@/app/dashboard/analytics/components/IncomeExpenseChart';
import ExpenseLineChart from '@/app/dashboard/analytics/components/ExpenseLineChart';
import FinancialInsights from '@/app/dashboard/analytics/components/FinancialInsights';

const page = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const latestTransaction = transactions[0];

  const fetchTransaction = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTransaction();
  }, [])

  const formatCurrency = (amount) => `₹${amount.toLocaleString("en-IN")}`;

  const income = transactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);
  if (loading) {
    return <AnalyticsSkeleton />;
  }
  return (
    <>
      {
        transactions.length === 0 ? (
          <EmptyAnalytics />
        ) : (
          <div className='p-6 pb-24'>
            <h1 className='text-2xl md:text-3xl font-semibold text-[#172B2A]'>Compare your monthly spending</h1>
            <p className="text-[#64748B] text-sm sm:text-base mt-1"> Track your income, expenses, and spending patterns. </p>

            {/* income/expense cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6'>
              <div className="bg-white rounded-2xl border border-[#D5DDD7] shadow-md p-5"> 
                <h3 className="text-sm sm:text-base font-semibold text-[#64748B]"> Total Income </h3> 
                <p className="text-2xl md:text-3xl font-bold text-[#2F7D68] mt-2"> {formatCurrency(income)} </p> 
                <p className="text-xs sm:text-sm text-[#94A3B8] mt-2"> Updated: {latestTransaction?.date
                    ? new Date(latestTransaction.date).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    : "No data"} 
                </p> 
              </div>

              <div className="bg-white rounded-2xl border border-[#E8CFCF] shadow-md p-5"> 
                <h3 className="text-sm sm:text-base font-semibold text-[#64748B]"> Total Expense </h3> 
                <p className="text-2xl md:text-3xl font-bold text-[#D94A4A] mt-2"> {formatCurrency(expense)} </p> 
                <p className="text-xs sm:text-sm text-[#94A3B8] mt-2"> Updated: {latestTransaction?.date
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
            
            <div className='flex flex-col gap-4 mt-6'>
              <div className='mt-6'>
                <IncomeExpenseChart transactions={transactions} />
              </div>
              <div className='grid grid-cols-1 xl:grid-cols-11 gap-8 mt-6'>
                <div className="xl:col-span-5">
                  <ExpenseLineChart transactions={transactions} />
                </div>

                <div className="xl:col-span-6">
                  <ExpensePieChart transactions={transactions} />
                </div>
              </div>
              <div className='mt-6'>
                <FinancialInsights transactions={transactions} />
              </div>

            </div>
          </div>
        )
      }
    </>



  )
}

export default page
