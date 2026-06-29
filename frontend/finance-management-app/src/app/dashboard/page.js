"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Sidebar from '@/app/components/Sidebar'
import ProfileMenu from "@/app/components/ProfileMenu"


const page = () => {
  const router = useRouter();
  const [user, setUser] = useState(null)
  const [transactions, setTransactions] = useState([])
  const safeTransactions = Array.isArray(transactions) ? transactions : [];
  const latestTransaction = safeTransactions[0];

  //fetch user from login
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    const fetchUser = async () => { //user data
      const res = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await res.json()

      if (res.ok) {
        setUser(data.user)
      } else {
        router.push("/login")
      }
    };

    fetchUser()
  }, [])

  //fetch transaction
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch("http://localhost:5000/api/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await res.json();
        // console.log("RAW DATA:", data);
        // console.log("TYPE:", typeof data);
        // console.log("IS ARRAY:", Array.isArray(data));
        // console.log("TRANSACTIONS FIELD:", data?.transactions);
        setTransactions(Array.isArray(data)
          ? data
          : Array.isArray(data?.transactions)
            ? data.transactions
            : [])
        setLastUpdated(new Date().toLocaleString())
      } catch (error) {
        console.log(error)
      }
    }

    fetchTransaction()
  }, [])

  //calculations
  const income = safeTransactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
  const expense = safeTransactions.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);
  const savings = income - expense;
  const recentTransactions = safeTransactions.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)

  if (!Array.isArray(transactions)) {
    return <div>Loading or Invalid Data...</div>
  }

  return (
    <>
      <Sidebar />

      <div>

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-semibold text-slate-800">
            Welcome {user?.name}!
          </h1>

          {/* Profile */}
          <ProfileMenu user={user} />
        </div>

        {/* Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-8 mx-30'>
          <div className='bg-white p-4 rounded-xl shadow-xl border-4 border-green-700 h-50 w-70'>
            <h3 className='text-xl font-semibold font-sans text-slate-800'>Total Income</h3>
            <p className='text-5xl text-green-700 font-bold font-sans'>₹{income}</p>
            <p className="text-sm text-gray-500 mt-18">
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

          <div className='bg-white p-4 rounded-xl shadow-xl border-4 border-red-700 h-50 w-70'>
            <h3 className='text-xl font-semibold font-sans text-slate-800'>Total Expense</h3>
            <p className='text-5xl text-red-700 font-bold font-sans'>₹{expense}</p>
            <p className="text-sm text-gray-500 mt-18">
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

          <div className='bg-white p-4 rounded-xl shadow-xl border-4 border-orange-400 h-50 w-70'>
            <h3 className='text-xl font-semibold font-sans text-slate-800'>Total Savings</h3>
            <p className='text-5xl text-orange-400 font-bold font-sans'>₹{savings}</p>
            <p className="text-sm text-gray-500 mt-18">
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



        {/* Transactions */}
        <div>

          <h2 className='text-2xl text-blue-900 font-sans font-bold mb-4'>Recent Transactions</h2>
          <button
            onClick={() => router.push("/dashboard/transactions")}
            className="text-sm bg-purple-50 text-purple-800 border-2 border-purple-800 px-4 py-2 my-2 rounded-xl hover:bg-purple-700 hover:text-white transition"
          >
            View All →
          </button>

          {transactions.length === 0 ? (
            <p className='text-xl font-mono font-bold mb-4'>Start by adding your first transaction.</p>
          ) : (
            recentTransactions.map((t) => (
              <div
                key={t._id}
                className="flex justify-between bg-indigo-100 border-2 border-indigo-400 shadow-2xl rounded-2xl p-4 mb-4">
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
                }>{t.type === "expense" ? "-" : "+"} ₹{t.amount}</p>

              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default page
