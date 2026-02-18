import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login_page = () => {

  const navigate =useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handle_Login =async() =>{

    if(!user.trim() || !password.trim()){
      setError("User and password is neccessary ⚠");
      return;
    }

    if(user==="admin" && password === "admin123"){
      localStorage.setItem("user",user);
      navigate("/home");
      return;
    }

    try{
      const response = await fetch("http://localhost:5000/api/users/login",{
        method:"post",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({user,password})
      });

      const data =await response.json();

      if(data.success) {
        localStorage.setItem("user",user);
        navigate("/home");
      }
      else {
        alert("Username or Password is wrong ❌");
      }

    } catch (error) {
      console.log("Error:",error);
    }
  };

  useEffect(()=>{
    if(error){
      setTimeout(() => {
        setError("")
      }, 2500);
    }
  },[error])
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#012a4a] via-[#01497c] to-[#012a4a] p-4">
      
      <div className="w-full max-w-md bg-white/30 shadow-2xl rounded-2xl p-8 border border-white/40">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back 👋
        </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-white mb-2">User:</label>
              <input
                type="text"
                placeholder="Enter your user"
                className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </div>

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

            <span className='text-red-300 text-center'>{error}</span>
            
            <button
              type="submit"
              className="w-full mt-3 bg-white text-xl text-purple-600 font-semibold py-2 rounded-lg hover:bg-sky-400  cursor-pointer"
              onClick={handle_Login}
              >
              Login
            </button>
            
          </div>
      </div>
    </div>
  )
}

export default Login_page
