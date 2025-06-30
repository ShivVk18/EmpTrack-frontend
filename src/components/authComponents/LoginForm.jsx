import { useState } from "react"
import { useForm } from "react-hook-form"
import { Mail, Lock, User, Shield, Eye, EyeOff, Phone, ArrowRight } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Switch } from "../ui/switch"

export default function LoginForm() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const form = useForm({
    defaultValues: {
      emailOrMobile: "",
      password: "",
    },
  })

  const onSubmit = async (values) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log({
      ...values,
      userType: isAdmin ? "admin" : "employee",
      rememberMe,
    })
    setIsLoading(false)
    alert(`Welcome back, ${isAdmin ? "Admin" : "Employee"}!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center p-3 sm:p-4 lg:p-6">
      <div className="w-full max-w-md sm:max-w-lg animate-fade-in">
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden">
          <CardHeader className="text-center pb-4 sm:pb-6 pt-6 sm:pt-8 px-4 sm:px-6 lg:px-8">
            {/* User Type Toggle */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center justify-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50/80 rounded-2xl border border-gray-100/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 sm:gap-3">
                  <User
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${!isAdmin ? "text-blue-600 scale-110" : "text-gray-400"}`}
                  />
                  <span
                    className={`font-medium text-sm sm:text-base transition-all duration-300 ${!isAdmin ? "text-blue-600" : "text-gray-500"}`}
                  >
                    Employee
                  </span>
                </div>

                <div className="relative">
                  <Switch
                    checked={isAdmin}
                    onCheckedChange={setIsAdmin}
                    className={cn(
                      "transition-all duration-300 scale-110",
                      isAdmin ? "data-[state=checked]:bg-purple-600" : "data-[state=unchecked]:bg-blue-600",
                    )}
                  />
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <span
                    className={`font-medium text-sm sm:text-base transition-all duration-300 ${isAdmin ? "text-purple-600" : "text-gray-500"}`}
                  >
                    Admin
                  </span>
                  <Shield
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${isAdmin ? "text-purple-600 scale-110" : "text-gray-400"}`}
                  />
                </div>
              </div>
            </div>

            {/* Dynamic Header */}
            <div
              className={`mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center mb-4 sm:mb-6 transition-all duration-500 shadow-lg ${
                isAdmin
                  ? "bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 shadow-purple-500/25"
                  : "bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 shadow-blue-500/25"
              }`}
            >
              {isAdmin ? (
                <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              ) : (
                <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              )}
            </div>

            <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-2 sm:mb-3">
              {isAdmin ? "Admin Portal" : "Employee Login"}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {isAdmin ? "Access your administrative dashboard" : "Welcome back to your workspace"}
            </CardDescription>
          </CardHeader>

          <CardContent className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                <FormField
                  control={form.control}
                  name="emailOrMobile"
                  rules={{ required: "Email or mobile number is required" }}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        Email or Mobile Number
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
                            <div className="flex items-center gap-1">
                              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                              <span className="text-xs">/</span>
                              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                          </div>
                          <Input
                            type="text"
                            placeholder={
                              isAdmin
                                ? "admin@company.com or +1 (555) 000-0000"
                                : "employee@company.com or +1 (555) 123-4567"
                            }
                            className="pl-14 sm:pl-16 h-11 sm:h-12 border-gray-200 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 transition-all duration-200 text-sm sm:text-base"
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
                  rules={{ required: "Password is required" }}
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
                            placeholder="Enter your password"
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

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition-colors"
                    />
                    <span className="text-gray-600 group-hover:text-gray-800 transition-colors">Remember me</span>
                  </label>
                  <a
                    href="#"
                    className={`font-medium transition-all hover:underline underline-offset-2 ${
                      isAdmin ? "text-purple-600 hover:text-purple-700" : "text-blue-600 hover:text-blue-700"
                    }`}
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="space-y-4 pt-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full h-12 sm:h-14 text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl rounded-xl ${
                      isAdmin
                        ? "bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 hover:from-purple-700 hover:via-purple-800 hover:to-pink-700 shadow-purple-500/25 hover:shadow-purple-500/40"
                        : "bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 hover:from-blue-700 hover:via-blue-800 hover:to-cyan-700 shadow-blue-500/25 hover:shadow-blue-500/40"
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Signing In...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>Sign In as {isAdmin ? "Admin" : "Employee"}</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </Button>

                  {/* Additional Options */}
                  <div className="text-center space-y-3">
                    {isAdmin && (
                      <p className="text-xs sm:text-sm text-gray-500">
                        Don't have an account?{" "}
                        <a
                          href="#"
                          className="text-purple-600 hover:text-purple-700 font-medium underline underline-offset-2 transition-colors"
                        >
                          Sign up here
                        </a>
                      </p>
                    )}

                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                      <div className="w-8 sm:w-12 h-px bg-gray-200"></div>
                      <span>Secure Login</span>
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
