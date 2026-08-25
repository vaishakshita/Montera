import React from 'react'
import GoalCard from './GoalCard'

const GoalSection = ({ goals, setShowGoalModal, setEditingGoal, setSelectedGoal, setShowDeleteModal,setShowSavingsModal,setSelectedGoalForSavings }) => {
    return (
        <div className='mt-10'>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-3xl font-bold text-green-800'>Goals</h2>
                <button onClick={() => setShowGoalModal(true)} className='px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition font-medium'>+ Add Goal</button>
            </div>

            <div className='space-y-5'>
                {goals.length === 0 ? (
                    <p className="text-gray-500 text-center py-10">No goals created yet</p>
                ) : (
                    goals.map((goal) => (

                        <GoalCard
                            key={goal._id}
                            goal={goal}
                            onEdit={() => {
                                setEditingGoal(goal);
                                setShowGoalModal(true);
                            }}
                            onDelete={() => {
                                setSelectedGoal(goal);
                                setShowDeleteModal(true);
                            }}
                            onSavings={() => {
                                setSelectedGoalForSavings(goal);
                                setShowSavingsModal(true);
                            }}
                        />

                    ))
                )
                }
            </div>
        </div>
    )
}

export default GoalSection
