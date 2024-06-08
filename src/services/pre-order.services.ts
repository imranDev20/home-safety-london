import { PreOrderResponse } from "@/types/response";
import http from "./http.services";

export const getPreOrder = async (): Promise<PreOrderResponse> => {
  const response: PreOrderResponse = await http.get(`/pre-order`);
  return response;
};

export const createPreOrder = async (): Promise<PreOrderResponse> => {
  const response: PreOrderResponse = await http.post(`/pre-order`);
  return response;
};

export const deletePreOrder = async (preOrderId: string) => {
  try {
    const response = await http.delete(`/pre-order/${preOrderId}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};
