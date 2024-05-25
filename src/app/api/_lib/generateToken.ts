import jwt from "jsonwebtoken";
import { IUser } from "../_models/User";

const secretKey = process.env.JWT_SECRET;

export function generateToken(user: IUser) {
  return jwt.sign(
    { _id: user._id, email: user.email, role: user.role },
    secretKey as string,
    { expiresIn: "1h" } // token expires in 1 hour
  );
}
