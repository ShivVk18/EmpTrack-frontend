import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../lib/zodSchema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { industryTypes } from "../../../constants/data";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SignupForm() {
  const [step, setStep] = useState(1);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      adminName: "",
      email: "",
      password: "",
      mobile: "",
      companyName: "",
      industry: "",
      address: "",
      stateName: "",
      cityName: "",
    },
  });

  const onSubmit = () => {
    console.log(form.getValues());
  };

  const getState = async () => {
    try {
      const response = await axios.get("/api/v1/location/states");
      setStates(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCity = async (stateId) => {
    try {
      const response = await axios.get(`/api/v1/location/cities/${stateId}`);
      setCities(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getState();
  }, []);
  
  return (
    <div className="w-full relative">
      {/* Enhanced Background Effects - Smaller on mobile */}
      <div className="absolute -top-3 -right-3 w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-purple-600/10 via-indigo-600/8 to-blue-600/6 rounded-full blur-xl sm:blur-2xl animate-pulse pointer-events-none"></div>
      <div className="absolute -bottom-3 -left-3 w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-indigo-600/10 via-blue-600/8 to-purple-600/6 rounded-full blur-xl sm:blur-2xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative z-10 space-y-3 sm:space-y-6 w-full">
        {/* Progress Indicator - Optimized for mobile */}
        <div className="flex items-center justify-center space-x-1 sm:space-x-3 mb-3 sm:mb-6 w-full">
          <div className="flex items-center space-x-1">
            <div className={`w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
              step >= 1 ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'bg-stone-200 text-stone-500'
            }`}>
              1
            </div>
            <span className={`text-xs sm:text-sm font-medium hidden xs:inline ${step >= 1 ? 'text-purple-600' : 'text-stone-500'}`}>
              Personal
            </span>
          </div>
          <div className={`w-3 sm:w-5 lg:w-8 h-0.5 transition-all duration-300 ${
            step >= 2 ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : 'bg-stone-200'
          }`}></div>
          <div className="flex items-center space-x-1">
            <div className={`w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
              step >= 2 ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white' : 'bg-stone-200 text-stone-500'
            }`}>
              2
            </div>
            <span className={`text-xs sm:text-sm font-medium hidden xs:inline ${step >= 2 ? 'text-indigo-600' : 'text-stone-500'}`}>
              Company
            </span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-5 w-full">
            {step === 1 && (
              <div className="space-y-3 sm:space-y-5 w-full">
                <div className="text-center pb-2 sm:pb-3 border-b border-purple-100">
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-purple-600">
                    Personal Details
                  </h3>
                </div>
                
                <div className="space-y-3 sm:space-y-4 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 w-full">
                    <FormField 
                      control={form.control} 
                      name="adminName" 
                      render={({ field }) => (
                        <FormItem className="space-y-1 w-full">
                          <FormLabel className="text-xs sm:text-sm font-medium text-slate-700">Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your full name" 
                              className="h-9 sm:h-10 lg:h-11 text-xs sm:text-sm transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 w-full" 
                              {...field} 
                            />
                          </FormControl>
                          {form.formState.errors.adminName && (
                            <p className="text-xs text-red-500 mt-1">{form.formState.errors.adminName.message}</p>
                          )}
                        </FormItem>
                      )} 
                    />

                    <FormField 
                      control={form.control} 
                      name="mobile" 
                      render={({ field }) => (
                        <FormItem className="space-y-1 w-full">
                          <FormLabel className="text-xs sm:text-sm font-medium text-slate-700">Mobile Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter mobile number" 
                              className="h-9 sm:h-10 lg:h-11 text-xs sm:text-sm transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 w-full" 
                              {...field} 
                            />
                          </FormControl>
                          {form.formState.errors.mobile && (
                            <p className="text-xs text-red-500 mt-1">{form.formState.errors.mobile.message}</p>
                          )}
                        </FormItem>
                      )} 
                    />
                  </div>

                  <FormField 
                    control={form.control} 
                    name="email" 
                    render={({ field }) => (
                      <FormItem className="space-y-1 w-full">
                        <FormLabel className="text-xs sm:text-sm font-medium text-slate-700">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="you@company.com" 
                            type="email"
                            className="h-9 sm:h-10 lg:h-11 text-xs sm:text-sm transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 w-full" 
                            {...field} 
                          />
                        </FormControl>
                        {form.formState.errors.email && (
                          <p className="text-xs text-red-500 mt-1">{form.formState.errors.email.message}</p>
                        )}
                      </FormItem>
                    )} 
                  />

                  <FormField 
                    control={form.control} 
                    name="password" 
                    render={({ field }) => (
                      <FormItem className="space-y-1 w-full">
                        <FormLabel className="text-xs sm:text-sm font-medium text-slate-700">Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="••••••••" 
                            className="h-9 sm:h-10 lg:h-11 text-xs sm:text-sm transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 w-full" 
                            {...field} 
                          />
                        </FormControl>
                        {form.formState.errors.password && (
                          <p className="text-xs text-red-500 mt-1">{form.formState.errors.password.message}</p>
                        )}
                      </FormItem>
                    )} 
                  />
                </div>

                <div className="pt-2 sm:pt-4 w-full">
                  <Button 
                    type="button" 
                    onClick={() => setStep(2)} 
                    className="w-full h-9 sm:h-10 lg:h-12 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg text-xs sm:text-sm lg:text-base"
                  >
                    Continue to Company Details →
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3 sm:space-y-5 w-full">
                <div className="text-center pb-2 sm:pb-3 border-b border-indigo-100">
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-indigo-600">
                    Company Details
                  </h3>
                </div>
                
                <div className="space-y-3 sm:space-y-4 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 w-full">
                    <FormField 
                      control={form.control} 
                      name="companyName" 
                      render={({ field }) => (
                        <FormItem className="space-y-1 w-full">
                          <FormLabel className="text-xs sm:text-sm font-medium text-slate-700">Company Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your company name" 
                              className="h-9 sm:h-10 lg:h-11 text-xs sm:text-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-full" 
                              {...field} 
                            />
                          </FormControl>
                          {form.formState.errors.companyName && (
                            <p className="text-xs text-red-500 mt-1">{form.formState.errors.companyName.message}</p>
                          )}
                        </FormItem>
                      )} 
                    />

                    <FormField 
                      control={form.control} 
                      name="industry" 
                      render={({ field }) => (
                        <FormItem className="space-y-1 w-full">
                          <FormLabel className="text-xs sm:text-sm font-medium text-slate-700">Industry</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} value={field.value || ""}>
                              <SelectTrigger className="w-full h-9 sm:h-10 lg:h-11 text-xs sm:text-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
                                <SelectValue placeholder="Select industry" />
                              </SelectTrigger>
                              <SelectContent>
                                {industryTypes.map((item) => (
                                  <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          {form.formState.errors.industry && (
                            <p className="text-xs text-red-500 mt-1">{form.formState.errors.industry.message}</p>
                          )}
                        </FormItem>
                      )} 
                    />
                  </div>

                  <FormField 
                    control={form.control} 
                    name="address" 
                    render={({ field }) => (
                      <FormItem className="space-y-1 w-full">
                        <FormLabel className="text-xs sm:text-sm font-medium text-slate-700">Company Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter company address" 
                            className="h-9 sm:h-10 lg:h-11 text-xs sm:text-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-full" 
                            {...field} 
                          />
                        </FormControl>
                        {form.formState.errors.address && (
                          <p className="text-xs text-red-500 mt-1">{form.formState.errors.address.message}</p>
                        )}
                      </FormItem>
                    )} 
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 w-full">
                    <FormField 
                      control={form.control} 
                      name="stateName" 
                      render={({ field }) => (
                        <FormItem className="space-y-1 w-full">
                          <FormLabel className="text-xs sm:text-sm font-medium text-slate-700">State</FormLabel>
                          <FormControl>
                            <Select 
                              value={field.value} 
                              onValueChange={(value) => {
                                const selectedState = states.find((item) => item.value === value);
                                if (selectedState) getCity(selectedState.label);
                                field.onChange(value);
                              }}
                            >
                              <SelectTrigger className="w-full h-9 sm:h-10 lg:h-11 text-xs sm:text-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                              <SelectContent>
                                {states.map((item) => (
                                  <SelectItem key={item.value} value={item.value}>
                                    {item.value}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          {form.formState.errors.stateName && (
                            <p className="text-xs text-red-500 mt-1">{form.formState.errors.stateName.message}</p>
                          )}
                        </FormItem>
                      )} 
                    />

                    <FormField 
                      control={form.control} 
                      name="cityName" 
                      render={({ field }) => (
                        <FormItem className="space-y-1 w-full">
                          <FormLabel className="text-xs sm:text-sm font-medium text-slate-700">City</FormLabel>
                          <FormControl>
                            <Select 
                              onValueChange={field.onChange} 
                              value={field.value}
                            >
                              <SelectTrigger className="w-full h-9 sm:h-10 lg:h-11 text-xs sm:text-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
                                <SelectValue placeholder="Select city" />
                              </SelectTrigger>
                              <SelectContent>
                                {cities.map((item) => (
                                  <SelectItem key={item.value} value={item.value}>
                                    {item.value}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          {form.formState.errors.cityName && (
                            <p className="text-xs text-red-500 mt-1">{form.formState.errors.cityName.message}</p>
                          )}
                        </FormItem>
                      )} 
                    />
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-5 w-full">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setStep(1)}
                    className="w-full sm:w-auto h-9 sm:h-10 lg:h-12 border-slate-300 hover:border-indigo-400 hover:text-indigo-600 transition-all duration-200 text-xs sm:text-sm lg:text-base"
                  >
                    ← Back to Personal
                  </Button>
                  <Button 
                    type="submit" 
                    className="w-full sm:flex-1 h-9 sm:h-10 lg:h-12 bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 hover:from-indigo-700 hover:via-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg text-xs sm:text-sm lg:text-base"
                  >
                    Create Account
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Form>

        {/* Footer */}
        <div className="text-center pt-3 sm:pt-5 border-t border-stone-200 w-full">
          <p className="text-xs sm:text-sm text-slate-500">
            Already have an account? 
            <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium ml-1 transition-colors duration-200">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}