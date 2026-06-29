"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { FaFilter } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

import Sidebar from '@/app/components/Sidebar'
import ProfileMenu from '@/app/components/ProfileMenu'
import AddTransactionModal from '@/app/components/AddTransactionModal'
import DeleteModal from '@/app/components/DeleteModal';
import FilterModal from '@/app/components/FilterModal'
import toast from 'react-hot-toast';


const page = () => {
  const router = useRouter()
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
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    const fetchUser = async () => {
      const res = await fetch("http://localhost:5000/api/auth/me", {
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
    fetchUser()
  }, [])

  //fetch transcation
  const fetchTansaction = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://localhost:5000/api/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      const data = await res.json()
      console.log(
        data.map(t => ({
          title: t.title,
          date: t.date,
          createdAt: t.createdAt,
        }))
      )
      // console.log("RAW DATA:", data);
      // console.log("TYPE:", typeof data);
      // console.log("IS ARRAY:", Array.isArray(data));
      // console.log("TRANSACTIONS FIELD:", data?.transactions);
      const fetchedTransactions = Array.isArray(data)
        ? data
        : Array.isArray(data?.transactions)
          ? data.transactions
          : [];

      setTransactions(fetchedTransactions)
      setDisplayTransaction(fetchedTransactions)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchTansaction()
  }, [])

  // Add transaction
  const handleAddTransaction = async (e) => {
    try {
      const token = localStorage.getItem("token")
      console.log(formData)

      const url = isEditing
        ? `http://localhost:5000/api/transactions/${selectedTransaction._id}`
        : "http://localhost:5000/api/transactions";

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
        fetchTansaction();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Edit transaction
  const handleEdit = (transaction) => {
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
  }

  //delete transaction
  const handleDeleteTransaction = async()=>{
    try{
      const token = localStorage.getItem("token")
      const res = await fetch(`http://localhost:5000/api/transactions/${selectedTransaction._id}`,{
        method: "DELETE",
        headers:{
          Authorization: `Bearer ${token}`
        }
      })

      const data = await res.json()
      if(res.ok){
        toast.success("Transaction deleted successfully")
        setShowDeleteModal(false);
        setSelectedTransaction(null);
        fetchTansaction();
      } else {
        toast.error(data.message)
      }
    }catch(error){
      console.log(error)
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

  //apply filter to transcation
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

  // console.log("STATE transactions:", transactions);
  // console.log("IS ARRAY STATE:", Array.isArray(transactions));

  return (
    <>
      <Sidebar className="hidden md:block" />

      <div className='ml-0 md:ml-10 py-3 px-5 md:p-2 max-w-6xl mx-auto'>
        {/* topsection */}
        <div className='flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto'>
          <h1 className='text-2xl md:text-3xl font-bold font-sans text-purple-800'>TRANSACTIONS</h1>

          <div className='flex gap-4 p-4'>
            <button onClick={handleAdd} className='bg-white text-purple-800 border-2 border-purple-700 text-sm p-1 rounded-xl font-sans font-semibold'>+ Add Transaction</button>
            <button className='rounded-lg px-4 py-2 bg-purple-800 text-white transition' onClick={() => setShowFilter(true)}><FaFilter size={15} /></button>
            <ProfileMenu user={user} />
          </div>
        </div>

        {/* search */}
        <div className='relative w-full max-w-sm'>
          <input type="text" placeholder='Search transaction...' value={search} onChange={(e) => setSearch(e.target.value)} className='w-full border-2 border-blue-400 rounded-xl py-2 pl-4 pr-10 outline-none focus:border-blue-600' />
          <FiSearch size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
        </div>

        {/* income/expense cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6'>
          <div className='bg-white p-4 rounded-xl shadow-xl border-4 border-green-700 opacity-80 xl:w-1/2'>
            <h3 className='text-lg font-semibold font-sans text-slate-800'>Total Income</h3>
            <p className='text-2xl md:text-3xl text-green-700 font-bold font-sans'>₹{income}</p>
            <p className="text-sm text-gray-500">
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

          <div className='bg-white p-4 rounded-xl shadow-xl border-4 border-red-700 opacity-80 xl:w-1/2'>
            <h3 className='text-lg font-semibold font-sans text-slate-800'>Total Expense</h3>
            <p className='text-2xl md:text-3xl text-red-700 font-bold font-sans'>₹{expense}</p>
            <p className="text-sm text-gray-500">
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

        {/* transactions */}
        <div className='bg-white py-3 px-5 rounded-3xl mt-4 shadow-xl mx-auto max-h-[630px] overflow-y-auto'>
          {searchedTransactions.length === 0 ? (
            <p className='text-lg font-bold'>No transactions found</p>
          ) : (
            searchedTransactions.map((t) => (
              <div
                key={t._id}
                className="flex justify-between items-center bg-indigo-100 border-2 border-indigo-400 shadow-2xl rounded-2xl p-4 mb-4">
                <div>
                  <p className='text-lg font-sans font-semibold text-indigo-800'>{t.title}</p>
                  <p className='text-slate-700 text-sm font-medium font-sans'>{t.category}</p>
                  <p className="text-sm text-gray-600">{t.date
                    ? new Date(t.date).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "2-digit",
                    })
                    : "No date"}
                  </p>
                  {/* buttons */}
                  <div className='flex gap-2'>
                    <button onClick={() => handleEdit(t)} className='p-1 border-slate-700 border-2 rounded-2xl bg-blue-500'>
                      <MdEdit className="text-white hover:text-blue-800 hover:bg-white text-sm" />
                    </button>
                    <button onClick={()=>{setSelectedTransaction(t); setShowDeleteModal(true)}} className='p-1 rounded-2xl border-slate-700 border-2 bg-red-500'>
                      <AiFillDelete className="text-white hover:text-red-800 hover:bg-white text-sm" />
                    </button>
                  </div>
                </div>

                <p className={
                  t.type === "expense"
                    ? "text-red-500 font-semibold text-xs lg:text-lg"
                    : "text-green-500 font-semibold text-xs lg:text-lg"
                }>{t.type === "expense" ? "-" : "+"} ₹{t.amount} </p>
              </div>

            ))
          )}
        </div>
      </div>

      {/* Modal form */}
      <AddTransactionModal showModal={showModal} setShowModal={setShowModal} formData={formData} setFormData={setFormData} handleAddTransaction={handleAddTransaction} handleAdd={handleAdd} isEditing={isEditing} selectedTransaction={selectedTransaction} />

      <FilterModal showFilter={showFilter} setShowFilter={setShowFilter} cardFilters={cardFilters} setCardFilters={setCardFilters} applyFilters={applyFilters} />

      <DeleteModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} handleDeleteTransaction={handleDeleteTransaction}/>
    </>
  )
}

export default page
