export const ROLE_PERMISSIONS = {
  admin: ["*"],

  HR: [
    "company:read",
    "employee:read",
    "employee:manage",
    "employee:update:basic",
    "employee:update:salary",
    "department:manage",
    "designation:manage",
    "payroll:manage",
    "payparameter:manage",
    "analytics:read",

    "attendance:manage",
    "attendance:approve",
    "attendancePlan:manage",
    "attendancePlan:read",

    "leave-policy:manage",

    "leave:manage",
    "complain:manage",
    "complain:read",

    "holiday:manage",
    "holiday:read",

    "notification:manage",
    "notification:read",
  ],

  SR_MANAGER: [
    "company:read",
    "employee:read",
    "employee:update:basic",
    "department:manage",
    "designation:manage",
    "payroll:read",
    "payroll:generate",
    "payparameter:read",
    "analytics:read",

    "attendance:read",
    "attendance:approve",
    "attendancePlan:read",

    "leave:manage",

    "complain:read",
    "complain:manage",
    "holiday:read",
    "notification:read",
  ],

  MANAGER: [
    "company:read",
    "employee:read",

    "department:read",
    "designation:read",
    "payroll:read",
    "payparameter:read",

    "attendance:read",
    "attendancePlan:read",

    "complain:read",
    "complain:manage",
    "holiday:read",
    "notification:read",
  ],

  ACCOUNTANT: [
    "company:read",
    "employee:read",
    "employee:update:salary",

    "payroll:manage",
    "payparameter:manage",
    "analytics:read",
    "holiday:read",
    "attendance:clockin",
    "attendance:clockout",
    "attendance:read:own",
  ],

  EMPLOYEE: [
    "profile:read",
    "profile:update",
    "payroll:read:own",

    "attendance:read:own",
    "attendance:clockin",
    "attendance:clockout",

    "leave:apply",
    "leave:view_own",
    "complain:raise",
    "complain:read:own",

    "holiday:read",
    "notification:read",
  ],
};
