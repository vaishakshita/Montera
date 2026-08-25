"use client";
import Image from "next/image";
import logo from "@/app/assets/logo.png";

const MobileNavbar = () => {
    return (
        <div className="p-15 xl:p-3">
            <div className="fixed top-0 left-0 w-full bg-[#E8F0EB] border-r border-[#D5DDD7] shadow-md border-b z-50 flex items-center justify-center py-4 px-5 lg:hidden">

            <div className="flex flex-col items-center bg-white py-1 px-3 rounded-2xl">
                <Image src={logo} alt="Montera Logo" width={180} height={60} priority className="object-contain rounded-2xl"/>
            </div>
        </div>
        </div>
        
    );
};

export default MobileNavbar;