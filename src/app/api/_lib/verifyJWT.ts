import {
  JWTClaimValidationFailedError,
  JWTExpiredError,
  JWTMalformedError,
  JWTVerificationFailedError,
} from "@/shared/errors";
import { jwtVerify, JWTPayload } from "jose";

interface DecodedToken extends JWTPayload {
  _id: string;
  email: string;
  role: string;
}

export async function verifyJWT(token: string): Promise<DecodedToken> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);

  try {
    const { payload } = await jwtVerify(token, secret);
    const decodedToken = payload as DecodedToken;
    return decodedToken;
  } catch (err) {
    if (err instanceof Error) {
      switch (err.name) {
        case "JWTMalformed":
          throw new JWTMalformedError();
        case "JWTClaimValidationFailed":
          throw new JWTClaimValidationFailedError();
        case "JWTExpired":
          throw new JWTExpiredError();
        default:
          throw new JWTVerificationFailedError();
      }
    } else {
      throw new Error("Unknown error during token verification");
    }
  }
}
