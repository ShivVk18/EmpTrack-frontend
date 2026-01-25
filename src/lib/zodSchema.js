
import {z} from 'zod'


export const signupSchema = z.object({
  adminName: z.string().min(1, "Admin name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  countryCode: z.string().min(1, "Country code is required"),
  mobile: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  companyName: z.string().min(1, "Company name is required"),
  industry: z.string().min(1, "Industry is required"),
  address: z.string().min(1, "Company address is required"),
  countryName: z.string().min(1, "Country is required"),
  stateName: z.string().min(1, "State is required"),
  cityName: z.string().min(1, "City is required"),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),

  password: z.string({
    required_error: "Password is required",
  }),

  userType: z.enum(["admin", "employee"], {
    required_error: "User type is required",
  }),
});

export const OTPSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

export const addEmployeeSchema = z
  .object({
    employeeCode: z.string().min(1, "Employee code is required"),
    employeeName: z.string().min(1, "Employee name is required"),
    email: z.string().email("Invalid email format"),
    countryCode: z.string().min(1, "Country code is required"),
    mobileNo: z.string().min(1, "Mobile number is required"),
    salary: z.string().refine((val) => parseFloat(val) > 0, {
      message: "Salary must be greater than 0",
    }),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]),
    dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date of birth",
    }),
    address1: z.string().min(1, "Address1 is required"),
    address2: z.string().optional(),
    password: z.string().min(8, "Password must be at least 8 characters long"),

    type: z.enum([
      "PERMANENT",
      "CONTRACT",
      "INTERN",
      "CONSULTANT",
      "PART_TIME",
      "TEMPORARY",
    ]),
    role: z
      .enum(["EMPLOYEE", "HR", "MANAGER", "ACCOUNTANT", "SR_MANAGER"])
      .optional(),

    accountNo: z.string().min(1, "Account number is required"),
    pfAccountNo: z.string().min(1, "PF Account number is required"),
    countryName: z.string().min(1, "Country name is required"),
    stateName: z.string().optional(),
    cityName: z.string().optional(),
    bankCode: z.string().min(1, "Bank code is required"),
    designationName: z.string().min(1, "Designation name is required"),
    departmentName: z.string().min(1, "Department name is required"),
    profilePic: z.any().optional(),
  })
  .transform((data) => {
    if (!data.stateName) data.stateName = data.countryName;
    if (!data.cityName) data.cityName = data.countryName;
    return data;
  });

export const departmentSchema = z.object({
  departmentName: z.string().min(1, "Department name is required"),
  departmentCode: z.string().min(1, "Department code is required"),
  description: z.string().optional(),
});

export const designationSchema = z.object({
  designationName: z.string().min(1, "Designation name is required"),

  designationCode: z.string().min(1, "Designation code is required"),

  description: z.string().optional(),

  level: z.enum(
    ["Intern", "Junior", "Mid", "Senior", "Lead", "Manager", "Director"],
    {
      required_error: "Level is required",
      invalid_type_error: "Invalid level selected",
    }
  ),

  departmentName: z.string().min(1, "Department name is required"),
});

export const updateDepartmentSchema = departmentSchema
  .partial()
  .refine(
    (data) =>
      data.departmentName?.trim() ||
      data.departmentCode?.trim() ||
      data.description?.trim(),
    {
      message: "At least one field must be updated.",
    }
  );

export const updateDesignationSchema = z.object({
  designationName: z.string().optional(),
  designationCode: z.string().optional(),
  description: z.string().optional(),
  level: z.enum(["Intern", "Junior", "Mid", "Senior", "Lead"]).optional(),
  departmentName: z.string().optional(), // if you're accepting it during update
});

export const createHolidaySchema = z.object({
  holidayName: z
    .string({ required_error: "Holiday name is required" })
    .min(1, "Holiday name cannot be empty"),

  date: z
    .string({ required_error: "Date is required" })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),

  isCompanySpecific: z.boolean().optional(), 
});

export const createPayParameterSchema = z.object({
  
  employeeType: z.enum(["PERMANENT", "CONTRACT", "INTERN", "CONSULTANT", "PART_TIME"], {
    required_error: "Employee Type is required",
  }),
  departmentName: z.string().optional().or(z.literal("")),
  designationName: z.string().optional().or(z.literal("")),

 
  hra: z.number().min(0).max(100).optional(),
  da: z.number().min(0).max(100).optional(),
  ta: z.number().min(0).max(100).optional(),
  spall: z.number().min(0).max(100).optional(),
  medicalAllRate: z.number().min(0).max(100).optional(),
  epfRate: z.number().min(0).max(100).optional(),
  esiRate: z.number().min(0).max(100).optional(),
  tdsRate: z.number().min(0).max(100).optional(),
  professionalTaxRate: z.number().min(0).max(100).optional(),

  
  medicalAllFixed: z.number().min(0).optional(),
  epfSalaryLimit: z.number().min(0).optional(),
  esiSalaryLimit: z.number().min(0).optional(),
  paidLeavePerMonth: z.number().min(0).optional(),
  unpaidLeavePenaltyPerDay: z.number().min(0).optional(),
});

export const leavePolicySchema = z.object({
  leaveType: z.string().min(1, "Leave type is required"),
  daysAllowed: z
    .number({ invalid_type_error: "Days allowed must be a number" })
    .min(1, "Days allowed must be at least 1"),

  carryForward: z.boolean(),

  maxCarryForwardDays: z
    .number({ invalid_type_error: "Max carry forward days must be a number" })
    .min(0, "Max carry forward days can't be negative")
    .optional()
    .nullable(),

  isPaid: z.boolean().optional(),
  isActive: z.boolean().optional(),
}).superRefine((data, ctx) => {
  if (data.carryForward === true && (data.maxCarryForwardDays === null || data.maxCarryForwardDays === undefined)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Max Carry Forward Days is required when Carry Forward is enabled",
      path: ["maxCarryForwardDays"],
    });
  }
});

export const attendancePlanSchema = z.object({
  name: z
    .string()
    .min(2, "Plan name must be at least 2 characters")
    .max(100, "Plan name must be at most 100 characters"),

  description: z
    .string()
    .max(255, "Description can be at most 255 characters")
    .optional(),

  workingHours: z
    .number({
      required_error: "Working hours is required",
      invalid_type_error: "Working hours must be a number",
    })
    .min(1, "Working hours must be at least 1 hour")
    .max(24, "Working hours cannot exceed 24 hours"),

  allowedLateMins: z
    .number({
      invalid_type_error: "Allowed late minutes must be a number",
    })
    .min(0, "Late minutes cannot be negative")
    .default(0),

  gracePeriodMins: z
    .number({
      invalid_type_error: "Grace period must be a number",
    })
    .min(0, "Grace period cannot be negative")
    .default(0),

  shiftStartTime: z
    .string({
      required_error: "Shift start time is required",
    })
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),

  requirePunchOut: z.boolean(),
  allowEarlyLeave: z.boolean(),
  isDefault: z.boolean(),
});

export const complaintSchema = z.object({
  subject: z
    .string()
    .min(1, "Subject is required")
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must not exceed 200 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(20, "Description must be at least 20 characters")
    .max(2000, "Description must not exceed 2000 characters"),
})



export const leaveApplicationSchema = z.object({
  leavePolicyId: z.preprocess(
    (val) => Number(val),   // convert to number
    z.number().int()
  ),
  fromDate: z.string().min(1),
  toDate: z.string().min(1),
  reason: z.string().min(1),
  isHalfDay: z.boolean().default(false),
  session: z.string().nullable().optional(),
});

