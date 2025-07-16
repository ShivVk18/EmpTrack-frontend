
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