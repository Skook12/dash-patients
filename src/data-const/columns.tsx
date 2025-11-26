import type { Patient } from "@/models/patients";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { UpdateVisitButton } from "@/components/update-visit-button";

export const columnsPatients: ColumnDef<Patient>[] = [
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const patient = row.original;

      return <UpdateVisitButton patientId={patient.id} />;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "cpf",
    header: "CPF",
  },
  {
    accessorKey: "last_verified_date",
    header: "Última visita",
  },
  {
    accessorKey: "verify_frequency_in_days",
    header: "Frequência da visita",
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const { last_verified_date, verify_frequency_in_days } = row.original;

      if (!last_verified_date || !verify_frequency_in_days) {
        return null;
      }

      const lastVerifiedDate = new Date(last_verified_date);
      const deadlineDate = new Date(lastVerifiedDate);
      deadlineDate.setDate(deadlineDate.getDate() + verify_frequency_in_days);

      const today = new Date();

      const isPending = today > deadlineDate;

      return isPending ? (
        <Badge variant="destructive" className="flex items-center gap-1.5">
          <AlertTriangle className="size-3.5" /> Pendente
        </Badge>
      ) : (
        <Badge className="flex items-center gap-1.5 bg-green-600 text-white hover:bg-green-600/80">
          <CheckCircle className="size-3.5" /> Em dia
        </Badge>
      );
    },
  },
];
