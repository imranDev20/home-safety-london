import mongoose, { Schema, Types } from "mongoose";
import PreOrder, { IPreOrder, IOrderItem } from "./PreOrder"; // Adjust the import path as necessary
import User from "./User"; // Adjust the import path as necessary

interface IOrderStatus {
  status: string;
  timestamp: Date;
}

interface IOrderItemWithEngineers extends IOrderItem {
  assigned_engineers: Types.ObjectId[];
}

interface IOrder extends IPreOrder {
  order_status: IOrderStatus[];
  remaining_amount: number;
  paid_amount: number;
  invoice_id: string;
  order_items: IOrderItemWithEngineers[];
}

const orderStatusSchema = new Schema<IOrderStatus>({
  status: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const orderItemSchema = new Schema<IOrderItemWithEngineers>({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Schema.Types.Mixed,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  assigned_engineers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

const orderSchema = new Schema<IOrder>(
  {
    ...PreOrder.schema.obj, // Spread the PreOrder schema to inherit its fields
    order_status: {
      type: [orderStatusSchema],
      required: true,
    },
    remaining_amount: {
      type: Number,
      required: true,
    },
    paid_amount: {
      type: Number,
      required: true,
    },
    invoice_id: {
      type: String,
      required: true,
      unique: true,
    },
    order_items: {
      type: [orderItemSchema],
      required: true,
    },
  },
  { timestamps: true }
);

const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);

export default Order;
