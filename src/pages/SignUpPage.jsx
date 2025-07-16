import AuthHeader from "../components/authComponents/AuthHeader";
import SignupForm from "../components/authComponents/SignupForm";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200 flex flex-col overflow-x-hidden">
      <AuthHeader />

      <main className="flex flex-1 items-center justify-center px-3 sm:px-4 py-4 sm:py-6 lg:py-8 pt-16 sm:pt-20 lg:pt-24 w-full">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white shadow-xl rounded-lg sm:rounded-xl p-3 sm:p-5 lg:p-6 space-y-3 sm:space-y-4 mx-auto">
          <div className="text-center space-y-1 sm:space-y-1.5">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-800 leading-snug">
              Create Your Account
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-slate-600">
              Join <span className="font-medium text-purple-600">EmpTrack</span>{" "}
              to manage your workforce efficiently
            </p>
          </div>

          <SignupForm />
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;
