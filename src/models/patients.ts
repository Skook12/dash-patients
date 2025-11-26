export type Patient = {
  id: number;
  name: string;
  cpf: string;
  active: boolean;
  last_verified_date: string;
  verify_frequency_in_days: number;
};

export type UpdateVisitDate = {
  id: number;
  last_verified_date: string;
};

export type FilterPatientsValues = {
  name?: string;
  cpf?: string;
  status?: "all" | "pending" | "in_day";
  last_verified_date?: string;
  verify_frequency_in_days?: string;
};
