import http from "./http.services";

const ORDERS_PATH = "/orders";

export const getOrders = async () => {
  try {
    const response = await http.get(`${ORDERS_PATH}`);
    return response.data;
  } catch (error: any) {
    throw error.message || error.response?.data;
  }
};

export const createOrder = async (preOrderId: string) => {
  try {
    const response = await http.post(`${ORDERS_PATH}`, {
      pre_order_id: preOrderId,
    });

    return response.data;
  } catch (error: any) {
    throw error.message || error.response?.data;
  }
};
