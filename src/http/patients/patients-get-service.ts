import type { Patient } from "@/models/patients";
import { useQuery } from "@tanstack/react-query";

export function useGetPatients() {
  return useQuery({
    queryKey: ["get-patient"],
    queryFn: async () => {
      const response = await fetch(
        `https://tatico.spocws.icu/teste/followups_261e`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const result: Patient[] = await response.json();

      return result;
    },
  });
}
