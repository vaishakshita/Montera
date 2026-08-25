"use client"
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import Image from "next/image";
import logo from "@/app/assets/logo.png";

const Navbar = () => {
    const router = useRouter()
    const handleDashboard = ()=>{
        const token = localStorage.getItem("token")

        if(token){
            router.push("/dashboard")
        } else {
            router.push("/login")
        }
    }

    return (
        <>
            <div className='bg-[#DDE5DF] border-b border-[#C7D2CA] flex flex-col sm:flex-row items-center justify-around px-6 md:px-12 py-4 gap-4'>
                <div className='flex gap-1'>
                    <Image src={logo} alt="Montera Logo" width={240} priority className="object-contain rounded-2xl"/>
                </div>

                <div className='flex justify-center gap-4 font-sans'>
                    <button onClick={handleDashboard} className='bg-[#EEF3EF] rounded-3xl w-30 h-10 flex justify-center items-center text-[#285548] hover:bg-[#D1DED6] hover:scale-105 transition cursor-pointer'>Dashboard</button>
                    <Link href="/login" className='bg-[#EEF3EF] rounded-3xl w-20 h-10 flex justify-center items-center text-[#285548] hover:bg-[#D1DED6] hover:scale-105 transition cursor-pointer'>Login</Link>
                    <Link href="/signup" className='bg-[#EEF3EF] rounded-3xl w-20 h-10 flex justify-center items-center text-[#285548] hover:bg-[#D1DED6] hover:scale-105 transition cursor-pointer'>Sign Up</Link>
                </div>
            </div>
        </>


    )
}

export default Navbar
