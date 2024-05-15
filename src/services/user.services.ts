import { Testimonial } from "@/types/testimonial";
import http from "./http.services";

const USERS_PATH = "/users";

export const getUsers = async (role?: string) => {
  try {
    const response = await http.get(USERS_PATH);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const createUser = async (testimonialData: Testimonial) => {
  try {
    const response = await http.post(USERS_PATH, testimonialData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const updateUser = async (
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

export const deleteUser = async (preOrderId: string) => {
  try {
    const response = await http.delete(`/pre-order/${preOrderId}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};
