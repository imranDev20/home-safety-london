import mongoose, { Schema } from "mongoose";

interface IUser {
  name: string;
  email: string;
  role: "customer" | "admin" | "staff";
  isPasswordCreated: boolean;
  password: string;
  addresses: mongoose.Types.ObjectId[];
  orders: mongoose.Types.ObjectId[];
  preferences: {
    mode: "light" | "dark";
  };
}

const userSchema: Schema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["customer", "admin"],
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

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
