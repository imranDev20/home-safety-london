import { Role } from "@/types/misc";
import mongoose, { Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  role: Role;
  password: string;
  addresses: mongoose.Types.ObjectId[];
  orders_placed?: mongoose.Types.ObjectId[];
  orders_received?: mongoose.Types.ObjectId[];
  preferences: {
    mode: "light" | "dark";
  };
  skills?: string[];
  specialty?: string;
  experience?: number;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ["customer", "admin", "engineer"],
      default: "customer",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    addresses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    orders_placed: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Order",
        },
      ],
      default: null,
    },
    orders_received: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    preferences: {
      mode: {
        type: String,
        enum: ["light", "dark"],
        default: "light",
      },
    },
    skills: {
      type: [String],
      validate: {
        validator: function (this: IUser) {
          return (
            this.role !== "engineer" || (this.skills && this.skills.length > 0)
          );
        },
        message: "Skills are required for engineers.",
      },
    },
    specialty: {
      type: String,
      validate: {
        validator: function (this: IUser) {
          return this.role !== "engineer" || !!this.specialty;
        },
        message: "Specialty is required for engineers.",
      },
    },
    experience: {
      type: Number,
      validate: {
        validator: function (this: IUser) {
          return this.role !== "engineer" || this.experience !== undefined;
        },
        message: "Experience is required for engineers.",
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("validate", function (next) {
  if (this.role === "customer") {
    if (
      (this.skills && this.skills?.length > 0) ||
      this.specialty ||
      this.experience !== undefined ||
      (this.orders_received && this.orders_received?.length > 0)
    ) {
      return next(
        new Error(
          "Customers should not have skills, specialty, experience, or orders received"
        )
      );
    }
  } else if (this.role === "engineer") {
    if (this.orders_placed && this.orders_placed.length > 0) {
      return next(new Error("Engineers should not have orders placed"));
    }
  }
  next();
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
