"use client"
import React from 'react'

const FilterModal = ({ showFilter, setShowFilter, cardFilters, setCardFilters, applyFilters,}) => {
    if (!showFilter) return null;
    const modalDesign = "text-[#173F35] w-full bg-[#F8FAF8] border-2 border-[#9BAFA5] focus:border-[#2F6F5E] outline-none focus:ring-[#A8C1B6] rounded-lg p-1 mb-4"
    return (
        <>
            <div className='fixed p-10 inset-0 bg-black/40 flex justify-center items-center z-50'>
                <div className='bg-white rounded-xl shadow-xl w-[450px] p-6'>
                    <h2 className='flex justify-center text-xl font-bold font-sans text-green-700'>Filter Transaction</h2>

                    {/* type filter */}
                    <div className='mb-4'>
                        <label className='font-semibold text-[#173F35]'>Filter by type</label>
                        <select className={modalDesign} value={cardFilters.type} onChange={(e) => setCardFilters({ ...cardFilters, type: e.target.value, })}>
                            <option value="all">All</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    {/* category filter */}
                    <div className='mb-4'>
                        <label className='font-semibold text-[#173F35]'>Category</label>
                        <select className={modalDesign} value={cardFilters.category} onChange={(e) => setCardFilters({ ...cardFilters, category: e.target.value, })}>
                            <option value="">ALL Categories</option>
                            <option value="Food and drinks">Food and drinks</option>
                            <option value="Bills">Bills</option>
                            <option value="Travel">Travel</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Grocery">Grocery</option>
                            <option value="Salary">Salary</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    {/* Date filter */}
                    <div className='mb-4'>
                        <label className='font-semibold text-[#173F35]'>Filter by date</label>
                        <select className={modalDesign} value={cardFilters.dateType} onChange={(e) => setCardFilters({ ...cardFilters, dateType: e.target.value, })}>
                            <option value="">None</option>
                            <option value="date">Specific date</option>
                            <option value="month">Month</option>
                            <option value="year">Year</option>
                        </select>
                    </div>

                    {/* dynamic input */}
                    {cardFilters.dateType === "date" && (
                        <input type="date" className={modalDesign} value={cardFilters.date} onChange={(e) => setCardFilters({ ...cardFilters, date: e.target.value, })} />
                    )}
                    {cardFilters.dateType === "month" && (
                        <input type="month" className={modalDesign} value={cardFilters.month} onChange={(e) => setCardFilters({ ...cardFilters, month: e.target.value, })} />
                    )}
                    {cardFilters.dateType === "year" && (
                        <input type="year" className={modalDesign} value={cardFilters.year} onChange={(e) => setCardFilters({ ...cardFilters, year: e.target.value, })} />
                    )}

                    {/* Sort */}
                    <div className='mb-4'>
                        <label className='font-semibold text-[#173F35]'>Sort</label>
                        <select className={modalDesign} value={cardFilters.sort} onChange={(e) => setCardFilters({ ...cardFilters, sort: e.target.value, })}>
                            <option value="">Default</option>
                            <option value="newest">Newest first</option>
                            <option value="oldest">Oldest first</option>
                        </select>
                    </div>

                    {/* buttons */}
                    <div className='flex justify-end gap-3'>
                        <button className='px-4 py-2 rounded-lg border-2 border-green-700 text-green-700' onClick={() => setCardFilters({
                            type:"all",
                            category: "",
                            dateType: "",
                            date: "",
                            month: "",
                            year: "",
                            sort: "",
                        })}>Reset</button>
                        <button className='px-4 py-2 rounded-lg border-2 border-green-700 text-green-700' onClick={() => setShowFilter(false)}>Cancel</button>
                        <button className='bg-green-800 hover:bg-green-900 text-white px-5 py-2 rounded-lg' onClick={() => {applyFilters();  setShowFilter(false);}}>Apply</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FilterModal
