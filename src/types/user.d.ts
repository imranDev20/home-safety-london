import { Types } from "mongoose";
import { IOrder } from "./orders";

export type Role = "customer" | "engineer" | "admin";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  role: Role;
  password: string;
  address: {
    city: string;
    street: string;
    postcode: string;
  };
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
