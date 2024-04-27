import http from "./http.services";

export const getPreOrderById = async (preOrderId: string) => {
  try {
    const response = await http.get(`/pre-order/${preOrderId}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const updatePreOrder = async (preOrderId: string, updatedData: any) => {
  try {
    const response = await http.put(`/pre-order/${preOrderId}`, updatedData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const deletePreOrder = async (preOrderId: string) => {
  try {
    const response = await http.delete(`/pre-order/${preOrderId}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};
