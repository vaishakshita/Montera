"use client";
import { useRouter } from "next/navigation";
import { FaChartLine } from "react-icons/fa";
import { MdInsights } from "react-icons/md";

const EmptyAnalytics = () => {
    const router = useRouter()
  return (
    <div className="bg-white rounded-3xl shadow-xl p-4 xl:w-2/3 mx-auto mt-2 text-center">

      <FaChartLine className="mx-auto text-6xl text-emerald-600 mb-4" />

      <h2 className="text-4xl font-bold text-emerald-700">
        No Analytics Yet
      </h2>

      <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
        Analytics are generated automatically after you add your first
        transaction. Track your income and expenses to unlock spending
        insights, charts and monthly reports.
      </p>

      <button
            onClick={() => router.push("/dashboard/transactions")}
            className="mt-5 bg-emerald-700 text-white px-5 py-2 rounded-xl hover:bg-emerald-800"
          >
            Add Transaction
      </button>

      <div className="grid grid-rows-3 gap-5 mt-10">

        <div className="bg-green-50 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-emerald-700">
            Spending Trends
          </h3>

          <p className="text-gray-600 mt-2">
            Compare your monthly expenses with interactive charts.
          </p>
        </div>

        <div className="bg-green-50 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-emerald-700">
            Income vs Expense
          </h3>

          <p className="text-gray-600 mt-2">
            Understand where your money goes every month.
          </p>
        </div>

        <div className="bg-green-50 rounded-2xl p-5">
          <MdInsights className="mx-auto text-3xl text-emerald-600 mb-2" />

          <h3 className="text-xl font-semibold text-emerald-700">
            AI Insights
          </h3>

          <p className="text-gray-600 mt-2">
            Receive personalized financial insights based on your habits.
          </p>
        </div>

      </div>
    </div>
  );
};

export default EmptyAnalytics;