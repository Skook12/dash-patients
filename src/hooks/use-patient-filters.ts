import { useMemo, useState } from "react";
import type { FilterPatientsValues, Patient } from "@/models/patients";

function calculatePatientStatus(patient: Patient): "pending" | "in_day" | null {
  const { last_verified_date, verify_frequency_in_days } = patient;

  if (!last_verified_date || !verify_frequency_in_days) {
    return null;
  }

  const lastVerifiedDate = new Date(last_verified_date);
  const deadlineDate = new Date(lastVerifiedDate);
  deadlineDate.setDate(deadlineDate.getDate() + verify_frequency_in_days);

  const today = new Date();
  return today.getTime() > deadlineDate.getTime() ? "pending" : "in_day";
}

export function usePatientFilters(patients: Patient[] = []) {
  const [activeFilters, setActiveFilters] = useState<FilterPatientsValues>({});

  const filteredData = useMemo(() => {
    return (patients || []).filter((patient: Patient) => {
      const { name, cpf, status, verify_frequency_in_days } = activeFilters;

      if (name && !patient.name.toLowerCase().includes(name.toLowerCase())) {
        return false;
      }

      if (cpf && !patient.cpf.includes(cpf)) {
        return false;
      }

      if (verify_frequency_in_days) {
        const filterDays = parseInt(verify_frequency_in_days, 10);
        if (patient.verify_frequency_in_days !== filterDays) {
          return false;
        }
      }

      if (status && status !== "all") {
        const patientStatus = calculatePatientStatus(patient);
        if (patientStatus !== status) {
          return false;
        }
      }

      return true;
    });
  }, [patients, activeFilters]);

  return { filteredData, handleFilterChange: setActiveFilters };
}
