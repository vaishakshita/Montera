"use client"
import React, { useState } from 'react'
import ButtonLoader from '@/app/components/loading/ButtonLoader'
import toast from 'react-hot-toast'

const AddSavingsmodal = ({ setShowSavingModal, selectedGoalForSavings, fetchGoals }) => {
    const [amount, setAmount] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        try {
            if (Number(amount) <= 0) {
                return;
            }
            const token = localStorage.getItem("token")
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/goals/${selectedGoalForSavings._id}/add-savings`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    amount: Number(amount)
                })
            })

            if (!res.ok) {
                toast.error("Failed to add savings")
            }
            fetchGoals()
            toast.success("Savings added successfully")
            setAmount("")
            setShowSavingModal(false)
        } catch (error) {
            console.log(error)
            toast.error(data.message)
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-7 z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-3xl font-bold text-green-700">Add savings</h2>
                    <p className="text-gray-500 mt-2 mb-6">Deposit money into this goal</p>
                    <label className='font-medium'>Amount</label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full mt-2 px-4 py-3 rounded-xl bg-[#F8FAF8] border-2 border-[#9BAFA5] focus:border-[#2F6F5E]" />
                    <div className="flex justify-end gap-3 mt-8">
                        <button type='button' disabled={loading} onClick={() => { setAmount(""); setShowSavingModal(false) }} className={`px-5 py-2 border rounded-lg transition ${loading
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-gray-100"
                            }`}>Cancel</button>

                        <button type='submit' disabled={loading} className={`px-5 py-2 text-white rounded-lg ${loading
                            ? "bg-green-400 cursor-not-allowed"
                            : "bg-green-800 hover:bg-green-900"
                            }`}>{loading ? (<ButtonLoader text="Adding..." />) : ("Add Savings")}</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default AddSavingsmodal
