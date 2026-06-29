"use client"
import React from 'react'

const addTransactionModal = ({
    showModal,
    setShowModal,
    formData,
    setFormData,
    handleAddTransaction,
    handleAdd,
    isEditing,
    selectedTransaction,
}) => {
    const modalDesign = "w-full border-2 border-blue-300 rounded-lg p-1 mb-4"
    if (!showModal) return null;
    return (
        <>
            <button onClick={handleAdd} className='bg-white text-purple-800 border-2 border-purple-700 text-sm p-2 rounded-xl font-sans font-semibold'>+ Add Transaction</button>
            {showModal && (
                <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
                    <div className='flex flex-col bg-white rounded-2xl p-8 w-[420px] shadow-2xl'>
                        <h2 className='flex justify-center text-xl font-bold font-sans text-blue-800'>{isEditing ? "Edit Transaction" : "Add Transaction"}</h2>

                        <label className='font-sans'>Title</label>
                        <input type="text" className={modalDesign} value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                        <label className='font-sans'>Amount</label>
                        <input type="number" className={modalDesign} value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value), })} />
                        <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className={modalDesign}>
                            <option value="expense">Expense</option>
                            <option value="income">income</option>
                        </select>
                        <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className={modalDesign}>
                            <option value="">Select Category</option>
                            <option value="Food and drinks">Food and drinks</option>
                            <option value="Bills">Bills</option>
                            <option value="Travel">Travel</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Grocery">Grocery</option>
                            <option value="Salary">Salary</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Others">Others</option>
                        </select>
                        <input type="date" value={formData.date}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    date: e.target.value,
                                })
                            } className={modalDesign} />

                        <div className='flex justify-end gap-3'>
                            <button onClick={() => setShowModal(false)} className='px-4 py-2 rounded-lg border-2 border-blue-700 text-blue-900'>Cancel</button>
                            <button onClick={handleAddTransaction} className='bg-indigo-600 text-white px-5 py-2 rounded-lg'>{isEditing ? "Update" : "Add"}</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default addTransactionModal
