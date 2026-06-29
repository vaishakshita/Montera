const express = require("express")
const router = express.Router()
const Transaction = require("../models/Transaction");

const{
    addTransaction,
    updateTransaction,
    getTransaction,
    deleteTransaction,
} = require("../controllers/transactionController")

const authMiddleware = require("../middleware/authMiddleware")

// add transaction
router.post("/", authMiddleware, addTransaction);
router.put("/:id",authMiddleware ,updateTransaction);
router.get("/", authMiddleware, getTransaction);
router.delete("/:id", authMiddleware, deleteTransaction);

module.exports = router;