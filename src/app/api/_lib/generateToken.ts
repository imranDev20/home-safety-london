import { IUser } from "@/types/user";
import { SignJWT } from "jose";
import { TextEncoder } from "util";

const secretKey = process.env.JWT_SECRET;

export async function generateAccessToken(
  user: Partial<IUser>
): Promise<string> {
  if (!secretKey) {
    throw new Error("JWT secret is not defined in environment variables.");
  }

  const encoder = new TextEncoder();
  const encodedSecret = encoder.encode(secretKey);

  const jwt = await new SignJWT({
    _id: user._id,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime("15m") // token expires in 15 minutes
    .sign(encodedSecret);

  return jwt;
}

export async function generateRefreshToken(
  user: Partial<IUser>
): Promise<string> {
  if (!secretKey) {
    throw new Error("JWT secret is not defined in environment variables.");
  }

  const encoder = new TextEncoder();
  const encodedSecret = encoder.encode(secretKey);

  const jwt = await new SignJWT({
    _id: user._id,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime("7d")
    .sign(encodedSecret);

  return jwt;
}
