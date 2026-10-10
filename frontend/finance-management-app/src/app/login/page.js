"use client"
import React from 'react'
import Link from 'next/link'
import ButtonLoader from '@/app/components/loading/ButtonLoader'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiEye, FiEyeOff } from "react-icons/fi"
import toast from 'react-hot-toast'

const page = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
        })
      })

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed")
        return;
      }
      localStorage.setItem("token", data.token);
      toast.success("Login Successful");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false);
    }
  }

  const inputDesign = "bg-[#F8FAF8] border-2 border-[#9BAFA5] hover:border-[#6F8F82] focus:border-[#2F6F5E] outline-none focus:ring-1 focus:ring-[#A8C1B6] rounded-xl text-sm sm:text-xl px-3 h-12 transition";

  return (
    <>
      <Navbar />
      <form onSubmit={handleLogin} className='bg-[#E7F0EA] shadow-2xl mx-auto max-w-[80vw] my-15 md:my-30 rounded-4xl sm:max-w-[40vw]'>
        <h1 className='text-[#173F35] text-4xl text-center font-semibold font-sans py-5'>Login</h1>
        <div className='text-2xl flex flex-col mx-auto gap-4 max-w-[60vw] sm:max-w-[30vw] py-4'>
          <label className='text-xl font-sans text-[#173F35]'>Email</label>
          <input type="email" placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} className={inputDesign} />
          <label className='text-xl font-sans text-[#173F35]'>Password</label>
          <div className='relative w-full'>
            <input placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} className={`${inputDesign} w-full pr-12`} />
            <button type='button' onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#52665D] hover:text-[#2F6F5E] transition">{showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}</button>
          </div>
        </div>
        <div className='flex justify-center items-center mt-7'>
          <button type='submit' disabled={loading} className={`text-xl h-14 w-40 rounded-4xl text-white transition flex items-center justify-center ${loading
              ? "bg-[#7FA394] cursor-not-allowed"
              : "bg-[#2F6F5E] hover:bg-[#255B4D] hover:scale-105"
            }`}>{loading ? <ButtonLoader text="Logging in..." /> : "Login"}</button>
        </div>
        <p className='flex flex-col md:flex-row gap-3 justify-center items-center text-xl py-10 lg:text-2xl'>
          Don't have an account?{' '}
          <Link href="/signup" className="text-[#2F6F5E] hover:text-[#255B4D] font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </>
  )
}

export default page
