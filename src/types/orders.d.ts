import { Document, Types } from "mongoose";

export type ParkingType = "free" | "paid" | "unavailable";
export type ZoneType = "congestion" | "non_congestion";
export type PaymentMethod =
  | "bank_transfer"
  | "credit_card"
  | "cash_to_engineer";

export type OrderStatus = {
  _id?: string;
  status:
    | "pending_payment"
    | "payment_completed"
    | "awaiting_confirmation"
    | "order_confirmed"
    | "engineer_en_route"
    | "work_in_progress"
    | "work_completed"
    | "completed"
    | "cancelled";
  timestamp: Date;
};

export type OrderStatusValues = Pick<OrderStatus, "status">[keyof Pick<
  OrderStatus,
  "status"
>];

export interface IOrderItem {
  name: string;
  price: number;
  quantity: string | number;
  unit: string;
  title: string;
  _id?: string;
}

export interface IOrderItemWithEngineers extends IOrderItem {
  assigned_engineers: Types.ObjectId[];
}

export interface IPreOrder {
  _id?: string;
  property_type: "residential" | "commercial";
  resident_type: "house" | "hmo" | "flat";
  bedrooms: string;
  order_items: IOrderItem[];
  is_service_details_complete: boolean;
  customer_name: string;
  email: string;
  phone_no: string;
  address: {
    house_street: string;
    postcode: string;
    city: string;
  };
  parking_options: {
    parking_type: ParkingType;
    parking_cost: number;
  };
  congestion_zone: {
    zone_type: ZoneType;
    zone_cost: number;
  };
  inspection_date: Date;
  inspection_time: string;
  order_notes: string;
  is_personal_details_complete: boolean;
  payment_method: PaymentMethod;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IOrder extends IPreOrder {
  order_status: OrderStatus[];
  remaining_amount: number;
  paid_amount: number;
  invoice_id: string;
  order_items: IOrderItemWithEngineers[];
}
