import { Pagination } from "./misc";
import { IOrder, IPreOrder } from "./orders";
import { ITestimonial } from "./testimonial";
import { ICustomer, IEngineer, IUser, IUserBasicInfo } from "./user";

export type SuccessResponseWithArray<T> = {
  data: T[];
  success: true;
  message: string;
  pagination?: Pagination;
};

export type SuccessResponse<T> = {
  data: T;
  success: true;
  message: string;
};

export type ErrorResponse = {
  success: false;
  message: string;
};

export type GetTestimonialsResponse = SuccessResponseWithArray<ITestimonial>;
export type GetEngineersResponse = SuccessResponseWithArray<IEngineer>;
export type GetCustomersResponse = SuccessResponseWithArray<ICustomer>;
export type GetOrdersResponse = SuccessResponseWithArray<IOrder>;
export type GetOrderDetailsResponse = SuccessResponse<IOrder>;
export type AuthUserResponse = SuccessResponse<IUserBasicInfo>;
export type PreOrderResponse = SuccessResponse<Partial<IPreOrder<IUser>>>;
export type CreateOrderResponse = SuccessResponse<IOrder>;

export type LogoutResponse = SuccessResponse<undefined>;
