"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { FaFilter } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCircleArrowUp } from "react-icons/fa6";
import { FaArrowCircleDown } from "react-icons/fa";

import ProfileMenu from '@/app/components/ProfileMenu'
import TransactionSkeleton from '@/app/components/loading/TransactionSkeleton';
import EmptyTransaction from './components/EmptyTransaction';
import AddTransactionModal from '@/app/dashboard/transactions/components/AddTransactionModal'
import DeleteModal from '@/app/dashboard/transactions/components/DeleteModal';
import FilterModal from '@/app/dashboard/transactions/components/FilterModal'
import toast from 'react-hot-toast';


const page = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [search, setSearch] = useState("")
  const [transactions, setTransactions] = useState([])
  const safeTransactions = Array.isArray(transactions) ? transactions : [];
  const latestTransaction = safeTransactions[0];

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: ""
  })

  //filter state
  const [showFilter, setShowFilter] = useState(false)
  const [cardFilters, setCardFilters] = useState({
    type: "all",
    category: "",
    dateType: "",
    date: "",
    month: "",
    year: "",
    sort: "",
  })
  const [displayTransaction, setDisplayTransaction] = useState([])



  //fetch user info
  const fetchUser = async () => {
    const token = localStorage.getItem("token")
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    const data = await res.json()
    if (res.ok) {
      setUser(data.user)
    } else {
      router.push("/login")
    }
  }


  //fetch transaction
  const fetchTransaction = async () => {
    const token = localStorage.getItem("token")
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    const data = await res.json()
    const fetchedTransactions = Array.isArray(data)
      ? data
      : Array.isArray(data?.transactions)
        ? data.transactions
        : [];

    setTransactions(fetchedTransactions)
    setDisplayTransaction(fetchedTransactions)
  };

  useEffect(() => {
    const loadTransactionsPage = async () => {
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
        ]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactionsPage();
  }, [router]);

  // Add transaction
  const handleAddTransaction = async (e) => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      console.log(formData)

      const url = isEditing
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/transactions/${selectedTransaction._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/transactions`;

      const method = isEditing ? "PUT" : "POST";
      console.log(formData);
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json();

      if (res.ok) {
        toast.success(isEditing
          ? "Transaction updated successfully"
          : "Transaction added successfully")
        setShowModal(false)
        setFormData({
          title: "",
          amount: "",
          type: "expense",
          category: "",
          date: "",
        });

        setIsEditing(false);
        setSelectedTransaction(null);
        await fetchTransaction();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  // Edit transaction
  const handleEdit = (transaction) => {
    setLoading(true);
    try {
      setIsEditing(true);
      setSelectedTransaction(transaction);

      setFormData({
        title: transaction.title,
        amount: transaction.amount,
        category: transaction.category,
        type: transaction.type,
        date: transaction.date
          ? transaction.date.slice(0, 10)
          : "",
      })
      setShowModal(true)
    } catch (error) {
      console.log(error)
    }

    finally {
      setLoading(false)
    }
  }

  //delete transaction
  const handleDeleteTransaction = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions/${selectedTransaction._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await res.json()
      if (res.ok) {
        toast.success("Transaction deleted successfully")
        setShowDeleteModal(false);
        setSelectedTransaction(null);
        await fetchTransaction();
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  const handleAdd = () => {
    setIsEditing(false);
    setSelectedTransaction(null);
    setFormData({
      title: "",
      amount: "",
      category: "",
      type: "expense",
      date: "",
    });
    setShowModal(true);
  };

  //apply filter to transaction
  const applyFilters = () => {
    let filtered = [...transactions]
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (cardFilters.type !== "all") {
      filtered = filtered.filter(
        t => t.type === cardFilters.type
      );
    }

    if (cardFilters.category) {
      filtered = filtered.filter(
        t => t.category === cardFilters.category
      )
    }

    if (cardFilters.dateType === "date" && cardFilters.date) {
      filtered = filtered.filter((t) => {
        const transactionDate = new Date(t.date).toISOString().split("T")[0];
        return transactionDate === cardFilters.date;
      });
    }

    if (cardFilters.dateType === "month" && cardFilters.month) {
      filtered = filtered.filter((t) => {
        const transactionMonth = new Date(t.date)
          .toISOString()
          .slice(0, 7);

        return transactionMonth === cardFilters.month;
      });
    }

    if (cardFilters.dateType === "year" && cardFilters.year) {
      filtered = filtered.filter((t) => {
        const transactionYear = new Date(t.date)
          .getFullYear()
          .toString();

        return transactionYear === cardFilters.year;
      });
    }

    if (cardFilters.sort === "oldest") {
      filtered.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      )
    }

    setDisplayTransaction(filtered);

  }

  //calculations
  const income = safeTransactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
  const expense = safeTransactions.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);

  const searchedTransactions = displayTransaction.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );


  const formatCurrency = (amount) => `₹${amount.toLocaleString("en-IN")}`;
  if (loading) {
    return <TransactionSkeleton />;
  }

  return (
    <>
      <div className='ml-0 md:ml-10 py-3 px-5 md:p-2 max-w-6xl mx-auto'>
        {/* topsection */}
        <div className='flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto'>
          <h1 className='text-2xl md:text-4xl font-semibold text-[#173F35]'>Transactions</h1>

          {transactions.length !== 0 &&
            <div className='flex gap-4 p-4'>
              <button onClick={handleAdd} className='flex items-center gap-2 bg-white text-[#3F8065] border-2 border-[#3F8065] text-sm p-1 rounded-xl font-sans font-semibold'><FaPlusCircle size={20} /> Add Transaction</button>
              <button className='rounded-lg px-4 py-2 bg-[#3F8065] text-white transition' onClick={() => setShowFilter(true)}><FaFilter size={15} /></button>
              <ProfileMenu user={user} />
            </div>
          }

        </div>

        {/* search */}
        {transactions.length !== 0 && <div className='relative w-full max-w-sm mx-auto md:ml-0'>
          <input type="text" placeholder='Search transaction by title...' value={search} onChange={(e) => setSearch(e.target.value)} className='w-full border-2 border-green-700 rounded-xl py-2 pl-4 pr-10 outline-none focus:border-green-900' />
          <FiSearch size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
        </div>}


        {/* income/expense cards */}
        <div className='flex flex-col sm:flex-row gap-10 relative mx-auto mt-6'>
          <div className='flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow-xl border-2 border-r border-[#D5DDD7] h-40 w-50 lg:w-60'>
            <div className='flex flex-row gap-2'>
              <FaCircleArrowUp size={30} className='text-[#3F8065]' />
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
              <FaArrowCircleDown size={30} className='text-[#3F8065]' />
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
        </div>

        {/* transactions */}
        {transactions.length === 0 ? (

          <EmptyTransaction onAdd={handleAdd} />

        ) : (
          <div className='py-3 px-5 rounded-3xl mt-4 mx-auto max-h-[630px] overflow-y-auto'>
            {searchedTransactions.length === 0 ? (
              <p className='text-lg font-bold text-[#173F35]'>No transactions found</p>
            ) : (
              searchedTransactions.map((t) => (
                <div
                  key={t._id}
                  className="flex justify-between items-center bg-[#E1EEE8] border-2 border-[#9FC4B5] shadow-xl rounded-2xl p-4 mb-4">
                  <div>
                    <p className='text-lg font-sans font-semibold text-[#2F6F5E]'>{t.title}</p>
                    <p className='text-[#173F35] text-sm font-medium font-sans'>{t.category}</p>
                    <p className="text-sm text-[#64748B]">{t.date
                      ? new Date(t.date).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "2-digit",
                      })
                      : "No date"}
                    </p>
                    {/* buttons */}
                    <div className='flex gap-3 mt-3'>
                      <button onClick={() => handleEdit(t)} className='rounded-lg bg-green-700 p-2 text-purple-600 hover:bg-green-900 transition'>
                        <MdEdit className="text-white" />
                      </button>
                      <button onClick={() => { setSelectedTransaction(t); setShowDeleteModal(true) }} className='rounded-lg bg-green-700 p-2 text-white hover:bg-green-900 transition'>
                        <RiDeleteBin6Line className="text-white" />
                      </button>
                    </div>
                  </div>

                  <p className={
                    t.type === "expense"
                      ? "text-red-500 font-semibold text-sm lg:text-lg"
                      : "text-green-500 font-semibold text-sm lg:text-lg"
                  }>{t.type === "expense" ? "-" : "+"} {formatCurrency(t.amount)} </p>
                </div>

              ))
            )}
          </div>
        )}
      </div>

      {/* Modal form */}

      <AddTransactionModal loading={loading} transactions={transactions} showModal={showModal} setShowModal={setShowModal} formData={formData} setFormData={setFormData} handleAddTransaction={handleAddTransaction} isEditing={isEditing} selectedTransaction={selectedTransaction} />

      <FilterModal showFilter={showFilter} setShowFilter={setShowFilter} cardFilters={cardFilters} setCardFilters={setCardFilters} applyFilters={applyFilters} />

      <DeleteModal loading={loading} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} handleDeleteTransaction={handleDeleteTransaction} />
    </>
  )
}

export default page
