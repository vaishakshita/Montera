"use client"
import React from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const page = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async(e)=>{
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    const data = await res.json();

    if(res.ok){
      localStorage.setItem("token", data.token)
      router.push("/dashboard")
      toast.success("Login Successful");
    } else{
      toast.error(data.message)
    }
  }

  const inputDesign = "border-2 border-gray-400 hover:border-purple-400 focus:border-purple-600 outline-none focus:ring-1 focus:ring-purple-300 rounded-xl text-sm sm:text-xl";

  return (
    <>
      <Navbar/>
      <form onSubmit={handleLogin} className='bg-purple-100 shadow-2xl mx-auto max-w-[80vw] my-15 md:my-30 rounded-4xl sm:max-w-[40vw]'>
        <h1 className='text-4xl text-center font-semibold font-sans py-5'>Login</h1>
        <div className='text-2xl flex flex-col mx-auto gap-4 max-w-[60vw] sm:max-w-[30vw] py-4'>
          <label className='text-xl font-sans'>Email</label>
          <input type="email" placeholder='Enter email' onChange={(e)=> setEmail(e.target.value)} className={inputDesign} />
          <label className='text-xl font-sans'>Password</label>
          <input type="password" placeholder='Enter password' onChange={(e)=> setPassword(e.target.value)} className={inputDesign} />
        </div>
        <div className='flex justify-center items-center mt-7'>
          <button type='submit' className='text-xl h-14 w-28 rounded-4xl bg-purple-800 text-white hover:scale-105 transition'>Login</button>
        </div>
        <p className='flex flex-col md:flex-row gap-3 justify-center items-center text-xl py-10 lg:text-2xl'>
          Don't have an account?{' '}
          <Link href="/signup" className="text-purple-700 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </>
  )
}

export default page
