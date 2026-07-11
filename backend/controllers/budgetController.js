const Budget = require("../models/Budget")
const Transaction = require("../models/Transaction")

exports.createBudget = async(req,res)=>{
    try{
        const{category, amount, month, year} = req.body;

        const budget = await Budget.create({
            user: req.user.id,
            category,
            amount,
            month,
            year,
        })
        res.status(201).json(budget)
    } catch(error){
        if(error.code === 11000){
            return res.status(400).json({
                message: "Budget already exists for this category and month"
            })
        }
        res.status(500).json({
            message: error.message,
        })
    }
}

exports.getBudgets = async(req,res)=>{
    try{
        const budgets = await Budget.find({
            user: req.user.id,
        }).sort({createdAt:-1,})

        const budgetData = await Promise.all(
            budgets.map(async(budget)=>{
                const transactions = await Transaction.find({
                    user: req.user.id,
                    category: budget.category,
                    type: "expense",
                })

                const monthlyTransaction = transactions.filter((transaction)=>{
                    const date = new Date(transaction.date)
                    return(
                        date.getMonth() + 1 == budget.month && date.getFullYear() === budget.year
                    )
                })

                const spent = monthlyTransaction.reduce(
                    (sum, transaction) => sum + transaction.amount, 0
                )

                const remaining = budget.amount - spent
                const percentage = Math.min(
                    Math.round((spent/budget.amount)*100), 100
                )

                return {
                    ...budget.toObject(),
                    budget: budget.amount,
                    spent,
                    remaining,
                    percentage,
                };
            })
        )
        
        res.status(200).json(budgetData)
    } catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
}

exports.updateBudget = async(req,res)=>{
    try{
        const budget = await Budget.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id,
            },
            req.body,
            {
                new:true,
            }
        )

        if(!budget){
            return res.status(404).json({
                message: "Budget not found",
            })
        }

        res.status(200).json(budget)
    } catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
}

exports.deleteBudget= async(req,res)=>{
    try{
        const budget = await Budget.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        })

        if(!budget){
            return res.status(404).json({
                message: "Budget not found",
            })
        }

        res.status(200).json({
            message: "Budget deleted successfully"
        })
    } catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
}