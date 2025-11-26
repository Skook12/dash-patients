import { useUpdateVisitDate } from "@/http/patients/patients-update-service";
import { Button } from "./ui/button";
import { CalendarClock } from "lucide-react";
import { toast } from "sonner";
import { showErrorToast, showLoadingToast, showSuccessToast } from "./ui/toast";
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
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Calendar } from "./ui/calendar";
import { useState } from "react";
import { DateTimePicker } from "./date-picker";

interface UpdateVisitButtonProps {
  patientId: number;
}

export function UpdateVisitButton({ patientId }: UpdateVisitButtonProps) {
  const { mutate: updateVisit } = useUpdateVisitDate();
  const [date, setDate] = useState<Date | undefined>();

  async function handleSubmit() {
    const loadingToastId = showLoadingToast("Atualizando...");
    updateVisit(patientId, {
      onSuccess: () => {
        toast.dismiss(loadingToastId);
        showSuccessToast("Visita atualizada com sucesso!");
      },
      onError: (error: any) => {
        toast.dismiss(loadingToastId);
        showErrorToast(error?.message || "Ocorreu um erro. Tente novamente");
      },
    });
  }

  return (
    <Dialog>
      <form onSubmit={handleSubmit}>
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
          <div className="grid gap-4">
            <div className="flex item-center">
              <DateTimePicker />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
