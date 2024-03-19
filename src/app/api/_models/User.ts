import mongoose from "mongoose";

interface User {
  name: string;
  email: string;
  role: "user" | "admin";
  isPasswordCreated: boolean;
  password?: string;
  addresses?: mongoose.Types.ObjectId[];
  orders: mongoose.Types.ObjectId[];
}

const userSchema = new mongoose.Schema<User>({
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
    enum: ["user", "admin"],
    default: "user",
  },
  isPasswordCreated: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: function (this: User) {
      return this.isPasswordCreated;
    },
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
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
