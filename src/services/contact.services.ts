import http from "./http.services";

const CONTACT_PATH = "/contact";

export const submitContactUsForm = async (contactFormData: any) => {
  try {
    const response = await http.post(CONTACT_PATH, contactFormData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};
