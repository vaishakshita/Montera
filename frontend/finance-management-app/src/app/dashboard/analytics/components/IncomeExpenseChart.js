"use clint"
import React from 'react'
import { BarChart,Bar,XAxis,YAxis,Tooltip,Legend,ResponsiveContainer,CartesianGrid } from 'recharts'

const IncomeExpenseChart = ({transactions}) => {
    const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const monthlyData = {}
transactions.forEach((transaction)=>{
    const month = monthNames[new Date(transaction.date).getMonth()]
    if(!monthlyData[month]){
        monthlyData[month] = {
            month,
            income:0,
            expense:0,
        }
    }

    if(transaction.type === "income"){
        monthlyData[month].income += Number(transaction.amount);
    } else {
        monthlyData[month].expense += Number(transaction.amount);
    }
})

const chartData = Object.values(monthlyData)
console.log(chartData)
const formatCurrency = (amount) => `₹${amount.toLocaleString("en-IN")}`;

  return (
    <div className='bg-white rounded-2xl border border-[#D5DDD7] shadow-md p-5'>
        <h2 className='text-2xl font-bold text-[#172B2A] mb-5'>Income vs Expense</h2>
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
                <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3"/>
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748B", }} axisLine={{ stroke: "#CBD5E1", }} tickLine={false}/>
                <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 12, fill: "#64748B", }} axisLine={false} tickLine={false} width={65}/>
                <Tooltip formatter={(value, name) => [ formatCurrency(value), name === "income" ? "Income" : "Expense", ]} labelStyle={{ color: "#172B2A", fontWeight: "600", }} contentStyle={{ borderRadius: "12px", border: "1px solid #D5DDD7", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", }}/>
                <Legend wrapperStyle={{ paddingTop: "12px", fontSize: "14px", }} formatter={(value) => value === "income" ? "Income" : "Expense" }/>
                <Bar dataKey="expense" name="expense" fill="#ef4444" radius={[6,6,0,0]}/>
                <Bar dataKey="income" name="income" fill="#2F7D68" radius={[6,6,0,0]}/>
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default IncomeExpenseChart
