import { Route, Routes } from "react-router";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { Toaster } from "./components/ui/sonner";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import EmployeeDashboardPage from "./pages/EmployeeDashboardPage";
import EmployeeManagementPage from "./pages/EmployeeManagementPage";
import AddEmployeePage from "./pages/AddEmployeePage";
import DepartmentDesignationPage from "./pages/DepartmentDesignationPage";

import DepartmentPage from "./pages/DepartmentPage";
import HolidayPage from "./pages/HolidayPage";
import PayParameterPage from "./pages/PayParameterPage";
import LeavePolicyPage from "./pages/LeavePolicyPage";
import ProfilePage from "./pages/ProfilePage";
import ViewAllEmployeePage from "./pages/ViewAllEmloyeePage";
import AttendancePlanPage from "./pages/AttendancePlanPage";
import ComplainPage from "./pages/ComplainPage";
import PayrollPage from "./pages/PayrollPage";
import OwnAttendancePage from "./pages/OwnAttendancePage";
import LeaveApplicationPage from "./pages/LeaveApplicationPage";
import ManageLeaveApplicationPage from "./pages/ManageLeaveApplicationPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path='/login/otp' element={<VerifyOtpPage/>} /> */}
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboardPage />} />
        <Route
          path="/admin/dashboard/employee-management"
          element={<EmployeeManagementPage />}
        />
        
        <Route
          path="/admin/dashboard/employee-management/add"
          element={<AddEmployeePage />}
        />

         <Route
          path="/admin/dashboard/employee-management/view-all"
          element={<ViewAllEmployeePage />}
        />

        <Route
          path="/admin/dashboard/department-designation/"
          element={<DepartmentDesignationPage />}
        />
        <Route
          path="/admin/dashboard/department-designation/department-add"
          element={<DepartmentDesignationPage />}
        />
        <Route
          path="/admin/dashboard/department-designation/department/:id"
          element={<DepartmentPage />}
        />

        <Route path="/admin/dashboard/holidays" element={<HolidayPage />} />
        <Route path="/employee/dashboard/holidays" element={<HolidayPage />} />
        <Route path="/admin/dashboard/pay-parameters" element={<PayParameterPage/>} />
        <Route path="/admin/dashboard/payroll" element={<PayrollPage/>} />
        <Route path="/admin/dashboard/leave-policy" element={<LeavePolicyPage/>} />
        <Route path="/admin/dashboard/profile" element={<ProfilePage/>} />
        <Route path="/admin/dashboard/attendance-plan" element={<AttendancePlanPage/>} />
        <Route path="/employee/dashboard/complaints" element={<ComplainPage/>} />
        <Route path="/admin/dashboard/complaints" element={<ComplainPage/>} />
        <Route path="/employee/dashboard/own-attendance" element={<OwnAttendancePage/>} />
        <Route path="/employee/dashboard/apply-leave" element={<LeaveApplicationPage/>} />
        <Route path="/admin/dashboard/manage-apply-leave" element={<ManageLeaveApplicationPage/>} />
     
      </Routes>
     
      <Toaster position="top-center" richColors />
    </>
  );
}

export default App;
