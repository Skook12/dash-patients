import { DataTable } from "@/components/data-table";
import Container from "../components/container";
import { columnsPatients } from "@/data-const/columns";

import { useAppContext } from "@/contexts/app-context";
import { useEffect } from "react";
import { useGetPatients } from "@/http/patients/patients-get-service";

export default function PagePatients() {
  const { data } = useGetPatients();
  const { setPageTitle } = useAppContext();

  useEffect(() => {
    setPageTitle("Pacientes");
  }, [setPageTitle]);

  return (
    <Container className="space-y-3">
      <DataTable columns={columnsPatients} data={data || []} />
    </Container>
  );
}
