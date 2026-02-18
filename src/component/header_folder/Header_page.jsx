import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "lucide-react";


function Header_page() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [currentuser,setCurrentuser] = useState('');
  const location = useLocation();

  const menuItems = [
    { name: "Rent", path: "/home/rent" },
    { name: "Mortgage", path: "/home/mortgage"  },
    { name: "Saleable", path: "/home/saleable"  },
    { name: "Applicant", path: "/home/applicant"  },
    { name: "User", path: "/home/user" },
  ];

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setLangOpen(false);
    console.log("Selected language:", lang);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      navigate("/");
    }
  };

  useEffect(()=>{
    const storedUSer=localStorage.getItem('user');
    setCurrentuser(storedUSer);
  },[])

  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/10 border-b border-white/20 shadow-xl z-50">
      
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6 text-white">

        {/* Logo */}
        <div
          className="text-2xl font-bold tracking-wide cursor-pointer hover:text-yellow-300 transition duration-300"
          onClick={() => navigate("/home")}
        >
          TradingGuide 🚀
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-lg font-medium">
            
          {menuItems.map((item,i)=>{
            
            const isActive = item.path && location.pathname.startsWith(item.path);
            return(
                <span key={i} className={`cursor-pointer transition border-b-2 ${ isActive ? 'text-yellow-300 border-yellow-300' : 'hover:text-yellow-300  border-transparent hover:border-yellow-300'}`}
                onClick={()=>item.path && navigate(item.path)}>
                    {item.name}
                </span>
                
            );
            })}
          
          
        </nav>

        {/* Right Section Desktop */}
        <div className="hidden md:flex items-center gap-5 relative">

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30 transition cursor-pointer"
            >
              {language}
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-24 bg-white text-black rounded-lg shadow-lg">
                <div
                  onClick={() => changeLanguage("EN")}
                  className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  English
                </div>
                <div
                  onClick={() => changeLanguage("FA")}
                  className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  فارسی
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="flex items-center gap-2 bg-linear-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-full">
            <User size={16} color="white" />
            <label className="text-white font-semibold">{currentuser}</label>
          </div>


          {/* Logout */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition duration-300 cursor-pointer"
          >
            Logout
          </button>
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div
          className="md:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1e3a5f] text-white px-6 py-4 space-y-4">
          {menuItems.map((item, i) => {
                const isActive = item.path && location.pathname.startsWith(item.path);
            return(
                <div
                key={i}
                onClick={() => item.path && navigate(item.path)}
                className={`cursor-pointer ${ isActive ? 'text-yellow-300 border-yellow-300' : 'hover:text-yellow-300  border-transparent hover:border-yellow-300'}`}
                >
                {item.name}
                </div>
            );
                
            })}

          {/* Language Mobile */}
          <div className="pt-3 border-t border-white/30">
            <div className="font-semibold mb-2">Language</div>
            <div className="flex gap-4">
              <button
                onClick={() => changeLanguage("EN")}
                className="px-3 py-1 bg-white/20 rounded"
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage("FA")}
                className="px-3 py-1 bg-white/20 rounded curpo"
              >
                FA
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-3 border-t border-white/30">
            <div className="flex items-center gap-2 bg-linear-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-full">
                <User size={16} color="white" />
                <span className="text-white font-semibold">{currentuser}</span>
           </div>

            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 rounded-lg cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header_page;
