import mongoose, { Schema, Types } from "mongoose";
import PreOrder, { IPreOrder, IOrderItem } from "./PreOrder";
import { ORDER_STATUS } from "@/shared/constants";

interface IOrderStatus {
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
    enum: ORDER_STATUS,
    default: "awaiting_confirmation",
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

// Pre-save hook to set initial order status
orderSchema.pre("save", function (next) {
  if (this.isNew && this.order_status.length === 0) {
    this.order_status.push({
      status: "awaiting_confirmation",
      timestamp: new Date(),
    });
  }
  next();
});

const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);

export default Order;
