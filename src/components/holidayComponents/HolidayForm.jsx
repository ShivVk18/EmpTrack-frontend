import { createHolidaySchema } from "@/lib/zodSchema";
import { useHolidayStore } from "@/store/useHolidayStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, X } from "lucide-react"; // Add X icon import
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "../formComponents/FormInput";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { useFormSubmit } from "@/hooks/useFormSubmit";

const HolidayForm = () => {
  const { submitForm } = useFormSubmit();
  const onClose = useHolidayStore((state) => state.onClose);
  
  const form = useForm({
    resolver: zodResolver(createHolidaySchema),
    mode: "onChange",
    defaultValues: {
      holidayName: "",
      date: "",
      isCompanySpecific: true,
    },
  });

  const onSubmit = (data) => {
    submitForm({
      data: data,
      endpoint: "/holiday/",
      method: "post",
      resetForm: form.reset,
      onSuccess:() => {
             const store = useHolidayStore.getState();
  store.setShouldRefetchAfterAdd(true);   
    onClose()
      }
  });

  };

  return (
    <div className="w-full px-4 sm:px-6">
      <div className="bg-white shadow-xl rounded-2xl border border-slate-200 p-5 sm:p-6 md:p-8 max-w-screen-md mx-auto space-y-6 relative">
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
          <CalendarDays className="w-5 h-5 text-green-600" />
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-800">
            Add Holiday
          </h3>
        </div>

        {/* Form */}
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                name="holidayName"
                label="Holiday Name"
                placeholder="Enter holiday name"
                required
              />
              <FormInput
                name="date"
                type="date"
                label="Date"
                placeholder="Select holiday date"
                required
              />
            </div>

            <FormField
              control={form.control}
              name="isCompanySpecific"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Is Company Specific</FormLabel>
                    <FormDescription>
                      Select whether the holiday is company specific or not
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="isCompanySpecific"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

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
                disabled={!form.formState.isDirty}
                variant="success"
              >
                Submit Holiday
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
};

export default HolidayForm;
