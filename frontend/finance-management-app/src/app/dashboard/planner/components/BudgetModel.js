"use client"
import React, { useEffect, useState } from 'react'
import {FaUtensils,FaShoppingCart,FaFilm,FaFileInvoiceDollar,FaShoppingBasket,FaPlaneDeparture,FaMoneyBillWave,FaQuestionCircle,} from "react-icons/fa";

export const categoryIcons = {
  "Food and drinks": FaUtensils,
  "Shopping": FaShoppingCart,
  "Entertainment": FaFilm,
  "Bills": FaFileInvoiceDollar,
  "Grocery": FaShoppingBasket,
  "Travel": FaPlaneDeparture,
  "Salary": FaMoneyBillWave,
  "Others": FaQuestionCircle,
};


const BudgetModel = ({ setShowBudgetModal, fetchBudgets, editingBudget, setEditingBudget }) => {
  const [category, setCategory] = useState("")
  const [amount, setAmount] = useState("")
  const [month, setMonth] = useState(
    new Date().getFullYear()
  )
  const [year, setYear] = useState(
    new Date().getFullYear()
  )

  const categories = [
    "Food and drinks",
    "Shopping",
    "Entertainment",
    "Bills",
    "Grocery",
    "Travel",
    "Salary",
    "Others",
  ]

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

  useEffect(() => {
    if (editingBudget) {
      setCategory(editingBudget.category)
      setAmount(editingBudget.amount)
      setMonth(editingBudget.month)
      setYear(editingBudget.year)
    } else {
      setCategory("")
      setAmount("")
      setMonth("")
      setYear("")
    }
  }, [editingBudget])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token")
      const url = editingBudget ? `http://localhost:5000/api/budget/${editingBudget._id}` : "http://localhost:5000/api/budget";

      const method = editingBudget ? "PUT" : "POST"
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
          category,
          amount: Number(amount),
          month,
          year,
        })
      })

      if (!res.ok) {
        throw new Error(editingBudget ? "Failed to update budget" : "Failed to create budget");
      }
      
      fetchBudgets()

      setCategory("")
      setAmount("")
      setMonth(new Date().getMonth()+1)
      setYear(new Date().getFullYear())

      setEditingBudget(null)
      setShowBudgetModal(false)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='fixed inset-0 bg-black/40 flex justify-center items-center z-50'>
            <div className='bg-white rounded-2xl p-8 w-full max-w-md shadow-xl'>
              <div className='mb-6'>
                <h2 className='text-3xl font-bold text-purple-900 mb-2'>{editingBudget ? "Edit Budget" : "Add New Budget"}</h2>
                <p className='text-gray-500 font-semibold mb-6'>{editingBudget ? "Update your budget details." : "Set a monthly budget for a spending category."}</p>
              </div>
                <form onSubmit={handleSubmit} className='space-y-5'>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>
                    <select value={category} onChange={(e)=>setCategory(e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-purple-500">
                      <option value="">Select Category</option>
                      {categories.map((item)=>(
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>Budget Amount</label>
                    <input type="number" placeholder='Enter budget amount' value={amount} className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-purple-500" onChange={(e) => setAmount(e.target.value)} />
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>Month</label>
                    <select value={month} onChange={(e)=>setMonth(Number(e.target.value))} className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-purple-500">
                      {months.map((monthName, index)=>(
                        <option key={index} value={index+1}>{monthName}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>Year</label>
                    <input type="number" value={year} className="w-full mt-2 mb-5 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-600" onChange={(e) => setYear(Number(e.target.value))} />
                  </div>

                    <div className='flex justify-end gap-3 pt-2'>
                        <button type='button' onClick={() => {setEditingBudget(null); setShowBudgetModal(false);}} className="rounded-lg border border-gray-300 px-5 py-2 text-gray-700 transition hover:bg-gray-100">Cancel</button>
                        <button type='submit' className="rounded-lg bg-purple-600 px-5 py-2 text-white transition hover:bg-purple-700">{editingBudget ? "Update Budget" : "Save Budget"}</button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default BudgetModel
