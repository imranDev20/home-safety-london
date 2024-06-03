import { LoginPayload } from "@/types/account";
import http from "./http.services";
import { AuthUserResponse } from "@/types/response";

const ACCOUNT_PATH = "/account";

type RegisterPayload = {};

export const registerAccount = async (
  registerData: RegisterPayload
): Promise<AuthUserResponse> => {
  const response: AuthUserResponse = await http.post(
    `${ACCOUNT_PATH}/register`,
    registerData
  );
  return response;
};

export const loginAccount = async (
  loginData: LoginPayload
): Promise<AuthUserResponse> => {
  const response: AuthUserResponse = await http.post(
    `${ACCOUNT_PATH}/login`,
    loginData
  );
  return response;
};

export const logoutAccount = async (userId?: string) => {
  try {
    const response = await http.post(`${ACCOUNT_PATH}/logout`);
    return response;
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
