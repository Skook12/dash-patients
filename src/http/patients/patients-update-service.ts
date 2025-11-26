import type { UpdateVisitDate } from "@/models/patients";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateVisitDate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, last_verified_date }: UpdateVisitDate) => {
      const response = await fetch(
        `https://tatico.spocws.icu/teste/followups_261e/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            last_verified_date,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        const errorMessage =
          errorData?.detail || "Erro ao atualizar chat. Tente novamente.";

        throw new Error(errorMessage);
      }

      return await response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-patient"],
        exact: false,
      });
    },
  });
}
