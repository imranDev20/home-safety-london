import mongoose from "mongoose";

interface IUser {
  name: string;
  email: string;
  phone: string;
  role: "customer" | "admin" | "staff";
  password: string;
  addresses: mongoose.Types.ObjectId[];
  orders: mongoose.Types.ObjectId[];
  preferences: {
    mode: "light" | "dark";
  };
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
      enum: ["customer", "admin", "staff"],
      default: "customer",
    },
    password: {
      type: String,
      required: true,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    addresses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    preferences: {
      mode: {
        type: String,
        enum: ["light", "dark"],
        default: "light",
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
