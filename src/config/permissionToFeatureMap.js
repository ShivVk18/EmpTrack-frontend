export const PERMISSION_TO_FEATURE_MAP = {
  "company:read": "companySettings",
  "company:update": "companySettings",

  "employee:read": "employeeManagement",
  "employee:manage": "employeeManagement",
  "employee:update:basic": "employeeManagement",
  "employee:update:salary": "employeeManagement",

  "department:manage": "departmentDesignation",
  "department:read": "departmentDesignation",
  "designation:manage": "departmentDesignation",
  "designation:read": "departmentDesignation",

  "payroll:manage": "payroll",
  "payroll:read": "payroll",
  "payroll:generate": "payroll",
  "payroll:read:own": "payroll",

  "payparameter:manage": "payParams",
  "payparameter:read": "payParams",

  "analytics:read": "analytics",

  "attendance:manage": "attendance",
  "attendance:approve": "attendance",
  "attendance:read": "attendance",
  "attendancePlan:read": "attendance",
  "attendancePlan:manage": "attendance",
  "attendance:clockin": "attendance",
  "attendance:clockout": "attendance",
  "attendance:read:own": "attendance",

  "leave:manage": "leave",
  "leave:apply": "leave",
  "leave:view_own": "leave",
  "leave-policy:manage": "leave",

  "complain:manage": "complaints",
  "complain:read": "complaints",
  "complain:raise": "complaints",
  "complain:read:own": "complaints",

  "holiday:manage": "holidays",
  "holiday:read": "holidays",

  "notification:manage": "notifications",
  "notification:read": "notifications",

  "profile:read": "profile",
  "profile:update": "profile",
};
