import React from 'react'
import BudgetCard from './BudgetCard'

const BudgetSection = ({ budgets, setShowBudgetModal, setEditingBudget, setShowDeleteBudgetModal, setSelectedBudget }) => {
    return (
        <div className='mt-10'>
            <div className='flex items-center justify-between mb-6'>
                <h2 className='text-3xl font-bold text-purple-900'>Category Budgets</h2>
                <button onClick={() => { setEditingBudget(null); setShowBudgetModal(true); }} className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 transition">+ Add Budget</button>
            </div>

            <div className='space-y-5'>
                {budgets.length === 0 ? (
                <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">No budgets added yet. Create your first category budget to start tracking your monthly spending.</div>
            ) : (
                <div>{budgets.map((budget) => (
                    <BudgetCard 
                    key={budget._id} 
                    budget={budget}

                    onEdit={()=>{
                        setEditingBudget(budget);
                        setShowBudgetModal(true);
                    }}

                    onDelete={()=>{
                        setSelectedBudget(budget);
                        setShowDeleteBudgetModal(true);
                    }}
                    />
                ))}
                </div>
            )}
            </div>
        </div>
    )
}

export default BudgetSection
