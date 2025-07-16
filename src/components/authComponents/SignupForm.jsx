import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../lib/zodSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
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
import { countryCodes } from "../../../constants/countryCodes";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { removeAccents } from "@/lib/normalUtils";

export default function SignupForm() {
  const [step, setStep] = useState(1);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);


  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(signupSchema), // ← disable this temporarily if needed
    defaultValues: {
      adminName: "",
      email: "",
      password: "",
      countryCode: "",
      mobile: "",
      companyName: "",
      industry: "",
      address: "",
      countryName: "",
      stateName: "",
      cityName: "",
    },
  });

  const onSubmit = async(data) => {
      try {
        const res = await axios.post('/api/v1/auth/admin/signup',data)
        if(res.status===201){
          toast.success("Company and admin created successfully")
          navigate('/login')
          
        }else{
          toast.error("Something went wrong")
        }
  
      } catch (error) {
        console.log(error.message)
         toast.error("Something went wrong")      
      }
  };

 const getCountries = async () => {
    try {
      const res = await axios.get(
        "https://countriesnow.space/api/v0.1/countries/positions"
      );
      const cleaned = res.data.data.map((c) => ({
      ...c,
      name: removeAccents(c.name),
    }));
    setCountries(cleaned);
    } catch (err) {
      console.error("Failed to fetch countries", err);
    }
  };

  const getStates = async (country) => {
    try {
      const res = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/states",
        { country }
      );
      const cleaned = (res.data.data.states || []).map((s) => ({
      ...s,
      name: removeAccents(s.name),
    }));
    setStates(cleaned);
    setCities([]);
    form.setValue("stateName", "");
    form.setValue("cityName", "");
    } catch (err) {
      console.error("Failed to fetch states", err);
    }
  };

  const getCities = async (country, state) => {
    try {
      const res = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        { country, state }
      );
       const cleaned = (res.data.data || []).map(removeAccents);
    setCities(cleaned);
    form.setValue("cityName", "");
    } catch (err) {
      console.error("Failed to fetch cities", err);
    }
  };


  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className="w-full relative">
      <div className="relative z-10 space-y-3 sm:space-y-6 w-full">
        {/* Steps Indicator */}
        <div className="flex items-center justify-center space-x-1 sm:space-x-3 mb-3 sm:mb-6 w-full">
          <div className="flex items-center space-x-1">
            <div className={`w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-semibold ${step >= 1 ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white" : "bg-stone-200 text-stone-500"}`}>
              1
            </div>
            <span className={`text-xs sm:text-sm font-medium hidden xs:inline ${step >= 1 ? "text-purple-600" : "text-stone-500"}`}>
              Personal
            </span>
          </div>
          <div className={`w-3 sm:w-5 h-0.5 ${step >= 2 ? "bg-gradient-to-r from-purple-600 to-indigo-600" : "bg-stone-200"}`}></div>
          <div className="flex items-center space-x-1">
            <div className={`w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-semibold ${step >= 2 ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white" : "bg-stone-200 text-stone-500"}`}>
              2
            </div>
            <span className={`text-xs sm:text-sm font-medium hidden xs:inline ${step >= 2 ? "text-indigo-600" : "text-stone-500"}`}>
              Company
            </span>
          </div>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-5 w-full">
            {step === 1 && (
              <div className="space-y-4">
                {/* Full Name */}
                <FormField name="adminName" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input placeholder="Enter full name" {...field} /></FormControl>
                  </FormItem>
                )} />

                {/* Mobile with Country Code */}
                <div className="space-y-1">
                  <FormLabel>Mobile Number</FormLabel>
                  <div className="flex gap-2">
                    <div className="w-32 sm:w-36">
                      <FormField name="countryCode" control={form.control} render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger><SelectValue placeholder="Code" /></SelectTrigger>
                          <SelectContent>
                            {countryCodes.map((item) => (
                              <SelectItem key={item.code} value={item.code}>
                                {item.code} ({item.dial_code})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )} />
                    </div>
                    <FormField name="mobile" control={form.control} render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl><Input placeholder="Mobile number" {...field} /></FormControl>
                      </FormItem>
                    )} />
                  </div>
                </div>

                {/* Email */}
                <FormField name="email" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input type="email" placeholder="you@company.com" {...field} /></FormControl>
                  </FormItem>
                )} />

                {/* Password */}
                <FormField name="password" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl><Input type="password" placeholder="•••••••" {...field} /></FormControl>
                  </FormItem>
                )} />

                <Button type="button" onClick={() => setStep(2)} className="w-full">
                  Continue to Company Details →
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                {/* Company Name & Industry */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField name="companyName" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl><Input placeholder="Company Name" {...field} /></FormControl>
                    </FormItem>
                  )} />
                  <FormField name="industry" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
                          <SelectContent>
                            {industryTypes.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )} />
                </div>

                {/* Address */}
                <FormField name="address" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Address</FormLabel>
                    <FormControl><Input placeholder="Company address" {...field} /></FormControl>
                  </FormItem>
                )} />

                {/* Country */}
                <FormField name="countryName" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={(val) => {
                        field.onChange(val);
                        getStates(val);
                      }}>
                        <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                        <SelectContent>
                          {countries.map((item) => (
                            <SelectItem key={item.name} value={item.name}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )} />

                {/* State & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField name="stateName" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={(val) => {
                          field.onChange(val);
                          getCities(form.getValues("countryName"), val);
                        }} disabled={!states.length}>
                          <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                          <SelectContent>
                            {states.map((item) => (
                              <SelectItem key={item.name} value={item.name}>{item.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )} />
                  <FormField name="cityName" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange} disabled={!cities.length}>
                          <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                          <SelectContent>
                            {cities.map((item) => (
                              <SelectItem key={item} value={item}>{item}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )} />
                </div>

                {/* Navigation */}
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>← Back</Button>
                  <Button type="submit" className="flex-1">Create Account</Button>
                </div>
              </div>
            )}
          </form>
        </Form>

        

        {/* Already Registered? */}
        <div className="text-center pt-4 border-t border-stone-200">
          <p className="text-sm text-stone-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-purple-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
