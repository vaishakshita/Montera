"use client";
import React from "react";
import {ResponsiveContainer,AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,} from "recharts";

const ExpenseLineChart = ({ transactions }) => {

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

  const formatCurrency = (amount) =>
    `₹${amount.toLocaleString("en-IN")}`;

  // Initialize all months with 0 expense
  const monthlyData = {};

  monthNames.forEach((month) => {
    monthlyData[month] = {
      month,
      expense: 0,
    };
  });

  // Calculate monthly expenses
  transactions.forEach((transaction) => {

    if (transaction.type === "expense") {

      const month =
        monthNames[new Date(transaction.date).getMonth()];

      monthlyData[month].expense += Number(transaction.amount || 0);
    }
  });

  const chartData = Object.values(monthlyData);

  return (
    <div className="bg-white rounded-2xl border border-[#D5DDD7] shadow-md p-5 sm:p-6 w-full h-[320px]">

      <h2 className="text-xl sm:text-2xl font-bold text-[#172B2A] mb-4">
        Monthly Expense Trend
      </h2>

      <ResponsiveContainer width="100%" height="82%">

        <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 5, bottom: 0, }}>

          <defs>

            <linearGradient
              id="expenseGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#EF4444"
                stopOpacity={0.20}
              />

              <stop
                offset="95%"
                stopColor="#EF4444"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" vertical={false}/>

          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748B", }} axisLine={{ stroke: "#CBD5E1", }} tickLine={false}/>

          <YAxis
            tickFormatter={formatCurrency} tick={{ fontSize: 12, fill: "#64748B", }} axisLine={false} tickLine={false} width={65}
          />

          <Tooltip
            formatter={(value) => [formatCurrency(value), "Expense",]} labelStyle={{ color: "#172B2A", fontWeight: "600", }} contentStyle={{ borderRadius: "12px", border: "1px solid #D5DDD7", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", }}
          />

          <Area
            type="monotone"
            dataKey="expense"
            stroke="#EF4444"
            strokeWidth={2.5}
            fill="url(#expenseGradient)"
            dot={{
              r: 5, fill: "#EF4444", strokeWidth: 2, stroke: "#FFFFFF",
            }}
            activeDot={{
              r: 6, fill: "#EF4444", stroke: "#FFFFFF", strokeWidth: 2,
            }}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
};

export default ExpenseLineChart;