import { useUpdateVisitDate } from "@/http/patients/patients-update-service";
import { Button } from "./ui/button";
import { CalendarClock } from "lucide-react";
import { toast } from "sonner";
import { showErrorToast, showLoadingToast, showSuccessToast } from "./ui/toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { DateTimePicker } from "./date-picker";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useState } from "react";

interface UpdateVisitButtonProps {
  patientId: number;
}

const updateVisitSchema = z.object({
  visitDate: z.date().refine((date) => date !== null && date !== undefined, {
    message: "Por favor, selecione uma data.",
  }),
});

type UpdateVisitSchema = z.infer<typeof updateVisitSchema>;

export function UpdateVisitDialog({ patientId }: UpdateVisitButtonProps) {
  const { mutate: updateVisit } = useUpdateVisitDate();
  const [open, setOpen] = useState(false);
  const form = useForm<UpdateVisitSchema>({
    resolver: zodResolver(updateVisitSchema),
  });

  async function handleUpdateVisit(data: UpdateVisitSchema) {
    const formattedDate = format(data.visitDate, "yyyy/MM/dd HH:mm:ss");

    const loadingToastId = showLoadingToast("Atualizando...");
    updateVisit(
      { id: patientId, last_verified_date: formattedDate },
      {
        onSuccess: () => {
          toast.dismiss(loadingToastId);
          showSuccessToast("Visita atualizada com sucesso!");
          form.reset();
          setOpen(false);
        },
        onError: (error: any) => {
          toast.dismiss(loadingToastId);
          showErrorToast(error?.message || "Ocorreu um erro. Tente novamente");
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          title="Atualizar data da visita"
        >
          <CalendarClock className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Alteração da data de visita</DialogTitle>
          <DialogDescription>
            Altere a data da ultima visita ao paciente
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateVisit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="visitDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DateTimePicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
