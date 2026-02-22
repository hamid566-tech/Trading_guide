import React from 'react'
import Header_page from '../header_folder/Header_page'
import { Navigate, Route, Routes } from 'react-router-dom'
import Rent_page from '../Rent_folder/Rent_page'
import Rent_Form_page from '../Rent_folder/Rent_form_folder/Rent_Form_page'
import Mortgage_page from '../Mortagage_folder/Mortgage_page'
import Mortgage_Form_page from '../Mortagage_folder/Mortgage_Form_Folder/Mortgage_Form_page'
import Saleable_Page from '../Saleable_Folder/Saleable_Page'
import Saleable_Form_page from '../Saleable_Folder/Saleable_Form_Folder/Saleable_Form_page'
import Applicant_page from '../Applicant_Folder/Applicant_page'
import Applicant_Form_page from '../Applicant_Folder/Applicant_Form_Folder/Applicant_Form_page'
import User_page from '../User_Folder/User_page'
import User_Reset_password_page from '../User_Folder/User_sub_Folder/User_Reset_password_page'
import User_create_page from '../User_Folder/User_sub_Folder/User_create_page'
import First_page from '../First_Folder/First_page'
import Rent_Report_page from '../Rent_folder/Rent_form_folder/Rent_Report_page'

const Home_page = () => {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-[#012a4a] via-[#01497c] to-[#012a4a]">

      <Header_page/>

      <div className="flex-1 flex items-center justify-center p-4">
        <Routes>
          {/* <Route index element={<Navigate to='rent'/>}/> */}
          <Route path='/' element={<First_page/>}/>

          <Route path='rent/*' element={<Rent_page/>}/>
          <Route path='rent/rent_form' element={<Rent_Form_page/>}/>
          <Route path='rent/rent_report' element={<Rent_Report_page/>}/>
          <Route path='mortgage/*' element={<Mortgage_page/>}/>
          <Route path='mortgage/mortgage_form' element={<Mortgage_Form_page/>}/>
          <Route path='saleable/*' element={<Saleable_Page/>}/>
          <Route path='saleable/saleable_form' element={<Saleable_Form_page/>}/>
          <Route path='applicant/*' element={<Applicant_page/>}/>
          <Route path='applicant/applicant_form' element={<Applicant_Form_page/>}/>
          <Route path='user/*' element={<User_page/>}/>
          <Route path='user/reset_password' element={<User_Reset_password_page/>}/>
          <Route path='user/user_create_form' element={<User_create_page/>}/>
        </Routes>
      </div>

    </div>

  )
}

export default Home_page
