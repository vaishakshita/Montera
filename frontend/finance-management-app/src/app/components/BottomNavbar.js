"use client";
import ButtonLoader from "@/app/loading/ButtonLoader";
import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

import { BiHome } from "react-icons/bi";
import { SiSimpleanalytics } from "react-icons/si";
import { FaSitemap } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";

const BottomNavbar = () => {
    const [showLogoutModel, setShowLogoutModel] = useState(false)
    const [logoutLoading, setLogoutLoading] = useState(false)
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        setLogoutLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 500))
        localStorage.removeItem("token");
        router.push("/");
    };

    const menuItems = [
        {
            name: "Home",
            path: "/dashboard",
            icon: <BiHome size={26} />
        },
        {
            name: "Transactions",
            path: "/dashboard/transactions",
            icon: <GrTransaction size={24} />
        },
        {
            name: "Analytics",
            path: "/dashboard/analytics",
            icon: <SiSimpleanalytics size={24} />
        },
        {
            name: "Planner",
            path: "/dashboard/planner",
            icon: <FaSitemap size={24} />
        }
    ];

    return (
        <>
            {showLogoutModel && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
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
            <div className="fixed bottom-0 left-0 w-full bg-purple-800 border-t shadow-lg flex justify-around items-center py-2 z-50 lg:hidden">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.path}
                        className={`flex flex-col items-center text-xs

                    ${pathname === item.path
                                ? "text-purple-800 bg-white p-2 rounded-2xl"
                                : "text-white"}

                    `}
                    >

                        {item.icon}
                        <span>{item.name}</span>

                    </Link>

                ))}

                <button
                    onClick={() => setShowLogoutModel(true)}
                    className="flex flex-col items-center text-xs text-white"
                >

                    <FiLogOut size={24} />
                    <span>Logout</span>

                </button>

            </div>
        </>

    )

}

export default BottomNavbar;