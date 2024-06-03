export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterFormInput = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export type RegisterPayload = Omit<RegisterFormInput, "confirmPassword">;
