"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast';

const GoalModal = ({ setShowGoalModal, fetchGoals, editingGoal, setEditingGoal }) => {
    const [title, setTitle] = useState("")
    const [targetAmount, setTargetAmount] = useState("")
    const [savedAmount, setSavedAmount] = useState("")
    const [deadline, setDeadline] = useState("")

    useEffect(() => {
        if (editingGoal) {
            setTitle(editingGoal.title);
            setTargetAmount(editingGoal.targetAmount);
            setSavedAmount(editingGoal.savedAmount);
            setDeadline(editingGoal.deadline.split("T")[0]);
        } else {
            setTitle("");
            setTargetAmount("");
            setSavedAmount("");
            setDeadline("");
        }
    }, [editingGoal]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (Number(targetAmount) < Number(savedAmount)) {
                toast.error("Target amount cannot be less than saved amount.");
                return;
            }
            const token = localStorage.getItem("token")
            const url = editingGoal ? `http://localhost:5000/api/goals/${editingGoal._id}` : "http://localhost:5000/api/goals";

            const method = editingGoal ? "PUT" : "POST"
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({
                    title,
                    targetAmount: Number(targetAmount),
                    savedAmount: Number(savedAmount),
                    deadline,
                })
            })


            if (!res.ok) {
                throw new Error(editingGoal ? "Failed to update goal" : "Failed to create goal");
            }

            fetchGoals();
            setTitle("");
            setTargetAmount("");
            setSavedAmount("");
            setDeadline("");
            setEditingGoal(null)
            setShowGoalModal(false);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='fixed inset-0 bg-black/40 flex justify-center items-center z-50'>
            <div className='bg-white rounded-2xl p-8 w-full max-w-md shadow-xl'>
                <h2 className='text-3xl font-bold text-purple-900 mb-2'>{editingGoal ? "Edit Goal" : "Add New Goal"}</h2>
                <p className='text-gray-500 font-semibold mb-6'>{editingGoal ? "Update your savings goal details." : "Create a savings goal and track your progress over time."}</p>
                <form onSubmit={handleSubmit}>
                    <label className='font-medium'>Goal Name</label>
                    <input type="text" value={title} className="w-full mt-2 mb-5 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-600" onChange={(e) => setTitle(e.target.value)} required />

                    <label className='font-medium'>Target Amount</label>
                    <input type="number" value={targetAmount} className="w-full mt-2 mb-5 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-600" onChange={(e) => setTargetAmount(e.target.value)} required />

                    <label className='font-medium'>Initial Savings</label>
                    <input type="number" value={savedAmount} className="w-full mt-2 mb-5 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-600" onChange={(e) => setSavedAmount(e.target.value)} required />

                    <label className='font-medium'>Deadline</label>
                    <input type="date" value={deadline} className="w-full mt-2 mb-5 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-600" onChange={(e) => setDeadline(e.target.value)} required />

                    <div className='flex justify-end gap-3 mt-8'>
                        <button type='button' onClick={() => { setEditingGoal(null); setTitle(""); setTargetAmount(""); setSavedAmount(""); setDeadline(""); setShowGoalModal(false) }} className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">Cancel</button>
                        <button type='submit' className="px-5 py-2 rounded-lg bg-purple-700 text-white hover:bg-purple-800 transition">{editingGoal ? "Update Goal" : "Create Goal"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default GoalModal
