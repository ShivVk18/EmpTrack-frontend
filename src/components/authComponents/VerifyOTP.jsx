import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { OTPSchema } from "@/lib/zodSchema";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import api from "@/utils/axiosInstance";

const VerifyOTP = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const userDetails = location.state


  const [timer, setTimer] = useState(120); 
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const form = useForm({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const onSubmit = async(formData) => {
     try {
      const res = await api.post('/auth/otp/verify', {
         userId :userDetails.userId,
         userType:userDetails.userType,
         otp:formData.otp
      })  

       if (res.data.success) {
      toast.success("OTP verified. Logged in successfully.");

      
      const { accessToken, user, userType } = res.data.data;


      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userType", userType);

      useAuthStore.getState().setUser({user,token:accessToken,userType})


      if(userType==='admin'){
        navigate('/admin/dashboard')
      }else if(userType==='employee'){
        navigate('/employee/dashboard')
      }else{
        navigate('/login')
      }
      
     
    }

     } catch (error) {
      const errMsg = error?.response?.data?.message || "Invalid OTP";
      toast.error(errMsg);
     }
  };

  const handleResend = async() => {
     try {
    const { userId, userType } = location.state; 

    const res = await api.post("/auth/otp/resend", {
      userId,
      userType,
    });

    if (res.data.success) {
      toast.success("New OTP sent successfully");
      setTimer(120); 
      setIsResendDisabled(true);
    } else {
      toast.error("Failed to resend OTP");
    }
  } catch (error) {
    const errMsg = error?.response?.data?.message || "Resend failed";
    toast.error(errMsg);
    console.error("Resend OTP error:", error);
  }
  };

  return (
    <div className="w-full relative">
      {/* Background Effects */}
      <div className="absolute -top-3 -right-3 w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-amber-200/25 rounded-full blur-xl sm:blur-2xl pointer-events-none"></div>
      <div className="absolute -bottom-3 -left-3 w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-amber-100/30 rounded-full blur-xl sm:blur-2xl pointer-events-none" style={{ animationDelay: "1s" }}></div>

      <div className="relative z-10 space-y-3 sm:space-y-6 w-full">
        {/* Header */}
        <div className="text-center pb-2 sm:pb-3 border-b border-amber-100">
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-amber-700">
            Verify One-Time Password
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 pt-1">We have sent an OTP to your registered email</p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 w-full flex flex-col items-center">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col items-center space-y-2">
                  <FormLabel className="text-xs sm:text-sm font-medium text-slate-700">Enter 6-digit OTP</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        {[...Array(6)].map((_, i) => (
                          <InputOTPSlot key={i} index={i} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Timer & Resend */}
            <div className="flex items-center justify-center space-x-4 text-xs sm:text-sm text-slate-600">
              <span>Time Remaining: <span className="font-medium text-amber-700">{formatTime(timer)}</span></span>
              <Button
                type="button"
                onClick={handleResend}
                variant="outline"
                size="sm"
                disabled={isResendDisabled}
                className="h-7 text-xs sm:h-8 sm:text-sm border-slate-300 hover:border-amber-400 hover:text-amber-700 transition-all duration-200"
              >
                Resend OTP
              </Button>
            </div>

            {/* Verify Button */}
            <Button
              type="submit"
              className="w-full h-9 sm:h-10 lg:h-12 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-all duration-200 text-xs sm:text-sm lg:text-base shadow-sm hover:shadow-md"
            >
              Verify OTP
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyOTP;
