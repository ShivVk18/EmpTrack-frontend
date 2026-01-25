import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { X, CalendarDays } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "../ui/form";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { FormInput } from "../formComponents/FormInput";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { useleaveApplication } from "@/store/useLeaveApplicationStore";
import { leaveApplicationSchema } from "@/lib/zodSchema";


function LeaveApplicationForm() {
  const [isHalfDay, setIsHalfDay] = useState(false);
  const { submitForm } = useFormSubmit();
  const { onClose, editId } = useleaveApplication();

  const form = useForm({
    resolver: zodResolver(leaveApplicationSchema),
    mode: "onChange",
    defaultValues: {
      leavePolicyId: "",
      fromDate: "",
      toDate: "",
      reason: "",
      isHalfDay: false,
      session: null,
    },
  });

  const handleClose = () => {
    form.reset();
    onClose?.();
  };

  const onSubmit = (data) => {
    submitForm({
      data,
      endpoint: editId
        ? `/leaveApplication/${editId}`
        : "/leaveApplication/",
      method: editId ? "patch" : "post",
      resetForm: form.reset,
      onSuccess: () => {
        const store = useleaveApplication.getState();
        store.setShouldRefetchAfterAdd(true);
        onClose?.();
      },
    });
  };

  return (
    <div className="w-full px-4 sm:px-6">
      <div className="bg-white shadow-xl rounded-2xl border border-slate-200 p-5 sm:p-6 md:p-8 max-w-screen-md mx-auto space-y-6 relative">
        {onClose && (
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <CalendarDays className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-800">
            {editId ? "Edit Leave Application" : "Apply for Leave"}
          </h3>
        </div>

        {/* Form */}
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                name="leavePolicyId"
                label="Leave Policy ID"
                placeholder="Enter Leave Policy ID"
                required
              />
              <FormInput
                name="reason"
                label="Reason"
                placeholder="Enter reason for leave"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                name="fromDate"
                type="date"
                label="From Date"
                required
              />
              <FormInput
                name="toDate"
                type="date"
                label="To Date"
                required
              />
            </div>

            {/* Half-Day Switch */}
            <FormField
              control={form.control}
              name="isHalfDay"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Half Day</FormLabel>
                    <FormDescription>
                      Select if this leave is for half a day
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(value) => {
                        field.onChange(value);
                        setIsHalfDay(value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Session if half-day */}
            {isHalfDay && (
              <FormField
                control={form.control}
                name="session"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session</FormLabel>
                    <select
                      {...field}
                      className="border rounded-md px-3 py-2 w-full"
                    >
                      <option value="">Select session</option>
                      <option value="MORNING">Morning</option>
                      <option value="AFTERNOON">Afternoon</option>
                    </select>
                  </FormItem>
                )}
              />
            )}

            <div className="flex flex-col sm:flex-row justify-end gap-2">
              {onClose && (
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-300 text-slate-600 hover:bg-slate-100 w-full sm:w-auto"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                disabled={!form.formState.isDirty}
                variant="success"
              >
                {editId ? "Update Application" : "Submit Application"}
              </Button>
            </div>

            {form.formState.errors?.root?.message && (
              <p className="text-sm text-red-500">
                {form.formState.errors.root.message}
              </p>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default LeaveApplicationForm;
