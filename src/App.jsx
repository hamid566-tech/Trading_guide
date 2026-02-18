import { useState } from 'react'
import { HashRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login_page from './component/login_folder/Login_page'
import Home_page from './component/home_folder/Home_page';

function App() {
  const [count, setCount] = useState(0)

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Login_page/>} />
        <Route path='/home/*' element={<Home_page/>} />
      </Routes>
    </HashRouter>
  )
}

export default App
