import {
  Users,
  Layers,
  BadgeIndianRupee,
  Settings,
  Clock,
  Calendar,
  Bell,
  BarChart2,
  Sparkles,
  Shield,
} from "lucide-react";

export const FEATURES = {
  employeeManagement: {
    icon: Users,
    title: "Employee Management",
    desc: "Add, view, and update employee records",
    path: "/admin/dashboard/employee-management",
  },
  departmentDesignation: {
    icon: Layers,
    title: "Department & Designation",
    desc: "Manage company departments and roles",
    path: "/admin/dashboard/department-designation",
  },
  payroll: {
    icon: BadgeIndianRupee,
    title: "Payroll",
    desc: "Generate and manage employee payroll",
    path: "/admin/dashboard/payroll",
  },
  payParams: {
    icon: Settings,
    title: "Pay Parameters",
    desc: "Configure bonuses, deductions, etc.",
    path: "/admin/dashboard/pay-parameters",
  },
  attendance: {
    icon: Clock,
    title: "Attendance",
    desc: "Track and approve attendance records",
    path: "/admin/dashboard/attendance",
  },
  leave: {
    icon: Calendar,
    title: "Leave",
    desc: "Apply for or manage leave requests",
    path: "/admin/dashboard/leave",
  },
  holidays: {
    icon: Sparkles,
    title: "Holidays",
    desc: "View and manage official holidays",
    path: "/admin/dashboard/holidays",
  },
  complaints: {
    icon: Bell,
    title: "Complaints",
    desc: "Raise or handle employee complaints",
    path: "/admin/dashboard/complaints",
  },
  analytics: {
    icon: BarChart2,
    title: "Analytics",
    desc: "HR and finance performance insights",
    path: "/admin/dashboard/analytics",
  },
  permissions: {
    icon: Shield,
    title: "Permissions",
    desc: "Role and permission control (admin only)",
    path: "/admin/dashboard/permissions",
  },
  companySettings: {
    icon: Settings,
    title: "Company Settings",
    desc: "View and update company profile",
    path: "/admin/dashboard/company-settings",
  },
  profile: {
    icon: Users,
    title: "My Profile",
    desc: "View and update your personal info",
    path: "/admin/dashboard/profile",
  },
};