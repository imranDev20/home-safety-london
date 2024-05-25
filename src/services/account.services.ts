import { User } from "@/types/user";
import http from "./http.services";

export const registerAccount = async (user: User) => {
  try {
    const response = await http.post(`/register`, user);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const loginAccount = async (user: string) => {
  try {
    const response = await http.post(`/login`, user);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const logoutAccount = async (userId?: string) => {
  try {
    const response = await http.post(`/logout`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const fetchCurrentAccountInfo = async (userId?: string) => {
  try {
    const response = await http.get(`/me`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};
