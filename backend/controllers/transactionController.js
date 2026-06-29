const Transaction = require("../models/Transaction")

//Add transaction
exports.addTransaction = async(req,res)=>{
    try{
        const{title,amount,type,category,date} = req.body;

        if(!title || !amount || !type || !category || !date){
            return res.status(400).json({
                message: "All fields Re required"
            })
        }

        const transaction = await Transaction.create({
            user:req.user.id,
            title,
            amount,
            type,
            category,
            date,
        })

        res.status(201).json(transaction)
    } catch (error){
        res.status(500).json({message:error.message})
    }
}

//update transaction
exports.updateTransaction = async(req,res)=>{
    try{
        const{title,amount,type,category,date} = req.body;

        const transaction = await Transaction.findById(req.params.id);

        if(!transaction){
            return res.status(404).json({
                message: "Transaction not found"
            })
        }

        if(transaction.user.toString() !== req.user.id){
            return res.status(401).json({
                message: "Unauthoriezd",
            })
        }

        transaction.title = title;
        transaction.amount = amount;
        transaction.type = type;
        transaction.category = category;
        transaction.date = date;

        console.log(transaction);
        await transaction.save();

        res.status(200).json({
            message: "Transaction updated successfully",
            transaction,
        })
    } catch(error){
        console.log(error)
        res.status(500).json({
            message:"Server Error"
        })
    }
}

//get transaction
exports.getTransaction = async(req,res)=>{
    try{
        transactions.forEach((t) => {
  console.log(
    t.title,
    t.date,
    t.createdAt,
    t.updatedAt
  );
});
        const transactions = await Transaction.find({user:req.user.id}).sort({ date: -1,createdAt: -1 })
        res.status(200).json(transactions)
    } catch(error){
        res.status(500).json({message: error.message})
    }
}

//delete transaction
exports.deleteTransaction = async(req,res)=>{
    try{
        const transaction = await Transaction.findByIdAndDelete(req.params.id)
        if(!transaction){
            return res.status(404).json({message:"transaction not found"})
        }
        if(transaction.user.toString() !== req.user.id){
            return res.status(404).json({
                message:"Unauthorized"
            })
        }
        await transaction.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Transaction Deleted Successfully"})
    } catch(error){
        res.status(500).json({message: "server error"})
    }
}