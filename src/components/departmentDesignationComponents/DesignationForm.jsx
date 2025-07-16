import { useFormSubmit } from "@/hooks/useFormSubmit";
import { designationSchema, updateDesignationSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck } from "lucide-react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import Spinner from "../ui/Spinner";
import { FormInput } from "../formComponents/FormInput";
import { FormSelect } from "../formComponents/FormSelect";
import { level } from "@/lib/enumUtils";
import { useFetchAndResetForm } from "@/hooks/useFetchAndResetForm";
import { useDesignationModalStore } from "@/store/useDesignationModalStore";

const DesignationForm = ({ refetch }) => {
  const { editId, closeModal,departmentName } = useDesignationModalStore();

  const form = useForm({
    resolver: zodResolver(editId ? updateDesignationSchema : designationSchema),
    mode: "onChange",
    defaultValues: {
      designationName: "",
      designationCode: "",
      description: "",
      level: "Intern",
      departmentName:departmentName ||"",
    },
  });

  const { submitForm, loading } = useFormSubmit();

  useFetchAndResetForm({
    id: editId,
    endpoint: "/designation",
    form,
    mapResponse: (res) => ({
      designationName: res?.designationName ?? res?.name ?? "",
      designationCode: res?.designationCode ?? res?.code ?? "",
      description: res?.description ?? "",
      level: res?.level ?? "Intern",
      departmentName: res?.department?.name ?? "",
    }),
    enabled: !!editId,
  });

  const onSubmit = (data) => {
    submitForm({
      data:data,
      endpoint: editId ? `/designation/${editId}` : "/designation/",
      method: editId ? "patch" : "post",
      resetForm: !editId ? form.reset : undefined,
      onSuccess: () => {
        refetch?.();
        closeModal();
      },
    });
  };

  return (
    <div className="w-full">
      <div className="bg-white shadow-xl rounded-xl border border-gray-200">
        <div className="p-4 sm:p-6">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-lg font-semibold text-slate-700">
                      {editId ? "Update Designation" : "Add Designation"}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  <FormInput
                    name="designationName"
                    label="Designation Name"
                    placeholder="Enter designation name"
                    required
                  />
                  <FormInput
                    name="designationCode"
                    label="Designation Code"
                    placeholder="Enter designation code"
                    required
                  />
                  <FormSelect
                    name="level"
                    label="Level"
                    placeholder="Select Level"
                    options={level}
                    required
                  />
                  <FormInput
                    name="description"
                    label="Description"
                    placeholder="Enter description (optional)"
                    textarea
                    rows={2}
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-gray-300 text-slate-600 hover:bg-slate-100"
                    onClick={closeModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium bg-green-600 hover:bg-green-700 text-white"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Spinner
                          size="16px"
                          thickness="border-2"
                          color="border-white"
                        />
                        {editId ? "Updating..." : "Submitting..."}
                      </div>
                    ) : editId ? (
                      "Update Designation"
                    ) : (
                      "Add Designation"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default DesignationForm;
