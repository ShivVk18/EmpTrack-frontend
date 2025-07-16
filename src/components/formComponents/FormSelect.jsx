import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export const FormSelect = ({ name, label, options, onChange, disabled = false }) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            value={field.value}
            onValueChange={onChange || field.onChange}
            disabled={disabled}
          >
            <SelectTrigger className="h-11">
              <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem
                  key={opt.id || opt.value || opt.name || opt}
                  value={opt.value || opt.name || opt}
                >
                  {opt.label || opt.name || opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        
        </FormItem>
      )}
    />
  );
};