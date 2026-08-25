import React from 'react'

const FinancialInsights = ({ transactions }) => {
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

    // total income
    const totalIncome = transactions.filter((transaction) => transaction.type === "income").reduce((sum, transaction) => sum + transaction.amount, 0)

    // total expense
    const totalExpense = transactions.filter((transaction) => transaction.type === "expense").reduce((sum, transaction) => sum + transaction.amount, 0)

    // savings rate
    const savingsRate = totalIncome === 0 ? 0 : (((totalIncome - totalExpense) / totalIncome * 100).toFixed(1))

    //monthly expense
    const monthlyExpense = {};
    monthNames.forEach((month) => {
        monthlyExpense[month] = 0;
    })
    transactions.forEach((transaction) => {
        if (transaction.type === "expense") {
            const month = monthNames[new Date(transaction.date).getMonth()]
            monthlyExpense[month] += transaction.amount
        }
    })

    //Highest spending month
    let highestMonth = "";
    let highestExpense = 0;

    Object.entries(monthlyExpense).forEach(([month, amount]) => {
        console.log(month)
        if (amount > highestExpense) {
            highestExpense = amount;
            highestMonth = month;
        }
    })

    //category Totals
    const categoryTotals = {};
    transactions.forEach((transaction) => {
        if (transaction.type === "expense") {
            categoryTotals[transaction.category] = (categoryTotals[transaction.category] || 0) + transaction.amount;
        }
    })

    //Top category
    let topCategory = ""
    let topCategoryAmount = 0;

    Object.entries(categoryTotals).forEach(([category, amount]) => {
        if (amount > topCategoryAmount) {
            topCategory = category;
            topCategoryAmount = amount;
        }
    })

    const formatCurrency = (amount) => `₹${Number(amount || 0).toLocaleString("en-IN")}`;

    //total transactions
    const totalTransactions = transactions.length;
    return (
        <div className="bg-white rounded-2xl border border-[#D5DDD7] shadow-md p-5 sm:p-6"> 
        {/* Heading */} 
        <div className="mb-5"> 
            <h2 className="text-xl sm:text-2xl font-bold text-[#172B2A]"> Financial Insights </h2> 
            <p className="text-sm text-[#64748B] mt-1"> A quick overview of your financial activity </p> 
        </div> 
            
        {/* Insights */} 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"> 
            {/* Highest Spending Month */} 
            <div className="px-4 py-4 border-b sm:border-r lg:border-b-0 border-[#E5E7EB]"> 
                <p className="text-sm text-[#64748B]"> Highest Spending Month </p> 
                <p className="text-2xl font-bold text-[#2F7D68] mt-2"> {highestMonth || "—"} </p> 
                <p className="text-sm text-[#475569] mt-1"> {formatCurrency(highestExpense)} </p> 
            </div> 
            
            {/* Top Expense Category */} 
            <div className="px-4 py-4 border-b lg:border-b-0 lg:border-r border-[#E5E7EB]"> 
                <p className="text-sm text-[#64748B]"> Top Expense Category </p> 
                <p className="text-2xl font-bold text-[#2F7D68] mt-2 truncate" title={topCategory} > {topCategory || "—"} </p> 
                <p className="text-sm text-[#475569] mt-1"> {formatCurrency(topCategoryAmount)} </p> 
            </div> 
            
            {/* Savings Rate */} 
            <div className="px-4 py-4 border-b sm:border-r lg:border-b-0 border-[#E5E7EB]"> 
                <p className="text-sm text-[#64748B]"> Savings Rate </p> 
                <p className={`text-2xl font-bold mt-2 ${Number(savingsRate) >= 0 ? "text-[#2F7D68]" : "text-red-500"}`} > {savingsRate}% </p> 
                <p className="text-sm text-[#475569] mt-1"> Saved this year </p> 
            </div> 
            
            {/* Total Transactions */} 
            <div className="px-4 py-4"> 
                <p className="text-sm text-[#64748B]"> Total Transactions </p> <p className="text-2xl font-bold text-[#172B2A] mt-2"> {totalTransactions} </p> 
                <p className="text-sm text-[#475569] mt-1"> Recorded transactions </p> 
            </div> 
        </div> 
    </div>
    
    )
}

export default FinancialInsights
