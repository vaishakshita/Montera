"use client"
import ButtonLoader from "@/app/loading/ButtonLoader";
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation";
import { FaUser, FaCog, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";

const ProfileMenu = ({ user }) => {
  const [show, setShow] = useState(false)
  const menuRef = useRef(null);
  const initials = user?.name
    ? user.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
    : "?";

  // Close menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShow(false)
      }
    };

    document.addEventListener("mousedown", handler)

    return () => {
      document.removeEventListener("mousedown", handler)
    }
  }, [])

  const [showLogoutModel, setShowLogoutModel] = useState(false)
  const [logoutLoading, setLogoutLoading] = useState(false)
  const router = useRouter();

  const handleLogout = async () => {
    setLogoutLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setShow(!show)}
        className="flex items-center gap-3 bg-white border border-purple-200 rounded-full px-2 py-1 shadow-md hover:shadow-lg transition"
      >
        <div className="w-10 h-10 rounded-full bg-purple-700 text-white font-bold flex items-center justify-center">
          {initials}
        </div>

        <div className="hidden md:block text-left">
          <p className="text-sm font-semibold text-gray-800">
            {user?.name}
          </p>

          <p className="text-xs text-gray-500">
            My Account
          </p>
        </div>
      </button>

      {show && (
        <div className="absolute right-0 mt-3 w-72 rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden z-50">

          {/* User Info */}

          <div className="flex items-center gap-3 p-5 bg-purple-50">

            <div className="w-10 h-10 rounded-full bg-purple-700 text-white font-bold flex items-center justify-center">
              {initials}
            </div>
            <div>
              <h2 className="font-bold text-gray-800">
                {user?.name}
              </h2>

              <p className="text-sm text-gray-500">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Menu */}

          <div className="py-2">

            <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-purple-50 transition">
              <FaUser className="text-purple-700" />
              <span>My Profile</span>
              <span>(Coming soon...)</span>
            </button>

            <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-purple-50 transition">
              <FaCog className="text-purple-700" />
              <span>Settings</span>
              <span>(Coming soon...)</span>
            </button>

            <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-purple-50 transition">
              <FaQuestionCircle className="text-purple-700" />
              <span>Help</span>
              <span>(Coming soon...)</span>
            </button>

            <hr className="my-2" />

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
            <button onClick={() => setShowLogoutModel(true)} className="w-full flex items-center gap-3 px-5 py-3 text-red-500 hover:bg-red-50 transition">
              <FaSignOutAlt />
              <span>Logout</span>
            </button>

          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileMenu