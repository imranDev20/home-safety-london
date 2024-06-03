import { Types } from "mongoose";
import { IOrder, IOrderItem } from "./orders";

export type Role = "customer" | "engineer" | "admin";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  role: Role;
  password: string;
  addresses: Types.ObjectId[];
  orders_placed: IOrder[];
  orders_received: IOrder[];
  preferences: {
    mode: "light" | "dark";
  };
  skills?: string[];
  specialty?: string;
  experience?: number;
  createdAt: string;
}

export interface IEngineer extends Omit<IUser, "orders_placed"> {
  role: "engineer";
  orders_received: IOrder[];
  skills: string[];
  specialty: string;
  experience: number;
}

export interface ICustomer
  extends Omit<
    IUser,
    "orders_received" | "skills" | "specialty" | "experience"
  > {
  role: "customer";
  orders_placed: IOrder[];
}

export interface IUserBasicInfo
  extends Pick<IUser, "_id" | "name" | "email" | "role"> {}
