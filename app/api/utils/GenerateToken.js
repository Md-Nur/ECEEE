import jwt from "jsonwebtoken";
import { ApiError } from ".ApiError.js";
import { z } from "zod";

export const Tokentype = z.object({
  id: z.number(),
  images: z.string(),
  isAdmin: z.boolean(),
});
const generateToken = (tokenData) => {
  const verifiedToken = Tokentype.safeParse(tokenData);
  if (!verifiedToken.success) {
    throw new ApiError(
      402,
      verifiedToken.error?.errors[0] || "Invalid token type"
    );
  }
  const token = jwt.sign(verifiedToken.data, process.env.JWT_SECRET_TOKEN, {
    expiresIn: "125d",
  });
  return token;
};

export default generateToken;
