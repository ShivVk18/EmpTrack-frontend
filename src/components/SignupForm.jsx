

import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { Building2, Mail, Lock, Phone, MapPin, Globe, Eye, EyeOff, CheckCircle2 } from "lucide-react"

import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select"
import { Card, CardContent } from "./ui/card"


export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
   

  useEffect(() => {
    
  },[])
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      mobile: "",
      companyName: "",
      industry: "",
      address: "",
      stateName: "",
      cityName: "",
    },
  })

  const onSubmit = async (values) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(values)
    setIsLoading(false)
    alert("Account created successfully!")
  }

  const states = [
    "California",
    "New York",
    "Texas",
    "Florida",
    "Illinois",
    "Pennsylvania",
    "Ohio",
    "Georgia",
    "North Carolina",
    "Michigan",
  ]

  const cities = [
    "Los Angeles",
    "New York City",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
  ]

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Real Estate",
    "Consulting",
    "Media",
    "Non-profit",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center p-3 sm:p-4 lg:p-6">
      <div className="w-full max-w-5xl animate-fade-in">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 rounded-3xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg shadow-blue-500/25">
            <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-2 sm:mb-3">
            Create Your Account
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join thousands of companies already using our platform to streamline their operations
          </p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden">
          <CardContent className="p-4 sm:p-6 lg:p-8 xl:p-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
                {/* Personal Information Section */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-3 pb-3 sm:pb-4 border-b border-gray-100">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Personal Information</h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      rules={{ required: "Full name is required" }}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            Full Name
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full name"
                              className="h-11 sm:h-12 border-gray-200 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 transition-all duration-200 text-sm sm:text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            Email Address
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 z-10" />
                              <Input
                                type="email"
                                placeholder="you@company.com"
                                className="pl-10 sm:pl-11 h-11 sm:h-12 border-gray-200 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 transition-all duration-200 text-sm sm:text-base"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      rules={{
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            Password
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 z-10" />
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a strong password"
                                className="pl-10 sm:pl-11 pr-10 sm:pr-11 h-11 sm:h-12 border-gray-200 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 transition-all duration-200 text-sm sm:text-base"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
                              >
                                {showPassword ? (
                                  <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                                ) : (
                                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="mobile"
                      rules={{ required: "Phone number is required" }}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            Phone Number
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 z-10" />
                              <Input
                                type="tel"
                                placeholder="+91 1234567899"
                                className="pl-10 sm:pl-11 h-11 sm:h-12 border-gray-200 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 transition-all duration-200 text-sm sm:text-base"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Company Information Section */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-3 pb-3 sm:pb-4 border-b border-gray-100">
                    <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Company Information</h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <FormField
                      control={form.control}
                      name="companyName"
                      rules={{ required: "Company name is required" }}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            Company Name
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 z-10" />
                              <Input
                                placeholder="Your Company Inc."
                                className="pl-10 sm:pl-11 h-11 sm:h-12 border-gray-200 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 transition-all duration-200 text-sm sm:text-base"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="industry"
                      rules={{ required: "Industry is required" }}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            Industry
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11 sm:h-12 border-gray-200 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 transition-all duration-200">
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <Globe className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                  <SelectValue placeholder="Select your industry" />
                                </div>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {industries.map((industry) => (
                                <SelectItem key={industry} value={industry.toLowerCase()}>
                                  {industry}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    rules={{ required: "Company address is required" }}
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          Company Address
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-4 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 z-10" />
                            <Textarea
                              placeholder="Enter your complete company address..."
                              className="pl-10 sm:pl-11 min-h-[100px] sm:min-h-[120px] border-gray-200 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 transition-all duration-200 resize-none text-sm sm:text-base"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <FormField
                      control={form.control}
                      name="stateName"
                      rules={{ required: "State is required" }}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            State
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11 sm:h-12 border-gray-200 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 transition-all duration-200">
                                <SelectValue placeholder="Select your state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {states.map((state) => (
                                <SelectItem key={state} value={state.toLowerCase()}>
                                  {state}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cityName"
                      rules={{ required: "City is required" }}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            City
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11 sm:h-12 border-gray-200 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 transition-all duration-200">
                                <SelectValue placeholder="Select your city" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {cities.map((city) => (
                                <SelectItem key={city} value={city.toLowerCase()} >
                                  {city}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Submit Section */}
                <div className="pt-4 sm:pt-6 space-y-4 sm:space-y-6">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 rounded-xl"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating Account...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        Create Account
                      </div>
                    )}
                  </Button>

                  <div className="text-center space-y-3">
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-md mx-auto">
                      By creating an account, you agree to our{" "}
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2 transition-colors"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2 transition-colors"
                      >
                        Privacy Policy
                      </a>
                    </p>

                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
                      <div className="w-8 sm:w-12 h-px bg-gray-200"></div>
                      <span>Secure & Encrypted</span>
                      <div className="w-8 sm:w-12 h-px bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
