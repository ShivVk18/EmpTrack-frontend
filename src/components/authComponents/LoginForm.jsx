import { loginSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

import { toast } from "sonner";
import { Link, useNavigate } from "react-router";

import api from "@/utils/axiosInstance";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginForm() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      userType: "admin",
    },
  });

  const onSubmit = async (formData) => {
    try {
      const res = await api.post("/auth/login", formData);
      const { success, data, message } = res.data;

      if (!success || !data?.user?.id) {
        toast.error(message || "Login failed. User not found.");
        return;
      }

      toast.success("OTP verified. Logged in successfully.");

      const { accessToken, user, userType } = data;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userType", userType);

      useAuthStore.getState().setUser({ user, token: accessToken, userType });

      if (userType === "admin") {
        navigate("/admin/dashboard");
      } else if (userType === "employee") {
        navigate("/employee/dashboard");
      } else {
        navigate("/login");
      }
 
      // const userDetails =  {
      //     userId: data.user.id,
      //   email: data.user.email,
      //   userType: data.userType,
      // }

      // const otpSend = await api.post('/auth/otp/send',{
      //   userId: userDetails.userId,
      //   userType: userDetails.userType,
      // })

      // if (otpSend.data.success) {
      //   toast.success("OTP sent to your registered email.");
      //   navigate("/login/otp", { state: userDetails });
      // } else {
      //   toast.error("Failed to send OTP. Please try again.");
      // }

    } catch (error) {
      console.error("Login Error:", error);
      toast.error(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="w-full relative">
      {/* Background Effects */}
      <div className="absolute -top-3 -right-3 w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-purple-600/10 via-indigo-600/8 to-blue-600/6 rounded-full blur-xl sm:blur-2xl animate-pulse pointer-events-none"></div>
      <div
        className="absolute -bottom-3 -left-3 w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-indigo-600/10 via-blue-600/8 to-purple-600/6 rounded-full blur-xl sm:blur-2xl animate-pulse pointer-events-none"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="relative z-10 space-y-3 sm:space-y-6 w-full">
        {/* Header */}
        <div className="text-center pb-2 sm:pb-3 border-b border-purple-100">
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-purple-600">
            Sign In to Your Account
          </h3>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 sm:space-y-5 w-full"
          >
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1 w-full">
                  <FormLabel className="text-xs sm:text-sm font-medium text-slate-700">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@company.com"
                      type="email"
                      className="h-9 sm:h-10 lg:h-11 text-xs sm:text-sm transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 w-full"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.email && (
                    <p className="text-xs text-red-500 mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1 w-full">
                  <FormLabel className="text-xs sm:text-sm font-medium text-slate-700">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="h-9 sm:h-10 lg:h-11 text-xs sm:text-sm transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 w-full"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.password && (
                    <p className="text-xs text-red-500 mt-1">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* User Type Field */}
            <FormField
              control={form.control}
              name="userType"
              render={({ field }) => (
                <FormItem className="space-y-1 w-full">
                  <FormLabel className="text-xs sm:text-sm font-medium text-slate-700">
                    User Type
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <SelectTrigger className="w-full h-9 sm:h-10 lg:h-11 text-xs sm:text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500">
                        <SelectValue placeholder="Select user type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="employee">Employee</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {form.formState.errors.userType && (
                    <p className="text-xs text-red-500 mt-1">
                      {form.formState.errors.userType.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full h-9 sm:h-10 lg:h-12 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg text-xs sm:text-sm lg:text-base"
            >
              Sign In
            </Button>
          </form>
        </Form>

        {/* Footer */}
        <div className="text-center pt-3 sm:pt-5 border-t border-stone-200 w-full">
          <p className="text-xs sm:text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 hover:text-indigo-700 font-medium ml-1 transition-colors duration-200"
            >
              Create one here
            </Link>{" "}
            <span className="ml-1 text-[11px] sm:text-xs text-slate-400">
              (Only company creators can create an account)
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
