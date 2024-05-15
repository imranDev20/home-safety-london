import http from "./http.services";

export const getTestimonials = async (userId?: string) => {
  try {
    const response = await http.get(`/testimonials`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const updateTestimonials = async (
  preOrderId: string | undefined,
  updatedData: any
) => {
  try {
    const response = await http.patch(`/pre-order/${preOrderId}`, updatedData);
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
