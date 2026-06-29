"use client"
import React from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const page = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmpassword] = useState("")
  const router = useRouter()

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })

    const data = await res.json()
    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (res.ok) {
      toast.success("Account Created Successfully");
      router.push("/login")
    } else {
      toast.error(data.message);
    }
  }

  const inputDesign = "border-2 border-gray-400 hover:border-purple-400 focus:border-purple-600 outline-none focus:ring-1 focus:ring-purple-300 rounded-xl text-sm sm:text-xl";

  return (
    <>
      <Navbar />
      <form onSubmit={handleSignup} className='bg-purple-100 shadow-2xl mx-auto justify-center max-w-[80vw] my-15 md:my-30 rounded-4xl sm:w-1/2'>
        <h1 className='text-4xl text-center font-semibold font-sans py-5'>Sign up</h1>
        <div className='text-2xl flex flex-col mx-auto gap-4 max-w-[60vw] sm:max-w-[30vw] py-4'>
          <label className="text-xl font-sans">Full Name</label>
          <input onChange={(e) => setName(e.target.value)} type="text" className={inputDesign} />
          <label className="text-xl font-sans">Email</label>
          <input onChange={(e) => setEmail(e.target.value)} type="email" className={inputDesign} />
          <label className="text-xl font-sans">Enter Password</label>
          <input onChange={(e) => setPassword(e.target.value)} type="password" className={inputDesign} />
          <label className="text-xl font-sans">Confirm Password</label>
          <input onChange={(e) => setConfirmpassword(e.target.value)} type="password" className={inputDesign} />
        </div>
        <div className='flex justify-center items-center mt-7'>
          <button type='submit' className='text-xl h-14 w-28 rounded-4xl bg-purple-800 text-white hover:scale-105 transition'>Sign up</button>
        </div>
        <p className='flex flex-col md:flex-row gap-3 justify-center items-center text-xl py-10 lg:text-2xl'>
          Already have an account?{' '}
          <Link href="/login" className="text-purple-700 font-medium hover:underline">
            Login
          </Link>
        </p>
      </form>
    </>
  )
}

export default page
