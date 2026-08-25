"use client"
import React, { useEffect, useState } from 'react'
import PlannerSkeleton from '@/app/components/loading/PlannerSkeleton'
import EmptyPlanner from './components/EmptyPlanner'
import SummaryCards from './components/SummaryCards'
import GoalSection from './components/GoalSection'
import GoalModal from './components/GoalModal'
import DeleteGoalModal from './components/DeleteGoalModal'
import AddSavingsmodal from './components/AddSavingsmodal'
import BudgetSection from './components/BudgetSection'
import BudgetModel from './components/BudgetModel'
import DeleteBudgetModal from './components/DeleteBudgetModal'
import toast from 'react-hot-toast';

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
    const token = localStorage.getItem("token")
    try {

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/goals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const data = await res.json();
      setGoals(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  const fetchBudgets = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/budget`, {
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
      console.log(error);
      throw error;
    }
  }

  useEffect(() => {
    const loadPlanner = async () => {
      setLoading(true);

      try {
        await Promise.all([
          fetchGoals(),
          fetchBudgets(),
        ]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadPlanner();
  }, []);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/goals/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      await fetchGoals()
      toast.success("Goal deleted successfully")
      setShowDeleteModal(false)
      setSelectedGoal(null)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteBudget = async (budgetId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/budget/${budgetId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      if (!res.ok) {
        throw new Error("Failed to delete budget")
      }

      await fetchBudgets()
      toast.success("Budget deleted successfully")
      setSelectedBudget(null)
      setShowDeleteBudgetModal(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  const totalSaved = goals.reduce(
    (sum, goal) => sum += goal.savedAmount, 0
  )

  const totalTarget = goals.reduce(
    (sum, goal) => sum += goal.targetAmount, 0
  )

  const activeGoals = goals.length

  if (loading) {
    return <PlannerSkeleton />;
  }

  return (

    <div className='px-6 bg-[#F5F8F6]'>
      {goals.length === 0 && budgets.length === 0 ? (<EmptyPlanner onAddGoal={() => setShowGoalModal(true)} onAddBudget={() => setShowBudgetModal(true)}/>) : (
        <>
          <h1 className='text-4xl font-semibold text-[#166534] mb-8'>Financial Planner</h1>
          <SummaryCards totalSaved={totalSaved} totalTarget={totalTarget} activeGoals={activeGoals} />

          <GoalSection goals={goals} setShowGoalModal={setShowGoalModal} setEditingGoal={setEditingGoal} setShowDeleteModal={setShowDeleteModal} setSelectedGoal={setSelectedGoal} setShowSavingsModal={setShowSavingsModal} setSelectedGoalForSavings={setSelectedGoalForSavings} />

          <BudgetSection budgets={budgets} setShowBudgetModal={setShowBudgetModal} setEditingBudget={setEditingBudget} setShowDeleteBudgetModal={setShowDeleteBudgetModal} setSelectedBudget={setSelectedBudget} />
        </>
      )}


      {showGoalModal && <GoalModal setShowGoalModal={setShowGoalModal} fetchGoals={fetchGoals} editingGoal={editingGoal} setEditingGoal={setEditingGoal} />}

      {showDeleteModal && <DeleteGoalModal loading={loading} setShowDeleteModal={setShowDeleteModal} handleDelete={handleDelete} goalId={selectedGoal?._id} goalTitle={selectedGoal?.title} setSelectedGoal={setSelectedGoal} />}

      {showSavingsModal && <AddSavingsmodal setShowSavingModal={setShowSavingsModal} selectedGoalForSavings={selectedGoalForSavings} fetchGoals={fetchGoals} />}

      {showBudgetModal && <BudgetModel setShowBudgetModal={setShowBudgetModal} fetchBudgets={fetchBudgets} editingBudget={editingBudget} setEditingBudget={setEditingBudget} />}

      {showDeleteBudgetModal && (<DeleteBudgetModal loading={loading} setShowDeleteBudgetModal={setShowDeleteBudgetModal} handleDeleteBudget={handleDeleteBudget} budgetId={selectedBudget?._id} budgetCategory={selectedBudget?.category} setSelectedBudget={setSelectedBudget} />)}

    </div>

  )
}

export default page
