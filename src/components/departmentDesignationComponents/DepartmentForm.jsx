import { zodResolver } from "@hookform/resolvers/zod";
import { Building2 } from "lucide-react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import Spinner from "../ui/Spinner";
import { FormInput } from "../formComponents/FormInput";
import { useParams } from "react-router";
import { useFetchAndResetForm } from "@/hooks/useFetchAndResetForm";
import { departmentSchema, updateDepartmentSchema } from "@/lib/zodSchema";
import { useFormSubmit } from "@/hooks/useFormSubmit";

const DepartmentForm = ({ onClose, refetch, enabled = true }) => {
  const { id } = useParams();

  // Form setup
  const form = useForm({
    resolver: zodResolver(id ? updateDepartmentSchema : departmentSchema),
    mode: "onChange",
    defaultValues: {
      departmentName: "",
      departmentCode: "",
      description: "",
    },
  });

  const { submitForm, loading } = useFormSubmit();

  
  const { loading: formLoading } = useFetchAndResetForm({
    id,
    endpoint: "/department",
    form,
    mapResponse: (res) => ({
      departmentName: res?.departmentName ?? res?.name ?? "",
      departmentCode: res?.departmentCode ?? res?.code ?? "",
      description: res?.description ?? "",
    }),
    enabled,
  });

  const onSubmit = (data) => {
    submitForm({
      data,
      endpoint: id ? `/department/${id}` : "/department/",
      method: id ? "patch" : "post",
      resetForm: !id ? form.reset : undefined,
      onSuccess: () => {
        refetch?.();
        onClose?.();
      },
    });
  };

  return (
    <div className="w-full px-4 sm:px-6">
      <div className="bg-white shadow-xl rounded-2xl border border-slate-200 p-5 sm:p-6 md:p-8 max-w-screen-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <Building2 className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-800">
            {id ? "Update Department" : "Add Department"}
          </h3>
        </div>

        {/* Form */}
        {formLoading ? (
          <div className="text-center py-8">
            <Spinner size="24px" color="border-purple-500" />
            <p className="mt-2 text-sm text-slate-500">Loading department...</p>
          </div>
        ) : (
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Responsive Grid Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  name="departmentName"
                  label="Department Name"
                  placeholder="Enter department name"
                  required
                />
                <FormInput
                  name="departmentCode"
                  label="Department Code"
                  placeholder="Enter department code"
                  required
                />
                <div className="sm:col-span-2">
                  <FormInput
                    name="description"
                    label="Description"
                    placeholder="Write a short description"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-2">
                {onClose && (
                  <Button
                    type="button"
                    variant="outline"
                    className="border-gray-300 text-slate-600 hover:bg-slate-100 w-full sm:w-auto"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={loading || !form.formState.isDirty}
                  className="bg-purple-600 hover:bg-purple-700 text-white transition-colors w-full sm:w-auto"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Spinner size="16px" thickness="border-2" color="border-white" />
                      {id ? "Updating..." : "Submitting..."}
                    </div>
                  ) : id ? "Update Department" : "Add Department"}
                </Button>
              </div>

              {/* Root error message */}
              {form.formState.errors?.root?.message && (
                <p className="text-sm text-red-500">{form.formState.errors.root.message}</p>
              )}
            </form>
          </FormProvider>
        )}
      </div>
    </div>
  );
};

export default DepartmentForm;
