"use client"
import React, { useEffect, useState } from 'react'
import SummaryCards from './components/SummaryCards'
import GoalSection from './components/GoalSection'
import GoalModal from './components/GoalModal'
import DeleteGoalModal from './components/DeleteGoalModal'
import AddSavingsmodal from './components/AddSavingsmodal'
import BudgetSection from './components/BudgetSection'
import BudgetModel from './components/BudgetModel'
import DeleteBudgetModal from './components/DeleteBudgetModal'

const page = () => {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingGoal, setEditingGoal] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState(null)
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [showSavingsModal, setShowSavingsModal] = useState(false);
  const [selectedGoalForSavings, setSelectedGoalForSavings] = useState(null)
  const [budgets, setBudgets] = useState([])
  const [showBudgetModal, setShowBudgetModal] = useState(false)
  const [editingBudget, setEditingBudget] = useState(null)
  const [showDeleteBudgetModal, setShowDeleteBudgetModal] = useState(false)
  const [selectedBudget, setSelectedBudget] = useState(null)


  const fetchGoals = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://localhost:5000/api/goals", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const data = await res.json();
      setGoals(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const fetchBudgets = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://localhost:5000/api/budget", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!res.ok) {
        throw new Error("Failed to fetch budgets")
      }
      const data = await res.json()
      setBudgets(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGoals();
    fetchBudgets();
  }, [])

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5000/api/goals/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      fetchGoals()
      setShowDeleteModal(false)
      setSelectedGoal(null)
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteBudget = async(budgetId)=>{
    try{
      const token = localStorage.getItem("token")
      const res = await fetch(`http://localhost:5000/api/budget/${budgetId}`,{
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      if(!res.ok){
        throw new Error("Failed to delete budget")
      }

      fetchBudgets()
      setSelectedBudget(null)
      setShowDeleteBudgetModal(false)
    }catch(error){
      console.log(error)
    }
  }

  const totalSaved = goals.reduce(
    (sum, goal) => sum += goal.savedAmount, 0
  )

  const totalTarget = goals.reduce(
    (sum, goal) => sum += goal.targetAmount, 0
  )

  const activeGoals = goals.length

  return (
    
      <div className='px-6'>
        <h1 className='text-4xl font-bold text-purple-900 mb-8'>Financial Planner</h1>
        <SummaryCards totalSaved={totalSaved} totalTarget={totalTarget} activeGoals={activeGoals} />

        <GoalSection goals={goals} setShowGoalModal={setShowGoalModal} setEditingGoal={setEditingGoal} setShowDeleteModal={setShowDeleteModal} setSelectedGoal={setSelectedGoal} setShowSavingsModal={setShowSavingsModal} setSelectedGoalForSavings={setSelectedGoalForSavings} />

        {showGoalModal && <GoalModal setShowGoalModal={setShowGoalModal} fetchGoals={fetchGoals} editingGoal={editingGoal} setEditingGoal={setEditingGoal} />}

        {showDeleteModal && <DeleteGoalModal setShowDeleteModal={setShowDeleteModal} handleDelete={handleDelete} goalId={selectedGoal?._id} goalTitle={selectedGoal?.title} setSelectedGoal={setSelectedGoal} />}

        {showSavingsModal && <AddSavingsmodal setShowSavingModal={setShowSavingsModal} selectedGoalForSavings={selectedGoalForSavings} fetchGoals={fetchGoals} />}

        <BudgetSection budgets={budgets} setShowBudgetModal={setShowBudgetModal} setEditingBudget={setEditingBudget} setShowDeleteBudgetModal={setShowDeleteBudgetModal} setSelectedBudget={setSelectedBudget}/>

        {showBudgetModal && <BudgetModel setShowBudgetModal={setShowBudgetModal} fetchBudgets={fetchBudgets} editingBudget={editingBudget} setEditingBudget={setEditingBudget}/>}

        {showDeleteBudgetModal && (<DeleteBudgetModal setShowDeleteBudgetModal={setShowDeleteBudgetModal} handleDeleteBudget={handleDeleteBudget} budgetId={selectedBudget?._id} budgetCategory={selectedBudget?.category} setSelectedBudget={setSelectedBudget}/>)}
        
      </div>

  )
}

export default page
