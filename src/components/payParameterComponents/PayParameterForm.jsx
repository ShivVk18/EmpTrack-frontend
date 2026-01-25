"use client"

import { createPayParameterSchema } from "@/lib/zodSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { FormSelect } from "../formComponents/FormSelect"
import { FormInput } from "../formComponents/FormInput"
import { Button } from "../ui/button"
import { Briefcase, ListChecks, Settings2, X } from "lucide-react"
import { employeeTypes } from "@/lib/enumUtils"
import { FormPercentageInput } from "../formComponents/FormPercentageInput"
import { useFormSubmit } from "@/hooks/useFormSubmit"
import { useFetchAndResetForm } from "@/hooks/useFetchAndResetForm"
import { usePayParameterStore } from "@/store/usePayParameterStore"
import Spinner from "../ui/Spinner"

const stepTitles = ["Basic Info", "Allowances", "Tax & Leave"]
const stepIcons = [Briefcase, ListChecks, Settings2]

const PayParameterForm = () => {
  const { editId, onClose } = usePayParameterStore()
  const [step, setStep] = useState(1)
  const [isFormLoading, setIsFormLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(createPayParameterSchema),
    mode: "onChange",
    defaultValues: {
      employeeType: "",
      hra: 0,
      da: 0,
      ta: 0,
      spall: 0,
      medicalAllRate: 0,
      epfRate: 0,
      esiRate: 0,
      tdsRate: 0,
      professionalTaxRate: 0,
      medicalAllFixed: 0,
      epfSalaryLimit: 0,
      esiSalaryLimit: 0,
      paidLeavePerMonth: 0,
      unpaidLeavePenaltyPerDay: 0,
    },
  })

  const formErrors = form.formState.errors
  const { submitForm } = useFormSubmit()

  
  useEffect(() => {
    if (editId) {
      setIsFormLoading(true)
      setStep(1)

      const timer = setTimeout(() => {
        setIsFormLoading(false)
      }, 800)

      return () => clearTimeout(timer)
    } else {
      setStep(1)
      setIsFormLoading(false)
      form.reset()
    }
  }, [editId, form])

  useFetchAndResetForm({
    id: editId,
    endpoint: "/payroll/parameters",
    form,
    enabled: !!editId,
    mapResponse: (res) => ({
      employeeType: res.employeeType,
      hra: res.hra,
      da: res.da,
      ta: res.ta,
      spall: res.spall,
      medicalAllRate: res.medicalAllRate,
      epfRate: res.epfRate,
      esiRate: res.esiRate,
      tdsRate: res.tdsRate,
      professionalTaxRate: res.professionalTaxRate,
      medicalAllFixed: res.medicalAllFixed,
      epfSalaryLimit: res.epfSalaryLimit,
      esiSalaryLimit: res.esiSalaryLimit,
      paidLeavePerMonth: res.paidLeavePerMonth,
      unpaidLeavePenaltyPerDay: res.unpaidLeavePenaltyPerDay,
    }),
  })

  const handleClose = () => {
    setStep(1)
    form.reset()
    onClose?.()
  }

  const onSubmit = (data) => {
    submitForm({
      data,
      endpoint: editId ? `/payroll/parameters/${editId}` : "/payroll/parameters/add",
      method: editId ? "patch" : "post",
      resetForm: !editId ? form.reset : undefined,
      onSuccess: () => {
        const store = usePayParameterStore.getState()
        store.setShouldRefetchAfterAdd(true)
        handleClose()
      },
    })
  }

  const getStepFields = (stepNum) => {
    const steps = {
      1: ["employeeType"],
      2: [
        "hra",
        "da",
        "ta",
        "spall",
        "medicalAllRate",
        "medicalAllFixed",
        "epfRate",
        "epfSalaryLimit",
        "esiRate",
        "esiSalaryLimit",
      ],
      3: ["tdsRate", "professionalTaxRate", "paidLeavePerMonth", "unpaidLeavePenaltyPerDay"],
    }
    return steps[stepNum] || []
  }

  const currentStepErrors = getStepFields(step).filter((field) => formErrors[field])
  const hasErrors = (stepNum) => getStepFields(stepNum).some((field) => formErrors[field])
  const CurrentStepIcon = stepIcons[step - 1]

  if (isFormLoading && editId) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white shadow-xl rounded-2xl border border-slate-200 p-5 sm:p-6 md:p-8 space-y-6 relative">
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <Spinner size="48px" />
              <p className="text-slate-500 text-sm">Loading form data...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      <div className="bg-white shadow-xl rounded-2xl border border-slate-200 p-5 sm:p-6 md:p-8 space-y-6 relative">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <CurrentStepIcon className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-800">
                {editId ? "Edit Pay Parameters" : "Create Pay Parameters"}
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Step {step} of {stepTitles.length}: {stepTitles[step - 1]}
              </p>
            </div>
          </div>

          {/* Step indicators */}
          <div className="flex space-x-2">
            {stepTitles.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full transition-colors ${
                  step >= idx + 1 ? (hasErrors(idx + 1) ? "bg-red-500" : "bg-blue-600") : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              currentStepErrors.length > 0 ? "bg-red-500" : "bg-blue-600"
            }`}
            style={{ width: `${(step / stepTitles.length) * 100}%` }}
          />
        </div>

        {/* Form */}
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1 - Basic Info */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <FormSelect
                    name="employeeType"
                    label="Employee Type"
                    placeholder="Select employee type"
                    options={employeeTypes}
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2 - Allowances */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium text-slate-800 mb-4">Percentage-based Allowances</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {["hra", "da", "ta", "spall", "medicalAllRate", "epfRate", "esiRate"].map((field) => (
                      <FormPercentageInput key={field} name={field} label={`${field.toUpperCase()} (%)`} />
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium text-slate-800 mb-4">Fixed Amount Limits</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <FormInput
                      name="medicalAllFixed"
                      label="Medical Allowance Fixed"
                      type="number"
                      placeholder="Enter fixed amount"
                    />
                    <FormInput
                      name="epfSalaryLimit"
                      label="EPF Salary Limit"
                      type="number"
                      placeholder="Enter salary limit"
                    />
                    <FormInput
                      name="esiSalaryLimit"
                      label="ESI Salary Limit"
                      type="number"
                      placeholder="Enter salary limit"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 - Tax & Leave */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium text-slate-800 mb-4">Tax Rates</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <FormPercentageInput name="tdsRate" label="TDS Rate (%)" />
                    <FormPercentageInput name="professionalTaxRate" label="Professional Tax Rate (%)" />
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium text-slate-800 mb-4">Leave Settings</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <FormInput
                      name="paidLeavePerMonth"
                      label="Paid Leave Per Month"
                      type="number"
                      placeholder="Enter days"   
                    />
                    <FormInput
                      name="unpaidLeavePenaltyPerDay"
                      label="Unpaid Leave Penalty Per Day"
                      type="number"
                      placeholder="Enter penalty amount"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-200">
              <div className="flex gap-2">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="border-gray-300 text-slate-600 hover:bg-slate-100"
                  >
                    ← Previous
                  </Button>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-300 text-slate-600 hover:bg-slate-100 bg-transparent"
                  onClick={handleClose}
                >
                  Cancel
                </Button>

                {step < stepTitles.length ? (
                  <Button
                    type="button"
                    onClick={() => {
                      form.trigger(getStepFields(step)).then((valid) => {
                        if (valid) setStep(step + 1)
                      })
                    }}
                    className={`px-6 py-2 ${
                      currentStepErrors.length ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                    } text-white`}
                  >
                    {currentStepErrors.length ? "Fix Errors & Continue →" : "Next Step →"}
                  </Button>
                ) : (
                  <Button type="submit" disabled={!form.formState.isDirty} variant="success">
                    {editId ? "Update Parameters" : "Create Parameters"}
                  </Button>
                )}
              </div>
            </div>

            {form.formState.errors?.root?.message && (
              <p className="text-sm text-red-500 text-center">{form.formState.errors.root.message}</p>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default PayParameterForm