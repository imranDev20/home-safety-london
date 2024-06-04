import { UpdatePreOrderResponse } from "@/types/response";
import http from "./http.services";

export const getPreOrderById = async (preOrderId: string) => {
  const response = await http.get(`/pre-order/${preOrderId}`);
  return response;
};

export const updatePreOrder = async (
  preOrderId: string | undefined,
  updatedData: any
): Promise<UpdatePreOrderResponse> => {
  const response: UpdatePreOrderResponse = await http.patch(
    `/pre-order/${preOrderId}`,
    updatedData
  );
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
