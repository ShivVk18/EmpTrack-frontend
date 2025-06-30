
import {z} from 'zod'

export const signupSchema = z.object({
  adminName: z.string().min(1, "Admin name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  mobile: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  companyName: z.string().min(1, "Company name is required"),
  industry: z.string().min(1, "Industry is required"),
  address: z.string().min(1, "Company address is required"),
  stateName: z.string().min(1, "State is required"),
  cityName: z.string().min(1, "City is required"),
})




