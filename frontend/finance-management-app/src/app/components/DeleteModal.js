"use client"
import React from 'react'

const DeleteModal = ({showDeleteModal, setShowDeleteModal, handleDeleteTransaction,}) => {
    if(!showDeleteModal) return null;
    return (
    <div className='fixed inset-0 bg-black/40 flex justify-center items-center z-50'>
      <div className='bg-white rounded-xl p-6 w-[350px]'>
        <h2 className='text-xl font-bold text-center mb-4'>Delete Transaction</h2>
        <p className='text-center text-gray-600 mb-6'>Are you sure you want to delete this transaction?</p>
        <div className='flex justify-end gap-3'>
            <button onClick={()=>setShowDeleteModal(false)} className="border px-4 py-2 rounded-lg">Cancel</button>
            <button onClick={handleDeleteTransaction} className="bg-red-600 text-white px-4 py-2 rounded-lg">Delete</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
