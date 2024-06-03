import { getOrders } from "@/services/orders.services";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

interface IOrder {
  _id: string;
  createdAt: string;
  order_status: string;
  invoice_id: string;
  email: string;
  phone: string;
  customer_name: string;
  payment_method: string;
}

interface OrdersResponse {
  data: IOrder[];
  message: string;
  pagination: any;
}

interface UseOrdersDataResponse {
  ordersData: IOrder[];
  isGetOrdersDataLoading: boolean;
  isGetOrdersDataFetching: boolean;
  refetchGetOrders: () => Promise<any>;
}

export const useOrdersData = (enabled?: boolean): UseOrdersDataResponse => {
  const {
    data,
    isLoading: isGetOrdersDataLoading,
    isFetching: isGetOrdersDataFetching,
    refetch: refetchGetOrders,
  } = useQuery<OrdersResponse>({
    queryKey: ["orders"],

    queryFn: async () => {
      const { data, message, pagination } = await getOrders();

      const orders = data?.map((order: IOrder) => ({
        _id: order._id,
        createdAt: dayjs(order.createdAt).format("MMM DD, YYYY"),
        order_status: order.order_status,
        customer_name: order.customer_name,
        invoice_id: order.invoice_id,
        email: order.email,
        phone: order.phone,
        payment_method: order.payment_method,
      }));

      return {
        data: orders,
        message,
        pagination,
      };
    },
    enabled: enabled ?? true,
    refetchOnMount: true,
  });

  return {
    ordersData: data?.data || [],
    isGetOrdersDataLoading,
    isGetOrdersDataFetching,
    refetchGetOrders,
  };
};
