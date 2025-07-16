import { Route, Routes } from 'react-router'
import './App.css'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
// import VerifyOtpPage from './pages/VerifyOTPPage'
import SignUpPage from './pages/SignUpPage'
import { Toaster } from './components/ui/sonner'
import Test from './components/Test'
import AdminDashboardPage from './pages/AdminDashboardPage'
import EmployeeDashboardPage from './pages/EmployeeDashboardPage'
import EmployeeManagementPage from './pages/EmployeeManagementPage'
import AddEmployeePage from './pages/AddEmployeePage'
import DepartmentDesignationPage from './pages/DepartmentDesignationPage'

import DepartmentPage from './pages/DepartmentPage'

function App() {
  

  return (
    <> 
       
     <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<LoginPage/>} />
        {/* <Route path='/login/otp' element={<VerifyOtpPage/>} /> */}
        <Route path='/signup' element={<SignUpPage/>} /> 
       
        <Route path='/admin/dashboard' element={<AdminDashboardPage/>} /> 
        <Route path='/employee/dashboard' element={<EmployeeDashboardPage/>}  />
        <Route path='/admin/dashboard/employee-management' element={<EmployeeManagementPage/>}  />
        <Route path='/admin/dashboard/employee-management/add' element={<AddEmployeePage/>} />
        <Route path='/admin/dashboard/department-designation/' element={<DepartmentDesignationPage/>} />
        <Route path='/admin/dashboard/department-designation/department-add' element={<DepartmentDesignationPage/>} />
        <Route
  path="/admin/dashboard/department-designation/department/:id"
  element={<DepartmentPage />}
/>
     </Routes>


      
   
      
     <Toaster position="top-center" richColors/>
     </>
  )
}

export default App
