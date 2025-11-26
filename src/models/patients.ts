export type Patient = {
  id: number;
  name: string;
  cpf: string;
  active: boolean;
  last_verified_date: Date;
  verify_frequency_in_days: number;
};

export type UpdateVisitDate = {
  id: number;
  last_verified_date: Date;
};
