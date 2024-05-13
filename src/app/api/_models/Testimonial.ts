import mongoose, { Document, Schema } from "mongoose";

interface ITestimonial extends Document {
  name: string;
  email: string;
  rating: number;
  content: string;
  user: mongoose.Types.ObjectId;
}

const testimonialSchema = new mongoose.Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;
