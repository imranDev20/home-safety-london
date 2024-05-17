import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  userId: string;
  email: string;
}

export function verifyJWT(token: string): DecodedToken {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;
    return decoded;
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid token");
    } else if (err instanceof jwt.TokenExpiredError) {
      throw new Error("Token has expired");
    } else {
      throw new Error("Token verification failed");
    }
  }
}
