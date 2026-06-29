"use client"
import { useState } from "react"
import { FaCircleUser } from "react-icons/fa6"

const ProfileMenu = ({ user }) => {
  const [show, setShow] = useState(false)

  return (
    <div className="relative">
      <button onClick={() => setShow(!show)}>
        <FaCircleUser size={40} className="text-purple-800" />
      </button>

      {show && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg p-3 rounded-lg w-56">
          <p className="font-semibold">{user?.name}</p>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
      )}
    </div>
  )
}

export default ProfileMenu