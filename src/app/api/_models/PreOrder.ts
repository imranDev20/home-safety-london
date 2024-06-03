import { IOrderItem, IPreOrder } from "@/types/orders";
import mongoose from "mongoose";
import { Schema } from "mongoose";

const orderItemSchema = new Schema<IOrderItem>({
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
});

const preOrderSchema = new Schema<IPreOrder>(
  {
    property_type: {
      type: String,
      required: true,
      enum: ["residential", "commercial"],
    },
    resident_type: {
      type: String,
      required: function () {
        return this.property_type === "residential";
      },
      validate: {
        validator: function (value: string): boolean {
          if (this && "property_type" in this) {
            return this.property_type !== "commercial" || !value;
          }
          return false;
        },
        message: (props) =>
          `resident_type cannot be provided when property_type is commercial`,
      },
    },
    bedrooms: {
      type: String,
      required: function () {
        return this.property_type === "residential";
      },
      validate: {
        validator: function (value: string): boolean {
          if (this && "property_type" in this) {
            return this.property_type !== "commercial" || !value;
          }
          return false;
        },
        message: (props) =>
          `bedrooms cannot be provided when property_type is commercial`,
      },
    },
    order_items: {
      type: [orderItemSchema],
      required: true,
    },
    is_service_details_complete: {
      type: Boolean,
    },
    customer_name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone_no: {
      type: String,
    },
    address: {
      type: {
        house_street: {
          type: String,
        },
        postcode: {
          type: String,
        },
        city: {
          type: String,
        },
      },
    },
    parking_options: {
      type: {
        parking_type: {
          type: String,
          enum: ["paid", "free", "unavailable"],
        },
        parking_cost: {
          type: Number,
        },
      },
    },
    congestion_zone: {
      type: {
        zone_type: {
          type: String,
          enum: ["congestion", "non_congestion"],
        },
        zone_cost: {
          type: Number,
        },
      },
    },
    inspection_date: {
      type: String,
    },
    inspection_time: {
      type: String,
    },
    order_notes: {
      type: String,
    },
    is_personal_details_complete: {
      type: Boolean,
    },
    payment_method: {
      type: String,
      enum: ["bank_transfer", "credit_card", "cash_to_engineer"],
    },
  },
  { timestamps: true }
);

const PreOrder =
  mongoose.models.PreOrder || mongoose.model("PreOrder", preOrderSchema);

export default PreOrder;
