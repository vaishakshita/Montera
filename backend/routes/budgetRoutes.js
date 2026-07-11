const express = require("express")
const router= express.Router();

const{
    createBudget,
    getBudgets,
    updateBudget,
    deleteBudget,
} = require("../controllers/budgetController")

const authMiddleware = require("../middleware/authMiddleware")

router.route("/").post(authMiddleware, createBudget).get(authMiddleware, getBudgets)
router.route("/:id").put(authMiddleware, updateBudget).delete(authMiddleware, deleteBudget)

module.exports = router