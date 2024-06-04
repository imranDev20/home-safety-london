import mongoose, { Schema } from "mongoose";
import { IOrderItemWithEngineers, IOrder } from "@/types/orders";
import { ORDER_STATUS } from "@/shared/constants";
import { OrderStatus } from "@/types/orders";
import PreOrder from "./PreOrder";

const orderStatusSchema = new Schema<OrderStatus>({
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
    ...PreOrder.schema.paths, // spread the paths object instead of obj
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

const Order: mongoose.Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);

export default Order;
