import { buildUrl } from "@/shared/functions";
import http from "./http.services";
import { CreateOrderResponse, GetOrdersResponse } from "@/types/response";

const ORDERS_PATH = "/orders";

export const getOrders = async (
  q?: string,
  order_status?: string,
  assigned_to?: string,
  sort_by?: string,
  sort_order?: string
): Promise<GetOrdersResponse> => {
  const url = buildUrl(ORDERS_PATH, {
    q,
    order_status,
    assigned_to,
    sort_by,
    sort_order,
  });

  const response: GetOrdersResponse = await http.get(url);
  return response;
};

export const createOrder = async (
  preOrderId: string
): Promise<CreateOrderResponse> => {
  const response: CreateOrderResponse = await http.post(`${ORDERS_PATH}`, {
    pre_order_id: preOrderId,
  });
  return response;
};
