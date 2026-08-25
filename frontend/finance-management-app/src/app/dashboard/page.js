"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import DashboardSkeleton from '@/app/components/loading/DashboardSkeleton'
import EmptyDashboard from './dashboardComponents/EmptyDashboard'
import ProfileMenu from "@/app/components/ProfileMenu"
import BudgetOverview from './dashboardComponents/BudgetOverview'
import RecentTransaction from './dashboardComponents/RecentTransaction'
import SummaryCards from './dashboardComponents/MoneyCards'


const page = () => {
  const router = useRouter();
  const [user, setUser] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [budgets, setBudgets] = useState([])
  const [loading, setLoading] = useState(true)

  //fetch user
  const fetchUser = async () => { //user data
    const token = localStorage.getItem("token")
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await res.json()

    if (!res.ok) {
      router.push("/login")
      return;
    }
    setUser(data.user);
  }


  //fetch transaction
  const fetchTransaction = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    setTransactions(
      Array.isArray(data)
        ? data
        : Array.isArray(data?.transactions)
          ? data.transactions
          : []
    );

    setLastUpdated(new Date().toLocaleString());
  };


  //fetch budgets
  const fetchBudgets = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/budget`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    setBudgets(Array.isArray(data) ? data : [])
  };

  useEffect(() => {

    const loadDashboard = async () => {

      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      setLoading(true);

      try {

        await Promise.all([
          fetchUser(),
          fetchTransaction(),
          fetchBudgets()
        ]);

      }

      catch (error) {
        console.log(error);
      }

      finally {
        setLoading(false);
      }

    };

    loadDashboard();

  }, []);

  if (!Array.isArray(transactions)) {
    return <div>Loading or Invalid Data...</div>
  }

  if(loading){
    return <DashboardSkeleton/>
}

  const isNewUser = transactions.length === 0 && budgets.length === 0;

  return (
    <>
      {isNewUser ? (
        <EmptyDashboard />
      ) : (
        <div className='ml-0 md:ml-10 py-3 px-5 md:p-2 max-w-6xl mx-auto'>
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-semibold text-[#172B2A]">
              Welcome back, {user?.name}!
            </h1>

            {/* Profile */}
            <ProfileMenu user={user} />
          </div>
          <p className="text-[#64748B] text-xl font-sans mx-auto">Let's take a look at your finances today.</p>

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
      )}

    </>
  )
}

export default page
