import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { X, Clock3 } from "lucide-react"
import { Switch } from "../ui/switch"
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "../ui/form"
import { FormInput } from "../formComponents/FormInput"
import { Button } from "../ui/button"
import { useFormSubmit } from "@/hooks/useFormSubmit"
import { attendancePlanSchema } from "@/lib/zodSchema"
import { useAttendancePlanStore } from "@/store/useAttendancePlanStore"
import { useFetchAndResetForm } from "@/hooks/useFetchAndResetForm"
import Spinner from "../ui/Spinner"

function AttendancePlanForm() {
  const { submitForm } = useFormSubmit()
  const { onClose, editId } = useAttendancePlanStore()

  const form = useForm({
    resolver: zodResolver(attendancePlanSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      workingHours: 8,
      shiftStartTime: "",
      allowedLateMins: 0,
      gracePeriodMins: 0,
      allowEarlyLeave: false,
      requirePunchOut: true,
      isDefault: false,
    },
  })

  // Fetch data for editing
  const { isLoading } = useFetchAndResetForm({
    id: editId,
    endpoint: "/attendancePlan",
    form,
    enabled: !!editId,
    mapResponse: (res) => ({
      name: res.name,
      description: res.description || "",
      workingHours: Number(res.workingHours),
      shiftStartTime: res.shiftStartTime,
      allowedLateMins: Number(res.allowedLateMins) || 0,
      gracePeriodMins: Number(res.gracePeriodMins) || 0,
      allowEarlyLeave: res.allowEarlyLeave || false,
      requirePunchOut: res.requirePunchOut !== false,
      isDefault: res.isDefault || false,
    }),
  })

  const onSubmit = (data) => {
    console.log("Form submitted with data:", data)
    console.log("Form errors:", form.formState.errors)
    console.log("Form valid:", form.formState.isValid)

    // Transform data to ensure numbers are properly converted
    const transformedData = {
      ...data,
      workingHours: Number(data.workingHours),
      allowedLateMins: Number(data.allowedLateMins),
      gracePeriodMins: Number(data.gracePeriodMins),
    }

    console.log("Transformed data:", transformedData)

    submitForm({
      data: transformedData,
      endpoint: editId ? `/attendancePlan/${editId}` : "/attendancePlan",
      method: editId ? "patch" : "post",
      resetForm: !editId ? form.reset : undefined,
      onSuccess: () => {
        const store = useAttendancePlanStore.getState()
        store.setShouldRefetchAfterAdd(true)
        onClose?.()
      },
    })
  }

  if (isLoading && editId) {
    return (
      <div className="w-full px-4 sm:px-6">
        <div className="bg-white shadow-xl rounded-2xl border border-slate-200 p-5 sm:p-6 md:p-8 max-w-screen-lg mx-auto space-y-6 relative">
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <Spinner size="48px" />
              <p className="text-slate-500 text-sm">Loading attendance plan...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full px-4 sm:px-6">
      <div className="bg-white shadow-xl rounded-2xl border border-slate-200 p-5 sm:p-6 md:p-8 max-w-screen-lg mx-auto space-y-6 relative">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <Clock3 className="w-5 h-5 text-green-600" />
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-800">
            {editId ? "Edit Attendance Plan" : "Create Attendance Plan"}
          </h3>
        </div>

        {/* Debug Info - Remove in production */}
        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
          <p>Form Valid: {form.formState.isValid ? "Yes" : "No"}</p>
          <p>Form Dirty: {form.formState.isDirty ? "Yes" : "No"}</p>
          {Object.keys(form.formState.errors).length > 0 && (
            <p>Errors: {JSON.stringify(form.formState.errors, null, 2)}</p>
          )}
        </div>

        {/* Form */}
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-slate-800">Basic Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput name="name" label="Plan Name" placeholder="Enter attendance plan name" required />
                <FormInput
                  name="workingHours"
                  label="Working Hours"
                  placeholder="8"
                  type="number"
                  required
                  min="1"
                  max="24"
                />
              </div>
              <FormInput name="description" label="Description" placeholder="Optional description" />
            </div>

            {/* Time Settings */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-slate-800">Time Settings</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormInput name="shiftStartTime" label="Shift Start Time" type="time" required />
                <FormInput
                  name="allowedLateMins"
                  label="Allowed Late (Minutes)"
                  type="number"
                  placeholder="0"
                  min="0"
                />
                <FormInput
                  name="gracePeriodMins"
                  label="Grace Period (Minutes)"
                  type="number"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            {/* Policies */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-slate-800">Policies</h4>
              <div className="space-y-3">
                {[
                  {
                    name: "allowEarlyLeave",
                    label: "Allow Early Leave",
                    description: "Employees can leave early without penalty",
                  },
                  {
                    name: "requirePunchOut",
                    label: "Require Punch-Out",
                    description: "Punch-out is required to mark end of shift",
                  },
                  {
                    name: "isDefault",
                    label: "Default Plan",
                    description: "Automatically applies to new employees",
                  },
                ].map((policy) => (
                  <FormField
                    key={policy.name}
                    control={form.control}
                    name={policy.name}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>{policy.label}</FormLabel>
                          <FormDescription>{policy.description}</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} id={policy.name} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 border-t border-slate-200">
              {onClose && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="text-slate-600 border-gray-300 hover:bg-slate-100 w-full sm:w-auto bg-transparent"
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                variant="success"
                disabled={!form.formState.isValid || !form.formState.isDirty}
                className="w-full sm:w-auto"
              >
                {editId ? "Update Plan" : "Create Plan"}
              </Button>
            </div>

            {/* Error */}
            {form.formState.errors?.root?.message && (
              <p className="text-sm text-red-500 text-center">{form.formState.errors.root.message}</p>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default AttendancePlanForm
