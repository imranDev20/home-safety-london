import { buildUrl } from "@/shared/functions";
import http from "./http.services";
import {
  CreateOrderResponse,
  GetOrderDetailsResponse,
  GetOrdersResponse,
} from "@/types/response";
import { IOrder } from "@/types/orders";

const ORDERS_PATH = "/orders";

export const getOrders = async (
  q?: string,
  order_status?: string,
  assigned_to?: string,
  sort_by?: string,
  sort_order?: string,
  page?: string
): Promise<GetOrdersResponse> => {
  const url = buildUrl(ORDERS_PATH, {
    q,
    order_status,
    assigned_to,
    sort_by,
    sort_order,
    page,
  });

  const response: GetOrdersResponse = await http.get(url);
  return response;
};

export const getOrderDetails = async (
  orderId: string
): Promise<GetOrderDetailsResponse> => {
  const response: GetOrderDetailsResponse = await http.get(
    `${ORDERS_PATH}/${orderId}`
  );
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

export const updateOrder = async (
  orderData: IOrder
): Promise<CreateOrderResponse> => {
  const response: CreateOrderResponse = await http.patch(
    `${ORDERS_PATH}/${orderData._id}`,
    orderData
  );
  return response;
};
