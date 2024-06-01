import http from "./http.services";
import { Role } from "@/types/misc";
import { buildUrl } from "@/shared/functions";

const USERS_PATH = "/users";

export const getUsers = async (
  q?: string,
  role?: Role,
  sort_by?: string,
  sort_order?: string
) => {
  try {
    const url = buildUrl(USERS_PATH, {
      q,
      role,
      sort_by,
      sort_order,
    });

    console.log(url);

    const response = await http.get(url);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const getUserDetails = async (userId: string) => {
  try {
    const response = await http.get(`${USERS_PATH}/${userId}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const createUser = async (userData: any) => {
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
