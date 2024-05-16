import { Testimonial } from "@/types/testimonial";
import http from "./http.services";

const USERS_PATH = "/users";

export const getUsers = async (search?: string, role?: string) => {
  try {
    const url = `${USERS_PATH}${search && search !== "" ? "?q=" + search : ""}${
      role ? "&role=" + role : ""
    }`;

    const response = await http.get(url);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await http.post(USERS_PATH, userData);
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

export const exportUsers = async () => {
  try {
    const response = await http.get(`/users/export`);
    return response;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};
