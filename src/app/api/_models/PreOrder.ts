import mongoose from "mongoose";

interface PreOrder {
  property_type: string;
  property_sub_type: string;
  bedrooms: number;
  order_items: string[];
  is_service_details_complete: boolean;
  customer_name: string;
  email: string;
  phone_no: string;
  address: {
    house_street: string;
    postcode: string;
    city: string;
  };
  is_personal_details_complete: boolean;
  tax_rate: number;
  order_total: number;
  taxed_total: number;
}

const preOrderSchema = new mongoose.Schema<PreOrder>({
  property_type: {
    type: String,
    required: true,
  },
  property_sub_type: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  order_items: {
    type: [String],
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
  is_personal_details_complete: {
    type: Boolean,
  },
  tax_rate: {
    type: Number,
  },
  order_total: {
    type: Number,
  },
  taxed_total: {
    type: Number,
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

  if (this.is_personal_details_complete) {
    const requiredFields = ["tax_rate", "order_total"];
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
