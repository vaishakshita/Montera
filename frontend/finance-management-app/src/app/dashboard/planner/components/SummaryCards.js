import React from 'react'

const SummaryCards = ({totalSaved, totalTarget, activeGoals}) => {
  const cards = [
    {
      title: "Total saved",
      value: `₹${totalSaved.toLocaleString("en-IN")}`,
    },
    {
      title: "Active goals",
      value: activeGoals,
    },
    {
      title: "Total target",
      value: `₹${totalTarget.toLocaleString("en-IN")}`,
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {cards.map((card) => (
        <div
          key={card.title}
          className="
            bg-white
            rounded-2xl
            p-5
            border
            border-[#86B89A]
            shadow-sm
            hover:shadow-md
            hover:border-[#4D8B64]
            transition-all
            duration-200
          "
        >
          <p className="text-[#64748B] text-sm font-medium">
            {card.title}
          </p>

          <h2 className="text-3xl font-bold text-[#15803D] mt-2">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  )
}

export default SummaryCards
