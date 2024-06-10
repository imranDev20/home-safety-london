import { updateOrder } from "@/services/orders.services";
import { IOrder } from "@/types/orders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "../snackbar-provider";
import { IUser } from "@/types/user";

export default function useUpdateOrderDetails() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync: updateOrderMutate, ...rest } = useMutation({
    mutationFn: (orderData: IOrder) => updateOrder(orderData),

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["order-details"],
      });
      enqueueSnackbar(response.message, "success");
    },
    onError: (error) => enqueueSnackbar(error.message, "error"),
  });
  return { updateOrderMutate, ...rest };
}
