import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useFormFlowStore } from "@/store/useFormFlowStore";
import { useLocationOptions } from "@/hooks/useLocationOptions";
import { useDepartmentOptions } from "@/hooks/useDepartmentOptions";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { addEmployeeSchema } from "@/lib/zodSchema";
import { countryCodes } from "../../../constants/countryCodes";
import { employeeTypes, genderOptions, roles } from "@/lib/enumUtils";


import { AlertCircle, Upload, X, User, Briefcase, MapPin, CreditCard } from "lucide-react";
import { FormInput } from "../formComponents/FormInput";
import { FormSelect } from "../formComponents/FormSelect";
import Spinner from "../ui/Spinner";

const AddEmployeeForm = () => {
  const [step, setStep] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);

  const { countries, states, cities } = useFormFlowStore();
  const { getCountries, getStates, getCities } = useLocationOptions();
  const { departments, designations, fetchDepartments, fetchDesignations } =
    useDepartmentOptions();
  const { submitForm, loading } = useFormSubmit();

  const form = useForm({
    resolver: zodResolver(addEmployeeSchema),
    mode: "onChange",
    defaultValues: {
      employeeCode: "",
      employeeName: "",
      email: "",
      password: "",
      countryCode: "",
      mobileNo: "",
      salary: "",
      gender: "",
      dob: "",
      address1: "",
      address2: "",
      type: "",
      role: "EMPLOYEE",
      accountNo: "",
      pfAccountNo: "",
      bankCode: "",
      countryName: "",
      stateName: "",
      cityName: "",
      designationName: "",
      departmentName: "",
      profilePic: undefined,
    },
  });

  const formErrors = form.formState.errors;
  
  const onSubmit = (data) => {
    submitForm({
      data,
      endpoint: "/auth/employee/add",
      isMultipart: true,
      resetForm: form.reset,
      onSuccess: () => {
        setPreviewImage(null);
        setStep(1);
      },
    });
  };

  useEffect(() => {
    getCountries();
    fetchDepartments();
  }, []);

  const stepTitles = ["Personal Info", "Work Details", "Location & Banking"];
  const stepIcons = [User, Briefcase, MapPin];

  
  const getCurrentStepFields = () => {
    const step1Fields = ["employeeCode", "employeeName", "email", "password", "countryCode", "mobileNo", "gender", "dob"];
    const step2Fields = ["salary", "type", "role", "departmentName", "designationName"];
    const step3Fields = ["countryName", "stateName", "cityName", "accountNo", "bankCode", "pfAccountNo"];
    
    return step === 1 ? step1Fields : step === 2 ? step2Fields : step3Fields;
  };

  const currentStepErrors = getCurrentStepFields().filter(field => formErrors[field]);

  const getStepErrors = (stepNumber) => {
    const stepFields = (() => {
      if (stepNumber === 1) return ["employeeCode", "employeeName", "email", "password", "countryCode", "mobileNo", "gender", "dob"];
      if (stepNumber === 2) return ["salary", "type", "role", "departmentName", "designationName"];
      if (stepNumber === 3) return ["countryName", "stateName", "cityName", "accountNo", "bankCode", "pfAccountNo"];
      return [];
    })();
    return stepFields.some(field => formErrors[field]);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
      form.setValue("profilePic", file);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    form.setValue("profilePic", undefined);
  };

  return (
    <div className="w-full">
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        {/* Mobile-First Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-2 mb-2">
                {React.createElement(stepIcons[step - 1], { 
                  className: "w-5 h-5 text-white" 
                })}
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {stepTitles[step - 1]}
                </h2>
              </div>
              <p className="text-indigo-100 text-sm">
                Step {step} of {stepTitles.length}
              </p>
            </div>
            
            {/* Step Indicators */}
            <div className="flex justify-center sm:justify-end">
              <div className="flex space-x-2">
                {stepTitles.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      step >= idx + 1
                        ? getStepErrors(idx + 1)
                          ? "bg-red-300"
                          : "bg-white"
                        : "bg-indigo-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-4 sm:px-6 pt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ease-in-out ${
                currentStepErrors.length > 0 ? "bg-red-500" : "bg-indigo-600"
              }`}
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="p-4 sm:p-6">
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              encType="multipart/form-data"
            >
              {/* STEP 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-indigo-600" />
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                        Personal Information
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2">
                      Enter the employee's basic personal details
                    </p>
                  </div>

                  {/* Profile Picture Upload - Mobile Optimized */}
                  <div className="flex flex-col items-center space-y-4 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Profile Picture</span>
                    </div>
                    {previewImage ? (
                      <div className="relative">
                        <img
                          src={previewImage}
                          alt="Profile preview"
                          className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <X size={14} className="sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                        <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                      </div>
                    )}
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <span className="bg-indigo-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md hover:bg-indigo-700 transition-colors text-xs sm:text-sm font-medium">
                        Upload Photo
                      </span>
                    </label>
                  </div>

                  {/* Responsive Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    <FormInput
                      name="employeeCode"
                      label="Employee Code"
                      placeholder="Enter employee code"
                      required
                    />
                    <FormInput
                      name="employeeName"
                      label="Employee Name"
                      placeholder="Enter full name"
                      required
                    />
                    <FormInput
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="Enter email address"
                      required
                    />
                    <FormInput
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="Enter password"
                      required
                    />
                    
                    {/* Mobile Number with Country Code */}
                    <div className="sm:col-span-2 xl:col-span-1">
                      <div className="flex gap-2">
                        <div className="w-1/3">
                          <FormSelect
                            name="countryCode"
                            label="Code"
                            placeholder="Select"
                            options={countryCodes}
                            required
                          />
                        </div>
                        <div className="w-2/3">
                          <FormInput
                            name="mobileNo"
                            label="Mobile Number"
                            placeholder="Enter mobile number"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <FormSelect
                      name="gender"
                      label="Gender"
                      placeholder="Select gender"
                      options={genderOptions}
                      required
                    />
                    <FormInput
                      name="dob"
                      label="Date of Birth"
                      type="date"
                      required
                    />
                    
                    {/* Address Fields - Full Width on Mobile */}
                    <div className="sm:col-span-2 xl:col-span-3">
                      <FormInput
                        name="address1"
                        label="Address Line 1"
                        placeholder="Enter primary address"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2 xl:col-span-3">
                      <FormInput
                        name="address2"
                        label="Address Line 2"
                        placeholder="Enter secondary address (optional)"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Work Details */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="w-5 h-5 text-indigo-600" />
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                        Work Information
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2">
                      Configure employee's work-related details
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    <FormInput
                      name="salary"
                      label="Salary"
                      type="number"
                      placeholder="Enter salary amount"
                      required
                    />
                    <FormSelect
                      name="type"
                      label="Employee Type"
                      placeholder="Select type"
                      options={employeeTypes}
                      required
                    />
                    <FormSelect
                      name="role"
                      label="Role"
                      placeholder="Select role"
                      options={roles}
                      required
                    />
                    <FormSelect
                      name="departmentName"
                      label="Department"
                      placeholder="Select department"
                      options={departments?.map((dept) => ({
                        label: dept.name,
                        value: dept.name,
                      }))}
                      required
                      onValueChange={(value) => {
                        form.setValue("departmentName", value);
                        fetchDesignations(value);
                      }}
                    />
                    <FormSelect
                      name="designationName"
                      label="Designation"
                      placeholder="Select designation"
                      options={designations?.map((designation) => ({
                        label: designation.name,
                        value: designation.name,
                      }))}
                      required
                      disabled={!form.watch("departmentName")}
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Location & Bank Details */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-indigo-600" />
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                        Location & Banking
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2">
                      Complete location and banking information
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Location Section */}
                    <div>
                      <div className="flex items-center space-x-2 mb-4">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <h4 className="text-sm sm:text-base font-medium text-gray-800">
                          Location Details
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                        <FormSelect
                          name="countryName"
                          label="Country"
                          placeholder="Select country"
                          options={countries?.map((country) => ({
                            label: country.name,
                            value: country.name,
                          }))}
                          required
                          onValueChange={(value) => {
                            form.setValue("countryName", value);
                            form.setValue("stateName", "");
                            form.setValue("cityName", "");
                            getStates(value);
                          }}
                        />
                        <FormSelect
                          name="stateName"
                          label="State"
                          placeholder="Select state"
                          options={states?.map((state) => ({
                            label: state.name,
                            value: state.name,
                          }))}
                          required
                          disabled={!form.watch("countryName")}
                          onValueChange={(value) => {
                            form.setValue("stateName", value);
                            form.setValue("cityName", "");
                            getCities(form.watch("countryName"), value);
                          }}
                        />
                        <FormSelect
                          name="cityName"
                          label="City"
                          placeholder="Select city"
                          options={cities?.map((city) => ({
                            label: city.name,
                            value: city.name,
                          }))}
                          required
                          disabled={!form.watch("stateName")}
                        />
                      </div>
                    </div>

                    {/* Banking Section */}
                    <div>
                      <div className="flex items-center space-x-2 mb-4">
                        <CreditCard className="w-4 h-4 text-green-600" />
                        <h4 className="text-sm sm:text-base font-medium text-gray-800">
                          Banking Details
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                        <FormInput
                          name="accountNo"
                          label="Account Number"
                          placeholder="Enter account number"
                          required
                        />
                        <FormInput
                          name="bankCode"
                          label="Bank Code"
                          placeholder="Enter bank code"
                          required
                        />
                        <FormInput
                          name="pfAccountNo"
                          label="PF Account Number"
                          placeholder="Enter PF account number"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile-First Navigation */}
              <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center pt-6 border-t border-gray-200">
                <div className="order-2 sm:order-1">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(step - 1)}
                      className="w-full sm:w-auto px-4 py-2 text-sm font-medium"
                    >
                      ← Previous
                    </Button>
                  )}
                </div>

                <div className="order-1 sm:order-2 flex flex-col sm:flex-row items-center gap-3">
                  <span className="text-xs text-gray-500 sm:block">
                    {step} of {stepTitles.length}
                  </span>
                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={() => {
                        form.trigger(getCurrentStepFields()).then((isValid) => {
                          if (isValid) setStep(step + 1);
                        });
                      }}
                      className={`w-full sm:w-auto px-4 py-2 text-sm font-medium transition-colors ${
                        currentStepErrors.length > 0
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-indigo-600 hover:bg-indigo-700"
                      }`}
                    >
                      {currentStepErrors.length > 0
                        ? "Fix Errors & Continue →"
                        : "Next Step →"}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-4 py-2 text-sm font-medium transition-colors bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      
  {loading ? (
    <div className="flex items-center gap-2">
      <Spinner size="16px" thickness="border-2" color="border-white" />
      Submitting...
    </div>
  ) : (
    "Add Employee"
  )}
</Button>
                  )}
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeForm;