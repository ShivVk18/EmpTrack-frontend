import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

export const FormPercentageInput = ({ name, label }) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label} (%)</FormLabel>
          <FormControl>
            <Input
              type="number"
              min={0}
              max={100}
              step="0.01"
              placeholder={`Enter ${label} %`}
              value={field.value ?? ""}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          </FormControl>
          <FormDescription>Enter value between 0 to 100</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
