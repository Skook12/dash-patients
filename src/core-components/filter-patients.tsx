import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const filterSchema = z.object({
  name: z.string().optional(),
  cpf: z.string().optional(),
  status: z.enum(["all", "pending", "in_day"]).optional(),
  last_verified_date: z.string().optional(),
  verify_frequency_in_days: z.string().optional(),
});

type FilterValues = z.infer<typeof filterSchema>;

interface PatientFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
}

export function PatientFilters({ onFilterChange }: PatientFiltersProps) {
  const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      name: "",
      cpf: "",
      status: "all",
      last_verified_date: "",
      verify_frequency_in_days: "",
    },
    mode: "onChange",
  });

  const { watch, control } = form;

  useEffect(() => {
    const subscription = watch((value) => {
      const filters = {
        ...value,
        verify_frequency_in_days: value.verify_frequency_in_days
          ? String(value.verify_frequency_in_days)
          : "",
      } as FilterValues;

      onFilterChange(filters);
    });

    return () => subscription.unsubscribe();
  }, [watch, onFilterChange]);

  return (
    <Form {...form}>
      <FormLabel className="text-xl font-semibold"> Filtro</FormLabel>
      <div className="flex flex-wrap gap-4 p-4 border rounded-lg bg-gray-50/10 mb-6">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full sm:w-40">
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Buscar por nome..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="cpf"
          render={({ field }) => (
            <FormItem className="w-full sm:w-40">
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input placeholder="Buscar por CPF..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Filtro por Frequência */}
        <FormField
          control={control}
          name="verify_frequency_in_days"
          render={({ field }) => (
            <FormItem className="w-full sm:w-40">
              <FormLabel>Frequência (dias)</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 30" type="number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Filtro por Status */}
        <FormField
          control={control}
          name="status"
          render={({ field }) => (
            <FormItem className="w-full sm:w-40">
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="in_day">Em dia</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
}
