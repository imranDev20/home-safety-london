import { Document, Types } from "mongoose";

export type ParkingType = "free" | "paid" | "unavailable";
export type ZoneType = "";
export type PaymentMethod =
  | "bank_transfer"
  | "credit_card"
  | "cash_to_engineer";

export interface IOrderItem {
  name: string;
  price: number;
  quantity: string | number;
  unit: string;
  title: string;
}

export interface IOrderItemWithEngineers extends IOrderItem {
  assigned_engineers: Types.ObjectId[];
}

export interface IPreOrder extends Document {
  property_type: string;
  resident_type: string;
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
  inspection_date: string;
  inspection_time: string;
  order_notes: string;
  is_personal_details_complete: boolean;
  payment_method: PaymentMethod;
}

export interface IOrder extends IPreOrder {
  order_status: OrderStatus[];
  remaining_amount: number;
  paid_amount: number;
  invoice_id: string;
  order_items: IOrderItemWithEngineers[];
}

export type OrderStatus = {
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
