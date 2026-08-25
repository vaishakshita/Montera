import React from 'react'
import { GoGoal } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";

const GoalCard = ({ goal, onEdit, onDelete, onSavings }) => {
  const progress = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100)
  const completed = goal.savedAmount >= goal.targetAmount
  return (
    <div className='bg-white rounded-2xl shadow-md border border-green-100 p-6 hover:shadow-xl transition'>
      <div className='flex justify-between items-start'>
        <div>
          <div className='flex items-center gap-3'>
            <GoGoal size={30} className='text-green-600' />
            <h2 className='text-2xl font-bold text-green-800'>{goal.title}</h2>
          </div>
          <p className='text-gray-500 mt-2'>₹{goal.savedAmount.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()}</p>
        </div>
        {completed ? (
          <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
            ✓ Completed
          </span>
        ) : (
          <span className="text-sm bg-purple-100 text-green-700 px-3 py-1 rounded-full">
            {progress.toFixed(0)}%
          </span>
        )}
      </div>

      <div className='mt-5'>
        <div className='w-full h-3 rounded-full bg-gray-200 overflow-hidden'>
          <div style={{ width: `${progress}%` }} className={`h-full rounded-full ${completed
              ? "bg-green-600"
              : "bg-gradient-to-r from-green-500 to-emerald-400"
            }`} />
        </div>
      </div>

      <div className='mt-6 flex justify-between items-center'>
        <div>
          <p className='text-sm text-gray-500'>Deadline</p>
          <p className='font-semibold text-gray-800'>{new Date(goal.deadline).toLocaleDateString()}</p>
        </div>

        <div className='flex items-center gap-3'>
          <button onClick={onSavings} className='p-2 rounded-lg bg-green-100 hover:bg-green-200 transition'><FaPlus className="text-green-700" /></button>
          <button onClick={onEdit} className='p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 transition'><MdEdit className="text-yellow-700" /></button>
          <button onClick={onDelete} className='p-2 rounded-lg bg-red-100 hover:bg-red-200 transition'><RiDeleteBin6Line className="text-red-700" /></button>
        </div>
      </div>
    </div>
  )
}

export default GoalCard
