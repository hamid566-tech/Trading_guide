import React, { useState } from 'react'

const Login_page = () => {

    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#012a4a] via-[#01497c] to-[#012a4a] p-4">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white/30 shadow-2xl rounded-2xl p-8 border border-white/40">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back 👋
        </h2>

        {/* Form */}
        <form className="space-y-6">
          
          {/* Email */}
          <div>
            <label className="block text-white mb-2">User:</label>
            <input
              type="text"
              placeholder="Enter your user"
              className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-white text-xl text-purple-600 font-semibold py-2 rounded-lg hover:bg-sky-400  cursor-pointer">
            Login
          </button>
          <button
            type="submit"
            className="w-full bg-amber-500 text-xl text-purple-600 font-semibold py-2 rounded-lg hover:bg-orange-500 cursor-pointer">
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login_page
