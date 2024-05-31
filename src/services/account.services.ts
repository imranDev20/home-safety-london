import { User } from "@/types/user";
import http from "./http.services";

const ACCOUNT_PATH = "/account";

export const registerAccount = async (user: User) => {
  try {
    const response = await http.post(`${ACCOUNT_PATH}/register`, user);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const loginAccount = async (user: string) => {
  try {
    const response = await http.post(`${ACCOUNT_PATH}/login`, user);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const logoutAccount = async (userId?: string) => {
  try {
    const response = await http.post(`${ACCOUNT_PATH}/logout`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const getCurrentAccount = async () => {
  try {
    const response = await http.get(`${ACCOUNT_PATH}/me`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};
