import { DataTable } from "@/components/data-table";
import Container from "../components/container";
import { columnsPatients } from "@/data-const/columns";
import { useAppContext } from "@/contexts/app-context";
import { useEffect } from "react";
import { useGetPatients } from "@/http/patients/patients-get-service";
import { PatientFilters } from "@/core-components/filter-patients";
import { usePatientFilters } from "@/hooks/use-patient-filters";

export default function PagePatients() {
  const { data } = useGetPatients();
  const { setPageTitle } = useAppContext();
  const { filteredData, handleFilterChange } = usePatientFilters(data);

  useEffect(() => {
    setPageTitle("Pacientes");
  }, [setPageTitle]);

  return (
    <Container className="space-y-3">
      <PatientFilters onFilterChange={handleFilterChange} />
      <DataTable columns={columnsPatients} data={filteredData || []} />
    </Container>
  );
}
