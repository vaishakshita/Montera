"use client"
import { useRouter } from "next/navigation";

const BudgetOverview = ({ budgets }) => {

    const router = useRouter()
    const formatCurrency = (amount) => `₹${amount.toLocaleString("en-IN")}`
    const today = new Date();

    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    const currentBudgets = budgets.filter(
        (budget) =>
            budget.month === currentMonth &&
            budget.year === currentYear
    )

    const totalBudget = currentBudgets.reduce(
        (sum, b) => sum + b.budget, 0
    )

    const totalSpent = currentBudgets.reduce(
        (sum, b) => sum + b.spent, 0
    )

    const percentage = totalBudget === 0 ? 0 : Math.round((totalSpent / totalBudget) * 100)

    const alerts = currentBudgets.filter((b) => b.percentage >= 80).slice(0, 2);

    const getStatus = () => {
        if (percentage < 50)
            return {
                text: "Healthy",
                color: "bg-[#DCF3E5] text-[#24704F]",
            }
        if (percentage < 80)
            return {
                text: "Near Limit",
                color: "bg-[#FFF3D6] text-[#9A6B16]",
            }
        return {
            text: "Critical",
            color: "bg-[#FDE2E2] text-[#B43A3A]",
        }
    }

    const monthName = new Date(currentYear, currentMonth - 1).toLocaleString("default", {
        month: "long",
    })
    const currentMonthDisplay = `${monthName} ${currentYear}`

    const status = getStatus();

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-6">
            <h2 className="text-2xl font-bold text-[#2F6F5E] mb-2">Budget Overview</h2>
            <h3 className="mb-6 text-xl text-[#64748B]">{currentMonthDisplay}</h3>
            <div className="flex justify-between font-semibold text-[#173F35]">
                <span>Spent</span>
                <span>{formatCurrency(totalSpent)} / {formatCurrency(totalBudget)}</span>
            </div>
            <div className="flex justify-between mt-4">
                <span className="text-[#64748B] text-sm">{percentage}% of total budget used</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>{status.text}</span>
            </div>
            <div className="w-full h-3 bg-[#E5EAE7] rounded-full mt-4">
                <div
                    className={`h-3 rounded-full ${percentage < 50
                        ? "bg-[#3F856F]"
                        : percentage < 80
                            ? "bg-[#D5A53A]"
                            : "bg-[#C75B5B]"
                        }`}
                    style={{
                        width: `${Math.min(percentage, 100)}%`,
                    }}
                />
            </div>
            <div className="flex justify-between font-semibold mt-3 text-[#173F35]">
                <span>Remaining</span>
                <span>{formatCurrency(totalBudget - totalSpent)}</span>
            </div>


            <hr className="my-6 border-[#D9E2DD]" />
            <h3 className="font-semibold text-lg mb-4 text-[#173F35]">Budget Alerts</h3>
            

            {alerts.length === 0 && totalBudget !== 0 ? (
                <p className="text-[#2F6F5E] text-sm">🎉Great job! All budgets are on track</p>
            ) : (
                alerts.map((budget) => (
                    <div key={budget._id} className="flex justify-between mb-3 text-[#173F35]">
                        <span>{budget.category}</span>
                        <span className="text-[#C75B5B] text-sm">
                            {budget.percentage >= 100 ? `Exceeded by ₹${Math.abs(budget.remaining)}` : `${budget.percentage}% Used`}
                        </span>
                    </div>
                ))
            )}

            <button onClick={() => router.push("/dashboard/planner")} className="w-full mt-6 bg-[#2F6F5E] hover:bg-[#255B4D] text-white rounded-xl py-3 transition">Manage Budget →</button>

        </div>

    );
};

export default BudgetOverview;
