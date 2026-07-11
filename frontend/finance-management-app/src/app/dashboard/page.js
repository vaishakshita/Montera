"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import ProfileMenu from "@/app/components/ProfileMenu"
import BudgetOverview from './dashboardComponents/BudgetOverview'
import RecentTransaction from './dashboardComponents/RecentTransaction'
import SummaryCards from './dashboardComponents/MoneyCrads'


const page = () => {
  const router = useRouter();
  const [user, setUser] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [budgets, setBudgets] = useState([])

  //fetch user
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


  //fetch budgets
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/budget", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        setBudgets(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBudgets();
  }, []);

  if (!Array.isArray(transactions)) {
    return <div>Loading or Invalid Data...</div>
  }

  return (
    <>
      <div className='ml-0 md:ml-10 py-3 px-5 md:p-2 max-w-6xl mx-auto'>
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-semibold text-slate-800">
            Welcome {user?.name}!
          </h1>

          {/* Profile */}
          <ProfileMenu user={user} />
        </div>

        {/* Cards */}
        <div>
          <SummaryCards transactions={transactions} />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 mt-8'>
          {/* budget */}
          <div>
            <BudgetOverview budgets={budgets} />
          </div>

          {/* Transactions */}
          <div className="lg:col-span-2">
            <RecentTransaction transactions={transactions} />
          </div>

        </div>
      </div>
    </>
  )
}

export default page
