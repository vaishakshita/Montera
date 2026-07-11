import React from 'react'

const DeleteBudgetModal = ({ setShowDeleteBudgetModal,handleDeleteBudget,budgetId,budgetCategory,setSelectedBudget }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-red-600">Delete Budget</h2>
        <p className="mt-4 text-gray-600">Are you sure you want to delete
            <span>{" "}{budgetCategory}</span> ?
        </p>
        <div className='mt-8 flex justify-end gap-3'>
            <button type='button' onClick={()=>{
                setSelectedBudget(null)
                setShowDeleteBudgetModal(false)
            }} className="rounded-lg border border-gray-300 px-5 py-2 text-gray-700 hover:bg-gray-100 transition">Cancel</button>

            <button type='submit' onClick={()=>handleDeleteBudget(budgetId)} className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 transition">Delete</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteBudgetModal
