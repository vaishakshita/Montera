"use client";
import { useRouter } from "next/navigation";
import { FaMoneyBillWave, FaBullseye, FaWallet } from "react-icons/fa";

const EmptyDashboard = () => {
  const router = useRouter();

  return (
    <div className="mt-10 bg-white rounded-3xl shadow-lg p-8 mx-10">
      <h2 className="text-3xl font-bold text-emerald-800">
        Welcome to Montera 👋
      </h2>
      <p className="text-gray-600 mt-2">
        Your dashboard is empty. Let's set up your finances in just a few steps.
      </p>

      {/* Steps */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">

        <div className="border rounded-2xl p-6 text-center shadow-sm">
          <FaMoneyBillWave
            className="mx-auto text-green-600 mb-3"
            size={40}
          />

          <h3 className="font-semibold text-lg">
            Add Transaction
          </h3>

          <p className="text-gray-500 text-sm mt-2">
            Record your first income or expense.
          </p>

          <button
            onClick={() => router.push("/dashboard/transactions")}
            className="mt-5 bg-emerald-700 text-white px-5 py-2 rounded-xl hover:bg-emerald-800"
          >
            Add Transaction
          </button>
        </div>

        <div className="border rounded-2xl p-6 text-center shadow-sm">
          <FaWallet
            className="mx-auto text-blue-600 mb-3"
            size={40}
          />

          <h3 className="font-semibold text-lg">
            Create Budget
          </h3>

          <p className="text-gray-500 text-sm mt-2">
            Set monthly spending limits.
          </p>

          <button
            onClick={() => router.push("/dashboard/planner")}
            className="mt-5 bg-emerald-700 text-white px-5 py-2 rounded-xl hover:bg-emerald-800"
          >
            Create Budget
          </button>
        </div>

        <div className="border rounded-2xl p-6 text-center shadow-sm">
          <FaBullseye
            className="mx-auto text-orange-500 mb-3"
            size={40}
          />

          <h3 className="font-semibold text-lg">
            Set Goal
          </h3>

          <p className="text-gray-500 text-sm mt-2">
            Save for something important.
          </p>

          <button
            onClick={() => router.push("/dashboard/planner")}
            className="mt-5 bg-emerald-700 text-white px-5 py-2 rounded-xl hover:bg-emerald-800"
          >
            Create Goal
          </button>
        </div>

      </div>

      <div className="mt-10 bg-green-50 rounded-2xl p-5">
        <h3 className="font-semibold text-xl mb-3">
          What you'll unlock
        </h3>

        <ul className="space-y-2 text-gray-700">
          <li>📊 Spending Analytics</li>
          <li>💰 Budget Tracking</li>
          <li>🎯 Savings Goals</li>
          <li>📈 Monthly Financial Reports</li>
        </ul>
      </div>

    </div>
  );
};

export default EmptyDashboard;
