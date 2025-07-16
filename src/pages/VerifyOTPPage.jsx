import AuthHeader from "@/components/authComponents/AuthHeader";
import VerifyOTP from "@/components/authComponents/VerifyOTP";
import React from "react";

const VerifyOtpPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200 flex flex-col overflow-x-hidden">
      <AuthHeader />

      <main className="flex flex-1 items-center justify-center px-3 sm:px-6 py-6 sm:py-8 lg:py-12 pt-16 sm:pt-20 lg:pt-24 w-full">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white shadow-xl rounded-xl sm:rounded-2xl p-4 sm:p-8 lg:p-10 space-y-4 sm:space-y-6 lg:space-y-8 mx-auto">
          <div className="text-center space-y-2 sm:space-y-3">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 leading-tight">
              Verify One-Time Password
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600">
              We've sent a 6-digit OTP to your registered email. Please enter it below to proceed.
            </p>
          </div>

          <VerifyOTP />
        </div>
      </main>
    </div>
  );
};

export default VerifyOtpPage;