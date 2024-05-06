import mongoose from "mongoose";
import { Schema } from "mongoose";

interface OrderItem {
  name: string;
  price: number;
  quantity: string | number;
  unit: string;
  title: string;
}

interface PreOrder {
  property_type: string;
  resident_type: string;
  bedrooms: string;
  order_items: OrderItem[];
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
    parking_type: string;
    parking_cost: number;
  };
  congestion_zone: {
    zone_type: string;
    zone_cost: number;
  };
  is_personal_details_complete: boolean;
  tax_rate: number;
  order_total: number;
  taxed_total: number;
}

const orderItemSchema = new Schema<OrderItem>({
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
    type: Schema.Types.Mixed, // Allows both string and number
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
});

const preOrderSchema = new Schema<PreOrder>({
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
  },
  order_items: {
    type: [orderItemSchema],
    required: true,
  },
  is_service_details_complete: {
    type: Boolean,
    required: true,
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
      },
      zone_cost: {
        type: Number,
      },
    },
  },
  is_personal_details_complete: {
    type: Boolean,
  },
});

// Custom validator for fields below is_service_details_complete
preOrderSchema.pre<PreOrder>("save", function (next) {
  if (this.is_service_details_complete) {
    const requiredFields = [
      "customer_name",
      "email",
      "phone_no",
      "address",
      "parking_options",
      "congestion_zone",
      "is_personal_details_complete",
    ];

    for (const field of requiredFields) {
      if (!(this as any)[field]) {
        return next(
          new Error(
            `${field.replace(
              "_",
              " "
            )} is required when service details are complete.`
          )
        );
      }
    }
  }

  next();
});

const PreOrder =
  mongoose.models.PreOrder || mongoose.model("PreOrder", preOrderSchema);

export default PreOrder;
