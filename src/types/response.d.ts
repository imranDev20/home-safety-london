import { Pagination } from "./misc";
import { IOrder } from "./orders";
import { ITestimonial } from "./testimonial";
import { ICustomer, IEngineer, IUser } from "./user";

export type GetArraySuccessResponse<T> = {
  data: T[];
  success: true;
  message?: string;
  pagination?: Pagination;
};

export type ErrorResponse = {
  success: false;
  message: string;
};

export type GetTestimonialsResponse = GetArraySuccessResponse<ITestimonial>;
export type GetEngineersResponse = GetArraySuccessResponse<IEngineer>;
export type GetCustomersResponse = GetArraySuccessResponse<ICustomer>;
export type GetOrdersResponse = GetArraySuccessResponse<IOrder>;
