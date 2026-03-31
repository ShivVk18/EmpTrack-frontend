import {
  Clock,
  Users,
  BadgeIndianRupee,
  Bell,
  Calendar,
  Sparkles,
} from "lucide-react";

export const EMPLOYEE_FEATURES = {
  myProfile: {
    icon: Users,
    title: "My Profile",
    desc: "View and update your personal info",
    path: "/employee/dashboard/profile",
  },
  myAttendance: {
    icon: Clock,
    title: "My Attendance",
    desc: "View your attendance records",
    path: "/employee/dashboard/own-attendance",
  },
  mySalary: {
    icon: BadgeIndianRupee,
    title: "My Salary",
    desc: "View your salary and payslips",
    path: "/employee/dashboard/view-salaries",
  },
  myComplaints: {
    icon: Bell,
    title: "Complaints",
    desc: "Raise and track your complaints",
    path: "/employee/dashboard/complaints",
  },
  applyLeave: {
    icon: Calendar,
    title: "Apply Leave",
    desc: "Apply for leave and view status",
    path: "/employee/dashboard/apply-leave",
  },
  viewHolidays: {
    icon: Sparkles,
    title: "Holidays",
    desc: "View upcoming official holidays",
    path: "/employee/dashboard/holidays",
  },
};