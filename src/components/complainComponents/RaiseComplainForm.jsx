import React from "react";
import {  FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquareWarning, X } from "lucide-react";
import { FormInput } from "../formComponents/FormInput";
import { Button } from "../ui/button";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { complaintSchema } from "@/lib/zodSchema";
import { useComplaintsStore } from "@/store/useComplaintsStore";
import { FormProvider, useForm } from "react-hook-form";

function RaiseComplaintForm() {
  const { submitForm } = useFormSubmit();
  const { onClose } = useComplaintsStore();

  const form = useForm({
    resolver: zodResolver(complaintSchema),
    mode: "onChange",
    defaultValues: {
      subject: "",
      description: "",
    },
  });

  const handleClose = () => {
    form.reset();
    onClose?.();
  };

  const onSubmit = (data) => {
    submitForm({
      data,
      endpoint: "/complaints/",
      method: "post",
      resetForm: form.reset,
      onSuccess: () => {
        const store = useComplaintsStore.getState();
        store.setShouldRefetchAfterAdd(true);
        handleClose();
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
          <MessageSquareWarning className="w-5 h-5 text-red-600" />
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-800">
            Raise Complaint
          </h3>
        </div>

        {/* Form */}
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormInput
              name="subject"
              label="Subject"
              placeholder="Enter the complaint subject"
              required
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="Describe your complaint in detail..."
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">i</span>
                </div>
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Important Information:</p>
                  <ul className="space-y-1 text-blue-700">
                    <li>• Your complaint will be reviewed by the appropriate department</li>
                    <li>• You will receive updates on the status of your complaint</li>
                    <li>• Please provide as much detail as possible for faster resolution</li>
                  </ul>
                </div>
              </div>
            </div>

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
                disabled={!form.formState.isDirty || form.formState.isSubmitting}
                className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
              >
                {form.formState.isSubmitting ? "Submitting..." : "Submit Complaint"}
              </Button>
            </div>

            {form.formState.errors?.root?.message && (
              <p className="text-sm text-red-500 text-center">
                {form.formState.errors.root.message}
              </p>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default RaiseComplaintForm;
