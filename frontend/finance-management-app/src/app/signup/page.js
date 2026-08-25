"use client"
import React from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import ButtonLoader from '@/app/components/loading/ButtonLoader'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { FiEye, FiEyeOff } from "react-icons/fi"

const page = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmpassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
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
    if (!res.ok) {
      toast.error(data.message || "Signup failed");
    } 
    toast.success("Account Created Successfully");
    router.push("/login")
    } catch(error){
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
      <form onSubmit={handleSignup} className='bg-[#E7F0EA] shadow-xl mx-auto justify-center max-w-[80vw] mt-12 mb-6 rounded-4xl sm:w-1/2'>
        <h1 className='text-[#173F35] text-4xl text-center font-semibold font-sans py-5'>Sign up</h1>
        <div className='text-2xl flex flex-col mx-auto gap-4 max-w-[60vw] sm:max-w-[30vw] py-4'>
          <label className="text-xl font-sans text-[#173F35]">Full Name</label>
          <input onChange={(e) => setName(e.target.value)} type="text" className={inputDesign} />

          <label className="text-xl font-sans text-[#173F35]">Email</label>
          <input onChange={(e) => setEmail(e.target.value)} type="email" className={inputDesign} />

          <label className="text-xl font-sans text-[#173F35]">Create Password</label>
          <div className='relative w-full'>
            <input onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} className={`${inputDesign} w-full pr-12`} />
            <button type='button' onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 mt-1 md:mt-0 text-[#52665D] hover:text-[#2F6F5E] transition">{showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}</button>
          </div>


          <label className="text-xl font-sans text-[#173F35]">Confirm Password</label>
          <div className='relative w-full'>
            <input onChange={(e) => setConfirmpassword(e.target.value)} type={showConfirmPassword ? "text" : "password"} className={`${inputDesign} w-full pr-12`} />
            <button type='button' onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 mt-1 md:mt-0 text-[#52665D] hover:text-[#2F6F5E] transition">{showConfirmPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}</button>
          </div>

        </div>
        <div className='flex justify-center items-center mt-5'>
          <button type='submit' disabled={loading} className={`text-xl h-14 w-40 rounded-4xl text-white transition flex items-center justify-center ${loading
              ? "bg-[#7FA394] cursor-not-allowed"
              : "bg-[#2F6F5E] hover:bg-[#255B4D] hover:scale-105"
            }`}>{loading ? <ButtonLoader text="Signing up..." /> : "Signup"}</button>
        </div>
        <p className='flex flex-col md:flex-row gap-3 justify-center items-center text-xl py-8 lg:text-2xl text-[#173F35]'>
          Already have an account?{' '}
          <Link href="/login" className="text-[#2F6F5E] hover:text-[#255B4D] font-medium hover:underline transition">
            Login
          </Link>
        </p>
      </form>
    </>
  )
}

export default page
