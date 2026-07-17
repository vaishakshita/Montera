"use client"
import ButtonLoader from "@/app/loading/ButtonLoader";
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react";

//import icons
import { SiSimpleanalytics } from "react-icons/si";
import { BiHome } from "react-icons/bi";
import { FaSitemap } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { FiLogOut } from "react-icons/fi";

import Image from "next/image";
import logo from "@/app/assets/logo.png";


const Sidebar = () => {
    const [showLogoutModel, setShowLogoutModel] = useState(false)
    const [logoutLoading, setLogoutLoading] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    const handleLogout = async () => {
        setLogoutLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 500))

        localStorage.removeItem("token")
        router.push("/")
    }

    //menu
    const menuItems = [
        { name: "Home", path: "/dashboard", icon: <BiHome size={60} /> },
        { name: "Transactions", path: "/dashboard/transactions", icon: <GrTransaction size={60} /> },
        { name: "Analytics", path: "/dashboard/analytics", icon: <SiSimpleanalytics size={56} /> },
        { name: "Planner", path: "/dashboard/planner", icon: <FaSitemap size={60} /> },
    ]

    return (
        <>
            {showLogoutModel && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[100]">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-sm">
                        <h2 className="text-2xl font-bold text-center">Logout</h2>
                        <p className="flex justify-center font-semibold text-lg mt-2">Are you sure you want to log out?</p>
                        <div className="flex justify-center gap-20 mt-6">
                            <button onClick={() => setShowLogoutModel(false)} className="px-4 py-2 rounded-lg border-2 border-gray-500 hover:bg-gray-100 transition">Cancel</button>
                            <button onClick={handleLogout} disabled={logoutLoading} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition">{logoutLoading ? <ButtonLoader /> : "Logout"}</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="hidden md:block bg-purple-400 fixed top-0 left-0 h-full text-center transform transition-transition duration-300 w-20 lg:w-55 p-4">
                <div className="flex items-center justify-center mb-6 -mt-9">
                    <div className="flex items-center px-2 py-2 rounded-4xl mt-10">
                        <Image
                            src={logo}
                            alt="Montera Logo"
                            width={180}
                            height={60}
                            priority
                            className="object-contain rounded-2xl"
                        />
                    </div>
                </div>

                {/* Menu */}
                <div className="flex flex-col gap-4 mt-15">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-purple-200
            ${pathname === item.path ? "bg-purple-300" : ""}`}
                        >
                            <span className="flex justify-center items-center w-8 text-purple-950">{item.icon}</span>
                            <span className="hidden lg:block text-xl font-sans font-semibold text-purple-950">{item.name}</span>
                        </Link>
                    ))}

                    {/* Logout */}
                    <button onClick={() => setShowLogoutModel(true)} className="flex items-center justify-center lg:justify-start gap-3 p-3 mt-3 hover:bg-purple-200 rounded-lg">
                        <span className="text-2xl w-8 flex justify-center">
                            <FiLogOut size={60} className="text-purple-950" />
                        </span>
                        <span className="hidden lg:block text-xl font-sans font-semibold text-purple-950 min-w-[20px]">Logout</span>
                    </button>
                </div>
            </div>

        </>
    )
}

export default Sidebar