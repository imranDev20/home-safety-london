import { IUser } from "@/types/user";
import mongoose from "mongoose";

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
    address: {
      type: {
        street: {
          type: String,
          required: true,
        },
        postcode: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
      },
    },
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
      this.experience !== undefined
    ) {
      return next(
        new Error("Customers should not have skills, specialty, experience")
      );
    }
  }
  next();
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
